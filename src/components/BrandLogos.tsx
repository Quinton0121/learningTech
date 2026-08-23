import React from 'react';

export function BenQLogo({ height = 24 }: { height?: number }) {
  return (
    <svg height={height} viewBox="0 0 100 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <text x="0" y="22" fontFamily="'Arial Black', 'Helvetica Black', sans-serif" fontWeight="900" fontSize="24" fill="#A855F7" letterSpacing="-1">
        Ben<tspan fill="#F5F5F7">Q</tspan>
      </text>
      <circle cx="94" cy="7" r="3.5" fill="#A855F7" />
    </svg>
  );
}

export function MaxhubLogo({ height = 24 }: { height?: number }) {
  return (
    <svg height={height} viewBox="0 0 120 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <rect x="0" y="4" width="20" height="20" rx="4" fill="#EF4444" />
      <path d="M5 18L10 9L15 18" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="26" y="21" fontFamily="'Arial Black', 'Trebuchet MS', sans-serif" fontWeight="900" fontSize="18" fill="#F5F5F7" letterSpacing="1">
        MAXHUB
      </text>
    </svg>
  );
}

export function SeewoLogo({ height = 24 }: { height?: number }) {
  return (
    <svg height={height} viewBox="0 0 110 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <path d="M4 14C4 8.477 8.477 4 14 4C19.523 4 24 8.477 24 14C24 19.523 19.523 24 14 24C8.477 24 4 19.523 4 14Z" fill="url(#seewoGrad)" />
      <path d="M9 14L13 18L19 10" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="28" y="21" fontFamily="'Segoe UI', 'SF Pro Display', sans-serif" fontWeight="800" fontSize="18" fill="#F5F5F7" letterSpacing="0.5">
        seewo
      </text>
      <defs>
        <linearGradient id="seewoGrad" x1="4" y1="4" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#10B981" />
          <stop offset="1" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function NewlineLogo({ height = 24 }: { height?: number }) {
  return (
    <svg height={height} viewBox="0 0 110 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <path d="M4 22L12 6L20 22" stroke="#F97316" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="15" r="2.5" fill="#38BDF8" />
      <text x="26" y="21" fontFamily="'Inter', 'Arial', sans-serif" fontWeight="700" fontSize="18" fill="#F5F5F7" letterSpacing="0.5">
        newline
      </text>
    </svg>
  );
}

export function PrometheanLogo({ height = 24 }: { height?: number }) {
  return (
    <svg height={height} viewBox="0 0 135 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <path d="M12 4C7.58 4 4 7.58 4 12C4 18 12 24 12 24C12 24 20 18 20 12C20 7.58 16.42 4 12 4Z" fill="#F59E0B" />
      <path d="M12 8C9.79 8 8 9.79 8 12C8 15 12 19 12 19C12 19 16 15 16 12C16 9.79 14.21 8 12 8Z" fill="#EF4444" />
      <text x="26" y="20" fontFamily="'Helvetica Neue', 'Arial', sans-serif" fontWeight="700" fontSize="15" fill="#F5F5F7" letterSpacing="0.2">
        Promethean
      </text>
    </svg>
  );
}

export function SmartBoardLogo({ height = 24 }: { height?: number }) {
  return (
    <svg height={height} viewBox="0 0 100 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <rect x="2" y="4" width="20" height="20" rx="6" fill="#0284C7" />
      <text x="6" y="19" fontFamily="'Arial Black', sans-serif" fontWeight="900" fontSize="14" fill="#FFFFFF">S</text>
      <text x="27" y="20" fontFamily="'Arial Black', sans-serif" fontWeight="900" fontSize="16" fill="#F5F5F7" letterSpacing="0.5">
        SMART
      </text>
    </svg>
  );
}

export function ViewSonicLogo({ height = 24 }: { height?: number }) {
  return (
    <svg height={height} viewBox="0 0 125 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <circle cx="6" cy="11" r="3.5" fill="#EF4444" />
      <path d="M6 14L9 18H3L6 14Z" fill="#EF4444" />
      <circle cx="13" cy="9" r="3.5" fill="#3B82F6" />
      <path d="M13 12L16 17H10L13 12Z" fill="#3B82F6" />
      <circle cx="20" cy="11" r="3.5" fill="#EAB308" />
      <path d="M20 14L23 18H17L20 14Z" fill="#EAB308" />
      <text x="28" y="20" fontFamily="'Arial', 'Helvetica', sans-serif" fontWeight="700" fontSize="15" fill="#F5F5F7" letterSpacing="0.2">
        ViewSonic
      </text>
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
  return (
    <svg height={height} viewBox="0 0 110 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <text x="2" y="20" fontFamily="'Arial Black', 'Helvetica', sans-serif" fontWeight="900" fontSize="16" fill="#3B82F6" letterSpacing="1.5">
        SAMSUNG
      </text>
    </svg>
  );
}

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
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.551H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.849" fill="#0078D4"/>
    </svg>
  );
}

export function ChromeOSLogo({ height = 24 }: { height?: number }) {
  return (
    <svg height={height} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <circle cx="50" cy="50" r="46" fill="#FFFFFF" />
      <path d="M50 4C75.4 4 96 24.6 96 50L50 50L27 10C34 6.2 41.8 4 50 4Z" fill="#EA4335" />
      <path d="M96 50C96 75.4 75.4 96 50 96L50 50L90 27C93.8 34 96 41.8 96 50Z" fill="#34A853" />
      <path d="M50 96C24.6 96 4 75.4 4 50L50 50L10 73C13.8 80.2 21.6 88 50 96Z" fill="#FBBC05" />
      <circle cx="50" cy="50" r="20" fill="#FFFFFF" />
      <circle cx="50" cy="50" r="16" fill="#4285F4" />
    </svg>
  );
}
