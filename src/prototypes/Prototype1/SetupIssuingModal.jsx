import React, { useState, useEffect } from 'react';

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

// Chevron Down Icon
const ChevronDownIcon = ({ className }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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

// API Icon - Terminal/code style
const ApiIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M19.5 3.75H4.5C3.25736 3.75 2.25 4.75736 2.25 6V18C2.25 19.2426 3.25736 20.25 4.5 20.25H19.5C20.7426 20.25 21.75 19.2426 21.75 18V6C21.75 4.75736 20.7426 3.75 19.5 3.75ZM4.5 1.5C2.01472 1.5 0 3.51472 0 6V18C0 20.4853 2.01472 22.5 4.5 22.5H19.5C21.9853 22.5 24 20.4853 24 18V6C24 3.51472 21.9853 1.5 19.5 1.5H4.5Z" fill="#675DFF"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M5.14584 6.76786C5.55019 6.29612 6.2604 6.24149 6.73214 6.64584L11.9821 11.1458C12.2315 11.3596 12.375 11.6716 12.375 12C12.375 12.3284 12.2315 12.6404 11.9821 12.8542L6.73214 17.3542C6.2604 17.7585 5.55019 17.7039 5.14584 17.2321C4.74149 16.7604 4.79612 16.0502 5.26786 15.6458L9.52134 12L5.26786 8.35416C4.79612 7.94981 4.74149 7.2396 5.14584 6.76786Z" fill="#675DFF"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 16.125C12 15.5037 12.5037 15 13.125 15H18.375C18.9963 15 19.5 15.5037 19.5 16.125C19.5 16.7463 18.9963 17.25 18.375 17.25H13.125C12.5037 17.25 12 16.7463 12 16.125Z" fill="#675DFF"/>
  </svg>
);

// Task List Item Component
const TaskListItem = ({ label, status, isLast }) => {
  const isActive = status === 'active';
  const isComplete = status === 'complete';
  
  return (
    <div className="flex flex-col">
      <div className="flex gap-2 items-start">
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
        <span className={`text-sm leading-5 tracking-[-0.15px] ${isActive ? 'text-[#533afd]' : 'text-[#596171]'}`}>
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
        ? 'border-2 border-[#675dff] bg-white' 
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

// Checkmark Icon for feature lists
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 8L6.5 11.5L13 4.5" stroke="#675dff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Feature Item Component for setup type cards
const FeatureItem = ({ children }) => (
  <div className="flex gap-2 items-center">
    <CheckIcon />
    <span className="text-[14px] text-[#596171] leading-5">{children}</span>
  </div>
);

// Dashboard Illustration - simplified UI mockup
const DashboardIllustration = () => (
  <div className="w-full h-full bg-[#f0f2f5] rounded-md p-3 flex flex-col gap-2">
    {/* Header bar */}
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 rounded-full bg-[#d8dee4]" />
      <div className="flex-1 h-2 bg-[#d8dee4] rounded" />
    </div>
    {/* Card rows */}
    <div className="flex-1 flex flex-col gap-1.5">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-2 bg-white rounded p-1.5">
          <div className="w-6 h-4 rounded bg-[#625afa]" />
          <div className="flex-1">
            <div className="h-1.5 bg-[#d8dee4] rounded w-3/4 mb-1" />
            <div className="h-1 bg-[#e3e8ee] rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Code Editor Illustration - terminal/code view
const CodeEditorIllustration = () => (
  <div className="w-full h-full bg-[#1a1f36] rounded-md p-3 flex flex-col gap-2 overflow-hidden">
    {/* Window controls */}
    <div className="flex items-center gap-1.5">
      <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
      <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
      <div className="w-2 h-2 rounded-full bg-[#28ca42]" />
    </div>
    {/* Code lines */}
    <div className="flex-1 flex flex-col gap-1.5 font-mono text-[8px]">
      <div className="flex gap-1">
        <span className="text-[#7b7f98]">1</span>
        <span className="text-[#a78bfa]">const</span>
        <span className="text-[#e2e8f0]">card =</span>
        <span className="text-[#fbbf24]">await</span>
      </div>
      <div className="flex gap-1">
        <span className="text-[#7b7f98]">2</span>
        <span className="text-[#e2e8f0] ml-2">stripe.issuing</span>
      </div>
      <div className="flex gap-1">
        <span className="text-[#7b7f98]">3</span>
        <span className="text-[#e2e8f0] ml-4">.cards.create(</span>
        <span className="text-[#fbbf24]">{"{"}</span>
      </div>
      <div className="flex gap-1">
        <span className="text-[#7b7f98]">4</span>
        <span className="text-[#7dd3fc] ml-6">type:</span>
        <span className="text-[#a5f3ab]">'virtual'</span>
      </div>
      <div className="flex gap-1">
        <span className="text-[#7b7f98]">5</span>
        <span className="text-[#fbbf24] ml-4">{"}"})</span>
      </div>
    </div>
  </div>
);

// Setup Type Card Component - Updated layout with illustration
const SetupTypeCard = ({ title, description, features, onContinue, illustration }) => (
  <div className="bg-white border border-[#d8dee4] rounded-lg p-6 w-full">
    <div className="flex gap-6">
      {/* Left side - Illustration */}
      <div className="w-[140px] self-stretch shrink-0">
        {illustration}
      </div>
      
      {/* Right side - Text content */}
      <div className="flex-1 flex flex-col">
        <h3 className="font-semibold text-[18px] text-[#353a44] leading-7 tracking-[-0.48px]">{title}</h3>
        <p className="text-[14px] text-[#596171] leading-5 mt-0.5 mb-3">{description}</p>
        
        {/* Feature list */}
        <div className="flex flex-col gap-1">
          {features.map((feature, index) => (
            <FeatureItem key={index}>{feature}</FeatureItem>
          ))}
        </div>
      </div>
    </div>
    
    {/* Continue button - full width purple */}
    <div className="mt-4">
      <button 
        onClick={onContinue}
        className="w-full py-2.5 bg-[#625afa] hover:bg-[#5650e0] text-white font-semibold text-sm rounded-md transition-colors"
      >
        Continue
      </button>
    </div>
  </div>
);

// Right Sidebar Callout for Choose Setup Type step
const CustomSetupCallout = () => (
  <div className="w-[278px] bg-[#f5f6f8] rounded-lg p-4">
    <h4 className="font-bold text-[16px] text-[#353a44] leading-6 mb-1">
      Need more flexibility?
    </h4>
    <p className="text-[14px] text-[#596171] leading-5 mb-3">
      Explore custom card programs, pricing, or integrations with our team.
    </p>
    <a href="#" className="text-[14px] font-semibold text-[#533afd] hover:underline">
      Contact us
    </a>
  </div>
);

// Step 0: Choose Setup Type Content
const ChooseSetupTypeContent = ({ onContinue, selectedSetupType, setSelectedSetupType }) => (
  <div className="w-full max-w-[520px]">
    {/* Page Header */}
    <div className="mb-8">
      <h1 className="text-[28px] font-bold text-[#353a44] leading-[36px] tracking-[0.38px] mb-2">
        How do you want to get started?
      </h1>
      <p className="text-[16px] text-[#596171] leading-[24px] tracking-[-0.31px]">
        Choose the setup that best fits your needs.
      </p>
    </div>
    
    {/* Setup Type Cards */}
    <div className="flex flex-col gap-4">
      <SetupTypeCard
        title="Manage in dashboard"
        description="You create cards and track spending in the dashboard."
        features={[
          'Best for small businesses',
          'No code required',
          'No Issuing API access',
          'Free',
        ]}
        illustration={<DashboardIllustration />}
        onContinue={() => {
          setSelectedSetupType('dashboard');
          onContinue();
        }}
      />
      
      <SetupTypeCard
        title="Build with the API"
        description="You write the code—Stripe handles the rest."
        features={[
          'Best for fintechs and startups',
          'Issuing API access',
          'US Commercial Program',
          'Prepaid Mastercard',
          'Pay as you go',
        ]}
        illustration={<CodeEditorIllustration />}
        onContinue={() => {
          setSelectedSetupType('api');
          onContinue();
        }}
      />
    </div>
  </div>
);

// Filled Checkmark Icon for confirmation list
const FilledCheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="8" fill="#675dff"/>
    <path d="M4.5 8L7 10.5L11.5 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Confirmation Item Component
const ConfirmationItem = ({ children }) => (
  <div className="flex gap-2 items-center">
    <FilledCheckIcon />
    <span className="text-[16px] text-[#353a44] leading-6 tracking-[-0.31px]">{children}</span>
  </div>
);

// Step 0.5: Confirm Setup Content (shown after selecting dashboard option)
const ConfirmSetupContent = ({ onContinue }) => (
  <div className="w-full max-w-[520px]">
    {/* Page Header */}
    <div className="mb-8">
      <h1 className="text-[28px] font-bold text-[#353a44] leading-[36px] tracking-[0.38px] mb-2">
        Confirm this setup is right for you
      </h1>
      <p className="text-[16px] text-[#596171] leading-[24px] tracking-[-0.31px]">
        This setup supports card programs that:
      </p>
    </div>
    
    {/* Confirmation Items */}
    <div className="flex flex-col gap-4 mb-8">
      <ConfirmationItem>Are for commercial business expenses</ConfirmationItem>
      <ConfirmationItem>Issue cards to employees of your company</ConfirmationItem>
      <ConfirmationItem>Have cardholders based in the United States</ConfirmationItem>
    </div>
    
    {/* Continue Button */}
    <div className="mb-4">
      <button 
        onClick={onContinue}
        className="w-full py-2.5 bg-[#675dff] hover:bg-[#5650e0] text-white font-semibold text-base rounded-md transition-colors shadow-[0px_1px_1px_0px_rgba(47,14,99,0.32)]"
      >
        Continue
      </button>
    </div>
    
    {/* Not a fit link */}
    <p className="text-[16px] text-[#596171] leading-[24px] tracking-[-0.31px]">
      Not a fit?{' '}
      <a href="#" className="text-[#533afd] hover:underline">Contact us</a>
      {' '}to discuss other options.
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
        className="w-full py-3 bg-[#625afa] hover:bg-[#5650e0] text-white font-medium text-sm rounded-md transition-colors"
      >
        Continue
      </button>
    </div>
  </div>
);

// Disabled Continue Button styles - stays purple when disabled per Figma design
const continueButtonClasses = (disabled) => 
  `w-full py-3 font-medium text-sm rounded-md transition-colors text-white ${
    disabled 
      ? 'bg-[#533afd]/50 cursor-not-allowed' 
      : 'bg-[#533afd] hover:bg-[#4730d9]'
  }`;

// Step 2: Use Case Content
const UseCaseContent = ({ onContinue, selectedUseCase, setSelectedUseCase, description, setDescription }) => {
  const [moreOptionsExpanded, setMoreOptionsExpanded] = useState(false);
  
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
        <div className="space-y-[9px]">
          <UseCaseOption
            title="Corporate expense management"
            description="Let employees or contractors make purchases on your business' behalf"
            selected={selectedUseCase === 'corporate'}
            onClick={() => setSelectedUseCase('corporate')}
          />
          <UseCaseOption
            title="B2B payments"
            description="Buy goods or services for inventory to resell to your customers."
            selected={selectedUseCase === 'b2b'}
            onClick={() => setSelectedUseCase('b2b')}
          />
          <UseCaseOption
            title="On-demand services"
            description="Buy goods and services from merchants on your customers' behalf."
            selected={selectedUseCase === 'ondemand'}
            onClick={() => setSelectedUseCase('ondemand')}
          />
        </div>
        
        {/* Specialized Use Cases Toggle */}
        <button 
          onClick={() => setMoreOptionsExpanded(!moreOptionsExpanded)}
          className="flex items-center gap-1 mt-4 text-[#596171] hover:text-[#474e5a]"
        >
          <ChevronDownIcon className={`transition-transform duration-200 ${moreOptionsExpanded ? '' : '-rotate-90'}`} />
          <span className="font-semibold text-sm">Specialized use cases</span>
        </button>
        
        {/* Expanded Specialized Use Cases */}
        {moreOptionsExpanded && (
          <div className="space-y-[9px] mt-[9px]">
            <UseCaseOption
              title="Fleet"
              description="Let employees, contractors, or customers to pay for vehicle operations or related expenses."
              selected={selectedUseCase === 'fleet'}
              onClick={() => setSelectedUseCase('fleet')}
            />
            <UseCaseOption
              title="Insurance"
              description="Let policyholders to purchase items or services that insurance covers."
              selected={selectedUseCase === 'insurance'}
              onClick={() => setSelectedUseCase('insurance')}
            />
            <UseCaseOption
              title="Buy now pay later"
              description="Fund purchases for customers who pay you back over time."
              selected={selectedUseCase === 'bnpl'}
              onClick={() => setSelectedUseCase('bnpl')}
            />
          </div>
        )}
      </div>
      
      {/* Description Textarea */}
      <div className="mb-8">
        <label className="block font-semibold text-[16px] text-[#353a44] mb-2">
          How will you use Issuing?
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. We want to issue virtual cards to our sales team for client entertainment expenses."
          className="w-full h-[88px] px-3 py-2 border border-[#d8dee4] rounded-md text-sm text-[#353a44] placeholder-[#6c7688] resize-y focus:outline-none focus:border-[#675dff] focus:ring-1 focus:ring-[#675dff]"
        />
      </div>
      
      {/* Continue Button */}
      <div className="flex justify-center">
        <button 
          onClick={onContinue}
          disabled={!selectedUseCase}
          className={continueButtonClasses(!selectedUseCase)}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

// Step 3: Pricing Content
// Owner Information Content - "Provide more information" step
// Owner/KYC Information Content - "Provide more information" step
const OwnerInfoContent = ({ onContinue }) => (
  <div className="w-full max-w-[580px] px-4">
    {/* Page Header */}
    <div className="mb-8">
      <h1 className="text-[28px] font-bold text-[#353a44] leading-[36px] mb-2">
        Provide more information
      </h1>
      <p className="text-[16px] text-[#596171] leading-[24px]">
        Before you can start issuing cards, Stripe needs more information from you.
      </p>
    </div>
    
    {/* Placeholder Box */}
    <div className="bg-[#f5f6f8] rounded-lg h-[360px] w-full mb-8" />
    
    {/* Continue Button */}
    <div className="flex justify-center">
      <button 
        onClick={onContinue}
        className="w-full py-3 bg-[#675dff] hover:bg-[#5650e0] text-white font-semibold text-base rounded-md transition-colors shadow-[0px_1px_1px_rgba(47,14,99,0.32)]"
      >
        Continue
      </button>
    </div>
  </div>
);

// Card Holders Content - "Describe card holders" step
const CardHoldersContent = ({ onContinue, selectedCardHolder, setSelectedCardHolder }) => (
  <div className="w-full max-w-[580px] px-4">
    {/* Page Header */}
    <div className="mb-8">
      <h1 className="text-[28px] font-bold text-[#353a44] leading-[36px] mb-2">
        Who do you want to issue cards for?
      </h1>
      <p className="text-[16px] text-[#596171] leading-[24px]">
        Choose who will hold and use the cards.
      </p>
    </div>
    
    {/* Card Holder Options */}
    <div className="space-y-[9px] mb-8">
      <button
        onClick={() => setSelectedCardHolder('business')}
        className={`w-full text-left px-[14px] py-[10px] rounded-lg transition-colors ${
          selectedCardHolder === 'business' 
            ? 'border-2 border-[#675dff] bg-white' 
            : 'border border-[#d8dee4] bg-white hover:border-[#a3acba]'
        }`}
      >
        <h4 className="font-semibold text-[16px] text-[#353a44] leading-6">My business</h4>
        <p className="text-[14px] text-[#596171] leading-5">Example: employees or agents of your business</p>
      </button>
      <button
        onClick={() => setSelectedCardHolder('platforms')}
        className={`w-full text-left px-[14px] py-[10px] rounded-lg transition-colors ${
          selectedCardHolder === 'platforms' 
            ? 'border-2 border-[#675dff] bg-white' 
            : 'border border-[#d8dee4] bg-white hover:border-[#a3acba]'
        }`}
      >
        <h4 className="font-semibold text-[16px] text-[#353a44] leading-6">Businesses of my platform</h4>
        <p className="text-[14px] text-[#596171] leading-5">Example: LLC or S-corp entities using your platform</p>
      </button>
      <button
        onClick={() => setSelectedCardHolder('consumers')}
        className={`w-full text-left px-[14px] py-[10px] rounded-lg transition-colors ${
          selectedCardHolder === 'consumers' 
            ? 'border-2 border-[#675dff] bg-white' 
            : 'border border-[#d8dee4] bg-white hover:border-[#a3acba]'
        }`}
      >
        <h4 className="font-semibold text-[16px] text-[#353a44] leading-6">Consumers on my platform</h4>
        <p className="text-[14px] text-[#596171] leading-5">Example: Individuals using your platform</p>
      </button>
    </div>
    
    {/* Continue Button */}
    <div className="flex justify-center">
      <button 
        onClick={onContinue}
        className="w-full py-3 bg-[#675dff] hover:bg-[#5650e0] text-white font-semibold text-base rounded-md transition-colors shadow-[0px_1px_1px_rgba(47,14,99,0.32)]"
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
        className="w-full py-3 bg-[#675dff] hover:bg-[#5650e0] text-white font-semibold text-base rounded-md transition-colors shadow-[0px_1px_1px_rgba(47,14,99,0.32)]"
      >
        Continue
      </button>
    </div>
  </div>
);

// Checkbox Component
const Checkbox = ({ checked, onChange, children }) => (
  <label className="flex items-start gap-3 cursor-pointer">
    <div className="mt-0.5">
      <div 
        onClick={() => onChange(!checked)}
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
  </label>
);

// Helper to get display name for use case
const getUseCaseDisplayName = (useCase) => {
  const names = {
    'corporate': 'Corporate expense management',
    'b2b': 'B2B payments',
    'ondemand': 'On-demand services',
    'fleet': 'Fleet',
    'insurance': 'Insurance',
    'bnpl': 'Buy now pay later',
  };
  return names[useCase] || useCase || 'Not selected';
};


// Step 4: Submit Review Content
const SubmitReviewContent = ({ 
  onSubmit, 
  selectedUseCase, 
  description,
  agreedTerms,
  setAgreedTerms,
}) => {
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
        <InfoCard title="Acme Inc." onEdit={() => {}}>
          <div className="text-sm text-[#596171] leading-5 space-y-0">
            <p>www.acme.com</p>
            <p>101 SW Water Ave</p>
            <p>Portland, OR 97211</p>
            <p>http://acme.inc</p>
            <p>(123)456-7890</p>
          </div>
          <div className="mt-4">
            <p className="font-semibold text-[16px] text-[#353a44]">Other information provided</p>
            <p className="text-sm text-[#596171]">EIN, DBA, Industry, number of employees, estimated annual revenue, end of fiscal year</p>
          </div>
        </InfoCard>
      </div>
      
      {/* Business Owners */}
      <div className="mb-6">
        <h3 className="font-semibold text-[16px] text-[#353a44] mb-2">Business owners</h3>
        <InfoCard title="Cedar Andrews (you)" onEdit={() => {}}>
          <div className="text-sm text-[#596171] leading-5 space-y-0">
            <p>Co-founder and CEO</p>
            <p>cedar@grotto.com</p>
            <p>354 Oyster Point Blvd, South San Francisco CA 94080</p>
          </div>
          <div className="mt-4">
            <p className="font-semibold text-[16px] text-[#353a44]">Other information provided</p>
            <p className="text-sm text-[#596171]">EISSNIN, Job title, Phone</p>
          </div>
        </InfoCard>
      </div>

      {/* Program Details */}
      <div className="mb-6">
        <h3 className="font-semibold text-[16px] text-[#353a44] mb-2">Program details</h3>
        <div className="border border-[#d5dbe1] rounded-lg p-6">
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-[16px] text-[#353a44]">Card program</h4>
                <button className="text-[#6c7688] hover:text-[#474e5a] p-1">
                  <EditIcon />
                </button>
              </div>
              <p className="text-sm text-[#414552] leading-5">{getUseCaseDisplayName(selectedUseCase)}</p>
            </div>
            <div>
              <h4 className="font-semibold text-[16px] text-[#353a44]">Program description</h4>
              <p className="text-sm text-[#414552] leading-5">{description || 'Description'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="mb-8">
        <h3 className="font-semibold text-[16px] text-[#353a44] mb-2">Pricing</h3>
        <div className="border border-[#d5dbe1] rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-[16px] text-[#353a44]">—</p>
              <p className="text-sm text-[#414552] leading-5">—</p>
            </div>
            <button className="text-[#6c7688] hover:text-[#474e5a] p-1">
              <EditIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Agreement */}
      <div className="mb-8">
        <Checkbox checked={agreedTerms} onChange={setAgreedTerms}>
          I agree to the <a href="#" className="text-[#533afd] hover:underline">E-sign policy</a> and <a href="#" className="text-[#533afd] hover:underline">Celtic Bank's privacy policy</a>
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
    <h1 className="text-[28px] font-bold text-[#353a44] leading-[36px] mb-2">
      Reviewing your details...
    </h1>
    <p className="text-[16px] text-[#596171] leading-[24px]">
      We're checking your submission. This usually takes less than a minute.
    </p>
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

// Step 5: Success Screen - "You're ready to start building"
const SuccessContent = ({ onStartIntegrating, onViewDocs }) => (
  <div className="w-full max-w-[580px] px-4">
    {/* Illustration Placeholder */}
    <div className="bg-[#f5f6f8] border border-[#d5dbe1] rounded-xl h-[212px] mb-8" />
    
    {/* Header */}
    <div className="mb-8">
      <h1 className="text-[28px] font-bold text-[#353a44] leading-[36px] mb-2">
        You're ready to start building
      </h1>
      <p className="text-[16px] text-[#596171] leading-[24px]">
        Here's what you get:
      </p>
    </div>

    {/* Features Section */}
    <div className="mb-8">
      <div className="space-y-6">
        <FeatureHighlight icon={BalanceIcon} title="Financial accounts">
          The cards you create pull from your financial account balance. Add funds to your balance and spend easily.
        </FeatureHighlight>
        
        <FeatureHighlight icon={ApiIcon} title="Stripe Issuing APIs">
          Create and manage cards programatically. Start integrating with the quickstart guide or view the Issuing API docs.
        </FeatureHighlight>
      </div>
    </div>
    
    {/* Buttons */}
    <div className="flex flex-col gap-4">
      <button 
        onClick={onStartIntegrating}
        className="w-full py-3 bg-[#675dff] hover:bg-[#5650e0] text-white font-semibold text-base rounded-md transition-colors shadow-[0px_1px_1px_rgba(47,14,99,0.32)]"
      >
        Start integrating
      </button>
      <button 
        onClick={onViewDocs}
        className="w-full py-3 bg-white hover:bg-gray-50 text-[#353a44] font-semibold text-base rounded-md border border-[#d8dee4] transition-colors shadow-[0px_1px_1px_rgba(33,37,44,0.16)]"
      >
        View Issuing docs
      </button>
    </div>
  </div>
);

// Declined Content (Step 7 for declined path)
const DeclinedContent = ({ onClose }) => (
  <div className="w-full max-w-[580px] px-4 flex flex-col items-center text-center">
    {/* Warning Icon */}
    <div className="w-16 h-16 rounded-full bg-[#fef3cd] flex items-center justify-center mb-6">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 10V18M16 22V22.01" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3.77 22.91L13.88 5.17C14.05 4.88 14.29 4.64 14.58 4.48C14.87 4.32 15.19 4.23 15.52 4.23C15.85 4.23 16.17 4.32 16.46 4.48C16.75 4.64 16.99 4.88 17.16 5.17L27.27 22.91C27.44 23.2 27.53 23.53 27.53 23.87C27.53 24.21 27.44 24.54 27.27 24.83C27.1 25.12 26.86 25.36 26.57 25.52C26.28 25.68 25.95 25.77 25.62 25.77H5.42C5.09 25.77 4.76 25.68 4.47 25.52C4.18 25.36 3.94 25.12 3.77 24.83C3.6 24.54 3.51 24.21 3.51 23.87C3.51 23.53 3.6 23.2 3.77 22.91Z" stroke="#B45309" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
    
    {/* Page Header */}
    <div className="mb-6">
      <h1 className="text-[28px] font-bold text-[#353a44] leading-[36px] mb-2">
        We can't approve your application right now
      </h1>
      <p className="text-[16px] text-[#596171] leading-[24px]">
        Based on the information provided, we're unable to approve your Issuing application at this time. This decision was made based on our review of your business information and compliance requirements.
      </p>
    </div>
    
    {/* Info Box */}
    <div className="w-full bg-[#f5f6f8] rounded-lg p-6 mb-6 text-left">
      <h3 className="font-semibold text-[16px] text-[#353a44] mb-2">What happens next?</h3>
      <ul className="space-y-2 text-[14px] text-[#596171]">
        <li className="flex items-start gap-2">
          <span className="text-[#596171] mt-1">•</span>
          <span>You'll receive an email with more details about this decision within 1-2 business days.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[#596171] mt-1">•</span>
          <span>If you believe this decision was made in error, you can contact our support team.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[#596171] mt-1">•</span>
          <span>You may reapply after 90 days with updated business information.</span>
        </li>
      </ul>
    </div>
    
    {/* Buttons */}
    <div className="flex flex-col gap-4 w-full">
      <button 
        onClick={onClose}
        className="w-full py-3 bg-[#675dff] hover:bg-[#5650e0] text-white font-semibold text-base rounded-md transition-colors shadow-[0px_1px_1px_rgba(47,14,99,0.32)]"
      >
        Return to dashboard
      </button>
      <a 
        href="#"
        className="w-full py-3 text-[#533afd] font-semibold text-base hover:underline text-center"
      >
        Contact support
      </a>
    </div>
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

// Main Modal Component
const SetupIssuingModal = ({ isOpen, onClose, onComplete, onStartIntegrating, onViewDocs, initialStep = 0, onboardingPath = 'happy' }) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [selectedSetupType, setSelectedSetupType] = useState(null);
  const [selectedUseCase, setSelectedUseCase] = useState(null);
  const [selectedCardHolder, setSelectedCardHolder] = useState(null);
  const [description, setDescription] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(false);
  
  // Declined path has fewer steps (no "Describe card holders" step)
  const hasCardHoldersStep = onboardingPath !== 'declined';
  const maxStep = hasCardHoldersStep ? 7 : 6;
  const processingStep = hasCardHoldersStep ? 6 : 5;
  const finalStep = hasCardHoldersStep ? 7 : 6;
  
  // Reset to initial step when modal opens with a new initialStep
  React.useEffect(() => {
    if (isOpen) {
      setCurrentStep(initialStep);
    }
  }, [isOpen, initialStep]);

  // Auto-transition from processing to success/declined after 5 seconds
  useEffect(() => {
    if (currentStep === processingStep) {
      const timer = setTimeout(() => {
        setCurrentStep(finalStep);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, processingStep, finalStep]);

  if (!isOpen) return null;

  // Step flow:
  // Happy/KYC paths (8 steps):
  //   0: Choose setup type
  //   1: Review your information (happy) OR Provide more information (kyc)
  //   2: Describe use case
  //   3: Describe card holders
  //   4: Review pricing
  //   5: Review and submit
  //   6: Processing
  //   7: Success
  // Declined path (7 steps - no card holders):
  //   0: Choose setup type
  //   1: Provide more information
  //   2: Describe use case
  //   3: Review pricing
  //   4: Review and submit
  //   5: Processing
  //   6: Declined
  
  // Build steps array based on path
  const getSteps = () => {
    const step1Label = (onboardingPath === 'kyc' || onboardingPath === 'declined') 
      ? 'Provide more information' 
      : 'Review your information';
    
    if (hasCardHoldersStep) {
      return [
        { label: 'Choose setup type', status: currentStep === 0 ? 'active' : currentStep > 0 ? 'complete' : 'pending' },
        { label: step1Label, status: currentStep === 1 ? 'active' : currentStep > 1 ? 'complete' : 'pending' },
        { label: 'Describe use case', status: currentStep === 2 ? 'active' : currentStep > 2 ? 'complete' : 'pending' },
        { label: 'Choose cardholders', status: currentStep === 3 ? 'active' : currentStep > 3 ? 'complete' : 'pending' },
        { label: 'Review pricing', status: currentStep === 4 ? 'active' : currentStep > 4 ? 'complete' : 'pending' },
        { label: 'Review and submit', status: currentStep === 5 ? 'active' : currentStep > 5 ? 'complete' : 'pending' },
      ];
    } else {
      return [
        { label: 'Choose setup type', status: currentStep === 0 ? 'active' : currentStep > 0 ? 'complete' : 'pending' },
        { label: step1Label, status: currentStep === 1 ? 'active' : currentStep > 1 ? 'complete' : 'pending' },
        { label: 'Describe use case', status: currentStep === 2 ? 'active' : currentStep > 2 ? 'complete' : 'pending' },
        { label: 'Review pricing', status: currentStep === 3 ? 'active' : currentStep > 3 ? 'complete' : 'pending' },
        { label: 'Review and submit', status: currentStep === 4 ? 'active' : currentStep > 4 ? 'complete' : 'pending' },
      ];
    }
  };
  
  const steps = getSteps();

  const handleContinue = () => {
    if (currentStep < maxStep) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStartIntegratingClick = () => {
    if (onStartIntegrating) {
      onStartIntegrating();
    }
  };

  // Processing and final screens
  const isProcessingScreen = currentStep === processingStep;
  const isFinalScreen = currentStep === finalStep;
  const isSuccessScreen = isFinalScreen && onboardingPath !== 'declined';
  const isDeclinedScreen = isFinalScreen && onboardingPath === 'declined';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[rgba(182,192,205,0.7)]"
        onClick={onClose}
      />
      
      {/* Dialog - With padding around edges */}
      <div className="relative bg-white rounded-lg shadow-[0px_15px_35px_rgba(48,49,61,0.08),0px_5px_15px_rgba(0,0,0,0.12)] w-full h-full max-h-[calc(100vh-32px)] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 shrink-0">
          <h2 className="font-bold text-[16px] text-[#353a44] tracking-[-0.31px]">Set up Issuing</h2>
          {isFinalScreen ? (
            <button 
              onClick={onComplete || onClose}
              className="px-3 py-1.5 text-sm text-[#353a44] border border-[#d8dee4] rounded-md hover:bg-gray-50 transition-colors"
            >
              Exit
            </button>
          ) : isProcessingScreen ? (
            <div /> 
          ) : (
            <div className="flex gap-2">
              <button 
                className="px-3 py-1.5 text-sm text-[#353a44] border border-[#d8dee4] rounded-md hover:bg-gray-50 transition-colors"
              >
                Need help?
              </button>
              <button 
                onClick={onClose}
                className="px-3 py-1.5 text-sm text-[#353a44] border border-[#d8dee4] rounded-md hover:bg-gray-50 transition-colors"
              >
                Save and exit
              </button>
            </div>
          )}
        </div>
        
        {/* Content - Three column layout with centered main content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar - Task List (hidden on processing and final screens) */}
          <div className="w-[278px] pt-6 px-8 shrink-0">
            {!isProcessingScreen && !isFinalScreen && (
              <div className="space-y-0">
                {steps.map((step, index) => (
                  <TaskListItem
                    key={step.label}
                    label={step.label}
                    status={step.status}
                    isLast={index === steps.length - 1}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Main Content - Centered */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="flex justify-center py-6 min-h-full">
              {currentStep === 0 && (
                <ChooseSetupTypeContent
                  onContinue={handleContinue}
                  selectedSetupType={selectedSetupType}
                  setSelectedSetupType={setSelectedSetupType}
                />
              )}
              {/* Step 1: Review info (happy) or Provide more info (kyc/declined) */}
              {currentStep === 1 && onboardingPath === 'happy' && (
                <ReviewInfoContent onContinue={handleContinue} />
              )}
              {currentStep === 1 && (onboardingPath === 'kyc' || onboardingPath === 'declined') && (
                <OwnerInfoContent onContinue={handleContinue} />
              )}
              {currentStep === 2 && (
                <UseCaseContent 
                  onContinue={handleContinue}
                  selectedUseCase={selectedUseCase}
                  setSelectedUseCase={setSelectedUseCase}
                  description={description}
                  setDescription={setDescription}
                />
              )}
              
              {/* Path-dependent steps after Use Case */}
              {hasCardHoldersStep ? (
                <>
                  {/* Happy/KYC path: includes Describe card holders step */}
                  {currentStep === 3 && (
                    <CardHoldersContent 
                      onContinue={handleContinue}
                      selectedCardHolder={selectedCardHolder}
                      setSelectedCardHolder={setSelectedCardHolder}
                    />
                  )}
                  {currentStep === 4 && (
                    <PricingContent onContinue={handleContinue} />
                  )}
                  {currentStep === 5 && (
                    <SubmitReviewContent
                      onSubmit={handleContinue}
                      selectedUseCase={selectedUseCase}
                      description={description}
                      agreedTerms={agreedTerms}
                      setAgreedTerms={setAgreedTerms}
                    />
                  )}
                  {currentStep === 6 && (
                    <ProcessingContent />
                  )}
                  {currentStep === 7 && (
                    <SuccessContent 
                      onStartIntegrating={handleStartIntegratingClick} 
                      onViewDocs={onViewDocs || onComplete || onClose} 
                    />
                  )}
                </>
              ) : (
                <>
                  {/* Declined path: no card holders step */}
                  {currentStep === 3 && (
                    <PricingContent onContinue={handleContinue} />
                  )}
                  {currentStep === 4 && (
                    <SubmitReviewContent
                      onSubmit={handleContinue}
                      selectedUseCase={selectedUseCase}
                      description={description}
                      agreedTerms={agreedTerms}
                      setAgreedTerms={setAgreedTerms}
                    />
                  )}
                  {currentStep === 5 && (
                    <ProcessingContent />
                  )}
                  {currentStep === 6 && (
                    <DeclinedContent onClose={onClose} />
                  )}
                </>
              )}
            </div>
          </div>
          
          {/* Right Sidebar - Contextual content */}
          <div className="w-[310px] min-w-[310px] pt-6 pr-8 shrink-0">
            {currentStep === 0 && <CustomSetupCallout />}
            {currentStep === 2 && <UseCaseCallout />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupIssuingModal;

