"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'zh';

const translations: Record<Language, Record<string, string>> = {
  en: {
    'header.brand': 'EduSphere',
    'header.login': 'Login',
    'hero.badge': 'Welcome to EduSphere',
    'hero.title': 'Learn and Grow Together',
    'hero.subtitle': 'The ultimate platform for learners and educators.',
    'hero.loginAsEducator': 'Login as Educator',
    'hero.loginAsStudent': 'Login as Student',
    'dashboard.title': 'Dashboard',
    'dashboard.subtitle': 'Manage your courses and students',
    'dashboard.createCourse': 'Create Course',
    'dashboard.yourCourses': 'Your Courses',
  },
  zh: {
    'header.brand': 'EduSphere',
    'header.login': '登入',
    'hero.badge': '歡迎來到 EduSphere',
    'hero.title': '一起學習與成長',
    'hero.subtitle': '最適合學生與教育者的終極平台。',
    'hero.loginAsEducator': '以教育者身分登入',
    'hero.loginAsStudent': '以學生身分登入',
    'dashboard.title': '控制面板',
    'dashboard.subtitle': '管理您的課程與學生',
    'dashboard.createCourse': '建立課程',
    'dashboard.yourCourses': '您的課程',
  }
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
