import React from 'react';

const TERMINAL_CARD_SVG_URL = new URL('../../assets/landing-view-hero.svg', import.meta.url).href;

export const TerminalVisual = () => (
  <img
    src={TERMINAL_CARD_SVG_URL}
    alt="Terminal and Issuing card"
    className="w-[468px] h-auto"
    style={{ filter: 'drop-shadow(0px 6px 16px rgba(0,0,0,0.2)) drop-shadow(0px 16px 40px rgba(0,0,0,0.25))' }}
  />
);

const imgGradientFrameClip = "https://www.figma.com/api/mcp/asset/10b2bad4-47d1-4984-bb29-01adcf9152ea";
const imgGram = "https://www.figma.com/api/mcp/asset/9cc89fd8-e9fb-4bb0-acee-831f370180e6";
const imgEdgeOutline = "https://www.figma.com/api/mcp/asset/683da495-80e9-4a4b-9f71-1de5c0586af1";

const MastercardLogo = () => (
  <svg width="38" height="24" viewBox="0 0 38 24" fill="none">
    <circle cx="14" cy="12" r="12" fill="#EB001B" fillOpacity="0.9" />
    <circle cx="24" cy="12" r="12" fill="#F79E1B" fillOpacity="0.9" />
    <path d="M19 4.8a12 12 0 0 1 0 14.4A12 12 0 0 1 19 4.8z" fill="#FF5F00" fillOpacity="0.9" />
  </svg>
);

export const BankingVisual = () => (
  <div style={{ position: 'relative', width: 500, height: 280 }}>
    {/* White panel — balance + transactions */}
    <div style={{
      position: 'absolute', left: 0, top: 0,
      width: 310, height: 260,
      background: 'white',
      borderRadius: 8,
      padding: '24px 28px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    }}>
      <div style={{ fontSize: 13, color: '#596171', marginBottom: 4 }}>Available balance</div>
      <div style={{ fontSize: 28, fontWeight: 700, color: '#21252c', letterSpacing: '-0.5px', marginBottom: 20 }}>$25,594.21</div>
      <div style={{ fontSize: 12, color: '#596171', marginBottom: 10 }}>Recent transactions</div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', color: '#8792a2', fontWeight: 500, paddingBottom: 6 }}>Amount</th>
            <th style={{ textAlign: 'left', color: '#8792a2', fontWeight: 500, paddingBottom: 6 }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {[
            { amount: '-$19.99', desc: 'Rideshare' },
            { amount: '-$25.40', desc: 'SaaS' },
            { amount: '-$1,290.00', desc: 'Shopping' },
          ].map(({ amount, desc }) => (
            <tr key={desc}>
              <td style={{ padding: '5px 0', color: '#21252c', fontVariantNumeric: 'tabular-nums' }}>{amount}</td>
              <td style={{ padding: '5px 0', color: '#596171' }}>{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Card — overlapping bottom-right */}
    <div style={{
      position: 'absolute', right: 0, bottom: 0,
      width: 263, height: 167,
      borderRadius: 9.4,
      overflow: 'hidden',
      boxShadow: '0 12px 32px rgba(80,60,160,0.35), 0 4px 12px rgba(0,0,0,0.15)',
    }}>
      {/* Gradient background from Figma */}
      <img src={imgGradientFrameClip} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />

      {/* Wave lines overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: "linear-gradient(48.89deg, rgb(127,98,197) 1.49%, rgb(232,222,248) 45.5%, rgb(132,105,208) 94.66%)",
        opacity: 0.65,
        borderRadius: 9.4,
      }} />

      {/* Card content */}
      <div style={{ position: 'relative', zIndex: 1, padding: '16px 18px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: 'white', boxSizing: 'border-box' }}>
        {/* Top: chip (upper right per Figma) */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <img src={imgGram} alt="" style={{ width: 24, height: 24, objectFit: 'contain' }} />
        </div>

        {/* Bottom: business label + mastercard */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <span style={{ fontSize: 12, fontWeight: 500, opacity: 0.85, letterSpacing: 0.5 }}>business</span>
          <MastercardLogo />
        </div>
      </div>

      {/* Edge outline overlay */}
      <img src={imgEdgeOutline} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }} />
    </div>
  </div>
);
