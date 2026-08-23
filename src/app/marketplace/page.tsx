"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MarketplacePage() {
  const router = useRouter();
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    // Mock courses for marketplace
    setCourses([
      { id: '1', title: 'Advanced Excel Functions', author: 'Jane Doe', price: 20, pages: 25 },
      { id: '2', title: 'Interactive Physics: Gravity', author: 'Albert E.', price: 50, pages: 15 },
      { id: '3', title: 'English Grammar Basics', author: 'Sarah Smith', price: 10, pages: 20 },
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
            Marketplace
          </div>
        </nav>
      </aside>

      <main style={{ flex: 1, padding: '48px', overflowY: 'auto', zIndex: 10 }}>
        <header style={{ marginBottom: '48px' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, color: '#38bdf8' }}>Public Marketplace</h1>
          <p style={{ color: 'var(--text-muted)' }}>Discover and purchase interactive courses created by other educators.</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {courses.map(course => (
            <div key={course.id} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{course.title}</h3>
                <div style={{ background: 'rgba(234, 179, 8, 0.2)', color: '#eab308', padding: '4px 8px', borderRadius: '8px', fontWeight: 700, fontSize: '0.9rem' }}>
                  {course.price} Tokens
                </div>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>By {course.author}</p>
              
              <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <span><i className="fa-solid fa-book-open text-sky-400"></i> {course.pages} Pages</span>
                <span><i className="fa-solid fa-users text-emerald-400"></i> Unlimited</span>
              </div>

              <button className="btn-primary" style={{ width: '100%', padding: '12px', marginTop: 'auto' }}>
                Purchase License
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
