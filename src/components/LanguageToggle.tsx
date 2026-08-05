"use client";
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <button 
        onClick={() => setLanguage('en')}
        style={{ 
          padding: '6px 12px', 
          fontSize: '0.9rem', 
          borderRadius: '4px',
          border: '1px solid #38bdf8',
          background: language === 'en' ? '#38bdf8' : 'transparent',
          color: language === 'en' ? '#fff' : '#38bdf8',
          cursor: 'pointer'
        }}
      >
        EN
      </button>
      <button 
        onClick={() => setLanguage('zh')}
        style={{ 
          padding: '6px 12px', 
          fontSize: '0.9rem', 
          borderRadius: '4px',
          border: '1px solid #38bdf8',
          background: language === 'zh' ? '#38bdf8' : 'transparent',
          color: language === 'zh' ? '#fff' : '#38bdf8',
          cursor: 'pointer'
        }}
      >
        中
      </button>
    </div>
  );
}
