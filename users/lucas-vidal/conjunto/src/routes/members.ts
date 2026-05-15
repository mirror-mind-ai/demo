import { Hono } from "hono";
import { getMember, listMembers } from "../db.js";
import { getCurrentMember } from "../lib/auth.js";
import { escapeHtml, layout } from "../views/layout.js";

export const members = new Hono();

members.get("/", (c) => {
  const current = getCurrentMember(c);
  const all = listMembers();

  const html = all
    .map(
      (m) => `
    <div class="card">
      <h3><a href="/members/${m.id}">${escapeHtml(m.name)}</a></h3>
      <div class="meta">${escapeHtml(m.role)}${m.company ? ` · ${escapeHtml(m.company)}` : ""}</div>
    </div>`
    )
    .join("");

  return c.html(
    layout({
      title: "Membros",
      currentMember: current ? { id: current.id, name: current.name } : null,
      allMembers: all.map((m) => ({ id: m.id, name: m.name })),
      body: `<h1>Membros</h1><p class="lede">Os sete líderes técnicos que compõem o Conjunto.</p>${html}`,
    })
  );
});

members.get("/:id", (c) => {
  const id = parseInt(c.req.param("id"), 10);
  const member = isNaN(id) ? undefined : getMember(id);
  if (!member) {
    c.status(404);
    return c.html("Membro não encontrado.");
  }
  const current = getCurrentMember(c);
  const all = listMembers();

  const body = /* html */ `
    <h1>${escapeHtml(member.name)}</h1>
    <p class="meta">${escapeHtml(member.role)}${member.company ? ` · ${escapeHtml(member.company)}` : ""}</p>
    ${member.bio ? `<p>${escapeHtml(member.bio)}</p>` : ""}
    <p class="meta">No Conjunto desde ${formatDate(member.joined_at)}.</p>
  `;

  return c.html(
    layout({
      title: member.name,
      currentMember: current ? { id: current.id, name: current.name } : null,
      allMembers: all.map((m) => ({ id: m.id, name: m.name })),
      body,
    })
  );
});

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}
