# Design System: Admin UI Color Palette

## Palette

| Color name | Hex value | Intended usage |
| --- | --- | --- |
| App background | `#F0F2F5` | Main app background |
| Surface | `#FFFFFF` | Navbar, sidebar, cards, panels |
| Primary accent | `#4CAF50` | Primary actions, links, active states |
| Strong text | `#344767` | Headings, body text, icons |

## Tailwind color mapping

| Tailwind class | Hex value |
| --- | --- |
| `bg-app` | `#F0F2F5` |
| `bg-surface` | `#FFFFFF` |
| `text-primary` | `#4CAF50` |
| `text-strong` | `#344767` |
| `border-default` | `#FFFFFF` |
| `bg-primary` | `#4CAF50` |

Note: In Tailwind v4, these tokens are also declared in `src/styles.css` via `@theme` to ensure the utilities are generated.

## Public/Auth UI guidance

The public landing and auth layouts intentionally use a darker, glassy feel with utility colors rather than custom tokens.

- Background: `bg-slate-950` or `bg-app` for lighter auth screens
- Surfaces: `bg-white/5` + `border-white/10` for translucent cards
- Text: `text-white`, `text-white/70`, `text-white/60` for hierarchy
- Accents: `text-primary` or `bg-primary` for actions

Keep contrast strong and avoid introducing new hardcoded hex values.

## Icon system

Use Font Awesome icons via the CDN in `src/index.html`, with `<i>` tags and `fa-*` classes.

## Usage examples

Navbar
```html
<nav class="bg-surface border-b border-default text-strong">
  <button class="text-strong hover:text-primary">...</button>
</nav>
```

Sidebar
```html
<aside class="bg-surface border-r border-default text-strong">
  <a class="text-strong/70 hover:text-primary">Dashboard</a>
</aside>
```

Buttons
```html
<button class="bg-primary text-white hover:bg-primary/90">Primary</button>
```

Text hierarchy
```html
<h1 class="text-strong">Heading</h1>
<p class="text-strong/70">Supporting text</p>
<a class="text-primary">Link</a>
```

## Do / Don't

Do:
- Use semantic classes like `bg-app`, `bg-surface`, `text-strong`, `text-primary`, `border-default`
- Use opacity modifiers (e.g., `text-strong/70`) for subtle emphasis

Don't:
- Introduce arbitrary grays or blues outside the palette
- Hardcode hex values in templates
