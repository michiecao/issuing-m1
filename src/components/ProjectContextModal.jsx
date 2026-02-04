import React from 'react';

// Close Icon
const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// Section Component - always visible, scrollable
const Section = ({ title, children }) => (
  <div className="pb-8 last:pb-0">
    <h3 className="font-semibold text-[22px] text-[#353a44] mb-4">{title}</h3>
    <div className="text-[14px] text-[#596171] leading-relaxed">
      {children}
    </div>
  </div>
);

// Content Components
const ContentBlock = ({ children, className = '' }) => (
  <div className={`text-[16px] text-[#353a44] leading-relaxed ${className}`}>
    {children}
  </div>
);

const ContentHeading = ({ children }) => (
  <h4 className="font-semibold text-[18px] text-[#353a44] mb-2">{children}</h4>
);

const BulletList = ({ items }) => (
  <ul className="list-disc list-outside ml-4 space-y-1 text-[16px] text-[#353a44]">
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);

const NumberedList = ({ items }) => (
  <ol className="list-decimal list-outside ml-4 space-y-1 text-[16px] text-[#353a44]">
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ol>
);

// Main Modal Component
const ProjectContextModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[rgba(182,192,205,0.7)]"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="relative bg-white m-4 rounded-lg shadow-[0px_15px_35px_rgba(48,49,61,0.08),0px_5px_15px_rgba(0,0,0,0.12)] flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e3e8ee] shrink-0">
          <h2 className="font-bold text-[16px] text-[#353a44] tracking-[-0.31px]">Project context: Issuing M1</h2>
          <button 
            onClick={onClose}
            className="p-2 text-[#6c7688] hover:text-[#353a44] hover:bg-[#f5f6f8] rounded-md transition-colors"
          >
            <CloseIcon />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[750px] mx-auto py-8 px-8">
              
              {/* Goals */}
              <div id="target-user-goals" className="scroll-mt-8">
                <Section title="Goals">
                  <div className="space-y-5">
                    <div>
                      <ContentHeading>For user</ContentHeading>
                      <ContentBlock>
                        Enable <span className="font-semibold">early and growth stage startups</span> to self-serve onboard onto Issuing's <span className="font-semibold">US Commercial prepaid card program</span> and <span className="font-semibold">Stripe Issuing API</span> in minutes, easily configure their card program, and go-live ASAP.
                      </ContentBlock>
                      <ContentBlock className="mt-3 p-3 border border-[#e3e8ee] rounded-md">
                        Examples: <a href="https://imprint.co" target="_blank" rel="noopener noreferrer" className="text-[#675dff] hover:underline">Imprint</a>, <a href="https://rain.xyz" target="_blank" rel="noopener noreferrer" className="text-[#675dff] hover:underline">Rain.xyz</a>, Rho Financial
                      </ContentBlock>
                    </div>
                    <div>
                      <ContentHeading>For Stripe</ContentHeading>
                      <BulletList items={[
                        <><span className="font-semibold">Unlock long tail growth</span><br />Lower barrier to entry for segments that are either growth stage and/or startups, expanding our total addressable market to address the long tail and creating opportunity for Issuing to diversify its core target audience.</>,
                        <><span className="font-semibold">Create stickiness early on</span><br />As startups grow, Stripe grows with them. Stripe is seen as an early partner for these companies - ensuring we stay at the edge of innovation.</>
                      ]} />
                    </div>
                  </div>
                </Section>
              </div>

              <div className="border-t border-[#e3e8ee] my-8" />

              {/* Design Principles */}
              <div id="design-principles" className="scroll-mt-8">
                <Section title="Design Principles">
                  <div className="space-y-4">
                    <ContentBlock>
                      <span className="font-semibold">Issuing is the hub</span><br />
                      Maintain a dedicated space where businesses can view all their Issuing programs at a global level
                    </ContentBlock>
                    <ContentBlock>
                      <span className="font-semibold">Design for multi-FA and multi-product</span><br />
                      Support multiple Financial Accounts and multiple Issuing Programs from day one
                    </ContentBlock>
                    <ContentBlock>
                      <span className="font-semibold">Modular and scalable</span><br />
                      Enable future expansion (region, fiat/onchain) without major rearchitecture
                    </ContentBlock>
                  </div>
                </Section>
              </div>


              {/* Spacer at bottom for scroll */}
            <div className="h-16" />

          </div>
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-4 border-t border-[#e3e8ee] shrink-0 bg-[#f7f8f9]">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-[#353a44] bg-white border border-[#d8dee4] rounded-md hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectContextModal;
