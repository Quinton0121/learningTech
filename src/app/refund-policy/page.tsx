"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import Footer from '@/components/Footer';

export default function RefundPolicyPage() {
  const { language } = useLanguage();

  const content = {
    title: {
      en: 'Refund & Cancellation Policy',
      'zh-TW': '退款與取消政策',
      'zh-CN': '退款与取消政策'
    },
    subtitle: {
      en: 'Learn about our refund eligibility, digital asset conditions, token balance rules, and request process.',
      'zh-TW': '了解我們的退款資格條件、數位資產使用規範、代幣餘額處理準則及退款申請流程。',
      'zh-CN': '了解我们的退款资格条件、数字资产使用规范、代币余额处理准则及退款申请流程。'
    },
    lastUpdated: {
      en: 'Last updated: August 2026',
      'zh-TW': '最後更新日期：2026 年 8 月',
      'zh-CN': '最后更新日期：2026 年 8 月'
    },
    badge: {
      en: 'Official Policy',
      'zh-TW': '官方政策規範',
      'zh-CN': '官方政策规范'
    },
    summaryCards: [
      {
        title: {
          en: '7-Day Review Period',
          'zh-TW': '7 天審閱期保障',
          'zh-CN': '7 天审阅期保障'
        },
        desc: {
          en: 'Standard digital course orders qualify for evaluation if unused or below the access threshold.',
          'zh-TW': '未開啟或學習進度低於門檻之標準數位課程，享有 7 天內申請評估權益。',
          'zh-CN': '未开启或学习进度低于门槛的标准数字课程，享有 7 天内申请评估权益。'
        }
      },
      {
        title: {
          en: 'Transparent Review',
          'zh-TW': '透明審核機制',
          'zh-CN': '透明审核机制'
        },
        desc: {
          en: 'Requests are reviewed within 3-5 business days with direct status updates.',
          'zh-TW': '所有退款申請均於 3 至 5 個工作天內完成查驗並通知處理結果。',
          'zh-CN': '所有退款申请均于 3 至 5 个工作日内完成查验并通知处理结果。'
        }
      }
    ],
    sections: [
      {
        num: '01',
        title: {
          en: '1. Overview, User Agreement & Applicability',
          'zh-TW': '1. 適用範圍、用戶協議約束與政策總則',
          'zh-CN': '1. 适用范围、用户协议约束与政策总则'
        },
        text: {
          en: 'This Refund & Cancellation Policy forms an integral part of the Interlectic User Service & Platform Registration Agreement. It applies to all purchases made on the Interlectic platform (operated by Zhuhai Andexing Trading Co., Ltd.), including digital courses, student seat licenses, platform token packs, educator subscriptions, and custom curriculum development services. By checking the agreement box during registration or completing a transaction, you acknowledge and agree to these terms.',
          'zh-TW': '本《退款與取消政策》為 Interlectic《用戶服務與平台註冊協議》不可分割之重要組成部分。本政策適用於在 Interlectic 平台（運營主體：珠海安得興貿易有限公司）進行之所有交易行為，包含數位課件、學生席位授權、平台代幣包、教師訂閱服務以及客製化課程開發等。當您於註冊時勾選同意條款或完成任何購買儲值程序時，即代表您已充分閱讀並同意遵守本政策之所有約定。',
          'zh-CN': '本《退款与取消政策》为 Interlectic《用户服务与平台注册协议》不可分割的重要组成部分。本政策适用于在 Interlectic 平台（运营主体：珠海安得兴贸易有限公司）进行的所有交易行为，包含数字课件、学生席位授权、平台代币包、教师订阅服务以及定制课程开发等。当您于注册时勾选同意条款或完成任何购买充值程序时，即代表您已充分阅读并同意遵守本政策的所有约定。'
        }
      },
      {
        num: '02',
        title: {
          en: '2. Token Purchases & Balance Refunds',
          'zh-TW': '2. 平台代幣與儲值退款規範',
          'zh-CN': '2. 平台代币与充值退款规范'
        },
        text: {
          en: 'Platform tokens are virtual units used to unlock courses, license seats, and custom tools:',
          'zh-TW': '平台代幣（Tokens）為用於解鎖課件、購置學生授權及使用進階教研工具之數位點數：',
          'zh-CN': '平台代币（Tokens）为用于解锁课件、购置学生授权及使用进阶教研工具的数字点数：'
        },
        items: [
          {
            en: 'Unused Token Packs: If a purchased token pack has not been used (0 tokens spent), you may request a 100% refund within 14 calendar days of purchase.',
            'zh-TW': '完全未使用之代幣包：自購買日起 14 個日曆天內，若該筆代幣完全未使用（消耗額為 0），可申請 100% 全額退款。',
            'zh-CN': '完全未使用之代币包：自购买日起 14 个日历天内，若该笔代币完全未使用（消耗额为 0），可申请 100% 全额退款。'
          },
          {
            en: 'Partially Consumed Tokens: Token packs that have been partially spent cannot be refunded, except where mandated by local consumer protection statutes in Macau or the purchase jurisdiction.',
            'zh-TW': '已部分消耗之代幣：若代幣包已被部分使用，剩餘代幣原則上不可單獨折現退還，惟澳門或交易所在地法律另有強制規定者除外。',
            'zh-CN': '已部分消耗之代币：若代币包已被部分使用，剩余代币原则上不可单独折现退还，惟澳门或交易所在地法律另有强制规定者除外。'
          },
          {
            en: 'Bonus / Promotional Tokens: Any complimentary, promotional, or bonus tokens granted through marketing activities or system promotions carry no monetary value and are strictly non-refundable.',
            'zh-TW': '活動贈送代幣：所有因行銷推廣、推薦獎勵或系統活動所獲贈之免費代幣，均無實體貨幣價值，不予退款或兌現。',
            'zh-CN': '活动赠送代币：所有因营销推广、推荐奖励或系统活动所获赠的免费代币，均无实体货币价值，不予退款或兑现。'
          }
        ]
      },
      {
        num: '03',
        title: {
          en: '3. Digital Courses & Courseware License Refunds',
          'zh-TW': '3. 數位課程與課件授權退款條件',
          'zh-CN': '3. 数字课程与课件授权退款条件'
        },
        text: {
          en: 'Due to the immediate delivery nature of digital educational assets, refunds for courseware and student licenses are governed by the following criteria:',
          'zh-TW': '鑑於數位教學軟體及雲端課件具有即時交付之特性，課程購買與授權之退款遵循以下標準：',
          'zh-CN': '鉴于数字教学软件及云端课件具有即时交付的特性，课程购买与授权的退款遵循以下标准：'
        },
        items: [
          {
            en: 'Eligibility Window: Refund requests must be submitted within 7 calendar days of the course purchase date.',
            'zh-TW': '申請時效：退款申請必須於課程購買完成日起 7 個日曆天內正式提出。',
            'zh-CN': '申请时效：退款申请必须于课程购买完成日起 7 个日历天内正式提出。'
          },
          {
            en: 'Usage Limitation: The course must have been accessed for less than 15% of total interactive slides/modules, and no offline teaching kits or bundled resources have been downloaded.',
            'zh-TW': '進度限制：課件互動模組開啟與瀏覽比例須低於總內容之 15%，且尚未下載配套之離線教案或專用課件包。',
            'zh-CN': '进度限制：课件互动模块开启与浏览比例须低于总内容的 15%，且尚未下载配套的离线教案或专用课件包。'
          },
          {
            en: 'Student Seat Packages: If you purchased student seat licenses in bulk, unassigned and inactivated seats may be refunded on a pro-rata basis within 14 days.',
            'zh-TW': '批量學生席位：若購買多席位學生授權，自購買日起 14 天內，完全未指派且未啟動之席位可按比例申請退還代幣或原款項。',
            'zh-CN': '批量学生席位：若购买多席位学生授权，自购买日起 14 天内，完全未指派且未启动的席位可按比例申请退还代币或原款项。'
          }
        ]
      },
      {
        num: '04',
        title: {
          en: '4. Custom Course Orders & Tailored Development',
          'zh-TW': '4. 訂製課程與客製化開發專案',
          'zh-CN': '4. 定制课程与个性化开发项目'
        },
        text: {
          en: 'For customized instructional materials, school-tailored interactive templates, and private curriculum development:',
          'zh-TW': '針對學校或教育機構委託之客製化課件、專屬互動教材及客製程式開發：',
          'zh-CN': '针对学校或教育机构委托的客制化课件、专属互动教材及定制程序开发：'
        },
        items: [
          {
            en: 'Pre-Development Phase: A full refund minus a 5% administrative fee is available if the project is cancelled before our engineering and instructional design teams commence production.',
            'zh-TW': '開發前階段：若於工程與教材設計團隊正式啟動製作前提出取消，可申請退款，惟須扣除 5% 行政與金流手續費。',
            'zh-CN': '开发前阶段：若于工程与教材设计团队正式启动制作前提出取消，可申请退款，惟须扣除 5% 行政与金流手续费。'
          },
          {
            en: 'Post-Commencement Phase: Once custom prototype development or scripting has begun, milestone payments correspond to completed deliverables and are non-refundable.',
            'zh-TW': '開發中階段：專案一旦進入原型設計或程式編寫階段，已完成里程碑之相應款項概不予退還。',
            'zh-CN': '开发中阶段：项目一旦进入原型设计或程序编写阶段，已完成里程碑的相应款项概不予退还。'
          }
        ]
      },
      {
        num: '05',
        title: {
          en: '5. Non-Refundable Circumstances',
          'zh-TW': '5. 不予退款之特殊情形',
          'zh-CN': '5. 不予退款的特殊情形'
        },
        text: {
          en: 'Refunds will NOT be granted under any of the following circumstances:',
          'zh-TW': '在下列任何一種情況下，Interlectic 平台將無法受理退款請求：',
          'zh-CN': '在下列任何一种情况下，Interlectic 平台将无法受理退款请求：'
        },
        items: [
          {
            en: 'The refund request was submitted after the expiration of the eligible review window.',
            'zh-TW': '超過本政策規定之 7 天或 14 天退款申請期限者。',
            'zh-CN': '超过本政策规定的 7 天或 14 天退款申请期限者。'
          },
          {
            en: 'The account has violated our Community Guidelines, Acceptable Use Policy, or is found sharing unauthorized access/pirating course materials.',
            'zh-TW': '用戶帳號違反平台使用條款、涉及轉售、外洩或盜版課件智慧財產權者。',
            'zh-CN': '用户账号违反平台使用条款、涉及转售、外泄或盗版课件知识产权者。'
          },
          {
            en: 'Technical issues arising solely from user-end equipment failure, incompatible third-party browser extensions, or unstable local network environments.',
            'zh-TW': '純粹因用戶端個人硬體設備老化、不相容瀏覽器外掛或用戶本地網路不穩定導致之播放障礙。',
            'zh-CN': '纯粹因用户端个人硬件设备老化、不兼容浏览器插件或用户本地网络不稳定导致的播放障碍。'
          }
        ]
      },
      {
        num: '06',
        title: {
          en: '6. How to Submit a Refund Request',
          'zh-TW': '6. 退款申請方式與審核流程',
          'zh-CN': '6. 退款申请方式与审核流程'
        },
        text: {
          en: 'To initiate a refund, please follow these steps:',
          'zh-TW': '如需提出退款申請，請依下列程序進行：',
          'zh-CN': '如需提出退款申请，请依下列程序进行：'
        },
        items: [
          {
            en: '1. Send an email to support@interlectic.com with the subject "Refund Request - [Your Order / Account Email]".',
            'zh-TW': '1. 請發送電子郵件至 support@interlectic.com，郵件主旨註明「退款申請 - [您的訂單編號 / 帳號電郵]」。',
            'zh-CN': '1. 请发送电子邮件至 support@interlectic.com，邮件主旨注明“退款申请 - [您的订单编号 / 账号邮箱]”。'
          },
          {
            en: '2. Include your registered email address, transaction date, course or token package name, and a clear reason for the request.',
            'zh-TW': '2. 內文請附上註冊電郵、購買日期、品項名稱（如代幣包名稱或課程標題）及退款原因說明。',
            'zh-CN': '2. 内文请附上注册邮箱、购买日期、品项名称（如代币包名称或课程标题）及退款原因说明。'
          },
          {
            en: '3. Our support team will review your account activity and respond within 3 to 5 business days.',
            'zh-TW': '3. 我們的客戶支援團隊將核對學習與代幣紀錄，並於 3 至 5 個工作天內回覆審核結果。',
            'zh-CN': '3. 我们的客户支持团队将核对学习与代币记录，并于 3 至 5 个工作日内回复审核结果。'
          },
          {
            en: '4. Approved refunds will be credited back to your original payment method (or as platform tokens, upon your choice) within 5 to 10 banking days depending on your payment provider.',
            'zh-TW': '4. 經核准之退款將於 5 至 10 個銀行工作天內原路刷退至您的付款卡片或退回平台代幣（依您指定之方式）。',
            'zh-CN': '4. 经核准的退款将于 5 至 10 个银行工作日内原路退回至您的付款卡片或退回平台代币（依您指定的方式）。'
          }
        ]
      },
      {
        num: '07',
        title: {
          en: '7. Policy Amendments & Contact Info',
          'zh-TW': '7. 政策修訂與聯絡資訊',
          'zh-CN': '7. 政策修订与联系信息'
        },
        text: {
          en: 'Interlectic reserves the right to modify or update this Refund Policy at any time to reflect operational, legal, or regulatory changes. Continued use of the platform after updates indicates acceptance of the revised policy. If you have questions regarding this policy, please reach out to support@interlectic.com.',
          'zh-TW': 'Interlectic 保留因應業務調整或法規變更而隨時修改本政策之權利。修訂後的條款發布於本頁面即刻生效。如您對退款或取消條款有任何疑問，歡迎隨時透過 support@interlectic.com 與我們聯絡。',
          'zh-CN': 'Interlectic 保留因应业务调整或法规变更而随时修改本政策的权利。修订后的条款发布于本页面即刻生效。如您对退款或取消条款有任何疑问，欢迎随时通过 support@interlectic.com 与我们联系。'
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
      <div className="bg-blob bg-blob-2" style={{ opacity: 0.15, top: '40%', right: '-100px' }} />

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
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '20px', background: 'rgba(56, 189, 248, 0.12)', border: '1px solid var(--primary)', color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '20px' }}>
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
            <div key={idx} className="glass-panel" style={{ padding: '24px', borderTop: '4px solid var(--primary)' }}>
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
                    <li key={itemIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.6, background: 'rgba(255,255,255,0.02)', padding: '12px 16px', borderRadius: '8px', borderLeft: '3px solid rgba(56, 189, 248, 0.4)' }}>
                      <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>•</span>
                      <span>{getLocalized(item)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* Contact Support Banner */}
        <div className="glass-panel" style={{ marginTop: '48px', padding: '36px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.1), rgba(16, 185, 129, 0.1))', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '12px', color: '#fff' }}>
            {language === 'zh-TW' ? '仍有退款或訂單疑問？' : language === 'zh-CN' ? '仍有退款或订单疑问？' : 'Have questions about refunds?'}
          </h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '1rem' }}>
            {language === 'zh-TW' ? '我們的專屬客服團隊將隨時為您提供協助與指引。' : language === 'zh-CN' ? '我们的专属客服团队将随时为您提供协助与指引。' : 'Our support team is ready to assist you with order inquiries and policy questions.'}
          </p>
          <a href="mailto:support@interlectic.com" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex' }}>
            Contact Support
          </a>
        </div>

      </main>

      <Footer />
    </div>
  );
}
