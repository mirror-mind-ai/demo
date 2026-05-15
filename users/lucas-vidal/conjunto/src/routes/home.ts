import { Hono } from "hono";
import { listThreads, listMembers } from "../db.js";
import { getCurrentMember } from "../lib/auth.js";
import { escapeHtml, layout } from "../views/layout.js";

export const home = new Hono();

home.get("/", (c) => {
  const current = getCurrentMember(c);
  const all = listMembers();
  const threads = listThreads().slice(0, 6);

  const threadsHtml = threads
    .map(
      (t) => `
    <div class="card">
      <h3><a href="/threads/${t.id}">${escapeHtml(t.title)}</a></h3>
      <div class="meta">aberto por ${escapeHtml(t.author)} · ${t.message_count} ${t.message_count === 1 ? "mensagem" : "mensagens"}</div>
    </div>`
    )
    .join("");

  const body = /* html */ `
    <h1>Conjunto</h1>
    <p class="lede">Comunidade fechada para líderes técnicos brasileiros.
    Encontros mensais ao vivo, fios temáticos assíncronos, biblioteca curada.
    Sem feed, sem timeline, sem barulho.</p>

    <h2>Fios recentes</h2>
    ${threadsHtml || "<p>Nenhum fio aberto ainda.</p>"}

    <p class="meta" style="margin-top:2.4rem">
      Ver <a href="/threads">todos os fios</a> · <a href="/members">membros</a> · <a href="/docs">documentação</a>
    </p>
  `;

  return c.html(
    layout({
      title: "Início",
      currentMember: current ? { id: current.id, name: current.name } : null,
      allMembers: all.map((m) => ({ id: m.id, name: m.name })),
      body,
    })
  );
});
