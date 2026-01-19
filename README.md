# FA for Platforms Prototype

A React-based prototype system for exploring Financial Accounts (FA) embedded component designs for platforms. Built with React, Tailwind CSS, and designed for easy deployment to GitHub Pages.

## Prototypes

### Prototype 1: Platform Controls ↔ Embedded
Mapping platform features to the embedded component. Explores how platform-level settings affect the embedded financial account view.

### Prototype 2: Embedded Navigation
Exploring navigation patterns within the embedded component. Features include:

#### Account Types
- **Multi FA**: Multiple financial account buckets with multiple currencies
- **Single FA + Multi Currency**: One account with multiple currency balances (USD, EUR, etc.)
- **Single FA + Single Currency**: Simple single account, single currency view

#### Dialog Stack Pattern
Dialogs can be opened from within other dialogs, forming a stack:
- Opening a new dialog pushes it onto the stack
- Closing a dialog pops it and reveals the previous one
- Clicking the backdrop closes the topmost dialog
- Uses React Portal for proper full-screen backdrop coverage

#### Account Details Dialog
- Currency tabs in the header for multi-currency accounts
- Balance card with flag icon and amount
- Action buttons: Send, Deposit, Transfer, Convert
- Expandable account details section with smooth animation
- Chevron rotation and text change ("View/Hide account details")
- Recent transactions list (clickable to open transaction detail)
- Cards list (clickable to open card detail)

#### Transaction Filtering
- Balance filter dropdown to filter by account/currency
- Active filter pill with X button to clear
- Loading spinner (800ms) when applying/clearing filters
- "View all transactions" from dialog applies filter and shows spinner

#### Other Features
- Issuing card detail modal
- Transaction detail modal
- Create card flow
- Send/Transfer/Convert/Add Funds flows

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173` to view the application.

### Build

```bash
npm run build
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

## Project Structure

```
src/
├── App.jsx                    # Main app with prototype routing
├── PrototypeContext.jsx       # Global state context provider
├── PrototypeWrapper.jsx       # Wrapper component for prototypes
├── components/
│   ├── Badge.jsx              # Status badge component
│   ├── Dialog.jsx             # Modal dialog with hideBackdrop support
│   ├── DropdownMenu.jsx       # Dropdown menu with alignment options
│   ├── EmbeddedButton.jsx     # Themed button component
│   ├── Input.jsx              # Form input and select components
│   ├── IssuingCard.jsx        # Card detail modal
│   ├── icons.jsx              # Icon components (flags, UI icons)
│   ├── flows/                 # Flow dialogs
│   │   ├── AddFundsFlow.jsx
│   │   ├── ConvertFlow.jsx
│   │   ├── CreateCardFlow.jsx
│   │   ├── SendFlow.jsx
│   │   └── TransferFlow.jsx
│   └── ...
├── prototypes/
│   ├── Prototype1/
│   │   └── FinancialAccount.jsx
│   ├── Prototype2/
│   │   ├── EmbeddedView.jsx   # Main view with mock data
│   │   └── FinancialAccount.jsx
│   ├── Prototype1.jsx         # Prototype 1 entry + control panel
│   └── Prototype2.jsx         # Prototype 2 entry + control panel
└── assets/                    # Images and logos
```

## Key Components

### Dialog Component
```jsx
<Dialog
  isOpen={isOpen}
  onClose={onClose}
  header="Title"
  subheader="Subtitle"
  size="small" | "medium" | "large" | "xlarge"
  hideBackdrop={true}  // For stacked dialogs
  footer={<Button>Action</Button>}
>
  {children}
</Dialog>
```

### Dialog Stack Pattern
```jsx
const [dialogStack, setDialogStack] = useState([]);

const pushDialog = (type, props = {}) => {
  setDialogStack(prev => [...prev, { type, props }]);
};

const popDialog = () => {
  setDialogStack(prev => prev.slice(0, -1));
};

const currentDialog = dialogStack[dialogStack.length - 1];

// Render with portal for full-screen backdrop
{createPortal(
  <>
    {dialogStack.length > 0 && (
      <div className="fixed inset-0 z-40 bg-black/30" onClick={popDialog} />
    )}
    <MyDialog
      isOpen={currentDialog?.type === 'myDialog'}
      onClose={popDialog}
      hideBackdrop
    />
  </>,
  document.body
)}
```

### Filter with Loading State
```jsx
const [balanceFilter, setBalanceFilter] = useState(null);
const [isLoadingPage, setIsLoadingPage] = useState(false);

const applyFilter = (filter) => {
  setCurrentPage(0);
  setIsLoadingPage(true);
  setTimeout(() => {
    setBalanceFilter(filter);
    setIsLoadingPage(false);
  }, 800);
};
```

## Control Panel Options (Prototype 2)

- **Show embedded bounds**: Toggle the wrapper border
- **Brand**: Default or Rocket Rides theming
- **Account Type**: Multi FA, Single FA + Multi Currency, Single FA + Single Currency
- **Show details in**: Full page or Dialog (Multi FA only)

## Customization

### Updating the Base Path

If your GitHub repository has a different name, update the `base` path in `vite.config.js`:

```js
export default defineConfig({
  base: '/your-repo-name/',
});
```

### Styling

The project uses Tailwind CSS. Customize the theme in `tailwind.config.js`.

## License

MIT
