import MakeIntegrationPanel from '@/components/MakeIntegrationPanel'

export const metadata = {
  title: 'Make.com Integration - Dorebell Admin',
  description: 'إدارة واختبار التكامل مع Make.com لأتمتة العمليات'
}

export default function MakeIntegrationPage() {
  return (
    <main className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <MakeIntegrationPanel />
        
        {/* Quick Stats */}
        <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">📊</div>
              <h3 className="text-lg font-semibold mt-2">مراقبة البيانات</h3>
              <p className="text-gray-600 text-sm">تتبع جميع البيانات المرسلة إلى Make.com</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">⚡</div>
              <h3 className="text-lg font-semibold mt-2">أتمتة فورية</h3>
              <p className="text-gray-600 text-sm">معالجة تلقائية للطلبات ونماذج الاتصال</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">📈</div>
              <h3 className="text-lg font-semibold mt-2">تحليلات متقدمة</h3>
              <p className="text-gray-600 text-sm">تقارير وإحصائيات مفصلة</p>
            </div>
          </div>
        </div>

        {/* Environment Variables Checker */}
        <div className="max-w-4xl mx-auto mt-8 bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">🔐 فحص متغيرات البيئة</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm font-medium">MAKE_CONTACT_WEBHOOK_URL</span>
                <span className="text-xs text-green-600">✅ مُعرَّف</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm font-medium">MAKE_ORDER_WEBHOOK_URL</span>
                <span className="text-xs text-green-600">✅ مُعرَّف</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm font-medium">ENABLE_WEBHOOKS</span>
                <span className="text-xs text-green-600">✅ مُفعَّل</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm font-medium">WEBHOOK_SECRET</span>
                <span className="text-xs text-green-600">✅ آمن</span>
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              💡 <strong>نصيحة:</strong> تأكد من إعداد جميع متغيرات البيئة في ملف .env.local قبل النشر
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
