import React, { useState } from 'react';
import Dialog from '../Dialog';
import EmbeddedButton from '../EmbeddedButton';
import Input, { Textarea, Select } from '../Input';
import * as Icons from '../icons';

// Currency to flag icon mapping
const currencyFlags = {
  USD: Icons.USFlag,
  EUR: Icons.EUFlag,
  GBP: Icons.UKFlag,
  CAD: Icons.CAFlag,
  AUD: Icons.AUFlag,
};

// Mock recipients data
const mockRecipients = [
  { id: 1, name: 'Eric L', email: 'eliang@stripe.com' },
  { id: 2, name: 'Dave W', email: 'dw@stripe.com' },
];

const SendFlow = ({ isOpen, onClose, themeColor = '#0085FF', currencies = ['USD'], hideBackdrop = false }) => {
  const [step, setStep] = useState('choose-recipient'); // 'choose-recipient' or 'payment-details'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [amount, setAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0] || 'USD');
  const [note, setNote] = useState('');

  const handleClose = () => {
    onClose();
    // Delay state reset until after dialog close animation (200ms)
    setTimeout(() => {
      setStep('choose-recipient');
      setSearchQuery('');
      setSelectedRecipient(null);
      setAmount('');
      setNote('');
    }, 200);
  };

  const handleSelectRecipient = (recipient) => {
    setSelectedRecipient(recipient);
    setStep('payment-details');
  };

  const handleBack = () => {
    setStep('choose-recipient');
  };

  const handleSubmit = () => {
    console.log('Send payment:', { amount, selectedCurrency, recipient: selectedRecipient, note });
    handleClose();
  };

  const filteredRecipients = mockRecipients.filter(
    (r) =>
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const FlagIcon = currencyFlags[selectedCurrency];

  // Step 1: Choose a recipient
  if (step === 'choose-recipient') {
    return (
      <Dialog
        isOpen={isOpen}
        onClose={handleClose}
        header="Send"
        subheader="Choose a recipient"
        size="small"
        hideBackdrop={hideBackdrop}
        themeColor={themeColor}
      >
        <div className="space-y-4">
          {/* Search Input */}
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or email"
            themeColor={themeColor}
            icon={Icons.SearchIcon}
          />

          {/* Add New Recipient Link */}
          <button
            type="button"
            className="flex items-center gap-1 text-sm font-medium"
            style={{ color: themeColor }}
          >
            <Icons.PlusIcon size={16} /> Add a new recipient
          </button>

          {/* Recipients List */}
          <div className="space-y-1 ml-[-8px]">
            {filteredRecipients.map((recipient) => (
              <button
                key={recipient.id}
                type="button"
                onClick={() => handleSelectRecipient(recipient)}
                className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                <div className="text-sm font-medium text-gray-900">{recipient.name}</div>
                <div className="text-sm text-gray-500">{recipient.email}</div>
              </button>
            ))}
            {filteredRecipients.length === 0 && searchQuery && (
              <div className="text-sm text-gray-500 px-3 py-2">No recipients found</div>
            )}
          </div>
        </div>
      </Dialog>
    );
  }

  // Step 2: Payment details
  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      header="Send"
      subheader={`To ${selectedRecipient?.name}`}
      size="small"
      hideBackdrop={hideBackdrop}
      themeColor={themeColor}
      footer={
        <>
          <EmbeddedButton variant="secondary" onClick={handleBack}>
            Back
          </EmbeddedButton>
          <EmbeddedButton variant="primary" themeColor={themeColor} onClick={handleSubmit}>
            Send
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

        {/* Recipient Info */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
          <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-md bg-gray-50">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
              {selectedRecipient?.name?.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">{selectedRecipient?.name}</div>
              <div className="text-xs text-gray-500">{selectedRecipient?.email}</div>
            </div>
          </div>
        </div>

        {/* Note */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Note (optional)</label>
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note for the recipient"
            themeColor={themeColor}
            rows={2}
          />
        </div>

        {/* Info Box */}
        <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-md">
          <Icons.InfoIcon size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-blue-800">
            Payments are typically delivered within 1-2 business days.
          </p>
        </div>
      </div>
    </Dialog>
  );
};

export default SendFlow;
