import React from 'react';

const TopBar = () => (
  <div className="col-span-full flex items-center justify-between h-16 px-6 bg-d-bg border-b border-d-border">
    <div className="flex items-center gap-4">
      <span className="w-9 h-9 rounded-lg inline-flex items-center justify-center text-d-fg-3 cursor-pointer hover:bg-d-card hover:text-d-fg transition-colors">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </span>
      <span className="inline-flex items-center gap-1">
        <span className="w-9 h-9 bg-yellow rounded-lg inline-flex items-center justify-center font-sans font-black italic text-[22px] text-white -skew-x-6">S</span>
        <span className="flex items-baseline gap-0.5">
          <span className="font-bold text-lg text-d-fg tracking-tight">stannp</span>
          <span className="text-[11px] text-d-fg-3 font-medium ml-0.5">.com</span>
        </span>
      </span>
    </div>
    <div className="flex items-center gap-4">
      <div className="inline-flex items-center gap-2 bg-d-card border border-d-border px-3.5 py-2 rounded-lg w-80 text-d-fg-3 text-sm">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>
        </svg>
        <span>Search</span>
      </div>
      <span className="w-10 h-10 rounded-full inline-flex items-center justify-center text-d-fg-2 bg-transparent cursor-pointer hover:bg-d-card">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10 21a2 2 0 0 0 4 0"/>
        </svg>
      </span>
      <span className="w-9 h-9 rounded-full bg-d-card-2 border border-d-border-2 text-d-fg font-semibold text-[13px] inline-flex items-center justify-center">JC</span>
    </div>
  </div>
);

export default TopBar;
