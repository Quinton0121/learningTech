"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import Footer from '@/components/Footer';
import { 
  BenQLogo, 
  MaxhubLogo, 
  SeewoLogo, 
  NewlineLogo, 
  PrometheanLogo, 
  SmartBoardLogo, 
  ViewSonicLogo, 
  HuaweiLogo, 
  SamsungLogo,
  AppleLogo,
  AndroidLogo,
  WindowsLogo,
  ChromeOSLogo
} from '@/components/BrandLogos';

export default function Home() {
  const router = useRouter();
  const [isHovering, setIsHovering] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isForgotPasswordMode, setIsForgotPasswordMode] = useState(false);
  const { t, language } = useLanguage();
  const [showPcIdModal, setShowPcIdModal] = useState(false);
  const [tempPcId, setTempPcId] = useState('');
  
  // Registration Flow State
  const [step, setStep] = useState(1); // 1 = Details, 2 = Verify Code
  const [name, setName] = useState('');
  const [role, setRole] = useState('LEARNER'); // 'LEARNER', 'EDUCATOR'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationToken, setVerificationToken] = useState('');
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
    
    // FORGOT PASSWORD
    if (isForgotPasswordMode) {
      if (!email) {
        setStatusMsg('Please enter your email.');
        return;
      }
      try {
        const res = await fetch('/api/auth/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        const data = await res.json();
        setStatusMsg(data.message || 'If the email exists, a reset link has been sent.');
      } catch (err) {
        setStatusMsg('Network error. Please try again.');
      }
      return;
    }

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
    if (!isLoginMode && step === 1 && !isForgotPasswordMode) {
      if (!name || !email || !password) {
        setStatusMsg('Please fill in all fields.');
        return;
      }
      if (!hasAgreedToTerms) {
        setStatusMsg(
          language === 'en' 
            ? 'Please read and agree to the User Agreement, Privacy Policy, and Refund Policy.' 
            : (language === 'zh-TW' ? '請先閱讀並勾選同意《用戶協議》、《隱私政策》及《退款政策》。' : '请先阅读并勾选同意《用户协议》、《隐私政策》及《退款政策》。')
        );
        return;
      }
      setStatusMsg('Sending verification code...');
      
      try {
        const res = await fetch('/api/auth/send-code', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        const data = await res.json();
        
        if (res.ok && data.verificationToken) {
          setVerificationToken(data.verificationToken);
          setStep(2);
          setStatusMsg('A verification code has been sent to your email.');
        } else {
          setStatusMsg(`Error: ${data.error || 'Failed to send code'}`);
        }
      } catch (err) {
        setStatusMsg('Network error while sending code.');
      }
      return;
    }

    // REGISTRATION - STEP 2 (Verify & Create Account)
    if (!isLoginMode && step === 2 && !isForgotPasswordMode) {
      if (!verificationCode || verificationCode.length !== 6) {
        setStatusMsg('Please enter the 6-digit verification code.');
        return;
      }
      
      setStatusMsg('Creating account...');
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, name, role, authType: 'EMAIL', verificationCode, verificationToken })
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
    setIsForgotPasswordMode(false);
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

      <nav style={{ position: 'sticky', top: 0, zIndex: 100, width: '100%', background: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'saturate(180%) blur(20px)', WebkitBackdropFilter: 'saturate(180%) blur(20px)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onDoubleClick={() => { setTempPcId(localStorage.getItem('pc_id') || ''); setShowPcIdModal(true); }}>
            <img src="/edusphere.png" alt="Interlectic Logo" style={{ height: '32px', objectFit: 'contain' }} title="Double click to configure PC ID" />
            <span style={{ fontSize: '1.25rem', fontWeight: 600, letterSpacing: '-0.02em', color: '#f5f5f7' }}>{t('header.brand')}</span>
          </div>

          <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <LanguageToggle />
            
            <button className="mobile-menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
               {isMobileMenuOpen ? '✕' : '☰'}
            </button>

            <div className={`nav-actions ${isMobileMenuOpen ? 'open' : ''}`} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <button type="button" className="btn-secondary" style={{ padding: '6px 16px', fontSize: '0.88rem' }} onClick={() => { resetForm(true); setShowAuthModal(true); setIsMobileMenuOpen(false); }}>{t('header.login')}</button>
              <button type="button" className="btn-primary" style={{ padding: '6px 18px', fontSize: '0.88rem' }} onClick={() => { resetForm(false); setShowAuthModal(true); setIsMobileMenuOpen(false); }}>Register</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px 60px', position: 'relative', textAlign: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '850px' }} className="animate-fade-in-up">
          <div style={{ padding: '6px 16px', borderRadius: '980px', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '28px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', color: '#2997ff', fontWeight: 500, fontSize: '0.85rem', letterSpacing: '0.02em' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2997ff', display: 'inline-block' }} />
            {t('hero.badge')}
          </div>
          
          <h1 style={{ fontSize: 'clamp(2.8rem, 6vw, 4.8rem)', fontWeight: 700, lineHeight: 1.05, marginBottom: '24px', letterSpacing: '-0.035em' }}>
            <span className="apple-gradient-text">The interactive classroom.</span><br />
            <span className="apple-color-gradient">Reimagined.</span>
          </h1>
          
          <p style={{ fontSize: '1.25rem', color: '#86868b', marginBottom: '36px', maxWidth: '640px', lineHeight: 1.5, fontWeight: 400, letterSpacing: '-0.01em' }}>
            {t('hero.subtitle')}
          </p>
          
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button className="btn-primary" style={{ padding: '14px 32px', fontSize: '1.05rem', minWidth: '190px' }} onClick={() => { setRole('EDUCATOR'); resetForm(true); setShowAuthModal(true); }}>
              {t('hero.loginAsEducator')}
            </button>
            <button className="btn-secondary" style={{ padding: '14px 32px', fontSize: '1.05rem', minWidth: '190px' }} onClick={() => { setRole('LEARNER'); resetForm(true); setShowAuthModal(true); }}>
              {t('hero.loginAsStudent')}
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Whiteboard Brands Marquee Section */}
      <section style={{ width: '100%', padding: '40px 0 20px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#2997ff', marginBottom: '8px' }}>
            HARDWARE ECOSYSTEM
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#f5f5f7', marginBottom: '10px' }}>
            {t('brands.title')}
          </h2>
          <p style={{ color: '#86868b', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto', lineHeight: 1.5 }}>
            {t('brands.subtitle')}
          </p>
        </div>

        {/* Marquee Carousel with Real Vector Brand Logos */}
        <div className="marquee-wrapper">
          <div className="marquee-track">
            {/* First Set of Brands */}
            {[
              { id: 'benq', desc: 'RP / RM Interactive Displays', logo: <BenQLogo height={22} /> },
              { id: 'maxhub', desc: 'V5 / V6 Interactive Panels', logo: <MaxhubLogo height={20} /> },
              { id: 'seewo', desc: 'Interactive Touch Boards', logo: <SeewoLogo height={20} /> },
              { id: 'newline', desc: 'Touch Collaboration Displays', logo: <NewlineLogo height={20} /> },
              { id: 'promethean', desc: 'ActivPanel Series', logo: <PrometheanLogo height={20} /> },
              { id: 'smart', desc: 'Interactive Learning Ecosystem', logo: <SmartBoardLogo height={20} /> },
              { id: 'viewsonic', desc: 'ViewBoard 4K Panels', logo: <ViewSonicLogo height={20} /> },
              { id: 'huawei', desc: 'IdeaHub Board Education', logo: <HuaweiLogo height={20} /> },
              { id: 'samsung', desc: 'Interactive Digital Whiteboard', logo: <SamsungLogo height={18} /> },
            ].map((brand, idx) => (
              <div key={`brand-1-${idx}`} className="brand-pill" style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 26px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>{brand.logo}</div>
                <div style={{ fontSize: '0.75rem', color: '#86868b', fontWeight: 400, borderLeft: '1px solid rgba(255,255,255,0.12)', paddingLeft: '12px', whiteSpace: 'nowrap' }}>
                  {brand.desc}
                </div>
              </div>
            ))}

            {/* Duplicate Set for Seamless Continuous Infinite Scrolling */}
            {[
              { id: 'benq', desc: 'RP / RM Interactive Displays', logo: <BenQLogo height={22} /> },
              { id: 'maxhub', desc: 'V5 / V6 Interactive Panels', logo: <MaxhubLogo height={20} /> },
              { id: 'seewo', desc: 'Interactive Touch Boards', logo: <SeewoLogo height={20} /> },
              { id: 'newline', desc: 'Touch Collaboration Displays', logo: <NewlineLogo height={20} /> },
              { id: 'promethean', desc: 'ActivPanel Series', logo: <PrometheanLogo height={20} /> },
              { id: 'smart', desc: 'Interactive Learning Ecosystem', logo: <SmartBoardLogo height={20} /> },
              { id: 'viewsonic', desc: 'ViewBoard 4K Panels', logo: <ViewSonicLogo height={20} /> },
              { id: 'huawei', desc: 'IdeaHub Board Education', logo: <HuaweiLogo height={20} /> },
              { id: 'samsung', desc: 'Interactive Digital Whiteboard', logo: <SamsungLogo height={18} /> },
            ].map((brand, idx) => (
              <div key={`brand-2-${idx}`} className="brand-pill" style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 26px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>{brand.logo}</div>
                <div style={{ fontSize: '0.75rem', color: '#86868b', fontWeight: 400, borderLeft: '1px solid rgba(255,255,255,0.12)', paddingLeft: '12px', whiteSpace: 'nowrap' }}>
                  {brand.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compatible Devices & Operating Systems Grid */}
      <section style={{ maxWidth: '1200px', margin: '60px auto 20px', padding: '0 24px', width: '100%', position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#2997ff', marginBottom: '8px' }}>
            CROSS-PLATFORM INTEGRATION
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#f5f5f7', marginBottom: '12px' }}>
            {t('devices.title')}
          </h2>
          <p style={{ color: '#86868b', fontSize: '1.1rem', maxWidth: '680px', margin: '0 auto', lineHeight: 1.5 }}>
            {t('devices.subtitle')}
          </p>
        </div>

        <div className="devices-grid">
          {[
            {
              logo: <AppleLogo height={26} fill="#F5F5F7" />,
              os: 'Apple iPadOS',
              badge: 'Safari & Chrome',
              desc: 'iPad Pro / Air, Apple Pencil low-latency ink & 120Hz ProMotion'
            },
            {
              logo: <AndroidLogo height={26} />,
              os: 'Android OS',
              badge: 'v9.0 ~ v14.0',
              desc: 'Built-in whiteboard browsers, Xiaomi, Samsung & Huawei Tablets'
            },
            {
              logo: <WindowsLogo height={24} />,
              os: 'Microsoft Windows',
              badge: 'Win 10 / 11',
              desc: 'Interactive touch TVs, Surface Hub, AIO touch monitors & PCs'
            },
            {
              logo: <AppleLogo height={26} fill="#F5F5F7" />,
              os: 'Apple macOS',
              badge: 'macOS Monterey+',
              desc: 'MacBook, iMac, dual-display teacher control & staging'
            },
            {
              logo: <ChromeOSLogo height={28} />,
              os: 'ChromeOS & Linux',
              badge: 'Web-Native Kiosk',
              desc: 'Classroom Chromebook fleets, touch kiosks, and open-source lab workstations'
            }
          ].map((device, idx) => (
            idx === 4 ? (
              <div key={idx} className="device-badge-full">
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: '260px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>{device.logo}</div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#f5f5f7', margin: 0, letterSpacing: '-0.02em' }}>{device.os}</h3>
                </div>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
                  <p style={{ fontSize: '0.92rem', color: '#86868b', lineHeight: 1.5, margin: 0 }}>{device.desc}</p>
                  <span style={{ fontSize: '0.72rem', padding: '4px 12px', borderRadius: '980px', background: 'rgba(255, 255, 255, 0.08)', color: '#2997ff', fontWeight: 500, border: '1px solid rgba(41, 151, 255, 0.25)', whiteSpace: 'nowrap', flexShrink: 0 }}>
                    {device.badge}
                  </span>
                </div>
              </div>
            ) : (
              <div key={idx} className="device-badge">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: '32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>{device.logo}</div>
                  <span style={{ fontSize: '0.72rem', padding: '3px 10px', borderRadius: '980px', background: 'rgba(255, 255, 255, 0.08)', color: '#2997ff', fontWeight: 500, border: '1px solid rgba(41, 151, 255, 0.25)' }}>
                    {device.badge}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#f5f5f7', margin: '6px 0 0', letterSpacing: '-0.02em' }}>{device.os}</h3>
                <p style={{ fontSize: '0.9rem', color: '#86868b', lineHeight: 1.5, margin: 0 }}>{device.desc}</p>
              </div>
            )
          ))}
        </div>

        {/* Feature Highlights & Technology Introductions (Big 1 Card Per Row Bento) */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#2997ff', marginBottom: '8px' }}>
            ENGINEERED CAPABILITIES
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#f5f5f7', marginBottom: '12px' }}>
            {t('features.title')}
          </h2>
          <p style={{ color: '#86868b', fontSize: '1.1rem', maxWidth: '680px', margin: '0 auto', lineHeight: 1.5 }}>
            {t('features.subtitle')}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '80px' }}>
          {[
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2997ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
                </svg>
              ),
              titleKey: 'features.sync.title',
              descKey: 'features.sync.desc',
              tag: '< 50ms Latency',
              color: '#2997ff',
              metric: '0.05s Sync Speed'
            },
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#30d158" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                </svg>
              ),
              titleKey: 'features.touch.title',
              descKey: 'features.touch.desc',
              tag: 'Multi-Touch & Stylus',
              color: '#30d158',
              metric: '4096 Levels Pressure'
            },
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff9f0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              ),
              titleKey: 'features.hardware.title',
              descKey: 'features.hardware.desc',
              tag: '100% Web-Based',
              color: '#ff9f0a',
              metric: 'Zero Driver Setup'
            },
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#bf5af2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              ),
              titleKey: 'features.presence.title',
              descKey: 'features.presence.desc',
              tag: 'Live Telemetry',
              color: '#bf5af2',
              metric: 'Real-Time Roster'
            }
          ].map((feat, idx) => (
            <div key={idx} className="feature-row-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flex: '0 0 auto', minWidth: '320px' }}>
                <span style={{ background: `${feat.color}15`, border: `1px solid ${feat.color}35`, padding: '16px', borderRadius: '18px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {feat.icon}
                </span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 600, color: feat.color, border: `1px solid ${feat.color}40`, padding: '3px 12px', borderRadius: '980px', background: `${feat.color}15`, letterSpacing: '0.03em' }}>
                      {feat.tag}
                    </span>
                  </div>
                  <h3 style={{ fontSize: 'clamp(1.25rem, 2vw, 1.55rem)', fontWeight: 700, color: '#f5f5f7', margin: 0, letterSpacing: '-0.025em' }}>
                    {t(feat.titleKey)}
                  </h3>
                </div>
              </div>
              <div style={{ flex: 1, borderLeft: '1px solid rgba(255, 255, 255, 0.08)', paddingLeft: '32px' }}>
                <p style={{ fontSize: '1.02rem', color: '#86868b', lineHeight: 1.6, margin: 0 }}>
                  {t(feat.descKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
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
              {isForgotPasswordMode ? 'Reset Password' : (isLoginMode ? 'Welcome Back' : 'Create Account')}
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
              {((isLoginMode || (!isLoginMode && step === 1)) && !isForgotPasswordMode) && (
                <>
                  <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: '#fff' }} />

                  <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: '#fff' }} />
                </>
              )}

              {/* Forgot Password Field */}
              {isForgotPasswordMode && (
                <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required
                  style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: '#fff' }} />
              )}

              {/* Verification Code - Step 2 */}
              {!isLoginMode && step === 2 && (
                <div className="animate-fade-in-up">
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '10px' }}>Enter the 6-digit code sent to {email}</p>
                  <input type="text" placeholder="Verification Code" value={verificationCode} onChange={e => setVerificationCode(e.target.value)} required
                    style={{ padding: '12px', width: '100%', borderRadius: '8px', border: '1px solid var(--primary)', background: 'rgba(0,0,0,0.2)', color: '#fff', fontSize: '1.2rem', textAlign: 'center', letterSpacing: '4px' }} maxLength={6} />
                </div>
              )}

              {/* Legal Terms Checkbox - Step 1 Register */}
              {!isLoginMode && step === 1 && !isForgotPasswordMode && (
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.82rem', color: '#a1a1a6', cursor: 'pointer', lineHeight: 1.45, marginTop: '2px', padding: '0 2px' }}>
                  <input 
                    type="checkbox" 
                    checked={hasAgreedToTerms} 
                    onChange={e => setHasAgreedToTerms(e.target.checked)} 
                    required
                    style={{ marginTop: '3px', accentColor: '#2997ff', cursor: 'pointer' }}
                  />
                  <span>
                    {language === 'en' ? (
                      <>I have read and agree to the <Link href="/user-agreement" target="_blank" style={{ color: '#2997ff', textDecoration: 'underline' }}>User Agreement</Link>, <Link href="/privacy-policy" target="_blank" style={{ color: '#2997ff', textDecoration: 'underline' }}>Privacy Policy</Link>, and <Link href="/refund-policy" target="_blank" style={{ color: '#2997ff', textDecoration: 'underline' }}>Refund Policy</Link>.</>
                    ) : (language === 'zh-TW' ? (
                      <>我已閱讀並同意遵守 <Link href="/user-agreement" target="_blank" style={{ color: '#2997ff', textDecoration: 'underline' }}>《用戶服務協議》</Link>、<Link href="/privacy-policy" target="_blank" style={{ color: '#2997ff', textDecoration: 'underline' }}>《隱私政策》</Link> 及 <Link href="/refund-policy" target="_blank" style={{ color: '#2997ff', textDecoration: 'underline' }}>《退款政策》</Link>。</>
                    ) : (
                      <>我已阅读并同意遵守 <Link href="/user-agreement" target="_blank" style={{ color: '#2997ff', textDecoration: 'underline' }}>《用户服务协议》</Link>、<Link href="/privacy-policy" target="_blank" style={{ color: '#2997ff', textDecoration: 'underline' }}>《隐私政策》</Link> 及 <Link href="/refund-policy" target="_blank" style={{ color: '#2997ff', textDecoration: 'underline' }}>《退款政策》</Link>。</>
                    ))}
                  </span>
                </label>
              )}

              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                {isForgotPasswordMode ? 'Send Reset Link' : (isLoginMode ? 'Sign In' : (step === 1 ? 'Send Verification Code' : 'Verify & Register'))}
              </button>
            </form>
            
            {statusMsg && <p style={{ marginTop: '15px', textAlign: 'center', color: 'var(--primary)', fontSize: '0.9rem' }}>{statusMsg}</p>}
            
            {isLoginMode && !isForgotPasswordMode && (
              <button type="button" style={{ marginTop: '15px', width: '100%', background: 'transparent', border: 'none', textAlign: 'center', color: 'var(--primary)', fontSize: '0.9rem', cursor: 'pointer' }} onClick={() => setIsForgotPasswordMode(true)}>
                Forgot Password?
              </button>
            )}

            <button type="button" style={{ marginTop: '10px', width: '100%', background: 'transparent', border: 'none', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', cursor: 'pointer' }} onClick={() => resetForm(!isLoginMode)} onTouchStart={(e) => { e.preventDefault(); resetForm(!isLoginMode); }}>
              {isLoginMode ? (isForgotPasswordMode ? "Back to Login" : "Don't have an account? Register") : "Already have an account? Login"}
            </button>
          </div>
        </div>
      )}
      {/* PC ID Configuration Modal */}
      {showPcIdModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
        }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '40px', position: 'relative' }}>
            <button 
              onClick={() => setShowPcIdModal(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}
            >✕</button>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', textAlign: 'center' }}>Set PC ID</h3>
            <input 
              type="text" 
              placeholder="Enter PC ID" 
              value={tempPcId} 
              onChange={e => setTempPcId(e.target.value)} 
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: '#fff', marginBottom: '20px' }} 
            />
            <button 
              className="btn-primary" 
              style={{ width: '100%', padding: '12px' }}
              onClick={() => {
                localStorage.setItem('pc_id', tempPcId);
                setShowPcIdModal(false);
                alert('PC ID saved successfully!');
              }}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
}
