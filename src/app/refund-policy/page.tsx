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
      en: 'Learn about our 24-hour review eligibility, digital asset conditions, token balance rules, and request process.',
      'zh-TW': '了解我們的 24 小時審閱資格條件、數位資產使用規範、代幣餘額處理準則及退款申請流程。',
      'zh-CN': '了解我们的 24 小时审阅资格条件、数字资产使用规范、代币余额处理准则及退款申请流程。'
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
          en: '24-Hour Review Window',
          'zh-TW': '24 小時審閱期保障',
          'zh-CN': '24 小时审阅期保障'
        },
        desc: {
          en: 'Digital courseware and unconsumed token packs qualify for evaluation and cancellation within 24 hours of purchase.',
          'zh-TW': '購買後 24 小時內未開啟或未經消耗之數位課件與代幣，享有申請撤銷與退款評估權益。',
          'zh-CN': '购买后 24 小时内未开启或未经消耗的数字课件与代币，享有申请撤销与退款评估权益。'
        }
      },
      {
        title: {
          en: 'Unconsumed Tokens',
          'zh-TW': '未消耗代幣保障',
          'zh-CN': '未消耗代币保障'
        },
        desc: {
          en: 'Unused platform tokens requested within 24 hours are eligible for 100% direct refund.',
          'zh-TW': '24 小時內購買且完全未經消耗（0 消耗）之平台代幣，享有 100% 全額退款保障。',
          'zh-CN': '24 小时内购买且完全未经消耗（0 消耗）的平台代币，享有 100% 全额退款保障。'
        }
      },
      {
        title: {
          en: 'Transparent Review',
          'zh-TW': '快速審核機制',
          'zh-CN': '快速审核机制'
        },
        desc: {
          en: 'Requests are audited within 24-48 business hours with direct status updates.',
          'zh-TW': '所有退款申請均於 24 至 48 小時內完成查驗並即時通知處理結果。',
          'zh-CN': '所有退款申请均于 24 至 48 小时内完成查验并实时通知处理结果。'
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
          en: '2. Token Purchases & Balance Refunds (24-Hour Rule)',
          'zh-TW': '2. 平台代幣與儲值退款規範（24 小時準則）',
          'zh-CN': '2. 平台代币与充值退款规范（24 小时准则）'
        },
        text: {
          en: 'Platform tokens are virtual units used to unlock courses, license seats, and custom tools:',
          'zh-TW': '平台代幣（Tokens）為用於解鎖課件、購置學生授權及使用進階教研工具之數位點數：',
          'zh-CN': '平台代币（Tokens）为用于解锁课件、购置学生授权及使用进阶教研工具的数字点数：'
        },
        items: [
          {
            en: 'Unused Token Packs: If a purchased token pack has not been used (0 tokens spent), you may request a 100% refund within 24 hours of purchase.',
            'zh-TW': '完全未使用之代幣包：自購買完成起 24 小時內，若該筆代幣完全未使用（消耗額為 0），可申請 100% 全額退款。',
            'zh-CN': '完全未使用之代币包：自购买完成起 24 小时内，若该笔代币完全未使用（消耗额为 0），可申请 100% 全额退款。'
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
          en: '3. Digital Courses & Courseware License Refunds (24-Hour Review)',
          'zh-TW': '3. 數位課程與課件授權退款條件（24 小時審閱）',
          'zh-CN': '3. 数字课程与课件授权退款条件（24 小时审阅）'
        },
        text: {
          en: 'Due to the immediate delivery nature of digital educational assets, refunds for courseware and student licenses are governed by the following criteria:',
          'zh-TW': '鑑於數位教學軟體及雲端課件具有即時交付之特性，課程購買與授權之退款遵循以下標準：',
          'zh-CN': '鉴于数字教学软件及云端课件具有即时交付的特性，课程购买与授权的退款遵循以下标准：'
        },
        items: [
          {
            en: 'Eligibility Window: Refund requests must be submitted within 24 hours of the course purchase timestamp.',
            'zh-TW': '申請時效：退款申請必須於課程購買完成時間戳記起 24 小時內正式提出。',
            'zh-CN': '申请时效：退款申请必须于课程购买完成时间戳记起 24 小时内正式提出。'
          },
          {
            en: 'Usage Limitation: The course must have been accessed for less than 15% of total interactive slides/modules, and no offline teaching kits or bundled resources have been downloaded.',
            'zh-TW': '進度限制：課件互動模組開啟與瀏覽比例須低於總內容之 15%，且尚未下載配套之離線教案或專用課件包。',
            'zh-CN': '进度限制：课件互动模块开启与浏览比例须低于总内容的 15%，且尚未下载配套的离线教案或专用课件包。'
          },
          {
            en: 'Student Seat Packages: If you purchased student seat licenses in bulk, unassigned and inactivated seats may be refunded within 24 hours of purchase.',
            'zh-TW': '批量學生席位：若購買多席位學生授權，自購買日起 24 小時內，完全未指派且未啟動之席位可申請退還代幣或原款項。',
            'zh-CN': '批量学生席位：若购买多席位学生授权，自购买日起 24 小时内，完全未指派且未启动的席位可申请退还代币或原款项。'
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
            en: 'Pre-Development Phase: A full refund minus a 5% administrative fee is available if cancelled within 24 hours and before our engineering and design teams commence production.',
            'zh-TW': '開發前階段：若於 24 小時內且工程與教材設計團隊正式啟動製作前提出取消，可申請退款，惟須扣除 5% 行政與金流手續費。',
            'zh-CN': '开发前阶段：若于 24 小时内且工程与教材设计团队正式启动制作前提出取消，可申请退款，惟须扣除 5% 行政与金流手续费。'
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
            en: 'The refund request was submitted after the expiration of the 24-hour review window.',
            'zh-TW': '超過本政策規定之 24 小時審閱退款申請時限者。',
            'zh-CN': '超过本政策规定的 24 小时审阅退款申请时限者。'
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
            en: '1. Contact our official support team at support@interlectic.com within 24 hours of transaction completion.',
            'zh-TW': '1. 於交易完成後 24 小時內，寄信至官方客服信箱 support@interlectic.com。',
            'zh-CN': '1. 于交易完成后 24 小时内，发信至官方客服邮箱 support@interlectic.com。'
          },
          {
            en: '2. Include your registered account email, Order/Transaction ID, purchased item name, and specific reason for the request.',
            'zh-TW': '2. 信件中請提供您的註冊帳號、訂單/交易編號、所購項目名稱及具體退款事由。',
            'zh-CN': '2. 邮件中请提供您的注册账号、订单/交易编号、所购项目名称及具体退款事由。'
          },
          {
            en: '3. Our billing verification department will review usage telemetry and respond within 24-48 business hours.',
            'zh-TW': '3. 財務審核部門將核對後台課件連線日誌，並於 24 至 48 小時內回覆審核結論。',
            'zh-CN': '3. 财务审核部门将核对后台课件连接日志，并于 24 至 48 小时内回复审核结论。'
          },
          {
            en: '4. Approved refunds will be credited back via the original payment method or returned as platform tokens within 5-7 business days.',
            'zh-TW': '4. 審核通過之退款將於 5 至 7 個工作天內依原支付路徑（或折返平台代幣）退回。',
            'zh-CN': '4. 审核通过的退款将于 5 至 7 个工作日内依原支付路径（或折返平台代币）退回。'
          }
        ]
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

        {/* Policy Sections */}
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
              <p style={{ fontSize: '0.96rem', color: '#a1a1a6', lineHeight: 1.65, margin: '0 0 16px' }}>
                {sec.text[language]}
              </p>
              {sec.items && (
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {sec.items.map((item, itemIdx) => (
                    <li key={itemIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.92rem', color: '#86868b', lineHeight: 1.5 }}>
                      <span style={{ color: '#2997ff', fontWeight: 'bold' }}>•</span>
                      <span>{item[language]}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div style={{ textAlign: 'center', marginTop: '60px', padding: '40px', background: 'radial-gradient(ellipse at center, rgba(41, 151, 255, 0.1) 0%, rgba(0,0,0,0) 70%)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '24px' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#f5f5f7', margin: '0 0 10px' }}>
            {language === 'en' ? 'Need Help with a Billing Inquiry?' : (language === 'zh-TW' ? '需要退款或帳務協助？' : '需要退款或账务协助？')}
          </h3>
          <p style={{ color: '#86868b', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto 24px' }}>
            {language === 'en' 
              ? 'Our finance and customer protection team is available to assist you within 24-48 business hours.' 
              : (language === 'zh-TW' ? '我們的財務與客戶權益保護團隊將於 24 至 48 小時內為您提供專業解答。' : '我们的财务与客户权益保护团队将于 24 至 48 小时内为您提供专业解答。')}
          </p>
          <a href="mailto:support@interlectic.com" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', borderRadius: '980px', background: '#2997ff', color: '#fff', fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none', transition: 'all 0.2s' }}>
            <span>support@interlectic.com</span>
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
