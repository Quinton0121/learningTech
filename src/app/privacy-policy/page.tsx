"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import Footer from '@/components/Footer';

export default function PrivacyPolicyPage() {
  const { language } = useLanguage();

  const content = {
    title: {
      en: 'Privacy Policy',
      'zh-TW': '隱私政策',
      'zh-CN': '隐私政策'
    },
    subtitle: {
      en: 'How Interlectic collects, uses, protects, and handles your personal information, classroom data, and device identifiers.',
      'zh-TW': '說明 Interlectic 如何收集、使用、保護及管理您的個人資料、課堂互動數據及終端設備識別碼。',
      'zh-CN': '说明 Interlectic 如何收集、使用、保护及管理您的个人资料、课堂互动数据及终端设备标识码。'
    },
    lastUpdated: {
      en: 'Last updated: August 2026',
      'zh-TW': '最後更新日期：2026 年 8 月',
      'zh-CN': '最后更新日期：2026 年 8 月'
    },
    badge: {
      en: 'Data Protection & Trust',
      'zh-TW': '數據保護與安全信任',
      'zh-CN': '数据保护与安全信任'
    },
    summaryCards: [
      {
        title: {
          en: 'End-to-End Encryption',
          'zh-TW': '傳輸與存儲加密',
          'zh-CN': '传输与存储加密'
        },
        desc: {
          en: 'Passwords, tokens, and communications are encrypted using modern cryptographic standards.',
          'zh-TW': '所有密碼、身份憑證與即時通訊內容均經過現代高強度密碼學加密防護。',
          'zh-CN': '所有密码、身份凭证与即时通讯内容均经过现代高强度密码学加密防护。'
        }
      },
      {
        title: {
          en: 'No Data Selling',
          'zh-TW': '絕不出售個資',
          'zh-CN': '绝不出售个人资料'
        },
        desc: {
          en: 'We will never sell your personal information or student learning data to third-party advertisers.',
          'zh-TW': '我們絕不向任何第三方廣告商販售或出租您的個人資訊與學生學習歷程。',
          'zh-CN': '我们绝不向任何第三方广告商贩售或出租您的个人信息与学生学习历程。'
        }
      },
      {
        title: {
          en: 'Classroom PC ID Security',
          'zh-TW': '教室終端綁定防護',
          'zh-CN': '教室终端绑定防护'
        },
        desc: {
          en: 'Physical classroom PC IDs are only used for local sync and session authorization.',
          'zh-TW': '實體教室電腦識別碼（PC ID）僅用於課堂即時同步與專屬席位授權管理。',
          'zh-CN': '实体教室电脑标识码（PC ID）仅用于课堂即时同步与专属席位授权管理。'
        }
      }
    ],
    sections: [
      {
        num: '01',
        title: {
          en: '1. Introduction & Scope',
          'zh-TW': '1. 政策引言與適用範圍',
          'zh-CN': '1. 政策引言与适用范围'
        },
        text: {
          en: 'Interlectic ("we", "our", or "the Platform") is committed to protecting the privacy of educators, students, administrators, and visitors. This Privacy Policy details our data collection, handling, and security protocols across our web platform, APIs, classroom synchronization modules, and services.',
          'zh-TW': 'Interlectic（以下簡稱「我們」或「本平台」）高度重視每位教師、學生、學校管理者及訪客的個人隱私與資訊安全。本《隱私政策》旨在詳盡說明我們在網站、API、智慧課堂同步模組及所有相關服務中，如何收集、運用、保存及維護您的個人數據。',
          'zh-CN': 'Interlectic（以下简称“我们”或“本平台”）高度重视每位教师、学生、学校管理者及访客的个人隐私与信息安全。本《隐私政策》旨在详尽说明我们在网站、API、智慧课堂同步模块及所有相关服务中，如何收集、运用、保存及维护您的个人数据。'
        }
      },
      {
        num: '02',
        title: {
          en: '2. Information We Collect',
          'zh-TW': '2. 我們收集的資料項目',
          'zh-CN': '2. 我们收集的数据项目'
        },
        text: {
          en: 'Depending on your role and how you interact with Interlectic, we collect the following types of information:',
          'zh-TW': '根據您在平台上的身分身分與互動行為，我們可能收集以下範疇之資訊：',
          'zh-CN': '根据您在平台上的身份角色与互动行为，我们可能收集以下范畴的信息：'
        },
        items: [
          {
            en: 'Account Registration Data: Name, email address, password hashes (never stored in plaintext), role (Educator, Learner, Admin), and verification codes.',
            'zh-TW': '帳戶註冊資料：真實姓名或暱稱、電子郵件地址、經雜湊加密之密碼、用戶身分（教師、學生、管理員）及驗證碼。',
            'zh-CN': '账户注册资料：真实姓名或昵称、电子邮件地址、经哈希加密之密码、用户角色（教师、学生、管理员）及验证码。'
          },
          {
            en: 'Classroom & Device Identifiers (PC ID): For interactive classroom setups, local terminal identifiers (PC ID), browser user agents, and IP addresses used to pair teacher slides with student desks.',
            'zh-TW': '教室終端設備識別碼（PC ID）：用於互動式教室配對，包含本地設備識別碼、瀏覽器代理資訊及 IP 位址，以實現教師投屏與學生端課件即時同步。',
            'zh-CN': '教室终端设备标识码（PC ID）：用于互动式教室配对，包含本地设备标识码、浏览器代理信息及 IP 地址，以实现教师投屏与学生端课件即时同步。'
          },
          {
            en: 'Learning & Interaction Metrics: Course progress, slide completion events, quiz submissions, interactive activity answers, and token usage history.',
            'zh-TW': '學習歷程與互動數據：課程學習進度、投影片瀏覽紀錄、課堂測驗答題情況、互動練習成果及代幣消費交易歷程。',
            'zh-CN': '学习历程与互动数据：课程学习进度、幻灯片浏览记录、课堂测验答题情况、互动练习成果及代币消费交易历程。'
          },
          {
            en: 'Communications: Messages sent via the internal educator-student messaging box, support inquiries, and customer feedback.',
            'zh-TW': '通訊與支援紀錄：透過平台內置信箱發送之師生交流訊息、在線客服諮詢紀錄及意見反饋內容。',
            'zh-CN': '通讯与支持记录：通过平台内置信箱发送的师生交流消息、在线客服咨询记录及意见反馈内容。'
          }
        ]
      },
      {
        num: '03',
        title: {
          en: '3. How We Use Your Information',
          'zh-TW': '3. 個人資料之使用目的',
          'zh-CN': '3. 个人资料的使用目的'
        },
        text: {
          en: 'We utilize collected information strictly for operational and educational purposes:',
          'zh-TW': '我們收集之數據僅用於提供穩定優質的教學服務與維護平台正常運作：',
          'zh-CN': '我们收集的数据仅用于提供稳定优质的教学服务与维护平台正常运作：'
        },
        items: [
          {
            en: 'Service Provisioning: Providing course access, rendering interactive slides, and synchronizing educator commands with learner screens in real-time.',
            'zh-TW': '核心服務交付：提供課件存取權限、渲染互動式課件，並即時將教師控制指令同步至學生端螢幕。',
            'zh-CN': '核心服务交付：提供课件访问权限、渲染互动式课件，并即时将教师控制指令同步至学生端屏幕。'
          },
          {
            en: 'Authentication & Account Security: Verifying logins, password resets, token transactions, and protecting against unauthorized access.',
            'zh-TW': '身份驗證與安全保護：處理登入驗證、密碼重設、代幣交易確認，防止惡意攻擊與未經授權之存取。',
            'zh-CN': '身份验证与安全保护：处理登录验证、密码重置、代币交易确认，防止恶意攻击与未经授权的访问。'
          },
          {
            en: 'Platform Improvement: Analyzing platform performance, resolving technical errors, and optimizing teaching tools based on aggregated, anonymized usage statistics.',
            'zh-TW': '系統優化與功能升級：分析系統效能、修復技術異常，並基於匿名化之統計數據改進互動教學工具。',
            'zh-CN': '系统优化与功能升级：分析系统效能、修复技术异常，并基于匿名化的统计数据改进互动教学工具。'
          }
        ]
      },
      {
        num: '04',
        title: {
          en: '4. Data Sharing & Third-Party Services',
          'zh-TW': '4. 資料共享與第三方合作夥伴',
          'zh-CN': '4. 数据共享与第三方合作伙伴'
        },
        text: {
          en: 'We do not sell, rent, or trade your personal data. We only share necessary data with trusted service providers under strict data processing agreements:',
          'zh-TW': '我們絕不向任何第三方販賣、租賃或商業交換您的個人資料。僅在下列必要情況下，與受嚴格合約約束之受信任合作夥伴協作：',
          'zh-CN': '我们绝不向任何第三方贩卖、租赁或商业交换您的个人资料。仅在下列必要情况下，与受严格合约约束的受信任合作伙伴协作：'
        },
        items: [
          {
            en: 'Transactional Email Services: Trusted providers (e.g. Resend, SMTP gateways) to deliver verification codes and system notifications.',
            'zh-TW': '系統電郵發送商：透過專業信件服務（如 Resend、SMTP 閘道器）安全遞送註冊驗證碼、密碼重設鏈接及重要系統通知。',
            'zh-CN': '系统邮件发送商：通过专业邮件服务（如 Resend、SMTP 网关）安全递送注册验证码、密码重置链接及重要系统通知。'
          },
          {
            en: 'Payment Processors: Secure financial gateways to process token store and subscription payments without storing raw credit card numbers on our servers.',
            'zh-TW': '安全金流處理商：使用符合國際標準之第三方金流閘道處理代幣購買，本平台伺服器不儲存任何信用卡完整卡號或敏感安全碼。',
            'zh-CN': '安全支付网关：使用符合国际标准的第三方支付网关处理代币购买，本平台服务器不存储任何信用卡完整卡号或敏感安全码。'
          },
          {
            en: 'Legal Compliance: When required by applicable laws, court orders, or governmental regulations in Macau or relevant jurisdictions.',
            'zh-TW': '法律法規遵循：依據澳門法律、法院命令或政府主管機關之合法強制要求進行必要之配合。',
            'zh-CN': '法律法规遵循：依据澳门法律、法院命令或政府主管机关的合法强制要求进行必要的配合。'
          }
        ]
      },
      {
        num: '05',
        title: {
          en: '5. Student & Minor Privacy Protection',
          'zh-TW': '5. 學生與未成年人隱私特別保護',
          'zh-CN': '5. 学生与未成年人隐私特别保护'
        },
        text: {
          en: 'Interlectic places the highest priority on student data privacy in educational settings:',
          'zh-TW': 'Interlectic 視校園與未成年學生之個人資料保護為最高準則：',
          'zh-CN': 'Interlectic 视校园与未成年学生的个人资料保护为最高准则：'
        },
        items: [
          {
            en: 'Classroom Isolation: Student roster records and interaction data are isolated to the specific educator or school holding the classroom license.',
            'zh-TW': '班級獨立隔離：學生名單與課堂互動紀錄嚴格隔離，僅有取得授權之任課教師或所屬學校管理員具備檢視權限。',
            'zh-CN': '班级独立隔离：学生名单与课堂互动记录严格隔离，仅有取得授权的任课教师或所属学校管理员具备查看权限。'
          },
          {
            en: 'No Behavioral Profiling for Ads: Student information is never used for commercial advertising, user profiling, or third-party behavioral tracking.',
            'zh-TW': '禁止商業畫像：學生數據絕不用於商業廣告投放、行為畫像分析或第三方商業追蹤。',
            'zh-CN': '禁止商业画像：学生数据绝不用于商业广告投放、行为画像分析或第三方商业追踪。'
          }
        ]
      },
      {
        num: '06',
        title: {
          en: '6. Cookies & Local Storage Technologies',
          'zh-TW': '6. Cookie 與本地儲存（Local Storage）技術',
          'zh-CN': '6. Cookie 与本地存储（Local Storage）技术'
        },
        text: {
          en: 'We use browser Local Storage and minimal session tokens to ensure smooth classroom operations:',
          'zh-TW': '我們透過瀏覽器本地儲存（Local Storage）與 Session Tokens 維持課堂系統流暢運行：',
          'zh-CN': '我们通过浏览器本地存储（Local Storage）与 Session Tokens 维持课堂系统流畅运行：'
        },
        items: [
          {
            en: 'pc_id: Stores the device terminal identifier on classroom computers for quick pairing with instructor slides.',
            'zh-TW': 'pc_id：於教室電腦儲存終端機序號，以便與主控端課件進行免重複手動登入之智慧配對。',
            'zh-CN': 'pc_id：于教室电脑存储终端机序号，以便与主控端课件进行免重复手动登录的智慧配对。'
          },
          {
            en: 'token: Secure JWT session authentication token to maintain login status.',
            'zh-TW': 'token：保存安全的 JWT 身份認證金鑰，以維持您的安全登入工作階段。',
            'zh-CN': 'token：保存安全的 JWT 身份认证密钥，以维持您的安全登录会话。'
          },
          {
            en: 'language_preference: Remembers your selected language preference (English, Traditional Chinese, Simplified Chinese).',
            'zh-TW': 'language_preference：記錄您的多語系偏好設定（英文、繁體中文、簡體中文）。',
            'zh-CN': 'language_preference：记录您的多语言偏好设置（英文、繁体中文、简体中文）。'
          }
        ]
      },
      {
        num: '07',
        title: {
          en: '7. Your Rights & Data Management',
          'zh-TW': '7. 用戶權利與資料管理',
          'zh-CN': '7. 用户权利与数据管理'
        },
        text: {
          en: 'You have the right to access, update, or request deletion of your personal information at any time:',
          'zh-TW': '您依法享有查詢、更新或請求刪除您個人資料的權利：',
          'zh-CN': '您依法享有查询、更新或请求删除您个人资料的权利：'
        },
        items: [
          {
            en: 'Access & Rectification: You can update your password and profile directly in the Settings page or request a copy of your records.',
            'zh-TW': '查閱與更正權：您可隨時透過「系統設定」頁面修改密碼與個人資料，亦可向我們申請個人資料備份。',
            'zh-CN': '查阅与更正权：您可随时通过“系统设置”页面修改密码与个人资料，亦可向我们申请个人数据备份。'
          },
          {
            en: 'Data Deletion & Account Closure: You may contact support@interlectic.com to request permanent deletion of your account and associated learning records.',
            'zh-TW': '刪除與註銷權：您可透過 support@interlectic.com 申請註銷帳號並永久抹除相關之個人儲存資訊。',
            'zh-CN': '删除与注销权：您可通过 support@interlectic.com 申请注销账号并永久抹除相关的个人存储信息。'
          }
        ]
      },
      {
        num: '08',
        title: {
          en: '8. Policy Updates & Contact Information',
          'zh-TW': '8. 政策更新與聯絡管道',
          'zh-CN': '8. 政策更新与联系渠道'
        },
        text: {
          en: 'We may update this Privacy Policy from time to time to reflect technological or regulatory advancements. Major changes will be announced on our website. For privacy inquiries or requests, please contact our Data Protection Officer at privacy@interlectic.com or support@interlectic.com.',
          'zh-TW': '我們可能因應技術更新或法律規範變更而不定期更新本政策。重大調整將於網站首頁進行公告。如對隱私條款有任何疑問，歡迎聯絡個人資料保護小組：privacy@interlectic.com 或 support@interlectic.com。',
          'zh-CN': '我们可能因应技术更新或法律规范变更而不定期更新本政策。重大调整将于网站首页进行公告。如对隐私条款有任何疑问，欢迎联系个人信息保护小组：privacy@interlectic.com 或 support@interlectic.com。'
        }
      }
    ]
  };

  const getLocalized = (obj: any) => {
    if (!obj) return '';
    return obj[language] || obj['en'] || '';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--background)', position: 'relative' }}>
      <div className="bg-blob bg-blob-1" style={{ opacity: 0.2 }} />
      <div className="bg-blob bg-blob-2" style={{ opacity: 0.15, top: '35%', right: '-100px' }} />

      {/* Top Navigation */}
      <header className="glass-panel" style={{ margin: '24px auto 0', width: '90%', maxWidth: '1200px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 32px', zIndex: 100 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <img src="/edusphere.png" alt="Interlectic Logo" style={{ height: '36px', objectFit: 'contain' }} />
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', letterSpacing: '-0.5px' }}>
            Interlectic
          </h2>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.95rem', transition: 'color 0.2s' }}>
            ← Back to Home
          </Link>
          <LanguageToggle />
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ maxWidth: '1000px', margin: '40px auto 80px', padding: '0 24px', flex: 1, zIndex: 10, width: '100%' }}>
        
        {/* Title Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }} className="animate-fade-in-up">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '20px', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid var(--secondary)', color: 'var(--secondary)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '20px' }}>
            {getLocalized(content.badge)}
          </div>
          <h1 style={{ fontSize: '3.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '16px', letterSpacing: '-1px' }}>
            {getLocalized(content.title)}
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '720px', margin: '0 auto 12px', lineHeight: 1.6 }}>
            {getLocalized(content.subtitle)}
          </p>
          <div style={{ color: '#64748b', fontSize: '0.9rem' }}>
            {getLocalized(content.lastUpdated)}
          </div>
        </div>

        {/* Highlight Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '48px' }}>
          {content.summaryCards.map((card, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '24px', borderTop: '4px solid var(--secondary)' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
                {getLocalized(card.title)}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                {getLocalized(card.desc)}
              </p>
            </div>
          ))}
        </div>

        {/* Detailed Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {content.sections.map((section, idx) => (
            <section key={idx} className="glass-panel" style={{ padding: '36px', borderRadius: '16px' }}>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                {getLocalized(section.title)}
              </h2>
              <p style={{ color: 'var(--text-main)', fontSize: '1.02rem', lineHeight: 1.7, marginBottom: section.items ? '16px' : '0' }}>
                {getLocalized(section.text)}
              </p>
              {section.items && (
                <ul style={{ listStyleType: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.6, background: 'rgba(255,255,255,0.02)', padding: '12px 16px', borderRadius: '8px', borderLeft: '3px solid rgba(16, 185, 129, 0.4)' }}>
                      <span style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>•</span>
                      <span>{getLocalized(item)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* Security & Inquiries Banner */}
        <div className="glass-panel" style={{ marginTop: '48px', padding: '36px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(56, 189, 248, 0.1))', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '12px', color: '#fff' }}>
            {language === 'zh-TW' ? '對個人隱私或資訊安全有任何疑問？' : language === 'zh-CN' ? '对个人隐私或信息安全有任何疑问？' : 'Questions regarding privacy or data protection?'}
          </h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '1rem' }}>
            {language === 'zh-TW' ? '歡迎聯絡我們的個資保護小組，我們將竭誠為您說明。' : language === 'zh-CN' ? '欢迎联系我们的个人信息保护小组，我们将竭诚为您解答。' : 'Feel free to contact our data protection team anytime.'}
          </p>
          <a href="mailto:privacy@interlectic.com" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex' }}>
            Contact Privacy Team
          </a>
        </div>

      </main>

      <Footer />
    </div>
  );
}
