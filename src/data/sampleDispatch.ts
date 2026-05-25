export type DispatchIncident = {
  incidentId: string;
  region: string;
  lane: string;
  issueType: string;
  owner: string;
  nextAction: string;
  risk: "red" | "yellow" | "green";
  excerpt: string;
};

export type HandoffRisk = {
  riskId: string;
  blocker: string;
  owner: string;
  source: string;
  readiness: "red" | "yellow" | "green";
  requiredEvidence: string;
  serviceImpact: string;
  note: string;
};

export type RoutePosture = {
  routeId: string;
  market: string;
  serviceLevel: string;
  adherenceScore: number;
  status: "red" | "yellow" | "green";
  blocker: string;
  nextWindowMinutes: number;
  decisionNote: string;
};

export const dispatchIncidents: DispatchIncident[] = [
  {
    incidentId: "DSP-104",
    region: "Boston Core",
    lane: "Morning commercial",
    issueType: "Driver reassignment delay",
    owner: "Dispatch Lead",
    nextAction: "Re-route overflow stops to reserve driver pool",
    risk: "red",
    excerpt: "Primary route owner clocked out after an unplanned asset handoff and the reserve route has not been assigned."
  },
  {
    incidentId: "DSP-118",
    region: "Providence North",
    lane: "Field service",
    issueType: "Dock release lag",
    owner: "Partner Ops",
    nextAction: "Escalate dock release packet and reset ETA promises",
    risk: "yellow",
    excerpt: "Asset is staged but dock release confirmation still has not cleared the partner queue."
  },
  {
    incidentId: "DSP-132",
    region: "Metro West",
    lane: "Same-day priority",
    issueType: "Route drift cluster",
    owner: "Routing Analyst",
    nextAction: "Lock manual intervention window before SLA miss compounds",
    risk: "red",
    excerpt: "Three high-priority stops drifted off recommended sequence after traffic reroute and staffing pullback."
  },
  {
    incidentId: "DSP-149",
    region: "South Shore",
    lane: "Healthcare delivery",
    issueType: "Vehicle readiness check",
    owner: "Fleet Supervisor",
    nextAction: "Confirm replacement asset and release reserve route",
    risk: "yellow",
    excerpt: "Backup vehicle passed inspection but release note is still missing from the dispatch packet."
  }
];

export const handoffBlocks: HandoffRisk[] = [
  {
    riskId: "HR-21",
    blocker: "Dock handoff not released",
    owner: "Partner Ops",
    source: "Warehouse partner",
    readiness: "red",
    requiredEvidence: "Release scan, dock note, and revised ETA confirmation",
    serviceImpact: "Same-day SLA exposure",
    note: "The partner queue still shows the transfer packet as pending."
  },
  {
    riskId: "HR-28",
    blocker: "Reserve driver assignment gap",
    owner: "Dispatch Lead",
    source: "Driver management",
    readiness: "yellow",
    requiredEvidence: "Reserve assignment note and route acceptance event",
    serviceImpact: "Morning route spillover",
    note: "Dispatch coverage exists, but the reserve assignment has not been accepted yet."
  },
  {
    riskId: "HR-34",
    blocker: "Asset inspection note missing",
    owner: "Fleet Supervisor",
    source: "Fleet maintenance",
    readiness: "yellow",
    requiredEvidence: "Inspection checklist and vehicle release signoff",
    serviceImpact: "Route start delay",
    note: "Replacement vehicle is available, but release proof is incomplete."
  },
  {
    riskId: "HR-41",
    blocker: "Manual reroute waiting on customer promise reset",
    owner: "Customer Ops",
    source: "Service desk",
    readiness: "green",
    requiredEvidence: "Promise reset template and outbound notification log",
    serviceImpact: "Low if executed inside 15 minutes",
    note: "Everything is ready except the outbound customer notice."
  }
];

export const routePosture: RoutePosture[] = [
  {
    routeId: "R-07",
    market: "Boston Core",
    serviceLevel: "Two-hour priority",
    adherenceScore: 61,
    status: "red",
    blocker: "Driver reassignment plus traffic reroute",
    nextWindowMinutes: 28,
    decisionNote: "Prioritize overflow routing now or the next SLA window will break."
  },
  {
    routeId: "R-14",
    market: "Providence North",
    serviceLevel: "Same-day standard",
    adherenceScore: 76,
    status: "yellow",
    blocker: "Dock release lag",
    nextWindowMinutes: 44,
    decisionNote: "Customer promise reset should happen before partner delay becomes visible."
  },
  {
    routeId: "R-22",
    market: "Metro West",
    serviceLevel: "Healthcare critical",
    adherenceScore: 84,
    status: "yellow",
    blocker: "Reserve vehicle proof lag",
    nextWindowMinutes: 36,
    decisionNote: "Clear the release note and keep route continuity intact."
  },
  {
    routeId: "R-31",
    market: "South Shore",
    serviceLevel: "Next-day committed",
    adherenceScore: 93,
    status: "green",
    blocker: "No active blocker",
    nextWindowMinutes: 72,
    decisionNote: "No intervention needed beyond routine monitoring."
  }
];
