import React from 'react';

// =========================================================================
// 1. Interactive Whiteboard & Classroom Display Brands (Authentic Vectors)
// =========================================================================

export function BenQLogo({ height = 24 }: { height?: number }) {
  // Official BenQ Wordmark with iconic typography and signature BenQ purple dot
  return (
    <svg height={height} viewBox="0 0 110 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      {/* 'B' */}
      <path d="M4 4H15C18.5 4 21 5.8 21 8.5C21 10.2 19.8 11.6 18.2 12.2C20.5 13 22 14.6 22 17.2C22 20.6 19.2 23 15 23H4V4ZM9.5 11.2H14.5C15.8 11.2 16.5 10.4 16.5 9.2C16.5 8.2 15.8 7.5 14.5 7.5H9.5V11.2ZM9.5 19.5H14.8C16.2 19.5 17.2 18.6 17.2 17.2C17.2 16 16.2 15 14.8 15H9.5V19.5Z" fill="#A855F7" />
      {/* 'e' */}
      <path d="M26 13.5C26 8.5 29.5 5 34.5 5C39.2 5 42.5 8.5 42.5 13.8V14.8H31C31.2 17.5 33 19.2 35.5 19.2C37.2 19.2 38.5 18.4 39.2 17.2L42 19C40.5 21.5 38 23 34.8 23C29.8 23 26 18.8 26 13.5ZM37.2 11.5C36.8 9.5 35.5 8.2 34 8.2C32.2 8.2 31.2 9.5 31 11.5H37.2Z" fill="#A855F7" />
      {/* 'n' */}
      <path d="M47 5.5H52V8.2C53.2 6.2 55.5 5 58.5 5C63 5 66 7.8 66 12.8V23H60.5V13.8C60.5 11 59 9.5 56.8 9.5C54.2 9.5 52.2 11.2 52.2 14.2V23H47V5.5Z" fill="#A855F7" />
      {/* 'Q' */}
      <path d="M70 13.5C70 7.8 74.8 3.5 81.5 3.5C88.2 3.5 93 7.8 93 13.5C93 16.5 91.5 19.2 89.2 21L93.5 25.2L89.8 27.2L86 23.2C84.5 23.8 82.8 24 81.2 24C74.8 24 70 19.2 70 13.5ZM87.5 13.5C87.5 10 84.8 7.5 81.2 7.5C77.5 7.5 75 10 75 13.5C75 17 77.5 19.5 81.2 19.5C84.8 19.5 87.5 17 87.5 13.5Z" fill="#F5F5F7" />
      {/* Signature BenQ Purple Accent Dot */}
      <circle cx="101" cy="7" r="4.5" fill="#A855F7" />
    </svg>
  );
}

export function MaxhubLogo({ height = 24 }: { height?: number }) {
  // Official MAXHUB Logo: Clean, modern, high-end geometric all-caps wordmark
  return (
    <svg height={height} viewBox="0 0 120 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <g fill="#F5F5F7" transform="translate(2, 4)">
        {/* M */}
        <path d="M0 20V0H4.2L9.5 11.5L14.8 0H19V20H15.2V7.8L10.8 16.8H8.2L3.8 7.8V20H0Z" />
        {/* A */}
        <path d="M26 0H31L37.5 20H33L31.2 15H25.8L24 20H19.5L26 0ZM27 11.5H30L28.5 5.5L27 11.5Z" />
        {/* X */}
        <path d="M39 0H43.5L48 7.5L52.5 0H57L50.5 10L57.5 20H53L48 12.5L43 20H38.5L45.5 10L39 0Z" />
        {/* H */}
        <path d="M60 0H64.2V8.5H72.8V0H77V20H72.8V12.2H64.2V20H60V0Z" />
        {/* U */}
        <path d="M80 0H84.2V13C84.2 15.8 85.8 17 88.5 17C91.2 17 92.8 15.8 92.8 13V0H97V13C97 17.8 93.8 20.2 88.5 20.2C83.2 20.2 80 17.8 80 13V0Z" />
        {/* B */}
        <path d="M100 0H107.5C110.8 0 113 1.8 113 4.5C113 6.2 111.8 7.5 110.5 8.2C112.2 9 113.5 10.5 113.5 13C113.5 16.2 110.8 20 107 20H100V0ZM104.2 7.8H107C108.2 7.8 109 7 109 6C109 5 108.2 4 107 4H104.2V7.8ZM104.2 16.2H107.2C108.5 16.2 109.5 15.2 109.5 14C109.5 12.8 108.5 12 107.2 12H104.2V16.2Z" />
      </g>
    </svg>
  );
}

export function SeewoLogo({ height = 24 }: { height?: number }) {
  // Official seewo Logo: English wordmark with green leaf accent on the 'w'
  return (
    <svg height={height} viewBox="0 0 105 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      {/* 'seewo' in Seewo Cyan-Blue with Green V accent */}
      <g transform="translate(2, 4)">
        {/* s */}
        <path d="M2.5 15C4 16.5 6 17.2 8.5 17.2C11.5 17.2 13.5 15.8 13.5 13.5C13.5 10.8 9.8 10.2 7.5 9.5C4.5 8.5 3.2 7.2 3.2 5C3.2 2.5 5.5 0.5 8.5 0.5C11 0.5 13 1.5 14.2 3L11.8 5.2C10.8 4.2 9.8 3.5 8.5 3.5C7 3.5 6 4.2 6 5.2C6 6.8 9 7.2 11.5 8.2C14.8 9.2 16.2 11 16.2 13.5C16.2 17 13 19.5 8.5 19.5C5 19.5 2 18 0.5 15.8L2.5 15Z" fill="#0084FF" />
        {/* e */}
        <path d="M19 10C19 5.2 22.5 1.5 27.5 1.5C32.2 1.5 35.5 5.2 35.5 10.5V11.5H23C23.2 14.2 25.2 16 28 16C29.8 16 31.2 15.2 32 14.2L34.5 15.8C33 18 30.5 19.5 27.5 19.5C22.2 19.5 19 15.5 19 10ZM31.5 8.8C31 7 29.5 5 27.5 5C25.5 5 24 7 23.5 8.8H31.5Z" fill="#0084FF" />
        {/* e */}
        <path d="M38 10C38 5.2 41.5 1.5 46.5 1.5C51.2 1.5 54.5 5.2 54.5 10.5V11.5H42C42.2 14.2 44.2 16 47 16C48.8 16 50.2 15.2 51 14.2L53.5 15.8C52 18 49.5 19.5 46.5 19.5C41.2 19.5 38 15.5 38 10ZM50.5 8.8C50 7 48.5 5 46.5 5C44.5 5 43 7 42.5 8.8H50.5Z" fill="#0084FF" />
        {/* w - First V (Blue) */}
        <path d="M57 2H61L64 12L67 2H70L66 18H62L57 2Z" fill="#0084FF" />
        {/* w - Second V (Official Seewo Green Accent #52C41A) */}
        <path d="M66.5 2H70.5L73.5 12L76.5 2H79.5L75.5 18H71.5L66.5 2Z" fill="#52C41A" />
        {/* o */}
        <path d="M82 10.5C82 5.2 86 1.5 91 1.5C96 1.5 100 5.2 100 10.5C100 15.8 96 19.5 91 19.5C86 19.5 82 15.8 82 10.5ZM96 10.5C96 7 93.8 4.8 91 4.8C88.2 4.8 86 7 86 10.5C86 14 88.2 16.2 91 16.2C93.8 16.2 96 14 96 10.5Z" fill="#0084FF" />
      </g>
    </svg>
  );
}

export function NewlineLogo({ height = 24 }: { height?: number }) {
  // Official Newline Interactive Wordmark: Clean lowercase 'newline' in Newline Blue (#0084D6)
  return (
    <svg height={height} viewBox="0 0 115 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <g fill="#0084D6" transform="translate(2, 5)">
        {/* n */}
        <path d="M2 3.5H6.2V6.2C7.5 4.2 9.8 3 12.5 3C16.8 3 19.5 5.5 19.5 10.5V19H15.2V11.2C15.2 8.5 13.8 7.2 11.5 7.2C9.2 7.2 7.5 8.8 6.5 11.2V19H2V3.5Z" />
        {/* e */}
        <path d="M22.5 11.2C22.5 6 25.8 3 30.8 3C35.5 3 38.5 6.2 38.5 11.5V12.5H26.8C27 15 28.8 16.5 31.2 16.5C33 16.5 34.2 15.8 35 14.8L37.8 16.2C36.2 18.5 33.8 19.8 30.8 19.8C25.5 19.8 22.5 16 22.5 11.2ZM34.5 9.8C34.2 8 33 6.8 31 6.8C29 6.8 27.5 8 27.2 9.8H34.5Z" />
        {/* w */}
        <path d="M40.5 3.5H44.8L47.5 13L50.5 3.5H54.2L57.2 13L60 3.5H64.2L59.5 19H55.5L52.5 9.5L49.5 19H45.5L40.5 3.5Z" />
        {/* l */}
        <path d="M67 0H71.2V19H67V0Z" />
        {/* i */}
        <path d="M74.5 4.5H78.8V19H74.5V4.5Z" />
        <circle cx="76.6" cy="1.2" r="1.8" fill="#0084D6" />
        {/* n */}
        <path d="M82 4.5H86.2V7.2C87.5 5.2 89.8 4 92.5 4C96.8 4 99.5 6.5 99.5 11.5V19H95.2V12.2C95.2 9.5 93.8 8.2 91.5 8.2C89.2 8.2 87.5 9.8 86.5 12.2V19H82V4.5Z" />
        {/* e */}
        <path d="M102 12.2C102 7 105.2 4 110.2 4C115 4 118 7.2 118 12.5V13.5H106.2C106.5 16 108.2 17.5 110.8 17.5C112.5 17.5 113.8 16.8 114.5 15.8L117.2 17.2C115.8 19.5 113.2 20.8 110.2 20.8C105 20.8 102 17 102 12.2ZM114 10.8C113.8 9 112.5 7.8 110.5 7.8C108.5 7.8 107 9 106.8 10.8H114Z" />
      </g>
    </svg>
  );
}

export function PrometheanLogo({ height = 24 }: { height?: number }) {
  // Official Promethean Multi-Layer Flame Torch + Wordmark
  return (
    <svg height={height} viewBox="0 0 145 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      {/* Promethean Flame Emblem */}
      <g transform="translate(2, 2)">
        <path d="M12 2C7.5 6.5 3 11 3 16C3 21 7 25 12 25C17 25 21 21 21 16C21 11 16.5 6.5 12 2Z" fill="#F26522" />
        <path d="M12 7C9.5 10 6 13 6 16.8C6 20.2 8.8 23 12.2 23C15.8 23 18.5 20.2 18.5 16.8C18.5 13 15 10 12 7Z" fill="#FFC20E" />
        <path d="M12 12C10.5 14 8.5 16 8.5 18.5C8.5 20.5 10.2 22 12.2 22C14.2 22 15.8 20.5 15.8 18.5C15.8 16 13.5 14 12 12Z" fill="#ED1C24" />
      </g>
      {/* 'Promethean' Wordmark */}
      <g fill="#F5F5F7" transform="translate(28, 6)">
        {/* P */}
        <path d="M2 16V0H8C11.5 0 13.5 1.8 13.5 5C13.5 8.2 11.5 10 8 10H5V16H2ZM5 7.2H7.8C9.5 7.2 10.5 6.2 10.5 5C10.5 3.8 9.5 2.8 7.8 2.8H5V7.2Z" />
        {/* r */}
        <path d="M15 16V4.8H18V7.5C18.8 5.5 20.5 4.8 22.5 4.8V7.8C20.2 7.8 18.5 9.2 18.5 11.8V16H15Z" />
        {/* o */}
        <path d="M23 10.5C23 6 26 3.8 30 3.8C34 3.8 37 6 37 10.5C37 15 34 17.2 30 17.2C26 17.2 23 15 23 10.5ZM33.8 10.5C33.8 7.5 32 6.2 30 6.2C28 6.2 26.2 7.5 26.2 10.5C26.2 13.5 28 14.8 30 14.8C32 14.8 33.8 13.5 33.8 10.5Z" />
        {/* m */}
        <path d="M39 16V4.8H42V7C42.8 5.2 44.5 4.2 46.5 4.2C48.2 4.2 49.8 5.2 50.5 7C51.5 5.2 53.2 4.2 55.2 4.2C58.2 4.2 60 6 60 9.5V16H57V10C57 7.8 55.8 6.8 54.2 6.8C52.5 6.8 51 8.2 51 10.5V16H48V10C48 7.8 46.8 6.8 45.2 6.8C43.5 6.8 42 8.2 42 10.5V16H39Z" />
        {/* e */}
        <path d="M62 10.5C62 6.2 65 4 69 4C73 4 75.5 6.5 75.5 11V11.8H65.2C65.5 13.8 67 15 69.2 15C70.8 15 72 14.2 72.5 13.5L75 14.8C73.8 16.5 71.8 17.5 69.2 17.5C64.8 17.5 62 14.8 62 10.5ZM72.2 9.5C72 7.8 70.8 6.2 69 6.2C67 6.2 65.8 7.8 65.5 9.5H72.2Z" />
        {/* t */}
        <path d="M78 1.8H81V4.8H84V7.2H81V13C81 14 81.5 14.5 82.8 14.5C83.2 14.5 83.8 14.2 84.2 13.8L84.8 16C83.8 16.8 82.8 17 81.8 17C79.5 17 78 15.5 78 13V7.2H76V4.8H78V1.8Z" />
        {/* h */}
        <path d="M86 0H89V7C89.8 5.2 91.5 4.2 93.8 4.2C96.8 4.2 98.8 6 98.8 9.5V16H95.8V10C95.8 7.8 94.5 6.8 92.8 6.8C91 6.8 89.5 8.2 89.5 10.5V16H86V0Z" />
        {/* e */}
        <path d="M101 10.5C101 6.2 104 4 108 4C112 4 114.5 6.5 114.5 11V11.8H104.2C104.5 13.8 106 15 108.2 15C109.8 15 111 14.2 111.5 13.5L114 14.8C112.8 16.5 110.8 17.5 108.2 17.5C103.8 17.5 101 14.8 101 10.5ZM111.2 9.5C111 7.8 109.8 6.2 108 6.2C106 6.2 104.8 7.8 104.5 9.5H111.2Z" />
        {/* a */}
        <path d="M116 10.8C116 7 119 4.5 123 4.5C125 4.5 126.8 5.5 127.5 6.8V4.8H130.5V16H127.5V14.5C126.8 15.8 125 17 123 17C119 17 116 14.5 116 10.8ZM127.5 10.8C127.5 8.2 125.8 6.8 123.5 6.8C121.2 6.8 119.5 8.2 119.5 10.8C119.5 13.2 121.2 14.8 123.5 14.8C125.8 14.8 127.5 13.2 127.5 10.8Z" />
        {/* n */}
        <path d="M133 4.8H136V7C136.8 5.2 138.5 4.2 140.8 4.2C143.8 4.2 145.8 6 145.8 9.5V16H142.8V10C142.8 7.8 141.5 6.8 139.8 6.8C138 6.8 136.5 8.2 136.5 10.5V16H133V4.8Z" />
      </g>
    </svg>
  );
}

export function SmartBoardLogo({ height = 24 }: { height?: number }) {
  // Official SMART Technologies Logo: Cyan square + SMART wordmark
  return (
    <svg height={height} viewBox="0 0 115 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <rect x="2" y="2" width="24" height="24" rx="6" fill="#00A3E0" />
      <path d="M10 17C11 18 12.5 18.8 14.2 18.8C16.2 18.8 17.5 17.8 17.5 16.2C17.5 14.2 15 13.8 13.2 13.2C11 12.5 10.2 11.5 10.2 10C10.2 8 12 6.5 14.2 6.5C16 6.5 17.5 7.2 18.5 8.5L16.8 10C16.2 9.2 15.2 8.8 14.2 8.8C13.2 8.8 12.5 9.2 12.5 10C12.5 11 14.5 11.5 16.5 12C18.8 12.8 19.8 14 19.8 16C19.8 18.5 17.5 20.5 14.2 20.5C12 20.5 10 19.5 9 18.2L10 17Z" fill="#FFFFFF" />
      <g fill="#F5F5F7" transform="translate(32, 5)">
        {/* S */}
        <path d="M1.5 14.2C2.8 15.5 4.8 16.5 7.2 16.5C10.2 16.5 12.2 14.8 12.2 12.5C12.2 9.8 8.8 9.2 6.5 8.5C4 7.8 3 6.8 3 5C3 3 5 1.5 7.5 1.5C9.8 1.5 11.5 2.5 12.8 3.8L10.8 5.8C9.8 4.8 8.8 4 7.5 4C6 4 5.2 4.8 5.2 5.8C5.2 7 7.5 7.5 10 8.2C12.8 9.2 14.5 10.5 14.5 13C14.5 16 11.8 18.8 7.2 18.8C4.5 18.8 2 17.5 0.5 15.8L1.5 14.2Z" />
        {/* M */}
        <path d="M16.5 18V2H21L25 10.5L29 2H33.5V18H29.8V7.5L26.2 15H23.8L20.2 7.5V18H16.5Z" />
        {/* A */}
        <path d="M38.5 2H43L49 18H44.8L43.2 13.8H38.2L36.8 18H32.5L38.5 2ZM39.2 10.5H42.5L40.8 5.2L39.2 10.5Z" />
        {/* R */}
        <path d="M51 2H57C60.5 2 62.8 3.8 62.8 7C62.8 9.2 61.2 10.8 59.2 11.5L63.5 18H59L55.2 12.2H54.5V18H51V2ZM54.5 9.5H56.8C58.2 9.5 59.2 8.8 59.2 7C59.2 5.5 58.2 4.8 56.8 4.8H54.5V9.5Z" />
        {/* T */}
        <path d="M64 2H75V5H71.2V18H67.8V5H64V2Z" />
      </g>
    </svg>
  );
}

export function ViewSonicLogo({ height = 24 }: { height?: number }) {
  // Official ViewSonic Logo: 3 Gouldian Finch Birds on Branch + Serif ViewSonic Wordmark
  return (
    <svg height={height} viewBox="0 0 140 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      {/* Branch */}
      <path d="M2 20C10 19.5 22 20.5 32 21.5" stroke="#8D6E63" strokeWidth="2.5" strokeLinecap="round" />
      {/* Bird 1 (Left - Red Head Gouldian Finch) */}
      <g transform="translate(4, 5)">
        <path d="M4 8C4 5 6.5 2.5 9 3.5C11 4.5 11 8 9 10C7 11.5 4 11 4 8Z" fill="#ED1C24" />
        <path d="M7 8C7 12 3 14 1 15C4 16 8 15 9 12" fill="#00A651" />
        <path d="M6 10C8 11 9 13 8 15C5 15 4 13 6 10Z" fill="#6A1B9A" />
        <path d="M7 13C8 14 7 16 5 16.5C4 16.5 4 15 7 13Z" fill="#FFF200" />
        <circle cx="8" cy="5.5" r="0.8" fill="#000000" />
        <polygon points="10,4.5 13,5.5 10,6.5" fill="#FFFFFF" />
      </g>
      {/* Bird 2 (Center - Blue/Black Gouldian Finch) */}
      <g transform="translate(13, 3)">
        <path d="M4 8C4 5 6.5 2.5 9 3.5C11 4.5 11 8 9 10C7 11.5 4 11 4 8Z" fill="#1A1A1A" />
        <path d="M7 8C7 12 3 14 1 15C4 16 8 15 9 12" fill="#00A651" />
        <path d="M6 10C8 11 9 13 8 15C5 15 4 13 6 10Z" fill="#0054A6" />
        <path d="M7 13C8 14 7 16 5 16.5C4 16.5 4 15 7 13Z" fill="#FFF200" />
        <circle cx="8" cy="5.5" r="0.8" fill="#FFFFFF" />
        <polygon points="10,4.5 13,5.5 10,6.5" fill="#ED1C24" />
      </g>
      {/* Bird 3 (Right - Yellow/Orange Gouldian Finch) */}
      <g transform="translate(22, 5)">
        <path d="M4 8C4 5 6.5 2.5 9 3.5C11 4.5 11 8 9 10C7 11.5 4 11 4 8Z" fill="#F7941D" />
        <path d="M7 8C7 12 3 14 1 15C4 16 8 15 9 12" fill="#00A651" />
        <path d="M6 10C8 11 9 13 8 15C5 15 4 13 6 10Z" fill="#6A1B9A" />
        <path d="M7 13C8 14 7 16 5 16.5C4 16.5 4 15 7 13Z" fill="#FFF200" />
        <circle cx="8" cy="5.5" r="0.8" fill="#000000" />
        <polygon points="10,4.5 13,5.5 10,6.5" fill="#FFFFFF" />
      </g>
      {/* ViewSonic Classic Wordmark */}
      <g fill="#F5F5F7" transform="translate(38, 6)">
        {/* V */}
        <path d="M1 2H4L7.5 13.5L11 2H14L9 16H6L1 2Z" />
        {/* i */}
        <path d="M16 5.5H18.5V16H16V5.5Z" />
        <circle cx="17.2" cy="2.5" r="1.3" fill="#F5F5F7" />
        {/* e */}
        <path d="M21 10.8C21 7.5 23 5.5 26 5.5C29 5.5 31 7.5 31 11V11.5H23.2C23.5 13.5 24.8 14.5 26.5 14.5C27.5 14.5 28.5 14 29 13.2L30.8 14.5C29.8 15.8 28.2 16.5 26.5 16.5C23 16.5 21 14.2 21 10.8ZM28.5 9.8C28.2 8.2 27.2 7.2 26 7.2C24.8 7.2 23.8 8.2 23.5 9.8H28.5Z" />
        {/* w */}
        <path d="M33 5.5H35.8L37.8 12.5L40 5.5H42.2L44.5 12.5L46.5 5.5H49.2L46.2 16H43.8L41.2 8.5L38.8 16H36.2L33 5.5Z" />
        {/* S */}
        <path d="M52 14.2C53 15.2 54.5 16.2 56.5 16.2C58.8 16.2 60.2 14.8 60.2 13C60.2 10.8 57.5 10.2 55.5 9.5C53.5 8.8 52.8 8 52.8 6.5C52.8 4.8 54.5 3.5 56.5 3.5C58.2 3.5 59.8 4.2 60.8 5.5L59 7C58.2 6.2 57.5 5.5 56.5 5.5C55.5 5.5 54.8 6.2 54.8 7C54.8 8 56.8 8.5 58.8 9.2C61 10 62.5 11.2 62.5 13.2C62.5 15.8 60.2 18 56.5 18C54.2 18 52.2 17 50.8 15.5L52 14.2Z" />
        {/* o */}
        <path d="M64 11C64 7.8 66.2 5.5 69.5 5.5C72.8 5.5 75 7.8 75 11C75 14.2 72.8 16.5 69.5 16.5C66.2 16.5 64 14.2 64 11ZM72.5 11C72.5 8.8 71.2 7.5 69.5 7.5C67.8 7.5 66.5 8.8 66.5 11C66.5 13.2 67.8 14.5 69.5 14.5C71.2 14.5 72.5 13.2 72.5 11Z" />
        {/* n */}
        <path d="M78 5.5H80.5V7.5C81.2 6.2 82.8 5.5 84.5 5.5C87.2 5.5 89 7.2 89 10.5V16H86.5V11C86.5 9.2 85.5 8 83.8 8C82.2 8 81 9.2 80.5 11V16H78V5.5Z" />
        {/* i */}
        <path d="M92 5.5H94.5V16H92V5.5Z" />
        <circle cx="93.2" cy="2.5" r="1.3" fill="#F5F5F7" />
        {/* c */}
        <path d="M97 11C97 7.8 99.2 5.5 102.5 5.5C104.2 5.5 105.8 6.5 106.5 7.8L104.5 9.2C104 8.5 103.2 7.8 102.5 7.8C100.8 7.8 99.5 9.2 99.5 11C99.5 12.8 100.8 14.2 102.5 14.2C103.5 14.2 104.2 13.5 104.8 12.8L106.8 14.2C105.8 15.5 104.2 16.5 102.5 16.5C99.2 16.5 97 14.2 97 11Z" />
      </g>
    </svg>
  );
}

export function HuaweiLogo({ height = 24 }: { height?: number }) {
  return (
    <svg height={height} viewBox="0 0 115 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <g transform="translate(12, 14) scale(0.65)">
        <ellipse cx="0" cy="-12" rx="3" ry="7" fill="#EF4444" />
        <ellipse cx="8" cy="-8" rx="3" ry="7" transform="rotate(45, 8, -8)" fill="#EF4444" />
        <ellipse cx="-8" cy="-8" rx="3" ry="7" transform="rotate(-45, -8, -8)" fill="#EF4444" />
        <ellipse cx="12" cy="0" rx="3" ry="7" transform="rotate(90, 12, 0)" fill="#EF4444" />
        <ellipse cx="-12" cy="0" rx="3" ry="7" transform="rotate(-90, -12, 0)" fill="#EF4444" />
      </g>
      <text x="28" y="20" fontFamily="'Arial Black', 'Helvetica Black', sans-serif" fontWeight="900" fontSize="15" fill="#F5F5F7" letterSpacing="1">
        HUAWEI
      </text>
    </svg>
  );
}

export function SamsungLogo({ height = 24 }: { height?: number }) {
  // Official Samsung Blue Ellipse & SΛMSUNG Wordmark
  return (
    <svg height={height} viewBox="0 0 115 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      {/* Samsung Oval */}
      <ellipse cx="57.5" cy="14" rx="55" ry="13" transform="rotate(-6, 57.5, 14)" fill="#1428A0" />
      {/* SAMSUNG Typography (Signature 'A' without crossbar) */}
      <g fill="#FFFFFF" transform="translate(12, 7.5)">
        {/* S */}
        <path d="M1.5 9.8C2.5 10.8 4 11.5 5.8 11.5C7.8 11.5 9 10.5 9 9C9 7.2 6.5 6.8 4.8 6.2C2.8 5.8 1.8 4.8 1.8 3.5C1.8 1.8 3.5 0.5 5.8 0.5C7.5 0.5 9 1.2 9.8 2.2L8.2 3.8C7.5 3 6.8 2.5 5.8 2.5C4.8 2.5 4 3 4 3.8C4 4.5 5.5 5 7.2 5.5C9.2 6.2 11 7.2 11 9.2C11 11.8 8.8 13.5 5.8 13.5C3.5 13.5 1.5 12.5 0.2 11L1.5 9.8Z" />
        {/* A (No horizontal crossbar) */}
        <path d="M16 0.8H18.8L23.8 13H20.8L19.8 10H15.2L14.2 13H11.2L16 0.8ZM16 7.5H19L17.5 3.2L16 7.5Z" />
        {/* M */}
        <path d="M25 13V0.8H28.2L31 7.8L33.8 0.8H37V13H34.5V4.8L32 10.5H30L27.5 4.8V13H25Z" />
        {/* S */}
        <path d="M39.5 9.8C40.5 10.8 42 11.5 43.8 11.5C45.8 11.5 47 10.5 47 9C47 7.2 44.5 6.8 42.8 6.2C40.8 5.8 39.8 4.8 39.8 3.5C39.8 1.8 41.5 0.5 43.8 0.5C45.5 0.5 47 1.2 47.8 2.2L46.2 3.8C45.5 3 44.8 2.5 43.8 2.5C42.8 2.5 42 3 42 3.8C42 4.5 43.5 5 45.2 5.5C47.2 6.2 49 7.2 49 9.2C49 11.8 46.8 13.5 43.8 13.5C41.5 13.5 39.5 12.5 38.2 11L39.5 9.8Z" />
        {/* U */}
        <path d="M51 0.8H53.5V8.5C53.5 10.2 54.5 11.2 56 11.2C57.5 11.2 58.5 10.2 58.5 8.5V0.8H61V8.5C61 11.5 59 13.2 56 13.2C53 13.2 51 11.5 51 8.5V0.8Z" />
        {/* N */}
        <path d="M63.5 0.8H66.2L70.5 8.5V0.8H73V13H70.5L66 5V13H63.5V0.8Z" />
        {/* G */}
        <path d="M75.5 6.8C75.5 3 78 0.5 81.5 0.5C84.5 0.5 86.8 2.5 87.2 5.2L84.5 5.8C84.2 4 83 2.8 81.5 2.8C79.5 2.8 78.2 4.5 78.2 6.8C78.2 9.2 79.5 11 81.5 11C83 11 84.2 10 84.5 8.8H81.5V6.8H87.2V12.2C85.8 13.2 83.8 13.5 81.5 13.5C78 13.5 75.5 10.8 75.5 6.8Z" />
      </g>
    </svg>
  );
}

// =========================================================================
// 2. OS & Multi-Platform Vector Logos
// =========================================================================

export function AppleLogo({ height = 24, fill = '#F5F5F7' }: { height?: number; fill?: string }) {
  return (
    <svg height={height} viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.54c.66-.8 1.11-1.92.99-3.04-1 .04-2.19.67-2.88 1.47-.6.69-1.13 1.8-0.99 2.89 1.13.09 2.22-.52 2.88-1.32z"/>
    </svg>
  );
}

export function AndroidLogo({ height = 24 }: { height?: number }) {
  return (
    <svg height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993.0001.5511-.4483.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.996-3.4572c.1104-.1913.0449-.436-.1464-.5464-.1914-.1104-.436-.0449-.5464.1465l-2.0231 3.5041C15.544 8.218 13.834 7.785 12 7.785c-1.834 0-3.544.433-5.1676 1.1834L4.8093 5.4644c-.1104-.1914-.355-.2569-.5464-.1465-.1913.1104-.2568.3551-.1464.5464l1.996 3.4572C2.688 11.233.375 14.869.375 19.083h23.25c0-4.214-2.313-7.85-5.7445-9.7616" fill="#3DDC84"/>
    </svg>
  );
}

export function WindowsLogo({ height = 24 }: { height?: number }) {
  return (
    <svg height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.8" fill="#00A4EF"/>
    </svg>
  );
}

export function ChromeOSLogo({ height = 24 }: { height?: number }) {
  return (
    <svg height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <circle cx="12" cy="12" r="5" fill="#FFFFFF"/>
      <circle cx="12" cy="12" r="4" fill="#4285F4"/>
      <path d="M12 2C16.42 2 20.17 4.88 21.46 8.87L12 8.87C10.26 8.87 8.87 10.26 8.87 12H4.07C4.66 6.36 9.4 2 12 2Z" fill="#EA4335"/>
      <path d="M21.46 8.87C21.81 9.85 22 10.9 22 12C22 17.52 17.52 22 12 22L16.2 14.73C16.71 13.84 17 12.82 17 11.73C17 10.7 16.69 9.72 16.17 8.87H21.46Z" fill="#FBBC05"/>
      <path d="M12 22C7.58 22 3.83 19.12 2.54 15.13H11.93C13.67 15.13 15.06 13.74 15.06 12L12 6.7C12.16 6.7 12.33 6.7 12.5 6.7C14.71 6.7 16.5 8.49 16.5 10.7C16.5 12.91 14.71 14.7 12.5 14.7H7.8C8.39 18.64 11.8 22 12 22Z" fill="#34A853"/>
    </svg>
  );
}
