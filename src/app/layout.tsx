import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'EduSphere | Next-Gen Learning',
  description: 'A premium online teaching and learning platform.',
}

import { LanguageProvider } from '@/contexts/LanguageContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
