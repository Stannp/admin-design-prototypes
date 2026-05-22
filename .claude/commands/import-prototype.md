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
- What scenarios/variants it has

### 3. Create the prototype directory

Create `src/prototypes/{name}/` with:
- `index.jsx` — main component with `.meta`, shell layout, ScenarioBar, state
- Additional files as needed (top.jsx, tabs.jsx, modals.jsx, data.js)

### 4. Convert to ES modules

Apply these conversions to ALL source code:
- `window.X = X` → `export` / `export default`
- `const { X } = window.Y` → `import { X } from './data'`
- `React.useState` → needs `import React from 'react'` at top
- Remove all `Object.assign(window, {...})` lines

### 5. Replace with shared components

**CRITICAL: Use our shared shell components instead of recreating them.**

Check `.claude/skills/component-library.md` for full documentation.

Key replacements:
- Raw `<table>` elements → `<Table>`, `<Thead>`, `<Tbody>`, `<Tr>`, `<Th>`, `<Td>` from `../../shell/Table`
- Table filter bars / toolbars → `<TableToolbar>` from `../../shell/Table`
- Page headers → `<PageHead>` from `../../shell/PageHead`
- Tab navigation → `<TabStrip>` from `../../shell/TabStrip`
- Toast notifications → `<Toast>` from `../../shell/Toast`
- Status pills → inline Tailwind (see component-library.md for the pattern)

### 6. Convert all styling to Tailwind

- Replace ALL inline `style={{}}` with Tailwind utility classes
- Replace ALL custom CSS classes with Tailwind utilities
- Use dark theme tokens: `text-d-fg-3`, `bg-d-card`, `border-d-border`, `text-indigo`, `bg-yellow` etc.
- Only keep `style` for truly dynamic computed values (percentage widths, conditional colors from props)
- Do NOT create any custom CSS — everything should be Tailwind utilities
- See `component-library.md` for the full theme token list

### 7. Wire up the prototype

1. Add to `src/App.jsx`:
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
- No custom CSS classes
- No `<style>` tags
- Shared components used everywhere possible

## Shell setup

The prototype should use the app shell layout:
```jsx
import ScenarioBar from '../../shell/ScenarioBar';
import TopBar from '../../shell/TopBar';
import SideNav from '../../shell/SideNav';
import PageHead from '../../shell/PageHead';

<div className="font-sans text-d-fg bg-d-bg antialiased">
  <ScenarioBar note="Description of prototype" />
  <div className="grid grid-cols-[264px_1fr] min-h-full bg-d-bg">
    <TopBar />
    <SideNav />
    <main className="px-8 pt-6 pb-10">
      <PageHead />
      {/* page content */}
    </main>
  </div>
</div>
```
