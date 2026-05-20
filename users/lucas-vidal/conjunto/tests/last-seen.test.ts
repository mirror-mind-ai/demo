import Database from "better-sqlite3";
import { describe, expect, it } from "vitest";
import { formatRelativeTime } from "../src/lib/time.js";

// ---------------------------------------------------------------------------
// T6a — formatRelativeTime: pure function, no DB needed
// ---------------------------------------------------------------------------

describe("formatRelativeTime", () => {
  const now = new Date("2026-05-20T14:00:00Z").getTime();

  it("returns 'agora mesmo' for less than 1 minute ago", () => {
    expect(formatRelativeTime("2026-05-20T13:59:45Z", now)).toBe("agora mesmo");
  });

  it("returns 'há 1 minuto' for exactly 1 minute ago", () => {
    expect(formatRelativeTime("2026-05-20T13:59:00Z", now)).toBe("há 1 minuto");
  });

  it("returns 'há X minutos' for 2–59 minutes ago", () => {
    expect(formatRelativeTime("2026-05-20T13:25:00Z", now)).toBe("há 35 minutos");
  });

  it("returns 'há 1 hora' for exactly 1 hour ago", () => {
    expect(formatRelativeTime("2026-05-20T13:00:00Z", now)).toBe("há 1 hora");
  });

  it("returns 'há X horas' for 2–23 hours ago", () => {
    expect(formatRelativeTime("2026-05-20T08:00:00Z", now)).toBe("há 6 horas");
  });

  it("returns 'há 1 dia' for exactly 1 day ago", () => {
    expect(formatRelativeTime("2026-05-19T14:00:00Z", now)).toBe("há 1 dia");
  });

  it("returns 'há X dias' for 2–6 days ago", () => {
    expect(formatRelativeTime("2026-05-16T14:00:00Z", now)).toBe("há 4 dias");
  });

  it("returns 'há 1 semana' for 7 days ago", () => {
    expect(formatRelativeTime("2026-05-13T14:00:00Z", now)).toBe("há 1 semana");
  });

  it("returns 'há X semanas' for 14–29 days ago", () => {
    expect(formatRelativeTime("2026-05-01T14:00:00Z", now)).toBe("há 2 semanas");
  });

  it("returns 'há mais de um mês' for 30+ days ago", () => {
    expect(formatRelativeTime("2026-04-10T14:00:00Z", now)).toBe("há mais de um mês");
  });

  it("returns empty string for invalid input", () => {
    expect(formatRelativeTime("not-a-date", now)).toBe("");
  });

  it("returns 'agora mesmo' for future timestamps", () => {
    expect(formatRelativeTime("2026-05-20T15:00:00Z", now)).toBe("agora mesmo");
  });
});

// ---------------------------------------------------------------------------
// T6b — Schema: last_seen_at column exists after boot
// ---------------------------------------------------------------------------

describe("schema — last_seen_at column", () => {
  it("creates the last_seen_at column in the members table", () => {
    const mem = new Database(":memory:");
    mem.pragma("journal_mode = WAL");
    mem.pragma("foreign_keys = ON");

    // Reproduce the CREATE TABLE from db.ts
    mem.exec(`
      CREATE TABLE IF NOT EXISTS members (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        role TEXT NOT NULL,
        company TEXT,
        bio TEXT,
        currently TEXT,
        avatar_img INTEGER,
        joined_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        last_seen_at TEXT
      )
    `);

    const cols = mem.prepare("PRAGMA table_info(members)").all() as { name: string }[];
    const colNames = cols.map((c) => c.name);
    expect(colNames).toContain("last_seen_at");

    mem.close();
  });

  it("adds last_seen_at via ALTER TABLE to a legacy schema", () => {
    const mem = new Database(":memory:");
    mem.pragma("journal_mode = WAL");

    // Legacy schema without last_seen_at
    mem.exec(`
      CREATE TABLE members (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        role TEXT NOT NULL,
        company TEXT,
        bio TEXT,
        currently TEXT,
        avatar_img INTEGER,
        joined_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Idempotent migration
    const cols = mem.prepare("PRAGMA table_info(members)").all() as { name: string }[];
    if (!cols.some((c) => c.name === "last_seen_at")) {
      mem.exec("ALTER TABLE members ADD COLUMN last_seen_at TEXT");
    }

    const after = mem.prepare("PRAGMA table_info(members)").all() as { name: string }[];
    expect(after.map((c) => c.name)).toContain("last_seen_at");

    mem.close();
  });
});

// ---------------------------------------------------------------------------
// T6c — UPDATE sets last_seen_at
// ---------------------------------------------------------------------------

describe("last_seen_at update", () => {
  it("sets last_seen_at when updating a member", () => {
    const mem = new Database(":memory:");
    mem.pragma("journal_mode = WAL");
    mem.exec(`
      CREATE TABLE members (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        role TEXT NOT NULL,
        joined_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        last_seen_at TEXT
      )
    `);

    mem.prepare("INSERT INTO members (name, email, role) VALUES (?, ?, ?)").run(
      "Ana",
      "ana@exemplo.com",
      "tech lead"
    );

    const before = mem.prepare("SELECT last_seen_at FROM members WHERE id = 1").get() as {
      last_seen_at: string | null;
    };
    expect(before.last_seen_at).toBeNull();

    mem.prepare("UPDATE members SET last_seen_at = CURRENT_TIMESTAMP WHERE id = ?").run(1);

    const after = mem.prepare("SELECT last_seen_at FROM members WHERE id = 1").get() as {
      last_seen_at: string | null;
    };
    expect(after.last_seen_at).not.toBeNull();

    mem.close();
  });
});
