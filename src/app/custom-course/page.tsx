"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CustomCoursePage() {
  const router = useRouter();
  
  // Slider states
  const [deliveryDays, setDeliveryDays] = useState(30); // 5 to 90
  const [freeStudents, setFreeStudents] = useState(30); // 10 to 100
  const [totalPages, setTotalPages] = useState(15); // 5 to 50
  const [interactivePages, setInteractivePages] = useState(5); // 1 to 20
  const [complexity, setComplexity] = useState(2); // 1=Basic, 2=Standard, 3=High, 4=Advanced (Physics/Chem)

  useEffect(() => {
    const t = localStorage.getItem('token');
    if (!t) {
      router.push('/');
    }
  }, [router]);

  // Pricing Algorithm
  // Base cost is $100. Max cost is $1000.
  // Delivery: 90 days = cheapest, 5 days = most expensive
  const calculatePrice = () => {
    let price = 50; // Base platform fee

    // Delivery factor (inverse relationship: faster = exponentially more expensive)
    // 90 days = $0, 5 days = $400
    const deliveryFactor = Math.pow((90 - deliveryDays) / 85, 2) * 400; 
    price += deliveryFactor;

    // Students factor (linear)
    // 10 students = $0, 100 students = $150
    const studentFactor = ((freeStudents - 10) / 90) * 150;
    price += studentFactor;

    // Pages factor
    // 5 pages = $0, 50 pages = $150
    const pagesFactor = ((totalPages - 5) / 45) * 150;
    price += pagesFactor;

    // Interactive pages factor
    // 1 interactive = $0, 20 interactive = $100
    const interactiveFactor = ((interactivePages - 1) / 19) * 100;
    price += interactiveFactor;

    // Complexity multiplier
    // Basic = x1.0, Standard = x1.2, High = x1.5, Advanced = x2.0
    const multipliers = [1.0, 1.2, 1.5, 2.0];
    price = price * multipliers[complexity - 1];

    // Clamp between $100 and $1000
    return Math.max(100, Math.min(1000, Math.round(price)));
  };

  const totalPrice = calculatePrice();
  
  // Revisions & Refund Logic
  // Closer to 1000 = 10 revisions, 90% refund
  // Closer to 100 = 1 revision, 10% refund
  const priceRatio = (totalPrice - 100) / 900; // 0 to 1
  const freeRevisions = Math.max(1, Math.round(1 + (priceRatio * 9)));
  const refundPercent = Math.max(10, Math.round(10 + (priceRatio * 80)));

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--background)' }}>
      <div className="bg-blob bg-blob-1" style={{ opacity: 0.2 }} />
      <div className="bg-blob bg-blob-2" style={{ opacity: 0.15, right: '20%' }} />

      {/* Sidebar */}
      <aside className="glass-panel" style={{ width: '280px', margin: '24px', padding: '32px 24px', display: 'flex', flexDirection: 'column', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px' }}>
          <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, var(--secondary), var(--primary))', borderRadius: '8px' }} />
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Interlectic</h2>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
          <div onClick={() => router.push('/dashboard')} style={{ padding: '12px 16px', color: 'var(--text-muted)', cursor: 'pointer', borderRadius: '8px', transition: 'all 0.2s' }} className="hover:bg-slate-800">
            ← Back to Dashboard
          </div>
          <div style={{ padding: '12px 16px', background: 'rgba(56, 189, 248, 0.15)', borderLeft: '4px solid var(--primary)', borderRadius: '0 8px 8px 0', color: 'var(--text-main)', fontWeight: 600 }}>
            🛠️ Custom Order
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '48px 48px 48px 0', overflowY: 'auto', zIndex: 10 }}>
        <header style={{ marginBottom: '48px', textAlign: 'center' }}>
          <div className="inline-block px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-sky-400 text-sm font-semibold mb-6 tracking-wide shadow-lg">
            ✨ BUILD YOUR OWN PLAN
          </div>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '16px', fontWeight: 800, background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Custom Course Configurator
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            Adjust the sliders below to fit your budget and requirements. The quote updates instantly.
          </p>
        </header>

        <div style={{ display: 'flex', gap: '40px', maxWidth: '1200px', margin: '0 auto', flexWrap: 'wrap' }}>
          
          {/* Controls Section */}
          <div className="glass-panel" style={{ flex: '1.5', minWidth: '400px', padding: '40px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Slider 1: Delivery Time */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <label style={{ fontWeight: 600, color: '#e2e8f0' }}>Delivery Time</label>
                <span style={{ color: '#38bdf8', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{deliveryDays} Days</span>
              </div>
              <input type="range" min="5" max="90" value={deliveryDays} onChange={(e) => setDeliveryDays(Number(e.target.value))} style={{ width: '100%', accentColor: '#38bdf8' }} className="cursor-pointer" />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                <span>Expedited (5d)</span>
                <span>Relaxed (90d)</span>
              </div>
            </div>

            {/* Slider 2: Free Students */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <label style={{ fontWeight: 600, color: '#e2e8f0' }}>Included Student Quota</label>
                <span style={{ color: '#38bdf8', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{freeStudents} Students</span>
              </div>
              <input type="range" min="10" max="100" step="5" value={freeStudents} onChange={(e) => setFreeStudents(Number(e.target.value))} style={{ width: '100%', accentColor: '#38bdf8' }} className="cursor-pointer" />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                <span>10 Students</span>
                <span>100 Students</span>
              </div>
            </div>

            {/* Slider 3: Total Pages */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <label style={{ fontWeight: 600, color: '#e2e8f0' }}>Total Content Pages</label>
                <span style={{ color: '#38bdf8', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{totalPages} Pages</span>
              </div>
              <input type="range" min="5" max="50" value={totalPages} onChange={(e) => {
                const newTotal = Number(e.target.value);
                setTotalPages(newTotal);
                if (interactivePages > newTotal) setInteractivePages(newTotal);
              }} style={{ width: '100%', accentColor: '#38bdf8' }} className="cursor-pointer" />
            </div>

            {/* Slider 4: Interactive Pages */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <label style={{ fontWeight: 600, color: '#e2e8f0' }}>Interactive Pages</label>
                <span style={{ color: '#38bdf8', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{interactivePages} Interactive</span>
              </div>
              <input type="range" min="1" max={Math.min(20, totalPages)} value={interactivePages} onChange={(e) => setInteractivePages(Number(e.target.value))} style={{ width: '100%', accentColor: '#38bdf8' }} className="cursor-pointer" />
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>Max interactive pages depends on total pages.</p>
            </div>

            {/* Slider 5: Complexity */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <label style={{ fontWeight: 600, color: '#e2e8f0' }}>Interactivity Complexity</label>
                <span style={{ color: '#38bdf8', fontWeight: 700 }}>
                  {complexity === 1 ? 'Basic' : complexity === 2 ? 'Standard' : complexity === 3 ? 'High' : 'Advanced'}
                </span>
              </div>
              <input type="range" min="1" max="4" value={complexity} onChange={(e) => setComplexity(Number(e.target.value))} style={{ width: '100%', accentColor: '#38bdf8' }} className="cursor-pointer" />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                <span>Simple Quizzes</span>
                <span>Physics Engines</span>
              </div>
            </div>

          </div>

          {/* Quote Section */}
          <div className="glass-panel" style={{ flex: '1', minWidth: '350px', padding: '40px', display: 'flex', flexDirection: 'column', borderTop: '4px solid #38bdf8', position: 'sticky', top: '48px', height: 'fit-content' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px', color: '#94a3b8' }}>Your Custom Quote</h3>
            
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '32px', marginTop: '16px' }}>
              <span style={{ fontSize: '4.5rem', fontWeight: 800, color: '#fff', fontVariantNumeric: 'tabular-nums' }}>${totalPrice}</span>
              <span style={{ color: 'var(--text-muted)' }}>USD</span>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '24px', borderRadius: '16px', marginBottom: '40px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: '16px', fontWeight: 700 }}>What's Included</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.05rem' }}>
                  <i className="fa-solid fa-clock text-sky-400 w-5"></i> 
                  <span><strong>{deliveryDays} Days</strong> Delivery</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.05rem' }}>
                  <i className="fa-solid fa-users text-sky-400 w-5"></i> 
                  <span><strong>{freeStudents}</strong> Free Students included</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.05rem' }}>
                  <i className="fa-solid fa-book-open text-sky-400 w-5"></i> 
                  <span><strong>{totalPages}</strong> Total Pages ({interactivePages} Interactive)</span>
                </li>
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '8px 0' }} />
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.05rem' }}>
                  <i className="fa-solid fa-pen-ruler text-emerald-400 w-5"></i> 
                  <span><strong>{freeRevisions} Free</strong> Revisions</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.05rem' }}>
                  <i className="fa-solid fa-shield-halved text-emerald-400 w-5"></i> 
                  <span><strong>{refundPercent}% Refund</strong> Guarantee</span>
                </li>
              </ul>
            </div>

            <button className="btn-primary" style={{ width: '100%', padding: '20px', fontSize: '1.2rem', fontWeight: 600, background: 'linear-gradient(135deg, #38bdf8, #818cf8)', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(56, 189, 248, 0.4)' }}>
              Request Build
            </button>
            <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '16px' }}>
              Extra students: ${totalPrice > 500 ? '10' : '4'}/student
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
