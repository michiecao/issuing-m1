import React, { useState } from 'react';
import SetupIssuingModal from './SetupIssuingModal';
import IssuingHomeView from './IssuingHomeView';
import QuickstartGuideView, { BlueprintPanel, SetupGuide } from './QuickstartGuideView';
import BalancesView from './BalancesView';
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
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M7.99996 10C9.10453 10 9.99996 9.10457 9.99996 8C9.99996 6.89543 9.10453 6 7.99996 6C6.89539 6 5.99996 6.89543 5.99996 8C5.99996 9.10457 6.89539 10 7.99996 10ZM7.99996 11.5C9.93295 11.5 11.5 9.933 11.5 8C11.5 6.067 9.93295 4.5 7.99996 4.5C6.06696 4.5 4.49996 6.067 4.49996 8C4.49996 9.933 6.06696 11.5 7.99996 11.5Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M7.40917 14.5H8.59082L8.64285 13.6676C8.68604 12.9765 9.12642 12.4062 9.72215 12.1591C10.3207 11.9109 11.0352 12.0054 11.5529 12.4622L12.1784 13.014L13.0139 12.1785L12.4622 11.5531C12.0053 11.0354 11.9109 10.3208 12.1591 9.72222C12.4062 9.12646 12.9765 8.68604 13.6676 8.64285L14.5 8.59082V7.40918L13.6676 7.35715C12.9765 7.31396 12.4062 6.87355 12.1591 6.27781C11.9109 5.67926 12.0053 4.9647 12.4622 4.44695L13.0139 3.82163L12.1784 2.98608L11.553 3.53784C11.0353 3.99467 10.3207 4.0891 9.72218 3.84089C9.12644 3.59384 8.68604 3.02347 8.64285 2.33241L8.59082 1.5H7.40917L7.35715 2.33236C7.31396 3.02345 6.87354 3.59384 6.27778 3.8409C5.67921 4.08913 4.96463 3.99471 4.44686 3.53785L3.82153 2.98609L2.98598 3.82164L3.53784 4.44708C3.99465 4.9648 4.08908 5.67931 3.84088 6.27784C3.59384 6.87357 3.02348 7.31396 2.33245 7.35715L1.5 7.40917V8.59082L2.33241 8.64285C3.02346 8.68604 3.59383 9.12643 3.84089 9.72218C4.0891 10.3207 3.99467 11.0353 3.53784 11.553L2.98597 12.1785L3.82152 13.014L4.44696 12.4622C4.9647 12.0053 5.67925 11.9109 6.27781 12.1591C6.87356 12.4062 7.31396 12.9765 7.35715 13.6676L7.40917 14.5ZM4.51386 14.3779C4.57751 14.3386 4.63866 14.2934 4.69655 14.2424L5.4394 13.5869C5.51167 13.5231 5.61418 13.5078 5.70322 13.5447C5.79219 13.5816 5.85406 13.665 5.86007 13.7612L5.92186 14.7498C5.92668 14.8269 5.93797 14.902 5.95519 14.9748C5.96527 15.0175 5.9774 15.0593 5.99145 15.1002C6.17209 15.6264 6.67094 16 7.2526 16H8.7474C9.32903 16 9.82785 15.6264 10.0085 15.1003C10.0226 15.0594 10.0347 15.0175 10.0448 14.9749C10.062 14.9021 10.0733 14.8269 10.0781 14.7498L10.1399 13.7611C10.1459 13.665 10.2078 13.5816 10.2967 13.5447C10.3858 13.5078 10.4882 13.5232 10.5605 13.5869L11.3033 14.2424C11.3612 14.2935 11.4224 14.3387 11.4861 14.378C11.5234 14.401 11.5615 14.422 11.6004 14.441C12.1001 14.6852 12.717 14.5967 13.1283 14.1854L14.1853 13.1284C14.5966 12.7171 14.6851 12.1002 14.4408 11.6004C14.4218 11.5616 14.4009 11.5234 14.3779 11.4862C14.3385 11.4225 14.2934 11.3614 14.2423 11.3035L13.5869 10.5607C13.5231 10.4884 13.5077 10.3859 13.5447 10.2968C13.5816 10.2078 13.665 10.1459 13.7612 10.1399L14.7498 10.0781C14.8269 10.0733 14.902 10.062 14.9748 10.0448C15.0174 10.0347 15.0593 10.0226 15.1002 10.0086C15.6263 9.82795 16 9.32909 16 8.7474V7.2526C16 6.67093 15.6264 6.17209 15.1002 5.99144C15.0593 5.9774 15.0175 5.96527 14.9748 5.95519C14.902 5.93797 14.8269 5.92668 14.7498 5.92186L13.7612 5.86007C13.665 5.85406 13.5816 5.79219 13.5447 5.70321C13.5078 5.61417 13.5231 5.51166 13.5869 5.43938L14.2423 4.69666C14.2934 4.63873 14.3386 4.57754 14.3779 4.51384C14.4009 4.47658 14.4219 4.43846 14.4409 4.39963C14.6851 3.89987 14.5966 3.28297 14.1853 2.87168L13.1283 1.8147C12.717 1.40342 12.1001 1.31487 11.6004 1.55913C11.5615 1.57811 11.5234 1.5991 11.4861 1.6221C11.4224 1.66142 11.3613 1.70662 11.3033 1.75773L10.5606 2.41309C10.4883 2.47686 10.3858 2.49223 10.2968 2.4553C10.2078 2.41841 10.1459 2.33497 10.1399 2.23884L10.0781 1.25016C10.0733 1.17312 10.062 1.09795 10.0448 1.02516C10.0347 0.982504 10.0226 0.940667 10.0085 0.899751C9.8279 0.373623 9.32906 0 8.7474 0H7.2526C6.67091 0 6.17205 0.373663 5.99142 0.899834C5.97738 0.940737 5.96526 0.982562 5.95518 1.0252C5.93797 1.09798 5.92668 1.17314 5.92186 1.25016L5.86007 2.2388C5.85406 2.33495 5.79218 2.41842 5.70318 2.45532C5.61412 2.49225 5.51159 2.47688 5.43929 2.41309L4.69656 1.75774C4.63865 1.70665 4.57748 1.66146 4.51381 1.62215C4.47655 1.59915 4.43844 1.57817 4.39962 1.55919C3.89985 1.31487 3.2829 1.40341 2.87159 1.81472L1.81461 2.8717C1.40332 3.28298 1.31477 3.89987 1.55903 4.39963C1.57802 4.43848 1.59902 4.47662 1.62203 4.5139C1.66134 4.57758 1.70653 4.63876 1.75763 4.69667L2.41308 5.43951C2.47684 5.51177 2.4922 5.61425 2.45529 5.70326C2.4184 5.79221 2.33499 5.85406 2.23888 5.86007L1.25016 5.92186C1.17311 5.92668 1.09792 5.93797 1.02512 5.9552C0.982451 5.96529 0.940602 5.97742 0.899674 5.99147C0.373587 6.17215 0 6.67097 0 7.2526V8.7474C0 9.32905 0.373619 9.82789 0.899741 10.0085C0.940658 10.0226 0.982497 10.0347 1.02516 10.0448C1.09795 10.062 1.17312 10.0733 1.25016 10.0781L2.23884 10.1399C2.33497 10.1459 2.41841 10.2078 2.4553 10.2968C2.49222 10.3858 2.47686 10.4883 2.41309 10.5606L1.75762 11.3034C1.70654 11.3613 1.66137 11.4225 1.62207 11.4861C1.59906 11.5234 1.57806 11.5615 1.55907 11.6004C1.31475 12.1001 1.40328 12.7171 1.81459 13.1284L2.87157 14.1854C3.28289 14.5967 3.89985 14.6852 4.39963 14.4409C4.43846 14.4219 4.47659 14.4009 4.51386 14.3779Z" fill="currentColor"/>
  </svg>
);

const GridIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 8.5C5.10457 8.5 6 9.39543 6 10.5V12.5C6 13.5357 5.21278 14.387 4.2041 14.4893L4 14.5H2L1.7959 14.4893C0.854346 14.3938 0.1062 13.6457 0.0107422 12.7041L0 12.5V10.5C0 9.39543 0.895431 8.5 2 8.5H4ZM12 8.5C13.1046 8.5 14 9.39543 14 10.5V12.5C14 13.5357 13.2128 14.387 12.2041 14.4893L12 14.5H10L9.7959 14.4893C8.85435 14.3938 8.1062 13.6457 8.01074 12.7041L8 12.5V10.5C8 9.39543 8.89543 8.5 10 8.5H12ZM2 10C1.72386 10 1.5 10.2239 1.5 10.5V12.5C1.5 12.7761 1.72386 13 2 13H4C4.27614 13 4.5 12.7761 4.5 12.5V10.5C4.5 10.2239 4.27614 10 4 10H2ZM10 10C9.72386 10 9.5 10.2239 9.5 10.5V12.5C9.5 12.7761 9.72386 13 10 13H12C12.2761 13 12.5 12.7761 12.5 12.5V10.5C12.5 10.2239 12.2761 10 12 10H10ZM11 0C11.4142 0 11.75 0.335786 11.75 0.75V2.75H13.75C14.1642 2.75 14.5 3.08579 14.5 3.5C14.5 3.91421 14.1642 4.25 13.75 4.25H11.75V6.25C11.75 6.66421 11.4142 7 11 7C10.5858 7 10.25 6.66421 10.25 6.25V4.25H8.25C7.83579 4.25 7.5 3.91421 7.5 3.5C7.5 3.08579 7.83579 2.75 8.25 2.75H10.25V0.75C10.25 0.335786 10.5858 0 11 0ZM4 0.5C5.10457 0.5 6 1.39543 6 2.5V4.5C6 5.53565 5.21278 6.387 4.2041 6.48926L4 6.5H2L1.7959 6.48926C0.854346 6.3938 0.1062 5.64565 0.0107422 4.7041L0 4.5V2.5C0 1.39543 0.895431 0.5 2 0.5H4ZM2 2C1.72386 2 1.5 2.22386 1.5 2.5V4.5C1.5 4.77614 1.72386 5 2 5H4C4.27614 5 4.5 4.77614 4.5 4.5V2.5C4.5 2.22386 4.27614 2 4 2H2Z" fill="currentColor"/>
  </svg>
);

const NotificationIcon = () => (
  <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M4.0051 13H1.79025C0.758771 13 0.000917067 12.153 8.31685e-07 11.2109C-0.000238151 10.9652 0.0510196 10.713 0.16235 10.4677L0.639293 9.41667C1.21442 8.1493 1.55644 6.78835 1.64889 5.39928L1.6762 4.98893C1.86305 2.18151 4.19099 0 7 0C9.80901 0 12.1369 2.18151 12.3238 4.98893L12.3511 5.39928C12.4436 6.78835 12.7856 8.1493 13.3607 9.41667L13.8376 10.4677C13.949 10.713 14.0002 10.9652 14 11.2109C13.9991 12.153 13.2412 13 12.2097 13H9.99521C9.99521 14.6569 8.65428 16 7.00015 16C5.34603 16 4.0051 14.6569 4.0051 13ZM1.52565 11.0884L2.00259 10.0374C2.65229 8.60567 3.03866 7.06825 3.1431 5.49905L3.17041 5.0887C3.30482 3.06923 4.97938 1.5 7 1.5C9.02062 1.5 10.6952 3.06923 10.8296 5.0887L10.8569 5.49905C10.9613 7.06825 11.3477 8.60567 11.9974 10.0374L12.4744 11.0884C12.5618 11.2811 12.4211 11.5 12.2097 11.5H1.79025C1.57886 11.5 1.43817 11.2811 1.52565 11.0884ZM5.50263 13C5.50263 13.8284 6.17309 14.5 7.00015 14.5C7.82721 14.5 8.49768 13.8284 8.49768 13H5.50263Z" fill="currentColor"/>
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
      <span className="w-6 h-6 flex items-center justify-center shrink-0">
        <div className="w-4 h-4 rounded bg-[#F5F6F8]" />
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
  const [modalInitialStep, setModalInitialStep] = useState(0); // Initial step for the modal
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [showQuickstartGuide, setShowQuickstartGuide] = useState(false);
  const [showBlueprintOverlay, setShowBlueprintOverlay] = useState(false);
  const [isBlueprintMinimized, setIsBlueprintMinimized] = useState(false);
  const [showBalancesView, setShowBalancesView] = useState(false);
  const [showBalancesCreateCardsModal, setShowBalancesCreateCardsModal] = useState(false);
  const [onboardingPath, setOnboardingPath] = useState('happy'); // 'happy', 'kyc', 'declined'
  const [showAddFundsModal, setShowAddFundsModal] = useState(false);
  const [addFundsCompleted, setAddFundsCompleted] = useState(false);
  const [showSetupGuide, setShowSetupGuide] = useState(false);
  const [setupGuideCompletedTasks, setSetupGuideCompletedTasks] = useState(1);

  const handleResetPrototype = () => {
    setIsModalOpen(false);
    setIsOnboardingComplete(false);
    setShowQuickstartGuide(false);
    setShowBlueprintOverlay(false);
    setIsBlueprintMinimized(false);
    setShowBalancesView(false);
    setShowBalancesCreateCardsModal(false);
    setModalInitialStep(0);
    setModalKey(prev => prev + 1); // Increment key to remount modal with fresh state
    setAddFundsCompleted(false);
    setShowSetupGuide(false);
    setSetupGuideCompletedTasks(1);
  };
  
  // Handle exiting the blueprint - show setup guide with completed tasks
  const handleBlueprintExit = () => {
    setShowBlueprintOverlay(false);
    setShowSetupGuide(true);
    setSetupGuideCompletedTasks(4); // All tasks except "Spend with card"
  };
  
  // Jump to landing view (initial state)
  const handleJumpToLanding = () => {
    handleResetPrototype();
  };
  
  // Jump to final screen (success or declined depending on path)
  const handleJumpToSuccess = () => {
    setIsOnboardingComplete(false);
    setShowQuickstartGuide(false);
    setShowBlueprintOverlay(false);
    setIsBlueprintMinimized(false);
    // Happy/KYC paths: step 7 is final, Declined: step 4 is final
    setModalInitialStep(onboardingPath === 'declined' ? 4 : 7);
    setModalKey(prev => prev + 1);
    setIsModalOpen(true);
  };
  
  // Jump to Issuing dashboard view (with charts) - shows blueprint minimized
  const handleJumpToDashboard = () => {
    setIsOnboardingComplete(true);
    setShowQuickstartGuide(false);
    setShowBlueprintOverlay(true);
    setIsBlueprintMinimized(true); // Start minimized - only bottom bar visible
    setShowBalancesView(false);
    setActiveNav('issuing');
    setIsModalOpen(false);
  };

  const handleOnboardingComplete = () => {
    setIsModalOpen(false);
    setIsOnboardingComplete(true);
  };

  // "Start integrating" -> Show Issuing tab with Blueprint overlay
  // First transition to Issuing tab, then after 1 second, slide in the blueprint panel
  const handleStartIntegrating = () => {
    setIsModalOpen(false);
    setIsOnboardingComplete(true);
    // Start with blueprint expanded
    setIsBlueprintMinimized(false);
    // Delay the blueprint panel opening by 500ms to allow the view transition to complete
    setTimeout(() => {
      setShowBlueprintOverlay(true);
    }, 500);
  };

  // "View Issuing docs" -> Show Quickstart guide
  const handleViewIssuingDocs = () => {
    setIsModalOpen(false);
    setShowQuickstartGuide(true);
  };

  // "Go to Balances" -> Show Balances view with Create Cards modal (from dashboard setup path)
  const handleGoToBalances = () => {
    setIsModalOpen(false);
    setShowBalancesView(true);
    setShowBalancesCreateCardsModal(true);
    setActiveNav('balances');
  };

  // Jump to Balances view
  const handleJumpToBalances = () => {
    setIsOnboardingComplete(false);
    setShowQuickstartGuide(false);
    setShowBlueprintOverlay(false);
    setIsBlueprintMinimized(false);
    setShowBalancesView(true);
    setShowBalancesCreateCardsModal(false);
    setActiveNav('balances');
    setIsModalOpen(false);
  };
  

  // Render Quickstart Guide as a standalone full-page view (no dashboard sidebar)
  if (showQuickstartGuide) {
    return (
      <div className="flex h-screen bg-white">
        <QuickstartGuideView onExit={() => setShowQuickstartGuide(false)} />
        
        {/* Prototype Control Panel */}
        <PrototypeControlPanel>
          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Onboarding path</p>
            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="onboardingPath"
                  value="happy"
                  checked={onboardingPath === 'happy'}
                  onChange={(e) => setOnboardingPath(e.target.value)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm text-gray-700">Happy path</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="onboardingPath"
                  value="kyc"
                  checked={onboardingPath === 'kyc'}
                  onChange={(e) => setOnboardingPath(e.target.value)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm text-gray-700">Needs KYC</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="onboardingPath"
                  value="declined"
                  checked={onboardingPath === 'declined'}
                  onChange={(e) => setOnboardingPath(e.target.value)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm text-gray-700">Declined</span>
              </label>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-3 space-y-1">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Jump to step</p>
            <div className="flex flex-col gap-1">
              <button
                onClick={handleJumpToLanding}
                className="text-sm text-[#675dff] hover:text-[#5650e0] hover:underline text-left transition-colors"
              >
                1. Landing view
              </button>
              <button
                onClick={handleJumpToSuccess}
                className="text-sm text-[#675dff] hover:text-[#5650e0] hover:underline text-left transition-colors"
              >
                2. {onboardingPath === 'declined' ? 'Declined view' : '"You\'re ready" view'}
              </button>
              {onboardingPath !== 'declined' && (
                <button
                  onClick={handleJumpToDashboard}
                  className="text-sm text-[#675dff] hover:text-[#5650e0] hover:underline text-left transition-colors"
                >
                  3. Issuing dashboard
                </button>
              )}
            </div>
          </div>
          <div className="border-t border-gray-200 pt-3">
            <button
              onClick={handleResetPrototype}
              className="w-full px-3 py-2 text-sm font-medium rounded-md transition-colors text-gray-600 border border-gray-300 hover:bg-gray-100"
            >
              Reset prototype
            </button>
          </div>
        </PrototypeControlPanel>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-[228px] border-r border-[#ebeef1] flex flex-col h-full shrink-0 bg-white">
        {/* Account Header */}
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
        <div className="h-[60px] flex items-center justify-between px-6 shrink-0">
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
            <button className="flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM10.9375 5C10.9375 4.48223 10.5178 4.0625 10 4.0625C9.48223 4.0625 9.0625 4.48223 9.0625 5V9.0625H5C4.48223 9.0625 4.0625 9.48223 4.0625 10C4.0625 10.5178 4.48223 10.9375 5 10.9375H9.0625V15C9.0625 15.5178 9.48223 15.9375 10 15.9375C10.5178 15.9375 10.9375 15.5178 10.9375 15V10.9375H15C15.5178 10.9375 15.9375 10.5178 15.9375 10C15.9375 9.48223 15.5178 9.0625 15 9.0625H10.9375V5Z" fill="#675DFF"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Page Content */}
        {showBalancesView ? (
          /* Balances View - shown after "Manage in dashboard" setup */
          <BalancesView 
            showCreateCardsModal={showBalancesCreateCardsModal}
            onCloseCreateCardsModal={() => setShowBalancesCreateCardsModal(false)}
          />
        ) : isOnboardingComplete ? (
          /* Issuing Home View - shown after onboarding */
          <>
            <IssuingHomeView 
              externalAddFundsOpen={showAddFundsModal}
              onExternalAddFundsClose={() => setShowAddFundsModal(false)}
              onAddFundsComplete={() => {
                setAddFundsCompleted(true);
                // Re-expand the blueprint overlay after adding funds
                setIsBlueprintMinimized(false);
              }}
            />
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
          <div className="flex-1 overflow-y-auto px-6 pb-10 pt-6">
            <div className="w-full">
              {/* Hero Section */}
              <div className="bg-[#f5f6f8] rounded-xl px-[72px] pt-[60px] pb-[40px] relative overflow-hidden mb-4 w-full">
                {/* Product Badge */}
                <div className="absolute top-3 left-3 bg-white rounded-lg px-2 py-2">
                  <span className="text-[12px] font-semibold text-[#353a44] leading-[16px]">Issuing</span>
                </div>

                <div className="flex gap-4 items-center">
                  {/* Left Content */}
                  <div className="w-[500px] shrink-0">
                    <h1 className="text-[40px] font-bold text-[#353a44] leading-[48px] tracking-[0.37px] mb-2" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
                      Launch your card program in minutes, not months
                    </h1>
                    <p className="text-[20px] text-[#596171] leading-[28px] tracking-[0.3px] mb-[22px]" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
                      Launch, manage, and scale a commercial card program without any setup fees.
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

                  {/* Card Visual */}
                  <div className="flex-1 flex items-center justify-center shrink-0">
                    <img 
                      src={new URL('../../assets/issuing-card-hero.png', import.meta.url).href}
                      alt="Issuing card"
                      className="w-[1000px] min-w-[600px] h-auto drop-shadow-2xl"
                    />
                  </div>
                </div>
              </div>

              {/* Info Cards */}
              <div className="flex gap-4 w-full">
                <CalloutCard
                  title="Supportable use cases"
                  description="Learn more about all the supportable use cases and find one to start."
                  linkText="Learn more"
                />
                <CalloutCard
                  title="Quickstart guide"
                  description="Learn how to quickly set up a card issuing program using the Stripe Issuing API."
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
        onStartIntegrating={handleStartIntegrating}
        onViewDocs={handleViewIssuingDocs}
        onGoToBalances={handleGoToBalances}
        initialStep={modalInitialStep}
        onboardingPath={onboardingPath}
      />

      {/* Prototype Control Panel */}
      <PrototypeControlPanel>
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Onboarding path</p>
          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="onboardingPath"
                value="happy"
                checked={onboardingPath === 'happy'}
                onChange={(e) => setOnboardingPath(e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm text-gray-700">Happy path</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="onboardingPath"
                value="kyc"
                checked={onboardingPath === 'kyc'}
                onChange={(e) => setOnboardingPath(e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm text-gray-700">Needs KYC</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="onboardingPath"
                value="declined"
                checked={onboardingPath === 'declined'}
                onChange={(e) => setOnboardingPath(e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm text-gray-700">Declined</span>
            </label>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-3 space-y-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Jump to step</p>
          <div className="flex flex-col gap-1">
            <button
              onClick={handleJumpToLanding}
              className="text-sm text-[#675dff] hover:text-[#5650e0] hover:underline text-left transition-colors"
            >
              1. Landing view
            </button>
            <button
              onClick={handleJumpToSuccess}
              className="text-sm text-[#675dff] hover:text-[#5650e0] hover:underline text-left transition-colors"
            >
              2. {onboardingPath === 'declined' ? 'Declined view' : '"You\'re ready" view'}
            </button>
            {onboardingPath !== 'declined' && (
              <button
                onClick={handleJumpToDashboard}
                className="text-sm text-[#675dff] hover:text-[#5650e0] hover:underline text-left transition-colors"
              >
                3. Issuing dashboard
              </button>
            )}
            <button
              onClick={handleJumpToBalances}
              className="text-sm text-[#675dff] hover:text-[#5650e0] hover:underline text-left transition-colors"
            >
              4. Balances view
            </button>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-3">
          <button
            onClick={handleResetPrototype}
            className="w-full px-3 py-2 text-sm font-medium rounded-md transition-colors text-gray-600 border border-gray-300 hover:bg-gray-100"
          >
            Reset prototype
          </button>
        </div>
      </PrototypeControlPanel>
    </div>
  );
};

export default DashboardView;

