# 🔗 دليل ربط Dorebell مع Make.com

## 📋 نظرة عامة

هذا الدليل يوضح كيفية ربط موقع Dorebell مع منصة Make.com لأتمتة:
- 📝 نماذج الاتصال → Google Sheets / Email / CRM
- 🛒 طلبات الشراء → Google Sheets / WhatsApp / إشعارات
- 📊 تحليل البيانات والتقارير
- 📱 إشعارات فورية للفريق

---

## 🚀 الخطوة 1: إعداد Make.com

### 1.1 إنشاء حساب Make.com
1. اذهب إلى [Make.com](https://www.make.com)
2. سجل حساب جديد أو ادخل لحسابك
3. اختر الخطة المناسبة (Free tier متاح)

### 1.2 إنشاء Scenarios جديدة

#### 🔗 Scenario 1: نماذج الاتصال
1. انقر على **"Create a new scenario"**
2. اختر **"Webhooks"** كنقطة البداية
3. اختر **"Custom webhook"**
4. انسخ رابط الـ Webhook (سنحتاجه لاحقاً)

#### 🛒 Scenario 2: طلبات الشراء
1. كرر نفس الخطوات لإنشاء webhook ثاني
2. انسخ رابط الـ Webhook الثاني

---

## ⚙️ الخطوة 2: إعداد متغيرات البيئة

### 2.1 إنشاء ملف .env.local
أنشئ ملف `.env.local` في مجلد المشروع:

```bash
# Make.com Integration
MAKE_CONTACT_WEBHOOK_URL=https://hook.eu1.make.com/YOUR_CONTACT_WEBHOOK_ID
MAKE_ORDER_WEBHOOK_URL=https://hook.eu1.make.com/YOUR_ORDER_WEBHOOK_ID
MAKE_API_KEY=your-make-com-api-key

# Settings
ADMIN_EMAIL=admin@dorebell.com
ENABLE_WEBHOOKS=true
WEBHOOK_SECRET=your-secret-key-123

# Environment
NODE_ENV=production
```

### 2.2 استبدال القيم
- استبدل `YOUR_CONTACT_WEBHOOK_ID` برابط webhook نماذج الاتصال
- استبدل `YOUR_ORDER_WEBHOOK_ID` برابط webhook الطلبات
- اختر كلمة سر قوية للـ `WEBHOOK_SECRET`

---

## 📊 الخطوة 3: إعداد Google Sheets

### 3.1 إنشاء ملف جديد في Google Sheets

#### جدول نماذج الاتصال
```
| التاريخ | الوقت | الاسم | الهاتف | البريد الإلكتروني | الرسالة | رقم الطلب | الحالة |
```

#### جدول الطلبات
```
| التاريخ | الوقت | اسم العميل | الهاتف | المدينة | العنوان | الكمية | المبلغ الإجمالي | الحالة |
```

### 3.2 ربط Make.com بـ Google Sheets
1. في Make.com، أضف **Google Sheets** module بعد الـ Webhook
2. اختر **"Add a row"**
3. حدد الملف والورقة
4. اربط البيانات من الـ Webhook بالأعمدة المناسبة

---

## 🔧 الخطوة 4: إعداد الإشعارات

### 4.1 إضافة إشعارات البريد الإلكتروني
1. أضف **Email** module في Make.com
2. اختر **"Send an email"**
3. أعد إعداد:
   - **To**: بريدك الإلكتروني
   - **Subject**: "طلب جديد من Dorebell"
   - **Content**: استخدم بيانات من الـ Webhook

### 4.2 إضافة إشعارات WhatsApp (اختياري)
1. أضف **WhatsApp Business** module
2. اربطه بحسابك
3. أعد إعداد الرسالة المطلوبة

---

## 🧪 الخطوة 5: اختبار التكامل

### 5.1 اختبار من الموقع
```bash
# تشغيل الخادم المحلي
npm run dev

# زيارة صفحة الاختبار
http://localhost:3000/api/test-make
```

### 5.2 اختبار من Terminal
```bash
# اختبار نموذج الاتصال
curl -X POST http://localhost:3000/api/test-make \
  -H "Content-Type: application/json" \
  -d '{
    "type": "contact",
    "data": {
      "name": "Ahmed Test",
      "email": "test@example.com",
      "phone": "01234567890",
      "message": "Test message"
    }
  }'

# اختبار طلب شراء
curl -X POST http://localhost:3000/api/test-make \
  -H "Content-Type: application/json" \
  -d '{
    "type": "order",
    "data": {
      "name": "Ahmed Test",
      "phone": "01234567890",
      "city": "Cairo",
      "quantity": 1,
      "totalPrice": 999
    }
  }'
```

---

## 📈 السيناريوهات المتقدمة

### 🎯 السيناريو 1: أتمتة خدمة العملاء
```
Webhook → Google Sheets → إذا كانت "شكوى" → إرسال WhatsApp للمدير
```

### 📱 السيناريو 2: متابعة الطلبات
```
Webhook → Google Sheets → إرسال رسالة تأكيد للعميل → إنشاء مهمة في Trello
```

### 📊 السيناريو 3: تحليل البيانات
```
Google Sheets → تحديث تلقائي كل ساعة → إرسال تقرير يومي بالإيميل
```

---

## 🔒 الأمان والحماية

### أمان الـ Webhooks
```typescript
// التحقق من صحة الـ Webhook
const signature = request.headers.get('X-Webhook-Secret')
if (signature !== process.env.WEBHOOK_SECRET) {
  return new Response('Unauthorized', { status: 401 })
}
```

### معدل الطلبات (Rate Limiting)
- 3 طلبات اتصال كل 15 دقيقة
- 5 طلبات شراء كل 15 دقيقة
- حماية من البريد العشوائي

---

## 🛠️ استكشاف الأخطاء

### مشاكل شائعة وحلولها

#### ❌ "Webhook not configured"
**الحل:**
```bash
# تأكد من وجود متغيرات البيئة
echo $MAKE_CONTACT_WEBHOOK_URL
echo $MAKE_ORDER_WEBHOOK_URL
```

#### ❌ "Connection failed"
**الحل:**
1. تحقق من صحة رابط الـ Webhook
2. تأكد من تشغيل السيناريو في Make.com
3. راجع سجلات Make.com للأخطاء

#### ❌ "Data not appearing in Sheets"
**الحل:**
1. تحقق من صحة ربط الحقول
2. تأكد من صلاحيات Google Sheets
3. راجع سجل التنفيذ في Make.com

---

## 📞 الدعم والمساعدة

### موارد مفيدة
- [📚 وثائق Make.com](https://www.make.com/en/help)
- [🎥 فيديوهات تعليمية](https://www.youtube.com/c/MakeHQ)
- [💬 مجتمع Make.com](https://community.make.com/)

### للمساعدة التقنية
- 📧 البريد الإلكتروني: support@dorebell.com
- 📱 واتساب: [رقم الدعم]
- 🔧 GitHub Issues: [رابط المستودع]

---

## ✅ قائمة التحقق النهائية

- [ ] تم إنشاء حساب Make.com
- [ ] تم إعداد السيناريوهات
- [ ] تم إعداد متغيرات البيئة
- [ ] تم إنشاء Google Sheets
- [ ] تم اختبار الـ Webhooks
- [ ] تعمل الإشعارات بشكل صحيح
- [ ] تم نشر الموقع مع الإعدادات الجديدة

🎉 **تهانينا! تم ربط Dorebell مع Make.com بنجاح**
