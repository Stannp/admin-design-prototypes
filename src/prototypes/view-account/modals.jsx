import React from 'react';
import ReactDOM from 'react-dom';

// ===== Generic shared icons inside this module =====
const VaIcon = ({ name, size = 18, color = "currentColor", stroke = 1.75 }) => {
  const paths = {
    user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
    key: "M21 2l-2 2m-7.6 7.6a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.778-7.778zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4",
    shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    plus: "M12 5v14M5 12h14",
    pin: "M19 11c0 7-7 11-7 11s-7-4-7-11a7 7 0 0 1 14 0z M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
    money: "M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
    trash: "M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14zM10 11v6M14 11v6",
    minus: "M5 12h14",
    warn: "M12 2L2 22h20L12 2zM12 9v6M12 19v.01",
    check: "M4 12l5 5L20 6",
    x: "M6 6l12 12M18 6l-12 12",
    info: "M12 16v-4M12 8h.01 M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z",
    mail: "M4 6h16v12H4zM4 6l8 7 8-7",
    phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.86 19.86 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.97.36 1.92.7 2.83a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.86.57 2.83.7a2 2 0 0 1 1.72 2z",
    edit: "M12 20h9 M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z",
    auth: "M5 12a7 7 0 0 1 14 0M12 3v2 M3 21h18 M8 21V12 M16 21V12",
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[name] || ""}/>
    </svg>
  );
};

// ===== Modal shell =====
const Modal = ({ open, onClose, icon, iconVariant, title, subtitle, children, footer, width = 560 }) => {
  if (!open) return null;
  return ReactDOM.createPortal(
    <div className="va va-modal-backdrop" onClick={onClose}>
      <div className="va-modal" style={{ maxWidth: width }} onClick={e=>e.stopPropagation()}>
        <header className="va-modal__head">
          {icon && (
            <div className={"va-modal__head-icon" + (iconVariant === "danger" ? " va-modal__head-icon--danger" : "")}>
              <VaIcon name={icon} size={18}/>
            </div>
          )}
          <div className="va-modal__head-text">
            <h2 className="va-modal__title">{title}</h2>
            {subtitle && <p className="va-modal__sub">{subtitle}</p>}
          </div>
          <button className="va-modal__close" onClick={onClose} aria-label="Close">
            <VaIcon name="x" size={16}/>
          </button>
        </header>
        <div className="va-modal__body">{children}</div>
        {footer && <footer className="va-modal__foot">{footer}</footer>}
      </div>
    </div>,
    document.body
  );
};

const ModalFooter = ({ onCancel, onConfirm, confirmLabel = "Save changes", confirmVariant = "indigo", disabled, secondaryLeft }) => (
  <>
    {secondaryLeft && <div className="va-modal__foot-left">{secondaryLeft}</div>}
    <div className="va-modal__foot-right">
      <button className="va-btn va-btn--ghost" onClick={onCancel}>Cancel</button>
      <button className={"va-btn va-btn--" + confirmVariant} disabled={disabled} onClick={onConfirm}>
        {confirmLabel}
      </button>
    </div>
  </>
);

// ===== Field helpers =====
const Field = ({ label, hint, children }) => (
  <div className="va-field">
    {label && <label className="va-field__label">{label}</label>}
    {children}
    {hint && <span className="va-field__hint">{hint}</span>}
  </div>
);
const Input = (props) => <input className="va-input" {...props}/>;
const Select = ({ children, ...props }) => <select className="va-select" {...props}>{children}</select>;
const Checkbox = ({ checked, onChange, label, hint }) => (
  <div className={"va-checkbox" + (checked ? " va-checkbox--checked" : "")} onClick={()=>onChange && onChange(!checked)}>
    <span className="va-checkbox__box">
      <VaIcon name="check" size={12} stroke={2.4}/>
    </span>
    <div>
      <div className="va-checkbox__text">{label}</div>
      {hint && <div className="va-checkbox__hint">{hint}</div>}
    </div>
  </div>
);

// ============================================================
// 1. Edit Primary User Details
// ============================================================
export const EditUserModal = ({ open, onClose, onSave, user }) => {
  const [name, setName] = React.useState(user.name);
  const [email, setEmail] = React.useState(user.email);
  const [phone, setPhone] = React.useState(user.phone);
  const [prefs, setPrefs] = React.useState(user.prefs);
  const [step, setStep] = React.useState("edit"); // edit | confirm

  React.useEffect(() => { if (open) { setName(user.name); setEmail(user.email); setPhone(user.phone); setPrefs(user.prefs); setStep("edit"); } }, [open, user]);

  const togglePref = (k) => setPrefs(p => ({ ...p, [k]: !p[k] }));
  const changed =
    name !== user.name || email !== user.email || phone !== user.phone ||
    JSON.stringify(prefs) !== JSON.stringify(user.prefs);

  if (step === "confirm") {
    return (
      <Modal open={open} onClose={onClose} icon="info" title="Confirm changes"
        subtitle="Review the changes before saving. The user will be notified by email."
        footer={<ModalFooter
          onCancel={()=>setStep("edit")}
          onConfirm={()=>{ onSave({ name, email, phone, prefs }); onClose(); }}
          confirmLabel="Confirm and save"/>}>
        <div className="va-readout">
          {name !== user.name && <div className="va-readout__row"><span className="va-readout__label">Name</span><span className="va-readout__value">{user.name} &rarr; {name}</span></div>}
          {email !== user.email && <div className="va-readout__row"><span className="va-readout__label">Email</span><span className="va-readout__value">{user.email} &rarr; {email}</span></div>}
          {phone !== user.phone && <div className="va-readout__row"><span className="va-readout__label">Phone</span><span className="va-readout__value">{user.phone || "\u2014"} &rarr; {phone}</span></div>}
          {Object.keys(prefs).map(k => prefs[k] !== user.prefs[k] && (
            <div className="va-readout__row" key={k}>
              <span className="va-readout__label">{k}</span>
              <span className="va-readout__value">{user.prefs[k] ? "On" : "Off"} &rarr; {prefs[k] ? "On" : "Off"}</span>
            </div>
          ))}
        </div>
      </Modal>
    );
  }

  return (
    <Modal open={open} onClose={onClose} icon="user"
      title="Edit primary user"
      subtitle="Changes are applied to the user record and audit-logged. The user will be notified by email."
      footer={<ModalFooter onCancel={onClose}
        onConfirm={()=>setStep("confirm")} disabled={!changed}
        confirmLabel="Review changes"/>}>
      <Field label="Full name">
        <Input value={name} onChange={e=>setName(e.target.value)}/>
      </Field>
      <Field label="Email address">
        <Input type="email" value={email} onChange={e=>setEmail(e.target.value)}/>
      </Field>
      <Field label="Contact phone number" hint="Used for sales follow-up only — not visible to the customer.">
        <Input type="tel" value={phone} onChange={e=>setPhone(e.target.value)}/>
      </Field>
      <Field label="Contact preferences">
        <div style={{display:"flex", flexDirection:"column", gap: 4}}>
          <Checkbox checked={prefs.product} onChange={()=>togglePref("product")} label="Product updates" hint="New features, breaking changes, scheduled maintenance"/>
          <Checkbox checked={prefs.marketing} onChange={()=>togglePref("marketing")} label="Marketing & offers" hint="Promotional emails about new plans and add-ons"/>
          <Checkbox checked={prefs.account} onChange={()=>togglePref("account")} label="Account & billing" hint="Invoices, payment receipts, balance alerts"/>
        </div>
      </Field>
    </Modal>
  );
};

// ============================================================
// 2. Reset Password (confirmation only)
// ============================================================
export const ResetPasswordModal = ({ open, onClose, onConfirm, email }) => (
  <Modal open={open} onClose={onClose} icon="key"
    title="Send password reset email?"
    subtitle="The user will receive a secure link to set a new password. The link expires in 24 hours."
    footer={<ModalFooter onCancel={onClose} onConfirm={onConfirm}
      confirmLabel="Send reset email" confirmVariant="indigo"/>}>
    <div className="va-readout">
      <div className="va-readout__row"><span className="va-readout__label">Recipient</span><span className="va-readout__value">{email}</span></div>
      <div className="va-readout__row"><span className="va-readout__label">Action</span><span className="va-readout__value">Force password reset on next login</span></div>
    </div>
  </Modal>
);

// ============================================================
// 3. Manage MFA
// ============================================================
export const ManageMfaModal = ({ open, onClose, onSave, mfa }) => {
  const [enabled, setEnabled] = React.useState(mfa.enabled);
  const [reset, setReset] = React.useState(false);
  React.useEffect(()=>{ if (open) { setEnabled(mfa.enabled); setReset(false); } }, [open, mfa]);

  return (
    <Modal open={open} onClose={onClose} icon="shield"
      title="Manage MFA"
      subtitle="Microsoft Authenticator (TOTP) is the only supported MFA method."
      footer={<ModalFooter onCancel={onClose}
        onConfirm={()=>{ onSave({ enabled, reset }); onClose(); }}
        confirmLabel="Apply MFA settings"/>}>
      <div className="va-readout">
        <div className="va-readout__row">
          <span className="va-readout__label">Current status</span>
          <span className="va-readout__value">
            {mfa.enabled
              ? <span className="va-pill va-pill--green va-pill--dot">Enabled</span>
              : <span className="va-pill va-pill--off">Not enabled</span>}
          </span>
        </div>
        {mfa.enabled && (
          <div className="va-readout__row">
            <span className="va-readout__label">Last verified</span>
            <span className="va-readout__value">{mfa.lastVerified}</span>
          </div>
        )}
      </div>
      <Checkbox checked={enabled} onChange={setEnabled}
        label="Require MFA on next login"
        hint="When enabled, the user must enrol Microsoft Authenticator before they can access the dashboard."/>
      {mfa.enabled && (
        <Checkbox checked={reset} onChange={setReset}
          label="Reset MFA enrolment"
          hint="Wipes the existing authenticator binding. The user will re-enrol on next login."/>
      )}
    </Modal>
  );
};

// ============================================================
// 4. Add Account User
// ============================================================
export const AddUserModal = ({ open, onClose, onSave }) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState("Member");
  React.useEffect(()=>{ if (open) { setName(""); setEmail(""); setRole("Member"); } }, [open]);
  return (
    <Modal open={open} onClose={onClose} icon="plus"
      title="Add user to account"
      subtitle="The user will receive an invitation email with a link to set their password."
      footer={<ModalFooter onCancel={onClose}
        onConfirm={()=>{ onSave({ name, email, role }); onClose(); }}
        disabled={!name || !email}
        confirmLabel="Send invitation"/>}>
      <Field label="Full name">
        <Input placeholder="e.g. Sam Marketer" value={name} onChange={e=>setName(e.target.value)}/>
      </Field>
      <Field label="Email address">
        <Input type="email" placeholder="sam@vivid.co.uk" value={email} onChange={e=>setEmail(e.target.value)}/>
      </Field>
      <Field label="Role" hint="Owners can manage billing and add users. Members can run campaigns. Viewers are read-only.">
        <Select value={role} onChange={e=>setRole(e.target.value)}>
          <option>Owner</option>
          <option>Member</option>
          <option>Viewer</option>
        </Select>
      </Field>
    </Modal>
  );
};

// ============================================================
// 5. Edit Billing Address
// ============================================================
export const EditBillingAddressModal = ({ open, onClose, onSave, address }) => {
  const [a, setA] = React.useState(address);
  React.useEffect(()=>{ if (open) setA(address); }, [open, address]);
  const set = (k, v) => setA(x => ({ ...x, [k]: v }));
  return (
    <Modal open={open} onClose={onClose} icon="pin"
      title="Edit billing address"
      subtitle="Used on invoices, receipts, and VAT records. Sub-accounts inherit this unless overridden."
      footer={<ModalFooter onCancel={onClose}
        onConfirm={()=>{ onSave(a); onClose(); }}
        confirmLabel="Save address"/>}>
      <Field label="Address line 1">
        <Input value={a.line1} onChange={e=>set("line1", e.target.value)}/>
      </Field>
      <Field label="Address line 2 (optional)">
        <Input value={a.line2} onChange={e=>set("line2", e.target.value)}/>
      </Field>
      <div className="va-field-grid">
        <Field label="City">
          <Input value={a.city} onChange={e=>set("city", e.target.value)}/>
        </Field>
        <Field label="Postcode">
          <Input value={a.postcode} onChange={e=>set("postcode", e.target.value)}/>
        </Field>
      </div>
      <Field label="Country">
        <Select value={a.country} onChange={e=>set("country", e.target.value)}>
          <option>United Kingdom</option>
          <option>United States</option>
          <option>Ireland</option>
          <option>Germany</option>
          <option>France</option>
        </Select>
      </Field>
    </Modal>
  );
};

// ============================================================
// 6. Edit Low-Balance Auto-Action
// ============================================================
export const EditLowBalanceModal = ({ open, onClose, onSave, lowBalance }) => {
  const [enabled, setEnabled] = React.useState(lowBalance.enabled);
  const [threshold, setThreshold] = React.useState(lowBalance.threshold);
  const [action, setAction] = React.useState(lowBalance.action);
  const [topUpAmount, setTopUpAmount] = React.useState(lowBalance.topUpAmount);
  React.useEffect(()=>{ if (open) {
    setEnabled(lowBalance.enabled); setThreshold(lowBalance.threshold);
    setAction(lowBalance.action); setTopUpAmount(lowBalance.topUpAmount);
  }}, [open, lowBalance]);

  return (
    <Modal open={open} onClose={onClose} icon="money"
      title="Low-balance action"
      subtitle="What happens automatically when the account balance drops below the threshold."
      footer={<ModalFooter onCancel={onClose}
        onConfirm={()=>{ onSave({ enabled, threshold, action, topUpAmount }); onClose(); }}
        confirmLabel="Save settings"/>}>
      <Checkbox checked={enabled} onChange={setEnabled}
        label="Enable low-balance automation"
        hint="When disabled, the account will be paused if balance reaches zero."/>
      <Field label="Trigger threshold" hint="Action fires when current balance is less than this amount.">
        <Input type="text" value={threshold} disabled={!enabled} onChange={e=>setThreshold(e.target.value)}/>
      </Field>
      <Field label="Action">
        <Select value={action} disabled={!enabled} onChange={e=>setAction(e.target.value)}>
          <option>Auto top-up from card on file</option>
          <option>Send notification only</option>
          <option>Pause outgoing campaigns</option>
        </Select>
      </Field>
      {action === "Auto top-up from card on file" && (
        <Field label="Top-up amount">
          <Input type="text" value={topUpAmount} disabled={!enabled} onChange={e=>setTopUpAmount(e.target.value)}/>
        </Field>
      )}
    </Modal>
  );
};

// ============================================================
// 7. Delete Account — with blocker checks
// ============================================================
export const DeleteAccountModal = ({ open, onClose, onConfirm, accountName, blockers }) => {
  const [typed, setTyped] = React.useState("");
  React.useEffect(()=>{ if (open) setTyped(""); }, [open]);
  const hasBlockers = blockers && blockers.length > 0;
  const canDelete = !hasBlockers && typed.trim() === accountName;

  return (
    <Modal open={open} onClose={onClose} icon="trash" iconVariant="danger"
      title="Delete account"
      subtitle={hasBlockers
        ? "This account cannot be deleted yet. Resolve the blockers below first."
        : "This permanently removes the account and all associated records."}
      footer={<ModalFooter onCancel={onClose}
        onConfirm={()=>{ onConfirm && onConfirm(); onClose(); }}
        disabled={!canDelete}
        confirmLabel="Delete account permanently"
        confirmVariant="danger"
        secondaryLeft={hasBlockers ? "Resolve all blockers to enable deletion" : null}/>}>

      {hasBlockers ? (
        <>
          <div className="va-danger-callout">
            <span className="va-danger-callout__icon"><VaIcon name="warn" size={20}/></span>
            <div>
              <h3 className="va-danger-callout__title">{blockers.length} blocker{blockers.length === 1 ? "" : "s"} found</h3>
              <p className="va-danger-callout__body">All blockers must be cleared before this account can be deleted. Contact accounts@stannp.com if you need help unwinding any of these.</p>
            </div>
          </div>
          <div className="va-blockers">
            {blockers.map((b, i) => (
              <div className="va-blocker" key={i}>
                <span className="va-blocker__icon"><VaIcon name="warn" size={16}/></span>
                <div style={{flex:1, minWidth:0}}>
                  <h4 className="va-blocker__title">{b.title}</h4>
                  <p className="va-blocker__detail">{b.detail}</p>
                  {b.items && (
                    <ul className="va-blocker__items">
                      {b.items.map((it, j) => <li key={j}>{it}</li>)}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="va-danger-callout">
            <span className="va-danger-callout__icon"><VaIcon name="warn" size={20}/></span>
            <div>
              <h3 className="va-danger-callout__title">This action cannot be undone</h3>
              <p className="va-danger-callout__body">Deleting <strong>{accountName}</strong> removes the account, all users, billing history, audit log, and any uploaded data. Mail already in transit is unaffected.</p>
            </div>
          </div>
          <Field label={<>Type the account name <strong style={{color:"var(--d-fg)"}}>{accountName}</strong> to confirm</>}>
            <Input placeholder="Account name" value={typed} onChange={e=>setTyped(e.target.value)}/>
          </Field>
        </>
      )}
    </Modal>
  );
};

// ============================================================
// 8. Remove Sub-Account from Parent
// ============================================================
export const RemoveSubAccountModal = ({ open, onClose, onConfirm, sub }) => {
  if (!sub) return null;
  const hasBlockers = sub.blockers && sub.blockers.length > 0;
  return (
    <Modal open={open} onClose={onClose} icon="minus" iconVariant="danger"
      title={`Remove ${sub.name} from parent?`}
      subtitle={hasBlockers
        ? "This sub-account cannot be unlinked yet. Resolve the blockers below first."
        : "The sub-account becomes a standalone account. It keeps its data, users, and balance."}
      footer={<ModalFooter onCancel={onClose}
        onConfirm={()=>{ onConfirm && onConfirm(); onClose(); }}
        disabled={hasBlockers}
        confirmLabel="Remove from parent"
        confirmVariant="danger"/>}>
      {hasBlockers ? (
        <div className="va-blockers">
          {sub.blockers.map((b, i) => (
            <div className="va-blocker" key={i}>
              <span className="va-blocker__icon"><VaIcon name="warn" size={16}/></span>
              <div style={{flex:1, minWidth:0}}>
                <h4 className="va-blocker__title">{b.title}</h4>
                <p className="va-blocker__detail">{b.detail}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="va-readout">
          <div className="va-readout__row"><span className="va-readout__label">Sub-account</span><span className="va-readout__value">{sub.name}</span></div>
          <div className="va-readout__row"><span className="va-readout__label">Current balance</span><span className="va-readout__value">{sub.balance}</span></div>
          <div className="va-readout__row"><span className="va-readout__label">After removal</span><span className="va-readout__value">Becomes standalone account #{sub.id}</span></div>
        </div>
      )}
    </Modal>
  );
};

// ============================================================
// 9. Change Primary User
// ============================================================
export const ChangePrimaryUserModal = ({ open, onClose, onConfirm, currentPrimary, candidates }) => {
  const [selected, setSelected] = React.useState(null);
  const [step, setStep] = React.useState("pick"); // pick | confirm
  React.useEffect(()=>{ if (open) { setSelected(null); setStep("pick"); } }, [open]);

  const sel = candidates.find(c => c.email === selected);

  if (step === "confirm" && sel) {
    return (
      <Modal open={open} onClose={onClose} icon="user"
        title="Confirm primary user change"
        subtitle="The current primary user remains on the account as a Member. Billing notifications and reset-password flows will move to the new primary."
        footer={<ModalFooter onCancel={()=>setStep("pick")}
          onConfirm={()=>{ onConfirm(sel); onClose(); }}
          confirmLabel="Confirm change"/>}>
        <div className="va-readout">
          <div className="va-readout__row">
            <span className="va-readout__label">New primary user</span>
            <span className="va-readout__value">{sel.name} &middot; {sel.email}</span>
          </div>
          <div className="va-readout__row">
            <span className="va-readout__label">Previous primary user</span>
            <span className="va-readout__value" style={{color:"var(--d-fg-3)"}}>{currentPrimary.name} &rarr; Member</span>
          </div>
          <div className="va-readout__row">
            <span className="va-readout__label">Both users notified by email</span>
            <span className="va-readout__value"><span className="va-pill va-pill--green va-pill--dot">Yes</span></span>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal open={open} onClose={onClose} icon="user"
      title="Change primary user"
      subtitle="Pick another user on this account to take over primary responsibilities (billing notices, password reset, account ownership)."
      footer={<ModalFooter onCancel={onClose}
        onConfirm={()=>setStep("confirm")}
        disabled={!selected}
        confirmLabel="Review change"/>}>
      {candidates.length === 0 ? (
        <div className="va-danger-callout">
          <span className="va-danger-callout__icon"><VaIcon name="info" size={20}/></span>
          <div>
            <h3 className="va-danger-callout__title" style={{color:"var(--d-fg)"}}>No other users on this account</h3>
            <p className="va-danger-callout__body">Add a user to this account first, then come back to reassign primary.</p>
          </div>
        </div>
      ) : (
        <div style={{display:"flex", flexDirection:"column", gap: 4}}>
          {candidates.map((c) => (
            <label key={c.email}
              style={{
                display:"flex", alignItems:"center", gap: 12,
                padding: "12px 14px", borderRadius: 8,
                background: selected === c.email ? "var(--d-card-2)" : "var(--d-bg-2)",
                border: "1px solid " + (selected === c.email ? "var(--stannp-indigo)" : "var(--d-border)"),
                cursor: "pointer", transition: "border-color .12s, background .12s",
              }}
              onClick={()=>setSelected(c.email)}>
              <span style={{
                width: 18, height: 18, borderRadius: 999,
                border: "2px solid " + (selected === c.email ? "var(--stannp-indigo)" : "var(--d-border-2)"),
                background: selected === c.email ? "var(--stannp-indigo)" : "transparent",
                display:"inline-flex", alignItems:"center", justifyContent:"center", flexShrink: 0,
              }}>
                {selected === c.email && <span style={{width: 6, height: 6, borderRadius: 999, background: "#fff"}}/>}
              </span>
              <span style={{
                width: 32, height: 32, borderRadius: 999,
                background: "var(--d-card-2)", border: "1px solid var(--d-border-2)",
                display:"inline-flex", alignItems:"center", justifyContent:"center",
                fontSize: 12, fontWeight: 600, color: "var(--d-fg-2)", flexShrink: 0,
              }}>{c.name.split(" ").map(s=>s[0]).slice(0,2).join("")}</span>
              <span style={{flex: 1, minWidth: 0}}>
                <div style={{fontSize: 14, fontWeight: 500, color: "var(--d-fg)"}}>{c.name}</div>
                <div style={{fontSize: 12.5, color: "var(--d-fg-3)"}}>{c.email}</div>
              </span>
              <span className={"va-pill " + (c.role === "Owner" ? "va-pill--indigo" : "")}>{c.role}</span>
              {c.mfa
                ? <span className="va-pill va-pill--green va-pill--dot">MFA</span>
                : <span className="va-pill va-pill--off">No MFA</span>}
            </label>
          ))}
        </div>
      )}
    </Modal>
  );
};
