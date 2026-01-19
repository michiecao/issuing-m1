import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import * as Icons from '../../components/icons';
import cardDarkImage from '../../assets/card-dark.png';
import TransferFlow from '../../components/flows/TransferFlow';
import SendFlow from '../../components/flows/SendFlow';
import CreateCardFlow from '../../components/flows/CreateCardFlow';
import ConvertFlow from '../../components/flows/ConvertFlow';
import AddFundsFlow from '../../components/flows/AddFundsFlow';
import EmbeddedButton from '../../components/EmbeddedButton';
import DropdownMenu from '../../components/DropdownMenu';
import Dialog from '../../components/Dialog';
import IssuingCard from '../../components/IssuingCard';
import Badge from '../../components/Badge';

// Currency to flag icon mapping
const currencyFlags = {
  USD: Icons.USFlag,
  EUR: Icons.EUFlag,
  GBP: Icons.UKFlag,
  CAD: Icons.CAFlag,
  AUD: Icons.AUFlag,
};

// Financial Account Component
const FinancialAccount = ({
  outboundPayments = false,
  outboundTransfers = false,
  financialAddresses = false,
  currencies = [],
  data = {},
  themeColor = '#0085FF',
  detailsView = 'fullPage',
}) => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedBucket, setSelectedBucket] = useState(null);
  const [selectedCurrencyIndex, setSelectedCurrencyIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [balanceFilter, setBalanceFilter] = useState(null); // e.g., "Operating (USD)"
  const ITEMS_PER_PAGE = 10;

  // Dialog stack - each item is { type: string, props?: object }
  // Types: 'transfer', 'send', 'createCard', 'convert', 'addFunds', 'transaction', 'card', 'accountDetails'
  const [dialogStack, setDialogStack] = useState([]);

  const pushDialog = (type, props = {}) => {
    setDialogStack(prev => [...prev, { type, props }]);
  };

  const popDialog = () => {
    setDialogStack(prev => prev.slice(0, -1));
  };

  const currentDialog = dialogStack[dialogStack.length - 1];

  // Handle page change with loading delay
  const handlePageChange = (newPage) => {
    setIsLoadingPage(true);
    setTimeout(() => {
      setCurrentPage(newPage);
      setIsLoadingPage(false);
    }, 500);
  };

  const {
    totalBalance = { amount: '$0.00', currency: 'USD' },
    buckets = [],
  } = data;

  // Aggregate all transactions from all accounts across all buckets
  // Add bucket name and currency to each transaction for the balance column
  // Sort by date (most recent first)
  const allTransactions = buckets.flatMap(bucket =>
    bucket.accounts.flatMap(account =>
      (account.transactions || []).map(t => ({
        ...t,
        balance: `${bucket.name} (${account.currency})`,
      }))
    )
  ).sort((a, b) => new Date(b.date) - new Date(a.date));

  // Aggregate all cards from all accounts
  const allCards = buckets.flatMap(bucket =>
    bucket.accounts.flatMap(account => account.cards || [])
  );

  // Get unique balance options for filtering
  const balanceOptions = [...new Set(allTransactions.map(t => t.balance))];

  // Determine if we should show single bucket view directly
  const isSingleBucket = buckets.length === 1;
  const effectiveSelectedBucket = isSingleBucket ? buckets[0] : selectedBucket;

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'money-in', label: 'Money in' },
    { id: 'money-out', label: 'Money out' },
  ];

  // Filter transactions based on active tab and balance filter
  const filteredTransactions = allTransactions.filter(t => {
    // Filter by tab
    if (activeTab === 'money-in' && t.type !== 'credit') return false;
    if (activeTab === 'money-out' && t.type !== 'debit') return false;
    // Filter by balance
    if (balanceFilter && t.balance !== balanceFilter) return false;
    return true;
  });

  // Account Card component (individual account within a bucket)
  const AccountCard = ({ currency, amount, accountEnding, apy, showFinancialAddresses, onClick }) => {
    const FlagIcon = currencyFlags[currency];

    return (
      <div
        className="flex flex-col relative bg-white border border-gray-200 rounded-lg p-4 min-w-[180px] min-h-[140px]
        hover:cursor-pointer hover:bg-offset transition-colors duration-100"
        onClick={onClick}
      >
        <div className="content flex-grow">
          <div className="flex items-center gap-2 mb-2">
            {FlagIcon && <FlagIcon size={24} />}
            <span className="text-sm font-medium text-gray-900">{currency}</span>
          </div>
          <div className="text-xl text-gray-900 mb-1">{amount}</div>
          <div className="text-sm text-gray-500 mb-1">
            {showFinancialAddresses && accountEnding && `•••• ${accountEnding}`}
          </div>
          {apy && <div className="text-sm text-gray-500">{apy} APY</div>}
        </div>

        {/* <div className="flex gap-4 p-1 text-gray-600">
          {outboundTransfers && <Icons.ConvertIcon size={16} />}
          {outboundPayments && <Icons.SendIcon size={16} />}
          <Icons.MoreIcon size={16} />
        </div> */}
      </div>
    );
  };

  // Bucket component (groups multiple accounts)
  const Bucket = ({ bucket, showFinancialAddresses, onClick, onAccountClick }) => (
    <div
      className="flex flex-col flex-shrink-0 bg-offset p-2 rounded-lg hover:cursor-pointer hover:bg-gray-100 transition-colors"
      onClick={onClick}
    >
      <div className="flex flex-grow gap-2">
        {bucket.accounts.map((account, index) => (
          <AccountCard
            key={index}
            {...account}
            showFinancialAddresses={showFinancialAddresses}
            onClick={(e) => {
              e.stopPropagation();
              onAccountClick(bucket, index);
            }}
          />
        ))}
      </div>
      <div className="text-sm font-medium text-gray-800 mt-2 flex items-center gap-2 justify-between">
        {bucket.name}
        <Icons.PlusIcon size={16} />
      </div>
    </div>
  );

  // Tab component
  const Tab = ({ label, isActive, onClick, themeColor }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${isActive
        ? ''
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }`}
      style={isActive ? { borderColor: themeColor, color: themeColor } : {}}
    >
      {label}
    </button>
  );

  // Filter Pill component
  const FilterPill = ({ label }) => (
    <button className="inline-flex items-center gap-1 px-2 py-1 text-sm text-gray-600 bg-white border border-gray-200 rounded-sm hover:bg-gray-50">
      {label}
    </button>
  );

  // Active Filter Pill component (with close button)
  const ActiveFilterPill = ({ label, value, onClear }) => (
    <button
      onClick={onClear}
      className="inline-flex items-center gap-1.5 px-2 py-1 text-sm bg-white border-1 rounded-sm"
      style={{ borderColor: themeColor }}
    >
      <div className="flex items-center gap-1 -m-1 hover:bg-gray-100 rounded-sm p-1">
        <Icons.CloseIcon size={12} className="text-gray-500" />
      </div>
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-300">|</span>
      <span className="font-medium" style={{ color: themeColor }}>{value}</span>
    </button>
  );

  // Transaction Row component
  const TransactionRow = ({ amount, description, balance, date, type, showBalance = true, onClick }) => (
    <tr
      className="border-b border-gray-200 hover:bg-gray-50 text-sm cursor-pointer"
      onClick={onClick}
    >
      <td className="py-2 px-4 h-[36px] whitespace-nowrap">
        <span className={`font-medium ${type === 'credit' ? 'text-green-600' : 'text-gray-900'}`}>
          {type === 'credit' ? '+' : ''}{amount}
        </span>
      </td>
      <td className="py-2 px-4 h-[36px] text-gray-600">{description}</td>
      {showBalance && <td className="py-2 px-4 h-[36px] text-gray-600 whitespace-nowrap">{balance}</td>}
      <td className="py-2 px-4 h-[36px] text-gray-500 whitespace-nowrap">{date}</td>
    </tr>
  );

  // Transaction Detail Dialog component
  const TransactionDetailDialog = ({ transaction, isOpen, onClose, hideBackdrop = false }) => {
    if (!transaction) return null;

    return (
      <Dialog
        isOpen={isOpen}
        onClose={onClose}
        header={
          <div className={`text-2xl font-semibold ${transaction.type === 'credit' ? 'text-green-600' : 'text-gray-900'}`}>
            {transaction.type === 'credit' ? '+' : ''}{transaction.amount} {transaction.currency}
          </div>
        }
        subheader={<div className="text-sm font-base text-gray-500">{transaction.description}</div>}
        size="small"
        themeColor={themeColor}
        hideBackdrop={hideBackdrop}
      >
        <div className="space-y-4">
          {/* Details */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Date</span>
              <span className="text-sm text-gray-900">{transaction.date}</span>
            </div>
            {transaction.balance && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Balance</span>
                <span className="text-sm text-gray-900">{transaction.balance}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Status</span>
              <Badge variant="success">Completed</Badge>
            </div>
          </div>
        </div>
      </Dialog>
    );
  };

  // Account Details Dialog component
  const AccountDetailsDialog = ({ accountData, isOpen, onClose, hideBackdrop = false }) => {
    const [dialogCurrencyIndex, setDialogCurrencyIndex] = useState(0);
    const [showAccountDetails, setShowAccountDetails] = useState(false);

    // Sync dialogCurrencyIndex with initialCurrencyIndex when dialog opens
    useEffect(() => {
      if (accountData?.currencyIndex !== undefined) {
        setDialogCurrencyIndex(accountData.currencyIndex);
      }
    }, [accountData?.currencyIndex, isOpen]);

    if (!accountData) return null;

    const { bucket, currencyIndex: initialCurrencyIndex } = accountData;
    const hasMultipleCurrencies = bucket.accounts.length > 1;
    const currentCurrencyIndex = hasMultipleCurrencies ? dialogCurrencyIndex : initialCurrencyIndex;
    const account = bucket.accounts[currentCurrencyIndex];
    const FlagIcon = currencyFlags[account.currency];
    const accountTransactions = account.transactions || [];
    const accountCards = account.cards || [];

    return (
      <Dialog
        isOpen={isOpen}
        onClose={onClose}
        header={
          <div className="flex flex-col w-full">
            <span>Balance</span>
            {hasMultipleCurrencies && (
              <div className="flex w-full mt-3 -mb-5">
                {bucket.accounts.map((acc, index) => (
                  <button
                    key={index}
                    onClick={() => setDialogCurrencyIndex(index)}
                    className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors cursor-pointer ${currentCurrencyIndex === index
                      ? ''
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    style={currentCurrencyIndex === index ? { borderColor: themeColor, color: themeColor } : {}}
                  >
                    {acc.currency}
                  </button>
                ))}
              </div>
            )}
          </div>
        }
        size="medium"
        themeColor={themeColor}
        hideBackdrop={hideBackdrop}
      >
        <div className="space-y-6">
          {/* Balance Card */}
          <div className="border-border-default border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              {FlagIcon && <FlagIcon size={20} />}
              <span className="text-sm text-gray-600">{account.currency}</span>
            </div>
            <div className="text-3xl font-semibold text-gray-900 mb-4">{account.amount}</div>

            {/* Action Buttons */}
            <div className="flex gap-2 mb-3">
              {outboundPayments && (
                <Button variant="secondary" className="flex-1" onClick={() => pushDialog('send')}>
                  <Icons.SendIcon size={14} />Send
                </Button>
              )}
              <Button variant="secondary" className="flex-1" onClick={() => pushDialog('addFunds')}>
                <Icons.TopUpIcon size={14} />Deposit
              </Button>
              <DropdownMenu
                trigger={
                  <Button variant="secondary">
                    <Icons.MoreIcon size={14} />
                  </Button>
                }
                items={[
                  { label: 'Transfer', icon: <Icons.ConvertIcon size={12} />, onClick: () => pushDialog('transfer') },
                  { label: 'Convert', icon: <Icons.GlobeIcon size={12} />, onClick: () => pushDialog('convert') },
                ]}
              />
            </div>

            {/* Account details expandable */}
            {financialAddresses && account.accountEnding && (
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${showAccountDetails ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="mb-3 pt-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Routing number</span>
                    <span className="text-gray-900 flex items-center gap-1">071919133 <Icons.CopyIcon size={12} className="text-gray-400" /></span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Account number</span>
                    <span className="text-gray-900 flex items-center gap-1">•••• {account.accountEnding} <Icons.CopyIcon size={12} className="text-gray-400" /></span>
                  </div>
                  {account.apy && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">APY</span>
                      <span className="text-gray-900">{account.apy}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* View account details */}
            <button
              className="flex items-center gap-1.5 text-sm font-medium cursor-pointer"
              style={{ color: themeColor }}
              onClick={() => setShowAccountDetails(!showAccountDetails)}
            >
              <div className={`transition-transform duration-300 ${showAccountDetails ? 'rotate-180' : ''}`}>
                <Icons.ChevronDownIcon size={12} />
              </div>
              {showAccountDetails ? 'Hide account details' : 'View account details'}
            </button>
          </div>

          {/* Recent Transactions */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-gray-900">Recent transactions</h3>
              <button
                className="text-sm font-medium cursor-pointer"
                style={{ color: themeColor }}
                onClick={() => {
                  const filterValue = `${bucket.name} (${account.currency})`;
                  setDialogStack([]); // Close all dialogs
                  setCurrentPage(0); // Reset to first page
                  setIsLoadingPage(true);
                  setTimeout(() => {
                    setBalanceFilter(filterValue);
                    setIsLoadingPage(false);
                  }, 800);
                }}
              >
                View all transactions
              </button>
            </div>
            {accountTransactions.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {accountTransactions.slice(0, 4).map((transaction, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-100 -mx-2 px-2 rounded-md transition-colors"
                    onClick={() => pushDialog('transaction', { transaction })}
                  >
                    <div>
                      <div className={`text-sm font-medium ${transaction.type === 'credit' ? 'text-gray-900' : 'text-gray-900'}`}>
                        {transaction.type === 'debit' ? '-' : ''}{transaction.amount}
                      </div>
                      <div className="text-sm text-gray-500">{transaction.description}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {transaction.status === 'failed' && <Badge variant="danger">Failed</Badge>}
                      <button
                        className="text-gray-400 hover:text-gray-600"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Icons.MoreIcon size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-500 text-center py-4">No transactions yet</div>
            )}
          </div>

          {/* Cards */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-gray-900">Cards</h3>
              <a
                className="text-sm font-medium"
                style={{ color: themeColor }}
                onClick={() => pushDialog('createCard')}
              >
                Create card
              </a>
            </div>
            {accountCards.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {accountCards.map((card, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-100 -mx-2 px-2 rounded-md transition-colors"
                    onClick={() => pushDialog('card', { card })}
                  >
                    <div className="flex items-center gap-3">
                      <img src={cardDarkImage} alt="Card" className="w-10 rounded-sm" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {card.name} •••• {card.lastFour}
                        </div>
                        <div className="text-sm text-gray-500">{card.cardholder}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {card.status !== 'Active' && (
                        <Badge variant={card.status === 'Frozen' ? 'default' : 'danger'}>
                          {card.status === 'Frozen' ? 'Disabled' : card.status}
                        </Badge>
                      )}
                      <button
                        className="text-gray-400 hover:text-gray-600"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Icons.MoreIcon size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center text-center">
                <span className="text-sm text-gray-500 mb-1">No cards yet</span>
                <button
                  onClick={() => pushDialog('createCard')}
                  className="text-sm font-medium"
                  style={{ color: themeColor }}
                >
                  Create a card
                </button>
              </div>
            )}
          </div>
        </div>
      </Dialog>
    );
  };

  // Create a Button shorthand that includes themeColor
  const Button = (props) => <EmbeddedButton themeColor={themeColor} {...props} />;

  // Empty State Box component
  const EmptyStateBox = ({ message, actionLabel, onAction }) => (
    <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center text-center">
      <span className="text-sm text-gray-500 mb-1">{message}</span>
      {actionLabel && (
        <button
          onClick={onAction}
          className="text-sm font-medium hover:underline"
          style={{ color: themeColor }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );

  // Bucket Detail View component
  const BucketDetailView = ({ bucket, onBack }) => {
    const hasMultipleCurrencies = bucket.accounts.length > 1;
    const currentAccount = bucket.accounts[selectedCurrencyIndex] || bucket.accounts[0];

    // Get transactions, cards, and incoming earnings for the current account
    const accountTransactions = currentAccount.transactions || [];
    const accountCards = currentAccount.cards || [];
    const accountIncomingEarnings = currentAccount.incomingEarnings || [];

    return (
      <div className="space-y-6">
        {/* Header with back button - only show when navigating from multi-FA view */}
        {onBack && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onBack();
              }}
              className="p-2 rounded-md hover:bg-gray-100 text-gray-500 transition-colors cursor-pointer"
            >
              <Icons.ArrowLeftIcon size={16} />
            </button>
            <h2 className="text-lg font-semibold text-gray-900">{bucket.name}</h2>
          </div>
        )}

        {/* Currency Tabs (only show if multiple currencies) */}
        {hasMultipleCurrencies && (
          <div className="flex items-center gap-1 border-b border-gray-200">
            {bucket.accounts.map((account, index) => {
              const TabFlagIcon = currencyFlags[account.currency];
              return (
                <button
                  key={index}
                  onClick={() => setSelectedCurrencyIndex(index)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors cursor-pointer hover:bg-offset rounded-t-md ${selectedCurrencyIndex === index
                    ? ''
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  style={selectedCurrencyIndex === index ? { borderColor: themeColor, color: themeColor } : {}}
                >
                  {TabFlagIcon && <TabFlagIcon size={16} />}
                  {account.currency}
                </button>
              );
            })}
          </div>
        )}

        {/* Two Column Layout */}
        <div className="flex gap-8">
          {/* Left Column */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Account Card */}
            <div className="border-1 border-border-default rounded-lg p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-baseline gap-2">
                  <div className="text-2xl font-semibold text-gray-900">{currentAccount.amount}</div>
                  <div className="text-lg text-gray-500">{currentAccount.currency}</div>
                </div>
                {/* Action Buttons */}
                <div className="flex gap-2 mb-4">
                  {outboundPayments && (
                    <Button variant="secondary" onClick={() => pushDialog('send')}>
                      <Icons.SendIcon size={14} />Send
                    </Button>
                  )}
                  <Button variant="secondary" onClick={() => pushDialog('addFunds')}>
                    <Icons.TopUpIcon size={14} />Deposit
                  </Button>
                  <DropdownMenu
                    trigger={
                      <Button variant="secondary">
                        <Icons.MoreIcon size={14} />
                      </Button>
                    }
                    items={[
                      { label: 'Transfer', icon: <Icons.ConvertIcon size={12} />, onClick: () => pushDialog('transfer') },
                      { label: 'Convert', icon: <Icons.GlobeIcon size={12} />, onClick: () => pushDialog('convert') },
                    ]}
                  />
                </div>
              </div>


              {/* Account Details */}
              <div className="flex items-end gap-6 text-sm">
                {financialAddresses && currentAccount.accountEnding && (
                  <div className="flex items-end gap-6 text-sm">
                    {currentAccount.apy && (
                      <div className="">
                        <div className="text-gray-500 mb-1">APY</div>
                        <div className="font-medium text-gray-900">{currentAccount.apy}</div>
                      </div>
                    )}
                    <div>
                      <div className="text-gray-500 mb-1">Routing number</div>
                      <div className="font-medium text-gray-900 flex items-center gap-1">
                        071919133 <Icons.CopyIcon size={12} className="text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500 mb-1">Account number</div>
                      <div className="font-medium text-gray-900 flex items-center gap-1">
                        2700100375967{currentAccount.accountEnding} <Icons.CopyIcon size={12} className="text-gray-400" />
                      </div>
                    </div>
                  </div>
                )}
                <button className="text-sm font-medium flex items-center gap-1 ml-auto" style={{ color: themeColor }}>
                  View all details
                </button>
              </div>
            </div>

            {/* Transactions Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Transactions</h3>
              {accountTransactions.length > 0 ? (
                <>
                  {/* Filters */}
                  <div className="flex gap-2 mb-4">
                    <FilterPill label="Balance" />
                    <FilterPill label="Status" />
                    <FilterPill label="Description" />
                    <FilterPill label="Date" />
                  </div>

                  {/* Table */}
                  <div className="bg-white rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase w-1 whitespace-nowrap">Amount</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Description</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase w-1 whitespace-nowrap">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {accountTransactions.slice(0, 10).map((transaction, index) => (
                          <TransactionRow
                            key={index}
                            {...transaction}
                            showBalance={false}
                            onClick={() => pushDialog('transaction', { transaction })}
                          />
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-gray-500">1-{Math.min(10, accountTransactions.length)} of {accountTransactions.length} results</span>
                    <div className="flex gap-2">
                      <Button variant="secondary" disabled>Previous</Button>
                      <Button variant="secondary">Next</Button>
                    </div>
                  </div>
                </>
              ) : (
                <EmptyStateBox
                  message="No account activity"
                  actionLabel="Add funds"
                  onAction={() => pushDialog('addFunds')}
                />
              )}
            </div>

            {/* Cards Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">Cards</h3>
                {accountCards.length > 0 && (
                  <button
                    type="button"
                    onClick={() => pushDialog('createCard')}
                    className="text-sm font-medium cursor-pointer"
                    style={{ color: themeColor }}
                  >
                    Create a card
                  </button>
                )}
              </div>
              {accountCards.length > 0 ? (
                <>
                  <div className="bg-white rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 px-4 text-xs font-medium text-gray-500 uppercase">Card</th>
                          <th className="text-left py-2 px-4 text-xs font-medium text-gray-500 uppercase">Cardholder</th>
                          <th className="text-left py-2 px-4 text-xs font-medium text-gray-500 uppercase">Created</th>
                          <th className="w-10"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {accountCards.map((card, index) => (
                          <tr
                            key={index}
                            className="border-b border-gray-200 last:border-0 hover:bg-gray-50 cursor-pointer"
                            onClick={() => pushDialog('card', { card })}
                          >
                            <td className="py-2 h-[36px] px-4">
                              <div className="flex items-center gap-3">
                                {/* Card image */}
                                <img src={cardDarkImage} alt="Card" className="w-5 rounded-xs" />
                                <span className="text-sm text-gray-900">{card.name} •••• {card.lastFour}</span>
                                <Badge variant={card.status === 'Active' ? 'success' : 'default'}>
                                  {card.status}
                                </Badge>
                              </div>
                            </td>
                            <td className="py-2 h-[36px] px-4 text-sm text-gray-900">{card.cardholder}</td>
                            <td className="py-2 h-[36px] px-4 text-sm text-gray-500">{card.created}</td>
                            <td className="py-2 h-[36px] px-4">
                              <button
                                className="text-gray-400 hover:text-gray-600"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Icons.MoreIcon size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <EmptyStateBox
                  message="No cards"
                  actionLabel="Create a card"
                  onAction={() => pushDialog('createCard')}
                />
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="flex-1 min-w-0 max-w-[300px] space-y-6">
            {/* Incoming Earnings */}
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Incoming earnings</h3>
            {accountIncomingEarnings.length > 0 ? (
              <div className="space-y-2 w-full">
                {accountIncomingEarnings.map((earning, index) => (
                  <div key={index} className="flex w-full border border-border-default rounded-lg overflow-hidden gap-2 items-center">
                    <div
                      className="w-[60px] shrink-0 py-2.5 flex flex-col items-center justify-center"
                      style={{
                        background: themeColor
                          ? `${themeColor}1A`
                          : undefined
                      }}
                    >
                      <span className="text-xs text-gray-500 uppercase">{earning.month}</span>
                      <span className="text-base font-semibold text-gray-900">{earning.day}</span>
                    </div>
                    <div className="flex flex-col py-1 px-2 overflow-hidden flex-1">
                      <div className="font-semibold text-base text-gray-900">{earning.amount}</div>
                      <div className="text-sm text-gray-500 truncate">{earning.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyStateBox message="No incoming funds" />
            )}
          </div>
        </div>
      </div>
    );
  };

  // If a bucket is selected (or single bucket mode), show the detail view
  if (effectiveSelectedBucket) {
    return (
      <>
        <BucketDetailView
          bucket={effectiveSelectedBucket}
          onBack={isSingleBucket ? null : () => { setSelectedBucket(null); setSelectedCurrencyIndex(0); }}
        />

        {/* Dialog Portal - render at document body level */}
        {createPortal(
          <>
            {/* Single backdrop for all dialogs */}
            {dialogStack.length > 0 && (
              <div className="fixed inset-0 z-40 bg-black/30" onClick={popDialog} />
            )}

            {/* Dialog Stack - only render the current (top) dialog */}
            <TransferFlow
              isOpen={currentDialog?.type === 'transfer'}
              onClose={popDialog}
              themeColor={themeColor}
              currencies={currencies}
              hideBackdrop
            />
            <SendFlow
              isOpen={currentDialog?.type === 'send'}
              onClose={popDialog}
              themeColor={themeColor}
              currencies={currencies}
              hideBackdrop
            />
            <ConvertFlow
              isOpen={currentDialog?.type === 'convert'}
              onClose={popDialog}
              themeColor={themeColor}
              currencies={currencies}
              hideBackdrop
            />
            <AddFundsFlow
              isOpen={currentDialog?.type === 'addFunds'}
              onClose={popDialog}
              themeColor={themeColor}
              currencies={currencies}
              hideBackdrop
            />
            <CreateCardFlow
              isOpen={currentDialog?.type === 'createCard'}
              onClose={popDialog}
              themeColor={themeColor}
              hideBackdrop
            />
            <TransactionDetailDialog
              transaction={currentDialog?.props?.transaction}
              isOpen={currentDialog?.type === 'transaction'}
              onClose={popDialog}
              hideBackdrop
            />
            <IssuingCard
              card={currentDialog?.props?.card}
              isOpen={currentDialog?.type === 'card'}
              onClose={popDialog}
              themeColor={themeColor}
              hideBackdrop
            />
          </>,
          document.body
        )}
      </>
    );
  }

  return (
    <div className="space-y-4">
      {/* Total Balance Header */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <div className="text-xl font-semibold text-gray-800">Total balance</div>
          <div className="text-xl text-gray-600">{totalBalance.amount}</div>
          <span className="text-xl text-gray-600">{totalBalance.currency}</span>
        </div>
        <div className="flex items-center gap-2">
          {outboundTransfers && (
            <Button variant="primary" onClick={() => pushDialog('transfer')}><Icons.ConvertIcon />Transfer</Button>
          )}
          {outboundPayments && (
            <Button variant="secondary" onClick={() => pushDialog('send')}><Icons.SendIcon />Send</Button>
          )}
          <DropdownMenu
            trigger={
              <Button variant="secondary" className="p-2">
                <Icons.MoreIcon />
              </Button>
            }
            items={[
              { label: 'Convert', icon: <Icons.GlobeIcon size={16} />, onClick: () => pushDialog('convert') },
              { label: 'Add funds', icon: <Icons.TopUpIcon size={16} />, onClick: () => pushDialog('addFunds') },
              { label: 'Create card', icon: <Icons.CreateCardIcon size={16} />, onClick: () => pushDialog('createCard') },
            ]}
          />
        </div>
      </div>

      {/* Buckets */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {buckets.map((bucket) => (
          <Bucket
            key={bucket.id}
            bucket={bucket}
            showFinancialAddresses={financialAddresses}
            onClick={() => {
              if (detailsView === 'dialog') {
                pushDialog('accountDetails', { bucket, currencyIndex: 0 });
              } else {
                setSelectedBucket(bucket);
                setSelectedCurrencyIndex(0);
              }
            }}
            onAccountClick={(bucket, currencyIndex) => {
              if (detailsView === 'dialog') {
                pushDialog('accountDetails', { bucket, currencyIndex });
              } else {
                setSelectedBucket(bucket);
                setSelectedCurrencyIndex(currencyIndex);
              }
            }}
          />
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent activity</h3>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-4">
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              label={tab.label}
              isActive={activeTab === tab.id}
              onClick={() => {
                if (tab.id !== activeTab) {
                  setIsLoadingPage(true);
                  setTimeout(() => {
                    setActiveTab(tab.id);
                    setCurrentPage(0);
                    setIsLoadingPage(false);
                  }, 500);
                }
              }}
              themeColor={themeColor}
            />
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-4">
          {balanceFilter ? (
            <ActiveFilterPill
              label="Balance"
              value={balanceFilter}
              onClear={() => {
                setCurrentPage(0);
                setIsLoadingPage(true);
                setTimeout(() => {
                  setBalanceFilter(null);
                  setIsLoadingPage(false);
                }, 800);
              }}
            />
          ) : (
            <DropdownMenu
              trigger={<FilterPill label="Balance" />}
              align="left"
              items={balanceOptions.map(balance => ({
                label: balance,
                onClick: () => {
                  setCurrentPage(0);
                  setIsLoadingPage(true);
                  setTimeout(() => {
                    setBalanceFilter(balance);
                    setIsLoadingPage(false);
                  }, 800);
                },
              }))}
            />
          )}
          <FilterPill label="Status" />
          <FilterPill label="Description" />
          <FilterPill label="Date" />
        </div>

        {/* Transaction Table */}
        <div className="bg-white rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="">
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase w-1 whitespace-nowrap">Amount</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase w-1 whitespace-nowrap">Balance</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase w-1 whitespace-nowrap">Date</th>
              </tr>
            </thead>
            <tbody>
              {isLoadingPage ? (
                <tr>
                  <td colSpan={4} className="py-32">
                    <div className="flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredTransactions
                  .slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE)
                  .map((transaction, index) => (
                    <TransactionRow
                      key={index}
                      {...transaction}
                      onClick={() => pushDialog('transaction', { transaction })}
                    />
                  ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-gray-500">
            {filteredTransactions.length === 0 ? '0' : currentPage * ITEMS_PER_PAGE + 1}-{Math.min((currentPage + 1) * ITEMS_PER_PAGE, filteredTransactions.length)} of {filteredTransactions.length} results
          </span>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              disabled={currentPage === 0 || isLoadingPage}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </Button>
            <Button
              variant="secondary"
              disabled={(currentPage + 1) * ITEMS_PER_PAGE >= filteredTransactions.length || isLoadingPage}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Dialog Portal - render at document body level */}
      {createPortal(
        <>
          {/* Single backdrop for all dialogs */}
          {dialogStack.length > 0 && (
            <div className="fixed inset-0 z-40 bg-black/30" onClick={popDialog} />
          )}

          {/* Dialog Stack - only render the current (top) dialog */}
          <TransferFlow
            isOpen={currentDialog?.type === 'transfer'}
            onClose={popDialog}
            themeColor={themeColor}
            currencies={currencies}
            hideBackdrop
          />
          <SendFlow
            isOpen={currentDialog?.type === 'send'}
            onClose={popDialog}
            themeColor={themeColor}
            currencies={currencies}
            hideBackdrop
          />
          <CreateCardFlow
            isOpen={currentDialog?.type === 'createCard'}
            onClose={popDialog}
            themeColor={themeColor}
            hideBackdrop
          />
          <ConvertFlow
            isOpen={currentDialog?.type === 'convert'}
            onClose={popDialog}
            themeColor={themeColor}
            currencies={currencies}
            hideBackdrop
          />
          <AddFundsFlow
            isOpen={currentDialog?.type === 'addFunds'}
            onClose={popDialog}
            themeColor={themeColor}
            currencies={currencies}
            hideBackdrop
          />
          <TransactionDetailDialog
            transaction={currentDialog?.props?.transaction}
            isOpen={currentDialog?.type === 'transaction'}
            onClose={popDialog}
            hideBackdrop
          />
          <IssuingCard
            card={currentDialog?.props?.card}
            isOpen={currentDialog?.type === 'card'}
            onClose={popDialog}
            themeColor={themeColor}
            hideBackdrop
          />
          <AccountDetailsDialog
            accountData={currentDialog?.type === 'accountDetails' ? currentDialog.props : null}
            isOpen={currentDialog?.type === 'accountDetails'}
            onClose={popDialog}
            hideBackdrop
          />
        </>,
        document.body
      )}
    </div>
  );
};

export default FinancialAccount;
