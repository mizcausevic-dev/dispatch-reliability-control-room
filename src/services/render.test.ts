import { describe, expect, test } from "vitest";

import {
  renderDispatchLane,
  renderDocs,
  renderHandoffRisks,
  renderOverview,
  renderRouteAdherence,
  renderVerification
} from "./render";
import {
  dispatchIncidents,
  handoffBlocks,
  routePosture
} from "../data/sampleDispatch";

const renderers = [
  ["overview", renderOverview],
  ["dispatch-lane", renderDispatchLane],
  ["handoff-risks", renderHandoffRisks],
  ["route-adherence", renderRouteAdherence],
  ["verification", renderVerification],
  ["docs", renderDocs]
] as const;

describe("render", () => {
  test.each(renderers)("%s produces a full HTML document with nav", (_label, fn) => {
    const html = fn();
    expect(html.startsWith("<!DOCTYPE html>")).toBe(true);
    expect(html).toContain("</html>");
    expect(html).toContain("Dispatch Reliability Control Room");
    expect(html).toContain('href="/dispatch-lane"');
    expect(html).toContain('href="/docs"');
  });

  test("overview surfaces the dispatch summary stat grid", () => {
    const html = renderOverview();
    expect(html).toContain("Dispatches in play");
    expect(html).toContain("Blocked handoffs");
  });

  test("dispatch lane lists every incident with a risk tag", () => {
    const html = renderDispatchLane();
    for (const item of dispatchIncidents) {
      expect(html).toContain(item.incidentId);
    }
    expect(html).toContain('class="tag red"');
  });

  test("handoff risks show blocks and all readiness tag classes", () => {
    const html = renderHandoffRisks();
    for (const block of handoffBlocks) {
      expect(html).toContain(block.riskId);
    }
    expect(html).toContain('class="tag red"');
    expect(html).toContain('class="tag green"');
    expect(html).toContain('class="tag yellow"');
  });

  test("route adherence shows routes and adherence scores", () => {
    const html = renderRouteAdherence();
    for (const route of routePosture) {
      expect(html).toContain(route.routeId);
      expect(html).toContain(String(route.adherenceScore));
    }
  });

  test("verification renders proof statements", () => {
    const html = renderVerification();
    expect(html).toContain("Verification");
  });

  test("docs page enumerates the route surface", () => {
    const html = renderDocs();
    expect(html).toContain("/handoff-risks");
    expect(html).toContain("/route-adherence");
  });
});
