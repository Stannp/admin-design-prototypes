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
    return <span className={"va-pill va-pill--" + (map[status] || "off") + " va-pill--dot"}>{status}</span>;
  };
  return (
    <div className="va-tab-panel">
      <div className="va-tab-panel__head">
        <div>
          <span className="va-tab-panel__title">Campaigns</span>
          <span className="va-tab-panel__count">{campaigns.length} &middot; 142 lifetime</span>
        </div>
        <div style={{display:"flex", gap: 8}}>
          <button className="va-btn va-btn--ghost va-btn--sm">Export CSV</button>
          <button className="va-btn va-btn--orange va-btn--sm">
            <VaIcon name="plus" size={13}/>
            New campaign
          </button>
        </div>
      </div>
      <div className="va-tab-panel__toolbar">
        <div className="va-search" style={{width: 280}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>
          </svg>
          <span>Search campaigns</span>
        </div>
        <span className="va-audit-toolbar__group">
          All formats
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
        </span>
        <span className="va-audit-toolbar__group">
          All statuses
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
        </span>
        <span className="va-audit-toolbar__group">
          Last 90 days
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
        </span>
      </div>
      <table className="va-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Campaign</th>
            <th>Format</th>
            <th style={{textAlign:"right"}}>Recipients</th>
            <th style={{textAlign:"right"}}>Cost</th>
            <th>Status</th>
            <th>Booked</th>
            <th style={{textAlign:"right"}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((c, i) => (
            <tr key={i}>
              <td style={{fontVariantNumeric:"tabular-nums", color:"var(--d-fg-3)"}}>#{c.id}</td>
              <td><div style={{fontWeight: 500}}>{c.name}</div></td>
              <td style={{color:"var(--d-fg-2)"}}>{c.format}</td>
              <td style={{fontVariantNumeric:"tabular-nums", textAlign:"right"}}>{c.recipients}</td>
              <td style={{fontVariantNumeric:"tabular-nums", textAlign:"right", fontWeight: 500}}>{c.cost}</td>
              <td><StatusPill status={c.status}/></td>
              <td style={{color:"var(--d-fg-2)", fontVariantNumeric:"tabular-nums"}}>{c.booked}</td>
              <td>
                <div className="va-table__row-actions">
                  <button className="va-edit-btn va-edit-btn--inline">View</button>
                  <button className="va-edit-btn va-edit-btn--inline">Duplicate</button>
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
    return <span className={"va-pill va-pill--" + map[priority]}>{priority}</span>;
  };
  return (
    <div className="va-tab-panel">
      <div className="va-tab-panel__head">
        <div>
          <span className="va-tab-panel__title">Support tickets</span>
          <span className="va-tab-panel__count">{tickets.filter(t => t.status === "Open").length} open &middot; {tickets.length} total</span>
        </div>
        <button className="va-btn va-btn--orange va-btn--sm">
          <VaIcon name="plus" size={13}/>
          Raise ticket
        </button>
      </div>
      <table className="va-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Subject</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Assigned to</th>
            <th>Updated</th>
            <th style={{textAlign:"right"}}></th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((t, i) => (
            <tr key={i}>
              <td style={{fontVariantNumeric:"tabular-nums", color:"var(--d-fg-3)"}}>#{t.id}</td>
              <td>
                <div style={{fontWeight: 500}}>{t.subject}</div>
                <div className="va-table__sub">{t.lastMessage}</div>
              </td>
              <td><PriorityPill priority={t.priority}/></td>
              <td>
                {t.status === "Open" && <span className="va-pill va-pill--orange va-pill--dot">Open</span>}
                {t.status === "Pending" && <span className="va-pill va-pill--yellow va-pill--dot">Pending</span>}
                {t.status === "Resolved" && <span className="va-pill va-pill--green va-pill--dot">Resolved</span>}
              </td>
              <td style={{color:"var(--d-fg-2)"}}>{t.assignedTo}</td>
              <td style={{color:"var(--d-fg-2)"}}>{t.updated}</td>
              <td>
                <div className="va-table__row-actions">
                  <button className="va-edit-btn va-edit-btn--inline">Open</button>
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
  <div className="va-tab-panel">
    <div className="va-tab-panel__head">
      <div>
        <span className="va-tab-panel__title">Invoices</span>
        <span className="va-tab-panel__count">{invoices.length}</span>
      </div>
      <button className="va-btn va-btn--ghost va-btn--sm">Export all</button>
    </div>
    <table className="va-table">
      <thead>
        <tr>
          <th>Number</th>
          <th>Issued</th>
          <th>Due</th>
          <th style={{textAlign:"right"}}>Amount</th>
          <th>Status</th>
          <th style={{textAlign:"right"}}></th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((inv, i) => (
          <tr key={i}>
            <td style={{fontVariantNumeric:"tabular-nums", fontWeight: 500}}>{inv.number}</td>
            <td style={{color:"var(--d-fg-2)"}}>{inv.issued}</td>
            <td style={{color: inv.status === "Overdue" ? "var(--d-red-fg)" : "var(--d-fg-2)"}}>{inv.due}</td>
            <td style={{fontVariantNumeric:"tabular-nums", textAlign:"right", fontWeight: 500}}>{inv.amount}</td>
            <td>
              {inv.status === "Paid" && <span className="va-pill va-pill--green va-pill--dot">Paid</span>}
              {inv.status === "Pending" && <span className="va-pill va-pill--yellow va-pill--dot">Pending</span>}
              {inv.status === "Overdue" && <span className="va-pill va-pill--red va-pill--dot">Overdue</span>}
            </td>
            <td>
              <div className="va-table__row-actions">
                <button className="va-edit-btn va-edit-btn--inline">PDF</button>
                <button className="va-edit-btn va-edit-btn--inline">View</button>
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
  <div className="va-tab-panel">
    <div className="va-tab-panel__head">
      <div>
        <span className="va-tab-panel__title">Billing addresses</span>
        <span className="va-tab-panel__count">0</span>
      </div>
      <button className="va-btn va-btn--orange va-btn--sm" onClick={()=>openModal("billingAddress")}>
        <VaIcon name="plus" size={13}/>
        Add address
      </button>
    </div>
    <div className="va-tab-panel__toolbar">
      <div className="va-search" style={{width: 320}}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>
        </svg>
        <span>Search addresses</span>
      </div>
    </div>
    <table className="va-table">
      <thead>
        <tr>
          <th>ID</th><th>Label</th><th>Company</th><th>Name</th>
          <th>Address</th><th>Town</th><th>Postcode</th><th>Country</th>
        </tr>
      </thead>
    </table>
    <div style={{padding:"56px 24px", display:"flex", flexDirection:"column", alignItems:"center", gap: 12, color:"var(--d-fg-3)"}}>
      <VaIcon name="pin" size={32} stroke={1.4}/>
      <div style={{fontSize: 15, fontWeight: 600, color:"var(--d-fg)"}}>No billing addresses</div>
      <div style={{fontSize: 13}}>This account has no billing addresses configured.</div>
    </div>
  </div>
);

// ============================================================
// Users
// ============================================================
export const UsersPanel = ({ users, openModal, onMakePrimary }) => (
  <div className="va-tab-panel">
    <div className="va-tab-panel__head">
      <div>
        <span className="va-tab-panel__title">Account users</span>
        <span className="va-tab-panel__count">{users.length} of 3</span>
      </div>
      <button className="va-btn va-btn--orange va-btn--sm" onClick={()=>openModal("addUser")}>
        <VaIcon name="plus" size={13}/>
        Add user
      </button>
    </div>
    <div className="va-tab-panel__toolbar">
      <div className="va-search" style={{width: 320}}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>
        </svg>
        <span>Search users</span>
      </div>
    </div>
    <table className="va-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>MFA</th>
          <th>Last login</th>
          <th style={{textAlign:"right"}}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u, i) => (
          <tr key={i}>
            <td>
              <div style={{display:"flex", alignItems:"center", gap: 10}}>
                <div style={{
                  width: 30, height: 30, borderRadius: 999,
                  background: "var(--d-card-2)", border:"1px solid var(--d-border-2)",
                  display:"inline-flex", alignItems:"center", justifyContent:"center",
                  fontSize: 11, fontWeight: 600, color: "var(--d-fg-2)"
                }}>{u.name.split(" ").map(s=>s[0]).slice(0,2).join("")}</div>
                <div>
                  <div style={{fontWeight: 500}}>{u.name}</div>
                  {u.primary && <div className="va-table__sub">Primary user</div>}
                </div>
              </div>
            </td>
            <td>{u.email}</td>
            <td>
              <span className={"va-pill " + (u.role === "Owner" ? "va-pill--indigo" : "")}>{u.role}</span>
            </td>
            <td>
              {u.mfa
                ? <span className="va-pill va-pill--green va-pill--dot">Enabled</span>
                : <span className="va-pill va-pill--off">Off</span>}
            </td>
            <td style={{color: u.lastLogin === "Never" ? "var(--d-fg-3)" : "var(--d-fg)"}}>
              {u.lastLogin}
            </td>
            <td>
              <div className="va-table__row-actions">
                <button className="va-edit-btn va-edit-btn--inline">Edit</button>
                {!u.primary && (
                  <button className="va-edit-btn va-edit-btn--inline"
                    onClick={()=>onMakePrimary && onMakePrimary(u)}>
                    Make primary
                  </button>
                )}
                {!u.primary && <button className="va-edit-btn va-edit-btn--inline va-edit-btn--danger">Remove</button>}
              </div>
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
  <div className="va-tab-panel">
    <div className="va-tab-panel__head">
      <div>
        <span className="va-tab-panel__title">Sub-accounts</span>
        <span className="va-tab-panel__count">{subAccounts.length}</span>
      </div>
      <button className="va-btn va-btn--ghost va-btn--sm">
        <VaIcon name="plus" size={13}/>
        Link sub-account
      </button>
    </div>
    <table className="va-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Company</th>
          <th>Primary user</th>
          <th>Balance</th>
          <th>Status</th>
          <th style={{textAlign:"right"}}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {subAccounts.map((s, i) => (
          <tr key={i}>
            <td style={{fontVariantNumeric:"tabular-nums", color:"var(--d-fg-2)"}}>{s.id}</td>
            <td><div style={{fontWeight: 500}}>{s.name}</div></td>
            <td style={{color:"var(--d-fg-2)"}}>{s.primaryUser}</td>
            <td style={{fontVariantNumeric:"tabular-nums"}}>{s.balance}</td>
            <td>
              {s.status === "active" && <span className="va-pill va-pill--green va-pill--dot">Active</span>}
              {s.status === "paused" && <span className="va-pill va-pill--orange va-pill--dot">Paused</span>}
              {s.status === "trial" && <span className="va-pill va-pill--yellow va-pill--dot">Trial</span>}
            </td>
            <td>
              <div className="va-table__row-actions">
                <button className="va-edit-btn va-edit-btn--inline">View</button>
                <button className="va-edit-btn va-edit-btn--inline va-edit-btn--danger"
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
  <div className="va-tab-panel">
    <div className="va-tab-panel__head">
      <div>
        <span className="va-tab-panel__title">Audit log</span>
        <span className="va-tab-panel__count">{entries.length} entries</span>
      </div>
      <button className="va-btn va-btn--ghost va-btn--sm">
        Export CSV
      </button>
    </div>
    <div className="va-audit-toolbar">
      <span className="va-audit-toolbar__group">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
        </svg>
        Last 30 days
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </span>
      <span className="va-audit-toolbar__group">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 3H2l8 9v7l4 2v-9l8-9z"/>
        </svg>
        All change types
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </span>
      <div style={{marginLeft:"auto", color:"var(--d-fg-3)", fontSize: 12.5}}>
        Most recent first &middot; Read-only
      </div>
    </div>
    <div className="va-audit">
      {entries.map((e, i) => (
        <div className="va-audit-row" key={i}>
          <span className="va-audit-row__time">{e.time}</span>
          <span className="va-audit-row__who">
            <span className="va-audit-row__who-avatar">{e.who.split(" ").map(s=>s[0]).slice(0,2).join("")}</span>
            <span>{e.who}</span>
          </span>
          <span className="va-audit-row__change">
            {e.created ? (
              <>Created <span className="va-audit-row__field">{e.field}</span>
                {e.value && <> set to <span className="va-audit-row__to">{e.value}</span></>}</>
            ) : e.deleted ? (
              <>Removed <span className="va-audit-row__field">{e.field}</span>
                {e.value && <> <span className="va-audit-row__from">{e.value}</span></>}</>
            ) : (
              <>Changed <span className="va-audit-row__field">{e.field}</span> from{" "}
                <span className="va-audit-row__from">{e.from}</span>
                <span className="va-audit-row__arrow">&rarr;</span>
                <span className="va-audit-row__to">{e.to}</span>
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
  <div className="va-tab-panel">
    <div className="va-tab-panel__head">
      <div>
        <span className="va-tab-panel__title">{title}</span>
      </div>
    </div>
    <div style={{padding:"72px 24px", display:"flex", flexDirection:"column", alignItems:"center", gap: 12, color:"var(--d-fg-3)"}}>
      <div style={{
        width: 48, height: 48, borderRadius: 12, background:"var(--d-card-2)",
        display:"inline-flex", alignItems:"center", justifyContent:"center"
      }}>
        <VaIcon name="info" size={22} stroke={1.5}/>
      </div>
      <div style={{fontSize: 15, fontWeight: 600, color:"var(--d-fg)"}}>Nothing here yet</div>
      <div style={{fontSize: 13}}>{hint || "Records will show up here when there's activity."}</div>
    </div>
  </div>
);
