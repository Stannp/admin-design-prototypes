import { useState, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';

import ScenarioBar from '../../shell/ScenarioBar';
import TopBar from '../../shell/TopBar';
import SideNav from '../../shell/SideNav';
import Toast from '../../shell/Toast';
import { Table, Thead, Tbody, Tr, Th, Td, TableToolbar, TablePagination } from '../../shell/Table';

// ===== Seed data: ~45 rows with a realistic mix =====
const SEED_DATA = (() => {
  const names = [
    "Acme Holdings Ltd", "BrightPath Media", "CloudStack Solutions", "DataForge Analytics",
    "Evergreen Retail", "Flux Creative", "GlobalTech Partners", "Harbour Logistics",
    "Insight Marketing", "Jade Commerce", "Keystone Properties", "Luminary Digital",
    "Momentum Group", "Nexus Financial", "Orbit Communications", "Pinnacle Health",
    "Quantum Labs", "Redline Automotive", "Silverstone Events", "Titan Manufacturing",
    "Upward Mobility", "Vertex Energy", "Whitfield & Sons", "Xenith Consulting",
    "York Valley Farms", "Zephyr Travel", "Atlas Insurance", "Bloom & Wild Flowers",
    "Cascade Engineering", "Delta Print Services", "Ember Design Co", "Falcon Security",
    "Granite Construction", "Haven Hospitality", "Ionic Software", "Jupiter Foods",
    "Kensington Wealth", "Lark Audio", "Maple Brewing", "Nordic Imports",
    "Onyx Legal", "Pacific Trading", "Quartz Interiors", "Ridgeway Transport",
    "Summit Outdoors",
  ];

  const admins = ["Becca Lee", "Sam Khan", "Tom Lin", "Aisha Patel", "Jordan Mills"];
  const reasons = [
    "Customer requested via CSM",
    "GDPR erasure request",
    "Account inactive for 2+ years",
    "Duplicate account, consolidating",
    "Company dissolved",
    "Contract terminated",
    "Customer moved to competitor",
    "Compliance review, account flagged",
    "Requested by account holder via support ticket",
    "Business closed, owner confirmed",
  ];

  const rows = [];
  for (let i = 0; i < 45; i++) {
    const accountId = 80001 + i * 37;
    const name = names[i];
    const markedBy = admins[i % admins.length];
    const reason = reasons[i % reasons.length];

    let status;
    if (i < 12) status = "Pending";
    else if (i < 20) status = "Cancelled";
    else status = "Deleted";

    const daysAgo = i * 3 + Math.floor(i / 5) * 2;
    const markedDate = new Date(2026, 8, 24 - daysAgo);
    const deletionDate = new Date(markedDate.getTime() + 7 * 24 * 60 * 60 * 1000);

    const fmt = (d) => d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

    rows.push({
      accountId,
      name,
      status,
      reason,
      markedBy,
      dateMarked: fmt(markedDate),
      deletionDate: status === "Cancelled" ? "" : fmt(deletionDate),
      cancelledBy: status === "Cancelled" ? admins[(i + 2) % admins.length] : "",
      _markedTs: markedDate.getTime(),
      _deletionTs: status === "Cancelled" ? 0 : deletionDate.getTime(),
    });
  }
  return rows;
})();

const PAGE_SIZE = 10;

// ===== Status badge =====
const StatusBadge = ({ status }) => {
  const styles = {
    Pending: "bg-d-orange-bg text-d-orange-fg",
    Cancelled: "bg-d-neutral-bg text-d-neutral-fg",
    Deleted: "bg-d-red-bg text-d-red-fg",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11.5px] font-semibold leading-snug ${styles[status] || ""}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
};

// ===== Cancel confirm modal =====
const CancelModal = ({ open, onClose, onConfirm, row }) => {
  if (!open || !row) return null;
  return ReactDOM.createPortal(
    <div className="font-sans text-d-fg antialiased fixed inset-0 z-[100] bg-black/55 backdrop-blur-md flex items-start justify-center pt-16 px-6 pb-6 overflow-y-auto animate-[va-fade-in_0.14s_ease-out]" onClick={onClose}>
      <div className="bg-d-card border border-d-border-2 rounded-xl w-full max-w-md shadow-[0_24px_64px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden animate-[va-modal-in_0.18s_cubic-bezier(.2,.7,.3,1)]" onClick={e => e.stopPropagation()}>
        <header className="flex items-start gap-4 px-6 pt-5 pb-4 border-b border-d-border">
          <div className="flex-1 min-w-0">
            <h2 className="m-0 text-base font-semibold text-d-fg">Cancel deletion?</h2>
            <p className="mt-1 mb-0 text-sm text-d-fg-3 leading-snug">This will return <strong className="text-d-fg">{row.name}</strong> to active status.</p>
          </div>
          <button className="shrink-0 w-8 h-8 rounded-md bg-transparent border-none cursor-pointer text-d-fg-3 inline-flex items-center justify-center hover:bg-d-card-2 hover:text-d-fg" onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l12 12M18 6l-12 12"/></svg>
          </button>
        </header>
        <div className="px-6 py-5">
          <div className="bg-d-bg-2 border border-d-border rounded-lg px-4 py-3.5 flex flex-col gap-2">
            <div className="flex justify-between gap-4 text-sm"><span className="text-d-fg-3">Account</span><span className="text-d-fg font-medium">#{row.accountId} {row.name}</span></div>
            <div className="flex justify-between gap-4 text-sm"><span className="text-d-fg-3">New status</span><span className="text-d-fg font-medium">Active</span></div>
          </div>
        </div>
        <footer className="px-6 py-4 border-t border-d-border flex items-center justify-end gap-2.5">
          <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md font-sans font-semibold text-sm border cursor-pointer transition-[filter,background] bg-d-card text-d-fg-2 border-d-border-2 hover:bg-d-card-hover hover:text-d-fg" onClick={onClose}>Keep pending</button>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md font-sans font-semibold text-sm border border-transparent cursor-pointer transition-[filter,background] bg-indigo text-white hover:bg-indigo-hover" onClick={() => { onConfirm(); onClose(); }}>Cancel deletion</button>
        </footer>
      </div>
    </div>,
    document.body
  );
};

// ===== Sort indicator =====
const SortArrow = ({ active, dir }) => {
  if (!active) return <span className="text-d-fg-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity">&uarr;</span>;
  return <span className="text-indigo ml-1">{dir === "asc" ? "\u2191" : "\u2193"}</span>;
};

// ===== Sortable Th =====
const SortTh = ({ children, colKey, sortCol, sortDir, onSort, ...props }) => (
  <Th className="cursor-pointer select-none group" onClick={() => onSort(colKey)} {...props}>
    {children}
    <SortArrow active={sortCol === colKey} dir={sortDir} />
  </Th>
);

// ===== Main component =====
const AccountDeletionsPrototype = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(SEED_DATA);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [sortCol, setSortCol] = useState("dateMarked");
  const [sortDir, setSortDir] = useState("desc");
  const [cancelTarget, setCancelTarget] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (m) => { setToast(m); setTimeout(() => setToast(null), 3000); };

  const toggleSort = (col) => {
    if (sortCol === col) {
      setSortDir(d => d === "asc" ? "desc" : "asc");
    } else {
      setSortCol(col);
      setSortDir("asc");
    }
    setPage(0);
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    let rows = data;
    if (q) {
      rows = rows.filter(r =>
        String(r.accountId).includes(q) ||
        r.name.toLowerCase().includes(q)
      );
    }

    const compare = (a, b) => {
      let av, bv;
      switch (sortCol) {
        case "accountId": av = a.accountId; bv = b.accountId; break;
        case "name": av = a.name.toLowerCase(); bv = b.name.toLowerCase(); break;
        case "status": av = a.status; bv = b.status; break;
        case "reason": av = a.reason.toLowerCase(); bv = b.reason.toLowerCase(); break;
        case "markedBy": av = a.markedBy.toLowerCase(); bv = b.markedBy.toLowerCase(); break;
        case "dateMarked": av = a._markedTs; bv = b._markedTs; break;
        case "deletionDate": av = a._deletionTs; bv = b._deletionTs; break;
        case "cancelledBy": av = (a.cancelledBy || "").toLowerCase(); bv = (b.cancelledBy || "").toLowerCase(); break;
        default: return 0;
      }
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    };

    return [...rows].sort(compare);
  }, [data, search, sortCol, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages - 1);
  const pageRows = filtered.slice(safePage * PAGE_SIZE, (safePage + 1) * PAGE_SIZE);
  const from = filtered.length === 0 ? 0 : safePage * PAGE_SIZE + 1;
  const to = Math.min((safePage + 1) * PAGE_SIZE, filtered.length);

  const onCancelDeletion = () => {
    if (!cancelTarget) return;
    setData(prev => prev.map(r =>
      r.accountId === cancelTarget.accountId
        ? { ...r, status: "Cancelled", cancelledBy: "Becca Lee", deletionDate: "", _deletionTs: 0 }
        : r
    ));
    showToast(`Deletion cancelled for ${cancelTarget.name}`);
  };

  const sortThProps = { sortCol, sortDir, onSort: toggleSort };

  return (
    <div className="font-sans text-d-fg bg-d-bg antialiased">
      <ScenarioBar note="Account deletions list, sortable, searchable, paginated" />
      <div className="grid grid-cols-[264px_1fr] min-h-full bg-d-bg">
        <TopBar />
        <SideNav />
        <main className="px-8 pt-6 pb-10">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 text-d-fg-3 text-sm mb-2">
                <span>Accounts</span>
                <span className="opacity-50">&rsaquo;</span>
                <strong className="text-d-fg-2 font-medium">Deletions</strong>
              </div>
              <h1 className="m-0 text-3xl font-bold tracking-tight text-d-fg">Account Deletions</h1>
            </div>
          </div>

          <div className="bg-d-card border border-d-border rounded-xl overflow-hidden">
            <TableToolbar
              searchPlaceholder="Search by account ID or name..."
              searchValue={search}
              onSearchChange={(v) => { setSearch(v); setPage(0); }}
            />

            <Table>
              <Thead>
                <Tr>
                  <SortTh colKey="accountId" {...sortThProps}>Account ID</SortTh>
                  <SortTh colKey="name" {...sortThProps}>Account name</SortTh>
                  <SortTh colKey="status" {...sortThProps}>Status</SortTh>
                  <SortTh colKey="reason" {...sortThProps}>Reason</SortTh>
                  <SortTh colKey="markedBy" {...sortThProps}>Marked by</SortTh>
                  <SortTh colKey="dateMarked" {...sortThProps}>Date marked</SortTh>
                  <SortTh colKey="deletionDate" {...sortThProps}>Deletion date</SortTh>
                  <SortTh colKey="cancelledBy" {...sortThProps}>Cancelled by</SortTh>
                  <Th align="right">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {pageRows.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-6 py-14 text-center">
                      <div className="flex flex-col items-center gap-3 text-d-fg-3">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>
                        </svg>
                        <div className="text-base font-semibold text-d-fg">No results</div>
                        <div className="text-sm">No accounts match your search.</div>
                      </div>
                    </td>
                  </tr>
                ) : pageRows.map((row) => (
                  <Tr
                    key={row.accountId}
                    className="cursor-pointer"
                    onClick={() => navigate('/view-account')}
                  >
                    <Td className="text-d-fg-3 tabular-nums">#{row.accountId}</Td>
                    <Td className="font-medium">{row.name}</Td>
                    <Td><StatusBadge status={row.status}/></Td>
                    <Td className="text-d-fg-2 max-w-48 truncate">{row.reason}</Td>
                    <Td className="text-d-fg-2">{row.markedBy}</Td>
                    <Td className="text-d-fg-2 tabular-nums">{row.dateMarked}</Td>
                    <Td className="text-d-fg-2 tabular-nums">{row.deletionDate || <span className="text-d-fg-4">&mdash;</span>}</Td>
                    <Td className="text-d-fg-2">{row.cancelledBy || <span className="text-d-fg-4">&mdash;</span>}</Td>
                    <Td align="right">
                      {row.status === "Pending" && (
                        <button
                          className="inline-flex items-center gap-1.5 bg-transparent border border-transparent text-d-orange-fg cursor-pointer text-[11px] font-medium font-sans px-1.5 py-0.5 rounded-md transition-colors hover:bg-d-orange-bg hover:border-[rgba(255,105,0,0.3)]"
                          onClick={(e) => { e.stopPropagation(); setCancelTarget(row); }}
                        >
                          Cancel
                        </button>
                      )}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>

            <TablePagination
              from={from}
              to={to}
              total={filtered.length}
              page={safePage + 1}
              totalPages={totalPages}
              onPageChange={(p) => setPage(p - 1)}
            />
          </div>
        </main>
      </div>

      <CancelModal
        open={!!cancelTarget}
        onClose={() => setCancelTarget(null)}
        onConfirm={onCancelDeletion}
        row={cancelTarget}
      />
      {toast && <Toast message={toast} />}
    </div>
  );
};

AccountDeletionsPrototype.meta = {
  id: 'account-deletions',
  label: 'Account Deletions',
  description: 'List of accounts marked for deletion with search, sort, and pagination',
  path: '/account-deletions',
  status: 'wip',
};

export default AccountDeletionsPrototype;
