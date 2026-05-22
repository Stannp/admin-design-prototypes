# Component Library — Design Prototypes

All shared components live in `@shared/components` and use Tailwind v4 utilities with the project's `@theme` tokens.

## Theme tokens (defined in src/index.css)

**Colors:** `indigo`, `indigo-deep`, `indigo-tint`, `indigo-hover`, `yellow`, `yellow-tint`, `blue`, `blue-light`, `green`, `red`, `orange`, `fg-1`, `fg-2`, `fg-3`, `fg-disabled`, `surface`, `surface-2`, `surface-3`, `border`, `border-2`

**Font:** `font-sans` is Poppins (default, never needs specifying)

## Shared components

### Icon
```jsx
<Icon name="chart" size={18} color="currentColor" stroke={1.75} />
```
SVG icon with 60+ named paths. See `src/shared/components/Icon.jsx` for the full list.

### KPI
```jsx
<KPI label="Total sent" value="158,240" delta={12.4} spark={[2,3,5,7,6]} />
<KPI label="Avg cost" value="0.36" prefix="£" unit="/piece" deltaMode="inverse" delta={-2.1} />
```

### ChartCard
```jsx
<ChartCard title="Volume" subtitle="Last 12 months" actions={<button>...</button>}>
  <LineChart ... />
</ChartCard>
```

### Charts (LineChart, BarChart, ComboChart, DoughnutChart)
All use Chart.js under the hood. Wrap in `<ChartCard>`.
```jsx
<LineChart labels={[...]} series={[{ label, data, color, fill }]} height={260} fmt={v => `£${v}`} />
<BarChart labels={[...]} series={[...]} stacked horizontal height={260} />
<ComboChart labels={[...]} bars={{ label, data, color }} line={{ label, data, color }} />
<DoughnutChart data={[{ label, value, color }]} centerLabel="Items" centerValue="128K" />
```

### Table (Table, Thead, Tbody, Tr, Th, Td)
```jsx
<Table>
  <Thead><Tr><Th>Name</Th><Th numeric>Amount</Th></Tr></Thead>
  <Tbody><Tr><Td>Foo</Td><Td numeric>£100</Td></Tr></Tbody>
</Table>
```
Props: `Th` has `numeric`, `sortable`, `sorted`. `Td` has `numeric`, `muted`.

### TableToolbar
Filament-style table toolbar. Compound component pattern.
```jsx
<TableToolbar>
  <TableToolbar.Filters>
    <TableToolbar.FilterDropdown label="All statuses" active={false} />
    <TableToolbar.FilterDropdown label="All Formats" />
    <TableToolbar.FilterDate label="All Time" />
    <TableToolbar.FilterDate active value="2026-05-07 – 2026-06-07" />
    <TableToolbar.FilterToggle label="Archived" value="Off" />
  </TableToolbar.Filters>
  <TableToolbar.Actions>
    <TableToolbar.Search placeholder="Search" />
    <TableToolbar.Export />
    <TableToolbar.ColumnToggle />
  </TableToolbar.Actions>
</TableToolbar>
<TableToolbar.Info count="1 - 20 of 63 items" selected={0} perPage={20} />
{/* ... table content ... */}
<TableToolbar.Pagination current={1} total={4} />
```

### ProGate (see pro-gate.md skill for full docs)
Four variants: `overlay` (default), `compact`, `teaser`, `banner`.

### Other: PageHead, DateRangePicker, ExportMenu, FilterBar, SubNav, Status, Funnel

## Shell components (`@shell/`)

- `Shell` — sidebar + topbar layout. Pass `flush` for no page padding.
- `Sidebar` — indigo gradient sidebar. Pass `subnav` for expandable sub-items.
- `Topbar` — breadcrumbs + action buttons.
- `ScenarioBar` — demo scenario switcher. Clicking "DEMO" navigates home.
- `TweaksPanel` / `useTweaks` — floating tweaks panel (optional).

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
Then add a route in `App.jsx` and import it.

## Style conventions

- Use Tailwind utilities everywhere — no custom CSS classes
- Only use `style={{}}` for truly dynamic computed values (percentage widths, conditional colors from props, dynamic grid columns)
- Use theme tokens: `text-fg-3` not `text-[#777]`, `bg-surface-2` not `bg-[#FAFAFB]`, `border-border` not `border-[#ECECEC]`
- Font sizes: `text-xs` (12px), `text-sm` (14px), `text-base` (15-16px), `text-lg` (18px), `text-xl` (20px), `text-2xl` (24px), `text-3xl` (30px)
