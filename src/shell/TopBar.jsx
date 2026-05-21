import React from 'react';

const TopBar = () => (
  <div className="va-topbar">
    <div className="va-topbar__left">
      <span className="va-back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </span>
      <span className="va-logo">
        <span className="va-logo__tile">S</span>
        <span style={{display:"flex", alignItems:"baseline", gap:2}}>
          <span className="va-logo__text">stannp</span>
          <span className="va-logo__tld">.com</span>
        </span>
      </span>
    </div>
    <div className="va-topbar__right">
      <div className="va-search">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>
        </svg>
        <span>Search</span>
      </div>
      <span className="va-iconbtn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10 21a2 2 0 0 0 4 0"/>
        </svg>
      </span>
      <span className="va-avatar">JC</span>
    </div>
  </div>
);

export default TopBar;
