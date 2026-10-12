import React from 'react';

const SideIcon = ({ name }) => {
  const paths = {
    dash: "M3 12l9-8 9 8M5 10v10h5v-6h4v6h5V10",
    overview: "M3 12h4l3-8 4 16 3-8h4",
    users: "M16 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0",
    person: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
    kpi: "M3 3v18h18M7 14l4-4 3 3 5-7",
    building: "M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M16 9h4a1 1 0 0 1 1 1v11M8 7h.01M8 11h.01M8 15h.01M12 7h.01M12 11h.01M12 15h.01",
    ticket: "M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4V8z",
    flag: "M4 22V4M4 4h12l-2 4 2 4H4",
    money: "M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
    code: "M16 18l6-6-6-6M8 6l-6 6 6 6",
    bar: "M4 20V10M10 20V4M16 20v-8M22 20H2",
    shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    stamp: "M5 18h14M9 11l3-7 3 7M7 11h10v4H7z",
    invoice: "M9 2h6a2 2 0 0 1 2 2v16l-3-2-2 2-2-2-2 2-3-2V4a2 2 0 0 1 2-2zM9 7h6M9 11h6M9 15h4",
    file: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6",
    note: "M4 4h16v16H4zM8 8h8M8 12h8M8 16h5",
    pro: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    trash: "M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M10 11v6M14 11v6",
  };
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[name] || paths.dash} />
    </svg>
  );
};

const SideNav = ({ active: current = "Accounts" }) => {
  const Item = ({ icon, label, active = label === current }) => (
    <div className={"flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-colors" + (active ? " bg-d-card text-d-fg" : " text-d-fg-2 hover:bg-d-card hover:text-d-fg")}>
      <span className={"inline-flex" + (active ? " text-yellow" : " text-d-fg-3")}><SideIcon name={icon}/></span>
      <span>{label}</span>
    </div>
  );
  const Group = ({ title, children }) => (
    <>
      <div className="text-[11px] font-semibold tracking-[0.04em] uppercase text-d-fg-4 px-3 pt-3.5 pb-1.5 flex items-center justify-between">
        <span>{title}</span>
        <svg className="opacity-60" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </div>
      {children}
    </>
  );
  return (
    <nav className="bg-d-bg border-r border-d-border px-3 pt-4 pb-6 flex flex-col gap-1 min-h-[calc(100%-64px)]">
      <Item icon="dash" label="Dashboard"/>
      <Group title="BI Reporting">
        <Item icon="overview" label="Overview"/>
        <Item icon="users" label="Manager Accounts Spend"/>
        <Item icon="person" label="Non Conversions"/>
        <Item icon="kpi" label="KPI Report"/>
      </Group>
      <Group title="Customers">
        <Item icon="building" label="Accounts"/>
        <Item icon="users" label="Users"/>
        <Item icon="ticket" label="Tickets"/>
        <Item icon="flag" label="Milestones"/>
        <Item icon="trash" label="Account Deletions"/>
      </Group>
      <Group title="Pricing">
        <Item icon="money" label="Pricing"/>
        <Item icon="code" label="Pricing API Preview"/>
        <Item icon="bar" label="Volume Tiers"/>
      </Group>
      <Group title="Billing">
        <Item icon="shield" label="US Sales Tax Health"/>
        <Item icon="stamp" label="USPS Postage Rates"/>
        <Item icon="invoice" label="Invoices"/>
        <Item icon="file" label="Payment Acknowledgements"/>
        <Item icon="note" label="Credit Notes"/>
        <Item icon="pro" label="Proformas"/>
      </Group>
    </nav>
  );
};

export default SideNav;
