import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '../../icons/SailIcons';
import flagUS from '../../assets/flag-us.svg';
import flagGB from '../../assets/flag-gb.svg';
import flagEU from '../../assets/flag-eu.svg';

// --- Placeholder bar for wireframe fidelity ---

const Placeholder = ({ w = 64, h = 10, className = '' }) => (
  <span
    className={`inline-block rounded bg-[#D8DEE4] align-middle shrink-0 ${className}`}
    style={{ width: w, height: h }}
  />
);

// --- Shared sub-components (mirrors existing Balances patterns) ---

const flagMap = { USD: flagUS, GBP: flagGB, EUR: flagEU };

const CurrencyPill = ({ code }) => {
  const flagSrc = flagMap[code];
  return (
    <div className="h-[48px] flex flex-col items-start justify-center px-2 bg-white/60 rounded-md text-[12px] gap-1.5">
      <div className="flex items-center gap-1">
        {flagSrc ? <img src={flagSrc} alt="" className="w-4 h-4" /> : null}
        <span className="text-[#353a44] font-medium">{code}</span>
      </div>
      <Placeholder w={52} h={8} />
    </div>
  );
};

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="7" width="10" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <path d="M5 7V5C5 3.34315 6.34315 2 8 2C9.65685 2 11 3.34315 11 5V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ActionButton = ({ iconName, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 px-3 py-[6px] bg-[#f5f6f8] rounded-full text-[14px] font-semibold text-[#353a44] hover:bg-[#e8eaed] transition-colors tracking-[-0.15px]"
  >
    <Icon name={iconName} size="small" fill="#474E5A" />
    <span>{label}</span>
  </button>
);

// --- Actor badges (the core new concept) ---

const HumanAvatar = () => (
  <div className="w-5 h-5 rounded-full bg-[#E3E8EE] flex items-center justify-center shrink-0">
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6" cy="3.5" r="2" stroke="#596171" strokeWidth="1.2" />
      <path d="M2 10.5C2 8.84315 3.79086 7.5 6 7.5C8.20914 7.5 10 8.84315 10 10.5" stroke="#596171" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  </div>
);

const AgentAvatar = () => (
  <div className="w-5 h-5 rounded-full bg-[#EFECFC] flex items-center justify-center shrink-0">
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 1L7.5 4.5L11 6L7.5 7.5L6 11L4.5 7.5L1 6L4.5 4.5L6 1Z" fill="#7A5AF8" />
    </svg>
  </div>
);

const ActorBadge = ({ actor }) => {
  if (actor.type === 'agent') {
    return (
      <div className="flex items-center gap-1.5">
        <AgentAvatar />
        <span className="text-[12px] font-medium text-[#7A5AF8]">{actor.name}</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1.5">
      <HumanAvatar />
      <span className="text-[12px] font-medium text-[#596171]">You</span>
    </div>
  );
};

// --- Status badge ---

const StatusBadge = ({ status }) => {
  const styles = {
    'In transit': 'text-yellow-700 bg-yellow-50 border-yellow-200',
    Paid: 'text-green-700 bg-green-50 border-green-200',
    'Needs approval': 'text-[#7A5AF8] bg-[#F4F0FF] border-[#D9D0FE]',
    Declined: 'text-red-700 bg-red-50 border-red-200',
  };
  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 text-xs font-medium rounded-sm border ${styles[status] || 'text-gray-600 bg-gray-50 border-gray-200'}`}
    >
      {status}
    </span>
  );
};

// --- Pending approvals banner ---

const pendingApprovals = [
  {
    id: 1,
    amount: '$2,400.00',
    description: { from: 'Financial account', to: 'Gusto Payroll' },
    agent: 'Payroll Agent',
    reason: 'Monthly payroll run for 3 contractors, due Oct 1',
    requestedAt: '2 hours ago',
  },
  {
    id: 2,
    amount: '$849.99',
    description: { from: 'Financial account', to: 'AWS' },
    agent: 'Expense Agent',
    reason: 'Annual reserved instance renewal — saves $2,100 vs on-demand',
    requestedAt: '4 hours ago',
  },
];

const ApprovalCard = ({ item, onApprove, onDecline }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white border border-[#D9D0FE] rounded-lg p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <AgentAvatar />
            <span className="text-[13px] font-semibold text-[#353a44]">{item.agent}</span>
            <Placeholder w={48} h={8} />
          </div>
          <div className="flex items-center gap-1.5 mb-1">
            <Placeholder w={72} h={12} />
            <Placeholder w={96} h={10} />
            <ArrowRightIcon />
            <Placeholder w={64} h={10} />
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-[12px] text-[#7A5AF8] hover:underline flex items-center gap-1"
          >
            {expanded ? 'Hide reasoning' : 'View reasoning'}
            <svg
              width="8"
              height="8"
              viewBox="0 0 16 16"
              fill="none"
              className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.381282 4.38128C0.72299 4.03957 1.27701 4.03957 1.61872 4.38128L8 10.7626L14.3813 4.38128C14.723 4.03957 15.277 4.03957 15.6187 4.38128C15.9604 4.72299 15.9604 5.27701 15.6187 5.61872L8.61872 12.6187C8.27701 12.9604 7.72299 12.9604 7.38128 12.6187L0.381282 5.61872C0.0395728 5.27701 0.0395728 4.72299 0.381282 4.38128Z"
                fill="currentColor"
              />
            </svg>
          </button>
          {expanded && (
            <div className="mt-2 bg-[#F9F8FF] rounded-md p-2.5 flex flex-col gap-1.5">
              <Placeholder w={200} h={8} />
              <Placeholder w={160} h={8} />
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0 pt-0.5">
          <button
            onClick={() => onDecline(item.id)}
            className="px-3 py-1.5 text-[13px] font-medium text-[#353a44] border border-[#d8dee4] rounded-md hover:bg-[#f5f6f8] transition-colors"
          >
            Decline
          </button>
          <button
            onClick={() => onApprove(item.id)}
            className="px-3 py-1.5 text-[13px] font-medium text-white bg-[#635bff] rounded-md hover:bg-[#5851ea] transition-colors shadow-[0_1px_1px_rgba(47,14,99,0.32)]"
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
};

const PendingApprovalsSection = ({ approvals, onApprove, onDecline }) => {
  if (!approvals.length) return null;

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#7A5AF8] animate-pulse" />
          <h2 className="text-[14px] font-semibold text-[#353a44]">
            Pending approval
          </h2>
        </div>
        <span className="text-[12px] font-medium text-[#7A5AF8] bg-[#F4F0FF] px-1.5 py-0.5 rounded-full">
          {approvals.length}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {approvals.map((item) => (
          <ApprovalCard
            key={item.id}
            item={item}
            onApprove={onApprove}
            onDecline={onDecline}
          />
        ))}
      </div>
    </div>
  );
};

// --- Balance card with agent summary ---

const BalanceCard = ({ title, subtitle, currencies, actions, hasLock, gradient, agentSummary }) => (
  <div className={`w-[229px] rounded-xl p-4 flex flex-col ${gradient}`}>
    <div className="h-[72px] mb-4">
      <div className="flex items-start justify-between mb-1">
        <h3 className="text-[13px] font-medium text-[#353a44]">{title}</h3>
        {hasLock && (
          <div className="w-[30px] h-[30px] rounded-full bg-white flex items-center justify-center">
            <LockIcon />
          </div>
        )}
      </div>
      <div className="mb-1.5 mt-1"><Placeholder w={110} h={16} /></div>
      {subtitle && <Placeholder w={80} h={8} />}
    </div>
    {currencies && (
      <div className="grid grid-cols-2 gap-1.5 mb-3">
        {currencies.map((currency, index) => (
          <CurrencyPill key={index} {...currency} />
        ))}
      </div>
    )}
    {agentSummary && (
      <div className="flex items-center gap-1.5 mb-2 px-1">
        <AgentAvatar />
        <span className="text-[11px] text-[#7A5AF8] font-medium">{agentSummary}</span>
      </div>
    )}
    {actions && (
      <div className="flex gap-2 mt-auto pt-2">
        {actions.map((action, index) => (
          <button
            key={index}
            className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-black/5 text-[#596171] transition-colors"
          >
            {action}
          </button>
        ))}
      </div>
    )}
  </div>
);

// --- Activity table with actor attribution & filter ---

const activityData = [
  {
    amount: '$2,400.00',
    status: 'Needs approval',
    description: { from: 'Financial account', to: 'Gusto Payroll' },
    date: 'Sep 27',
    actor: { type: 'agent', name: 'Payroll Agent' },
    reason: 'Monthly payroll run for 3 contractors',
  },
  {
    amount: '$849.99',
    status: 'Needs approval',
    description: { from: 'Financial account', to: 'AWS' },
    date: 'Sep 27',
    actor: { type: 'agent', name: 'Expense Agent' },
    reason: 'Annual reserved instance renewal',
  },
  {
    amount: '$44,792.05',
    status: 'In transit',
    description: { from: 'Payments balance', to: 'Wells Fargo Bank' },
    date: 'Sep 26',
    actor: { type: 'human', name: 'You' },
  },
  {
    amount: '$312.50',
    status: 'Paid',
    description: { from: 'Financial account', to: 'Figma' },
    date: 'Sep 26',
    actor: { type: 'agent', name: 'Expense Agent' },
    reason: 'Monthly Figma subscription — auto-approved (under $500 limit)',
  },
  {
    amount: '$51,802.50',
    status: 'Paid',
    description: { from: 'Payments balance', to: 'Wells Fargo Bank' },
    date: 'Sep 25',
    actor: { type: 'human', name: 'You' },
  },
  {
    amount: '$189.00',
    status: 'Paid',
    description: { from: 'Financial account', to: 'Linear' },
    date: 'Sep 25',
    actor: { type: 'agent', name: 'Expense Agent' },
    reason: 'Monthly Linear subscription — auto-approved (under $500 limit)',
  },
  {
    amount: '$81,771.20',
    status: 'Paid',
    description: { from: 'Payments balance', to: 'Wells Fargo Bank' },
    date: 'Sep 24',
    actor: { type: 'human', name: 'You' },
  },
  {
    amount: '$4,200.00',
    status: 'Paid',
    description: { from: 'Financial account', to: 'Vercel' },
    date: 'Sep 24',
    actor: { type: 'agent', name: 'Expense Agent' },
    reason: 'Quarterly Vercel Enterprise — approved by you Sep 23',
  },
];

const ActivityRow = ({ status, actor, reason }) => {
  const [showReason, setShowReason] = useState(false);

  return (
    <>
      <tr className="border-b border-[#e3e8ee] last:border-b-0 h-[40px] group">
        <td className="py-2 pr-3 w-[40px]">
          <ActorBadge actor={actor} />
        </td>
        <td className="py-2 pr-4">
          <div className="flex items-center gap-2">
            <Placeholder w={72} h={12} />
            <StatusBadge status={status} />
          </div>
        </td>
        <td className="py-2 pr-4">
          <div className="flex items-center gap-1.5">
            <Placeholder w={96} h={10} />
            <ArrowRightIcon />
            <Placeholder w={72} h={10} />
          </div>
        </td>
        <td className="py-2 pr-4"><Placeholder w={40} h={10} /></td>
        <td className="py-2 text-right w-[80px]">
          {actor.type === 'agent' && reason && (
            <button
              onClick={() => setShowReason(!showReason)}
              className="text-[12px] text-[#7A5AF8] hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {showReason ? 'Hide' : 'Why?'}
            </button>
          )}
        </td>
      </tr>
      {showReason && reason && (
        <tr className="border-b border-[#e3e8ee]">
          <td colSpan={5} className="pb-3 pt-0 pl-[52px]">
            <div className="bg-[#F9F8FF] rounded-md px-2.5 py-2 inline-flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5">
                <span className="text-[12px] text-[#7A5AF8] font-medium">{actor.name}:</span>
                <Placeholder w={180} h={8} />
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

// --- Upcoming section with agent-queued items ---

const upcomingData = [
  {
    month: 'SEP',
    day: '29',
    amount: '$39,997.37',
    description: 'Incoming → Payments balance',
    actor: null,
  },
  {
    month: 'SEP',
    day: '30',
    amount: '$44,792.05',
    description: 'Payments balance → Wells Fargo',
    actor: null,
  },
  {
    month: 'OCT',
    day: '01',
    amount: '$2,400.00',
    description: 'Financial account → Gusto Payroll',
    actor: { type: 'agent', name: 'Payroll Agent' },
  },
  {
    month: 'OCT',
    day: '03',
    amount: '$1,249.00',
    description: 'Financial account → Notion',
    actor: { type: 'agent', name: 'Expense Agent' },
  },
];

const UpcomingItem = ({ actor }) => (
  <div className={`flex bg-white border rounded-lg overflow-hidden ${actor?.type === 'agent' ? 'border-[#D9D0FE]' : 'border-[#d8dee4]'}`}>
    <div className={`flex flex-col items-center justify-center w-14 py-3 gap-1 ${actor?.type === 'agent' ? 'bg-[#F4F0FF]' : 'bg-[#EFECFC]'}`}>
      <Placeholder w={24} h={8} />
      <Placeholder w={18} h={14} />
    </div>
    <div className="flex-1 p-3">
      <div className="flex items-center gap-2 mb-1.5">
        <Placeholder w={72} h={12} />
        {actor?.type === 'agent' && (
          <span className="text-[10px] font-medium text-[#7A5AF8] bg-[#F4F0FF] px-1.5 py-0.5 rounded-full">
            Queued
          </span>
        )}
      </div>
      <Placeholder w={120} h={8} />
      {actor && (
        <div className="flex items-center gap-1 mt-1.5">
          <AgentAvatar />
          <span className="text-[11px] text-[#7A5AF8] font-medium">{actor.name}</span>
        </div>
      )}
    </div>
  </div>
);

// --- Create Card chooser popover ---

const CreateCardChooser = ({ anchorRef, isOpen, onClose, onCreateCard, onSetupProgram }) => {
  const popoverRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (
        popoverRef.current && !popoverRef.current.contains(e.target) &&
        anchorRef.current && !anchorRef.current.contains(e.target)
      ) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose, anchorRef]);

  if (!isOpen || !anchorRef.current) return null;

  const rect = anchorRef.current.getBoundingClientRect();

  return createPortal(
    <div
      ref={popoverRef}
      className="fixed z-50 w-[360px] bg-white rounded-xl shadow-[0px_8px_32px_rgba(0,0,0,0.12),0px_1px_4px_rgba(0,0,0,0.08)] border border-[#e3e8ee] overflow-hidden"
      style={{ top: rect.bottom + 8, left: rect.left }}
    >
      <div className="p-1.5">
        {/* Option 1: Create a card */}
        <button
          onClick={() => { onCreateCard(); onClose(); }}
          className="w-full text-left rounded-lg p-3 hover:bg-[#f5f6f8] transition-colors group"
        >
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#F0F4FF] flex items-center justify-center shrink-0 mt-0.5">
              <Icon name="createCards" size="small" fill="#474E5A" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[14px] font-semibold text-[#353a44] mb-0.5">Create a card</div>
              <div className="text-[13px] text-[#596171] leading-[18px]">
                Create a virtual card to spend from your financial account balance. No setup required.
              </div>
            </div>
            <div className="flex items-center shrink-0 text-[#6c7688] opacity-0 group-hover:opacity-100 transition-opacity">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        </button>

        <div className="mx-3 border-t border-[#e3e8ee]" />

        {/* Option 2: Set up a card program */}
        <button
          onClick={() => { onSetupProgram(); onClose(); }}
          className="w-full text-left rounded-lg p-3 hover:bg-[#f5f6f8] transition-colors group"
        >
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#F4F0FF] flex items-center justify-center shrink-0 mt-0.5">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1.5" y="3.5" width="13" height="9" rx="1" stroke="#7A5AF8" strokeWidth="1.5"/>
                <path d="M1.5 6.5H14.5" stroke="#7A5AF8" strokeWidth="1.5"/>
                <path d="M11 10.5H12.5" stroke="#7A5AF8" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[14px] font-semibold text-[#353a44]">Set up a card program</span>
                <span className="text-[10px] font-semibold text-[#7A5AF8] bg-[#F4F0FF] px-1.5 py-0.5 rounded-full uppercase tracking-wide">API</span>
              </div>
              <div className="text-[13px] text-[#596171] leading-[18px]">
                Issue cards programmatically to your team and agents using the Stripe Issuing API.
              </div>
            </div>
            <div className="flex items-center shrink-0 text-[#6c7688] opacity-0 group-hover:opacity-100 transition-opacity">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        </button>
      </div>
    </div>,
    document.body,
  );
};

// --- Simple Create Card dialog ---

const CreateCardDialog = ({ isOpen, onClose, onCreated }) => {
  const [step, setStep] = useState(0);
  const [cardName, setCardName] = useState('');
  const [spendLimit, setSpendLimit] = useState('');
  const [fundingSource, setFundingSource] = useState('financial');
  const [cardType, setCardType] = useState('virtual');

  useEffect(() => {
    if (isOpen) { setStep(0); setCardName(''); setSpendLimit(''); setFundingSource('financial'); setCardType('virtual'); }
  }, [isOpen]);

  if (!isOpen) return null;

  const canCreate = cardName.trim().length > 0;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-[0px_15px_35px_rgba(48,49,61,0.08),0px_5px_15px_rgba(0,0,0,0.12)] w-[480px] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4">
          <h2 className="text-[18px] font-semibold text-[#353a44]">
            {step === 0 ? 'Create a card' : 'Card created'}
          </h2>
          <button onClick={onClose} className="text-[#6c7688] hover:text-[#353a44] transition-colors">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1L11 11M1 11L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </div>

        {step === 0 ? (
          <div className="px-6 pb-6">
            {/* Card type toggle */}
            <div className="mb-5">
              <label className="text-[13px] font-medium text-[#353a44] mb-1.5 block">Card type</label>
              <div className="flex gap-2">
                {[{ key: 'virtual', label: 'Virtual', desc: 'Ready to use instantly' }, { key: 'physical', label: 'Physical', desc: 'Shipped to an address' }].map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setCardType(opt.key)}
                    className={`flex-1 rounded-lg border p-3 text-left transition-colors ${
                      cardType === opt.key ? 'border-[#635bff] bg-[#F9F8FF]' : 'border-[#d8dee4] hover:border-[#b0b8c4]'
                    }`}
                  >
                    <div className="text-[13px] font-semibold text-[#353a44]">{opt.label}</div>
                    <div className="text-[12px] text-[#596171]">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Card name */}
            <div className="mb-4">
              <label className="text-[13px] font-medium text-[#353a44] mb-1.5 block">Card name</label>
              <input
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="e.g. Marketing expenses"
                className="w-full px-3 py-2 border border-[#d8dee4] rounded-md text-[14px] text-[#353a44] placeholder:text-[#a3acba] focus:outline-none focus:border-[#635bff] focus:ring-1 focus:ring-[#635bff] transition-colors"
              />
            </div>

            {/* Funding source */}
            <div className="mb-4">
              <label className="text-[13px] font-medium text-[#353a44] mb-1.5 block">Spend from</label>
              <div className="flex gap-2">
                {[{ key: 'financial', label: 'Financial account' }, { key: 'payments', label: 'Payments balance' }].map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setFundingSource(opt.key)}
                    className={`flex-1 rounded-lg border p-3 text-left transition-colors ${
                      fundingSource === opt.key ? 'border-[#635bff] bg-[#F9F8FF]' : 'border-[#d8dee4] hover:border-[#b0b8c4]'
                    }`}
                  >
                    <div className="text-[13px] font-semibold text-[#353a44] mb-1">{opt.label}</div>
                    <Placeholder w={64} h={8} />
                  </button>
                ))}
              </div>
            </div>

            {/* Spend limit */}
            <div className="mb-6">
              <label className="text-[13px] font-medium text-[#353a44] mb-1.5 block">
                Monthly spend limit <span className="font-normal text-[#6c7688]">(optional)</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-[#6c7688]">$</span>
                <input
                  type="text"
                  value={spendLimit}
                  onChange={(e) => setSpendLimit(e.target.value.replace(/[^0-9.,]/g, ''))}
                  placeholder="No limit"
                  className="w-full pl-7 pr-3 py-2 border border-[#d8dee4] rounded-md text-[14px] text-[#353a44] placeholder:text-[#a3acba] focus:outline-none focus:border-[#635bff] focus:ring-1 focus:ring-[#635bff] transition-colors"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button onClick={onClose} className="flex-1 px-4 py-2.5 text-[14px] font-medium text-[#353a44] border border-[#d8dee4] rounded-md hover:bg-[#f5f6f8] transition-colors">
                Cancel
              </button>
              <button
                onClick={() => setStep(1)}
                disabled={!canCreate}
                className={`flex-1 px-4 py-2.5 text-[14px] font-medium text-white rounded-md transition-colors shadow-[0_1px_1px_rgba(47,14,99,0.32)] ${
                  canCreate ? 'bg-[#635bff] hover:bg-[#5851ea]' : 'bg-[#635bff]/50 cursor-not-allowed'
                }`}
              >
                Create card
              </button>
            </div>
          </div>
        ) : (
          /* Success state */
          <div className="px-6 pb-6">
            <div className="flex flex-col items-center text-center py-4">
              {/* Card visual */}
              <div className="w-[200px] h-[126px] rounded-xl bg-gradient-to-br from-[#635bff] to-[#8b5cf6] p-4 flex flex-col justify-between mb-5 shadow-[0px_8px_24px_rgba(99,91,255,0.3)]">
                <div className="flex justify-between items-start">
                  <div className="text-[10px] font-semibold text-white/80 uppercase tracking-wider">{cardType}</div>
                  <svg width="24" height="16" viewBox="0 0 24 16" fill="none"><rect width="24" height="16" rx="2" fill="white" fillOpacity="0.2"/><circle cx="9" cy="8" r="5" fill="white" fillOpacity="0.6"/><circle cx="15" cy="8" r="5" fill="white" fillOpacity="0.4"/></svg>
                </div>
                <div>
                  <div className="text-[11px] text-white/90 font-medium text-left">{cardName}</div>
                  <div className="mt-1"><span className="inline-block rounded bg-white/30 w-[60px] h-[6px]" /></div>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#22C55E"/><path d="M6 10L9 13L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span className="text-[16px] font-semibold text-[#353a44]">{cardName}</span>
              </div>
              <p className="text-[13px] text-[#596171] mb-1">
                {cardType === 'virtual' ? 'Your virtual card is ready to use.' : 'Your physical card will be shipped shortly.'}
              </p>
              <div className="flex items-center gap-1.5 mb-5">
                <Placeholder w={180} h={8} />
              </div>

              <div className="flex gap-3 w-full">
                <button onClick={() => { onCreated(cardName); onClose(); }} className="flex-1 px-4 py-2.5 text-[14px] font-medium text-white bg-[#635bff] rounded-md hover:bg-[#5851ea] transition-colors shadow-[0_1px_1px_rgba(47,14,99,0.32)]">
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
};

// --- Card Program Setup Modal (placeholder that represents entering the Issuing onboarding) ---

const CardProgramSetupModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-[0px_15px_35px_rgba(48,49,61,0.08),0px_5px_15px_rgba(0,0,0,0.12)] w-[560px] overflow-hidden">
        <div className="flex items-center justify-between px-6 pt-5 pb-4">
          <h2 className="text-[18px] font-semibold text-[#353a44]">Set up a card program</h2>
          <button onClick={onClose} className="text-[#6c7688] hover:text-[#353a44] transition-colors">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1L11 11M1 11L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </div>

        <div className="px-6 pb-6">
          <div className="bg-[#F9F8FF] border border-[#E9E5FF] rounded-xl p-5 mb-5">
            <div className="flex gap-4">
              {/* Illustration placeholder */}
              <div className="w-[100px] h-[80px] rounded-lg bg-gradient-to-br from-[#635bff]/20 to-[#8b5cf6]/20 flex items-center justify-center shrink-0">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <rect x="4" y="10" width="32" height="20" rx="3" stroke="#7A5AF8" strokeWidth="2"/>
                  <path d="M4 16H36" stroke="#7A5AF8" strokeWidth="2"/>
                  <rect x="14" y="4" width="24" height="16" rx="3" fill="white" stroke="#7A5AF8" strokeWidth="1.5"/>
                  <path d="M14 10H38" stroke="#7A5AF8" strokeWidth="1.5"/>
                </svg>
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-[#353a44] mb-1">Issue cards at scale</h3>
                <p className="text-[13px] text-[#596171] leading-5">
                  Use the Stripe Issuing API to create, manage, and distribute cards to your team members and AI agents programmatically.
                </p>
              </div>
            </div>
          </div>

          {/* What you get */}
          <h3 className="text-[14px] font-semibold text-[#353a44] mb-3">What you'll get</h3>
          <div className="flex flex-col gap-3 mb-6">
            {[
              { icon: '🔑', title: 'Issuing API access', desc: 'Create cards, set spend controls, and track transactions via API' },
              { icon: '🤖', title: 'Agent card issuance', desc: 'Programmatically issue cards to AI agents with custom spend rules' },
              { icon: '👥', title: 'Team card management', desc: 'Issue and manage cards for team members with role-based controls' },
              { icon: '📊', title: 'Real-time monitoring', desc: 'Webhooks for authorizations, spend alerts, and fraud detection' },
            ].map((item, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="text-[16px] mt-0.5">{item.icon}</span>
                <div>
                  <div className="text-[13px] font-semibold text-[#353a44]">{item.title}</div>
                  <div className="text-[12px] text-[#596171]">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 px-4 py-2.5 text-[14px] font-medium text-[#353a44] border border-[#d8dee4] rounded-md hover:bg-[#f5f6f8] transition-colors">
              Maybe later
            </button>
            <button onClick={onClose} className="flex-1 px-4 py-2.5 text-[14px] font-medium text-white bg-[#635bff] rounded-md hover:bg-[#5851ea] transition-colors shadow-[0_1px_1px_rgba(47,14,99,0.32)]">
              Get started
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

// --- Card program promotion for sidebar ---

const CardProgramPromo = ({ onSetupProgram, hasCards }) => {
  if (hasCards) return null;

  return (
    <div className="bg-gradient-to-br from-[#F9F8FF] to-[#F0EDFF] border border-[#E9E5FF] rounded-lg p-4 mb-8">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-6 h-6 rounded-md bg-[#635bff] flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <rect x="1.5" y="3.5" width="13" height="9" rx="1" stroke="white" strokeWidth="1.5"/>
            <path d="M1.5 6.5H14.5" stroke="white" strokeWidth="1.5"/>
          </svg>
        </div>
        <span className="text-[10px] font-semibold text-[#7A5AF8] uppercase tracking-wider">Issuing</span>
      </div>
      <h3 className="text-[14px] font-bold text-[#353a44] leading-5 mb-1">Issue cards to your team & agents</h3>
      <p className="text-[12px] text-[#596171] leading-[17px] mb-3">
        Create a card program to issue virtual cards programmatically. Let AI agents make purchases with built-in spend controls.
      </p>
      <button
        onClick={onSetupProgram}
        className="text-[13px] font-semibold text-[#533afd] hover:underline"
      >
        Set up card program →
      </button>
    </div>
  );
};

// --- Shared progress bar ---

const ProgressBar = ({ percent, color = '#635bff' }) => (
  <div className="w-full h-[6px] bg-[#E3E8EE] rounded-full overflow-hidden">
    <div className="h-full rounded-full transition-all" style={{ width: `${percent}%`, backgroundColor: color }} />
  </div>
);

// --- Money flow section (inflow/outflow + controls/limits tracking) ---

const FlowArrow = ({ direction }) => (
  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${direction === 'in' ? 'bg-[#ECFDF5]' : 'bg-[#FEF2F2]'}`}>
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={direction === 'in' ? '' : 'rotate-180'}>
      <path d="M6 9V3M6 3L3.5 5.5M6 3L8.5 5.5" stroke={direction === 'in' ? '#059669' : '#DC2626'} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const MoneyFlowSection = () => (
  <div>
    {/* Inflow / outflow overview */}
    <div className="grid grid-cols-2 gap-4 mb-6">
      {/* Inflow */}
      <div className="border border-[#e3e8ee] rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <FlowArrow direction="in" />
          <span className="text-[13px] font-semibold text-[#353a44]">Inflow</span>
          <Placeholder w={72} h={14} className="ml-auto" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-[12px] text-[#596171]">Payments revenue</span>
            <Placeholder w={56} h={10} />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[12px] text-[#596171]">Top-ups</span>
            <Placeholder w={40} h={10} />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[12px] text-[#596171]">Transfers in</span>
            <Placeholder w={48} h={10} />
          </div>
        </div>
      </div>

      {/* Outflow */}
      <div className="border border-[#e3e8ee] rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <FlowArrow direction="out" />
          <span className="text-[13px] font-semibold text-[#353a44]">Outflow</span>
          <Placeholder w={72} h={14} className="ml-auto" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-[12px] text-[#596171]">Payouts</span>
            <Placeholder w={56} h={10} />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[12px] text-[#596171]">Card spend</span>
            <Placeholder w={44} h={10} />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[12px] text-[#596171]">Transfers out</span>
            <Placeholder w={40} h={10} />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <AgentAvatar />
              <span className="text-[12px] text-[#7A5AF8]">Agent spend</span>
            </div>
            <Placeholder w={40} h={10} />
          </div>
        </div>
      </div>
    </div>

    {/* Spend tracking against limits */}
    <div className="border border-[#e3e8ee] rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[13px] font-semibold text-[#353a44]">Spend tracking</h3>
        <button className="text-[12px] font-medium text-[#533afd] hover:underline">Manage rules</button>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* Overall monthly */}
        <div className="bg-[#f5f6f8] rounded-lg p-3">
          <div className="text-[11px] font-medium text-[#6c7688] uppercase tracking-wider mb-2">Overall monthly</div>
          <div className="flex items-baseline gap-1.5 mb-2">
            <Placeholder w={48} h={14} />
            <span className="text-[11px] text-[#6c7688]">of</span>
            <Placeholder w={48} h={14} />
          </div>
          <ProgressBar percent={62} />
          <div className="text-[11px] text-[#6c7688] mt-1.5">62% of limit</div>
        </div>

        {/* Expense Agent */}
        <div className="bg-[#f5f6f8] rounded-lg p-3">
          <div className="flex items-center gap-1.5 mb-2">
            <AgentAvatar />
            <span className="text-[11px] font-medium text-[#6c7688] uppercase tracking-wider">Expense Agent</span>
          </div>
          <div className="flex items-baseline gap-1.5 mb-2">
            <Placeholder w={48} h={14} />
            <span className="text-[11px] text-[#6c7688]">of</span>
            <Placeholder w={48} h={14} />
          </div>
          <ProgressBar percent={72} color="#F59E0B" />
          <div className="text-[11px] text-[#F59E0B] mt-1.5">72% of limit</div>
        </div>

        {/* Payroll Agent */}
        <div className="bg-[#f5f6f8] rounded-lg p-3">
          <div className="flex items-center gap-1.5 mb-2">
            <AgentAvatar />
            <span className="text-[11px] font-medium text-[#6c7688] uppercase tracking-wider">Payroll Agent</span>
          </div>
          <div className="flex items-baseline gap-1.5 mb-2">
            <Placeholder w={48} h={14} />
            <span className="text-[11px] text-[#6c7688]">of</span>
            <Placeholder w={48} h={14} />
          </div>
          <ProgressBar percent={45} />
          <div className="text-[11px] text-[#6c7688] mt-1.5">45% of limit</div>
        </div>
      </div>

      {/* Compact rules summary */}
      <div className="border-t border-[#e3e8ee] pt-3">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-[11px] font-medium text-[#6c7688]">{rulesData.length} active rules:</span>
          {rulesData.map((rule, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <RuleTypeBadge type={rule.type} />
              <span className="text-[11px] text-[#596171]">{rule.name}</span>
              {rule.percentUsed !== undefined && (
                <span className={`text-[10px] font-medium ${rule.percentUsed > 60 ? 'text-[#F59E0B]' : 'text-[#6c7688]'}`}>
                  ({rule.percentUsed}%)
                </span>
              )}
              {i < rulesData.length - 1 && <span className="text-[#d8dee4]">·</span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// --- Rules & limits content ---

const rulesData = [
  {
    name: 'Expense Agent — monthly limit',
    type: 'Spend limit',
    scope: 'Expense Agent',
    percentUsed: 72,
    status: 'active',
  },
  {
    name: 'Payroll Agent — monthly limit',
    type: 'Spend limit',
    scope: 'Payroll Agent',
    percentUsed: 45,
    status: 'active',
  },
  {
    name: 'Auto-approve threshold',
    type: 'Approval',
    scope: 'All agents',
    description: 'Auto-approve transactions under threshold',
    status: 'active',
  },
  {
    name: 'Daily transaction limit',
    type: 'Velocity',
    scope: 'All agents',
    description: 'Max transactions per agent per day',
    status: 'active',
  },
  {
    name: 'Category restriction',
    type: 'Category',
    scope: 'Expense Agent',
    description: 'SaaS & cloud services only',
    status: 'active',
  },
];

const RuleTypeBadge = ({ type }) => {
  const styles = {
    'Spend limit': 'text-[#0369A1] bg-[#F0F9FF] border-[#BAE6FD]',
    Approval: 'text-[#7A5AF8] bg-[#F4F0FF] border-[#D9D0FE]',
    Velocity: 'text-[#B45309] bg-[#FFFBEB] border-[#FDE68A]',
    Category: 'text-[#059669] bg-[#ECFDF5] border-[#A7F3D0]',
  };
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold rounded border ${styles[type] || 'text-gray-600 bg-gray-50 border-gray-200'}`}>
      {type}
    </span>
  );
};


// --- Main view ---

const BalancesAgentView = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [approvals, setApprovals] = useState(pendingApprovals);
  const [showCreateCardChooser, setShowCreateCardChooser] = useState(false);
  const [showCreateCardDialog, setShowCreateCardDialog] = useState(false);
  const [showCardProgramModal, setShowCardProgramModal] = useState(false);
  const [createdCards, setCreatedCards] = useState([]);
  const createCardButtonRef = useRef(null);

  const handleApprove = (id) => {
    setApprovals((prev) => prev.filter((a) => a.id !== id));
  };

  const handleDecline = (id) => {
    setApprovals((prev) => prev.filter((a) => a.id !== id));
  };

  const filteredActivity = activityData.filter((row) => {
    if (activeTab === 'you') return row.actor.type === 'human';
    if (activeTab === 'agents') return row.actor.type === 'agent';
    return true;
  });

  const agentCount = activityData.filter((r) => r.actor.type === 'agent').length;
  const humanCount = activityData.filter((r) => r.actor.type === 'human').length;

  return (
    <div className="flex-1 bg-white overflow-y-auto">
      <div className="p-8">

        {/* ──────────────────────────────────────────────────────────
            § 1  TOTAL BALANCE
            "How much money do I have in Stripe?"
           ────────────────────────────────────────────────────────── */}
        <div className="mb-6">
          <div className="text-[13px] font-medium text-[#6c7688] mb-1">Total balance</div>
          <div className="flex items-baseline gap-3">
            <Placeholder w={200} h={32} />
            <span className="text-[13px] text-[#6c7688]">across all accounts</span>
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────
            § 2  ACTION BAR
            "What can I do with the money?" (human-oriented)
           ────────────────────────────────────────────────────────── */}
        <div className="flex items-center gap-2 mb-6">
          <ActionButton iconName="convert" label="Transfer" />
          <ActionButton iconName="send" label="Send" />
          <ActionButton iconName="topup" label="Top up" />
          <div className="relative" ref={createCardButtonRef}>
            <ActionButton iconName="createCards" label="Create card" onClick={() => setShowCreateCardChooser(!showCreateCardChooser)} />
          </div>
          <ActionButton iconName="invoice" label="Request" />
          <ActionButton iconName="settings" label="Configure" />
        </div>

        <CreateCardChooser
          anchorRef={createCardButtonRef}
          isOpen={showCreateCardChooser}
          onClose={() => setShowCreateCardChooser(false)}
          onCreateCard={() => setShowCreateCardDialog(true)}
          onSetupProgram={() => setShowCardProgramModal(true)}
        />

        {/* Pending approvals (contextual — surfaces when agents need sign-off) */}
        <PendingApprovalsSection
          approvals={approvals}
          onApprove={handleApprove}
          onDecline={handleDecline}
        />

        {/* ──────────────────────────────────────────────────────────
            § 3  BALANCE CARDS
            "Where is my money stored in Stripe?"
           ────────────────────────────────────────────────────────── */}
        <div className="rounded-2xl p-4 mb-8 bg-[#F5F6F8]">
          <div className="flex gap-3">
            <BalanceCard
              title="Financial account"
              currencies={[
                { code: 'USD' },
                { code: 'GBP' },
              ]}
              actions={[
                <Icon key="transfer" name="convert" size="small" fill="#474E5A" />,
                <Icon key="send" name="send" size="small" fill="#474E5A" />,
                <Icon key="more" name="more" size="small" fill="#474E5A" />,
              ]}
              gradient="bg-white/70"
              agentSummary="4 agent transactions today"
            />
            <BalanceCard
              title="Reserves"
              subtitle
              hasLock
              currencies={[
                { code: 'USD' },
                { code: 'GBP' },
              ]}
              gradient="bg-white/70"
            />
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────
            § 4  MONEY FLOW
            "What's happening to my money at a high level?"
            Inflow vs. outflow + controls/limits tracking
           ────────────────────────────────────────────────────────── */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-semibold text-[#353a44]">Money flow</h2>
            <span className="text-[12px] text-[#6c7688]">This month</span>
          </div>
          <MoneyFlowSection />
        </div>

        {/* ──────────────────────────────────────────────────────────
            § 5  ACTIVITY
            "What are all the specific events with my money?"
            Transaction list + upcoming sidebar
           ────────────────────────────────────────────────────────── */}
        <div className="mb-8">
          <h2 className="text-[16px] font-semibold text-[#353a44] mb-4">Activity</h2>
          <div className="flex gap-8">
            <div className="flex-1">
              <div className="flex gap-4 mb-4 border-b border-[#e3e8ee]">
                {[
                  { key: 'all', label: 'All', count: activityData.length },
                  { key: 'you', label: 'You', count: humanCount },
                  { key: 'agents', label: 'Agents', count: agentCount },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`pb-3 text-[14px] font-medium border-b-2 -mb-px transition-colors flex items-center gap-1.5 ${
                      activeTab === tab.key
                        ? 'text-[#533afd] border-[#533afd]'
                        : 'text-[#596171] border-transparent hover:text-[#353a44]'
                    }`}
                  >
                    {tab.label}
                    <span
                      className={`text-[11px] px-1.5 py-0.5 rounded-full font-medium ${
                        activeTab === tab.key
                          ? 'bg-[#F4F0FF] text-[#7A5AF8]'
                          : 'bg-[#f5f6f8] text-[#6c7688]'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>

              <table className="w-full">
                <thead>
                  <tr className="text-[12px] font-medium text-[#6c7688] uppercase tracking-wider">
                    <th className="text-left pb-3 pr-3">Actor</th>
                    <th className="text-left pb-3 pr-4">Amount</th>
                    <th className="text-left pb-3 pr-4">Description</th>
                    <th className="text-left pb-3 pr-4">Date</th>
                    <th className="text-right pb-3 w-[80px]" />
                  </tr>
                </thead>
                <tbody>
                  {filteredActivity.map((row, index) => (
                    <ActivityRow key={index} {...row} />
                  ))}
                </tbody>
              </table>
              <button className="mt-4 text-[14px] font-medium text-[#533afd] hover:underline">
                View more
              </button>
            </div>

            {/* Upcoming sidebar */}
            <div className="w-[280px] shrink-0">
              <h3 className="text-[13px] font-semibold text-[#353a44] mb-3">Upcoming</h3>
              <div className="flex flex-col gap-3 mb-8">
                {upcomingData.map((item, index) => (
                  <UpcomingItem key={index} {...item} />
                ))}
              </div>

              <CardProgramPromo
                onSetupProgram={() => setShowCardProgramModal(true)}
                hasCards={createdCards.length > 0}
              />

              <h3 className="text-[13px] font-semibold text-[#353a44] mb-3">Resources</h3>
              <div className="flex flex-col gap-2">
                <a href="#" className="text-[13px] font-semibold text-[#533afd] hover:underline">Manage cards</a>
                <a href="#" className="text-[13px] font-semibold text-[#533afd] hover:underline">Manage recipients</a>
                <a href="#" className="text-[13px] font-semibold text-[#533afd] hover:underline">Balance summary report</a>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Dialogs */}
      <CreateCardDialog
        isOpen={showCreateCardDialog}
        onClose={() => setShowCreateCardDialog(false)}
        onCreated={(name) => setCreatedCards((prev) => [...prev, name])}
      />
      <CardProgramSetupModal
        isOpen={showCardProgramModal}
        onClose={() => setShowCardProgramModal(false)}
      />
    </div>
  );
};

export default BalancesAgentView;
