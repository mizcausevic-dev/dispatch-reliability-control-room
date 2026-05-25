// SPDX-License-Identifier: AGPL-3.0-or-later

import express from "express";

import {
  dispatchLane,
  handoffRisks,
  payload,
  routeAdherence,
  summary,
  verification
} from "./services/dispatchReliabilityService";
import {
  renderDispatchLane,
  renderDocs,
  renderHandoffRisks,
  renderOverview,
  renderRouteAdherence,
  renderVerification
} from "./services/render";

const app = express();
const port = Number(process.env.PORT ?? 5488);
const host = process.env.HOST || "0.0.0.0";

app.get("/", (_req, res) => res.type("html").send(renderOverview()));
app.get("/dispatch-lane", (_req, res) => res.type("html").send(renderDispatchLane()));
app.get("/handoff-risks", (_req, res) => res.type("html").send(renderHandoffRisks()));
app.get("/route-adherence", (_req, res) => res.type("html").send(renderRouteAdherence()));
app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
app.get("/api/dispatch-lane", (_req, res) => res.json(dispatchLane()));
app.get("/api/handoff-risks", (_req, res) => res.json(handoffRisks()));
app.get("/api/route-adherence", (_req, res) => res.json(routeAdherence()));
app.get("/api/verification", (_req, res) => res.json(verification()));
app.get("/api/sample", (_req, res) => res.json(payload()));

if (require.main === module) {
  app.listen(port, host, () => {
    console.log(`Dispatch Reliability Control Room listening on http://${host}:${port}`);
  });
}

export default app;
