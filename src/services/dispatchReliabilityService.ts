import { dispatchIncidents, handoffBlocks, routePosture } from "../data/sampleDispatch";

export function summary() {
  return {
    dispatchCount: dispatchIncidents.length,
    urgentDispatches: dispatchIncidents.filter((item) => item.risk === "red").length,
    blockedHandoffs: handoffBlocks.filter((item) => item.readiness !== "green").length,
    routeRisks: routePosture.filter((item) => item.status !== "green").length,
    recommendation:
      "Stabilize reserve-driver assignments and dock handoffs first so dispatch reliability recovers before SLA misses spill into customer-visible churn."
  };
}

export function dispatchLane() {
  return dispatchIncidents;
}

export function handoffRisks() {
  return handoffBlocks;
}

export function routeAdherence() {
  return routePosture;
}

export function verification() {
  return [
    "Dispatch queues map exceptions to owners, not just route IDs.",
    "Handoff blockers surface the evidence needed before the next service promise breaks.",
    "Route posture ties SLA exposure to a concrete intervention window.",
    "The control room is buyer-readable and safe for embedded analytics tie-back.",
    "Synthetic data only; no rider, driver, or live transport records are included."
  ];
}

export function payload() {
  return {
    summary: summary(),
    incidents: dispatchLane(),
    rules: handoffRisks(),
    routePosture: routeAdherence(),
    verification: verification()
  };
}
