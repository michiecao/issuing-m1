import React from 'react';

const TERMINAL_CARD_SVG_URL = new URL('../../assets/terminal-card-export.svg', import.meta.url).href;

export const TerminalVisual = () => (
  <div className="absolute right-[60px] top-1/2 -translate-y-[calc(50%-25px)]">
    <img
      src={TERMINAL_CARD_SVG_URL}
      alt="Terminal and Issuing card"
      className="w-[520px] h-auto"
      style={{ filter: 'drop-shadow(0px 4px 12px rgba(48,49,61,0.1)) drop-shadow(0px 16px 40px rgba(48,49,61,0.12))' }}
    />
  </div>
);
