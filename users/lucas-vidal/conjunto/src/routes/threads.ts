import { Hono } from "hono";
import {
  getThread,
  getThreadSummary,
  listMembers,
  listMessages,
  listThreads,
  recordAndGetPreviousRead,
} from "../db.js";
import { getCurrentMember } from "../lib/auth.js";
import { escapeHtml, layout } from "../views/layout.js";

export const threads = new Hono();

threads.get("/", (c) => {
  const current = getCurrentMember(c);
  const all = listMembers();
  const ts = listThreads();

  const html = ts
    .map(
      (t) => `
    <div class="card">
      <h3><a href="/threads/${t.id}">${escapeHtml(t.title)}</a></h3>
      <div class="meta">aberto por ${escapeHtml(t.author)} · ${t.message_count} ${t.message_count === 1 ? "mensagem" : "mensagens"}</div>
    </div>`
    )
    .join("");

  return c.html(
    layout({
      title: "Fios",
      currentMember: current ? { id: current.id, name: current.name } : null,
      allMembers: all.map((m) => ({ id: m.id, name: m.name })),
      body: `<h1>Fios</h1><p class="lede">Conversas temáticas em curso entre os membros.</p>${html || "<p>Nenhum fio aberto.</p>"}`,
    })
  );
});

threads.get("/:id", (c) => {
  const id = parseInt(c.req.param("id"), 10);
  const t = isNaN(id) ? undefined : getThread(id);
  if (!t) {
    c.status(404);
    return c.html("Fio não encontrado.");
  }
  const current = getCurrentMember(c);
  const all = listMembers();
  const msgs = listMessages(id);

  // Read mark: get previous read_at for this member+thread, then
  // update to now. Marker is drawn before the first message posted
  // after the previous visit.
  const previousRead = current ? recordAndGetPreviousRead(current.id, id) : undefined;
  const previousReadMs = previousRead ? new Date(previousRead).getTime() : undefined;
  let markerDrawn = false;

  const msgsHtml = msgs
    .map((m, i) => {
      const affiliation = [m.author_role, m.author_company]
        .filter(Boolean)
        .map((s) => escapeHtml(s as string))
        .join(", ");

      let marker = "";
      if (
        !markerDrawn &&
        previousReadMs !== undefined &&
        new Date(m.posted_at).getTime() > previousReadMs
      ) {
        marker = `<div class="read-marker"><span>você leu até aqui em ${escapeHtml(formatReadMark(previousRead!))}</span></div>`;
        markerDrawn = true;
      }

      return `${marker}
    <div class="card message${i === 0 ? " lead" : ""}">
      <div class="meta when">${formatDate(m.posted_at)}</div>
      <div class="body">${renderBody(m.body)}</div>
      <div class="signature">
        <span class="name">${escapeHtml(m.author)}</span>${affiliation ? `<span class="role">${affiliation}</span>` : ""}
      </div>
    </div>`;
    })
    .join("");

  return c.html(
    layout({
      title: t.title,
      currentMember: current ? { id: current.id, name: current.name } : null,
      allMembers: all.map((m) => ({ id: m.id, name: m.name })),
      body: `<h1>${escapeHtml(t.title)}</h1>${msgsHtml}`,
    })
  );
});

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("pt-BR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
}

function formatReadMark(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

/**
 * Convert plain-text message bodies into paragraph blocks. Blank lines
 * separate paragraphs; single line breaks become <br>. Keeps the body
 * server-rendered and safe (escapeHtml first).
 *
 * Extended syntax: [[fio:N]] on its own line renders an inline citation
 * card pointing at thread N. The card is rendered after escaping, using
 * trusted server-built HTML.
 */
function renderBody(raw: string): string {
  return raw
    .split(/\n{2,}/)
    .map((p) => {
      const trimmed = p.trim();
      const cite = trimmed.match(/^\[\[fio:(\d+)\]\]$/);
      if (cite) {
        const target = getThreadSummary(parseInt(cite[1], 10));
        if (target) return renderCitation(target);
        return `<p class="citation broken">[fio ${escapeHtml(cite[1])} não encontrado]</p>`;
      }
      return `<p>${escapeHtml(p).replace(/\n/g, "<br>")}</p>`;
    })
    .join("");
}

function renderCitation(t: { id: number; title: string; author: string; opener: string }): string {
  return `
    <a class="citation" href="/threads/${t.id}">
      <span class="citation-label">Fio citado</span>
      <span class="citation-title">${escapeHtml(t.title)}</span>
      <span class="citation-author">${escapeHtml(t.author)}</span>
      ${t.opener ? `<span class="citation-opener">“${escapeHtml(t.opener)}…”</span>` : ""}
    </a>`;
}
