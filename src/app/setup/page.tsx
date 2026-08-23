"use client";

import React, { useState, useEffect } from 'react';

export default function SetupPage() {
  const [pcId, setPcId] = useState('');
  const [currentId, setCurrentId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const savedId = localStorage.getItem('pc_id');
    if (savedId) {
      setCurrentId(savedId);
      setPcId(savedId);
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pcId.trim()) {
      setMessage('Please enter a valid ID');
      return;
    }
    localStorage.setItem('pc_id', pcId.trim());
    setCurrentId(pcId.trim());
    setMessage('Saved successfully! You can close this page.');
  };

  const handleClear = () => {
    localStorage.removeItem('pc_id');
    setCurrentId('');
    setPcId('');
    setMessage('Cleared successfully.');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a' }}>
      <div className="glass-panel" style={{ padding: '40px', maxWidth: '400px', width: '90%', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '20px', color: '#fff' }}>Device Setup</h2>
        
        <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '0.9rem' }}>
          Current Device ID: <strong style={{ color: '#10b981' }}>{currentId || 'Not Set'}</strong>
        </p>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="text" 
            placeholder="e.g. iPad-01 or PC-12" 
            value={pcId}
            onChange={(e) => setPcId(e.target.value)}
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: '#fff', fontSize: '1.2rem', textAlign: 'center' }}
          />
          <button type="submit" className="btn-primary" style={{ padding: '12px', fontSize: '1rem', border: 'none', color: '#fff', borderRadius: '8px', cursor: 'pointer' }}>
            Save Device ID
          </button>
        </form>

        <button 
          onClick={handleClear}
          style={{ marginTop: '15px', background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', padding: '8px', width: '100%', borderRadius: '8px', cursor: 'pointer' }}
        >
          Clear ID
        </button>

        {message && (
          <p style={{ marginTop: '20px', color: 'var(--primary)', fontSize: '0.9rem' }}>{message}</p>
        )}
      </div>
    </div>
  );
}
