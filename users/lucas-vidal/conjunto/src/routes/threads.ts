import { Hono } from "hono";
import { getThread, listMembers, listMessages, listThreads } from "../db.js";
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

  const msgsHtml = msgs
    .map(
      (m) => `
    <div class="card">
      <div class="meta"><strong>${escapeHtml(m.author)}</strong> · ${formatDate(m.posted_at)}</div>
      <div>${escapeHtml(m.body).replace(/\n/g, "<br>")}</div>
    </div>`
    )
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
