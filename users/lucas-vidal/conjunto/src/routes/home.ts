import { Hono } from "hono";
import { listThreads, listMembers, themeOf } from "../db.js";
import { getCurrentMember } from "../lib/auth.js";
import { escapeHtml, layout } from "../views/layout.js";

export const home = new Hono();

/**
 * Curator's dispatch — the editorial header of the home page. Hand-
 * written prose framed as a monthly edition. Lives here as a constant
 * for now; a future release moves this to a curator_notes table so
 * Lucas can edit without redeploy.
 */
const DISPATCH = {
  edition: "Maio · 2026",
  body: `Este mês o Conjunto atravessa três tensões recorrentes entre líderes técnicos: a promoção que demora, o ticket que a gente pega no calor, e a empresa que ajudamos a construir e ainda não sabemos se vamos deixar. Os fios abaixo abrem cada uma com calma. Não é para responder em três horas, é para acompanhar por semanas.`,
  byline: "Lucas Vidal, curador",
  featured: [
    {
      slug: "promocao-a-head-adiada",
      note: "Quatro meses de 'está perto'. O fio do André abre a pergunta que poucos têm coragem de fazer ao próprio CTO.",
    },
    {
      slug: "delegar-sem-virar-gargalo",
      note: "A Bia conhece o problema intelectualmente — e mesmo assim, toda semana, pega o ticket. O fio investiga por quê.",
    },
    {
      slug: "sair-de-empresa-que-construiu",
      note: "Cinco anos, time de oito contratado a dedo. O Caio separa cuidado legítimo de apego paralisante.",
    },
  ],
};

home.get("/", (c) => {
  const current = getCurrentMember(c);
  const all = listMembers();
  const recent = listThreads();

  const bySlug = new Map(recent.map((t) => [t.slug ?? "", t]));
  const featuredSlugs = new Set(DISPATCH.featured.map((f) => f.slug));
  const featuredHtml = DISPATCH.featured
    .map((f) => {
      const t = bySlug.get(f.slug);
      if (!t) return "";
      const th = themeOf(t.theme);
      const chip = th
        ? `<span class="theme-chip" style="--theme: ${th.hue}"><span class="dot"></span>${escapeHtml(th.label)}</span>`
        : "";
      return `
    <div class="featured">
      <p class="curator-note">${escapeHtml(f.note)}</p>
      ${chip}
      <h3><a href="/threads/${t.id}">${escapeHtml(t.title)}</a></h3>
      <div class="meta">aberto por ${escapeHtml(t.author)} · ${t.message_count} ${t.message_count === 1 ? "mensagem" : "mensagens"}</div>
    </div>`;
    })
    .join("");

  const otherHtml = recent
    .filter((t) => !featuredSlugs.has(t.slug ?? ""))
    .map((t) => {
      const th = themeOf(t.theme);
      const chip = th
        ? `<span class="theme-chip" style="--theme: ${th.hue}"><span class="dot"></span>${escapeHtml(th.label)}</span>`
        : "";
      return `
    <div class="card">
      ${chip}
      <h3><a href="/threads/${t.id}">${escapeHtml(t.title)}</a></h3>
      <div class="meta">aberto por ${escapeHtml(t.author)} · ${t.message_count} ${t.message_count === 1 ? "mensagem" : "mensagens"}</div>
    </div>`;
    })
    .join("");

  const body = /* html */ `
    <p class="eyebrow">Edição mensal</p>
    <h1 class="masthead">${escapeHtml(DISPATCH.edition)}</h1>
    <p class="lede">Comunidade fechada para líderes técnicos brasileiros.
    Encontros mensais ao vivo, fios temáticos assíncronos, biblioteca curada.
    Sem feed, sem timeline, sem barulho.</p>

    <div class="dispatch">
      <p>${escapeHtml(DISPATCH.body)}</p>
      <p class="byline">— ${escapeHtml(DISPATCH.byline)}</p>
    </div>

    <h2>Em destaque este mês</h2>
    ${featuredHtml}

    ${otherHtml ? `<h2>Outros fios em curso</h2>${otherHtml}` : ""}

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
