import React, { useState } from 'react';

// Completed checkmark circle
const CompletedCircle = () => (
  <div className="w-6 h-6 rounded-full bg-[#635bff] flex items-center justify-center">
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

// Incomplete circle (outline only)
const IncompleteCircle = () => (
  <div className="w-6 h-6 rounded-full border-2 border-[#424866]" />
);

// Blueprint Step Item Component
const BlueprintStepItem = ({ type, title, actionLabel, onAction, completed = false }) => (
  <div className="bg-[#1a1f36] rounded-lg p-4 flex items-center justify-between">
    <div className="flex items-center gap-3">
      {completed ? <CompletedCircle /> : <IncompleteCircle />}
      <div>
        <p className="text-xs text-[#8792a2]">{type}</p>
        <p className="text-sm text-white">{title}</p>
      </div>
    </div>
    {actionLabel && (
      <button 
        onClick={onAction}
        className="px-3 py-1.5 bg-[#2d3348] hover:bg-[#3d4460] text-white text-xs font-medium rounded transition-colors"
      >
        {actionLabel}
      </button>
    )}
  </div>
);

// Blueprint API Request Item Component
const BlueprintApiItem = ({ method, endpoint, actionLabel = "Run", onAction, completed = false }) => (
  <div className="bg-[#1a1f36] rounded-lg p-4 flex items-center justify-between">
    <div className="flex items-center gap-3">
      {completed ? <CompletedCircle /> : <IncompleteCircle />}
      <div>
        <p className="text-xs text-[#8792a2]">API request</p>
        <p className="text-sm">
          <span className="text-[#68d391] font-mono">{method}</span>
          <span className="text-white font-mono ml-2">{endpoint}</span>
        </p>
      </div>
    </div>
    {actionLabel && (
      <button 
        onClick={onAction}
        className="px-3 py-1.5 bg-[#2d3348] hover:bg-[#3d4460] text-white text-xs font-medium rounded transition-colors"
      >
        {actionLabel}
      </button>
    )}
  </div>
);

// Blueprint Panel Component
const BlueprintPanel = ({ isOpen, onClose }) => {
  const [completedSteps, setCompletedSteps] = useState(0);
  const totalSteps = 8; // Total number of step items with circles
  
  const runAllSteps = () => {
    // Sequentially complete each step with delays
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setCompletedSteps(step);
      if (step >= totalSteps) {
        clearInterval(interval);
      }
    }, 300); // 300ms between each step completion
  };

  const allCompleted = completedSteps >= totalSteps;

  return (
  <div 
    className={`fixed inset-x-0 bottom-0 z-50 transition-transform duration-300 ease-out ${
      isOpen ? 'translate-y-0' : 'translate-y-full'
    }`}
    style={{ height: '75vh' }}
  >
    <div className="h-full bg-[#0a0d14] rounded-t-xl flex flex-col shadow-2xl">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#2d3348]">
        <div className="flex items-center gap-4 text-sm text-[#8792a2]">
          <span className="hover:text-white cursor-pointer">Overview</span>
          <span className="hover:text-white cursor-pointer">Webhooks</span>
          <span className="hover:text-white cursor-pointer">Events</span>
          <span className="hover:text-white cursor-pointer">Logs</span>
          <span className="hover:text-white cursor-pointer">Health</span>
          <span className="hover:text-white cursor-pointer">Inspector</span>
          <span className="text-white border-b-2 border-[#635bff] pb-[10px] -mb-[10px]">Blueprints</span>
          <span className="hover:text-white cursor-pointer">Shell</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 text-sm text-[#8792a2] hover:text-white">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1V4M7 10V13M1 7H4M10 7H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Send feedback
          </button>
          <button className="flex items-center gap-1.5 text-sm text-[#8792a2] hover:text-white">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 9L9 5M9 5H5M9 5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="1" y="1" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            Copy link
          </button>
          <button className="p-1 text-[#8792a2] hover:text-white">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>
          <button className="p-1 text-[#8792a2] hover:text-white">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="4" cy="8" r="1" fill="currentColor"/>
              <circle cx="8" cy="8" r="1" fill="currentColor"/>
              <circle cx="12" cy="8" r="1" fill="currentColor"/>
            </svg>
          </button>
          <button 
            onClick={onClose}
            className="p-1 text-[#8792a2] hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-[260px] border-r border-[#2d3348] p-4 shrink-0">
          <div className="flex items-center gap-1 text-xs text-[#8792a2] mb-4">
            <span>Blueprints</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M4 3L7 6L4 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          <h2 className="text-lg font-bold text-white mb-2">B2B Payments with Issuing</h2>
          <p className="text-sm text-[#8792a2] mb-6">
            Create virtual cards for your business to make purchases using your Financial account balance.
          </p>
          
          <div className="flex gap-2">
            <button 
              onClick={runAllSteps}
              className="px-4 py-2 bg-[#635bff] hover:bg-[#5651e5] text-white text-sm font-medium rounded flex items-center gap-2 transition-colors"
            >
              <span>Run</span>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 1L8 5L2 9V1Z" fill="currentColor"/>
              </svg>
            </button>
            <button className="px-4 py-2 bg-[#2d3348] hover:bg-[#3d4460] text-white text-sm font-medium rounded flex items-center gap-2 transition-colors">
              <span>Step through</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 2L6 6L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Main Panel */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tabs */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-[#2d3348]">
            <div className="flex items-center gap-4">
              <span className="text-white text-sm border-b-2 border-[#635bff] pb-[14px] -mb-[14px]">Preview</span>
              <span className="text-[#8792a2] text-sm hover:text-white cursor-pointer">Logs and events <span className="ml-1 px-1.5 py-0.5 bg-[#2d3348] rounded text-xs">0</span></span>
            </div>
            <button className="flex items-center gap-1.5 text-sm text-[#8792a2] hover:text-white">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              Show output pane
            </button>
          </div>

          {/* Steps Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-[800px] space-y-6">
              {/* Step 1 */}
              <div>
                <div className="flex items-start gap-2 mb-4">
                  <button className="text-[#8792a2] hover:text-white mt-1">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <span className="w-5 h-5 rounded-full bg-[#2d3348] text-white text-xs flex items-center justify-center shrink-0">1</span>
                  <div>
                    <h3 className="text-white font-semibold">Fund your Financial account balance</h3>
                    <p className="text-sm text-[#8792a2]">Add funds to your Financial account balance before creating cards.</p>
                  </div>
                </div>
                <div className="ml-10 space-y-2">
                  <BlueprintStepItem 
                    type="Dashboard" 
                    title="Add funds to Financial account balance" 
                    actionLabel="Add funds"
                    completed={completedSteps >= 1}
                    onAction={runAllSteps}
                  />
                  <div className="flex justify-center py-1">
                    <div className="w-px h-4 bg-[#2d3348]" />
                  </div>
                  <BlueprintStepItem 
                    type="Async handler" 
                    title="Wait for topup" 
                    actionLabel="Run"
                    completed={completedSteps >= 2}
                    onAction={runAllSteps}
                  />
                </div>
              </div>

              {/* Step 2 */}
              <div>
                <div className="flex items-start gap-2 mb-4">
                  <button className="text-[#8792a2] hover:text-white mt-1">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <span className="w-5 h-5 rounded-full bg-[#2d3348] text-white text-xs flex items-center justify-center shrink-0">2</span>
                  <div>
                    <h3 className="text-white font-semibold">Create a cardholder</h3>
                    <p className="text-sm text-[#8792a2]">Create a cardholder representing the company or business entity authorized to use card funding.</p>
                  </div>
                </div>
                <div className="ml-10 space-y-2">
                  <BlueprintApiItem 
                    method="POST" 
                    endpoint="/v1/issuing/cardholders"
                    completed={completedSteps >= 3}
                    onAction={runAllSteps}
                  />
                  <div className="flex justify-center py-1">
                    <div className="w-px h-4 bg-[#2d3348]" />
                  </div>
                  <BlueprintApiItem 
                    method="POST" 
                    endpoint="/v1/issuing/cardholders/{id}"
                    completed={completedSteps >= 4}
                    onAction={runAllSteps}
                  />
                </div>
              </div>

              {/* Step 3 */}
              <div>
                <div className="flex items-start gap-2 mb-4">
                  <button className="text-[#8792a2] hover:text-white mt-1">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <span className="w-5 h-5 rounded-full bg-[#2d3348] text-white text-xs flex items-center justify-center shrink-0">3</span>
                  <div>
                    <h3 className="text-white font-semibold">Create and activate a card</h3>
                    <p className="text-sm text-[#8792a2]">Create a virtual card and attach it to the cardholder, then activate it for use.</p>
                  </div>
                </div>
                <div className="ml-10 space-y-2">
                  <BlueprintApiItem 
                    method="POST" 
                    endpoint="/v1/issuing/cards"
                    completed={completedSteps >= 5}
                    onAction={runAllSteps}
                  />
                  <div className="flex justify-center py-1">
                    <div className="w-px h-4 bg-[#2d3348]" />
                  </div>
                  <BlueprintApiItem 
                    method="POST" 
                    endpoint="/v1/issuing/cards/{id}"
                    completed={completedSteps >= 6}
                    onAction={runAllSteps}
                  />
                </div>
              </div>

              {/* Step 4 */}
              <div>
                <div className="flex items-start gap-2 mb-4">
                  <button className="text-[#8792a2] hover:text-white mt-1">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <span className="w-5 h-5 rounded-full bg-[#2d3348] text-white text-xs flex items-center justify-center shrink-0">4</span>
                  <div>
                    <h3 className="text-white font-semibold">Use the card</h3>
                    <p className="text-sm text-[#8792a2]">Create a test authorization to simulate a card purchase at a merchant.</p>
                  </div>
                </div>
                <div className="ml-10 space-y-2">
                  <BlueprintApiItem 
                    method="POST" 
                    endpoint="/v1/testhelpers/issuing/authorizations"
                    completed={completedSteps >= 7}
                    onAction={runAllSteps}
                  />
                  <div className="flex justify-center py-1">
                    <div className="w-px h-4 bg-[#2d3348]" />
                  </div>
                  <BlueprintApiItem 
                    method="POST" 
                    endpoint="/v1/testhelpers/issuing/authorizations/{id}/capture"
                    completed={completedSteps >= 8}
                    onAction={runAllSteps}
                  />
                </div>
              </div>

              {/* Continue Button */}
              <div className="pt-4">
                <button 
                  disabled={!allCompleted}
                  onClick={allCompleted ? onClose : undefined}
                  className={`w-full py-3 font-medium rounded-md transition-colors ${
                    allCompleted 
                      ? 'bg-[#635bff] hover:bg-[#5651e5] text-white cursor-pointer' 
                      : 'bg-[#635bff]/50 text-white/70 cursor-not-allowed'
                  }`}
                >
                  Continue to dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-[#2d3348]">
        <div className="flex items-center gap-2 text-sm text-[#8792a2]">
          <span>Shell</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M4 3L7 6L4 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div className="w-2 h-4 bg-[#635bff] animate-pulse" />
        </div>
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#8792a2]">
            <path d="M4 12L8 8L12 12M4 4L8 8L12 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Developers Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0d1017] border-t border-[#2d3348]">
        <div className="flex items-center gap-2 text-sm text-[#8792a2]">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M4 4L1 7L4 10M10 4L13 7L10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Developers</span>
        </div>
        <div className="flex items-center gap-3 text-[#8792a2]">
          <button className="hover:text-white"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2V14M2 8H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></button>
          <button className="hover:text-white"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8H14M8 2L14 8L8 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
          <button className="hover:text-white"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/></svg></button>
          <button className="hover:text-white"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></button>
        </div>
      </div>
    </div>
  </div>
  );
};

// Quickstart Guide Full Page View (Docs-style)
const QuickstartGuideView = ({ onExit }) => {
  const [isBlueprintOpen, setIsBlueprintOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-hidden relative">
      {/* Docs Header */}
      <div className="bg-[#f8fafc] border-b border-[#e3e8ee] px-5 py-2 shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-[#635bff] font-bold text-lg">stripe</span>
            <span className="text-[#353a44] font-medium text-lg">DOCS</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#d8dee4] rounded-md text-sm text-[#818da0] w-[240px]">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 8L11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span>Search</span>
              <span className="ml-auto bg-[#f5f6f8] border border-[#ebeef1] rounded px-1 text-xs text-[#596171]">/</span>
            </div>
            <button className="px-3 py-1.5 bg-white border border-[#d8dee4] rounded-md text-sm font-semibold text-[#353a44] shadow-[0px_1px_1px_rgba(33,37,44,0.16)] flex items-center gap-1.5">
              <span>Ask AI</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1L7.5 4.5L11 6L7.5 7.5L6 11L4.5 7.5L1 6L4.5 4.5L6 1Z" stroke="#474e5a" strokeWidth="1.2" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="flex items-center gap-2 ml-4">
              <span className="text-sm font-semibold text-[#353a44]">Cactus Practice</span>
              <div className="w-6 h-6 rounded bg-gradient-to-br from-[#675dff] via-[#a855f7] to-[#ec4899]" />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5 text-sm font-medium text-[#596171]">
            <span className="cursor-pointer hover:text-[#353a44]">Get started</span>
            <span className="cursor-pointer hover:text-[#353a44]">Payments</span>
            <span className="cursor-pointer hover:text-[#353a44]">Revenue</span>
            <span className="cursor-pointer hover:text-[#353a44]">Platform and marketplaces</span>
            <span className="text-[#533afd] border-b-2 border-[#635bff] pb-[10px] -mb-[10px]">Money management</span>
            <span className="cursor-pointer hover:text-[#353a44]">Developer tools</span>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium text-[#596171]">
            <span className="cursor-pointer hover:text-[#353a44]">APIs and SDKs</span>
            <span className="cursor-pointer hover:text-[#353a44]">Help</span>
          </div>
        </div>
      </div>
      
      {/* Docs Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Toggle */}
        <div className="w-12 border-r border-[#d8dee4] flex items-start justify-center py-6 shrink-0">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4L10 8L6 12" stroke="#6c7688" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 px-6 py-5 overflow-y-auto">
          <div className="w-full">
            {/* Page Header */}
            <div className="mb-1">
              <h1 className="text-[28px] font-bold text-[#353a44] leading-[36px] tracking-[0.38px] mb-0.5">
                Issuing quickstart guide
              </h1>
              <p className="text-[16px] text-[#353a44] leading-6">Description</p>
            </div>
            
            {/* Action Bar */}
            <div className="flex items-center justify-between py-2 border-b border-[#f5f6f8] mb-5">
              <div className="flex items-center gap-3 text-xs font-semibold text-[#596171]">
                <button className="flex items-center gap-1.5 hover:text-[#353a44]">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1L7.5 4.5L11 6L7.5 7.5L6 11L4.5 7.5L1 6L4.5 4.5L6 1Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
                  </svg>
                  <span>Ask about this page</span>
                </button>
                <span className="text-[#d8dee4]">|</span>
                <button className="flex items-center gap-1.5 hover:text-[#353a44]">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <rect x="2" y="2" width="6" height="8" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                    <rect x="4" y="4" width="6" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" fill="white"/>
                  </svg>
                  <span>Copy for LLM</span>
                </button>
                <span className="text-[#d8dee4]">|</span>
                <button className="flex items-center gap-1.5 hover:text-[#353a44]">
                  <svg width="16" height="10" viewBox="0 0 16 10" fill="none" className="opacity-60">
                    <rect x="1" y="1" width="14" height="8" rx="1" stroke="currentColor" strokeWidth="1"/>
                    <path d="M4 3H12M4 5H10M4 7H8" stroke="currentColor" strokeWidth="0.8"/>
                  </svg>
                  <span>View as Markdown</span>
                </button>
              </div>
              <button 
                onClick={() => setIsBlueprintOpen(true)}
                className="px-2 py-1 bg-white border border-[#d8dee4] rounded-md text-xs font-semibold text-[#353a44] flex items-center gap-1 shadow-[0px_1px_1px_rgba(33,37,44,0.16)]"
              >
                <span>Open Blueprint</span>
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M3 2L5 4L3 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            {/* Content */}
            <p className="text-sm text-[#3c4257] leading-5 mb-6">
              Before you can start spending with a card, you must create a cardholder, create a virtual card, and add funds to that card.
            </p>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-[16px] text-[#353a44] leading-6 mb-2">Create a card holder</h3>
                <div className="bg-[#f5f6f8] rounded-lg h-20" />
              </div>
              <div>
                <h3 className="font-bold text-[16px] text-[#353a44] leading-6 mb-2">Create a virtual card</h3>
                <div className="bg-[#f5f6f8] rounded-lg h-20" />
              </div>
              <div>
                <h3 className="font-bold text-[16px] text-[#353a44] leading-6 mb-2">Add funds</h3>
                <div className="bg-[#f5f6f8] rounded-lg h-20" />
              </div>
              <div>
                <h3 className="font-bold text-[16px] text-[#353a44] leading-6 mb-2">Spend with card</h3>
                <div className="bg-[#f5f6f8] rounded-lg h-20" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blueprint Panel Overlay */}
      <BlueprintPanel isOpen={isBlueprintOpen} onClose={() => setIsBlueprintOpen(false)} />
    </div>
  );
};

export { BlueprintPanel };
export default QuickstartGuideView;
