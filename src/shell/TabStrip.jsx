import React from 'react';

const TAB_ICONS = {
  "Billing Addresses": "M19 11c0 7-7 11-7 11s-7-4-7-11a7 7 0 0 1 14 0z M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  "Users": "M16 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 21a8 8 0 0 1 16 0",
  "Sub-Accounts": "M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16 M16 9h4a1 1 0 0 1 1 1v11 M8 7h.01M8 11h.01M8 15h.01M12 7h.01M12 11h.01",
  "Campaigns": "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  "Invoices": "M9 2h6a2 2 0 0 1 2 2v16l-3-2-2 2-2-2-2 2-3-2V4a2 2 0 0 1 2-2zM9 7h6M9 11h6M9 15h4",
  "Subscription History": "M3 12a9 9 0 1 0 9-9 M3 4v5h5 M12 7v5l3 2",
  "Journeys": "M9 18l6-6-6-6",
  "Support Tickets": "M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4V8z",
  "Milestones": "M4 22V4 M4 4h12l-2 4 2 4H4",
  "Balance History": "M3 3v18h18 M7 14l4-4 3 3 5-7",
  "Pricing Addons": "M12 1v22 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
  "Account Addons": "M12 5v14M5 12h14",
  "Audit Log": "M9 11l3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",
};

const TabStrip = ({ tabs, active, onChange }) => (
  <div className="flex flex-wrap gap-1 bg-d-card border border-d-border p-1.5 rounded-xl mt-7 mb-5">
    {tabs.map((t) => (
      <span key={t}
        className={"inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-sm font-medium cursor-pointer whitespace-nowrap transition-colors" + (t === active ? " bg-d-card-2 text-d-fg" : " text-d-fg-3 hover:text-d-fg")}
        onClick={()=>onChange && onChange(t)}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d={TAB_ICONS[t] || ""}/>
        </svg>
        {t}
      </span>
    ))}
  </div>
);

export default TabStrip;
