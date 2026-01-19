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

const ConvertFlow = ({ isOpen, onClose, themeColor = '#0085FF', currencies = ['USD'], hideBackdrop = false }) => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState(currencies[0] || 'USD');
  const [toCurrency, setToCurrency] = useState(currencies[1] || currencies[0] || 'USD');

  const handleSubmit = () => {
    console.log('Convert:', { amount, fromCurrency, toCurrency });
    onClose();
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const FromFlag = currencyFlags[fromCurrency];
  const ToFlag = currencyFlags[toCurrency];

  // Mock exchange rate
  const exchangeRate = 1.08;
  const convertedAmount = amount ? (parseFloat(amount) * exchangeRate).toFixed(2) : '0.00';

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      header="Convert currency"
      subheader="Exchange between your currency balances"
      size="small"
      hideBackdrop={hideBackdrop}
      themeColor={themeColor}
      footer={
        <>
          <EmbeddedButton variant="secondary" onClick={onClose}>
            Cancel
          </EmbeddedButton>
          <EmbeddedButton variant="primary" themeColor={themeColor} onClick={handleSubmit}>
            Convert
          </EmbeddedButton>
        </>
      }
    >
      <div className="space-y-4">
        {/* From Currency */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 z-10">
                {fromCurrency === 'USD' ? '$' : fromCurrency === 'EUR' ? '€' : fromCurrency === 'GBP' ? '£' : '$'}
              </span>
              <Input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                themeColor={themeColor}
                className="pl-7"
              />
            </div>
            <Select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              themeColor={themeColor}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </Select>
          </div>
          <div className="text-xs text-gray-500 mt-1">Available: $10,000.00</div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSwap}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <Icons.ConvertIcon size={16} />
          </button>
        </div>

        {/* To Currency */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 z-10">
                {toCurrency === 'USD' ? '$' : toCurrency === 'EUR' ? '€' : toCurrency === 'GBP' ? '£' : '$'}
              </span>
              <Input
                value={convertedAmount}
                readOnly
                themeColor={themeColor}
                className="pl-7 bg-gray-50 text-gray-600"
              />
            </div>
            <Select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              themeColor={themeColor}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* Exchange Rate Info */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md text-sm">
          <span className="text-gray-600">Exchange rate</span>
          <span className="font-medium text-gray-900">1 {fromCurrency} = {exchangeRate} {toCurrency}</span>
        </div>
      </div>
    </Dialog>
  );
};

export default ConvertFlow;
