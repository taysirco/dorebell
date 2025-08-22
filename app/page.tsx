'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Badge } from '@/components/Badge'
import { FeatureCard, CameraIcon, WifiIcon, NightVisionIcon, MicrophoneIcon, ShieldIcon, PhoneIcon, BatteryIcon, WeatherIcon, MotionIcon, ShareIcon } from '@/components/FeatureCard'

// Dynamic imports for heavy components to improve initial load
const FAQSection = dynamic(() => import('@/components/FAQItem').then(mod => ({ default: mod.FAQSection })), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 rounded-lg h-64" />
})

const Gallery = dynamic(() => import('@/components/Gallery').then(mod => ({ default: mod.Gallery })), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 rounded-lg h-64" />
})

const StickyBar = dynamic(() => import('@/components/StickyBar').then(mod => ({ default: mod.StickyBar })), {
  ssr: false
})

const OrderForm = dynamic(() => import('@/components/OrderForm').then(mod => ({ default: mod.OrderForm })), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 rounded-lg h-96" />
})

const PRODUCT_NAME = 'جرس الباب الذكي بالكاميرا'
const PRICE = '1999'
const ORIGINAL_PRICE = '2700'
const WHATSAPP_NUMBER = '201205234797'

export default function HomePage() {
  const [showStickyBar, setShowStickyBar] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(true)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [showSoundPrompt, setShowSoundPrompt] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 800)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // TikTok ViewContent tracking on page load
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).ttq) {
      (window as any).ttq.track('ViewContent', {
        content_type: 'product',
        content_id: 'doorbell-smart-camera',
        content_name: PRODUCT_NAME,
        value: parseFloat(PRICE),
        currency: 'EGP',
        description: 'Product page viewed'
      })
    }
  }, [])

  // Meta Pixel ViewContent tracking on page load
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof (window as any).fbq === 'function') {
      try {
        (window as any).fbq('track', 'ViewContent', {
          content_type: 'product',
          content_ids: ['doorbell-smart-camera'],
          content_name: PRODUCT_NAME,
          value: parseFloat(PRICE),
          currency: 'EGP'
        })
      } catch (fbqError) {
        console.log('Meta Pixel ViewContent tracking error:', fbqError)
      }
    }
  }, [])

  const scrollToOrderForm = () => {
    const orderForm = document.getElementById('order-form')
    if (orderForm) {
      orderForm.scrollIntoView({ behavior: 'smooth' })
    }
  }



  // Gallery images - using all available images
  const galleryImages = [
    {
      src: '/images/main-image-1.jpeg',
      alt: 'جرس الباب الذكي بالكاميرا - الصورة الرئيسية',
      caption: 'المنتج الأصلي - جودة فائقة'
    },
    {
      src: '/images/main-image-2.jpeg',
      alt: 'جرس الباب الذكي - منظر جانبي',
      caption: 'تصميم أنيق ومقاوم للعوامل الجوية'
    },
    {
      src: '/images/main-image-3.jpeg',
      alt: 'جرس الباب الذكي - واجهة التطبيق',
      caption: 'تحكم ذكي من الموبايل'
    },
    {
      src: '/images/main-image-4.jpeg',
      alt: 'جرس الباب الذكي - جميع الزوايا',
      caption: 'عرض شامل للمنتج'
    },
    {
      src: '/images/main-image-11.jpg',
      alt: 'جرس الباب الذكي - صورة إضافية',
      caption: 'تفاصيل دقيقة للمنتج'
    },
    {
      src: '/images/all-functions.jpg',
      alt: 'جميع مميزات الجرس الذكي',
      caption: 'كل المميزات في جهاز واحد'
    },
    {
      src: '/images/clear-shot.jpg',
      alt: 'جودة الصورة الواضحة',
      caption: 'وضوح مذهل في كل لقطة'
    },
    {
      src: '/images/night-sun.jpg',
      alt: 'رؤية ليلية ونهارية متقدمة',
      caption: 'وضوح مثالي في الليل والنهار'
    },
    {
      src: '/images/video-record.jpg',
      alt: 'خاصية تسجيل الفيديو',
      caption: 'تسجيل تلقائي عالي الجودة'
    },
    {
      src: '/images/face-voice.jpg',
      alt: 'التفاعل الصوتي والمرئي',
      caption: 'تواصل مباشر مع الضيوف'
    },
    {
      src: '/images/built-in-bettary.jpg',
      alt: 'البطارية المدمجة',
      caption: 'عمل مستمر بدون انقطاع'
    },
    {
      src: '/images/how-it-work.jpg',
      alt: 'طريقة عمل الجرس الذكي',
      caption: 'آلية العمل البسيطة والفعالة'
    },
    {
      src: '/images/dimention.avif',
      alt: 'مقاسات وأبعاد المنتج',
      caption: 'المقاسات والأبعاد الدقيقة'
    }
  ]

  // FAQ data
  const faqs = [
    {
      question: 'هل يحتاج كهرباء؟',
      answer: 'يعمل بالبطاريات (غير مرفقة) ولا يحتاج تمديدات كهربائية معقدة.'
    },
    {
      question: 'هل يدعم أندرويد و iOS؟',
      answer: 'نعم، يعمل مع جميع الهواتف الذكية عبر التطبيق المجاني المتوفر على Android و iOS.'
    },
    {
      question: 'هل يتحمل المطر؟',
      answer: 'نعم، مقاوم للعوامل الجوية بالكامل ويعمل في المطر والحر والبرد.'
    },
    {
      question: 'هل يوجد ضمان؟',
      answer: 'ضمان ٣ سنوات شامل ضد عيوب التصنيع مع خدمة الاستبدال خلال ١٤ يوم.'
    },
    {
      question: 'كيف يتم التركيب؟',
      answer: 'التركيب سهل جداً ولا يحتاج خبرة. يأتي مع دليل التركيب وجميع الأدوات المطلوبة.'
    },
    {
      question: 'ما هو مدى الرؤية؟',
      answer: 'زاوية رؤية واسعة 80 درجة مع رؤية ليلية واضحة حتى 10 أمتار.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 mobile-nav touch-friendly">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <h1 className="text-xl sm:text-2xl font-bold text-navy">Dorebell</h1>
              <Badge variant="success" size="sm" className="hidden sm:inline-flex">ضمان ٣ سنوات</Badge>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-lg sm:text-2xl font-bold text-rose-red">{PRICE} جنيه</span>
              <span className="text-sm sm:text-lg text-gray-500 line-through">{ORIGINAL_PRICE} جنيه</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-gray-100 mobile-full-height">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-right space-y-4 sm:space-y-6 mobile-padding-responsive">
              <h1 className="mobile-heading-responsive font-bold text-gray-900 leading-tight">
                💔 خايف على أطفالك وبيتك؟ 
                <span className="text-rose-red">احمي عائلتك دلوقتي!</span>
              </h1>
              <p className="mobile-text-responsive text-gray-700 leading-relaxed">
                <strong>جرس ذكي بكاميرا HD</strong> - شوف واسمع ورد على أي حد من موبايلك! 
                <span className="text-green-600 font-semibold">راحة البال لا تُقدر بثمن</span> 💚
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <div className="text-center">
                  <div className="flex items-center gap-2 mb-2 justify-center lg:justify-start">
                    <span className="text-2xl sm:text-3xl font-bold text-rose-red">{PRICE} جنيه</span>
                    <span className="text-lg sm:text-xl text-gray-500 line-through">{ORIGINAL_PRICE} جنيه</span>
                  </div>
                  <Badge variant="success" size="lg">وفر ٧٠١ جنيه</Badge>
                </div>
              </div>

              <div className="mobile-scroll-container">
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 text-xs sm:text-sm min-w-max">
                  <Badge variant="secondary">الدفع عند الاستلام</Badge>
                  <Badge variant="secondary">ضمان ٣ سنوات</Badge>
                  <Badge variant="secondary">استبدال خلال ١٤ يوم</Badge>
                  <Badge variant="secondary">شحن سريع</Badge>
                </div>
              </div>

              <div className="flex justify-center lg:justify-start pt-4 sm:pt-6">
                <button 
                  onClick={scrollToOrderForm}
                  className="btn-primary text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-5 animate-pulse w-full sm:w-auto touch-friendly font-bold shadow-2xl"
                >
                  🔥 احجز الآن بأقل سعر - محدود!
                </button>
              </div>
            </div>

            <div className="relative">
              {/* Main Product Video */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-100">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-auto"
                  poster="/images/main-image-1.jpeg"
                >
                  <source src="/videos/preview.mp4" type="video/mp4" />
                                  <Image
                  src="/images/main-image-1.jpeg"
                  alt={PRODUCT_NAME}
                  width={600}
                  height={600}
                  className="w-full h-auto"
                  priority
                  quality={90}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                </video>
                <div className="absolute top-4 left-4 bg-white/90 text-gray-800 px-3 py-1 rounded-lg font-semibold shadow-md">
                  ✨ جديد
                </div>
              </div>
              
              {/* Product Images Grid */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="relative rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/main-image-2.jpeg"
                    alt="جرس الباب الذكي - منظر جانبي"
                    width={300}
                    height={300}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                    quality={90}
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="relative rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/main-image-3.jpeg"
                    alt="جرس الباب الذكي - التطبيق"
                    width={300}
                    height={300}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                    quality={90}
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              </div>
              
              {/* Installation Video */}
              <div className="mt-6 bg-gradient-to-br from-blue-50 via-gray-50 to-purple-50 rounded-xl p-4 border border-gray-200 shadow-sm">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    📹 طريقة التركيب السهلة
                  </h3>
                  <div className="flex items-center justify-center space-x-2 space-x-reverse text-xs text-gray-500">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">✨ يعمل تلقائياً</span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">🎯 3 خطوات فقط</span>
                  </div>
                </div>
                <div className="relative group">
                  <video
                    ref={(video) => {
                      if (video) {
                        // Auto-play when video comes into view
                        const observer = new IntersectionObserver(
                          (entries) => {
                            entries.forEach((entry) => {
                              if (entry.isIntersecting) {
                                video.play().catch(() => {
                                  // Fallback if autoplay fails
                                  console.log('Autoplay prevented by browser')
                                })
                                setIsVideoPlaying(true)
                              } else {
                                video.pause()
                                setIsVideoPlaying(false)
                              }
                            })
                          },
                          { threshold: 0.3 }
                        )
                        observer.observe(video)

                        // Event listeners for video state
                        video.addEventListener('play', () => {
                          setIsVideoPlaying(true)
                          // Show sound prompt after 3 seconds if still muted
                          setTimeout(() => {
                            if (video.muted) {
                              setShowSoundPrompt(true)
                            }
                          }, 3000)
                        })
                        video.addEventListener('pause', () => setIsVideoPlaying(false))
                        video.addEventListener('volumechange', () => {
                          setIsVideoMuted(video.muted)
                          if (!video.muted) {
                            setShowSoundPrompt(false)
                          }
                        })
                      }
                    }}
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    className="w-full rounded-lg shadow-md transition-all duration-300 group-hover:shadow-xl"
                    poster="/images/how-it-work.jpg"
                    preload="metadata"
                    width="600"
                    height="400"
                  >
                    <source src="/videos/install-how-to-run.mp4" type="video/mp4" />
                    المتصفح لا يدعم تشغيل الفيديو
                  </video>
                  
                  {/* Live indicator */}
                  <div className="absolute top-3 right-3 z-10">
                    <div className={`flex items-center space-x-1 space-x-reverse bg-red-500 text-white text-xs px-2 py-1 rounded-full transition-opacity ${isVideoPlaying ? 'animate-pulse' : 'opacity-70'}`}>
                      <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
                      <span>مباشر</span>
                    </div>
                  </div>

                  {/* Auto-play indicator */}
                  <div className="absolute top-3 left-3 z-10">
                    <div className="bg-green-500 text-white text-xs px-2 py-1 rounded flex items-center space-x-1 space-x-reverse">
                      <span>⚡</span>
                      <span>تلقائي</span>
                    </div>
                  </div>

                  {/* Sound control overlay */}
                  <div className="absolute bottom-3 right-3 z-10">
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        const video = e.currentTarget.parentElement?.parentElement?.querySelector('video')
                        if (video) {
                          video.muted = !video.muted
                          setIsVideoMuted(video.muted)
                        }
                      }}
                      className="bg-black/70 hover:bg-black/90 text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
                      title={isVideoMuted ? 'تشغيل الصوت' : 'كتم الصوت'}
                    >
                      {isVideoMuted ? '🔇' : '🔊'}
                    </button>
                  </div>

                  {/* Video info overlay */}
                  <div className="absolute bottom-3 left-3 z-10">
                    <div className="bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center space-x-1 space-x-reverse">
                      <span>📹</span>
                      <span>دليل التركيب</span>
                    </div>
                  </div>

                  {/* Play/Pause overlay for mobile */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity md:hidden">
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        const video = e.currentTarget.parentElement?.parentElement?.querySelector('video')
                        if (video) {
                          if (video.paused) {
                            video.play()
                          } else {
                            video.pause()
                          }
                        }
                      }}
                      className="bg-white/20 backdrop-blur-sm text-white p-4 rounded-full hover:bg-white/30 transition-all"
                    >
                      {isVideoPlaying ? '⏸️' : '▶️'}
                    </button>
                  </div>

                  {/* Sound prompt notification */}
                  {showSoundPrompt && (
                    <div className="absolute inset-x-4 top-1/2 transform -translate-y-1/2 z-20">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-lg shadow-lg animate-bounce">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <span className="text-lg">🔊</span>
                          <div className="flex-1">
                            <p className="font-semibold text-sm">🎵 تفعيل الصوت للحصول على التجربة الكاملة</p>
                            <p className="text-xs opacity-90">اضغط على أيقونة الصوت لسماع الشرح</p>
                          </div>
                          <button
                            onClick={() => setShowSoundPrompt(false)}
                            className="text-white/80 hover:text-white ml-2"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Loading overlay */}
                  <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center"
                       style={{ display: 'none' }}
                       id="video-loading">
                    <div className="text-gray-500 text-center">
                      <div className="text-2xl mb-2">📹</div>
                      <p className="text-sm">جارٍ تحميل الفيديو...</p>
                    </div>
                  </div>
                </div>
                
                {/* Video description */}
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600 mb-3">
                    🎯 شاهد كيفية تركيب الجهاز في 3 خطوات بسيطة
                  </p>
                  
                  {/* Quick steps preview */}
                  <div className="grid grid-cols-3 gap-2 mt-4 text-xs">
                    <div className="bg-white rounded-lg p-2 shadow-sm border">
                      <div className="text-blue-500 font-bold mb-1">1️⃣</div>
                      <p className="text-gray-600">اختر المكان</p>
                    </div>
                    <div className="bg-white rounded-lg p-2 shadow-sm border">
                      <div className="text-green-500 font-bold mb-1">2️⃣</div>
                      <p className="text-gray-600">ثبت الجهاز</p>
                    </div>
                    <div className="bg-white rounded-lg p-2 shadow-sm border">
                      <div className="text-purple-500 font-bold mb-1">3️⃣</div>
                      <p className="text-gray-600">اربط بالتطبيق</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-4 space-x-reverse mt-3 text-xs text-gray-500">
                    <span>⏱️ مدة الفيديو: 2 دقيقة</span>
                    <span>📱 مناسب للمبتدئين</span>
                    <span>🔧 بدون أدوات معقدة</span>
                  </div>
                  
                  {/* Call to action */}
                  <div className="mt-4 p-3 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg border border-green-200">
                    <p className="text-sm font-medium text-gray-800">
                      💡 <span className="font-bold text-green-700">نصيحة:</span> احتفظ بالهاتف قريباً أثناء التركيب!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Strip */}
      <section className="py-8 bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <ShieldIcon />
              <span className="mt-2 text-sm font-medium text-gray-700">الدفع عند الاستلام</span>
            </div>
            <div className="flex flex-col items-center">
              <ShieldIcon />
              <span className="mt-2 text-sm font-medium text-gray-700">ضمان ٣ سنوات</span>
            </div>
            <div className="flex flex-col items-center">
              <ShieldIcon />
              <span className="mt-2 text-sm font-medium text-gray-700">استبدال خلال ١٤ يوم</span>
            </div>
            <div className="flex flex-col items-center">
              <ShieldIcon />
              <span className="mt-2 text-sm font-medium text-gray-700">شحن سريع</span>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Features Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🔍 شوف المميزات بعينك
            </h2>
            <p className="text-lg text-gray-600">
              صور وفيديوهات حقيقية تُظهر قوة وجودة المنتج
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Night Vision */}
            <div className="bg-gray-50 rounded-2xl p-6 text-center">
              <div className="relative mb-4">
                <Image
                  src="/images/night-sun.jpg"
                  alt="رؤية ليلية ونهارية واضحة"
                  width={400}
                  height={300}
                  className="rounded-xl shadow-lg mx-auto"
                  loading="lazy"
                  quality={90}
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                🌙 رؤية ليلية فائقة الوضوح
              </h3>
              <p className="text-gray-600">
                شوف كل التفاصيل حتى في الظلام الكامل
              </p>
            </div>

            {/* Clear Shot */}
            <div className="bg-gray-50 rounded-2xl p-6 text-center">
              <div className="relative mb-4">
                <Image
                  src="/images/clear-shot.jpg"
                  alt="صورة واضحة عالية الجودة"
                  width={400}
                  height={300}
                  className="rounded-xl shadow-lg mx-auto"
                  loading="lazy"
                  quality={90}
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                📸 صورة HD فائقة الوضوح
              </h3>
              <p className="text-gray-600">
                جودة صورة مذهلة تُظهر أدق التفاصيل
              </p>
            </div>

            {/* Video Recording */}
            <div className="bg-gray-50 rounded-2xl p-6 text-center">
              <div className="relative mb-4">
                <Image
                  src="/images/video-record.jpg"
                  alt="تسجيل فيديو تلقائي"
                  width={400}
                  height={300}
                  className="rounded-xl shadow-lg mx-auto"
                  loading="lazy"
                  quality={90}
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                🎥 تسجيل تلقائي ذكي
              </h3>
              <p className="text-gray-600">
                يُسجل كل حركة ويُرسلها لموبايلك فوراً
              </p>
            </div>

            {/* Face & Voice Detection */}
            <div className="bg-gray-50 rounded-2xl p-6 text-center">
              <div className="relative mb-4">
                <Image
                  src="/images/face-voice.jpg"
                  alt="التعرف على الوجه والصوت"
                  width={400}
                  height={300}
                  className="rounded-xl shadow-lg mx-auto"
                  loading="lazy"
                  quality={90}
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                👤 تفاعل صوتي ثنائي الاتجاه
              </h3>
              <p className="text-gray-600">
                كلم الضيوف واسمعهم من أي مكان في العالم
              </p>
            </div>

            {/* Built-in Battery */}
            <div className="bg-gray-50 rounded-2xl p-6 text-center">
              <div className="relative mb-4">
                <Image
                  src="/images/built-in-bettary.jpg"
                  alt="بطارية مدمجة طويلة المدى"
                  width={400}
                  height={300}
                  className="rounded-xl shadow-lg mx-auto"
                  loading="lazy"
                  quality={90}
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                🔋 بطارية قوية ومتينة
              </h3>
              <p className="text-gray-600">
                يعمل لفترات طويلة بدون الحاجة لكهرباء
              </p>
            </div>

            {/* All Functions */}
            <div className="bg-gray-50 rounded-2xl p-6 text-center">
              <div className="relative mb-4">
                <Image
                  src="/images/all-functions.jpg"
                  alt="جميع المميزات في جهاز واحد"
                  width={400}
                  height={300}
                  className="rounded-xl shadow-lg mx-auto"
                  loading="lazy"
                  quality={90}
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                ⚙️ تركيب سهل بدون أسلاك
              </h3>
              <p className="text-gray-600">
                تركيب فوري بدون حاجة لأسلاك أو تمديدات
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="section-padding bg-gradient-to-br from-blue-900 to-navy text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-right rtl">
            💰 وفر آلاف الجنيهات واحصل على حلول متكاملة
          </h2>
          <p className="text-xl mb-12 opacity-90">
            جرس ذكي واحد = كاميرا مراقبة + تكتافون + نظام إنذار
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Security Camera Alternative */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="text-5xl mb-4">📹</div>
              <h3 className="text-2xl font-bold mb-3">كاميرا مراقبة</h3>
              <div className="text-3xl font-bold text-red-400 mb-2">3000+ جنيه</div>
              <ul className="text-right space-y-2 text-white/80 rtl">
                <li>✓ تسجيل الفيديو</li>
                <li>✓ رؤية ليلية</li>
                <li>✓ التطبيق على الموبايل</li>
                <li>✗ بدون صوت ثنائي الاتجاه</li>
                <li>✗ تركيب معقد ومكلف</li>
              </ul>
            </div>

            {/* Intercom Alternative */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="text-5xl mb-4">📞</div>
              <h3 className="text-2xl font-bold mb-3">تكتافون</h3>
              <div className="text-3xl font-bold text-red-400 mb-2">2500+ جنيه</div>
              <ul className="text-right space-y-2 text-white/80 rtl">
                <li>✓ تواصل صوتي</li>
                <li>✓ فتح الباب</li>
                <li>✗ بدون كاميرا HD</li>
                <li>✗ بدون تطبيق موبايل</li>
                <li>✗ تمديدات وأسلاك</li>
              </ul>
            </div>

            {/* Our Smart Doorbell */}
            <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl p-8 border-4 border-yellow-400 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold text-sm">الأفضل</span>
              </div>
              <div className="text-5xl mb-4">🛡️</div>
              <h3 className="text-2xl font-bold mb-3">جرسنا الذكي</h3>
              <div className="text-3xl font-bold text-white mb-2">1999 جنيه فقط</div>
              <ul className="text-right space-y-2 text-white rtl">
                <li>✅ كاميرا HD + رؤية ليلية</li>
                <li>✅ صوت ثنائي الاتجاه</li>
                <li>✅ تطبيق موبايل متطور</li>
                <li>✅ تركيب فوري بدون أسلاك</li>
                <li>✅ بطارية طويلة المدى</li>
                <li>✅ ضمان 3 سنوات</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-400 text-black rounded-2xl p-6 inline-block">
            <div className="text-2xl font-bold mb-2">💵 توفير إجمالي: 3500+ جنيه</div>
            <p className="text-lg">احصل على 3 أجهزة في جهاز واحد بسعر لا يُصدق!</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16 mobile-padding-responsive">
            <h2 className="mobile-heading-responsive font-bold text-gray-900 mb-3 sm:mb-4">
              ⚡ مميزات تقنية متقدمة
            </h2>
            <p className="mobile-text-responsive text-gray-600 max-w-3xl mx-auto">
              تقنية احترافية بسعر في متناول الجميع
            </p>
          </div>

          <div className="mobile-grid">
            <FeatureCard
              number={1}
              title="كاميرا HD بزاوية واسعة 80°"
              description="صورة واضحة نهارًا وليلًا مع زاوية رؤية واسعة تغطي كامل المدخل"
              icon={<CameraIcon />}
            />
            <FeatureCard
              number={2}
              title="اتصال Wi-Fi ذكي بدون أسلاك"
              description="إشعار فوري عند الضغط على الجرس مباشرة على موبايلك"
              icon={<WifiIcon />}
            />
            <FeatureCard
              number={3}
              title="رؤية ليلية بالأشعة تحت الحمراء"
              description="وضوح كامل في الظلام برؤية ليلية متقدمة"
              icon={<NightVisionIcon />}
            />
            <FeatureCard
              number={4}
              title="اتصال صوتي ثنائي الاتجاه + تغيير الصوت"
              description="مايك نقي مع فلتر ضوضاء وإمكانية تغيير الصوت"
              icon={<MicrophoneIcon />}
            />
            <FeatureCard
              number={5}
              title="تصوير تلقائي وإشعار لحظي"
              description="لقطة تُرسل لموبايلك فورًا عند رنين الجرس"
              icon={<CameraIcon />}
            />
            <FeatureCard
              number={6}
              title="تحكم كامل من التطبيق"
              description="Android و iOS (فتح الكاميرا/الرد/التصوير)"
              icon={<PhoneIcon />}
            />
            <FeatureCard
              number={7}
              title="كشف حركة + إنذار PIR"
              description="تنبيه عند أي حركة غريبة حول بابك"
              icon={<MotionIcon />}
            />
            <FeatureCard
              number={8}
              title="مقاوم للعوامل الجوية"
              description="يعمل في المطر والحر والبرد بكفاءة عالية"
              icon={<WeatherIcon />}
            />
            <FeatureCard
              number={9}
              title="تشغيل بالبطاريات"
              description="تركيب سهل بدون تمديدات كهربائية معقدة"
              icon={<BatteryIcon />}
            />
            <FeatureCard
              number={10}
              title="تركيب فوري بدون أسلاك"
              description="تركيب سهل في دقائق بدون حاجة لأسلاك أو تمديدات كهربائية معقدة"
              icon={<ShareIcon />}
            />
          </div>
        </div>
      </section>



      {/* Specifications Section */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🔧 مواصفات احترافية بسعر مناسب
            </h2>
            <p className="text-lg text-gray-600">
              جودة ومميزات لا تحصل عليها بهذا السعر في مكان آخر
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Specifications Table */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">المواصفات</h3>
              <div className="space-y-4">
                {[
                  ['الرؤية', 'HD بعدسة 80°'],
                  ['الرؤية الليلية', 'Infrared تلقائي'],
                  ['الاتصال', 'Wi-Fi'],
                  ['التحكم', 'تطبيق Android / iOS'],
                  ['الصوت', 'ثنائي الاتجاه + تغيير الصوت'],
                  ['البطارية', 'تعمل بالبطاريات (غير مرفقة)'],
                  ['الطقس', 'مقاوم للماء والظروف الجوية'],
                  ['الوزن', '~90 جم'],
                  ['الحجم', '7.2 × 4.5 سم']
                ].map(([spec, value], index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                    <span className="font-medium text-gray-900">{spec}</span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What's in the Box */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">محتويات العلبة</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'جرس بالكاميرا',
                  'كُتيب تعليمات',
                  'أداة تركيب',
                  'وحدة Dingdong'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-navy rounded-full"></div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold text-green-800">تركيب سهل</span>
                </div>
                <p className="text-green-700 text-sm">
                  جميع الأدوات مرفقة مع دليل تركيب مصور خطوة بخطوة
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dimensions Section */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              📏 المقاسات والأبعاد
            </h2>
            <p className="text-lg text-gray-600">
              حجم مثالي يناسب جميع الأبواب - مضغوط وأنيق
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 text-center">
            <div className="relative mb-8">
              <Image
                src="/images/dimention.avif"
                alt="مقاسات وأبعاد جرس الباب الذكي"
                width={600}
                height={400}
                className="rounded-xl shadow-lg mx-auto max-w-full h-auto"
                loading="lazy"
                quality={90}
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">الأبعاد</h3>
                <div className="space-y-2 text-gray-700">
                  <p><span className="font-medium">الطول:</span> 7.2 سم</p>
                  <p><span className="font-medium">العرض:</span> 4.5 سم</p>
                  <p><span className="font-medium">الوزن:</span> ~90 جرام</p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">مناسب لـ</h3>
                <div className="space-y-2 text-gray-700">
                  <p>✅ جميع أنواع الأبواب</p>
                  <p>✅ التركيب الداخلي والخارجي</p>
                  <p>✅ حجم مضغوط وأنيق</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              📸 شوف الجودة بعينك
            </h2>
            <p className="text-lg text-gray-600">
              <strong>صور حقيقية</strong> تثبت لك جودة المنتج والتقنية المتطورة
            </p>
          </div>
          <Gallery images={galleryImages} />
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection faqs={faqs} />

      {/* Reviews Section */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              💬 عملاء سعداء وآمنون
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-7 h-7 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-xl font-bold text-gray-700 mr-2">4.8/5 ⭐</span>
            </div>
            <p className="text-lg text-green-600 font-semibold">+127 عائلة محمية وسعيدة بالنتيجة</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'أحمد محمد',
                city: 'القاهرة',
                rating: 5,
                comment: '💚 راحة البال اللي كنت محتاجها! دلوقتي مطمئن على بيتي وولادي حتى وأنا بره. أفضل استثمار عملته!'
              },
              {
                name: 'فاطمة علي',
                city: 'الاسكندرية',
                rating: 5,
                comment: '😍 مش مصدقة كده! بشوف اللي على الباب بوضوح حتى في الضلمة. أطفالي في أمان تام دلوقتي.'
              },
              {
                name: 'محمود حسن',
                city: 'الجيزة',
                rating: 5,
                comment: '⚡ جودة ممتازة بسعر مفيش أحسن منه! الدفع عند الاستلام خلاني مطمئن. شكراً ليكم!'
              }
            ].map((review, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">{review.comment}</p>
                <div className="border-t border-gray-100 pt-4">
                  <div className="font-semibold text-gray-900">{review.name}</div>
                  <div className="text-sm text-gray-600">{review.city}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding bg-gradient-to-br from-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            ⏰ <span className="text-yellow-300">آخر فرصة!</span> احمي عائلتك قبل فوات الأوان
          </h2>
          <p className="text-xl mb-8 opacity-95">
            <strong>127 عائلة</strong> أصبحت في أمان تام... 
            <span className="text-yellow-300">متى دورك؟</span> 💔
          </p>
          
          <div className="bg-white/10 rounded-xl p-6 mb-8 backdrop-blur">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="text-3xl font-bold">🔥 {PRICE} جنيه</span>
              <span className="text-xl line-through opacity-75">{ORIGINAL_PRICE} جنيه</span>
            </div>
            <p className="text-lg">
              <strong>وفر 701 جنيه اليوم فقط!</strong> + الدفع عند الاستلام + ضمان 3 سنوات
            </p>
          </div>
          
          <button 
            onClick={scrollToOrderForm}
            className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-5 px-12 rounded-xl text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl animate-pulse"
          >
            🛡️ احجز الآن - محدود! 
          </button>
          
          <p className="text-sm mt-4 opacity-90">
            ✅ تركيب مجاني | ✅ شحن مدعوم | ✅ دعم 24/7
          </p>
        </div>
      </section>

      {/* Order Form Section */}
      <section id="order-form" className="section-padding bg-white">
        <div className="max-w-4xl mx-auto">
          <OrderForm productName={PRODUCT_NAME} price={PRICE} />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h3 className="text-3xl font-bold mb-3 text-white">🛡️ Dorebell</h3>
                <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                  الرائدون في تقنيات الأمان المنزلي الذكي في مصر والشرق الأوسط. 
                  <span className="text-green-400 font-semibold">أمانك وراحة بالك هي مسؤوليتنا</span>
                </p>
              </div>
              
              {/* Trust Indicators */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-400">127+</div>
                  <div className="text-sm text-gray-400">عائلة آمنة</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400">4.8/5</div>
                  <div className="text-sm text-gray-400">تقييم العملاء</div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">🔗 روابط سريعة</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2">
                    <span>🏠</span> الرئيسية
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2">
                    <span>📞</span> تواصل معنا
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2">
                    <span>🔒</span> سياسة الخصوصية
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2">
                    <span>📋</span> شروط الاستخدام
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">🎯 خدمة العملاء</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  الدفع عند الاستلام
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  ضمان ٣ سنوات شامل
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  استبدال خلال ١٤ يوم
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  شحن مدعوم (50 جنيه مخصومة بعد التأكيد)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  دعم فني 24/7
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="border-t border-gray-800 pt-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-right">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-xl">📱</span>
                </div>
                <div>
                  <div className="font-semibold text-white">اتصل بنا</div>
                  <div className="text-gray-300 direction-ltr">+20 120 523 4797</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-xl">📧</span>
                </div>
                <div>
                  <div className="font-semibold text-white">البريد الإلكتروني</div>
                  <div className="text-gray-300">support@dorebell.com</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-xl">⏰</span>
                </div>
                <div>
                  <div className="font-semibold text-white">ساعات العمل</div>
                  <div className="text-gray-300">السبت - الخميس (9ص - 6م)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
              <div className="mb-4 md:mb-0">
                <p>&copy; 2024 Dorebell. جميع الحقوق محفوظة.</p>
                <p className="mt-1">صُنع بـ 💚 في مصر</p>
              </div>
              
              <div className="flex items-center gap-6">
                <span className="text-xs bg-gray-800 px-3 py-1 rounded-full">🔒 موقع آمن ومشفر</span>
                <span className="text-xs bg-gray-800 px-3 py-1 rounded-full">✅ معتمد ومضمون</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile Bar */}
      {showStickyBar && (
        <StickyBar
          price={PRICE}
          originalPrice={ORIGINAL_PRICE}
          onOrderClick={scrollToOrderForm}
        />
      )}
    </div>
  )
}
