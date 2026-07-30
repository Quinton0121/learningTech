"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';

export default function Home() {
  const router = useRouter();
  const [isHovering, setIsHovering] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { t } = useLanguage();
  
  // Registration Flow State
  const [step, setStep] = useState(1); // 1 = Details, 2 = Verify Code
  const [name, setName] = useState('');
  const [role, setRole] = useState('LEARNER'); // 'LEARNER', 'EDUCATOR'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  React.useEffect(() => {
    const checkPcAutoLogin = async () => {
      const pcId = localStorage.getItem('pc_id');
      if (!pcId) return;
      
      try {
        const res = await fetch('/api/auth/pc-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pcId })
        });
        const data = await res.json();
        
        if (res.ok && data.token) {
          localStorage.setItem('token', data.token);
          window.location.href = '/learner-hub';
        }
      } catch (e) {
        console.error("Auto login failed", e);
      }
    };
    
    checkPcAutoLogin();
    
    const interval = setInterval(checkPcAutoLogin, 5000);
    return () => clearInterval(interval);
  }, [router]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg('Processing...');
    
    // LOGIN
    if (isLoginMode) {
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        
        if (res.ok && data.token) {
          setStatusMsg('Success! Logged in.');
          localStorage.setItem('token', data.token);
          setTimeout(() => {
            setShowAuthModal(false);
            if (data.user?.role === 'ADMIN' || data.user?.role === 'EDUCATOR') {
              router.push('/dashboard');
            } else {
              router.push('/learner-hub');
            }
          }, 1000);
        } else {
          setStatusMsg(`Error: ${data.error}`);
        }
      } catch (err) {
        setStatusMsg('Network error. Please try again.');
      }
      return;
    }

    // REGISTRATION - STEP 1 (Send Code)
    if (!isLoginMode && step === 1) {
      if (!name || !email || !password) {
        setStatusMsg('Please fill in all fields.');
        return;
      }
      setStatusMsg('Sending verification code...');
      // MOCK SEND EMAIL
      setTimeout(() => {
        setStep(2);
        setStatusMsg('A verification code has been sent to your email. (Hint: use 123456)');
      }, 1000);
      return;
    }

    // REGISTRATION - STEP 2 (Verify & Create Account)
    if (!isLoginMode && step === 2) {
      if (verificationCode !== '123456') {
        setStatusMsg('Invalid verification code.');
        return;
      }
      
      setStatusMsg('Creating account...');
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, name, role, authType: 'EMAIL' })
        });
        const data = await res.json();
        
        if (res.ok) {
          setStatusMsg('Success! Registered.');
          setTimeout(() => {
            setIsLoginMode(true);
            setStep(1);
            setStatusMsg('Please log in with your new account.');
          }, 1500);
        } else {
          setStatusMsg(`Error: ${data.error}`);
        }
      } catch (err) {
        setStatusMsg('Network error. Please try again.');
      }
    }
  };

  const resetForm = (loginMode: boolean) => {
    setIsLoginMode(loginMode);
    setStep(1);
    setStatusMsg('');
    setEmail('');
    setPassword('');
    setVerificationCode('');
  };

  return (
    <>
    <main style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="bg-blob bg-blob-1" />
      <div className="bg-blob bg-blob-2" />

      <nav className="glass-panel" style={{ margin: '24px auto', width: '90%', maxWidth: '1200px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/edusphere.png" alt="EduSphere Logo" style={{ height: '40px', objectFit: 'contain' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.5px' }}>{t('header.brand')}</h2>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <LanguageToggle />
          <button type="button" className="btn-secondary" style={{ padding: '8px 20px', fontSize: '0.95rem' }} onClick={() => { resetForm(true); setShowAuthModal(true); }} onTouchStart={(e) => { e.preventDefault(); resetForm(true); setShowAuthModal(true); }}>{t('header.login')}</button>
          <button type="button" className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.95rem' }} onClick={() => { resetForm(false); setShowAuthModal(true); }} onTouchStart={(e) => { e.preventDefault(); resetForm(false); setShowAuthModal(true); }}>Register</button>
        </div>
      </nav>

      <section className="container" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px', position: 'relative' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '800px', opacity: 0 }} className="animate-fade-in-up">
          <div className="glass-panel" style={{ padding: '8px 16px', borderRadius: '30px', display: 'inline-block', marginBottom: '24px', border: '1px solid var(--primary)', color: 'var(--primary)', fontWeight: 500, fontSize: '0.9rem' }}>
            {t('hero.badge')}
          </div>
          
          <h1 style={{ fontSize: '4.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-1px' }}>
            {t('hero.title')}
          </h1>
          
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '40px', maxWidth: '600px', lineHeight: 1.6 }}>
            {t('hero.subtitle')}
          </p>
          
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button className="btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem', minWidth: '200px' }} onClick={() => { setRole('EDUCATOR'); resetForm(true); setShowAuthModal(true); }}>
              👨‍🏫 {t('hero.loginAsEducator')}
            </button>
            <button className="btn-secondary" style={{ padding: '16px 32px', fontSize: '1.1rem', minWidth: '200px' }} onClick={() => { setRole('LEARNER'); resetForm(true); setShowAuthModal(true); }}>
              🎓 {t('hero.loginAsStudent')}
            </button>
          </div>
        </div>
      </section>

    </main>
      {/* Auth Modal overlay */}
      {showAuthModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
        }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '40px', position: 'relative' }}>
            <button 
              onClick={() => setShowAuthModal(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}
            >✕</button>
            
            <h3 style={{ fontSize: '1.8rem', marginBottom: '20px', textAlign: 'center' }}>
              {isLoginMode ? 'Welcome Back' : 'Create Account'}
            </h3>

            <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              
              {/* Registration Specific Fields - Step 1 */}
              {!isLoginMode && step === 1 && (
                <>
                  <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: '#fff' }} />
                  
                  <select value={role} onChange={e => setRole(e.target.value)} style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: '#1e293b', color: '#fff' }}>
                    <option value="LEARNER">I am a Student (Learner)</option>
                    <option value="EDUCATOR">I am a Teacher (Educator)</option>
                  </select>
                </>
              )}

              {/* Email & Password (Login + Register Step 1) */}
              {(isLoginMode || (!isLoginMode && step === 1)) && (
                <>
                  <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: '#fff' }} />

                  <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: '#fff' }} />
                </>
              )}

              {/* Verification Code - Step 2 */}
              {!isLoginMode && step === 2 && (
                <div className="animate-fade-in-up">
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '10px' }}>Enter the 6-digit code sent to {email}</p>
                  <input type="text" placeholder="Verification Code" value={verificationCode} onChange={e => setVerificationCode(e.target.value)} required
                    style={{ padding: '12px', width: '100%', borderRadius: '8px', border: '1px solid var(--primary)', background: 'rgba(0,0,0,0.2)', color: '#fff', fontSize: '1.2rem', textAlign: 'center', letterSpacing: '4px' }} maxLength={6} />
                </div>
              )}

              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                {isLoginMode ? 'Sign In' : (step === 1 ? 'Send Verification Code' : 'Verify & Register')}
              </button>
            </form>
            
            {statusMsg && <p style={{ marginTop: '15px', textAlign: 'center', color: 'var(--primary)', fontSize: '0.9rem' }}>{statusMsg}</p>}
            
            <button type="button" style={{ marginTop: '20px', width: '100%', background: 'transparent', border: 'none', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', cursor: 'pointer' }} onClick={() => resetForm(!isLoginMode)} onTouchStart={(e) => { e.preventDefault(); resetForm(!isLoginMode); }}>
              {isLoginMode ? "Don't have an account? Register" : "Already have an account? Login"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
