/**
 * Conjunto — server entry.
 *
 * Hono sobre @hono/node-server. Sobe na porta 3030 por padrão (override
 * via PORT). Sem cluster, sem PM2: para o MVP, um processo basta.
 */

import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { ensureMember } from "./lib/auth.js";
import { auth } from "./routes/auth.js";
import { docs } from "./routes/docs.js";
import { home } from "./routes/home.js";
import { members } from "./routes/members.js";
import { threads } from "./routes/threads.js";

const app = new Hono();

app.use("*", logger());
app.use("*", ensureMember);

app.route("/", home);
app.route("/auth", auth);
app.route("/members", members);
app.route("/threads", threads);
app.route("/docs", docs);

app.get("/health", (c) => c.text("ok"));

const port = Number(process.env.PORT ?? 3030);

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`Conjunto rodando em http://localhost:${info.port}`);
});
