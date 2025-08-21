import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'سياسة الخصوصية - Dorebell',
  description: 'سياسة الخصوصية وحماية البيانات الشخصية في موقع Dorebell',
  robots: 'index, follow',
}

export default function PrivacyPage() {
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            سياسة الخصوصية
          </h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <p className="text-blue-800 font-medium">
                آخر تحديث: {new Date().toLocaleDateString('ar-EG')}
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">المقدمة</h2>
              <p>
                نحن في Dorebell نحترم خصوصيتك ونلتزم بحماية المعلومات الشخصية التي تشاركها معنا. 
                توضح هذه السياسة كيفية جمع واستخدام وحماية معلوماتك الشخصية عند استخدام موقعنا الإلكتروني أو خدماتنا.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">المعلومات التي نجمعها</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">المعلومات الشخصية</h3>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>الاسم الكامل</li>
                <li>رقم الهاتف المحمول</li>
                <li>رقم الواتساب</li>
                <li>العنوان الكامل (المحافظة والعنوان المفصل)</li>
                <li>عنوان البريد الإلكتروني (إن وُجد)</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">المعلومات التقنية</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>عنوان IP الخاص بك</li>
                <li>نوع المتصفح والجهاز</li>
                <li>الصفحات التي تزورها على موقعنا</li>
                <li>وقت ومدة الزيارة</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">كيف نستخدم معلوماتك</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>معالجة طلبات الشراء وتأكيد الطلبات</li>
                <li>التواصل معك بخصوص طلبك أو استفساراتك</li>
                <li>ترتيب عملية التوصيل</li>
                <li>تقديم خدمة العملاء والدعم التقني</li>
                <li>إرسال تحديثات مهمة حول منتجاتنا (بموافقتك)</li>
                <li>تحسين خدماتنا وتجربة المستخدم</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semبold text-gray-900 mb-4">مشاركة المعلومات</h2>
              <p className="mb-4">
                نحن لا نبيع أو نؤجر أو نشارك معلوماتك الشخصية مع أطراف ثالثة إلا في الحالات التالية:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>شركات الشحن والتوصيل لإتمام طلبك</li>
                <li>مقدمو الخدمات التقنية (استضافة الموقع، معالجة الدفعات)</li>
                <li>عند الطلب من الجهات القانونية المختصة</li>
                <li>لحماية حقوقنا أو حقوق الآخرين</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">أمان المعلومات</h2>
              <p>
                نتخذ تدابير أمنية متقدمة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو الاستخدام أو الكشف. 
                تشمل هذه التدابير التشفير والحماية بكلمات المرور والوصول المحدود للبيانات.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">ملفات تعريف الارتباط (Cookies)</h2>
              <p className="mb-4">
                نستخدم ملفات تعريف الارتباط لتحسين تجربتك على موقعنا. هذه الملفات تساعدنا في:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>تذكر تفضيلاتك</li>
                <li>تحليل استخدام الموقع</li>
                <li>تقديم محتوى مخصص</li>
                <li>تحسين الأداء والوظائف</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">حقوقك</h2>
              <p className="mb-4">لديك الحق في:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>الاطلاع على المعلومات التي نحتفظ بها عنك</li>
                <li>طلب تصحيح أو تحديث معلوماتك</li>
                <li>طلب حذف معلوماتك الشخصية</li>
                <li>الاعتراض على معالجة معلوماتك</li>
                <li>سحب موافقتك في أي وقت</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">الاحتفاظ بالبيانات</h2>
              <p>
                نحتفظ بمعلوماتك الشخصية للمدة اللازمة لتقديم خدماتنا أو حسب ما يتطلبه القانون. 
                عادة ما نحتفظ بمعلومات الطلبات لمدة 3 سنوات لأغراض الضمان وخدمة العملاء.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">تحديثات السياسة</h2>
              <p>
                قد نقوم بتحديث هذه السياسة من وقت لآخر. سنقوم بإشعارك بأي تغييرات مهمة عبر البريد الإلكتروني 
                أو من خلال إشعار على موقعنا الإلكتروني.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">تواصل معنا</h2>
              <p className="mb-4">
                إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه أو كيفية تعاملنا مع معلوماتك الشخصية، 
                يرجى التواصل معنا:
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <ul className="space-y-2">
                  <li><strong>البريد الإلكتروني:</strong> privacy@dorebell.com</li>
                  <li><strong>الواتساب:</strong> +20 120 523 4797</li>
                  <li><strong>العنوان:</strong> مصر</li>
                </ul>
              </div>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <Link 
              href="/"
              className="btn-primary inline-block px-8 py-3"
            >
              العودة للرئيسية
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
