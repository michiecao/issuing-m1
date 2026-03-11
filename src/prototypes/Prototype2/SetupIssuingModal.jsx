import React, { useState, useEffect } from 'react';
import { Button } from '../../components/sail/Button';
import starterIllustrationUrl from '../../assets/setup-starter-illustration.svg';
import growthIllustrationUrl from '../../assets/setup-growth-illustration.svg';

const ChevronDownIcon = ({ className }) => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M0.381282 4.38128C0.72299 4.03957 1.27701 4.03957 1.61872 4.38128L8 10.7626L14.3813 4.38128C14.723 4.03957 15.277 4.03957 15.6187 4.38128C15.9604 4.72299 15.9604 5.27701 15.6187 5.61872L8.61872 12.6187C8.27701 12.9604 7.72299 12.9604 7.38128 12.6187L0.381282 5.61872C0.0395728 5.27701 0.0395728 4.72299 0.381282 4.38128Z" fill="currentColor"/>
  </svg>
);

const SelectChevronIcon = ({ className }) => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <mask id="mask0_p2_select" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
      <path fillRule="evenodd" clipRule="evenodd" d="M2.34963 9.91465C2.67291 9.55546 3.22617 9.52634 3.58536 9.84962L7.99991 13.8228L12.4148 9.84961C12.774 9.52634 13.3272 9.55547 13.6505 9.91467C13.9738 10.2739 13.9446 10.8271 13.5854 11.1504L8.58522 15.6504C8.41884 15.8001 8.20937 15.875 7.99991 15.875C7.79041 15.875 7.58092 15.8001 7.41453 15.6504L2.41466 11.1504C2.05546 10.8271 2.02635 10.2738 2.34963 9.91465Z" fill="#474E5A"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M7.41453 0.349625C7.58092 0.199871 7.79041 0.124995 7.99991 0.125C8.20937 0.125005 8.41884 0.199873 8.58522 0.349605L13.5854 4.84961C13.9446 5.17287 13.9738 5.72613 13.6505 6.08533C13.3272 6.44453 12.774 6.47366 12.4148 6.15039L7.99991 2.17719L3.58536 6.15038C3.22617 6.47366 2.67291 6.44454 2.34963 6.08535C2.02635 5.72616 2.05546 5.17291 2.41466 4.84962L7.41453 0.349625Z" fill="#474E5A"/>
    </mask>
    <g mask="url(#mask0_p2_select)">
      <rect width="16" height="16" fill="currentColor"/>
    </g>
  </svg>
);

// Task List Item
const TaskListItem = ({ label, status, isLast, onClick }) => {
  const isActive = status === 'active';
  const isComplete = status === 'complete';
  const isClickable = isComplete && onClick;

  return (
    <div className="flex flex-col">
      <div
        className={`flex gap-2 items-start group ${isClickable ? 'cursor-pointer' : ''}`}
        onClick={isClickable ? onClick : undefined}
      >
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
        <span className={`text-sm leading-5 tracking-[-0.15px] ${isActive ? 'text-[#533afd]' : 'text-[#596171]'} ${isClickable ? 'group-hover:text-[#533afd]' : ''}`}>
          {label}
        </span>
      </div>
      {!isLast && (
        <div className="w-5 flex justify-center py-0.5">
          <div className="w-0 h-4 border-l border-dashed border-[#d8dee4]" />
        </div>
      )}
    </div>
  );
};

// Use Case Option
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

// Feature Item
const FeatureItem = ({ children }) => (
  <div className="flex gap-2 items-center">
    <span className="w-[4px] h-[4px] rounded-full bg-[#596171] shrink-0" />
    <span className="text-[14px] text-[#596171] leading-5">{children}</span>
  </div>
);

// Setup Type Card
const SetupTypeCard = ({ title, features, selected, onClick, illustrationSrc }) => (
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
        <h3 className="font-semibold text-[16px] text-[#353a44] leading-6">{title}</h3>
        <div className="flex flex-col gap-0.5 mt-1.5">
          {features.map((feature, index) => (
            <FeatureItem key={index}>{feature}</FeatureItem>
          ))}
        </div>
      </div>
    </div>
  </button>
);

const continueButtonClasses = (disabled) =>
  `w-full py-3 font-bold text-[16px] rounded-md transition-colors text-white ${
    disabled
      ? 'bg-[#533afd]/50 cursor-not-allowed'
      : 'bg-[#533afd] hover:bg-[#4730d9]'
  }`;

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

const getUseCaseDisplayName = (useCase) => {
  const names = {
    'corporate': 'Corporate expense management',
    'b2b': 'Reseller',
    'ondemand': 'Fulfillment',
  };
  return names[useCase] || useCase || 'Not selected';
};

const getIndustryDisplayName = (industry) => {
  const match = INDUSTRY_CATEGORIES.find(c => c.value === industry);
  return match ? match.label : industry || 'Not selected';
};

// Step 0: Cardholders
const CardHoldersContent = ({ onContinue, selectedCardHolder, setSelectedCardHolder }) => (
  <div className="w-full max-w-[580px] px-4">
    <div className="mb-8">
      <h1 className="text-[28px] font-bold text-[#353a44] leading-[36px] mb-2">
        Who's going to use the cards?
      </h1>
      <p className="text-[16px] text-[#596171] leading-[24px]">
        Cards can be issued to people, AI agents, or both.
      </p>
    </div>

    <div className="space-y-[9px] mb-8">
      {[
        { key: 'employees', title: 'Your employees or contractors', desc: 'People who work for your business' },
        { key: 'ai_agents', title: 'AI agents of your business', desc: 'Automated agents that operate on behalf of your business' },
        { key: 'both', title: 'Both people and agents', desc: 'Issue cards to employees and AI agents alike' },
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

    <button
      onClick={onContinue}
      disabled={!selectedCardHolder}
      className={continueButtonClasses(!selectedCardHolder)}
    >
      Continue
    </button>
  </div>
);

// Step 1: Use Case
const UseCaseContent = ({ onContinue, selectedUseCase, setSelectedUseCase, selectedIndustry, setSelectedIndustry, description, setDescription }) => {
  const needsIndustry = selectedUseCase === 'b2b' || selectedUseCase === 'ondemand';
  const canContinue = selectedUseCase && description.trim().length >= 100 && (!needsIndustry || selectedIndustry);

  return (
    <div className="w-full max-w-[580px] px-4">
      <div className="mb-8">
        <h1 className="text-[28px] font-bold text-[#353a44] leading-[36px] mb-2">
          Tell us about your use case
        </h1>
        <p className="text-[16px] text-[#596171] leading-[24px]">
          This helps us understand how you'll use Issuing.
        </p>
      </div>

      <div className="mb-8">
        <label className="block font-semibold text-[16px] text-[#353a44] mb-2">Select use case</label>
        <div className="space-y-[9px]">
          <UseCaseOption
            title="Corporate expense management"
            description="Buy goods or services for your business operations — including purchases made by AI agents."
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
            title="Fulfillment"
            description="Buy goods or services on your customers' behalf."
            selected={selectedUseCase === 'ondemand'}
            onClick={() => setSelectedUseCase('ondemand')}
          />
        </div>

        <div className={`overflow-hidden transition-all duration-300 ${needsIndustry ? 'max-h-[140px] opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'}`}>
          <label className="block font-semibold text-[16px] text-[#353a44] mb-1">Industry category</label>
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

      <div className="mb-8">
        <label className="block font-semibold text-[16px] text-[#353a44] mb-1">Describe your card program</label>
        <p className="text-[14px] text-[#596171] leading-5 mb-2">This requirement helps us review your use case.</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. We want to issue virtual cards to our AI agents so they can autonomously purchase cloud infrastructure and SaaS tools."
          className="w-full h-[88px] px-3 py-2 border border-[#d8dee4] rounded-md text-sm text-[#353a44] placeholder-[#6c7688] resize-y focus:outline-none focus:border-[#675dff] focus:ring-1 focus:ring-[#675dff]"
        />
        <div className="flex justify-between items-center mt-1">
          <span className="text-[13px] text-[#d8dee4] hover:text-[#a3acba] cursor-pointer transition-colors select-none" onClick={() => setDescription('We want to issue virtual debit cards to our AI agents and sales team. Agents will use the Stripe CLI to make purchases for cloud infrastructure and marketing tools, while employees will have monthly spend limits for client entertainment.')}>Prefill</span>
          <p className="text-[13px] text-[#6c7688]">{description.length}/100 character minimum</p>
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <button
          onClick={onContinue}
          disabled={!canContinue}
          className={continueButtonClasses(!canContinue)}
        >
          Continue
        </button>
      </div>

      <p className="text-[14px] text-[#596171] leading-[20px]">
        Don't see an option that fits your needs? Our team is here to help.{' '}
        <span className="text-[#533AFD] cursor-pointer hover:underline">Contact us</span>
      </p>
    </div>
  );
};

// Step 3: Choose Setup Type
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
        features={[
          'Scale quickly via the API and CLI',
          'Create cards via Dashboard, API, and agent tools',
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
        className={continueButtonClasses(!selectedSetupType)}
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

// Checkbox
const Checkbox = ({ checked, onChange, children }) => (
  <div className="flex items-start gap-3 cursor-pointer" onClick={(e) => { if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return; onChange(!checked); }}>
    <div className="mt-0.5">
      <div className={`w-[18px] h-[18px] rounded border flex items-center justify-center cursor-pointer transition-colors ${
        checked ? 'bg-[#533afd] border-[#533afd]' : 'bg-white border-[#c1c9d2]'
      }`}>
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

// Step 4: Review and Submit
const SubmitReviewContent = ({ onSubmit, selectedUseCase, selectedIndustry, description, agreedTerms, setAgreedTerms }) => {
  const canSubmit = agreedTerms;

  return (
    <div className="w-full max-w-[580px] px-4">
      <div className="mb-8">
        <h1 className="text-[28px] font-bold text-[#353a44] leading-[36px] mb-2">Review and submit</h1>
        <p className="text-[16px] text-[#596171] leading-[24px]">Confirm your details before submitting.</p>
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
              <a href="#" className="text-[14px] text-[#533afd] hover:underline inline-flex items-center gap-1">https://acme.inc</a>
            </div>
            <div>
              <p className="text-[12px] text-[#6c7688] leading-4">Other information provided</p>
              <p className="text-[14px] text-[#414552]">DBA, Product description, Industry</p>
            </div>
          </div>
        </div>
      </div>

      {/* Management */}
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
          I agree to the <a href="#" className="text-[#533afd] hover:underline">Issuing Terms of Service</a>, <a href="#" className="text-[#533afd] hover:underline">E-sign policy</a>, and <a href="#" className="text-[#533afd] hover:underline">Cross-River Bank's privacy policy</a>
        </Checkbox>
      </div>

      <button onClick={onSubmit} disabled={!canSubmit} className={continueButtonClasses(!canSubmit)}>
        Submit
      </button>
    </div>
  );
};

// Processing spinner
const Spinner = () => (
  <svg className="animate-spin" width="40" height="40" viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="17" stroke="#e3e8ee" strokeWidth="6"/>
    <path d="M20 3C10.611 3 3 10.611 3 20" stroke="#675dff" strokeWidth="6" strokeLinecap="round"/>
  </svg>
);

const ProcessingContent = () => (
  <div className="w-full max-w-[580px] px-4">
    <div className="mb-4"><Spinner /></div>
    <h1 className="text-[28px] font-bold text-[#353a44] leading-[36px]">One moment...</h1>
  </div>
);

// Icons for success screen
const ApiIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M19.5 3.75H4.5C3.25736 3.75 2.25 4.75736 2.25 6V18C2.25 19.2426 3.25736 20.25 4.5 20.25H19.5C20.7426 20.25 21.75 19.2426 21.75 18V6C21.75 4.75736 20.7426 3.75 19.5 3.75ZM4.5 1.5C2.01472 1.5 0 3.51472 0 6V18C0 20.4853 2.01472 22.5 4.5 22.5H19.5C21.9853 22.5 24 20.4853 24 18V6C24 3.51472 21.9853 1.5 19.5 1.5H4.5Z" fill="#675DFF"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M5.14584 6.76786C5.55019 6.29612 6.2604 6.24149 6.73214 6.64584L11.9821 11.1458C12.2315 11.3596 12.375 11.6716 12.375 12C12.375 12.3284 12.2315 12.6404 11.9821 12.8542L6.73214 17.3542C6.2604 17.7585 5.55019 17.7039 5.14584 17.2321C4.74149 16.7604 4.79612 16.0502 5.26786 15.6458L9.52134 12L5.26786 8.35416C4.79612 7.94981 4.74149 7.2396 5.14584 6.76786Z" fill="#675DFF"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 16.125C12 15.5037 12.5037 15 13.125 15H18.375C18.9963 15 19.5 15.5037 19.5 16.125C19.5 16.7463 18.9963 17.25 18.375 17.25H13.125C12.5037 17.25 12 16.7463 12 16.125Z" fill="#675DFF"/>
  </svg>
);

const BalanceIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.5 3C1.5 2.37868 2.00368 1.875 2.625 1.875H13.875C14.4963 1.875 15 2.37868 15 3C15 3.62132 14.4963 4.125 13.875 4.125H2.625C2.00368 4.125 1.5 3.62132 1.5 3Z" fill="#675DFF"/>
    <path d="M1.5 15C1.5 14.3787 2.00368 13.875 2.625 13.875H10.125C10.7463 13.875 11.25 14.3787 11.25 15C11.25 15.6213 10.7463 16.125 10.125 16.125H2.625C2.00368 16.125 1.5 15.6213 1.5 15Z" fill="#675DFF"/>
    <path d="M4.875 7.875C4.25368 7.875 3.75 8.37868 3.75 9C3.75 9.62132 4.25368 10.125 4.875 10.125H16.125C16.7463 10.125 17.25 9.62132 17.25 9C17.25 8.37868 16.7463 7.875 16.125 7.875H4.875Z" fill="#675DFF"/>
    <path d="M3.75 21C3.75 20.3787 4.25368 19.875 4.875 19.875H10.875C11.4963 19.875 12 20.3787 12 21C12 21.6213 11.4963 22.125 10.875 22.125H4.875C4.25368 22.125 3.75 21.6213 3.75 21Z" fill="#675DFF"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M24 17.25C24 20.1495 21.6495 22.5 18.75 22.5C15.8505 22.5 13.5 20.1495 13.5 17.25C13.5 14.3505 15.8505 12 18.75 12C21.6495 12 24 14.3505 24 17.25ZM21.75 17.25C21.75 18.9069 20.4069 20.25 18.75 20.25C17.0931 20.25 15.75 18.9069 15.75 17.25C15.75 15.5931 17.0931 14.25 18.75 14.25C20.4069 14.25 21.75 15.5931 21.75 17.25Z" fill="#675DFF"/>
  </svg>
);

const CliIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.5" y="3.75" width="21" height="16.5" rx="2.25" stroke="#675DFF" strokeWidth="2.25"/>
    <path d="M6.75 9L10.5 12L6.75 15" stroke="#675DFF" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12.75 15H17.25" stroke="#675DFF" strokeWidth="2.25" strokeLinecap="round"/>
  </svg>
);

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

// API Code Illustration
const ApiCodeIllustration = () => (
  <div className="w-full h-[220px] bg-[#e3e8ee] rounded-xl overflow-hidden relative">
    <div className="absolute left-1/2 -translate-x-1/2 top-6 w-[480px] bg-[#1a1f36] rounded-xl p-5 shadow-xl">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28ca42]" />
        <span className="ml-3 text-[11px] text-[#6b7280] font-mono">create-agent-card.js</span>
      </div>
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
          <span><span className="text-[#60a5fa]">    cardholder</span><span className="text-[#e2e8f0]">:</span> <span className="text-[#a5f3ab]">'ich_agent_01'</span><span className="text-[#e2e8f0]">,</span></span>
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

// Step 6: Success - updated for agents
const SuccessContent = ({ onStartIntegrating }) => (
  <div className="w-full max-w-[580px] px-4">
    <div className="mb-8">
      <ApiCodeIllustration />
    </div>

    <div className="mb-4">
      <h1 className="text-[28px] font-bold text-[#353a44] leading-[36px] mb-6">
        You're ready to start building
      </h1>
      <p className="text-[16px] text-[#596171] leading-[24px]">
        Your business can issue cards to people and AI agents. Here's what you get:
      </p>
    </div>

    <div className="mb-8">
      <div className="space-y-4">
        <FeatureHighlight icon={ApiIcon} title="Stripe Issuing APIs">
          Create and manage cards programmatically. Your agents can use the API to issue cards, set spending controls, and make purchases.
        </FeatureHighlight>

        <FeatureHighlight icon={CliIcon} title="Stripe CLI for agents">
          Agents can use the Stripe CLI to create cards, simulate test purchases, and manage card programs directly from their environment.
        </FeatureHighlight>

        <FeatureHighlight icon={BalanceIcon} title="Financial Accounts API">
          Hold and manage balances directly on Stripe. Fund your card program and move money programmatically — whether triggered by people or agents.
        </FeatureHighlight>
      </div>
    </div>

    <div className="flex flex-col gap-4">
      <button
        onClick={onStartIntegrating}
        className="w-full py-3 bg-[#675dff] hover:bg-[#5650e0] text-white font-bold text-[16px] rounded-md transition-colors shadow-[0px_1px_1px_rgba(47,14,99,0.32)]"
      >
        Start integrating
      </button>
    </div>
  </div>
);

// Right sidebar callouts
const UseCaseCallout = () => (
  <div className="w-[278px] bg-[#f5f6f8] rounded-lg p-4">
    <h4 className="font-bold text-[16px] text-[#3d3d3d] leading-6 mb-1">Supported use cases for Issuing</h4>
    <p className="text-[14px] text-[#596171] leading-5 mb-4">Learn about the use cases Issuing supports and how to set up your program.</p>
    <a href="#" className="text-[14px] font-semibold text-[#533afd] hover:underline">View documentation</a>
  </div>
);

const CustomSetupCallout = () => (
  <div className="w-[278px] bg-[#f5f6f8] rounded-lg p-4">
    <h4 className="font-bold text-[16px] text-[#3d3d3d] leading-6 tracking-[-0.31px] mb-1">Issuing pricing</h4>
    <p className="text-[14px] text-[#596171] leading-5 tracking-[-0.15px] mb-4">Learn more about Issuing pricing for the Growth plan, including per-card and transaction fees.</p>
    <a href="#" className="text-[14px] font-semibold text-[#533afd] hover:underline">View pricing</a>
  </div>
);

// Main Modal
const SetupIssuingModal = ({ isOpen, onClose, onComplete, onStartIntegrating }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSetupType, setSelectedSetupType] = useState(null);
  const [selectedUseCase, setSelectedUseCase] = useState(null);
  const [selectedCardHolder, setSelectedCardHolder] = useState(null);
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [description, setDescription] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setSelectedSetupType(null);
      setSelectedUseCase(null);
      setSelectedCardHolder(null);
      setSelectedIndustry('');
      setDescription('');
      setAgreedTerms(false);
    }
  }, [isOpen]);

  // Auto-transition from processing (step 5) to success (step 6)
  useEffect(() => {
    if (currentStep === 5) {
      const timer = setTimeout(() => setCurrentStep(6), 3000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  if (!isOpen) return null;

  const skipSetupType = selectedUseCase === 'b2b' || selectedUseCase === 'ondemand';
  const isProcessing = currentStep === 5;
  const isSuccess = currentStep === 6;
  const isFinal = isSuccess;

  const steps = [
    { label: 'Select cardholders', status: currentStep === 0 ? 'active' : currentStep > 0 ? 'complete' : 'pending', stepNumber: 0 },
    { label: 'Describe use case', status: currentStep === 1 ? 'active' : currentStep > 1 ? 'complete' : 'pending', stepNumber: 1 },
    ...(!skipSetupType ? [{ label: 'Choose setup type', status: currentStep === 3 ? 'active' : currentStep > 3 ? 'complete' : 'pending', stepNumber: 3 }] : []),
    { label: 'Review and submit', status: currentStep === 4 ? 'active' : currentStep > 4 ? 'complete' : 'pending', stepNumber: 4 },
  ];

  const handleContinue = () => {
    if (currentStep === 0) {
      setCurrentStep(1);
    } else if (currentStep === 1) {
      if (selectedUseCase === 'b2b' || selectedUseCase === 'ondemand') {
        setSelectedSetupType('growth');
        setCurrentStep(4);
      } else {
        setCurrentStep(3);
      }
    } else if (currentStep === 3) {
      setCurrentStep(4);
    } else if (currentStep === 4) {
      setCurrentStep(5);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-[rgba(182,192,205,0.7)]" onClick={onClose} />

        <div className="relative bg-white rounded-lg shadow-[0px_15px_35px_rgba(48,49,61,0.08),0px_5px_15px_rgba(0,0,0,0.12)] w-full h-full max-h-[calc(100vh-32px)] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 h-[56px] shrink-0">
            <h2 className="font-bold text-[16px] text-[#353a44] tracking-[-0.31px]">Set up Issuing</h2>
            {isFinal ? (
              <Button variant="secondary" size="md" onClick={onComplete || onClose}>Exit</Button>
            ) : isProcessing ? (
              <div />
            ) : (
              <div className="flex gap-2">
                <Button variant="secondary" size="md">Need help?</Button>
                <Button variant="secondary" size="md" onClick={onClose}>Save and exit</Button>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 flex overflow-hidden">
            {/* Left Sidebar */}
            <div className="w-[278px] pt-6 px-8 shrink-0">
              {!isProcessing && !isFinal && (
                <div className="space-y-0">
                  {steps.map((step, index) => (
                    <TaskListItem
                      key={step.label}
                      label={step.label}
                      status={step.status}
                      isLast={index === steps.length - 1}
                      onClick={step.status === 'complete' ? () => setCurrentStep(step.stepNumber) : undefined}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              <div className="flex justify-center py-6 min-h-full">
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
                    setSelectedUseCase={setSelectedUseCase}
                    selectedIndustry={selectedIndustry}
                    setSelectedIndustry={setSelectedIndustry}
                    description={description}
                    setDescription={setDescription}
                  />
                )}
                {currentStep === 3 && (
                  <ChooseSetupTypeContent
                    onContinue={handleContinue}
                    selectedSetupType={selectedSetupType}
                    setSelectedSetupType={setSelectedSetupType}
                  />
                )}
                {currentStep === 4 && (
                  <SubmitReviewContent
                    onSubmit={handleContinue}
                    selectedUseCase={selectedUseCase}
                    selectedIndustry={selectedIndustry}
                    description={description}
                    agreedTerms={agreedTerms}
                    setAgreedTerms={setAgreedTerms}
                  />
                )}
                {currentStep === 5 && <ProcessingContent />}
                {currentStep === 6 && (
                  <SuccessContent onStartIntegrating={onStartIntegrating} />
                )}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="w-[310px] min-w-[310px] pt-6 pr-8 shrink-0">
              {currentStep === 1 && <UseCaseCallout />}
              {currentStep === 3 && <CustomSetupCallout />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupIssuingModal;
