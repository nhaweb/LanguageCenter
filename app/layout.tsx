import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Work_Sans } from 'next/font/google'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const work = Work_Sans({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-work',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
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
  colorScheme: 'light',
  themeColor: '#4F46E5',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'PML English — Bright English Center',
  alternateName: 'Hệ thống Anh ngữ PML Vietnam & Bright English',
  url: 'https://pmlvietnam.vn',
  logo: 'https://pmlvietnam.vn/icon.svg',
  description: 'Trung tâm tiếng Anh dành cho trẻ em, học sinh và người đi làm với 100% giáo viên quốc tế và cam kết chuẩn đầu ra được vận hành bởi PML Vietnam.',
  telephone: '+84789780167',
  email: 'pmluanvn@gmail.com',
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: '208 Trường Chinh, Phường Tân Bình',
      addressLocality: 'Tân Bình',
      addressRegion: 'TP. Hồ Chí Minh',
      addressCountry: 'VN',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: '12 Nguyễn Văn Bảo, Phường 4',
      addressLocality: 'Gò Vấp',
      addressRegion: 'TP. Hồ Chí Minh',
      addressCountry: 'VN',
    },
  ],
  sameAs: [
    'https://facebook.com/pmlvietnam.vn',
    'https://www.youtube.com/@pmlvietnam',
    'https://zalo.me/0789780167',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className={`${jakarta.variable} ${work.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${work.className} antialiased selection:bg-indigo-500 selection:text-white`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
