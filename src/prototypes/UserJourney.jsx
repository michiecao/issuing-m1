import React, { useState } from 'react';
import DeckView from './UserJourney/DeckView';
import ProblemContextDeck from './UserJourney/ProblemContextDeck';
import { ChevronRightIcon } from '../components/icons';

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
    <div className="w-full max-w-2xl flex flex-col gap-3">
      {/* Problem context */}
      <button
        onClick={() => onSelect('problem-context')}
        className="w-full text-left flex items-center justify-between px-5 py-4 rounded-xl border bg-white border-gray-200 hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer"
      >
        <div className="font-medium text-gray-900 text-sm">Problem context</div>
        <ChevronRightIcon size={16} />
      </button>

      {/* User flows */}
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
          {flow.available && <ChevronRightIcon size={16} />}
        </button>
      ))}
    </div>
  </div>
);

const UserJourney = () => {
  const [selected, setSelected] = useState(null);

  if (!selected) {
    return <FlowSelection onSelect={setSelected} />;
  }

  if (selected === 'problem-context') {
    return <ProblemContextDeck onBack={() => setSelected(null)} />;
  }

  return <DeckView onBack={() => setSelected(null)} />;
};

export default UserJourney;
