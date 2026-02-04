import React from 'react';

// Arrow up-right icon
const ArrowUpRightIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.31188 0.66394C4.82295 0.66394 4.4266 1.06029 4.4266 1.54922C4.4266 2.03814 4.82295 2.4345 5.31188 2.4345H10.4782L1.58742 11.3252C1.24169 11.671 1.24169 12.2315 1.58742 12.5772C1.93314 12.9229 2.49367 12.9229 2.83939 12.5772L11.7301 3.68647V8.85276C11.7301 9.34169 12.1265 9.73804 12.6154 9.73804C13.1043 9.73804 13.5007 9.34169 13.5007 8.85276V1.54922C13.5007 1.06029 13.1043 0.66394 12.6154 0.66394H5.31188Z" fill="currentColor"/>
  </svg>
);

const SandboxBanner = ({ onExit }) => (
  <div className="fixed top-0 left-0 right-0 z-[100] bg-[#1a1f36] text-white h-[52px] flex items-center">
    {/* Left section - matches sidebar width (228px) + padding (20px) */}
    <div className="w-[228px] shrink-0 px-5 flex items-center">
      <span className="text-[14px] font-semibold">Sandbox</span>
    </div>
    
    {/* Right section - main content area with matching px-6 padding */}
    <div className="flex-1 flex items-center justify-between px-6">
      {/* Center - Message */}
      <div className="flex-1 flex justify-center">
        <span className="text-[14px] text-white/90">Changes you make here don't affect your live account</span>
      </div>
      
      {/* Right - Exit button */}
      {onExit && (
        <button 
          onClick={onExit}
          className="flex items-center gap-1.5 text-[14px] font-medium text-white hover:text-white/80 transition-colors shrink-0"
        >
<span>Exit sandbox</span>
        <ArrowUpRightIcon />
        </button>
      )}
    </div>
  </div>
);

export default SandboxBanner;
