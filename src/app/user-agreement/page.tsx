"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import Footer from '@/components/Footer';

export default function UserAgreementPage() {
  const { language } = useLanguage();

  const content = {
    title: {
      en: 'User Service & Platform Registration Agreement',
      'zh-TW': '用戶服務與平台註冊協議（服務條款）',
      'zh-CN': '用户服务与平台注册协议（服务条款）'
    },
    subtitle: {
      en: 'Please read these Terms of Service carefully before creating an account or using the Interlectic platform.',
      'zh-TW': '在註冊帳號或使用 Interlectic 平台各項功能前，請務必詳閱本服務協議之各項條款。',
      'zh-CN': '在注册账号或使用 Interlectic 平台各项功能前，请务必详阅本服务协议的各项条款。'
    },
    lastUpdated: {
      en: 'Last updated: August 2026',
      'zh-TW': '最後更新日期：2026 年 8 月',
      'zh-CN': '最后更新日期：2026 年 8 月'
    },
    badge: {
      en: 'Legal Agreement',
      'zh-TW': '法定服務協議',
      'zh-CN': '法定服务协议'
    },
    entityInfo: {
      en: 'Operating Entity: Zhuhai Andexing Trading Co., Ltd. (USCC: 91440402MA56UATA95)',
      'zh-TW': '運營實體：珠海安得興貿易有限公司（統一社會信用代碼：91440402MA56UATA95）',
      'zh-CN': '运营实体：珠海安得兴贸易有限公司（统一社会信用代码：91440402MA56UATA95）'
    },
    summaryCards: [
      {
        title: {
          en: 'Mandatory Consent',
          'zh-TW': '註冊確認約束',
          'zh-CN': '注册确认约束'
        },
        desc: {
          en: 'Ticking the agreement checkbox during registration constitutes a legally binding contract.',
          'zh-TW': '於註冊頁面勾選同意並完成註冊即視為簽署具法律約束力之服務契約。',
          'zh-CN': '于注册页面勾选同意并完成注册即视为签署具法律约束力的服务契约。'
        }
      },
      {
        title: {
          en: 'Fair Use & Quotas',
          'zh-TW': '資源與配額規範',
          'zh-CN': '资源与配额规范'
        },
        desc: {
          en: 'Clear quotas on student seats, interactive slides, and 13-month course lifecycles.',
          'zh-TW': '明確規範學生席位授權、互動簡報存儲及 13 個月課程生命週期。',
          'zh-CN': '明确规范学生席位授权、互动课件存储及 13 个月课程生命周期。'
        }
      },
      {
        title: {
          en: 'Integrated Policies',
          'zh-TW': '條款相互參照',
          'zh-CN': '条款相互参照'
        },
        desc: {
          en: 'Includes full cross-references with our Privacy Policy and Refund & Cancellation Policy.',
          'zh-TW': '本協議與《隱私政策》及《退款與取消政策》具備同等法律效力並一體適用。',
          'zh-CN': '本协议与《隐私政策》及《退款与取消政策》具备同等法律效力并一体适用。'
        }
      }
    ],
    sections: [
      {
        num: '01',
        title: {
          en: '1. Contracting Parties & Scope of Application',
          'zh-TW': '1. 簽約主體與協議適用範圍',
          'zh-CN': '1. 签约主体与协议适用范围'
        },
        text: {
          en: 'This User Service & Platform Registration Agreement ("Agreement") is entered into between you ("User", "Educator", or "Learner") and Zhuhai Andexing Trading Co., Ltd. (珠海安得興貿易有限公司, USCC: 91440402MA56UATA95), the operator of Interlectic. By checking the consent box during registration, browsing the website, or purchasing tokens/courses, you expressly acknowledge and agree to be bound by this Agreement.',
          'zh-TW': '本《用戶服務與平台註冊協議》（以下簡稱「本協議」）係由您（以下稱「用戶」、「教師」或「學生」）與 Interlectic 平台之運營主體「珠海安得興貿易有限公司」（統一社會信用代碼：91440402MA56UATA95）共同締結。當您於註冊程序中勾選同意方框、訪問本平台或購買代幣及課程時，即表示您已完全知悉並承諾遵守本協議所有內容。',
          'zh-CN': '本《用户服务与平台注册协议》（以下简称“本协议”）系由您（以下称“用户”、“教师”或“学生”）与 Interlectic 平台的运营主体“珠海安得兴贸易有限公司”（统一社会信用代码：91440402MA56UATA95）共同缔结。当您于注册程序中勾选同意方框、访问本平台或购买代币及课程时，即表示您已完全知晓并承诺遵守本协议所有内容。'
        }
      },
      {
        num: '02',
        title: {
          en: '2. Account Registration, Credentials & Single Session Security',
          'zh-TW': '2. 帳號註冊、驗證與單一登入安全規範',
          'zh-CN': '2. 账号注册、验证与单一登录安全规范'
        },
        text: {
          en: 'Users must register with accurate, verifiable information (e.g. email or mobile number). The platform enforces single active session token verification to protect instructional materials and student telemetry. Sharing account credentials across multiple concurrent educators or unauthorized third parties is strictly prohibited.',
          'zh-TW': '用戶註冊時應提供真實、完整之驗證資訊（如電子郵件或手機號碼）。為維護課堂資料與學生遙測隱私，本系統採用單一有效會話令牌機制。嚴禁將個人帳號密碼出借、轉讓或由多名未授權第三方同時登入使用。',
          'zh-CN': '用户注册时应提供真实、完整的验证信息（如电子邮件或手机号码）。为维护课堂数据与学生遥测隐私，本系统采用单一有效会话令牌机制。严禁将个人账号密码出借、转让或由多名未授权第三方同时登录使用。'
        }
      },
      {
        num: '03',
        title: {
          en: '3. Fees, Token Purchases & Refund Policy Cross-Reference',
          'zh-TW': '3. 平台收費、代幣機制與退款政策約束',
          'zh-CN': '3. 平台收费、代币机制与退款政策约束'
        },
        text: {
          en: 'Interlectic provides free tier quotas alongside token-based course licenses and seat authorizations. All purchases, payment settlements, and refund claims are strictly governed by our standalone Refund & Cancellation Policy, which forms an inseparable and integral part of this User Agreement.',
          'zh-TW': 'Interlectic 平台提供基礎免費教研配額及基於代幣（Tokens）之課程解鎖與學生席位授權服務。所有儲值購買、支付結算及退款申請，均一體嚴格適用本平台之《退款與取消政策》，該政策為本用戶協議不可分割之重要組成部分。',
          'zh-CN': 'Interlectic 平台提供基础免费教研配额及基于代币（Tokens）的课程解锁与学生席位授权服务。所有充值购买、支付结算及退款申请，均一体严格适用本平台的《退款与取消政策》，该政策为本用户协议不可分割的重要组成部分。'
        },
        linkText: {
          en: 'View full Refund & Cancellation Policy →',
          'zh-TW': '閱讀完整《退款與取消政策》細則 →',
          'zh-CN': '阅读完整《退款与取消政策》细则 →'
        },
        linkHref: '/refund-policy'
      },
      {
        num: '04',
        title: {
          en: '4. Intellectual Property & Course Content Rights',
          'zh-TW': '4. 智慧財產權歸屬與原創教研成果保障',
          'zh-CN': '4. 知识产权归属与原创教研成果保障'
        },
        text: {
          en: 'Educators retain full intellectual property ownership of their custom instructional slides and teaching materials. By publishing courses to the Interlectic Marketplace, educators grant the platform a non-exclusive license to host, render, and distribute materials to authorized enrolled students.',
          'zh-TW': '教師用戶為其自行上傳、編撰之原創課堂簡報與教學講義保留完整之智慧財產權。當教師將課程發布至 Interlectic 市場時，即授權平台於授權範圍內進行雲端託管、渲染呈現並分發予已付費之註冊學生。',
          'zh-CN': '教师用户为其自行上传、编撰的原创课堂课件与教学讲义保留完整的知识产权。当教师将课程发布至 Interlectic 市场时，即授权平台于授权范围内进行云端托管、渲染呈现并分发予已付费的注册学生。'
        }
      },
      {
        num: '05',
        title: {
          en: '5. Privacy, Telemetry Data & Student Protection',
          'zh-TW': '5. 學生隱私保護與課堂遙測數據合規',
          'zh-CN': '5. 学生隐私保护与课堂遥测数据合规'
        },
        text: {
          en: 'We collect minimal telemetry data (e.g. active slide index, latency, device ID) strictly for realtime multi-touch synchronization. User personal data is handled in strict compliance with our Privacy Policy and relevant personal information protection regulations.',
          'zh-TW': '本系統僅收集最小必要之即時課堂遙測數據（如即時頁碼、連線延遲、實體 PC_ID），專供多點觸控同步課堂運作之用。所有個人資料之處理均嚴格遵循《隱私政策》及相關個人資料保護法規。',
          'zh-CN': '本系统仅收集最小必要的实时课堂遥测数据（如实时页码、连接延迟、实体 PC_ID），专供多点触控同步课堂运作之用。所有个人信息的处理均严格遵循《隐私政策》及相关个人信息保护法规。'
        },
        linkText: {
          en: 'View full Privacy Policy →',
          'zh-TW': '閱讀完整《隱私政策》細則 →',
          'zh-CN': '阅读完整《隐私政策》细则 →'
        },
        linkHref: '/privacy-policy'
      },
      {
        num: '06',
        title: {
          en: '6. Governing Law & Dispute Resolution',
          'zh-TW': '6. 準據法管轄與爭議處理解決',
          'zh-CN': '6. 准据法管辖与争议处理解决'
        },
        text: {
          en: 'This Agreement shall be governed by and construed in accordance with applicable laws. In the event of any dispute arising out of or relating to this Agreement, the parties shall first resolve the matter through friendly negotiation; failing which, the dispute shall be submitted to the competent court in the registered jurisdiction of Zhuhai Andexing Trading Co., Ltd.',
          'zh-TW': '本協議之成立、生效、履行與爭議解決均適用相關法律規範。因本協議所生之任何爭議，雙方應先行友好協商解決；協商不成時，任何一方均應提交「珠海安得興貿易有限公司」註冊地有管轄權之人民法院管轄審理。',
          'zh-CN': '本协议的成立、生效、履行与争议解决均适用相关法律规范。因本协议所产生的任何争议，双方应先行友好协商解决；协商不成时，任何一方均应提交“珠海安得兴贸易有限公司”注册地有管辖权的人民法院管辖审理。'
        }
      }
    ]
  };

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#f5f5f7', fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', 'Inter', sans-serif" }}>
      {/* Header */}
      <header style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', background: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: '#fff', fontWeight: 600, fontSize: '1.1rem' }}>
            <img src="/edusphere.png" alt="Interlectic Logo" style={{ height: '32px', width: 'auto' }} />
            <span>Interlectic</span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <LanguageToggle />
            <Link href="/dashboard" style={{ padding: '6px 14px', borderRadius: '980px', background: 'rgba(255, 255, 255, 0.1)', color: '#fff', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 500 }}>
              {language === 'en' ? 'Dashboard' : (language === 'zh-TW' ? '進入控制台' : '进入控制台')}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 24px 100px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 14px', borderRadius: '980px', background: 'rgba(41, 151, 255, 0.12)', border: '1px solid rgba(41, 151, 255, 0.3)', color: '#2997ff', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '16px' }}>
            {content.badge[language]}
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#f5f5f7', margin: '0 0 16px', lineHeight: 1.2 }}>
            {content.title[language]}
          </h1>
          <p style={{ color: '#86868b', fontSize: '1.15rem', maxWidth: '680px', margin: '0 auto 16px', lineHeight: 1.5 }}>
            {content.subtitle[language]}
          </p>
          <div style={{ fontSize: '0.85rem', color: '#a1a1a6', padding: '6px 16px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.04)', display: 'inline-block', border: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '8px' }}>
            {content.entityInfo[language]}
          </div>
          <div style={{ fontSize: '0.82rem', color: '#6e6e73' }}>
            {content.lastUpdated[language]}
          </div>
        </div>

        {/* Summary Highlights */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '56px' }}>
          {content.summaryCards.map((card, idx) => (
            <div key={idx} style={{ background: '#161617', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '18px', padding: '24px', boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.06)' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#f5f5f7', margin: '0 0 8px' }}>
                {card.title[language]}
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#86868b', lineHeight: 1.45, margin: 0 }}>
                {card.desc[language]}
              </p>
            </div>
          ))}
        </div>

        {/* Main Clauses */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {content.sections.map((sec, idx) => (
            <div key={idx} style={{ background: '#161617', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '20px', padding: '32px', boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2997ff', padding: '3px 8px', borderRadius: '6px', background: 'rgba(41, 151, 255, 0.12)' }}>
                  {sec.num}
                </span>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#f5f5f7', margin: 0, letterSpacing: '-0.02em' }}>
                  {sec.title[language]}
                </h2>
              </div>
              <p style={{ fontSize: '0.96rem', color: '#a1a1a6', lineHeight: 1.65, margin: 0 }}>
                {sec.text[language]}
              </p>
              {sec.linkText && sec.linkHref && (
                <div style={{ marginTop: '16px' }}>
                  <Link href={sec.linkHref} style={{ color: '#2997ff', fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none' }}>
                    {sec.linkText[language]}
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
