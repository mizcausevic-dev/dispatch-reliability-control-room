import {
  dispatchLane,
  handoffRisks,
  routeAdherence,
  summary,
  verification
} from "./dispatchReliabilityService";

function layout(title: string, body: string) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <style>
      :root { color-scheme: dark; --bg: #091420; --panel: #11202d; --panel-2: #172a39; --text: #e8f1f7; --muted: #9cb0bf; --accent: #60d7ff; --good: #56dca2; --warn: #ffca54; --bad: #ff7f7f; }
      * { box-sizing: border-box; }
      body { margin: 0; font-family: "Segoe UI", Arial, sans-serif; background: radial-gradient(circle at top, #12314a 0%, var(--bg) 52%); color: var(--text); }
      a { color: inherit; text-decoration: none; }
      .shell { width: min(1180px, calc(100vw - 40px)); margin: 28px auto 40px; }
      .topbar, .card, .table-wrap { background: rgba(17, 32, 45, 0.94); border: 1px solid rgba(156, 176, 191, 0.16); border-radius: 26px; box-shadow: 0 24px 80px rgba(0, 0, 0, 0.25); }
      .topbar { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 18px; padding: 28px 30px; }
      .brand { display: flex; gap: 18px; align-items: flex-start; max-width: 720px; }
      .badge { width: 58px; height: 58px; border-radius: 16px; display: grid; place-items: center; background: linear-gradient(135deg, rgba(96, 215, 255, 0.35), rgba(86, 220, 162, 0.2)); font-weight: 800; letter-spacing: 0.08em; }
      .eyebrow { color: var(--muted); text-transform: uppercase; letter-spacing: 0.2em; font-size: 12px; }
      h1, h2, h3, p { margin: 0; }
      h1 { margin-top: 6px; font: 700 42px/1.05 Georgia, serif; }
      .brand p { margin-top: 10px; color: var(--muted); max-width: 620px; font-size: 17px; line-height: 1.6; }
      nav { display: flex; flex-wrap: wrap; gap: 12px; align-content: flex-start; }
      nav a { padding: 12px 16px; border-radius: 999px; border: 1px solid rgba(156, 176, 191, 0.16); color: var(--muted); font-weight: 600; }
      nav a.active { color: var(--bg); background: linear-gradient(135deg, var(--accent), #96f2cb); }
      .section { padding: 30px; }
      .card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 18px; }
      .stat-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin-top: 22px; }
      .stat { padding: 18px; border-radius: 22px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(156, 176, 191, 0.12); }
      .stat label { display: block; color: var(--muted); font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; }
      .stat strong { display: block; margin-top: 10px; font-size: 36px; }
      .stat span { display: block; margin-top: 8px; color: var(--muted); line-height: 1.5; }
      .table-wrap { overflow: hidden; margin-top: 22px; }
      table { width: 100%; border-collapse: collapse; }
      th, td { padding: 16px 18px; text-align: left; border-bottom: 1px solid rgba(156, 176, 191, 0.12); vertical-align: top; }
      th { color: var(--muted); font-size: 12px; text-transform: uppercase; letter-spacing: 0.14em; }
      td { line-height: 1.5; }
      tr:last-child td { border-bottom: none; }
      .tag { display: inline-flex; padding: 6px 10px; border-radius: 999px; font-weight: 700; text-transform: uppercase; font-size: 11px; letter-spacing: 0.12em; }
      .tag.red { background: rgba(255, 127, 127, 0.18); color: var(--bad); }
      .tag.yellow { background: rgba(255, 202, 84, 0.18); color: var(--warn); }
      .tag.green { background: rgba(86, 220, 162, 0.18); color: var(--good); }
      .list { display: grid; gap: 14px; }
      .item { padding: 18px; border-radius: 20px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(156, 176, 191, 0.12); }
      .item p, .footer-note { margin-top: 8px; color: var(--muted); line-height: 1.6; }
      .section-grid { display: grid; grid-template-columns: 1.3fr 0.9fr; gap: 22px; margin-top: 22px; }
      code { color: var(--accent); }
      @media (max-width: 960px) { .section-grid, .stat-grid { grid-template-columns: 1fr; } h1, h2 { font-size: 34px !important; } .shell { width: min(100vw - 24px, 1180px); } .topbar, .section { padding: 22px; } }
    </style>
  </head>
  <body>
    <div class="shell">${body}</div>
  </body>
</html>`;
}

function topbar(active: string) {
  const links = [
    { href: "/", label: "Overview" },
    { href: "/dispatch-lane", label: "Dispatch Lane" },
    { href: "/handoff-risks", label: "Handoff Risks" },
    { href: "/route-adherence", label: "Route Adherence" },
    { href: "/verification", label: "Verification" },
    { href: "/docs", label: "Docs" }
  ];

  return `<div class="topbar"><div class="brand"><div class="badge">KG</div><div><div class="eyebrow">Dispatch Reliability Control Room</div><h1>Mobility dispatch and SLA control plane</h1><p>Dispatch queues, handoff blockers, route adherence pressure, and intervention posture in one operator surface.</p></div></div><nav>${links.map((link) => `<a class="${active === link.href ? "active" : ""}" href="${link.href}">${link.label}</a>`).join("")}</nav></div>`;
}

function stateClass(value: "red" | "yellow" | "green") {
  return value;
}

export function renderOverview() {
  const metrics = summary();
  return layout("Dispatch Reliability Control Room", `${topbar("/")}
    <div class="card section">
      <div class="eyebrow">Overview</div>
      <h2 style="margin: 6px 0 10px; font: 700 48px/1 Georgia, serif;">Dispatch reliability fails when route pressure, handoff blockers, and SLA promises are split apart.</h2>
      <p>This control room makes the operating layer explicit: which dispatches are breaking, which handoffs are still blocked, and which route windows need intervention before customers feel the miss.</p>
      <div class="stat-grid">
        <div class="stat"><label>Dispatches in play</label><strong>${metrics.dispatchCount}</strong><span>Active incidents tied to region, owner, and next action.</span></div>
        <div class="stat"><label>Urgent dispatches</label><strong>${metrics.urgentDispatches}</strong><span>Red incidents where SLA exposure is already building.</span></div>
        <div class="stat"><label>Blocked handoffs</label><strong>${metrics.blockedHandoffs}</strong><span>Partner, fleet, or staffing blockers still waiting on proof.</span></div>
        <div class="stat"><label>Route risks</label><strong>${metrics.routeRisks}</strong><span>Routes with visible adherence pressure and intervention windows.</span></div>
      </div>
      <div class="footer-note">${metrics.recommendation}</div>
    </div>`);
}

export function renderDispatchLane() {
  return layout("Dispatch Reliability Control Room — Dispatch Lane", `${topbar("/dispatch-lane")}<div class="card section"><div class="eyebrow">Dispatch Lane</div><h2 style="margin: 6px 0 10px; font: 700 46px/1 Georgia, serif;">The queue should show which route is slipping, why, and who owns the next move.</h2><p>Each row ties dispatch context to the customer risk, blocker source, and next action needed to preserve service reliability.</p></div><div class="table-wrap section"><table><thead><tr><th>Dispatch</th><th>Excerpt</th><th>Owner</th><th>Next Action</th><th>Risk</th></tr></thead><tbody>${dispatchLane().map((item)=>`<tr><td><strong>${item.region}</strong><br />${item.incidentId}<br />${item.issueType}</td><td>${item.excerpt}</td><td>${item.owner}</td><td>${item.nextAction}</td><td><span class="tag ${stateClass(item.risk)}">${item.risk}</span></td></tr>`).join("")}</tbody></table></div>`);
}

export function renderHandoffRisks() {
  return layout("Dispatch Reliability Control Room — Handoff Risks", `${topbar("/handoff-risks")}<div class="card section"><div class="eyebrow">Handoff Risks</div><h2 style="margin: 6px 0 10px; font: 700 46px/1 Georgia, serif;">Most dispatch failures are actually handoff failures with a missing proof packet.</h2><p>This lane maps blocker sources to required evidence, owner lanes, readiness, and the service impact if the handoff stays unresolved.</p></div><div class="section-grid"><div class="table-wrap section"><table><thead><tr><th>Blocker</th><th>Required Evidence</th><th>Owner</th><th>Readiness</th></tr></thead><tbody>${handoffRisks().map((item)=>`<tr><td><strong>${item.blocker}</strong><br />${item.source}<br />${item.serviceImpact}</td><td>${item.requiredEvidence}</td><td>${item.owner}</td><td><span class="tag ${stateClass(item.readiness)}">${item.readiness}</span></td></tr>`).join("")}</tbody></table></div><div class="card section"><div class="eyebrow">Dependency Blockers</div><h3>Where dispatch recovery is likely to stall.</h3><div class="list">${handoffRisks().map((item)=>`<div class="item"><strong>${item.riskId} · ${item.owner}</strong><p>${item.note}</p><span>${item.source} · ${item.serviceImpact}</span></div>`).join("")}</div></div></div>`);
}

export function renderRouteAdherence() {
  return layout("Dispatch Reliability Control Room — Route Adherence", `${topbar("/route-adherence")}<div class="card section"><div class="eyebrow">Route Adherence</div><h2 style="margin: 6px 0 10px; font: 700 46px/1 Georgia, serif;">Route posture matters when the next intervention window is shorter than the next customer promise.</h2><p>This lane surfaces which routes are stable, which still have blockers, and where service-level risk needs immediate human intervention.</p></div><div class="card-grid" style="margin-top: 22px;">${routeAdherence().map((route)=>`<div class="card section"><div class="eyebrow">${route.routeId}</div><h3>${route.market}</h3><div class="stat-grid" style="grid-template-columns: repeat(2, minmax(0, 1fr)); margin-top: 0;"><div class="stat"><label>Adherence</label><strong style="font-size: 30px;">${route.adherenceScore}%</strong><span>${route.serviceLevel}</span></div><div class="stat"><label>Status</label><strong style="font-size: 30px;"><span class="tag ${stateClass(route.status)}">${route.status}</span></strong><span>${route.blocker}</span></div></div><div class="footer-note">${route.nextWindowMinutes} minutes to next intervention window · ${route.decisionNote}</div></div>`).join("")}</div>`);
}

export function renderVerification() {
  return layout("Dispatch Reliability Control Room — Verification", `${topbar("/verification")}<div class="card section"><div class="eyebrow">Verification</div><h2 style="margin: 6px 0 10px; font: 700 46px/1 Georgia, serif;">What this repo proves about dispatch reliability and transportation systems.</h2><div class="list">${verification().map((item)=>`<div class="item"><strong>${item}</strong></div>`).join("")}</div></div>`);
}

export function renderDocs() {
  return layout("Dispatch Reliability Control Room — Docs", `${topbar("/docs")}<div class="card section"><div class="eyebrow">Docs</div><h2 style="margin: 6px 0 10px; font: 700 46px/1 Georgia, serif;">A control room for dispatch queues, handoff blockers, and route-safe recovery.</h2><p>This repo models the operating layer between dispatch intake and service reliability: queue visibility, handoff evidence, route-adherence posture, SLA pressure, and operator-safe interventions.</p><div class="footer-note">Routes: <code>/</code> · <code>/dispatch-lane</code> · <code>/handoff-risks</code> · <code>/route-adherence</code> · <code>/verification</code> · <code>/docs</code></div></div>`);
}
