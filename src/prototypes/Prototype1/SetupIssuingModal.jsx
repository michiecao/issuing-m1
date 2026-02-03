import React, { useState } from 'react';

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
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 5H17.5M2.5 10H17.5M2.5 15H17.5" stroke="#675dff" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M5 3V7M10 3V7M15 3V7M5 8V12M10 8V12M15 8V12M5 13V17M10 13V17M15 13V17" stroke="#675dff" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// API Icon
const ApiIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 5L3 10L7 15" stroke="#675dff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13 5L17 10L13 15" stroke="#675dff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
        <span className={`text-sm leading-5 tracking-[-0.15px] ${isComplete ? 'text-[#533afd] font-semibold' : isActive ? 'text-[#533afd] font-semibold' : 'text-[#596171]'}`}>
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

// Simple Option Component (title only, no description)
const SimpleOption = ({ title, selected, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-[14px] py-[10px] rounded-lg transition-colors ${
      selected 
        ? 'border-2 border-[#675dff] bg-white' 
        : 'border border-[#d8dee4] bg-white hover:border-[#a3acba]'
    }`}
  >
    <h4 className="font-semibold text-[16px] text-[#353a44] leading-6">{title}</h4>
  </button>
);

// Info Card Component
const InfoCard = ({ title, children, onEdit }) => (
  <div className="bg-[#f6f9fb] border border-[#d5dbe1] rounded-lg p-6">
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
          This helps Stripe determine if Issuing supports your use case or not.
        </p>
      </div>
      
      {/* Use Case Selection */}
      <div className="mb-8">
        <h3 className="font-semibold text-[16px] text-[#353a44] mb-3">Select the use case that best applies</h3>
        <div className="space-y-[9px]">
          <UseCaseOption
            title="Corporate expense management"
            description="Let employees, contractors, or agents to make purchases on your business' behalf."
            selected={selectedUseCase === 'corporate'}
            onClick={() => setSelectedUseCase('corporate')}
          />
          <UseCaseOption
            title="Ancillary services provider or agentic commerce"
            description="Buy goods and services from merchants on behalf of your customers."
            selected={selectedUseCase === 'ancillary'}
            onClick={() => setSelectedUseCase('ancillary')}
          />
          <UseCaseOption
            title="Reseller"
            description="Buy goods or services for inventory and resell them to your customers."
            selected={selectedUseCase === 'reseller'}
            onClick={() => setSelectedUseCase('reseller')}
          />
        </div>
        
        {/* More Options Toggle */}
        <button 
          onClick={() => setMoreOptionsExpanded(!moreOptionsExpanded)}
          className="flex items-center gap-1 mt-4 text-[#596171] hover:text-[#474e5a]"
        >
          <ChevronDownIcon className={`transition-transform duration-200 ${moreOptionsExpanded ? '' : '-rotate-90'}`} />
          <span className="font-semibold text-sm">More options</span>
        </button>
        
        {/* Expanded More Options */}
        {moreOptionsExpanded && (
          <div className="space-y-[9px] mt-[9px]">
            <UseCaseOption
              title="Contractor purchase card"
              description="Let contractors to purchase materials or services needed to deliver work for your business."
              selected={selectedUseCase === 'contractor'}
              onClick={() => setSelectedUseCase('contractor')}
            />
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
          </div>
        )}
      </div>
      
      {/* Description Textarea */}
      <div className="mb-8">
        <label className="block font-semibold text-[16px] text-[#353a44] mb-2">
          Describe how your business plans to use Issuing
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full h-[68px] px-3 py-2 border border-[#d8dee4] rounded-md text-sm text-[#353a44] placeholder-[#6c7688] resize-y focus:outline-none focus:border-[#675dff] focus:ring-1 focus:ring-[#675dff]"
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

// Step 3: Card Holder Content
const CardHolderContent = ({ onContinue, selectedCardHolder, setSelectedCardHolder }) => (
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
    
    {/* Card Holder Selection */}
    <div className="mb-8">
      <div className="space-y-[9px]">
        <UseCaseOption
          title="My business"
          description="Example: employees or agents of your business"
          selected={selectedCardHolder === 'my-business'}
          onClick={() => setSelectedCardHolder('my-business')}
        />
        <UseCaseOption
          title="Businesses of my platform"
          description="Example: LLC or S-corp entities using your platform"
          selected={selectedCardHolder === 'platform-businesses'}
          onClick={() => setSelectedCardHolder('platform-businesses')}
        />
        <UseCaseOption
          title="Consumers on my platform"
          description="Example: Individuals using your platform"
          selected={selectedCardHolder === 'platform-consumers'}
          onClick={() => setSelectedCardHolder('platform-consumers')}
        />
      </div>
    </div>
    
    {/* Continue Button */}
    <div className="flex justify-center">
      <button 
        onClick={onContinue}
        disabled={!selectedCardHolder}
        className={continueButtonClasses(!selectedCardHolder)}
      >
        Continue
      </button>
    </div>
  </div>
);

// Step 4: API Access Content
const ApiAccessContent = ({ onContinue, selectedApiAccess, setSelectedApiAccess }) => (
  <div className="w-full max-w-[580px] px-4">
    {/* Page Header */}
    <div className="mb-8">
      <h1 className="text-[28px] font-bold text-[#353a44] leading-[36px] mb-2">
        Do you want access to Stripe's Issuing API?
      </h1>
    </div>
    
    {/* API Access Selection */}
    <div className="mb-8">
      <div className="space-y-[9px]">
        <UseCaseOption
          title="Yes"
          description="Recommended if you are building a custom card program and want programmatic control and customization of the experience"
          selected={selectedApiAccess === 'yes'}
          onClick={() => setSelectedApiAccess('yes')}
        />
        <UseCaseOption
          title="No"
          description="Recommended if you to launch quickly with minimal integration time and leverage Stripe's pre-built experiences"
          selected={selectedApiAccess === 'no'}
          onClick={() => setSelectedApiAccess('no')}
        />
      </div>
    </div>
    
    {/* Continue Button */}
    <div className="flex justify-center">
      <button 
        onClick={onContinue}
        disabled={!selectedApiAccess}
        className={continueButtonClasses(!selectedApiAccess)}
      >
        Continue
      </button>
    </div>
  </div>
);

// Step 5: Region Content - Where will your cardholders primarily reside?
const RegionContent = ({ onContinue, selectedRegion, setSelectedRegion }) => (
  <div className="w-full max-w-[580px] px-4">
    {/* Page Header */}
    <div className="mb-8">
      <h1 className="text-[28px] font-bold text-[#353a44] leading-[36px] mb-2">
        Where will your cardholders primarily reside?
      </h1>
    </div>
    
    {/* Region Selection */}
    <div className="mb-8">
      <div className="space-y-[9px]">
        <SimpleOption
          title="United States"
          selected={selectedRegion === 'us'}
          onClick={() => setSelectedRegion('us')}
        />
        <SimpleOption
          title="EMEA"
          selected={selectedRegion === 'emea'}
          onClick={() => setSelectedRegion('emea')}
        />
        <SimpleOption
          title="Global / multiple regions"
          selected={selectedRegion === 'global'}
          onClick={() => setSelectedRegion('global')}
        />
      </div>
    </div>
    
    {/* Continue Button */}
    <div className="flex justify-center">
      <button 
        onClick={onContinue}
        disabled={!selectedRegion}
        className={continueButtonClasses(!selectedRegion)}
      >
        Continue
      </button>
    </div>
  </div>
);

// Review Card with divider support
const ReviewCard = ({ children }) => (
  <div className="bg-[#f6f9fb] border border-[#d5dbe1] rounded-lg p-6">
    <div className="flex flex-col gap-4">
      {children}
    </div>
  </div>
);

// Review Card Row Component
const ReviewCardRow = ({ label, value, onEdit, showDivider = false }) => (
  <>
    {showDivider && <div className="bg-[#e3e8ee] h-px w-full" />}
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-[16px] text-[#353a44]">{label}</h4>
        {onEdit && (
          <button onClick={onEdit} className="text-[#6c7688] hover:text-[#474e5a] p-1">
            <EditIcon />
          </button>
        )}
      </div>
      <p className="text-sm text-[#414552] leading-5">{value}</p>
    </div>
  </>
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
    'ancillary': 'Ancillary services provider or agentic commerce',
    'reseller': 'Reseller',
    'contractor': 'Contractor purchase card',
    'fleet': 'Fleet',
    'insurance': 'Insurance',
  };
  return names[useCase] || useCase || 'Not selected';
};

// Helper to get display name for cardholder
const getCardholderDisplayName = (cardholder) => {
  const names = {
    'my-business': 'My business',
    'platform-businesses': 'Businesses of my platform',
    'platform-consumers': 'Consumers on my platform',
  };
  return names[cardholder] || cardholder || 'Not selected';
};

// Helper to get display name for region
const getRegionDisplayName = (region) => {
  const names = {
    'us': 'United States',
    'emea': 'EMEA',
    'global': 'Global / multiple regions',
  };
  return names[region] || region || 'Not selected';
};

// Step 6: Submit Review Content
const SubmitReviewContent = ({ 
  onSubmit, 
  selectedUseCase, 
  selectedCardHolder, 
  selectedApiAccess, 
  selectedRegion,
  description,
  agreedEsign,
  setAgreedEsign,
  agreedPrivacy,
  setAgreedPrivacy,
}) => {
  const canSubmit = agreedEsign && agreedPrivacy;

  return (
    <div className="w-full max-w-[580px] px-4">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-[28px] font-bold text-[#353a44] leading-[36px] mb-2">
          Review and submit
        </h1>
        <p className="text-[16px] text-[#596171] leading-[24px]">
          Please confirm your program details. Stripe will review this information to determine eligibility and next steps.
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
            <p className="text-sm text-[#414552]">Doing business as, EIN, website, product description</p>
          </div>
        </InfoCard>
      </div>
      
      {/* Business Representative */}
      <div className="mb-8">
        <h3 className="font-semibold text-[16px] text-[#353a44] mb-2">Business representative</h3>
        <InfoCard title="Cedar Andrews (you)" onEdit={() => {}}>
          <div className="text-sm text-[#414552] leading-5 space-y-0">
            <p>Co-founder and CEO</p>
            <p>cedar@grotto.com</p>
            <p>354 Oyster Point Blvd, South San Francisco CA 94080</p>
          </div>
          <div className="mt-4">
            <p className="font-semibold text-[16px] text-[#353a44]">Other information provided</p>
            <p className="text-sm text-[#414552]">Date of birth, phone number, full SSN</p>
          </div>
        </InfoCard>
      </div>

      {/* Card Program Details */}
      <div className="mb-8">
        <h3 className="font-semibold text-[16px] text-[#353a44] mb-2">Card program details</h3>
        <ReviewCard>
          <ReviewCardRow 
            label="Use case" 
            value={getUseCaseDisplayName(selectedUseCase)} 
            onEdit={() => {}} 
          />
          <ReviewCardRow 
            label="Description of use case" 
            value={description || 'Not provided'} 
            showDivider 
          />
          <ReviewCardRow 
            label="Cardholders" 
            value={getCardholderDisplayName(selectedCardHolder)} 
            onEdit={() => {}} 
            showDivider 
          />
          <ReviewCardRow 
            label="API access needed" 
            value={selectedApiAccess === 'yes' ? 'Yes' : selectedApiAccess === 'no' ? 'No' : 'Not selected'} 
            onEdit={() => {}} 
            showDivider 
          />
          <ReviewCardRow 
            label="Primary cardholder region" 
            value={getRegionDisplayName(selectedRegion)} 
            onEdit={() => {}} 
            showDivider 
          />
        </ReviewCard>
      </div>

      {/* Agreements */}
      <div className="mb-8 space-y-2">
        <Checkbox checked={agreedEsign} onChange={setAgreedEsign}>
          I agree to the <a href="#" className="text-[#533afd] hover:underline">E-sign policy</a>
        </Checkbox>
        <Checkbox checked={agreedPrivacy} onChange={setAgreedPrivacy}>
          I agree to Celtic Bank's <a href="#" className="text-[#533afd] hover:underline">privacy policy</a>
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

// Feature Highlight Component
const FeatureHighlight = ({ icon: Icon, title, children }) => (
  <div className="flex gap-4 items-start">
    <div className="shrink-0">
      <div className="bg-[#f7f5fd] rounded-lg p-4 flex items-center justify-center">
        <Icon />
      </div>
    </div>
    <div className="flex-1">
      <h4 className="font-bold text-[16px] text-[#596171] leading-6">{title}</h4>
      <p className="text-[16px] text-[#596171] leading-6">{children}</p>
    </div>
  </div>
);

// Step 7: Success Screen - "You're all set"
const SuccessContent = ({ onFinish }) => (
  <div className="w-full max-w-[580px] px-4">
    {/* Illustration Placeholder */}
    <div className="bg-[#f6f8fa] border border-[#d5dbe1] rounded-xl h-[180px] mb-12" />
    
    {/* Header */}
    <div className="mb-8">
      <h1 className="text-[28px] font-bold text-[#353a44] leading-[36px] mb-2">
        You're all set
      </h1>
      <p className="text-[16px] text-[#596171] leading-[24px]">
        Based on the details you provided, Stripe can support your program. No further setup required. You can start building now.
      </p>
    </div>

    {/* What's New Section */}
    <div className="mb-12">
      <p className="text-[16px] text-[#596171] leading-[24px] mb-6">
        Here's what's new:
      </p>
      
      <div className="space-y-6">
        <FeatureHighlight icon={BalanceIcon} title="Financial accounts">
          You can manage your money in more ways, including storing money on Stripe in multiple currencies, sending payouts, and spending from issued cards.
        </FeatureHighlight>
        
        <FeatureHighlight icon={ApiIcon} title="Stripe Issuing API">
          You can create and manage cards programmatically. View the{' '}
          <a href="#" className="text-[#533afd] hover:underline">quickstart</a>
          {' '}and{' '}
          <a href="#" className="text-[#533afd] hover:underline">integration</a>
          {' '}guides to get started.
        </FeatureHighlight>
      </div>
    </div>
    
    {/* Go to Issuing Button */}
    <div className="flex justify-center">
      <button 
        onClick={onFinish}
        className="w-full py-3 bg-[#533afd] hover:bg-[#4730d9] text-white font-medium text-sm rounded-md transition-colors"
      >
        Go to Issuing
      </button>
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
      Learn more about the various use cases Stripe Issuing can enable for your business.
    </p>
    <a href="#" className="text-[14px] font-semibold text-[#533afd] hover:underline">
      View doc
    </a>
  </div>
);

// Main Modal Component
const SetupIssuingModal = ({ isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSetupType, setSelectedSetupType] = useState(null);
  const [selectedUseCase, setSelectedUseCase] = useState(null);
  const [selectedCardHolder, setSelectedCardHolder] = useState(null);
  const [selectedApiAccess, setSelectedApiAccess] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [description, setDescription] = useState('');
  const [agreedEsign, setAgreedEsign] = useState(false);
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);

  if (!isOpen) return null;

  // Task list shows 5 items now with "Choose setup type" as first step
  // Step 0: Choose setup type
  // Step 1: Review your information
  // Steps 2-5: Describe use case (multiple sub-steps)
  // Step 6: Submit for review
  // Step 7: Success screen (task list hidden)
  const steps = [
    { label: 'Choose setup type', status: currentStep === 0 ? 'active' : currentStep > 0 ? 'complete' : 'pending' },
    { label: 'Review your information', status: currentStep === 1 ? 'active' : currentStep > 1 ? 'complete' : 'pending' },
    { label: 'Describe use case', status: (currentStep >= 2 && currentStep <= 5) ? 'active' : currentStep > 5 ? 'complete' : 'pending' },
    { label: 'Review pricing', status: 'pending' }, // Placeholder - not yet implemented
    { label: 'Review and submit', status: currentStep === 6 ? 'active' : currentStep > 6 ? 'complete' : 'pending' },
  ];

  const handleContinue = () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
    }
  };

  const isSuccessScreen = currentStep === 7;

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
          {!isSuccessScreen && (
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
          {/* Left Sidebar - Task List (hidden on success screen) */}
          <div className="w-[278px] pt-6 px-8 shrink-0">
            {!isSuccessScreen && (
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
              {currentStep === 1 && (
                <ReviewInfoContent onContinue={handleContinue} />
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
              {currentStep === 3 && (
                <CardHolderContent
                  onContinue={handleContinue}
                  selectedCardHolder={selectedCardHolder}
                  setSelectedCardHolder={setSelectedCardHolder}
                />
              )}
              {currentStep === 4 && (
                <ApiAccessContent
                  onContinue={handleContinue}
                  selectedApiAccess={selectedApiAccess}
                  setSelectedApiAccess={setSelectedApiAccess}
                />
              )}
              {currentStep === 5 && (
                <RegionContent
                  onContinue={handleContinue}
                  selectedRegion={selectedRegion}
                  setSelectedRegion={setSelectedRegion}
                />
              )}
              {currentStep === 6 && (
                <SubmitReviewContent
                  onSubmit={handleContinue}
                  selectedUseCase={selectedUseCase}
                  selectedCardHolder={selectedCardHolder}
                  selectedApiAccess={selectedApiAccess}
                  selectedRegion={selectedRegion}
                  description={description}
                  agreedEsign={agreedEsign}
                  setAgreedEsign={setAgreedEsign}
                  agreedPrivacy={agreedPrivacy}
                  setAgreedPrivacy={setAgreedPrivacy}
                />
              )}
              {currentStep === 7 && (
                <SuccessContent onFinish={onComplete || onClose} />
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

