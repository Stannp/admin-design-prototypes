import React from 'react';

// Local VaIcon for tab panels (self-contained)
const VaIcon = ({ name, size = 18, color = "currentColor", stroke = 1.75 }) => {
  const paths = {
    plus: "M12 5v14M5 12h14",
    pin: "M19 11c0 7-7 11-7 11s-7-4-7-11a7 7 0 0 1 14 0z M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
    info: "M12 16v-4M12 8h.01 M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z",
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[name] || ""}/>
    </svg>
  );
};

// ============================================================
// Campaigns
// ============================================================
export const CampaignsPanel = ({ campaigns }) => {
  const StatusPill = ({ status }) => {
    const map = {
      "Delivered": "green",
      "Dispatched": "indigo",
      "In production": "yellow",
      "Booked": "neutral",
      "Paused": "orange",
      "Cancelled": "red",
    };
    const variant = map[status] || "off";
    const colorMap = {
      green: "bg-d-green-bg text-d-green-fg",
      indigo: "bg-d-indigo-bg text-d-indigo-fg",
      yellow: "bg-d-yellow-bg text-d-yellow-fg",
      neutral: "bg-d-neutral-bg text-d-neutral-fg",
      orange: "bg-d-orange-bg text-d-orange-fg",
      red: "bg-d-red-bg text-d-red-fg",
      off: "bg-d-neutral-bg text-d-fg-3",
    };
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11.5px] font-semibold leading-snug ${colorMap[variant]}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-current" />
        {status}
      </span>
    );
  };
  return (
    <div className="bg-d-card border border-d-border rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-d-border">
        <div>
          <span className="text-lg font-semibold text-d-fg">Campaigns</span>
          <span className="ml-2 text-d-fg-3 font-medium text-sm">{campaigns.length} &middot; 142 lifetime</span>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 px-3 py-[7px] rounded-md font-sans font-semibold text-xs border border-transparent cursor-pointer transition-[filter,background] bg-d-card text-d-fg-2 border-d-border-2 hover:bg-d-card-hover hover:text-d-fg">Export CSV</button>
          <button className="inline-flex items-center gap-2 px-3 py-[7px] rounded-md font-sans font-semibold text-xs border border-transparent cursor-pointer transition-[filter,background] bg-orange text-white hover:brightness-110">
            <VaIcon name="plus" size={13}/>
            New campaign
          </button>
        </div>
      </div>
      <div className="flex items-center gap-3 px-6 py-3.5 border-b border-d-border bg-d-bg-2">
        <div className="inline-flex items-center gap-2 bg-d-card border border-d-border px-3.5 py-2 rounded-lg text-d-fg-3 text-sm w-70">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>
          </svg>
          <span>Search campaigns</span>
        </div>
        <span className="inline-flex items-center gap-1.5 bg-d-card border border-d-border-2 rounded-md px-2.5 py-1.5 text-xs text-d-fg-2 cursor-pointer">
          All formats
          <svg className="text-d-fg-3" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
        </span>
        <span className="inline-flex items-center gap-1.5 bg-d-card border border-d-border-2 rounded-md px-2.5 py-1.5 text-xs text-d-fg-2 cursor-pointer">
          All statuses
          <svg className="text-d-fg-3" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
        </span>
        <span className="inline-flex items-center gap-1.5 bg-d-card border border-d-border-2 rounded-md px-2.5 py-1.5 text-xs text-d-fg-2 cursor-pointer">
          Last 90 days
          <svg className="text-d-fg-3" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
        </span>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left px-6 py-3 text-[11px] font-semibold text-d-fg-3 uppercase tracking-[0.05em] bg-d-bg-2 border-b border-d-border whitespace-nowrap">ID</th>
            <th className="text-left px-6 py-3 text-[11px] font-semibold text-d-fg-3 uppercase tracking-[0.05em] bg-d-bg-2 border-b border-d-border whitespace-nowrap">Campaign</th>
            <th className="text-left px-6 py-3 text-[11px] font-semibold text-d-fg-3 uppercase tracking-[0.05em] bg-d-bg-2 border-b border-d-border whitespace-nowrap">Format</th>
            <th className="text-right px-6 py-3 text-[11px] font-semibold text-d-fg-3 uppercase tracking-[0.05em] bg-d-bg-2 border-b border-d-border whitespace-nowrap">Recipients</th>
            <th className="text-right px-6 py-3 text-[11px] font-semibold text-d-fg-3 uppercase tracking-[0.05em] bg-d-bg-2 border-b border-d-border whitespace-nowrap">Cost</th>
            <th className="text-left px-6 py-3 text-[11px] font-semibold text-d-fg-3 uppercase tracking-[0.05em] bg-d-bg-2 border-b border-d-border whitespace-nowrap">Status</th>
            <th className="text-left px-6 py-3 text-[11px] font-semibold text-d-fg-3 uppercase tracking-[0.05em] bg-d-bg-2 border-b border-d-border whitespace-nowrap">Booked</th>
            <th className="text-right px-6 py-3 text-[11px] font-semibold text-d-fg-3 uppercase tracking-[0.05em] bg-d-bg-2 border-b border-d-border whitespace-nowrap">Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((c, i) => (
            <tr key={i} className="hover:bg-d-bg-2 last:[&>td]:border-b-0">
              <td className="px-6 py-3.5 text-sm text-d-fg border-b border-d-border align-middle tabular-nums text-d-fg-3">#{c.id}</td>
              <td className="px-6 py-3.5 text-sm text-d-fg border-b border-d-border align-middle"><div className="font-medium">{c.name}</div></td>
              <td className="px-6 py-3.5 text-sm text-d-fg-2 border-b border-d-border align-middle">{c.format}</td>
              <td className="px-6 py-3.5 text-sm text-d-fg border-b border-d-border align-middle tabular-nums text-right">{c.recipients}</td>
              <td className="px-6 py-3.5 text-sm text-d-fg border-b border-d-border align-middle tabular-nums text-right font-medium">{c.cost}</td>
              <td className="px-6 py-3.5 text-sm text-d-fg border-b border-d-border align-middle"><StatusPill status={c.status}/></td>
              <td className="px-6 py-3.5 text-sm text-d-fg-2 border-b border-d-border align-middle tabular-nums">{c.booked}</td>
              <td className="px-6 py-3.5 text-sm text-d-fg border-b border-d-border align-middle">
                <div className="flex gap-1.5 justify-end">
                  <button className="inline-flex items-center gap-1.5 bg-transparent border border-transparent text-d-fg-3 cursor-pointer text-[11px] font-medium font-sans px-1.5 py-0.5 rounded-md transition-colors hover:bg-d-card-2 hover:text-d-fg hover:border-d-border-2">View</button>
                  <button className="inline-flex items-center gap-1.5 bg-transparent border border-transparent text-d-fg-3 cursor-pointer text-[11px] font-medium font-sans px-1.5 py-0.5 rounded-md transition-colors hover:bg-d-card-2 hover:text-d-fg hover:border-d-border-2">Duplicate</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ============================================================
// Support Tickets
// ============================================================
export const TicketsPanel = ({ tickets }) => {
  const PriorityPill = ({ priority }) => {
    const map = { High: "red", Medium: "orange", Low: "neutral" };
    const variant = map[priority] || "neutral";
    const colorMap = {
      red: "bg-d-red-bg text-d-red-fg",
      orange: "bg-d-orange-bg text-d-orange-fg",
      neutral: "bg-d-neutral-bg text-d-neutral-fg",
    };
    return <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11.5px] font-semibold leading-snug ${colorMap[variant]}`}>{priority}</span>;
  };
  const StatusDotPill = ({ status, variant }) => {
    const colorMap = {
      orange: "bg-d-orange-bg text-d-orange-fg",
      yellow: "bg-d-yellow-bg text-d-yellow-fg",
      green: "bg-d-green-bg text-d-green-fg",
    };
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11.5px] font-semibold leading-snug ${colorMap[variant]}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-current" />
        {status}
      </span>
    );
  };
  return (
    <div className="bg-d-card border border-d-border rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-d-border">
        <div>
          <span className="text-lg font-semibold text-d-fg">Support tickets</span>
          <span className="ml-2 text-d-fg-3 font-medium text-sm">{tickets.filter(t => t.status === "Open").length} open &middot; {tickets.length} total</span>
        </div>
        <button className="inline-flex items-center gap-2 px-3 py-[7px] rounded-md font-sans font-semibold text-xs border border-transparent cursor-pointer transition-[filter,background] bg-orange text-white hover:brightness-110">
          <VaIcon name="plus" size={13}/>
          Raise ticket
        </button>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left px-6 py-3 text-[11px] font-semibold text-d-fg-3 uppercase tracking-[0.05em] bg-d-bg-2 border-b border-d-border whitespace-nowrap">ID</th>
            <th className="text-left px-6 py-3 text-[11px] font-semibold text-d-fg-3 uppercase tracking-[0.05em] bg-d-bg-2 border-b border-d-border whitespace-nowrap">Subject</th>
            <th className="text-left px-6 py-3 text-[11px] font-semibold text-d-fg-3 uppercase tracking-[0.05em] bg-d-bg-2 border-b border-d-border whitespace-nowrap">Priority</th>
            <th className="text-left px-6 py-3 text-[11px] font-semibold text-d-fg-3 uppercase tracking-[0.05em] bg-d-bg-2 border-b border-d-border whitespace-nowrap">Status</th>
            <th className="text-left px-6 py-3 text-[11px] font-semibold text-d-fg-3 uppercase tracking-[0.05em] bg-d-bg-2 border-b border-d-border whitespace-nowrap">Assigned to</th>
            <th className="text-left px-6 py-3 text-[11px] font-semibold text-d-fg-3 uppercase tracking-[0.05em] bg-d-bg-2 border-b border-d-border whitespace-nowrap">Updated</th>
            <th className="text-right px-6 py-3 text-[11px] font-semibold text-d-fg-3 uppercase tracking-[0.05em] bg-d-bg-2 border-b border-d-border whitespace-nowrap"></th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((t, i) => (
            <tr key={i} className="hover:bg-d-bg-2 last:[&>td]:border-b-0">
              <td className="px-6 py-3.5 text-sm text-d-fg border-b border-d-border align-middle tabular-nums text-d-fg-3">#{t.id}</td>
              <td className="px-6 py-3.5 text-sm text-d-fg border-b border-d-border align-middle">
                <div className="font-medium">{t.subject}</div>
                <div className="text-xs text-d-fg-3 mt-0.5">{t.lastMessage}</div>
              </td>
              <td className="px-6 py-3.5 text-sm text-d-fg border-b border-d-border align-middle"><PriorityPill priority={t.priority}/></td>
              <td className="px-6 py-3.5 text-sm text-d-fg border-b border-d-border align-middle">
                {t.status === "Open" && <StatusDotPill status="Open" variant="orange" />}
                {t.status === "Pending" && <StatusDotPill status="Pending" variant="yellow" />}
                {t.status === "Resolved" && <StatusDotPill status="Resolved" variant="green" />}
              </td>
              <td className="px-6 py-3.5 text-sm text-d-fg-2 border-b border-d-border align-middle">{t.assignedTo}</td>
              <td className="px-6 py-3.5 text-sm text-d-fg-2 border-b border-d-border align-middle">{t.updated}</td>
              <td className="px-6 py-3.5 text-sm text-d-fg border-b border-d-border align-middle">
                <div className="flex gap-1.5 justify-end">
                  <button className="inline-flex items-center gap-1.5 bg-transparent border border-transparent text-d-fg-3 cursor-pointer text-[11px] font-medium font-sans px-1.5 py-0.5 rounded-md transition-colors hover:bg-d-card-2 hover:text-d-fg hover:border-d-border-2">Open</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ============================================================
// Invoices
// ============================================================
export const InvoicesPanel = ({ invoices }) => (
  <div className="bg-d-card border border-d-border rounded-xl overflow-hidden">
    <div className="flex items-center justify-between px-6 py-5 border-b border-d-border">
      <div>
        <span className="text-lg font-semibold text-d-fg">Invoices</span>
        <span className="ml-2 text-d-fg-3 font-medium text-sm">{invoices.length}</span>
      </div>
      <button className="inline-flex items-center gap-2 px-3 py-[7px] rounded-md font-sans font-semibold text-xs border border-transparent cursor-pointer transition-[filter,background] bg-d-card text-d-fg-2 border-d-border-2 hover:bg-d-card-hover hover:text-d-fg">Export all</button>
    </div>
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="text-left px-6 py-3 text-[11px] font-semibold text-d-fg-3 uppercase tracking-[0.05em] bg-d-bg-2 border-b border-d-border whitespace-nowrap">Number</th>
          <th className="text-left px-6 py-3 text-[11px] font-semibold text-d-fg-3 uppercase tracking-[0.05em] bg-d-bg-2 border-b border-d-border whitespace-nowrap">Issued</th>
          <th className="text-left px-6 py-3 text-[11px] font-semibold text-d-fg-3 uppercase tracking-[0.05em] bg-d-bg-2 border-b border-d-border whitespace-nowrap">Due</th>
          <th className="text-right px-6 py-3 text-[11px] font-semibold text-d-fg-3 uppercase tracking-[0.05em] bg-d-bg-2 border-b border-d-border whitespace-nowrap">Amount</th>
          <th className="text-left px-6 py-3 text-[11px] font-semibold text-d-fg-3 uppercase tracking-[0.05em] bg-d-bg-2 border-b border-d-border whitespace-nowrap">Status</th>
          <th className="text-right px-6 py-3 text-[11px] font-semibold text-d-fg-3 uppercase tracking-[0.05em] bg-d-bg-2 border-b border-d-border whitespace-nowrap"></th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((inv, i) => (
          <tr key={i} className="hover:bg-d-bg-2 last:[&>td]:border-b-0">
            <td className="px-6 py-3.5 text-sm text-d-fg border-b border-d-border align-middle tabular-nums font-medium">{inv.number}</td>
            <td className="px-6 py-3.5 text-sm text-d-fg-2 border-b border-d-border align-middle">{inv.issued}</td>
            <td className={`px-6 py-3.5 text-sm border-b border-d-border align-middle ${inv.status === "Overdue" ? "text-d-red-fg" : "text-d-fg-2"}`}>{inv.due}</td>
            <td className="px-6 py-3.5 text-sm text-d-fg border-b border-d-border align-middle tabular-nums text-right font-medium">{inv.amount}</td>
            <td className="px-6 py-3.5 text-sm text-d-fg border-b border-d-border align-middle">
              {inv.status === "Paid" && <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11.5px] font-semibold leading-snug bg-d-green-bg text-d-green-fg"><span className="w-1.5 h-1.5 rounded-full bg-current" />Paid</span>}
              {inv.status === "Pending" && <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11.5px] font-semibold leading-snug bg-d-yellow-bg text-d-yellow-fg"><span className="w-1.5 h-1.5 rounded-full bg-current" />Pending</span>}
              {inv.status === "Overdue" && <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11.5px] font-semibold leading-snug bg-d-red-bg text-d-red-fg"><span className="w-1.5 h-1.5 rounded-full bg-current" />Overdue</span>}
            </td>
            <td className="px-6 py-3.5 text-sm text-d-fg border-b border-d-border align-middle">
              <div className="flex gap-1.5 justify-end">
                <button className="inline-flex items-center gap-1.5 bg-transparent border border-transparent text-d-fg-3 cursor-pointer text-[11px] font-medium font-sans px-1.5 py-0.5 rounded-md transition-colors hover:bg-d-card-2 hover:text-d-fg hover:border-d-border-2">PDF</button>
                <button className="inline-flex items-center gap-1.5 bg-transparent border border-transparent text-d-fg-3 cursor-pointer text-[11px] font-medium font-sans px-1.5 py-0.5 rounded-md transition-colors hover:bg-d-card-2 hover:text-d-fg hover:border-d-border-2">View</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ============================================================
// Billing Addresses
// ============================================================
export const BillingAddressesPanel = ({ openModal }) => (
  <div className="bg-d-card border border-d-border rounded-xl overflow-hidden">
    <div className="flex items-center justify-between px-6 py-5 border-b border-d-border">
      <div>
        <span className="text-lg font-semibold text-d-fg">Billing addresses</span>
        <span className="ml-2 text-d-fg-3 font-medium text-sm">0</span>
      </div>
      <button className="inline-flex items-center gap-2 px-3 py-[7px] rounded-md font-sans font-semibold text-xs border border-transparent cursor-pointer transition-[filter,background] bg-orange text-white hover:brightness-110" onClick={()=>openModal("billingAddress")}>
        <VaIcon name="plus" size={13}/>
        Add address
      </button>
    </div>
    <div className="flex items-center gap-3 px-6 py-3.5 border-b border-d-border bg-d-bg-2">
      <div className="inline-flex items-center gap-2 bg-d-card border border-d-border px-3.5 py-2 rounded-lg text-d-fg-3 text-sm w-80">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>
        </svg>
        <span>Search addresses</span>
      </div>
    </div>
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="text-left px-6 py-3 text-[11px] font-semibold text-d-fg-3 uppercase tracking-[0.05em] bg-d-bg-2 border-b border-d-border whitespace-nowrap">ID</th>
          <th className="text-left px-6 py-3 text-[11px] font-semibold text-d-fg-3 uppercase tracking-[0.05em] bg-d-bg-2 border-b border-d-border whitespace-nowrap">Label</th>
          <th className="text-left px-6 py-3 text-[11px] font-semibold text-d-fg-3 uppercase tracking-[0.05em] bg-d-bg-2 border-b border-d-border whitespace-nowrap">Company</th>
          <th className="text-left px-6 py-3 text-[11px] font-semibold text-d-fg-3 uppercase tracking-[0.05em] bg-d-bg-2 border-b border-d-border whitespace-nowrap">Name</th>
          <th className="text-left px-6 py-3 text-[11px] font-semibold text-d-fg-3 uppercase tracking-[0.05em] bg-d-bg-2 border-b border-d-border whitespace-nowrap">Address</th>
          <th className="text-left px-6 py-3 text-[11px] font-semibold text-d-fg-3 uppercase tracking-[0.05em] bg-d-bg-2 border-b border-d-border whitespace-nowrap">Town</th>
          <th className="text-left px-6 py-3 text-[11px] font-semibold text-d-fg-3 uppercase tracking-[0.05em] bg-d-bg-2 border-b border-d-border whitespace-nowrap">Postcode</th>
          <th className="text-left px-6 py-3 text-[11px] font-semibold text-d-fg-3 uppercase tracking-[0.05em] bg-d-bg-2 border-b border-d-border whitespace-nowrap">Country</th>
        </tr>
      </thead>
    </table>
    <div className="px-6 py-14 flex flex-col items-center gap-3 text-d-fg-3">
      <VaIcon name="pin" size={32} stroke={1.4}/>
      <div className="text-base font-semibold text-d-fg">No billing addresses</div>
      <div className="text-sm">This account has no billing addresses configured.</div>
    </div>
  </div>
);

// ============================================================
// Users
// ============================================================
export const UsersPanel = ({ users, openModal, onMakePrimary, isPending, isDeleted }) => (
  <div className="bg-d-card border border-d-border rounded-xl overflow-hidden">
    <div className="flex items-center justify-between px-6 py-5 border-b border-d-border">
      <div className="flex items-center gap-3">
        <span className="text-lg font-semibold text-d-fg">Account users</span>
        <span className="text-d-fg-3 font-medium text-sm">{users.length} of 3</span>
        {isPending && <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11.5px] font-semibold leading-snug bg-d-orange-bg text-d-orange-fg"><span className="w-1.5 h-1.5 rounded-full bg-current"/>Login blocked</span>}
        {isDeleted && <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11.5px] font-semibold leading-snug bg-d-red-bg text-d-red-fg">Anonymised</span>}
      </div>
      {!isPending && !isDeleted && openModal && (
        <button className="inline-flex items-center gap-2 px-3 py-[7px] rounded-md font-sans font-semibold text-xs border border-transparent cursor-pointer transition-[filter,background] bg-orange text-white hover:brightness-110" onClick={()=>openModal("addUser")}>
          <VaIcon name="plus" size={13}/>
          Add user
        </button>
      )}
    </div>
    <div className="flex items-center gap-3 px-6 py-3.5 border-b border-d-border bg-d-bg-2">
      <div className="inline-flex items-center gap-2 bg-d-card border border-d-border px-3.5 py-2 rounded-lg text-d-fg-3 text-sm w-80">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>
        </svg>
        <span>Search users</span>
      </div>
    </div>
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="text-left px-6 py-3 text-[11px] font-semibold text-d-fg-3 uppercase tracking-[0.05em] bg-d-bg-2 border-b border-d-border whitespace-nowrap">Name</th>
          <th className="text-left px-6 py-3 text-[11px] font-semibold text-d-fg-3 uppercase tracking-[0.05em] bg-d-bg-2 border-b border-d-border whitespace-nowrap">Email</th>
          <th className="text-left px-6 py-3 text-[11px] font-semibold text-d-fg-3 uppercase tracking-[0.05em] bg-d-bg-2 border-b border-d-border whitespace-nowrap">Role</th>
          <th className="text-left px-6 py-3 text-[11px] font-semibold text-d-fg-3 uppercase tracking-[0.05em] bg-d-bg-2 border-b border-d-border whitespace-nowrap">MFA</th>
          <th className="text-left px-6 py-3 text-[11px] font-semibold text-d-fg-3 uppercase tracking-[0.05em] bg-d-bg-2 border-b border-d-border whitespace-nowrap">Last login</th>
          <th className="text-right px-6 py-3 text-[11px] font-semibold text-d-fg-3 uppercase tracking-[0.05em] bg-d-bg-2 border-b border-d-border whitespace-nowrap">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u, i) => (
          <tr key={i} className="hover:bg-d-bg-2 last:[&>td]:border-b-0">
            <td className="px-6 py-3.5 text-sm text-d-fg border-b border-d-border align-middle">
              <div className="flex items-center gap-2.5">
                <div className="w-[30px] h-[30px] rounded-full bg-d-card-2 border border-d-border-2 inline-flex items-center justify-center text-[11px] font-semibold text-d-fg-2">{u.name.split(" ").map(s=>s[0]).slice(0,2).join("")}</div>
                <div>
                  <div className="font-medium">{u.name}</div>
                  {u.primary && <div className="text-xs text-d-fg-3 mt-0.5">Primary user</div>}
                </div>
              </div>
            </td>
            <td className="px-6 py-3.5 text-sm text-d-fg border-b border-d-border align-middle">{u.email}</td>
            <td className="px-6 py-3.5 text-sm text-d-fg border-b border-d-border align-middle">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11.5px] font-semibold leading-snug ${u.role === "Owner" ? "bg-d-indigo-bg text-d-indigo-fg" : "bg-d-neutral-bg text-d-neutral-fg"}`}>{u.role}</span>
            </td>
            <td className="px-6 py-3.5 text-sm text-d-fg border-b border-d-border align-middle">
              {u.mfa
                ? <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11.5px] font-semibold leading-snug bg-d-green-bg text-d-green-fg"><span className="w-1.5 h-1.5 rounded-full bg-current" />Enabled</span>
                : <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11.5px] font-semibold leading-snug bg-d-neutral-bg text-d-fg-3">Off</span>}
            </td>
            <td className={`px-6 py-3.5 text-sm border-b border-d-border align-middle ${u.lastLogin === "Never" ? "text-d-fg-3" : "text-d-fg"}`}>
              {u.lastLogin}
            </td>
            <td className="px-6 py-3.5 text-sm text-d-fg border-b border-d-border align-middle">
              {!isPending && !isDeleted && (
                <div className="flex gap-1.5 justify-end">
                  <button className="inline-flex items-center gap-1.5 bg-transparent border border-transparent text-d-fg-3 cursor-pointer text-[11px] font-medium font-sans px-1.5 py-0.5 rounded-md transition-colors hover:bg-d-card-2 hover:text-d-fg hover:border-d-border-2">Edit</button>
                  {!u.primary && (
                    <button className="inline-flex items-center gap-1.5 bg-transparent border border-transparent text-d-fg-3 cursor-pointer text-[11px] font-medium font-sans px-1.5 py-0.5 rounded-md transition-colors hover:bg-d-card-2 hover:text-d-fg hover:border-d-border-2"
                      onClick={()=>onMakePrimary && onMakePrimary(u)}>
                      Make primary
                    </button>
                  )}
                  {!u.primary && <button className="inline-flex items-center gap-1.5 bg-transparent border border-transparent text-d-red-fg cursor-pointer text-[11px] font-medium font-sans px-1.5 py-0.5 rounded-md transition-colors hover:bg-d-red-bg hover:text-d-red-fg hover:border-[rgba(232,67,42,0.3)]">Remove</button>}
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ============================================================
// Sub-Accounts
// ============================================================
export const SubAccountsPanel = ({ subAccounts, openRemoveSub }) => (
  <div className="bg-d-card border border-d-border rounded-xl overflow-hidden">
    <div className="flex items-center justify-between px-6 py-5 border-b border-d-border">
      <div>
        <span className="text-lg font-semibold text-d-fg">Sub-accounts</span>
        <span className="ml-2 text-d-fg-3 font-medium text-sm">{subAccounts.length}</span>
      </div>
      <button className="inline-flex items-center gap-2 px-3 py-[7px] rounded-md font-sans font-semibold text-xs border border-transparent cursor-pointer transition-[filter,background] bg-d-card text-d-fg-2 border-d-border-2 hover:bg-d-card-hover hover:text-d-fg">
        <VaIcon name="plus" size={13}/>
        Link sub-account
      </button>
    </div>
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="text-left px-6 py-3 text-[11px] font-semibold text-d-fg-3 uppercase tracking-[0.05em] bg-d-bg-2 border-b border-d-border whitespace-nowrap">ID</th>
          <th className="text-left px-6 py-3 text-[11px] font-semibold text-d-fg-3 uppercase tracking-[0.05em] bg-d-bg-2 border-b border-d-border whitespace-nowrap">Company</th>
          <th className="text-left px-6 py-3 text-[11px] font-semibold text-d-fg-3 uppercase tracking-[0.05em] bg-d-bg-2 border-b border-d-border whitespace-nowrap">Primary user</th>
          <th className="text-left px-6 py-3 text-[11px] font-semibold text-d-fg-3 uppercase tracking-[0.05em] bg-d-bg-2 border-b border-d-border whitespace-nowrap">Balance</th>
          <th className="text-left px-6 py-3 text-[11px] font-semibold text-d-fg-3 uppercase tracking-[0.05em] bg-d-bg-2 border-b border-d-border whitespace-nowrap">Status</th>
          <th className="text-right px-6 py-3 text-[11px] font-semibold text-d-fg-3 uppercase tracking-[0.05em] bg-d-bg-2 border-b border-d-border whitespace-nowrap">Actions</th>
        </tr>
      </thead>
      <tbody>
        {subAccounts.map((s, i) => (
          <tr key={i} className="hover:bg-d-bg-2 last:[&>td]:border-b-0">
            <td className="px-6 py-3.5 text-sm text-d-fg-2 border-b border-d-border align-middle tabular-nums">{s.id}</td>
            <td className="px-6 py-3.5 text-sm text-d-fg border-b border-d-border align-middle"><div className="font-medium">{s.name}</div></td>
            <td className="px-6 py-3.5 text-sm text-d-fg-2 border-b border-d-border align-middle">{s.primaryUser}</td>
            <td className="px-6 py-3.5 text-sm text-d-fg border-b border-d-border align-middle tabular-nums">{s.balance}</td>
            <td className="px-6 py-3.5 text-sm text-d-fg border-b border-d-border align-middle">
              {s.status === "active" && <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11.5px] font-semibold leading-snug bg-d-green-bg text-d-green-fg"><span className="w-1.5 h-1.5 rounded-full bg-current" />Active</span>}
              {s.status === "paused" && <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11.5px] font-semibold leading-snug bg-d-orange-bg text-d-orange-fg"><span className="w-1.5 h-1.5 rounded-full bg-current" />Paused</span>}
              {s.status === "trial" && <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11.5px] font-semibold leading-snug bg-d-yellow-bg text-d-yellow-fg"><span className="w-1.5 h-1.5 rounded-full bg-current" />Trial</span>}
            </td>
            <td className="px-6 py-3.5 text-sm text-d-fg border-b border-d-border align-middle">
              <div className="flex gap-1.5 justify-end">
                <button className="inline-flex items-center gap-1.5 bg-transparent border border-transparent text-d-fg-3 cursor-pointer text-[11px] font-medium font-sans px-1.5 py-0.5 rounded-md transition-colors hover:bg-d-card-2 hover:text-d-fg hover:border-d-border-2">View</button>
                <button className="inline-flex items-center gap-1.5 bg-transparent border border-transparent text-d-red-fg cursor-pointer text-[11px] font-medium font-sans px-1.5 py-0.5 rounded-md transition-colors hover:bg-d-red-bg hover:text-d-red-fg hover:border-[rgba(232,67,42,0.3)]"
                  onClick={()=>openRemoveSub(s)}>
                  Remove from parent
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ============================================================
// Audit Log
// ============================================================
export const AuditLogPanel = ({ entries }) => (
  <div className="bg-d-card border border-d-border rounded-xl overflow-hidden">
    <div className="flex items-center justify-between px-6 py-5 border-b border-d-border">
      <div>
        <span className="text-lg font-semibold text-d-fg">Audit log</span>
        <span className="ml-2 text-d-fg-3 font-medium text-sm">{entries.length} entries</span>
      </div>
      <button className="inline-flex items-center gap-2 px-3 py-[7px] rounded-md font-sans font-semibold text-xs border border-transparent cursor-pointer transition-[filter,background] bg-d-card text-d-fg-2 border-d-border-2 hover:bg-d-card-hover hover:text-d-fg">
        Export CSV
      </button>
    </div>
    <div className="flex items-center gap-2.5 px-6 py-3.5 border-b border-d-border bg-d-bg-2">
      <span className="inline-flex items-center gap-1.5 bg-d-card border border-d-border-2 rounded-md px-2.5 py-1.5 text-xs text-d-fg-2 cursor-pointer">
        <svg className="text-d-fg-3" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
        </svg>
        Last 30 days
        <svg className="text-d-fg-3" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </span>
      <span className="inline-flex items-center gap-1.5 bg-d-card border border-d-border-2 rounded-md px-2.5 py-1.5 text-xs text-d-fg-2 cursor-pointer">
        <svg className="text-d-fg-3" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 3H2l8 9v7l4 2v-9l8-9z"/>
        </svg>
        All change types
        <svg className="text-d-fg-3" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </span>
      <div className="ml-auto text-d-fg-3 text-xs">
        Most recent first &middot; Read-only
      </div>
    </div>
    <div className="px-6 pt-2 pb-4">
      {entries.map((e, i) => (
        <div className="grid grid-cols-[160px_220px_1fr] gap-4.5 items-baseline py-3.5 border-b border-d-border last:border-b-0" key={i}>
          <span className="text-xs text-d-fg-3 tabular-nums">{e.time}</span>
          <span className="flex items-center gap-2 text-sm text-d-fg-2">
            <span className="w-[22px] h-[22px] rounded-full bg-d-card-2 border border-d-border-2 inline-flex items-center justify-center text-[10px] font-semibold text-d-fg-2">{e.who.split(" ").map(s=>s[0]).slice(0,2).join("")}</span>
            <span>{e.who}</span>
          </span>
          <span className="text-sm text-d-fg-2 leading-normal">
            {e.action === "marked-for-deletion" ? (
              <><span className="inline-block px-2 py-px rounded bg-d-orange-bg text-d-orange-fg text-xs font-sans font-medium">Marked for deletion</span>
                {e.detail && <span className="ml-2 text-d-fg-3">{e.detail}</span>}</>
            ) : e.action === "cancelled-deletion" ? (
              <><span className="inline-block px-2 py-px rounded bg-d-green-bg text-d-green-fg text-xs font-sans font-medium">Deletion cancelled</span>
                {e.detail && <span className="ml-2 text-d-fg-3">{e.detail}</span>}</>
            ) : e.action === "deleted" ? (
              <><span className="inline-block px-2 py-px rounded bg-d-red-bg text-d-red-fg text-xs font-sans font-medium">Account deleted</span>
                {e.detail && <span className="ml-2 text-d-fg-3">{e.detail}</span>}</>
            ) : e.created ? (
              <>Created <span className="inline-block font-semibold text-d-fg">{e.field}</span>
                {e.value && <> set to <span className="inline-block px-2 py-px rounded bg-d-green-bg text-d-green-fg text-xs font-sans font-medium">{e.value}</span></>}</>
            ) : e.deleted ? (
              <>Removed <span className="inline-block font-semibold text-d-fg">{e.field}</span>
                {e.value && <> <span className="inline-block px-2 py-px rounded bg-d-red-bg text-d-red-fg text-xs font-sans font-medium line-through decoration-[rgba(248,113,113,.5)]">{e.value}</span></>}</>
            ) : (
              <>Changed <span className="inline-block font-semibold text-d-fg">{e.field}</span> from{" "}
                <span className="inline-block px-2 py-px rounded bg-d-red-bg text-d-red-fg text-xs font-sans font-medium line-through decoration-[rgba(248,113,113,.5)]">{e.from}</span>
                <span className="text-d-fg-4 mx-1.5">&rarr;</span>
                <span className="inline-block px-2 py-px rounded bg-d-green-bg text-d-green-fg text-xs font-sans font-medium">{e.to}</span>
              </>
            )}
          </span>
        </div>
      ))}
    </div>
  </div>
);

// Generic empty-state for tabs we haven't fully designed
export const EmptyTabPanel = ({ title, hint }) => (
  <div className="bg-d-card border border-d-border rounded-xl overflow-hidden">
    <div className="flex items-center justify-between px-6 py-5 border-b border-d-border">
      <div>
        <span className="text-lg font-semibold text-d-fg">{title}</span>
      </div>
    </div>
    <div className="px-6 py-18 flex flex-col items-center gap-3 text-d-fg-3">
      <div className="w-12 h-12 rounded-xl bg-d-card-2 inline-flex items-center justify-center">
        <VaIcon name="info" size={22} stroke={1.5}/>
      </div>
      <div className="text-base font-semibold text-d-fg">Nothing here yet</div>
      <div className="text-sm">{hint || "Records will show up here when there's activity."}</div>
    </div>
  </div>
);
