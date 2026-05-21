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
    <div className="flex flex-col gap-4">
      {/* ===== Hero summary ===== */}
      <div className="relative bg-d-card border border-d-border rounded-[14px] px-7 py-[26px] flex flex-col gap-5">
        {/* UK flag — top right */}
        <span className="absolute top-6 right-7 inline-flex items-center gap-2 text-[12.5px] text-d-fg-3" title={region}>
          <span className="w-7 h-5 rounded-[3px] overflow-hidden shadow-[0_0_0_1px_var(--color-d-border)] shrink-0">
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
          <div className="flex items-center flex-wrap gap-x-2.5 gap-y-1.5 text-[12.5px] text-d-fg-3 mb-2">
            <span className="tabular-nums text-d-fg-2">Account #{system.accountId}</span>
            <span className="text-d-fg-4">&middot;</span>
            <span>HubSpot</span>
            <a href="#" className="text-d-indigo-fg no-underline tabular-nums hover:text-[#6e80ed]">{system.hubspotId} &nearr;</a>
            <span className="text-d-fg-4">&middot;</span>
            <span>Managed by <span className="text-d-fg-2">{manager}</span></span>
            <span className="text-d-fg-4">&middot;</span>
            <span>Source <span className="text-d-fg-2">{system.source}</span></span>
            <span className="text-d-fg-4">&middot;</span>
            <span>Created 19 May 2026</span>
          </div>

          <h2 className="text-[26px] font-bold tracking-tight text-d-fg m-0 mb-3">
            Vivid Design Services Ltd.
          </h2>
          <div className="flex flex-wrap gap-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11.5px] font-semibold leading-snug bg-d-green-bg text-d-green-fg"><span className="w-1.5 h-1.5 rounded-full bg-current" />Paid</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11.5px] font-semibold leading-snug bg-d-neutral-bg text-d-neutral-fg">Legacy</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11.5px] font-semibold leading-snug bg-d-yellow-bg text-d-yellow-fg">Dashboard v2</span>
            {system.priorityQC && <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11.5px] font-semibold leading-snug bg-d-indigo-bg text-d-indigo-fg">Priority QC</span>}
          </div>
        </div>

        {/* Balance / spend block — populated with realistic numbers */}
        <div className="grid grid-cols-[1.2fr_1fr_1fr] gap-6 pt-4.5 border-t border-d-border">
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold text-d-fg-3 uppercase tracking-[0.05em]">Current Balance</span>
            <span className="text-[28px] font-bold tracking-tight text-d-fg">&pound;1,425.20</span>
            <span className="text-[12.5px] text-d-fg-3">Credit allowance &pound;500.00</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold text-d-fg-3 uppercase tracking-[0.05em]">Total spent</span>
            <span className="text-[22px] font-bold tracking-tight text-green">&pound;18,742.50</span>
            <span className="text-[12.5px] text-d-fg-3">Lifetime &middot; 142 campaigns</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold text-d-fg-3 uppercase tracking-[0.05em]">Last 30 days</span>
            <span className="text-[22px] font-bold tracking-tight text-d-fg">&pound;842.00</span>
            <span className="text-[12.5px] text-d-fg-3">4 campaigns &middot; avg &pound;210.50</span>
          </div>
        </div>
      </div>

      {/* ===== 3-column row: management cards ===== */}
      <div className="grid grid-cols-[1.15fr_1fr_1fr] gap-4 items-start">

        {/* Primary user — with Edit, Change primary, Reset Password, Manage MFA */}
        <div className="bg-d-card border border-d-border rounded-[14px] px-6 py-[22px]">
          <div className="relative flex items-center gap-2.5 text-d-fg mb-3.5">
            <span className="w-7 h-7 rounded-md inline-flex items-center justify-center bg-d-card-2 text-d-fg-2">
              <VaIcon name="user" size={16}/>
            </span>
            <span className="text-[15px] font-semibold text-d-fg">Primary user</span>
            <div className="ml-auto inline-flex gap-1">
              <button className="inline-flex items-center gap-1.5 bg-transparent border border-transparent text-d-fg-3 cursor-pointer text-xs font-medium font-sans px-2.5 py-1.5 rounded-md transition-colors hover:bg-d-card-2 hover:text-d-fg hover:border-d-border-2" onClick={()=>openModal("editUser")}>
                <VaIcon name="edit" size={12}/>
                Edit
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-3.5">
            <div className="flex items-start justify-between gap-4 py-2.5 border-b border-d-border last:border-b-0 last:pb-0 first:pt-0">
              <span className="text-[12.5px] text-d-fg-3 font-medium shrink-0">Name</span>
              <span className="text-[13.5px] text-d-fg font-medium text-right min-w-0">{user.name}</span>
            </div>
            <div className="flex items-start justify-between gap-4 py-2.5 border-b border-d-border last:border-b-0 last:pb-0 first:pt-0">
              <span className="text-[12.5px] text-d-fg-3 font-medium shrink-0">Email</span>
              <span className="text-[13.5px] text-d-fg font-medium text-right min-w-0">{user.email}</span>
            </div>
            <div className="flex items-start justify-between gap-4 py-2.5 border-b border-d-border last:border-b-0 last:pb-0 first:pt-0">
              <span className="text-[12.5px] text-d-fg-3 font-medium shrink-0">Phone</span>
              <span className="text-[13.5px] text-d-fg font-medium text-right min-w-0">{user.phone || <span className="text-d-fg-3">Not set</span>}</span>
            </div>
            <div className="flex items-start justify-between gap-4 py-2.5 border-b border-d-border last:border-b-0 last:pb-0 first:pt-0">
              <span className="text-[12.5px] text-d-fg-3 font-medium shrink-0">Contact prefs</span>
              <span className="text-[13.5px] text-d-fg font-medium text-right min-w-0 flex gap-1 flex-wrap justify-end">
                {user.prefs.product && <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11.5px] font-semibold leading-snug bg-d-neutral-bg text-d-neutral-fg">Product</span>}
                {user.prefs.marketing && <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11.5px] font-semibold leading-snug bg-d-neutral-bg text-d-neutral-fg">Marketing</span>}
                {user.prefs.account && <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11.5px] font-semibold leading-snug bg-d-neutral-bg text-d-neutral-fg">Account</span>}
                {!user.prefs.product && !user.prefs.marketing && !user.prefs.account &&
                  <span className="text-d-fg-3 text-[12.5px]">None</span>}
              </span>
            </div>
            <div className="flex items-start justify-between gap-4 py-2.5 border-b border-d-border last:border-b-0 last:pb-0 first:pt-0">
              <span className="text-[12.5px] text-d-fg-3 font-medium shrink-0">MFA</span>
              <span className="text-[13.5px] text-d-fg font-medium text-right min-w-0">
                {mfa.enabled
                  ? <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11.5px] font-semibold leading-snug bg-d-green-bg text-d-green-fg"><span className="w-1.5 h-1.5 rounded-full bg-current" />Enabled</span>
                  : <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11.5px] font-semibold leading-snug bg-d-neutral-bg text-d-fg-3">Not enabled</span>}
              </span>
            </div>
            <div className="flex items-start justify-between gap-4 py-2.5 border-b border-d-border last:border-b-0 last:pb-0 first:pt-0">
              <span className="text-[12.5px] text-d-fg-3 font-medium shrink-0">Last login</span>
              <span className="text-[13.5px] text-d-fg-2 font-medium text-right min-w-0">{user.lastLogin}</span>
            </div>
          </div>
          <div className="flex gap-2 mt-4 pt-4 border-t border-d-border flex-wrap">
            <button className="inline-flex items-center gap-2 px-3 py-[7px] rounded-md font-sans font-semibold text-[12.5px] border border-transparent cursor-pointer transition-[filter,background] bg-d-card text-d-fg-2 border-d-border-2 hover:bg-d-card-hover hover:text-d-fg" onClick={()=>openModal("changePrimary")}>
              <VaIcon name="user" size={13}/>
              Change primary user
            </button>
            <button className="inline-flex items-center gap-2 px-3 py-[7px] rounded-md font-sans font-semibold text-[12.5px] border border-transparent cursor-pointer transition-[filter,background] bg-d-card text-d-fg-2 border-d-border-2 hover:bg-d-card-hover hover:text-d-fg" onClick={()=>openModal("resetPw")}>
              <VaIcon name="key" size={13}/>
              Reset password
            </button>
            <button className="inline-flex items-center gap-2 px-3 py-[7px] rounded-md font-sans font-semibold text-[12.5px] border border-transparent cursor-pointer transition-[filter,background] bg-d-card text-d-fg-2 border-d-border-2 hover:bg-d-card-hover hover:text-d-fg" onClick={()=>openModal("mfa")}>
              <VaIcon name="shield" size={13}/>
              Manage MFA
            </button>
          </div>
        </div>

        {/* Billing settings — now with payment method examples */}
        <div className="bg-d-card border border-d-border rounded-[14px] px-6 py-[22px]">
          <div className="relative flex items-center gap-2.5 text-d-fg mb-3.5">
            <span className="w-7 h-7 rounded-md inline-flex items-center justify-center bg-d-card-2 text-d-fg-2">
              <VaIcon name="money" size={16}/>
            </span>
            <span className="text-[15px] font-semibold text-d-fg">Billing settings</span>
          </div>

          <div className="flex items-center justify-between gap-3 py-2.5 border-b border-d-border last:border-b-0 last:pb-0 first:pt-0">
            <span className="text-[12.5px] text-d-fg-3 font-medium shrink-0 self-start pt-0.5">Billing address</span>
            <span className="text-[13.5px] text-d-fg font-medium text-right min-w-0 break-all flex items-center gap-2 flex-col items-end">
              {formatAddress(billingAddress).map((line, i) => (
                <span key={i} className="text-[13px] leading-snug">{line}</span>
              ))}
              <button className="inline-flex items-center gap-1.5 bg-transparent border border-transparent text-d-fg-3 cursor-pointer text-[11px] font-medium font-sans px-1.5 py-0.5 rounded-md transition-colors hover:bg-d-card-2 hover:text-d-fg hover:border-d-border-2 mt-1"
                onClick={()=>openModal("billingAddress")}>
                <VaIcon name="edit" size={11}/>
                Edit
              </button>
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 py-2.5 border-b border-d-border last:border-b-0 last:pb-0 first:pt-0">
            <span className="text-[12.5px] text-d-fg-3 font-medium shrink-0 self-start pt-0.5">Low balance</span>
            <span className="text-[13.5px] text-d-fg font-medium text-right min-w-0 break-all flex items-center gap-2 flex-col items-end gap-1">
              {lowBalance.enabled
                ? <span className="text-[13px]">Auto top-up <strong>{lowBalance.topUpAmount}</strong> at {lowBalance.threshold}</span>
                : <span className="text-[13px] text-d-fg-3">Disabled — account pauses at &pound;0</span>}
              <button className="inline-flex items-center gap-1.5 bg-transparent border border-transparent text-d-fg-3 cursor-pointer text-[11px] font-medium font-sans px-1.5 py-0.5 rounded-md transition-colors hover:bg-d-card-2 hover:text-d-fg hover:border-d-border-2"
                onClick={()=>openModal("lowBalance")}>
                <VaIcon name="edit" size={11}/>
                Edit
              </button>
            </span>
          </div>

          {/* Payment methods — show actual cards */}
          <div className="pt-3.5 border-t border-d-border mt-1">
            <div className="flex justify-between items-center mb-2.5">
              <span className="text-[12.5px] text-d-fg-3 font-medium">Payment methods</span>
              <button className="inline-flex items-center gap-1.5 bg-transparent border border-transparent text-d-fg-3 cursor-pointer text-[11px] font-medium font-sans px-1.5 py-0.5 rounded-md transition-colors hover:bg-d-card-2 hover:text-d-fg hover:border-d-border-2">
                <VaIcon name="plus" size={11}/>
                Add card
              </button>
            </div>
            <div className="flex flex-col gap-1.5">
              {paymentMethods.length === 0 ? (
                <div className="text-[13px] text-d-fg-3 px-2.5 py-2">No cards on file</div>
              ) : paymentMethods.map((pm, i) => (
                <div className="flex items-center gap-2.5 px-2.5 py-2 bg-d-bg-2 border border-d-border rounded-lg" key={i}>
                  <span className={`w-9 h-6 rounded inline-flex items-center justify-center text-[9px] font-bold tracking-[0.04em] shrink-0 ${
                    pm.brand.toLowerCase() === 'visa' ? 'bg-[#1A1F71] text-white' :
                    pm.brand.toLowerCase() === 'mc' ? 'bg-gradient-to-r from-[#EB001B] to-[#F79E1B] text-white' :
                    'bg-d-card-2 text-d-fg-2'
                  }`}>
                    {pm.brand.toUpperCase()}
                  </span>
                  <span className="text-[13px] font-medium text-d-fg tabular-nums flex-1">&bull;&bull;&bull;&bull; {pm.last4}</span>
                  <span className="text-xs text-d-fg-3 tabular-nums">{pm.exp}</span>
                  {pm.default && <span className="text-[10px] font-semibold text-d-green-fg bg-d-green-bg px-[7px] py-0.5 rounded-full uppercase tracking-[0.04em]">Default</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Plan limits — now in the 3rd column, stacked */}
        <div className="bg-d-card border border-d-border rounded-[14px] px-6 py-[22px]">
          <div className="relative flex items-center gap-2.5 text-d-fg mb-4">
            <span className="w-7 h-7 rounded-md inline-flex items-center justify-center bg-d-card-2 text-d-fg-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9"/><path d="M12 12L19 5"/>
              </svg>
            </span>
            <span className="text-[15px] font-semibold text-d-fg">Plan limits</span>
            <div className="ml-auto inline-flex gap-1">
              <button className="inline-flex items-center gap-1.5 bg-transparent border border-transparent text-d-fg-3 cursor-pointer text-xs font-medium font-sans px-2.5 py-1.5 rounded-md transition-colors hover:bg-d-card-2 hover:text-d-fg hover:border-d-border-2">Manage</button>
            </div>
          </div>
          <div className="text-d-fg-3 text-[12.5px] -mt-2 mb-4.5">
            Legacy plan &middot; API 300/min
          </div>
          <div className="flex flex-col gap-4.5">
            <div className="flex flex-col gap-2">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-medium text-d-fg-3">Users</span>
                <span className="text-sm font-semibold text-d-fg">3<span className="text-d-fg-3 not-italic font-medium"> / 3</span></span>
              </div>
              <div className="relative h-1.5 rounded-full bg-d-card-2 overflow-hidden"><div className="absolute inset-y-0 left-0 rounded-full bg-yellow" style={{width: "100%"}}></div></div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-medium text-d-fg-3">Templates</span>
                <span className="text-sm font-semibold text-d-fg">4<span className="text-d-fg-3 not-italic font-medium"> / 10</span></span>
              </div>
              <div className="relative h-1.5 rounded-full bg-d-card-2 overflow-hidden"><div className="absolute inset-y-0 left-0 rounded-full bg-green" style={{width: "40%"}}></div></div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-medium text-d-fg-3">Journeys</span>
                <span className="text-sm font-semibold text-d-fg">2<span className="text-d-fg-3 not-italic font-medium"> / 10</span></span>
              </div>
              <div className="relative h-1.5 rounded-full bg-d-card-2 overflow-hidden"><div className="absolute inset-y-0 left-0 rounded-full bg-green" style={{width: "20%"}}></div></div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-medium text-d-fg-3">Recipients</span>
                <span className="text-sm font-semibold text-d-fg">12,408<span className="text-d-fg-3 not-italic font-medium"> reached</span></span>
              </div>
              <div className="relative h-1.5 rounded-full bg-d-card-2 overflow-hidden"><div className="absolute inset-y-0 left-0 rounded-full bg-indigo" style={{width: "62%"}}></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopOptionB;
