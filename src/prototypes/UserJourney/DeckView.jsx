import React, { useState, useEffect } from 'react';
import DashboardView from '../M1/DashboardView';
import { ArrowLeftIcon } from '../../components/icons';

const BEATS = [
  'User is interested in finding a card issuing solution and researches possible solutions.',
  'User is interested in Stripe and learns more about the card programs it offers.',
  'User decides to move forward with Stripe Issuing and creates an account.',
  'Stripe asks the user to describe their business to personalize setup recommendations.',
  'Stripe recommends products based on the user\'s business info, including cards as a potential fit.',
  'If a user taps "See all products", they can also select cards on their own.',
  'Stripe routes the user to a sandbox to complete setup and safely test before going live.',
  'The user lands in the sandbox dashboard and is prompted to set up Issuing.',
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
  <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#fff', border: '1px solid #ebeef1', borderRadius: 4 }}>
    <div
      className="flex items-center justify-center relative overflow-hidden"
      style={{ background: '#f7f8fa', height: 200 }}
    >
      <div
        className="p-3 flex flex-col justify-between relative overflow-hidden"
        style={{ background: cardGradient, width: 200, height: 126, color: '#fff', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.18)' }}
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
    <div className="p-4 flex flex-col gap-0">
      <div className="font-semibold text-sm" style={{ color: '#353a44' }}>{name}</div>
      <div className="mt-3" style={{ height: 8, borderRadius: 2, background: '#ebeef1', width: '100%' }} />
    </div>
  </div>
);

const allPrograms = [
  {
    label: 'For your business',
    name: 'Standard Debit Card',
    desc: 'Description placeholder',
    cardGradient: 'linear-gradient(135deg, #635bff 0%, #8b5cf6 100%)',
    network: 'MC',
  },
  {
    label: 'For your business',
    name: 'Standard Charge Card',
    desc: 'Description placeholder',
    cardGradient: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
    network: 'MC',
  },
  {
    label: 'For your customers',
    name: 'Premium Debit Card',
    desc: 'Description placeholder',
    cardGradient: 'linear-gradient(135deg, #0f766e 0%, #0d9488 100%)',
    network: 'VISA',
  },
  {
    label: 'For your customers',
    name: 'Premium Spend Card',
    desc: 'Description placeholder',
    cardGradient: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
    network: 'VISA',
  },
];

const businessPrograms = allPrograms.filter(p => p.label === 'For your business');
const customerPrograms = allPrograms.filter(p => p.label === 'For your customers');

const Slide2 = () => (
  <div style={{ width: '100%', marginTop: 30 }}>
  <Browser url="stripe.com/issuing" fillHeight>
  <div style={{ height: 'calc(100vh - 154px)', overflowY: 'auto' }}>
  <div className="p-8 flex flex-col gap-5">
    <div className="flex flex-col items-center text-center gap-4">
      <div className="text-xs font-medium self-start" style={{ color: '#0a2540' }}>Issuing</div>
      <h2 className="text-3xl font-light leading-tight" style={{ color: '#0a2540' }}>Launch a card program for every need</h2>
      <div>
        <button className="px-5 py-2.5 text-sm font-semibold text-white" style={{ background: '#635bff', borderRadius: 4 }}>
          Get started
        </button>
      </div>
    </div>
    <div className="w-full flex items-center justify-center gap-2" style={{ background: '#f7f8fa', height: 160, borderRadius: 4 }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
      <span className="text-xs font-medium" style={{ color: '#9ca3af' }}>Hero image TBD</span>
    </div>
    <div className="flex flex-col gap-6 mt-6">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-0.5">
          <div className="text-lg font-normal" style={{ color: '#0a2540' }}>Cards to power your product</div>
          <div className="text-sm" style={{ color: '#596171' }}>Build a branded card program and issue cards programmatically via the Stripe Issuing API</div>
        </div>
        <div className="flex gap-3">
          {customerPrograms.map((p) => <ProgramCard key={p.name} {...p} />)}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-0.5">
          <div className="text-lg font-normal" style={{ color: '#0a2540' }}>Cards for your business</div>
          <div className="text-sm" style={{ color: '#596171' }}>Equip your business with cards and spend controls, managed directly in the Dashboard</div>
        </div>
        <div className="flex gap-3">
          {businessPrograms.map((p) => <ProgramCard key={p.name} {...p} />)}
        </div>
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
    <div className="bg-white border p-10 flex flex-col items-center text-center gap-5 w-full max-w-md" style={{ borderRadius: 12, borderColor: '#ebeef1', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
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
  return (
  <div style={{ width: '100%', marginTop: 30 }}>
  <Browser url="stripe.com/register" fillHeight>
  <div style={{ overflow: 'hidden', height: 'calc(100vh - 154px)' }}>
    <div className="flex items-center justify-center w-full p-12" style={{ background: 'rgba(0,0,0,0.4)', height: '100%' }}>
      <div className="bg-white border p-6 flex flex-col gap-3 w-full max-w-sm" style={{ borderRadius: 12, borderColor: '#ebeef1', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
        <div className="flex flex-col gap-0.5">
          <h2 className="text-lg font-bold" style={{ color: '#353a44' }}>Create your Stripe account</h2>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-0.5">
            <label className="text-xs font-medium" style={{ color: '#353a44' }}>Email</label>
            <input
              readOnly
              value="alex@example.com"
              className="border rounded-lg px-3 py-1.5 text-sm"
              style={{ borderColor: '#d8dee4', color: '#596171' }}
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <label className="text-xs font-medium" style={{ color: '#353a44' }}>Full name</label>
            <input
              readOnly
              value="Alex Chen"
              className="border rounded-lg px-3 py-1.5 text-sm"
              style={{ borderColor: '#d8dee4', color: '#353a44' }}
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <label className="text-xs font-medium" style={{ color: '#353a44' }}>Country</label>
            <div className="border rounded-lg px-3 py-1.5 text-sm flex items-center justify-between" style={{ borderColor: '#d8dee4', color: '#353a44' }}>
              <div className="flex items-center gap-2">
                <span>🇺🇸</span>
                <span>United States</span>
              </div>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="#8792a2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
          <div className="flex flex-col gap-0.5">
            <label className="text-xs font-medium" style={{ color: '#353a44' }}>Password</label>
            <input
              readOnly
              type="password"
              value="supersecret123"
              className="border rounded-lg px-3 py-1.5 text-sm w-full"
              style={{ borderColor: '#d8dee4', color: '#353a44' }}
            />
          </div>
        </div>
        <button className="w-full py-2 rounded-lg text-white font-semibold text-sm" style={{ background: '#635bff' }}>
          Create account
        </button>
        <div className="border-t pt-3 text-center" style={{ borderColor: '#ebeef1' }}>
          <span className="text-xs" style={{ color: '#596171' }}>
            Already have an account?{' '}
            <span style={{ color: '#635bff' }} className="font-medium cursor-pointer">Sign in</span>
          </span>
        </div>
      </div>
    </div>
  </div>
  </Browser>
  </div>
  );
};

const typeaheadSuggestions = [
  'I want to issue cards to my platform users',
  "I'm building a B2B platform with card features",
  'I want to build a card program for my customers',
  'I run a field services platform',
];

const SlideTellUs = () => {
  const WEBSITE = 'www.fieldwork.io';
  const TYPEAHEAD = typeaheadSuggestions[0];

  const [websiteTyped, setWebsiteTyped] = useState('');
  const [typeaheadTyped, setTypeaheadTyped] = useState('');
  const [phase, setPhase] = useState('idle');

  useEffect(() => {
    const timers = [];
    timers.push(setTimeout(() => {
      setPhase('website');
      let i = 0;
      const tickWebsite = () => {
        i++;
        setWebsiteTyped(WEBSITE.slice(0, i));
        if (i < WEBSITE.length) {
          timers.push(setTimeout(tickWebsite, 60));
        } else {
          setPhase('gap');
          timers.push(setTimeout(() => {
            setPhase('typeahead');
            let j = 0;
            const tickTypeahead = () => {
              j++;
              setTypeaheadTyped(TYPEAHEAD.slice(0, j));
              if (j < TYPEAHEAD.length) {
                timers.push(setTimeout(tickTypeahead, 35));
              } else {
                setPhase('done');
              }
            };
            tickTypeahead();
          }, 400));
        }
      };
      tickWebsite();
    }, 600));
    return () => timers.forEach(clearTimeout);
  }, []);

  const websiteCursor = phase === 'website' || phase === 'gap';
  const typeaheadCursor = phase === 'typeahead';

  return (
  <div style={{ width: '100%', marginTop: 30, overflow: 'hidden' }}>
    <Browser url="dashboard.stripe.com" fillHeight>
      <div style={{ position: 'relative', overflow: 'hidden', height: 'calc(100vh - 154px)', background: 'rgba(182,192,205,0.7)' }}>
        {/* Modal */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 15px 35px rgba(48,49,61,0.08), 0 5px 15px rgba(0,0,0,0.12)',
            width: '93%',
            height: 'calc(100% - 60px)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Stripe logo */}
            <div style={{ position: 'absolute', left: 42, top: 28, fontSize: 18, fontWeight: 700, color: '#0a2540', letterSpacing: '-0.3px' }}>stripe</div>
            {/* Progress bar */}
            <div style={{ position: 'absolute', right: 42, top: 36, display: 'flex', gap: 4 }}>
              <div style={{ height: 5, width: 7, borderRadius: 100, background: '#675dff' }} />
              <div style={{ height: 5, width: 100, borderRadius: 100, background: '#f5f6f8' }} />
            </div>

            {/* Centered content column */}
            <div style={{
              position: 'absolute',
              left: '50%', top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 426,
              display: 'flex', flexDirection: 'column', gap: 24,
            }}>
              <p style={{ fontSize: 20, color: '#21252c', margin: 0, lineHeight: '28px', letterSpacing: '0.3px' }}>
                <strong>Tell us more about your business.</strong>{' '}
                <span style={{ color: '#99a5b8', fontWeight: 400 }}>This helps us make setup recommendations for you.</span>
              </p>

              {/* Website field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 16, color: '#353a44', lineHeight: '24px' }}>Website</label>
                <div style={{ border: `1px solid ${websiteCursor ? '#675dff' : '#d8dee4'}`, borderRadius: 6, padding: '12px 16px', background: '#fff', transition: 'border-color 0.15s' }}>
                  <span style={{ fontSize: 16, color: '#353a44', lineHeight: '24px', display: 'block', minHeight: 24 }}>
                    {websiteTyped}
                    {websiteCursor && <span style={{ color: '#353a44', fontWeight: 300 }}>|</span>}
                  </span>
                </div>
              </div>

              {/* How do you want to get started */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 16, color: '#353a44', lineHeight: '24px' }}>How do you want to get started?</label>
                <div style={{ border: `1px solid ${typeaheadCursor ? '#675dff' : '#d8dee4'}`, borderRadius: 6, padding: '12px 16px', background: '#fff', height: 118, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden', transition: 'border-color 0.15s' }}>
                  <div style={{ overflow: 'hidden', height: 24 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 16, color: '#353a44', lineHeight: '24px', whiteSpace: 'nowrap' }}>
                        {typeaheadTyped}
                      </span>
                      {typeaheadCursor && (
                        <span style={{ color: '#353a44', fontWeight: 300 }}>|</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Back link */}
            <span style={{ position: 'absolute', left: 42, bottom: 28, fontSize: 16, color: '#533afd', cursor: 'pointer', letterSpacing: '-0.3px' }}>← Back</span>
            {/* Skip + Continue */}
            <div style={{ position: 'absolute', right: 32, bottom: 20, display: 'flex', gap: 16 }}>
              <button style={{ padding: '10px 20px', fontSize: 14, fontWeight: 500, color: '#353a44', background: '#fff', border: '1.5px solid #d8dee4', borderRadius: 6, cursor: 'pointer' }}>Skip</button>
              <button style={{ padding: '10px 24px', fontSize: 14, fontWeight: 600, color: '#fff', background: '#533afd', border: 'none', borderRadius: 6, cursor: 'pointer' }}>Continue</button>
            </div>
          </div>
        </div>
      </div>
    </Browser>
  </div>
  );
};

const moreRecsProducts = [
  { name: 'Cards for your business', desc: 'Equip your business with cards and spend controls, managed directly in the Dashboard.' },
  { name: 'Cards to power your product', desc: 'Build a branded card program and issue cards programmatically via the Stripe Issuing API.' },
];

const SlideRecFromWebsite = () => (
  <div style={{ width: '100%', marginTop: 30, overflow: 'hidden' }}>
    <Browser url="dashboard.stripe.com" fillHeight>
      <div style={{ position: 'relative', overflow: 'hidden', height: 'calc(100vh - 154px)', background: 'rgba(182,192,205,0.7)' }}>
        {/* Modal container */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <div style={{
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 15px 35px rgba(48,49,61,0.08), 0 5px 15px rgba(0,0,0,0.12)',
            width: '93%',
            height: 'calc(100% - 60px)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}>
            {/* Stripe logo */}
            <div style={{ position: 'absolute', left: 42, top: 32, fontSize: 18, fontWeight: 700, color: '#0a2540', letterSpacing: '-0.3px', zIndex: 1 }}>stripe</div>
            {/* Progress bar */}
            <div style={{ position: 'absolute', right: 42, top: 42, display: 'flex', gap: 4, zIndex: 1 }}>
              <div style={{ height: 5, width: 7, borderRadius: 100, background: '#675dff' }} />
              <div style={{ height: 5, width: 125, borderRadius: 100, background: '#f5f6f8' }} />
            </div>

            {/* Scrollable content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '135px 0 16px' }}>
              <div style={{ width: 658, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 32 }}>
                {/* Heading */}
                <p style={{ fontSize: 20, margin: 0, lineHeight: '28px', letterSpacing: '0.3px' }}>
                  <strong style={{ color: '#21252c', fontWeight: 700 }}>Great, here's the products we recommend based on the information you provided.</strong>{' '}
                  <span style={{ color: '#99a5b8', fontWeight: 400 }}>You can always add or remove products later.</span>
                </p>

                {/* Primary recommendations (checked) */}
                <div style={{ background: '#ebecff', borderRadius: 8, padding: 8, display: 'flex', gap: 8 }}>
                  {[
                    { name: 'Non-recurring payments', desc: 'Accept payments for products and services using a checkout page or invoices.' },
                    { name: 'Recurring payments', desc: 'Offer subscriptions and bill customers for ongoing usage and services.' },
                  ].map((p) => (
                    <div key={p.name} style={{ flex: 1, background: '#fff', border: '2px solid #675dff', borderRadius: 8, padding: 16, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <div style={{ width: 14, height: 14, borderRadius: 4, background: '#675dff', border: '1px solid #675dff', flexShrink: 0, marginTop: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="8" height="6" viewBox="0 0 9 7" fill="none"><path d="M1 3.5l2.5 2.5 4.5-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#353a44', lineHeight: '20px', letterSpacing: '-0.15px' }}>{p.name}</div>
                        <div style={{ fontSize: 12, color: '#596171', lineHeight: '16px' }}>{p.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* More recommendations */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ fontSize: 18, color: '#596171', lineHeight: '28px', letterSpacing: '-0.48px' }}>More recommendations</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {moreRecsProducts.slice(0, 2).map((p) => {
                        const isChecked = p.name === 'Cards to power your product';
                        return (
                        <div key={p.name} style={{ flex: 1, background: isChecked ? '#fff' : '#f5f6f8', border: isChecked ? '2px solid #675dff' : '1px solid transparent', borderRadius: 8, padding: 16, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                          {isChecked ? (
                            <div style={{ width: 14, height: 14, borderRadius: 4, background: '#675dff', border: '1px solid #675dff', flexShrink: 0, marginTop: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <svg width="8" height="6" viewBox="0 0 9 7" fill="none"><path d="M1 3.5l2.5 2.5 4.5-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </div>
                          ) : (
                            <div style={{ width: 14, height: 14, borderRadius: 4, background: '#fff', border: '1px solid #d8dee4', flexShrink: 0, marginTop: 2, boxShadow: '0 1px 1px rgba(33,37,44,0.16)' }} />
                          )}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <div style={{ fontSize: 14, fontWeight: 600, color: '#353a44', lineHeight: '20px', letterSpacing: '-0.15px' }}>{p.name}</div>
                            <div style={{ fontSize: 12, color: '#596171', lineHeight: '16px' }}>{p.desc}</div>
                          </div>
                        </div>
                        );
                      })}
                    </div>
                    {/* See all products */}
                    <div style={{ background: '#f7f5fd', borderRadius: 8, padding: '8px 16px', display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 14, color: '#533afd', letterSpacing: '-0.15px' }}>See all products</span>
                      <span style={{ fontSize: 14, color: '#533afd' }}>→</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={{ flexShrink: 0, padding: '12px 42px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 16, color: '#533afd', cursor: 'pointer', letterSpacing: '-0.31px' }}>← Back</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                <span style={{ fontSize: 16, color: '#533afd', cursor: 'pointer', letterSpacing: '-0.31px' }}>I want a different setup</span>
                <button style={{ padding: '10px 24px', fontSize: 14, fontWeight: 600, color: '#fff', background: '#533afd', border: 'none', borderRadius: 6, cursor: 'pointer' }}>Continue</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Browser>
  </div>
);

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
  <div style={{ width: '100%', marginTop: 30 }}>
  <Browser url="dashboard.stripe.com" fillHeight>
  <div style={{ overflow: 'hidden', height: 'calc(100vh - 154px)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)' }}>
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
  </Browser>
  </div>
);

const Slide7 = () => (
  <div style={{ marginTop: 30, width: '100%' }}>
    <Browser url="dashboard.stripe.com/issuing" fillHeight>
      <div style={{ overflow: 'hidden' }}>
        <div style={{ transform: 'scale(0.7)', transformOrigin: 'top left', width: `${100 / 0.7}%` }}>
          <DashboardView simplifiedNav issuingHeadline="Launch a card program for every need" issuingDescription="Issue cards for your business or power a card program for your customers." />
        </div>
      </div>
    </Browser>
  </div>
);

const wordCloudItems = [
  { label: 'Non-recurring payments', checked: false },
  { label: 'Recurring payments', checked: false },
  { label: 'Invoices', checked: false },
  { label: 'Build a platform or marketplace', checked: false },
  { label: 'Tax collection', checked: false },
  { label: 'In-person payments', checked: false },
  { label: 'Cards for your business', checked: false },
  { label: 'Identity verification', checked: false },
  { label: 'Cards to power your product', checked: true },
  { label: 'Climate contributions', checked: false },
  { label: 'Fraud protection', checked: false },
  { label: 'Financial services', checked: false },
  { label: 'Bank data access', checked: false },
  { label: 'Connect with a business using Stripe', checked: false },
];

const SlideWordCloud = () => (
  <div style={{ width: '100%', marginTop: 30 }}>
    <Browser url="dashboard.stripe.com" fillHeight>
      <div style={{ position: 'relative', overflow: 'hidden', height: 'calc(100vh - 154px)', background: 'rgba(182,192,205,0.7)' }}>
        {/* Modal */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 15px 35px rgba(48,49,61,0.08), 0 5px 15px rgba(0,0,0,0.12)',
            width: '93%',
            height: 'calc(100% - 60px)',
            position: 'relative',
            display: 'flex', flexDirection: 'column',
            overflow: 'hidden',
          }}>
            {/* Stripe logo */}
            <div style={{ position: 'absolute', left: 42, top: 32, fontSize: 18, fontWeight: 700, color: '#0a2540', letterSpacing: '-0.3px', zIndex: 1 }}>stripe</div>
            {/* Progress bar */}
            <div style={{ position: 'absolute', right: 42, top: 42, display: 'flex', gap: 4, zIndex: 1 }}>
              <div style={{ height: 5, width: 7, borderRadius: 100, background: '#675dff' }} />
              <div style={{ height: 5, width: 100, borderRadius: 100, background: '#f5f6f8' }} />
            </div>

            {/* Modal body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '135px 0 16px' }}>
              <div style={{ width: 658, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
              <p style={{ fontSize: 20, color: '#21252c', margin: 0, lineHeight: '28px', letterSpacing: '0.3px' }}>
                <strong>Select how you want to use Stripe.</strong>{' '}
                <span style={{ color: '#99a5b8', fontWeight: 400 }}>You can always add or remove products later.</span>
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {wordCloudItems.map((item) => (
                  <div
                    key={item.label}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      padding: '10px 12px',
                      borderRadius: 8,
                      border: item.checked ? '2px solid #675dff' : '1.5px solid #ebeef1',
                      background: item.checked ? '#fff' : '#f5f6f8',
                      width: 'calc(50% - 4px)',
                      boxSizing: 'border-box',
                    }}
                  >
                    <div style={{
                      width: 14, height: 14, borderRadius: 3, flexShrink: 0,
                      border: item.checked ? '1.5px solid #675dff' : '1.5px solid #d8dee4',
                      background: item.checked ? '#533afd' : '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {item.checked && (
                        <svg width="8" height="6" viewBox="0 0 9 7" fill="none">
                          <path d="M1 3.5l2.5 2.5 4.5-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#353a44', letterSpacing: '-0.15px' }}>{item.label}</span>
                  </div>
                ))}
              </div>
              </div>
            </div>

            {/* Modal footer */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 42px 20px' }}>
              <span style={{ fontSize: 13, color: '#533afd', cursor: 'pointer' }}>← Back</span>
              <div style={{ display: 'flex', gap: 12 }}>
                <button style={{ padding: '8px 16px', fontSize: 13, fontWeight: 500, color: '#353a44', background: '#fff', border: '1.5px solid #d8dee4', borderRadius: 6, cursor: 'pointer' }}>Skip</button>
                <button style={{ padding: '8px 20px', fontSize: 13, fontWeight: 600, color: '#fff', background: '#533afd', border: 'none', borderRadius: 6, cursor: 'pointer' }}>Continue</button>
              </div>
            </div>
          </div>
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

const SlideWelcome = () => (
  <div style={{ width: '100%', marginTop: 30 }}>
  <Browser url="dashboard.stripe.com/acct/welcome" fillHeight>
  <div style={{ height: 'calc(100vh - 154px)', overflowY: 'auto', position: 'relative', background: '#f5f6f8' }}>
    {/* Modal overlay */}
    <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.3)' }}>
      <div className="bg-white flex flex-col" style={{ width: 440, borderRadius: 12, boxShadow: '0 8px 40px rgba(0,0,0,0.2)', overflow: 'hidden' }}>
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4">
          <span className="text-base font-bold" style={{ color: '#0a2540' }}>stripe</span>
          <div className="h-0.5 w-16 rounded-full" style={{ background: '#635bff' }} />
        </div>
        {/* Body */}
        <div className="px-6 pb-6 flex flex-col gap-4">
          <p className="text-sm leading-relaxed" style={{ color: '#0a2540' }}>
            <span className="font-semibold" style={{ color: '#635bff' }}>Welcome to Stripe.</span>{' '}
            Tell us a bit about your business and we'll set things up for you.
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium" style={{ color: '#353a44' }}>Business name</label>
              <input
                readOnly
                value="Acme Inc"
                className="border px-3 py-2 text-sm"
                style={{ borderColor: '#d8dee4', borderRadius: 4, color: '#353a44' }}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium flex items-center gap-1" style={{ color: '#353a44' }}>
                Business location
                <span className="text-xs rounded-full border flex items-center justify-center" style={{ width: 14, height: 14, borderColor: '#9ca3af', color: '#9ca3af', fontSize: 9 }}>i</span>
              </label>
              <div className="border px-3 py-2 text-sm flex items-center gap-2" style={{ borderColor: '#d8dee4', borderRadius: 4, color: '#353a44' }}>
                <span>🇺🇸</span>
                <span className="flex-1">United States</span>
                <span style={{ color: '#9ca3af' }}>⌄</span>
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="flex justify-end px-6 py-4 border-t" style={{ borderColor: '#ebeef1' }}>
          <button className="px-5 py-2 text-sm font-semibold text-white" style={{ background: '#635bff', borderRadius: 4 }}>
            Continue
          </button>
        </div>
      </div>
    </div>
  </div>
  </Browser>
  </div>
);

const SlideDescribeBusiness = () => (
  <div style={{ width: '100%', marginTop: 30 }}>
  <Browser url="dashboard.stripe.com/acct/welcome" fillHeight>
  <div style={{ height: 'calc(100vh - 154px)', overflowY: 'auto', position: 'relative', background: '#f5f6f8' }}>
    {/* Modal overlay */}
    <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.3)' }}>
      <div className="bg-white flex flex-col" style={{ width: 440, borderRadius: 12, boxShadow: '0 8px 40px rgba(0,0,0,0.2)', overflow: 'hidden' }}>
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4">
          <span className="text-base font-bold" style={{ color: '#0a2540' }}>stripe</span>
          <div className="h-0.5 w-16 rounded-full" style={{ background: '#635bff' }} />
        </div>
        {/* Body */}
        <div className="px-6 pb-6 flex flex-col gap-4">
          <p className="text-sm leading-relaxed" style={{ color: '#0a2540' }}>
            <span className="font-semibold">Describe your business in a few words.</span>{' '}
            This helps us recommend the best setup.
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium" style={{ color: '#353a44' }}>Website</label>
              <input
                readOnly
                value=""
                placeholder=""
                className="border px-3 py-2 text-sm"
                style={{ borderColor: '#635bff', borderRadius: 4, color: '#353a44', outline: 'none', boxShadow: '0 0 0 2px rgba(99,91,255,0.15)' }}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium" style={{ color: '#353a44' }}>What does your business do?</label>
              <textarea
                readOnly
                value="I design custom logos and brand materials, billing clients through online invoices."
                className="border px-3 py-2 text-sm resize-none"
                rows={4}
                style={{ borderColor: '#d8dee4', borderRadius: 4, color: '#353a44' }}
              />
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t" style={{ borderColor: '#ebeef1' }}>
          <span className="text-xs flex items-center gap-1 cursor-pointer" style={{ color: '#635bff' }}>← Back</span>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-sm font-medium border bg-white" style={{ color: '#0a2540', borderColor: '#d8dee4', borderRadius: 4 }}>Skip</button>
            <button className="px-5 py-2 text-sm font-semibold text-white" style={{ background: '#635bff', borderRadius: 4 }}>Continue</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </Browser>
  </div>
);

const sandboxSteps = [
  { n: 1, title: 'Complete your setup', desc: 'Follow the steps in your setup guide to explore features that fit your business needs.' },
  { n: 2, title: 'Switch to live account', desc: "When you're ready to go live, answer some questions to verify your business." },
  { n: 3, title: "You're ready to go", desc: 'Copy your work to your live account and start accepting payments and issuing cards.' },
];

const SlideSandbox = () => (
  <div style={{ width: '100%', marginTop: 30, overflow: 'hidden' }}>
    <Browser url="dashboard.stripe.com" fillHeight>
      <div style={{ position: 'relative', overflow: 'hidden', height: 'calc(100vh - 154px)', background: 'rgba(182,192,205,0.7)' }}>
        {/* Modal container */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <div style={{
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 15px 35px rgba(48,49,61,0.08), 0 5px 15px rgba(0,0,0,0.12)',
            width: '93%',
            height: 'calc(100% - 60px)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}>
            {/* Stripe logo */}
            <div style={{ position: 'absolute', left: 42, top: 32, fontSize: 18, fontWeight: 700, color: '#0a2540', letterSpacing: '-0.3px', zIndex: 1 }}>stripe</div>
            {/* Progress bar */}
            <div style={{ position: 'absolute', right: 42, top: 42, display: 'flex', gap: 4, zIndex: 1 }}>
              <div style={{ height: 5, width: 7, borderRadius: 100, background: '#675dff' }} />
              <div style={{ height: 5, width: 125, borderRadius: 100, background: '#f5f6f8' }} />
            </div>

            {/* Main content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '135px 0 16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 45, alignItems: 'center' }}>
                {/* Left: text */}
                <div style={{ width: 440, display: 'flex', flexDirection: 'column', gap: 34 }}>
                  <p style={{ fontSize: 20, margin: 0, lineHeight: '28px', letterSpacing: '0.3px' }}>
                    <strong style={{ color: '#21252c', fontWeight: 700 }}>Get started in your sandbox.</strong>{' '}
                    <span style={{ color: '#99a5b8', fontWeight: 400 }}>You can safely test features without any real money movement.</span>
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    {sandboxSteps.map(({ n, title, desc }) => (
                      <div key={n} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                        <div style={{ width: 20, height: 20, borderRadius: 16, background: '#675dff', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontSize: 12, fontWeight: 600, color: '#fff', lineHeight: '16px' }}>{n}</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                          <div style={{ fontSize: 14, fontWeight: 600, color: '#353a44', lineHeight: '20px', letterSpacing: '-0.15px' }}>{title}</div>
                          <div style={{ fontSize: 14, color: '#596171', lineHeight: '20px', letterSpacing: '-0.15px' }}>{desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: sandbox illustration */}
                <div style={{ width: 320, height: 320, borderRadius: 8, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #e8e4ff 0%, #c9daff 50%, #eef2ff 100%)' }} />
                  {/* Sandbox header bar */}
                  <div style={{ position: 'absolute', top: 75, left: 75, right: 0, height: 44, background: '#0e3359', display: 'flex', alignItems: 'center', padding: '0 20px', justifyContent: 'space-between', borderRadius: '8px 0 0 0' }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>Sandbox</span>
                    <div style={{ padding: '4px 10px', background: '#675dff', borderRadius: 4, fontSize: 11, fontWeight: 600, color: '#fff' }}>Get your live account</div>
                  </div>
                  {/* Frosted glass panel */}
                  <div style={{ position: 'absolute', top: 119, left: 75, right: 0, bottom: 0, background: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.2)' }}>
                    {/* Account row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '16px 20px 0' }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: 14, height: 14, borderRadius: 2, background: 'rgba(103,93,255,0.5)' }} />
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 700, color: '#353a44', letterSpacing: '-0.31px' }}>Fieldwork</span>
                    </div>
                    {/* Nav items */}
                    <div style={{ position: 'absolute', left: 20, top: 76, display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {[57, 71, 71, 54].map((w, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 14, height: 14, borderRadius: 7, background: 'rgba(255,255,255,0.7)' }} />
                          <div style={{ height: 10, width: w, borderRadius: 10, background: 'rgba(255,255,255,0.7)' }} />
                        </div>
                      ))}
                    </div>
                    {/* Analytics widget */}
                    <div style={{ position: 'absolute', right: 16, top: 64, width: 175, background: 'rgba(255,255,255,0.45)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 12, padding: 14, display: 'flex', flexDirection: 'column', gap: 14 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <div style={{ height: 10, width: 77, background: 'rgba(255,255,255,0.9)', borderRadius: 8 }} />
                        <div style={{ height: 10, width: 99, background: 'rgba(255,255,255,0.9)', borderRadius: 8 }} />
                      </div>
                      <svg width="120" height="56" viewBox="0 0 120 56" fill="none">
                        <path d="M0 48 C20 38, 35 22, 55 28 C75 36, 85 8, 120 4" stroke="#675dff" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.8" />
                        <path d="M0 48 C20 38, 35 22, 55 28 C75 36, 85 8, 120 4 L120 56 L0 56 Z" fill="#675dff" opacity="0.1" />
                      </svg>
                      <div style={{ height: 10, width: 32, background: 'rgba(255,255,255,0.9)', borderRadius: 8 }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={{ flexShrink: 0, padding: '12px 42px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 16, color: '#533afd', cursor: 'pointer', letterSpacing: '-0.31px' }}>← Back</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                <span style={{ fontSize: 16, color: '#533afd', cursor: 'pointer', letterSpacing: '-0.31px' }}>Go to my live account now</span>
                <button style={{ padding: '10px 24px', fontSize: 14, fontWeight: 600, color: '#fff', background: '#533afd', border: 'none', borderRadius: 6, cursor: 'pointer' }}>Go to Dashboard</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Browser>
  </div>
);

const FigmaDashboard = () => (
  <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', background: '#fff', position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
    {/* Sandbox Banner */}
    <div style={{ height: 56, background: '#0a2540', display: 'flex', alignItems: 'center', padding: '0 20px', gap: 16 }}>
      <span style={{ fontSize: 14, fontWeight: 600, color: '#fff', flexShrink: 0 }}>Sandbox</span>
      <span style={{ flex: 1, fontSize: 14, color: 'rgba(255,255,255,0.75)', textAlign: 'center' }}>Get set up using test data and copy your work when going live.</span>
      <button style={{ padding: '5px 14px', background: '#635bff', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 600, color: '#fff', cursor: 'pointer', flexShrink: 0 }}>Get your live account</button>
    </div>

    {/* Chrome */}
    <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
      {/* Left Nav */}
      <div style={{ width: 228, borderRight: '1px solid #ebeef1', display: 'flex', flexDirection: 'column', flexShrink: 0, background: '#fff' }}>
        {/* Account row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px 10px', borderBottom: '1px solid #ebeef1' }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>🔧</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#21252c', lineHeight: '18px' }}>Default sandbox</div>
            <div style={{ fontSize: 12, color: '#8792a2', lineHeight: '16px' }}>Fieldwork</div>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><path d="M6 9l6 6 6-6" stroke="#8792a2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>

        {/* Nav items */}
        <div style={{ padding: '8px', display: 'flex', flexDirection: 'column', gap: 1 }}>
          {/* Home — active */}
          <div style={{ padding: '7px 10px', borderRadius: 6, background: '#f0f0ff', display: 'flex', alignItems: 'center', gap: 9 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z" fill="#635bff"/></svg>
            <span style={{ fontSize: 13, fontWeight: 500, color: '#635bff' }}>Home</span>
          </div>
          {[
            { label: 'Balances', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="#596171" strokeWidth="1.5"/><path d="M3 10h18" stroke="#596171" strokeWidth="1.5"/></svg> },
            { label: 'Transactions', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 9l4-4 4 4M7 5v14M21 15l-4 4-4-4M17 19V5" stroke="#596171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
            { label: 'Network', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="#596171" strokeWidth="1.5"/><path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" stroke="#596171" strokeWidth="1.5" strokeLinecap="round"/></svg> },
            { label: 'Product catalog', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16" stroke="#596171" strokeWidth="1.5" strokeLinecap="round"/></svg> },
          ].map(({ label, icon }) => (
            <div key={label} style={{ padding: '7px 10px', borderRadius: 6, display: 'flex', alignItems: 'center', gap: 9 }}>
              {icon}
              <span style={{ fontSize: 13, color: '#596171' }}>{label}</span>
            </div>
          ))}

          {/* Products section */}
          <div style={{ padding: '10px 10px 4px', fontSize: 11, fontWeight: 600, color: '#8792a2', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Products</div>
          {['Payments', 'Billing', 'Reporting', 'Risk', 'Apps', 'More'].map(item => (
            <div key={item} style={{ padding: '7px 10px', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 13, color: '#596171' }}>{item}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="#c0c4cc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          ))}
        </div>

        {/* Bottom: Developers */}
        <div style={{ marginTop: 'auto', padding: '12px 14px', borderTop: '1px solid #ebeef1', display: 'flex', alignItems: 'center', gap: 9 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M8 9l-3 3 3 3M16 9l3 3-3 3M14 6l-4 12" stroke="#596171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span style={{ fontSize: 13, color: '#596171' }}>Developers</span>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Topbar */}
        <div style={{ height: 60, borderBottom: '1px solid #ebeef1', display: 'flex', alignItems: 'center', padding: '0 24px', gap: 16, flexShrink: 0 }}>
          <div style={{ background: '#f5f6f8', borderRadius: 6, padding: '7px 12px', display: 'flex', alignItems: 'center', gap: 8, width: 280 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="#9ca3af" strokeWidth="1.5"/><path d="M21 21l-4.35-4.35" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#ebeef1' }} />
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#ebeef1' }} />
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#635bff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
          </div>
        </div>

        {/* Page content */}
        <div style={{ flex: 1, padding: '28px 32px', overflow: 'hidden' }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#21252c', margin: '0 0 24px', letterSpacing: '-0.5px' }}>Today</h1>

          {/* Metrics + chart row */}
          <div style={{ display: 'flex', gap: 0, marginBottom: 32 }}>
            {/* Left: chart area */}
            <div style={{ flex: 1, paddingRight: 32 }}>
              <div style={{ display: 'flex', gap: 48, marginBottom: 20 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6 }}>
                    <span style={{ fontSize: 13, color: '#596171' }}>Net volume</span>
                    <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="#596171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div style={{ fontSize: 26, fontWeight: 600, color: '#21252c', lineHeight: '1' }}>$0.00</div>
                  <div style={{ fontSize: 12, color: '#8792a2', marginTop: 3 }}>2:00 PM</div>
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6 }}>
                    <span style={{ fontSize: 13, color: '#596171' }}>Yesterday</span>
                    <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="#596171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 600, color: '#21252c', lineHeight: '1' }}>$0.00</div>
                </div>
              </div>
              {/* Chart */}
              <div style={{ height: 120, position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: '#ebeef1' }} />
                <div style={{ position: 'absolute', bottom: 20, left: 0, right: 0, height: 1, background: '#ebeef1' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', paddingTop: 4 }}>
                  <span style={{ fontSize: 11, color: '#8792a2' }}>12:00 AM</span>
                  <span style={{ fontSize: 11, color: '#635bff', fontWeight: 500 }}>Now, 2:00 PM</span>
                  <span style={{ fontSize: 11, color: '#8792a2' }}>11:59 PM</span>
                </div>
              </div>
            </div>

            {/* Right: USD Balance + Payouts */}
            <div style={{ width: 260, borderLeft: '1px solid #ebeef1', paddingLeft: 32 }}>
              <div style={{ marginBottom: 28 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ fontSize: 13, color: '#596171' }}>USD Balance</span>
                    <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="#596171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span style={{ fontSize: 13, color: '#635bff' }}>View</span>
                </div>
                <div style={{ fontSize: 26, fontWeight: 600, color: '#21252c' }}>$0.00</div>
                <div style={{ fontSize: 12, color: '#8792a2', marginTop: 3 }}>Available to pay out</div>
              </div>
              <div style={{ borderTop: '1px solid #ebeef1', paddingTop: 28 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, color: '#596171' }}>Payouts</span>
                  <span style={{ fontSize: 13, color: '#635bff' }}>View</span>
                </div>
                <div style={{ fontSize: 26, fontWeight: 600, color: '#21252c' }}>——</div>
                <div style={{ fontSize: 12, color: '#8792a2', marginTop: 3 }}>Expected today</div>
              </div>
            </div>
          </div>

          {/* Your overview */}
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#21252c', margin: '0 0 16px', letterSpacing: '-0.3px' }}>Your overview</h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              {[
                { label: 'Date range', value: 'Last 4 weeks', active: false },
                { label: 'Daily', value: null, active: false },
                { label: '⊕ Compare', value: null, active: false },
                { label: 'Previous period', value: null, active: true },
              ].map(({ label, value, active }) => (
                <div key={label} style={{ padding: '4px 10px', border: `1px solid ${active ? '#635bff' : '#ebeef1'}`, borderRadius: 16, fontSize: 12, color: active ? '#635bff' : '#596171', display: 'flex', alignItems: 'center', gap: 4 }}>
                  {label}{value && <span style={{ fontWeight: 500, color: '#21252c' }}> {value}</span>}
                  {label !== '⊕ Compare' && <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke={active ? '#635bff' : '#8792a2'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ padding: '6px 12px', border: '1px solid #ebeef1', borderRadius: 6, fontSize: 12, color: '#596171', background: '#fff' }}>+ Add</button>
              <button style={{ padding: '6px 12px', border: '1px solid #ebeef1', borderRadius: 6, fontSize: 12, color: '#596171', background: '#fff' }}>⚙ Edit</button>
            </div>
          </div>

          {/* Chart cards — blurred */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              { title: 'Total spend card', value: '$0.00', sub: '+0%' },
              { title: 'Spend by card', value: null, sub: null },
              { title: 'Spending limits', value: null, sub: null },
            ].map(({ title }, i) => (
              <div key={i} style={{ border: '1px solid #ebeef1', borderRadius: 8, padding: 16, height: 200, filter: 'blur(3px)', overflow: 'hidden' }}>
                <div style={{ height: 13, width: 120, background: '#d8dee4', borderRadius: 3, marginBottom: 10 }} />
                <div style={{ height: 22, width: 70, background: '#c4cad4', borderRadius: 3, marginBottom: 6 }} />
                <div style={{ height: 10, width: 48, background: '#e0e3e8', borderRadius: 2, marginBottom: 20 }} />
                <div style={{ height: 80, background: '#f0f2f5', borderRadius: 4 }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Setup guide — absolutely positioned over bottom-right */}
    <div style={{ position: 'absolute', right: 16, bottom: 16, width: 342, background: '#fff', borderRadius: 8, border: '1px solid #e0e3e8', boxShadow: '0 4px 24px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px' }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#21252c' }}>Setup guide</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="#8792a2" strokeWidth="1.5" strokeLinecap="round"/></svg>
      </div>
      {/* Progress bar */}
      <div style={{ height: 4, background: '#ebeef1', margin: '0 12px 0' }}>
        <div style={{ height: 4, width: 8, background: '#635bff', borderRadius: 2 }} />
      </div>
      {/* Set up Issuing — expanded */}
      <div style={{ padding: '0 8px 4px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 8px 6px' }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#21252c' }}>Set up Issuing</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M18 15l-6-6-6 6" stroke="#596171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div style={{ padding: '6px 8px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}><circle cx="8" cy="8" r="7" stroke="#c0c4cc" strokeWidth="1.5"/></svg>
          <span style={{ fontSize: 14, color: '#353a44' }}>Get started with Issuing</span>
        </div>
      </div>
      {/* Verify your account — collapsed */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderTop: '1px solid #ebeef1' }}>
        <span style={{ fontSize: 14, color: '#353a44' }}>Verify your account</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="#596171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
    </div>
  </div>
);

const SlideIssuingSetup = () => (
  <div style={{ width: '100%', marginTop: 30, overflow: 'hidden' }}>
    <Browser url="dashboard.stripe.com/test/dashboard" fillHeight>
      <div style={{ overflow: 'hidden', height: 'calc(100vh - 134px)' }}>
        <div style={{ transform: 'scale(0.9)', transformOrigin: 'top left', width: `${100 / 0.9}%`, height: `${100 / 0.9}%`, pointerEvents: 'none' }}>
          <FigmaDashboard />
        </div>
      </div>
    </Browser>
  </div>
);

const SLIDES = [Slide1, Slide2, Slide5, SlideTellUs, SlideRecFromWebsite, SlideWordCloud, SlideSandbox, SlideIssuingSetup, Slide7];

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
      <div className="px-16 pt-6 pb-4 text-center flex flex-col items-center gap-6">
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
        className={`flex-1 relative flex justify-center px-16 overflow-hidden ${[1, 2, 3, 4, 5, 6, 7, 8].includes(current) ? 'items-start' : 'items-center'}`}
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
