import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Icon } from '../../icons/SailIcons';
import { Button } from '../../components/sail/Button';
import SandboxBanner from '../../components/SandboxBanner';
import starterIllustrationUrl from '../../assets/setup-starter-illustration.svg';
import growthIllustrationUrl from '../../assets/setup-growth-illustration.svg';


// Edit Icon
const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.5 2.5L13.5 4.5M10 14H14M2 10L1.5 14L5.5 13.5L13.5 5.5L10.5 2.5L2 11V10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Chevron Right Icon
const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Chevron Down Icon (for toggles/accordions)
const ChevronDownIcon = ({ className }) => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M0.381282 4.38128C0.72299 4.03957 1.27701 4.03957 1.61872 4.38128L8 10.7626L14.3813 4.38128C14.723 4.03957 15.277 4.03957 15.6187 4.38128C15.9604 4.72299 15.9604 5.27701 15.6187 5.61872L8.61872 12.6187C8.27701 12.9604 7.72299 12.9604 7.38128 12.6187L0.381282 5.61872C0.0395728 5.27701 0.0395728 4.72299 0.381282 4.38128Z" fill="currentColor"/>
  </svg>
);

// Up-Down Arrow Icon (for form selects)
const SelectChevronIcon = ({ className }) => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <mask id="mask0_select_chevron" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
      <path fillRule="evenodd" clipRule="evenodd" d="M2.34963 9.91465C2.67291 9.55546 3.22617 9.52634 3.58536 9.84962L7.99991 13.8228L12.4148 9.84961C12.774 9.52634 13.3272 9.55547 13.6505 9.91467C13.9738 10.2739 13.9446 10.8271 13.5854 11.1504L8.58522 15.6504C8.41884 15.8001 8.20937 15.875 7.99991 15.875C7.79041 15.875 7.58092 15.8001 7.41453 15.6504L2.41466 11.1504C2.05546 10.8271 2.02635 10.2738 2.34963 9.91465Z" fill="#474E5A"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M7.41453 0.349625C7.58092 0.199871 7.79041 0.124995 7.99991 0.125C8.20937 0.125005 8.41884 0.199873 8.58522 0.349605L13.5854 4.84961C13.9446 5.17287 13.9738 5.72613 13.6505 6.08533C13.3272 6.44453 12.774 6.47366 12.4148 6.15039L7.99991 2.17719L3.58536 6.15038C3.22617 6.47366 2.67291 6.44454 2.34963 6.08535C2.02635 5.72616 2.05546 5.17291 2.41466 4.84962L7.41453 0.349625Z" fill="#474E5A"/>
    </mask>
    <g mask="url(#mask0_select_chevron)">
      <rect width="16" height="16" fill="currentColor"/>
    </g>
  </svg>
);

// Balance/Financial Accounts Icon
const BalanceIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.5 3C1.5 2.37868 2.00368 1.875 2.625 1.875H13.875C14.4963 1.875 15 2.37868 15 3C15 3.62132 14.4963 4.125 13.875 4.125H2.625C2.00368 4.125 1.5 3.62132 1.5 3Z" fill="#675DFF"/>
    <path d="M1.5 15C1.5 14.3787 2.00368 13.875 2.625 13.875H10.125C10.7463 13.875 11.25 14.3787 11.25 15C11.25 15.6213 10.7463 16.125 10.125 16.125H2.625C2.00368 16.125 1.5 15.6213 1.5 15Z" fill="#675DFF"/>
    <path d="M4.875 7.875C4.25368 7.875 3.75 8.37868 3.75 9C3.75 9.62132 4.25368 10.125 4.875 10.125H16.125C16.7463 10.125 17.25 9.62132 17.25 9C17.25 8.37868 16.7463 7.875 16.125 7.875H4.875Z" fill="#675DFF"/>
    <path d="M3.75 21C3.75 20.3787 4.25368 19.875 4.875 19.875H10.875C11.4963 19.875 12 20.3787 12 21C12 21.6213 11.4963 22.125 10.875 22.125H4.875C4.25368 22.125 3.75 21.6213 3.75 21Z" fill="#675DFF"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M24 17.25C24 20.1495 21.6495 22.5 18.75 22.5C15.8505 22.5 13.5 20.1495 13.5 17.25C13.5 14.3505 15.8505 12 18.75 12C21.6495 12 24 14.3505 24 17.25ZM21.75 17.25C21.75 18.9069 20.4069 20.25 18.75 20.25C17.0931 20.25 15.75 18.9069 15.75 17.25C15.75 15.5931 17.0931 14.25 18.75 14.25C20.4069 14.25 21.75 15.5931 21.75 17.25Z" fill="#675DFF"/>
  </svg>
);

// Agentic Toolkit Icon (sparkle)
const AgenticToolkitIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 1L11.1 7.9L18 10L11.1 12.1L9 19L6.9 12.1L0 10L6.9 7.9L9 1Z" fill="#675DFF"/>
    <path d="M18.5 12L19.8 16.2L24 17.5L19.8 18.8L18.5 23L17.2 18.8L13 17.5L17.2 16.2L18.5 12Z" fill="#675DFF"/>
  </svg>
);

// API Icon - Terminal/code style
const ApiIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M19.5 3.75H4.5C3.25736 3.75 2.25 4.75736 2.25 6V18C2.25 19.2426 3.25736 20.25 4.5 20.25H19.5C20.7426 20.25 21.75 19.2426 21.75 18V6C21.75 4.75736 20.7426 3.75 19.5 3.75ZM4.5 1.5C2.01472 1.5 0 3.51472 0 6V18C0 20.4853 2.01472 22.5 4.5 22.5H19.5C21.9853 22.5 24 20.4853 24 18V6C24 3.51472 21.9853 1.5 19.5 1.5H4.5Z" fill="#675DFF"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M5.14584 6.76786C5.55019 6.29612 6.2604 6.24149 6.73214 6.64584L11.9821 11.1458C12.2315 11.3596 12.375 11.6716 12.375 12C12.375 12.3284 12.2315 12.6404 11.9821 12.8542L6.73214 17.3542C6.2604 17.7585 5.55019 17.7039 5.14584 17.2321C4.74149 16.7604 4.79612 16.0502 5.26786 15.6458L9.52134 12L5.26786 8.35416C4.79612 7.94981 4.74149 7.2396 5.14584 6.76786Z" fill="#675DFF"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 16.125C12 15.5037 12.5037 15 13.125 15H18.375C18.9963 15 19.5 15.5037 19.5 16.125C19.5 16.7463 18.9963 17.25 18.375 17.25H13.125C12.5037 17.25 12 16.7463 12 16.125Z" fill="#675DFF"/>
  </svg>
);

// Task List Item Component
const TaskListItem = ({ label, status, isLast, onClick }) => {
  const isActive = status === 'active';
  const isComplete = status === 'complete';
  const isClickable = isComplete && onClick;
  
  const handleClick = () => {
    if (isClickable) {
      onClick();
    }
  };
  
  return (
    <div className="flex flex-col">
      <div 
        className={`flex gap-2 items-start group ${isClickable ? 'cursor-pointer' : ''}`}
        onClick={handleClick}
      >
        {/* Progress Indicator */}
        <div className="w-5 h-5 flex items-center justify-center shrink-0">
          {isComplete ? (
            <div className="w-5 h-5 rounded-full bg-[#675dff] flex items-center justify-center">
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          ) : isActive ? (
            <div className="w-5 h-5 rounded-full border-[3px] border-[#675dff]" />
          ) : (
            <div className="w-5 h-5 rounded-full border-[1.5px] border-[#d8dee4]" />
          )}
        </div>
        
        {/* Label */}
        <span className={`text-sm leading-5 tracking-[-0.15px] ${isActive ? 'text-[#533afd]' : 'text-[#596171]'} ${isClickable ? 'group-hover:text-[#533afd]' : ''}`}>
          {label}
        </span>
      </div>
      
      {/* Connector Line */}
      {!isLast && (
        <div className="w-5 flex justify-center py-0.5">
          <div className="w-0 h-4 border-l border-dashed border-[#d8dee4]" />
        </div>
      )}
    </div>
  );
};

// Use Case Option Component (with description)
const UseCaseOption = ({ title, description, selected, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-[14px] py-[10px] rounded-lg transition-colors ${
      selected 
        ? 'border border-[#675dff] ring-1 ring-[#675dff] bg-white' 
        : 'border border-[#d8dee4] bg-white hover:border-[#a3acba]'
    }`}
  >
    <h4 className="font-semibold text-[16px] text-[#353a44] leading-6">{title}</h4>
    {description && <p className="text-[14px] text-[#596171] leading-5">{description}</p>}
  </button>
);

// Info Card Component
const InfoCard = ({ title, children, onEdit }) => (
  <div className="border border-[#d5dbe1] rounded-lg p-6">
    <div className="flex items-start justify-between mb-1">
      <h4 className="font-semibold text-[16px] text-[#353a44]">{title}</h4>
      <button 
        onClick={onEdit}
        className="text-[#6c7688] hover:text-[#474e5a] p-1"
      >
        <EditIcon />
      </button>
    </div>
    {children}
  </div>
);

// Feature Item Component for setup type cards
const FeatureItem = ({ children }) => (
  <div className="flex gap-2 items-center">
    <span className="w-[4px] h-[4px] rounded-full bg-[#596171] shrink-0" />
    <span className="text-[14px] text-[#596171] leading-5">{children}</span>
  </div>
);

// Setup Type Card Component - With illustration and feature list
const SetupTypeCard = ({ title, description, features, selected, onClick, illustrationSrc }) => (
  <button
    onClick={onClick}
    className={`w-full text-left rounded-xl transition-colors relative ${
      selected 
        ? 'border border-[#675dff] ring-1 ring-[#675dff] bg-white' 
        : 'border border-[#d8dee4] bg-white hover:border-[#a3acba]'
    }`}
  >
    <div className="flex items-stretch h-[135px]">
      {illustrationSrc && (
        <div className="w-[180px] shrink-0 rounded-l-xl overflow-hidden">
          <img src={illustrationSrc} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="flex-1 min-w-0 py-3 px-4">
        <h3 className="font-semibold text-[16px] text-[#353a44] leading-6">
          {title}
        </h3>
        {description && <p className="text-[13px] text-[#8a919e] leading-5 mt-0.5">{description}</p>}
        <div className={`flex flex-col gap-0.5 ${description ? 'mt-3' : 'mt-1.5'}`}>
          {features.map((feature, index) => (
            <FeatureItem key={index}>{feature}</FeatureItem>
          ))}
        </div>
      </div>
    </div>
  </button>
);

// Right Sidebar Callout for Choose Setup Type step
const CustomSetupCallout = () => (
  <div className="w-[278px] bg-[#f5f6f8] rounded-lg p-4">
    <h4 className="font-bold text-[16px] text-[#3d3d3d] leading-6 tracking-[-0.31px] mb-1">
      Issuing pricing
    </h4>
    <p className="text-[14px] text-[#596171] leading-5 tracking-[-0.15px] mb-4">
      Learn more about Issuing pricing for the Growth plan, including per-card and transaction fees.
    </p>
    <a href="#" className="text-[14px] font-semibold text-[#533afd] hover:underline">
      View pricing
    </a>
  </div>
);

// Step: Choose Setup Type Content
const ChooseSetupTypeContent = ({ onContinue, selectedSetupType, setSelectedSetupType }) => (
  <div className="w-full max-w-[580px] px-4">
    <div className="mb-8">
      <h1 className="text-[28px] font-bold text-[#353a44] leading-[36px] tracking-[0.38px] mb-2">
        Choose the setup that fits your needs
      </h1>
      <p className="text-[16px] text-[#596171] leading-[24px] tracking-[-0.31px]">
        You can always upgrade as your card program grows.
      </p>
    </div>
    
    <div className="flex flex-col gap-3">
      <SetupTypeCard
        title="Starter"
        description=""
        features={[
          'No integration required',
          'Create cards in the Dashboard',
          'Free',
        ]}
        selected={selectedSetupType === 'starter'}
        onClick={() => setSelectedSetupType('starter')}
        illustrationSrc={starterIllustrationUrl}
      />
      
      <SetupTypeCard
        title="Growth"
        description=""
        features={[
          'Scale quickly via the API',
          'Create cards via Dashboard and API',
          'Pay as you go',
        ]}
        selected={selectedSetupType === 'growth'}
        onClick={() => setSelectedSetupType('growth')}
        illustrationSrc={growthIllustrationUrl}
      />
    </div>

    <div className="mt-6 mb-6">
      <button 
        onClick={onContinue}
        disabled={!selectedSetupType}
        className={`w-full py-3 font-bold text-[16px] rounded-md transition-colors text-white ${
          !selectedSetupType
            ? 'bg-[#625afa]/50 cursor-not-allowed'
            : 'bg-[#625afa] hover:bg-[#5650e0]'
        }`}
      >
        Continue
      </button>
    </div>

    <p className="text-[14px] text-[#596171] leading-[20px]">
      Interested in custom options or a revenue sharing model?{' '}
      <span className="text-[#533AFD] cursor-pointer hover:underline">Contact us</span>
    </p>
  </div>
);

// Step 1: Review Information Content
const ReviewInfoContent = ({ onContinue }) => (
  <div className="w-full max-w-[580px] px-4">
    {/* Page Header */}
    <div className="mb-8">
      <h1 className="text-[28px] font-bold text-[#353a44] leading-[36px] mb-2">
        Review your information
      </h1>
      <p className="text-[16px] text-[#596171] leading-[24px]">
        Make sure that the following information is complete and accurate.
      </p>
    </div>
    
    {/* Business Details */}
    <div className="mb-8">
      <h3 className="font-semibold text-[16px] text-[#353a44] mb-2">Business details</h3>
      <InfoCard title="Acme Inc." onEdit={() => {}}>
        <div className="text-sm text-[#414552] leading-5 space-y-0">
          <p>www.acme.com</p>
          <p>101 SW Water Ave</p>
          <p>Portland, OR 97211</p>
          <p>http://acme.inc</p>
          <p>(123)456-7890</p>
        </div>
        <div className="mt-4">
          <p className="font-semibold text-[16px] text-[#353a44]">Other information provided</p>
          <p className="text-sm text-[#414552]">EIN, DBA, Industry</p>
        </div>
      </InfoCard>
    </div>
    
    {/* Business Owners */}
    <div className="mb-8">
      <h3 className="font-semibold text-[16px] text-[#353a44] mb-2">Business owners</h3>
      <InfoCard title="Cedar Andrews (you)" onEdit={() => {}}>
        <div className="text-sm text-[#414552] leading-5 space-y-0">
          <p>Co-founder and CEO</p>
          <p>cedar@grotto.com</p>
          <p>354 Oyster Point Blvd, South San Francisco CA 94080</p>
        </div>
        <div className="mt-4">
          <p className="font-semibold text-[16px] text-[#353a44]">Other information provided</p>
          <p className="text-sm text-[#414552]">EISSNIN, Job title, Phone</p>
        </div>
      </InfoCard>
    </div>
    
    {/* Continue Button */}
    <div className="flex justify-center">
      <button 
        onClick={onContinue}
        className="w-full py-3 bg-[#625afa] hover:bg-[#5650e0] text-white font-bold text-[16px] rounded-md transition-colors"
      >
        Continue
      </button>
    </div>
  </div>
);

// Disabled Continue Button styles - stays purple when disabled per Figma design
const continueButtonClasses = (disabled) => 
  `w-full py-3 font-bold text-[16px] rounded-md transition-colors text-white ${
    disabled 
      ? 'bg-[#533afd]/50 cursor-not-allowed' 
      : 'bg-[#533afd] hover:bg-[#4730d9]'
  }`;

const DESCRIPTION_PLACEHOLDERS = {
  corporate: 'e.g. Our finance team funds corporate cards from our operating account for department leads to manage team travel, software subscriptions, and office supplies. Each cardholder has a monthly limit set by their manager.',
  b2b: 'e.g. We run an e-commerce procurement platform and issue cards to our merchant partners to purchase inventory from verified suppliers. Funds are pre-loaded from merchant deposits held in their platform accounts.',
  ondemand: 'e.g. Our platform dispatches delivery drivers who use cards to purchase items on behalf of customers. Cards are loaded per-order from customer prepayments processed through our platform.',
};

const DESCRIPTION_PREFILLS = {
  corporate: 'Our company issues virtual debit cards to department leads and project managers for business-related expenses including software subscriptions, team travel, client entertainment, and office supplies. Cards are funded from our corporate operating account and each cardholder is assigned a monthly spending limit approved by the finance team.',
  b2b: 'We operate a wholesale procurement platform connecting retailers with suppliers. We issue virtual cards to our merchant partners so they can purchase inventory directly from our verified supplier network. Card balances are funded from merchant deposits held in their platform wallets, with per-transaction limits based on order size.',
  ondemand: 'Our on-demand delivery platform issues single-use virtual cards to couriers for purchasing items on behalf of customers. Each card is loaded with the exact order amount from customer prepayments collected at checkout. Cards are automatically deactivated after the purchase is completed.',
};

const DESCRIPTION_PREFILL_LOW_QUALITY = 'We are a company that wants to issue cards. We think Stripe Issuing would be a great fit for our needs. We would like to get started as soon as possible and are excited to begin using the product. Please approve our application so we can move forward with our plans.';

const DESCRIPTION_PREFILL_GIBBERISH = 'test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test';

const DESCRIPTION_MIN_CHARS = 200;

const isGibberishDescription = (text) => {
  const trimmed = text.trim();
  if (trimmed.length < DESCRIPTION_MIN_CHARS) return false;
  const words = trimmed.toLowerCase().split(/\s+/);
  const uniqueWords = new Set(words);
  if (uniqueWords.size <= 3 && words.length > 5) return true;
  if (/^(.)\1{10,}$/.test(trimmed.replace(/\s/g, ''))) return true;
  const nonsenseWords = words.filter(w => w.length > 2 && !/[aeiou]/i.test(w));
  if (words.length > 3 && nonsenseWords.length / words.length > 0.6) return true;
  const avgWordLen = words.reduce((sum, w) => sum + w.length, 0) / words.length;
  if (words.length > 5 && uniqueWords.size / words.length < 0.25) return true;
  if (avgWordLen > 12 && uniqueWords.size < 5) return true;
  return false;
};

const isLowQualityDescription = (text) => {
  const trimmed = text.trim();
  if (trimmed.length < 30) return true;
  const words = trimmed.toLowerCase().split(/\s+/);
  const uniqueWords = new Set(words);
  if (uniqueWords.size <= 3 && words.length > 3) return true;
  if (/^(.)\1{10,}$/.test(trimmed.replace(/\s/g, ''))) return true;
  return false;
};

// Step 2: Use Case Content
const UseCaseContent = ({ onContinue, selectedUseCase, setSelectedUseCase, selectedIndustry, setSelectedIndustry, description, setDescription }) => {
  const [descriptionTouched, setDescriptionTouched] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const [hasNudged, setHasNudged] = useState(false);
  const [showGibberishError, setShowGibberishError] = useState(false);
  const needsIndustry = selectedUseCase === 'b2b' || selectedUseCase === 'ondemand';
  const gibberish = showGibberishError && isGibberishDescription(description);
  const canContinue = selectedUseCase && description.trim().length >= DESCRIPTION_MIN_CHARS && !gibberish && (!needsIndustry || selectedIndustry);

  const handleDescriptionBlur = () => {
    setDescriptionTouched(true);
    if (description.trim().length >= DESCRIPTION_MIN_CHARS && isGibberishDescription(description)) {
      setShowGibberishError(true);
      setShowNudge(false);
      return;
    }
    setShowGibberishError(false);
    if (!hasNudged && description.trim().length > 0 && isLowQualityDescription(description)) {
      setShowNudge(true);
      setHasNudged(true);
    }
  };

  const [showPrefillMenu, setShowPrefillMenu] = useState(false);
  const prefillRef = useRef(null);
  const textareaRef = useRef(null);
  const placeholder = DESCRIPTION_PLACEHOLDERS[selectedUseCase] || DESCRIPTION_PLACEHOLDERS.corporate;
  const prefill = DESCRIPTION_PREFILLS[selectedUseCase] || DESCRIPTION_PREFILLS.corporate;

  useEffect(() => {
    if (!showPrefillMenu) return;
    const handleClickOutside = (e) => {
      if (prefillRef.current && !prefillRef.current.contains(e.target)) {
        setShowPrefillMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showPrefillMenu]);

  const handlePrefill = (text, type) => {
    setDescription(text);
    setShowPrefillMenu(false);
    setShowNudge(false);
    setShowGibberishError(false);
    setHasNudged(false);
    if (type === 'lowQuality') {
      setShowNudge(true);
      setHasNudged(true);
    } else if (type === 'gibberish') {
      setShowGibberishError(true);
    }
  };

  return (
    <div className="w-full max-w-[580px] px-4">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-[28px] font-bold text-[#353a44] leading-[36px] mb-2">
          Tell us about your use case
        </h1>
        <p className="text-[16px] text-[#596171] leading-[24px]">
          This helps us understand how you'll use Issuing.
        </p>
      </div>
      
      {/* Use Case Selection */}
      <div className="mb-8">
        <label className="block font-semibold text-[16px] text-[#353a44] mb-2">
          Select use case
        </label>
        <div className="space-y-[9px]">
          <UseCaseOption
            title="Corporate expense management"
            description="Buy goods or services for your business operations."
            selected={selectedUseCase === 'corporate'}
            onClick={() => { setSelectedUseCase('corporate'); setSelectedIndustry(''); }}
          />
          <UseCaseOption
            title="Reseller"
            description="Buy goods or services to resell to your customers."
            selected={selectedUseCase === 'b2b'}
            onClick={() => setSelectedUseCase('b2b')}
          />
          <UseCaseOption
            title="Fulfillment and agentic services"
            description="Buy goods or services on your customers' behalf, directly or through AI agents."
            selected={selectedUseCase === 'ondemand'}
            onClick={() => setSelectedUseCase('ondemand')}
          />
        </div>

        {/* Industry Category - conditional on B2B or On-demand */}
        <div className={`overflow-hidden transition-all duration-300 ${needsIndustry ? 'max-h-[140px] opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'}`}>
          <label className="block font-semibold text-[16px] text-[#353a44] mb-1">
            Industry category
          </label>
          <p className="text-[14px] text-[#596171] leading-5 mb-2">Select the primary industry in which you intend to use the card.</p>
          <div className="relative rounded-md border border-[#d8dee4] bg-white shadow-[0px_1px_1px_rgba(33,37,44,0.16)]">
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full h-10 px-2 pr-8 rounded-md text-[16px] text-[#353a44] font-semibold leading-6 tracking-[-0.31px] bg-transparent appearance-none cursor-pointer focus:outline-none"
            >
              <option value="">Select an industry</option>
              {INDUSTRY_CATEGORIES.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
              <SelectChevronIcon className="w-4 h-4 text-[#474e5a]" />
            </div>
          </div>
        </div>
      </div>

      {/* Description Textarea */}
      <div className="mb-8">
        <div className="flex items-baseline gap-1 mb-1">
          <label className="block font-semibold text-[16px] text-[#353a44]">
            Tell us about your card program
          </label>
        </div>
        <p className="text-[14px] text-[#596171] leading-5 mb-2">Describe who your cardholders are, what they'll spend on, and where the funds to load the cards will come from.</p>
        <textarea
          ref={textareaRef}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            if (showNudge) setShowNudge(false);
            if (showGibberishError) setShowGibberishError(false);
          }}
          onBlur={handleDescriptionBlur}
          placeholder={placeholder}
          className="w-full h-[120px] px-3 py-2 border border-[#d8dee4] rounded-md text-sm text-[#353a44] placeholder-[#6c7688] resize-y focus:outline-none focus:border-[#675dff] focus:ring-1 focus:ring-[#675dff]"
        />
        <div className="flex justify-between items-center mt-1">
          <div className="relative" ref={prefillRef}>
            <span
              className="text-[13px] text-[#d8dee4] hover:text-[#a3acba] cursor-pointer transition-colors select-none inline-flex items-center gap-0.5"
              onClick={() => setShowPrefillMenu(prev => !prev)}
            >
              Prefill
              <Icon name="chevronDown" size="xxsmall" fill="currentColor" className={`transition-transform ${showPrefillMenu ? 'rotate-180' : ''}`} />
            </span>
            {showPrefillMenu && (
              <div className="absolute left-0 top-full mt-1 bg-white border border-[#d8dee4] rounded-md shadow-lg z-10 min-w-[180px] py-1">
                <button onClick={() => handlePrefill(prefill, 'good')} className="w-full text-left px-3 py-1.5 text-[13px] text-[#353a44] hover:bg-[#f6f8fa] transition-colors">
                  Good answer
                </button>
                <button onClick={() => handlePrefill(DESCRIPTION_PREFILL_LOW_QUALITY, 'lowQuality')} className="w-full text-left px-3 py-1.5 text-[13px] text-[#353a44] hover:bg-[#f6f8fa] transition-colors">
                  Low quality
                </button>
                <button onClick={() => handlePrefill(DESCRIPTION_PREFILL_GIBBERISH, 'gibberish')} className="w-full text-left px-3 py-1.5 text-[13px] text-[#353a44] hover:bg-[#f6f8fa] transition-colors">
                  Gibberish
                </button>
              </div>
            )}
          </div>
          <p className="text-[13px] text-[#6c7688]">{description.length}/200 character minimum</p>
        </div>
        {/* Gibberish error — persistent until user fixes input */}
        <div className={`overflow-hidden transition-all duration-300 ${gibberish ? 'max-h-24 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'}`}>
          <div className="flex items-start gap-3 bg-[#fdf0f2] border border-[#FBD3DC] rounded-lg p-4">
            <Icon name="warningCircle" size="xxsmall" fill="#df1b41" className="flex-shrink-0 mt-[3px]" />
            <p className="text-[14px] text-[#C0123C] leading-5 tracking-[-0.15px]">
              Please provide a valid description of your card program. We need this to evaluate your application.
            </p>
          </div>
        </div>
        {/* Soft quality nudge — shown once on blur if description looks low-effort */}
        <div className={`overflow-hidden transition-all duration-300 ${showNudge && !gibberish ? 'max-h-24 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'}`}>
          <div className="flex items-start gap-3 bg-[#f6f8fa] border border-[#D4DEE9] rounded-lg p-4">
            <Icon name="info" size="xxsmall" fill="#6c7688" className="flex-shrink-0 mt-[3px]" />
            <p className="text-[14px] text-[#596171] leading-5">
              Is there more detail you can add? Addressing each of the points above helps us get you up and running faster.
            </p>
          </div>
        </div>
      </div>
      
      {/* Continue Button */}
      <div className="flex justify-center mb-6">
        <button 
          onClick={onContinue}
          disabled={!canContinue}
          className={continueButtonClasses(!canContinue)}
        >
          Continue
        </button>
      </div>

      {/* Sales-assisted use cases fallback */}
      <p className="text-[14px] text-[#596171] leading-[20px]">
        Don't see an option that fits your needs? Our team is here to help.{' '}
        <span className="text-[#533AFD] cursor-pointer hover:underline">Contact us</span>
      </p>
    </div>
  );
};

// Agent Interaction Content - "Will AI agents interact with Issuing?" step
const AgentInteractionContent = ({ onContinue, agentInteraction, setAgentInteraction }) => (
  <div className="w-full max-w-[580px] px-4">
    <div className="mb-8">
      <h1 className="text-[28px] font-bold text-[#353a44] leading-[36px] mb-2">
        Will AI agents interact with Issuing?
      </h1>
      <p className="text-[16px] text-[#596171] leading-[24px]">
        Let us know if AI agents will perform financial actions for your users, like creating cards, making purchases, or managing spend.
      </p>
    </div>
    
    <div className="space-y-[9px] mb-8">
      <UseCaseOption
        title="Yes"
        selected={agentInteraction === 'yes'}
        onClick={() => setAgentInteraction('yes')}
      />
      <UseCaseOption
        title="No"
        selected={agentInteraction === 'no'}
        onClick={() => setAgentInteraction('no')}
      />
    </div>
    
    <div className="flex justify-center">
      <button 
        onClick={onContinue}
        disabled={!agentInteraction}
        className={continueButtonClasses(!agentInteraction)}
      >
        Continue
      </button>
    </div>
  </div>
);

// Owner Information Content - "Provide more information" step
// Owner/KYC Information Content - "Provide more information" step
const OwnerInfoContent = ({ onContinue }) => (
  <div className="w-full max-w-[580px] px-4">
    {/* Page Header */}
    <div className="mb-8">
      <h1 className="text-[28px] font-bold text-[#353a44] leading-[36px] mb-2">
        Complete your business details
      </h1>
      <p className="text-[16px] text-[#596171] leading-[24px]">
        We need a few more details about your business to get started.
      </p>
    </div>
    
    {/* Placeholder Box */}
    <div className="bg-[#f5f6f8] rounded-lg h-[360px] w-full mb-8" />
    
    {/* Continue Button */}
    <div className="flex justify-center">
      <button 
        onClick={onContinue}
        className="w-full py-3 bg-[#675dff] hover:bg-[#5650e0] text-white font-bold text-[16px] rounded-md transition-colors shadow-[0px_1px_1px_rgba(47,14,99,0.32)]"
      >
        Continue
      </button>
    </div>
  </div>
);

// Diagram icons
const BuildingIcon = ({ size = 16, color = '#6c7688' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 2.5C2.5 1.94772 2.94772 1.5 3.5 1.5H8.5C9.05228 1.5 9.5 1.94772 9.5 2.5V14H6.5V11.5C6.5 11.2239 6.27614 11 6 11C5.72386 11 5.5 11.2239 5.5 11.5V14H2.5V2.5Z" stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.5 5.5H12.5C13.0523 5.5 13.5 5.94772 13.5 6.5V14H9.5V5.5Z" stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4.5 4H5.5M7.5 4H8.5M4.5 6.5H5.5M7.5 6.5H8.5M4.5 9H5.5M7.5 9H8.5M11 8H12M11 10.5H12" stroke={color} strokeLinecap="round"/>
  </svg>
);

const PersonIcon = ({ size = 16, color = '#6c7688' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="5" r="2.5" stroke={color}/>
    <path d="M3.5 13.5C3.5 11.0147 5.51472 9 8 9C10.4853 9 12.5 11.0147 12.5 13.5" stroke={color} strokeLinecap="round"/>
  </svg>
);

const LayersIcon = ({ size = 16, color = '#6c7688' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 1.5L1.5 5L8 8.5L14.5 5L8 1.5Z" stroke={color} strokeLinejoin="round"/>
    <path d="M1.5 8L8 11.5L14.5 8" stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1.5 11L8 14.5L14.5 11" stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HierarchyDiagram = ({ topIcon: TopIcon, topLabel, bottomIcon: BottomIcon, bottomLabel }) => (
  <div className="flex flex-col items-center gap-0.5 min-w-[120px]">
    <div className="flex items-center gap-1.5">
      <div className="w-6 h-6 rounded-full bg-[#F5F6F8] flex items-center justify-center">
        <TopIcon size={13} color="#6c7688" />
      </div>
      <span className="text-[11px] text-[#8a919e] whitespace-nowrap">{topLabel}</span>
    </div>
    <div className="flex flex-col items-center">
      <div className="w-px h-2 bg-[#d8dee4]" />
      <div className="flex items-center">
        <div className="w-4 h-px bg-[#d8dee4]" />
        <div className="w-px h-2 bg-[#d8dee4]" />
        <div className="w-4 h-px bg-[#d8dee4]" />
      </div>
    </div>
    <div className="flex items-center gap-1.5">
      <div className="flex gap-1">
        <div className="w-6 h-6 rounded-full bg-[#F5F6F8] flex items-center justify-center">
          <BottomIcon size={13} color="#6c7688" />
        </div>
        <div className="w-6 h-6 rounded-full bg-[#F5F6F8] flex items-center justify-center">
          <BottomIcon size={13} color="#6c7688" />
        </div>
      </div>
      <span className="text-[11px] text-[#8a919e] whitespace-nowrap">{bottomLabel}</span>
    </div>
  </div>
);

const CARDHOLDER_IMAGES = {
  employees: '/issuing-m1/images/cardholder-business.svg',
  ai_agents: '/issuing-m1/images/cardholder-business.svg',
  platforms: '/issuing-m1/images/cardholder-platforms.svg',
  consumers: '/issuing-m1/images/cardholder-individuals.svg',
};

// Card Holders Content - "Who will be your cardholders" step
const CardHoldersContent = ({ onContinue, selectedCardHolder, setSelectedCardHolder }) => (
  <div className="w-full max-w-[580px] px-4">
    {/* Page Header */}
    <div className="mb-8">
      <h1 className="text-[28px] font-bold text-[#353a44] leading-[36px] mb-2">
        Who's going to use the cards?
      </h1>
      <p className="text-[16px] text-[#596171] leading-[24px]">
        This information helps us understand your needs.
      </p>
    </div>
    
    {/* Card Holder Options */}
    <div className="space-y-[9px] mb-8">
      {[
        { key: 'employees', title: 'Your employees or contractors', desc: 'People who work for your business' },
        { key: 'platforms', title: 'Businesses on your platform', desc: 'Merchants, sellers, or vendors using your platform' },
        { key: 'consumers', title: 'Individuals on your platform', desc: 'App users, gig workers, or others using your platform' },
      ].map(({ key, title, desc }) => (
        <button
          key={key}
          onClick={() => setSelectedCardHolder(key)}
          className={`w-full text-left px-[14px] py-[10px] rounded-lg transition-colors flex items-start gap-4 ${
            selectedCardHolder === key 
              ? 'border border-[#675dff] ring-1 ring-[#675dff] bg-white' 
              : 'border border-[#d8dee4] bg-white hover:border-[#a3acba]'
          }`}
        >
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-[16px] text-[#353a44] leading-6">{title}</h4>
            <p className="text-[14px] text-[#596171] leading-5">{desc}</p>
          </div>
        </button>
      ))}
    </div>
    
    {/* Continue Button */}
    <div className="flex justify-center">
      <button 
        onClick={onContinue}
        className="w-full py-3 bg-[#675dff] hover:bg-[#5650e0] text-white font-bold text-[16px] rounded-md transition-colors shadow-[0px_1px_1px_rgba(47,14,99,0.32)]"
      >
        Continue
      </button>
    </div>
  </div>
);

const PricingContent = ({ onContinue }) => (
  <div className="w-full max-w-[580px] px-4">
    {/* Page Header */}
    <div className="mb-8">
      <h1 className="text-[28px] font-bold text-[#353a44] leading-[36px] mb-2">
        How Issuing pricing works
      </h1>
      <p className="text-[16px] text-[#596171] leading-[24px]">
        Review the costs before you get started.
      </p>
    </div>
    
    {/* Pricing Content Placeholder */}
    <div className="bg-[#f5f6f8] rounded-lg h-[470px] w-full mb-8" />
    
    {/* Continue Button */}
    <div className="flex justify-center">
      <button 
        onClick={onContinue}
        className="w-full py-3 bg-[#675dff] hover:bg-[#5650e0] text-white font-bold text-[16px] rounded-md transition-colors shadow-[0px_1px_1px_rgba(47,14,99,0.32)]"
      >
        Continue
      </button>
    </div>
  </div>
);

// Checkbox Component
const Checkbox = ({ checked, onChange, children }) => (
  <div className="flex items-start gap-3 cursor-pointer" onClick={(e) => { if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return; onChange(!checked); }}>
    <div className="mt-0.5">
      <div 
        className={`w-[18px] h-[18px] rounded border flex items-center justify-center cursor-pointer transition-colors ${
          checked 
            ? 'bg-[#533afd] border-[#533afd]' 
            : 'bg-white border-[#c1c9d2]'
        }`}
      >
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
    </div>
    <span className="text-[16px] text-[#4f566b] leading-6">{children}</span>
  </div>
);

const INDUSTRY_CATEGORIES = [
  { value: 'travel', label: 'Travel' },
  { value: 'ecommerce', label: 'E-commerce / Online retail' },
  { value: 'food_delivery', label: 'Food & delivery' },
  { value: 'transportation', label: 'Transportation / Ride-hailing' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'construction', label: 'Construction / Building materials' },
  { value: 'technology', label: 'Technology / SaaS' },
  { value: 'marketing', label: 'Marketing / Advertising' },
  { value: 'other', label: 'Other' },
];

const getIndustryDisplayName = (industry) => {
  const match = INDUSTRY_CATEGORIES.find(c => c.value === industry);
  return match ? match.label : industry || 'Not selected';
};

// Helper to get display name for use case
const getUseCaseDisplayName = (useCase) => {
  const names = {
    'corporate': 'Corporate expense management',
    'b2b': 'Reseller',
    'ondemand': 'Fulfillment and agentic services',
    'fleet': 'Fleet',
    'insurance': 'Insurance',
    'bnpl': 'Buy now pay later',
    'other': 'Other',
  };
  return names[useCase] || useCase || 'Not selected';
};


// Issuing Terms of Service Modal
const TermsOfServiceModal = ({ isOpen, onAccept, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onCancel} />
      <div className="relative bg-white rounded-xl shadow-[0px_15px_35px_rgba(48,49,61,0.08),0px_5px_15px_rgba(0,0,0,0.12)] w-full max-w-[480px] mx-4">
        <div className="flex items-center justify-between px-6 pt-4 pb-4">
          <h2 className="font-bold text-[18px] text-[#353a44] leading-7">Issuing Terms of Service</h2>
          <button
            onClick={onCancel}
            className="p-2 -mr-2 text-[#6c7688] hover:text-[#353a44] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <div className="border-t border-[#e3e8ee]" />
        <div className="px-6 pt-4 pb-2">
          <p className="text-[14px] text-[#353a44] leading-5 mb-4">
            By clicking Accept, you agree to the below documents and to receiving automated text messages, and you consent to electronic signature as set forth in the Issuing Bank Accountholder Terms.
          </p>
          <div className="flex flex-col gap-1 mb-6">
            <a href="#" className="text-[14px] text-[#353a44] underline hover:text-[#533afd]">Issuing Accountholder Terms</a>
            <a href="#" className="text-[14px] text-[#353a44] underline hover:text-[#533afd]">Issuing Bank Accountholder Terms: Spend Card</a>
            <a href="#" className="text-[14px] text-[#353a44] underline hover:text-[#533afd]">Spend Card Apple Pay Terms and Conditions</a>
          </div>
          <p className="text-[14px] text-[#596171] leading-5 mb-6">
            Card products are issued by Cross-River Bank.
          </p>
        </div>
        <div className="px-6 pb-6">
          <button
            onClick={onAccept}
            className="w-full py-2.5 bg-[#625afa] hover:bg-[#5650e0] text-white font-bold text-[16px] rounded-md transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

// Step 4: Submit Review Content
const SubmitReviewContent = ({ 
  onSubmit, 
  selectedUseCase, 
  selectedIndustry,
  description,
  agentInteraction,
  selectedSetupType,
  onEditSetupType,
  onEditAgentUsage,
  agreedTerms,
  setAgreedTerms,
}) => {
  const [showTermsModal, setShowTermsModal] = useState(false);
  const canSubmit = agreedTerms;

  return (
    <div className="w-full max-w-[580px] px-4">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-[28px] font-bold text-[#353a44] leading-[36px] mb-2">
          Review and submit
        </h1>
        <p className="text-[16px] text-[#596171] leading-[24px]">
          Confirm your details before submitting.
        </p>
      </div>
      
      {/* Business Details */}
      <div className="mb-6">
        <h3 className="font-semibold text-[16px] text-[#353a44] mb-2">Business details</h3>
        <div className="border border-[#d5dbe1] rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-[14px] text-[#353a44]">Acme Inc.</h4>
            <button className="text-[14px] font-semibold text-[#533afd] hover:underline">Edit</button>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-[12px] text-[#6c7688] leading-4">URL</p>
              <a href="#" className="text-[14px] text-[#533afd] hover:underline inline-flex items-center gap-1">
                https://acme.inc
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.5 2H2.5C1.94772 2 1.5 2.44772 1.5 3V9.5C1.5 10.0523 1.94772 10.5 2.5 10.5H9C9.55228 10.5 10 10.0523 10 9.5V8.5M7 2H10V5M10 2L5 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
            <div>
              <p className="text-[12px] text-[#6c7688] leading-4">Other information provided</p>
              <p className="text-[14px] text-[#414552]">DBA, Product description, Industry</p>
            </div>
          </div>
        </div>
      </div>

      {/* Management and ownership */}
      <div className="mb-6">
        <h3 className="font-semibold text-[16px] text-[#353a44] mb-2">Management and ownership</h3>
        <div className="border border-[#d5dbe1] rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-[14px] text-[#353a44]">Cedar Andrews</h4>
            <button className="text-[14px] font-semibold text-[#533afd] hover:underline">Edit</button>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-[12px] text-[#6c7688] leading-4">Role</p>
              <p className="text-[14px] text-[#414552]">Account representative and Owner</p>
            </div>
            <div>
              <p className="text-[12px] text-[#6c7688] leading-4">Email address</p>
              <p className="text-[14px] text-[#414552]">cedar@acme.com</p>
            </div>
            <div>
              <p className="text-[12px] text-[#6c7688] leading-4">Date of birth</p>
              <p className="text-[14px] text-[#414552]">Born on 15 March 1985</p>
            </div>
            <div>
              <p className="text-[12px] text-[#6c7688] leading-4">Address</p>
              <p className="text-[14px] text-[#414552]">354 Oyster Point Blvd</p>
              <p className="text-[14px] text-[#414552]">South San Francisco, CA 94080 US</p>
            </div>
            <div>
              <p className="text-[12px] text-[#6c7688] leading-4">Other information provided</p>
              <p className="text-[14px] text-[#414552]">Nationality, SSN, Job title, Phone</p>
            </div>
          </div>
        </div>
      </div>

      {/* Program Details */}
      <div className="mb-6">
        <h3 className="font-semibold text-[16px] text-[#353a44] mb-2">Program details</h3>
        <div className="border border-[#d5dbe1] rounded-lg p-4 min-w-0">
          <div className="flex flex-col gap-4 min-w-0">
            <div>
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-[14px] text-[#353a44]">Use case</h4>
                <button className="text-[14px] font-semibold text-[#533afd] hover:underline">Edit</button>
              </div>
              <p className="text-sm text-[#414552] leading-5">{getUseCaseDisplayName(selectedUseCase)}</p>
            </div>
            {selectedIndustry && (
              <div>
                <h4 className="font-semibold text-[14px] text-[#353a44]">Industry category</h4>
                <p className="text-sm text-[#414552] leading-5">{getIndustryDisplayName(selectedIndustry)}</p>
              </div>
            )}
            <div>
              <h4 className="font-semibold text-[14px] text-[#353a44]">Program description</h4>
              <p className="text-sm text-[#414552] leading-5 break-words" style={{ overflowWrap: 'anywhere' }}>{description || 'Description'}</p>
            </div>
            {agentInteraction && (
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-[14px] text-[#353a44]">AI agent usage</h4>
                  <button onClick={onEditAgentUsage} className="text-[14px] font-semibold text-[#533afd] hover:underline">Edit</button>
                </div>
                <p className="text-sm text-[#414552] leading-5">{agentInteraction === 'yes' ? 'Yes' : 'No'}</p>
              </div>
            )}
            {selectedSetupType && (
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-[14px] text-[#353a44]">Setup type</h4>
                  <button onClick={onEditSetupType} className="text-[14px] font-semibold text-[#533afd] hover:underline">Edit</button>
                </div>
                <p className="text-sm text-[#414552] leading-5">{selectedSetupType === 'starter' ? 'Starter' : 'Growth'}</p>
              </div>
            )}
            {(selectedUseCase === 'b2b' || selectedUseCase === 'ondemand') && (
              <div className="bg-[#f7f8fa] rounded-lg p-4">
                <p className="font-semibold text-[14px] text-[#353a44] leading-5 mb-2 flex items-center gap-1.5">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                    <path fillRule="evenodd" clipRule="evenodd" d="M11 2.5H5C3.61929 2.5 2.5 3.61929 2.5 5V11C2.5 12.3807 3.61929 13.5 5 13.5H11C12.3807 13.5 13.5 12.3807 13.5 11V5C13.5 3.61929 12.3807 2.5 11 2.5ZM5 1C2.79086 1 1 2.79086 1 5V11C1 13.2091 2.79086 15 5 15H11C13.2091 15 15 13.2091 15 11V5C15 2.79086 13.2091 1 11 1H5Z" fill="#474E5A"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M6.25 8C6.25 7.58579 6.58579 7.25 7 7.25H8.25C8.66421 7.25 9 7.58579 9 8V11.5C9 11.9142 8.66421 12.25 8.25 12.25C7.83579 12.25 7.5 11.9142 7.5 11.5V8.75H7C6.58579 8.75 6.25 8.41421 6.25 8Z" fill="#474E5A"/>
                    <path d="M6.75 5C6.75 4.31075 7.31075 3.75 8 3.75C8.68925 3.75 9.25 4.31075 9.25 5C9.25 5.68925 8.68925 6.25 8 6.25C7.31075 6.25 6.75 5.68925 6.75 5Z" fill="#474E5A"/>
                  </svg>
                  Roles and limits
                </p>
                <ul className="text-[14px] text-[#596171] leading-5 space-y-1 list-disc pl-5">
                  {selectedUseCase === 'b2b' ? (
                    <>
                      <li>Your program supports virtual cards only.</li>
                      <li>Cards can only be used once.</li>
                      <li>Cards are for B2B transactions in a single industry category.</li>
                      <li>You handle refunds and disputes on behalf of your customers.</li>
                    </>
                  ) : (
                    <>
                      <li>Your program supports virtual cards only.</li>
                      <li>Cards are single-use for B2B and ancillary purchases.</li>
                      <li>Cards are for B2B transactions in a single industry category.</li>
                      <li>Purchases should be made as part of services you provide your customers.</li>
                    </>
                  )}
                  <li>Default card creation and spend limits apply.{' '}
                    <a href="#" className="text-[#533afd] hover:underline">View docs</a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="mb-6">
        <h3 className="font-semibold text-[16px] text-[#353a44] mb-2">Pricing</h3>
        <div className="border border-[#d5dbe1] rounded-lg p-4">
          <div className="h-[72px] bg-[#f5f6f8] rounded" />
        </div>
      </div>

      {/* Agreement */}
      <div className="mb-8">
        <Checkbox checked={agreedTerms} onChange={setAgreedTerms}>
          I agree to the <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowTermsModal(true); }} className="text-[#533afd] hover:underline">Issuing Terms of Service</button>, <a href="#" className="text-[#533afd] hover:underline">E-sign policy</a>, <a href="#" className="text-[#533afd] hover:underline">Apple Pay Card Terms</a>, and <a href="#" className="text-[#533afd] hover:underline">Cross-River Bank's privacy policy</a>
        </Checkbox>
      </div>
      
      {/* Submit Button */}
      <div className="flex justify-center">
        <button 
          onClick={onSubmit}
          disabled={!canSubmit}
          className={continueButtonClasses(!canSubmit)}
        >
          Submit
        </button>
      </div>

      {/* Terms of Service Modal */}
      <TermsOfServiceModal
        isOpen={showTermsModal}
        onAccept={() => setShowTermsModal(false)}
        onCancel={() => setShowTermsModal(false)}
      />
    </div>
  );
};

// Spinning Loader Component
const Spinner = () => (
  <svg 
    className="animate-spin" 
    width="40" 
    height="40" 
    viewBox="0 0 40 40" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle 
      cx="20" 
      cy="20" 
      r="17" 
      stroke="#e3e8ee" 
      strokeWidth="6"
    />
    <path 
      d="M20 3C10.611 3 3 10.611 3 20" 
      stroke="#675dff" 
      strokeWidth="6" 
      strokeLinecap="round"
    />
  </svg>
);

// Step 5: Processing Content
const ProcessingContent = () => (
  <div className="w-full max-w-[580px] px-4">
    <div className="mb-4">
      <Spinner />
    </div>
    <h1 className="text-[28px] font-bold text-[#353a44] leading-[36px]">
      One moment...
    </h1>
  </div>
);

// Timeout Content — shown when processing takes too long (30s+ in production)
const TimeoutContent = ({ onClose }) => (
  <div className="w-full max-w-[580px] px-4">
    <div className="mb-8">
      <div className="w-[48px] h-[48px] bg-[#f6f8fa] rounded-lg flex items-center justify-center">
        <Icon name="clock" size="medium" fill="#596171" />
      </div>
    </div>

    <div className="mb-6">
      <h1 className="text-[28px] font-bold text-[#353a44] leading-[36px] mb-3">
        Your setup is still in progress
      </h1>
      <p className="text-[16px] text-[#596171] leading-[24px]">
        Some verifications are taking longer than expected. We'll email you with an update once we've finished reviewing your application. Feel free to close this and come back later.
      </p>
    </div>

    <div className="flex flex-col gap-4">
      <button
        onClick={onClose}
        className="w-full py-3 bg-[#675dff] hover:bg-[#5650e0] text-white font-bold text-[16px] rounded-md transition-colors shadow-[0px_1px_1px_rgba(47,14,99,0.32)]"
      >
        Got it
      </button>
    </div>
  </div>
);

// Feature Highlight Component
const FeatureHighlight = ({ icon: Icon, title, children }) => (
  <div className="flex gap-4 items-start">
    <div className="shrink-0 py-[5px]">
      <div className="bg-[#f7f5fd] rounded-lg p-4 flex items-center justify-center">
        <Icon />
      </div>
    </div>
    <div className="flex-1">
      <h4 className="font-bold text-[16px] text-[#353a44] leading-6">{title}</h4>
      <p className="text-[16px] text-[#596171] leading-6">{children}</p>
    </div>
  </div>
);

// API Code Illustration for "You're ready to start building"
const ApiCodeIllustration = () => (
  <div className="w-full h-[220px] bg-[#e3e8ee] rounded-xl overflow-hidden relative">
    {/* Terminal window - centered horizontally */}
    <div className="absolute left-1/2 -translate-x-1/2 top-6 w-[480px] bg-[#1a1f36] rounded-xl p-5 shadow-xl">
      {/* Window controls */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28ca42]" />
        <span className="ml-3 text-[11px] text-[#6b7280] font-mono">create-card.js</span>
      </div>
      
      {/* Code content */}
      <div className="font-mono text-[12px] leading-[20px] space-y-0.5">
        <div className="flex">
          <span className="w-6 text-[#4b5563] text-right mr-4 select-none">1</span>
          <span><span className="text-[#c084fc]">const</span> <span className="text-[#e2e8f0]">stripe</span> <span className="text-[#94a3b8]">=</span> <span className="text-[#60a5fa]">require</span><span className="text-[#e2e8f0]">(</span><span className="text-[#a5f3ab]">'stripe'</span><span className="text-[#e2e8f0]">);</span></span>
        </div>
        <div className="flex">
          <span className="w-6 text-[#4b5563] text-right mr-4 select-none">2</span>
          <span className="text-[#4b5563]"></span>
        </div>
        <div className="flex">
          <span className="w-6 text-[#4b5563] text-right mr-4 select-none">3</span>
          <span><span className="text-[#c084fc]">const</span> <span className="text-[#e2e8f0]">card</span> <span className="text-[#94a3b8]">=</span> <span className="text-[#c084fc]">await</span> <span className="text-[#e2e8f0]">stripe.issuing.cards</span></span>
        </div>
        <div className="flex">
          <span className="w-6 text-[#4b5563] text-right mr-4 select-none">4</span>
          <span><span className="text-[#e2e8f0]">  .create</span><span className="text-[#fbbf24]">{"({"}</span></span>
        </div>
        <div className="flex">
          <span className="w-6 text-[#4b5563] text-right mr-4 select-none">5</span>
          <span><span className="text-[#60a5fa]">    cardholder</span><span className="text-[#e2e8f0]">:</span> <span className="text-[#a5f3ab]">'ich_1234'</span><span className="text-[#e2e8f0]">,</span></span>
        </div>
        <div className="flex">
          <span className="w-6 text-[#4b5563] text-right mr-4 select-none">6</span>
          <span><span className="text-[#60a5fa]">    type</span><span className="text-[#e2e8f0]">:</span> <span className="text-[#a5f3ab]">'virtual'</span><span className="text-[#e2e8f0]">,</span></span>
        </div>
        <div className="flex">
          <span className="w-6 text-[#4b5563] text-right mr-4 select-none">7</span>
          <span><span className="text-[#60a5fa]">    currency</span><span className="text-[#e2e8f0]">:</span> <span className="text-[#a5f3ab]">'usd'</span></span>
        </div>
        <div className="flex">
          <span className="w-6 text-[#4b5563] text-right mr-4 select-none">8</span>
          <span><span className="text-[#fbbf24]">{"  })"}</span><span className="text-[#e2e8f0]">;</span></span>
        </div>
      </div>
    </div>
  </div>
);

// CLI Code Illustration for agent-involved "You're ready to start building"
const CLI_TERMINAL_SVG_URL = new URL('../../assets/cli-terminal-hero.svg', import.meta.url).href;
const CliCodeIllustration = () => (
  <div className="w-full rounded-xl overflow-hidden">
    <img src={CLI_TERMINAL_SVG_URL} alt="CLI terminal illustration" className="w-full h-auto" />
  </div>
);

// Step 5: Success Screen - "You're ready to start building"
const SuccessContent = ({ onStartIntegrating, onViewDocs, selectedUseCase, agentInteraction }) => {
  const isAgentInvolved = selectedUseCase === 'ondemand' || agentInteraction === 'yes';

  return (
    <div className="w-full max-w-[580px] px-4">
      {/* Illustration */}
      <div className="mb-8">
        {isAgentInvolved ? <CliCodeIllustration /> : <ApiCodeIllustration />}
      </div>
      
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-[28px] font-bold text-[#353a44] leading-[36px] mb-6">
          You're ready to start building
        </h1>
        <p className="text-[16px] text-[#596171] leading-[24px]">
          Here's what you get:
        </p>
      </div>

      {/* Features Section */}
      <div className="mb-8">
        <div className="space-y-4">
          <FeatureHighlight icon={ApiIcon} title="Stripe Issuing APIs">
            {isAgentInvolved
              ? 'Create and manage cards programmatically. Issue cards, define spending rules, and automate transactions via the API or the Stripe CLI.'
              : 'Create and manage cards programmatically with the Issuing API.'}
          </FeatureHighlight>
          
          <FeatureHighlight icon={BalanceIcon} title="Financial Accounts API">
            {isAgentInvolved
              ? 'Hold and manage balances directly on Stripe. Fund your card program and move money via the API or the Stripe CLI.'
              : 'Hold and manage balances directly on Stripe. Use the Financial Accounts API to fund your card program and move money programmatically.'}
          </FeatureHighlight>

          {isAgentInvolved && (
            <FeatureHighlight icon={AgenticToolkitIcon} title="Stripe Agentic Toolkit">
              Build AI agents that securely perform financial operations on Stripe, with built-in guardrails for auditing, compliance, and human approval.
            </FeatureHighlight>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-4">
        <button 
          onClick={onStartIntegrating}
          className="w-full py-3 bg-[#675dff] hover:bg-[#5650e0] text-white font-bold text-[16px] rounded-md transition-colors shadow-[0px_1px_1px_rgba(47,14,99,0.32)]"
        >
          Get started
        </button>
        <button 
          onClick={onViewDocs}
          className="w-full py-3 bg-white hover:bg-gray-50 text-[#353a44] font-bold text-[16px] rounded-md border border-[#d8dee4] transition-colors shadow-[0px_1px_1px_rgba(33,37,44,0.16)]"
        >
          View Issuing docs
        </button>
      </div>
    </div>
  );
};

// Virtual Card Visual for Auto-Create Card Success
const VirtualCardVisual = () => {
  const cardRef = React.useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const maxTilt = 15;
    setTilt({
      rotateX: (0.5 - y) * maxTilt,
      rotateY: (x - 0.5) * maxTilt,
    });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div className="w-full rounded-xl border border-[#FEFEFE] bg-[#EFECFC] py-10 flex items-center justify-center" style={{ perspective: '800px' }}>
      <div
        ref={cardRef}
        className="relative w-[300px]"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Shadow ambient */}
        <div className="absolute -inset-4 rounded-3xl bg-[#533AFD]/[0.15] blur-2xl" />
        {/* Card */}
        <div
          className="relative rounded-lg bg-[#533AFD] p-6 flex flex-col justify-between text-white overflow-hidden shadow-[8px_4px_8px_-1px_rgba(83,58,253,0.13),16px_16px_32px_-4px_rgba(83,58,253,0.13),24px_32px_56px_-8px_rgba(83,58,253,0.13)]"
          style={{ aspectRatio: '85.6 / 54' }}
        >
        {/* Stripe parallelogram logo */}
          <div className="relative z-10 flex justify-end">
            <svg width="28" height="27" viewBox="0 0 115 113" fill="none">
              <path d="M114.91 88.824L0 112.455V23.193L114.91 0V88.824Z" fill="white"/>
            </svg>
          </div>

          {/* Card number */}
          <div className="relative z-10">
            <p className="font-mono text-[16px] tracking-[2px] opacity-90 whitespace-nowrap">•••• •••• •••• 4242</p>
          </div>

          {/* Bottom row */}
          <div className="flex items-end justify-between relative z-10">
            <div>
              <p className="text-[9px] uppercase tracking-[1.5px] opacity-50 mb-0.5">Cardholder</p>
              <p className="text-[14px] font-normal opacity-90">Cedar Andrews</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] uppercase tracking-[1.5px] opacity-50 mb-0.5">Expires</p>
              <p className="text-[14px] font-normal opacity-90">02/29</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Expandable detail section
const ExpandableDetailSection = ({ title, children, defaultExpanded = false }) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className="border border-[#e3e8ee] rounded-lg">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#f9fafb] transition-colors rounded-lg"
      >
        <span className="font-semibold text-[14px] text-[#353a44]">{title}</span>
        <ChevronDownIcon className={`text-[#6c7688] transition-transform duration-200 ${expanded ? '' : '-rotate-90'}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-200 ${expanded ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pb-3 pt-1 border-t border-[#e3e8ee]">
          {children}
        </div>
      </div>
    </div>
  );
};

// Key-value detail row
const DetailRow = ({ label, value }) => (
  <div className="flex justify-between py-1.5">
    <span className="text-[13px] text-[#6c7688]">{label}</span>
    <span className="text-[13px] text-[#353a44] font-medium">{value}</span>
  </div>
);

// Auto-Create Card Success Screen
const AutoCreateCardSuccessContent = ({ onSimulatePurchase }) => (
  <div className="w-full max-w-[520px] px-4">
    {/* Card Visual Hero */}
    <div className="mb-9 pt-4">
      <VirtualCardVisual />
    </div>

    {/* Headline */}
    <h1 className="text-[28px] font-bold text-[#353a44] leading-[36px] tracking-[0.38px] mb-4">
      Everything you need to start building
    </h1>

    {/* Subtitle — frames the card as the enabler for building */}
    <p className="text-[16px] text-[#596171] leading-[24px] tracking-[-0.31px] mb-6">
      Your virtual card, cardholder, and financial account are live and prefunded with{' '}
      <span className="font-semibold text-[#353a44]">$10.00</span>&nbsp;&mdash; ready for your first API call.
    </p>

    {/* Expandable Details */}
    <div className="flex flex-col gap-3 mb-6">
      <ExpandableDetailSection title="API resources" defaultExpanded>
        <div className="flex flex-col gap-2 pt-1">
          <a href="#" className="group">
            <span className="text-[13px] text-[#533afd] font-medium group-hover:underline">Issuing quickstart guide</span>
          </a>
          <a href="#" className="group">
            <span className="text-[13px] text-[#533afd] font-medium group-hover:underline">Create and manage a card</span>
          </a>
          <a href="#" className="group">
            <span className="text-[13px] text-[#533afd] font-medium group-hover:underline">Create and manage cardholders</span>
          </a>
          <a href="#" className="group">
            <span className="text-[13px] text-[#533afd] font-medium group-hover:underline">Set up spending controls</span>
          </a>
        </div>
      </ExpandableDetailSection>

      <ExpandableDetailSection title="Card and cardholder details">
        <DetailRow label="Card number" value="•••• •••• •••• 4242" />
        <DetailRow label="Type" value="Virtual" />
        <DetailRow
          label="Status"
          value={
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0e6245]" />
              Active
            </span>
          }
        />
        <DetailRow label="Expires" value="02/29" />
        <div className="border-t border-[#e3e8ee] my-1.5" />
        <DetailRow label="Cardholder" value="Cedar Andrews" />
        <DetailRow label="Email" value="cedar@acme.com" />
        <DetailRow label="Company" value="Acme Inc." />
      </ExpandableDetailSection>
    </div>

    {/* CTA */}
    <button
      onClick={onSimulatePurchase}
      className="w-full py-3 bg-[#675dff] hover:bg-[#5650e0] text-white font-bold text-[16px] rounded-md transition-colors shadow-[0px_1px_1px_rgba(47,14,99,0.32)]"
    >
      Simulate a test purchase
    </button>
  </div>
);

// Resource Link Icons with rounded background
const ContactIcon = () => (
  <svg width="32" height="32" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.18047" y="1.18035" width="40.1326" height="40.1326" rx="10.6233" fill="#F5F6F8"/>
    <rect x="1.18047" y="1.18035" width="40.1326" height="40.1326" rx="10.6233" stroke="white" strokeWidth="2.36074"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M19.9322 17.6145C19.6575 17.9097 19.4761 18.3587 19.4761 18.9396C19.4761 19.4285 19.0798 19.8249 18.5908 19.8249C18.1019 19.8249 17.7056 19.4285 17.7056 18.9396C17.7056 17.9914 18.0059 17.0856 18.636 16.4084C19.2745 15.7222 20.1833 15.3448 21.2467 15.3448C22.31 15.3448 23.2189 15.7222 23.8574 16.4084C24.4875 17.0856 24.7878 17.9914 24.7878 18.9396C24.7878 20.3959 23.7622 21.2076 23.0932 21.6912C22.982 21.7716 22.8824 21.8418 22.7922 21.9054C22.5681 22.0634 22.4025 22.1802 22.2617 22.3099C22.1795 22.3858 22.145 22.4322 22.132 22.4534V23.0172C22.132 23.5062 21.7356 23.9025 21.2467 23.9025C20.7578 23.9025 20.3614 23.5062 20.3614 23.0172V22.427C20.3614 21.7625 20.746 21.2991 21.0616 21.0082C21.2955 20.7925 21.6003 20.5781 21.8542 20.3994C21.9265 20.3486 21.9947 20.3006 22.056 20.2563C22.7149 19.7799 23.0172 19.4381 23.0172 18.9396C23.0172 18.3587 22.8358 17.9097 22.5611 17.6145C22.2948 17.3282 21.8758 17.1154 21.2467 17.1154C20.6176 17.1154 20.1985 17.3282 19.9322 17.6145Z" fill="#474E5A"/>
    <path d="M22.427 25.9682C22.427 26.619 21.8975 27.1485 21.2467 27.1485C20.5958 27.1485 20.0663 26.619 20.0663 25.9682C20.0663 25.3173 20.5958 24.7878 21.2467 24.7878C21.8975 24.7878 22.427 25.3173 22.427 25.9682Z" fill="#474E5A"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M21.2467 28.9191C25.484 28.9191 28.9191 25.484 28.9191 21.2467C28.9191 17.0093 25.484 13.5743 21.2467 13.5743C17.0093 13.5743 13.5743 17.0093 13.5743 21.2467C13.5743 22.4532 13.7855 23.1441 14.2856 24.0778C14.6589 24.7748 14.767 25.6282 14.4957 26.4421L13.7179 28.7754L16.0512 27.9977C16.8651 27.7264 17.7186 27.8344 18.4156 28.2078C19.3492 28.7078 20.0401 28.9191 21.2467 28.9191ZM21.2467 30.6896C26.4619 30.6896 30.6896 26.4619 30.6896 21.2467C30.6896 16.0315 26.4619 11.8037 21.2467 11.8037C16.0315 11.8037 11.8037 16.0315 11.8037 21.2467C11.8037 22.7697 12.0993 23.7458 12.7248 24.9137C12.8844 25.2117 12.9229 25.5616 12.816 25.8822L11.8643 28.7374C11.8242 28.8577 11.8037 28.9838 11.8037 29.1106V29.5093C11.8037 30.1612 12.3322 30.6896 12.9841 30.6896H13.3827C13.5096 30.6896 13.6356 30.6692 13.756 30.6291L16.6111 29.6774C16.9318 29.5705 17.2817 29.609 17.5796 29.7686C18.7476 30.3941 19.7236 30.6896 21.2467 30.6896Z" fill="#474E5A"/>
  </svg>
);

const SupportedUseCasesIcon = () => (
  <svg width="32" height="32" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.18047" y="1.18035" width="40.1326" height="40.1326" rx="10.6233" fill="#F5F6F8"/>
    <rect x="1.18047" y="1.18035" width="40.1326" height="40.1326" rx="10.6233" stroke="white" strokeWidth="2.36074"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M11.8037 15.0498C11.8037 13.909 12.7285 12.9841 13.8694 12.9841H18.2958C19.4823 12.9841 20.543 13.5228 21.2467 14.369C21.9504 13.5228 23.0111 12.9841 24.1976 12.9841H28.624C29.7648 12.9841 30.6896 13.909 30.6896 15.0498V27.4437C30.6896 28.5845 29.7648 29.5093 28.624 29.5093H13.8694C12.7285 29.5093 11.8037 28.5845 11.8037 27.4437V15.0498ZM20.3614 27.7388V16.8203C20.3614 15.6795 19.4366 14.7547 18.2958 14.7547H13.8694C13.7064 14.7547 13.5743 14.8868 13.5743 15.0498V27.4437C13.5743 27.6066 13.7064 27.7388 13.8694 27.7388H20.3614ZM22.132 27.7388H28.624C28.787 27.7388 28.9191 27.6066 28.9191 27.4437V15.0498C28.9191 14.8868 28.787 14.7547 28.624 14.7547H26.5537V19.1811C26.5537 19.67 26.1574 20.0664 25.6685 20.0664C25.1795 20.0664 24.7832 19.67 24.7832 19.1811V14.7547H24.1976C23.0568 14.7547 22.132 15.6795 22.132 16.8203V27.7388Z" fill="#474E5A"/>
  </svg>
);

const SandboxIcon = () => (
  <svg width="32" height="32" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.18047" y="1.18035" width="40.1326" height="40.1326" rx="10.6233" fill="#F5F6F8"/>
    <rect x="1.18047" y="1.18035" width="40.1326" height="40.1326" rx="10.6233" stroke="white" strokeWidth="2.36074"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M20.1819 13.7957C20.4945 13.6498 20.8353 13.5742 21.1802 13.5742H21.3131C21.6581 13.5742 21.9989 13.6498 22.3115 13.7957L29.3272 17.0697C30.1584 17.4576 30.6896 18.2918 30.6896 19.209V23.3287C30.6896 24.2229 30.1844 25.0403 29.3847 25.4402L23.1747 28.5452C22.683 28.791 22.1408 28.919 21.5911 28.919H20.9022C20.3525 28.919 19.8103 28.791 19.3186 28.5452L13.1087 25.4402C12.3089 25.0403 11.8037 24.2229 11.8037 23.3287V19.209C11.8037 18.2918 12.335 17.4576 13.1661 17.0697L20.1819 13.7957ZM28.9191 20.1708V23.3287C28.9191 23.5523 28.7928 23.7566 28.5928 23.8566L22.3829 26.9616C22.3018 27.0021 22.2179 27.0363 22.132 27.0638V23.5644L28.9191 20.1708ZM28.2551 18.5233L25.3251 19.9883L21.9549 18.4328V15.5832L28.2551 18.5233ZM20.5385 15.5832L14.2383 18.5232L17.1683 19.9882L20.5385 18.4327V15.5832ZM21.2467 22.0275L23.7027 20.7995L21.2466 19.6659L18.7907 20.7994L21.2467 22.0275ZM13.5743 20.1708L20.3614 23.5644V27.0639C20.2755 27.0363 20.1916 27.0021 20.1104 26.9616L13.9005 23.8566C13.7006 23.7566 13.5743 23.5523 13.5743 23.3287V20.1708Z" fill="#474E5A"/>
  </svg>
);

// Resource Link Component for declined view
const ResourceLink = ({ icon: Icon, children, href = "#" }) => (
  <a 
    href={href}
    className="flex items-center gap-3 text-[14px] font-semibold text-[#533afd] hover:text-[#4730d9] transition-colors"
  >
    <div className="shrink-0">
      <Icon />
    </div>
    <span>{children}</span>
  </a>
);

// Form Text Input Component
const FormInput = ({ label, placeholder, value, onChange, className = '' }) => (
  <div className={`flex flex-col gap-1 ${className}`}>
    <label className="font-semibold text-[14px] text-[#353a44] leading-5 tracking-[-0.15px]">
      {label}
    </label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full h-10 px-3 border border-[#d8dee4] rounded-md text-[16px] text-[#353a44] placeholder-[#6c7688] leading-6 tracking-[-0.31px] focus:outline-none focus:border-[#675dff] focus:ring-1 focus:ring-[#675dff]"
    />
  </div>
);

// Form Select Component
const FormSelect = ({ label, description, value, onChange, options, placeholder = 'Select one' }) => (
  <div className="flex flex-col gap-1">
    <div className="flex flex-col">
      <label className="font-semibold text-[14px] text-[#353a44] leading-5 tracking-[-0.15px]">
        {label}
      </label>
      {description && (
        <span className="text-[12px] text-[#596171] leading-4">{description}</span>
      )}
    </div>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-10 px-2 pr-8 border border-[#d8dee4] rounded-md text-[16px] text-[#353a44] font-semibold leading-6 tracking-[-0.31px] bg-white appearance-none cursor-pointer focus:outline-none focus:border-[#675dff] focus:ring-1 focus:ring-[#675dff] shadow-[0px_1px_1px_rgba(33,37,44,0.16)]"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
        <SelectChevronIcon className="w-4 h-4 text-[#474e5a]" />
      </div>
    </div>
  </div>
);

// Declined Content (Step 6 for declined path)
const DeclinedContent = ({ onClose, onSubmitForm }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    workEmail: '',
    companyWebsite: '',
    country: 'us',
    customers: '',
    customerLocation: '',
    crypto: '',
    businessExpenseCard: '',
    estimatedVolume: '',
    funding: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    if (onSubmitForm) {
      onSubmitForm(formData);
    }
  };

  // Show thank you state after submission
  if (isSubmitted) {
    return (
      <div className="w-full max-w-[520px]">
        <div className="mb-8">
          <h1 className="text-[28px] font-bold text-[#353a44] leading-[36px] tracking-[0.38px] mb-3">
            We've received your information
          </h1>
          <p className="text-[16px] text-[#596171] leading-[24px] tracking-[-0.31px]">
            Our team is reviewing your details and will reach out within a few business days to discuss next steps for your card program.
          </p>
        </div>
        <button 
          onClick={onClose}
          className="w-full py-3 bg-[#675dff] hover:bg-[#5650e0] text-white font-bold text-[16px] rounded-md transition-colors shadow-[0px_1px_1px_rgba(47,14,99,0.32)]"
        >
          Return to dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[520px]">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-[28px] font-bold text-[#353a44] leading-[36px] tracking-[0.38px] mb-2">
          We need a bit more information
        </h1>
        <p className="text-[16px] text-[#596171] leading-[24px] tracking-[-0.31px]">
          Fill out this form and our team will reach out to discuss next steps.
        </p>
      </div>
      
      {/* Form Fields */}
      <div className="flex flex-col gap-4 mb-8">
        {/* First Name & Last Name - Side by side */}
        <div className="flex gap-6">
          <FormInput
            label="First name"
            placeholder="Jane"
            value={formData.firstName}
            onChange={(v) => updateField('firstName', v)}
            className="flex-1"
          />
          <FormInput
            label="Last name"
            placeholder="Diaz"
            value={formData.lastName}
            onChange={(v) => updateField('lastName', v)}
            className="flex-1"
          />
        </div>

        {/* Work Email */}
        <FormInput
          label="Work email"
          placeholder="jane@company.com"
          value={formData.workEmail}
          onChange={(v) => updateField('workEmail', v)}
        />

        {/* Company Website */}
        <FormInput
          label="Company website"
          placeholder="https://company.com"
          value={formData.companyWebsite}
          onChange={(v) => updateField('companyWebsite', v)}
        />

        {/* Country/Region */}
        <FormSelect
          label="Country/Region"
          value={formData.country}
          onChange={(v) => updateField('country', v)}
          placeholder="Select country"
          options={[
            { value: 'us', label: 'United States' },
            { value: 'gb', label: 'United Kingdom' },
            { value: 'eu', label: 'European Union' },
            { value: 'ca', label: 'Canada' },
            { value: 'au', label: 'Australia' },
            { value: 'other', label: 'Other' },
          ]}
        />

        {/* Customers */}
        <FormSelect
          label="Customers"
          description="Who will use the cards or funds?"
          value={formData.customers}
          onChange={(v) => updateField('customers', v)}
          options={[
            { value: 'employees', label: 'Employees of my business' },
            { value: 'businesses', label: 'Businesses on my platform' },
            { value: 'consumers', label: 'Consumers on my platform' },
            { value: 'contractors', label: 'Contractors' },
            { value: 'other', label: 'Other' },
          ]}
        />

        {/* Customer Location */}
        <FormSelect
          label="Customer location"
          description="Where do you plan to issue cards or distribute funds?"
          value={formData.customerLocation}
          onChange={(v) => updateField('customerLocation', v)}
          options={[
            { value: 'us', label: 'United States' },
            { value: 'eu', label: 'Europe' },
            { value: 'global', label: 'Global' },
            { value: 'other', label: 'Other' },
          ]}
        />

        {/* Crypto */}
        <FormSelect
          label="Crypto"
          description="Will the cards or funds be used for a crypto use case?"
          value={formData.crypto}
          onChange={(v) => updateField('crypto', v)}
          options={[
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ]}
        />

        {/* Business expense card */}
        <FormSelect
          label="Business expense card"
          description="Are you looking for a corporate card for your business?"
          value={formData.businessExpenseCard}
          onChange={(v) => updateField('businessExpenseCard', v)}
          options={[
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ]}
        />

        {/* Estimated Volume */}
        <FormSelect
          label="Estimated volume"
          description="How much do you expect to finance or spend on cards per month?"
          value={formData.estimatedVolume}
          onChange={(v) => updateField('estimatedVolume', v)}
          placeholder="Select monthly amount"
          options={[
            { value: 'under10k', label: 'Under $10,000' },
            { value: '10k-50k', label: '$10,000 - $50,000' },
            { value: '50k-100k', label: '$50,000 - $100,000' },
            { value: '100k-500k', label: '$100,000 - $500,000' },
            { value: '500k-1m', label: '$500,000 - $1,000,000' },
            { value: 'over1m', label: 'Over $1,000,000' },
          ]}
        />

        {/* Funding */}
        <FormSelect
          label="Funding"
          description="If you're a startup, how much funding have you raised to date?"
          value={formData.funding}
          onChange={(v) => updateField('funding', v)}
          placeholder="Select amount"
          options={[
            { value: 'bootstrapped', label: 'Bootstrapped' },
            { value: 'pre-seed', label: 'Pre-seed' },
            { value: 'seed', label: 'Seed' },
            { value: 'seriesA', label: 'Series A' },
            { value: 'seriesB', label: 'Series B+' },
            { value: 'not-startup', label: 'Not a startup' },
          ]}
        />
      </div>
      
      {/* Submit Button */}
      <button 
        onClick={handleSubmit}
        className="w-full py-3 bg-[#675dff] hover:bg-[#5650e0] text-white font-bold text-[16px] rounded-md transition-colors shadow-[0px_1px_1px_rgba(47,14,99,0.32)]"
      >
        Submit
      </button>
    </div>
  );
};

// Right sidebar callout for declined view
const DeclinedSidebarContent = () => (
  <div className="flex flex-col gap-5">
    {/* Supported Use Cases Callout */}
    <div className="bg-[#f5f6f8] rounded-lg p-4">
      <h4 className="font-bold text-[16px] text-[#3d3d3d] leading-6 tracking-[-0.31px] mb-1">
        Supported use cases
      </h4>
      <p className="text-[14px] text-[#596171] leading-5 tracking-[-0.15px] mb-4">
        View use cases you can set up today without additional review.
      </p>
      <a href="#" className="text-[14px] font-semibold text-[#533afd] hover:underline">
        Learn more
      </a>
    </div>
    
    {/* Explore in Sandbox Callout */}
    <div className="bg-[#f5f6f8] rounded-lg p-4">
      <h4 className="font-bold text-[16px] text-[#3d3d3d] leading-6 tracking-[-0.31px] mb-1">
        Explore in sandbox
      </h4>
      <p className="text-[14px] text-[#596171] leading-5 tracking-[-0.15px] mb-4">
        You can still explore and build with our APIs while you wait.
      </p>
      <a href="#" className="text-[14px] font-semibold text-[#533afd] hover:underline">
        Start exploring
      </a>
    </div>
  </div>
);

// Success Illustration - Financial Accounts illustration
const SuccessIllustration = () => (
  <div className="w-full h-[220px] flex items-center justify-center">
    <img 
      src={new URL('../../assets/fa-illustration.svg', import.meta.url).href}
      alt="Financial accounts illustration"
      className="w-full h-full object-contain"
    />
  </div>
);

// Right Sidebar Callout for Step 2
const UseCaseCallout = () => (
  <div className="w-[278px] bg-[#f5f6f8] rounded-lg p-4">
    <h4 className="font-bold text-[16px] text-[#3d3d3d] leading-6 mb-1">
      Supported use cases for Issuing
    </h4>
    <p className="text-[14px] text-[#596171] leading-5 mb-4">
      Learn about the use cases Issuing supports and how to set up your program.
    </p>
    <a href="#" className="text-[14px] font-semibold text-[#533afd] hover:underline">
      View documentation
    </a>
  </div>
);

// Check if use case triggers immediate decline
const isSpecializedUseCase = (useCase) => {
  const specializedUseCases = ['fleet', 'insurance', 'bnpl', 'other'];
  return specializedUseCases.includes(useCase);
};

// Check if cardholder selection triggers decline
const isBusinessCardholder = (cardHolder) => {
  return cardHolder === 'employees' || cardHolder === 'ai_agents';
};

const isNonBusinessCardholder = (cardHolder) => {
  return cardHolder && !isBusinessCardholder(cardHolder);
};

// Main Modal Component
const SetupIssuingModal = ({ isOpen, onClose, onComplete, onStartIntegrating, onSimulatePurchase, onViewDocs, onGoToBalances, initialStep = 0, initialAgentInteraction = null, onboardingPath = 'happy', isSandboxMode = false, onExitSandbox, showTimeout = false }) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [selectedSetupType, setSelectedSetupType] = useState(null);
  const [selectedUseCase, setSelectedUseCase] = useState(null);
  const [selectedCardHolder, setSelectedCardHolder] = useState(null);
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionTouched, setDescriptionTouched] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agentInteraction, setAgentInteraction] = useState(initialAgentInteraction);

  const setUseCase = useCallback((value) => {
    setSelectedUseCase(value);
    if (value !== 'corporate') {
      setSelectedSetupType(null);
    }
  }, []);
  
  // Track if user has been declined (computed immediately when decline criteria is met)
  // null = not yet determined, true = declined, false = approved
  const [isDeclined, setIsDeclined] = useState(null);
  
  // For direct navigation to declined screen via external link (e.g., "Preview declined" button)
  const isDirectDeclinePath = onboardingPath === 'declined';
  
  // Step counts depend on whether user is declined
  // Declined flow: step 4 = processing, step 5 = declined screen
  // Normal flow: steps 0-6 (use case, cardholders, setup type, review, processing, success)
  const isDeclinedFlow = isDeclined === true || isDirectDeclinePath;
  const maxStep = isDeclinedFlow ? 5 : 6;
  const processingStep = isDeclinedFlow ? 4 : 5;
  const finalStep = isDeclinedFlow ? 5 : 6;
  
  // Reset state when modal opens
  React.useEffect(() => {
    if (isOpen) {
      // For direct decline path link, skip directly to the declined screen
      if (isDirectDeclinePath) {
        setIsDeclined(true);
        setCurrentStep(5);
      } else {
        setIsDeclined(null);
        setCurrentStep(initialStep);
      }
      setAgentInteraction(initialAgentInteraction);
    }
  }, [isOpen, initialStep, isDirectDeclinePath, initialAgentInteraction]);

  // Auto-transition from processing to success/declined after 3 seconds (skip if timeout state)
  useEffect(() => {
    if (currentStep === processingStep && !showTimeout) {
      const timer = setTimeout(() => {
        setCurrentStep(finalStep);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, processingStep, finalStep, showTimeout]);

  if (!isOpen) return null;

  const needsSetupTypeStep =
    (onboardingPath === 'happy' || onboardingPath === 'auto-create-card') &&
    selectedUseCase === 'corporate';

  // Step flow with immediate decline feedback:
  //   Happy path:
  //     0: Choose cardholders → If non-business → processing → declined
  //     1: Describe use case → If specialized → processing → declined
  //   KYC path:
  //     0: Provide more information
  //     1: Choose cardholders → If non-business → processing → declined
  //     2: Describe use case → If specialized → processing → declined
  //
  // Approved flow (happy / auto-create-card):
  //   3: Choose setup type (corporate use case only)
  //   4: Review and submit
  //   5: Processing
  //   6: Success
  //
  // Declined flow:
  //   4: Processing (3 seconds)
  //   5: Declined screen
  
  // Build steps array for sidebar
  const getSteps = () => {
    const showAgentStep = selectedUseCase !== 'ondemand';

    if (onboardingPath === 'happy' || onboardingPath === 'auto-create-card') {
      const steps = [
        { label: 'Select cardholders', status: currentStep === 0 ? 'active' : currentStep > 0 ? 'complete' : 'pending', stepNumber: 0 },
        { label: 'Describe use case', status: currentStep === 1 ? 'active' : currentStep > 1 ? 'complete' : 'pending', stepNumber: 1 },
      ];
      if (showAgentStep) {
        steps.push({ label: 'Confirm agent usage', status: currentStep === 2 ? 'active' : currentStep > 2 ? 'complete' : 'pending', stepNumber: 2 });
      }
      if (needsSetupTypeStep) {
        steps.push({ label: 'Choose setup type', status: currentStep === 3 ? 'active' : currentStep > 3 ? 'complete' : 'pending', stepNumber: 3 });
      }
      steps.push({ label: 'Review and submit', status: currentStep === 4 ? 'active' : currentStep > 4 ? 'complete' : 'pending', stepNumber: 4 });
      return steps;
    }
    
    const kycSteps = [
      { label: 'Complete business details', status: currentStep === 0 ? 'active' : currentStep > 0 ? 'complete' : 'pending', stepNumber: 0 },
      { label: 'Select cardholders', status: currentStep === 1 ? 'active' : currentStep > 1 ? 'complete' : 'pending', stepNumber: 1 },
      { label: 'Describe use case', status: currentStep === 2 ? 'active' : currentStep > 2 ? 'complete' : 'pending', stepNumber: 2 },
    ];
    if (showAgentStep) {
      kycSteps.push({ label: 'Confirm agent usage', status: currentStep === 3 ? 'active' : currentStep > 3 ? 'complete' : 'pending', stepNumber: 3 });
    }
    kycSteps.push({ label: 'Review and submit', status: currentStep === 4 ? 'active' : currentStep > 4 ? 'complete' : 'pending', stepNumber: 4 });
    return kycSteps;
  };
  
  const steps = getSteps();

  const handleContinue = () => {
    if (onboardingPath === 'kyc') {
      if (currentStep === 1) {
        if (isNonBusinessCardholder(selectedCardHolder)) {
          setIsDeclined(true);
          setCurrentStep(4);
          return;
        }
      }
      
      if (currentStep === 2) {
        if (isSpecializedUseCase(selectedUseCase)) {
          setIsDeclined(true);
          setCurrentStep(4);
          return;
        }
        if (selectedUseCase === 'ondemand') {
          setAgentInteraction('yes');
          setIsDeclined(false);
          setCurrentStep(4);
          return;
        }
        setCurrentStep(3);
        return;
      }

      if (currentStep === 3) {
        setIsDeclined(false);
        setCurrentStep(4);
        return;
      }
    } else {
      if (currentStep === 0) {
        if (isNonBusinessCardholder(selectedCardHolder)) {
          setIsDeclined(true);
          setCurrentStep(4);
          return;
        }
      }
      
      if (currentStep === 1) {
        if (isSpecializedUseCase(selectedUseCase)) {
          setIsDeclined(true);
          setCurrentStep(4);
          return;
        }
        if (selectedUseCase === 'ondemand') {
          setAgentInteraction('yes');
          setIsDeclined(false);
          setCurrentStep(4);
          return;
        }
        setCurrentStep(2);
        return;
      }

      if (currentStep === 2) {
        setIsDeclined(false);
        setCurrentStep(selectedUseCase === 'corporate' ? 3 : 4);
        return;
      }
    }
    
    if (currentStep < maxStep) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStartIntegratingClick = () => {
    if (onStartIntegrating) {
      onStartIntegrating();
    }
  };

  const handleGoToBalances = () => {
    if (onGoToBalances) {
      onGoToBalances();
    } else if (onComplete) {
      onComplete();
    } else {
      onClose();
    }
  };

  // Processing and final screens
  const isProcessingScreen = currentStep === processingStep;
  const isFinalScreen = currentStep === finalStep;
  const isSuccessScreen = isFinalScreen && !isDeclinedFlow;
  const isDeclinedScreen = isFinalScreen && isDeclinedFlow;

  const handleSaveAndExit = () => {
    onClose(currentStep);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col">
      {/* Sandbox Banner - shown when in sandbox mode */}
      {isSandboxMode && <SandboxBanner onExit={onExitSandbox} />}
      
      <div className={`flex-1 flex items-center justify-center p-4 ${isSandboxMode ? 'mt-[52px]' : ''}`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-[rgba(182,192,205,0.7)]"
          onClick={handleSaveAndExit}
          style={isSandboxMode ? { top: '52px' } : {}}
        />
        
        {/* Dialog - With padding around edges */}
        <div className="relative bg-white rounded-lg shadow-[0px_15px_35px_rgba(48,49,61,0.08),0px_5px_15px_rgba(0,0,0,0.12)] w-full h-full max-h-[calc(100vh-32px-52px)] flex flex-col overflow-hidden" style={!isSandboxMode ? { maxHeight: 'calc(100vh - 32px)' } : {}}>
          {/* Header */}
          <div className="flex items-center justify-between px-4 h-[56px] shrink-0">
            <h2 className="font-bold text-[16px] text-[#353a44] tracking-[-0.31px]">Set up Issuing</h2>
            {(isFinalScreen && !isDeclinedScreen) ? (
              <Button variant="secondary" size="md" onClick={onComplete || onClose}>
                {onboardingPath === 'auto-create-card' ? 'Exit to dashboard' : 'Exit'}
              </Button>
            ) : isProcessingScreen ? (
              <div /> 
            ) : (
              <div className="flex gap-2">
                <Button variant="secondary" size="md">
                  Need help?
                </Button>
                <Button variant="secondary" size="md" onClick={handleSaveAndExit}>
                  Save and exit
                </Button>
              </div>
            )}
          </div>
        
        {/* Content - Three column layout with centered main content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar - Task List (hidden on intro, processing and final screens) */}
          <div className="w-[278px] pt-6 px-8 shrink-0">
            {!isProcessingScreen && !isFinalScreen && (
              <div className="space-y-0">
                {steps.map((step, index) => (
                  <TaskListItem
                    key={step.label}
                    label={step.label}
                    status={step.status}
                    isLast={index === steps.length - 1}
                    onClick={step.status === 'complete' ? (step.onClick || (() => setCurrentStep(step.stepNumber))) : undefined}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Main Content - Centered */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="flex justify-center py-6 min-h-full">
              {onboardingPath === 'kyc' && (
                    <>
                      {currentStep === 0 && (
                        <OwnerInfoContent onContinue={handleContinue} />
                      )}
                      {currentStep === 1 && (
                        <CardHoldersContent 
                          onContinue={handleContinue}
                          selectedCardHolder={selectedCardHolder}
                          setSelectedCardHolder={setSelectedCardHolder}
                        />
                      )}
                      {currentStep === 2 && (
                        <UseCaseContent 
                          onContinue={handleContinue}
                          selectedUseCase={selectedUseCase}
                          setSelectedUseCase={setUseCase}
                          selectedIndustry={selectedIndustry}
                          setSelectedIndustry={setSelectedIndustry}
                          description={description}
                          setDescription={setDescription}
                        />
                      )}
                      {currentStep === 3 && (
                        <AgentInteractionContent
                          onContinue={handleContinue}
                          agentInteraction={agentInteraction}
                          setAgentInteraction={setAgentInteraction}
                        />
                      )}
                    </>
                  )}
                  {onboardingPath !== 'kyc' && (
                    <>
                      {currentStep === 0 && (
                        <CardHoldersContent 
                          onContinue={handleContinue}
                          selectedCardHolder={selectedCardHolder}
                          setSelectedCardHolder={setSelectedCardHolder}
                        />
                      )}
                      {currentStep === 1 && (
                        <UseCaseContent 
                          onContinue={handleContinue}
                          selectedUseCase={selectedUseCase}
                          setSelectedUseCase={setUseCase}
                          selectedIndustry={selectedIndustry}
                          setSelectedIndustry={setSelectedIndustry}
                          description={description}
                          setDescription={setDescription}
                        />
                      )}
                      {currentStep === 2 && (
                        <AgentInteractionContent
                          onContinue={handleContinue}
                          agentInteraction={agentInteraction}
                          setAgentInteraction={setAgentInteraction}
                        />
                      )}
                    </>
                  )}
                  {needsSetupTypeStep && currentStep === 3 && (
                    <ChooseSetupTypeContent
                      onContinue={handleContinue}
                      selectedSetupType={selectedSetupType}
                      setSelectedSetupType={setSelectedSetupType}
                    />
                  )}
                  {isDeclinedFlow ? (
                    <>
                      {currentStep === 4 && (
                        <ProcessingContent />
                      )}
                      {currentStep === 5 && (
                        <DeclinedContent onClose={onClose} />
                      )}
                    </>
                  ) : (
                    <>
                      {currentStep === 4 && (
                        <SubmitReviewContent
                          onSubmit={handleContinue}
                          selectedUseCase={selectedUseCase}
                          selectedIndustry={selectedIndustry}
                          description={description}
                          agentInteraction={agentInteraction}
                          selectedSetupType={selectedSetupType}
                          onEditSetupType={() => setCurrentStep(3)}
                          onEditAgentUsage={() => setCurrentStep(2)}
                          agreedTerms={agreedTerms}
                          setAgreedTerms={setAgreedTerms}
                        />
                      )}
                      {currentStep === 5 && (
                        showTimeout ? <TimeoutContent onClose={onClose} /> : <ProcessingContent />
                      )}
                      {currentStep === 6 && (
                        onboardingPath === 'auto-create-card' ? (
                          <AutoCreateCardSuccessContent
                            onSimulatePurchase={onSimulatePurchase}
                          />
                        ) : (
                          <SuccessContent 
                            onStartIntegrating={handleStartIntegratingClick} 
                            onViewDocs={onViewDocs || onComplete || onClose}
                            selectedUseCase={selectedUseCase}
                            agentInteraction={agentInteraction}
                          />
                        )
                      )}
                    </>
                  )}
            </div>
          </div>
          
          {/* Right Sidebar - Contextual content (hidden during intro) */}
          <div className="w-[310px] min-w-[310px] pt-6 pr-8 shrink-0">
            {((onboardingPath === 'kyc' ? currentStep === 2 : currentStep === 1)) && <UseCaseCallout />}
            {needsSetupTypeStep && currentStep === 3 && <CustomSetupCallout />}
            {isDeclinedScreen && <DeclinedSidebarContent />}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default SetupIssuingModal;

