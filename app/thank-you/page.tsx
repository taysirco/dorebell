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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          {/* Success Animation */}
          <div className="relative mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-bounce-slow">
              <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            {/* Confetti Effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl animate-pulse">🎉</div>
            </div>
          </div>

          {/* Success Message */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              🎊 مبروك! تم تأكيد طلبك بنجاح
            </h1>
            
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 mb-6 border border-green-200">
              <p className="text-xl text-gray-700 mb-3">
                شكراً لثقتك بنا <span className="font-bold text-green-600">{orderData?.customerName || 'عزيزنا العميل'}</span>! 
              </p>
              <p className="text-lg text-gray-600">
                طلبك الآن قيد المعالجة الفورية وسيتم التواصل معك خلال <span className="font-bold text-blue-600">30 دقيقة</span> لتأكيد التوصيل 📞
              </p>
            </div>

            {orderData?.orderId && (
              <div className="bg-white rounded-2xl shadow-xl p-8 inline-block border-t-4 border-green-500">
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-2">🔢 رقم الطلب الخاص بك</p>
                  <p className="text-3xl font-bold text-navy font-mono tracking-wider bg-gray-50 px-4 py-2 rounded-lg">
                    {orderData.orderId}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">احتفظ بهذا الرقم للمراجعة</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Order Details */}
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-8 border border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              📋 تفاصيل الطلب
            </h2>
            
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 flex items-center gap-2">
                    📱 المنتج
                  </span>
                  <span className="font-semibold text-navy">جرس الباب الذكي بالكاميرا</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 flex items-center gap-2">
                    📦 الكمية
                  </span>
                  <span className="font-semibold">{orderData?.quantity || '1'} قطعة</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 flex items-center gap-2">
                    💳 طريقة الدفع
                  </span>
                  <span className="font-semibold text-green-600">الدفع عند الاستلام ✅</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg p-4 text-center">
                <div className="text-sm opacity-90 mb-1">المجموع الكلي</div>
                <div className="text-3xl font-bold">{orderData?.totalPrice || '1999'} جنيه</div>
                <div className="text-sm opacity-90 mt-1">🚚 + شحن مخصوم</div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl shadow-xl p-8 border border-green-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              🎯 ماذا سيحدث الآن؟
            </h2>
            
            <div className="space-y-5">
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-blue-100">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-white font-bold">1</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg">📞 اتصال فوري للتأكيد</h3>
                  <p className="text-gray-600 mt-1">سيتواصل معك فريقنا خلال <span className="font-semibold text-blue-600">30 دقيقة</span> لتأكيد الطلب ومراجعة العنوان</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      ⏰ عاجل
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-orange-100">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-white font-bold">2</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg">📦 تحضير وتغليف احترافي</h3>
                  <p className="text-gray-600 mt-1">سيتم تحضير طلبك بعناية فائقة وتغليفه بأمان للحفاظ على المنتج</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      🔒 آمن ومحمي
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-green-100">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-white font-bold">3</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg">🚚 توصيل سريع مدعوم</h3>
                  <p className="text-gray-600 mt-1">التوصيل خلال <span className="font-semibold text-green-600">2-3 أيام عمل</span> - <span className="font-bold text-blue-600">رسوم الشحن مخصومة من الفاتورة</span></p>
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
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 mb-8">
          <h2 className="text-xl font-semibold text-blue-900 mb-4 flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            معلومات مهمة
          </h2>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>احتفظ برقم الطلب للمراجعة والاستفسارات</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>تأكد من صحة رقم الهاتف لضمان التواصل</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>فحص المنتج مسموح عند الاستلام قبل الدفع</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>ضمان 3 سنوات واستبدال خلال 14 يوم</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          <Link 
            href="/contact"
            className="bg-navy hover:bg-navy/90 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            💬 تواصل للدعم الفني
          </Link>
          
          <Link 
            href="/"
            className="btn-primary py-4 px-6 text-center"
          >
            🏠 العودة للرئيسية
          </Link>
        </div>

        {/* Thank You Message */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            🙏 شكراً لثقتك بنا
          </h2>
          <p className="text-gray-600 mb-6">
            أنت الآن جزء من <strong>عائلة آمنة</strong> تستخدم أحدث تقنيات الحماية
          </p>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 font-semibold">
              💚 راحة البال أصبحت حقيقة الآن
            </p>
            <p className="text-sm text-green-600 mt-1">
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
