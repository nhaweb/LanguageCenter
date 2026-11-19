import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
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

const isProduction = process.env.VERCEL_ENV === 'production'
const siteUrl = isProduction
  ? 'https://brightenglish.vn'
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'Bright English — Học vui, tiến bộ thật | Trung tâm tiếng Anh chuẩn quốc tế',
  description: 'Trung tâm tiếng Anh cho trẻ em, học sinh và người đi làm. Giáo viên được tuyển với CELTA hoặc TESOL. Hai cơ sở tại TP.HCM và Hà Nội.',
  metadataBase: new URL(siteUrl),
  robots: isProduction
    ? { index: true, follow: true }
    : { index: false, follow: false },
  alternates: isProduction ? { canonical: '/' } : undefined,
  openGraph: {
    title: 'Bright English — Học vui, tiến bộ thật',
    description: 'Tiếng Anh cho trẻ em, học sinh và người đi làm. Hai cơ sở tại TP.HCM và Hà Nội.',
    url: siteUrl,
    siteName: 'Bright English Center',
    locale: 'vi_VN',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Bright English — Học vui, tiến bộ thật',
      },
    ],
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
  '@graph': [
    {
      '@type': 'EducationalOrganization',
      name: 'Bright English Center',
      url: siteUrl,
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
      sameAs: ['https://facebook.com/brightenglish.vn', 'https://zalo.me/19006868'],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        ['Học viên có được học thử trước khi đóng học phí không?', 'Có một buổi trải nghiệm và một bài kiểm tra trình độ trước khi xếp lớp.'],
        ['Sĩ số tối đa mỗi lớp là bao nhiêu?', 'Mỗi lớp từ 8 đến 12 học viên.'],
        ['Có cam kết đầu ra bằng văn bản không?', 'Với Cambridge và IELTS, mục tiêu được ghi trong hợp đồng sau bài test. Nếu đã học đủ buổi mà chưa đạt mục tiêu đã ký, học viên được học lại.'],
        ['Nghỉ học thì xử lý thế nào?', 'Có học bù trong tuần và bảo lưu học phí đến 6 tháng.'],
        ['Có trả góp không?', 'Có trả góp 0% qua thẻ từ 3 đến 12 tháng, và giảm 10% khi đăng ký từ 2 học viên trong gia đình.'],
      ].map(([name, text]) => ({
        '@type': 'Question',
        name,
        acceptedAnswer: { '@type': 'Answer', text },
      })),
    },
    {
      '@type': 'ItemList',
      itemListElement: [
        ['English Explorers', '1590000'],
        ['Bright Stars', '1790000'],
        ['Cambridge Champions', '1690000'],
        ['IELTS Breakthrough', '2490000'],
        ['IELTS Mastery 7.0+', '2990000'],
        ['Speak with Confidence', '1990000'],
      ].map(([name, price], index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Course',
          name,
          provider: { '@type': 'EducationalOrganization', name: 'Bright English Center' },
          offers: { '@type': 'Offer', price, priceCurrency: 'VND' },
        },
      })),
    },
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
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');`}
            </Script>
          </>
        )}
        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${process.env.NEXT_PUBLIC_META_PIXEL_ID}');fbq('track','PageView');`}
          </Script>
        )}
      </body>
    </html>
  )
}
