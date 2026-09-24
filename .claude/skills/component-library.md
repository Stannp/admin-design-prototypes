# Component Library — Admin Design Prototypes

All shared components live in `src/shell/` and use Tailwind v4 utilities with the project's dark `@theme` tokens.

## Theme tokens (defined in src/index.css)

**Dark surfaces:** `d-bg`, `d-bg-2`, `d-card`, `d-card-2`, `d-card-hover`, `d-border`, `d-border-2`

**Dark foreground:** `d-fg`, `d-fg-2`, `d-fg-3`, `d-fg-4`

**Brand:** `indigo`, `indigo-deep`, `indigo-hover`, `yellow`, `green`, `red`, `orange`

**Status tints (bg + fg pairs):** `d-green-bg`/`d-green-fg`, `d-red-bg`/`d-red-fg`, `d-yellow-bg`/`d-yellow-fg`, `d-indigo-bg`/`d-indigo-fg`, `d-orange-bg`/`d-orange-fg`, `d-neutral-bg`/`d-neutral-fg`

**Font:** `font-sans` is Poppins via Google Fonts

**Animations:** `va-fade-in`, `va-modal-in`, `va-toast-in` keyframes defined in index.css

## Shell components (src/shell/)

### TopBar
Top navigation bar with logo, search, notifications, and avatar.
```jsx
import TopBar from '../../shell/TopBar';
<TopBar />
```

### SideNav
Sidebar navigation with grouped items. The active item is hardcoded to "Accounts".
```jsx
import SideNav from '../../shell/SideNav';
<SideNav />
```

### PageHead
Breadcrumbs + Actions dropdown menu. Accepts `hideHeading` and `onDelete` props.
```jsx
import PageHead from '../../shell/PageHead';
<PageHead onDelete={() => setOpenModal("delete")} />
```

### TabStrip
Tabbed navigation with icons. Accepts `tabs` (string array), `active`, `onChange`.
```jsx
import TabStrip from '../../shell/TabStrip';
<TabStrip tabs={["Campaigns", "Users", "Audit Log"]} active={activeTab} onChange={setActiveTab} />
```

### Toast
Fixed-bottom success notification with green checkmark icon.
```jsx
import Toast from '../../shell/Toast';
{toast && <Toast message={toast} />}
```

### ScenarioBar
Sticky demo bar at top. Clicking "DEMO" navigates to `/`. Accepts `scenarios`, `scenario`, `onChange`, `note`.
```jsx
import ScenarioBar from '../../shell/ScenarioBar';
<ScenarioBar note="Description of what you're looking at" />
<ScenarioBar scenarios={SCENARIOS} scenario={scenario} onChange={setScenario} />
```

### Table (Table, Thead, Tbody, Tr, Th, Td, TableToolbar, TablePagination)
Dark-themed table primitives matching the Filament layout:
- **TableToolbar** sits above the headers, right-aligned: search input + filter icon + column toggle icon
- **Table** with Thead/Tbody/Tr/Th/Td renders the data
- **TablePagination** sits below the table: "Showing X to Y of Z results" left, optional per-page selector center, prev/next buttons right
```jsx
import { Table, Thead, Tbody, Tr, Th, Td, TableToolbar, TablePagination } from '../../shell/Table';

<div className="bg-d-card border border-d-border rounded-xl overflow-hidden">
  <TableToolbar
    searchPlaceholder="Search campaigns"
    searchValue={search}
    onSearchChange={setSearch}
    filters={[{ label: "All formats", options: [...], value: filter, onChange: setFilter }]}
    columns={["ID", "Name", "Status"]}
    visibleColumns={visible}
    onToggleColumn={toggle}
  />
  <Table>
    <Thead><Tr><Th>Name</Th><Th align="right">Amount</Th></Tr></Thead>
    <Tbody><Tr><Td>Foo</Td><Td align="right">£100</Td></Tr></Tbody>
  </Table>
  <TablePagination from={1} to={10} total={63} hasPrev={false} hasNext={true} onPrev={onPrev} onNext={onNext} />
</div>
```

## Common UI patterns (inline — no separate components)

### Pills / Status badges
```jsx
<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11.5px] font-semibold leading-snug bg-d-green-bg text-d-green-fg">
  <span className="w-1.5 h-1.5 rounded-full bg-current" />{/* dot */}
  Active
</span>
```
Variants: `bg-d-green-bg text-d-green-fg`, `bg-d-red-bg text-d-red-fg`, `bg-d-yellow-bg text-d-yellow-fg`, `bg-d-indigo-bg text-d-indigo-fg`, `bg-d-orange-bg text-d-orange-fg`, `bg-d-neutral-bg text-d-neutral-fg`, `bg-d-neutral-bg text-d-fg-3` (off/muted)

### Buttons
```jsx
{/* Ghost */}
<button className="inline-flex items-center gap-2 px-3 py-[7px] rounded-md font-sans font-semibold text-xs border border-transparent cursor-pointer transition-[filter,background] bg-d-card text-d-fg-2 border-d-border-2 hover:bg-d-card-hover hover:text-d-fg">...</button>
{/* Primary (orange) */}
<button className="... bg-orange text-white hover:brightness-110">...</button>
{/* Indigo */}
<button className="... bg-indigo text-white hover:bg-indigo-hover">...</button>
{/* Danger */}
<button className="... bg-red text-white hover:brightness-110">...</button>
```

### Edit button (inline, small)
```jsx
<button className="inline-flex items-center gap-1.5 bg-transparent border border-transparent text-d-fg-3 cursor-pointer text-[11px] font-medium font-sans px-1.5 py-0.5 rounded-md transition-colors hover:bg-d-card-2 hover:text-d-fg hover:border-d-border-2">Edit</button>
```

### Cards
```jsx
<div className="bg-d-card border border-d-border rounded-[14px] px-6 py-[22px]">...</div>
```

### Tab panels
```jsx
<div className="bg-d-card border border-d-border rounded-xl overflow-hidden">
  <div className="flex items-center justify-between px-6 py-5 border-b border-d-border">
    <span className="text-lg font-semibold text-d-fg">Title</span>
  </div>
  {/* table or content */}
</div>
```

## App shell layout

```jsx
<div className="font-sans text-d-fg bg-d-bg antialiased">
  <ScenarioBar ... />
  <div className="grid grid-cols-[264px_1fr] min-h-full bg-d-bg">
    <TopBar />
    <SideNav />
    <main className="px-8 pt-6 pb-10">
      {/* page content */}
    </main>
  </div>
</div>
```

## Prototype structure

Each prototype lives in `src/prototypes/{name}/` and exports a default component with a `.meta` property:
```jsx
export default function MyPrototype() { ... }
MyPrototype.meta = {
  id: 'my-prototype',
  label: 'My Prototype',
  description: 'What this prototype explores',
  path: '/my-prototype',
  status: 'idea', // idea | wip | review | approved
};
```
Then add a route in `App.jsx` and import it into the `prototypes` array.

## Style conventions

- Use Tailwind utilities everywhere — no custom CSS classes
- Only use `style={{}}` for truly dynamic computed values (percentage widths, conditional colors from props)
- Use theme tokens: `text-d-fg-3` not `text-[#8E8E93]`, `bg-d-card` not `bg-[#18181B]`
- **Prefer Tailwind default scale values** (`text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`) over computed values (`text-[13px]`, `text-[15px]`). Only use computed `text-[Npx]` when no default is close enough (e.g. `text-[11px]` for badge text where `text-xs`/12px is too large)
- **Prefer shell components over custom markup.** For any table, use `Table`, `Thead`, `Tbody`, `Tr`, `Th`, `Td` and `TableToolbar` from `src/shell/Table.jsx`. For navigation, use `TopBar`, `SideNav`, `PageHead`, `TabStrip`, `ScenarioBar`, `Toast` from `src/shell/`. Only write custom equivalents when the shell component genuinely cannot support the requirement (e.g. sortable headers can wrap `Th` with extra props rather than replacing it)
- This is a dark admin theme — all surfaces are dark, all text is light
