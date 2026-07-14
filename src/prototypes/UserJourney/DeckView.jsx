import React, { useState, useEffect } from 'react';
import DashboardView from '../M1/DashboardView';
import { ArrowLeftIcon } from '../../components/icons';

const BEATS = [
  'User is interested in finding a card issuing solution and researches possible solutions.',
  'User is interested in Stripe and learns more about the card programs it offers.',
  'User decides to move forward with Stripe Issuing and creates an account.',
  'During onboarding, user indicates they want to use Stripe to issue cards.',
  'In the onboarding flow, Stripe determines the card program that works best for the user.',
  'User is routed to the Issuing tab in the dashboard.',
];

const Browser = ({ url, children, fillHeight }) => (
  <div className={`overflow-hidden shadow-xl border border-gray-200 w-full ${fillHeight ? 'rounded-t-xl' : 'rounded-xl'}`}>
    <div className="bg-[#f1f3f4] border-b border-gray-200 px-4 py-2.5 flex items-center gap-3">
      <div className="flex gap-1.5 shrink-0">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
      </div>
      <div className="flex-1 mx-2 bg-white rounded-md px-3 py-1 text-xs text-gray-400 font-mono border border-gray-200 truncate">
        {url}
      </div>
    </div>
    <div className="bg-white">
      {children}
    </div>
  </div>
);

const providers = [
  { name: 'Stripe' },
  { name: 'Marqeta' },
  { name: 'Adyen' },
  { name: 'Brex' },
];

const Slide1 = () => (
  <div className="flex items-center justify-center gap-12">
    {providers.map((p) => (
      <div key={p.name}>
        <div
          className="w-52 h-36 rounded-lg flex items-center justify-center text-sm font-medium text-center px-2"
          style={{ background: 'transparent', border: '1.5px solid #d1d5db', color: '#9ca3af' }}
        >
          {p.name}
        </div>
      </div>
    ))}
  </div>
);

const featureHighlights = [
  { icon: '⚡', label: 'Instant issuance', desc: 'Issue virtual cards in milliseconds via API' },
  { icon: '🎛', label: 'Spend controls', desc: 'Set per-card limits, merchant restrictions, and velocity rules' },
  { icon: '🔔', label: 'Real-time webhooks', desc: 'React to every authorization and transaction instantly' },
];


const ProgramCard = ({ name, desc, label, cardGradient, network }) => (
  <div className="bg-white flex flex-col flex-1 overflow-hidden" style={{ border: '1px solid #ebeef1', borderRadius: 4 }}>
    <div
      className="flex items-center justify-center relative overflow-hidden"
      style={{ background: '#fff', height: 160 }}
    >
      <div
        className="p-3 flex flex-col justify-between relative overflow-hidden"
        style={{ background: cardGradient, width: 150, height: 95, color: '#fff', borderRadius: 6 }}
      >
        <div className="flex justify-between items-start">
          <div className="w-4 h-3 rounded-sm opacity-70" style={{ background: 'rgba(255,255,255,0.5)' }} />
          <div className="font-bold opacity-50 tracking-widest" style={{ fontSize: 8 }}>STRIPE</div>
        </div>
        <div className="flex justify-end">
          <span className="font-bold opacity-60" style={{ fontSize: 8 }}>{network}</span>
        </div>
      </div>
    </div>
    <div className="p-4 flex flex-col gap-1.5">
      <div className="text-xs font-semibold" style={{ color: '#9ca3af' }}>{label}</div>
      <div className="font-semibold text-sm" style={{ color: '#353a44' }}>{name}</div>
      <p className="text-xs leading-relaxed" style={{ color: '#596171' }}>{desc}</p>
    </div>
  </div>
);

const allPrograms = [
  {
    label: 'For your business',
    name: 'Standard Debit Card',
    desc: 'Equip your team with cards for everyday business expenses.',
    cardGradient: 'linear-gradient(135deg, #635bff 0%, #8b5cf6 100%)',
    network: 'MC',
  },
  {
    label: 'For your business',
    name: 'Standard Charge Card',
    desc: 'Cards for larger expenses with more time to pay back.',
    cardGradient: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
    network: 'MC',
  },
  {
    label: 'For your customers',
    name: 'Premium Debit Card',
    desc: 'Build a fully branded card program for your customers.',
    cardGradient: 'linear-gradient(135deg, #0f766e 0%, #0d9488 100%)',
    network: 'VISA',
  },
  {
    label: 'For your customers',
    name: 'Premium Spend Card',
    desc: 'Advanced spend controls for your platform customers.',
    cardGradient: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
    network: 'VISA',
  },
];

const businessPrograms = allPrograms.filter(p => p.label === 'For your business');
const customerPrograms = allPrograms.filter(p => p.label === 'For your customers');

const Slide2 = () => (
  <div style={{ marginTop: 80, width: '100%' }}>
  <Browser url="stripe.com/issuing" fillHeight>
  <div className="p-8 flex flex-col gap-5" style={{ minHeight: '100vh' }}>
    <div className="flex flex-col gap-4">
      <div className="text-xs font-medium" style={{ color: '#0a2540' }}>Issuing</div>
      <h2 className="text-3xl font-light leading-tight" style={{ color: '#0a2540' }}>Launch a card program for every need</h2>
      <p className="text-sm leading-relaxed" style={{ color: '#596171', fontWeight: 400 }}>
        Equip your own team or build for your customers—Stripe Issuing handles the infrastructure so you can focus on growth.
      </p>
      <div>
        <button className="px-5 py-2.5 text-sm font-semibold text-white" style={{ background: '#635bff', borderRadius: 4 }}>
          Get started
        </button>
      </div>
    </div>
    <div className="flex flex-col gap-6 mt-6">
      <div className="flex flex-col gap-3">
        <div className="text-sm font-semibold" style={{ color: '#0a2540' }}>For your business</div>
        <div className="flex gap-3">
          {businessPrograms.map((p) => <ProgramCard key={p.name} {...p} />)}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="text-sm font-semibold" style={{ color: '#0a2540' }}>For your customers</div>
        <div className="flex gap-3">
          {customerPrograms.map((p) => <ProgramCard key={p.name} {...p} />)}
        </div>
      </div>
    </div>
  </div>
  </Browser>
  </div>
);

const cardProducts = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#635bff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
    name: 'Virtual Cards',
    tagline: 'Issue instantly',
    desc: 'Perfect for digital-first, employee expenses, and vendor payments',
    features: ['Instant issuance', 'No physical delivery', 'Tokenized for Apple/Google Pay'],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#635bff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
        <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
        <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
      </svg>
    ),
    name: 'Physical Cards',
    tagline: 'Ship in days',
    desc: 'Custom-branded physical cards shipped to cardholders worldwide',
    features: ['Custom branding', 'EMV chip + contactless', '180+ countries'],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#635bff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    name: 'Corporate Cards',
    tagline: 'For your team',
    desc: 'Manage employee spend with centralized controls and visibility',
    features: ['Per-employee limits', 'Automated reconciliation', 'Receipt collection'],
  },
];

const Slide3 = () => (
  <Browser url="stripe.com/issuing/cards">
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-5" style={{ color: '#353a44' }}>Our card products</h2>
      <div className="grid grid-cols-3 gap-5">
        {cardProducts.map((c) => (
          <div key={c.name} className="rounded-xl border p-5 flex flex-col gap-3" style={{ borderColor: '#ebeef1' }}>
            <div>{c.icon}</div>
            <div>
              <div className="font-bold text-base" style={{ color: '#353a44' }}>{c.name}</div>
              <div className="text-xs font-semibold mt-0.5" style={{ color: '#635bff' }}>{c.tagline}</div>
            </div>
            <p className="text-xs" style={{ color: '#596171' }}>{c.desc}</p>
            <ul className="flex flex-col gap-1.5 mt-1">
              {c.features.map((f) => (
                <li key={f} className="flex items-center gap-1.5 text-xs" style={{ color: '#596171' }}>
                  <span style={{ color: '#228403' }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </Browser>
);

const Slide4 = () => (
  <div className="flex items-center justify-center w-full">
    <div className="bg-white rounded-2xl border p-10 flex flex-col items-center text-center gap-5 w-full max-w-md" style={{ borderColor: '#ebeef1', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
      <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#596171' }}>You've chosen</span>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-xl" style={{ background: '#635bff' }}>S</div>
        <span className="text-xl font-bold" style={{ color: '#353a44' }}>Stripe Issuing</span>
      </div>
      <p className="text-sm max-w-xs" style={{ color: '#596171' }}>
        Issue virtual and physical cards with full API control, real-time spend controls, and instant issuance.
      </p>
      <button className="w-full py-3 rounded-lg text-white font-semibold text-sm mt-2" style={{ background: '#635bff' }}>
        Create your Stripe account →
      </button>
      <p className="text-xs" style={{ color: '#596171' }}>No monthly fees · Pay-per-transaction pricing</p>
    </div>
  </div>
);

const Slide5 = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex items-center justify-center w-full">
      <div className="bg-white rounded-2xl border p-6 flex flex-col gap-3 w-full max-w-sm" style={{ borderColor: '#ebeef1', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
        <div className="flex flex-col gap-0.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-black text-sm mb-1" style={{ background: '#635bff' }}>S</div>
          <h2 className="text-lg font-bold" style={{ color: '#353a44' }}>Create your Stripe account</h2>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-0.5">
            <label className="text-xs font-medium" style={{ color: '#353a44' }}>Email</label>
            <input
              readOnly
              value="you@example.com"
              className="border rounded-lg px-3 py-1.5 text-sm"
              style={{ borderColor: '#d8dee4', color: '#596171' }}
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <label className="text-xs font-medium" style={{ color: '#353a44' }}>Full name</label>
            <input
              readOnly
              value="Jane Smith"
              className="border rounded-lg px-3 py-1.5 text-sm"
              style={{ borderColor: '#d8dee4', color: '#353a44' }}
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <label className="text-xs font-medium" style={{ color: '#353a44' }}>Password</label>
            <div className="relative">
              <input
                readOnly
                type={showPassword ? 'text' : 'password'}
                value="supersecret123"
                className="border rounded-lg px-3 py-1.5 text-sm w-full pr-10"
                style={{ borderColor: '#d8dee4', color: '#353a44' }}
              />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs"
                style={{ color: '#635bff' }}
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
        </div>
        <button className="w-full py-2 rounded-lg text-white font-semibold text-sm" style={{ background: '#635bff' }}>
          Create account
        </button>
        <p className="text-xs text-center" style={{ color: '#596171' }}>
          By creating an account you agree to our{' '}
          <span style={{ color: '#635bff' }}>Terms of Service</span>
          {' '}and{' '}
          <span style={{ color: '#635bff' }}>Privacy Policy</span>
        </p>
        <div className="border-t pt-3 text-center" style={{ borderColor: '#ebeef1' }}>
          <span className="text-xs" style={{ color: '#596171' }}>
            Already have an account?{' '}
            <span style={{ color: '#635bff' }} className="font-medium cursor-pointer">Sign in</span>
          </span>
        </div>
      </div>
    </div>
  );
};

const steps = [
  { label: 'Account', done: true },
  { label: 'Business', done: true },
  { label: 'Products', active: true },
  { label: 'Review', upcoming: true },
];

const products = [
  { id: 'payments', label: 'Non-recurring payments', desc: 'Accept payments for products using a checkout page or invoices.', checked: false },
  { id: 'billing', label: 'Recurring payments', desc: 'Offer subscriptions and bill customers for ongoing usage and services.', checked: false },
  { id: 'accounts', label: 'Business accounts', desc: 'Store, send, spend, and receive funds in multiple currencies, including stablecoins.', checked: false },
  { id: 'issuing', label: 'Cards', desc: 'Issue cards for your team or build a card program for your customers.', checked: true },
];

const Slide6 = () => (
  <div className="flex items-center justify-center w-full">
      <div className="bg-white flex flex-col overflow-hidden" style={{ width: 440, borderRadius: 12, boxShadow: '0 8px 40px rgba(0,0,0,0.2)' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3">
          <span className="text-base font-bold" style={{ color: '#0a2540' }}>stripe</span>
          <div className="flex items-center gap-3">
            <div className="h-1 rounded-full" style={{ background: '#635bff', width: 36 }} />
            <span className="text-gray-400 text-xl leading-none cursor-pointer">×</span>
          </div>
        </div>

        {/* Body */}
        <div className="px-10 pt-5 pb-4 flex flex-col gap-3">
          <p className="text-sm leading-snug" style={{ color: '#0a2540' }}>
            <span className="font-bold">What do you need to get started?</span>{' '}
            You can always change your setup later.
          </p>
          <div className="flex flex-col gap-1.5">
            {products.map((p) => (
              <div
                key={p.id}
                className="flex items-start gap-3 px-3 py-2.5 border cursor-pointer"
                style={{
                  borderColor: p.checked ? '#635bff' : '#e0e3e8',
                  background: p.checked ? '#fff' : '#f7f8fa',
                  borderRadius: 6,
                }}
              >
                <div
                  className="mt-0.5 shrink-0 flex items-center justify-center"
                  style={{
                    width: 14, height: 14,
                    border: `2px solid ${p.checked ? '#635bff' : '#c0c4cc'}`,
                    background: p.checked ? '#635bff' : '#fff',
                    borderRadius: 3,
                  }}
                >
                  {p.checked && (
                    <svg width="8" height="6" viewBox="0 0 9 7" fill="none">
                      <path d="M1 3.5l2.5 2.5 4.5-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <div>
                  <div className="text-xs font-semibold" style={{ color: '#0a2540' }}>{p.label}</div>
                  <div className="text-xs mt-0.5 leading-relaxed" style={{ color: '#596171' }}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <span className="text-xs cursor-pointer" style={{ color: '#635bff' }}>I need something else</span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-5 py-3 border-t" style={{ borderColor: '#ebeef1' }}>
          <button className="px-4 py-1.5 text-xs font-medium border bg-white" style={{ color: '#0a2540', borderColor: '#d8dee4', borderRadius: 6 }}>Skip</button>
          <button className="px-4 py-1.5 text-xs font-semibold text-white" style={{ background: '#635bff', borderRadius: 6 }}>Continue</button>
        </div>
      </div>
  </div>
);

const Slide7 = () => (
  <div style={{ marginTop: 80, width: '100%' }}>
    <Browser url="dashboard.stripe.com/issuing" fillHeight>
      <div style={{ overflow: 'hidden' }}>
        <div style={{ transform: 'scale(0.7)', transformOrigin: 'top left', width: `${100 / 0.7}%` }}>
          <DashboardView simplifiedNav />
        </div>
      </div>
    </Browser>
  </div>
);

const recommendedProgram = {
  label: 'For your customers',
  name: 'Premium Debit Card',
  desc: 'Build a fully branded card program for your customers with Visa network access, custom controls, and instant issuance.',
  cardGradient: 'linear-gradient(135deg, #0f766e 0%, #0d9488 100%)',
  network: 'VISA',
};

const SlideCardProgram = () => (
  <div className="flex flex-col items-center gap-4 w-full">
    {/* Annotation */}
    <div className="flex items-start gap-2.5 px-4 py-3 rounded-lg" style={{ background: '#fffbe6', border: '1px solid #ffe58f', maxWidth: 440 }}>
      <span style={{ fontSize: 14, lineHeight: 1 }}>💬</span>
      <p className="text-xs leading-relaxed" style={{ color: '#7c6200' }}>
        <span className="font-semibold">Open question:</span> Where should this live in the flow and dashboard?
      </p>
    </div>
    <div className="bg-white flex flex-col overflow-hidden" style={{ width: 440, borderRadius: 12, boxShadow: '0 8px 40px rgba(0,0,0,0.2)' }}>
      {/* Body */}
      <div className="px-10 pt-5 pb-6 flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-bold leading-snug" style={{ color: '#0a2540' }}>We've found the right program for you</p>
          <p className="text-xs leading-relaxed" style={{ color: '#596171' }}>
            Based on your responses, Stripe has determined the best card program for your use case.
          </p>
        </div>

        {/* Recommended card */}
        <div className="flex flex-col overflow-hidden" style={{ border: '1.5px solid #635bff', borderRadius: 8, background: '#fafbff' }}>
          <div className="flex items-center justify-center py-6" style={{ background: '#f5f6f8' }}>
            <div
              className="p-3 flex flex-col justify-between relative overflow-hidden"
              style={{ background: recommendedProgram.cardGradient, width: 150, height: 95, color: '#fff', borderRadius: 6 }}
            >
              <div className="flex justify-between items-start">
                <div className="w-4 h-3 rounded-sm opacity-70" style={{ background: 'rgba(255,255,255,0.5)' }} />
                <div className="font-bold opacity-50 tracking-widest" style={{ fontSize: 8 }}>STRIPE</div>
              </div>
              <div className="flex justify-end">
                <span className="font-bold opacity-60" style={{ fontSize: 8 }}>{recommendedProgram.network}</span>
              </div>
            </div>
          </div>
          <div className="px-5 py-4 flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold" style={{ color: '#9ca3af' }}>{recommendedProgram.label}</div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: '#e8f5e9', color: '#228403' }}>Recommended</span>
            </div>
            <div className="font-semibold text-sm" style={{ color: '#353a44' }}>{recommendedProgram.name}</div>
            <p className="text-xs leading-relaxed" style={{ color: '#596171' }}>{recommendedProgram.desc}</p>
          </div>
        </div>

        <p className="text-xs" style={{ color: '#596171' }}>
          You can customize your card program settings after your account is approved.
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-3 px-5 py-3 border-t" style={{ borderColor: '#ebeef1' }}>
        <button className="px-4 py-1.5 text-xs font-medium border bg-white" style={{ color: '#0a2540', borderColor: '#d8dee4', borderRadius: 6 }}>Back</button>
        <button className="px-4 py-1.5 text-xs font-semibold text-white" style={{ background: '#635bff', borderRadius: 6 }}>Go to Issuing</button>
      </div>
    </div>

  </div>
);

const SLIDES = [Slide1, Slide2, Slide5, Slide6, SlideCardProgram, Slide7];

const DeckView = ({ onBack }) => {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const [visible, setVisible] = useState(true);

  const goTo = (next) => {
    if (next < 0 || next >= SLIDES.length) return;
    setDir(next > current ? 1 : -1);
    setVisible(false);
    setTimeout(() => {
      setCurrent(next);
      setVisible(true);
    }, 180);
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

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#f5f6f8' }}>
      {/* Header */}
      <div className="px-16 pt-6 pb-4 text-center flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full transition-all"
              style={{
                width: 6,
                height: 6,
                background: i === current ? '#635bff' : '#d8dee4',
              }}
            />
          ))}
        </div>
        <p className="text-3xl font-light" style={{ color: '#353a44' }}>{BEATS[current]}</p>
      </div>

      {/* Content area — centers slide in the space below the description */}
      <div
        className="flex-1 relative flex items-center justify-center px-16 overflow-hidden"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : `translateY(${dir * 12}px)`,
          transition: 'opacity 0.18s ease, transform 0.18s ease',
        }}
      >
        {/* Left arrow */}
        <button
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full transition-colors"
          style={{
            background: current === 0 ? '#ebeef1' : '#fff',
            color: current === 0 ? '#d8dee4' : '#353a44',
            border: '1px solid #d8dee4',
            cursor: current === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          ←
        </button>

        {/* Right arrow */}
        <button
          onClick={() => goTo(current + 1)}
          disabled={current === SLIDES.length - 1}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full transition-colors"
          style={{
            background: current === SLIDES.length - 1 ? '#ebeef1' : '#fff',
            color: current === SLIDES.length - 1 ? '#d8dee4' : '#353a44',
            border: '1px solid #d8dee4',
            cursor: current === SLIDES.length - 1 ? 'not-allowed' : 'pointer',
          }}
        >
          →
        </button>

        <div className="w-3/4">
          <Slide />
        </div>
      </div>

      {onBack && (
        <button onClick={onBack}
          className="fixed left-3 bottom-3 z-50 flex items-center gap-1.5 px-2.5 py-1.5 bg-white rounded-lg shadow-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
          <ArrowLeftIcon size={12} />
          Back to main view
        </button>
      )}
    </div>
  );
};

export default DeckView;
