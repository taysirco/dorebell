import './globals.css'
import { Cairo } from 'next/font/google'
import type { Metadata } from 'next'

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-cairo',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'sans-serif']
})

export const metadata: Metadata = {
  title: 'جرس الباب الذكي بالكاميرا - ١٩٩٩ جنيه - الدفع عند الاستلام',
  description: 'خليك عارف مين على بابك حتى وانت مش في البيت! جرس الباب الذكي بالكاميرا هيخليك تشوف وتسمع وترد من موبايلك – أمانك دلوقتي بلمسة!',
  keywords: 'جرس الباب الذكي, كاميرا الباب, أمان المنزل, رؤية ليلية, Wi-Fi, Android, iOS',
  authors: [{ name: 'Dorebell' }],
  creator: 'Dorebell',
  publisher: 'Dorebell',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://dorebell.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'جرس الباب الذكي بالكاميرا - ١٩٩٩ جنيه - الدفع عند الاستلام',
    description: 'خليك عارف مين على بابك حتى وانت مش في البيت! جرس الباب الذكي بالكاميرا هيخليك تشوف وتسمع وترد من موبايلك – أمانك دلوقتي بلمسة!',
    url: '/',
    siteName: 'Dorebell',
    locale: 'ar_EG',
    type: 'website',
    images: [
      {
        url: '/images/main-image-1.jpeg',
        width: 1200,
        height: 630,
        alt: 'جرس الباب الذكي بالكاميرا',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'جرس الباب الذكي بالكاميرا - ١٩٩٩ جنيه',
    description: 'أمانك دلوقتي بلمسة! شوف واسمع ورد من موبايلك',
    images: ['/images/main-image-1.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1e3a8a" />
        
        {/* JSON-LD Product Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Product",
              "name": "جرس الباب الذكي بالكاميرا",
              "description": "خليك عارف مين على بابك حتى وانت مش في البيت! جرس الباب الذكي بالكاميرا هيخليك تشوف وتسمع وترد من موبايلك – أمانك دلوقتي بلمسة!",
              "image": [
                "/images/main-image-1.jpeg",
                "/images/main-image-2.jpeg",
                "/images/main-image-3.jpeg"
              ],
              "brand": {
                "@type": "Brand",
                "name": "Generic"
              },
              "sku": "doorbell-cam-001",
              "offers": {
                "@type": "Offer",
                "url": "/",
                "priceCurrency": "EGP",
                "price": "1999",
                "availability": "https://schema.org/InStock",
                "seller": {
                  "@type": "Organization",
                  "name": "Dorebell"
                }
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "127"
              }
            })
          }}
        />

        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "هل يحتاج كهرباء؟",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "يعمل بالبطاريات (غير مرفقة)."
                  }
                },
                {
                  "@type": "Question", 
                  "name": "هل يدعم أندرويد و iOS؟",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "نعم عبر التطبيق."
                  }
                },
                {
                  "@type": "Question",
                  "name": "هل يتحمل المطر؟", 
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "نعم مقاوم للعوامل الجوية."
                  }
                },
                {
                  "@type": "Question",
                  "name": "هل يوجد ضمان؟",
                  "acceptedAnswer": {
                    "@type": "Answer", 
                    "text": "ضمان ٣ سنوات."
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body className={`${cairo.className} rtl arabic-text bg-gray-50 antialiased`}>
        {children}
        
        {/* Google Analytics / GTM placeholder */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
            `
          }}
        />
      </body>
    </html>
  )
}
