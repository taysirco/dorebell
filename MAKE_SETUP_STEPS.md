# 🔗 خطوات ربط Dorebell مع Make.com

## 📋 الخطوات السريعة (5 دقائق)

### الخطوة 1: إنشاء حساب Make.com
1. اذهب إلى [Make.com](https://www.make.com)
2. سجل حساب جديد أو ادخل لحسابك الحالي
3. اختر الخطة المناسبة (Free tier متاح)

---

### الخطوة 2: إنشاء Scenario لنماذج الاتصال

#### 🔗 إعداد الـ Webhook
1. انقر على **"Create a new scenario"**
2. اختر **"Webhooks"** كنقطة البداية
3. اختر **"Custom webhook"**
4. انقر على **"Add"** لإضافة webhook جديد
5. **انسخ رابط الـ Webhook** (سنحتاجه لاحقاً)

#### 📊 ربط Google Sheets
1. أضف module جديد بعد الـ Webhook
2. اختر **"Google Sheets"**
3. اختر **"Add a row"**
4. اربط حسابك مع Google
5. أنشئ Google Sheet جديد بالعناوين التالية:

```
| التاريخ | الوقت | الاسم | الهاتف | البريد الإلكتروني | الرسالة | الصفحة |
```

6. اربط البيانات:
   - **Date**: `{{formatDate(1.timestamp; "DD/MM/YYYY")}}`
   - **Time**: `{{formatDate(1.timestamp; "HH:mm:ss")}}`
   - **Name**: `{{1.name}}`
   - **Phone**: `{{1.phone}}`
   - **Email**: `{{1.email}}`
   - **Message**: `{{1.message}}`
   - **Source**: `{{1.source}}`

---

### الخطوة 3: إنشاء Scenario للطلبات

#### كرر نفس الخطوات مع بيانات الطلبات:

```
| التاريخ | الوقت | اسم العميل | الهاتف | واتساب | المحافظة | المنطقة | العنوان | المنتج | سعر الوحدة | الكمية | المبلغ الإجمالي | الحالة |
```

ربط البيانات:
- **Date**: `{{1.orderDate}}`
- **Time**: `{{1.orderTime}}`
- **Customer**: `{{1.name}}`
- **Phone**: `{{1.phone}}`
- **WhatsApp**: `{{1.whatsappNumber}}`
- **City**: `{{1.city}}`
- **Area**: `{{1.area}}`
- **Address**: `{{1.address}}`
- **Product**: `{{1.productName}}`
- **Unit Price**: `{{1.unitPrice}}`
- **Quantity**: `{{1.quantity}}`
- **Total**: `{{1.totalPrice}}`
- **Status**: `{{1.status}}`

---

### الخطوة 4: إعداد متغيرات البيئة

أنشئ ملف `.env.local` في مجلد المشروع:

```bash
# Make.com Webhooks
MAKE_CONTACT_WEBHOOK_URL=https://hook.eu1.make.com/YOUR_CONTACT_WEBHOOK_HERE
MAKE_ORDER_WEBHOOK_URL=https://hook.eu1.make.com/YOUR_ORDER_WEBHOOK_HERE

# Settings
ENABLE_WEBHOOKS=true
WEBHOOK_SECRET=your-secret-key-123

# Admin Email (اختياري)
ADMIN_EMAIL=admin@dorebell.com
```

**🔴 مهم:** استبدل `YOUR_CONTACT_WEBHOOK_HERE` و `YOUR_ORDER_WEBHOOK_HERE` بالروابط الحقيقية من Make.com

---

### الخطوة 5: تشغيل السيناريوهات

1. في Make.com، انقر على **"Run once"** لكل scenario
2. تأكد من تشغيل السيناريوهات (يجب أن تظهر باللون الأخضر)
3. اجعل السيناريوهات **"ON"** للعمل بشكل دائم

---

## 🧪 اختبار سريع

### اختبار نموذج الاتصال:
1. اذهب لموقعك: `http://localhost:3000/contact`
2. املأ النموذج وأرسله
3. تحقق من Google Sheets - يجب أن تظهر البيانات

### اختبار نموذج الطلب:
1. اذهب للصفحة الرئيسية: `http://localhost:3000`
2. اطلب منتج من النموذج في الأسفل
3. تحقق من Google Sheets للطلبات

---

## 📈 إضافات متقدمة (اختيارية)

### إشعارات البريد الإلكتروني
أضف **Email** module بعد Google Sheets:
- **To**: بريدك الإلكتروني
- **Subject**: `طلب جديد من {{1.name}}`
- **Body**: تفاصيل الطلب

### إشعارات WhatsApp
أضف **WhatsApp Business** module:
- اربط حسابك
- أرسل رسالة للفريق عند وصول طلب جديد

### إشعارات Slack
أضف **Slack** module:
- اربط workspace الخاص بك
- أرسل رسالة لقناة المبيعات

---

## 🔧 استكشاف الأخطاء

### مشكلة: البيانات لا تصل لـ Google Sheets
**الحل:**
1. تحقق من تشغيل السيناريو في Make.com
2. تأكد من صحة رابط الـ webhook في `.env.local`
3. راجع سجل التنفيذ في Make.com

### مشكلة: خطأ في متغيرات البيئة
**الحل:**
1. تأكد من وجود ملف `.env.local` في المجلد الرئيسي
2. أعد تشغيل الخادم: `npm run dev`
3. تحقق من عدم وجود مسافات إضافية في الروابط

### مشكلة: بطء في وصول البيانات
**الحل:**
- تحقق من خطة Make.com (الخطة المجانية لها حدود)
- راجع سجل التنفيذ للتأكد من عدم وجود أخطاء

---

## ✅ قائمة التحقق النهائية

- [ ] تم إنشاء حساب Make.com
- [ ] تم إنشاء scenario لنماذج الاتصال
- [ ] تم إنشاء scenario للطلبات
- [ ] تم ربط Google Sheets
- [ ] تم إعداد ملف `.env.local`
- [ ] تم تشغيل السيناريوهات
- [ ] تم اختبار النماذج بنجاح
- [ ] البيانات تصل لـ Google Sheets

---

## 📞 الدعم

إذا واجهت أي مشكلة:
- 📚 راجع [وثائق Make.com](https://www.make.com/en/help)
- 💬 اطلب المساعدة من [مجتمع Make.com](https://community.make.com/)
- 📧 تواصل معنا: support@dorebell.com

**🎉 تهانينا! تم ربط Dorebell مع Make.com بنجاح**

الآن ستحصل على جميع البيانات تلقائياً في Google Sheets مع إمكانية إضافة إشعارات وأتمتة أخرى!
