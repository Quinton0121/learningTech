"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      width: '100%',
      marginTop: 'auto',
      borderTop: '1px solid var(--glass-border)',
      background: 'rgba(15, 23, 42, 0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      zIndex: 50,
      position: 'relative'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '48px 24px 24px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '36px',
          marginBottom: '36px'
        }}>
          {/* Brand Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img src="/edusphere.png" alt="Interlectic Logo" style={{ height: '36px', objectFit: 'contain' }} />
              <span style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)', letterSpacing: '-0.5px' }}>
                {t('footer.brand')}
              </span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ color: 'var(--text-main)', fontSize: '1rem', fontWeight: 600, letterSpacing: '0.5px' }}>
              {t('footer.quickLinks')}
            </h4>
            <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>
              Home
            </Link>
            <Link href="/user-guide" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>
              {t('footer.userGuide')}
            </Link>
            <Link href="/marketplace" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>
              {t('sidebar.marketplace')}
            </Link>
            <Link href="/tokens" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>
              {t('sidebar.tokens')}
            </Link>
          </div>

          {/* Legal & Policies */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ color: 'var(--text-main)', fontSize: '1rem', fontWeight: 600, letterSpacing: '0.5px' }}>
              {t('footer.legal')}
            </h4>
            <Link href="/refund-policy" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px', transition: 'color 0.2s' }}>
              <span>💳</span> {t('footer.refundPolicy')}
            </Link>
            <Link href="/privacy-policy" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px', transition: 'color 0.2s' }}>
              <span>🔒</span> {t('footer.privacyPolicy')}
            </Link>
          </div>

          {/* Support */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ color: 'var(--text-main)', fontSize: '1rem', fontWeight: 600, letterSpacing: '0.5px' }}>
              {t('footer.support')}
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Email: support@interlectic.com
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Macau & Global Support
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            © {currentYear} Interlectic. {t('footer.rights')}
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link href="/refund-policy" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none' }}>
              {t('footer.refundPolicy')}
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
            <Link href="/privacy-policy" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none' }}>
              {t('footer.privacyPolicy')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
