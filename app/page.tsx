"use client";

import { useMemo, useState } from "react";

type Tab = "overview" | "schedule" | "raid" | "commissioning" | "closeout";

const milestones = [
  { name: "Project kickoff", date: "03 Feb", status: "Complete", pct: 100 },
  { name: "Customer drawing approval", date: "28 Feb", status: "Complete", pct: 100 },
  { name: "Factory release", date: "18 Apr", status: "Complete", pct: 100 },
  { name: "FAT & shipment", date: "20 Jun", status: "Complete", pct: 100 },
  { name: "Site installation", date: "18 Jul", status: "At risk", pct: 78 },
  { name: "SAT & energization", date: "08 Aug", status: "Planned", pct: 22 },
  { name: "Customer acceptance", date: "22 Aug", status: "Planned", pct: 8 },
  { name: "Financial closeout", date: "05 Sep", status: "Planned", pct: 0 },
];

const risks = [
  { id: "R-07", item: "Relay delivery may miss installation window", owner: "Supply Chain", score: 16, response: "Expedite vendor; approve alternate relay", state: "Mitigating" },
  { id: "R-11", item: "Customer cable schedule revision", owner: "Engineering", score: 12, response: "Freeze interface dates; weekly design review", state: "Open" },
  { id: "I-04", item: "Two damaged CT terminal blocks at receiving", owner: "Factory", score: 9, response: "Replacement kit shipped; field install planned", state: "Closing" },
  { id: "D-03", item: "Use revised arc-flash labels before energization", owner: "Customer", score: 6, response: "Approved in change review CR-003", state: "Decided" },
];

const gates = [
  { label: "Approved drawings & submittals", done: true, owner: "Engineering" },
  { label: "Factory acceptance test signed", done: true, owner: "Quality" },
  { label: "Equipment receiving inspection", done: true, owner: "Site Lead" },
  { label: "Protection settings verified", done: true, owner: "Protection Eng." },
  { label: "Punch list category A closed", done: false, owner: "Field Service" },
  { label: "Customer training completed", done: false, owner: "Customer Care" },
  { label: "Final acceptance certificate", done: false, owner: "Customer" },
  { label: "Financial closeout complete", done: false, owner: "Project Manager" },
];

const budget = [
  { label: "Equipment", baseline: 1780, forecast: 1812 },
  { label: "Engineering", baseline: 310, forecast: 298 },
  { label: "Field service", baseline: 420, forecast: 447 },
  { label: "Freight & logistics", baseline: 145, forecast: 158 },
  { label: "Contingency", baseline: 185, forecast: 121 },
];

function money(value: number) {
  return `$${value.toLocaleString()}k`;
}

export default function Home() {
  const [tab, setTab] = useState<Tab>("overview");
  const [riskFilter, setRiskFilter] = useState("All");
  const [checked, setChecked] = useState(() => gates.map((g) => g.done));
  const [notice, setNotice] = useState("");

  const filteredRisks = useMemo(
    () => risks.filter((r) => riskFilter === "All" || r.state === riskFilter),
    [riskFilter],
  );
  const gateProgress = Math.round((checked.filter(Boolean).length / checked.length) * 100);
  const baseline = budget.reduce((sum, row) => sum + row.baseline, 0);
  const forecast = budget.reduce((sum, row) => sum + row.forecast, 0);

  function exportSnapshot() {
    const payload = {
      project: "MV-24 North Carolina Municipal Substation Expansion",
      generated: new Date().toISOString(),
      health: "AMBER",
      scheduleComplete: 87,
      baselineBudgetK: baseline,
      forecastAtCompletionK: forecast,
      readiness: gateProgress,
      openRisks: risks.filter((r) => r.state !== "Decided").length,
      milestones,
      risks,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "mv24-project-status-snapshot.json";
    anchor.click();
    URL.revokeObjectURL(url);
    setNotice("Project snapshot exported");
    window.setTimeout(() => setNotice(""), 2400);
  }

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Gridline home">
          <span className="brand-mark">G</span>
          <span><strong>GRIDLINE</strong><small>PROJECT CONTROL</small></span>
        </a>
        <div className="header-actions">
          <span className="simulation">Educational simulation · Synthetic data</span>
          <a className="ghost-button" href="https://github.com/pranav2258/medium-voltage-project-execution-simulator" target="_blank" rel="noreferrer">View repository</a>
          <button className="primary-button" onClick={exportSnapshot}>Export status</button>
        </div>
      </header>

      <section className="hero" id="top">
        <div>
          <p className="eyebrow">PROJECT MV-24 · MEDIUM-VOLTAGE DISTRIBUTION</p>
          <h1>North Carolina Municipal<br />Substation Expansion</h1>
          <p className="hero-copy">End-to-end execution control for a 15 kV switchgear, protection, commissioning, and customer-acceptance workstream.</p>
        </div>
        <div className="health-card">
          <div className="health-ring"><span>87</span><small>/100</small></div>
          <div><p>PROJECT HEALTH</p><strong>AMBER</strong><small>1 schedule risk · budget controlled</small></div>
        </div>
      </section>

      <section className="stat-grid" aria-label="Project summary">
        <article><span>CONTRACT VALUE</span><strong>$3.10M</strong><small>Fixed price · 9-month term</small></article>
        <article><span>SCHEDULE</span><strong>87%</strong><small>12 days to energization</small></article>
        <article><span>FORECAST AT COMPLETION</span><strong>{money(forecast)}</strong><small className={forecast <= baseline ? "positive" : "warning"}>{forecast <= baseline ? "Under" : "Over"} baseline by {money(Math.abs(forecast - baseline))}</small></article>
        <article><span>ACCEPTANCE READINESS</span><strong>{gateProgress}%</strong><small>{checked.filter(Boolean).length} of {gates.length} gates complete</small></article>
      </section>

      <nav className="tabs" aria-label="Project views">
        {(["overview", "schedule", "raid", "commissioning", "closeout"] as Tab[]).map((item) => (
          <button key={item} className={tab === item ? "active" : ""} onClick={() => setTab(item)}>{item === "raid" ? "RAID & CHANGE" : item.toUpperCase()}</button>
        ))}
      </nav>

      {tab === "overview" && (
        <section className="content-grid">
          <div className="panel span-2">
            <div className="panel-heading"><div><p className="eyebrow">EXECUTION MAP</p><h2>Medium-voltage delivery path</h2></div><span className="updated">Updated 27 Jul · 14:30</span></div>
            <div className="one-line" aria-label="Simplified single-line diagram">
              <div className="equipment source"><small>UTILITY</small><strong>12.47 kV</strong><span>Incoming feeder</span></div>
              <i></i><div className="equipment"><small>MAIN</small><strong>52-M1</strong><span>Vacuum breaker</span></div>
              <i></i><div className="equipment highlighted"><small>BUS</small><strong>15 kV</strong><span>Metal-clad lineup</span></div>
              <i></i><div className="equipment"><small>FEEDERS</small><strong>4 × VCB</strong><span>Relay protected</span></div>
              <i></i><div className="equipment destination"><small>LOAD</small><strong>5 MVA</strong><span>Distribution transformer</span></div>
            </div>
            <div className="scope-strip"><span><b>Scope:</b> engineer, manufacture, deliver, install, test, train & close</span><span><b>Customer:</b> NC municipal utility</span><span><b>Delivery:</b> Wendell, NC</span></div>
          </div>

          <div className="panel">
            <div className="panel-heading"><div><p className="eyebrow">MILESTONE CONTROL</p><h2>Next critical dates</h2></div></div>
            <div className="mini-timeline">
              {milestones.slice(4, 8).map((m) => <div key={m.name}><span className={`dot ${m.status.replace(" ", "-").toLowerCase()}`}></span><div><strong>{m.name}</strong><small>{m.status}</small></div><time>{m.date}</time></div>)}
            </div>
          </div>

          <div className="panel">
            <div className="panel-heading"><div><p className="eyebrow">FINANCIAL CONTROL</p><h2>Baseline vs forecast</h2></div></div>
            <div className="budget-list">
              {budget.map((row) => <div key={row.label}><div><span>{row.label}</span><small>{money(row.forecast)} / {money(row.baseline)}</small></div><div className="bar"><i style={{ width: `${Math.min((row.forecast / row.baseline) * 82, 100)}%` }} className={row.forecast > row.baseline ? "over" : ""}></i></div></div>)}
            </div>
          </div>
        </section>
      )}

      {tab === "schedule" && (
        <section className="panel schedule-panel">
          <div className="panel-heading"><div><p className="eyebrow">BASELINE SCHEDULE</p><h2>Stage-gate milestone plan</h2></div><span className="badge">Critical path monitored</span></div>
          <div className="schedule-head"><span>Milestone</span><span>Target</span><span>Progress</span><span>Status</span></div>
          {milestones.map((m) => <div className="schedule-row" key={m.name}><strong>{m.name}</strong><time>{m.date}</time><div className="progress"><i style={{width:`${m.pct}%`}}></i><span>{m.pct}%</span></div><span className={`status ${m.status.replace(" ", "-").toLowerCase()}`}>{m.status}</span></div>)}
        </section>
      )}

      {tab === "raid" && (
        <section className="panel">
          <div className="panel-heading"><div><p className="eyebrow">RAID & CHANGE CONTROL</p><h2>Risks, issues and decisions</h2></div><div className="filter-row">{["All", "Open", "Mitigating", "Closing", "Decided"].map(f => <button key={f} className={riskFilter === f ? "selected" : ""} onClick={() => setRiskFilter(f)}>{f}</button>)}</div></div>
          <div className="risk-table">
            <div className="risk-head"><span>ID</span><span>Item / response</span><span>Owner</span><span>Score</span><span>State</span></div>
            {filteredRisks.map(r => <div className="risk-row" key={r.id}><b>{r.id}</b><div><strong>{r.item}</strong><small>{r.response}</small></div><span>{r.owner}</span><span className={`risk-score score-${r.score}`}>{r.score}</span><span className="state">{r.state}</span></div>)}
          </div>
          <div className="change-card"><div><p className="eyebrow">APPROVED CHANGE · CR-003</p><h3>Arc-flash label revision & field application</h3><p>Customer-requested label update after final protection study. No energization until installed and verified.</p></div><div><small>VALUE</small><strong>+$18.4k</strong><small>SCHEDULE</small><strong>+2 days</strong></div></div>
        </section>
      )}

      {tab === "commissioning" && (
        <section className="content-grid">
          <div className="panel span-2">
            <div className="panel-heading"><div><p className="eyebrow">FAT · SAT · ENERGIZATION</p><h2>Acceptance gate checklist</h2></div><strong className="readiness">{gateProgress}% READY</strong></div>
            <div className="gate-list">{gates.map((gate, index) => <label key={gate.label}><input type="checkbox" checked={checked[index]} onChange={() => setChecked(v => v.map((x, i) => i === index ? !x : x))}/><span className="custom-check">✓</span><strong>{gate.label}</strong><small>{gate.owner}</small></label>)}</div>
          </div>
          <div className="panel punch-panel"><p className="eyebrow">PUNCH LIST</p><h2>Open field items</h2><div className="punch"><b>A-02</b><div><strong>Replace CT terminal blocks</strong><small>Owner: Factory · Due 30 Jul</small></div><span>Critical</span></div><div className="punch"><b>B-05</b><div><strong>Update cubicle nameplates</strong><small>Owner: Field Service · Due 02 Aug</small></div><span>Minor</span></div><div className="punch"><b>B-08</b><div><strong>Deliver training attendance log</strong><small>Owner: Customer Care · Due 06 Aug</small></div><span>Minor</span></div></div>
        </section>
      )}

      {tab === "closeout" && (
        <section className="content-grid">
          <div className="panel span-2"><div className="panel-heading"><div><p className="eyebrow">CONTROLLED CLOSEOUT</p><h2>Customer acceptance package</h2></div><span className="badge">8 required deliverables</span></div><div className="document-grid">{["As-built single-line diagram","Approved protection settings","FAT & SAT test reports","Equipment manuals & warranties","Training attendance record","Punch-list closure evidence","Customer acceptance certificate","Final invoice & cost reconciliation"].map((d,i)=><div key={d}><span>{i<4?"✓":"○"}</span><div><strong>{d}</strong><small>{i<4?"Approved":"Pending final gate"}</small></div></div>)}</div></div>
          <div className="panel"><p className="eyebrow">LESSONS LEARNED</p><h2>Close the loop</h2><ul className="lessons"><li>Freeze cable interfaces before factory release.</li><li>Link relay procurement to critical-path alerts.</li><li>Run customer training before final SAT week.</li><li>Include spare CT terminal blocks in site kit.</li></ul></div>
        </section>
      )}

      <footer><div><strong>MV-24 Project Control Simulator</strong><span>Created by Pranav Chavan · Portfolio demonstration</span></div><div><span>PMI-aligned controls</span><span>Medium-voltage execution</span><span>Customer acceptance</span></div></footer>
      {notice && <div className="toast" role="status">{notice}</div>}
    </main>
  );
}
