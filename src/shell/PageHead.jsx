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
    <div className="va-pagehead">
      <div>
        <div className="va-crumbs">
          <span>Accounts</span>
          <span className="va-crumbs__sep">&rsaquo;</span>
          <strong>View</strong>
        </div>
        {!hideHeading && <h1>View Account</h1>}
      </div>
      <div className="va-actions">
        {/* Single kebab — all primary actions live here now */}
        <div className="va-kebab-wrap" ref={menuRef}>
          <button className="va-kebab" onClick={()=>setMenuOpen(o=>!o)} aria-label="Account actions"
            style={{width: "auto", padding: "0 14px", gap: 8, display: "inline-flex", alignItems: "center"}}>
            <span style={{fontSize: 13, fontWeight: 600, color: "var(--d-fg)"}}>Actions</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
          {menuOpen && (
            <div className="va-menu" style={{minWidth: 240}}>
              <button className="va-menu__item" style={{color:"var(--stannp-green)"}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="6" width="20" height="14" rx="2"/><path d="M12 11v6M9 14h6"/>
                </svg>
                Top up balance
              </button>
              <button className="va-menu__item" style={{color:"var(--stannp-orange)"}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><path d="M8 12h8"/>
                </svg>
                Debit balance
              </button>
              <button className="va-menu__item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 3h7v7M21 3l-9 9M10 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/>
                </svg>
                View in HubSpot
              </button>
              <div className="va-menu__sep"></div>
              <button className="va-menu__item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                Add internal note
              </button>
              <button className="va-menu__item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
                </svg>
                Suspend account
              </button>
              <button className="va-menu__item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
                Export account data
              </button>
              <div className="va-menu__sep"></div>
              <button className="va-menu__item va-menu__item--danger" onClick={()=>{ setMenuOpen(false); onDelete && onDelete(); }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M10 11v6M14 11v6"/>
                </svg>
                Delete account...
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHead;
