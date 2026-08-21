"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TokenStorePage() {
  const router = useRouter();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const t = localStorage.getItem('token');
    if (!t) router.push('/');
    // Mock fetching balance
    setBalance(50);
  }, [router]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--background)' }}>
      <div className="bg-blob bg-blob-1" style={{ opacity: 0.15 }} />

      <aside className="glass-panel" style={{ width: '280px', margin: '24px', padding: '32px 24px', display: 'flex', flexDirection: 'column', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px' }}>
          <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, var(--secondary), var(--primary))', borderRadius: '8px' }} />
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Interlectic</h2>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
          <div onClick={() => router.push('/dashboard')} style={{ padding: '12px 16px', color: 'var(--text-muted)', cursor: 'pointer', borderRadius: '8px' }} className="hover:bg-slate-800">
            ← Back to Dashboard
          </div>
          <div style={{ padding: '12px 16px', background: 'rgba(234, 179, 8, 0.15)', borderLeft: '4px solid #eab308', borderRadius: '0 8px 8px 0', color: 'var(--text-main)', fontWeight: 600 }}>
            🪙 Buy Tokens
          </div>
        </nav>
      </aside>

      <main style={{ flex: 1, padding: '48px', overflowY: 'auto', zIndex: 10 }}>
        <header style={{ marginBottom: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '3rem', fontWeight: 800, color: '#eab308' }}>Token Store</h1>
            <p style={{ color: 'var(--text-muted)' }}>Purchase tokens to buy courses and student licenses.</p>
          </div>
          <div className="glass-panel" style={{ padding: '16px 32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Current Balance</span>
            <span style={{ fontSize: '2rem', fontWeight: 800, color: '#eab308' }}>{balance} 🪙</span>
          </div>
        </header>

        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          
          <div className="glass-panel" style={{ flex: 1, minWidth: '250px', padding: '32px', textAlign: 'center', borderTop: '4px solid #94a3b8' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '16px' }}>Starter Pack</h3>
            <div style={{ fontSize: '3rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>100 <span style={{ fontSize: '1.5rem' }}>🪙</span></div>
            <div style={{ color: '#94a3b8', fontSize: '1.5rem', fontWeight: 600, marginBottom: '32px' }}>$50 USD</div>
            <button className="btn-secondary" style={{ width: '100%', padding: '12px' }}>Buy Now</button>
          </div>

          <div className="glass-panel" style={{ flex: 1, minWidth: '250px', padding: '32px', textAlign: 'center', borderTop: '4px solid #eab308', transform: 'scale(1.05)', boxShadow: '0 10px 30px rgba(234, 179, 8, 0.2)' }}>
            <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#eab308', color: '#000', padding: '4px 16px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 700 }}>MOST POPULAR</div>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '16px' }}>Professional Bundle</h3>
            <div style={{ fontSize: '3.5rem', fontWeight: 800, color: '#eab308', marginBottom: '8px' }}>500 <span style={{ fontSize: '1.5rem' }}>🪙</span></div>
            <div style={{ color: '#fef08a', fontSize: '1.5rem', fontWeight: 600, marginBottom: '16px' }}>$200 USD</div>
            <p style={{ color: '#eab308', fontSize: '0.9rem', marginBottom: '24px' }}>Save 20%</p>
            <button className="btn-primary" style={{ width: '100%', padding: '12px', background: '#eab308', color: '#000' }}>Buy Now</button>
          </div>

          <div className="glass-panel" style={{ flex: 1, minWidth: '250px', padding: '32px', textAlign: 'center', borderTop: '4px solid #c084fc' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '16px' }}>School Enterprise</h3>
            <div style={{ fontSize: '3rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>2000 <span style={{ fontSize: '1.5rem' }}>🪙</span></div>
            <div style={{ color: '#c084fc', fontSize: '1.5rem', fontWeight: 600, marginBottom: '16px' }}>$700 USD</div>
            <p style={{ color: '#c084fc', fontSize: '0.9rem', marginBottom: '24px' }}>Save 30%</p>
            <button className="btn-secondary" style={{ width: '100%', padding: '12px', border: '1px solid #c084fc', color: '#c084fc' }}>Buy Now</button>
          </div>

        </div>

        {/* Legal & Policy Notice */}
        <div className="glass-panel" style={{ marginTop: '48px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '4px' }}>🛡️ Purchase Protection & Policies</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>All token transactions are encrypted and secured. Unused tokens are covered by our 14-day policy.</p>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="/refund-policy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontSize: '0.9rem', textDecoration: 'none' }}>
              💳 Refund Policy
            </a>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontSize: '0.9rem', textDecoration: 'none' }}>
              🔒 Privacy Policy
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
