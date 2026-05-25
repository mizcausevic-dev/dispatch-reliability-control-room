# Dispatch Reliability Control Room

TypeScript control room for dispatch readiness, route adherence pressure, handoff gaps, and SLA-safe intervention across mobility and transportation operations.

## Why this exists

- Dispatch teams lose trust when late handoffs, route drift, and driver constraints live in separate screens.
- Transportation operators need to see whether a delay is caused by staffing, routing, asset readiness, or downstream dock capacity.
- Revenue and service teams care whether the next dispatch decision protects SLA commitments before customers feel the miss.
- Mobility buyers want operator tooling that turns dispatch noise into queue ownership, intervention posture, and measurable reliability recovery.

## Why this matters (KG Embedded tie-back)

This repo demonstrates the dispatch-reliability primitive for Mobility / Transportation buyers: route exceptions, handoff blockers, and SLA pressure tied into one operator surface. A B2B SaaS buyer would care because dispatch, route, and partner data often need to surface inside customer-facing products without exposing unsafe write paths or fragmented event evidence. Kinetic Gain Embedded extends this into security-first in-product analytics for fleet, field, and service operations workflows, see [kineticgain.com/embedded](https://kineticgain.com/embedded).

## Routes

- `/`
- `/dispatch-lane`
- `/handoff-risks`
- `/route-adherence`
- `/verification`
- `/docs`

## API

- `/api/dashboard/summary`
- `/api/dispatch-lane`
- `/api/handoff-risks`
- `/api/route-adherence`
- `/api/verification`
- `/api/sample`

## Screenshots

![Overview](./screenshots/01-overview-proof.png)
![Detail view 1](./screenshots/02-dispatch-lane-proof.png)
![Detail view 2](./screenshots/03-handoff-risks-proof.png)
![Detail view 3](./screenshots/04-route-adherence-proof.png)

## Local Development

```powershell
cd dispatch-reliability-control-room
npm install
npm run dev
```

Open:
- [http://127.0.0.1:5488/](http://127.0.0.1:5488/)
- [http://127.0.0.1:5488/dispatch-lane](http://127.0.0.1:5488/dispatch-lane)
- [http://127.0.0.1:5488/handoff-risks](http://127.0.0.1:5488/handoff-risks)
- [http://127.0.0.1:5488/route-adherence](http://127.0.0.1:5488/route-adherence)
- [http://127.0.0.1:5488/verification](http://127.0.0.1:5488/verification)

## Validation

- `npm run build`
- `npm run test`
- `npm run demo`
- `npm run smoke`
- `npm run render:assets`

## Docs

- [Architecture](./docs/architecture.md)
- [Origin](./docs/ORIGIN.md)
- [Kinetic Gain Embedded tie-back](./docs/KINETIC_GAIN_EMBEDDED.md)
- [Changelog](./CHANGELOG.md)
