import React from 'react';

// ==========================================
// 1. Interactive Whiteboard & Display Brands
// ==========================================

export function BenQLogo({ height = 24 }: { height?: number }) {
  // Official BenQ Wordmark with iconic typography and signature BenQ purple dot
  return (
    <svg height={height} viewBox="0 0 110 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      {/* 'B' */}
      <path d="M6 5.5H16.5C19.8 5.5 22 7.2 22 9.8C22 11.5 20.8 12.8 19.2 13.4C21.4 14.1 22.8 15.6 22.8 18C22.8 21.2 20.2 23.5 16.2 23.5H6V5.5ZM11.2 12.6H15.8C16.8 12.6 17.5 11.9 17.5 10.9C17.5 9.9 16.8 9.2 15.8 9.2H11.2V12.6ZM11.2 19.8H16.2C17.4 19.8 18.2 19 18.2 17.9C18.2 16.8 17.4 16 16.2 16H11.2V19.8Z" fill="#541477" />
      {/* 'e' */}
      <path d="M26 14.5C26 9.8 29.5 6.5 34.2 6.5C38.8 6.5 42 9.8 42 14.8V15.8H30.8C31.1 18.5 32.8 20 35.2 20C36.8 20 38.1 19.2 38.8 18.2L41.5 19.8C40.2 22 38 23.5 35 23.5C30 23.5 26 19.8 26 14.5ZM37.2 12.6C36.8 10.6 35.5 9.6 34 9.6C32.4 9.6 31.2 10.6 30.9 12.6H37.2Z" fill="#541477" />
      {/* 'n' */}
      <path d="M46.5 7H51.2V9.8C52.4 7.8 54.6 6.5 57.5 6.5C61.8 6.5 64.5 9.2 64.5 14V23.5H59.5V14.8C59.5 12.2 58.2 10.8 56 10.8C53.5 10.8 51.5 12.5 51.5 15.2V23.5H46.5V7Z" fill="#541477" />
      {/* 'Q' */}
      <path d="M68 14.5C68 8.8 72.8 4.2 79.2 4.2C85.6 4.2 90.5 8.8 90.5 14.5C90.5 17.2 89.2 19.8 87.2 21.5L91.2 25.5L88 27.5L84.2 23.8C82.8 24.5 81 24.8 79.2 24.8C72.8 24.8 68 20.2 68 14.5ZM85.5 14.5C85.5 11.2 82.8 8.8 79.2 8.8C75.6 8.8 73 11.2 73 14.5C73 17.8 75.6 20.2 79.2 20.2C82.8 20.2 85.5 17.8 85.5 14.5Z" fill="#F5F5F7" />
      {/* Signature BenQ Purple Dot */}
      <circle cx="97.5" cy="8" r="4.5" fill="#A855F7" />
    </svg>
  );
}

export function MaxhubLogo({ height = 24 }: { height?: number }) {
  // Official MAXHUB Logo: Red geometric M-badge + Bold MAXHUB logotype
  return (
    <svg height={height} viewBox="0 0 135 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      {/* MAXHUB Red Chevron/M Icon */}
      <g transform="translate(2, 4)">
        <rect width="24" height="24" rx="5" fill="#E60012" />
        <path d="M5 19L9.5 8.5L12 13.8L14.5 8.5L19 19H15.8L13.8 14L12 17.5L10.2 14L8.2 19H5Z" fill="#FFFFFF" />
      </g>
      {/* MAXHUB Typography */}
      <g fill="#F5F5F7" transform="translate(32, 6)">
        {/* M */}
        <path d="M2 18V2H6.2L10 10.5L13.8 2H18V18H14.5V7.5L11.2 14.8H8.8L5.5 7.5V18H2Z" />
        {/* A */}
        <path d="M25 2H29.5L35.5 18H31.5L30 13.8H24.5L23 18H19L25 2ZM25.5 10.8H29L27.2 5.5L25.5 10.8Z" />
        {/* X */}
        <path d="M37 2H41L44.5 8L48 2H52L46.8 10L52.5 18H48.2L44.5 12L40.8 18H36.5L42.2 10L37 2Z" />
        {/* H */}
        <path d="M54 2H57.8V8.2H65.2V2H69V18H65.2V11.8H57.8V18H54V2Z" />
        {/* U */}
        <path d="M72 2H75.8V12C75.8 14.5 77.2 15.5 79.5 15.5C81.8 15.5 83.2 14.5 83.2 12V2H87V12C87 16.5 84 18.5 79.5 18.5C75 18.5 72 16.5 72 12V2Z" />
        {/* B */}
        <path d="M90 2H96.5C99.2 2 101 3.5 101 5.8C101 7.2 100 8.5 98.8 9C100.5 9.5 101.5 11 101.5 13C101.5 15.8 99.2 18 96.2 18H90V2ZM93.8 7.5H96C97 7.5 97.6 7 97.6 6.2C97.6 5.5 97 5 96 5H93.8V7.5ZM93.8 15H96.2C97.2 15 97.9 14.4 97.9 13.5C97.9 12.5 97.2 12 96.2 12H93.8V15Z" />
      </g>
    </svg>
  );
}

export function SeewoLogo({ height = 24 }: { height?: number }) {
  // Official Seewo (希沃) Logo: Cyan-green gradient emblem with interactive leaf + rounded 'seewo' logotype
  return (
    <svg height={height} viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <defs>
        <linearGradient id="seewoGrad" x1="0" y1="0" x2="26" y2="26" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00C292" />
          <stop offset="1" stopColor="#009688" />
        </linearGradient>
      </defs>
      {/* Seewo Emblem */}
      <g transform="translate(2, 3)">
        <circle cx="13" cy="13" r="12" fill="url(#seewoGrad)" />
        <path d="M8 13.5C8 10.5 10.5 8 13.5 8C16.8 8 19 10.8 17.5 14C16.2 16.8 12.5 18 9.5 17.2" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="16.5" cy="9.5" r="1.8" fill="#FFFFFF" />
      </g>
      {/* 'seewo' Modern Fluid Typography */}
      <g fill="#F5F5F7" transform="translate(34, 7)">
        {/* s */}
        <path d="M2.5 13.8C3.5 14.8 5 15.5 7 15.5C9.5 15.5 11 14.2 11 12.5C11 10.2 7.8 9.8 5.8 9C3.2 8 2.2 6.8 2.2 4.8C2.2 2.2 4.5 0.5 7.2 0.5C9.5 0.5 11.2 1.5 12.2 2.8L10 4.8C9.2 4 8.2 3.5 7 3.5C5.8 3.5 4.8 4 4.8 5C4.8 6.5 7.5 7 9.8 7.8C12.5 8.8 13.5 10.2 13.5 12.5C13.5 15.5 10.8 17.5 7 17.5C4 17.5 1.5 16.2 0.2 14.5L2.5 13.8Z" />
        {/* e */}
        <path d="M16 9C16 4.8 19 1.5 23.5 1.5C27.8 1.5 30.5 4.8 30.5 9.5V10.5H19.5C19.8 13 21.5 14.5 24 14.5C25.5 14.5 26.8 13.8 27.5 12.8L29.8 14.2C28.5 16.2 26.2 17.5 23.5 17.5C18.8 17.5 16 14 16 9ZM27 8C26.5 6 25.2 4.5 23.5 4.5C21.8 4.5 20.5 6 20 8H27Z" />
        {/* e */}
        <path d="M33 9C33 4.8 36 1.5 40.5 1.5C44.8 1.5 47.5 4.8 47.5 9.5V10.5H36.5C36.8 13 38.5 14.5 41 14.5C42.5 14.5 43.8 13.8 44.5 12.8L46.8 14.2C45.5 16.2 43.2 17.5 40.5 17.5C35.8 17.5 33 14 33 9ZM44 8C43.5 6 42.2 4.5 40.5 4.5C38.8 4.5 37.5 6 37 8H44Z" />
        {/* w */}
        <path d="M50 2H53.5L56 11.5L58.8 2H61.8L64.5 11.5L67 2H70.5L66.5 17H63L60.2 7.5L57.5 17H54L50 2Z" />
        {/* o */}
        <path d="M72.5 9.5C72.5 4.8 76 1.5 80.5 1.5C85 1.5 88.5 4.8 88.5 9.5C88.5 14.2 85 17.5 80.5 17.5C76 17.5 72.5 14.2 72.5 9.5ZM85 9.5C85 6.2 83 4.2 80.5 4.2C78 4.2 76 6.2 76 9.5C76 12.8 78 14.8 80.5 14.8C83 14.8 85 12.8 85 9.5Z" />
      </g>
    </svg>
  );
}

export function NewlineLogo({ height = 24 }: { height?: number }) {
  // Official Newline Interactive Logo: Orange loop icon + cyan accent dot
  return (
    <svg height={height} viewBox="0 0 125 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      {/* Newline Ribbon Emblem */}
      <g transform="translate(2, 4)">
        <path d="M3 21L12 4L21 21H16L12 12L8 21H3Z" fill="#F15A24" />
        <circle cx="12" cy="7" r="3.2" fill="#00AEEF" />
      </g>
      {/* 'newline' Typography */}
      <g fill="#F5F5F7" transform="translate(28, 7)">
        {/* n */}
        <path d="M2 2H5.2V4.5C6.2 3 7.8 2 9.8 2C13 2 15 3.8 15 7.5V16H11.8V8C11.8 6 10.8 5 9 5C7.2 5 5.8 6.2 5.2 8V16H2V2Z" />
        {/* e */}
        <path d="M17 9C17 5 19.5 2 23.5 2C27.2 2 29.5 5 29.5 9.2V10H20.2C20.5 12.2 21.8 13.5 24 13.5C25.2 13.5 26.2 13 26.8 12.2L29 13.5C27.8 15.2 26 16.2 23.8 16.2C19.5 16.2 17 13 17 9ZM26.2 8C26 6.2 24.8 4.8 23.2 4.8C21.8 4.8 20.5 6.2 20.2 8H26.2Z" />
        {/* w */}
        <path d="M31 2H34.2L36.5 10.5L39 2H41.5L44 10.5L46.2 2H49.5L46 16H43L40.2 7.5L37.5 16H34.5L31 2Z" />
        {/* l */}
        <path d="M52 0H55.2V16H52V0Z" />
        {/* i */}
        <path d="M58 5H61.2V16H58V5Z" />
        <circle cx="59.6" cy="1.8" r="1.8" fill="#00AEEF" />
        {/* n */}
        <path d="M64 5H67.2V7.5C68.2 6 69.8 5 71.8 5C75 5 77 6.8 77 10.5V16H73.8V11C73.8 9 72.8 8 71 8C69.2 8 67.8 9.2 67.2 11V16H64V5Z" />
        {/* e */}
        <path d="M79 10.5C79 6.5 81.5 5 85.5 5C89.2 5 91.5 8 91.5 12.2V13H82.2C82.5 15.2 83.8 16.2 86 16.2C87.2 16.2 88.2 15.8 88.8 15L91 16.2C89.8 18 88 19 85.8 19C81.5 19 79 15.5 79 10.5ZM88.2 11C88 9.2 86.8 7.8 85.2 7.8C83.8 7.8 82.5 9.2 82.2 11H88.2Z" />
      </g>
    </svg>
  );
}

export function PrometheanLogo({ height = 24 }: { height?: number }) {
  // Official Promethean Flame Torch Mark & Distinctive Typography
  return (
    <svg height={height} viewBox="0 0 145 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      {/* Promethean Multi-Layer Flame */}
      <g transform="translate(2, 3)">
        <path d="M12 2C8 6 3 11 3 16.5C3 21.8 7.2 26 12.5 26C17.8 26 22 21.8 22 16.5C22 11 16 6 12 2Z" fill="#F26522" />
        <path d="M12 8C9.5 11 6 14.5 6 18C6 21.5 8.8 24.2 12.2 24.2C15.8 24.2 18.5 21.5 18.5 18C18.5 14.5 14.5 11 12 8Z" fill="#FFC20E" />
        <path d="M12 13C10.5 15 8.5 17 8.5 19.5C8.5 21.5 10.2 23 12.2 23C14.2 23 15.8 21.5 15.8 19.5C15.8 17 13.5 15 12 13Z" fill="#ED1C24" />
      </g>
      {/* 'Promethean' Modern Bold Wordmark */}
      <g fill="#F5F5F7" transform="translate(28, 8)">
        {/* P */}
        <path d="M2 15V0H7.5C10.5 0 12.5 1.5 12.5 4.5C12.5 7.5 10.5 9 7.5 9H4.8V15H2ZM4.8 6.5H7.2C8.8 6.5 9.8 5.8 9.8 4.5C9.8 3.2 8.8 2.5 7.2 2.5H4.8V6.5Z" />
        {/* r */}
        <path d="M14 15V4.5H16.5V7C17.2 5.2 18.8 4.5 20.5 4.5V7.2C18.5 7.2 16.8 8.5 16.8 10.8V15H14Z" />
        {/* o */}
        <path d="M21 9.8C21 5.8 23.8 3.8 27.2 3.8C30.8 3.8 33.5 5.8 33.5 9.8C33.5 13.8 30.8 15.8 27.2 15.8C23.8 15.8 21 13.8 21 9.8ZM30.8 9.8C30.8 7.2 29.2 5.8 27.2 5.8C25.2 5.8 23.8 7.2 23.8 9.8C23.8 12.2 25.2 13.8 27.2 13.8C29.2 13.8 30.8 12.2 30.8 9.8Z" />
        {/* m */}
        <path d="M35 15V4.5H37.5V6.8C38.2 5.2 39.8 4.2 41.5 4.2C43.2 4.2 44.8 5.2 45.2 6.8C46 5.2 47.8 4.2 49.5 4.2C52.2 4.2 53.8 5.8 53.8 9V15H51.2V9.5C51.2 7.5 50.2 6.5 48.8 6.5C47.2 6.5 46 7.8 46 9.8V15H43.5V9.5C43.5 7.5 42.5 6.5 41 6.5C39.5 6.5 38.2 7.8 38.2 9.8V15H35Z" />
        {/* e */}
        <path d="M55.5 9.8C55.5 6 58 4 61.5 4C65 4 67.2 6.2 67.2 10.2V11H58C58.2 12.8 59.5 14 61.5 14C62.8 14 63.8 13.5 64.2 12.8L66.5 14C65.5 15.5 63.8 16 61.5 16C57.8 16 55.5 13.5 55.5 9.8ZM64.5 9C64.2 7.5 63.2 6 61.5 6C59.8 6 58.5 7.5 58.2 9H64.5Z" />
        {/* t */}
        <path d="M70 1.5H72.5V4.5H75V6.8H72.5V12.2C72.5 13.2 73 13.8 74 13.8C74.5 13.8 75 13.5 75.2 13.2L75.8 15.2C75 15.8 74 16 73 16C71 16 70 14.8 70 12.5V6.8H68V4.5H70V1.5Z" />
        {/* h */}
        <path d="M77 0H79.5V6.8C80.2 5.2 81.8 4.2 83.8 4.2C86.5 4.2 88.2 5.8 88.2 9V15H85.8V9.5C85.8 7.5 84.8 6.5 83.2 6.5C81.8 6.5 80.2 7.8 80.2 9.8V15H77V0Z" />
        {/* e */}
        <path d="M90 9.8C90 6 92.5 4 96 4C99.5 4 101.8 6.2 101.8 10.2V11H92.5C92.8 12.8 94 14 96 14C97.2 14 98.2 13.5 98.8 12.8L101 14C100 15.5 98.2 16 96 16C92.2 16 90 13.5 90 9.8ZM99 9C98.8 7.5 97.8 6 96 6C94.2 6 93 7.5 92.8 9H99Z" />
        {/* a */}
        <path d="M103.5 10C103.5 6.5 106 4.2 109.5 4.2C111.2 4.2 112.5 5 113.2 6.2V4.5H115.5V15H113.2V13.5C112.5 14.8 111 15.8 109.5 15.8C106 15.8 103.5 13.5 103.5 10ZM113.2 10C113.2 7.8 111.8 6.5 109.8 6.5C107.8 6.5 106.2 7.8 106.2 10C106.2 12.2 107.8 13.5 109.8 13.5C111.8 13.5 113.2 12.2 113.2 10Z" />
        {/* n */}
        <path d="M117.5 4.5H120V6.8C120.8 5.2 122.2 4.2 124.2 4.2C127 4.2 128.5 5.8 128.5 9V15H126V9.5C126 7.5 125 6.5 123.5 6.5C122 6.5 120.5 7.8 120.5 9.8V15H117.5V4.5Z" />
      </g>
    </svg>
  );
}

export function SmartBoardLogo({ height = 24 }: { height?: number }) {
  // Official SMART Technologies Logo: Cyan badge + clean geometric SMART wordmark
  return (
    <svg height={height} viewBox="0 0 115 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <rect x="2" y="4" width="24" height="24" rx="6" fill="#00A3E0" />
      <path d="M10 18C11 19 12.5 19.8 14.2 19.8C16.2 19.8 17.5 18.8 17.5 17.2C17.5 15.2 15 14.8 13.2 14.2C11 13.5 10.2 12.5 10.2 11C10.2 9 12 7.5 14.2 7.5C16 7.5 17.5 8.2 18.5 9.5L16.8 11C16.2 10.2 15.2 9.8 14.2 9.8C13.2 9.8 12.5 10.2 12.5 11C12.5 12 14.5 12.5 16.5 13C18.8 13.8 19.8 15 19.8 17C19.8 19.5 17.5 21.5 14.2 21.5C12 21.5 10 20.5 9 19.2L10 18Z" fill="#FFFFFF" />
      <g fill="#F5F5F7" transform="translate(32, 7)">
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
    <svg height={height} viewBox="0 0 140 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      {/* Branch */}
      <path d="M2 22C10 21.5 22 22.5 32 23.5" stroke="#8D6E63" strokeWidth="2.5" strokeLinecap="round" />
      {/* Bird 1 (Left - Red Head Gouldian Finch) */}
      <g transform="translate(4, 7)">
        <path d="M4 8C4 5 6.5 2.5 9 3.5C11 4.5 11 8 9 10C7 11.5 4 11 4 8Z" fill="#ED1C24" />
        <path d="M7 8C7 12 3 14 1 15C4 16 8 15 9 12" fill="#00A651" />
        <path d="M6 10C8 11 9 13 8 15C5 15 4 13 6 10Z" fill="#6A1B9A" />
        <path d="M7 13C8 14 7 16 5 16.5C4 16.5 4 15 7 13Z" fill="#FFF200" />
        <circle cx="8" cy="5.5" r="0.8" fill="#000000" />
        <polygon points="10,4.5 13,5.5 10,6.5" fill="#FFFFFF" />
      </g>
      {/* Bird 2 (Center - Blue/Black Gouldian Finch) */}
      <g transform="translate(13, 5)">
        <path d="M4 8C4 5 6.5 2.5 9 3.5C11 4.5 11 8 9 10C7 11.5 4 11 4 8Z" fill="#1A1A1A" />
        <path d="M7 8C7 12 3 14 1 15C4 16 8 15 9 12" fill="#00A651" />
        <path d="M6 10C8 11 9 13 8 15C5 15 4 13 6 10Z" fill="#0054A6" />
        <path d="M7 13C8 14 7 16 5 16.5C4 16.5 4 15 7 13Z" fill="#FFF200" />
        <circle cx="8" cy="5.5" r="0.8" fill="#FFFFFF" />
        <polygon points="10,4.5 13,5.5 10,6.5" fill="#ED1C24" />
      </g>
      {/* Bird 3 (Right - Yellow/Orange Gouldian Finch) */}
      <g transform="translate(22, 7)">
        <path d="M4 8C4 5 6.5 2.5 9 3.5C11 4.5 11 8 9 10C7 11.5 4 11 4 8Z" fill="#F7941D" />
        <path d="M7 8C7 12 3 14 1 15C4 16 8 15 9 12" fill="#00A651" />
        <path d="M6 10C8 11 9 13 8 15C5 15 4 13 6 10Z" fill="#6A1B9A" />
        <path d="M7 13C8 14 7 16 5 16.5C4 16.5 4 15 7 13Z" fill="#FFF200" />
        <circle cx="8" cy="5.5" r="0.8" fill="#000000" />
        <polygon points="10,4.5 13,5.5 10,6.5" fill="#FFFFFF" />
      </g>
      {/* ViewSonic Classic Wordmark */}
      <g fill="#F5F5F7" transform="translate(38, 8)">
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
  // Official Huawei 8-Petal Radial Sunburst & Bold Logotype
  return (
    <svg height={height} viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      {/* Huawei 8-Petal Fan Blossom in Official Red */}
      <g transform="translate(14, 15) scale(0.68)">
        {/* Central 2 petals */}
        <path d="M0 -3C-1.5 -8 -1 -15 0 -18C1 -15 1.5 -8 0 -3Z" fill="#CF0A2C" />
        <path d="M0 -3C-3.5 -7.5 -5.5 -13.5 -5 -16.5C-3.5 -15 -1.5 -9 0 -3Z" fill="#CF0A2C" />
        <path d="M0 -3C3.5 -7.5 5.5 -13.5 5 -16.5C3.5 -15 1.5 -9 0 -3Z" fill="#CF0A2C" />
        {/* Outer petals */}
        <path d="M0 -3C-6 -6 -10.5 -10 -11.5 -13C-9.5 -12.5 -5 -8 0 -3Z" fill="#CF0A2C" />
        <path d="M0 -3C6 -6 10.5 -10 11.5 -13C9.5 -12.5 5 -8 0 -3Z" fill="#CF0A2C" />
        <path d="M0 -3C-8 -4 -14 -6 -16 -8C-14.5 -8.5 -8 -5.5 0 -3Z" fill="#CF0A2C" />
        <path d="M0 -3C8 -4 14 -6 16 -8C14.5 -8.5 8 -5.5 0 -3Z" fill="#CF0A2C" />
        <path d="M0 -3C-9 -1.5 -16 -2 -18 -3C-17 -4.5 -9 -3 0 -3Z" fill="#CF0A2C" />
      </g>
      {/* HUAWEI Bold Wordmark */}
      <g fill="#F5F5F7" transform="translate(32, 8)">
        {/* H */}
        <path d="M2 15V0H5.5V6H11.5V0H15V15H11.5V9H5.5V15H2Z" />
        {/* U */}
        <path d="M18 0H21.5V10C21.5 12.2 22.8 13 24.8 13C26.8 13 28 12.2 28 10V0H31.5V10C31.5 13.8 29 15.5 24.8 15.5C20.5 15.5 18 13.8 18 10V0Z" />
        {/* A */}
        <path d="M38 0H41.5L47.5 15H43.8L42.5 11.5H37L35.8 15H32L38 0ZM38 8.8H41.5L39.8 4.2L38 8.8Z" />
        {/* W */}
        <path d="M49 0H52.5L55 9L57.5 0H61L63.5 9L66 0H69.5L65.5 15H62.2L59.2 5.5L56.2 15H53L49 0Z" />
        {/* E */}
        <path d="M72 0H82V3.2H75.5V6H81V9.2H75.5V11.8H82V15H72V0Z" />
        {/* I */}
        <path d="M85 0H88.5V15H85V0Z" />
      </g>
    </svg>
  );
}

export function SamsungLogo({ height = 24 }: { height?: number }) {
  // Official Samsung Blue Ellipse & SΛMSUNG Wordmark
  return (
    <svg height={height} viewBox="0 0 115 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      {/* Samsung Oval */}
      <ellipse cx="57.5" cy="16" rx="55" ry="14" transform="rotate(-6, 57.5, 16)" fill="#1428A0" />
      {/* SAMSUNG Typography (Signature 'A' without crossbar) */}
      <g fill="#FFFFFF" transform="translate(12, 9.5)">
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

// ==========================================
// 2. OS & Multi-Platform Vector Logos
// ==========================================

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
