import { Hono } from "hono";
import { setCurrentMember } from "../lib/auth.js";

export const auth = new Hono();

auth.post("/switch", async (c) => {
  const body = await c.req.parseBody();
  const id = parseInt(String(body.member_id ?? ""), 10);
  if (!isNaN(id)) {
    setCurrentMember(c, id);
  }
  const back = c.req.header("Referer") ?? "/";
  return c.redirect(back);
});
