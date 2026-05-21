import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ScenarioBar({ scenarios, scenario, onChange, note }) {
  const navigate = useNavigate();
  const current = scenarios?.find(s => s.id === scenario);
  const displayNote = note || current?.note;

  return (
    <div className="va-scenario-bar">
      <span className="va-scenario-bar__demo" onClick={() => navigate('/')}>DEMO</span>
      {scenarios && scenarios.length > 0 && (
        <>
          <span className="va-scenario-bar__label">View as</span>
          {scenarios.map(s => (
            <button
              key={s.id}
              className={"va-scenario-bar__btn" + (scenario === s.id ? " va-scenario-bar__btn--active" : "")}
              onClick={() => onChange(s.id)}
            >
              {s.dot && <span className="va-scenario-bar__dot" style={{ background: s.dot }} />}
              {s.label}
            </button>
          ))}
        </>
      )}
      {displayNote && <span className="va-scenario-bar__note">{displayNote}</span>}
    </div>
  );
}
