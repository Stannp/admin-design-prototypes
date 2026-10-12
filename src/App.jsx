import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import ViewAccountPrototype from './prototypes/view-account';
import AccountDeletionsPrototype from './prototypes/account-deletions';
import SignalsFeedPrototype from './prototypes/signals-feed';

const prototypes = [ViewAccountPrototype, AccountDeletionsPrototype, SignalsFeedPrototype];

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
    <span
      className="inline-flex items-center gap-1.5 font-sans font-bold text-[10px] leading-none tracking-[0.04em] uppercase px-2.5 py-1 rounded-full"
      style={{ color: s.fg, background: s.bg }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
      {s.label}
    </span>
  );
}

function PrototypePicker() {
  return (
    <div className="min-h-screen bg-d-bg flex flex-col items-center justify-center font-sans p-8">
      <div className="w-[38px] h-[38px] rounded-md bg-yellow inline-flex items-center justify-center -skew-x-[8deg] font-black italic text-white text-[22px] mb-4 shadow-[0_2px_6px_rgba(0,0,0,0.15)]">
        S
      </div>
      <h1 className="m-0 mb-2 text-[28px] font-bold tracking-tight text-d-fg">
        Admin Prototypes
      </h1>
      <p className="text-d-fg-3 m-0 mb-8 text-sm">
        Filament admin panel design explorations
      </p>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 w-full max-w-[640px]">
        {prototypes.map(P => (
          <Link
            key={P.meta.id}
            to={P.meta.path}
            className="bg-d-card border border-d-border rounded-xl p-6 no-underline text-inherit transition-all flex flex-col hover:border-indigo hover:bg-d-card-2"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-lg bg-d-card-2 text-d-fg-2 inline-flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M16 9h4a1 1 0 0 1 1 1v11M8 7h.01M8 11h.01M8 15h.01M12 7h.01M12 11h.01M12 15h.01" />
                </svg>
              </div>
              {P.meta.status && <StatusPill status={P.meta.status} />}
            </div>
            <h3 className="m-0 mb-1 text-base font-bold text-d-fg">{P.meta.label}</h3>
            <p className="m-0 text-[13px] text-d-fg-3 flex-1">
              {P.meta.description}
            </p>
            <div className="mt-3 font-sans font-semibold text-[13px] leading-none text-indigo">
              Open prototype →
            </div>
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-5 mt-8 px-5 py-3.5 bg-d-card rounded-[10px] border border-d-border">
        <span className="font-sans font-semibold text-[10px] leading-none text-d-fg-3 tracking-[0.08em] uppercase">Status key</span>
        {Object.entries(STATUS_STYLES).map(([id, s]) => (
          <div key={id} className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
            <span className="font-sans font-semibold text-[11px] leading-none" style={{ color: s.fg }}>{s.label}</span>
            <span className="font-sans font-normal text-[11px] leading-none text-d-fg-4">{s.desc}</span>
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
      <Route path="/account-deletions/*" element={<AccountDeletionsPrototype />} />
      <Route path="/signals-feed/*" element={<SignalsFeedPrototype />} />
      <Route path="*" element={<PrototypePicker />} />
    </Routes>
  );
}
