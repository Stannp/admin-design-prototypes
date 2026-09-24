import React from 'react';

export default function Toast({ message }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-d-card text-d-fg border border-d-border-2 rounded-[10px] px-4.5 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.35)] flex items-center gap-2.5 text-sm font-medium z-[200] animate-[va-toast-in_0.25s_cubic-bezier(.2,.7,.3,1)]">
      <span className="text-d-green-fg">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/>
        </svg>
      </span>
      {message}
    </div>
  );
}
