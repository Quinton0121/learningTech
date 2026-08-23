'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import Link from 'next/link';
import Footer from '@/components/Footer';

export default function UserGuide() {
  const { language } = useLanguage();
  
  const text = {
    title: {
      en: 'Interlectic Platform Guide',
      'zh-TW': 'Interlectic 平台使用者指南',
      'zh-CN': 'Interlectic 平台用户指南'
    },
    subtitle: {
      en: 'Everything you need to know to manage your courses, students, and classrooms efficiently.',
      'zh-TW': '高效管理課程、學生與教室的完整教學指南。',
      'zh-CN': '高效管理课程、学生与教室的完整教学指南。'
    },
    visibilityTitle: {
      en: 'Course Visibility: Public vs Private',
      'zh-TW': '課程能見度：公開 vs 不公開',
      'zh-CN': '课程可见度：公开 vs 不公开'
    },
    visibilityDesc: {
      en: 'When you create a course on Interlectic, you can choose how it is shared with the world. You can easily toggle this setting from your Dashboard.',
      'zh-TW': '在 Interlectic 建立課程時，您可以選擇如何與世界分享該課程。您可以隨時在控制台中切換此設定。',
      'zh-CN': '在 Interlectic 创建课程时，您可以选择如何与世界分享该课程。您可以随时在控制台中切换此设置。'
    },
    privateTitle: {
      en: 'Private Courses',
      'zh-TW': '不公開課程 (Private)',
      'zh-CN': '不公开课程 (Private)'
    },
    privateDesc: {
      en: 'By default, all new courses are Private. This means your course is hidden from the public marketplace.',
      'zh-TW': '所有新課程預設為「不公開」。這表示您的課程在公開市場中將被隱藏。',
      'zh-CN': '所有新课程默认为“不公开”。这表示您的课程在公开市场中将被隐藏。'
    },
    privateLi1: {
      en: 'Only you and the students you explicitly invite can access it.',
      'zh-TW': '只有您與受邀的學生可以存取。',
      'zh-CN': '只有您与受邀的学生可以访问。'
    },
    privateLi2: {
      en: 'Ideal for your own physical classrooms and private tutoring sessions.',
      'zh-TW': '適合用於實體教室或私人補習班。',
      'zh-CN': '适用于实体教室或私人辅导班。'
    },
    publicTitle: {
      en: 'Public Courses',
      'zh-TW': '公開課程 (Public)',
      'zh-CN': '公开课程 (Public)'
    },
    publicDesc: {
      en: 'Public courses are listed on the Interlectic Marketplace for anyone to discover.',
      'zh-TW': '公開課程將展示於 Interlectic 市場，供任何人探索與購買。',
      'zh-CN': '公开课程将展示于 Interlectic 市场，供任何人探索与购买。'
    },
    publicLi1: {
      en: 'Other teachers and independent students can purchase access to your course.',
      'zh-TW': '其他教師或自學者可以購買並存取您的課程。',
      'zh-CN': '其他教师或自学者可以购买并访问您的课程。'
    },
    publicLi2: {
      en: 'You earn revenue for every external student that enrolls in your material.',
      'zh-TW': '每當有外部學生報名，您即可賺取被動收入。',
      'zh-CN': '每当有外部学生报名，您即可赚取被动收入。'
    },
    loginTitle: {
      en: 'The Quick Login System',
      'zh-TW': '快速登入系統',
      'zh-CN': '快速登录系统'
    },
    loginDesc: {
      en: 'Typing passwords wastes valuable class time. Our Quick Login system allows your students to instantly connect to your live presentation just by opening the browser on their assigned computer.',
      'zh-TW': '輸入密碼會浪費寶貴的上課時間。我們的快速登入系統讓學生只需在指定電腦上打開瀏覽器，即可瞬間連線至您的直播簡報。',
      'zh-CN': '输入密码会浪费宝贵的上课时间。我们的快速登录系统让学生只需在指定电脑上打开浏览器，即可瞬间连接至您的直播幻灯片。'
    },
    loginLi1: {
      en: 'On each student\'s physical computer, visit /setup and assign it a unique PC_ID.',
      'zh-TW': '在每位學生的實體電腦上，訪問 /setup 並指派一個獨立的 PC_ID。',
      'zh-CN': '在每位学生的实体电脑上，访问 /setup 并指派一个独立的 PC_ID。'
    },
    loginLi2: {
      en: 'On your Dashboard, upload a CSV file containing your students\' details and their assigned PC_ID.',
      'zh-TW': '在控制台中上傳 CSV 檔案，將學生資料與 PC_ID 進行綁定。',
      'zh-CN': '在控制台中上传 CSV 文件，将学生资料与 PC_ID 进行绑定。'
    },
    loginLi3: {
      en: 'Click the "Login Students" button on your dashboard. Any student sitting at a registered PC will be automatically logged in!',
      'zh-TW': '在上課時，點擊控制台的「登入學生裝置」，所有坐在註冊電腦前的學生將會自動登入！',
      'zh-CN': '在上课时，点击控制台的“登录学生设备”，所有坐在注册电脑前的学生将会自动登录！'
    },
    expiryTitle: {
      en: 'Course Lifecycle & Expiration',
      'zh-TW': '課程生命週期與過期機制',
      'zh-CN': '课程生命周期与过期机制'
    },
    expiryDesc1: {
      en: 'To ensure our servers remain fast and quotas are managed fairly, every course has a strict 13-month lifecycle.',
      'zh-TW': '為確保伺服器速度與合理的資源分配，每堂課程都有嚴格的 13 個月生命週期。',
      'zh-CN': '为确保服务器速度与合理的资源分配，每堂课程都有严格的 13 个月生命周期。'
    },
    expiryDesc2: {
      en: 'The 13-month countdown begins the moment your very first student connects to the course.',
      'zh-TW': '13個月的倒數計時將從「第一位學生連線至課程」的那一刻開始計算。',
      'zh-CN': '13个月的倒数计时将从“第一位学生连接至课程”的那一刻开始计算。'
    },
    whatHappens: {
      en: 'What happens when it expires?',
      'zh-TW': '過期後會怎樣？',
      'zh-CN': '过期后会怎样？'
    },
    expiryLi1: {
      en: 'The course is permanently Archived.',
      'zh-TW': '該課程將被永久「封存」。',
      'zh-CN': '该课程将被永久“归档”。'
    },
    expiryLi2: {
      en: 'You can no longer start live classes or invite new students.',
      'zh-TW': '您將無法開啟直播課堂，也無法邀請新學生。',
      'zh-CN': '您将无法开启直播课堂，也无法邀请新学生。'
    },
    expiryLi3: {
      en: 'Simply click the "Copy Course" button to generate a fresh clone for a new batch of students!',
      'zh-TW': '只需點擊「複製課程」按鈕，系統將產生一份全新的複本，供下一批新生使用！',
      'zh-CN': '只需点击“复制课程”按钮，系统将生成一份全新的副本，供下一批新生使用！'
    },
    returnBtn: {
      en: '← Return to Dashboard',
      'zh-TW': '← 返回控制台',
      'zh-CN': '← 返回控制台'
    },
    step1: { en: 'Device Registration:', 'zh-TW': '裝置註冊：', 'zh-CN': '设备注册：' },
    step2: { en: 'Student Mapping:', 'zh-TW': '學生綁定：', 'zh-CN': '学生绑定：' },
    step3: { en: 'One-Click Login:', 'zh-TW': '一鍵登入：', 'zh-CN': '一键登录：' },
    nextYear: { en: 'To teach the course again next year:', 'zh-TW': '若明年要再次教授此課：', 'zh-CN': '若明年要再次教授此课：' }
  };
  
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text-main)', fontFamily: "'Inter', sans-serif" }}>
      <header style={{ background: 'var(--surface)', padding: '40px 20px', textAlign: 'center', borderBottom: '1px solid var(--glass-border)', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
          <LanguageToggle />
        </div>
        <h1 style={{ margin: '0 0 10px 0', fontSize: '2.5rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
          <img src="/edusphere.png" alt="Interlectic Logo" style={{ height: '50px', objectFit: 'contain' }} />
          {text.title[language]}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          {text.subtitle[language]}
        </p>
      </header>

      <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
        
        {/* Visibility Card */}
        <div className="glass-panel" style={{ padding: '30px', marginBottom: '30px', borderRadius: '12px' }}>
          <h2 style={{ color: 'var(--primary)', marginTop: 0 }}>
            {text.visibilityTitle[language]}
          </h2>
          <p>{text.visibilityDesc[language]}</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '8px', borderTop: '3px solid #10b981' }}>
              <h3 style={{ color: 'white', marginTop: 0 }}>{text.privateTitle[language]}</h3>
              <p>{text.privateDesc[language]}</p>
              <ul style={{ paddingLeft: '20px' }}>
                <li>{text.privateLi1[language]}</li>
                <li>{text.privateLi2[language]}</li>
              </ul>
            </div>
            
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '8px', borderTop: '3px solid #38bdf8' }}>
              <h3 style={{ color: 'white', marginTop: 0 }}>{text.publicTitle[language]}</h3>
              <p>{text.publicDesc[language]}</p>
              <ul style={{ paddingLeft: '20px' }}>
                <li>{text.publicLi1[language]}</li>
                <li>{text.publicLi2[language]}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Login Card */}
        <div className="glass-panel" style={{ padding: '30px', marginBottom: '30px', borderRadius: '12px' }}>
          <h2 style={{ color: 'var(--primary)', marginTop: 0 }}>{text.loginTitle[language]}</h2>
          <p>{text.loginDesc[language]}</p>
          <ol style={{ lineHeight: 1.8, paddingLeft: '20px' }}>
            <li><strong>{text.step1[language]}</strong> {text.loginLi1[language]}</li>
            <li><strong>{text.step2[language]}</strong> {text.loginLi2[language]}</li>
            <li><strong>{text.step3[language]}</strong> {text.loginLi3[language]}</li>
          </ol>
        </div>

        {/* Expiration Card */}
        <div className="glass-panel" style={{ padding: '30px', marginBottom: '30px', borderRadius: '12px' }}>
          <h2 style={{ color: 'var(--primary)', marginTop: 0 }}>{text.expiryTitle[language]}</h2>
          <p>{text.expiryDesc1[language]}</p>
          <p>{text.expiryDesc2[language]}</p>
          <p><strong>{text.whatHappens[language]}</strong></p>
          <ul style={{ paddingLeft: '20px' }}>
            <li>{text.expiryLi1[language]}</li>
            <li>{text.expiryLi2[language]}</li>
            <li><strong>{text.nextYear[language]}</strong> {text.expiryLi3[language]}</li>
          </ul>
        </div>

        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Link href="/dashboard" style={{ display: 'inline-block', padding: '12px 24px', border: '1px solid var(--primary)', color: 'var(--primary)', textDecoration: 'none', borderRadius: '8px', fontWeight: 600 }}>
            {text.returnBtn[language]}
          </Link>
        </div>

      </div>
      <Footer />
    </div>
  );
}
