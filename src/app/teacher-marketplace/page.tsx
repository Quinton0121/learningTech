"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TeacherMarketplacePage() {
  const router = useRouter();
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    // Mock courses created by this teacher
    setCourses([
      { id: '1', title: 'My Advanced Excel Course', currentQuota: 50, modificationCount: 5 },
      { id: '2', title: 'My Interactive Physics Course', currentQuota: 20, modificationCount: 2 },
    ]);
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--background)' }}>
      <div className="bg-blob bg-blob-2" style={{ opacity: 0.15 }} />

      <aside className="glass-panel" style={{ width: '280px', margin: '24px', padding: '32px 24px', display: 'flex', flexDirection: 'column', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px' }}>
          <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, var(--secondary), var(--primary))', borderRadius: '8px' }} />
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Interlectic</h2>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
          <div onClick={() => router.push('/dashboard')} style={{ padding: '12px 16px', color: 'var(--text-muted)', cursor: 'pointer', borderRadius: '8px' }} className="hover:bg-slate-800">
            ← Back to Dashboard
          </div>
          <div style={{ padding: '12px 16px', background: 'rgba(56, 189, 248, 0.15)', borderLeft: '4px solid #38bdf8', borderRadius: '0 8px 8px 0', color: 'var(--text-main)', fontWeight: 600 }}>
            🛍️ Educator Shop
          </div>
        </nav>
      </aside>

      <main style={{ flex: 1, padding: '48px', overflowY: 'auto', zIndex: 10 }}>
        <header style={{ marginBottom: '48px' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, color: '#38bdf8' }}>Educator Marketplace</h1>
          <p style={{ color: 'var(--text-muted)' }}>Purchase student quotas, buy course modification credits, and boost your courses.</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
          {courses.map(course => (
            <div key={course.id} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{course.title}</h3>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>Student Quota:</span>
                    <span style={{ color: '#10b981', fontWeight: 'bold' }}>{course.currentQuota} seats</span>
                  </div>
                  <button className="btn-secondary" style={{ width: '100%', padding: '8px', fontSize: '0.85rem' }}>
                    + Buy 50 Seats (100 Tokens)
                  </button>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>Modifications Left:</span>
                    <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>{course.modificationCount} times</span>
                  </div>
                  <button className="btn-secondary" style={{ width: '100%', padding: '8px', fontSize: '0.85rem' }}>
                    + Add 5 Modifications (50 Tokens)
                  </button>
                </div>
                
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>Featured Status:</span>
                    <span style={{ color: '#fbbf24', fontWeight: 'bold' }}>None</span>
                  </div>
                  <button className="btn-secondary" style={{ width: '100%', padding: '8px', fontSize: '0.85rem', borderColor: '#fbbf24', color: '#fbbf24' }}>
                    ⭐ Feature for 7 days (200 Tokens)
                  </button>
                </div>
                
                <div style={{ background: 'rgba(168, 85, 247, 0.1)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>Share with Educators:</span>
                    <span style={{ color: '#a855f7', fontWeight: 'bold' }}>Not Shared</span>
                  </div>
                  <button className="btn-secondary" style={{ width: '100%', padding: '8px', fontSize: '0.85rem', borderColor: '#a855f7', color: '#a855f7' }}>
                    🔗 Share Course (Buys 1 Quota for 10 Tokens)
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
