'use client'

import { useState } from 'react'

interface TestResult {
  success: boolean
  message: string
  timestamp?: string
}

export default function MakeIntegrationPanel() {
  const [isTestingConnection, setIsTestingConnection] = useState(false)
  const [isTestingContact, setIsTestingContact] = useState(false)
  const [isTestingOrder, setIsTestingOrder] = useState(false)
  const [connectionResult, setConnectionResult] = useState<TestResult | null>(null)
  const [contactResult, setContactResult] = useState<TestResult | null>(null)
  const [orderResult, setOrderResult] = useState<TestResult | null>(null)

  // Test Make.com connection
  const testConnection = async () => {
    setIsTestingConnection(true)
    setConnectionResult(null)

    try {
      const response = await fetch('/api/test-make')
      const result = await response.json()
      setConnectionResult(result)
    } catch (error) {
      setConnectionResult({
        success: false,
        message: 'فشل في الاتصال مع الخادم'
      })
    } finally {
      setIsTestingConnection(false)
    }
  }

  // Test contact webhook
  const testContactWebhook = async () => {
    setIsTestingContact(true)
    setContactResult(null)

    try {
      const response = await fetch('/api/test-make', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'contact',
          data: {
            name: 'أحمد اختبار',
            email: 'test@dorebell.com',
            phone: '01234567890',
            message: 'رسالة اختبار من لوحة التحكم'
          }
        })
      })
      const result = await response.json()
      setContactResult(result)
    } catch (error) {
      setContactResult({
        success: false,
        message: 'فشل في إرسال اختبار نموذج الاتصال'
      })
    } finally {
      setIsTestingContact(false)
    }
  }

  // Test order webhook
  const testOrderWebhook = async () => {
    setIsTestingOrder(true)
    setOrderResult(null)

    try {
      const response = await fetch('/api/test-make', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'order',
          data: {
            name: 'أحمد اختبار',
            phone: '01234567890',
            city: 'القاهرة',
            address: 'عنوان اختبار',
            quantity: 1,
            totalPrice: 999
          }
        })
      })
      const result = await response.json()
      setOrderResult(result)
    } catch (error) {
      setOrderResult({
        success: false,
        message: 'فشل في إرسال اختبار الطلب'
      })
    } finally {
      setIsTestingOrder(false)
    }
  }

  const ResultCard = ({ result, title }: { result: TestResult | null, title: string }) => {
    if (!result) return null

    return (
      <div className={`mt-4 p-4 rounded-lg border ${
        result.success 
          ? 'bg-green-50 border-green-200 text-green-800' 
          : 'bg-red-50 border-red-200 text-red-800'
      }`}>
        <div className="flex items-center">
          <span className="text-lg ml-2">
            {result.success ? '✅' : '❌'}
          </span>
          <div>
            <h4 className="font-semibold">{title}</h4>
            <p className="text-sm">{result.message}</p>
            {result.timestamp && (
              <p className="text-xs mt-1 opacity-70">
                {new Date(result.timestamp).toLocaleString('ar-EG')}
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          🔗 لوحة تحكم Make.com
        </h2>
        <p className="text-gray-600">
          اختبار وإدارة التكامل مع منصة Make.com لأتمتة العمليات
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Connection Test */}
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h3 className="text-xl font-semibold text-blue-900 mb-4">
            🔧 اختبار الاتصال
          </h3>
          <p className="text-blue-700 mb-4 text-sm">
            تحقق من حالة الاتصال مع webhooks الخاصة بـ Make.com
          </p>
          <button
            onClick={testConnection}
            disabled={isTestingConnection}
            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isTestingConnection ? '🔄 جارٍ الاختبار...' : '🔍 اختبار الاتصال'}
          </button>
          <ResultCard result={connectionResult} title="نتيجة اختبار الاتصال" />
        </div>

        {/* Contact Test */}
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <h3 className="text-xl font-semibold text-green-900 mb-4">
            📝 اختبار نماذج الاتصال
          </h3>
          <p className="text-green-700 mb-4 text-sm">
            إرسال نموذج اتصال تجريبي إلى Make.com
          </p>
          <button
            onClick={testContactWebhook}
            disabled={isTestingContact}
            className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isTestingContact ? '📤 جارٍ الإرسال...' : '📨 اختبار نموذج الاتصال'}
          </button>
          <ResultCard result={contactResult} title="نتيجة اختبار نموذج الاتصال" />
        </div>

        {/* Order Test */}
        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
          <h3 className="text-xl font-semibold text-purple-900 mb-4">
            🛒 اختبار الطلبات
          </h3>
          <p className="text-purple-700 mb-4 text-sm">
            إرسال طلب شراء تجريبي إلى Make.com
          </p>
          <button
            onClick={testOrderWebhook}
            disabled={isTestingOrder}
            className="w-full bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isTestingOrder ? '🛍️ جارٍ الإرسال...' : '🛒 اختبار طلب شراء'}
          </button>
          <ResultCard result={orderResult} title="نتيجة اختبار الطلب" />
        </div>
      </div>

      <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          📋 تعليمات سريعة
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <h4 className="font-semibold mb-2">🔧 إعداد المتغيرات:</h4>
            <ul className="space-y-1">
              <li>• MAKE_CONTACT_WEBHOOK_URL</li>
              <li>• MAKE_ORDER_WEBHOOK_URL</li>
              <li>• ENABLE_WEBHOOKS=true</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">📚 روابط مفيدة:</h4>
            <ul className="space-y-1">
              <li>• <a href="/MAKE_INTEGRATION_GUIDE.md" className="text-blue-600 hover:underline">دليل التكامل الكامل</a></li>
              <li>• <a href="https://make.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">موقع Make.com</a></li>
              <li>• <a href="/api/test-make" className="text-blue-600 hover:underline">API للاختبار</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        💡 تأكد من إعداد متغيرات البيئة في ملف .env.local قبل الاختبار
      </div>
    </div>
  )
}
