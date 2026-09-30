"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SetupPage() {
  const [pcId, setPcId] = useState('');
  const [currentId, setCurrentId] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  useEffect(() => {
    const savedId = localStorage.getItem('pc_id');
    if (savedId) {
      setCurrentId(savedId);
      setPcId(savedId);
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = pcId.trim();
    if (!cleanId) {
      setMessage('Please enter a valid Device / PC ID (e.g. 101, PC-01)');
      setIsSuccess(false);
      return;
    }
    localStorage.setItem('pc_id', cleanId);
    setCurrentId(cleanId);
    setMessage(`✓ Device ID "${cleanId}" saved successfully!`);
    setIsSuccess(true);
    setTestResult(null);
  };

  const handleClear = () => {
    localStorage.removeItem('pc_id');
    setCurrentId('');
    setPcId('');
    setMessage('Device ID cleared.');
    setIsSuccess(false);
    setTestResult(null);
  };

  const handleTestLogin = async () => {
    const targetId = currentId || pcId.trim();
    if (!targetId) {
      alert('Please save a Device ID first.');
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    try {
      const res = await fetch('/api/auth/pc-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pcId: targetId })
      });
      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        setTestResult(`✓ Success! Connected as "${data.user?.name || 'Student'}" to course "${data.course?.title || 'Active Course'}".`);
        setTimeout(() => {
          if (data.course && data.course.id) {
            window.location.href = `/api/course-play?id=${data.course.id}`;
          } else {
            window.location.href = '/learner-hub';
          }
        }, 1200);
      } else {
        setTestResult(`Notice: ${data.error || 'No active class session found. Please make sure the teacher has clicked "Login All Students" on the course dashboard.'}`);
      }
    } catch (err: any) {
      setTestResult(`Network error: ${err.message}`);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', padding: '20px' }}>
      <div style={{ 
        padding: '36px', 
        maxWidth: '440px', 
        width: '100%', 
        textAlign: 'center',
        background: '#1e293b',
        borderRadius: '16px',
        border: '1px solid #334155',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '16px' }}>
          💻
        </div>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f8fafc', marginBottom: '8px' }}>Student Device Setup</h2>
        <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '24px', lineHeight: 1.5 }}>
          Configure this workstation / tablet to automatically join interactive classroom sessions.
        </p>

        <div style={{ 
          background: '#0f172a', 
          border: '1px solid #334155', 
          borderRadius: '10px', 
          padding: '12px 16px', 
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Configured PC ID:</span>
          <strong style={{ color: currentId ? '#10b981' : '#f43f5e', fontFamily: 'monospace', fontSize: '1.05rem' }}>
            {currentId || 'Not Configured'}
          </strong>
        </div>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <input 
            type="text" 
            placeholder="Enter PC ID (e.g. 101, PC-01)" 
            value={pcId}
            onChange={(e) => setPcId(e.target.value)}
            style={{ 
              padding: '14px', 
              borderRadius: '10px', 
              border: '1px solid #475569', 
              background: '#0f172a', 
              color: '#f8fafc', 
              fontSize: '1.1rem', 
              textAlign: 'center',
              outline: 'none',
              fontFamily: 'monospace',
              fontWeight: 'bold'
            }}
          />
          <button 
            type="submit" 
            style={{ 
              padding: '14px', 
              fontSize: '1rem', 
              fontWeight: 600, 
              border: 'none', 
              background: '#2563eb', 
              color: '#ffffff', 
              borderRadius: '10px', 
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
          >
            Save Device ID
          </button>
        </form>

        {message && (
          <p style={{ 
            marginTop: '16px', 
            color: isSuccess ? '#34d399' : '#f87171', 
            fontSize: '0.88rem', 
            fontWeight: 500,
            background: isSuccess ? 'rgba(52, 211, 153, 0.1)' : 'rgba(248, 113, 113, 0.1)',
            padding: '8px 12px',
            borderRadius: '8px',
            border: `1px solid ${isSuccess ? 'rgba(52, 211, 153, 0.2)' : 'rgba(248, 113, 113, 0.2)'}`
          }}>
            {message}
          </p>
        )}

        {/* Action Buttons */}
        <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button 
            type="button"
            onClick={handleTestLogin}
            disabled={isTesting}
            style={{ 
              padding: '12px', 
              fontSize: '0.92rem', 
              fontWeight: 600, 
              border: '1px solid #10b981', 
              background: 'rgba(16, 185, 129, 0.15)', 
              color: '#34d399', 
              borderRadius: '10px', 
              cursor: isTesting ? 'wait' : 'pointer'
            }}
          >
            {isTesting ? 'Checking Active Class...' : '⚡ Test Auto-Login Now'}
          </button>

          <div style={{ display: 'flex', gap: '10px' }}>
            <Link 
              href="/"
              style={{ 
                flex: 1,
                padding: '10px', 
                fontSize: '0.85rem', 
                color: '#94a3b8', 
                border: '1px solid #334155', 
                borderRadius: '8px', 
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              Go to Classroom Home
            </Link>

            <button 
              type="button"
              onClick={handleClear}
              style={{ 
                padding: '10px 16px', 
                background: 'transparent', 
                border: '1px solid #ef4444', 
                color: '#f87171', 
                fontSize: '0.85rem', 
                borderRadius: '8px', 
                cursor: 'pointer' 
              }}
            >
              Clear ID
            </button>
          </div>
        </div>

        {testResult && (
          <div style={{ 
            marginTop: '16px', 
            padding: '12px', 
            borderRadius: '8px', 
            fontSize: '0.82rem', 
            lineHeight: 1.4,
            textAlign: 'left',
            background: testResult.startsWith('✓') ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
            border: `1px solid ${testResult.startsWith('✓') ? '#10b981' : '#f59e0b'}`,
            color: testResult.startsWith('✓') ? '#a7f3d0' : '#fde68a'
          }}>
            {testResult}
          </div>
        )}
      </div>
    </div>
  );
}
