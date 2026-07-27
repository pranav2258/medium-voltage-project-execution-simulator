# Project Management Plan

## Work breakdown structure

1. **Initiation:** charter, stakeholder register, kickoff, contract handoff
2. **Planning:** requirements, scope baseline, WBS, schedule, budget, RAID, communication plan
3. **Engineering:** customer specifications, single-line review, submittals, comments, design freeze
4. **Procurement and manufacturing:** long-lead components, production, inspections, factory readiness
5. **Factory acceptance:** test procedure, FAT execution, findings, customer sign-off, shipment release
6. **Site execution:** delivery, receiving inspection, installation support, interfaces, field issues
7. **Commissioning:** point-to-point checks, relay verification, functional tests, SAT, punch list, energization
8. **Acceptance and closeout:** training, as-builts, manuals, warranties, final acceptance, financial reconciliation, lessons learned

## RACI

| Deliverable | PM | Engineering | Factory | Field Service | Customer | Customer Care |
|---|---|---|---|---|---|---|
| Scope and baseline | A/R | C | C | C | C | I |
| Approved drawings | A | R | C | C | C | I |
| Factory release | A | R | R | I | I | I |
| FAT | A | C | R | I | C | I |
| Site installation | A | C | I | R | C | I |
| SAT and energization | A | C | I | R | C | I |
| Training and acceptance | A | C | I | C | C | R |
| Financial closeout | A/R | I | I | I | C | I |

## Schedule control

- Weekly critical-path review using the baseline schedule in `data/schedule.csv`
- Red: milestone slip greater than 10 business days or outage-window impact
- Amber: forecast slip of 3–10 business days or unresolved predecessor risk
- Recovery actions require an owner, due date, forecast impact, and validation step

## Financial control

- Baseline: $2.84M internal cost budget
- Forecast at completion: updated weekly from actuals, open commitments, remaining work, approved changes, and quantified risk
- Change threshold: any scope change or cost impact requires documented review; customer-facing price/schedule changes require formal approval
- Closeout: reconcile invoices, commitments, accruals, contingency, change orders, and final margin

## RAID management

- Probability and impact are scored 1–5; exposure = probability × impact
- Scores 15–25 require weekly sponsor visibility and a dated response plan
- Scores 8–14 require active owner review
- Issues are escalated when they threaten a contractual milestone, customer acceptance, safety, or financial baseline

## Change control

1. Log request and business/technical reason.
2. Assess scope, schedule, cost, quality, safety, and customer impact.
3. Identify alternatives and recommendation.
4. Obtain internal and customer approval when applicable.
5. Update baselines, documents, risks, and stakeholder communications.
6. Validate implementation and close the change record.

## Quality and acceptance

No release gate is complete without approved evidence. Mandatory evidence includes approved drawings, FAT/SAT records, calibrated test equipment, resolved Category A punch items, final protection settings, training records, as-builts, and customer acceptance.
