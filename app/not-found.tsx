import React from 'react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-6">
        <div className="text-center">
          {/* 404 Icon */}
          <div className="w-24 h-24 bg-navy/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-12 h-12 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-navy mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              الصفحة غير موجودة
            </h2>
            <p className="text-gray-600 leading-relaxed">
              عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى مكان آخر.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link 
              href="/"
              className="btn-primary w-full inline-block text-center py-4"
            >
              العودة للرئيسية
            </Link>
            
            <Link 
              href="/contact"
              className="btn-secondary w-full inline-block text-center py-4"
            >
              تواصل معنا
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              روابط مفيدة
            </h3>
            <div className="grid grid-cols-1 gap-3 text-sm">
              <Link 
                href="/#features"
                className="text-navy hover:text-navy/80 transition-colors"
              >
                مميزات المنتج
              </Link>
              <Link 
                href="/#faq"
                className="text-navy hover:text-navy/80 transition-colors"
              >
                الأسئلة الشائعة
              </Link>
              <Link 
                href="/privacy"
                className="text-navy hover:text-navy/80 transition-colors"
              >
                سياسة الخصوصية
              </Link>
              <Link 
                href="/terms"
                className="text-navy hover:text-navy/80 transition-colors"
              >
                شروط الاستخدام
              </Link>
            </div>
          </div>

          {/* Brand Logo */}
          <div className="mt-12">
            <Link href="/" className="inline-block">
              <h1 className="text-2xl font-bold text-navy">Dorebell</h1>
              <p className="text-sm text-gray-500 mt-1">جرس الباب الذكي</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
