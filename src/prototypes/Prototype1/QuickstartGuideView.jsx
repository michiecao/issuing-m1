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

// Loading circle with animated purple ring
const LoadingCircle = () => (
  <div className="w-5 h-5 shrink-0 relative">
    <svg width="20" height="20" viewBox="0 0 20 20" className="animate-spin-slow">
      <circle
        cx="10"
        cy="10"
        r="8"
        fill="none"
        stroke="#3e444f"
        strokeWidth="2"
      />
      <circle
        cx="10"
        cy="10"
        r="8"
        fill="none"
        stroke="#635bff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="50.26"
        strokeDashoffset="12.56"
        style={{ transformOrigin: 'center' }}
      />
    </svg>
  </div>
);

// Step status circle that handles all three states
const StepCircle = ({ status }) => {
  if (status === 'completed') return <CompletedCircle />;
  if (status === 'loading') return <LoadingCircle />;
  return <IncompleteCircle />;
};

// Blueprint Step Item Component
const BlueprintStepItem = ({ type, title, actionLabel, onAction, status = 'incomplete' }) => (
  <div className="bg-[#1b1e25] rounded-lg p-2">
    <div className="bg-[#14171d] rounded-md p-4 flex items-center justify-between shadow-[0px_2px_5px_rgba(48,49,61,0.08),0px_1px_1px_rgba(0,0,0,0.12)]">
      <div className="flex items-center gap-3">
        <StepCircle status={status} />
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
const BlueprintApiItem = ({ method, endpoint, actionLabel = "Run", onAction, status = 'incomplete' }) => (
  <div className="bg-[#1b1e25] rounded-lg p-2">
    <div className="bg-[#14171d] rounded-md p-4 flex items-center justify-between shadow-[0px_2px_5px_rgba(48,49,61,0.08),0px_1px_1px_rgba(0,0,0,0.12)]">
      <div className="flex items-center gap-3">
        <StepCircle status={status} />
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

// Chevron Icon for expandable section (points up by default, rotate 180 for down)
const ChevronUpIcon = ({ className }) => (
  <svg width="8" height="8" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M0.381282 11.6187C0.72299 11.9604 1.27701 11.9604 1.61872 11.6187L8 5.23744L14.3813 11.6187C14.723 11.9604 15.277 11.9604 15.6187 11.6187C15.9604 11.277 15.9604 10.723 15.6187 10.3813L8.61872 3.38128C8.27701 3.03957 7.72299 3.03957 7.38128 3.38128L0.381282 10.3813C0.0395728 10.723 0.0395728 11.277 0.381282 11.6187Z" fill="#6C7688"/>
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
const SetupGuide = ({ isOpen, completedTasks = 1, isPanelMinimized = false, hideForModal = false, blueprintOpen = false }) => {
  // Track if we've ever had the blueprint open (to know if we should expand after it closes)
  const [hasSeenBlueprintClose, setHasSeenBlueprintClose] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Only expand when blueprint closes (not on initial mount)
  React.useEffect(() => {
    if (blueprintOpen) {
      // Blueprint is open - collapse and mark that we've seen it
      setIsExpanded(false);
      setHasSeenBlueprintClose(true);
    } else if (hasSeenBlueprintClose) {
      // Blueprint just closed - expand
      setIsExpanded(true);
    }
    // If blueprint is closed but we haven't seen it open yet, stay collapsed
  }, [blueprintOpen, hasSeenBlueprintClose]);
  
  const tasks = [
    { label: 'Enable Issuing', completed: completedTasks >= 1 },
    { label: 'Add funds', completed: completedTasks >= 2 },
    { label: 'Create a cardholder', completed: completedTasks >= 3 },
    { label: 'Create a virtual card', completed: completedTasks >= 4 },
    { label: 'Spend with card', completed: completedTasks >= 5 },
  ];
  
  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = (completedCount / tasks.length) * 100;
  
  // Position the guide based on blueprint state
  // - When blueprint is open and expanded: above 60vh panel
  // - When blueprint is open and minimized: above 48px bar
  // - When blueprint is closed but guide is shown: fixed at bottom right
  const getBottomPosition = () => {
    if (!blueprintOpen) return '24px'; // Blueprint closed, guide at bottom
    return isPanelMinimized ? 'calc(48px + 24px)' : 'calc(60vh + 24px)';
  };

  // Hide when a modal is open
  if (hideForModal) return null;

  return (
    <div 
      className={`fixed right-4 z-50 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{ 
        bottom: getBottomPosition(),
        transition: 'bottom 600ms ease-out, opacity 300ms ease-out'
      }}
    >
      <div className="w-[288px] bg-white rounded-xl border border-[rgba(0,39,77,0.08)] shadow-[0px_15px_35px_rgba(48,49,61,0.08),0px_5px_15px_rgba(0,0,0,0.12)]">
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
            <div 
              className={`overflow-hidden transition-all duration-[600ms] ease-out ${
                isExpanded ? 'max-h-[300px] opacity-100 mt-1' : 'max-h-0 opacity-0'
              }`}
            >
              {tasks.map((task, index) => (
                <SetupTaskItem 
                  key={index}
                  label={task.label}
                  completed={task.completed}
                />
              ))}
            </div>
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
  <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M8.43122 11.8457C8.74002 13.6384 10.3061 15 12.1881 15C14.2914 15 16.0002 13.2993 16.0002 11.1968C16.0002 9.09424 14.2914 7.39355 12.1881 7.39355C11.785 7.39355 11.392 7.45447 11.0204 7.57244L10.5103 6.68428C11.3225 5.99141 11.8371 4.95863 11.8371 3.80321C11.8371 1.70069 10.1283 0 8.025 0C5.92168 0 4.21289 1.70069 4.21289 3.80321C4.21289 4.94899 4.71954 5.9791 5.52747 6.67707L5.00556 7.57416C4.63034 7.45057 4.22946 7.38354 3.81211 7.38354C1.70879 7.38354 0 9.08423 0 11.1868C0 13.2893 1.70879 14.99 3.81211 14.99C5.69093 14.99 7.25289 13.6335 7.56676 11.8409L8.43122 11.8457ZM8.025 1.5C6.74599 1.5 5.71289 2.53323 5.71289 3.80321C5.71289 4.65292 6.17161 5.39724 6.86751 5.79698C7.11807 5.9409 7.25415 6.20751 7.24349 6.47753C7.24908 6.61533 7.21675 6.75631 7.14226 6.88435L4.46041 11.4941C4.25211 11.8521 3.79301 11.9735 3.43498 11.7652C3.07695 11.5569 2.95557 11.0978 3.16386 10.7398L4.22278 8.91966C4.09008 8.89597 3.95298 8.88354 3.81211 8.88354C2.5331 8.88354 1.5 9.91677 1.5 11.1868C1.5 12.4567 2.5331 13.49 3.81211 13.49C5.08953 13.49 6.12422 12.4583 6.12422 11.1768H6.12982C6.12615 11.146 6.12435 11.1147 6.12452 11.0829C6.12683 10.6686 6.46448 10.3347 6.87869 10.337L12.2624 10.367C12.6766 10.3694 13.0105 10.707 13.0082 11.1212C13.0059 11.5354 12.6683 11.8693 12.254 11.867L9.97163 11.8543C10.2555 12.8049 11.1391 13.5 12.1881 13.5C13.4671 13.5 14.5002 12.4667 14.5002 11.1968C14.5002 9.92678 13.4671 8.89355 12.1881 8.89355C11.7657 8.89355 11.3749 9.0004 11.0414 9.19254C10.6825 9.39931 10.2239 9.27597 10.0172 8.91706C9.97488 8.84366 9.9464 8.76609 9.93092 8.68736L7.37466 4.23657C7.16837 3.87738 7.29231 3.41897 7.6515 3.21268C8.01069 3.00638 8.4691 3.13033 8.6754 3.48951L9.74138 5.34554C10.1117 4.94011 10.3371 4.3994 10.3371 3.80321C10.3371 2.53323 9.30402 1.5 8.025 1.5Z" fill="currentColor"/>
  </svg>
);

const AlertIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M10.211 1.45514L15.1286 10.3962C15.3723 10.8392 15.5 11.3365 15.5 11.842V12.5C15.5 14.1569 14.1569 15.5 12.5 15.5H3C1.34315 15.5 0 14.1569 0 12.5V11.842C0 11.3365 0.127738 10.8392 0.371352 10.3962L5.28896 1.45514C5.78259 0.557623 6.72569 0 7.75 0C8.77431 0 9.71741 0.557623 10.211 1.45514ZM12.5 14H3C2.17157 14 1.5 13.3284 1.5 12.5V11.842C1.5 11.5892 1.56387 11.3406 1.68568 11.1191L6.60328 2.17802C6.83329 1.75982 7.27272 1.5 7.75 1.5C8.22728 1.5 8.66671 1.75982 8.89672 2.17802L13.8143 11.1191C13.9361 11.3406 14 11.5892 14 11.842V12.5C14 13.3284 13.3284 14 12.5 14Z" fill="currentColor"/>
    <path d="M9 11.2501C9 11.9393 8.43925 12.5001 7.75 12.5001C7.06075 12.5001 6.5 11.9393 6.5 11.2501C6.5 10.5608 7.06075 10.0001 7.75 10.0001C8.43925 10.0001 9 10.5608 9 11.2501Z" fill="currentColor"/>
    <path d="M6.74995 5.24868C6.72138 4.70586 7.20641 4.25006 7.74998 4.25006C8.29355 4.25006 8.77854 4.70586 8.74997 5.24868L8.5394 8.2511C8.5173 8.67096 8.17042 9.00006 7.74998 9.00006C7.32954 9.00006 6.98266 8.67096 6.96056 8.2511L6.74995 5.24868Z" fill="currentColor"/>
  </svg>
);

const ArrowsUpDownIcon = () => (
  <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.20041 3.73966C7.91856 4.04319 7.93613 4.51774 8.23967 4.7996C8.5432 5.08145 9.01775 5.06387 9.2996 4.76034L11.25 2.65991V13.25C11.25 13.6642 11.5858 14 12 14C12.4142 14 12.75 13.6642 12.75 13.25V2.6599L14.7004 4.76034C14.9823 5.06387 15.4568 5.08145 15.7603 4.79959C15.9187 4.65259 15.9992 4.45317 16 4.25294C16.0008 4.06925 15.9344 3.88488 15.7996 3.73966L12.5496 0.239661C12.4077 0.0868361 12.2086 0 12 0C11.7915 0 11.5923 0.0868362 11.4504 0.239662L8.20041 3.73966Z" fill="currentColor"/>
    <path d="M4.75 11.3401L6.70041 9.23967C6.98226 8.93613 7.45681 8.91856 7.76034 9.20041C8.06387 9.48226 8.08145 9.95681 7.7996 10.2603L4.5496 13.7603C4.40769 13.9132 4.20856 14 4 14C3.79145 14 3.59232 13.9132 3.45041 13.7603L0.200408 10.2603C0.064323 10.1138 -0.00195964 9.92737 4.40921e-05 9.74202C0.00219038 9.54348 0.0826851 9.34618 0.239665 9.20041C0.543198 8.91856 1.01775 8.93613 1.2996 9.23967L3.25 11.3401V0.750003C3.25 0.33579 3.58579 3.45707e-06 4 3.45707e-06C4.41421 3.45707e-06 4.75 0.33579 4.75 0.750003V11.3401Z" fill="currentColor"/>
  </svg>
);

const PersonIcon = () => (
  <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M4.66962 0C3.64489 0 2.7404 0.669398 2.44095 1.6494L0.178845 9.05266C0.0602719 9.44072 0 9.84423 0 10.25C0 12.183 1.567 13.75 3.5 13.75C5.433 13.75 7 12.183 7 10.25V8.14409C7.47031 7.84264 7.78585 7.75 8 7.75C8.21415 7.75 8.52969 7.84264 9 8.14409V10.25C9 12.183 10.567 13.75 12.5 13.75C14.433 13.75 16 12.183 16 10.25C16 9.84423 15.9397 9.44072 15.8212 9.05266L13.559 1.6494C13.2596 0.669399 12.3551 0 11.3304 0C10.0433 0 9 1.04335 9 2.33038V2.91111C8.6829 2.8046 8.34809 2.75 8.00006 2.75C7.65198 2.75 7.31714 2.80462 7 2.91115V2.33038C7 1.04335 5.95665 0 4.66962 0ZM5.5 7.37734V2.33038C5.5 1.87178 5.12822 1.5 4.66962 1.5C4.30448 1.5 3.98218 1.73853 3.87548 2.08773L2.39667 6.92745C2.74354 6.81233 3.11449 6.75 3.5 6.75C4.24362 6.75 4.93308 6.98191 5.5 7.37734ZM1.5 10.25C1.5 11.3546 2.39543 12.25 3.5 12.25C4.60457 12.25 5.5 11.3546 5.5 10.25C5.5 9.14543 4.60457 8.25 3.5 8.25C2.39543 8.25 1.5 9.14543 1.5 10.25ZM12.5 12.25C11.3954 12.25 10.5 11.3546 10.5 10.25C10.5 9.14543 11.3954 8.25 12.5 8.25C13.6046 8.25 14.5 9.14543 14.5 10.25C14.5 11.3546 13.6046 12.25 12.5 12.25ZM12.5 6.75C12.8855 6.75 13.2565 6.81233 13.6033 6.92745L12.1245 2.08773C12.0178 1.73853 11.6955 1.5 11.3304 1.5C10.8718 1.5 10.5 1.87178 10.5 2.33038V7.37734C11.0669 6.98191 11.7564 6.75 12.5 6.75ZM7 4.58833V6.45619C7.33093 6.32501 7.66389 6.25 8 6.25C8.33611 6.25 8.66907 6.32501 9 6.45619V4.58824C8.69181 4.35555 8.35795 4.25 8.00006 4.25C7.64212 4.25 7.30822 4.35558 7 4.58833Z" fill="currentColor"/>
  </svg>
);

const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M7.99996 10C9.10453 10 9.99996 9.10457 9.99996 8C9.99996 6.89543 9.10453 6 7.99996 6C6.89539 6 5.99996 6.89543 5.99996 8C5.99996 9.10457 6.89539 10 7.99996 10ZM7.99996 11.5C9.93295 11.5 11.5 9.933 11.5 8C11.5 6.067 9.93295 4.5 7.99996 4.5C6.06696 4.5 4.49996 6.067 4.49996 8C4.49996 9.933 6.06696 11.5 7.99996 11.5Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M7.40917 14.5H8.59082L8.64285 13.6676C8.68604 12.9765 9.12642 12.4062 9.72215 12.1591C10.3207 11.9109 11.0352 12.0054 11.5529 12.4622L12.1784 13.014L13.0139 12.1785L12.4622 11.5531C12.0053 11.0354 11.9109 10.3208 12.1591 9.72222C12.4062 9.12646 12.9765 8.68604 13.6676 8.64285L14.5 8.59082V7.40918L13.6676 7.35715C12.9765 7.31396 12.4062 6.87355 12.1591 6.27781C11.9109 5.67926 12.0053 4.9647 12.4622 4.44695L13.0139 3.82163L12.1784 2.98608L11.553 3.53784C11.0353 3.99467 10.3207 4.0891 9.72218 3.84089C9.12644 3.59384 8.68604 3.02347 8.64285 2.33241L8.59082 1.5H7.40917L7.35715 2.33236C7.31396 3.02345 6.87354 3.59384 6.27778 3.8409C5.67921 4.08913 4.96463 3.99471 4.44686 3.53785L3.82153 2.98609L2.98598 3.82164L3.53784 4.44708C3.99465 4.9648 4.08908 5.67931 3.84088 6.27784C3.59384 6.87357 3.02348 7.31396 2.33245 7.35715L1.5 7.40917V8.59082L2.33241 8.64285C3.02346 8.68604 3.59383 9.12643 3.84089 9.72218C4.0891 10.3207 3.99467 11.0353 3.53784 11.553L2.98597 12.1785L3.82152 13.014L4.44696 12.4622C4.9647 12.0053 5.67925 11.9109 6.27781 12.1591C6.87356 12.4062 7.31396 12.9765 7.35715 13.6676L7.40917 14.5ZM4.51386 14.3779C4.57751 14.3386 4.63866 14.2934 4.69655 14.2424L5.4394 13.5869C5.51167 13.5231 5.61418 13.5078 5.70322 13.5447C5.79219 13.5816 5.85406 13.665 5.86007 13.7612L5.92186 14.7498C5.92668 14.8269 5.93797 14.902 5.95519 14.9748C5.96527 15.0175 5.9774 15.0593 5.99145 15.1002C6.17209 15.6264 6.67094 16 7.2526 16H8.7474C9.32903 16 9.82785 15.6264 10.0085 15.1003C10.0226 15.0594 10.0347 15.0175 10.0448 14.9749C10.062 14.9021 10.0733 14.8269 10.0781 14.7498L10.1399 13.7611C10.1459 13.665 10.2078 13.5816 10.2967 13.5447C10.3858 13.5078 10.4882 13.5232 10.5605 13.5869L11.3033 14.2424C11.3612 14.2935 11.4224 14.3387 11.4861 14.378C11.5234 14.401 11.5615 14.422 11.6004 14.441C12.1001 14.6852 12.717 14.5967 13.1283 14.1854L14.1853 13.1284C14.5966 12.7171 14.6851 12.1002 14.4408 11.6004C14.4218 11.5616 14.4009 11.5234 14.3779 11.4862C14.3385 11.4225 14.2934 11.3614 14.2423 11.3035L13.5869 10.5607C13.5231 10.4884 13.5077 10.3859 13.5447 10.2968C13.5816 10.2078 13.665 10.1459 13.7612 10.1399L14.7498 10.0781C14.8269 10.0733 14.902 10.062 14.9748 10.0448C15.0174 10.0347 15.0593 10.0226 15.1002 10.0086C15.6263 9.82795 16 9.32909 16 8.7474V7.2526C16 6.67093 15.6264 6.17209 15.1002 5.99144C15.0593 5.9774 15.0175 5.96527 14.9748 5.95519C14.902 5.93797 14.8269 5.92668 14.7498 5.92186L13.7612 5.86007C13.665 5.85406 13.5816 5.79219 13.5447 5.70321C13.5078 5.61417 13.5231 5.51166 13.5869 5.43938L14.2423 4.69666C14.2934 4.63873 14.3386 4.57754 14.3779 4.51384C14.4009 4.47658 14.4219 4.43846 14.4409 4.39963C14.6851 3.89987 14.5966 3.28297 14.1853 2.87168L13.1283 1.8147C12.717 1.40342 12.1001 1.31487 11.6004 1.55913C11.5615 1.57811 11.5234 1.5991 11.4861 1.6221C11.4224 1.66142 11.3613 1.70662 11.3033 1.75773L10.5606 2.41309C10.4883 2.47686 10.3858 2.49223 10.2968 2.4553C10.2078 2.41841 10.1459 2.33497 10.1399 2.23884L10.0781 1.25016C10.0733 1.17312 10.062 1.09795 10.0448 1.02516C10.0347 0.982504 10.0226 0.940667 10.0085 0.899751C9.8279 0.373623 9.32906 0 8.7474 0H7.2526C6.67091 0 6.17205 0.373663 5.99142 0.899834C5.97738 0.940737 5.96526 0.982562 5.95518 1.0252C5.93797 1.09798 5.92668 1.17314 5.92186 1.25016L5.86007 2.2388C5.85406 2.33495 5.79218 2.41842 5.70318 2.45532C5.61412 2.49225 5.51159 2.47688 5.43929 2.41309L4.69656 1.75774C4.63865 1.70665 4.57748 1.66146 4.51381 1.62215C4.47655 1.59915 4.43844 1.57817 4.39962 1.55919C3.89985 1.31487 3.2829 1.40341 2.87159 1.81472L1.81461 2.8717C1.40332 3.28298 1.31477 3.89987 1.55903 4.39963C1.57802 4.43848 1.59902 4.47662 1.62203 4.5139C1.66134 4.57758 1.70653 4.63876 1.75763 4.69667L2.41308 5.43951C2.47684 5.51177 2.4922 5.61425 2.45529 5.70326C2.4184 5.79221 2.33499 5.85406 2.23888 5.86007L1.25016 5.92186C1.17311 5.92668 1.09792 5.93797 1.02512 5.9552C0.982451 5.96529 0.940602 5.97742 0.899674 5.99147C0.373587 6.17215 0 6.67097 0 7.2526V8.7474C0 9.32905 0.373619 9.82789 0.899741 10.0085C0.940658 10.0226 0.982497 10.0347 1.02516 10.0448C1.09795 10.062 1.17312 10.0733 1.25016 10.0781L2.23884 10.1399C2.33497 10.1459 2.41841 10.2078 2.4553 10.2968C2.49222 10.3858 2.47686 10.4883 2.41309 10.5606L1.75762 11.3034C1.70654 11.3613 1.66137 11.4225 1.62207 11.4861C1.59906 11.5234 1.57806 11.5615 1.55907 11.6004C1.31475 12.1001 1.40328 12.7171 1.81459 13.1284L2.87157 14.1854C3.28289 14.5967 3.89985 14.6852 4.39963 14.4409C4.43846 14.4219 4.47659 14.4009 4.51386 14.3779Z" fill="currentColor"/>
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
const BlueprintPanel = ({ isOpen, onClose, isMinimized = false, onMinimizeChange, onAddFunds, addFundsCompleted = false }) => {
  const [completedSteps, setCompletedSteps] = useState(0);
  const [loadingStep, setLoadingStep] = useState(null); // Currently loading step (1-indexed)
  const totalSteps = 8; // Total number of step items with circles
  
  // Refs for each step to enable scrolling
  const stepRefs = React.useRef([]);
  const scrollContainerRef = React.useRef(null);
  
  // Helper to get status for a step
  const getStepStatus = (stepNumber) => {
    if (completedSteps >= stepNumber) return 'completed';
    if (loadingStep === stepNumber) return 'loading';
    return 'incomplete';
  };
  
  // Update completed steps when funds are added successfully
  React.useEffect(() => {
    if (addFundsCompleted && completedSteps < 1) {
      setCompletedSteps(1);
    }
  }, [addFundsCompleted, completedSteps]);
  
  const handleMinimizeToggle = () => {
    if (onMinimizeChange) {
      onMinimizeChange(!isMinimized);
    }
  };
  
  // Handle Add Funds action - collapse panel and open modal
  const handleAddFundsAction = () => {
    if (onMinimizeChange) {
      onMinimizeChange(true); // Collapse the panel
    }
    if (onAddFunds) {
      onAddFunds();
    }
  };
  
  const runAllSteps = () => {
    // Sequentially complete each step with loading animation
    let step = completedSteps;
    
    const processNextStep = () => {
      step++;
      if (step > totalSteps) {
        setLoadingStep(null);
        return;
      }
      
      // First show loading state
      setLoadingStep(step);
      
      // Scroll the current step into view
      if (stepRefs.current[step - 1]) {
        stepRefs.current[step - 1].scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
      
      // After loading animation, mark as completed and move to next
      setTimeout(() => {
        setCompletedSteps(step);
        setLoadingStep(null);
        
        // Small delay before starting next step
        setTimeout(processNextStep, 200);
      }, 600); // Loading animation duration
    };
    
    processNextStep();
  };

  const allCompleted = completedSteps >= totalSteps;
  
  // Content panel height (above the bottom bar)
  const contentHeight = 'calc(60vh - 48px)';

  // Calculate transform for main content
  // When closed (isOpen=false), need to push completely off screen (100% + 48px for the bar)
  // When minimized, push down by 100%
  // When expanded, no transform
  const getContentTransform = () => {
    if (!isOpen) return 'translateY(calc(100% + 48px))'; // Completely hide below viewport
    if (isMinimized) return 'translateY(100%)';
    return 'translateY(0)';
  };

  return (
  <>
    {/* Main Content Panel - Slides up/down */}
    <div 
      className={`fixed inset-x-0 z-50 transition-transform duration-[600ms] ease-out ${
        !isOpen ? 'pointer-events-none' : ''
      }`}
      style={{ 
        bottom: '48px',
        height: contentHeight,
        transform: getContentTransform()
      }}
    >
      <div className="h-full bg-[#0a0d14] rounded-t-xl flex flex-col shadow-2xl overflow-hidden">
        {/* Top Navigation Bar */}
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
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <mask id="mask0_feedback" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="12" height="12">
                <path fillRule="evenodd" clipRule="evenodd" d="M1.80656 1.69503C2.8941 0.868083 4.37316 0.375 5.98874 0.375C7.60591 0.375 9.09044 0.875053 10.1827 1.70758C11.2751 2.54025 12 3.73028 12 5.08613C12 6.4371 11.2816 7.62136 10.1937 8.44965C9.10648 9.27751 7.62742 9.77295 6.01126 9.77295C5.68108 9.77295 5.32307 9.76205 4.97084 9.71134L2.05919 11.512C2.0498 11.5178 2.04024 11.5233 2.03053 11.5286C1.43889 11.8479 0.664325 11.3163 0.89712 10.5874L0.897459 10.5863L1.62612 8.28895C0.635058 7.46483 0 6.34682 0 5.06182C0 3.70715 0.718102 2.52268 1.80656 1.69503ZM2.4875 2.59055C1.61523 3.25381 1.125 4.1315 1.125 5.06182C1.125 6.03856 1.65356 6.94422 2.60825 7.62652C2.80664 7.76831 2.89109 8.02178 2.81736 8.25422L2.23888 10.0781L4.5596 8.64291C4.68056 8.56811 4.82537 8.5419 4.96487 8.56956C5.27772 8.6316 5.63149 8.64795 6.01126 8.64795C7.40467 8.64795 8.63873 8.21967 9.51221 7.55459C10.3851 6.88994 10.875 6.01204 10.875 5.08613C10.875 4.15699 10.3803 3.2727 9.50073 2.60231C8.621 1.93177 7.38115 1.5 5.98874 1.5C4.59475 1.5 3.36069 1.92658 2.4875 2.59055Z" fill="currentColor"/>
              </mask>
              <g mask="url(#mask0_feedback)">
                <rect width="12" height="12" fill="currentColor"/>
              </g>
            </svg>
            Send feedback
          </button>
          <button className="flex items-center gap-1.5 text-sm text-[#8792a2] hover:text-white">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 1.5H3C2.17157 1.5 1.5 2.17157 1.5 3V12C1.5 12.8284 2.17157 13.5 3 13.5H12C12.8284 13.5 13.5 12.8284 13.5 12V3C13.5 2.17157 12.8284 1.5 12 1.5ZM3 0C1.34315 0 0 1.34315 0 3V12C0 13.6569 1.34315 15 3 15H12C13.6569 15 15 13.6569 15 12V3C15 1.34315 13.6569 0 12 0H3Z" fill="currentColor"/>
              <path d="M11.2597 3L7.84992 3.00024C7.43571 3.00027 7.09995 3.33608 7.09998 3.7503C7.10001 4.16451 7.43582 4.50027 7.85003 4.50024L9.43921 4.50013L4.5 9.43934V7.84033C4.5 7.42612 4.16421 7.09033 3.75 7.09033C3.33579 7.09033 3 7.42612 3 7.84033V11.2503C3 11.4493 3.07902 11.64 3.21968 11.7807C3.36033 11.9213 3.5511 12.0003 3.75002 12.0003L7.16002 12.0002C7.57424 12.0002 7.91001 11.6644 7.91 11.2502C7.90999 10.836 7.5742 10.5002 7.15998 10.5002L5.56037 10.5003L10.5098 5.55089V7.16C10.5098 7.57422 10.8456 7.91 11.2598 7.91C11.674 7.91 12.0098 7.57422 12.0098 7.16V3.75C12.0098 3.55108 11.9307 3.3603 11.7901 3.21965C11.6494 3.079 11.4586 2.99999 11.2597 3Z" fill="currentColor"/>
            </svg>
            Copy link
          </button>
          <button className="p-1 text-[#8792a2] hover:text-white">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M12.5 2H3.5C2.67157 2 2 2.67157 2 3.5V12.5C2 13.3284 2.67157 14 3.5 14H12.5C13.3284 14 14 13.3284 14 12.5V3.5C14 2.67157 13.3284 2 12.5 2ZM3.5 0.5C1.84315 0.5 0.5 1.84315 0.5 3.5V12.5C0.5 14.1569 1.84315 15.5 3.5 15.5H12.5C14.1569 15.5 15.5 14.1569 15.5 12.5V3.5C15.5 1.84315 14.1569 0.5 12.5 0.5H3.5Z" fill="currentColor"/>
              <path d="M11.7597 3.5L8.34992 3.50024C7.93571 3.50027 7.59995 3.83608 7.59998 4.2503C7.60001 4.66451 7.93582 5.00027 8.35003 5.00024L9.93921 5.00013L5 9.93934V8.34033C5 7.92612 4.66421 7.59033 4.25 7.59033C3.83579 7.59033 3.5 7.92612 3.5 8.34033V11.7503C3.5 11.9493 3.57902 12.14 3.71968 12.2807C3.86033 12.4213 4.0511 12.5003 4.25002 12.5003L7.66002 12.5002C8.07424 12.5002 8.41001 12.1644 8.41 11.7502C8.40999 11.336 8.0742 11.0002 7.65998 11.0002L6.06037 11.0003L11.0098 6.05089V7.66C11.0098 8.07422 11.3456 8.41 11.7598 8.41C12.174 8.41 12.5098 8.07422 12.5098 7.66V4.25C12.5098 4.05108 12.4307 3.8603 12.2901 3.71965C12.1494 3.579 11.9586 3.49999 11.7597 3.5Z" fill="currentColor"/>
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
              <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M1.63307 1.34026C1.49507 1.25987 1.3125 1.36157 1.3125 1.52872V10.2826C1.3125 10.4466 1.49795 10.5484 1.63179 10.4718L9.08318 6.06152C9.2175 5.98328 9.21752 5.82098 9.08318 5.74273C6.59119 4.29105 4.11645 2.80933 1.63423 1.34097L1.63307 1.34026ZM2.29756 0.208392C2.05426 0.0666623 1.79475 0.0011812 1.54098 9.88826e-06C0.74203 -0.00367785 0 0.630092 0 1.52872V10.2826C0 11.1729 0.738762 11.8144 1.5381 11.8126C1.79107 11.812 2.05011 11.747 2.29373 11.6051L9.74604 7.19436C10.2487 6.90053 10.5 6.40133 10.5 5.90213C10.5 5.40221 10.2479 4.90228 9.74384 4.60862C7.25276 3.15748 4.77884 1.67623 2.29756 0.208392Z" fill="currentColor"/>
              </svg>
            </button>
            <button className="px-4 py-2 bg-[#2d3348] hover:bg-[#3d4460] text-white text-sm font-medium rounded flex items-center gap-2 transition-colors">
              <span>Step through</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.25 0.206299C11.5607 0.206299 11.8125 0.458139 11.8125 0.768799V11.2688C11.8125 11.5795 11.5607 11.8313 11.25 11.8313C10.9393 11.8313 10.6875 11.5795 10.6875 11.2688V0.768799C10.6875 0.458139 10.9393 0.206299 11.25 0.206299ZM0.84082 0.412109C1.21437 0.17368 1.70556 0.123433 2.14307 0.363037L2.23022 0.415039L2.23315 0.417236H2.23389L2.23462 0.417969C2.23535 0.418447 2.23624 0.419305 2.23755 0.420166C2.2405 0.422112 2.24493 0.425132 2.25073 0.428955C2.26241 0.436652 2.2801 0.447738 2.30273 0.462646C2.34808 0.492523 2.41484 0.53634 2.49976 0.592285C2.66957 0.70416 2.91241 0.864838 3.20581 1.05811C3.7927 1.4447 4.5808 1.96355 5.38477 2.49292C6.99405 3.55255 8.66347 4.65157 8.91943 4.81763C9.77532 5.37287 9.77615 6.65416 8.92236 7.21118L8.9231 7.21191L2.23315 11.6211L2.23022 11.6233C1.76951 11.9222 1.23651 11.8778 0.840088 11.6233C0.448846 11.372 0.187596 10.9207 0.1875 10.3965V1.64258C0.1875 1.11641 0.447116 0.663562 0.84082 0.412109ZM1.61426 1.3562C1.55877 1.32166 1.50482 1.32275 1.44653 1.35986C1.38232 1.40085 1.3125 1.49329 1.3125 1.64258V10.3965C1.31259 10.5404 1.38125 10.6334 1.448 10.6763C1.50962 10.7158 1.56365 10.7151 1.61792 10.6799L8.3042 6.27222L8.30786 6.27002C8.38816 6.21774 8.43747 6.12613 8.4375 6.01587C8.4375 5.90545 8.38833 5.81326 8.30786 5.76099C8.04818 5.59253 6.37243 4.49046 4.76587 3.43262C3.96186 2.90322 3.17381 2.3844 2.58691 1.9978C2.29353 1.80455 2.0507 1.64387 1.88086 1.53198C1.79596 1.47605 1.72919 1.43222 1.68384 1.40234C1.66116 1.3874 1.64354 1.37563 1.63184 1.36792C1.62618 1.36419 1.62157 1.36179 1.61865 1.35986C1.6174 1.35904 1.61645 1.35815 1.61572 1.35767L1.61426 1.35693V1.3562Z" fill="currentColor"/>
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
              <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M6.00037 3.18713C5.17194 3.18713 4.50037 3.85871 4.50037 4.68713C4.50037 5.51556 5.17194 6.18713 6.00037 6.18713C6.82879 6.18713 7.50037 5.51556 7.50037 4.68713C7.50037 3.85871 6.82879 3.18713 6.00037 3.18713ZM3.37537 4.68713C3.37537 3.23739 4.55062 2.06213 6.00037 2.06213C7.45011 2.06213 8.62537 3.23739 8.62537 4.68713C8.62537 6.13688 7.45011 7.31213 6.00037 7.31213C4.55062 7.31213 3.37537 6.13688 3.37537 4.68713Z" fill="currentColor"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M2.60714 2.355C1.64918 3.10037 1.125 3.98633 1.125 4.6875C1.125 5.38867 1.64918 6.27463 2.60714 7.02C3.54536 7.75 4.78618 8.25 6 8.25C7.21382 8.25 8.45464 7.75 9.39286 7.02C10.3508 6.27463 10.875 5.38867 10.875 4.6875C10.875 3.98633 10.3508 3.10037 9.39286 2.355C8.45464 1.625 7.21382 1.125 6 1.125C4.78618 1.125 3.54536 1.625 2.60714 2.355ZM1.9163 1.46711C3.01714 0.610574 4.49507 0 6 0C7.50493 0 8.98286 0.610574 10.0837 1.46711C11.1648 2.30828 12 3.48482 12 4.6875C12 5.89018 11.1648 7.06672 10.0837 7.90789C8.98286 8.76443 7.50493 9.375 6 9.375C4.49507 9.375 3.01714 8.76443 1.9163 7.90789C0.835196 7.06672 0 5.89018 0 4.6875C0 3.48482 0.835196 2.30828 1.9163 1.46711Z" fill="currentColor"/>
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
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M0.381282 4.38128C0.72299 4.03957 1.27701 4.03957 1.61872 4.38128L8 10.7626L14.3813 4.38128C14.723 4.03957 15.277 4.03957 15.6187 4.38128C15.9604 4.72299 15.9604 5.27701 15.6187 5.61872L8.61872 12.6187C8.27701 12.9604 7.72299 12.9604 7.38128 12.6187L0.381282 5.61872C0.0395728 5.27701 0.0395728 4.72299 0.381282 4.38128Z" fill="currentColor"/>
                    </svg>
                  </button>
                  <span className="w-5 h-5 rounded-full bg-[#2d3348] text-white text-xs flex items-center justify-center shrink-0">1</span>
                  <div>
                    <h3 className="text-white font-semibold">Fund your Financial account balance</h3>
                    <p className="text-sm text-[#8792a2]">Add funds to your Financial account balance before creating cards.</p>
                  </div>
                </div>
                <div className="ml-10 space-y-2">
                  <div ref={el => stepRefs.current[0] = el}>
                    <BlueprintStepItem 
                      type="Dashboard" 
                      title="Add funds to Financial account balance" 
                      actionLabel="Add funds"
                      status={getStepStatus(1)}
                      onAction={handleAddFundsAction}
                    />
                  </div>
                  <div className="flex justify-center py-1">
                    <div className="w-px h-4 bg-[#2d3348]" />
                  </div>
                  <div ref={el => stepRefs.current[1] = el}>
                    <BlueprintStepItem 
                      type="Async handler" 
                      title="Wait for topup" 
                      actionLabel="Run"
                      status={getStepStatus(2)}
                      onAction={runAllSteps}
                    />
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div>
                <div className="flex items-start gap-2 mb-4">
                  <button className="text-[#8792a2] hover:text-white mt-1">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M0.381282 4.38128C0.72299 4.03957 1.27701 4.03957 1.61872 4.38128L8 10.7626L14.3813 4.38128C14.723 4.03957 15.277 4.03957 15.6187 4.38128C15.9604 4.72299 15.9604 5.27701 15.6187 5.61872L8.61872 12.6187C8.27701 12.9604 7.72299 12.9604 7.38128 12.6187L0.381282 5.61872C0.0395728 5.27701 0.0395728 4.72299 0.381282 4.38128Z" fill="currentColor"/>
                    </svg>
                  </button>
                  <span className="w-5 h-5 rounded-full bg-[#2d3348] text-white text-xs flex items-center justify-center shrink-0">2</span>
                  <div>
                    <h3 className="text-white font-semibold">Create a cardholder</h3>
                    <p className="text-sm text-[#8792a2]">Create a cardholder representing the company or business entity authorized to use card funding.</p>
                  </div>
                </div>
                <div className="ml-10 space-y-2">
                  <div ref={el => stepRefs.current[2] = el}>
                    <BlueprintApiItem 
                      method="POST" 
                      endpoint="/v1/issuing/cardholders"
                      status={getStepStatus(3)}
                      onAction={runAllSteps}
                    />
                  </div>
                  <div className="flex justify-center py-1">
                    <div className="w-px h-4 bg-[#2d3348]" />
                  </div>
                  <div ref={el => stepRefs.current[3] = el}>
                    <BlueprintApiItem 
                      method="POST" 
                      endpoint="/v1/issuing/cardholders/{id}"
                      status={getStepStatus(4)}
                      onAction={runAllSteps}
                    />
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div>
                <div className="flex items-start gap-2 mb-4">
                  <button className="text-[#8792a2] hover:text-white mt-1">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M0.381282 4.38128C0.72299 4.03957 1.27701 4.03957 1.61872 4.38128L8 10.7626L14.3813 4.38128C14.723 4.03957 15.277 4.03957 15.6187 4.38128C15.9604 4.72299 15.9604 5.27701 15.6187 5.61872L8.61872 12.6187C8.27701 12.9604 7.72299 12.9604 7.38128 12.6187L0.381282 5.61872C0.0395728 5.27701 0.0395728 4.72299 0.381282 4.38128Z" fill="currentColor"/>
                    </svg>
                  </button>
                  <span className="w-5 h-5 rounded-full bg-[#2d3348] text-white text-xs flex items-center justify-center shrink-0">3</span>
                  <div>
                    <h3 className="text-white font-semibold">Create and activate a card</h3>
                    <p className="text-sm text-[#8792a2]">Create a virtual card and attach it to the cardholder, then activate it for use.</p>
                  </div>
                </div>
                <div className="ml-10 space-y-2">
                  <div ref={el => stepRefs.current[4] = el}>
                    <BlueprintApiItem 
                      method="POST" 
                      endpoint="/v1/issuing/cards"
                      status={getStepStatus(5)}
                      onAction={runAllSteps}
                    />
                  </div>
                  <div className="flex justify-center py-1">
                    <div className="w-px h-4 bg-[#2d3348]" />
                  </div>
                  <div ref={el => stepRefs.current[5] = el}>
                    <BlueprintApiItem 
                      method="POST" 
                      endpoint="/v1/issuing/cards/{id}"
                      status={getStepStatus(6)}
                      onAction={runAllSteps}
                    />
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div>
                <div className="flex items-start gap-2 mb-4">
                  <button className="text-[#8792a2] hover:text-white mt-1">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M0.381282 4.38128C0.72299 4.03957 1.27701 4.03957 1.61872 4.38128L8 10.7626L14.3813 4.38128C14.723 4.03957 15.277 4.03957 15.6187 4.38128C15.9604 4.72299 15.9604 5.27701 15.6187 5.61872L8.61872 12.6187C8.27701 12.9604 7.72299 12.9604 7.38128 12.6187L0.381282 5.61872C0.0395728 5.27701 0.0395728 4.72299 0.381282 4.38128Z" fill="currentColor"/>
                    </svg>
                  </button>
                  <span className="w-5 h-5 rounded-full bg-[#2d3348] text-white text-xs flex items-center justify-center shrink-0">4</span>
                  <div>
                    <h3 className="text-white font-semibold">Use the card</h3>
                    <p className="text-sm text-[#8792a2]">Create a test authorization to simulate a card purchase at a merchant.</p>
                  </div>
                </div>
                <div className="ml-10 space-y-2">
                  <div ref={el => stepRefs.current[6] = el}>
                    <BlueprintApiItem 
                      method="POST" 
                      endpoint="/v1/testhelpers/issuing/authorizations"
                      status={getStepStatus(7)}
                      onAction={runAllSteps}
                    />
                  </div>
                  <div className="flex justify-center py-1">
                    <div className="w-px h-4 bg-[#2d3348]" />
                  </div>
                  <div ref={el => stepRefs.current[7] = el}>
                    <BlueprintApiItem 
                      method="POST" 
                      endpoint="/v1/testhelpers/issuing/authorizations/{id}/capture"
                      status={getStepStatus(8)}
                      onAction={runAllSteps}
                    />
                  </div>
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
                  Exit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Developers Bar - Fixed at bottom */}
  <div 
    className={`fixed inset-x-0 bottom-0 z-[60] transition-all duration-[600ms] ease-out ${
      isOpen ? 'translate-y-0' : 'translate-y-full'
    }`}
    style={{ height: '48px' }}
  >
    <div className="h-full bg-[#0d1017] flex items-center justify-between px-4 shadow-2xl">
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
  </>
  );
};

// Quickstart Guide Full Page View (Docs-style)
const QuickstartGuideView = ({ onExit, isSandboxMode = false, onExitSandbox }) => {
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
