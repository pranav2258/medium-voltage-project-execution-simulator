# Medium-Voltage Project Execution Simulator

A completed, end-to-end educational simulation of a **$3.10M municipal medium-voltage substation expansion**. The project demonstrates how an Associate Project Manager can control scope, schedule, budget, risk, customer communications, commissioning, acceptance, and closeout across a matrix organization.

> All organizations, commercial values, equipment records, dates, and project events are synthetic. The simulator is a portfolio demonstration and is not an engineered design package.

## Live application

The deployed dashboard presents five connected project-control views:

- **Overview:** project health, contract value, forecast at completion, scope, simplified single-line diagram, milestone outlook, and budget control
- **Schedule:** stage-gate plan from kickoff through financial closeout
- **RAID & Change:** quantified risk register, owner/action tracking, issue escalation, and approved change impact
- **Commissioning:** FAT/SAT and energization readiness gates with punch-list control
- **Closeout:** customer acceptance package, documentation status, and lessons learned

The dashboard includes an interactive readiness checklist, RAID filters, and a downloadable JSON status snapshot.

## Scenario

**Project MV-24 — North Carolina Municipal Substation Expansion**

- 12.47 kV utility incoming feeder
- 15 kV metal-clad switchgear lineup with vacuum breakers
- Four relay-protected outgoing feeders
- 5 MVA distribution transformer interface
- Engineering, factory release, FAT, delivery, installation, SAT, energization, customer training, acceptance, and financial closeout

## Project-management artifact set

| Artifact | Purpose |
|---|---|
| [Project charter](docs/project-charter.md) | Business need, objectives, scope, success measures, constraints, governance |
| [Project management plan](docs/project-management-plan.md) | WBS, stage gates, RACI, RAID, change control, financial control |
| [Customer communication plan](docs/customer-communication-plan.md) | Cadence, audiences, status reports, meeting minutes, escalations |
| [Commissioning and acceptance plan](docs/commissioning-acceptance-plan.md) | FAT, receiving inspection, SAT, energization, punch list, acceptance |
| [Closeout checklist](docs/closeout-checklist.md) | Technical, customer, commercial, and lessons-learned closure |
| [Baseline schedule](data/schedule.csv) | Owners, dates, dependencies, status, critical-path flags |
| [Budget](data/budget.csv) | Baseline, actual, forecast, and variance by control account |
| [RAID register](data/raid-register.csv) | Risks, issues, assumptions, decisions, scores, responses, owners |
| [Change log](data/change-log.csv) | Scope, cost, schedule, approval, and implementation status |
| [Punch list](data/punch-list.csv) | Commissioning findings, category, owner, due date, closure evidence |

## Controls demonstrated

- Project lifecycle ownership from initiation through closeout
- Work breakdown structure, dependencies, critical path, milestones, and schedule recovery
- Cost baseline, forecast at completion, contingency, and change-order impacts
- RAID scoring, action ownership, escalation thresholds, and decision traceability
- Customer-facing status reporting, change proposals, meeting minutes, and action logs
- Factory and site acceptance testing, commissioning gates, punch-list closure, and energization readiness
- Customer documentation, training, final acceptance, invoice reconciliation, and lessons learned

## Run locally

```bash
pnpm install
pnpm dev
```

Production validation:

```bash
pnpm test
```

## Technology

Next.js-compatible React, TypeScript, CSS, vinext, Vite, and Cloudflare-compatible deployment output.

## Author

Pranav Chavan — [Portfolio](https://pranav2258.github.io/) · [GitHub](https://github.com/pranav2258)
