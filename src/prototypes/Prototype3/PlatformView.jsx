import React from 'react';
import { usePrototype } from '../../PrototypeContext';
import * as Icons from '../../components/icons';
import { Sidebar, Header } from '../../components/PlatformLayout';
import { featureDefaults } from '../Prototype3';

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

// Onboarding Welcome Step
const WelcomeStep = ({ onNext }) => (
  <div className="flex-1 flex items-center justify-center p-8">
    <div className="max-w-2xl text-center space-y-6">
      <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
        <Icons.CardIcon size={40} />
      </div>
      <h1 className="text-4xl font-bold text-gray-900">Welcome to Financial Accounts</h1>
      <p className="text-lg text-gray-600">
        Set up financial accounts for your platform in just a few steps. Enable money movement,
        multi-currency support, and embedded finance experiences for your connected accounts.
      </p>
      <div className="pt-4">
        <button
          onClick={onNext}
          className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Get started
        </button>
      </div>
      <div className="flex items-center justify-center gap-8 pt-8 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Icons.CheckCircleIcon />
          <span>5 minute setup</span>
        </div>
        <div className="flex items-center gap-2">
          <Icons.CheckCircleIcon />
          <span>No code required</span>
        </div>
        <div className="flex items-center gap-2">
          <Icons.CheckCircleIcon />
          <span>Live in minutes</span>
        </div>
      </div>
    </div>
  </div>
);

// Feature Selection Step
const FeaturesStep = ({ onNext, onBack }) => {
  const { getVariable, setVariable } = usePrototype();

  const outboundPayments = getVariable('outboundPayments', featureDefaults.outboundPayments);
  const outboundTransfers = getVariable('outboundTransfers', featureDefaults.outboundTransfers);
  const inboundTransfers = getVariable('inboundTransfers', featureDefaults.inboundTransfers);
  const financialAddresses = getVariable('financialAddresses', featureDefaults.financialAddresses);

  const FeatureCard = ({ icon, title, description, enabled, onChange, recommended }) => (
    <div
      className={`border-2 rounded-lg p-5 cursor-pointer transition-all ${enabled
        ? 'border-indigo-600 bg-indigo-50'
        : 'border-gray-200 hover:border-gray-300'
        }`}
      onClick={() => onChange(!enabled)}
    >
      <div className="flex items-start gap-4">
        <div className="mt-1">
          <CustomCheckbox checked={enabled} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 bg-indigo-100 rounded flex items-center justify-center">
              {icon}
            </div>
            <h3 className="text-base font-semibold text-gray-900">{title}</h3>
            {recommended && (
              <span className="px-2 py-0.5 bg-indigo-600 text-white text-xs font-medium rounded">
                Recommended
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 ml-10">{description}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded">
              STEP 1 OF 4
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Select features</h1>
          <p className="text-gray-600">
            Choose which financial capabilities you want to enable for your connected accounts.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <FeatureCard
            icon={<Icons.CardIcon size={16} />}
            title="Outbound transfers"
            description="Allow connected accounts to send money to external bank accounts and cards"
            enabled={outboundTransfers}
            onChange={(value) => setVariable('outboundTransfers', value)}
            recommended
          />
          <FeatureCard
            icon={<Icons.CardIcon size={16} />}
            title="Inbound transfers"
            description="Allow connected accounts to receive money from external sources"
            enabled={inboundTransfers}
            onChange={(value) => setVariable('inboundTransfers', value)}
            recommended
          />
          <FeatureCard
            icon={<Icons.CardIcon size={16} />}
            title="Outbound payments"
            description="Enable payments to third-party recipients via multiple payment methods"
            enabled={outboundPayments}
            onChange={(value) => setVariable('outboundPayments', value)}
          />
          <FeatureCard
            icon={<Icons.CardIcon size={16} />}
            title="Financial addresses"
            description="Provide connected accounts with unique account and routing numbers"
            enabled={financialAddresses}
            onChange={(value) => setVariable('financialAddresses', value)}
          />
        </div>

        <div className="flex items-center justify-between pt-6 border-t">
          <button
            onClick={onBack}
            className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
          >
            Back
          </button>
          <button
            onClick={onNext}
            className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

// Currency Setup Step
const CurrenciesStep = ({ onNext, onBack }) => {
  const { getVariable, setVariable } = usePrototype();

  const currencies = getVariable('currencies', featureDefaults.currencies);

  const setCurrency = (currency, value) => {
    setVariable('currencies', { ...currencies, [currency]: value });
  };

  const selectedCount = Object.values(currencies).filter(Boolean).length;

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded">
              STEP 2 OF 4
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Select currencies</h1>
          <p className="text-gray-600">
            Choose which currencies your connected accounts can hold and transact in.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="text-blue-600 mt-0.5">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-blue-900 mb-1">Multi-currency accounts</h3>
              <p className="text-sm text-blue-800">
                Connected accounts can hold balances in multiple currencies simultaneously.
                Currency conversion is available for supported currency pairs.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6 mb-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Selected currencies ({selectedCount})
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4 space-y-3">
                <CurrencyCheckbox
                  checked={currencies.USD}
                  onChange={(e) => setCurrency('USD', e.target.checked)}
                  currency="USD"
                  FlagIcon={Icons.USFlag}
                />
                <div className="text-xs text-gray-500 ml-6">United States Dollar</div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 space-y-3">
                <CurrencyCheckbox
                  checked={currencies.EUR}
                  onChange={(e) => setCurrency('EUR', e.target.checked)}
                  currency="EUR"
                  FlagIcon={Icons.EUFlag}
                />
                <div className="text-xs text-gray-500 ml-6">Euro</div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 space-y-3">
                <CurrencyCheckbox
                  checked={currencies.GBP}
                  onChange={(e) => setCurrency('GBP', e.target.checked)}
                  currency="GBP"
                  FlagIcon={Icons.UKFlag}
                />
                <div className="text-xs text-gray-500 ml-6">British Pound Sterling</div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 space-y-3">
                <CurrencyCheckbox
                  checked={currencies.CAD}
                  onChange={(e) => setCurrency('CAD', e.target.checked)}
                  currency="CAD"
                  FlagIcon={Icons.CAFlag}
                />
                <div className="text-xs text-gray-500 ml-6">Canadian Dollar</div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 space-y-3">
                <CurrencyCheckbox
                  checked={currencies.AUD}
                  onChange={(e) => setCurrency('AUD', e.target.checked)}
                  currency="AUD"
                  FlagIcon={Icons.AUFlag}
                />
                <div className="text-xs text-gray-500 ml-6">Australian Dollar</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t">
          <button
            onClick={onBack}
            className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
          >
            Back
          </button>
          <button
            onClick={onNext}
            disabled={selectedCount === 0}
            className={`px-6 py-2 font-medium rounded-lg transition-colors ${selectedCount > 0
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

// Account Configuration Step
const AccountsStep = ({ onNext, onBack }) => {
  const { getControlVariable, setControlVariable } = usePrototype();

  const accountType = getControlVariable('accountType', 'multi');

  const AccountTypeCard = ({ value, title, description, recommended }) => {
    const isSelected = accountType === value;
    return (
      <div
        className={`border-2 rounded-lg p-5 cursor-pointer transition-all ${isSelected
          ? 'border-indigo-600 bg-indigo-50'
          : 'border-gray-200 hover:border-gray-300'
          }`}
        onClick={() => setControlVariable('accountType', value)}
      >
        <div className="flex items-start gap-4">
          <div className="mt-1">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-indigo-600' : 'border-gray-300'
              }`}>
              {isSelected && <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>}
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-base font-semibold text-gray-900">{title}</h3>
              {recommended && (
                <span className="px-2 py-0.5 bg-indigo-600 text-white text-xs font-medium rounded">
                  Recommended
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded">
              STEP 3 OF 4
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Configure account structure</h1>
          <p className="text-gray-600">
            Choose how you want to structure financial accounts for your connected accounts.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <AccountTypeCard
            value="multi"
            title="Multiple financial accounts"
            description="Connected accounts can create multiple FA buckets (e.g., Operations, Savings, Tax). Each bucket can hold multiple currencies."
            recommended
          />
          <AccountTypeCard
            value="singleMultiCurrency"
            title="Single account with multiple currencies"
            description="Connected accounts get one FA bucket that can hold balances in multiple currencies simultaneously."
          />
          <AccountTypeCard
            value="single"
            title="Single account with single currency"
            description="Connected accounts get one FA bucket with one primary currency. Simplest setup for basic use cases."
          />
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">What's a Financial Account?</h3>
          <p className="text-sm text-gray-600">
            Financial Accounts are Stripe-held accounts that store funds for your connected accounts.
            Think of them like bank accounts, but built into Stripe. Connected accounts can organize
            money into different "buckets" for different purposes.
          </p>
        </div>

        <div className="flex items-center justify-between pt-6 border-t">
          <button
            onClick={onBack}
            className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
          >
            Back
          </button>
          <button
            onClick={onNext}
            className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

// Review & Launch Step
const ReviewStep = ({ onLaunch, onBack }) => {
  const { getVariable, getControlVariable } = usePrototype();

  const outboundPayments = getVariable('outboundPayments', featureDefaults.outboundPayments);
  const outboundTransfers = getVariable('outboundTransfers', featureDefaults.outboundTransfers);
  const inboundTransfers = getVariable('inboundTransfers', featureDefaults.inboundTransfers);
  const financialAddresses = getVariable('financialAddresses', featureDefaults.financialAddresses);

  const currencies = getVariable('currencies', featureDefaults.currencies);
  const selectedCurrencies = Object.entries(currencies)
    .filter(([_, enabled]) => enabled)
    .map(([currency]) => currency);

  const accountType = getControlVariable('accountType', 'multi');
  const accountTypeLabel = accountType === 'multi'
    ? 'Multiple financial accounts'
    : accountType === 'singleMultiCurrency'
      ? 'Single account with multiple currencies'
      : 'Single account with single currency';

  const enabledFeatures = [];
  if (outboundTransfers) enabledFeatures.push('Outbound transfers');
  if (inboundTransfers) enabledFeatures.push('Inbound transfers');
  if (outboundPayments) enabledFeatures.push('Outbound payments');
  if (financialAddresses) enabledFeatures.push('Financial addresses');

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded">
              STEP 4 OF 4
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Review and launch</h1>
          <p className="text-gray-600">
            Review your configuration before launching Financial Accounts for your platform.
          </p>
        </div>

        <div className="space-y-6 mb-8">
          {/* Features Summary */}
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900">Features</h3>
              <button
                onClick={() => getControlVariable('setOnboardingStep')('features')}
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Edit
              </button>
            </div>
            <div className="space-y-2">
              {enabledFeatures.length > 0 ? (
                enabledFeatures.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Icons.CheckCircleIcon />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No features enabled</p>
              )}
            </div>
          </div>

          {/* Currencies Summary */}
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900">Currencies</h3>
              <button
                onClick={() => getControlVariable('setOnboardingStep')('currencies')}
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Edit
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedCurrencies.map((currency) => (
                <span
                  key={currency}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded"
                >
                  {currency}
                </span>
              ))}
            </div>
          </div>

          {/* Account Structure Summary */}
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900">Account structure</h3>
              <button
                onClick={() => getControlVariable('setOnboardingStep')('accounts')}
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Edit
              </button>
            </div>
            <p className="text-sm text-gray-700">{accountTypeLabel}</p>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="text-green-600 mt-0.5">
              <Icons.CheckCircleIcon />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-green-900 mb-1">Ready to launch</h3>
              <p className="text-sm text-green-800">
                Your Financial Accounts configuration is complete. Click "Launch" to make these
                features available to your connected accounts.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t">
          <button
            onClick={onBack}
            className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
          >
            Back
          </button>
          <button
            onClick={onLaunch}
            className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            Launch Financial Accounts
          </button>
        </div>
      </div>
    </div>
  );
};

// Negative circle icon for "Not enabled" status
const NegativeCircleIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 10.875C8.69272 10.875 10.875 8.69272 10.875 5.99999C10.875 3.30626 8.69998 1.125 6 1.125C3.30727 1.125 1.125 3.30727 1.125 5.99999C1.125 8.69272 3.30728 10.875 6 10.875ZM6 12C9.31405 12 12 9.31404 12 5.99999C12 2.68595 9.32231 0 6 0C2.68595 0 0 2.68595 0 5.99999C0 9.31404 2.68595 12 6 12Z"
      fill="#6C7688"
    />
    <path d="M3 6H9" stroke="#6C7688" strokeWidth="1.125" strokeLinecap="round" />
  </svg>
);

// Capability options configuration
const capabilityOptions = {
  currencies: {
    title: 'Edit supported currencies',
    description: 'Select which currencies accounts can hold.',
    options: [
      { id: 'USD', label: 'USD - US Dollar' },
      { id: 'EUR', label: 'EUR - Euro' },
      { id: 'GBP', label: 'GBP - British Pound' },
      { id: 'CAD', label: 'CAD - Canadian Dollar' },
      { id: 'AUD', label: 'AUD - Australian Dollar' },
    ],
  },
  outboundTransfers: {
    title: 'Enable outbound transfers',
    description: 'Select the destination types allowed for this capability.',
    options: [
      { id: 'financial_account', label: 'Financial account' },
      { id: 'bank_account', label: 'Bank account' },
      { id: 'crypto_wallet', label: 'Crypto wallet' },
    ],
  },
  inboundTransfers: {
    title: 'Enable inbound transfers',
    description: 'Select the source types allowed for this capability.',
    options: [
      { id: 'financial_account', label: 'Financial account' },
      { id: 'bank_account', label: 'Bank account' },
      { id: 'crypto_wallet', label: 'Crypto wallet' },
    ],
  },
  outboundPayments: {
    title: 'Enable outbound payments',
    description: 'Select the payment methods allowed for this capability.',
    options: [
      { id: 'ach', label: 'ACH transfer' },
      { id: 'wire', label: 'Wire transfer' },
      { id: 'check', label: 'Check' },
    ],
  },
  financialAddresses: {
    title: 'Enable financial addresses',
    description: 'Select the address types to enable.',
    options: [
      { id: 'aba', label: 'ABA routing number' },
      { id: 'swift', label: 'SWIFT/BIC code' },
    ],
  },
};

// Checkbox component for the modal
const ModalCheckbox = ({ checked, onChange, label }) => (
  <div
    onClick={onChange}
    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
      checked
        ? 'border-2 border-[#675DFF]'
        : 'border border-[#D8DEE4] hover:border-gray-300'
    }`}
  >
    <div
      className={`w-[14px] h-[14px] rounded flex items-center justify-center flex-shrink-0 ${
        checked ? 'bg-[#675DFF] border border-[#675DFF]' : 'border border-[#D8DEE4] bg-white'
      }`}
    >
      {checked && (
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
          <path
            d="M1 4L3.5 6.5L9 1"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
    <span className="text-sm font-medium text-gray-900">{label}</span>
  </div>
);

// Capability Editor Modal
const CapabilityEditorModal = ({ isOpen, onClose, capabilityKey, selectedOptions, onSave }) => {
  const [localOptions, setLocalOptions] = React.useState(selectedOptions || []);
  const config = capabilityOptions[capabilityKey];

  React.useEffect(() => {
    setLocalOptions(selectedOptions || []);
  }, [selectedOptions, isOpen]);

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  if (!isOpen || !config) return null;

  const toggleOption = (optionId) => {
    setLocalOptions((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId]
    );
  };

  const handleSave = () => {
    onSave(localOptions);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-xl w-[344px] p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-900">{config.title}</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded text-gray-500"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M9 3L3 9M3 3L9 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 mb-4">{config.description}</p>

        {/* Options */}
        <div className="space-y-2 mb-4">
          {config.options.map((option) => (
            <ModalCheckbox
              key={option.id}
              checked={localOptions.includes(option.id)}
              onChange={() => toggleOption(option.id)}
              label={option.label}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-lg hover:bg-indigo-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

// Main configuration view (after onboarding complete)
// Toast notification component
const Toast = ({ isVisible, onClose, message }) => {
  React.useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // Auto-dismiss after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center bg-[#353A44] rounded-md overflow-hidden"
      style={{
        boxShadow: '0px 15px 35px 0px rgba(48,49,61,0.08), 0px 5px 15px 0px rgba(0,0,0,0.12)'
      }}
    >
      <div className="px-4 py-3">
        <p className="text-sm text-white leading-5 tracking-[-0.15px]">{message}</p>
      </div>
      <div className="flex items-center self-stretch border-l border-white/20">
        <button 
          onClick={onClose}
          className="px-4 py-3 hover:bg-white/10 transition-colors h-full"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M9 3L3 9M3 3L9 9"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Confirmation Modal for applying changes
const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
      />

      {/* Modal */}
      <div 
        className="relative bg-white rounded-lg w-[496px] overflow-hidden"
        style={{
          boxShadow: '0px 15px 35px 0px rgba(48,49,61,0.08), 0px 5px 15px 0px rgba(0,0,0,0.12)'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <h3 className="text-base font-bold text-[#353A44]">Review and apply changes</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded text-gray-500"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M9 3L3 9M3 3L9 9"
                stroke="#474E5A"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-4 pb-0">
          <p className="text-sm text-[#353A44] leading-5">
            These updates will roll out to <span className="font-bold">100 accounts</span> in the <span className="font-bold">United States</span>. It may take a day to apply them to all accounts.
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 p-4">
          <button
            onClick={onClose}
            className="px-2 py-1 h-7 text-sm font-semibold text-[#353A44] bg-white rounded-md hover:bg-gray-50 transition-colors"
            style={{
              boxShadow: '0px 1px 1px 0px rgba(26,27,37,0.16), 0px 0px 0px 1px #d5dbe1'
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-2 py-1 h-7 text-sm font-semibold text-white bg-[#675DFF] rounded-md hover:bg-[#5b52e5] transition-colors"
            style={{
              boxShadow: '0px 1px 1px 0px rgba(20,19,78,0.32), 0px 0px 0px 1px #625afa'
            }}
          >
            Apply changes
          </button>
        </div>
      </div>
    </div>
  );
};

// Default configurations
const defaultConfigurations = {
  currencyOptions: ['USD'],
  outboundTransferOptions: ['financial_account', 'bank_account'],
  inboundTransferOptions: [],
  outboundPaymentOptions: [],
  financialAddressOptions: [],
};

// Countries data for multi-country view
const countriesData = [
  {
    id: 'us',
    name: 'United States',
    FlagIcon: Icons.USFlag,
    eligibleAccounts: 100,
  },
  {
    id: 'ca',
    name: 'Canada',
    FlagIcon: Icons.CAFlag,
    eligibleAccounts: 100,
  },
  {
    id: 'gb',
    name: 'United Kingdom',
    FlagIcon: Icons.UKFlag,
    eligibleAccounts: 100,
  },
];

// Chevron icons for expand/collapse
const ChevronDownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="#6C7688" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.5 2.5L8 6L4.5 9.5" stroke="#6C7688" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ConfigurationView = () => {
  const { getVariable, setVariable, getControlVariable } = usePrototype();

  const currencies = getVariable('currencies', featureDefaults.currencies);
  const selectedCurrencies = Object.entries(currencies)
    .filter(([_, enabled]) => enabled)
    .map(([currency]) => currency);

  const [activePageTab, setActivePageTab] = React.useState('configurations');

  // Multi-country mode from control panel
  const countryMode = getControlVariable('countryMode', 'single');
  const isMultiCountry = countryMode === 'multi';

  // Track which countries are expanded (for multi-country view)
  const [expandedCountries, setExpandedCountries] = React.useState({
    us: true,
    ca: true,
    gb: false,
  });

  const toggleCountryExpanded = (countryId) => {
    setExpandedCountries(prev => ({
      ...prev,
      [countryId]: !prev[countryId],
    }));
  };

  // Capability editor modal state
  const [editingCapability, setEditingCapability] = React.useState(null);

  // Get CURRENT (pending) capability options - what user is editing
  const outboundTransferOptions = getVariable('outboundTransferOptions', defaultConfigurations.outboundTransferOptions);
  const inboundTransferOptions = getVariable('inboundTransferOptions', defaultConfigurations.inboundTransferOptions);
  const outboundPaymentOptions = getVariable('outboundPaymentOptions', defaultConfigurations.outboundPaymentOptions);
  const financialAddressOptions = getVariable('financialAddressOptions', defaultConfigurations.financialAddressOptions);
  const currencyOptions = getVariable('currencyOptions', defaultConfigurations.currencyOptions);

  // Get SAVED configurations - what has been applied
  const savedOutboundTransferOptions = getVariable('savedOutboundTransferOptions', defaultConfigurations.outboundTransferOptions);
  const savedInboundTransferOptions = getVariable('savedInboundTransferOptions', defaultConfigurations.inboundTransferOptions);
  const savedOutboundPaymentOptions = getVariable('savedOutboundPaymentOptions', defaultConfigurations.outboundPaymentOptions);
  const savedFinancialAddressOptions = getVariable('savedFinancialAddressOptions', defaultConfigurations.financialAddressOptions);
  const savedCurrencyOptions = getVariable('savedCurrencyOptions', defaultConfigurations.currencyOptions);

  // Configuration active state - per country tracking
  // US uses the global isConfigActive, UK and Canada start as inactive
  const isConfigActive = getVariable('isConfigActive', false);
  const isCanadaActive = getVariable('isCanadaActive', false);
  const isUKActive = getVariable('isUKActive', false);

  // Helper to get active state for a country
  const getCountryActiveState = (countryId) => {
    switch (countryId) {
      case 'us': return isConfigActive;
      case 'ca': return isCanadaActive;
      case 'gb': return isUKActive;
      default: return false;
    }
  };

  // Check if current configurations differ from saved configurations
  const arraysEqual = (a, b) => {
    if (a.length !== b.length) return false;
    const sortedA = [...a].sort();
    const sortedB = [...b].sort();
    return sortedA.every((val, idx) => val === sortedB[idx]);
  };

  const hasUnsavedChanges = 
    !arraysEqual(outboundTransferOptions, savedOutboundTransferOptions) ||
    !arraysEqual(inboundTransferOptions, savedInboundTransferOptions) ||
    !arraysEqual(outboundPaymentOptions, savedOutboundPaymentOptions) ||
    !arraysEqual(financialAddressOptions, savedFinancialAddressOptions) ||
    !arraysEqual(currencyOptions, savedCurrencyOptions);

  // Confirmation modal state
  const [showConfirmationModal, setShowConfirmationModal] = React.useState(false);

  // Toast state
  const [showToast, setShowToast] = React.useState(false);

  // Helper to get display value for capability
  const getCapabilityValue = (options, optionsConfig) => {
    if (options.length === 0) return 'Not enabled';
    const labels = options.map(id => {
      const opt = optionsConfig.find(o => o.id === id);
      return opt ? opt.label : id;
    });
    return labels.join(', ');
  };

  // Handle saving capability options
  const handleSaveCapability = (capabilityKey, options) => {
    switch (capabilityKey) {
      case 'outboundTransfers':
        setVariable('outboundTransferOptions', options);
        break;
      case 'inboundTransfers':
        setVariable('inboundTransferOptions', options);
        break;
      case 'outboundPayments':
        setVariable('outboundPaymentOptions', options);
        break;
      case 'financialAddresses':
        setVariable('financialAddressOptions', options);
        break;
      case 'currencies':
        setVariable('currencyOptions', options);
        break;
    }
  };

  // Info icon with tooltip (smaller, 12px version)
  const InfoIconWithTooltip = ({ tooltip }) => {
    const [showTooltip, setShowTooltip] = React.useState(false);
    
    return (
      <div 
        className="relative inline-flex"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.75 1.75H3.25C2.42157 1.75 1.75 2.42157 1.75 3.25V8.75C1.75 9.57843 2.42157 10.25 3.25 10.25H8.75C9.57843 10.25 10.25 9.57843 10.25 8.75V3.25C10.25 2.42157 9.57843 1.75 8.75 1.75ZM3.25 0.25C1.59315 0.25 0.25 1.59315 0.25 3.25V8.75C0.25 10.4069 1.59315 11.75 3.25 11.75H8.75C10.4069 11.75 11.75 10.4069 11.75 8.75V3.25C11.75 1.59315 10.4069 0.25 8.75 0.25H3.25Z"
            fill="#6C7688"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.48182 6.49998C4.48182 6.11338 4.79522 5.79998 5.18182 5.79998H6.27273C6.65933 5.79998 6.97273 6.11338 6.97273 6.49998V8.49998C6.97273 8.88658 6.65933 9.19998 6.27273 9.19998C5.88613 9.19998 5.57273 8.88658 5.57273 8.49998V7.19998H5.18182C4.79522 7.19998 4.48182 6.88658 4.48182 6.49998Z"
            fill="#6C7688"
          />
          <path
            d="M4.99994 3.99999C4.99994 3.44858 5.44854 2.99999 5.99994 2.99999C6.55134 2.99999 6.99994 3.44858 6.99994 3.99999C6.99994 4.55139 6.55134 4.99999 5.99994 4.99999C5.44854 4.99999 4.99994 4.55139 4.99994 3.99999Z"
            fill="#6C7688"
          />
    </svg>
        {showTooltip && tooltip && (
          <div 
            className="absolute left-full ml-2 top-1/2 -translate-y-1/2 p-4 bg-white border border-[#D8DEE4] rounded-lg z-50 w-[268px]"
            style={{ 
              boxShadow: '0px 2px 5px 0px rgba(64,68,82,0.08), 0px 3px 9px 0px rgba(64,68,82,0.08)'
            }}
          >
            <p className="text-sm text-[#596171] leading-5 tracking-[-0.15px]">{tooltip}</p>
          </div>
        )}
      </div>
    );
  };

  // Three dot menu icon (horizontal)
  const MenuIcon = () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="2" cy="6" r="1" fill="#6C7688" />
      <circle cx="6" cy="6" r="1" fill="#6C7688" />
      <circle cx="10" cy="6" r="1" fill="#6C7688" />
    </svg>
  );

  const CapabilityRow = ({ title, value, enabled = false, hasInfo = true, tooltip, onEdit }) => (
    <div className="flex items-center py-2.5 border-b border-gray-100 last:border-b-0">
      <div className="flex items-center gap-1.5 w-[150px]">
        <span className="text-xs font-medium text-gray-700">{title}</span>
        {hasInfo && <InfoIconWithTooltip tooltip={tooltip} />}
      </div>
      <div className="flex-1 flex items-center gap-1 ml-6">
        {enabled ? (
          <Icons.CheckCircleIcon />
        ) : (
          <NegativeCircleIcon />
        )}
        <span className={`text-xs ${enabled ? 'text-gray-700' : 'text-gray-500'}`}>{value}</span>
      </div>
      <button 
        className="p-1 hover:bg-gray-100 rounded"
        onClick={onEdit}
      >
        <MenuIcon />
      </button>
    </div>
  );

  return (
    <div className="bg-white flex flex-row">
      <Sidebar />

      <div className="w-full h-screen flex flex-col min-w-0 relative pb-20 pt-16 overflow-scroll">
        <div className="max-w-[1280px] w-full flex flex-col relative mx-auto">
          <Header />

          <div className="flex-1 px-10 py-8">
            {/* Page Header with Tabs */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
              <h1 className="text-2xl font-semibold text-gray-900">Financial accounts</h1>
                <button className="p-1.5 hover:bg-gray-100 rounded">
                  <Icons.MoreIcon />
                </button>
            </div>

              {/* Page-level Tabs */}
              <div className="border-b border-gray-200">
                <div className="flex gap-4">
                        <button
                    onClick={() => setActivePageTab('performance')}
                          className={`pb-2 text-sm font-medium transition-colors ${
                      activePageTab === 'performance'
                        ? 'text-gray-900 border-b-2 border-indigo-600'
                              : 'text-gray-500 hover:text-gray-700'
                          }`}
                        >
                    Performance
                        </button>
                        <button
                    onClick={() => setActivePageTab('financial_accounts')}
                          className={`pb-2 text-sm font-medium transition-colors ${
                      activePageTab === 'financial_accounts'
                        ? 'text-gray-900 border-b-2 border-indigo-600'
                              : 'text-gray-500 hover:text-gray-700'
                          }`}
                        >
                    Financial accounts
                  </button>
                  <button
                    onClick={() => setActivePageTab('configurations')}
                    className={`pb-2 text-sm font-medium transition-colors ${
                      activePageTab === 'configurations'
                        ? 'text-gray-900 border-b-2 border-indigo-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Configurations
                        </button>
                      </div>
                    </div>
                  </div>

            <div className="flex gap-8">
              {/* Main Content */}
              <div className="flex-1 max-w-[682px]">
                {/* Single Country View */}
                {!isMultiCountry && (
                  <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-9 bg-gray-50 rounded flex items-center justify-center">
                          <Icons.USFlag size={16} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">United States</h3>
                          <p className="text-sm text-gray-500">100 {isConfigActive ? 'active' : 'eligible'} accounts</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded ${
                        isConfigActive 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {isConfigActive ? 'Active' : 'Not active'}
                      </span>
                    </div>

                    {/* Capabilities Section */}
                    <div className="mb-6">
                      <h2 className="text-sm font-medium text-gray-900 mb-4">Capabilities</h2>
                      
                      {/* Column Headers */}
                      <div className="flex items-center py-1 border-b border-gray-200 mb-1">
                        <div className="w-[150px]">
                          <span className="text-xs text-gray-500 font-medium">Capabilities</span>
                        </div>
                        <div className="flex-1 ml-6">
                          <span className="text-xs text-gray-500 font-medium">Details</span>
                        </div>
                        <div className="w-5"></div>
                      </div>

                      {/* Capability Rows */}
                      <CapabilityRow
                        title="Supported currencies"
                        value={currencyOptions.length > 0 ? currencyOptions.join(', ') : 'None'}
                        enabled={currencyOptions.length > 0}
                        tooltip="Choose the currencies available for your connected accounts to store in."
                        onEdit={() => setEditingCapability('currencies')}
                      />
                      <CapabilityRow
                        title="Outbound transfers"
                        value={getCapabilityValue(outboundTransferOptions, capabilityOptions.outboundTransfers.options)}
                        enabled={outboundTransferOptions.length > 0}
                        tooltip="Allow users to send funds to external accounts"
                        onEdit={() => setEditingCapability('outboundTransfers')}
                      />
                      <CapabilityRow
                        title="Inbound transfers"
                        value={getCapabilityValue(inboundTransferOptions, capabilityOptions.inboundTransfers.options)}
                        enabled={inboundTransferOptions.length > 0}
                        tooltip="Allow users to receive funds from external accounts"
                        onEdit={() => setEditingCapability('inboundTransfers')}
                      />
                      <CapabilityRow
                        title="Outbound payments"
                        value={getCapabilityValue(outboundPaymentOptions, capabilityOptions.outboundPayments.options)}
                        enabled={outboundPaymentOptions.length > 0}
                        tooltip="Enable payments to third-party recipients"
                        onEdit={() => setEditingCapability('outboundPayments')}
                      />
                      <CapabilityRow
                        title="Financial addresses"
                        value={getCapabilityValue(financialAddressOptions, capabilityOptions.financialAddresses.options)}
                        enabled={financialAddressOptions.length > 0}
                        tooltip="Provides users with financial addresses which can be used for money transfers"
                        onEdit={() => setEditingCapability('financialAddresses')}
                      />
                    </div>

                    {/* Add on products */}
                    <div>
                      <h2 className="text-sm font-medium text-gray-900 mb-4">Add on products</h2>
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icons.CardIcon />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xs font-medium text-gray-900 mb-0.5">
                              Expense management with cards
                            </h3>
                            <p className="text-xs text-gray-500 leading-relaxed">
                              Users can manage expenses by creating virtual or physical cards to spend from. Estimated setup time: 1 day
                            </p>
                          </div>
                          <button className="px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-300 rounded hover:bg-gray-50 flex-shrink-0">
                            Enable
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Review and apply changes button - always show, disabled when no changes */}
                    <button 
                      className={`mt-6 px-4 py-2 text-sm font-semibold rounded transition-colors ${
                        hasUnsavedChanges || !isConfigActive
                          ? 'bg-[#675DFF] text-white hover:bg-[#5b52e5]'
                          : 'bg-white text-[#A3ACB9] border border-[#E3E8EE] cursor-not-allowed'
                      }`}
                      style={hasUnsavedChanges || !isConfigActive ? {
                        boxShadow: '0px 1px 1px 0px rgba(20,19,78,0.32), 0px 0px 0px 1px #625afa'
                      } : {
                        boxShadow: '0px 1px 1px 0px rgba(26,27,37,0.12)'
                      }}
                      onClick={() => setShowConfirmationModal(true)}
                      disabled={!hasUnsavedChanges && isConfigActive}
                    >
                      Review and apply changes
                    </button>
                    </div>
                  )}

                {/* Multi Country View */}
                {isMultiCountry && (
                  <div className="space-y-4">
                    {countriesData.map((country) => {
                      const isExpanded = expandedCountries[country.id];
                      const countryActive = getCountryActiveState(country.id);
                      
                      return (
                        <div 
                          key={country.id}
                          className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                        >
                          {/* Country Header - Always visible */}
                          <div 
                            className="p-4 flex items-center cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => toggleCountryExpanded(country.id)}
                          >
                            {/* Chevron */}
                            <div className="w-7 h-7 flex items-center justify-center">
                              {isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
                </div>

                            {/* Flag and Country Info */}
                            <div className="flex items-center gap-3 flex-1">
                              <div className="w-10 h-9 bg-gray-50 rounded flex items-center justify-center">
                                <country.FlagIcon size={16} />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">{country.name}</h3>
                                <p className="text-sm text-gray-500">{country.eligibleAccounts} {countryActive ? 'active' : 'eligible'} accounts</p>
                              </div>
                            </div>

                            {/* Status Badge */}
                            <span className={`px-2 py-1 text-xs font-medium rounded ${
                              countryActive 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {countryActive ? 'Active' : 'Not active'}
                            </span>
                          </div>

                          {/* Expanded Content */}
                          {isExpanded && (
                            <div className="px-4 pb-4">
                              {/* Capabilities Section */}
                <div className="mb-6">
                                <h2 className="text-sm font-medium text-gray-900 mb-4">Capabilities</h2>
                                
                                {/* Column Headers */}
                                <div className="flex items-center py-1 border-b border-gray-200 mb-1">
                                  <div className="w-[150px]">
                                    <span className="text-xs text-gray-500 font-medium">Capabilities</span>
                                  </div>
                                  <div className="flex-1 ml-6">
                                    <span className="text-xs text-gray-500 font-medium">Details</span>
                                  </div>
                                  <div className="w-5"></div>
                                </div>

                                {/* Capability Rows */}
                                <CapabilityRow
                                  title="Supported currencies"
                                  value={currencyOptions.length > 0 ? currencyOptions.join(', ') : 'None'}
                                  enabled={currencyOptions.length > 0}
                                  tooltip="Choose the currencies available for your connected accounts to store in."
                                  onEdit={() => setEditingCapability('currencies')}
                                />
                                <CapabilityRow
                                  title="Outbound transfers"
                                  value={getCapabilityValue(outboundTransferOptions, capabilityOptions.outboundTransfers.options)}
                                  enabled={outboundTransferOptions.length > 0}
                                  tooltip="Allow users to send funds to external accounts"
                                  onEdit={() => setEditingCapability('outboundTransfers')}
                                />
                                <CapabilityRow
                                  title="Inbound transfers"
                                  value={getCapabilityValue(inboundTransferOptions, capabilityOptions.inboundTransfers.options)}
                                  enabled={inboundTransferOptions.length > 0}
                                  tooltip="Allow users to receive funds from external accounts"
                                  onEdit={() => setEditingCapability('inboundTransfers')}
                                />
                                <CapabilityRow
                                  title="Outbound payments"
                                  value={getCapabilityValue(outboundPaymentOptions, capabilityOptions.outboundPayments.options)}
                                  enabled={outboundPaymentOptions.length > 0}
                                  tooltip="Enable payments to third-party recipients"
                                  onEdit={() => setEditingCapability('outboundPayments')}
                                />
                                <CapabilityRow
                                  title="Financial addresses"
                                  value={getCapabilityValue(financialAddressOptions, capabilityOptions.financialAddresses.options)}
                                  enabled={financialAddressOptions.length > 0}
                                  tooltip="Provides users with financial addresses which can be used for money transfers"
                                  onEdit={() => setEditingCapability('financialAddresses')}
                                />
                              </div>

                              {/* Add on products */}
                              <div className="mb-4">
                                <h2 className="text-sm font-medium text-gray-900 mb-4">Add on products</h2>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                                  <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                      <Icons.CardIcon />
                      </div>
                      <div className="flex-1 min-w-0">
                                      <h3 className="text-xs font-medium text-gray-900 mb-0.5">
                          Expense management with cards
                        </h3>
                                      <p className="text-xs text-gray-500 leading-relaxed">
                                        Users can manage expenses by creating virtual or physical cards to spend from. Estimated setup time: 1 day
                        </p>
                      </div>
                                    <button className="px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-300 rounded hover:bg-gray-50 flex-shrink-0">
                        Enable
                      </button>
                    </div>
                  </div>
                </div>

                              {/* Review and apply changes button */}
                              <button 
                                className={`px-4 py-2 text-sm font-semibold rounded transition-colors ${
                                  hasUnsavedChanges || !countryActive
                                    ? 'bg-[#675DFF] text-white hover:bg-[#5b52e5]'
                                    : 'bg-white text-[#A3ACB9] border border-[#E3E8EE] cursor-not-allowed'
                                }`}
                                style={hasUnsavedChanges || !countryActive ? {
                                  boxShadow: '0px 1px 1px 0px rgba(20,19,78,0.32), 0px 0px 0px 1px #625afa'
                                } : {
                                  boxShadow: '0px 1px 1px 0px rgba(26,27,37,0.12)'
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowConfirmationModal(true);
                                }}
                                disabled={!hasUnsavedChanges && countryActive}
                              >
                                Review and apply changes
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Right Sidebar */}
              <div className="w-[258px] flex-shrink-0 space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">
                    Supported connected account surfaces
                  </h3>
                  <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                    Learn what connected account surfaces these configurations will apply to.
                  </p>
                  <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
                    View docs
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">
                    Use embedded components
                  </h3>
                  <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                    Learn how to give your connected accounts access to finance tools in your platform experience.
                  </p>
                  <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
                    View docs
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Capability Editor Modal */}
      <CapabilityEditorModal
        isOpen={editingCapability !== null}
        onClose={() => setEditingCapability(null)}
        capabilityKey={editingCapability}
        selectedOptions={
          editingCapability === 'outboundTransfers' ? outboundTransferOptions :
          editingCapability === 'inboundTransfers' ? inboundTransferOptions :
          editingCapability === 'outboundPayments' ? outboundPaymentOptions :
          editingCapability === 'financialAddresses' ? financialAddressOptions :
          editingCapability === 'currencies' ? currencyOptions : []
        }
        onSave={(options) => handleSaveCapability(editingCapability, options)}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={() => {
          // Mark configuration as active (for all countries in multi-country mode)
          setVariable('isConfigActive', true);
          setVariable('isCanadaActive', true);
          setVariable('isUKActive', true);
          
          // Save current configurations as the new saved state
          setVariable('savedOutboundTransferOptions', outboundTransferOptions);
          setVariable('savedInboundTransferOptions', inboundTransferOptions);
          setVariable('savedOutboundPaymentOptions', outboundPaymentOptions);
          setVariable('savedFinancialAddressOptions', financialAddressOptions);
          setVariable('savedCurrencyOptions', currencyOptions);
          
          setShowConfirmationModal(false);
          setShowToast(true);
        }}
      />

      {/* Toast notification */}
      <Toast
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        message="Updates are saved and will be applied to selected accounts."
      />
    </div>
  );
};

const PlatformView = () => {
  const { getControlVariable, setControlVariable } = usePrototype();

  const onboardingStep = getControlVariable('onboardingStep', 'none');

  const handleNext = (nextStep) => {
    setControlVariable('onboardingStep', nextStep);
  };

  const handleBack = (prevStep) => {
    setControlVariable('onboardingStep', prevStep);
  };

  const handleLaunch = () => {
    setControlVariable('onboardingStep', 'none');
  };

  // Show appropriate view based on onboarding step
  if (onboardingStep === 'welcome') {
    return <WelcomeStep onNext={() => handleNext('features')} />;
  }

  if (onboardingStep === 'features') {
    return (
      <FeaturesStep
        onNext={() => handleNext('currencies')}
        onBack={() => handleBack('welcome')}
      />
    );
  }

  if (onboardingStep === 'currencies') {
    return (
      <CurrenciesStep
        onNext={() => handleNext('accounts')}
        onBack={() => handleBack('features')}
      />
    );
  }

  if (onboardingStep === 'accounts') {
    return (
      <AccountsStep
        onNext={() => handleNext('review')}
        onBack={() => handleBack('currencies')}
      />
    );
  }

  if (onboardingStep === 'review') {
    return (
      <ReviewStep
        onLaunch={handleLaunch}
        onBack={() => handleBack('accounts')}
      />
    );
  }

  // Default: show configuration view (onboarding complete)
  return <ConfigurationView />;
};

export default PlatformView;
