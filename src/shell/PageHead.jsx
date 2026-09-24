import React from 'react';

const PageHead = ({ hideHeading, onDelete }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuRef = React.useRef(null);
  React.useEffect(() => {
    const close = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false); };
    if (menuOpen) document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [menuOpen]);

  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        <div className="flex items-center gap-2 text-d-fg-3 text-sm mb-2">
          <span>Accounts</span>
          <span className="opacity-50">&rsaquo;</span>
          <strong className="text-d-fg-2 font-medium">View</strong>
        </div>
        {!hideHeading && <h1 className="m-0 text-3xl font-bold tracking-tight text-d-fg">View Account</h1>}
      </div>
      <div className="flex gap-2.5">
        {/* Single kebab — all primary actions live here now */}
        <div className="relative inline-block" ref={menuRef}>
          <button className="h-[38px] rounded-md bg-d-card border border-d-border-2 text-d-fg-2 cursor-pointer inline-flex items-center justify-center transition-colors hover:bg-d-card-hover hover:text-d-fg w-auto px-3.5 gap-2" onClick={()=>setMenuOpen(o=>!o)} aria-label="Account actions">
            <span className="text-sm font-semibold text-d-fg">Actions</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
          {menuOpen && (
            <div className="absolute top-[calc(100%+6px)] right-0 z-30 bg-d-card border border-d-border-2 rounded-[10px] p-1.5 shadow-[0_14px_40px_rgba(0,0,0,0.35),0_2px_4px_rgba(0,0,0,0.2)] min-w-60">
              <button className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-md bg-transparent border-none cursor-pointer font-sans text-sm font-medium text-green text-left hover:bg-d-card-2 hover:text-d-fg">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="6" width="20" height="14" rx="2"/><path d="M12 11v6M9 14h6"/>
                </svg>
                Top up balance
              </button>
              <button className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-md bg-transparent border-none cursor-pointer font-sans text-sm font-medium text-orange text-left hover:bg-d-card-2 hover:text-d-fg">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><path d="M8 12h8"/>
                </svg>
                Debit balance
              </button>
              <button className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-md bg-transparent border-none cursor-pointer font-sans text-sm font-medium text-d-fg-2 text-left hover:bg-d-card-2 hover:text-d-fg">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 3h7v7M21 3l-9 9M10 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/>
                </svg>
                View in HubSpot
              </button>
              <div className="h-px bg-d-border my-1"></div>
              <button className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-md bg-transparent border-none cursor-pointer font-sans text-sm font-medium text-d-fg-2 text-left hover:bg-d-card-2 hover:text-d-fg">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                Add internal note
              </button>
              <button className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-md bg-transparent border-none cursor-pointer font-sans text-sm font-medium text-d-fg-2 text-left hover:bg-d-card-2 hover:text-d-fg">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
                </svg>
                Suspend account
              </button>
              <button className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-md bg-transparent border-none cursor-pointer font-sans text-sm font-medium text-d-fg-2 text-left hover:bg-d-card-2 hover:text-d-fg">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
                Export account data
              </button>
              <div className="h-px bg-d-border my-1"></div>
              <button className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-md bg-transparent border-none cursor-pointer font-sans text-sm font-medium text-d-red-fg text-left hover:bg-d-red-bg hover:text-d-red-fg" onClick={()=>{ setMenuOpen(false); onDelete && onDelete(); }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M10 11v6M14 11v6"/>
                </svg>
                Mark for deletion...
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHead;
