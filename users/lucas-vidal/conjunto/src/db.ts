/**
 * Database: better-sqlite3 com schema declarativo aplicado on boot.
 *
 * Filosofia: schema é código, não migração. Em MVP, recriar o schema da
 * tabela é mais barato e mais legível do que manter uma máquina de
 * migration. Quando a oferta validar e houver dados de produção, isso
 * passa a ser um problema real e a gente revisita (decisão registrada em
 * docs/project/decisions.md).
 */

import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");
const DB_PATH = process.env.CONJUNTO_DB ?? join(REPO_ROOT, "data", "conjunto.db");

mkdirSync(dirname(DB_PATH), { recursive: true });

export const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

// ---------- Schema -----------------------------------------------------------

db.exec(`
  CREATE TABLE IF NOT EXISTS members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL,                  -- e.g. tech lead, engineering manager
    company TEXT,
    bio TEXT,
    currently TEXT,                      -- first-person 'what I'm wrestling with right now'
    joined_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS threads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE,
    theme TEXT,
    started_by INTEGER NOT NULL REFERENCES members(id) ON DELETE CASCADE,
    started_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    thread_id INTEGER NOT NULL REFERENCES threads(id) ON DELETE CASCADE,
    author_id INTEGER NOT NULL REFERENCES members(id) ON DELETE CASCADE,
    body TEXT NOT NULL,
    posted_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_messages_thread ON messages(thread_id, posted_at);

  /*
   * Read marks: one row per (member, thread). Records the most recent
   * timestamp at which the member opened that thread. Used to render
   * a soft 'you read up to here' rule between messages — never a badge,
   * never a counter. The principle is 'helps the member resume, not
   * compete'.
   */
  CREATE TABLE IF NOT EXISTS read_marks (
    member_id INTEGER NOT NULL REFERENCES members(id) ON DELETE CASCADE,
    thread_id INTEGER NOT NULL REFERENCES threads(id) ON DELETE CASCADE,
    read_at   TEXT    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (member_id, thread_id)
  );
`);

// Migration: legacy databases (created before the slug column) get the
// column added in-place. Idempotent: if the column already exists,
// PRAGMA table_info reports it and we skip the ALTER. The unique
// index runs after the migration so legacy DBs and fresh ones converge
// to the same final schema.
const threadCols = db.prepare(`PRAGMA table_info(threads)`).all() as { name: string }[];
if (!threadCols.some((c) => c.name === "slug")) {
  db.exec(`ALTER TABLE threads ADD COLUMN slug TEXT`);
}
if (!threadCols.some((c) => c.name === "theme")) {
  db.exec(`ALTER TABLE threads ADD COLUMN theme TEXT`);
}
db.exec(`CREATE UNIQUE INDEX IF NOT EXISTS idx_threads_slug ON threads(slug)`);

const memberCols = db.prepare(`PRAGMA table_info(members)`).all() as { name: string }[];
if (!memberCols.some((c) => c.name === "currently")) {
  db.exec(`ALTER TABLE members ADD COLUMN currently TEXT`);
}

// ---------- Types ------------------------------------------------------------

export interface Member {
  id: number;
  name: string;
  email: string;
  role: string;
  company: string | null;
  bio: string | null;
  currently: string | null;
  joined_at: string;
}

export interface Thread {
  id: number;
  title: string;
  slug: string | null;
  theme: string | null;
  started_by: number;
  started_at: string;
}

export interface Message {
  id: number;
  thread_id: number;
  author_id: number;
  body: string;
  posted_at: string;
}

// ---------- Helpers ----------------------------------------------------------

export function listMembers(): Member[] {
  return db.prepare("SELECT * FROM members ORDER BY name").all() as Member[];
}

/**
 * Avatar URL for a member, derived deterministically from the email.
 * Uses pravatar.cc seeded by email so each member always gets the
 * same face across reseeds. CSS-side duotone treatment lives in the
 * layout stylesheet; the URL is plain.
 */
export function avatarUrlFor(member: { email: string }, size = 240): string {
  const seed = encodeURIComponent(member.email);
  return `https://i.pravatar.cc/${size}?u=${seed}`;
}

export function getMember(id: number): Member | undefined {
  return db.prepare("SELECT * FROM members WHERE id = ?").get(id) as Member | undefined;
}

export function listThreads(): (Thread & { author: string; message_count: number })[] {
  return db
    .prepare(
      `SELECT t.*, m.name AS author,
              (SELECT COUNT(*) FROM messages WHERE thread_id = t.id) AS message_count
       FROM threads t
       JOIN members m ON m.id = t.started_by
       ORDER BY t.started_at DESC`
    )
    .all() as (Thread & { author: string; message_count: number })[];
}

/** Canonical theme metadata. Three columns mirroring the editorial
 *  beats of the Conjunto: carreira, operação, autoconhecimento. */
export const THEMES: Record<string, { label: string; hue: string }> = {
  carreira: { label: "Carreira", hue: "#a8b58a" },        // moss
  operacao: { label: "Operação", hue: "#8aa3b5" },         // slate blue
  autoconhecimento: { label: "Autoconhecimento", hue: "#c9a76a" }, // ochre
};

export function themeOf(key: string | null | undefined): { label: string; hue: string } | undefined {
  if (!key) return undefined;
  return THEMES[key];
}

export function getThread(id: number): Thread | undefined {
  return db.prepare("SELECT * FROM threads WHERE id = ?").get(id) as Thread | undefined;
}

/**
 * Returns the thread summary used by inline citations, looked up by
 * slug. Slug is human-readable, stable across reseeds, and safe to
 * embed in raw markdown ([[fio:delegar-sem-gargalo]]).
 */
export function getThreadSummaryBySlug(
  slug: string
): { id: number; slug: string; title: string; author: string; opener: string } | undefined {
  const row = db
    .prepare(
      `SELECT t.id, t.slug, t.title, m.name AS author,
              (SELECT body FROM messages
                WHERE thread_id = t.id
                ORDER BY posted_at ASC LIMIT 1) AS opener
       FROM threads t
       JOIN members m ON m.id = t.started_by
       WHERE t.slug = ?`
    )
    .get(slug) as
    | { id: number; slug: string; title: string; author: string; opener: string | null }
    | undefined;
  if (!row) return undefined;
  const opener = (row.opener ?? "").split(/[.!?](\s|$)/)[0]?.trim() ?? "";
  return { id: row.id, slug: row.slug, title: row.title, author: row.author, opener };
}

/**
 * Activity by a single member across the Conjunto: every message they
 * posted, joined to its thread, newest first. Used by the member page
 * to render a personal timeline — 'how do I know this person' before
 * the monthly encounter.
 */
export function listMemberActivity(
  memberId: number,
  limit = 30
): {
  message_id: number;
  thread_id: number;
  thread_title: string;
  posted_at: string;
  body: string;
}[] {
  return db
    .prepare(
      `SELECT msg.id    AS message_id,
              t.id      AS thread_id,
              t.title   AS thread_title,
              msg.posted_at,
              msg.body
       FROM messages msg
       JOIN threads t ON t.id = msg.thread_id
       WHERE msg.author_id = ?
       ORDER BY msg.posted_at DESC
       LIMIT ?`
    )
    .all(memberId, limit) as {
    message_id: number;
    thread_id: number;
    thread_title: string;
    posted_at: string;
    body: string;
  }[];
}

/**
 * Returns the previous read_at for (member, thread), then upserts
 * the mark to now. The previous value is what we render in the UI:
 * 'you read up to here in 12/mai'. If this is the first visit, the
 * previous value is undefined and no marker is drawn.
 */
export function recordAndGetPreviousRead(
  memberId: number,
  threadId: number
): string | undefined {
  const prev = db
    .prepare(`SELECT read_at FROM read_marks WHERE member_id = ? AND thread_id = ?`)
    .get(memberId, threadId) as { read_at: string } | undefined;

  db.prepare(
    `INSERT INTO read_marks (member_id, thread_id, read_at)
     VALUES (?, ?, CURRENT_TIMESTAMP)
     ON CONFLICT(member_id, thread_id)
     DO UPDATE SET read_at = CURRENT_TIMESTAMP`
  ).run(memberId, threadId);

  return prev?.read_at;
}

export function listMessages(
  threadId: number
): (Message & { author: string; author_role: string; author_company: string | null })[] {
  return db
    .prepare(
      `SELECT msg.*,
              m.name    AS author,
              m.role    AS author_role,
              m.company AS author_company
       FROM messages msg
       JOIN members m ON m.id = msg.author_id
       WHERE msg.thread_id = ?
       ORDER BY msg.posted_at ASC`
    )
    .all(threadId) as (Message & {
    author: string;
    author_role: string;
    author_company: string | null;
  })[];
}
