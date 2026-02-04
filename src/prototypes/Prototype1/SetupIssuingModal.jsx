import React, { useState, useEffect } from 'react';
import SandboxBanner from '../../components/SandboxBanner';

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
    <path fillRule="evenodd" clipRule="evenodd" d="M0.381282 4.38128C0.72299 4.03957 1.27701 4.03957 1.61872 4.38128L8 10.7626L14.3813 4.38128C14.723 4.03957 15.277 4.03957 15.6187 4.38128C15.9604 4.72299 15.9604 5.27701 15.6187 5.61872L8.61872 12.6187C8.27701 12.9604 7.72299 12.9604 7.38128 12.6187L0.381282 5.61872C0.0395728 5.27701 0.0395728 4.72299 0.381282 4.38128Z" fill="currentColor"/>
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
      <div className="w-[140px] min-h-[178px] self-stretch shrink-0">
        {illustration}
      </div>
      
      {/* Right side - Text content */}
      <div className="flex-1 flex flex-col">
        <h3 className="font-semibold text-[18px] text-[#353a44] leading-7 tracking-[-0.48px]">{title}</h3>
        <p className="text-[14px] text-[#596171] leading-5 mt-0.5 mb-3">{description}</p>
        
        {/* Feature list */}
        <div className="flex flex-col gap-1 min-h-[96px]">
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
const ChooseSetupTypeContent = ({ onContinue, onDashboardSetup, selectedSetupType, setSelectedSetupType }) => (
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
        title="Build with Stripe Issuing APIs"
        description="You write the code - Stripe handles the rest."
        features={[
          'Best for building a program at scale',
          'Access to Issuing APIs',
          'US Commercial Prepaid Mastercard',
          'Pay as you go',
        ]}
        illustration={<CodeEditorIllustration />}
        onContinue={() => {
          setSelectedSetupType('api');
          onContinue();
        }}
      />
      
      <SetupTypeCard
        title="Manage in dashboard"
        description="Create cards and manage your business in the Stripe dashboard."
        features={[
          'Best for personal use',
          'No access to Issuing APIs',
          'No code required',
          'Free',
        ]}
        illustration={<DashboardIllustration />}
        onContinue={() => {
          setSelectedSetupType('dashboard');
          onDashboardSetup();
        }}
      />
    </div>
    
    {/* Need more flexibility text */}
    <p className="mt-6 text-[14px] text-[#596171] leading-5">
      Need custom card programs, pricing, or integrations? <a href="#" className="text-[#533afd] hover:underline">Contact us</a>
    </p>
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
          <UseCaseOption
            title="Corporate expense management"
            description="Let employees or contractors make purchases on your business' behalf."
            selected={selectedUseCase === 'corporate'}
            onClick={() => setSelectedUseCase('corporate')}
          />
        </div>
        
        {/* Additional Use Cases Toggle */}
        <button 
          onClick={() => setMoreOptionsExpanded(!moreOptionsExpanded)}
          className="flex items-center gap-1 mt-4 text-[#596171] hover:text-[#474e5a]"
        >
          <ChevronDownIcon className={`w-3 h-3 transition-transform duration-200 ${moreOptionsExpanded ? '' : '-rotate-90'}`} />
          <span className="font-semibold text-sm">Additional use cases</span>
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
        <p className="text-[14px] text-[#596171] leading-5">Example: For yourself, employees or agents of your business</p>
      </button>
      <button
        onClick={() => setSelectedCardHolder('platforms')}
        className={`w-full text-left px-[14px] py-[10px] rounded-lg transition-colors ${
          selectedCardHolder === 'platforms' 
            ? 'border-2 border-[#675dff] bg-white' 
            : 'border border-[#d8dee4] bg-white hover:border-[#a3acba]'
        }`}
      >
        <h4 className="font-semibold text-[16px] text-[#353a44] leading-6">Businesses on my platform</h4>
        <p className="text-[14px] text-[#596171] leading-5">Example: For LLC or S-corp entities using your platform</p>
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
        <p className="text-[14px] text-[#596171] leading-5">Example: For individuals using your platform</p>
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
    <h1 className="text-[28px] font-bold text-[#353a44] leading-[36px]">
      One moment...
    </h1>
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

// Step 5: Success Screen - "You're ready to start building"
const SuccessContent = ({ onStartIntegrating, onViewDocs }) => (
  <div className="w-full max-w-[580px] px-4">
    {/* API Code Illustration */}
    <div className="mb-8">
      <ApiCodeIllustration />
    </div>
    
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
        <FeatureHighlight icon={ApiIcon} title="Stripe Issuing APIs">
          Create and manage cards programatically. Start integrating with the quickstart guide or view the Issuing API docs.
        </FeatureHighlight>
        
        <FeatureHighlight icon={BalanceIcon} title="Financial accounts">
          The cards you create pull from your financial account balance. Add funds to your balance and spend easily.
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
        <ChevronDownIcon className="w-4 h-4 text-[#474e5a]" />
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
            Thanks for your interest
          </h1>
          <p className="text-[16px] text-[#596171] leading-[24px] tracking-[-0.31px]">
            We'll be in touch soon to discuss your use case.
          </p>
        </div>
        <button 
          onClick={onClose}
          className="w-full py-3 bg-[#675dff] hover:bg-[#5650e0] text-white font-semibold text-base rounded-md transition-colors shadow-[0px_1px_1px_rgba(47,14,99,0.32)]"
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
          We'd like to learn more
        </h1>
        <p className="text-[16px] text-[#596171] leading-[24px] tracking-[-0.31px]">
          Based on your use case, we'll need a bit more information before we can get you started. Fill out this form and our team will reach out to discuss next steps.
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
        className="w-full py-3 bg-[#675dff] hover:bg-[#5650e0] text-white font-semibold text-base rounded-md transition-colors shadow-[0px_1px_1px_rgba(47,14,99,0.32)]"
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

// Dashboard Setup Success Content - "You're all set" view for Manage in dashboard path
const DashboardSetupSuccessContent = ({ onGoToBalances }) => (
  <div className="w-full max-w-[580px] px-4">
    {/* Success Illustration */}
    <div className="mb-6">
      <SuccessIllustration />
    </div>
    
    {/* Header */}
    <div className="mb-6">
      <h1 className="text-[28px] font-bold text-[#353a44] leading-[36px] tracking-[0.38px] mb-2">
        You're ready to create your first card
      </h1>
      <p className="text-[16px] text-[#596171] leading-[24px] tracking-[-0.31px]">
        You can start creating cards and tracking expenses in your redesigned Balances page.
      </p>
    </div>

    {/* What's New Section */}
    <div className="mb-6">
      <p className="text-[16px] text-[#596171] leading-[24px] tracking-[-0.31px] mb-4">Here's what's new:</p>
      
      <FeatureHighlight icon={BalanceIcon} title="Financial accounts">
        Your cards spend from your financial account balance. You can also store funds in multiple currencies and send payouts.
      </FeatureHighlight>
    </div>
    
    {/* Go to Balances Button */}
    <button 
      onClick={onGoToBalances}
      className="w-full py-3 bg-[#675dff] hover:bg-[#5650e0] text-white font-semibold text-base rounded-md transition-colors shadow-[0px_1px_1px_rgba(47,14,99,0.32)]"
    >
      Go to Balances
    </button>
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
  const specializedUseCases = ['fleet', 'insurance', 'bnpl'];
  return specializedUseCases.includes(useCase);
};

// Check if cardholder selection triggers decline
const isNonBusinessCardholder = (cardHolder) => {
  return cardHolder && cardHolder !== 'business';
};

// Main Modal Component
const SetupIssuingModal = ({ isOpen, onClose, onComplete, onStartIntegrating, onViewDocs, onGoToBalances, initialStep = 0, onboardingPath = 'happy', isSandboxMode = false, onExitSandbox }) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [selectedSetupType, setSelectedSetupType] = useState(null);
  const [selectedUseCase, setSelectedUseCase] = useState(null);
  const [selectedCardHolder, setSelectedCardHolder] = useState(null);
  const [description, setDescription] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [showDashboardSuccess, setShowDashboardSuccess] = useState(false);
  
  // Track if user has been declined (computed immediately when decline criteria is met)
  // null = not yet determined, true = declined, false = approved
  const [isDeclined, setIsDeclined] = useState(null);
  
  // For direct navigation to declined screen via external link (e.g., "Preview declined" button)
  const isDirectDeclinePath = onboardingPath === 'declined';
  
  // Step counts depend on whether user is declined
  // Declined flow: step 4 = processing, step 5 = declined screen
  // Normal flow: steps 0-7 (includes pricing, review, processing, success)
  const isDeclinedFlow = isDeclined === true || isDirectDeclinePath;
  const maxStep = isDeclinedFlow ? 5 : 7;
  const processingStep = isDeclinedFlow ? 4 : 6; // Processing step for both flows
  const finalStep = isDeclinedFlow ? 5 : 7;
  
  // Reset state when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setShowDashboardSuccess(false);
      
      // For direct decline path link, skip directly to the declined screen
      if (isDirectDeclinePath) {
        setIsDeclined(true);
        setCurrentStep(5); // Declined screen is step 5 in declined flow
      } else {
        setIsDeclined(null);
        setCurrentStep(initialStep);
      }
    }
  }, [isOpen, initialStep, isDirectDeclinePath]);

  // Auto-transition from processing to success/declined after 3 seconds
  useEffect(() => {
    if (currentStep === processingStep) {
      const timer = setTimeout(() => {
        setCurrentStep(finalStep);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, processingStep, finalStep]);

  if (!isOpen) return null;

  // Step flow with immediate decline feedback:
  //   0: Choose setup type
  //   1: Review your information (happy) OR Provide more information (kyc)
  //   2: Describe use case
  //      → If specialized use case (fleet, insurance, bnpl) selected → go to processing → declined
  //   3: Describe card holders
  //      → If non-business cardholder (platforms, consumers) selected → go to processing → declined
  //
  // Approved flow (after step 3):
  //   4: Review pricing
  //   5: Review and submit
  //   6: Processing
  //   7: Success
  //
  // Declined flow:
  //   4: Processing (5 seconds)
  //   5: Declined screen
  
  // Build steps array for sidebar
  const getSteps = () => {
    // Show full expected flow in sidebar
    // If user gets declined, they'll see processing/declined screens which hide the sidebar
    
    // For happy path, skip "Review your information" step
    if (onboardingPath === 'happy') {
      return [
        { label: 'Choose setup type', status: currentStep === 0 ? 'active' : currentStep > 0 ? 'complete' : 'pending' },
        { label: 'Describe use case', status: currentStep === 2 ? 'active' : currentStep > 2 ? 'complete' : 'pending' },
        { label: 'Choose cardholders', status: currentStep === 3 ? 'active' : currentStep > 3 ? 'complete' : 'pending' },
        { label: 'Review pricing', status: currentStep === 4 ? 'active' : currentStep > 4 ? 'complete' : 'pending' },
        { label: 'Review and submit', status: currentStep === 5 ? 'active' : currentStep > 5 ? 'complete' : 'pending' },
      ];
    }
    
    // For KYC path, include "Provide more information" step
    return [
      { label: 'Choose setup type', status: currentStep === 0 ? 'active' : currentStep > 0 ? 'complete' : 'pending' },
      { label: 'Provide more information', status: currentStep === 1 ? 'active' : currentStep > 1 ? 'complete' : 'pending' },
      { label: 'Describe use case', status: currentStep === 2 ? 'active' : currentStep > 2 ? 'complete' : 'pending' },
      { label: 'Choose cardholders', status: currentStep === 3 ? 'active' : currentStep > 3 ? 'complete' : 'pending' },
      { label: 'Review pricing', status: currentStep === 4 ? 'active' : currentStep > 4 ? 'complete' : 'pending' },
      { label: 'Review and submit', status: currentStep === 5 ? 'active' : currentStep > 5 ? 'complete' : 'pending' },
    ];
  };
  
  const steps = getSteps();

  const handleContinue = () => {
    // For happy path, skip from step 0 directly to step 2 (skip "Review your information")
    if (currentStep === 0 && onboardingPath === 'happy') {
      setCurrentStep(2);
      return;
    }
    
    // After step 2 (Use Case), check for specialized use case - decline with processing
    if (currentStep === 2) {
      if (isSpecializedUseCase(selectedUseCase)) {
        setIsDeclined(true);
        setCurrentStep(4); // Go to processing screen first
        return;
      }
    }
    
    // After step 3 (Cardholders), check for non-business cardholder - decline with processing
    if (currentStep === 3) {
      if (isNonBusinessCardholder(selectedCardHolder)) {
        setIsDeclined(true);
        setCurrentStep(4); // Go to processing screen first
        return;
      }
      // If we reach here, user is approved
      setIsDeclined(false);
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

  const handleDashboardSetup = () => {
    setShowDashboardSuccess(true);
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
  const isProcessingScreen = currentStep === processingStep && !showDashboardSuccess;
  const isFinalScreen = (currentStep === finalStep || showDashboardSuccess);
  const isSuccessScreen = (isFinalScreen && !isDeclinedFlow) || showDashboardSuccess;
  const isDeclinedScreen = isFinalScreen && isDeclinedFlow && !showDashboardSuccess;

  return (
    <div className="fixed inset-0 z-50 flex flex-col">
      {/* Sandbox Banner - shown when in sandbox mode */}
      {isSandboxMode && <SandboxBanner onExit={onExitSandbox} />}
      
      <div className={`flex-1 flex items-center justify-center p-4 ${isSandboxMode ? 'mt-[52px]' : ''}`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-[rgba(182,192,205,0.7)]"
          onClick={onClose}
          style={isSandboxMode ? { top: '52px' } : {}}
        />
        
        {/* Dialog - With padding around edges */}
        <div className="relative bg-white rounded-lg shadow-[0px_15px_35px_rgba(48,49,61,0.08),0px_5px_15px_rgba(0,0,0,0.12)] w-full h-full max-h-[calc(100vh-32px-52px)] flex flex-col overflow-hidden" style={!isSandboxMode ? { maxHeight: 'calc(100vh - 32px)' } : {}}>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 shrink-0">
          <h2 className="font-bold text-[16px] text-[#353a44] tracking-[-0.31px]">Set up Issuing</h2>
          {(isFinalScreen && !isDeclinedScreen) ? (
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
              {/* Dashboard Setup Success - shown when user selects "Manage in dashboard" */}
              {showDashboardSuccess && (
                <DashboardSetupSuccessContent onGoToBalances={handleGoToBalances} />
              )}
              
              {/* Regular flow - hidden when dashboard success is shown */}
              {!showDashboardSuccess && (
                <>
                  {currentStep === 0 && (
                    <ChooseSetupTypeContent
                      onContinue={handleContinue}
                      onDashboardSetup={handleDashboardSetup}
                      selectedSetupType={selectedSetupType}
                      setSelectedSetupType={setSelectedSetupType}
                    />
                  )}
                  {/* Step 1: Review info (happy) or Provide more info (kyc) */}
                  {currentStep === 1 && onboardingPath === 'happy' && (
                    <ReviewInfoContent onContinue={handleContinue} />
                  )}
                  {currentStep === 1 && onboardingPath === 'kyc' && (
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
                  
                  {/* Step 3: Cardholders (same for all paths) */}
                  {currentStep === 3 && (
                    <CardHoldersContent 
                      onContinue={handleContinue}
                      selectedCardHolder={selectedCardHolder}
                      setSelectedCardHolder={setSelectedCardHolder}
                    />
                  )}
                  
                  {/* Steps 4+ depend on whether user is declined */}
                  {isDeclinedFlow ? (
                    <>
                      {/* Declined flow: processing → declined */}
                      {currentStep === 4 && (
                        <ProcessingContent />
                      )}
                      {currentStep === 5 && (
                        <DeclinedContent onClose={onClose} />
                      )}
                    </>
                  ) : (
                    <>
                      {/* Normal flow: pricing → review → processing → success */}
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
                  )}
                </>
              )}
            </div>
          </div>
          
          {/* Right Sidebar - Contextual content */}
          <div className="w-[310px] min-w-[310px] pt-6 pr-8 shrink-0">
            {currentStep === 2 && !showDashboardSuccess && <UseCaseCallout />}
            {isDeclinedScreen && <DeclinedSidebarContent />}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default SetupIssuingModal;

