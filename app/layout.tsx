import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Bright English — Học vui, tiến bộ thật | Trung tâm tiếng Anh chuẩn quốc tế',
  description: 'Trung tâm tiếng Anh dành cho thế hệ trẻ. Học cùng giáo viên quốc tế 100% chứng chỉ CELTA/TESOL, khám phá lộ trình phù hợp từ mầm non đến IELTS 7.5+ và tự tin chinh phục tương lai toàn cầu.',
  metadataBase: new URL('https://brightenglish.vn'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Bright English — Học vui, tiến bộ thật',
    description: 'Bứt phá tiếng Anh cùng 100% giáo viên quốc tế, phương pháp tương tác phản xạ và lộ trình cá nhân hóa.',
    url: 'https://brightenglish.vn',
    siteName: 'Bright English Center',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bright English — Học vui, tiến bộ thật',
    description: 'Trung tâm tiếng Anh chất lượng cao cho trẻ em, học sinh và người đi làm tại TP.HCM & Hà Nội.',
  },
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
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#4F46E5' },
    { media: '(prefers-color-scheme: dark)', color: '#111B3C' },
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Bright English Center',
  alternateName: 'Trung tâm Anh ngữ Bright English',
  url: 'https://brightenglish.vn',
  logo: 'https://brightenglish.vn/icon.svg',
  description: 'Trung tâm tiếng Anh dành cho trẻ em, học sinh và người đi làm với 100% giáo viên quốc tế và cam kết chuẩn đầu ra.',
  telephone: '19006868',
  email: 'hello@brightenglish.vn',
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: '12 Nguyễn Văn Bảo, Phường 4',
      addressLocality: 'Gò Vấp',
      addressRegion: 'Hồ Chí Minh',
      addressCountry: 'VN',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: '28 Trần Thái Tông, Dịch Vọng Hậu',
      addressLocality: 'Cầu Giấy',
      addressRegion: 'Hà Nội',
      addressCountry: 'VN',
    },
  ],
  sameAs: [
    'https://facebook.com/brightenglish.vn',
    'https://zalo.me/0901234567',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className={`${jakarta.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${jakarta.className} antialiased selection:bg-indigo-500 selection:text-white`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
