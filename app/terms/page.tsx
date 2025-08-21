import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'شروط الاستخدام - Dorebell',
  description: 'شروط وأحكام استخدام موقع وخدمات Dorebell',
  robots: 'index, follow',
}

export default function TermsPage() {
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
            شروط الاستخدام
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
                مرحباً بكم في Dorebell. هذه الشروط والأحكام تحكم استخدامكم لموقعنا الإلكتروني وخدماتنا. 
                باستخدام موقعنا أو شراء منتجاتنا، فإنكم توافقون على هذه الشروط والأحكام.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">المنتجات والخدمات</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">وصف المنتج</h3>
              <p className="mb-4">
                نحن نقدم جرس الباب الذكي بالكاميرا مع جميع المواصفات المذكورة في صفحة المنتج. 
                نحرص على دقة المعلومات ولكن قد تحدث تغييرات طفيفة في التصميم أو المواصفات التقنية.
              </p>

              <h3 className="text-xl font-medium text-gray-800 mb-3">التوافر</h3>
              <p>
                جميع المنتجات عرضة للتوافر. في حالة نفاد المخزون، سنتواصل معكم لترتيب بديل أو استرداد المبلغ.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">الأسعار والدفع</h2>
              <ul className="list-disc list-inside space-y-3">
                <li>جميع الأسعار مُدرجة بالجنيه المصري وتشمل الضرائب المطبقة</li>
                <li>نحن نقبل الدفع عند الاستلام فقط</li>
                <li>الأسعار عرضة للتغيير دون إشعار مسبق</li>
                <li>لا توجد رسوم إضافية على التوصيل في معظم المحافظات</li>
                <li>قد تطبق رسوم توصيل إضافية في المناطق النائية</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">الطلب والتوصيل</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">عملية الطلب</h3>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>املأ نموذج الطلب بالمعلومات الصحيحة والكاملة</li>
                <li>سنتواصل معك خلال 24 ساعة لتأكيد الطلب</li>
                <li>يمكنك إلغاء الطلب قبل الشحن دون أي رسوم</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">التوصيل</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>مدة التوصيل: 2-5 أيام عمل حسب المحافظة</li>
                <li>التوصيل يتم خلال ساعات العمل الرسمية</li>
                <li>يجب وجود شخص بالغ لاستلام الطلب</li>
                <li>فحص المنتج مسموح عند الاستلام</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">الضمان والإرجاع</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">ضمان المنتج</h3>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>ضمان 3 سنوات ضد عيوب التصنيع</li>
                <li>الضمان لا يشمل الأضرار الناتجة عن سوء الاستخدام</li>
                <li>الضمان لا يشمل البطاريات</li>
                <li>يجب الاحتفاظ بإيصال الشراء</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">سياسة الاستبدال</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>استبدال خلال 14 يوم من تاريخ الاستلام</li>
                <li>المنتج يجب أن يكون في حالته الأصلية</li>
                <li>يجب وجود العبوة الأصلية والملحقات</li>
                <li>تكلفة الإرجاع على العميل إلا في حالة العيب</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">المسؤولية</h2>
              <p className="mb-4">
                Dorebell غير مسؤولة عن:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>الأضرار الناتجة عن سوء الاستخدام أو التركيب الخاطئ</li>
                <li>فقدان البيانات أو انقطاع الخدمة</li>
                <li>الأضرار غير المباشرة أو العرضية</li>
                <li>مشاكل شبكة الإنترنت أو Wi-Fi</li>
                <li>عدم توافق المنتج مع أجهزة أو تطبيقات معينة</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">الخصوصية والبيانات</h2>
              <p>
                استخدام موقعنا يخضع لسياسة الخصوصية الخاصة بنا. 
                يرجى مراجعة <Link href="/privacy" className="text-navy hover:underline">سياسة الخصوصية</Link> 
                للحصول على معلومات مفصلة حول كيفية جمع واستخدام بياناتكم الشخصية.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">الاستخدام المقبول</h2>
              <p className="mb-4">يُمنع استخدام موقعنا أو خدماتنا في:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>أي أنشطة غير قانونية أو ضارة</li>
                <li>انتهاك حقوق الملكية الفكرية</li>
                <li>إرسال محتوى مسيء أو مضلل</li>
                <li>محاولة اختراق أو إتلاف النظام</li>
                <li>الاستخدام التجاري دون إذن</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">القانون المطبق</h2>
              <p>
                هذه الشروط والأحكام تخضع للقانون المصري. أي نزاع ينشأ عن هذه الشروط 
                سيتم حله في المحاكم المصرية المختصة.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">تعديل الشروط</h2>
              <p>
                نحتفظ بالحق في تعديل هذه الشروط والأحكام في أي وقت. 
                التعديلات ستصبح سارية فور نشرها على الموقع. 
                استمرار استخدامكم للموقع يعني موافقتكم على الشروط المحدثة.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">التواصل</h2>
              <p className="mb-4">
                لأي استفسارات حول هذه الشروط والأحكام، يرجى التواصل معنا:
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <ul className="space-y-2">
                  <li><strong>البريد الإلكتروني:</strong> info@dorebell.com</li>
                  <li><strong>الواتساب:</strong> +20 120 523 4797</li>
                  <li><strong>ساعات العمل:</strong> السبت - الخميس، 9 صباحاً - 6 مساءً</li>
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
