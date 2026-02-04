import React, { useState } from 'react';
import gradientBg from '../../assets/balances-modal-bg.svg';
import modalPreviewGradient from '../../assets/modal-preview-gradient.svg';
import createCardPopover from '../../assets/create-card-popover.svg';

// Feature icons for the modal
import modalIconCard from '../../assets/modal-icon-card.svg';
import modalIconConvert from '../../assets/modal-icon-convert.svg';
import modalIconRecurring from '../../assets/modal-icon-recurring.svg';
import modalIconUsage from '../../assets/modal-icon-usage.svg';
import createCardIcon from '../../assets/create-card-icon.svg';
import convertIcon from '../../assets/convert-icon.svg';
import lightningBoltIcon from '../../assets/lightning-bolt-icon.svg';
import sendIcon from '../../assets/send-icon.svg';
import topupIcon from '../../assets/topup-icon.svg';
import reportIcon from '../../assets/report-icon.svg';
import reportIcon1 from '../../assets/report-icon-1.svg';
import reportIcon2 from '../../assets/report-icon-2.svg';
import reportIcon3 from '../../assets/report-icon-3.svg';
import reportIcon4 from '../../assets/report-icon-4.svg';
import flagUS from '../../assets/flag-us.svg';
import flagGB from '../../assets/flag-gb.svg';
import flagEU from '../../assets/flag-eu.svg';

// Icons
const InstantPayoutIcon = () => (
  <img src={lightningBoltIcon} alt="" className="w-4 h-4" />
);

const TransferIcon = () => (
  <img src={convertIcon} alt="" className="w-4 h-4" />
);

const AddFundsIcon = () => (
  <img src={topupIcon} alt="" className="w-4 h-4" />
);

const SendIcon = () => (
  <img src={sendIcon} alt="" className="w-4 h-4" />
);

const CreateCardIcon = () => (
  <img src={createCardIcon} alt="" className="w-4 h-4" />
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
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M0.381282 4.38128C0.72299 4.03957 1.27701 4.03957 1.61872 4.38128L8 10.7626L14.3813 4.38128C14.723 4.03957 15.277 4.03957 15.6187 4.38128C15.9604 4.72299 15.9604 5.27701 15.6187 5.61872L8.61872 12.6187C8.27701 12.9604 7.72299 12.9604 7.38128 12.6187L0.381282 5.61872C0.0395728 5.27701 0.0395728 4.72299 0.381282 4.38128Z" fill="currentColor"/>
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
  <img src={reportIcon} alt="" className="w-8 h-8" />
);

const PersonIcon = () => (
  <img src={reportIcon1} alt="" className="w-8 h-8" />
);

const IntegrateIcon = () => (
  <img src={reportIcon2} alt="" className="w-8 h-8" />
);

const ReportIcon = () => (
  <img src={reportIcon3} alt="" className="w-8 h-8" />
);

const ReportIcon2 = () => (
  <img src={reportIcon4} alt="" className="w-8 h-8" />
);

// Action Button Component
const ActionButton = ({ icon: Icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className="flex items-center gap-1.5 px-3 py-[7px] bg-[#f5f6f8] rounded-full text-[13px] font-medium text-[#353a44] hover:bg-[#e8eaed] transition-colors"
  >
    <Icon />
    <span>{label}</span>
  </button>
);

// Create Card Popover Modal Component
const CreateCardPopoverModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative">
        <img 
          src={createCardPopover}
          alt="Create card options"
          className="max-w-[400px] cursor-pointer"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

// Currency Pill Component
const flagMap = {
  'USD': flagUS,
  'GBP': flagGB,
  'EUR': flagEU,
};

const CurrencyPill = ({ flag, code, amount }) => {
  const flagSrc = flagMap[code];
  return (
    <div className="h-[48px] flex flex-col items-start justify-center px-2 bg-white/60 rounded-md text-[12px]">
      <div className="flex items-center gap-1">
        {flagSrc ? (
          <img src={flagSrc} alt="" className="w-4 h-4" />
        ) : (
          <span>{flag}</span>
        )}
        <span className="text-[#353a44] font-medium">{code}</span>
      </div>
      <span className="text-[#596171]">{amount}</span>
    </div>
  );
};

// Balance Card Component
const BalanceCard = ({ title, amount, subtitle, currencies, actions, hasLock, gradient }) => (
  <div className={`w-[229px] rounded-xl p-4 flex flex-col ${gradient}`}>
    {/* Fixed height header section to align currencies across cards */}
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
    
    {currencies && (
      <div className="grid grid-cols-2 gap-1.5 mb-3">
        {currencies.map((currency, index) => (
          <CurrencyPill key={index} {...currency} />
        ))}
      </div>
    )}
    
    {actions && (
      <div className="flex gap-2 mt-auto pt-2">
        {actions.map((action, index) => (
          <button key={index} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-black/5 text-[#596171] transition-colors">
            {action}
          </button>
        ))}
      </div>
    )}
  </div>
);

// Status Badge Component - using same colors as Badge component
const StatusBadge = ({ status }) => {
  const styles = {
    'In transit': 'text-yellow-700 bg-yellow-50 border-yellow-200',
    'Paid': 'text-green-700 bg-green-50 border-green-200',
  };
  
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 text-xs font-medium rounded-sm border ${styles[status] || 'text-gray-600 bg-gray-50 border-gray-200'}`}>
      {status}
    </span>
  );
};

// Activity Row Component
const ActivityRow = ({ amount, status, description, date }) => (
  <tr className="border-b border-[#e3e8ee] last:border-b-0 h-[36px]">
    <td className="py-2 pr-4">
      <div className="flex items-center gap-2">
        <span className="text-[14px] font-medium text-[#353a44]">{amount}</span>
        <StatusBadge status={status} />
      </div>
    </td>
    <td className="py-2 pr-4">
      <div className="flex items-center gap-1 text-[14px] text-[#596171]">
        <span>{description.from}</span>
        <ArrowRightIcon />
        <span>{description.to}</span>
      </div>
    </td>
    <td className="py-2 text-[14px] text-[#596171] text-right">{date}</td>
  </tr>
);

// Upcoming Item Component
const UpcomingItem = ({ month, day, amount, description }) => (
  <div className="flex bg-white border border-[#d8dee4] rounded-lg overflow-hidden">
    <div className="flex flex-col items-center justify-center w-14 bg-[#EFECFC] py-3">
      <span className="text-[10px] font-semibold text-[#353a44] uppercase">{month}</span>
      <span className="text-[18px] font-semibold text-[#353a44] leading-none">{day}</span>
    </div>
    <div className="flex-1 p-3">
      <div className="text-[14px] font-semibold text-[#353a44]">{amount}</div>
      <div className="text-[12px] text-[#596171]">{description}</div>
    </div>
  </div>
);

// Resource Link Component
const ResourceLink = ({ icon: Icon, label }) => (
  <a href="#" className="flex items-center gap-3 text-[14px] font-semibold text-[#353a44] hover:text-[#533afd] transition-colors">
    <div className="w-8 h-8 flex items-center justify-center text-[#6c7688]">
      <Icon />
    </div>
    <span>{label}</span>
  </a>
);


// Create Cards Modal Component - Updated to match Figma design
const CreateCardsModal = ({ isOpen, onClose, onGetStarted }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[rgba(182,192,205,0.7)]"
        onClick={onClose}
      />
      
      {/* Modal - 960x640 per Figma */}
      <div className="relative flex bg-white rounded-xl shadow-[0px_15px_35px_rgba(48,49,61,0.08),0px_5px_15px_rgba(0,0,0,0.12)] w-[960px] h-[640px] overflow-hidden">
        {/* Close Button - Top right of entire modal */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-3 h-3 flex items-center justify-center text-[#6c7688] hover:text-[#353a44] transition-colors z-20"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L11 11M1 11L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
        
        {/* Left Panel - Content (480px including 48px padding on each side = 384px content) */}
        <div className="w-[480px] p-12 flex flex-col">
          <h2 className="text-[28px] font-bold text-[#21252c] leading-[36px] tracking-[0.38px] mb-6">
            Create cards to manage expenses
          </h2>
          
          <div className="flex flex-col gap-4 flex-1">
            {/* Feature 1 - Virtual/Physical cards */}
            <div className="flex gap-2 items-center">
              <div className="w-11 h-11 rounded-lg bg-[#cbf5fd] flex items-center justify-center shrink-0 p-3">
                <img src={modalIconCard} alt="" className="w-5 h-5" />
              </div>
              <p className="text-[20px] text-[#353a44] leading-[28px] tracking-[0.3px]">
                Create <span className="font-bold">virtual</span> or <span className="font-bold">physical</span> cards for your team in just a few clicks.
              </p>
            </div>
            
            {/* Feature 2 - Multiple currencies */}
            <div className="flex gap-2 items-center">
              <div className="w-11 h-11 rounded-lg bg-[#cbf5fd] flex items-center justify-center shrink-0 p-3">
                <img src={modalIconConvert} alt="" className="w-5 h-5" />
              </div>
              <p className="text-[20px] text-[#353a44] leading-[28px] tracking-[0.3px]">
                Spend in <span className="font-bold">multiple currencies</span> straight from your <span className="font-bold">financial account</span> balance.
              </p>
            </div>
            
            {/* Feature 3 - Manage subscriptions */}
            <div className="flex gap-2 items-center">
              <div className="w-11 h-11 rounded-lg bg-[#cbf5fd] flex items-center justify-center shrink-0 p-3">
                <img src={modalIconRecurring} alt="" className="w-5 h-5" />
              </div>
              <p className="text-[20px] text-[#353a44] leading-[28px] tracking-[0.3px]">
                <span className="font-bold">Manage</span> subscriptions, expenses, and bills.
              </p>
            </div>
            
            {/* Feature 4 - Spend limits */}
            <div className="flex gap-2 items-center">
              <div className="w-11 h-11 rounded-lg bg-[#cbf5fd] flex items-center justify-center shrink-0 p-3">
                <img src={modalIconUsage} alt="" className="w-5 h-5" />
              </div>
              <p className="text-[20px] text-[#353a44] leading-[28px] tracking-[0.3px]">
                Set spend <span className="font-bold">limits</span>, track <span className="font-bold">usage</span>, and manage team cards.
              </p>
            </div>
          </div>
          
          {/* Get Started Button - Per Figma specs */}
          <button 
            onClick={onGetStarted || onClose}
            className="w-full min-h-[40px] py-2 bg-[#675dff] hover:bg-[#5650e0] text-white font-semibold text-[16px] leading-6 tracking-[-0.31px] rounded-md transition-colors shadow-[0px_1px_1px_0px_rgba(47,14,99,0.32)]"
          >
            Get started
          </button>
        </div>
        
        {/* Right Panel - Illustration (480px) */}
        <div className="w-[480px] h-full relative overflow-hidden">
          {/* Gradient Background */}
          <img 
            src={modalPreviewGradient}
            alt=""
            className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] object-cover rounded-lg"
          />
          {/* Illustration overlay - centered and scaled down */}
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <img 
              src={new URL('../../assets/cards-modal-illustration.svg', import.meta.url).href}
              alt="Cards illustration"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Balances View Component
const BalancesView = ({ showCreateCardsModal = false, onCloseCreateCardsModal, isSandboxMode = false, onExitSandbox }) => {
  const [activeTab, setActiveTab] = useState('payments');
  const [isCreateCardsModalOpen, setIsCreateCardsModalOpen] = useState(showCreateCardsModal);
  const [isCreateCardPopoverOpen, setIsCreateCardPopoverOpen] = useState(false);
  
  // Sync with prop changes
  React.useEffect(() => {
    setIsCreateCardsModalOpen(showCreateCardsModal);
  }, [showCreateCardsModal]);
  
  const handleCloseCreateCardsModal = () => {
    setIsCreateCardsModalOpen(false);
    if (onCloseCreateCardsModal) {
      onCloseCreateCardsModal();
    }
  };

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
      <div className="p-8">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-[28px] font-semibold text-[#353a44] tracking-[-0.5px]">
            Balances <span className="font-normal text-[#353A44]">$113,049.82</span>
          </h1>
        </div>

        {/* Action Buttons Row */}
        <div className="flex items-center gap-2 mb-4">
          <ActionButton icon={InstantPayoutIcon} label="Instant payout" />
          <ActionButton icon={TransferIcon} label="Transfer" />
          <ActionButton icon={AddFundsIcon} label="Add funds" />
          <ActionButton icon={SendIcon} label="Send" />
          <ActionButton icon={CreateCardIcon} label="Create card" onClick={() => setIsCreateCardPopoverOpen(true)} />
          <ActionButton icon={MoreDotsIcon} label="More" />
          <div className="ml-auto">
            <button className="flex items-center gap-1.5 px-3 py-[7px] bg-white border border-[#d8dee4] rounded-full text-[13px] font-medium text-[#353a44] hover:bg-[#f7f8f9] transition-colors">
              <GlobeIcon />
              <span>All currencies</span>
              <ChevronDownIcon />
            </button>
          </div>
        </div>

        {/* Balance Cards Section */}
        <div className="rounded-2xl p-4 mb-8 relative overflow-hidden">
          {/* Gradient Background */}
          <img 
            src={gradientBg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="flex gap-3 relative z-10">
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
              <ResourceLink icon={ReportIcon2} label="Financial account report" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Create Cards Modal */}
      <CreateCardsModal 
        isOpen={isCreateCardsModalOpen} 
        onClose={handleCloseCreateCardsModal}
        onGetStarted={handleCloseCreateCardsModal}
      />
      
      {/* Create Card Popover Modal */}
      <CreateCardPopoverModal 
        isOpen={isCreateCardPopoverOpen}
        onClose={() => setIsCreateCardPopoverOpen(false)}
      />
    </div>
  );
};

export default BalancesView;
