import React, { useState, useMemo } from 'react';

import TopBar from '../../shell/TopBar';
import SideNav from '../../shell/SideNav';
import PageHead from '../../shell/PageHead';
import TabStrip from '../../shell/TabStrip';
import Toast from '../../shell/Toast';

import {
  EditUserModal,
  ResetPasswordModal,
  ManageMfaModal,
  AddUserModal,
  EditBillingAddressModal,
  EditLowBalanceModal,
  DeleteAccountModal,
  RemoveSubAccountModal,
  ChangePrimaryUserModal,
} from './modals';

import {
  CampaignsPanel,
  TicketsPanel,
  InvoicesPanel,
  UsersPanel,
  SubAccountsPanel,
  BillingAddressesPanel,
  AuditLogPanel,
  EmptyTabPanel,
} from './tabs';

import TopOptionB from './top';

// ===== Sample data =====
const SEED = {
  "deleteHasBlockers": true,
  "subRemovalHasBlockers": false
};

const TABS = [
  "Campaigns",
  "Support Tickets",
  "Invoices",
  "Users",
  "Sub-Accounts",
  "Billing Addresses",
  "Journeys",
  "Subscription History",
  "Balance History",
  "Milestones",
  "Pricing Addons",
  "Account Addons",
  "Audit Log",
];

const ViewAccountPrototype = () => {
  // ===== State =====
  const [activeTab, setActiveTab] = useState("Campaigns");
  const [openModal, setOpenModal] = useState(null); // name of open modal
  const [removeSub, setRemoveSub] = useState(null); // sub-account currently being removed
  const [toast, setToast] = useState(null);

  // Live account data (editable via modals)
  const [user, setUser] = useState({
    name: "Robert Moreton",
    email: "rmoreton@me.com",
    phone: "+44 7700 900126",
    prefs: { product: true, marketing: false, account: true },
    lastLogin: "2 days ago",
  });
  const [mfa, setMfa] = useState({ enabled: false, lastVerified: "\u2014" });
  const [billingAddress, setBillingAddress] = useState({
    line1: "Unit 4, Riverside Studios",
    line2: "Bridge Lane",
    city: "Bristol",
    postcode: "BS1 4ST",
    country: "United Kingdom",
  });
  const [lowBalance, setLowBalance] = useState({
    enabled: true,
    threshold: "\u00a310.00",
    action: "Auto top-up from card on file",
    topUpAmount: "\u00a350.00",
  });
  const paymentMethods = [
    { brand: "Visa", last4: "4242", exp: "08/27", default: true },
    { brand: "MC", last4: "8889", exp: "03/26" },
  ];
  const system = {
    accountId: "89536",
    hubspotId: "430198154434",
    source: "seractech",
    sourceEnd: "seractech",
    priorityQC: false,
    canChangeDashboard: false,
  };
  const manager = "Becca Lee";
  const region = "United Kingdom";
  const accountName = "Vivid Design Services Ltd.";

  const users = [
    { name: user.name, email: user.email, role: "Owner", mfa: mfa.enabled, lastLogin: user.lastLogin, primary: true },
    { name: "Aisha Patel", email: "aisha@vivid.co.uk", role: "Member", mfa: true, lastLogin: "5 hours ago" },
    { name: "Tom Lin", email: "tom@vivid.co.uk", role: "Viewer", mfa: false, lastLogin: "Never" },
  ];

  const subAccounts = [
    { id: 91204, name: "Vivid Design \u2014 Direct Mail", primaryUser: "rmoreton@me.com", balance: "\u00a32,415.20", status: "active" },
    { id: 91207, name: "Vivid Design \u2014 Catalogue", primaryUser: "k.holland@vivid.co.uk", balance: "\u00a30.00", status: "paused" },
    { id: 91219, name: "Vivid Bristol Pop-up", primaryUser: "popup@vivid.co.uk", balance: "\u00a3128.00", status: "trial" },
  ];

  const campaigns = [
    { id: 4830, name: "Loyalty refresh \u2014 May lapsed", format: "A5 Postcard", recipients: "2,140", cost: "\u00a31,070.00", status: "In production", booked: "19 May 2026" },
    { id: 4821, name: "Spring Catalogue 2026", format: "32pp Catalogue", recipients: "1,820", cost: "\u00a34,914.00", status: "In production", booked: "15 May 2026" },
    { id: 4812, name: "Welcome series \u2014 cohort 14", format: "DL Letter", recipients: "412", cost: "\u00a3210.12", status: "Dispatched", booked: "11 May 2026" },
    { id: 4798, name: "Win-back postcard", format: "A5 Postcard", recipients: "3,205", cost: "\u00a31,602.50", status: "Delivered", booked: "04 May 2026" },
    { id: 4781, name: "Reactivation \u2014 high value", format: "DL Letter", recipients: "180", cost: "\u00a3142.20", status: "Delivered", booked: "28 Apr 2026" },
    { id: 4776, name: "Q2 announcement \u2014 hold", format: "A6 Postcard", recipients: "5,200", cost: "\u00a32,080.00", status: "Paused", booked: "25 Apr 2026" },
    { id: 4759, name: "New product \u2014 catalogue", format: "16pp Catalogue", recipients: "1,200", cost: "\u00a32,640.00", status: "Booked", booked: "22 May 2026" },
  ];

  const tickets = [
    { id: 12081, subject: "Address validation failing for IE postcodes", lastMessage: "Becca: Looking into it now \u2014 will reply by EOD.", priority: "High", status: "Open", assignedTo: "Becca Lee", updated: "19 May, 14:02" },
    { id: 12075, subject: "Can we change the artwork on #4830?", lastMessage: "Sam: Yes \u2014 file received, replacing it now.", priority: "Medium", status: "Pending", assignedTo: "Sam Khan", updated: "18 May, 11:34" },
    { id: 12062, subject: "VAT receipt for invoice INV-2026-0188", lastMessage: "Resolved \u2014 receipt re-issued.", priority: "Low", status: "Resolved", assignedTo: "Finance bot", updated: "15 May, 09:12" },
    { id: 12041, subject: "API rate-limit increase request", lastMessage: "Increased to 300/min on legacy plan.", priority: "Low", status: "Resolved", assignedTo: "Tom Lin", updated: "10 May, 16:48" },
  ];

  const invoices = [
    { number: "INV-2026-0203", issued: "15 May 2026", due: "29 May 2026", amount: "\u00a34,914.00", status: "Pending" },
    { number: "INV-2026-0188", issued: "04 May 2026", due: "18 May 2026", amount: "\u00a31,602.50", status: "Paid" },
    { number: "INV-2026-0171", issued: "22 Apr 2026", due: "06 May 2026", amount: "\u00a31,070.00", status: "Overdue" },
    { number: "INV-2026-0159", issued: "08 Apr 2026", due: "22 Apr 2026", amount: "\u00a3210.12", status: "Paid" },
    { number: "INV-2026-0142", issued: "25 Mar 2026", due: "08 Apr 2026", amount: "\u00a3140.00", status: "Paid" },
  ];

  const auditEntries = [
    { time: "19 May 2026 \u00b7 14:32", who: "Becca Lee", field: "Account manager", from: "Sam Khan", to: "Becca Lee" },
    { time: "19 May 2026 \u00b7 14:30", who: "System", created: true, field: "Account", value: "89536" },
    { time: "17 May 2026 \u00b7 09:14", who: "Robert Moreton", field: "Primary email", from: "r.moreton@vivid.co.uk", to: "rmoreton@me.com" },
    { time: "17 May 2026 \u00b7 09:13", who: "Robert Moreton", field: "MFA enrolment", from: "Enabled", to: "Disabled" },
    { time: "12 May 2026 \u00b7 16:48", who: "Becca Lee", field: "Low-balance threshold", from: "\u00a35.00", to: "\u00a310.00" },
    { time: "12 May 2026 \u00b7 16:48", who: "Becca Lee", field: "Low-balance action", from: "Pause campaigns", to: "Auto top-up from card on file" },
    { time: "10 May 2026 \u00b7 11:02", who: "Becca Lee", field: "Billing address line 1", from: "12 Park Row", to: "Unit 4, Riverside Studios" },
    { time: "08 May 2026 \u00b7 10:21", who: "System", deleted: true, field: "User", value: "j.smith@vivid.co.uk" },
  ];

  const deleteBlockers = SEED.deleteHasBlockers ? [
    { title: "Outstanding balance",
      detail: "Account holds \u00a3128.00 across 1 sub-account. Refund or transfer the balance before deletion." },
    { title: "Mail in transit",
      detail: "2 campaigns are mid-production at the print partner and cannot be cancelled.",
      items: ["Spring Catalogue #4821 \u2014 sealing today", "Loyalty refresh #4830 \u2014 at imposition"] },
    { title: "Active automation journey",
      detail: "1 journey is actively sending mail. Pause it before continuing.",
      items: ["Welcome Series \u00b7 14 contacts in flight"] },
  ] : [];

  const subRemovalBlockers = SEED.subRemovalHasBlockers ? [
    { title: "Mail in transit", detail: "1 campaign mid-production. Wait until it dispatches." },
  ] : [];

  // ===== Handlers =====
  const close = () => setOpenModal(null);
  const showToast = (m) => { setToast(m); setTimeout(()=>setToast(null), 2400); };

  const onSaveUser = (u) => { setUser(prev => ({ ...prev, ...u })); showToast("User details updated"); };
  const onResetPw = () => { close(); showToast("Password reset email sent"); };
  const onSaveMfa = (m) => { setMfa(prev => ({ ...prev, enabled: m.enabled })); showToast(m.enabled ? "MFA required at next login" : "MFA disabled"); };
  const onAddUser = (u) => showToast(`Invitation sent to ${u.email}`);
  const onSaveAddress = (a) => { setBillingAddress(a); showToast("Billing address saved"); };
  const onSaveLowBalance = (lb) => { setLowBalance(lb); showToast("Low-balance settings saved"); };
  const onDeleteAccount = () => showToast("Account scheduled for deletion");
  const onRemoveSub = () => showToast(`${removeSub.name} unlinked`);
  const onChangePrimary = (newPrimary) => {
    setUser({
      name: newPrimary.name,
      email: newPrimary.email,
      phone: "",
      prefs: { product: true, marketing: false, account: true },
      lastLogin: newPrimary.lastLogin,
    });
    showToast(`${newPrimary.name} is now the primary user`);
  };
  const onMakePrimaryFromTab = (u) => setOpenModal("changePrimary");

  // ===== Render tab content =====
  const tabContent = useMemo(() => {
    switch (activeTab) {
      case "Campaigns": return <CampaignsPanel campaigns={campaigns}/>;
      case "Support Tickets": return <TicketsPanel tickets={tickets}/>;
      case "Invoices": return <InvoicesPanel invoices={invoices}/>;
      case "Users": return <UsersPanel users={users} openModal={setOpenModal} onMakePrimary={onMakePrimaryFromTab}/>;
      case "Sub-Accounts": return <SubAccountsPanel subAccounts={subAccounts}
        openRemoveSub={(s)=>{ setRemoveSub({ ...s, blockers: subRemovalBlockers }); setOpenModal("removeSub"); }}/>;
      case "Billing Addresses": return <BillingAddressesPanel openModal={setOpenModal}/>;
      case "Audit Log": return <AuditLogPanel entries={auditEntries}/>;
      default: return <EmptyTabPanel title={activeTab}/>;
    }
  }, [activeTab, users, subAccounts, auditEntries, campaigns, tickets, invoices]);

  return (
    <div className="va-app" data-screen-label="Account view">
      <TopBar />
      <div className="va-app__body">
        <SideNav />
        <main className="va-main">
          <PageHead onDelete={()=>setOpenModal("delete")} />
          <TopOptionB
            data={{ user, manager, region, billingAddress, lowBalance, mfa, system, paymentMethods }}
            openModal={setOpenModal}/>

          <TabStrip tabs={TABS} active={activeTab} onChange={setActiveTab}/>
          {tabContent}
        </main>
      </div>

      {/* ===== Modals ===== */}
      <EditUserModal open={openModal === "editUser"} onClose={close}
        user={user} onSave={onSaveUser}/>
      <ResetPasswordModal open={openModal === "resetPw"} onClose={close}
        email={user.email} onConfirm={onResetPw}/>
      <ManageMfaModal open={openModal === "mfa"} onClose={close}
        mfa={mfa} onSave={onSaveMfa}/>
      <AddUserModal open={openModal === "addUser"} onClose={close}
        onSave={onAddUser}/>
      <EditBillingAddressModal open={openModal === "billingAddress"} onClose={close}
        address={billingAddress} onSave={onSaveAddress}/>
      <EditLowBalanceModal open={openModal === "lowBalance"} onClose={close}
        lowBalance={lowBalance} onSave={onSaveLowBalance}/>
      <DeleteAccountModal open={openModal === "delete"} onClose={close}
        accountName={accountName} blockers={deleteBlockers}
        onConfirm={onDeleteAccount}/>
      <RemoveSubAccountModal open={openModal === "removeSub"} onClose={close}
        sub={removeSub} onConfirm={onRemoveSub}/>
      <ChangePrimaryUserModal open={openModal === "changePrimary"} onClose={close}
        currentPrimary={user}
        candidates={users.filter(u => !u.primary)}
        onConfirm={onChangePrimary}/>

      {toast && <Toast message={toast}/>}
    </div>
  );
};

ViewAccountPrototype.meta = {
  id: 'view-account',
  label: 'View Account',
  description: 'Account detail page — admin view with tabs, modals, and audit log',
  path: '/view-account',
  status: 'idea',
};

export default ViewAccountPrototype;
