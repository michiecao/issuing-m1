import React from 'react';
import { usePrototype } from '../PrototypeContext';
import EmbeddedView from './Prototype2/EmbeddedView';
import PlatformView from './Prototype3/PlatformView';
import PrototypeControlPanel from '../components/PrototypeControlPanel';
import { chevronDownUrl } from '../components/icons';

// Default feature flags for this prototype
export const featureDefaults = {
  outboundPayments: true,
  outboundTransfers: true,
  inboundTransfers: true,
  financialAddresses: true,
  currencies: {
    USD: true,
    GBP: false,
    CAD: false,
    AUD: false,
    EUR: false,
  },
};

// Alias for App.jsx compatibility
export { featureDefaults as initialVariables };

// Reset button component for testing
const ResetStateButton = () => {
  const { setVariable } = usePrototype();

  const handleReset = () => {
    // Reset all configuration state to defaults
    setVariable('isConfigActive', false);
    setVariable('isCanadaActive', false);
    setVariable('isUKActive', false);
    
    // Reset current/pending configurations
    setVariable('currencyOptions', ['USD']);
    setVariable('outboundTransferOptions', ['financial_account', 'bank_account']);
    setVariable('inboundTransferOptions', []);
    setVariable('outboundPaymentOptions', []);
    setVariable('financialAddressOptions', []);
    
    // Reset saved configurations to defaults
    setVariable('savedCurrencyOptions', ['USD']);
    setVariable('savedOutboundTransferOptions', ['financial_account', 'bank_account']);
    setVariable('savedInboundTransferOptions', []);
    setVariable('savedOutboundPaymentOptions', []);
    setVariable('savedFinancialAddressOptions', []);
  };

  return (
    <button
      onClick={handleReset}
      className="w-full px-3 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors"
    >
      Reset Configuration State
    </button>
  );
};

const Prototype3 = () => {
  const { getControlVariable, setControlVariable } = usePrototype();

  const currentView = getControlVariable('currentView', 'platform');
  const showWrapper = getControlVariable('showWrapper', true);
  const selectedBrand = getControlVariable('brand', 'rocketRides');
  const accountType = getControlVariable('accountType', 'multi');
  const detailsView = getControlVariable('detailsView', 'dialog');
  const onboardingStep = getControlVariable('onboardingStep', 'none');
  const countryMode = getControlVariable('countryMode', 'single');

  return (
    <>
      <div className="h-screen w-screen relative overflow-hidden flex">
        {/* Platform Configuration View */}
        {currentView === 'platform' && (
          <div className="flex-1">
            <PlatformView />
          </div>
        )}

        {/* Embedded View */}
        {currentView === 'embedded' && (
          <div className="flex-1">
            <EmbeddedView brand={selectedBrand} />
          </div>
        )}

        {/* Side-by-side View */}
        {currentView === 'both' && (
          <>
            <div className="flex-1 border-r border-gray-300">
              <PlatformView />
            </div>
            <div className="flex-1">
              <EmbeddedView brand={selectedBrand} />
            </div>
          </>
        )}
      </div>

      {/* Control Panel */}
      <PrototypeControlPanel>
        <div className="space-y-4">
          {/* View Toggle */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">View</label>
            <select
              value={currentView}
              onChange={(e) => setControlVariable('currentView', e.target.value)}
              className="w-full pl-3 pr-8 py-1.5 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 appearance-none bg-no-repeat"
              style={{ backgroundImage: `url("${chevronDownUrl}")`, backgroundPosition: 'right 0.5rem center', backgroundSize: '12px' }}
            >
              <option value="platform">Platform Config</option>
              <option value="embedded">Embedded Only</option>
              <option value="both">Side by Side</option>
            </select>
          </div>

          {/* Wrapper Toggle */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setControlVariable('showWrapper', !showWrapper)}
          >
            <label className="relative inline-flex items-center cursor-pointer pointer-events-none">
              <input
                type="checkbox"
                checked={showWrapper}
                readOnly
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
            <span className="text-sm text-gray-700">Show embedded bounds</span>
          </div>

          {/* Brand Dropdown */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Brand</label>
            <select
              value={selectedBrand}
              onChange={(e) => setControlVariable('brand', e.target.value)}
              className="w-full pl-3 pr-8 py-1.5 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 appearance-none bg-no-repeat"
              style={{ backgroundImage: `url("${chevronDownUrl}")`, backgroundPosition: 'right 0.5rem center', backgroundSize: '12px' }}
            >
              <option value="default">Default</option>
              <option value="rocketRides">Rocket Rides</option>
            </select>
          </div>

          {/* Account Type Dropdown */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Account Type</label>
            <select
              value={accountType}
              onChange={(e) => setControlVariable('accountType', e.target.value)}
              className="w-full pl-3 pr-8 py-1.5 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 appearance-none bg-no-repeat"
              style={{ backgroundImage: `url("${chevronDownUrl}")`, backgroundPosition: 'right 0.5rem center', backgroundSize: '12px' }}
            >
              <option value="multi">Multi FA</option>
              <option value="singleMultiCurrency">Single FA + Multi Currency</option>
              <option value="single">Single FA + Single Currency</option>
            </select>
          </div>

          {/* Show Details In Dropdown */}
          <div className={accountType !== 'multi' ? 'opacity-50' : ''}>
            <label className="block text-sm text-gray-700 mb-1">Show details in</label>
            <select
              value={detailsView}
              onChange={(e) => setControlVariable('detailsView', e.target.value)}
              disabled={accountType !== 'multi'}
              className={`w-full pl-3 pr-8 py-1.5 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 appearance-none bg-no-repeat ${accountType !== 'multi' ? 'cursor-not-allowed' : ''}`}
              style={{ backgroundImage: `url("${chevronDownUrl}")`, backgroundPosition: 'right 0.5rem center', backgroundSize: '12px' }}
            >
              <option value="fullPage">Full page</option>
              <option value="dialog">Dialog</option>
            </select>
          </div>

          {/* Onboarding Step Dropdown */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Onboarding Step</label>
            <select
              value={onboardingStep}
              onChange={(e) => setControlVariable('onboardingStep', e.target.value)}
              className="w-full pl-3 pr-8 py-1.5 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 appearance-none bg-no-repeat"
              style={{ backgroundImage: `url("${chevronDownUrl}")`, backgroundPosition: 'right 0.5rem center', backgroundSize: '12px' }}
            >
              <option value="none">None (Complete)</option>
              <option value="welcome">1. Welcome</option>
              <option value="features">2. Feature Selection</option>
              <option value="currencies">3. Currency Setup</option>
              <option value="accounts">4. Account Configuration</option>
              <option value="review">5. Review & Launch</option>
            </select>
          </div>

          {/* Country Mode Toggle */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Country Mode</label>
            <select
              value={countryMode}
              onChange={(e) => setControlVariable('countryMode', e.target.value)}
              className="w-full pl-3 pr-8 py-1.5 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 appearance-none bg-no-repeat"
              style={{ backgroundImage: `url("${chevronDownUrl}")`, backgroundPosition: 'right 0.5rem center', backgroundSize: '12px' }}
            >
              <option value="single">Single Country</option>
              <option value="multi">Multi-Country</option>
            </select>
          </div>

          {/* Reset State Button */}
          <ResetStateButton />
        </div>
      </PrototypeControlPanel>
    </>
  );
};

export default Prototype3;
