"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AnalyticsPage() {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // Mock analytics data
    setData([
      { id: 1, name: 'Alice Chen', course: 'Interactive Excel', hours: 4.5, score: 92, lastActive: '2 hours ago' },
      { id: 2, name: 'Bob Smith', course: 'Interactive Excel', hours: 3.2, score: 85, lastActive: '1 day ago' },
      { id: 3, name: 'Charlie Wong', course: 'Basic Grammar', hours: 6.0, score: 98, lastActive: '5 mins ago' },
      { id: 4, name: 'David Lee', course: 'Physics 101', hours: 2.1, score: 76, lastActive: '3 days ago' },
    ]);
  }, []);

  const exportCSV = () => {
    const headers = 'Name,Course,Learning Hours,Score,Last Active\n';
    const rows = data.map(row => `${row.name},${row.course},${row.hours},${row.score},${row.lastActive}`).join('\n');
    const csvContent = "data:text/csv;charset=utf-8," + headers + rows;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "student_analytics.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
          <div style={{ padding: '12px 16px', background: 'rgba(167, 139, 250, 0.15)', borderLeft: '4px solid #a78bfa', borderRadius: '0 8px 8px 0', color: 'var(--text-main)', fontWeight: 600 }}>
            📊 Analytics & Exports
          </div>
        </nav>
      </aside>

      <main style={{ flex: 1, padding: '48px', overflowY: 'auto', zIndex: 10 }}>
        <header style={{ marginBottom: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '3rem', fontWeight: 800, color: '#a78bfa' }}>Student Analytics</h1>
            <p style={{ color: 'var(--text-muted)' }}>Track learning hours, monitor scores, and export data.</p>
          </div>
          <button onClick={exportCSV} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, #a78bfa, #c084fc)', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: 600, color: '#fff', cursor: 'pointer' }}>
            <i className="fa-solid fa-download"></i> Export CSV
          </button>
        </header>

        <div className="glass-panel" style={{ padding: '24px', overflowX: 'auto' }}>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <th style={{ padding: '16px', color: '#94a3b8' }}>Student Name</th>
                <th style={{ padding: '16px', color: '#94a3b8' }}>Course</th>
                <th style={{ padding: '16px', color: '#94a3b8' }}>Learning Hours</th>
                <th style={{ padding: '16px', color: '#94a3b8' }}>Score</th>
                <th style={{ padding: '16px', color: '#94a3b8' }}>Last Active</th>
              </tr>
            </thead>
            <tbody>
              {data.map(row => (
                <tr key={row.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '16px', fontWeight: 600 }}>{row.name}</td>
                  <td style={{ padding: '16px', color: 'var(--text-muted)' }}>{row.course}</td>
                  <td style={{ padding: '16px', color: 'var(--text-muted)' }}>{row.hours}h</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{ 
                      background: row.score >= 90 ? 'rgba(16,185,129,0.2)' : 'rgba(234,179,8,0.2)', 
                      color: row.score >= 90 ? '#10b981' : '#eab308',
                      padding: '4px 8px', borderRadius: '4px', fontWeight: 700 
                    }}>
                      {row.score}%
                    </span>
                  </td>
                  <td style={{ padding: '16px', color: 'var(--text-muted)' }}>{row.lastActive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
