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

export const BankingVisual = () => (
  <div>
    <div style={{ position: 'relative', width: 380 }}>
      {/* Card */}
      <div style={{
        width: 320, height: 200,
        background: 'linear-gradient(135deg, #635bff 0%, #8b5cf6 60%, #a855f7 100%)',
        borderRadius: 16, padding: '24px 28px',
        boxShadow: '0px 12px 32px rgba(99,91,255,0.45), 0px 4px 12px rgba(0,0,0,0.15)',
        position: 'relative', overflow: 'hidden', color: 'white',
      }}>
        <div style={{ position: 'absolute', right: -40, top: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
        <div style={{ position: 'absolute', right: 20, bottom: -60, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
          <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.3px' }}>Stripe</span>
          <span style={{ fontSize: 11, fontWeight: 600, opacity: 0.7, letterSpacing: 1 }}>VISA</span>
        </div>
        <div style={{ width: 34, height: 26, background: 'rgba(255,215,0,0.75)', borderRadius: 4, marginBottom: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 24, height: 18, border: '1px solid rgba(0,0,0,0.15)', borderRadius: 2, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 1 }}>
            {[0,1,2,3].map(i => <div key={i} style={{ background: 'rgba(0,0,0,0.1)', borderRadius: 1 }} />)}
          </div>
        </div>
        <div style={{ fontSize: 13, letterSpacing: 2.5, marginBottom: 18, opacity: 0.9, fontVariantNumeric: 'tabular-nums' }}>
          •••• &nbsp;•••• &nbsp;•••• &nbsp;4242
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontSize: 9, opacity: 0.55, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>Card Holder</div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Jane Smith</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 9, opacity: 0.55, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>Valid Thru</div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>12/28</div>
          </div>
        </div>
      </div>

      {/* 2% rewards floating box */}
      <div style={{
        position: 'absolute', top: -20, right: -24,
        background: 'white', borderRadius: 12,
        padding: '14px 18px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06)',
        minWidth: 148,
      }}>
        <div style={{ fontSize: 11, color: '#596171', marginBottom: 4 }}>Cashback earned</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
          <span style={{ fontSize: 30, fontWeight: 700, color: '#21252c', lineHeight: 1 }}>2%</span>
          <span style={{ fontSize: 13, color: '#596171' }}>back</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 7 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#228403', flexShrink: 0 }} />
          <span style={{ fontSize: 11, color: '#228403', fontWeight: 500 }}>On all purchases</span>
        </div>
      </div>
    </div>
  </div>
);
