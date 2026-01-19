import React, { useEffect } from 'react';
import { usePrototype } from '../PrototypeContext';
import PlatformView from './Prototype1/PlatformView';
import EmbeddedView from './Prototype1/EmbeddedView';
import PrototypeControlPanel from '../components/PrototypeControlPanel';
import { chevronDownUrl } from '../components/icons';

// Default feature flags for this prototype (shared between both views)
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

const Prototype1 = () => {
  const { getControlVariable, setControlVariable, setControlVariables } = usePrototype();

  // Reset all features to default values
  const handleResetToDefault = () => {
    setControlVariables(featureDefaults);
  };

  // Check if any feature has been changed from default
  const hasChanges = Object.entries(featureDefaults).some(([key, defaultValue]) => {
    const currentValue = getControlVariable(key);
    if (typeof defaultValue === 'object') {
      return JSON.stringify(currentValue) !== JSON.stringify(defaultValue);
    }
    return currentValue !== defaultValue;
  });

  // Initialize feature defaults on mount
  useEffect(() => {
    Object.entries(featureDefaults).forEach(([key, defaultValue]) => {
      if (getControlVariable(key) === undefined) {
        setControlVariable(key, defaultValue);
      }
    });
  }, []);

  // Get current view from control panel
  const currentView = getControlVariable('currentView', 'platform');
  const showWrapper = getControlVariable('showWrapper', true);
  const selectedBrand = getControlVariable('brand', 'rocketRides');
  const accountType = getControlVariable('accountType', 'multi');
  const isFlipped = currentView === 'embedded';

  // Keyboard navigation between views
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        setControlVariable('currentView', currentView === 'platform' ? 'embedded' : 'platform');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setControlVariable, currentView]);

  return (
    <>
      {/* View Container with Scale + Fade transition */}
      <div className="h-screen w-screen relative overflow-hidden">
        {/* Platform View */}
        <div
          className="absolute inset-0 w-full h-full transition-all duration-500 ease-out"
          style={{
            opacity: isFlipped ? 0 : 1,
            transform: isFlipped ? 'scale(0.96)' : 'scale(1)',
            pointerEvents: isFlipped ? 'none' : 'auto',
          }}
        >
          <PlatformView />
        </div>

        {/* Embedded View */}
        <div
          className="absolute inset-0 w-full h-full transition-all duration-500 ease-out"
          style={{
            opacity: isFlipped ? 1 : 0,
            transform: isFlipped ? 'scale(1)' : 'scale(0.96)',
            pointerEvents: isFlipped ? 'auto' : 'none',
          }}
        >
          <EmbeddedView brand={selectedBrand} />
        </div>
      </div>

      {/* Control Panel */}
      <PrototypeControlPanel>
        <div className="space-y-4">
          {/* View Toggle */}
          <div>
            <div className="flex space-x-1 p-1 bg-gray-100 rounded-md transition-colors duration-100">
              <button
                onClick={() => setControlVariable('currentView', 'platform')}
                className={`flex-1 px-2 py-1 text-sm font-medium rounded-md transition-colors ${currentView === 'platform'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-white'
                  }`}
              >
                Platform
              </button>
              <button
                onClick={() => setControlVariable('currentView', 'embedded')}
                className={`flex-1 px-2 py-1 text-sm font-medium rounded-md transition-colors ${currentView === 'embedded'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-white'
                  }`}
              >
                Embedded
              </button>
            </div>
          </div>

          {/* Wrapper Toggle - only show in embedded view */}
          {currentView === 'embedded' && (
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
          )}

          {/* Theme Color Dropdown - only show in embedded view */}
          {currentView === 'embedded' && (
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
          )}

          {/* Account Type Dropdown - only show in embedded view */}
          {currentView === 'embedded' && (
            <div>
              <label className="block text-sm text-gray-700 mb-1">Account Type</label>
              <select
                value={accountType}
                onChange={(e) => setControlVariable('accountType', e.target.value)}
                className="w-full pl-3 pr-8 py-1.5 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 appearance-none bg-no-repeat"
                style={{ backgroundImage: `url("${chevronDownUrl}")`, backgroundPosition: 'right 0.5rem center', backgroundSize: '12px' }}
              >
                <option value="multi">Multi FA</option>
                <option value="single">Single FA</option>
              </select>
            </div>
          )}

          {/* Reset to Default */}
          <button
            onClick={handleResetToDefault}
            disabled={!hasChanges}
            className={`w-full px-3 py-1 text-sm font-medium rounded-md transition-colors border border-gray-300 ${hasChanges
              ? 'text-gray-600 hover:bg-gray-100 cursor-pointer'
              : 'opacity-50 cursor-not-allowed'
              }`}
          >
            Reset to default features
          </button>
        </div>
      </PrototypeControlPanel>
    </>
  );
};

export default Prototype1;
