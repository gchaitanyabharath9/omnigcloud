# UI Architecture & Design System

This project uses a layered, token-based design architecture built on top of Tailwind CSS. This document outlines the core principles, structure, and best practices for UI development in this repository.

## 1. Design Tokens

Design tokens are the single source of truth for our visual language (colors, spacing, typography). They are defined in CSS variables and mapped to Tailwind utilities.

### Source of Truth: `src/styles/variables.css`
We use native CSS variables for dynamic runtime theming (Light/Dark mode).

```css
:root {
  /* Semantic Colors */
  --primary-main: #3b82f6;          /* Main brand color */
  --primary-contrast: #ffffff;      /* Text on primary */
  
  --text-primary: #ffffff;          /* Main body text */
  --text-secondary: #94a3b8;        /* Muted text */
  
  --surface-1: rgba(30, 41, 59, 0.4); /* Card background */
  --surface-2: rgba(30, 41, 59, 0.5); /* Elevated surface */
}

[data-theme='light'] {
  /* Theme overrides */
  --primary-main: #0284c7;
  --text-primary: #0f172a;
}
```

### Configuration: `tailwind.config.ts`
Tailwind is configured to use these variables, allowing you to use utility classes that automatically adapt to the theme.

```typescript
// Usage in code
// bg-primary-main
// text-text-primary
// bg-surface-1

colors: {
  primary: {
    DEFAULT: "var(--primary)",
    main: "var(--primary-main)", // Use this
    foreground: "var(--primary-contrast)",
  },
  text: {
    primary: "var(--text-primary)",
    secondary: "var(--text-secondary)",
  },
  surface: {
    1: "var(--surface-1)",
    2: "var(--surface-2)",
  }
}
```

## 2. CSS Architecture (Layers)

We strictly use Tailwind Layers to control specificity and avoid the "Cascading" mess. All global styles are centrally managed in `src/styles/globals.css`.

**Structure:**
*   `@layer base`: Resets, typography, and CSS variables.
    *   `variables.css`: Token definitions.
    *   `typography.css`: Global font styles.
    *   `base-overrides.css`: HTML element defaults (html, body, cleanups).
*   `@layer components`: Complex component classes (avoid if possible).
    *   `components.css`: Legacy custom components (e.g., .btn-primary).
    *   `layout.css`: Global layout helpers.
    *   `component-overrides.css`: Specific overrides.
*   `@layer utilities`: Single-purpose helper classes.
    *   `utils.css`: Custom utility classes (e.g., specific gradients).
    *   `animations-utilities.css`: Keyframes and animation classes.

## 3. Core Primitives

Use these React components instead of generic HTML elements to ensure consistency.

### `cn()` (Class Name Merger)
*   **Path:** `src/lib/cn.ts`
*   **Purpose:** Combines `clsx` (conditional logic) and `tailwind-merge` (deduplication).
*   **Usage:** ALWAYS use this when accepting a `className` prop.

```tsx
import { cn } from "@/lib/cn";

export function MyComponent({ className }: { className?: string }) {
  return <div className={cn("bg-red-500 p-4", className)} />;
}
```

### `Container`
*   **Path:** `src/components/ui/Container.tsx`
*   **Purpose:** Standard max-width wrapper with responsive padding. Replaces explicit `max-w-7xl mx-auto px-4`.
*   **Usage:** Wrap page content sections in this.

```tsx
<Container>
  <h1>Page Title</h1>
</Container>
```

### `Button`
*   **Path:** `src/components/ui/Button.tsx`
*   **Purpose:** Standardized interactive element with variants.
*   **Variants:** `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`, `premium`.
*   **Sizes:** `default`, `sm`, `lg`, `icon`.

### `Card`
*   **Path:** `src/components/ui/Card.tsx`
*   **Purpose:** Standard semantic panel with proper border and background tokens.
*   **Components:** `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`.

## 4. Development Rules

1.  **Mobile-First Implementation**:
    *   Write styles for mobile screens (default).
    *   Use `sm:`, `md:`, `lg:` prefixes ONLY for larger screens.
    *   *Bad:* `flex-row max-md:flex-col`
    *   *Good:* `flex-col md:flex-row`

2.  **Avoid `@apply`**:
    *   Do not create new CSS classes composed of tailwind utilities using `@apply`.
    *   Use React components to encapsulate reusable logic.
    *   Use `@apply` ONLY for targeting 3rd party libraries or deep overrides where React composition isn't an option.

3.  **Strict Semantic Colors**:
    *   Avoid hardcoded hex values (e.g., `bg-[#123456]`).
    *   Avoid generic palette colors (e.g., `text-blue-500`) unless standardizing on a brand color.
    *   Prefer Semantic Tokens: `bg-primary-main`, `text-text-secondary`, `border-card-border`.

4.  **No "Class Soup" Refactoring**:
    *   When a component's class string gets too long or logic-heavy, extract it into a Variant (using `cva` if installed, or simple logic) or a sub-component.
    *   Use `cn()` for clean conditional rendering.
