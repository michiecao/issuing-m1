import React, { useState } from 'react';
import DeckView from './UserJourney/DeckView';
import DeckViewB from './UserJourney/DeckViewB';
import ProblemContextDeck from './UserJourney/ProblemContextDeck';
import { Icon } from '../icons/SailIcons';

export const featureDefaults = {};
export { featureDefaults as initialVariables };

const flows = [
  {
    id: 'story-1',
    title: 'User story 1: Business joins Stripe to get a card for an on-demand use case',
    directions: [
      {
        id: 'on-demand',
        title: 'Direction A: Distinguish between cards for banking vs. cards for infra',
        available: true,
      },
      {
        id: 'on-demand-b',
        title: 'Direction B: Cards for banking are default, cards for infra are add-ons',
        available: true,
      },
    ],
  },
  {
    id: 'expense',
    title: 'User story 2: Business joins Stripe to get a card for a corporate expense management use case',
    available: false,
  },
];

const FlowSelection = ({ onSelect }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 flex flex-col items-center justify-center px-6">
    <div className="w-full max-w-2xl flex flex-col">
      <h1 className="text-2xl font-light text-default mb-3">Unified cards distribution strategy: Initial explorations</h1>
      <div className="flex items-center gap-2 mb-6">
        <span className="text-sm text-default">@mcao @iman</span>
        <span className="text-sm text-default">|</span>
        <span className="text-sm text-default">In progress</span>
      </div>

      <div className="border-t border-gray-200">
        {/* Problem context */}
        <button
          onClick={() => onSelect('problem-context')}
          className="w-full text-left flex items-center justify-between py-4 border-b border-gray-200 cursor-pointer group"
        >
          <span className="text-sm text-default group-hover:text-[#635bff] transition-colors">Problem context</span>
          <Icon name="chevronRight" size="xsmall" fill="currentColor" className="text-gray-400 group-hover:text-[#635bff] transition-colors" />
        </button>

        {/* User flows */}
        {flows.map((flow) => (
          <div key={flow.id} className="border-b border-gray-200">
            {flow.directions ? (
              <>
                {/* Story with directions — non-clickable header */}
                <div className="py-4">
                  <span className="text-sm text-default">{flow.title}</span>
                </div>
                {/* Direction sub-rows */}
                {flow.directions.map((dir) => (
                  <button
                    key={dir.id}
                    onClick={() => dir.available && onSelect(dir.id)}
                    disabled={!dir.available}
                    className={`w-full text-left flex items-center justify-between pl-5 pr-0 py-3 border-t border-gray-100 transition-colors ${
                      dir.available ? 'cursor-pointer group' : 'cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-sm ${dir.available ? 'text-default group-hover:text-[#635bff] transition-colors' : 'text-gray-400'}`}>
                        {dir.title}
                      </span>
                      {dir.badge && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 whitespace-nowrap">{dir.badge}</span>
                      )}
                    </div>
                    {dir.available && <Icon name="chevronRight" size="xsmall" fill="currentColor" className="text-gray-400 group-hover:text-[#635bff] transition-colors shrink-0" />}
                  </button>
                ))}
              </>
            ) : (
              /* Flat story row */
              <button
                onClick={() => flow.available && onSelect(flow.id)}
                disabled={!flow.available}
                className={`w-full text-left flex items-center justify-between py-4 transition-colors ${
                  flow.available ? 'cursor-pointer group' : 'cursor-not-allowed opacity-50'
                }`}
              >
                <span className={`text-sm ${flow.available ? 'text-default group-hover:text-[#635bff] transition-colors' : 'text-gray-400'}`}>
                  {flow.title}
                </span>
                {flow.available && <Icon name="chevronRight" size="xsmall" fill="currentColor" className="text-gray-400 group-hover:text-[#635bff] transition-colors shrink-0" />}
              </button>
            )}
          </div>
        ))}
      </div>
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

  if (selected === 'on-demand-b') {
    return <DeckViewB onBack={() => setSelected(null)} />;
  }

  return <DeckView onBack={() => setSelected(null)} />;
};

export default UserJourney;
