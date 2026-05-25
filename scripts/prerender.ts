import fs from "node:fs";
import path from "node:path";

import {
  dispatchLane,
  handoffRisks,
  payload,
  routeAdherence,
  summary,
  verification
} from "../src/services/dispatchReliabilityService";
import {
  renderDispatchLane,
  renderDocs,
  renderHandoffRisks,
  renderOverview,
  renderRouteAdherence,
  renderVerification
} from "../src/services/render";

const outputDir = path.resolve(__dirname, "..", "site");
fs.mkdirSync(outputDir, { recursive: true });
fs.mkdirSync(path.join(outputDir, "api"), { recursive: true });
fs.copyFileSync(path.resolve(__dirname, "..", "CNAME"), path.join(outputDir, "CNAME"));

const pages: Record<string, string> = {
  "index.html": renderOverview(),
  "dispatch-lane.html": renderDispatchLane(),
  "handoff-risks.html": renderHandoffRisks(),
  "route-adherence.html": renderRouteAdherence(),
  "verification.html": renderVerification(),
  "docs.html": renderDocs()
};

const rewrites: Array<[string, string]> = [
  ['href="/dispatch-lane"', 'href="dispatch-lane.html"'],
  ['href="/handoff-risks"', 'href="handoff-risks.html"'],
  ['href="/route-adherence"', 'href="route-adherence.html"'],
  ['href="/verification"', 'href="verification.html"'],
  ['href="/docs"', 'href="docs.html"']
];

for (const [filename, html] of Object.entries(pages)) {
  let content = html;
  for (const [from, to] of rewrites) {
    content = content.replaceAll(from, to);
  }
  fs.writeFileSync(path.join(outputDir, filename), content, "utf8");
}

const apiPayloads: Record<string, unknown> = {
  "api/dashboard/summary.json": summary(),
  "api/dispatch-lane.json": dispatchLane(),
  "api/handoff-risks.json": handoffRisks(),
  "api/route-adherence.json": routeAdherence(),
  "api/verification.json": verification(),
  "api/sample.json": payload()
};

for (const [filename, data] of Object.entries(apiPayloads)) {
  fs.mkdirSync(path.dirname(path.join(outputDir, filename)), { recursive: true });
  fs.writeFileSync(path.join(outputDir, filename), JSON.stringify(data, null, 2), "utf8");
}
