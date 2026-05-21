import React from 'react';

// Local VaIcon for this module (self-contained)
const VaIcon = ({ name, size = 18, color = "currentColor", stroke = 1.75 }) => {
  const paths = {
    user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
    key: "M21 2l-2 2m-7.6 7.6a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.778-7.778zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4",
    shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    plus: "M12 5v14M5 12h14",
    money: "M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
    edit: "M12 20h9 M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z",
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[name] || ""}/>
    </svg>
  );
};

const TopOptionB = ({ data, openModal }) => {
  const { user, manager, region, billingAddress, lowBalance, mfa, system, paymentMethods } = data;

  const formatAddress = (a) =>
    [a.line1, a.line2, [a.city, a.postcode].filter(Boolean).join(" "), a.country].filter(Boolean);

  return (
    <div className="va-stack">
      {/* ===== Hero summary ===== */}
      <div className="va-summary-card">
        {/* UK flag — top right */}
        <span className="va-flag" title={region}>
          <span className="va-flag__icon">
            <svg viewBox="0 0 60 30" width="100%" height="100%">
              <clipPath id="ukclip"><rect width="60" height="30"/></clipPath>
              <rect width="60" height="30" fill="#012169"/>
              <g clipPath="url(#ukclip)">
                <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
                <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" clipPath="url(#ukclip)"/>
                <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10"/>
                <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6"/>
              </g>
            </svg>
          </span>
          {region}
        </span>

        <div>
          {/* One-line subtitle: IDs, manager, source, created — no more bar of details below */}
          <div className="va-hero-sub">
            <span className="va-hero-sub__id">Account #{system.accountId}</span>
            <span className="va-hero-sub__dot">&middot;</span>
            <span>HubSpot</span>
            <a href="#" className="va-hero-sub__link">{system.hubspotId} &nearr;</a>
            <span className="va-hero-sub__dot">&middot;</span>
            <span>Managed by <span style={{color:"var(--d-fg-2)"}}>{manager}</span></span>
            <span className="va-hero-sub__dot">&middot;</span>
            <span>Source <span style={{color:"var(--d-fg-2)"}}>{system.source}</span></span>
            <span className="va-hero-sub__dot">&middot;</span>
            <span>Created 19 May 2026</span>
          </div>

          <h2 className="va-summary-card__title" style={{marginBottom: 12}}>
            Vivid Design Services Ltd.
          </h2>
          <div className="va-summary-card__pills">
            <span className="va-pill va-pill--green va-pill--dot">Paid</span>
            <span className="va-pill">Legacy</span>
            <span className="va-pill va-pill--yellow">Dashboard v2</span>
            {system.priorityQC && <span className="va-pill va-pill--indigo">Priority QC</span>}
          </div>
        </div>

        {/* Balance / spend block — populated with realistic numbers */}
        <div className="va-bal-block">
          <div className="va-bal-block__cell">
            <span className="va-bal-block__label">Current Balance</span>
            <span className="va-bal-block__value">&pound;1,425.20</span>
            <span className="va-bal-block__sub">Credit allowance &pound;500.00</span>
          </div>
          <div className="va-bal-block__cell">
            <span className="va-bal-block__label">Total spent</span>
            <span className="va-bal-block__value va-bal-block__value--mid va-value--green">&pound;18,742.50</span>
            <span className="va-bal-block__sub">Lifetime &middot; 142 campaigns</span>
          </div>
          <div className="va-bal-block__cell">
            <span className="va-bal-block__label">Last 30 days</span>
            <span className="va-bal-block__value va-bal-block__value--mid">&pound;842.00</span>
            <span className="va-bal-block__sub">4 campaigns &middot; avg &pound;210.50</span>
          </div>
        </div>
      </div>

      {/* ===== 3-column row: management cards ===== */}
      <div className="va-cards-3">

        {/* Primary user — with Edit, Change primary, Reset Password, Manage MFA */}
        <div className="va-aside-card">
          <div className="va-card__head" style={{marginBottom: 14}}>
            <span className="va-card__icon">
              <VaIcon name="user" size={16}/>
            </span>
            <span className="va-card__title">Primary user</span>
            <div className="va-card__head-actions">
              <button className="va-edit-btn" onClick={()=>openModal("editUser")}>
                <VaIcon name="edit" size={12}/>
                Edit
              </button>
            </div>
          </div>
          <div className="va-aside-list">
            <div className="va-aside-row">
              <span className="va-aside-row__label">Name</span>
              <span className="va-aside-row__value">{user.name}</span>
            </div>
            <div className="va-aside-row">
              <span className="va-aside-row__label">Email</span>
              <span className="va-aside-row__value">{user.email}</span>
            </div>
            <div className="va-aside-row">
              <span className="va-aside-row__label">Phone</span>
              <span className="va-aside-row__value">{user.phone || <span style={{color:"var(--d-fg-3)"}}>Not set</span>}</span>
            </div>
            <div className="va-aside-row">
              <span className="va-aside-row__label">Contact prefs</span>
              <span className="va-aside-row__value" style={{display:"flex", gap: 4, flexWrap:"wrap", justifyContent:"flex-end"}}>
                {user.prefs.product && <span className="va-pill">Product</span>}
                {user.prefs.marketing && <span className="va-pill">Marketing</span>}
                {user.prefs.account && <span className="va-pill">Account</span>}
                {!user.prefs.product && !user.prefs.marketing && !user.prefs.account &&
                  <span style={{color:"var(--d-fg-3)", fontSize: 12.5}}>None</span>}
              </span>
            </div>
            <div className="va-aside-row">
              <span className="va-aside-row__label">MFA</span>
              <span className="va-aside-row__value">
                {mfa.enabled
                  ? <span className="va-pill va-pill--green va-pill--dot">Enabled</span>
                  : <span className="va-pill va-pill--off">Not enabled</span>}
              </span>
            </div>
            <div className="va-aside-row">
              <span className="va-aside-row__label">Last login</span>
              <span className="va-aside-row__value" style={{color:"var(--d-fg-2)"}}>{user.lastLogin}</span>
            </div>
          </div>
          <div style={{display:"flex", gap: 8, marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--d-border)", flexWrap: "wrap"}}>
            <button className="va-btn va-btn--ghost va-btn--sm" onClick={()=>openModal("changePrimary")}>
              <VaIcon name="user" size={13}/>
              Change primary user
            </button>
            <button className="va-btn va-btn--ghost va-btn--sm" onClick={()=>openModal("resetPw")}>
              <VaIcon name="key" size={13}/>
              Reset password
            </button>
            <button className="va-btn va-btn--ghost va-btn--sm" onClick={()=>openModal("mfa")}>
              <VaIcon name="shield" size={13}/>
              Manage MFA
            </button>
          </div>
        </div>

        {/* Billing settings — now with payment method examples */}
        <div className="va-aside-card">
          <div className="va-card__head" style={{marginBottom: 14}}>
            <span className="va-card__icon">
              <VaIcon name="money" size={16}/>
            </span>
            <span className="va-card__title">Billing settings</span>
          </div>

          <div className="va-meta-row">
            <span className="va-meta-row__label" style={{alignSelf:"flex-start", paddingTop: 2}}>Billing address</span>
            <span className="va-meta-row__value" style={{flexDirection:"column", alignItems:"flex-end", gap: 2, textAlign:"right"}}>
              {formatAddress(billingAddress).map((line, i) => (
                <span key={i} style={{fontSize: 13, lineHeight: 1.4}}>{line}</span>
              ))}
              <button className="va-edit-btn va-edit-btn--inline"
                style={{marginTop: 4, opacity: 1}}
                onClick={()=>openModal("billingAddress")}>
                <VaIcon name="edit" size={11}/>
                Edit
              </button>
            </span>
          </div>

          <div className="va-meta-row">
            <span className="va-meta-row__label" style={{alignSelf:"flex-start", paddingTop: 2}}>Low balance</span>
            <span className="va-meta-row__value" style={{flexDirection:"column", alignItems:"flex-end", gap: 4}}>
              {lowBalance.enabled
                ? <span style={{fontSize: 13}}>Auto top-up <strong>{lowBalance.topUpAmount}</strong> at {lowBalance.threshold}</span>
                : <span style={{fontSize: 13, color:"var(--d-fg-3)"}}>Disabled — account pauses at &pound;0</span>}
              <button className="va-edit-btn va-edit-btn--inline"
                style={{opacity: 1}}
                onClick={()=>openModal("lowBalance")}>
                <VaIcon name="edit" size={11}/>
                Edit
              </button>
            </span>
          </div>

          {/* Payment methods — show actual cards */}
          <div style={{paddingTop: 14, borderTop: "1px solid var(--d-border)", marginTop: 4}}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: 10}}>
              <span style={{fontSize: 12.5, color: "var(--d-fg-3)", fontWeight: 500}}>Payment methods</span>
              <button className="va-edit-btn va-edit-btn--inline" style={{opacity: 1}}>
                <VaIcon name="plus" size={11}/>
                Add card
              </button>
            </div>
            <div style={{display:"flex", flexDirection:"column", gap: 6}}>
              {paymentMethods.length === 0 ? (
                <div style={{fontSize: 13, color:"var(--d-fg-3)", padding:"8px 10px"}}>No cards on file</div>
              ) : paymentMethods.map((pm, i) => (
                <div className="va-pm" key={i}>
                  <span className={"va-pm__brand va-pm__brand--" + pm.brand.toLowerCase()}>
                    {pm.brand.toUpperCase()}
                  </span>
                  <span className="va-pm__num">&bull;&bull;&bull;&bull; {pm.last4}</span>
                  <span className="va-pm__exp">{pm.exp}</span>
                  {pm.default && <span className="va-pm__default">Default</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Plan limits — now in the 3rd column, stacked */}
        <div className="va-aside-card">
          <div className="va-card__head" style={{marginBottom: 16}}>
            <span className="va-card__icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9"/><path d="M12 12L19 5"/>
              </svg>
            </span>
            <span className="va-card__title">Plan limits</span>
            <div className="va-card__head-actions">
              <button className="va-edit-btn">Manage</button>
            </div>
          </div>
          <div className="va-card__sub" style={{marginTop: -8, marginBottom: 18}}>
            Legacy plan &middot; API 300/min
          </div>
          <div className="va-limits-column">
            <div className="va-limit">
              <div className="va-limit__head">
                <span className="va-limit__label">Users</span>
                <span className="va-limit__count">3<em> / 3</em></span>
              </div>
              <div className="va-bar"><div className="va-bar__fill va-bar__fill--warn" style={{width: "100%"}}></div></div>
            </div>
            <div className="va-limit">
              <div className="va-limit__head">
                <span className="va-limit__label">Templates</span>
                <span className="va-limit__count">4<em> / 10</em></span>
              </div>
              <div className="va-bar"><div className="va-bar__fill" style={{width: "40%"}}></div></div>
            </div>
            <div className="va-limit">
              <div className="va-limit__head">
                <span className="va-limit__label">Journeys</span>
                <span className="va-limit__count">2<em> / 10</em></span>
              </div>
              <div className="va-bar"><div className="va-bar__fill" style={{width: "20%"}}></div></div>
            </div>
            <div className="va-limit">
              <div className="va-limit__head">
                <span className="va-limit__label">Recipients</span>
                <span className="va-limit__count">12,408<em> reached</em></span>
              </div>
              <div className="va-bar"><div className="va-bar__fill va-bar__fill--neutral" style={{width: "62%"}}></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopOptionB;
