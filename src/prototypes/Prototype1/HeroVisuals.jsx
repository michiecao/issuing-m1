import React from 'react';

const CARD_SVG_URL = new URL('../../assets/issuing-card-hero.svg', import.meta.url).href;
const CARD_NO_SHADOW_SVG_URL = new URL('../../assets/issuing-card-no-shadow.svg', import.meta.url).href;
const PURPLE_SHADOW = 'drop-shadow(0px 20px 100px rgba(83,58,253,0.2)) drop-shadow(0px 20px 35px rgba(83,58,253,0.2)) drop-shadow(0px 5px 15px rgba(83,58,253,0.2))';

const SparkleIcon = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M8 1L9.5 6.5L15 8L9.5 9.5L8 15L6.5 9.5L1 8L6.5 6.5L8 1Z" fill="currentColor" />
  </svg>
);

const AgentAvatar = ({ size = 32 }) => (
  <div
    className="rounded-full flex items-center justify-center shrink-0"
    style={{ width: size, height: size, background: 'linear-gradient(135deg, #635bff 0%, #a259ff 100%)' }}
  >
    <SparkleIcon size={size * 0.5} className="text-white" />
  </div>
);

// Direction 0 — Current (purple card only)
export const CurrentVisual = () => (
  <div className="absolute right-[40px] top-1/2 -translate-y-[calc(50%-10px)]">
    <img
      src={CARD_SVG_URL}
      alt="Issuing card"
      className="w-[520px] h-auto"
      style={{ filter: PURPLE_SHADOW }}
    />
  </div>
);

// Direction 1 — Terminal + Card (rebuilt as JSX)
const TerminalCodeContent = () => (
  <div className="font-mono text-[10.5px] leading-[17px] p-3 pt-2">
    <div className="text-[#9399b2]">// Agent creates a virtual card</div>
    <div>
      <span className="text-[#cba6f7]">const</span>
      <span className="text-[#cdd6f4]"> card </span>
      <span className="text-[#89dceb]">=</span>
      <span className="text-[#cba6f7]"> await</span>
      <span className="text-[#89b4fa]"> stripe</span>
      <span className="text-[#cdd6f4]">.</span>
      <span className="text-[#89b4fa]">issuing</span>
      <span className="text-[#cdd6f4]">.</span>
      <span className="text-[#89b4fa]">cards</span>
      <span className="text-[#cdd6f4]">.</span>
      <span className="text-[#f9e2af]">create</span>
      <span className="text-[#cdd6f4]">{'({'}</span>
    </div>
    <div className="pl-4">
      <span className="text-[#89b4fa]">type</span>
      <span className="text-[#cdd6f4]">: </span>
      <span className="text-[#a6e3a1]">'virtual'</span>
      <span className="text-[#cdd6f4]">,</span>
    </div>
    <div className="pl-4">
      <span className="text-[#89b4fa]">currency</span>
      <span className="text-[#cdd6f4]">: </span>
      <span className="text-[#a6e3a1]">'usd'</span>
      <span className="text-[#cdd6f4]">,</span>
    </div>
    <div className="pl-4">
      <span className="text-[#89b4fa]">spending_controls</span>
      <span className="text-[#cdd6f4]">: {'{'}</span>
    </div>
    <div className="pl-8">
      <span className="text-[#89b4fa]">spending_limits</span>
      <span className="text-[#cdd6f4]">: [{'{'} </span>
      <span className="text-[#89b4fa]">amount</span>
      <span className="text-[#cdd6f4]">: </span>
      <span className="text-[#fab387]">5000</span>
      <span className="text-[#cdd6f4]"> {'}'}]</span>
    </div>
    <div className="pl-4">
      <span className="text-[#cdd6f4]">{'}'}</span>
    </div>
    <div>
      <span className="text-[#cdd6f4]">{'})'}</span>
      <span className="text-[#cdd6f4]">;</span>
    </div>
    <div className="border-t border-[#313244] mt-2.5 pt-2.5">
      <span className="text-[#a6e3a1]">✓</span>
      <span className="text-[#6c7086]"> Card created: </span>
      <span className="text-[#cdd6f4]">ic_1NhMkQ ····4242</span>
    </div>
  </div>
);

export const TerminalVisual = () => (
  <div className="absolute right-[20px] top-1/2 -translate-y-[calc(50%+10px)]">
    <div
      className="relative w-[480px]"
      style={{ filter: 'drop-shadow(0px 4px 12px rgba(0,0,0,0.12)) drop-shadow(0px 16px 40px rgba(0,0,0,0.16))' }}
    >
      {/* Terminal (behind, left-aligned) */}
      <div
        className="w-[290px] h-[200px] rounded-lg border border-[#313244] overflow-hidden"
        style={{ background: '#1e1e2e' }}
      >
        {/* Title bar */}
        <div className="flex items-center gap-1.5 px-3 h-[28px] bg-[#181825] border-b border-[#313244]">
          <div className="w-[9px] h-[9px] rounded-full bg-[#f38ba8]" />
          <div className="w-[9px] h-[9px] rounded-full bg-[#f9e2af]" />
          <div className="w-[9px] h-[9px] rounded-full bg-[#a6e3a1]" />
          <span className="ml-2 text-[10px] font-mono text-[#9399b2]">agent.js</span>
        </div>
        <TerminalCodeContent />
      </div>

      {/* Card (overlaid, bottom-right) */}
      <img
        src={CARD_NO_SHADOW_SVG_URL}
        alt="Issuing card"
        className="absolute -bottom-[140px] -right-[10px] w-[370px] h-auto z-10"
      />
    </div>
  </div>
);

// Direction 2 — Conversation Bubble + Card
export const ConversationVisual = () => (
  <div className="absolute right-[32px] top-1/2 -translate-y-[calc(50%-10px)] w-[460px]">
    {/* Agent bubble */}
    <div className="flex items-start gap-2.5 mb-3">
      <AgentAvatar size={28} />
      <div className="bg-white rounded-xl rounded-tl-sm px-3.5 py-2.5 shadow-sm border border-[#e3e8ee] max-w-[340px]">
        <p className="text-[13px] text-[#353a44] leading-[19px]">
          Creating a virtual card for <span className="font-semibold">Marketing Team</span> with a <span className="font-semibold">$5,000/mo</span> spend limit, restricted to advertising categories...
        </p>
      </div>
    </div>

    {/* Card result */}
    <div className="flex items-start gap-2.5 pl-[38px]">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full bg-[#d1fab3] flex items-center justify-center">
            <svg width="8" height="8" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="#217005" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <span className="text-[11px] text-[#217005] font-medium">Card created successfully</span>
        </div>
        <img
          src={CARD_SVG_URL}
          alt="Issuing card"
          className="w-[360px] h-auto"
          style={{ filter: PURPLE_SHADOW }}
        />
      </div>
    </div>
  </div>
);

// Direction 3 — Multi-Card Cascade with Agent Origin
export const CascadeVisual = () => (
  <div className="absolute right-[40px] top-1/2 -translate-y-[calc(50%-10px)]">
    <div className="relative w-[500px] h-[280px]">
      {/* Agent origin point */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-1.5">
        <AgentAvatar size={40} />
        <span className="text-[10px] font-semibold text-[#635bff] bg-white/90 rounded-full px-2 py-0.5 shadow-sm border border-[#e3e8ee]">Agent</span>
      </div>

      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 500 280" fill="none">
        <path d="M55 140 Q120 60 170 75" stroke="#d8dee4" strokeWidth="1.5" strokeDasharray="4 3" />
        <path d="M55 140 Q120 140 170 135" stroke="#d8dee4" strokeWidth="1.5" strokeDasharray="4 3" />
        <path d="M55 140 Q120 220 170 195" stroke="#d8dee4" strokeWidth="1.5" strokeDasharray="4 3" />
      </svg>

      {/* Stacked cards */}
      <div className="absolute left-[140px] top-[8px] z-[1]">
        <div className="relative">
          <div className="absolute top-[4px] left-[4px] opacity-30 blur-[1px]">
            <img src={CARD_SVG_URL} alt="" className="w-[320px] h-auto" />
          </div>
          <img src={CARD_SVG_URL} alt="" className="w-[320px] h-auto relative" style={{ filter: PURPLE_SHADOW }} />
          <div className="absolute -top-2 -right-2 bg-white rounded-lg px-2 py-1 shadow-sm border border-[#e3e8ee] flex items-center gap-1">
            <span className="text-[10px] font-medium text-[#596171]">Marketing</span>
          </div>
        </div>
      </div>

      <div className="absolute left-[155px] top-[78px] z-[2]">
        <div className="relative">
          <img src={CARD_SVG_URL} alt="" className="w-[320px] h-auto" style={{ filter: PURPLE_SHADOW }} />
          <div className="absolute -top-2 -right-2 bg-white rounded-lg px-2 py-1 shadow-sm border border-[#e3e8ee] flex items-center gap-1">
            <span className="text-[10px] font-medium text-[#596171]">Engineering</span>
          </div>
        </div>
      </div>

      <div className="absolute left-[140px] top-[148px] z-[3]">
        <div className="relative">
          <div className="absolute top-[-4px] left-[-4px] opacity-30 blur-[1px]">
            <img src={CARD_SVG_URL} alt="" className="w-[320px] h-auto" />
          </div>
          <img src={CARD_SVG_URL} alt="" className="w-[320px] h-auto relative" style={{ filter: PURPLE_SHADOW }} />
          <div className="absolute -top-2 -right-2 bg-white rounded-lg px-2 py-1 shadow-sm border border-[#e3e8ee] flex items-center gap-1">
            <span className="text-[10px] font-medium text-[#596171]">Sales</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Direction 4 — Card with Floating Capability Chips
export const ChipsVisual = () => {
  const chips = [
    { label: 'Create cards', icon: '✦', x: -30, y: -65, delay: '0s' },
    { label: 'Set spend limits', icon: '⛨', x: 280, y: -50, delay: '0.2s' },
    { label: 'Monitor transactions', icon: '◎', x: 310, y: 140, delay: '0.4s' },
    { label: 'Freeze on anomaly', icon: '❄', x: -50, y: 125, delay: '0.6s' },
  ];

  return (
    <div className="absolute right-[40px] top-1/2 -translate-y-[calc(50%-10px)]">
      <div className="relative">
        {/* Card */}
        <img
          src={CARD_SVG_URL}
          alt="Issuing card"
          className="w-[420px] h-auto"
          style={{ filter: PURPLE_SHADOW }}
        />

        {/* Agent badge on card */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1 shadow-sm flex items-center gap-1.5">
          <AgentAvatar size={18} />
          <span className="text-[10px] font-semibold text-[#353a44]">Agent-managed</span>
        </div>

        {/* Floating chips */}
        {chips.map((chip, i) => (
          <div
            key={i}
            className="absolute flex items-center gap-1.5 bg-white rounded-full px-3 py-1.5 shadow-md border border-[#e3e8ee] whitespace-nowrap"
            style={{ left: chip.x, top: chip.y }}
          >
            <span className="text-[12px] text-[#635bff]">{chip.icon}</span>
            <span className="text-[11px] font-medium text-[#353a44]">{chip.label}</span>
          </div>
        ))}

        {/* Dotted connector lines (simplified) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ left: -60, top: -70, width: 'calc(100% + 120px)', height: 'calc(100% + 140px)' }}>
          <line x1="95" y1="68" x2="160" y2="95" stroke="#d8dee4" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="390" y1="60" x2="370" y2="95" stroke="#d8dee4" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="395" y1="215" x2="370" y2="195" stroke="#d8dee4" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="80" y1="200" x2="140" y2="185" stroke="#d8dee4" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
      </div>
    </div>
  );
};

// Direction 5 — Card + Miniature Agent Workflow
export const WorkflowVisual = () => {
  const steps = [
    { icon: <AgentAvatar size={36} />, label: 'Agent initiates', sublabel: 'API request' },
    { icon: (
      <div className="w-9 h-9 rounded-xl bg-[#f5f6f8] border border-[#d8dee4] flex items-center justify-center">
        <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M4 8H12M8 4V12" stroke="#596171" strokeWidth="1.5" strokeLinecap="round"/></svg>
      </div>
    ), label: 'Card created', sublabel: 'Virtual ····4242' },
    { icon: (
      <div className="w-9 h-9 rounded-xl bg-[#f5f6f8] border border-[#d8dee4] flex items-center justify-center">
        <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8Z" stroke="#596171" strokeWidth="1.5"/><path d="M5 8L7 10L11 6" stroke="#596171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
    ), label: 'Spend tracked', sublabel: 'Real-time monitoring' },
  ];

  return (
    <div className="absolute right-[24px] top-1/2 -translate-y-[calc(50%-10px)] w-[500px]">
      {/* Workflow nodes */}
      <div className="flex items-center justify-between mb-5 px-2">
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center gap-1.5">
              {step.icon}
              <span className="text-[11px] font-semibold text-[#353a44]">{step.label}</span>
              <span className="text-[10px] text-[#596171]">{step.sublabel}</span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 mx-3 flex items-center">
                <div className="flex-1 border-t-2 border-dashed border-[#d8dee4]" />
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="ml-0.5"><path d="M2 1L6 4L2 7" stroke="#d8dee4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Card below the flow */}
      <div className="flex justify-center">
        <img
          src={CARD_SVG_URL}
          alt="Issuing card"
          className="w-[400px] h-auto"
          style={{ filter: PURPLE_SHADOW }}
        />
      </div>
    </div>
  );
};

// Direction 6 — Card with Code Peek Overlay
export const CodePeekVisual = () => (
  <div className="absolute right-[40px] top-1/2 -translate-y-[calc(50%-10px)]">
    <div className="relative">
      {/* Card */}
      <img
        src={CARD_SVG_URL}
        alt="Issuing card"
        className="w-[480px] h-auto"
        style={{ filter: PURPLE_SHADOW }}
      />

      {/* Code peek overlay */}
      <div className="absolute -bottom-4 -right-4 w-[260px] bg-[#1e1e2e]/95 backdrop-blur-md rounded-xl shadow-xl border border-[#313244] overflow-hidden">
        <div className="flex items-center justify-between px-2.5 py-1.5 bg-[#181825]/80 border-b border-[#313244]">
          <div className="flex items-center gap-1.5">
            <SparkleIcon size={10} className="text-[#cba6f7]" />
            <span className="text-[9px] text-[#6c7086] font-mono">agent-issued</span>
          </div>
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#a6e3a1]" />
          </div>
        </div>
        <div className="px-2.5 py-2 font-mono text-[10px] leading-[16px]">
          <div>
            <span className="text-[#cba6f7]">await</span>
            <span className="text-[#89b4fa]"> stripe</span>
            <span className="text-[#cdd6f4]">.</span>
            <span className="text-[#89b4fa]">issuing</span>
            <span className="text-[#cdd6f4]">.</span>
            <span className="text-[#f9e2af]">cards</span>
            <span className="text-[#cdd6f4]">.</span>
            <span className="text-[#f9e2af]">create</span>
            <span className="text-[#cdd6f4]">({"{"}</span>
          </div>
          <div className="pl-3">
            <span className="text-[#89b4fa]">type</span>
            <span className="text-[#cdd6f4]">: </span>
            <span className="text-[#a6e3a1]">'virtual'</span>
            <span className="text-[#cdd6f4]">,</span>
          </div>
          <div className="pl-3">
            <span className="text-[#89b4fa]">cardholder</span>
            <span className="text-[#cdd6f4]">: </span>
            <span className="text-[#a6e3a1]">'ch_1Nh...'</span>
            <span className="text-[#cdd6f4]">,</span>
          </div>
          <div className="pl-3">
            <span className="text-[#89b4fa]">currency</span>
            <span className="text-[#cdd6f4]">: </span>
            <span className="text-[#a6e3a1]">'usd'</span>
          </div>
          <div><span className="text-[#cdd6f4]">{"}"});</span></div>
          <div className="mt-1.5 pt-1.5 border-t border-[#313244] flex items-center gap-1">
            <span className="text-[#a6e3a1]">✓</span>
            <span className="text-[#6c7086]">ic_1NhMkQ created</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const HERO_VISUAL_OPTIONS = [
  { id: 'current', label: 'Current (card only)' },
  { id: 'terminal', label: '1. Terminal + Card' },
  { id: 'conversation', label: '2. Conversation + Card' },
  { id: 'cascade', label: '3. Multi-Card Cascade' },
  { id: 'chips', label: '4. Card + Capability Chips' },
  { id: 'workflow', label: '5. Agent Workflow' },
  { id: 'codePeek', label: '6. Card + Code Peek' },
];

const HeroVisual = ({ style = 'current' }) => {
  switch (style) {
    case 'terminal': return <TerminalVisual />;
    case 'conversation': return <ConversationVisual />;
    case 'cascade': return <CascadeVisual />;
    case 'chips': return <ChipsVisual />;
    case 'workflow': return <WorkflowVisual />;
    case 'codePeek': return <CodePeekVisual />;
    default: return <CurrentVisual />;
  }
};

export default HeroVisual;
