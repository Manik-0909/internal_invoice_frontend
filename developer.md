# Invoice Frontend – Developer Guide

Welcome! 👋
This repository contains the frontend for the **Invoice Automation SaaS**.
Our goal is to build a **calm, reliable, accountant-friendly UI** with **high confidence, minimal regressions**, and **fast review cycles**.

Please read this once fully before starting.

---

## 🎯 Core Principles

1. **Storybook is the source of truth for UI**
2. **Mock APIs first, backend later**
3. **Small PRs (< 500 lines)**
4. **90%+ test coverage**
5. **Predictable, boring, readable code**
6. **No direct pushes to `main`**

If something feels ambiguous, default to **clarity over cleverness**.

---

## 🧱 Tech Stack

- React + Vite + TypeScript
- Tailwind CSS + Tailwind UI
- Headless UI
- Storybook (required in v1)
- OpenAPI-generated API types
- Cookie-based authentication (handled by backend)
- Azure Static Web Apps (PR preview deployments)

---

## 📁 Project Structure

```text
src/
  assets/
  components/
    ui/               # Reusable UI components (storybook mandatory)
    layout/           # Header, shell, page layout
  pages/              # Screen-level components only
  hooks/
  lib/
    api/              # API clients (mock + real)
    config.ts
  styles/
  tests/
  types/
```

### Important rules

- ❌ No reusable UI inside `pages`
- ❌ No inline styling
- ❌ No hardcoded colors, spacing, or fonts
- ✅ Tailwind tokens only
- ✅ Screens compose components, never define them

---

## 📘 Storybook

### Storybook is mandatory

> **If a UI component exists, it must exist in Storybook.**

Every reusable UI component must:

- Live under `components/ui`
- Have a corresponding `*.stories.tsx`
- Define **all meaningful states**

### Example folder

```text
components/ui/Button/
  Button.tsx
  Button.stories.tsx
  Button.types.ts
  index.ts
```

### Required story coverage

Each component must include stories for:

- Default
- Disabled
- Loading (if applicable)
- Error / warning states
- Any confidence / status variations

If a state exists in a screen but not in Storybook → **PR will be rejected**.

---

## 🧪 Testing Requirements

### What to test

- UI components (unit tests)
- Hooks
- State logic
- Edge cases (empty, error, loading)

### What not to test

- Styling details
- Tailwind internals
- Browser behavior

### Rules

- Global coverage ≥ **90%**
- PRs lowering coverage will fail CI
- New components require tests
- Tests must be readable (no magic mocks)

---

## 🔌 API Strategy

### Why mock-first?

- Backend is evolving
- UI must not block on API changes
- PR previews must always work

### How it works

- All API calls go through `lib/api`
- Each endpoint has:
  - Mock implementation
  - Real implementation (later)

Example:

```text
lib/api/
  invoice.mock.ts
  invoice.real.ts
  index.ts
```

Switching between mock/real is controlled via environment variable.

---

## 📜 OpenAPI Integration

- Backend exposes OpenAPI spec
- Types are generated into `src/types`
- No handwritten API types
- Breaking API changes should fail compilation

This ensures frontend and backend stay aligned.

---

## 🔐 Authentication

- Cookie-based session auth
- Frontend never handles tokens
- No JWT storage
- No auth logic in UI components

If auth is needed, assume:

- User is logged in
- Backend handles session state

---

## 🔀 Pull Request Rules

### PR size

- **Maximum 500 lines changed**
- If larger → split into multiple PRs

Why:

- Faster reviews
- Fewer bugs
- Easier rollbacks

---

### PR must include at least one:

- ⬜ Storybook update
- ⬜ Tests added/updated
- ⬜ Pure wiring/refactor (no UI)

PRs introducing UI without Storybook **will not be merged**.

---

### PR preview

Every PR automatically deploys to a **preview URL**.
Review happens visually — screenshots are welcome.

---

## 🚦 CI Enforcement

The following must pass before merge:

- TypeScript build
- Unit tests
- Coverage threshold
- Storybook build
- Linting

If CI fails, PR cannot merge.

---

## 🎨 Design Alignment

- Match Figma spacing & tokens exactly
- No “close enough” implementations
- Calm, data-forward UI
- No decorative UI
- No heavy borders or shadows

If unsure → ask before implementing.

---

## 🧠 Coding Style Guidelines

- Prefer simple functions over abstractions
- Avoid deep prop drilling (use hooks)
- Avoid clever one-liners
- Use meaningful variable names
- Comment _why_, not _what_

---

## 🚫 Anti-Patterns

- Creating UI directly inside pages
- Hardcoding API responses
- Adding UI states only in screens
- Ignoring error / empty states
- Mixing business logic into UI components
- Large PRs “because it was faster”

---

## 🤝 Communication

- Ask questions early
- Raise uncertainty before coding
- Suggest improvements via PR comments
- Small, frequent PRs are encouraged

We value **correctness, calmness, and clarity** over speed.

---

## ✅ What Success Looks Like

- Storybook tells the full UI story
- Screens feel predictable and boring (good!)
- PRs are easy to review
- No surprise regressions
- Backend can evolve independently

Great call — multilingual support is the **right architectural decision early**, especially for a Swiss / EU-facing product.

Below is an **add-on section** you can **append directly to the README**.
It fits cleanly with the existing rules and keeps things strict but friendly.

---

## 🌍 Multilingual UI

This product **must support multiple languages**.
Internationalization (i18n) is **not optional** and must be built **from day one**.

Initial target languages:

- English (default)
- German
- French
  (Italian and others may follow)

---

## 📐 Core i18n Rules (Strict)

### 1. No hardcoded user-facing text

❌ This is not allowed:

```tsx
<button>Upload invoice</button>
```

✅ This is required:

```tsx
<button>{t('upload.invoice')}</button>
```

**Any PR with hardcoded UI text will be rejected.**

---

### 2. Use a standard i18n library

Recommended:

- `react-i18next`

Reasons:

- Widely adopted
- Type-safe support
- Works well with Storybook
- Supports async loading & fallbacks

---

## 🗂 Translation File Structure

```text
src/i18n/
  en/
    common.json
    auth.json
    upload.json
    review.json
  de/
    common.json
    auth.json
    upload.json
    review.json
  fr/
    common.json
    auth.json
    upload.json
    review.json
```

### Rules

- Keys must be **semantic**, not UI-based
- No duplicated strings across files
- Keep files small and screen-focused

❌ Bad key:

```json
"uploadButtonText": "Upload"
```

✅ Good key:

```json
"upload_invoice": "Upload invoice"
```

---

## 🧩 Storybook + i18n

Storybook **must demonstrate multilingual behavior**.

### Requirements

- Every Storybook story must:
  - Render in English by default
  - Include at least one non-English variant (DE or FR)

- Use Storybook toolbar language switcher

This ensures:

- Layout does not break with longer strings
- No language is treated as “secondary”
- Reviewers can validate translations visually

---

## 🧪 Testing Requirements for i18n

Tests must cover:

- Correct key usage
- No missing translations
- Fallback behavior
- Language switching does not break rendering

If a new key is added:

- It must exist in **all supported languages**
- Missing keys should fail tests

---

## 🎨 UI & Layout Guidelines for Multilingual Support

- Design for **string expansion**
  - German text can be ~30–40% longer

- No fixed-width buttons for text
- Avoid truncation unless explicitly designed
- Never rely on text length for layout

If layout breaks in German or French → **bug**.

---

## 🔁 Language Switching Behavior

- Language selection is:
  - Global
  - Sticky (persisted per user)

- Switching language must:
  - Not reload the page
  - Not reset screen state

Implementation detail can evolve, but UI must assume this behavior.

---

## 🚫 Multilingual Anti-Patterns

Do NOT:

- Concatenate strings
- Build sentences dynamically
- Translate inside components ad-hoc
- Use English-only placeholders
- Skip translation for “temporary” text

Temporary UI becomes permanent very fast.

---

## ✅ What Success Looks Like (i18n)

- Zero hardcoded user-facing strings
- Storybook shows language variants
- UI looks calm in all languages
- No late “translation refactor”
- Backend-independent UI localization

---

Thanks for building this with care 🙌
This product is trust-critical — the UI should reflect that.

If anything here is unclear, **ask before coding**.
