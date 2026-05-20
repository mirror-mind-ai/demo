/**
 * Auth simulada para o MVP. Cookie `conjunto_member` guarda o id do
 * membro ativo. Trocar de membro é uma operação aberta na home.
 *
 * No plano da v0.2.0, isso vira magic link via email, com sessão real.
 * Por enquanto, é teatro útil: o produto opera como se o membro
 * estivesse logado, mas qualquer um pode encarnar qualquer membro.
 * Aceitável para uma comunidade fechada de sete pessoas em estágio de
 * MVP interno; insuportável quando abrir externamente.
 *
 * Decisão registrada em docs/project/decisions.md (D3).
 */

import type { Context, MiddlewareHandler } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import { db, getMember, listMembers, type Member } from "../db.js";

const COOKIE = "conjunto_member";

export function getCurrentMember(c: Context): Member | null {
  const raw = getCookie(c, COOKIE);
  if (!raw) return null;
  const id = parseInt(raw, 10);
  if (isNaN(id)) return null;
  return getMember(id) ?? null;
}

export function setCurrentMember(c: Context, id: number): void {
  setCookie(c, COOKIE, String(id), {
    httpOnly: true,
    sameSite: "Lax",
    maxAge: 60 * 60 * 24 * 30,
  });
}

/**
 * Middleware que garante que sempre existe um membro ativo. Se o
 * cookie não estiver setado, escolhe o primeiro membro do banco e seta
 * automaticamente. Sem login wall na demo.
 */
export const ensureMember: MiddlewareHandler = async (c, next) => {
  let current = getCurrentMember(c);
  if (!current) {
    const all = listMembers();
    if (all.length > 0) {
      current = all[0];
      setCurrentMember(c, current.id);
    }
  }
  if (current) {
    db.prepare("UPDATE members SET last_seen_at = CURRENT_TIMESTAMP WHERE id = ?").run(current.id);
  }
  c.set("currentMember", current);
  await next();
};
