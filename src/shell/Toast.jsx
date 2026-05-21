import React from 'react';

export default function Toast({ message }) {
  return (
    <div className="va-toast">
      <span className="va-toast__icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/>
        </svg>
      </span>
      {message}
    </div>
  );
}
