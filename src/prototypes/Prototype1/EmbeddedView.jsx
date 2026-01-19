import React, { useState, useEffect } from 'react';
import { usePrototype } from '../../PrototypeContext';
import EmbeddedComponentWrapper from '../../components/EmbeddedComponentWrapper';
import FinancialAccount from './FinancialAccount';
import rocketRidesLogo from '../../assets/rocket-rides-large.svg';
import rocketRidesLogoHorizontal from '../../assets/rocket-rides-large-horizontal.png';

// Mock data for Multi-FA account (multiple buckets)
const multiAccountData = {
  totalBalance: {
    amount: '$76,092.34',
    currency: 'USD',
  },
  buckets: [
    {
      id: 'operations',
      name: 'Operations',
      accounts: [
        {
          currency: 'USD',
          amount: '$25,092.34',
          accountEnding: '4251',
          transactions: [
            { amount: '$1,234.00', description: 'Transfer from bank account', date: 'Jan 10, 2025', type: 'credit' },
            { amount: '$500.00', description: 'Payment to vendor', date: 'Jan 9, 2025', type: 'debit' },
            { amount: '$2,000.00', description: 'Customer payment received', date: 'Jan 8, 2025', type: 'credit' },
            { amount: '$150.00', description: 'Slack Technologies - Subscription', date: 'Jan 7, 2025', type: 'debit' },
            { amount: '$412.48', description: 'Payment to Eric Liang', date: 'Jan 6, 2025', type: 'debit' },
            { amount: '$89.99', description: 'Adobe Creative Cloud', date: 'Jan 6, 2025', type: 'debit' },
            { amount: '$3,500.00', description: 'Invoice #1042 - Acme Corp', date: 'Jan 5, 2025', type: 'credit' },
            { amount: '$234.56', description: 'Amazon Web Services', date: 'Jan 5, 2025', type: 'debit' },
            { amount: '$45.00', description: 'Uber - Business travel', date: 'Jan 4, 2025', type: 'debit' },
            { amount: '$1,200.00', description: 'Google Ads', date: 'Jan 4, 2025', type: 'debit' },
            { amount: '$750.00', description: 'Meta Ads - Campaign #23', date: 'Jan 3, 2025', type: 'debit' },
            { amount: '$5,000.00', description: 'Wire transfer - Client deposit', date: 'Jan 3, 2025', type: 'credit' },
            { amount: '$128.50', description: 'Office Depot - Supplies', date: 'Jan 2, 2025', type: 'debit' },
            { amount: '$299.00', description: 'Zoom - Annual subscription', date: 'Jan 2, 2025', type: 'debit' },
            { amount: '$67.89', description: 'DoorDash - Team lunch', date: 'Jan 1, 2025', type: 'debit' },
            { amount: '$2,500.00', description: 'Contractor payment - Design work', date: 'Dec 31, 2024', type: 'debit' },
            { amount: '$189.00', description: 'GitHub Enterprise', date: 'Dec 30, 2024', type: 'debit' },
            { amount: '$4,200.00', description: 'Invoice #1041 - TechStart Inc', date: 'Dec 29, 2024', type: 'credit' },
            { amount: '$56.78', description: 'Staples - Printer ink', date: 'Dec 28, 2024', type: 'debit' },
            { amount: '$320.00', description: 'Figma - Team plan', date: 'Dec 27, 2024', type: 'debit' },
          ],
          cards: [
            { name: 'Cam Sackett', lastFour: '2345', status: 'Active', cardholder: 'Cam Sackett', created: 'May 13' },
            { name: 'Ad spend', lastFour: '1726', status: 'Active', cardholder: 'Lulu Siegel', created: 'May 13' },
            { name: 'Steven Johnson', lastFour: '8893', status: 'Active', cardholder: 'Steven Johnson', created: 'May 13' },
          ],
          incomingEarnings: [
            { month: 'Jan', day: '14', amount: '$2,345.67', description: 'From Stripe → Operations • USD' },
            { month: 'Jan', day: '15', amount: '$1,892.43', description: 'From Stripe → Operations • USD' },
            { month: 'Jan', day: '16', amount: '$3,421.00', description: 'From Stripe → Operations • USD' },
            { month: 'Jan', day: '17', amount: '$987.25', description: 'From Stripe → Operations • USD' },
          ],
        },
        {
          currency: 'EUR',
          amount: '€1,000.00',
          accountEnding: '1234',
          transactions: [
            { amount: '€500.00', description: 'Wire from client - Berlin office', date: 'Jan 9, 2025', type: 'credit' },
            { amount: '€200.00', description: 'Supplier payment - Munich', date: 'Jan 5, 2025', type: 'debit' },
            { amount: '€1,250.00', description: 'EU client payment - Invoice #892', date: 'Jan 3, 2025', type: 'credit' },
            { amount: '€89.00', description: 'Train tickets - Paris trip', date: 'Jan 2, 2025', type: 'debit' },
            { amount: '€156.00', description: 'Hotel - Amsterdam conference', date: 'Dec 30, 2024', type: 'debit' },
            { amount: '€2,000.00', description: 'Consulting fee - Frankfurt client', date: 'Dec 28, 2024', type: 'credit' },
            { amount: '€45.50', description: 'Business dinner - Milan', date: 'Dec 27, 2024', type: 'debit' },
          ],
          cards: [],
          incomingEarnings: [
            { month: 'Jan', day: '14', amount: '€673.45', description: 'From Stripe → Operations • EUR' },
            { month: 'Jan', day: '15', amount: '€805.75', description: 'From Stripe → Operations • EUR' },
            { month: 'Jan', day: '16', amount: '€416.89', description: 'From Stripe → Operations • EUR' },
          ],
        },
      ],
    },
    {
      id: 'high-yield',
      name: 'High yield',
      accounts: [
        {
          currency: 'USD',
          amount: '$50,000.00',
          apy: '3.25%',
          accountEnding: '4251',
          transactions: [
            { amount: '$10,000.00', description: 'Transfer from Operations', date: 'Jan 5, 2025', type: 'credit' },
            { amount: '$125.00', description: 'Interest earned', date: 'Jan 1, 2025', type: 'credit' },
            { amount: '$5,000.00', description: 'Transfer from Operations', date: 'Dec 20, 2024', type: 'credit' },
            { amount: '$118.75', description: 'Interest earned', date: 'Dec 1, 2024', type: 'credit' },
            { amount: '$2,000.00', description: 'Transfer to Operations', date: 'Nov 28, 2024', type: 'debit' },
            { amount: '$15,000.00', description: 'Transfer from Operations', date: 'Nov 15, 2024', type: 'credit' },
            { amount: '$112.50', description: 'Interest earned', date: 'Nov 1, 2024', type: 'credit' },
            { amount: '$20,000.00', description: 'Initial deposit', date: 'Oct 15, 2024', type: 'credit' },
          ],
          cards: [
            { name: 'Tax', lastFour: '8432', status: 'Frozen', cardholder: 'Runa Cameron', created: 'May 9' },
          ],
          incomingEarnings: [],
        },
      ],
    },
  ],
};

// Mock data for Single-FA account (one bucket, one account)
const singleAccountData = {
  totalBalance: {
    amount: '$25,092.34',
    currency: 'USD',
  },
  buckets: [
    {
      id: 'main',
      name: 'Main Account',
      accounts: [
        {
          currency: 'USD',
          amount: '$25,092.34',
          accountEnding: '4251',
          transactions: [
            { amount: '$1,234.00', description: 'Transfer from bank account', date: 'Jan 10, 2025', type: 'credit' },
            { amount: '$500.00', description: 'Payment to vendor', date: 'Jan 9, 2025', type: 'debit' },
            { amount: '$2,000.00', description: 'Customer payment received', date: 'Jan 8, 2025', type: 'credit' },
            { amount: '$150.00', description: 'Subscription fee', date: 'Jan 7, 2025', type: 'debit' },
            { amount: '$412.48', description: 'Payment to Eric Liang', date: 'Jan 6, 2025', type: 'debit' },
            { amount: '$32.12', description: 'Court Square Diner', date: 'Jan 6, 2025', type: 'debit' },
            { amount: '$128.03', description: 'Home Depot', date: 'Jan 6, 2025', type: 'debit' },
            { amount: '$76.12', description: 'Wire transfer received', date: 'Jan 6, 2025', type: 'debit' },
          ],
          cards: [
            { name: 'Cam Sackett', lastFour: '2345', status: 'Active', cardholder: 'Cam Sackett', created: 'May 13' },
            { name: 'Ad spend', lastFour: '1726', status: 'Active', cardholder: 'Lulu Siegel', created: 'May 13' },
          ],
          incomingEarnings: [
            { month: 'Jan', day: '14', amount: '$1,523.45', description: 'From Stripe → Main • USD' },
            { month: 'Jan', day: '15', amount: '$2,187.00', description: 'From Stripe → Main • USD' },
            { month: 'Jan', day: '16', amount: '$945.32', description: 'From Stripe → Main • USD' },
          ],
        },
      ],
    },
  ],
};

const EmbeddedView = ({ brand = "" }) => {

  const { getControlVariable } = usePrototype();

  // Get feature flags from platform settings
  const outboundPayments = getControlVariable('outboundPayments');
  const outboundTransfers = getControlVariable('outboundTransfers');
  const financialAddresses = getControlVariable('financialAddresses');
  const accountType = getControlVariable('accountType', 'multi');

  // Select data based on account type
  const financialAccountData = accountType === 'single' ? singleAccountData : multiAccountData;

  // Build currencies list from control variables
  const currenciesObj = getControlVariable('currencies', {});
  const currencies = Object.entries(currenciesObj)
    .filter(([_, enabled]) => enabled)
    .map(([currency]) => currency);

  const [selectedNav, setSelectedNav] = useState('balance');
  const [isCompact, setIsCompact] = useState(window.innerWidth < 1200);

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsCompact(window.innerWidth < 1200);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { id: 'balance', label: 'Balance' },
    { id: 'cards', label: 'Cards' },
    { id: 'recipients', label: 'Recipients' },
  ];

  let sidebarStyles, navItemStyles, navItemSelectedStyles, themeColor, brandName, brandLogo, brandLogoHorizontal;
  switch (brand) {
    case 'default':
      sidebarStyles = 'bg-gradient-to-tr from-gray-200 to-gray-50';
      navItemStyles = 'bg-gray-200 font-medium';
      navItemSelectedStyles = 'bg-white';
      themeColor = '#0085FF';
      brandName = 'Any Platform';
      brandLogo = null;
      brandLogoHorizontal = null;
      break;
    case 'rocketRides':
      sidebarStyles = 'bg-gradient-to-b from-[#27BB86] to-teal-600';
      navItemStyles = 'bg-gray-200 font-medium text-white';
      navItemSelectedStyles = 'bg-white/15 font-medium';
      themeColor = '#27BB86';
      brandName = 'Rocket Rides';
      brandLogo = rocketRidesLogo;
      brandLogoHorizontal = rocketRidesLogoHorizontal;
      break;
  }

  // Content area (shared between layouts)
  const contentArea = (
    <div>
      {selectedNav === 'balance' && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-5">Balance</h2>

          <EmbeddedComponentWrapper componentName="financial-account">
            <FinancialAccount
              outboundPayments={outboundPayments}
              outboundTransfers={outboundTransfers}
              financialAddresses={financialAddresses}
              currencies={currencies}
              data={financialAccountData}
              themeColor={themeColor}
            />
          </EmbeddedComponentWrapper>
        </div>
      )}

      {selectedNav === 'cards' && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-5">Cards</h2>

          <EmbeddedComponentWrapper componentName="issuing-cards-list">
            issuing cards list component
          </EmbeddedComponentWrapper>
        </div>
      )}

      {selectedNav === 'recipients' && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-5">Recipients</h2>

          <EmbeddedComponentWrapper componentName="recipients">
            recipients list component
          </EmbeddedComponentWrapper>
        </div>
      )}
    </div>
  );

  // Compact layout (header at top)
  if (isCompact) {
    return (
      <div className="h-screen bg-white flex flex-col">
        {/* Top Header */}
        <div className={`px-6 py-4 flex items-center justify-between transition-all duration-400 ${sidebarStyles}`}>
          {/* Brand */}
          <div className="flex items-center space-x-3">
            {brandLogoHorizontal ? (
              <img src={brandLogoHorizontal} alt={brandName} className="h-4" />
            ) : (
              <>
                <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center">
                  <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
                </div>
                <span className="text-base font-semibold text-gray-800">{brandName}</span>
              </>
            )}
          </div>

          {/* Navigation Menu */}
          <nav className="flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedNav(item.id)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors hover:cursor-pointer
                  ${navItemStyles} ${selectedNav === item.id
                    ? `${navItemSelectedStyles} font-medium`
                    : 'bg-white/0 hover:bg-white/20'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white p-8 overflow-y-auto">
          {contentArea}
        </div>
      </div>
    );
  }

  // Full layout (sidebar on left)
  return (
    <div className="h-screen bg-white flex">
      {/* Left Sidebar */}
      <div className={`w-[300px] p-6 flex flex-col transition-all duration-400 ${sidebarStyles}`}>
        {/* Platform Header */}
        <div className="flex items-center space-x-3 mb-8">
          {brandLogo ? (
            <div className="flex w-full mt-4 justify-center">
              <img src={brandLogo} alt={brandName} className="w-2/3" />
            </div>
          ) : (
            <>
              <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              </div>
              <span className="text-lg font-semibold text-gray-800">{brandName}</span>
            </>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedNav(item.id)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors hover:cursor-pointer
                ${navItemStyles} ${selectedNav === item.id
                  ? `${navItemSelectedStyles} font-medium`
                  : 'bg-white/0 hover:bg-white/20'
                }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 bg-white p-8 overflow-y-auto">
        {contentArea}
      </div>
    </div>
  );
};

export default EmbeddedView;
