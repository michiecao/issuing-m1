import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon } from '../../components/icons';
import stripeIssuingLanding from '../../assets/stripe-issuing-landing.png';
import stripeTreasuryLanding from '../../assets/stripe-treasury-landing.png';
import galteeBalances from '../../assets/galtee-balances.png';
import issuingLandingView from '../../assets/issuing-landing-view.png';
import galteePrimaryNav from '../../assets/galtee-primary-nav.png';
import flowChartUrl from '../../assets/flow-chart.svg';

// ─── Slide 1: Card Programs Comparison ───────────────────────────────────────

const PURPLE      = '#635bff';
const PURPLE_DARK = '#4c40cc';
const PURPLE_MID  = '#7c75ff';

const MiniCard = ({ gradient, network, light = false, tbd = false }) => {
  if (tbd) return (
    <div
      className="flex items-center justify-center overflow-hidden shrink-0"
      style={{ width: 84, height: 53, borderRadius: 5, background: '#f1f3f5', border: '1.5px dashed #d1d5db' }}
    />
  );
  return (
    <div
      className="p-2 flex flex-col justify-between overflow-hidden shrink-0"
      style={{
        background: gradient,
        width: 84, height: 53,
        borderRadius: 5,
        border: light ? '1px solid #e2e8f0' : 'none',
      }}
    >
      <div className="flex justify-between items-start">
        <div className="w-3 h-2 rounded-sm" style={{ background: 'rgba(255,255,255,0.4)' }} />
        <span style={{ fontSize: 5, fontWeight: 700, color: light ? '#94a3b8' : 'rgba(255,255,255,0.5)', letterSpacing: 1 }}>STRIPE</span>
      </div>
      <div className="flex justify-end">
        <span style={{ fontSize: 6, fontWeight: 700, color: light ? '#94a3b8' : 'rgba(255,255,255,0.7)' }}>{network}</span>
      </div>
    </div>
  );
};

const cardDesigns = [
  { gradient: 'linear-gradient(135deg, #635bff 0%, #8b5cf6 100%)', network: 'MC' },
  { gradient: 'linear-gradient(135deg, #c8d6e5 0%, #e2eaf4 100%)', network: 'MC', light: true },
  { tbd: true },
  { gradient: 'linear-gradient(135deg, #f0f4f8 0%, #e8edf2 100%)', network: 'VISA', light: true },
  { gradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', network: 'VISA' },
];

const tableRows = [
  {
    label: 'JTBD',
    cells: [
      "I'm able to equip myself and my employees or contractors to make purchases on the company's behalf for every day expenses I have liquidity to cover.",
      "I'm able to equip myself and my employees or contractors to make purchases on the company's behalf for larger expenses where I'd like more time to pay back.",
      null,
      "I'm able to use my card for transactional purposes which supports daily operations for my business, to fulfill a service for my customers.",
      "I'm able to use my card for transactional purposes which supports daily operations for my business, to fulfill a service for my customers.",
    ],
  },
  {
    label: 'Need',
    cells: [
      "I want to get a card(s) from stripe to handle business expense management",
      "I want to get a card(s) from stripe to handle business expense management",
      null,
      "I want to create / build a card issuing program for my business",
      "I want to create / build a card issuing program for my business",
    ],
  },
  {
    label: 'Use case(s)',
    cells: [
      'Corporate Expense Management',
      'Corporate Expense Management',
      'Corporate Expense Management',
      'B2B Payments\nOn-Demand Services\nBNPL\nFleet\nContractor Purchase Card',
      'B2B Payments\nOn-Demand Services\nBNPL\nFleet\nContractor Purchase Card',
    ],
  },
  {
    label: 'Region',
    cells: ['Global', 'Global (US to start)', null, 'Global', 'Global'],
  },
  {
    label: 'Financial Account\nStorage',
    cells: ['Global Fiat + USDC', 'Global Fiat + USDC\n(USD to start)', null, 'Global Fiat + USDC', 'Global Fiat + USDC'],
  },
  {
    label: 'Value propositions',
    cells: [
      'Dashboard\n2% Cashback on all spend\nMetal card',
      'Dashboard\nX% Cashback on all spend\nMetal card',
      null,
      'Dashboard\nX Rev Share',
      'Dashboard\nX Rev Share',
    ],
  },
  { label: 'Pricing',     cells: ['Free', 'XX', null, 'Commercial Terms', 'Commercial Terms'] },
  { label: 'Provided',    cells: ['Primary + Default', 'Apply', null, 'Apply', 'Apply'] },
  { label: 'BIN Sponsor', cells: ['Agnostic', 'Agnostic', null, 'Agnostic', 'Agnostic'] },
  {
    label: 'BIN',
    cells: ['Shared Commercial Debit', 'Shared Commercial Debit', null, 'Shared or Dedicated\nCommercial Debit', 'Shared or Dedicated\nCommercial Debit'],
  },
  { label: 'Network',     cells: ['Mastercard', 'Mastercard', null, 'Mastercard or Visa', 'Mastercard or Visa'] },
  {
    label: 'Risk & Limits',
    cells: ['100 cards\n2 cards per cardholder', 'XX cards\nXX cards per cardholder', null, 'Unlimited cards,\ncardholders etc', 'Unlimited cards,\ncardholders etc'],
  },
  {
    label: 'Access & Control',
    cells: ['Financial Account APIs', 'Financial Account APIs', null, 'Financial Account APIs\nIssuing APIs', 'Financial Account APIs\nIssuing APIs'],
  },
];

const Td = ({ children, center = false }) => (
  <td className={`border border-gray-200 px-2 py-1.5 text-[10px] leading-snug align-top text-gray-700 ${center ? 'text-center' : ''}`} style={{ whiteSpace: 'pre-line' }}>
    {children ?? <span className="text-gray-400">TBD</span>}
  </td>
);

const Th = ({ children, colSpan, bg = PURPLE, textColor = 'white' }) => (
  <th
    colSpan={colSpan}
    className="px-2 py-1.5 text-[10px] font-semibold text-center border border-gray-200"
    style={{ background: bg, color: textColor }}
  >
    {children}
  </th>
);

const bankCards = ['Standard Debit Card', 'Standard Charge Card', 'Standard Credit Card (TBD)'];
const infraCards = ['Premium Debit Card', 'Premium Spend Card'];

const bankCardDesigns = [
  { gradient: 'linear-gradient(135deg, #635bff 0%, #8b5cf6 100%)', network: 'MC' },
  { gradient: 'linear-gradient(135deg, #c8d6e5 0%, #e2eaf4 100%)', network: 'MC', light: true },
  { tbd: true },
];

const infraCardDesigns = [
  { gradient: 'linear-gradient(135deg, #f0f4f8 0%, #e8edf2 100%)', network: 'VISA', light: true },
  { gradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', network: 'VISA' },
];

const CardGroup = ({ title, description, cards, designs }) => (
  <div className="flex flex-col gap-4">
    <div className="flex flex-col gap-1">
      <div className="text-lg text-gray-800">{title}</div>
      {description && <div className="text-[11px] text-gray-500 leading-snug">{description}</div>}
    </div>
    <div className="flex flex-col gap-2">
      {cards.map((name, i) => (
        <div key={name} className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-gray-200">
          <MiniCard {...designs[i]} />
          <span className="text-[11px] text-gray-700 leading-snug">{name}</span>
        </div>
      ))}
    </div>
  </div>
);

const Slide1 = () => (
  <div className="flex gap-16 w-full items-start">
    {/* Left: title */}
    <div className="w-72 shrink-0">
      <h1 className="text-3xl font-light" style={{ lineHeight: '36px', color: '#353a44' }}>
        Stripe Issuing offers multiple card programs, each built for a different way businesses use cards
      </h1>
    </div>

    {/* Right: two card groups stacked */}
    <div className="flex flex-col gap-8">
      <CardGroup title="Stripe as your bank" description="I want to get a card(s) from Stripe to handle business expense management." cards={bankCards} designs={bankCardDesigns} />
      <CardGroup title="Stripe as your infrastructure" description="I want to create / build a card issuing program for my business." cards={infraCards} designs={infraCardDesigns} />
    </div>
  </div>
);

// ─── Slide 2 & 3: Challenge slides ───────────────────────────────────────────

const MiniBrowser = ({ url, children }) => (
  <div className="overflow-hidden rounded-xl shadow-xl border border-gray-200">
    <div className="flex items-center gap-2 px-3 py-1.5 border-b border-gray-200" style={{ background: '#f1f3f4' }}>
      <div className="flex gap-1 shrink-0">
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f57' }} />
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ffbd2e' }} />
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#28c840' }} />
      </div>
      <div className="flex-1 bg-white rounded px-2 py-0.5 font-mono border border-gray-200 truncate"
        style={{ fontSize: 9, color: '#9ca3af' }}>
        {url}
      </div>
    </div>
    <div className="bg-white">{children}</div>
  </div>
);

const DashSidebarItem = ({ label, active, indent }) => (
  <div className="flex items-center gap-1.5 rounded px-1 py-0.5"
    style={{ fontSize: 8, color: active ? '#635bff' : '#6b7280', paddingLeft: indent ? 16 : 4, fontWeight: active ? 600 : 400 }}>
    {!indent && <div className="w-2 h-2 rounded-sm shrink-0" style={{ background: '#e5e7eb' }} />}
    <span className="truncate">{label}</span>
  </div>
);

const MiniDash = ({ accountName, activeNav, children }) => (
  <div className="flex" style={{ minHeight: 260 }}>
    <div className="shrink-0 border-r border-gray-100 py-2 flex flex-col" style={{ width: 100 }}>
      <div className="flex items-center gap-1.5 px-2 pb-2 mb-1 border-b border-gray-100">
        <div className="w-3 h-3 rounded shrink-0" style={{ background: 'linear-gradient(135deg, #675dff, #ec4899)' }} />
        <span className="text-gray-700 font-semibold truncate" style={{ fontSize: 8 }}>{accountName}</span>
      </div>
      <div className="flex flex-col gap-0.5 px-1">
        <DashSidebarItem label="Home" />
        <DashSidebarItem label="Balances" active={activeNav === 'balances'} />
        <DashSidebarItem label="Transactions" />
        <DashSidebarItem label="Customers" />
        <div style={{ fontSize: 7, color: '#9ca3af', padding: '4px 4px 2px' }}>Products</div>
        <DashSidebarItem label="Treasury" />
        <DashSidebarItem label="Payments" />
        <DashSidebarItem label="Billing" />
        <DashSidebarItem label="Reporting" />
        <DashSidebarItem label="More" />
        <DashSidebarItem label="Issuing" indent active={activeNav === 'issuing'} />
      </div>
    </div>
    <div className="flex-1 overflow-hidden">{children}</div>
  </div>
);

const TOGGLE_TABS = [
  { key: 'issuing', label: 'Issuing site', src: stripeIssuingLanding, caption: 'The cards being marketed here are the Premium Debit and Spend Cards.' },
  { key: 'treasury', label: 'Treasury site', src: stripeTreasuryLanding, caption: 'The card being marketed here is the Standard Debit Card.' },
];

const Slide2 = () => {
  const [activeTab, setActiveTab] = useState('issuing');
  const tab = TOGGLE_TABS.find(t => t.key === activeTab);

  return (
    <div className="flex gap-16 w-full items-start">
      <div className="w-72 shrink-0">
        <h1 className="text-3xl font-light" style={{ lineHeight: '36px', color: '#353a44' }}>
          We market these in different ways on different surfaces, but users are seeing these and getting confused.
        </h1>
      </div>

      <div className="flex-1 flex flex-col gap-5">
        {/* Toggle */}
        <div className="flex items-center gap-1 p-1 rounded-lg self-start" style={{ background: '#e9eaec' }}>
          {TOGGLE_TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className="px-3 py-1 rounded-md text-sm font-medium transition-all"
              style={{
                background: activeTab === t.key ? '#fff' : 'transparent',
                color: activeTab === t.key ? '#111827' : '#6b7280',
                boxShadow: activeTab === t.key ? '0 1px 3px rgba(0,0,0,0.12)' : 'none',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Caption */}
        {tab.caption && (
          <p className="text-xs text-gray-500 leading-relaxed">{tab.caption}</p>
        )}

        {/* Screenshot in browser chrome */}
        <MiniBrowser url={tab.key === 'issuing' ? 'stripe.com/issuing' : 'stripe.com/treasury'}>
          <img
            src={tab.src}
            alt={tab.label}
            className="w-full block"
            style={{ maxHeight: 480, objectFit: 'cover', objectPosition: 'top' }}
          />
        </MiniBrowser>
      </div>
    </div>
  );
};

const ICON_SIZE = 16;
const ICON_GAP = 8;

const NavRow = ({ label, active, chevron, chevronDown, indent, noIcon, activeTab }) => {
  const isActive = active === activeTab;
  const indentPx = noIcon ? (4 + ICON_SIZE + ICON_GAP) : (indent ? 20 : 4);
  return (
    <div className="flex items-center py-1.5 rounded" style={{ paddingLeft: indentPx, gap: ICON_GAP }}>
      {!indent && !noIcon && <div className="shrink-0" style={{ width: ICON_SIZE, height: ICON_SIZE, borderRadius: 3, background: isActive ? '#635bff' : '#edf0f2' }} />}
      {label
        ? <span style={{ color: isActive ? '#635bff' : '#9ca3af', fontWeight: isActive ? 500 : 400, fontSize: 12 }}>{label}</span>
        : <div style={{ height: 7, borderRadius: 3, background: '#edf0f2', width: `${indent ? 44 : 52}%` }} />
      }
      {(chevron || chevronDown) && (
        <span style={{ fontSize: 8, color: '#c8cdd4', marginLeft: 'auto' }}>{chevronDown ? '˅' : '˄'}</span>
      )}
    </div>
  );
};

const MockNav = ({ activeTab }) => (
  <div className="flex flex-col bg-white rounded-xl border border-gray-200 shadow-lg py-3 px-3" style={{ width: 220 }}>
    {/* Account name */}
    <div className="flex items-center pb-2.5 mb-1 px-1" style={{ gap: ICON_GAP }}>
      <div className="shrink-0" style={{ width: ICON_SIZE, height: ICON_SIZE, background: '#edf0f2', borderRadius: 3 }} />
      <span style={{ fontSize: 12, fontWeight: 400, color: '#9ca3af' }}>Galtee Insurance</span>
    </div>

    {/* Top nav items */}
    <div className="flex flex-col gap-0.5 mb-2">
      <NavRow activeTab={activeTab} />
      <NavRow label="Balances" active="balances" activeTab={activeTab} />
      <NavRow activeTab={activeTab} />
      <NavRow activeTab={activeTab} />
    </div>

    {/* Products section */}
    <div className="px-1 mb-1" style={{ fontSize: 12, color: '#9ca3af' }}>Products</div>
    <div className="flex flex-col gap-0.5">
      <NavRow chevron activeTab={activeTab} />
      <NavRow label="More" chevronDown activeTab={activeTab} />
      <NavRow label="Issuing" active="issuing" noIcon activeTab={activeTab} />
    </div>
  </div>
);

const DASH_TABS = [
  {
    key: 'balances',
    label: 'Balances tab',
    url: 'dashboard.stripe.com/balances',
    src: galteeBalances,
    caption: 'The Balances tab implicitly onboards users onto the Standard debit card. Since financial accounts are expected to roll out to everyone, most users will encounter this path first.',
  },
  {
    key: 'issuing',
    label: 'Issuing tab',
    url: 'dashboard.stripe.com/issuing',
    src: issuingLandingView,
    caption: 'Issuing routes users to the right card program, but only if they already know to look here, not Treasury or Cards.',
  },
];

const Slide3 = () => {
  const [activeTab, setActiveTab] = useState('balances');
  const tab = DASH_TABS.find(t => t.key === activeTab);

  return (
    <div className="flex gap-16 w-full items-start">
      <div className="w-72 shrink-0 flex flex-col justify-between" style={{ alignSelf: 'stretch' }}>
        <h1 className="text-3xl font-light" style={{ lineHeight: '36px', color: '#353a44' }}>
          Businesses can't specify which type of card they need or get onboarded to it directly.
        </h1>
        <MockNav activeTab={activeTab} />
      </div>

      <div className="flex-1 flex flex-col gap-5">
          <div className="flex items-center gap-1 p-1 rounded-lg self-start" style={{ background: '#e9eaec' }}>
            {DASH_TABS.map(t => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className="px-3 py-1 rounded-md text-sm font-medium transition-all"
                style={{
                  background: activeTab === t.key ? '#fff' : 'transparent',
                  color: activeTab === t.key ? '#111827' : '#6b7280',
                  boxShadow: activeTab === t.key ? '0 1px 3px rgba(0,0,0,0.12)' : 'none',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          <p className="text-xs text-gray-500 leading-relaxed">{tab.caption}</p>

          <MiniBrowser url={tab.url}>
            <img
              src={tab.src}
              alt={tab.label}
              className="w-full block"
              style={{ maxHeight: 480, objectFit: 'cover', objectPosition: 'top' }}
            />
          </MiniBrowser>
      </div>
    </div>
  );
};

// ─── Slide 4: Opportunities ───────────────────────────────────────────────────

const FLOW_GREEN = '#1e6b3c';

const OPPORTUNITIES = [
  {
    title: 'Proactively educate users about card programs',
    description: 'Surface information about all card programs Stripe offers on stripe.com and via the Issuing tab so users can learn about them and figure out which one they\'re interested in.',
  },
  {
    title: 'Allow users to indicate the right intent for cards',
    description: 'Today\'s onboarding surfaces "Card issuing" as an option, but routes users straight to the Issuing tab — built for Stripe-as-infrastructure programs. We need to surface both card offering types and let users choose between them.',
  },
  {
    title: 'Let users course-correct to the right program',
    description: 'Users who begin onboarding for one card program may quickly realize it\'s not the right fit. We should surface a clear way to switch at the start of onboarding, before they\'ve gone too far down the wrong path.',
  },
];

// Each entry: { highlight: [[x,y,w,h],...], undimmed: [[x,y,w,h],...] }
// highlight = white fill + blue border; undimmed = just a hole in the dim, no fill/border
const OPPORTUNITY_BOXES = [
  { highlight: [[307, 1, 195, 71], [439, 498, 387, 71]] },
  { highlight: [[273, 138, 283, 71]] },
  { highlight: [[1, 635, 387, 131], [439, 635, 387, 131]], undimmed: [[388, 635, 52, 131]] },
];

const Slide4 = () => {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex gap-16 w-full items-start">
      {/* Left: title + opportunity list */}
      <div className="shrink-0 flex flex-col" style={{ width: 560 }}>
        <h1 className="text-3xl font-light" style={{ lineHeight: '36px', color: '#353a44' }}>
          Opportunities
        </h1>
        <div className="flex flex-col gap-3" style={{ marginTop: 40 }}>
          {OPPORTUNITIES.map((o, i) => (
            <div
              key={i}
              className="flex gap-1 items-start rounded-lg border px-8 py-5 cursor-default transition-colors"
              style={{
                borderColor: hovered === i ? '#635bff' : '#e5e7eb',
                background: hovered === i ? '#f9fafb' : 'transparent',
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <span className="text-xl shrink-0 text-gray-700" style={{ width: 36 }}>{i + 1}.</span>
              <div className="flex flex-col gap-1">
                <span className="text-xl leading-snug text-gray-700">{o.title}</span>
                <span className="text-sm leading-snug text-gray-500">{o.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: flowchart with hover overlay */}
      <div className="flex-1 flex justify-end items-start" style={{ paddingTop: 80, paddingRight: 48 }}>
        <div className="relative" style={{ width: '90%', maxWidth: 520 }}>
          {/* White fill — behind the img so text renders on top */}
          {hovered !== null && (
            <svg viewBox="0 0 826 766" className="absolute inset-0 pointer-events-none"
              style={{ width: '100%', height: '100%', zIndex: 1 }}>
              {OPPORTUNITY_BOXES[hovered].highlight.map(([bx, by, bw, bh], i) => (
                <rect key={i} x={bx} y={by} width={bw} height={bh} rx="7" fill="white" />
              ))}
            </svg>
          )}

          <img src={flowChartUrl} alt="Opportunities flowchart"
            style={{ width: '100%', display: 'block', position: 'relative', zIndex: 2 }} />

          {/* Dim + border overlay — above the img */}
          {hovered !== null && (() => {
            const { highlight, undimmed = [] } = OPPORTUNITY_BOXES[hovered];
            const allHoles = [...highlight, ...undimmed].map(([bx, by, bw, bh]) =>
              `M${bx} ${by} H${bx + bw} V${by + bh} H${bx} Z`
            ).join(' ');
            const dimPath = `M0 0 H826 V766 H0 Z ${allHoles}`;
            return (
              <svg viewBox="0 0 826 766" className="absolute inset-0 pointer-events-none"
                style={{ width: '100%', height: '100%', zIndex: 3 }}>
                <path d={dimPath} fillRule="evenodd" fill="rgba(245,246,248,0.45)" />
                {highlight.map(([bx, by, bw, bh], i) => (
                  <rect key={i} x={bx} y={by} width={bw} height={bh} rx="7" fill="none" stroke="#635bff" strokeWidth="1.5" />
                ))}
              </svg>
            );
          })()}
        </div>
      </div>
    </div>
  );
};

// ─── Deck shell ───────────────────────────────────────────────────────────────

const BEATS = ['', '', '', ''];
const SLIDES = [Slide1, Slide2, Slide3, Slide4];
const DARK_BG = [false, false, false, false];

const ProblemContextDeck = ({ onBack }) => {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const [visible, setVisible] = useState(true);

  const goTo = (next) => {
    if (next < 0 || next >= SLIDES.length) return;
    setDir(next > current ? 1 : -1);
    setVisible(false);
    setTimeout(() => { setCurrent(next); setVisible(true); }, 180);
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight') goTo(current + 1);
      if (e.key === 'ArrowLeft') goTo(current - 1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [current]);

  const Slide = SLIDES[current];

  const dark = DARK_BG[current];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: dark ? '#1a1b25' : '#f5f6f8', transition: 'background 0.3s ease' }}>
      {/* Header — beats only */}
      {BEATS[current] && (
        <div className="px-16 pt-5 pb-3 flex flex-col items-center">
          <p className="text-3xl font-light text-center" style={{ color: dark ? '#fff' : '#353a44' }}>{BEATS[current]}</p>
        </div>
      )}

      {/* Left arrow — fixed to viewport center */}
      <button onClick={() => goTo(current - 1)} disabled={current === 0}
        className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex items-center justify-center w-10 h-10 rounded-full transition-colors"
        style={{
          background: current === 0 ? (dark ? 'rgba(255,255,255,0.06)' : '#ebeef1') : (dark ? 'rgba(255,255,255,0.12)' : '#fff'),
          color: current === 0 ? (dark ? 'rgba(255,255,255,0.2)' : '#d8dee4') : (dark ? '#fff' : '#353a44'),
          border: dark ? '1px solid rgba(255,255,255,0.15)' : '1px solid #d8dee4',
          cursor: current === 0 ? 'not-allowed' : 'pointer',
        }}>
        ←
      </button>

      {/* Right arrow — fixed to viewport center */}
      <button onClick={() => goTo(current + 1)} disabled={current === SLIDES.length - 1}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex items-center justify-center w-10 h-10 rounded-full transition-colors"
        style={{
          background: current === SLIDES.length - 1 ? (dark ? 'rgba(255,255,255,0.06)' : '#ebeef1') : (dark ? 'rgba(255,255,255,0.12)' : '#fff'),
          color: current === SLIDES.length - 1 ? (dark ? 'rgba(255,255,255,0.2)' : '#d8dee4') : (dark ? '#fff' : '#353a44'),
          border: dark ? '1px solid rgba(255,255,255,0.15)' : '1px solid #d8dee4',
          cursor: current === SLIDES.length - 1 ? 'not-allowed' : 'pointer',
        }}>
        →
      </button>

      {/* Progress dots — bottom center */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} className="rounded-full transition-all"
            style={{ width: 6, height: 6, background: i === current ? (dark ? '#fff' : PURPLE) : (dark ? 'rgba(255,255,255,0.25)' : '#d8dee4') }} />
        ))}
      </div>

      {/* Back — outside transform container so fixed positioning works */}
      <button onClick={onBack}
        className="fixed left-3 bottom-3 z-50 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg shadow-lg text-xs font-medium transition-colors"
        style={{
          background: dark ? 'rgba(255,255,255,0.1)' : '#fff',
          border: dark ? '1px solid rgba(255,255,255,0.15)' : '1px solid #e5e7eb',
          color: dark ? 'rgba(255,255,255,0.75)' : '#4b5563',
        }}>
        <ArrowLeftIcon size={12} />
        Back to main view
      </button>

      {/* Content */}
      <div
        className="flex-1 relative flex px-12 pb-8 pt-8"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : `translateY(${dir * 12}px)`,
          transition: 'opacity 0.18s ease, transform 0.18s ease',
        }}
      >


        <div className="w-full pl-10 pr-10">
          <Slide />
        </div>
      </div>
    </div>
  );
};

export default ProblemContextDeck;
