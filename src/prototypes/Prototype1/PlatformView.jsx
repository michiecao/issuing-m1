import React from 'react';
import { usePrototype } from '../../PrototypeContext';
import * as Icons from '../../components/icons';
import { Sidebar, Header } from '../../components/PlatformLayout';
import { featureDefaults } from '../Prototype1';

// Custom checkbox component
const CustomCheckbox = ({ checked }) => (
  <div
    className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${checked
      ? 'bg-indigo-600 border-indigo-600'
      : 'bg-white border-gray-300'
      }`}
  >
    {checked && (
      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )}
  </div>
);

// Currency checkbox with flag
const CurrencyCheckbox = ({ checked, onChange, currency, FlagIcon, flagSize = 16 }) => (
  <div
    className="flex items-center gap-2 cursor-pointer"
    onClick={() => onChange({ target: { checked: !checked } })}
  >
    <CustomCheckbox checked={checked} />
    <FlagIcon size={flagSize} />
    <span className="text-sm text-gray-700 font-medium">{currency}</span>
  </div>
);

// Enabled badge pill
const EnabledBadge = ({ label }) => (
  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded-sm text-xs text-gray-600">
    <Icons.CheckCircleIcon />
    {label}
  </span>
);

// Toggle component
const Toggle = ({ enabled, onChange }) => (
  <button
    onClick={() => onChange(!enabled)}
    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${enabled ? 'bg-indigo-600' : 'bg-gray-200'
      }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${enabled ? 'translate-x-[18px]' : 'translate-x-[2px]'
        }`}
    />
  </button>
);

// Capability card component
const CapabilityCard = ({ title, description, enabledFor = [], enabled, onToggle }) => (
  <div className="border border-border-default rounded-lg p-4">
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
        </div>
        <p className="text-sm text-gray-500 mt-0.5">{description}</p>
        {enabled && enabledFor.length > 0 && (
          <div className="flex items-center gap-2 mt-3">
            <span className="text-xs text-gray-500">Enabled for:</span>
            <div className="flex gap-1.5">
              {enabledFor.map((item, idx) => (
                <EnabledBadge key={idx} label={item} />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center gap-3">
        {onToggle && <Toggle enabled={enabled} onChange={onToggle} />}
        <button className="px-3 py-1.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
          Edit
        </button>
      </div>
    </div>
  </div>
);

// Add-on product card component
const AddOnCard = ({ icon, title, description, eligibleAccounts, setupTime }) => (
  <div className="border border-border-default rounded-lg p-5 max-w-sm">
    <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center mb-4">
      {icon}
    </div>
    <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
    <p className="text-sm text-gray-500 mt-1">{description}</p>
    <div className="mt-4 space-y-1">
      <p className="text-xs text-gray-500">Eligible accounts: <span className="text-gray-700">{eligibleAccounts}</span></p>
      <p className="text-xs text-gray-500">Est. setup time: <span className="text-gray-700">{setupTime}</span></p>
    </div>
    <button className="mt-4 px-3 py-1.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
      Enable
    </button>
  </div>
);

const PlatformView = () => {
  const { getControlVariable, setControlVariable } = usePrototype();

  // Feature flags that affect the embedded view
  const outboundPayments = getControlVariable('outboundPayments', featureDefaults.outboundPayments);
  const outboundTransfers = getControlVariable('outboundTransfers', featureDefaults.outboundTransfers);
  const inboundTransfers = getControlVariable('inboundTransfers', featureDefaults.inboundTransfers);
  const financialAddresses = getControlVariable('financialAddresses', featureDefaults.financialAddresses);

  // Currency flags
  const currencies = getControlVariable('currencies', featureDefaults.currencies);

  const setCurrency = (currency, value) => {
    setControlVariable('currencies', { ...currencies, [currency]: value });
  };

  return (
    <div className=" bg-white flex flex-row">
      {/* Sidebar */}
      <Sidebar />

      <div className="w-full h-screen flex flex-col min-w-0 relative pb-20 pt-16 overflow-scroll">
        <div className="max-w-[1280px] w-full flex flex-col relative mx-auto">
          <Header />

          <div className="flex-1 p-8">
            {/* Content Header */}
            <div className="mb-4 space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">Financial accounts</h1>
            </div>

            {/* Tabs */}
            <div className="border-b border-border-default mb-8">
              <div className="flex space-x-4">
                <button className="py-3 px-2 border-b-2 border-transparent text-sm font-semibold text-gray-500">
                  Performance
                </button>
                <button className="py-3 px-2 border-b-2 border-transparent text-sm font-semibold text-gray-500">
                  Accounts
                </button>
                <button className="py-3 px-2 border-b-2 border-indigo-600 text-sm font-semibold text-indigo-600">
                  Settings
                </button>
              </div>
            </div>

            <div className="flex flex-row gap-10">
              {/* Main column */}
              <div className="flex-1">
                {/* Supported Currencies */}
                <div className="mb-10">
                  <h2 className="text-lg font-semibold text-gray-900">Supported currencies</h2>
                  <p className="text-sm text-gray-500 mt-1 mb-4">Choose the currencies available for your connected accounts to store in.</p>
                  <div className="grid grid-cols-3 gap-4">
                    <CurrencyCheckbox
                      checked={currencies.USD}
                      onChange={(e) => setCurrency('USD', e.target.checked)}
                      currency="USD"
                      FlagIcon={Icons.USFlag}
                    />
                    <CurrencyCheckbox
                      checked={currencies.CAD}
                      onChange={(e) => setCurrency('CAD', e.target.checked)}
                      currency="CAD"
                      FlagIcon={Icons.CAFlag}
                    />
                    <CurrencyCheckbox
                      checked={currencies.AUD}
                      onChange={(e) => setCurrency('AUD', e.target.checked)}
                      currency="AUD"
                      FlagIcon={Icons.AUFlag}
                    />
                    <CurrencyCheckbox
                      checked={currencies.GBP}
                      onChange={(e) => setCurrency('GBP', e.target.checked)}
                      currency="GBP"
                      FlagIcon={Icons.UKFlag}
                    />
                    <CurrencyCheckbox
                      checked={currencies.EUR}
                      onChange={(e) => setCurrency('EUR', e.target.checked)}
                      currency="EUR"
                      FlagIcon={Icons.EUFlag}
                    />
                  </div>
                </div>

                {/* Capabilities */}
                <div className="mb-10">
                  <h2 className="text-lg font-semibold text-gray-900">Capabilities</h2>
                  <p className="text-sm text-gray-500 mt-1 mb-4">Manage financial features available to your users.</p>
                  <div className="space-y-3">
                    <CapabilityCard
                      title="Outbound transfers"
                      description="Allow users to send funds to external accounts"
                      enabledFor={['Bank account', 'Cards (USD)']}
                      enabled={outboundTransfers}
                      onToggle={(value) => setControlVariable('outboundTransfers', value)}
                    />
                    <CapabilityCard
                      title="Inbound transfers"
                      description="Allow users to receive funds from external accounts"
                      enabledFor={['Bank account']}
                      enabled={inboundTransfers}
                      onToggle={(value) => setControlVariable('inboundTransfers', value)}
                    />
                    <CapabilityCard
                      title="Outbound payments"
                      description="Enable payments to third-party recipients"
                      enabledFor={['Bank account']}
                      enabled={outboundPayments}
                      onToggle={(value) => setControlVariable('outboundPayments', value)}
                    />
                    <CapabilityCard
                      title="Financial addresses"
                      description="Provides users with a financial addresses which can be used for money transfers"
                      enabled={financialAddresses}
                      onToggle={(value) => setControlVariable('financialAddresses', value)}
                    />
                  </div>
                </div>

                {/* Add-on product experiences */}
                <div className="mb-10">
                  <h2 className="text-lg font-semibold text-gray-900">Add-on product experiences</h2>
                  <p className="text-sm text-gray-500 mt-1 mb-4">Manage product experiences available to your users.</p>
                  <AddOnCard
                    icon={<Icons.CardIcon />}
                    title="Expense management with card"
                    description="Users can manage expenses by creating virtual or physical cards to spend from."
                    eligibleAccounts="X"
                    setupTime="1 day"
                  />
                </div>

              </div>

              {/* Right column */}
              <div className="w-[300px] gap-4 flex flex-col">
                <div className="bg-offset rounded-lg p-4 gap-2">
                  <h2 className="text-base font-semibold text-gray-900">Supported connected account surfaces</h2>
                  <p className="text-sm text-gray-500 mt-1 mb-4">Learn how to give your connected accounts access to finance tools in your platform experience.</p>
                  <a className="text-sm text-indigo-600 hover:text-indigo-700" href="#" target="_blank">View docs</a>
                </div>

                <div className="bg-offset rounded-lg p-4 gap-2">
                  <h2 className="text-base font-semibold text-gray-900">Integrate embedded finance</h2>
                  <p className="text-sm text-gray-500 mt-1 mb-4">Learn how to give your connected accounts access to finance tools in your platform experience.</p>
                  <a className="text-sm text-indigo-600 hover:text-indigo-700" href="#" target="_blank">View docs</a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformView;
