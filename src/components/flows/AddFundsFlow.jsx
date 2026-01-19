import React, { useState } from 'react';
import Dialog from '../Dialog';
import EmbeddedButton from '../EmbeddedButton';
import Input, { Select } from '../Input';
import * as Icons from '../icons';

// Currency to flag icon mapping
const currencyFlags = {
  USD: Icons.USFlag,
  EUR: Icons.EUFlag,
  GBP: Icons.UKFlag,
  CAD: Icons.CAFlag,
  AUD: Icons.AUFlag,
};

const AddFundsFlow = ({ isOpen, onClose, themeColor = '#0085FF', currencies = ['USD'], hideBackdrop = false }) => {
  const [amount, setAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0] || 'USD');
  const [fundingSource, setFundingSource] = useState('');

  const handleSubmit = () => {
    console.log('Add funds:', { amount, selectedCurrency, fundingSource });
    onClose();
  };

  const FlagIcon = currencyFlags[selectedCurrency];

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      header="Add funds"
      subheader="Transfer money into your account"
      size="small"
      hideBackdrop={hideBackdrop}
      themeColor={themeColor}
      footer={
        <>
          <EmbeddedButton variant="secondary" onClick={onClose}>
            Cancel
          </EmbeddedButton>
          <EmbeddedButton variant="primary" themeColor={themeColor} onClick={handleSubmit}>
            Add funds
          </EmbeddedButton>
        </>
      }
    >
      <div className="space-y-4">
        {/* Amount Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
          <div className="flex">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <Input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                themeColor={themeColor}
                className="pl-7 rounded-l-md rounded-r-none"
              />
            </div>
            <Select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              themeColor={themeColor}
              className="border-l-0 rounded-l-none rounded-r-md bg-gray-50"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* Destination Account */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
          <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-md bg-gray-50">
            {FlagIcon && <FlagIcon size={20} />}
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">{selectedCurrency} Account</div>
              <div className="text-xs text-gray-500">Current balance: $10,000.00</div>
            </div>
          </div>
        </div>

        {/* Funding Source */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
          <Select
            value={fundingSource}
            onChange={(e) => setFundingSource(e.target.value)}
            themeColor={themeColor}
            className="w-full"
          >
            <option value="">Select funding source</option>
            <option value="bank-1">Bank Account ••••1234</option>
            <option value="bank-2">Bank Account ••••5678</option>
            <option value="new">+ Add new bank account</option>
          </Select>
        </div>

        {/* Info Box */}
        <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-md">
          <Icons.InfoIcon size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-blue-800">
            Funds from bank transfers typically arrive within 1-3 business days.
          </p>
        </div>
      </div>
    </Dialog>
  );
};

export default AddFundsFlow;
