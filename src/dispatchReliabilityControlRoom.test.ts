import { describe, expect, test } from "vitest";

import {
  dispatchLane,
  handoffRisks,
  routeAdherence,
  summary,
  verification
} from "./services/dispatchReliabilityService";

describe("dispatch-reliability-control-room", () => {
  test("returns a route recommendation", () => {
    expect(summary().recommendation).toMatch(/dispatch/i);
  });

  test("maps dispatch and handoff records", () => {
    expect(dispatchLane().length).toBeGreaterThan(2);
    expect(handoffRisks().some((risk) => risk.readiness === "red")).toBe(true);
  });

  test("verification posture stays buyer-readable", () => {
    expect(routeAdherence().every((route) => route.serviceLevel.length > 0)).toBe(true);
    expect(verification().some((item) => item.toLowerCase().includes("dispatch"))).toBe(true);
  });
});
