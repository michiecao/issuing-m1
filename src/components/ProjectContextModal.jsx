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
  <div className={`text-[14px] text-[#596171] leading-relaxed ${className}`}>
    {children}
  </div>
);

const ContentHeading = ({ children }) => (
  <h4 className="font-semibold text-[14px] text-[#353a44] mb-1">{children}</h4>
);

const BulletList = ({ items }) => (
  <ul className="list-disc list-outside ml-4 space-y-1 text-[14px] text-[#596171]">
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);

const NumberedList = ({ items }) => (
  <ol className="list-decimal list-outside ml-4 space-y-1 text-[14px] text-[#596171]">
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ol>
);

// Section definitions for navigation
const SECTIONS = [
  { id: 'target-user-goals', title: 'Goals' },
  { id: 'direct-vs-connect', title: 'Direct vs Connect' },
  { id: 'design-principles', title: 'High Level Design Principles' },
];

// Navigation Item
const NavItem = ({ title, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-3 py-2 text-[13px] rounded-md transition-colors ${
      active 
        ? 'bg-[#675dff]/10 text-[#675dff] font-medium' 
        : 'text-[#596171] hover:bg-[#f5f6f8] hover:text-[#353a44]'
    }`}
  >
    {title}
  </button>
);

// Main Modal Component
const ProjectContextModal = ({ isOpen, onClose }) => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
        
        {/* Content with sidebar navigation */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar - Navigation */}
          <div className="w-[220px] p-4 shrink-0 overflow-y-auto">
            <nav className="space-y-0.5">
              {SECTIONS.map((section) => (
                <NavItem
                  key={section.id}
                  title={section.title}
                  onClick={() => scrollToSection(section.id)}
                />
              ))}
            </nav>
          </div>

          {/* Main Content - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-2xl mx-auto py-8 px-8">
              
              {/* Goals */}
              <div id="target-user-goals" className="scroll-mt-8">
                <Section title="Goals">
                  <div className="space-y-5">
                    <div>
                      <ContentHeading>M1 Goal</ContentHeading>
                      <ContentBlock>
                        Enable startups to self-serve onboard onto Issuing's US Commercial prepaid card program in minutes, easily configure their card program, and go-live ASAP.
                      </ContentBlock>
                    </div>
                    <div>
                      <ContentHeading>Target User</ContentHeading>
                      <ContentBlock>Early / Growth Stage Startups</ContentBlock>
                      <ContentBlock className="mt-2 p-3 bg-[#f7f8f9] rounded-md text-[13px]">
                        Examples: <a href="https://imprint.co" target="_blank" rel="noopener noreferrer" className="text-[#675dff] hover:underline">Imprint</a>, <a href="https://rain.xyz" target="_blank" rel="noopener noreferrer" className="text-[#675dff] hover:underline">Rain.xyz</a>, Rho Financial — all onboarded onto Stripe self-serve.
                      </ContentBlock>
                    </div>
                    <div>
                      <ContentHeading>Business Impact</ContentHeading>
                      <BulletList items={[
                        <><strong>Unlock long tail growth:</strong> Lower barrier to entry for segments that are either growth stage and/or startups, expanding our total addressable market to address the long tail and creating opportunity for Issuing to diversify its core target audience.</>,
                        <><strong>Create stickiness early on:</strong> As startups grow, Stripe grows with them. Stripe is seen as an early partner for these companies - ensuring we stay at the edge of innovation.</>
                      ]} />
                    </div>
                  </div>
                </Section>
              </div>

              <div className="border-t border-[#e3e8ee] my-8" />

              {/* Direct vs Connect */}
              <div id="direct-vs-connect" className="scroll-mt-8">
                <Section title="Direct vs Connect">
                  <div className="space-y-4">
                    <div>
                      <ContentHeading>Issuing on Stripe Direct</ContentHeading>
                      <BulletList items={[
                        "Businesses create cards for their own, personal business"
                      ]} />
                    </div>
                    <div>
                      <ContentHeading>Issuing on Stripe Connect</ContentHeading>
                      <BulletList items={[
                        "Businesses create cards for the businesses on their platform"
                      ]} />
                    </div>
                    <ContentBlock className="p-3 bg-[#f7f8f9] rounded-md">
                      Within both cases, businesses are able to manage their program either within the Stripe dashboard or via API.
                    </ContentBlock>
                  </div>
                </Section>
              </div>

              <div className="border-t border-[#e3e8ee] my-8" />

              {/* High Level Design Principles */}
              <div id="design-principles" className="scroll-mt-8">
                <Section title="High Level Design Principles">
                  <NumberedList items={[
                    "Maintain a space for Issuing to be a standalone product, allowing businesses to view all their Issuing programs at a global level",
                    "Allow a design that supports a Multi-FA + multi-Issuing Program world",
                    "Modular experience allowing for future permutations (i.e. region, fiat/onchain)"
                  ]} />
                </Section>
              </div>


              {/* Spacer at bottom for scroll */}
              <div className="h-16" />

            </div>
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
