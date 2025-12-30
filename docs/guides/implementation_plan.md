# Execution Plan: UI Standardization & "Command Center" Aesthetic Refinement

## 1. Global Style Standardization (`src/styles/globals.css`)
**Objective:** Establish a single source of truth for spacing and semantic colors to fix inconsistencies and theme gaps.

*   **Spacing Variables:**
    *   Define `--section-pt: 8rem;` (Standardize top padding for all snap sections).
    *   Define `--grid-gap: 2rem;` (Standardize gaps).
*   **Semantic Color Variables:**
    *   Extract hardcoded HEX values to semantic variables for automatic Dark/Light mode support:
        *   `--color-success` (`#10b981`)
        *   `--color-warning` (`#fbbf24`)
        *   `--color-danger` (`#ef4444`)
        *   `--color-accent-purple` (`#8b5cf6`)
        *   `--color-accent-pink` (`#ec4899`)
        *   `--color-accent-cyan` (`#60efff`)
    *   Add corresponding Light Mode palette in `[data-theme='light']`.

## 2. Layout & Spacing Correction
**Objective:** Fix "jumping" content caused by inconsistent padding and absolute positioning overlap.

*   **Apply Standard Padding:**
    *   Update all `snap-section` inline styles across `page.tsx`, `platform/page.tsx`, `services/page.tsx`, `use-cases/page.tsx`, `company/page.tsx`, `security/page.tsx` to use `paddingTop: 'var(--section-pt)'`.
*   **Fix Hero Overlap (`src/app/page.tsx`):**
    *   Refactor the "Integrated Trust Strip" from `position: absolute; bottom: 0` to `margin-top: auto` or a relative flex item to prevent it from covering content on smaller screens (13" laptops).

## 3. Grid System Enforcement (2x2 / 4-Col)
**Objective:** Eliminate 3-column "orphan" layouts to strictly follow the "Command Center" 2x2/4x4 aesthetic.

*   **Home Page (`/`) - Pricing Section:**
    *   Convert 3-column layout (Starter, Enterprise, Federal) to **4-column**.
    *   *Action:* Add a 4th tier (e.g., "Partner / Reseller") or switch to a 2x2 grid.
*   **Platform Page (`/platform`) - Integrations:**
    *   Convert 3-column layout to **4-column**.
    *   *Action:* Add a 4th category (e.g., "Security/Identity") to balance the row.
*   **Company Page (`/company`) - Leadership & News:**
    *   Convert 3-column layouts to **4-column**.
    *   *Action:* Add a 4th placeholder card for "Join the Team" or "Press Contact".

## 4. Theme & Accessibility Polish
**Objective:** Ensure visual consistency and readability.

*   **Dark/Light Mode Check:** Verify that the new semantic variables are applied to all icons, borders, and text gradients currently using hardcoded HEX values.
*   **Scrollbar Visibility:** Ensure the `custom-scrollbar` in Header dropdowns allows scrolling on all operating systems without looking "broken."
