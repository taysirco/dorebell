'use client'

import React, { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

function ThankYouContent() {
  const searchParams = useSearchParams()
  const [orderData, setOrderData] = useState<any>(null)

  useEffect(() => {
    // Get order data from URL params or localStorage
    const orderId = searchParams.get('orderId')
    const customerName = searchParams.get('name')
    const totalPrice = searchParams.get('total')
    
    if (orderId) {
      setOrderData({
        orderId,
        customerName: customerName || 'عزيزنا العميل',
        totalPrice: totalPrice || '1999'
      })
    }

    // Fire analytics event for successful order
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ 
        event: 'purchase_completed',
        transaction_id: orderId,
        value: totalPrice || '1999',
        currency: 'EGP'
      })
    }

    // TikTok Conversion Tracking
    if (typeof window !== 'undefined' && (window as any).ttq && orderId) {
      (window as any).ttq.track('CompletePayment', {
        content_type: 'product',
        content_id: 'doorbell-smart-camera',
        content_name: 'جرس الباب الذكي بالكاميرا',
        value: parseFloat(totalPrice || '1999'),
        currency: 'EGP',
        order_id: orderId,
        description: 'Purchase completed - Conversion tracked'
      })
    }

    // Meta Pixel Purchase Tracking
    if (typeof window !== 'undefined' && (window as any).fbq && orderId) {
      (window as any).fbq('track', 'Purchase', {
        content_type: 'product',
        content_ids: ['doorbell-smart-camera'],
        content_name: 'جرس الباب الذكي بالكاميرا',
        value: parseFloat(totalPrice || '1999'),
        currency: 'EGP',
        num_items: 1
      })
    }
  }, [searchParams])



  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-navy">Dorebell</h1>
            </Link>
            <Link 
              href="/"
              className="text-navy hover:text-navy/80 font-medium transition-colors"
            >
              العودة للرئيسية
            </Link>
          </div>
        </div>
      </header>

      {/* Success Content */}
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          {/* Success Animation */}
          <div className="relative mb-6 sm:mb-8">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-bounce-slow">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            {/* Confetti Effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl sm:text-6xl animate-pulse">🎉</div>
            </div>
          </div>

          {/* Success Message */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight px-2">
              🎊 مبروك! تم تأكيد طلبك بنجاح
            </h1>
            
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border border-green-200 mx-2 sm:mx-0">
              <p className="text-lg sm:text-xl text-gray-700 mb-2 sm:mb-3">
                شكراً لثقتك بنا <span className="font-bold text-green-600">{orderData?.customerName || 'عزيزنا العميل'}</span>! 
              </p>
              <p className="text-base sm:text-lg text-gray-600">
                طلبك الآن قيد المعالجة الفورية وسيتم التواصل معك خلال <span className="font-bold text-blue-600">30 دقيقة</span> لتأكيد التوصيل 📞
              </p>
            </div>

            {orderData?.orderId && (
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-8 inline-block border-t-4 border-green-500 mx-2 sm:mx-0 w-full sm:w-auto max-w-sm">
                <div className="text-center">
                  <p className="text-xs sm:text-sm text-gray-500 mb-2">🔢 رقم الطلب الخاص بك</p>
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-2">
                    <p className="text-2xl sm:text-3xl font-bold text-navy font-mono tracking-wider break-all select-all">
                      {orderData.orderId}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500">📱 اضغط لتحديد الرقم</p>
                  <button 
                    onClick={() => {
                      navigator.clipboard?.writeText(orderData.orderId);
                      // Show success feedback
                      const button = document.createElement('div');
                      button.textContent = '✅ تم النسخ';
                      button.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg z-50';
                      document.body.appendChild(button);
                      setTimeout(() => button.remove(), 2000);
                    }}
                    className="mt-2 bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm px-3 py-2 rounded-lg transition-colors"
                  >
                    📋 نسخ الرقم
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-12 px-2 sm:px-0">
          {/* Order Details */}
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-8 border border-blue-200">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
              📋 تفاصيل الطلب
            </h2>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
                <div className="flex justify-between items-center py-2 text-sm sm:text-base">
                  <span className="text-gray-600 flex items-center gap-1 sm:gap-2">
                    📱 المنتج
                  </span>
                  <span className="font-semibold text-navy text-right">جرس الباب الذكي بالكاميرا</span>
                </div>
                <div className="flex justify-between items-center py-2 text-sm sm:text-base">
                  <span className="text-gray-600 flex items-center gap-1 sm:gap-2">
                    📦 الكمية
                  </span>
                  <span className="font-semibold">{orderData?.quantity || '1'} قطعة</span>
                </div>
                <div className="flex justify-between items-center py-2 text-sm sm:text-base">
                  <span className="text-gray-600 flex items-center gap-1 sm:gap-2">
                    💳 طريقة الدفع
                  </span>
                  <span className="font-semibold text-green-600 text-right">الدفع عند الاستلام ✅</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg p-4 text-center">
                <div className="text-xs sm:text-sm opacity-90 mb-1">المجموع الكلي</div>
                <div className="text-2xl sm:text-3xl font-bold">{orderData?.totalPrice || '1999'} جنيه</div>
                <div className="text-xs sm:text-sm opacity-90 mt-1">🚚 + شحن مخصوم</div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-gradient-to-br from-white to-green-50 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-8 border border-green-200">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
              🎯 ماذا سيحدث الآن؟
            </h2>
            
            <div className="space-y-3 sm:space-y-5">
              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-xl shadow-sm border border-blue-100">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-white font-bold text-sm sm:text-base">1</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-base sm:text-lg">📞 اتصال فوري للتأكيد</h3>
                  <p className="text-gray-600 mt-1 text-sm sm:text-base leading-relaxed">سيتواصل معك فريقنا خلال <span className="font-semibold text-blue-600">30 دقيقة</span> لتأكيد الطلب ومراجعة العنوان</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      ⏰ عاجل
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-xl shadow-sm border border-orange-100">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-white font-bold text-sm sm:text-base">2</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-base sm:text-lg">📦 تحضير وتغليف احترافي</h3>
                  <p className="text-gray-600 mt-1 text-sm sm:text-base leading-relaxed">سيتم تحضير طلبك بعناية فائقة وتغليفه بأمان للحفاظ على المنتج</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      🔒 آمن ومحمي
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-xl shadow-sm border border-green-100">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-white font-bold text-sm sm:text-base">3</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-base sm:text-lg">🚚 توصيل سريع مدعوم</h3>
                  <p className="text-gray-600 mt-1 text-sm sm:text-base leading-relaxed">التوصيل خلال <span className="font-semibold text-green-600">2-3 أيام عمل</span> - <span className="font-bold text-blue-600">رسوم الشحن مخصومة من الفاتورة</span></p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      💳 الدفع عند الاستلام
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-8 mb-6 sm:mb-8 mx-2 sm:mx-0">
          <h2 className="text-lg sm:text-xl font-semibold text-blue-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            معلومات مهمة
          </h2>
          <ul className="space-y-2 text-blue-800 text-sm sm:text-base">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1 text-lg">•</span>
              <span className="leading-relaxed">احتفظ برقم الطلب للمراجعة والاستفسارات</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1 text-lg">•</span>
              <span className="leading-relaxed">تأكد من صحة رقم الهاتف لضمان التواصل</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1 text-lg">•</span>
              <span className="leading-relaxed">فحص المنتج مسموح عند الاستلام قبل الدفع</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1 text-lg">•</span>
              <span className="leading-relaxed">ضمان 3 سنوات واستبدال خلال 14 يوم</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12 px-2 sm:px-0">
          <Link 
            href="/contact"
            className="bg-navy hover:bg-navy/90 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            💬 تواصل للدعم الفني
          </Link>
          
          <Link 
            href="/"
            className="btn-primary py-3 sm:py-4 px-4 sm:px-6 text-center text-sm sm:text-base"
          >
            🏠 العودة للرئيسية
          </Link>
        </div>

        {/* Thank You Message */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 text-center mx-2 sm:mx-0">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
            🙏 شكراً لثقتك بنا
          </h2>
          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
            أنت الآن جزء من <strong>عائلة آمنة</strong> تستخدم أحدث تقنيات الحماية
          </p>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
            <p className="text-green-800 font-semibold text-sm sm:text-base">
              💚 راحة البال أصبحت حقيقة الآن
            </p>
            <p className="text-xs sm:text-sm text-green-600 mt-1">
              لأي استفسارات، فريق الدعم الفني متاح 24/7
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">جارٍ تحميل تفاصيل طلبك...</p>
        </div>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  )
}
