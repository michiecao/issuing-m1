import React from 'react';

const TERMINAL_CARD_SVG_URL = new URL('../../assets/landing-view-hero.svg', import.meta.url).href;

export const TerminalVisual = () => (
  <div className="absolute right-[60px] top-1/2 -translate-y-[calc(50%-25px)]">
    <img
      src={TERMINAL_CARD_SVG_URL}
      alt="Terminal and Issuing card"
      className="w-[468px] h-auto"
      style={{ filter: 'drop-shadow(0px 6px 16px rgba(0,0,0,0.2)) drop-shadow(0px 16px 40px rgba(0,0,0,0.25))' }}
    />
  </div>
);
