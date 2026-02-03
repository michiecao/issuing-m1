import React from 'react';
import * as Icons from './icons';

export const NavItem = ({ icon, label }) => (
  <div className="flex items-center space-x-2 h-[30px] px-1 rounded-md hover:bg-gray-50 cursor-pointer">
    {icon && (
      <div className="w-4 h-4 bg-gray-300 rounded-sm" />
    )}
    <span className="text-sm text-gray-700 flex-1">{label}</span>
  </div>
);

export const SectionHeading = ({ label }) => (
  <div className="h-[26px] flex items-center">
    <span className="text-xs text-[#596171]">
      {label}
    </span>
  </div>
);

export const Sidebar = () => (
  <div className="left-0 top-0 w-[250px] bg-white border-r border-gray-200 flex flex-col h-screen z-10 shrink-0">
    {/* Account Section */}
    <div className="h-[60px] px-5 flex items-center border-gray-200">
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-yellow-300 rounded-sm flex items-center justify-center text-white text-xs font-bold">
          C
        </div>
        <span className="font-semibold text-gray-800 text-sm">
          Cactus Practice
        </span>
      </div>
    </div>

    {/* Navigation */}
    <div className="flex-1 px-5 py-5 space-y-7">
      {/* Main Navigation */}
      <div className="">
        <NavItem icon={<Icons.HomeIcon />} label="Home" />
        <NavItem icon={<Icons.BalanceIcon />} label="Balances" />
        <NavItem icon={<Icons.TransactionsIcon />} label="Transactions" />
        <NavItem icon={<Icons.DirectoryIcon />} label="Customers" />
        <NavItem icon={<Icons.ProductIcon />} label="Product catalog" />
      </div>

      {/* Shortcuts */}
      <div className="space-y-2">
        <SectionHeading label="Shortcuts" />
        <div className="">
          <NavItem icon={<Icons.FraudToolsIcon />} label="Fraud tools" />
          <NavItem icon={<Icons.RecentIcon />} label="Recent item" />
        </div>
      </div>

      {/* Products */}
      <div className="space-y-2">
        <SectionHeading label="Products" />
        <div className="">
          <NavItem icon={<Icons.ConnectIcon />} label="Connect" />
          <NavItem icon={<Icons.PaymentsIcon />} label="Payments" />
          <NavItem icon={<Icons.BillingIcon />} label="Billing" />
          <NavItem icon={<Icons.ReportingIcon />} label="Reporting" />
          <NavItem icon={<Icons.MoreIcon />} label="More" />
        </div>
      </div>
    </div>
  </div>
);

export const Header = () => (
  <div className="h-[60px] bg-white border-gray-200 px-6 flex items-center justify-between fixed top-0 z-10 max-w-[1280px] w-[calc(100%-266px)]">
    {/* Search */}
    <div className="flex-1 max-w-[500px]">
      <div className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg transition-all hover:bg-gray-100 cursor-pointer">
        <Icons.SearchIcon />
        <span className="text-sm text-gray-500">Search</span>
      </div>
    </div>

    {/* Actions */}
    <div className="flex items-center space-x-6">
      <span className="text-sm font-semibold">Developers</span>
      <span className="text-sm font-semibold">Sandboxes</span>
      <div className="flex items-center space-x-4">
        <button className="w-4 h-4 text-gray-600 hover:text-gray-800 relative">
          <Icons.NotificationIcon />
        </button>
        <button className="w-4 h-4 text-gray-600 hover:text-gray-800">
          <Icons.SettingsIcon />
        </button>
        <button className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs">
          +
        </button>
      </div>
    </div>
  </div>
);
