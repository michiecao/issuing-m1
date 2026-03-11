import React, { useState } from 'react';
import SetupIssuingModal from './SetupIssuingModal';
import BalancesEmptyView from './BalancesEmptyView';
import BalancesAgentView from './BalancesAgentView';
import { BlueprintPanel, SetupGuide } from '../Prototype1/QuickstartGuideView';
import PrototypeControlPanel from '../../components/PrototypeControlPanel';
import { Icon } from '../../icons/SailIcons';
import gradientBg from '../../assets/balances-modal-bg.svg';
import flagUS from '../../assets/flag-us.svg';
import flagGB from '../../assets/flag-gb.svg';
import flagEU from '../../assets/flag-eu.svg';

// Inline SVG icons matching Sail / Stripe Dashboard
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
  <svg width="8" height="8" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M0.381282 4.38128C0.72299 4.03957 1.27701 4.03957 1.61872 4.38128L8 10.7626L14.3813 4.38128C14.723 4.03957 15.277 4.03957 15.6187 4.38128C15.9604 4.72299 15.9604 5.27701 15.6187 5.61872L8.61872 12.6187C8.27701 12.9604 7.72299 12.9604 7.38128 12.6187L0.381282 5.61872C0.0395728 5.27701 0.0395728 4.72299 0.381282 4.38128Z" fill="currentColor"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const GridIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 8.5C5.10457 8.5 6 9.39543 6 10.5V12.5C6 13.5357 5.21278 14.387 4.2041 14.4893L4 14.5H2L1.7959 14.4893C0.854346 14.3938 0.1062 13.6457 0.0107422 12.7041L0 12.5V10.5C0 9.39543 0.895431 8.5 2 8.5H4ZM12 8.5C13.1046 8.5 14 9.39543 14 10.5V12.5C14 13.5357 13.2128 14.387 12.2041 14.4893L12 14.5H10L9.7959 14.4893C8.85435 14.3938 8.1062 13.6457 8.01074 12.7041L8 12.5V10.5C8 9.39543 8.89543 8.5 10 8.5H12ZM2 10C1.72386 10 1.5 10.2239 1.5 10.5V12.5C1.5 12.7761 1.72386 13 2 13H4C4.27614 13 4.5 12.7761 4.5 12.5V10.5C4.5 10.2239 4.27614 10 4 10H2ZM10 10C9.72386 10 9.5 10.2239 9.5 10.5V12.5C9.5 12.7761 9.72386 13 10 13H12C12.2761 13 12.5 12.7761 12.5 12.5V10.5C12.5 10.2239 12.2761 10 12 10H10ZM11 0C11.4142 0 11.75 0.335786 11.75 0.75V2.75H13.75C14.1642 2.75 14.5 3.08579 14.5 3.5C14.5 3.91421 14.1642 4.25 13.75 4.25H11.75V6.25C11.75 6.66421 11.4142 7 11 7C10.5858 7 10.25 6.66421 10.25 6.25V4.25H8.25C7.83579 4.25 7.5 3.91421 7.5 3.5C7.5 3.08579 7.83579 2.75 8.25 2.75H10.25V0.75C10.25 0.335786 10.5858 0 11 0ZM4 0.5C5.10457 0.5 6 1.39543 6 2.5V4.5C6 5.53565 5.21278 6.387 4.2041 6.48926L4 6.5H2L1.7959 6.48926C0.854346 6.3938 0.1062 5.64565 0.0107422 4.7041L0 4.5V2.5C0 1.39543 0.895431 0.5 2 0.5H4ZM2 2C1.72386 2 1.5 2.22386 1.5 2.5V4.5C1.5 4.77614 1.72386 5 2 5H4C4.27614 5 4.5 4.77614 4.5 4.5V2.5C4.5 2.22386 4.27614 2 4 2H2Z" fill="currentColor"/>
  </svg>
);

const HelpIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 8C8 6.89543 8.89543 6 10 6C11.1046 6 12 6.89543 12 8C12 9.10457 11.1046 10 10 10V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="10" cy="14" r="0.75" fill="currentColor"/>
  </svg>
);

const NotificationIcon = () => (
  <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M4.0051 13H1.79025C0.758771 13 0.000917067 12.153 8.31685e-07 11.2109C-0.000238151 10.9652 0.0510196 10.713 0.16235 10.4677L0.639293 9.41667C1.21442 8.1493 1.55644 6.78835 1.64889 5.39928L1.6762 4.98893C1.86305 2.18151 4.19099 0 7 0C9.80901 0 12.1369 2.18151 12.3238 4.98893L12.3511 5.39928C12.4436 6.78835 12.7856 8.1493 13.3607 9.41667L13.8376 10.4677C13.949 10.713 14.0002 10.9652 14 11.2109C13.9991 12.153 13.2412 13 12.2097 13H9.99521C9.99521 14.6569 8.65428 16 7.00015 16C5.34603 16 4.0051 14.6569 4.0051 13ZM1.52565 11.0884L2.00259 10.0374C2.65229 8.60567 3.03866 7.06825 3.1431 5.49905L3.17041 5.0887C3.30482 3.06923 4.97938 1.5 7 1.5C9.02062 1.5 10.6952 3.06923 10.8296 5.0887L10.8569 5.49905C10.9613 7.06825 11.3477 8.60567 11.9974 10.0374L12.4744 11.0884C12.5618 11.2811 12.4211 11.5 12.2097 11.5H1.79025C1.57886 11.5 1.43817 11.2811 1.52565 11.0884ZM5.50263 13C5.50263 13.8284 6.17309 14.5 7.00015 14.5C7.82721 14.5 8.49768 13.8284 8.49768 13H5.50263Z" fill="currentColor"/>
  </svg>
);

const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M7.99996 10C9.10453 10 9.99996 9.10457 9.99996 8C9.99996 6.89543 9.10453 6 7.99996 6C6.89539 6 5.99996 6.89543 5.99996 8C5.99996 9.10457 6.89539 10 7.99996 10ZM7.99996 11.5C9.93295 11.5 11.5 9.933 11.5 8C11.5 6.067 9.93295 4.5 7.99996 4.5C6.06696 4.5 4.49996 6.067 4.49996 8C4.49996 9.933 6.06696 11.5 7.99996 11.5Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M7.40917 14.5H8.59082L8.64285 13.6676C8.68604 12.9765 9.12642 12.4062 9.72215 12.1591C10.3207 11.9109 11.0352 12.0054 11.5529 12.4622L12.1784 13.014L13.0139 12.1785L12.4622 11.5531C12.0053 11.0354 11.9109 10.3208 12.1591 9.72222C12.4062 9.12646 12.9765 8.68604 13.6676 8.64285L14.5 8.59082V7.40918L13.6676 7.35715C12.9765 7.31396 12.4062 6.87355 12.1591 6.27781C11.9109 5.67926 12.0053 4.9647 12.4622 4.44695L13.0139 3.82163L12.1784 2.98608L11.553 3.53784C11.0353 3.99467 10.3207 4.0891 9.72218 3.84089C9.12644 3.59384 8.68604 3.02347 8.64285 2.33241L8.59082 1.5H7.40917L7.35715 2.33236C7.31396 3.02345 6.87354 3.59384 6.27778 3.8409C5.67921 4.08913 4.96463 3.99471 4.44686 3.53785L3.82153 2.98609L2.98598 3.82164L3.53784 4.44708C3.99465 4.9648 4.08908 5.67931 3.84088 6.27784C3.59384 6.87357 3.02348 7.31396 2.33245 7.35715L1.5 7.40917V8.59082L2.33241 8.64285C3.02346 8.68604 3.59383 9.12643 3.84089 9.72218C4.0891 10.3207 3.99467 11.0353 3.53784 11.553L2.98597 12.1785L3.82152 13.014L4.44696 12.4622C4.9647 12.0053 5.67925 11.9109 6.27781 12.1591C6.87356 12.4062 7.31396 12.9765 7.35715 13.6676L7.40917 14.5Z" fill="currentColor"/>
  </svg>
);

const NavItem = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-2 h-[30px] rounded-md text-[14px] leading-[20px] tracking-[-0.15px] transition-colors relative
      ${active ? 'text-[#533afd] font-semibold' : 'text-[#353a44] font-normal hover:bg-[#f5f6f8]'}`}
  >
    {Icon && (
      <span className="w-6 h-6 flex items-center justify-center shrink-0">
        <div className="w-4 h-4 rounded bg-[#F5F6F8]" />
      </span>
    )}
    {!Icon && <span className="w-6 shrink-0" />}
    <span className="truncate">{label}</span>
  </button>
);

const NavGroup = ({ icon: Icon, label, children, defaultExpanded = false }) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className="w-full">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-2 h-[30px] rounded-md text-[14px] leading-[20px] tracking-[-0.15px] text-[#353a44] hover:bg-[#f5f6f8] transition-colors relative"
      >
        <span className="w-6 h-6 flex items-center justify-center shrink-0">
          {Icon && <div className="w-4 h-4 rounded bg-[#F5F6F8]" />}
        </span>
        <span className="flex-1 text-left truncate">{label}</span>
        <span className="w-4 h-4 flex items-center justify-center shrink-0">
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

const SectionHeading = ({ label }) => (
  <div className="h-[26px] flex items-center">
    <span className="text-[12px] leading-[20px] text-[#596171]">{label}</span>
  </div>
);

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

// Balances landing sub-components
const ActionButton = ({ iconName, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 px-3 py-[6px] bg-[#f5f6f8] rounded-full text-[14px] font-semibold text-[#353a44] hover:bg-[#e8eaed] transition-colors tracking-[-0.15px]"
  >
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

const ArrowRightIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const flagMap = { 'USD': flagUS, 'GBP': flagGB, 'EUR': flagEU };

const CurrencyPill = ({ code, amount }) => {
  const flagSrc = flagMap[code];
  return (
    <div className="h-[48px] flex flex-col items-start justify-center px-2 bg-white/60 rounded-md text-[12px]">
      <div className="flex items-center gap-1">
        {flagSrc ? <img src={flagSrc} alt="" className="w-4 h-4" /> : null}
        <span className="text-[#353a44] font-medium">{code}</span>
      </div>
      <span className="text-[#596171]">{amount}</span>
    </div>
  );
};

const BalanceCard = ({ title, amount, subtitle, currencies, actions, hasLock, gradient }) => (
  <div className={`w-[229px] rounded-xl p-4 flex flex-col ${gradient}`}>
    <div className="h-[72px] mb-4">
      <div className="flex items-start justify-between mb-1">
        <h3 className="text-[13px] font-medium text-[#353a44]">{title}</h3>
        {hasLock && (
          <div className="w-[30px] h-[30px] rounded-full bg-white flex items-center justify-center">
            <LockIcon />
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

const activityData = [
  { amount: '$44,792.05', status: 'In transit', description: { from: 'Payments balance', to: 'Wells Fargo Bank' }, date: 'Sep 26' },
  { amount: '$51,802.50', status: 'Paid', description: { from: 'Payments balance', to: 'Wells Fargo Bank' }, date: 'Sep 25' },
  { amount: '$81,771.20', status: 'Paid', description: { from: 'Payments balance', to: 'Wells Fargo Bank' }, date: 'Sep 24' },
  { amount: '$36,515.95', status: 'Paid', description: { from: 'Payments balance', to: 'Wells Fargo Bank' }, date: 'Sep 24' },
  { amount: '$44,535.49', status: 'Paid', description: { from: 'Payments balance', to: 'Wells Fargo Bank' }, date: 'Sep 24' },
];

const BalancesLandingView = ({ onGetStarted }) => {
  const [activeTab, setActiveTab] = useState('payments');
  const [viewMode, setViewMode] = useState('grid');

  return (
    <div className="flex-1 bg-white overflow-y-auto">
      <div className="p-8">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-[28px] font-semibold text-[#353a44] tracking-[-0.5px]">
            Balances <span className="font-normal text-[#353A44]">$113,049.82</span>
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
            <BalanceCard
              title="Payments balance"
              amount="$22,594.21"
              subtitle="$18,661.51 pending"
              currencies={[
                { code: 'USD', amount: '$2,819.49' },
                { code: 'GBP', amount: '£6,249.11' },
                { code: 'EUR', amount: '€3,125.99' },
              ]}
              actions={[<Icon key="payout" name="lightningBolt" size="small" fill="#474E5A" />, <Icon key="transfer" name="convert" size="small" fill="#474E5A" />, <Icon key="more" name="more" size="small" fill="#474E5A" />]}
              gradient="bg-white/70"
            />
            <BalanceCard
              title="Financial account"
              amount="$90,455.61"
              currencies={[
                { code: 'USD', amount: '$53,345.02' },
                { code: 'GBP', amount: '£29,220.94' },
              ]}
              actions={[<Icon key="transfer" name="convert" size="small" fill="#474E5A" />, <Icon key="send" name="send" size="small" fill="#474E5A" />, <Icon key="more" name="more" size="small" fill="#474E5A" />]}
              gradient="bg-white/70"
            />
            <BalanceCard
              title="Reserves"
              amount="$15,383.08"
              subtitle="$953.65 released tomorrow"
              hasLock
              currencies={[
                { code: 'USD', amount: '$10,391.93' },
                { code: 'GBP', amount: '£3,930.04' },
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
            <button className="mt-4 text-[14px] font-medium text-[#533afd] hover:underline">View more</button>
          </div>

          {/* Right Sidebar */}
          <div className="w-[280px] shrink-0">
            <h2 className="text-[16px] font-semibold text-[#353a44] mb-4">Upcoming</h2>
            <div className="flex flex-col gap-3 mb-8">
              <UpcomingItem month="SEP" day="29" amount="$39,997.37" description="Incoming → Payments balance" />
              <UpcomingItem month="SEP" day="30" amount="$44,792.05" description="Payments balance → Wells Fargo" />
            </div>
            {/* Issuing Promotion */}
            <div className="bg-[#f5f6f8] rounded-lg p-4 mb-8">
              <div className="text-[10px] font-semibold text-[#596171] uppercase tracking-wider mb-2">Issuing</div>
              <h3 className="font-bold text-[16px] text-[#21252c] leading-6 mb-1">Issue cards for your team and agents</h3>
              <p className="text-[13px] text-[#596171] leading-5 mb-3">
                Create virtual cards that people and AI agents can use to make purchases.
              </p>
              <button
                onClick={onGetStarted}
                className="text-[14px] font-semibold text-[#533afd] hover:underline"
              >
                Get started
              </button>
            </div>

            <h2 className="text-[16px] font-semibold text-[#353a44] mb-4">Resources</h2>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-[14px] font-semibold text-[#533afd] hover:underline">Manage cards</a>
              <a href="#" className="text-[14px] font-semibold text-[#533afd] hover:underline">Manage recipients</a>
              <a href="#" className="text-[14px] font-semibold text-[#533afd] hover:underline">Balance summary report</a>
              <a href="#" className="text-[14px] font-semibold text-[#533afd] hover:underline">Financial account report</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardView = () => {
  const [activeNav, setActiveNav] = useState('balances');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalKey, setModalKey] = useState(0);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [showBlueprintOverlay, setShowBlueprintOverlay] = useState(false);
  const [isBlueprintMinimized, setIsBlueprintMinimized] = useState(false);
  const [showSetupGuide, setShowSetupGuide] = useState(false);
  const [setupGuideCompletedTasks, setSetupGuideCompletedTasks] = useState(1);
  const [showAddFundsModal, setShowAddFundsModal] = useState(false);
  const [addFundsCompleted, setAddFundsCompleted] = useState(false);
  const [showAgentView, setShowAgentView] = useState(false);

  const handleResetPrototype = () => {
    setIsModalOpen(false);
    setIsOnboardingComplete(false);
    setShowBlueprintOverlay(false);
    setIsBlueprintMinimized(false);
    setShowSetupGuide(false);
    setSetupGuideCompletedTasks(1);
    setAddFundsCompleted(false);
    setModalKey(prev => prev + 1);
    setActiveNav('balances');
  };

  const handleOnboardingComplete = () => {
    setIsModalOpen(false);
    setIsOnboardingComplete(true);
  };

  const handleStartIntegrating = () => {
    setIsModalOpen(false);
    setIsOnboardingComplete(true);
    setIsBlueprintMinimized(false);
    setTimeout(() => {
      setShowBlueprintOverlay(true);
    }, 500);
  };

  const handleBlueprintExit = () => {
    setShowBlueprintOverlay(false);
    setShowSetupGuide(true);
    setSetupGuideCompletedTasks(4);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <div className="w-[228px] border-r border-[#ebeef1] flex flex-col h-full shrink-0 bg-white">
          <div className="h-[60px] flex items-center px-5">
            <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-6 h-6 rounded overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#675dff] via-[#a855f7] to-[#ec4899]">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 2L12 5V9L7 12L2 9V5L7 2Z" fill="white" fillOpacity="0.9"/>
                </svg>
              </div>
              <span className="font-semibold text-[14px] leading-[20px] tracking-[-0.15px] text-[#353a44]">Mickey's Mochis</span>
              <ChevronDownIcon className="text-[#6c7688]" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5">
            <div className="flex flex-col gap-7">
              <div className="flex flex-col">
                <NavItem icon={HomeIcon} label="Home" />
                <NavItem icon={BalancesIcon} label="Balances" active={activeNav === 'balances'} onClick={() => setActiveNav('balances')} />
                <NavItem icon={TransactionsIcon} label="Transactions" />
                <NavItem icon={CustomersIcon} label="Customers" />
                <NavItem icon={ProductIcon} label="Product catalog" />
              </div>

              <div className="flex flex-col">
                <SectionHeading label="Shortcuts" />
                <NavItem icon={PinIcon} label="Disputes" />
                <NavItem icon={PinIcon} label="Tax" />
                <NavItem icon={PinIcon} label="Reports" />
              </div>

              <div className="flex flex-col">
                <SectionHeading label="Products" />
                <NavGroup icon={ConnectIcon} label="Connect">
                  <NavItem label="Overview" />
                  <NavItem label="Connected accounts" />
                </NavGroup>
                <NavGroup icon={PaymentsIcon} label="Payments">
                  <NavItem label="Insights" />
                  <NavItem label="Disputes" />
                </NavGroup>
                <NavGroup icon={BillingIcon} label="Billing">
                  <NavItem label="Overview" />
                  <NavItem label="Subscriptions" />
                </NavGroup>
                <NavGroup icon={ReportingIcon} label="Reporting">
                  <NavItem label="Overview" />
                  <NavItem label="Reports" />
                </NavGroup>
                <NavGroup icon={MoreIcon} label="More">
                  <NavItem label="Tax" />
                  <NavItem label="Identity" />
                  <NavItem label="Atlas" />
                  <NavItem label="Issuing" />
                  <NavItem label="Financial connections" />
                  <NavItem label="Capital" />
                  <NavItem label="Climate" />
                  <NavItem label="Global Payouts" />
                </NavGroup>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar */}
          <div className="h-[60px] flex items-center justify-between px-6 shrink-0">
            <div className="flex-1 max-w-[400px]">
              <div className="flex items-center gap-2 px-3 py-2 bg-[#f5f6f8] rounded-lg text-[#6c7688]">
                <SearchIcon />
                <span className="text-sm">Search...</span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-[#6c7688]">
              <button className="hover:text-[#474e5a] p-1"><GridIcon /></button>
              <button className="hover:text-[#474e5a] p-1"><HelpIcon /></button>
              <button className="hover:text-[#474e5a] p-1"><NotificationIcon /></button>
              <button className="hover:text-[#474e5a] p-1"><SettingsIcon /></button>
              <button className="flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM10.9375 5C10.9375 4.48223 10.5178 4.0625 10 4.0625C9.48223 4.0625 9.0625 4.48223 9.0625 5V9.0625H5C4.48223 9.0625 4.0625 9.48223 4.0625 10C4.0625 10.5178 4.48223 10.9375 5 10.9375H9.0625V15C9.0625 15.5178 9.48223 15.9375 10 15.9375C10.5178 15.9375 10.9375 15.5178 10.9375 15V10.9375H15C15.5178 10.9375 15.9375 10.5178 15.9375 10C15.9375 9.48223 15.5178 9.0625 15 9.0625H10.9375V5Z" fill="#675DFF"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Page Content */}
          {showAgentView ? (
            <BalancesAgentView />
          ) : isOnboardingComplete ? (
            <>
              <BalancesEmptyView />
              <SetupGuide
                isOpen={showBlueprintOverlay || showSetupGuide}
                isPanelMinimized={isBlueprintMinimized}
                hideForModal={showAddFundsModal}
                completedTasks={setupGuideCompletedTasks}
                blueprintOpen={showBlueprintOverlay}
              />
              <BlueprintPanel
                isOpen={showBlueprintOverlay}
                onClose={handleBlueprintExit}
                isMinimized={isBlueprintMinimized}
                onMinimizeChange={setIsBlueprintMinimized}
                onAddFunds={() => setShowAddFundsModal(true)}
                addFundsCompleted={addFundsCompleted}
              />
            </>
          ) : (
            <BalancesLandingView onGetStarted={() => setIsModalOpen(true)} />
          )}
        </div>

        {/* Setup Issuing Modal */}
        <SetupIssuingModal
          key={modalKey}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onComplete={handleOnboardingComplete}
          onStartIntegrating={handleStartIntegrating}
        />

        {/* Prototype Control Panel */}
        <PrototypeControlPanel>
          <div className="space-y-1">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Jump to step</p>
            <div className="flex flex-col gap-1">
              <button
                onClick={handleResetPrototype}
                className="text-sm text-[#675dff] hover:text-[#5650e0] hover:underline text-left transition-colors"
              >
                1. Balances landing
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  setModalKey(prev => prev + 1);
                }}
                className="text-sm text-[#675dff] hover:text-[#5650e0] hover:underline text-left transition-colors"
              >
                2. Setup flow
              </button>
              <button
                onClick={() => {
                  setIsOnboardingComplete(true);
                  setIsModalOpen(false);
                  setShowBlueprintOverlay(false);
                  setShowSetupGuide(false);
                  setShowAgentView(false);
                }}
                className="text-sm text-[#675dff] hover:text-[#5650e0] hover:underline text-left transition-colors"
              >
                3. Balances (empty state)
              </button>
              <button
                onClick={() => {
                  setShowAgentView(true);
                  setIsModalOpen(false);
                  setShowBlueprintOverlay(false);
                  setShowSetupGuide(false);
                }}
                className="text-sm text-[#675dff] hover:text-[#5650e0] hover:underline text-left transition-colors"
              >
                4. Balances (agent-aware)
              </button>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-3">
            <button
              onClick={() => { handleResetPrototype(); setShowAgentView(false); }}
              className="w-full px-3 py-2 text-sm font-medium rounded-md transition-colors text-gray-600 border border-gray-300 hover:bg-gray-100"
            >
              Reset prototype
            </button>
          </div>
        </PrototypeControlPanel>
      </div>
    </div>
  );
};

export default DashboardView;
