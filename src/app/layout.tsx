import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'interlectic 聚課 | Next-Gen Learning',
  description: 'A premium online teaching and learning platform.',
}

import { LanguageProvider } from '@/contexts/LanguageContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
