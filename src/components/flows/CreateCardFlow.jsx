import React, { useState } from 'react';
import Dialog from '../Dialog';
import EmbeddedButton from '../EmbeddedButton';
import Input from '../Input';
import cardImage from '../../assets/issuing-card.png';

const CreateCardFlow = ({ isOpen, onClose, themeColor = '#0085FF', hideBackdrop = false }) => {
  const [cardType, setCardType] = useState('virtual');
  const [cardNickname, setCardNickname] = useState('');

  const handleClose = () => {
    // Reset state when closing
    setCardType('virtual');
    setCardNickname('');
    onClose();
  };

  const handleSubmit = () => {
    console.log('Create card:', { cardType, cardNickname });
    handleClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      header="Create a card"
      size="medium"
      themeColor={themeColor}
      hideBackdrop={hideBackdrop}
      footer={
        <>
          <EmbeddedButton variant="secondary" onClick={handleClose}>
            Back
          </EmbeddedButton>
          <EmbeddedButton variant="primary" themeColor={themeColor} onClick={handleSubmit}>
            Create card
          </EmbeddedButton>
        </>
      }
    >
      <div className="space-y-4">
        {/* Card Preview */}
        <div className="flex justify-center py-4 bg-gray-100 rounded-lg">
          <img src={cardImage} alt="Card preview" className="w-3/4 rounded-lg shadow-lg" />
        </div>

        {/* Card Nickname */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Card nickname</label>
          <Input
            value={cardNickname}
            onChange={(e) => setCardNickname(e.target.value)}
            themeColor={themeColor}
          />
        </div>

        {/* Card Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Card type</label>
          <div className="space-y-2">
            {/* Virtual Option */}
            <button
              type="button"
              onClick={() => setCardType('virtual')}
              className={`w-full text-left p-3 border rounded-lg transition-colors ${cardType === 'virtual'
                ? 'border-2'
                : 'border border-gray-300 hover:bg-gray-50'
                }`}
              style={{
                borderColor: cardType === 'virtual' ? themeColor : undefined,
              }}
            >
              <div
                className="text-sm font-medium"
                style={{ color: cardType === 'virtual' ? themeColor : '#111827' }}
              >
                Virtual
              </div>
              <div className="text-sm text-gray-500">Virtual cards can be used instantly.</div>
            </button>

            {/* Physical Option */}
            <button
              type="button"
              onClick={() => setCardType('physical')}
              className={`w-full text-left p-3 border rounded-lg transition-colors ${cardType === 'physical'
                ? 'border-2'
                : 'border border-gray-300 hover:bg-gray-50'
                }`}
              style={{
                borderColor: cardType === 'physical' ? themeColor : undefined,
              }}
            >
              <div
                className="text-sm font-medium"
                style={{ color: cardType === 'physical' ? themeColor : '#111827' }}
              >
                Physical
              </div>
              <div className="text-sm text-gray-500">Physical cards are shipped to the cardholder.</div>
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default CreateCardFlow;
