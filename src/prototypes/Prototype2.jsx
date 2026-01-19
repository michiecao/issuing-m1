import React from 'react';
import { usePrototype } from '../PrototypeContext';
import EmbeddedView from './Prototype2/EmbeddedView';
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

const Prototype2 = () => {
  const { getControlVariable, setControlVariable } = usePrototype();

  const showWrapper = getControlVariable('showWrapper', true);
  const selectedBrand = getControlVariable('brand', 'rocketRides');
  const accountType = getControlVariable('accountType', 'multi');
  const detailsView = getControlVariable('detailsView', 'dialog');

  return (
    <>
      <div className="h-screen w-screen relative overflow-hidden">
        <EmbeddedView brand={selectedBrand} />
      </div>

      {/* Control Panel */}
      <PrototypeControlPanel>
        <div className="space-y-4">
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
        </div>
      </PrototypeControlPanel>
    </>
  );
};

export default Prototype2;
