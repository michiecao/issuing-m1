# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at localhost:5173
npm run build    # Production build to dist/
npm run lint     # ESLint check
npm run deploy   # Build and deploy to GitHub Pages (gh-pages branch)
```

## Architecture

This is a React + Vite + Tailwind CSS prototype system for "FA for Platforms" (Financial Accounts for Platforms) design concepts.

### Routing & State

- **Hash-based routing**: URL hash determines which prototype loads (`#prototype1`, `#prototype2`, etc.)
- **Two-tier state system** via `PrototypeContext`:
  - `variables` / `setVariable()` / `getVariable()`: Prototype-specific state (e.g., feature flags like outboundPayments, currencies)
  - `controlVariables` / `setControlVariable()` / `getControlVariable()`: Control panel state (e.g., accountType, detailsView, brand)
- Access state via `usePrototype()` hook

### Component Hierarchy

```
App.jsx (routing)
└── PrototypeWrapper (provides PrototypeContext)
    └── Prototype1.jsx or Prototype2.jsx (entry + control panel)
        └── EmbeddedView (wrapper with mock data)
            └── FinancialAccount (main embedded component)
                ├── BucketDetailView (single account detail view)
                ├── AccountDetailsDialog (modal account view)
                └── Dialog flows via portal (TransferFlow, SendFlow, etc.)
```

### Key Files

**`src/prototypes/Prototype1/FinancialAccount.jsx`** and **`src/prototypes/Prototype2/FinancialAccount.jsx`**: The main financial account embedded components. Each has its own implementation with shared patterns.

**`src/prototypes/Prototype2/EmbeddedView.jsx`**: Contains mock data for different account types (multiAccountData, singleMultiCurrencyData, singleAccountData) and the embedded wrapper UI.

**`src/components/Dialog.jsx`**: Modal dialog component with:
- `hideBackdrop` prop for stacked dialogs
- Size options: small (368px), medium (496px), large (648px), xlarge (944px)
- Header can accept React elements (not just strings)

**`src/components/flows/`**: Dialog flows (TransferFlow, SendFlow, CreateCardFlow, ConvertFlow, AddFundsFlow). Each accepts `hideBackdrop` prop for use in dialog stack.

### Dialog Stack Pattern

Dialogs are managed as a stack to allow opening dialogs from within dialogs:

```jsx
const [dialogStack, setDialogStack] = useState([]);

const pushDialog = (type, props = {}) => {
  setDialogStack(prev => [...prev, { type, props }]);
};

const popDialog = () => {
  setDialogStack(prev => prev.slice(0, -1));
};

const currentDialog = dialogStack[dialogStack.length - 1];
```

Dialogs are rendered via `createPortal` to `document.body` for proper backdrop coverage:

```jsx
{createPortal(
  <>
    {dialogStack.length > 0 && (
      <div className="fixed inset-0 z-40 bg-black/30" onClick={popDialog} />
    )}
    <TransferFlow isOpen={currentDialog?.type === 'transfer'} onClose={popDialog} hideBackdrop />
    {/* ... other dialogs */}
  </>,
  document.body
)}
```

### Account Types (Prototype 2)

Controlled via `accountType` control variable:
- `multi`: Multiple FA buckets, each with multiple currency accounts
- `singleMultiCurrency`: Single bucket with multiple currency accounts (shows currency tabs)
- `single`: Single bucket, single currency account

### Theming

Components support dynamic theming via `themeColor` prop (hex color string, default `#0085FF`). This applies to:
- Button primary backgrounds
- Input/Select focus states
- Tab active states
- Link colors
- Filter pill active borders

### Adding a New Prototype

1. Create `src/prototypes/YourPrototype.jsx` with `featureDefaults` export (aliased as `initialVariables`)
2. Create `src/prototypes/YourPrototype/` directory with component files
3. Register in `App.jsx` PROTOTYPES array

### Adding a New Flow

1. Create `src/components/flows/YourFlow.jsx` following existing patterns
2. Accept `hideBackdrop` prop and pass to Dialog
3. Import in FinancialAccount.jsx and add to dialog stack rendering

### Key Patterns

**Loading states**: Use `isLoadingPage` state with `setTimeout` to show spinner during filter/tab changes:
```jsx
setIsLoadingPage(true);
setTimeout(() => {
  setBalanceFilter(value);
  setIsLoadingPage(false);
}, 800);
```

**Expandable sections**: Use CSS transitions with max-height and opacity:
```jsx
className={`overflow-hidden transition-all duration-300 ${expanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
```

**Active filter pills**: Show different component based on filter state:
```jsx
{balanceFilter ? (
  <ActiveFilterPill label="Balance" value={balanceFilter} onClear={() => ...} />
) : (
  <DropdownMenu trigger={<FilterPill label="Balance" />} items={...} />
)}
```
