import React, { useState } from 'react';
import { Icon } from '../icons/SailIcons';

export const featureDefaults = {};
export { featureDefaults as initialVariables };

// Explores where "Cards" should live in the dashboard nav when a business uses
// both Balances (banking, cards for your own business spend) and Issuing
// (infrastructure, cards you issue to your customers). Terminology follows the
// "For your business" / "For your customers" framing established in the
// Direction B user journey deck.

const DIRECTIONS = [
  {
    key: 'separate',
    label: 'Separate products',
    description: 'Balances and Issuing stay fully distinct — each gets its own Cards sub-item, own list, own branding.',
  },
  {
    key: 'unified',
    label: 'One unified Cards hub',
    description: 'A single "Cards" nav item and list. "For your business" vs. "For your customers" is a filter, not a different product.',
  },
  {
    key: 'contextual',
    label: 'Contextual placement',
    description: 'Same underlying capability, but it surfaces wherever the relevant money already lives — Balances for your business, Connect for your customers.',
  },
];

const BUSINESS_CARD = {
  name: 'Marketing •• 3826',
  holder: 'Steven Johnson',
  label: 'For your business',
  gradient: 'linear-gradient(135deg, #635bff 0%, #8b5cf6 100%)',
  network: 'MC',
  spend: '$4,838.62',
  pct: 48,
};

const CUSTOMER_CARD = {
  name: 'Driver payout •• 7710',
  holder: "Jordan T. — Acme Rides driver",
  label: 'For your customers',
  gradient: 'linear-gradient(135deg, #0f766e 0%, #0d9488 100%)',
  network: 'VISA',
  spend: '$1,204.10',
  pct: 22,
};

const NavItem = ({ label, active, indent, icon: IconName }) => (
  <div
    className={`w-full flex items-center gap-2 h-[30px] rounded-md text-[14px] leading-[20px] tracking-[-0.15px] ${
      active ? 'text-[#533afd] font-semibold' : 'text-[#353a44] font-normal'
    } ${indent ? 'pl-8' : ''}`}
  >
    {IconName && !indent && (
      <span className="w-6 h-6 flex items-center justify-center shrink-0">
        <Icon name={IconName} size="small" fill="currentColor" />
      </span>
    )}
    <span className="truncate">{label}</span>
  </div>
);

const SectionHeading = ({ label }) => (
  <div className="h-[26px] flex items-center">
    <span className="text-[12px] leading-[20px] text-[#596171]">{label}</span>
  </div>
);

function MockSidebar({ direction }) {
  if (direction === 'separate') {
    return (
      <div className="flex flex-col gap-5">
        <div>
          <SectionHeading label="Products" />
          <NavItem icon="bank" label="Balances" />
          <NavItem label="Cards" indent active />
        </div>
        <div>
          <NavItem icon="platform" label="Issuing" />
          <NavItem label="Cards" indent />
        </div>
      </div>
    );
  }
  if (direction === 'unified') {
    return (
      <div className="flex flex-col gap-0.5">
        <SectionHeading label="Products" />
        <NavItem icon="createCards" label="Cards" active />
        <NavItem label="All cards" indent active />
        <NavItem label="For your business" indent />
        <NavItem label="For your customers" indent />
      </div>
    );
  }
  // contextual
  return (
    <div className="flex flex-col gap-5">
      <div>
        <SectionHeading label="Products" />
        <NavItem icon="bank" label="Balances" />
        <NavItem label="Cards" indent active />
      </div>
      <div>
        <NavItem icon="platform" label="Connect" />
        <NavItem label="Connected accounts" indent />
        <NavItem label="Cards" indent />
      </div>
    </div>
  );
}

function CardChip({ gradient, network }) {
  return (
    <div
      className="w-10 h-7 rounded-md shrink-0 flex flex-col justify-between p-1"
      style={{ background: gradient, boxShadow: '0 2px 6px rgba(0,0,0,0.18)' }}
    >
      <div className="w-2.5 h-2 rounded-sm bg-white/50" />
      <span className="text-white/70 font-bold text-right" style={{ fontSize: 6 }}>{network}</span>
    </div>
  );
}

function CardRow({ card, showTag }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-[#ebeef1] last:border-b-0">
      <CardChip gradient={card.gradient} network={card.network} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[#353a44] truncate">{card.name}</span>
          {showTag && (
            <span
              className={`inline-flex items-center px-1.5 py-0.5 text-xs font-medium rounded-sm ${
                card.label === 'For your business' ? 'bg-[#f0eeff] text-[#533afd]' : 'bg-[#e6f5f3] text-[#0d9488]'
              }`}
            >
              {card.label}
            </span>
          )}
        </div>
        <p className="text-xs text-[#596171] truncate">{card.holder}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <div className="w-[70px] h-[6px] bg-[#f5f6f8] rounded-full overflow-hidden">
          <div className="h-full rounded-full bg-[#9966ff]" style={{ width: `${card.pct}%` }} />
        </div>
        <span className="text-sm text-[#353a44] w-[70px] text-right">{card.spend}</span>
      </div>
    </div>
  );
}

function MockContent({ direction }) {
  if (direction === 'separate') {
    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-[#ebeef1] rounded-xl p-4">
          <h3 className="text-sm font-semibold text-[#353a44] mb-1">Balances cards</h3>
          <p className="text-xs text-[#596171] mb-3">For your business's own spend.</p>
          <CardRow card={BUSINESS_CARD} />
        </div>
        <div className="bg-white border border-[#ebeef1] rounded-xl p-4">
          <h3 className="text-sm font-semibold text-[#353a44] mb-1">Issuing cards</h3>
          <p className="text-xs text-[#596171] mb-3">Cards you issue to your customers.</p>
          <CardRow card={CUSTOMER_CARD} />
        </div>
      </div>
    );
  }
  if (direction === 'unified') {
    return (
      <div className="bg-white border border-[#ebeef1] rounded-xl p-4">
        <h3 className="text-sm font-semibold text-[#353a44] mb-1">Cards</h3>
        <p className="text-xs text-[#596171] mb-3">Every card your business has created, in one list.</p>
        <CardRow card={BUSINESS_CARD} showTag />
        <CardRow card={CUSTOMER_CARD} showTag />
      </div>
    );
  }
  // contextual
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white border border-[#ebeef1] rounded-xl p-4">
        <h3 className="text-sm font-semibold text-[#353a44] mb-1">Your business's cards</h3>
        <p className="text-xs text-[#596171] mb-3">Lives inside Balances, next to your accounts.</p>
        <CardRow card={BUSINESS_CARD} />
      </div>
      <div className="bg-white border border-[#ebeef1] rounded-xl p-4">
        <h3 className="text-sm font-semibold text-[#353a44] mb-1">Your customers' cards</h3>
        <p className="text-xs text-[#596171] mb-3">Lives inside Connect, next to connected accounts.</p>
        <CardRow card={CUSTOMER_CARD} />
      </div>
    </div>
  );
}

const CardsPositioning = () => {
  const [direction, setDirection] = useState('separate');
  const active = DIRECTIONS.find((d) => d.key === direction);

  return (
    <div className="flex flex-col h-screen bg-[#f5f6f8]">
      <div className="h-[52px] shrink-0 flex items-center gap-3 px-4 border-b border-[#ebeef1] bg-white">
        <a href="#" className="text-sm text-[#596171] hover:text-[#353a44] transition-colors flex items-center gap-1">
          <Icon name="chevronDownSmall" size={8} fill="currentColor" className="rotate-90" />
          Back to all prototypes
        </a>
        <span className="text-sm font-medium text-[#353a44]">Cards positioning</span>
      </div>

      <div className="flex-1 flex min-h-0">
        <div className="w-[228px] shrink-0 border-r border-[#ebeef1] bg-white px-5 py-5 overflow-y-auto">
          <MockSidebar direction={direction} />
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <h1 className="text-[22px] font-bold text-[#21252c] mb-1">Cards</h1>
          <p className="text-sm text-[#596171] mb-4">{active.description}</p>
          <MockContent direction={direction} />
        </div>
      </div>

      <div className="fixed bottom-5 left-5 w-[280px] bg-white rounded-lg shadow-lg border border-[#ebeef1] p-3 space-y-2">
        <span className="text-xs font-medium text-[#596171] uppercase tracking-wide">Positioning direction</span>
        {DIRECTIONS.map((d) => (
          <button
            key={d.key}
            onClick={() => setDirection(d.key)}
            className={`w-full text-left rounded-md border px-3 py-2 transition-colors cursor-pointer ${
              direction === d.key ? 'border-[#533afd] bg-[#f0eeff]' : 'border-[#ebeef1] hover:bg-[#f5f6f8]'
            }`}
          >
            <span className={`text-sm font-medium block ${direction === d.key ? 'text-[#533afd]' : 'text-[#353a44]'}`}>{d.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CardsPositioning;
