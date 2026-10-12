import { useState, useEffect, useMemo, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate, useLocation } from 'react-router-dom';

import ScenarioBar from '../../shell/ScenarioBar';
import TopBar from '../../shell/TopBar';
import SideNav from '../../shell/SideNav';
import Toast from '../../shell/Toast';
import { Table, Thead, Tbody, Tr, Th, Td, TablePagination, TableToolbar } from '../../shell/Table';

// Follows the vault notes in 1. projects/signals: "Signal model" and "Signals Story Planning".
// Story numbers are in the `story` field; `batch` is the build batch the story sits in.

const MIN = 60 * 1000;
const DAY = 24 * 60 * MIN;
const LIFETIME = 60 * DAY;
const PAGE_SIZE = 10;
const HALF_LIFE = 14 * DAY;
const STALL_AFTER = 5 * DAY;
const HOT = 40;
const WARM = 20;
const STALL_POINTS = 10;
const READY_CAP = 10;

// ===== Accounts =====
const ACCOUNTS = [
  { id: 80001, name: "Acme Holdings Ltd", owner: "Becca Lee", vertical: "Healthcare", spend: 62000, users: ["Priya Shah", "Tom Reed", "Lena Ortiz"] },
  { id: 80038, name: "BrightPath Media", owner: "Becca Lee", vertical: "Marketing", spend: 8000, users: ["Dan Cole", "Mia Ford"] },
  { id: 80075, name: "CloudStack Solutions", owner: "Becca Lee", vertical: "Insurance", spend: 21000, users: ["Raj Patel"] },
  { id: 80112, name: "DataForge Analytics", owner: "Becca Lee", vertical: "Software", spend: 3000, users: ["Ellie Grant"] },
  { id: 80149, name: "Evergreen Retail", owner: "Becca Lee", vertical: "Retail", spend: 14000, users: ["Sophie Hale", "Owen Burke"] },
  { id: 80186, name: "Flux Creative", owner: "Becca Lee", vertical: "Marketing", spend: 1200, users: ["Jay Moss"] },
  { id: 80409, name: "Granite Construction", owner: "Becca Lee", vertical: "Construction", spend: 9000, users: ["Carl Webb"] },
  { id: 80223, name: "GlobalTech Partners", owner: "Sam Khan", vertical: "Healthcare", spend: 34000, users: ["Nina Wu", "Ben Hart"] },
  { id: 80260, name: "Harbour Logistics", owner: "Sam Khan", vertical: "Logistics", spend: 18000, users: ["Greg Lowe"] },
  { id: 80297, name: "Insight Marketing", owner: "Sam Khan", vertical: "Marketing", spend: 6000, users: ["Amy Lin", "Leo Park"] },
  { id: 80334, name: "Jade Commerce", owner: "Sam Khan", vertical: "Retail", spend: 4000, users: ["Zoe Kemp"] },
  { id: 80371, name: "Keystone Properties", owner: "Sam Khan", vertical: "Insurance", spend: 11000, users: ["Max Doyle"] },
];
const ACCOUNT = Object.fromEntries(ACCOUNTS.map(a => [a.id, a]));

const fmtSpend = (n) => `£${Math.round(n / 1000)}k a year`;

// What a CSM needs before calling. Plan, balance, spend, campaigns and tickets are held today;
// phone numbers and last contact (HubSpot) are mock data for the prototype.
const BRIEF = {
  80001: { plan: "Pro", balance: 420, spend30: 5100, lastCampaign: { daysAgo: 9, items: 3200, format: "postcards" }, since: 2021, tickets: [], lastContact: { by: "Becca Lee", daysAgo: 41, how: "Call", note: "Quarterly check-in. Planning a spring mailer." } },
  80038: { plan: "Starter", balance: 60, spend30: 540, lastCampaign: { daysAgo: 21, items: 800, format: "letters" }, since: 2023, tickets: [{ subject: "API returns 401 with test key", daysAgo: 2 }], lastContact: null },
  80075: { plan: "Business", balance: 1300, spend30: 0, lastCampaign: { daysAgo: 32, items: 450, format: "letters" }, since: 2020, tickets: [], lastContact: { by: "Becca Lee", daysAgo: 70, how: "Email", note: "Sent renewal pricing." } },
  80112: { plan: "Free", balance: 0, spend30: 120, lastCampaign: { daysAgo: 14, items: 300, format: "postcards" }, since: 2025, tickets: [{ subject: "Card declined at checkout", daysAgo: 0.1 }], lastContact: null },
  80149: { plan: "Pro", balance: 900, spend30: 1600, lastCampaign: { daysAgo: 6, items: 2100, format: "postcards" }, since: 2022, tickets: [], lastContact: { by: "Becca Lee", daysAgo: 12, how: "Call", note: "Discussed the autumn catalogue." } },
  80186: { plan: "Free", balance: 25, spend30: 80, lastCampaign: null, since: 2026, tickets: [], lastContact: null },
  80409: { plan: "Pro", balance: 150, spend30: 300, lastCampaign: { daysAgo: 45, items: 600, format: "letters" }, since: 2022, tickets: [{ subject: "Invoice query", daysAgo: 3 }], lastContact: { by: "Becca Lee", daysAgo: 95, how: "Call", note: "Mentioned budget cuts next year." } },
  80223: { plan: "Business", balance: 2400, spend30: 3100, lastCampaign: { daysAgo: 3, items: 1800, format: "letters" }, since: 2021, tickets: [], lastContact: { by: "Sam Khan", daysAgo: 20, how: "Call", note: "Integrating with their patient system." } },
  80260: { plan: "Business", balance: 300, spend30: 900, lastCampaign: { daysAgo: 18, items: 1200, format: "letters" }, since: 2019, tickets: [], lastContact: { by: "Sam Khan", daysAgo: 60, how: "Email", note: "Asked about volume pricing." } },
  80297: { plan: "Starter", balance: 110, spend30: 420, lastCampaign: { daysAgo: 30, items: 900, format: "postcards" }, since: 2024, tickets: [], lastContact: null },
  80334: { plan: "Free", balance: 40, spend30: 200, lastCampaign: { daysAgo: 25, items: 400, format: "postcards" }, since: 2025, tickets: [], lastContact: null },
  80371: { plan: "Pro", balance: 0, spend30: 700, lastCampaign: { daysAgo: 40, items: 1500, format: "letters" }, since: 2022, tickets: [], lastContact: { by: "Sam Khan", daysAgo: 33, how: "Call", note: "Renewal went through." } },
};

const ROLES = ["Marketing manager", "Developer", "Operations lead"];
const contactOf = (account, name) => {
  const i = account.users.indexOf(name);
  const domain = account.name.toLowerCase().split(" ")[0].replace(/[^a-z]/g, "") + ".com";
  const digits = String(100 + ((account.id + i * 37) % 900));
  return {
    name,
    role: ROLES[i % ROLES.length],
    email: `${name.toLowerCase().replace(" ", ".")}@${domain}`,
    phone: `+44 7700 900${digits}`,
    lastSeenDays: [0, 2, 9][i % 3],
  };
};
const fmtMoney = (n) => `£${n.toLocaleString()}`;
const band = (v, steps) => steps.find(([min]) => v >= min)[1];
const moneyPoints = (v) => band(v, [[5000, 40], [1000, 30], [250, 20], [0, 10]]);
const inDays = (d) => new Date(Date.now() + d * DAY).toLocaleDateString("en-GB", { day: "numeric", month: "short" });

// ===== Signal catalogue, from the story planning note =====
// group: moment | tested | api | campaign | commercial | ready. kind defaults to Grow.
const TYPES = {
  addUser:    { story: 2, batch: 1, group: "tested", name: "Added a user", points: () => 15,
                detail: v => `Now ${v} users`, why: "Accounts that add a user are about 3× more likely to grow over the next 3 months." },
  firstApi:   { story: 3, batch: 1, group: "tested", name: "First API send", points: () => 15, auto: true,
                detail: () => "First live send through the API", why: "Accounts that start sending through the API are about 2× more likely to grow, and API customers are worth 3.6× UI customers." },
  apiQuiet:   { story: 4, batch: 1, group: "moment", kind: "Save", name: "API gone quiet", points: () => 40, auto: true, outcome: "API sends resumed",
                detail: v => `Last API send ${v}, after 3 months of regular sending`, why: "Nearly half of regular API senders that go quiet stop sending altogether within 3 months." },
  basket:     { story: 5, batch: 1, group: "moment", name: "Abandoned basket", points: v => moneyPoints(v), outcome: "Basket paid",
                detail: v => `${fmtMoney(v)} in the basket`, why: "They chose what to buy and stopped at payment." },
  checkout:   { story: 6, batch: 1, group: "moment", name: "Abandoned checkout", points: v => moneyPoints(v.amount), outcome: "Payment completed",
                detail: v => `${fmtMoney(v.amount)} for ${v.what}`, why: "They tried to pay and didn't finish. Something may have gone wrong at payment." },
  renewalOff: { story: 7, batch: 1, group: "moment", kind: "Save", name: "Renewal turned off", points: () => 40, outcome: "Renewal back on",
                detail: v => `${v.plan} plan ends ${v.ends}`, why: "They've just turned off renewal. The decision is fresh, so a call now has the best chance of changing it." },
  apiTest:    { story: 8, batch: 1, group: "api", name: "API testing", points: () => 10, auto: true,
                detail: v => `Tested ${v}`, why: "They're testing the API, either to go live or to add something new." },
  topup:      { story: 12, batch: 2, group: "tested", name: "First top-up", points: () => 10,
                detail: v => `Topped up ${fmtMoney(v)}`, why: "They've paid in advance for the first time, which usually means they're planning to send. Accounts that do are about 2× more likely to grow." },
  draft:      { story: 13, batch: 2, group: "moment", kind: "Stall", name: "Campaign not sent", points: v => band(v.items, [[20000, 35], [5000, 25], [0, 15]]), outcome: "Campaign booked",
                detail: v => `"${v.name}", ${v.items.toLocaleString()} items`, why: "Accounts that leave a large campaign unsent are 2 to 3× more likely to grow, and more likely to lapse. A call can tip it either way." },
  planEnding: { story: 14, batch: 2, group: "moment", kind: "Save", name: "Plan ending", points: () => 30, outcome: "Plan renewed",
                detail: v => `${v.plan} plan ends ${v.ends}`, why: "About 60% of accounts whose plan ends without renewing stop sending within 3 months." },
  demo:       { story: 18, batch: 2, group: "moment", name: "Demo requested", points: () => 40, outcome: "Meeting held",
                detail: () => "Booked a demo", why: "They've asked to talk to us." },
  webhook:    { story: 19, batch: 2, group: "api", name: "Added a webhook", points: () => 8,
                detail: () => "Delivery status updates", why: "They're wiring Stannp into their own systems, a sign they're building on the API." },
  apiKey:     { story: 20, batch: 3, group: "api", name: "API key copied", points: () => 6,
                detail: () => "From API settings", why: "A developer or a new system is probably connecting." },
  apiLogging: { story: 21, batch: 3, group: "api", name: "API logging on", points: () => 6,
                detail: () => "Turned on before going live", why: "An integration is in progress." },
  apiDocs:    { story: 22, batch: 3, group: "api", name: "Looked at the API", points: () => 3,
                detail: () => "Viewed the API docs", why: "They're exploring an integration." },
  bigList:    { story: 23, batch: 3, group: "campaign", name: "Big list", points: v => band(v.size, [[10000, 10], [2000, 6], [0, 3]]), outcome: "Campaign sent to the list",
                detail: v => `${v.size.toLocaleString()} recipients, previous largest ${v.prev.toLocaleString()}`, why: "A big campaign is probably coming." },
  listBuilder:{ story: 24, batch: 3, group: "campaign", name: "Using List Builder", points: () => 5, outcome: "List bought",
                detail: v => `Matches ${v.toLocaleString()} records`, why: "They're planning who to send to." },
  firstDesign:{ story: 25, batch: 3, group: "campaign", name: "First design", points: () => 3, outcome: "Campaign sent with it",
                detail: v => `"${v}"`, why: "A first campaign is close." },
  firstQr:    { story: 26, batch: 3, group: "campaign", name: "First QR design", points: () => 6, outcome: "Campaign sent with it",
                detail: v => `"${v}"`, why: "They want to track responses." },
  pricing:    { story: 27, batch: 3, group: "commercial", name: "Looked at pricing", points: () => 4, outcome: "Paid plan started",
                detail: () => "Viewed the plans page", why: "They're weighing up a purchase or a plan." },
  sample:     { story: 28, batch: 3, group: "commercial", name: "Sample pack requested", points: () => 8,
                detail: () => "Postcards and letters", why: "They're judging the quality before they buy." },
  card:       { story: 29, batch: 4, group: "ready", name: "Card added", points: () => 3,
                detail: () => "First card on the account", why: "They're getting ready to pay." },
  autoTopup:  { story: 30, batch: 4, group: "ready", name: "Auto top-up on", points: () => 4,
                detail: () => "Tops up when low", why: "They plan to keep sending." },
  bigTopup:   { story: 31, batch: 4, group: "ready", name: "Big top-up", points: () => 3,
                detail: v => `${fmtMoney(v.amount)}, usually ${fmtMoney(v.usual)}`, why: "They're planning to send more." },
  blocklist:  { story: 32, batch: 4, group: "ready", name: "Blocklist set up", points: () => 2,
                detail: () => "First blocklist entry", why: "They're preparing a list to send to." },
  twofa:      { story: 33, batch: 4, group: "ready", name: "Two-factor on", points: () => 1,
                detail: () => "Secured their sign-in", why: "They're settling in for the long term." },
};

const kindOf = (s) => TYPES[s.type].kind || "Grow";

// Suggested first line for the call, by top signal
const OPENERS = {
  addUser: () => "I saw someone new joined your account. Is more of the team starting to send?",
  firstApi: () => "Your first API send went through. What are you planning to connect next?",
  apiQuiet: () => "Your API sends stopped about a month ago. Has something changed on your side?",
  basket: v => `I noticed ${fmtMoney(v)} sitting in your basket. Anything I can help with before you place it?`,
  checkout: v => `It looks like your payment for ${v.what.replace(" (annual value)", "")} didn't go through. Can I help sort that out?`,
  renewalOff: v => `I saw renewal was turned off on your ${v.plan} plan. Can I ask what prompted that?`,
  apiTest: v => `I can see you're testing the API with ${v}. Is anything stopping you going live?`,
  topup: () => "Thanks for topping up. What are you planning to send?",
  draft: v => `"${v.name}" is ready but not booked yet. Is anything holding it up?`,
  planEnding: v => `Your ${v.plan} plan ends ${v.ends}. Before it does, can we talk about what you need?`,
  demo: () => "Thanks for booking a demo. What would you most like to see?",
};
const openerOf = (s) => OPENERS[s.type]?.(s.value) || "Ask what they're working on at the moment.";

const KIND_GUIDE = {
  Save: "Find out why first. Don't pitch.",
  Stall: "Ask what's stopping them, then help remove it.",
  Grow: "Help them do more of what they've started.",
};
const pointsOf = (s) => TYPES[s.type].points(s.value);

// Demo values for signals raised from the demo bar
const DEMO_VALUES = {
  addUser: () => 2 + Math.floor(Math.random() * 4),
  apiQuiet: () => "34 days ago",
  basket: () => [180, 640, 2400, 7200][Math.floor(Math.random() * 4)],
  checkout: () => [{ amount: 1188, what: "the Pro plan (annual value)" }, { amount: 2400, what: "a campaign" }, { amount: 640, what: "a top-up" }][Math.floor(Math.random() * 3)],
  renewalOff: () => ({ plan: "Pro", ends: inDays(24) }),
  apiTest: () => ["letters", "postcards", "recipients"][Math.floor(Math.random() * 3)],
  topup: () => 500,
  draft: () => ({ name: "Spring mailer", items: [1200, 6200, 24000][Math.floor(Math.random() * 3)] }),
  planEnding: () => ({ plan: "Pro", ends: inDays(18) }),
  bigList: () => ({ size: 12000, prev: 3100 }),
  listBuilder: () => 8400,
  firstDesign: () => "Welcome postcard",
  firstQr: () => "Open day flyer",
  bigTopup: () => ({ amount: 2000, usual: 400 }),
};

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

let nextId = 1;
const makeSignal = (accountId, type, daysAgo, value) => ({
  id: nextId++,
  accountId,
  type,
  value: value ?? DEMO_VALUES[type]?.(),
  by: TYPES[type].auto ? null : pick(ACCOUNT[accountId].users),
  raisedAt: Date.now() - daysAgo * DAY,
  clearedAt: null,
  clearedReason: null,
});

const seed = () => [
  // Becca, batch 1
  makeSignal(80001, "basket", 1, 1240),
  makeSignal(80001, "addUser", 3, 4),
  makeSignal(80075, "apiQuiet", 2, "32 days ago"),
  makeSignal(80409, "renewalOff", 1, { plan: "Pro", ends: inDays(18) }),
  makeSignal(80038, "apiTest", 3, "letters"),
  makeSignal(80038, "addUser", 6, 3),
  makeSignal(80112, "checkout", 0.1, { amount: 1188, what: "the Pro plan (annual value)" }),
  makeSignal(80186, "firstApi", 2),
  // Becca, later batches
  makeSignal(80038, "webhook", 8),
  makeSignal(80038, "apiKey", 10),
  makeSignal(80149, "topup", 5, 750),
  makeSignal(80149, "draft", 4, { name: "Autumn catalogue", items: 6200 }),
  makeSignal(80186, "card", 2),
  makeSignal(80186, "autoTopup", 2),
  // Sam, batch 1
  makeSignal(80223, "firstApi", 3),
  makeSignal(80223, "addUser", 6, 5),
  makeSignal(80223, "apiTest", 9, "postcards"),
  makeSignal(80260, "renewalOff", 2, { plan: "Business", ends: inDays(12) }),
  makeSignal(80371, "basket", 0.3, 7200),
  makeSignal(80297, "apiTest", 1, "recipients"),
  makeSignal(80334, "addUser", 4, 2),
  // Sam, later batches
  makeSignal(80297, "bigList", 2, { size: 12000, prev: 3100 }),
  makeSignal(80297, "firstQr", 1, "Open day flyer"),
  makeSignal(80334, "demo", 0.05),
];

// ===== Heat (story 9) =====
const HEAT_RANK = { Hot: 3, Warm: 2, Cool: 1 };
const KIND_RANK = { Save: 3, Stall: 2, Grow: 1 };
const TRACK_GROUPS = ["api", "campaign", "commercial"];

const buildAccount = (account, list, now) => {
  const groups = {};
  list.forEach(s => (groups[TYPES[s.type].group] ||= []).push(s));

  // A track stalls with 2+ steps and nothing new for 5 days. The API track's stall ends with a first live send.
  const stalled = TRACK_GROUPS.filter(t => {
    const steps = groups[t];
    if (!steps || steps.length < 2) return false;
    if (t === "api" && list.some(s => s.type === "firstApi")) return false;
    return now - Math.max(...steps.map(s => s.raisedAt)) >= STALL_AFTER;
  });

  const ready = (groups.ready || []).reduce((sum, s) => sum + pointsOf(s), 0);
  const nonReady = list.filter(s => TYPES[s.type].group !== "ready");

  // Bands use full points; decayed points only order accounts within a band
  const points = nonReady.reduce((sum, s) => sum + pointsOf(s), 0) + Math.min(ready, READY_CAP) + stalled.length * STALL_POINTS;
  const decay = (s) => Math.pow(0.5, (now - s.raisedAt) / HALF_LIFE);
  const ordering = nonReady.reduce((sum, s) => sum + pointsOf(s) * decay(s), 0) + Math.min(ready, READY_CAP) + stalled.length * STALL_POINTS;

  const heat = points >= HOT ? "Hot" : points >= WARM ? "Warm" : "Cool";

  // The account's kind: Save beats Stall beats Grow, so a CSM doesn't open a save call with an upsell
  const kinds = list.map(kindOf).concat(stalled.length ? ["Stall"] : []);
  const kind = kinds.sort((a, b) => KIND_RANK[b] - KIND_RANK[a])[0];

  const ranked = [...list].sort((a, b) => (pointsOf(b) - pointsOf(a)) || (b.raisedAt - a.raisedAt));

  return { account, signals: ranked, stalled, points, ordering, heat, kind };
};

// ===== Helpers =====
const timeAgo = (ts, now) => {
  const mins = Math.floor((now - ts) / MIN);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr${hrs > 1 ? "s" : ""} ago`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
};

const fmtFull = (ts) => new Date(ts).toLocaleString("en-GB", {
  day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
});

const detailOf = (s) => TYPES[s.type].detail(s.value);

// ===== Small pieces =====
const HeatBadge = ({ heat }) => {
  const styles = {
    Hot: "bg-d-red-bg text-d-red-fg",
    Warm: "bg-d-orange-bg text-d-orange-fg",
    Cool: "bg-d-neutral-bg text-d-fg-3",
  };
  const bars = HEAT_RANK[heat];
  return (
    <span className={`inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[11.5px] font-semibold leading-snug ${styles[heat]}`}>
      <span className="inline-flex items-end gap-px h-2.5">
        {[1, 2, 3].map(n => (
          <span key={n} className={`w-[3px] rounded-sm bg-current ${n <= bars ? "" : "opacity-25"}`} style={{ height: `${n * 33}%` }} />
        ))}
      </span>
      {heat}
    </span>
  );
};

const Tag = ({ tone, children }) => {
  const tones = {
    Grow: "bg-d-green-bg text-d-green-fg",
    Save: "bg-d-orange-bg text-d-orange-fg",
    Stall: "bg-d-yellow-bg text-d-yellow-fg",
    new: "bg-d-indigo-bg text-d-indigo-fg",
    cleared: "bg-d-neutral-bg text-d-fg-3",
  };
  return <span className={`px-1.5 py-px rounded text-[10px] font-bold uppercase tracking-[0.04em] whitespace-nowrap ${tones[tone]}`}>{children}</span>;
};

const StatTile = ({ label, value }) => (
  <div className="bg-d-card border border-d-border rounded-[14px] px-6 py-5">
    <div className="text-xs font-medium text-d-fg-3 mb-1.5">{label}</div>
    <div className="text-2xl font-bold text-d-fg tabular-nums">{value}</div>
  </div>
);

// ===== Call brief: everything a CSM needs to call now. A Filament row action opening a slide-over. =====
const BriefSection = ({ title, children }) => (
  <section className="px-6 py-4 border-b border-d-border">
    <h3 className="m-0 mb-2.5 text-[11px] font-semibold uppercase tracking-[0.05em] text-d-fg-3">{title}</h3>
    {children}
  </section>
);

const Fact = ({ label, children }) => (
  <div>
    <div className="text-xs text-d-fg-3">{label}</div>
    <div className="text-sm text-d-fg mt-0.5">{children}</div>
  </div>
);

const daysText = (d) => d < 1 ? "today" : `${Math.round(d)} day${Math.round(d) > 1 ? "s" : ""} ago`;

const CallBrief = ({ entry, now, onClose, onOpenAccount }) => {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const { account } = entry;
  const brief = BRIEF[account.id];
  const top = entry.signals[0];
  const rest = entry.signals.slice(1);
  // Call the person behind the top signal; fall back to the primary user
  const contact = contactOf(account, top.by || account.users[0]);
  const others = account.users.filter(u => u !== contact.name).map(u => contactOf(account, u));

  return ReactDOM.createPortal(
    <div className="font-sans text-d-fg antialiased fixed inset-0 z-[120] bg-black/55 backdrop-blur-sm flex justify-end animate-[va-fade-in_0.14s_ease-out]" onClick={onClose}>
      <div className="h-full w-full max-w-[560px] bg-d-card border-l border-d-border-2 shadow-[0_24px_64px_rgba(0,0,0,0.45)] flex flex-col" onClick={e => e.stopPropagation()}>
        <header className="px-6 pt-5 pb-4 border-b border-d-border">
          <div className="flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="text-xs text-d-fg-3">Call brief</div>
              <h2 className="m-0 mt-0.5 text-lg font-semibold truncate">{account.name}</h2>
              <div className="flex items-center gap-2 mt-2">
                <HeatBadge heat={entry.heat} />
                <Tag tone={entry.kind}>{entry.kind}</Tag>
                <span className="text-xs text-d-fg-3">{account.vertical} · {fmtSpend(account.spend)}</span>
              </div>
            </div>
            <button className="shrink-0 w-8 h-8 rounded-md bg-transparent border-none cursor-pointer text-d-fg-3 inline-flex items-center justify-center hover:bg-d-card-2 hover:text-d-fg" onClick={onClose}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l12 12M18 6l-12 12"/></svg>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          <BriefSection title="Why now">
            <div className="text-sm font-semibold">{TYPES[top.type].name}</div>
            <div className="text-sm text-d-fg-2 mt-0.5">{detailOf(top)} · {timeAgo(top.raisedAt, now)}</div>
            <div className="text-xs text-d-fg-3 mt-1.5 leading-snug">{TYPES[top.type].why}</div>
            {(rest.length > 0 || entry.stalled.length > 0) && (
              <ul className="m-0 mt-3 p-0 list-none flex flex-col gap-1.5 pt-3 border-t border-d-border">
                {entry.stalled.length > 0 && (
                  <li className="flex items-center gap-2 text-xs text-d-fg-2"><Tag tone="Stall">Stalled</Tag> No new step for 5+ days</li>
                )}
                {rest.map(s => (
                  <li key={s.id} className="flex items-baseline gap-2 text-xs">
                    <span className="text-d-fg">{TYPES[s.type].name}</span>
                    <span className="text-d-fg-3 truncate min-w-0">{detailOf(s)}</span>
                    <span className="ml-auto text-d-fg-4 whitespace-nowrap">{timeAgo(s.raisedAt, now)}</span>
                  </li>
                ))}
              </ul>
            )}
          </BriefSection>

          <BriefSection title="Who to call">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold">{contact.name}</div>
                <div className="text-xs text-d-fg-3 mt-0.5">
                  {contact.role} · {top.by ? `did the top signal` : "primary user"} · last signed in {daysText(contact.lastSeenDays)}
                </div>
                <div className="text-sm text-d-fg-2 mt-1.5 tabular-nums">{contact.phone}</div>
                <div className="text-sm text-d-fg-2">{contact.email}</div>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <a href={`tel:${contact.phone.replace(/ /g, "")}`} className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-md font-semibold text-xs no-underline bg-indigo text-white hover:bg-indigo-hover">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>
                  Call {contact.name.split(" ")[0]}
                </a>
                <a href={`mailto:${contact.email}`} className="inline-flex items-center justify-center px-3.5 py-2 rounded-md font-semibold text-xs no-underline bg-d-card text-d-fg-2 border border-d-border-2 hover:bg-d-card-hover hover:text-d-fg">Email</a>
              </div>
            </div>
            {others.length > 0 && (
              <div className="text-xs text-d-fg-3 mt-3">Also on the account: {others.map(o => `${o.name} (${o.role.toLowerCase()})`).join(", ")}</div>
            )}
          </BriefSection>

          <BriefSection title="Open with">
            <div className="text-sm text-d-fg leading-snug">"{openerOf(top)}"</div>
            <div className="text-xs text-d-fg-3 mt-2">{KIND_GUIDE[entry.kind]}</div>
          </BriefSection>

          <BriefSection title="Before you call">
            <ul className="m-0 p-0 list-none flex flex-col gap-2 text-sm">
              {brief.tickets.map(t => (
                <li key={t.subject} className="flex items-start gap-2">
                  <Tag tone="Save">Open ticket</Tag>
                  <span className="text-d-fg-2">{t.subject} · {daysText(t.daysAgo)}</span>
                </li>
              ))}
              <li className="text-d-fg-2">
                {brief.lastContact
                  ? <>Last contact: {brief.lastContact.how.toLowerCase()} by {brief.lastContact.by}, {daysText(brief.lastContact.daysAgo)}. <span className="text-d-fg-3">"{brief.lastContact.note}"</span></>
                  : <span className="text-d-fg-3">No contact logged in HubSpot.</span>}
              </li>
            </ul>
          </BriefSection>

          <BriefSection title="Account">
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              <Fact label="Plan">{brief.plan}</Fact>
              <Fact label="Balance">{fmtMoney(brief.balance)}</Fact>
              <Fact label="Spend, last 30 days">{fmtMoney(brief.spend30)}</Fact>
              <Fact label="Spend, last 12 months">{fmtMoney(account.spend)}</Fact>
              <Fact label="Last campaign">
                {brief.lastCampaign ? `${brief.lastCampaign.items.toLocaleString()} ${brief.lastCampaign.format}, ${daysText(brief.lastCampaign.daysAgo)}` : "None yet"}
              </Fact>
              <Fact label="Customer since">{brief.since}</Fact>
            </div>
          </BriefSection>
        </div>

        <footer className="px-6 py-4 border-t border-d-border flex justify-end gap-2.5">
          <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md font-sans font-semibold text-sm border cursor-pointer bg-d-card text-d-fg-2 border-d-border-2 hover:bg-d-card-hover hover:text-d-fg">View in HubSpot</button>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md font-sans font-semibold text-sm border border-transparent cursor-pointer bg-indigo text-white hover:bg-indigo-hover" onClick={onOpenAccount}>
            Open account page
          </button>
        </footer>
      </div>
    </div>,
    document.body
  );
};

// Filament table widget heading: title, then a description underneath
const WidgetHeading = ({ title, description, right }) => (
  <div className="flex items-start justify-between gap-4 px-6 py-4 border-b border-d-border">
    <div>
      <div className="text-base font-semibold text-d-fg">{title}</div>
      {description && <div className="text-sm text-d-fg-3 mt-0.5">{description}</div>}
    </div>
    {right}
  </div>
);

// Sortable header, as in the account deletions prototype
const SortTh = ({ children, col, sort, onSort, className = "", ...props }) => (
  <Th className={`cursor-pointer select-none group ${className}`} onClick={() => onSort(col)} {...props}>
    {children}
    {sort.col === col
      ? <span className="text-indigo ml-1">{sort.dir === "asc" ? "\u2191" : "\u2193"}</span>
      : <span className="text-d-fg-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity">&uarr;</span>}
  </Th>
);

const nextSort = (sort, col, firstDir = "asc") =>
  sort.col === col ? { col, dir: sort.dir === "asc" ? "desc" : "asc" } : { col, dir: firstDir };

const sortBy = (rows, key, dir) => [...rows].sort((a, b) => {
  const av = key(a), bv = key(b);
  const c = av < bv ? -1 : av > bv ? 1 : 0;
  return dir === "asc" ? c : -c;
});

const NoMatches = ({ cols, children }) => (
  <tr><td colSpan={cols} className="px-6 py-10 text-center text-sm text-d-fg-3">{children}</td></tr>
);

const paginate = (rows, page) => {
  const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const p = Math.min(page, totalPages);
  return {
    rows: rows.slice((p - 1) * PAGE_SIZE, p * PAGE_SIZE),
    page: p,
    totalPages,
    from: rows.length ? (p - 1) * PAGE_SIZE + 1 : 0,
    to: Math.min(p * PAGE_SIZE, rows.length),
    total: rows.length,
  };
};

// ===== Account page (stories 1 and 9): title bar, then the same widget scoped to one account =====
const pageBtn = "inline-flex items-center gap-2 px-3 py-[7px] rounded-md font-sans font-semibold text-xs border cursor-pointer transition-[filter,background]";

const AccountPage = ({ account, entry, now, fresh, clearing, onBack, onBrief }) => (
  <>
    <div className="flex items-end justify-between gap-4 mb-6">
      <div>
        <div className="flex items-center gap-2 text-d-fg-3 text-sm mb-2">
          <span className="cursor-pointer hover:text-d-fg" onClick={onBack}>Accounts</span>
          <span className="opacity-50">&rsaquo;</span>
          <strong className="text-d-fg-2 font-medium">View</strong>
        </div>
        <h1 className="m-0 text-3xl font-bold tracking-tight text-d-fg">View Account</h1>
        <div className="text-sm text-d-fg-3 mt-1.5">
          {account.name} · <span className="tabular-nums">#{account.id}</span> · Account manager {account.owner}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className={`${pageBtn} bg-red text-white border-transparent hover:brightness-110`}>Login as Customer</button>
        <button className={`${pageBtn} bg-d-orange-bg text-d-orange-fg border-transparent hover:brightness-110`}>Debit Balance</button>
        <button className={`${pageBtn} bg-d-card text-d-fg-2 border-d-border-2 hover:bg-d-card-hover hover:text-d-fg`}>View in HubSpot</button>
        <button className={`${pageBtn} bg-red text-white border-transparent hover:brightness-110`}>Mark for Deletion</button>
      </div>
    </div>

    <div className="bg-d-card border border-d-border rounded-xl overflow-hidden mb-6">
      <WidgetHeading
        title="Signals"
        right={entry && (
          <div className="flex items-center gap-2">
            <HeatBadge heat={entry.heat} />
            <span className="text-xs text-d-fg-3 tabular-nums">{entry.points} points</span>
            <Tag tone={entry.kind}>{entry.kind}</Tag>
            {entry.stalled.length > 0 && <Tag tone="Stall">Stalled</Tag>}
            {onBrief && <button className={`${pageBtn} ml-2 bg-d-card text-d-fg-2 border-d-border-2 hover:bg-d-card-hover hover:text-d-fg`} onClick={onBrief}>Call brief</button>}
          </div>
        )}
      />
      {entry ? (
        <Table>
          <Thead>
            <Tr>
              <Th>Signal</Th>
              <Th className="w-20">Type</Th>
              <Th>Detail</Th>
              <Th>Why it matters</Th>
              <Th>Who</Th>
              <Th align="right">Raised</Th>
            </Tr>
          </Thead>
          <Tbody>
            {entry.signals.map(s => (
              <Tr
                key={s.id}
                className={
                  "transition-opacity duration-500" +
                  (fresh.has(s.id) ? " animate-[va-row-new_4s_ease-out]" : "") +
                  (clearing.has(s.id) ? " opacity-0" : "")
                }
              >
                <Td className="py-2.5! whitespace-nowrap font-medium">{TYPES[s.type].name}</Td>
                <Td className="py-2.5!"><Tag tone={kindOf(s)}>{kindOf(s)}</Tag></Td>
                <Td className="py-2.5! whitespace-nowrap text-xs text-d-fg-2">{detailOf(s)}</Td>
                <Td className="py-2.5! w-full max-w-0">
                  <div className="text-xs text-d-fg-3 truncate" title={TYPES[s.type].why}>{TYPES[s.type].why}</div>
                </Td>
                <Td className="py-2.5! whitespace-nowrap text-sm text-d-fg-2">{s.by || <span className="text-d-fg-4">Automatic</span>}</Td>
                <Td align="right" className="py-2.5! text-xs text-d-fg-3 tabular-nums whitespace-nowrap" title={fmtFull(s.raisedAt)}>
                  {timeAgo(s.raisedAt, now)}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <div className="px-6 py-10 text-center text-sm text-d-fg-3">
          No live signals on this account.
        </div>
      )}
    </div>
  </>
);

const demoBtn = "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border-[1.5px] bg-white/8 border-white/25 text-white/85 font-sans font-semibold text-xs cursor-pointer whitespace-nowrap transition-all hover:bg-white/15 hover:border-white/40 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed";
const demoBtnOn = "bg-white/18 border-white/70 text-white";

const SCENARIOS = [
  { id: "Becca Lee", label: "Becca Lee (CSM)", dot: "#FCB91D", note: "Becca owns 7 accounts" },
  { id: "Sam Khan", label: "Sam Khan (CSM)", dot: "#415DE5", note: "Sam owns 5 accounts" },
];

// ===== Main component =====
const SignalsFeedPrototype = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pageMatch = location.pathname.match(/\/account\/(\d+)/);
  const pageAccountId = pageMatch && ACCOUNT[pageMatch[1]] ? Number(pageMatch[1]) : null;
  const [viewer, setViewer] = useState("Becca Lee");
  const [scope, setScope] = useState(1); // 1 = batch 1 only, 4 = all batches
  const [hotPage, setHotPage] = useState(1);
  const [sigPage, setSigPage] = useState(1);
  const [hotSearch, setHotSearch] = useState("");
  const [hotType, setHotType] = useState("All types");
  const [hotHeat, setHotHeat] = useState("All heat");
  const [hotSort, setHotSort] = useState({ col: "heat", dir: "desc" });
  const [sigSearch, setSigSearch] = useState("");
  const [sigType, setSigType] = useState("All types");
  const [sigSignal, setSigSignal] = useState("All signals");
  const [sigSort, setSigSort] = useState({ col: "raised", dir: "desc" });
  const [signals, setSignals] = useState(seed);
  const [fresh, setFresh] = useState(new Set());
  const [clearing, setClearing] = useState(new Set());
  const [slideOver, setSlideOver] = useState(null); // account id
  const [now, setNow] = useState(Date.now());
  const [toast, setToast] = useState(null);
  const toastTimer = useRef();

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 30 * 1000);
    return () => clearInterval(t);
  }, []);

  const showToast = (m) => {
    clearTimeout(toastTimer.current);
    setToast(m);
    toastTimer.current = setTimeout(() => setToast(null), 3500);
  };

  const inScope = (s) => TYPES[s.type].batch <= scope;
  const typesInScope = Object.keys(TYPES).filter(t => TYPES[t].batch <= scope);

  // Everything on the viewer's accounts in this scope that hasn't expired, newest first
  const mine = useMemo(() => signals
    .filter(s => ACCOUNT[s.accountId].owner === viewer && inScope(s) && now - s.raisedAt < LIFETIME)
    .sort((a, b) => b.raisedAt - a.raisedAt),
  [signals, viewer, scope, now]);

  const live = useMemo(() => mine.filter(s => !s.clearedAt), [mine]);

  const allAccounts = useMemo(() => {
    const byAccount = new Map();
    live.forEach(s => byAccount.set(s.accountId, [...(byAccount.get(s.accountId) || []), s]));
    return [...byAccount.entries()]
      .map(([id, list]) => buildAccount(ACCOUNT[id], list, now))
      .sort((a, b) => (HEAT_RANK[b.heat] - HEAT_RANK[a.heat]) || (b.ordering - a.ordering));
  }, [live, now]);

  // Story 10: Cool accounts are left off the Accounts tab
  const accountFeed = allAccounts.filter(a => a.heat !== "Cool");
  const hotCount = accountFeed.filter(a => a.heat === "Hot").length;

  // The account page shows any account's signals, whoever owns it
  const pageLive = pageAccountId
    ? signals.filter(s => s.accountId === pageAccountId && inScope(s) && !s.clearedAt && now - s.raisedAt < LIFETIME)
    : [];
  const pageEntry = pageLive.length ? buildAccount(ACCOUNT[pageAccountId], pageLive, now) : null;
  const slideEntry = slideOver && (pageEntry?.account.id === slideOver ? pageEntry : allAccounts.find(a => a.account.id === slideOver));

  const openAccount = (id) => { setSlideOver(null); navigate(`/signals-feed/account/${id}`); };

  const markFresh = (id) => {
    setFresh(prev => new Set(prev).add(id));
    setTimeout(() => setFresh(prev => { const n = new Set(prev); n.delete(id); return n; }), 4000);
  };

  const clearSignals = (ids, reason) => {
    setClearing(prev => new Set([...prev, ...ids]));
    setTimeout(() => {
      const at = Date.now();
      setSignals(prev => prev.map(s => ids.includes(s.id) ? { ...s, clearedAt: at, clearedReason: reason } : s));
      setClearing(prev => { const n = new Set(prev); ids.forEach(id => n.delete(id)); return n; });
    }, 600);
  };

  const raise = (forMe) => {
    const pool = pageAccountId && forMe
      ? [ACCOUNT[pageAccountId]]
      : ACCOUNTS.filter(a => forMe ? a.owner === viewer : a.owner !== viewer);
    const account = pick(pool);
    const liveHere = signals.filter(s => s.accountId === account.id && !s.clearedAt);
    const taken = new Set(liveHere.map(s => s.type));
    // Story 14: no "Plan ending" while "Renewal turned off" is live
    if (taken.has("renewalOff")) taken.add("planEnding");
    const type = pick(typesInScope.filter(t => !taken.has(t)));
    if (!type) return;
    const signal = makeSignal(account.id, type, 0);
    setSignals(prev => [...prev, signal]);
    setNow(Date.now());
    // Story 6: a checkout replaces the basket signal it came from
    const basket = liveHere.find(s => s.type === "basket");
    if (type === "checkout" && basket) clearSignals([basket.id], "Moved to checkout");
    if (forMe) markFresh(signal.id);
    else showToast(`${TYPES[type].name} on ${account.name}, ${account.owner}'s account. Not in your feed.`);
  };

  // A signal's own outcome happens, e.g. the basket is paid
  const outcome = () => {
    const candidates = (pageAccountId ? pageLive : live).filter(s => TYPES[s.type].outcome);
    if (!candidates.length) return;
    const s = pick(candidates);
    clearSignals([s.id], TYPES[s.type].outcome);
    showToast(`${ACCOUNT[s.accountId].name}: ${TYPES[s.type].outcome.toLowerCase()}. "${TYPES[s.type].name}" cleared.`);
  };

  // Demo only: age everything so stalls and expiry show without waiting
  const skipAhead = () => {
    setSignals(prev => prev.map(s => ({
      ...s,
      raisedAt: s.raisedAt - 7 * DAY,
      clearedAt: s.clearedAt && s.clearedAt - 7 * DAY,
    })));
    setNow(Date.now());
  };

  const changeScope = (n) => {
    setScope(n);
    setSlideOver(null);
  };

  const showSignalsWidget = scope > 1; // story 16 is batch 2
  const showBrief = scope > 1; // call brief is not in batch 1
  const matches = (name, q) => name.toLowerCase().includes(q.trim().toLowerCase());

  const hotKeys = {
    heat: a => HEAT_RANK[a.heat] * 1e6 + a.ordering,
    account: a => a.account.name.toLowerCase(),
    raised: a => a.signals[0].raisedAt,
  };
  const hotFiltered = sortBy(
    accountFeed.filter(a =>
      (hotType === "All types" || a.kind === hotType) &&
      (hotHeat === "All heat" || a.heat === hotHeat) &&
      matches(a.account.name, hotSearch)),
    hotKeys[hotSort.col], hotSort.dir);
  const hot = paginate(hotFiltered, hotPage);
  const onHotSort = (col) => { setHotSort(prev => nextSort(prev, col, col === "account" ? "asc" : "desc")); setHotPage(1); };

  const sigKeys = {
    account: s => ACCOUNT[s.accountId].name.toLowerCase(),
    signal: s => TYPES[s.type].name.toLowerCase(),
    raised: s => s.raisedAt,
  };
  const signalNames = [...new Set(live.map(s => TYPES[s.type].name))].sort();
  const sigFiltered = sortBy(
    live.filter(s =>
      (sigType === "All types" || kindOf(s) === sigType) &&
      (sigSignal === "All signals" || TYPES[s.type].name === sigSignal) &&
      matches(ACCOUNT[s.accountId].name, sigSearch)),
    sigKeys[sigSort.col], sigSort.dir);
  const sig = paginate(sigFiltered, sigPage);
  const onSigSort = (col) => { setSigSort(prev => nextSort(prev, col, col === "raised" ? "desc" : "asc")); setSigPage(1); };

  return (
    <div className="font-sans text-d-fg bg-d-bg antialiased">
      <ScenarioBar scenarios={SCENARIOS} scenario={viewer} onChange={(v) => { setViewer(v); setSlideOver(null); setHotPage(1); setSigPage(1); }}>
        <div className="flex items-center gap-2 ml-3 pl-3 border-l border-white/20">
          <span className="font-medium text-xs text-white/60 mr-1">Stories</span>
          <button className={`${demoBtn} ${scope === 1 ? demoBtnOn : ""}`} onClick={() => changeScope(1)}>Batch 1</button>
          <button className={`${demoBtn} ${scope === 4 ? demoBtnOn : ""}`} onClick={() => changeScope(4)}>All batches</button>
        </div>
        {/* Stand-ins for signals raised and cleared by the backend */}
        <div className="flex items-center gap-2 ml-3 pl-3 border-l border-white/20">
          <span className="font-medium text-xs text-white/60 mr-1">Simulate</span>
          <button className={demoBtn} onClick={() => raise(true)}>{pageAccountId ? "Signal on this account" : "Signal on my account"}</button>
          {!pageAccountId && <button className={demoBtn} onClick={() => raise(false)}>On someone else's</button>}
          <button className={demoBtn} onClick={outcome} disabled={!(pageAccountId ? pageLive : live).some(s => TYPES[s.type].outcome)}>Outcome happens</button>
          <button className={demoBtn} onClick={skipAhead}>Skip 7 days</button>
        </div>
      </ScenarioBar>
      <div className="grid grid-cols-[264px_1fr] min-h-full bg-d-bg">
        <TopBar />
        <SideNav active={pageAccountId ? "Accounts" : "Dashboard"} />
        <main className="px-8 pt-6 pb-10">
          {pageAccountId ? (
            <AccountPage
              account={ACCOUNT[pageAccountId]}
              entry={pageEntry}
              now={now}
              fresh={fresh}
              clearing={clearing}
              onBack={() => navigate('/signals-feed')}
              onBrief={showBrief ? () => setSlideOver(pageAccountId) : null}
            />
          ) : (<>
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="text-d-fg-3 text-sm mb-2">Good morning, {viewer.split(" ")[0]}</div>
              <h1 className="m-0 text-3xl font-bold tracking-tight text-d-fg">Dashboard</h1>
            </div>
          </div>

          {/* Hot leads: a Filament table widget, polling every 30 seconds */}
          <div className="bg-d-card border border-d-border rounded-xl overflow-hidden mb-6">
            <WidgetHeading title="Hot leads" />
            {accountFeed.length > 0 && (
              <TableToolbar
                searchPlaceholder="Search accounts"
                searchValue={hotSearch}
                onSearchChange={(v) => { setHotSearch(v); setHotPage(1); }}
                filters={[
                  { label: "All types", options: ["All types", "Grow", "Save", "Stall"], value: hotType, onChange: (v) => { setHotType(v); setHotPage(1); } },
                  { label: "All heat", options: ["All heat", "Hot", "Warm"], value: hotHeat, onChange: (v) => { setHotHeat(v); setHotPage(1); } },
                ]}
              />
            )}
            {accountFeed.length === 0 ? (
              <div className="px-6 py-14 flex flex-col items-center gap-3 text-d-fg-3 text-center">
                <div className="text-base font-semibold text-d-fg">Nothing hot right now</div>
                <div className="text-sm max-w-md">Accounts appear here when they add users, start on the API, leave a basket or checkout, or turn off renewal.</div>
              </div>
            ) : (
              <>
                <Table>
                  <Thead>
                    <Tr>
                      <SortTh className="w-24" col="heat" sort={hotSort} onSort={onHotSort}>Heat</SortTh>
                      <Th className="w-20">Type</Th>
                      <SortTh col="account" sort={hotSort} onSort={onHotSort}>Account</SortTh>
                      <Th>Top signal</Th>
                      <Th>Detail</Th>
                      <SortTh align="right" col="raised" sort={hotSort} onSort={onHotSort}>Raised</SortTh>
                      <Th align="right" className="w-20" />
                    </Tr>
                  </Thead>
                  <Tbody>
                    {hot.rows.length === 0 && <NoMatches cols={7}>No accounts match these filters.</NoMatches>}
                    {hot.rows.map(a => {
                      const top = a.signals[0];
                      return (
                        <Tr
                          key={a.account.id}
                          className={
                            "cursor-pointer transition-opacity duration-500" +
                            // Demo cue only: shows which row a simulated signal landed on
                            (a.signals.some(s => fresh.has(s.id)) ? " animate-[va-row-new_4s_ease-out]" : "") +
                            (a.signals.every(s => clearing.has(s.id)) ? " opacity-0" : "")
                          }
                          onClick={() => openAccount(a.account.id)}
                        >
                          <Td className="py-2.5!"><HeatBadge heat={a.heat} /></Td>
                          <Td className="py-2.5!"><Tag tone={a.kind}>{a.kind}</Tag></Td>
                          <Td className="py-2.5! whitespace-nowrap font-medium" title={`${a.account.vertical} · ${fmtSpend(a.account.spend)}`}>
                            {a.account.name}
                          </Td>
                          <Td className="py-2.5! whitespace-nowrap">{TYPES[top.type].name}</Td>
                          <Td className="py-2.5! w-full max-w-0">
                            <div className="text-xs text-d-fg-3 truncate" title={detailOf(top)}>{detailOf(top)}</div>
                          </Td>
                          <Td align="right" className="py-2.5! text-xs text-d-fg-3 tabular-nums whitespace-nowrap" title={fmtFull(top.raisedAt)}>
                            {timeAgo(top.raisedAt, now)}
                          </Td>
                          <Td align="right" className="py-2.5! whitespace-nowrap">
                            {/* Filament icon-button row actions: call brief (slide-over), then view the account */}
                            {showBrief && <button
                              className="w-8 h-8 rounded-md inline-flex items-center justify-center bg-transparent border-none text-d-fg-3 cursor-pointer transition-colors hover:bg-d-card-2 hover:text-yellow"
                              title="Call brief"
                              onClick={(e) => { e.stopPropagation(); setSlideOver(a.account.id); }}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 3h6a1 1 0 0 1 1 1v1h2a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h2V4a1 1 0 0 1 1-1zM9 11h6M9 15h4" />
                              </svg>
                            </button>}
                            <button
                              className="w-8 h-8 rounded-md inline-flex items-center justify-center bg-transparent border-none text-d-fg-3 cursor-pointer transition-colors hover:bg-d-card-2 hover:text-d-fg"
                              title="View account"
                              onClick={(e) => { e.stopPropagation(); openAccount(a.account.id); }}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" />
                              </svg>
                            </button>
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
                <TablePagination {...hot} onPageChange={setHotPage} />
              </>
            )}
          </div>

          {/* Signals: a second table widget (story 16, batch 2). Live signals only. */}
          {showSignalsWidget && (
            <div className="bg-d-card border border-d-border rounded-xl overflow-hidden mb-6">
              <WidgetHeading title="Signals" description="Every live signal on your accounts, including cool accounts." />
              {live.length > 0 && (
                <TableToolbar
                  searchPlaceholder="Search accounts"
                  searchValue={sigSearch}
                  onSearchChange={(v) => { setSigSearch(v); setSigPage(1); }}
                  filters={[
                    { label: "All types", options: ["All types", "Grow", "Save", "Stall"], value: sigType, onChange: (v) => { setSigType(v); setSigPage(1); } },
                    { label: "All signals", options: ["All signals", ...signalNames], value: sigSignal, onChange: (v) => { setSigSignal(v); setSigPage(1); } },
                  ]}
                />
              )}
              {live.length === 0 ? (
                <div className="px-6 py-10 text-center text-sm text-d-fg-3">No live signals on your accounts.</div>
              ) : (
                <>
                  <Table>
                    <Thead>
                      <Tr>
                        <SortTh col="account" sort={sigSort} onSort={onSigSort}>Account</SortTh>
                        <SortTh col="signal" sort={sigSort} onSort={onSigSort}>Signal</SortTh>
                        <Th className="w-20">Type</Th>
                        <Th>Detail</Th>
                        <Th>Who</Th>
                        <SortTh align="right" col="raised" sort={sigSort} onSort={onSigSort}>Raised</SortTh>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {sig.rows.length === 0 && <NoMatches cols={6}>No signals match these filters.</NoMatches>}
                      {sig.rows.map(s => (
                        <Tr
                          key={s.id}
                          className={
                            "cursor-pointer transition-opacity duration-500" +
                            (fresh.has(s.id) ? " animate-[va-row-new_4s_ease-out]" : "") +
                            (clearing.has(s.id) ? " opacity-0" : "")
                          }
                          onClick={() => openAccount(s.accountId)}
                        >
                          <Td className="py-2.5! whitespace-nowrap font-medium">{ACCOUNT[s.accountId].name}</Td>
                          <Td className="py-2.5! whitespace-nowrap">{TYPES[s.type].name}</Td>
                          <Td className="py-2.5!"><Tag tone={kindOf(s)}>{kindOf(s)}</Tag></Td>
                          <Td className="py-2.5! w-full max-w-0">
                            <div className="text-xs text-d-fg-3 truncate" title={detailOf(s)}>{detailOf(s)}</div>
                          </Td>
                          <Td className="py-2.5! text-sm text-d-fg-2 whitespace-nowrap">{s.by || <span className="text-d-fg-4">Automatic</span>}</Td>
                          <Td align="right" className="py-2.5! text-xs text-d-fg-3 tabular-nums whitespace-nowrap" title={fmtFull(s.raisedAt)}>
                            {timeAgo(s.raisedAt, now)}
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                  <TablePagination {...sig} onPageChange={setSigPage} />
                </>
              )}
            </div>
          )}

          {/* Rest of the dashboard, below the feed */}
          <div className="grid grid-cols-3 gap-4 opacity-50">
            <StatTile label="My accounts" value={ACCOUNTS.filter(a => a.owner === viewer).length} />
            <StatTile label="Spend this month" value="£48,210" />
            <StatTile label="Open tickets" value="7" />
          </div>
          </>)}
        </main>
      </div>

      {slideEntry && (
        <CallBrief
          entry={slideEntry}
          now={now}
          onClose={() => setSlideOver(null)}
          onOpenAccount={() => openAccount(slideEntry.account.id)}
        />
      )}
      {toast && <Toast message={toast} />}
    </div>
  );
};

SignalsFeedPrototype.meta = {
  id: 'signals-feed',
  label: 'Hot Leads',
  description: 'Accounts partway through a buying decision, ranked by heat, plus every signal behind them',
  path: '/signals-feed',
  status: 'wip',
};

export default SignalsFeedPrototype;
