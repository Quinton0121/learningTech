"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'zh-CN' | 'zh-TW';

const translations: Record<Language, Record<string, string>> = {
  en: {
    'header.brand': 'Interlectic',
    'header.login': 'Login',
    'hero.badge': 'Welcome to Interlectic',
    'hero.title': 'Learn and Grow Together',
    'hero.subtitle': 'The ultimate platform for learners and educators.',
    'hero.loginAsEducator': 'Login as Educator',
    'hero.loginAsStudent': 'Login as Student',
    'dashboard.title': 'Dashboard',
    'dashboard.subtitle': 'Manage your courses and students',
    'dashboard.createCourse': 'Create Course',
    'dashboard.yourCourses': 'Your Courses',
    'dashboard.clickToOpen': 'Click to open panel',
    'dashboard.courseExpired': 'Expired',
    'dashboard.published': 'Published',
    'dashboard.close': 'Close',
    'dashboard.editName': 'Edit Name',
    'dashboard.private': 'Private',
    'dashboard.togglePublic': 'Toggle Public/Private',
    'dashboard.openSlides': 'Open Slides',
    'dashboard.logoutStudents': 'Logout Students',
    'dashboard.loginStudents': 'Login Students',
    'dashboard.copyCourse': 'Copy Course',
    'dashboard.enrolledCount': 'Enrolled',
    'dashboard.seatsLeft': 'Seats left',
    'dashboard.sharedWith': 'Shared with',
    'dashboard.connectStudent': 'Connect Student',
    'dashboard.studentEmail': 'Student Email',
    'dashboard.connectBtn': 'Connect',
    'dashboard.bulkImport': 'Bulk Import Students',
    'dashboard.csvFormat': 'CSV Format: email, name',
    'dashboard.uploadBtn': 'Upload CSV',
    'dashboard.rosterTitle': 'Class Roster',
    'dashboard.colName': 'Name',
    'dashboard.colEmail': 'Email',
    'dashboard.colPcId': 'PC ID',
    'dashboard.colStatus': 'Status',
    'dashboard.colActions': 'Actions',
    'sidebar.welcome': 'Welcome back,',
    'sidebar.myCourses': '📚 My Courses',
    'sidebar.students': '👥 Students',
    'sidebar.analytics': '📊 Analytics',
    'sidebar.marketplace': '🛒 Marketplace',
    'sidebar.tokens': '💰 Buy Tokens',
    'sidebar.educatorShop': '🛍️ Educator Shop',
    'sidebar.customOrder': '🛠️ Custom Order',
    'sidebar.settings': '⚙️ Settings',
    'sidebar.signOut': 'Sign Out',
    'sidebar.documentation': '📖 Documentation',
  },
  'zh-TW': {
    'header.brand': 'Interlectic',
    'header.login': '登入',
    'hero.badge': '歡迎來到 Interlectic',
    'hero.title': '一起學習與成長',
    'hero.subtitle': '最適合學生與教育者的終極平台。',
    'hero.loginAsEducator': '以教育者身分登入',
    'hero.loginAsStudent': '以學生身分登入',
    'dashboard.title': '控制面板',
    'dashboard.subtitle': '管理您的課程與學生',
    'dashboard.createCourse': '建立課程',
    'dashboard.yourCourses': '您的課程',
    'dashboard.clickToOpen': '點擊展開面板',
    'dashboard.courseExpired': '已過期',
    'dashboard.published': '已發布',
    'dashboard.close': '關閉',
    'dashboard.editName': '編輯名稱',
    'dashboard.private': '私密',
    'dashboard.togglePublic': '切換公開/私密',
    'dashboard.openSlides': '打開課件',
    'dashboard.logoutStudents': '讓學生登出',
    'dashboard.loginStudents': '讓學生登入',
    'dashboard.copyCourse': '複製課程',
    'dashboard.enrolledCount': '已註冊',
    'dashboard.seatsLeft': '剩餘座位',
    'dashboard.sharedWith': '共享給',
    'dashboard.connectStudent': '連接學生',
    'dashboard.studentEmail': '學生電郵',
    'dashboard.connectBtn': '連接',
    'dashboard.bulkImport': '批量導入學生',
    'dashboard.csvFormat': 'CSV 格式: 電郵, 姓名',
    'dashboard.uploadBtn': '上傳 CSV',
    'dashboard.rosterTitle': '班級名單',
    'dashboard.colName': '姓名',
    'dashboard.colEmail': '電郵',
    'dashboard.colPcId': '電腦 ID',
    'dashboard.colStatus': '狀態',
    'dashboard.colActions': '操作',
    'sidebar.welcome': '歡迎回來，',
    'sidebar.myCourses': '📚 我的課程',
    'sidebar.students': '👥 學生管理',
    'sidebar.analytics': '📊 數據分析',
    'sidebar.marketplace': '🛒 課程市場',
    'sidebar.tokens': '💰 購買代幣',
    'sidebar.educatorShop': '🛍️ 教師商店',
    'sidebar.customOrder': '🛠️ 訂製課程',
    'sidebar.settings': '⚙️ 系統設定',
    'sidebar.signOut': '登出系統',
    'sidebar.documentation': '📖 系統文件',
  },
  'zh-CN': {
    'header.brand': 'Interlectic',
    'header.login': '登录',
    'hero.badge': '欢迎来到 Interlectic',
    'hero.title': '一起学习与成长',
    'hero.subtitle': '最适合学生与教育者的终极平台。',
    'hero.loginAsEducator': '以教育者身份登录',
    'hero.loginAsStudent': '以学生身份登录',
    'dashboard.title': '控制面板',
    'dashboard.subtitle': '管理您的课程与学生',
    'dashboard.createCourse': '创建课程',
    'dashboard.yourCourses': '您的课程',
    'dashboard.clickToOpen': '点击展开面板',
    'dashboard.courseExpired': '已过期',
    'dashboard.published': '已发布',
    'dashboard.close': '关闭',
    'dashboard.editName': '编辑名称',
    'dashboard.private': '私密',
    'dashboard.togglePublic': '切换公开/私密',
    'dashboard.openSlides': '打开课件',
    'dashboard.logoutStudents': '让学生登出',
    'dashboard.loginStudents': '让学生登入',
    'dashboard.copyCourse': '复制课程',
    'dashboard.enrolledCount': '已注册',
    'dashboard.seatsLeft': '剩余座位',
    'dashboard.sharedWith': '共享给',
    'dashboard.connectStudent': '连接学生',
    'dashboard.studentEmail': '学生邮箱',
    'dashboard.connectBtn': '连接',
    'dashboard.bulkImport': '批量导入学生',
    'dashboard.csvFormat': 'CSV 格式: 邮箱, 姓名',
    'dashboard.uploadBtn': '上传 CSV',
    'dashboard.rosterTitle': '班级名单',
    'dashboard.colName': '姓名',
    'dashboard.colEmail': '邮箱',
    'dashboard.colPcId': '电脑 ID',
    'dashboard.colStatus': '状态',
    'dashboard.colActions': '操作',
    'sidebar.welcome': '欢迎回来，',
    'sidebar.myCourses': '📚 我的课程',
    'sidebar.students': '👥 学生管理',
    'sidebar.analytics': '📊 数据分析',
    'sidebar.marketplace': '🛒 课程市场',
    'sidebar.tokens': '💰 购买代币',
    'sidebar.educatorShop': '🛍️ 教师商店',
    'sidebar.customOrder': '🛠️ 定制课程',
    'sidebar.settings': '⚙️ 系统设置',
    'sidebar.signOut': '退出系统',
    'sidebar.documentation': '📖 系统文档',
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
