# Import a Claude Design prototype

Import a prototype from a Claude Design artifact URL and convert it into this repository's Vite + React + Tailwind structure, using shared components.

## Input

The user provides a Claude Design URL like:
`https://api.anthropic.com/v1/design/h/{id}?open_file={filename}.html`

## Steps

### 1. Fetch and extract the artifact

```bash
# Download the artifact (it's a gzipped tar)
curl -sL "{url}" -o /tmp/artifact.gz
gunzip -f /tmp/artifact.gz
tar xf /tmp/artifact -C /tmp/proto-extract
```

List the extracted files to understand the structure. The project files are usually under `*/project/`.

### 2. Read and understand the source

Read these files from the extracted archive:
- The main `.html` file — find the `<script type="text/babel">` blocks for the App component, state, data
- All `.jsx` files — components, usually loaded via `<script type="text/babel" src="...">`
- The `.css` file(s) — understand what styling is used

Identify:
- What the prototype does (page name, key features)
- What components it uses (tables, charts, modals, cards, etc.)
- What data it needs (mock data, state)
- What scenarios/variants it has (free/pro, different user types)

### 3. Create the prototype directory

Create `src/prototypes/{name}/` with:
- `index.jsx` — main component with `.meta`, Shell, ScenarioBar, state
- `data.js` — mock data extracted from the HTML/JSX (ES module exports, not window globals)
- Additional files as needed (pages, panels, modals)

### 4. Convert to ES modules

Apply these conversions to ALL source code:
- `window.X = X` → `export` / `export default`
- `const { X } = window.Y` → `import { X } from './data'`
- `React.useState` → needs `import React from 'react'` at top
- Remove all `Object.assign(window, {...})` lines

### 5. Replace with shared components

**CRITICAL: Use our shared components instead of recreating them.**

Check the skill files in `.claude/skills/` for full documentation, especially:
- `component-library.md` — full list of available components and their APIs
- `pro-gate.md` — ProGate subscription gating component

Key replacements:
- Custom lock overlays / "Pro only" gates → `<ProGate>` (see pro-gate.md for the 4 variants)
- Raw `<table>` elements → `<Table>`, `<Thead>`, `<Tbody>`, `<Tr>`, `<Th>`, `<Td>`
- Table filter bars / toolbars → `<TableToolbar>` compound component
- Custom icon SVGs → `<Icon name="...">` (check Icon.jsx for available names, add new paths if needed)
- KPI cards → `<KPI>`
- Chart wrappers → `<ChartCard>` + `<LineChart>` / `<BarChart>` / `<ComboChart>` / `<DoughnutChart>`
- Page headers → `<PageHead>`
- Status pills → `<Status kind="green|red|indigo|yellow|muted">`
- Delivery funnels → `<Funnel>`
- Filter bars → `<FilterBar>` or `<TableToolbar.Filters>`
- Date range pickers → `<TableToolbar.FilterDate>` (inside table toolbars) or `<DateRangePicker>` (standalone)

### 6. Convert all styling to Tailwind

- Replace ALL inline `style={{}}` with Tailwind utility classes
- Replace ALL custom CSS classes with Tailwind utilities
- Use theme tokens: `text-fg-3`, `bg-surface-2`, `border-border`, `text-indigo`, `bg-yellow` etc.
- Only keep `style` for truly dynamic computed values (percentage widths, conditional colors from props)
- Do NOT create any custom CSS — everything should be Tailwind utilities
- See `component-library.md` for the full theme token list

### 7. Wire up the prototype

1. Add a route in `src/App.jsx`:
```jsx
import MyPrototype from './prototypes/my-prototype';
// Add to prototypes array
const prototypes = [..., MyPrototype];
// Add route
<Route path="/my-prototype/*" element={<MyPrototype />} />
```

2. Set appropriate status in `.meta`:
```jsx
MyPrototype.meta = {
  id: 'my-prototype',
  label: 'My Prototype',
  description: 'What this explores',
  path: '/my-prototype',
  status: 'idea', // idea | wip | review | approved
};
```

### 8. Verify

Run `npx vite build` — must pass with 0 errors.

Check there are:
- No `window.` references
- No `Object.assign(window, ...)` lines
- No custom CSS classes (grep for `className="` and check none reference classes not in Tailwind or shared components)
- No `<style>` tags
- Shared components used everywhere possible (no reinventing ProGate, Table, Icon, etc.)

## Shell setup

The prototype should use the shared Shell:
```jsx
import Shell from '@shell/Shell';
import ScenarioBar from '@shell/ScenarioBar';

// If it has scenarios:
<ScenarioBar scenarios={SCENARIOS} scenario={scenario} onChange={setScenario} />
<Shell breadcrumbs={breadcrumbs}>
  {/* content */}
</Shell>

// If no scenarios, just the shell:
<Shell breadcrumbs={[{ label: "Page Name" }]}>
  {/* content */}
</Shell>
```

Use `<Shell flush>` if the prototype manages its own padding (like the subscription dashboard).
