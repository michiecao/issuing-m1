import React, { useState } from 'react';
import { Icon } from '../../icons/SailIcons';
import gradientBg from '../../assets/balances-modal-bg.svg';

const ActionButton = ({ iconName, label }) => (
  <button className="flex items-center gap-2 px-3 py-[6px] bg-[#f5f6f8] rounded-full text-[14px] font-semibold text-[#353a44] hover:bg-[#e8eaed] transition-colors tracking-[-0.15px]">
    <Icon name={iconName} size="small" fill="#474E5A" />
    <span>{label}</span>
  </button>
);

const ViewToggle = ({ activeView, onViewChange }) => (
  <div className="flex items-start p-[2px] bg-black/[0.04] rounded-[6px]">
    <button
      onClick={() => onViewChange('grid')}
      className={`flex items-center justify-center w-8 h-8 rounded-[4px] transition-colors ${
        activeView === 'grid' ? 'bg-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.08)]' : 'opacity-80 hover:opacity-100'
      }`}
    >
      <Icon name="gridView" size="small" fill={activeView === 'grid' ? '#474E5A' : '#6C7688'} />
    </button>
    <button
      onClick={() => onViewChange('list')}
      className={`flex items-center justify-center w-8 h-8 rounded-[4px] transition-colors ${
        activeView === 'list' ? 'bg-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.08)]' : 'opacity-80 hover:opacity-100'
      }`}
    >
      <Icon name="listView" size="small" fill={activeView === 'list' ? '#474E5A' : '#6C7688'} />
    </button>
  </div>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="7" width="10" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M5 7V5C5 3.34315 6.34315 2 8 2C9.65685 2 11 3.34315 11 5V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const EmptyBalanceCard = ({ title, amount, subtitle, hasLock, gradient }) => (
  <div className={`w-[229px] rounded-xl p-4 flex flex-col ${gradient}`}>
    <div className="h-[72px] mb-4">
      <div className="flex items-start justify-between mb-1">
        <h3 className="text-[13px] font-medium text-[#353a44]">{title}</h3>
        {hasLock && (
          <div className="w-[30px] h-[30px] rounded-full bg-white flex items-center justify-center">
            <LockIcon className="text-[#6c7688]" />
          </div>
        )}
      </div>
      <div className="text-[24px] font-semibold text-[#353a44] tracking-[-0.5px] mb-0.5">{amount}</div>
      {subtitle && <div className="text-[12px] text-[#596171]">{subtitle}</div>}
    </div>
  </div>
);

const BalancesEmptyView = () => {
  const [activeTab, setActiveTab] = useState('payments');
  const [viewMode, setViewMode] = useState('grid');

  return (
    <div className="flex-1 bg-white overflow-y-auto">
      <div className="p-8">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-[28px] font-semibold text-[#353a44] tracking-[-0.5px]">
            Balances <span className="font-normal text-[#353A44]">$0.00</span>
          </h1>
        </div>

        {/* Action Buttons Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ActionButton iconName="convert" label="Transfer" />
            <ActionButton iconName="send" label="Send" />
            <ActionButton iconName="topup" label="Top up" />
            <ActionButton iconName="createCards" label="Create card" />
            <ActionButton iconName="invoice" label="Request" />
            <ActionButton iconName="settings" label="Configure" />
          </div>
          <ViewToggle activeView={viewMode} onViewChange={setViewMode} />
        </div>

        {/* Balance Cards Section */}
        <div className="rounded-2xl p-4 mb-8 relative overflow-hidden">
          <img src={gradientBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="flex gap-3 relative z-10">
            <EmptyBalanceCard
              title="Payments balance"
              amount="$0.00"
              subtitle="$0.00 pending"
              gradient="bg-white/70"
            />
            <EmptyBalanceCard
              title="Financial account"
              amount="$0.00"
              gradient="bg-white/70"
            />
            <EmptyBalanceCard
              title="Reserves"
              amount="$0.00"
              hasLock
              gradient="bg-white/70"
            />
          </div>
        </div>

        {/* Content Grid */}
        <div className="flex gap-8">
          {/* Recent Activity Section */}
          <div className="flex-1">
            <h2 className="text-[16px] font-semibold text-[#353a44] mb-4">Recent activity</h2>

            {/* Tabs */}
            <div className="flex gap-6 mb-4 border-b border-[#e3e8ee]">
              <button
                onClick={() => setActiveTab('payments')}
                className={`pb-3 text-[14px] font-medium border-b-2 -mb-px transition-colors ${
                  activeTab === 'payments'
                    ? 'text-[#533afd] border-[#533afd]'
                    : 'text-[#596171] border-transparent hover:text-[#353a44]'
                }`}
              >
                Payments balance
              </button>
              <button
                onClick={() => setActiveTab('financial')}
                className={`pb-3 text-[14px] font-medium border-b-2 -mb-px transition-colors ${
                  activeTab === 'financial'
                    ? 'text-[#533afd] border-[#533afd]'
                    : 'text-[#596171] border-transparent hover:text-[#353a44]'
                }`}
              >
                Financial account activity
              </button>
            </div>

            {/* Empty State */}
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#f5f6f8] flex items-center justify-center mb-4">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 5.5C2.5 3 5 1.5 8 1.5C11 1.5 13 3.5 13.5 5.5" stroke="#6c7688" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M14 10.5C13.5 13 11 14.5 8 14.5C5 14.5 3 12.5 2.5 10.5" stroke="#6c7688" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <p className="text-[14px] font-medium text-[#353a44] mb-1">No recent activity</p>
              <p className="text-[13px] text-[#596171]">
                Activity will appear here once you start transacting.
              </p>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-[280px] shrink-0">
            {/* Getting Started Section */}
            <h2 className="text-[16px] font-semibold text-[#353a44] mb-4">Getting started</h2>
            <div className="flex flex-col gap-3 mb-8">
              <div className="border border-[#d8dee4] rounded-lg p-4">
                <p className="text-[14px] font-semibold text-[#353a44] mb-1">Add funds</p>
                <p className="text-[13px] text-[#596171] mb-3">
                  Transfer funds to your financial account to start issuing cards.
                </p>
                <button className="text-[13px] font-semibold text-[#533afd] hover:underline">
                  Add funds
                </button>
              </div>
              <div className="border border-[#d8dee4] rounded-lg p-4">
                <p className="text-[14px] font-semibold text-[#353a44] mb-1">Create your first card</p>
                <p className="text-[13px] text-[#596171] mb-3">
                  Issue a virtual card for a team member or an AI agent.
                </p>
                <button className="text-[13px] font-semibold text-[#533afd] hover:underline">
                  Create card
                </button>
              </div>
            </div>

            {/* Resources Section */}
            <h2 className="text-[16px] font-semibold text-[#353a44] mb-4">Resources</h2>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-[14px] text-[#533afd] hover:underline font-medium">Issuing quickstart guide</a>
              <a href="#" className="text-[14px] text-[#533afd] hover:underline font-medium">Stripe CLI for agents</a>
              <a href="#" className="text-[14px] text-[#533afd] hover:underline font-medium">Financial Accounts API docs</a>
              <a href="#" className="text-[14px] text-[#533afd] hover:underline font-medium">Spending controls</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalancesEmptyView;
