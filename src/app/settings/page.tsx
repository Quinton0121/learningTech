"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const t = localStorage.getItem('token');
    if (!t) {
      router.push('/');
    } else {
      setToken(t);
    }
  }, [router]);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match.");
      return;
    }
    
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const data = await res.json();
      
      if (res.ok) {
        setMessage('✅ ' + data.message);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setMessage('❌ Error: ' + data.error);
      }
    } catch (err) {
      setMessage('❌ Network error.');
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--background)' }}>
      <div className="bg-blob bg-blob-1" style={{ opacity: 0.2 }} />
      <div className="bg-blob bg-blob-2" style={{ opacity: 0.15, right: '20%' }} />

      <aside className="glass-panel" style={{ width: '280px', margin: '24px', padding: '32px 24px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px' }}>
          <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, var(--secondary), var(--primary))', borderRadius: '8px' }} />
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Interlectic</h2>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
          <div 
            onClick={() => router.back()}
            style={{ padding: '12px 16px', color: 'var(--text-muted)', cursor: 'pointer', borderRadius: '8px' }}
          >
            ← Back to Dashboard
          </div>
          <div style={{ padding: '12px 16px', background: 'rgba(56, 189, 248, 0.15)', borderLeft: '4px solid var(--primary)', borderRadius: '0 8px 8px 0', color: 'var(--text-main)', fontWeight: 600 }}>
            ⚙️ Settings
          </div>
        </nav>
      </aside>

      <main style={{ flex: 1, padding: '48px 48px 48px 0', overflowY: 'auto' }}>
        <header style={{ marginBottom: '48px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Account Settings</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage your account preferences and security.</p>
        </header>

        <div className="glass-panel" style={{ padding: '32px', maxWidth: '500px' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Change Password</h3>
          <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input 
              type="password" 
              placeholder="Current Password" 
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              required
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: '#fff' }}
            />
            <input 
              type="password" 
              placeholder="New Password" 
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: '#fff' }}
            />
            <input 
              type="password" 
              placeholder="Confirm New Password" 
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: '#fff' }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '12px', marginTop: '8px' }}>
              Update Password
            </button>
            {message && <p style={{ color: message.includes('✅') ? '#10b981' : '#ef4444', marginTop: '12px', textAlign: 'center' }}>{message}</p>}
          </form>
        </div>
      </main>
    </div>
  );
}
