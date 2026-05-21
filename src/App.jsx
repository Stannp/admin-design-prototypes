import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import ViewAccountPrototype from './prototypes/view-account';

const prototypes = [ViewAccountPrototype];

const STATUS_STYLES = {
  idea:     { label: "Idea",             desc: "Being explored",       bg: "rgba(252,185,29,0.15)", fg: "#8A6300", dot: "#FCB91D" },
  wip:      { label: "Work in progress", desc: "Actively prototyping", bg: "rgba(255,105,0,0.12)", fg: "#D85B00", dot: "#FF6900" },
  review:   { label: "Ready for review", desc: "Awaiting feedback",    bg: "rgba(65,93,229,0.12)", fg: "#415DE5", dot: "#415DE5" },
  approved: { label: "Signed off",       desc: "Approved for build",   bg: "rgba(2,182,128,0.12)", fg: "#018A60", dot: "#02B680" },
};

function StatusPill({ status }) {
  const s = STATUS_STYLES[status];
  if (!s) return null;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      font: "700 10px/1 Poppins", letterSpacing: "0.04em", textTransform: "uppercase",
      color: s.fg, background: s.bg,
      padding: "4px 10px", borderRadius: 999,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: 999, background: s.dot }} />
      {s.label}
    </span>
  );
}

function PrototypePicker() {
  return (
    <div className="va" style={{
      minHeight: "100vh", background: "var(--d-bg)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      fontFamily: "Poppins, sans-serif", padding: 32,
    }}>
      <div style={{
        width: 38, height: 38, borderRadius: 6, background: "#FCB91D",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        transform: "skewX(-8deg)", fontWeight: 900, fontStyle: "italic",
        color: "#fff", fontSize: 22, marginBottom: 16,
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
      }}>S</div>
      <h1 style={{ margin: "0 0 8px", fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--d-fg)" }}>
        Admin Prototypes
      </h1>
      <p style={{ color: "var(--d-fg-3)", margin: "0 0 32px", fontSize: 14 }}>
        Filament admin panel design explorations
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, width: "100%", maxWidth: 640 }}>
        {prototypes.map(P => (
          <Link key={P.meta.id} to={P.meta.path} style={{
            background: "var(--d-card)", border: "1px solid var(--d-border)", borderRadius: 12,
            padding: 24, textDecoration: "none", color: "inherit",
            transition: "all .15s", display: "flex", flexDirection: "column",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--stannp-indigo)"; e.currentTarget.style.background = "var(--d-card-2)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--d-border)"; e.currentTarget.style.background = "var(--d-card)"; }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8,
                background: "var(--d-card-2)", color: "var(--d-fg-2)",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M16 9h4a1 1 0 0 1 1 1v11M8 7h.01M8 11h.01M8 15h.01M12 7h.01M12 11h.01M12 15h.01" />
                </svg>
              </div>
              {P.meta.status && <StatusPill status={P.meta.status} />}
            </div>
            <h3 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 700, color: "var(--d-fg)" }}>{P.meta.label}</h3>
            <p style={{ margin: 0, fontSize: 13, color: "var(--d-fg-3)", flex: 1 }}>
              {P.meta.description}
            </p>
            <div style={{ marginTop: 12, font: "600 13px/1 Poppins", color: "var(--stannp-indigo)" }}>
              Open prototype →
            </div>
          </Link>
        ))}
      </div>
      <div style={{
        display: "flex", alignItems: "center", gap: 20, marginTop: 32,
        padding: "14px 20px", background: "var(--d-card)", borderRadius: 10,
        border: "1px solid var(--d-border)",
      }}>
        <span style={{ font: "600 10px/1 Poppins", color: "var(--d-fg-3)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Status key</span>
        {Object.entries(STATUS_STYLES).map(([id, s]) => (
          <div key={id} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: s.dot }} />
            <span style={{ font: "600 11px/1 Poppins", color: s.fg }}>{s.label}</span>
            <span style={{ font: "400 11px/1 Poppins", color: "var(--d-fg-4)" }}>{s.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PrototypePicker />} />
      <Route path="/view-account/*" element={<ViewAccountPrototype />} />
      <Route path="*" element={<PrototypePicker />} />
    </Routes>
  );
}
