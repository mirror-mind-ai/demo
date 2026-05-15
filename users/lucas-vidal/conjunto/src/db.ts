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
    joined_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS threads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
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
`);

// ---------- Types ------------------------------------------------------------

export interface Member {
  id: number;
  name: string;
  email: string;
  role: string;
  company: string | null;
  bio: string | null;
  joined_at: string;
}

export interface Thread {
  id: number;
  title: string;
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

export function getThread(id: number): Thread | undefined {
  return db.prepare("SELECT * FROM threads WHERE id = ?").get(id) as Thread | undefined;
}

export function listMessages(threadId: number): (Message & { author: string })[] {
  return db
    .prepare(
      `SELECT msg.*, m.name AS author
       FROM messages msg
       JOIN members m ON m.id = msg.author_id
       WHERE msg.thread_id = ?
       ORDER BY msg.posted_at ASC`
    )
    .all(threadId) as (Message & { author: string })[];
}
