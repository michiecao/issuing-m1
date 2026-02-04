import React, { useState } from 'react';

// Icons
const InstantPayoutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 2V14M8 2L4 6M8 2L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TransferIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 5H14M14 5L10 1M14 5L10 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 11H2M2 11L6 7M2 11L6 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AddFundsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2L7 9M14 2L10 14L7 9M14 2L2 6L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CreateCardIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.5" y="3.5" width="13" height="9" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 6V10M6 8H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const MoreDotsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="3" cy="8" r="1.25" fill="currentColor"/>
    <circle cx="8" cy="8" r="1.25" fill="currentColor"/>
    <circle cx="13" cy="8" r="1.25" fill="currentColor"/>
  </svg>
);

const GlobeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M2 8H14" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 2C9.5 3.5 10.5 5.5 10.5 8C10.5 10.5 9.5 12.5 8 14" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 2C6.5 3.5 5.5 5.5 5.5 8C5.5 10.5 6.5 12.5 8 14" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="7" width="10" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M5 7V5C5 3.34315 6.34315 2 8 2C9.65685 2 11 3.34315 11 5V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CardIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.5" y="3.5" width="13" height="9" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M1.5 6.5H14.5" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const PersonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M3 13.5C3 11.0147 5.23858 9 8 9C10.7614 9 13 11.0147 13 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IntegrateIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="9" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="1" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const ReportIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2.5" y="1.5" width="11" height="13" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M5 5H11M5 8H11M5 11H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// Action Button Component
const ActionButton = ({ icon: Icon, label }) => (
  <button className="flex items-center gap-1.5 px-3 py-[7px] bg-white border border-[#d8dee4] rounded-md text-[13px] font-medium text-[#353a44] hover:bg-[#f7f8f9] transition-colors shadow-[0_1px_1px_rgba(33,37,44,0.08)]">
    <Icon />
    <span>{label}</span>
  </button>
);

// Currency Pill Component
const CurrencyPill = ({ flag, code, amount }) => (
  <div className="flex items-center gap-1.5 px-2 py-1 bg-white/60 rounded-md text-[12px]">
    <span>{flag}</span>
    <span className="text-[#353a44] font-medium">{code}</span>
    <span className="text-[#596171]">{amount}</span>
  </div>
);

// Balance Card Component
const BalanceCard = ({ title, amount, subtitle, currencies, actions, hasLock, gradient }) => (
  <div className={`flex-1 rounded-xl p-4 min-w-[200px] ${gradient}`}>
    <div className="flex items-start justify-between mb-1">
      <h3 className="text-[13px] font-medium text-[#353a44]">{title}</h3>
      {hasLock && <LockIcon className="text-[#6c7688]" />}
    </div>
    <div className="text-[24px] font-semibold text-[#353a44] tracking-[-0.5px] mb-0.5">{amount}</div>
    {subtitle && <div className="text-[12px] text-[#596171] mb-3">{subtitle}</div>}
    
    {currencies && (
      <div className="flex flex-wrap gap-1.5 mb-3">
        {currencies.map((currency, index) => (
          <CurrencyPill key={index} {...currency} />
        ))}
      </div>
    )}
    
    {actions && (
      <div className="flex gap-2 mt-auto pt-2">
        {actions.map((action, index) => (
          <button key={index} className="w-7 h-7 flex items-center justify-center rounded-md bg-white/60 hover:bg-white/80 text-[#596171] transition-colors">
            {action}
          </button>
        ))}
      </div>
    )}
  </div>
);

// Status Badge Component
const StatusBadge = ({ status }) => {
  const styles = {
    'In transit': 'bg-[#fef6e7] text-[#b45309] border-[#fcd34d]',
    'Paid': 'bg-[#ecfdf5] text-[#059669] border-[#6ee7b7]',
  };
  
  return (
    <span className={`inline-flex px-2 py-0.5 text-[11px] font-medium rounded border ${styles[status] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
      {status}
    </span>
  );
};

// Activity Row Component
const ActivityRow = ({ amount, status, description, date }) => (
  <tr className="border-b border-[#e3e8ee] last:border-b-0">
    <td className="py-3 pr-4">
      <div className="flex items-center gap-2">
        <span className="text-[14px] font-medium text-[#353a44]">{amount}</span>
        <StatusBadge status={status} />
      </div>
    </td>
    <td className="py-3 pr-4">
      <div className="flex items-center gap-1 text-[14px] text-[#596171]">
        <span>{description.from}</span>
        <ArrowRightIcon />
        <span>{description.to}</span>
      </div>
    </td>
    <td className="py-3 text-[14px] text-[#596171] text-right">{date}</td>
  </tr>
);

// Upcoming Item Component
const UpcomingItem = ({ month, day, amount, description }) => (
  <div className="flex gap-3 p-3 bg-[#f7f8f9] rounded-lg">
    <div className="flex flex-col items-center justify-center w-12 h-12 bg-white rounded-lg border border-[#e3e8ee]">
      <span className="text-[10px] font-semibold text-[#596171] uppercase">{month}</span>
      <span className="text-[18px] font-semibold text-[#353a44] leading-none">{day}</span>
    </div>
    <div className="flex-1">
      <div className="text-[14px] font-semibold text-[#353a44]">{amount}</div>
      <div className="text-[12px] text-[#596171]">{description}</div>
    </div>
  </div>
);

// Resource Link Component
const ResourceLink = ({ icon: Icon, label }) => (
  <a href="#" className="flex items-center gap-3 text-[14px] text-[#353a44] hover:text-[#533afd] transition-colors">
    <div className="w-5 h-5 flex items-center justify-center text-[#6c7688]">
      <Icon />
    </div>
    <span>{label}</span>
  </a>
);

// Main Balances View Component
const BalancesView = () => {
  const [activeTab, setActiveTab] = useState('payments');

  const activityData = [
    { amount: '$44,792.05', status: 'In transit', description: { from: 'Payments balance', to: 'Wells Fargo Bank' }, date: 'Sep 26' },
    { amount: '$51,802.50', status: 'Paid', description: { from: 'Payments balance', to: 'Wells Fargo Bank' }, date: 'Sep 25' },
    { amount: '$81,771.20', status: 'Paid', description: { from: 'Payments balance', to: 'Wells Fargo Bank' }, date: 'Sep 24' },
    { amount: '$36,515.95', status: 'Paid', description: { from: 'Payments balance', to: 'Wells Fargo Bank' }, date: 'Sep 24' },
    { amount: '$44,535.49', status: 'Paid', description: { from: 'Payments balance', to: 'Wells Fargo Bank' }, date: 'Sep 24' },
  ];

  return (
    <div className="flex-1 bg-white">
      {/* Main Content */}
      <div className="p-8 max-w-[1200px]">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-[28px] font-semibold text-[#353a44] tracking-[-0.5px]">
            Balances <span className="font-normal text-[#596171]">$113,049.82</span>
          </h1>
        </div>

        {/* Action Buttons Row */}
        <div className="flex items-center gap-2 mb-6">
          <ActionButton icon={InstantPayoutIcon} label="Instant payout" />
          <ActionButton icon={TransferIcon} label="Transfer" />
          <ActionButton icon={AddFundsIcon} label="Add funds" />
          <ActionButton icon={SendIcon} label="Send" />
          <ActionButton icon={CreateCardIcon} label="Create card" />
          <ActionButton icon={MoreDotsIcon} label="More" />
          <div className="ml-auto">
            <button className="flex items-center gap-1.5 px-3 py-[7px] bg-white border border-[#d8dee4] rounded-md text-[13px] font-medium text-[#353a44] hover:bg-[#f7f8f9] transition-colors shadow-[0_1px_1px_rgba(33,37,44,0.08)]">
              <GlobeIcon />
              <span>All currencies</span>
              <ChevronDownIcon />
            </button>
          </div>
        </div>

        {/* Balance Cards Section */}
        <div className="rounded-2xl p-4 mb-8" style={{ background: 'linear-gradient(135deg, #e8f4f8 0%, #f0e6f6 50%, #fef3e2 100%)' }}>
          <div className="flex gap-4">
            {/* Payments Balance Card */}
            <BalanceCard
              title="Payments balance"
              amount="$22,594.21"
              subtitle="$18,661.51 pending"
              currencies={[
                { flag: '🇺🇸', code: 'USD', amount: '$2,819.49' },
                { flag: '🇬🇧', code: 'GBP', amount: '£6,249.11' },
                { flag: '🇪🇺', code: 'EUR', amount: '€3,125.99' },
                { flag: '', code: '+2 more', amount: '$8,431.02' },
              ]}
              actions={[<InstantPayoutIcon key="payout" />, <TransferIcon key="transfer" />, <MoreDotsIcon key="more" />]}
              gradient="bg-white/70"
            />
            
            {/* Financial Account Card */}
            <BalanceCard
              title="Financial account"
              amount="$90,455.61"
              currencies={[
                { flag: '🇺🇸', code: 'USD', amount: '$53,345.02' },
                { flag: '🇬🇧', code: 'GBP', amount: '£29,220.94' },
              ]}
              actions={[<TransferIcon key="transfer" />, <SendIcon key="send" />, <MoreDotsIcon key="more" />]}
              gradient="bg-white/70"
            />
            
            {/* Reserves Card */}
            <BalanceCard
              title="Reserves"
              amount="$15,383.08"
              subtitle="$953.65 released tomorrow"
              hasLock
              currencies={[
                { flag: '🇺🇸', code: 'USD', amount: '$10,391.93' },
                { flag: '🇬🇧', code: 'GBP', amount: '£3,930.04' },
              ]}
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

            {/* Activity Table */}
            <table className="w-full">
              <thead>
                <tr className="text-[12px] font-medium text-[#6c7688] uppercase tracking-wider">
                  <th className="text-left pb-3 pr-4">Amount</th>
                  <th className="text-left pb-3 pr-4">Description</th>
                  <th className="text-right pb-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {activityData.map((row, index) => (
                  <ActivityRow key={index} {...row} />
                ))}
              </tbody>
            </table>

            <button className="mt-4 text-[14px] font-medium text-[#533afd] hover:underline">
              View more
            </button>
          </div>

          {/* Right Sidebar */}
          <div className="w-[280px] shrink-0">
            {/* Upcoming Section */}
            <h2 className="text-[16px] font-semibold text-[#353a44] mb-4">Upcoming</h2>
            <div className="flex flex-col gap-3 mb-8">
              <UpcomingItem
                month="SEP"
                day="29"
                amount="$39,997.37"
                description="Incoming → Payments balance"
              />
              <UpcomingItem
                month="SEP"
                day="30"
                amount="$44,792.05"
                description="Payments balance → Wells Fargo"
              />
            </div>

            {/* Resources Section */}
            <h2 className="text-[16px] font-semibold text-[#353a44] mb-4">Resources</h2>
            <div className="flex flex-col gap-3">
              <ResourceLink icon={CardIcon} label="Manage cards" />
              <ResourceLink icon={PersonIcon} label="Manage recipients" />
              <ResourceLink icon={IntegrateIcon} label="Integrate with accounting app" />
              <ResourceLink icon={ReportIcon} label="Balance summary report" />
              <ResourceLink icon={ReportIcon} label="Financial account report" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalancesView;
