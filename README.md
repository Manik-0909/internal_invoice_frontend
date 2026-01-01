# Invoice Automation Frontend — Baseline Repository

> **Production-grade SaaS frontend baseline** with strict guardrails, Storybook-driven development, multilingual support, and Azure Static Web Apps deployment.

This is a **baseline repository** designed for teams building accountant-friendly, data-forward SaaS applications. It enforces quality through architecture, not just documentation.

---

## 🎯 Core Principles (Non-Negotiable)

1. **Storybook is the source of truth for UI**
2. **All UI text must be multilingual (EN/DE/FR)**
3. **Small PRs (< 500 lines of code)**
4. **90%+ test coverage required**
5. **Mock APIs first, backend integration later**
6. **No direct pushes to `main` branch**

---

## 🛠 Tech Stack

- **Framework**: React 18 + Vite
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + Tailwind UI patterns
- **Components**: Headless UI
- **UI Development**: Storybook v8
- **Testing**: Vitest + Testing Library
- **Linting**: ESLint + Prettier
- **i18n**: react-i18next
- **Deployment**: Azure Static Web Apps

---

## 📁 Project Structure

```
src/
  assets/           # Static assets (images, fonts, etc.)
  components/
    ui/             # Reusable UI components (Storybook required)
    layout/         # App shell, headers, navigation
  pages/            # Screen-level components (compose UI components)
  hooks/            # Custom React hooks
  lib/
    api/            # API clients (mock + real)
      mock/         # Mock implementations
      real/         # Real API implementations
    config.ts       # App configuration
  i18n/
    en/             # English translations
    de/             # German translations
    fr/             # French translations
    config.ts       # i18n setup
  styles/           # Global styles
  tests/            # Test utilities and setup
  types/            # TypeScript type definitions
```

### 📐 Folder Rules

- ❌ **No reusable UI inside `pages/`**
- ❌ **No inline styling anywhere**
- ❌ **No hardcoded user-facing text**
- ✅ **All UI components in `components/ui/` must have Storybook stories**
- ✅ **Pages only compose components, never define them**
- ✅ **Use Tailwind tokens only (no magic numbers)**

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20.0.0
- npm >= 10.0.0

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd invoice_frontend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev              # Start Vite dev server (port 3000)
npm run build            # Build for production
npm run preview          # Preview production build
npm test                 # Run tests in watch mode
npm run test:coverage    # Run tests with coverage report
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors automatically
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting
npm run type-check       # Run TypeScript compiler checks
npm run storybook        # Start Storybook (port 6006)
npm run build-storybook  # Build Storybook for deployment
```

---

## 📘 Storybook (MANDATORY)

### Every UI component must have a story

> **If a UI component exists, it must exist in Storybook.**

Every reusable component in `components/ui/` must:

- Have a corresponding `*.stories.tsx` file
- Define **all meaningful states** (default, disabled, loading, error, etc.)
- Be documented with component descriptions

### Example Component Structure

```
components/ui/Button/
  Button.tsx           # Component implementation
  Button.stories.tsx   # Storybook stories (REQUIRED)
  Button.test.tsx      # Unit tests
  Button.types.ts      # TypeScript types
  index.ts             # Exports
```

### Required Story Coverage

Each component must include stories for:

- Default state
- Disabled state
- Loading state (if applicable)
- Error/warning states (if applicable)
- All size variants
- All color/style variants

**PRs introducing UI without Storybook stories will be rejected.**

---

## 🌍 Multilingual Support (Required)

### Zero Hardcoded Text Rule

All user-facing text **must** use i18n keys.

❌ **WRONG**:

```tsx
<button>Upload invoice</button>
```

✅ **CORRECT**:

```tsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();
  return <button>{t('upload.invoice')}</button>;
};
```

### Supported Languages

- English (default)
- German (Deutsch)
- French (Français)

### Translation File Structure

```
src/i18n/
  en/common.json    # English translations
  de/common.json    # German translations
  fr/common.json    # French translations
  config.ts         # i18n configuration
```

### Adding New Translation Keys

1. Add key to `en/common.json`
2. Add **same key** to `de/common.json`
3. Add **same key** to `fr/common.json`
4. Test in Storybook with language switcher

**Missing translation keys in any language will fail tests.**

---

## 🧪 Testing Requirements (90%+ Coverage)

### Coverage is Enforced

- **Minimum coverage: 90%** (lines, functions, branches, statements)
- PRs that lower coverage will **fail CI**
- Coverage report generated in `coverage/` directory

### What to Test

- ✅ UI component behavior
- ✅ User interactions
- ✅ Custom hooks
- ✅ State management logic
- ✅ Edge cases (empty, error, loading states)

### What NOT to Test

- ❌ Tailwind CSS internals
- ❌ Third-party library behavior
- ❌ Browser APIs

### Example Test

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

---

## 🔌 API Strategy (Mock-First)

### Why Mock-First?

- Backend and frontend can develop independently
- PR previews work without backend
- Tests run without network dependencies
- Faster development iteration

### How It Works

All API calls go through `lib/api/`:

```typescript
// lib/api/index.ts
import { API_CONFIG } from '@/lib/config';

// Import mock or real based on environment
const apiClient =
  API_CONFIG.mode === 'mock'
    ? await import('./mock/yourEndpoint')
    : await import('./real/yourEndpoint');

export default apiClient;
```

### Switching Between Mock and Real

Set environment variable in `.env`:

```bash
# Use mock APIs (default)
VITE_API_MODE=mock

# Use real APIs
VITE_API_MODE=real
VITE_API_BASE_URL=https://api.yourapp.com
```

---

## 📜 OpenAPI Integration (Future)

When backend is ready:

1. Backend exposes OpenAPI spec
2. Generate TypeScript types: `npm run generate:api-types`
3. Types go into `src/types/`
4. Implement real API in `lib/api/real/`

This ensures frontend and backend stay aligned.

---

## 🔀 Pull Request Rules (Strictly Enforced)

### PR Size Limit

- **Maximum 500 lines changed**
- If larger → split into multiple PRs

**Why?**

- Faster reviews
- Fewer bugs
- Easier rollbacks
- Better code quality

### PR Must Pass CI

Before merge, these must pass:

- ✅ TypeScript compilation
- ✅ ESLint (zero warnings)
- ✅ Prettier formatting
- ✅ Unit tests
- ✅ 90%+ coverage
- ✅ Storybook builds successfully

### PR Must Include

At least one of:

- Storybook story update/addition
- Tests added/updated
- Pure refactor (no UI changes)

**PRs with UI changes but no Storybook updates will be rejected.**

---

## 🎨 Design Guidelines

### Visual Style

- Calm, data-forward UI (inspired by Deepgram light theme)
- Professional typography hierarchy
- Minimal decoration
- No heavy borders or shadows
- Light neutral backgrounds

### Layout Rules

- Design for **German text expansion** (30-40% longer than English)
- No fixed-width buttons with text
- Avoid truncation unless intentional
- Never rely on text length for layout

---

## 🚦 CI/CD Pipeline

### GitHub Actions Workflow

On every PR:

1. Install dependencies
2. Run linter
3. Run type checker
4. Run tests with coverage
5. Build Storybook
6. Build application
7. Deploy preview to Azure Static Web Apps

On merge to `main`:

1. All above steps
2. Deploy to production Azure Static Web Apps

### Setting Up Azure Deployment

1. Create Azure Static Web App resource
2. Add `AZURE_STATIC_WEB_APPS_API_TOKEN` to GitHub Secrets
3. Push to `main` or open a PR
4. Preview URL appears in PR comments

---

## 🚫 Anti-Patterns (Do NOT Do These)

- ❌ Creating UI directly inside pages
- ❌ Hardcoding API responses
- ❌ Adding UI states only in screens (not Storybook)
- ❌ Ignoring error/empty states
- ❌ Mixing business logic into UI components
- ❌ Large PRs "because it was faster"
- ❌ Using `any` in TypeScript
- ❌ Skipping tests for "trivial" components
- ❌ Concatenating translated strings

---

## 🧠 Code Style Guidelines

### TypeScript

- Use strict mode (enforced)
- No `any` (use `unknown` if needed)
- Explicit return types for functions
- Use type inference for variables

### React

- Functional components only
- Custom hooks for reusable logic
- Props destructuring in function signature
- Meaningful component and prop names

### Naming Conventions

- Components: `PascalCase`
- Files: `PascalCase.tsx` for components
- Hooks: `useCamelCase`
- Constants: `UPPER_SNAKE_CASE`
- Functions: `camelCase`

---

## 🤝 Development Workflow

### Starting New Work

1. Pull latest `main`
2. Create feature branch: `git checkout -b feature/your-feature`
3. Make changes in **small increments**
4. Run tests: `npm test`
5. Check coverage: `npm run test:coverage`
6. View in Storybook: `npm run storybook`

### Before Committing

```bash
npm run lint:fix      # Fix linting issues
npm run format        # Format code
npm run type-check    # Check types
npm test              # Run tests
```

### Opening a PR

1. Keep changes < 500 lines
2. Include tests for new code
3. Add/update Storybook stories for UI
4. Write clear PR description
5. Link related issues

---

## 📦 Example Components Included

This baseline includes three example UI components to demonstrate the pattern:

### Button Component

- Multiple variants (primary, secondary, danger)
- Size options (sm, md, lg)
- Loading state with spinner
- Disabled state
- Full test coverage
- Complete Storybook stories

### Input Component

- Label support
- Error states
- Helper text
- Required field indicator
- Validation support
- Full test coverage
- Complete Storybook stories

### StatusBadge Component

- Status variants (success, warning, error, info, neutral)
- Size options (sm, md)
- Full test coverage
- Complete Storybook stories

**These are examples. Remove or modify them for your app.**

---

## 🎓 Learning Resources

### Storybook

- [Storybook Documentation](https://storybook.js.org/)
- [Component Story Format](https://storybook.js.org/docs/react/api/csf)

### Testing

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)

### i18n

- [react-i18next Documentation](https://react.i18next.com/)

### Tailwind CSS

- [Tailwind Documentation](https://tailwindcss.com/)
- [Tailwind UI Components](https://tailwindui.com/)

---

## ✅ Definition of Done

A task is complete when:

- ✅ Code compiles without errors
- ✅ All tests pass
- ✅ Coverage ≥ 90%
- ✅ Storybook stories added/updated (for UI)
- ✅ No ESLint warnings
- ✅ Code formatted with Prettier
- ✅ Translations exist in all languages (EN/DE/FR)
- ✅ PR reviewed and approved
- ✅ CI pipeline passes

---

## 🆘 Troubleshooting

### Tests Failing

```bash
npm run test:coverage -- --reporter=verbose
```

### Type Errors

```bash
npm run type-check
```

### Coverage Below Threshold

```bash
npm run test:coverage
# Open coverage/index.html to see uncovered lines
```

### Storybook Not Loading

```bash
# Clear Storybook cache
rm -rf node_modules/.cache/storybook
npm run storybook
```

---

## 📄 License

[Your License Here]

---

## 🙏 Contributing

This is a baseline repository. Fork it, modify it, make it yours.

**Remember:**

- Clarity over cleverness
- Boring is reliable
- Small PRs, frequent merges
- Tests are documentation
- Storybook is the source of truth

Build something calm and trustworthy. 🚀
