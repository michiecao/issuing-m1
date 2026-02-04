import React, { useState } from 'react';

// Completed checkmark circle
const CompletedCircle = () => (
  <div className="w-5 h-5 rounded-full bg-[#635bff] flex items-center justify-center shrink-0">
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

// Incomplete circle (outline only)
const IncompleteCircle = () => (
  <div className="w-5 h-5 rounded-full border border-[#3e444f] shrink-0" />
);

// Blueprint Step Item Component
const BlueprintStepItem = ({ type, title, actionLabel, onAction, completed = false }) => (
  <div className="bg-[#1b1e25] rounded-lg p-2">
    <div className="bg-[#14171d] rounded-md p-4 flex items-center justify-between shadow-[0px_2px_5px_rgba(48,49,61,0.08),0px_1px_1px_rgba(0,0,0,0.12)]">
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
          className="px-3 py-1.5 bg-[#14171d] hover:bg-[#1e2229] border border-[#3e444f] text-white text-xs font-semibold rounded-md transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  </div>
);

// Blueprint API Request Item Component
const BlueprintApiItem = ({ method, endpoint, actionLabel = "Run", onAction, completed = false }) => (
  <div className="bg-[#1b1e25] rounded-lg p-2">
    <div className="bg-[#14171d] rounded-md p-4 flex items-center justify-between shadow-[0px_2px_5px_rgba(48,49,61,0.08),0px_1px_1px_rgba(0,0,0,0.12)]">
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
          className="px-3 py-1.5 bg-[#14171d] hover:bg-[#1e2229] border border-[#3e444f] text-white text-xs font-semibold rounded-md transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  </div>
);

// Setup Guide Checkmark Icon (small, for completed tasks)
const SetupCheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6" cy="6" r="6" fill="#675DFF"/>
    <path d="M3.5 6L5.25 7.75L8.5 4.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Setup Guide Incomplete Circle Icon
const SetupIncompleteIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6" cy="6" r="5.5" stroke="#D8DEE4" strokeWidth="1"/>
  </svg>
);

// Chevron Up Icon for expandable section
const ChevronUpIcon = ({ className }) => (
  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M1.5 5L4 2.5L6.5 5" stroke="#6C7688" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Setup Guide Task Item
const SetupTaskItem = ({ label, completed = false }) => (
  <div className="flex items-center gap-3 px-2 py-2 rounded-md">
    <div className="shrink-0">
      {completed ? <SetupCheckIcon /> : <SetupIncompleteIcon />}
    </div>
    <span className="text-[14px] leading-5 tracking-[-0.15px] text-[#353a44]">
      {label}
    </span>
  </div>
);

// Setup Guide Panel Component
const SetupGuide = ({ isOpen, completedTasks = 5, isPanelMinimized = false }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const tasks = [
    { label: 'Enable Issuing', completed: true },
    { label: 'Explore integration path', completed: true },
    { label: 'Create a cardholder', completed: completedTasks >= 3 },
    { label: 'Create a virtual card', completed: completedTasks >= 4 },
    { label: 'Add funds', completed: completedTasks >= 5 },
    { label: 'Spend with card', completed: completedTasks >= 6 },
  ];
  
  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = (completedCount / tasks.length) * 100;
  
  // Position the guide 24px above the blueprint panel (which is either 75vh or 88px when minimized)
  const bottomPosition = isPanelMinimized ? 'calc(88px + 24px)' : 'calc(75vh + 24px)';

  return (
    <div 
      className={`fixed right-4 z-50 transition-all duration-[600ms] ease-out ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{ bottom: bottomPosition }}
    >
      <div className="w-[288px] bg-white rounded-xl border border-[rgba(0,39,77,0.08)] shadow-[0px_15px_35px_rgba(48,49,61,0.08),0px_5px_15px_rgba(0,0,0,0.12)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2">
          <span className="text-[14px] font-semibold leading-5 tracking-[-0.15px] text-[#353a44]">
            Setup guide
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="px-3 pb-2">
          <div className="relative h-1 bg-[#d8dee4] rounded-full overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-[#675dff] rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
        
        {/* Expandable Section */}
        <div className="px-1 pb-1">
          <div className="bg-[#f5f6f8] rounded-lg p-1">
            {/* Section Header */}
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex items-center justify-between px-1 py-1 hover:bg-[#ebeef1] rounded-md transition-colors"
            >
              <span className="text-[14px] font-semibold leading-5 tracking-[-0.15px] text-[#353a44]">
                Set up Issuing
              </span>
              <ChevronUpIcon className={`transition-transform duration-200 ${isExpanded ? '' : 'rotate-180'}`} />
            </button>
            
            {/* Task List */}
            {isExpanded && (
              <div className="mt-1">
                {tasks.map((task, index) => (
                  <SetupTaskItem 
                    key={index}
                    label={task.label}
                    completed={task.completed}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Bottom Bar Icons
const ApiIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 5L2 8L5 11M11 5L14 8L11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const WebhooksIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="4" r="2" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="4" cy="12" r="2" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 6V8L5 11M8 8L11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const AlertIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 2L14 13H2L8 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M8 6V9M8 11V11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ArrowsUpDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 10L5 3M5 3L2 6M5 3L8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11 6L11 13M11 13L8 10M11 13L14 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PersonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M3 14C3 11.2386 5.23858 9 8 9C10.7614 9 13 11.2386 13 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 1V3M8 13V15M15 8H13M3 8H1M13.3 2.7L11.9 4.1M4.1 11.9L2.7 13.3M13.3 13.3L11.9 11.9M4.1 4.1L2.7 2.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ExpandCircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M5 9L8 6L11 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CollapseCircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M5 7L8 10L11 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Blueprint Panel Component
const BlueprintPanel = ({ isOpen, onClose, isMinimized = false, onMinimizeChange }) => {
  const [completedSteps, setCompletedSteps] = useState(0);
  const totalSteps = 8; // Total number of step items with circles
  
  const handleMinimizeToggle = () => {
    if (onMinimizeChange) {
      onMinimizeChange(!isMinimized);
    }
  };
  
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
  
  // Calculate the panel height based on minimized state
  const panelHeight = isMinimized ? '88px' : '75vh';

  return (
  <div 
    className={`fixed inset-x-0 bottom-0 z-50 transition-all duration-[600ms] ease-out ${
      isOpen ? 'translate-y-0' : 'translate-y-full'
    }`}
    style={{ height: panelHeight }}
  >
    <div className="h-full bg-[#0a0d14] rounded-t-xl flex flex-col shadow-2xl overflow-hidden">
      {/* Top Navigation Bar - Hidden when minimized */}
      {!isMinimized && (
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#2d3348] shrink-0">
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
      )}

      {/* Main Content - Hidden when minimized */}
      {!isMinimized && (
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
      )}

      {/* Shell Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-[#2d3348] shrink-0">
        <div className="flex items-center gap-2 text-sm text-[#8792a2]">
          <span className="font-medium">Shell</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M4 3L7 6L4 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div className="w-[2px] h-4 bg-[#635bff] animate-pulse" />
        </div>
        <button 
          onClick={handleMinimizeToggle}
          className="text-[#8792a2] hover:text-white p-1 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path 
              d={isMinimized ? "M4 10L8 6L12 10" : "M4 6L8 10L12 6"} 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Developers Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0d1017] border-t border-[#2d3348] shrink-0">
        <div className="flex items-center gap-2 text-sm text-[#8792a2]">
          <span className="text-[#6c7688]"><ApiIcon /></span>
          <span className="font-medium">Developers</span>
        </div>
        <div className="flex items-center gap-1 text-[#8792a2]">
          <button className="p-2 rounded-full hover:bg-[#1a1f36] hover:text-white transition-colors">
            <WebhooksIcon />
          </button>
          <button className="p-2 rounded-full hover:bg-[#1a1f36] hover:text-white transition-colors">
            <AlertIcon />
          </button>
          <button className="p-2 rounded-full hover:bg-[#1a1f36] hover:text-white transition-colors">
            <ArrowsUpDownIcon />
          </button>
          <button className="p-2 rounded-full hover:bg-[#1a1f36] hover:text-white transition-colors">
            <PersonIcon />
          </button>
          <button className="p-2 rounded-full hover:bg-[#1a1f36] hover:text-white transition-colors">
            <SettingsIcon />
          </button>
          <button 
            onClick={handleMinimizeToggle}
            className="p-2 rounded-full hover:bg-[#1a1f36] hover:text-white transition-colors"
          >
            {isMinimized ? <ExpandCircleIcon /> : <CollapseCircleIcon />}
          </button>
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

export { BlueprintPanel, SetupGuide };
export default QuickstartGuideView;
