# Architecture

## Overview

`dispatch-reliability-control-room` is a lightweight TypeScript + Express control room for modeling the operating layer between dispatch intake, handoff risk, route-adherence pressure, and SLA-safe intervention.

## Surfaces

- `overview`
  - dispatch count
  - urgent dispatch events
  - blocked handoffs
  - route risks
- `dispatch-lane`
  - dispatch-by-dispatch owner routing
  - queue excerpts
  - next action
  - SLA risk
- `handoff-risks`
  - blocker sources
  - evidence targets
  - owner readiness
- `route-adherence`
  - route posture
  - service-level impact
  - intervention windows
- `verification`
  - what the repo proves about mobility and transportation systems

## Data Model

- `DispatchIncident`
  - region, lane, issue type, owner, risk, next action
- `HandoffRisk`
  - blocker, owner, source, required evidence, readiness, service impact
- `RoutePosture`
  - market, service level, adherence score, status, blocker, intervention window

## Design Principle

Dispatch state should be inspectable by operations, service, and executive stakeholders. The system should explain:
- which dispatch queue is under pressure right now
- which handoff proof is still missing
- who owns the next move
- where SLA risk is building fastest
