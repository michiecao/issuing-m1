import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '../../icons/SailIcons';

export const NavItem = ({ icon, label, active, highlighted, to }) => {
  const isHighlighted = active || highlighted;
  const content = (
    <div className="flex items-center space-x-2 h-[30px] px-1 rounded-md cursor-pointer hover:bg-offset">
      {icon && (
        <div className={`w-6 h-6 flex items-center justify-center ${isHighlighted ? 'text-brand' : 'text-subdued'}`}>
          {icon}
        </div>
      )}
      <span className={`text-sm flex-1 ${isHighlighted ? 'text-brand font-medium' : 'text-default'}`}>{label}</span>
    </div>
  );

  if (to) {
    return <Link to={to} className="block">{content}</Link>;
  }
  return content;
};

export const SubNavItem = ({ label, active, highlighted, onClick, to }) => {
  const content = (
    <div
      className={`flex items-center space-x-2 h-[30px] px-1 rounded-md cursor-pointer hover:bg-offset`}
      onClick={!to ? onClick : undefined}
    >
      {/* Empty spacer to match icon width */}
      <div className="w-6 h-6 flex-shrink-0" />
      <span className={`text-sm ${highlighted ? 'text-brand font-medium' : 'text-default'}`}>{label}</span>
    </div>
  );

  if (to) {
    return <Link to={to} className="block">{content}</Link>;
  }
  return content;
};

export const SectionHeading = ({ label }) => (
  <div className="h-[26px] px-1 flex items-center">
    <span className="text-xs text-subdued">
      {label}
    </span>
  </div>
);

// Expandable nav item with sub-items (controlled via expandedSection prop)
const ExpandableNavItem = ({ icon, label, children, sectionId, expandedSection, onToggle }) => {
  const isExpanded = expandedSection === sectionId;

  return (
    <div>
      <div
        className="flex items-center space-x-2 h-[30px] px-1 rounded-md hover:bg-offset cursor-pointer relative"
        onClick={() => onToggle(isExpanded ? null : sectionId)}
      >
        {icon && (
          <div className="w-6 h-6 flex items-center justify-center text-subdued">
            {icon}
          </div>
        )}
        <span className="text-sm text-default flex-1">{label}</span>
        <div className="w-6 h-6 flex items-center justify-center">
          <Icon name="chevronDown" size="xxsmall" fill="currentColor" className={`w-[8px] h-[8px] transition-transform text-icon-default ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
      </div>
      <div
        className={`grid transition-[grid-template-rows] duration-200 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] ${isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <div className="pb-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Sidebar = ({ sandboxMode = false }) => {
  const location = useLocation();
  const [expandedSection, setExpandedSection] = React.useState('connect');

  // Helper to check if current path matches
  const isActive = (path) => location.pathname === path;

  return (
    <div className={`fixed left-0 w-sidebar-width bg-surface border-r border-border flex flex-col z-10 shrink-0 ${sandboxMode ? 'rounded-tl-xl overflow-hidden' : ''}`} style={{ top: sandboxMode ? SANDBOX_HEIGHT : 0, height: sandboxMode ? `calc(100vh - ${SANDBOX_HEIGHT}px)` : '100vh' }}>

      {/* Navigation */}
      <div className="flex-1 px-4 py-4 space-y-7">

        {/* Account Section - Rocket Rides branding */}
        <div className="p-1.5 -mx-0.5 rounded-lg flex items-center border-border hover:bg-offset gap-2 duration-100">
          <img src="/rocketrides.svg" alt="Rocket Rides" className="size-[24px] rounded" />
          <span className="font-semibold text-default text-sm">
            Rocket Rides
          </span>
        </div>

        {/* Main Navigation */}
        <div className="">
          <NavItem icon={<Icon name="home" size="small" fill="currentColor" />} label="Home" to="/" active={isActive('/')} />
          <NavItem icon={<Icon name="balance" size="small" fill="currentColor" />} label="Balances" to="/balances" active={isActive('/balances')} />
          <NavItem icon={<Icon name="arrowsLoop" size="small" fill="currentColor" />} label="Transactions" to="/transactions" active={isActive('/transactions')} />
          <NavItem icon={<Icon name="person" size="small" fill="currentColor" />} label="Directory" to="/directory" active={isActive('/directory')} />
          <NavItem icon={<Icon name="product" size="small" fill="currentColor" />} label="Product catalog" to="/product-catalog" active={isActive('/product-catalog')} />
        </div>

        {/* Products */}
        <div className="space-y-2">
          <SectionHeading label="Products" />
          <div className="">
            <ExpandableNavItem
              icon={<Icon name="platform" size="small" fill="currentColor" />}
              label="Connect"
              sectionId="connect"
              expandedSection={expandedSection}
              onToggle={setExpandedSection}
            >
              <SubNavItem
                label="Overview"
                to="/connect"
                highlighted={isActive('/connect')}
              />
              <SubNavItem
                label="Connected accounts"
                to="/connect/accounts"
                highlighted={isActive('/connect/accounts')}
              />
              <SubNavItem label="Accounts to review" />
              <SubNavItem
                label="Embedded finance"
                to="/embedded-finance"
                highlighted={isActive('/embedded-finance')}
              />
              <SubNavItem label="Capital" />
            </ExpandableNavItem>
            <ExpandableNavItem
              icon={<Icon name="wallet" size="small" fill="currentColor" />}
              label="Payments"
              sectionId="payments"
              expandedSection={expandedSection}
              onToggle={setExpandedSection}
            >
              <SubNavItem label="Analytics" />
              <SubNavItem label="Disputes" />
              <SubNavItem label="Radar" />
              <SubNavItem label="Payment Links" />
              <SubNavItem label="Terminal" />
            </ExpandableNavItem>
            <ExpandableNavItem
              icon={<Icon name="invoice" size="small" fill="currentColor" />}
              label="Billing"
              sectionId="billing"
              expandedSection={expandedSection}
              onToggle={setExpandedSection}
            >
              <SubNavItem label="Overview" />
              <SubNavItem label="Subscriptions" />
              <SubNavItem label="Invoices" />
              <SubNavItem label="Usage-based" />
              <SubNavItem label="Revenue recovery" />
            </ExpandableNavItem>
            <ExpandableNavItem
              icon={<Icon name="barChart" size="small" fill="currentColor" />}
              label="Reporting"
              sectionId="reporting"
              expandedSection={expandedSection}
              onToggle={setExpandedSection}
            >
              <SubNavItem label="Reports" />
              <SubNavItem label="Sigma" />
              <SubNavItem label="Revenue Recognition" />
              <SubNavItem label="Data management" />
            </ExpandableNavItem>
            <NavItem icon={<Icon name="more" size="small" fill="currentColor" />} label="More" />
          </div>
        </div>
      </div>
    </div>
  );
};

const SANDBOX_HEIGHT = 44;

export const SandboxBanner = () => (
  <>
    <div
      className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-5 bg-[#0E3359] text-white"
      style={{ height: SANDBOX_HEIGHT }}
    >
      <span className="text-sm font-medium">Sandbox</span>
      <span className="absolute left-1/2 -translate-x-1/2 text-sm text-white/80">
        You're testing in a sandbox. Changes you make here don't affect your live account.
      </span>
    </div>
    {/* Filler strip behind content for rounded corner reveal */}
    <div
      className="fixed left-0 right-0 bg-[#0E3359] z-[5]"
      style={{ top: SANDBOX_HEIGHT, height: 16 }}
    />
  </>
);

export { SANDBOX_HEIGHT };

export const Header = ({ sandboxMode = false }) => (
  <div className={`fixed left-sidebar-width right-0 h-[60px] bg-surface border-border z-10 ${sandboxMode ? 'rounded-tr-xl overflow-hidden' : ''}`} style={{ top: sandboxMode ? SANDBOX_HEIGHT : 0 }}>
    <div className="max-w-[1280px] w-full h-full mx-auto px-8 flex items-center justify-between">
      {/* Search */}
      <div className="w-[360px] focus-within:w-[500px] transition-[width] duration-100 ease-in-out">
        <div className="flex items-center space-x-2 px-3 py-2 bg-offset rounded-lg">
          <Icon name="search" size="small" fill="currentColor" className="text-icon-default flex-shrink-0" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent text-sm text-default placeholder:text-subdued outline-none w-full"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <button className="w-8 h-8 rounded-full flex items-center justify-center text-icon-default hover:bg-offset transition-colors cursor-pointer">
            <Icon name="apps" size="small" fill="currentColor" />
          </button>
          <button className="w-8 h-8 rounded-full flex items-center justify-center text-icon-default hover:bg-offset transition-colors cursor-pointer">
            <Icon name="notifications" size="small" fill="currentColor" />
          </button>
          <button className="w-8 h-8 rounded-full flex items-center justify-center text-icon-default hover:bg-offset transition-colors cursor-pointer">
            <Icon name="settings" size="small" fill="currentColor" />
          </button>
          <button className="w-8 h-8 rounded-full flex items-center justify-center text-brand hover:bg-offset transition-colors cursor-pointer">
            <Icon name="addCircleFilled" size="medium" fill="currentColor" />
          </button>
        </div>
      </div>
    </div>
  </div>
);
