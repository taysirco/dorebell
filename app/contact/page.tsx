'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'

// Note: metadata can only be exported from Server Components
const metadata = {
  title: 'تواصل معنا - Dorebell',
  description: 'تواصل مع فريق دعم العملاء في Dorebell للمساعدة والاستفسارات',
  robots: 'index, follow',
}

interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  orderNumber: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    orderNumber: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Convert Arabic numbers to English numbers
  const convertArabicToEnglish = (str: string): string => {
    const arabicNumbers = '٠١٢٣٤٥٦٧٨٩'
    const englishNumbers = '0123456789'
    
    return str.replace(/[٠-٩]/g, (match) => {
      const index = arabicNumbers.indexOf(match)
      return englishNumbers[index]
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    let processedValue = value
    
    // Convert Arabic numbers to English for phone number fields
    if (name === 'phone') {
      processedValue = convertArabicToEnglish(value)
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString()
        }),
      })

      if (response.ok) {
        setSubmitSuccess(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          orderNumber: ''
        })
      } else {
        throw new Error('فشل في إرسال الرسالة')
      }
    } catch (error) {
      console.error('Contact form error:', error)
      alert('حدث خطأ في إرسال الرسالة. الرجاء المحاولة مرة أخرى.')
    } finally {
      setIsSubmitting(false)
    }
  }



  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gray-50">
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

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              تم إرسال رسالتك بنجاح!
            </h2>
            <p className="text-gray-600 mb-8">
              شكراً لتواصلك معنا. سيقوم فريقنا بالرد عليك خلال 24 ساعة.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="btn-primary">
                العودة للرئيسية
              </Link>
              <button onClick={() => setSubmitSuccess(false)} className="btn-secondary">
                إرسال رسالة أخرى
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
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

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            تواصل معنا
          </h1>
          <p className="text-xl text-gray-600">
            نحن هنا لمساعدتك! تواصل معنا لأي استفسارات أو مساعدة
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              أرسل لنا رسالة
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    الاسم الكامل *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="ادخل اسمك"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    رقم الهاتف *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="01xxxxxxxxx (الأرقام العربية تُحول تلقائياً)"
                    dir="ltr"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="example@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  موضوع الرسالة *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                >
                  <option value="">اختر الموضوع</option>
                  <option value="استفسار عن المنتج">استفسار عن المنتج</option>
                  <option value="مشكلة في الطلب">مشكلة في الطلب</option>
                  <option value="دعم تقني">دعم تقني</option>
                  <option value="استبدال أو إرجاع">استبدال أو إرجاع</option>
                  <option value="شكوى">شكوى</option>
                  <option value="أخرى">أخرى</option>
                </select>
              </div>

              <div>
                <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  رقم الطلب (إن وُجد)
                </label>
                <input
                  type="text"
                  id="orderNumber"
                  name="orderNumber"
                  value={formData.orderNumber}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="ORDER_xxxxxxxxx"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  الرسالة *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="input-field"
                  placeholder="اكتب رسالتك هنا..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full btn-primary text-lg py-4 ${isSubmitting ? 'loading' : ''}`}
              >
                {isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Quick Contact */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                تواصل سريع
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.479 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                      <path d="M11.893 5.5c2.998 0 5.434 2.436 5.434 5.434s-2.436 5.434-5.434 5.434-5.434-2.436-5.434-5.434 2.436-5.434 5.434-5.434z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">واتساب</h3>
                    <p className="text-gray-600">رد فوري على استفساراتك</p>
                    <span className="text-green-600 font-medium mt-1">
                      +20 120 523 4797
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">البريد الإلكتروني</h3>
                    <p className="text-gray-600">support@dorebell.com</p>
                    <p className="text-sm text-gray-500">رد خلال 24 ساعة</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">ساعات العمل</h3>
                    <p className="text-gray-600">السبت - الخميس</p>
                    <p className="text-gray-600">9:00 ص - 6:00 م</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-blue-800 font-medium">
                    📞 اتصل بنا مباشرة: +20 120 523 4797
                  </p>
                  <p className="text-sm text-blue-600 mt-1">
                    متاحون من السبت للخميس (9 ص - 6 م)
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Quick Links */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                أسئلة شائعة
              </h2>
              
              <div className="space-y-4">
                <Link 
                  href="/#faq"
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <h3 className="font-medium text-gray-900">هل يحتاج كهرباء؟</h3>
                  <p className="text-sm text-gray-600">يعمل بالبطاريات (غير مرفقة)</p>
                </Link>
                
                <Link 
                  href="/#faq"
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <h3 className="font-medium text-gray-900">ما هي مدة الضمان؟</h3>
                  <p className="text-sm text-gray-600">ضمان ٣ سنوات شامل</p>
                </Link>
                
                <Link 
                  href="/#faq"
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <h3 className="font-medium text-gray-900">كيف يتم التركيب؟</h3>
                  <p className="text-sm text-gray-600">تركيب سهل مع دليل مصور</p>
                </Link>
              </div>

              <div className="mt-6">
                <Link 
                  href="/#faq"
                  className="text-navy hover:text-navy/80 font-medium"
                >
                  عرض جميع الأسئلة الشائعة ←
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
