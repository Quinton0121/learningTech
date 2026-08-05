"use client";
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const buttonStyle = (lang: string) => ({
    padding: '6px 12px', 
    fontSize: '0.9rem', 
    borderRadius: '4px',
    border: '1px solid #38bdf8',
    background: language === lang ? '#38bdf8' : 'transparent',
    color: language === lang ? '#fff' : '#38bdf8',
    cursor: 'pointer'
  });

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <button onClick={() => setLanguage('en')} style={buttonStyle('en')}>EN</button>
      <button onClick={() => setLanguage('zh-CN')} style={buttonStyle('zh-CN')}>简</button>
      <button onClick={() => setLanguage('zh-TW')} style={buttonStyle('zh-TW')}>繁</button>
    </div>
  );
}
