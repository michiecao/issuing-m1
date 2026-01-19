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

const TransferFlow = ({ isOpen, onClose, themeColor = '#0085FF', currencies = ['USD'], hideBackdrop = false }) => {
  const [step, setStep] = useState('choose-type');
  const [transferType, setTransferType] = useState(null);
  const [amount, setAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0] || 'USD');
  const [destination, setDestination] = useState('');
  const [fromCurrency, setFromCurrency] = useState(currencies[0] || 'USD');
  const [toCurrency, setToCurrency] = useState(currencies[1] || currencies[0] || 'USD');

  const handleClose = () => {
    onClose();
    // Delay state reset until after dialog close animation (200ms)
    setTimeout(() => {
      setStep('choose-type');
      setTransferType(null);
      setAmount('');
      setDestination('');
    }, 200);
  };

  const handleSubmit = () => {
    console.log('Transfer:', { transferType, amount, selectedCurrency, destination, fromCurrency, toCurrency });
    handleClose();
  };

  const handleSelectType = (type) => {
    setTransferType(type);
    setStep('details');
  };

  const FlagIcon = currencyFlags[selectedCurrency];
  const FromFlag = currencyFlags[fromCurrency];
  const ToFlag = currencyFlags[toCurrency];

  // Step 1: Choose transfer type
  if (step === 'choose-type') {
    return (
      <Dialog
        isOpen={isOpen}
        onClose={handleClose}
        header="Transfer"
        subheader="Transfer or convert funds."
        size="small"
        hideBackdrop={hideBackdrop}
        themeColor={themeColor}
      >
        <div className="space-y-2 w-full">
          {/* Pay out to external bank account */}
          <button
            onClick={() => handleSelectType('payout')}
            className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors text-left"
          >
            <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center flex-shrink-0">
              <Icons.PayoutIcon size={20} className="text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900">Pay out to external bank account</div>
              <div className="text-sm text-gray-500">Funds arrive in 1-3 business days</div>
            </div>
            <div className="flex-shrink-0 text-gray-700"><Icons.ChevronRightIcon size={12} /></div>
          </button>

          {/* Transfer between balances */}
          <button
            onClick={() => handleSelectType('internal')}
            className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors text-left"
          >
            <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center flex-shrink-0">
              <Icons.ConvertIcon size={16} className="text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900">Transfer between balances</div>
              <div className="text-sm text-gray-500">Funds arrive instantly</div>
            </div>
            <div className="flex-shrink-0 text-gray-700">
              <Icons.ChevronRightIcon size={12} />
            </div>
          </button>
        </div>
      </Dialog>
    );
  }

  // Step 2: Transfer details (payout)
  if (transferType === 'payout') {
    return (
      <Dialog
        isOpen={isOpen}
        onClose={handleClose}
        header="Transfer"
        subheader="Pay out to external bank account"
        size="small"
        hideBackdrop={hideBackdrop}
        themeColor={themeColor}
        footer={
          <>
            <EmbeddedButton variant="secondary" onClick={() => setStep('choose-type')}>
              Back
            </EmbeddedButton>
            <EmbeddedButton variant="primary" themeColor={themeColor} onClick={handleSubmit}>
              Transfer
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
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 z-10">$</span>
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

          {/* From Account */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
            <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-md bg-gray-50">
              {FlagIcon && <FlagIcon size={20} />}
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">{selectedCurrency} Account</div>
                <div className="text-xs text-gray-500">Available: $10,000.00</div>
              </div>
            </div>
          </div>

          {/* Destination */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
            <Select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              themeColor={themeColor}
              className="w-full"
            >
              <option value="">Select destination</option>
              <option value="checking">Checking Account ••••1234</option>
              <option value="savings">Savings Account ••••5678</option>
              <option value="external">Add external account</option>
            </Select>
          </div>

          {/* Info Box */}
          <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-md">
            <Icons.InfoIcon size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-800">
              Transfers to external accounts typically take 1-3 business days.
            </p>
          </div>
        </div>
      </Dialog>
    );
  }

  // Step 2: Transfer details (internal/between balances)
  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      header="Transfer"
      subheader="Transfer between balances"
      size="small"
      hideBackdrop={hideBackdrop}
      themeColor={themeColor}
      footer={
        <>
          <EmbeddedButton variant="secondary" onClick={() => setStep('choose-type')}>
            Back
          </EmbeddedButton>
          <EmbeddedButton variant="primary" themeColor={themeColor} onClick={handleSubmit}>
            Transfer
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
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 z-10">$</span>
              <Input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                themeColor={themeColor}
                className="pl-7 rounded-l-md rounded-r-none"
              />
            </div>
            <Select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
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

        {/* From Account */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
          <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-md bg-gray-50">
            {FromFlag && <FromFlag size={20} />}
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">{fromCurrency} Account</div>
              <div className="text-xs text-gray-500">Available: $10,000.00</div>
            </div>
          </div>
        </div>

        {/* To Account */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
          <Select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            themeColor={themeColor}
            className="w-full"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency} Account
              </option>
            ))}
          </Select>
        </div>

        {/* Info Box */}
        <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-md">
          <Icons.InfoIcon size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-blue-800">
            Transfers between balances arrive instantly.
          </p>
        </div>
      </div>
    </Dialog>
  );
};

export default TransferFlow;
