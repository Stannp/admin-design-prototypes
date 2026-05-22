# ProGate — Subscription gating component

Use `ProGate` from `@shared/components` whenever content needs to be locked behind a subscription plan (Free vs Pro). Never create custom lock overlays — always use one of the four ProGate variants.

All variants share the same visual language: dark indigo-to-purple gradient, radial shimmer, yellow "PRO ONLY" badge, and yellow CTA button with eye icon + arrow.

## Import

```jsx
import { ProGate } from '@shared/components';
```

## Variants

### 1. Overlay (default) — blur children + centered card
For large content areas like charts, tables, maps.

```jsx
<ProGate locked={isFree} title="Campaign performance insights" description="See your top campaigns ranked by engagement rate.">
  <ChartCard title="Top campaigns">
    {/* content that gets blurred */}
  </ChartCard>
</ProGate>
```

### 2. Compact — full-fill dark tile replacing children
For small tiles in grids (activity tiles, KPI slots). Children are hidden entirely and replaced with the dark overlay.

```jsx
<ProGate locked={isFree} compact title="Delivery rate" description="Track real-time delivery rates across all your campaigns.">
  <div>{/* unlocked content shown when not locked */}</div>
</ProGate>
```

### 3. Teaser — engagement stat with pulse animation
For KPI slots where you want to show a tantalising stat. Has two sub-modes:

**With stat (engagement teaser):**
```jsx
<ProGate locked teaser
  teaserStat="6,480" teaserUnit="people"
  teaserSubline="engaged with your mail"
  teaserPulseLabel="38 new today" teaserPulseNote="who are they?"
><div/></ProGate>
```

**Without stat (locked metric):**
```jsx
<ProGate locked teaser title="Delivery rate" description="Track real-time delivery rates."><div/></ProGate>
```

### 4. Banner — horizontal upsell strip
For inline upgrade prompts within cards or at the bottom of tables.

```jsx
<ProGate locked banner
  bannerIcon="target"
  bannerStat="8,816 people scanned a QR code across your campaigns"
  description="Unlock QR tracking to see which campaigns drive real responses."
  ctaLabel="Unlock engagement data"
><div/></ProGate>
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `locked` | boolean | Whether to show the gate. When false, renders children. |
| `title` | string | Heading text (default: "Pro only") |
| `description` | string/node | Body text |
| `ctaLabel` | string | Button label (default: "Unlock with Pro") |
| `compact` | boolean | Use compact variant |
| `banner` | boolean | Use banner variant |
| `bannerIcon` | string | Icon name for banner variant (e.g. "target", "qr", "rocket") |
| `bannerStat` | string/node | Bold headline in banner |
| `teaser` | boolean | Use teaser variant |
| `teaserStat` | string | Big number in teaser |
| `teaserUnit` | string | Unit label next to stat (e.g. "people") |
| `teaserSubline` | string | Line below the stat |
| `teaserPulseLabel` | string | Yellow pulse label (e.g. "38 new today") |
| `teaserPulseNote` | string | Grey note after pulse (e.g. "who are they?") |
| `className` | string | Extra CSS class |
| `style` | object | Inline styles on the outer wrapper |

## Rules

- Always pass `locked={isFree}` or `locked={plan === "free"}` — never hardcode `locked={true}`
- For the `overlay` variant, children must be real content (it gets blurred behind the card)
- For `compact`, `teaser`, and `banner` variants, pass `<div/>` as children (they're hidden)
- The banner variant is for contextual upsells inside cards — not for standalone sections
- Never create one-off lock/gate UI — extend ProGate if a new variant is genuinely needed
