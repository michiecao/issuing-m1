import React, { useState } from 'react';
import Dialog from './Dialog';
import EmbeddedButton from './EmbeddedButton';
import Badge from './Badge';
import issuingCardImage from '../assets/issuing-card.png';

const IssuingCard = ({ isOpen, onClose, card, themeColor = '#0085FF', hideBackdrop = false }) => {
  const [activeTab, setActiveTab] = useState('transactions');

  if (!card) return null;

  const tabs = [
    { id: 'transactions', label: 'Transactions' },
    { id: 'spend-controls', label: 'Spend controls' },
    { id: 'details', label: 'Details' },
  ];

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      size="medium"
      themeColor={themeColor}
      hideBackdrop={hideBackdrop}
      header={
        <div className="flex items-center gap-2">
          <span>{card.cardholder} (••••{card.lastFour})</span>
          <Badge variant={card.status === 'Active' ? 'success' : 'default'}>
            {card.status}
          </Badge>
        </div>
      }
    >
      <div className="space-y-4">
        {/* Card Image */}
        <div className="flex justify-center py-4 bg-gray-100 rounded-lg">
          <img src={issuingCardImage} alt="Card" className="w-3/4 rounded-lg shadow-lg" />
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id
                  ? ''
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              style={activeTab === tab.id ? { borderColor: themeColor, color: themeColor } : {}}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'transactions' && (
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center text-center">
            <span className="text-sm text-gray-500">No transactions yet</span>
          </div>
        )}

        {activeTab === 'spend-controls' && (
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center text-center">
            <span className="text-sm text-gray-500">No spend controls configured</span>
          </div>
        )}

        {activeTab === 'details' && (
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Card name</span>
              <span className="text-sm text-gray-900">{card.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Cardholder</span>
              <span className="text-sm text-gray-900">{card.cardholder}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Last 4 digits</span>
              <span className="text-sm text-gray-900">•••• {card.lastFour}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Created</span>
              <span className="text-sm text-gray-900">{card.created}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Status</span>
              <Badge variant={card.status === 'Active' ? 'success' : 'default'}>
                {card.status}
              </Badge>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <EmbeddedButton variant="primary" themeColor={themeColor} className="w-full">
            Deactivate card
          </EmbeddedButton>
          <EmbeddedButton variant="secondary" className="w-full">
            Replace card
          </EmbeddedButton>
          <EmbeddedButton variant="secondary" className="w-full">
            Cancel card
          </EmbeddedButton>
        </div>
      </div>
    </Dialog>
  );
};

export default IssuingCard;
