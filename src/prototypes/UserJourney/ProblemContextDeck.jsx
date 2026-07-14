import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon } from '../../components/icons';
import stripeIssuingLanding from '../../assets/stripe-issuing-landing.png';
import stripeTreasuryLanding from '../../assets/stripe-treasury-landing.png';

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
  { key: 'issuing', label: 'Issuing', src: stripeIssuingLanding },
  { key: 'treasury', label: 'Treasury', src: stripeTreasuryLanding },
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

      <div className="flex-1 flex flex-col gap-3">
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

const Slide3 = () => (
  <div className="flex gap-16 w-full items-start">
    <div className="w-72 shrink-0">
      <h1 className="text-3xl font-light" style={{ lineHeight: '36px', color: '#353a44' }}>
        For businesses with an intent to get a specific type of card, there is no way for them to provide that intent upfront and easily onboard onto it in the dashboard.
      </h1>
    </div>

    <div className="flex-1 relative" style={{ height: 640 }}>
      {/* Top browser: Balances */}
      <div className="absolute" style={{ top: 0, left: 0, width: '60%', zIndex: 1 }}>
        <div className="mb-2 font-medium" style={{ fontSize: 10, color: '#6b7280' }}>
          The Balances tab implicitly onboards users onto the Standard debit card
        </div>
        <MiniBrowser url="dashboard.stripe.com/balances">
          <MiniDash accountName="Galtee Insurance" activeNav="balances">
            <div className="p-3">
              <div className="font-bold text-gray-900 mb-0.5" style={{ fontSize: 13 }}>
                Balances <span className="font-normal">$0.00</span>
              </div>
              <div className="text-gray-400 mb-3 leading-snug" style={{ fontSize: 8 }}>
                Track incoming earnings, manage your money, pay expenses, and more.
              </div>
              <div className="grid grid-cols-3 gap-1.5 mb-3">
                {[
                  { title: 'Create cards for free', body: 'Get free physical and virtual cards and earn 2% cashback.', link: 'Create card' },
                  { title: 'Get paid globally', body: 'Receive money from customers and vendors worldwide.', link: 'Request funds' },
                  { title: 'Fund your account', body: 'Earn Stripe fee credits when you store funds here.', link: 'Add funds' },
                ].map(c => (
                  <div key={c.title} className="rounded p-1.5" style={{ background: '#f9fafb' }}>
                    <div className="font-semibold text-gray-800 mb-0.5 leading-tight" style={{ fontSize: 8 }}>{c.title}</div>
                    <div className="text-gray-400 leading-snug mb-1" style={{ fontSize: 7 }}>{c.body}</div>
                    <div className="font-medium" style={{ fontSize: 7, color: '#635bff' }}>{c.link}</div>
                  </div>
                ))}
              </div>
              <div className="rounded" style={{ background: 'linear-gradient(135deg, #635bff 0%, #8b5cf6 100%)', height: 36, width: 56 }} />
            </div>
          </MiniDash>
        </MiniBrowser>
      </div>

      {/* Bottom browser: Issuing landing */}
      <div className="absolute" style={{ top: 280, right: 0, width: '70%', zIndex: 2 }}>
        <MiniBrowser url="dashboard.stripe.com/issuing">
          <MiniDash accountName="Mickey's Mochis" activeNav="issuing">
            <div className="p-3">
              <div className="text-gray-400 mb-1" style={{ fontSize: 7 }}>Issuing</div>
              <div className="font-bold text-gray-900 leading-snug mb-1" style={{ fontSize: 13 }}>
                Issue cards with programmable spend
              </div>
              <div className="text-gray-500 leading-snug mb-2" style={{ fontSize: 8 }}>
                Use APIs to create cards, define spending rules and automate transactions from your software systems.
              </div>
              <div className="flex gap-2 mb-3">
                <button className="font-medium text-white px-2.5 py-1 rounded" style={{ fontSize: 8, background: '#635bff' }}>Get started</button>
                <button className="font-medium px-2.5 py-1 rounded border border-gray-200 text-gray-700" style={{ fontSize: 8 }}>Explore in sandbox</button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { title: 'Supportable use cases', body: "See which card programs Issuing supports and what's required for each." },
                  { title: 'Quickstart guide', body: 'Learn how to quickly set up a card issuing program using the Stripe Issuing API.' },
                ].map(c => (
                  <div key={c.title} className="p-2 rounded border border-gray-100">
                    <div className="font-semibold text-gray-800 mb-0.5 leading-tight" style={{ fontSize: 8 }}>{c.title}</div>
                    <div className="text-gray-500 leading-snug mb-1" style={{ fontSize: 7 }}>{c.body}</div>
                    <div className="font-medium" style={{ fontSize: 7, color: '#635bff' }}>View docs</div>
                  </div>
                ))}
              </div>
            </div>
          </MiniDash>
        </MiniBrowser>
        <div className="mt-2 font-medium" style={{ fontSize: 10, color: '#6b7280' }}>
          Issuing tab does check to see what cards will work best for the user, but in order for a user to get here, they must know to tap on Issuing (and not Treasury, Cards, etc)
        </div>
      </div>
    </div>
  </div>
);

// ─── Deck shell ───────────────────────────────────────────────────────────────

const BEATS = ['', '', ''];
const SLIDES = [Slide1, Slide2, Slide3];
const DARK_BG = [false, false, false];

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
      {/* Header */}
      <div className="px-16 pt-5 pb-3 flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} className="rounded-full transition-all"
              style={{ width: 6, height: 6, background: i === current ? (dark ? '#fff' : PURPLE) : (dark ? 'rgba(255,255,255,0.25)' : '#d8dee4') }} />
          ))}
        </div>
        {BEATS[current] && (
          <p className="text-3xl font-light text-center" style={{ color: dark ? '#fff' : '#353a44' }}>{BEATS[current]}</p>
        )}
      </div>

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
        className="flex-1 relative flex px-12 pb-8 pt-2"
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
