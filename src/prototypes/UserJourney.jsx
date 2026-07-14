import React, { useState } from 'react';
import DeckView from './UserJourney/DeckView';

export const featureDefaults = {};
export { featureDefaults as initialVariables };

const flows = [
  {
    id: 'on-demand',
    title: 'Business joins Stripe to get a card for an on-demand use case',
    status: 'in-progress',
    available: true,
  },
  {
    id: 'expense',
    title: 'Business joins Stripe to get a card for a corporate expense management use case',
    status: 'not-available',
    available: false,
  },
];

const FlowSelection = ({ onSelect }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 flex flex-col items-center justify-center px-6">
    <div className="w-full max-w-2xl">
      <div className="mb-10">
        <h1 className="text-2xl text-gray-900 mb-2">User Flows</h1>
      </div>
      <div className="flex flex-col gap-3">
        {flows.map((flow) => (
          <button
            key={flow.id}
            onClick={() => flow.available && onSelect(flow.id)}
            disabled={!flow.available}
            className={`w-full text-left flex items-center justify-between px-5 py-4 rounded-xl border transition-all ${
              flow.available
                ? 'bg-white border-gray-200 hover:border-blue-400 hover:shadow-sm cursor-pointer'
                : 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60'
            }`}
          >
            <div className="flex items-center gap-4">
              <div>
                <div className="font-medium text-gray-900 text-sm">{flow.title}</div>
                <div className="mt-1">
                  {flow.available ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      In progress
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                      Not available yet
                    </span>
                  )}
                </div>
              </div>
            </div>
            {flow.available && (
              <svg className="w-5 h-5 text-gray-400 shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  </div>
);

const UserJourney = () => {
  const [selectedFlow, setSelectedFlow] = useState(null);

  if (!selectedFlow) {
    return <FlowSelection onSelect={setSelectedFlow} />;
  }

  return <DeckView />;
};

export default UserJourney;
