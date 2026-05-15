import { Hono } from "hono";
import { avatarUrlFor, getMember, listMemberActivity, listMembers } from "../db.js";
import { getCurrentMember } from "../lib/auth.js";
import { escapeHtml, layout } from "../views/layout.js";

export const members = new Hono();

members.get("/", (c) => {
  const current = getCurrentMember(c);
  const all = listMembers();

  const html = all
    .map(
      (m) => `
    <div class="card member-row">
      <a class="avatar" href="/members/${m.id}" aria-hidden="true" tabindex="-1">
        <img src="${avatarUrlFor(m, 120)}" alt="" loading="lazy">
      </a>
      <div class="member-row-body">
        <h3><a href="/members/${m.id}">${escapeHtml(m.name)}</a></h3>
        <div class="meta">${escapeHtml(m.role)}${m.company ? ` · ${escapeHtml(m.company)}` : ""}</div>
      </div>
    </div>`
    )
    .join("");

  const groupPortrait = `
    <div class="group-portrait" aria-label="O Conjunto">
      ${all
        .map(
          (m) => `
        <a class="portrait-figure" href="/members/${m.id}">
          <img class="avatar" src="${avatarUrlFor(m, 160)}" alt="" loading="lazy">
          <span class="portrait-name">${escapeHtml(firstName(m.name))}</span>
        </a>`
        )
        .join("")}
    </div>`;

  return c.html(
    layout({
      title: "Membros",
      currentMember: current ? { id: current.id, name: current.name } : null,
      allMembers: all.map((m) => ({ id: m.id, name: m.name })),
      body: `<h1>Membros</h1><p class="lede">Os ${all.length} líderes técnicos que compõem o Conjunto.</p>${groupPortrait}<h2>Cada um</h2>${html}`,
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

  const activity = listMemberActivity(member.id, 30);
  const activityHtml = activity.length
    ? activity
        .map((a) => {
          const excerpt = excerptOf(a.body, 220);
          return `
      <div class="entry timeline-entry">
        <div class="meta when">${formatDateShort(a.posted_at)}</div>
        <h3><a href="/threads/${a.thread_id}">${escapeHtml(a.thread_title)}</a></h3>
        <p class="excerpt">${escapeHtml(excerpt)}</p>
      </div>`;
        })
        .join("")
    : `<p class="meta">Ainda não escreveu em fio algum.</p>`;

  const body = /* html */ `
    <div class="member-header">
      <img class="avatar avatar-lg" src="${avatarUrlFor(member, 320)}" alt="" loading="lazy">
      <div class="member-header-text">
        <h1>${escapeHtml(member.name)}</h1>
        <p class="meta">${escapeHtml(member.role)}${member.company ? ` · ${escapeHtml(member.company)}` : ""}</p>
        ${member.bio ? `<p class="lede">${escapeHtml(member.bio)}</p>` : ""}
        <p class="meta">No Conjunto desde ${formatDate(member.joined_at)}.</p>
      </div>
    </div>

    <h2>O que ${escapeHtml(firstName(member.name))} escreveu</h2>
    ${activityHtml}
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

function formatDateShort(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

function excerptOf(body: string, maxChars: number): string {
  const flat = body.replace(/\s+/g, " ").trim();
  return flat.length <= maxChars ? flat : flat.slice(0, maxChars).replace(/\s\S*$/, "") + "…";
}

function firstName(full: string): string {
  return full.split(" ")[0] ?? full;
}
