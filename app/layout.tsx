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

        {/* TikTok Pixel Code Start */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
              var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
              ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};

              ttq.load('D2JK9NRC77UFE4JPKPVG');
              ttq.page();
              }(window, document, 'ttq');
            `
          }}
        />
        {/* TikTok Pixel Code End */}

        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              
              try {
                fbq('init', '654285637690717');
                fbq('track', 'PageView');
              } catch (error) {
                console.log('Meta Pixel initialization error:', error);
              }
            `
          }}
        />
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=654285637690717&ev=PageView&noscript=1" />`
          }}
        />
        {/* End Meta Pixel Code */}
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
