import React from 'react';
import { useNavigate } from 'react-router-dom';

// `children` is an optional slot after the persona pills, for prototype-specific controls.
export default function ScenarioBar({ scenarios, scenario, onChange, note, children }) {
  const navigate = useNavigate();
  const current = scenarios?.find(s => s.id === scenario);
  const displayNote = note || current?.note;

  return (
    <div className="sticky top-0 z-60 flex items-center justify-center gap-2 bg-gradient-to-r from-[#312e81] via-[#4338CA] to-[#312e81] px-6 py-2 font-sans text-xs font-semibold text-white">
      <span className="bg-yellow text-indigo-deep font-extrabold text-[10px] tracking-[0.04em] px-2.5 py-1 rounded cursor-pointer mr-1" onClick={() => navigate('/')}>DEMO</span>
      {scenarios && scenarios.length > 0 && (
        <>
          <span className="font-medium text-xs text-white/60 mr-1">View as</span>
          {scenarios.map(s => (
            <button
              key={s.id}
              className={"inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border-[1.5px] bg-white/8 font-sans font-semibold text-xs cursor-pointer whitespace-nowrap transition-all" + (scenario === s.id ? " bg-white/18 border-white/70 text-white" : " border-white/25 text-white/85 hover:bg-white/15 hover:border-white/40 hover:text-white")}
              onClick={() => onChange(s.id)}
            >
              {s.dot && <span className="w-[7px] h-[7px] rounded-full" style={{ background: s.dot }} />}
              {s.label}
            </button>
          ))}
        </>
      )}
      {children}
      {displayNote && <span className="ml-auto font-medium text-[11px] leading-snug text-white/45 italic max-w-80 text-right">{displayNote}</span>}
    </div>
  );
}
