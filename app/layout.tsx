import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Work_Sans } from 'next/font/google'
import './globals.css'

const headingFont = Plus_Jakarta_Sans({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-heading',
  display: 'swap',
})

const bodyFont = Work_Sans({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Bright English — Học vui, tiến bộ thật',
  description: 'Trung tâm tiếng Anh dành cho thế hệ trẻ. Học cùng giáo viên quốc tế, khám phá lộ trình phù hợp và tự tin chinh phục tương lai toàn cầu.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body className={`${bodyFont.className} antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
