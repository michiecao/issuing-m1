import React, { useState } from 'react';
import SetupIssuingModal from './SetupIssuingModal';
import IssuingHomeView from './IssuingHomeView';
import PrototypeControlPanel from '../../components/PrototypeControlPanel';

// Icons as inline SVGs - matching Sail UI / Stripe Dashboard icons from Figma
const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 6.5L8 2L13.5 6.5V13C13.5 13.2761 13.2761 13.5 13 13.5H10.5V9.5C10.5 9.22386 10.2761 9 10 9H6C5.72386 9 5.5 9.22386 5.5 9.5V13.5H3C2.72386 13.5 2.5 13.2761 2.5 13V6.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BalancesIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 5.5H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M4 3.5V5.5M8 3.5V5.5M12 3.5V5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M2 10.5H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M4 10.5V12.5M8 10.5V12.5M12 10.5V12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const TransactionsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 5.5C2.5 3 5 1.5 8 1.5C11 1.5 13 3.5 13.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M14 10.5C13.5 13 11 14.5 8 14.5C5 14.5 3 12.5 2.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M10.5 5.5H13.5V2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5.5 10.5H2.5V13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CustomersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M3 13.5C3 11.0147 5.23858 9 8 9C10.7614 9 13 11.0147 13 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ProductIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2.5" y="2.5" width="4.5" height="4.5" rx="0.5" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="9" y="2.5" width="4.5" height="4.5" rx="0.5" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="2.5" y="9" width="4.5" height="4.5" rx="0.5" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="9" y="9" width="4.5" height="4.5" rx="0.5" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const PinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.5 2L14 6.5L11.5 9L11 11L5 5L7 4.5L9.5 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 11L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 5V8L10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ConnectIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="4" width="4.5" height="8" rx="0.5" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="9.5" y="4" width="4.5" height="8" rx="0.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M6.5 8H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const PaymentsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="3.5" width="12" height="9" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M2 6.5H14" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const BillingIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3.5" y="2" width="9" height="12" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M6 5.5H10M6 8H10M6 10.5H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ReportingIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 13V10M6.5 13V6M10 13V8M13.5 13V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const MoreIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="3" cy="8" r="1.25" fill="currentColor"/>
    <circle cx="8" cy="8" r="1.25" fill="currentColor"/>
    <circle cx="13" cy="8" r="1.25" fill="currentColor"/>
  </svg>
);

const ChevronDownIcon = ({ className }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const HelpIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 8C8 6.89543 8.89543 6 10 6C11.1046 6 12 6.89543 12 8C12 9.10457 11.1046 10 10 10V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="10" cy="14" r="0.75" fill="currentColor"/>
  </svg>
);

const FeedbackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 4H17V13H8L4 16V13H3V4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M10 2V4M10 16V18M18 10H16M4 10H2M15.66 4.34L14.24 5.76M5.76 14.24L4.34 15.66M15.66 15.66L14.24 14.24M5.76 5.76L4.34 4.34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const GridIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="11" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="3" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="11" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const NotificationIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 2C6.68629 2 4 4.68629 4 8V11L3 13H17L16 11V8C16 4.68629 13.3137 2 10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 13V14C8 15.1046 8.89543 16 10 16C11.1046 16 12 15.1046 12 14V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Navigation Item Component
const NavItem = ({ icon: Icon, label, active, indent, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-2 h-[30px] rounded-md text-[14px] leading-[20px] tracking-[-0.15px] transition-colors relative
      ${active ? 'text-[#533afd] font-semibold' : 'text-[#353a44] font-normal hover:bg-[#f5f6f8]'}`}
  >
    {Icon && (
      <span className={`w-6 h-6 flex items-center justify-center shrink-0 ${active ? 'text-[#533afd]' : 'text-[#6c7688]'}`}>
        <Icon />
      </span>
    )}
    {!Icon && <span className="w-6 shrink-0" />}
    <span className="truncate">{label}</span>
  </button>
);

// Expandable Nav Group Component
const NavGroup = ({ icon: Icon, label, children, defaultExpanded = false }) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  
  return (
    <div className="w-full">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-2 h-[30px] rounded-md text-[14px] leading-[20px] tracking-[-0.15px] text-[#353a44] hover:bg-[#f5f6f8] transition-colors relative"
      >
        <span className="w-6 h-6 flex items-center justify-center shrink-0 text-[#6c7688]">
          {Icon && <Icon />}
        </span>
        <span className="flex-1 text-left truncate">{label}</span>
        <span className="w-6 h-6 flex items-center justify-center shrink-0">
          <ChevronDownIcon className={`text-[#6c7688] transition-transform duration-200 ${expanded ? '' : '-rotate-90'}`} />
        </span>
      </button>
      {expanded && (
        <div className="pb-1">
          {children}
        </div>
      )}
    </div>
  );
};

// Section Heading Component
const SectionHeading = ({ label }) => (
  <div className="h-[26px] flex items-center">
    <span className="text-[12px] leading-[20px] text-[#596171]">{label}</span>
  </div>
);

// Callout Card Component
const CalloutCard = ({ title, description, linkText }) => (
  <div className="flex-1 bg-[#f5f6f8] rounded-lg p-4 flex flex-col justify-between min-h-[146px]">
    <div>
      <h3 className="font-bold text-[16px] text-[#21252c] mb-1">{title}</h3>
      <p className="text-sm text-[#596171]">{description}</p>
    </div>
    <a href="#" className="text-sm font-medium text-[#533afd] hover:underline">
      {linkText}
    </a>
  </div>
);

// Main Dashboard View Component
const DashboardView = () => {
  const [activeNav, setActiveNav] = useState('issuing');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalKey, setModalKey] = useState(0); // Used to reset modal state
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

  const handleResetPrototype = () => {
    setIsModalOpen(false);
    setIsOnboardingComplete(false);
    setModalKey(prev => prev + 1); // Increment key to remount modal with fresh state
  };

  const handleOnboardingComplete = () => {
    setIsModalOpen(false);
    setIsOnboardingComplete(true);
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-[228px] border-r border-[#ebeef1] flex flex-col h-full shrink-0 bg-white">
        {/* Account Header */}
        <div className="h-[60px] flex items-center px-5 border-b border-[#ebeef1]">
          <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-6 h-6 rounded overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#675dff] via-[#a855f7] to-[#ec4899]">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 2L12 5V9L7 12L2 9V5L7 2Z" fill="white" fillOpacity="0.9"/>
              </svg>
            </div>
            <span className="font-semibold text-[14px] leading-[20px] tracking-[-0.15px] text-[#353a44]">Galtee Insurance</span>
            <ChevronDownIcon className="text-[#6c7688]" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          <div className="flex flex-col gap-7">
            {/* Top Level Nav */}
            <div className="flex flex-col">
              <NavItem icon={HomeIcon} label="Home" />
              <NavItem icon={BalancesIcon} label="Balances" />
              <NavItem icon={TransactionsIcon} label="Transactions" />
              <NavItem icon={CustomersIcon} label="Customers" />
              <NavItem icon={ProductIcon} label="Product catalog" />
            </div>

            {/* Shortcuts */}
            <div className="flex flex-col">
              <SectionHeading label="Shortcuts" />
              <NavItem icon={PinIcon} label="Disputes" />
              <NavItem icon={PinIcon} label="Tax" />
              <NavItem icon={PinIcon} label="Reports" />
            </div>

            {/* Products */}
            <div className="flex flex-col">
              <SectionHeading label="Products" />
              <NavGroup icon={ConnectIcon} label="Connect">
                <NavItem label="Overview" indent />
                <NavItem label="Connected accounts" indent />
              </NavGroup>
              <NavGroup icon={PaymentsIcon} label="Payments">
                <NavItem label="Insights" indent />
                <NavItem label="Disputes" indent />
              </NavGroup>
              <NavGroup icon={BillingIcon} label="Billing">
                <NavItem label="Overview" indent />
                <NavItem label="Subscriptions" indent />
              </NavGroup>
              <NavGroup icon={ReportingIcon} label="Reporting">
                <NavItem label="Overview" indent />
                <NavItem label="Reports" indent />
              </NavGroup>
              <NavGroup icon={MoreIcon} label="More" defaultExpanded>
                <NavItem label="Tax" indent />
                <NavItem label="Identity" indent />
                <NavItem label="Atlas" indent />
                <NavItem label="Issuing" indent active={activeNav === 'issuing'} onClick={() => setActiveNav('issuing')} />
                <NavItem label="Financial connections" indent />
                <NavItem label="Capital" indent />
                <NavItem label="Climate" indent />
                <NavItem label="Global Payouts" indent />
              </NavGroup>
            </div>

          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar - Always visible */}
        <div className="h-[60px] flex items-center justify-between px-6 shrink-0 border-b border-[#ebeef1]">
          {/* Search */}
          <div className="flex-1 max-w-[400px]">
            <div className="flex items-center gap-2 px-3 py-2 bg-[#f5f6f8] rounded-lg text-[#6c7688]">
              <SearchIcon />
              <span className="text-sm">Search...</span>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 text-[#6c7688]">
            <button className="hover:text-[#474e5a] p-1"><GridIcon /></button>
            <button className="hover:text-[#474e5a] p-1"><HelpIcon /></button>
            <button className="hover:text-[#474e5a] p-1"><NotificationIcon /></button>
            <button className="hover:text-[#474e5a] p-1"><SettingsIcon /></button>
            <button className="w-6 h-6 rounded-full bg-[#00d66f] flex items-center justify-center text-white">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 2V10M2 6H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Page Content */}
        {isOnboardingComplete ? (
          /* Issuing Home View - shown after onboarding */
          <IssuingHomeView />
        ) : (
          <div className="flex-1 overflow-y-auto px-10 pb-10 pt-6">
            <div className="w-full">
              {/* Hero Section */}
              <div className="bg-[#f5f6f8] rounded-xl px-[72px] py-[88px] relative overflow-hidden mb-4 w-full">
                {/* Product Badge */}
                <div className="absolute top-3 left-3 bg-white rounded-lg px-2 py-2">
                  <span className="text-[12px] font-semibold text-[#353a44] leading-[16px]">Issuing</span>
                </div>

                <div className="flex gap-[35px]">
                  {/* Left Content */}
                  <div className="w-[428px] shrink-0">
                    <h1 className="text-[40px] font-bold text-[#353a44] leading-[48px] tracking-[0.37px] mb-2" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
                      Build your perfect card program
                    </h1>
                    <p className="text-[20px] text-[#596171] leading-[28px] tracking-[0.3px] mb-[22px]" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
                      Create and manage cards programmatically or without code for your business.
                    </p>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => setIsModalOpen(true)}
                        className="px-4 py-2.5 bg-[#635bff] hover:bg-[#5851ea] text-white font-medium text-[14px] rounded-md transition-colors shadow-[0_1px_1px_rgba(47,14,99,0.32)]"
                      >
                        Get started
                      </button>
                      <button className="px-4 py-2.5 bg-white hover:bg-gray-50 text-[#353a44] font-medium text-[14px] rounded-md border border-[#d8dee4] transition-colors shadow-[0_1px_1px_rgba(33,37,44,0.16)]">
                        Explore in sandbox
                      </button>
                    </div>
                  </div>

                  {/* Right Placeholder */}
                  <div className="flex-1">
                    <div className="w-[329px] h-[254px] bg-[#ebeef1] rounded-lg ml-auto"></div>
                  </div>
                </div>
              </div>

              {/* Info Cards */}
              <div className="flex gap-4 w-full">
                <CalloutCard
                  title="Supportable use cases for Issuing"
                  description="Learn about the use cases Issuing can support."
                  linkText="View docs"
                />
                <CalloutCard
                  title="Quickstart guide"
                  description="Learn how to set up a card issuing program through the API."
                  linkText="View docs"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Setup Issuing Modal */}
      <SetupIssuingModal 
        key={modalKey}
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onComplete={handleOnboardingComplete}
      />

      {/* Prototype Control Panel */}
      <PrototypeControlPanel>
        <button
          onClick={handleResetPrototype}
          className="w-full px-3 py-2 text-sm font-medium rounded-md transition-colors text-gray-600 border border-gray-300 hover:bg-gray-100"
        >
          Reset prototype
        </button>
      </PrototypeControlPanel>
    </div>
  );
};

export default DashboardView;

