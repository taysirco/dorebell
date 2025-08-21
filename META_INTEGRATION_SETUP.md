# Meta (Facebook) Pixel & Conversions API Setup Guide

## Overview
تم تطبيق Meta Pixel + Conversions API لإرسال الأحداث من المتصفح والخادم مباشرة، مما يضمن تتبع شامل ودقيق لحملات Facebook و Instagram.

## Configuration

### 1. Environment Variables
أضف المتغيرات التالية إلى ملف `.env.local`:

```bash
# Meta Conversions API Integration
META_ACCESS_TOKEN=EAAOsCc8AoTcBPCFebYPZBZB8hxXktYdHEdAR3qyPd3HnD9ZCCoA0NEzeDu0LJotfjSKYfjRA1sFnZAh6K3tFZBKf37ZCZBD6J46WVjwBoizv3faNblE6tk5mSkzdCrYeNSOZCjfQcteOuIGwtQrhZCRCe0MeGHcvGmBpc18824I8f4keYSGIQUhyPouh4FJ9YVsscVwZDZD
ENABLE_META_API=true
META_TEST_EVENT_CODE=TEST12345
```

### 2. Meta Pixel Information
- **Pixel ID**: `568427635944659`
- **Access Token**: `EAAOsCc8AoTc...` (shortened for security)
- **API Version**: `v19.0`
- **API Endpoint**: `https://graph.facebook.com/v19.0`

## Implemented Events

### 1. PageView 👁️
- **Trigger**: عند زيارة الصفحة الرئيسية
- **Client-Side**: `fbq('track', 'PageView')`
- **Server-Side**: Automatic via API

### 2. ViewContent 📱
- **Trigger**: عند زيارة صفحة المنتج
- **Client-Side**: `fbq('track', 'ViewContent', {...})`
- **Server-Side**: `trackMetaViewContent(...)`

### 3. Lead 🎯
- **Trigger**: عند إرسال أي نموذج
- **Client-Side**: `fbq('track', 'Lead', {...})`
- **Server-Side**: `trackMetaLead(...)`

### 4. InitiateCheckout 🛒
- **Trigger**: عند إرسال نموذج الطلب
- **Client-Side**: `fbq('track', 'InitiateCheckout', {...})`
- **Server-Side**: `trackMetaInitiateCheckout(...)`

### 5. Purchase 💳
- **Trigger**: عند وصول صفحة الشكر
- **Client-Side**: `fbq('track', 'Purchase', {...})`
- **Server-Side**: `trackMetaPurchase(...)`

### 6. Contact 💬
- **Trigger**: عند إرسال نموذج التواصل
- **Client-Side**: `fbq('track', 'Contact', {...})`
- **Server-Side**: `trackMetaContact(...)`

## Double Tracking Strategy

### 🔥 **Client-Side Pixel** (Frontend)
```javascript
// في المتصفح مباشرة
fbq('track', 'ViewContent', {
  content_type: 'product',
  content_ids: ['doorbell-smart-camera'],
  content_name: 'جرس الباب الذكي',
  value: 1999,
  currency: 'EGP'
});
```

### 🔥 **Server-Side Conversions API** (Backend)
```javascript
// من الخادم مباشرة
await trackMetaViewContent({
  content_id: 'doorbell-smart-camera',
  content_name: 'جرس الباب الذكي',
  value: 1999,
  currency: 'EGP',
  user_phone: '+201234567890',
  client_ip: '192.168.1.1',
  user_agent: 'Mozilla/5.0...'
});
```

## Privacy & Security Features

### 🔐 **Data Hashing (SHA-256)**
```javascript
// جميع البيانات الشخصية مشفرة
user_data: {
  em: [hashUserData(email)],           // البريد الإلكتروني
  ph: [hashUserData(normalizePhone)],  // رقم الهاتف
  external_id: [hashUserData(userId)]  // معرف المستخدم
}
```

### 📱 **Phone Number Normalization**
```javascript
// تطبيع أرقام الهواتف المصرية
normalizePhone('01234567890') → '201234567890'
normalizePhone('+201234567890') → '201234567890'
```

### 🛡️ **IP & User Agent Tracking**
```javascript
user_data: {
  client_ip_address: '192.168.1.1',
  client_user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)...'
}
```

## Event Mapping

| User Action | Client-Side | Server-Side | Data Included |
|-------------|-------------|-------------|---------------|
| Visit Homepage | PageView + ViewContent | trackMetaViewContent | Product info, IP, User Agent |
| Submit Order | Lead + InitiateCheckout | trackMetaPurchase + trackMetaLead | Order value, Customer data |
| Contact Form | Contact + Lead | trackMetaContact + trackMetaLead | Contact details |
| Thank You Page | Purchase | N/A | Purchase confirmation |

## Testing & Debugging

### 1. Meta Events Manager
- اذهب إلى Facebook Business Manager
- افتح Events Manager
- تحقق من الأحداث الواردة في الوقت الفعلي

### 2. Test Events
```bash
# إضافة TEST_EVENT_CODE للاختبار
META_TEST_EVENT_CODE=TEST12345
```

### 3. Server Logs
```bash
npm run dev
# ابحث عن: "Meta Conversions API Event sent successfully"
```

### 4. Browser Console
```javascript
// فحص Meta Pixel في المتصفح
fbq('track', 'ViewContent', {test: true});
```

## Error Handling

### Graceful Degradation
- إذا فشل Meta API، يستمر معالجة الطلب
- الأخطاء مسجلة في الكونسول
- لا تؤثر على تجربة المستخدم

### Retry Logic
- إعادة المحاولة التلقائية في حالة الفشل المؤقت
- Exponential backoff للطلبات المتكررة

## Performance Optimization

### Async Loading
- Pixel يحمل بشكل غير متزامن
- لا يؤثر على سرعة تحميل الموقع

### Background Processing
- Server-side events تُرسل في الخلفية
- معالجة غير متزامنة

## Production Checklist

- [ ] إضافة `META_ACCESS_TOKEN` إلى متغيرات البيئة
- [ ] تعيين `ENABLE_META_API=true`
- [ ] اختبار الأحداث في Meta Events Manager
- [ ] مراقبة سجلات الأخطاء
- [ ] إزالة `META_TEST_EVENT_CODE` في الإنتاج
- [ ] التحقق من معدلات التحويل

## API Endpoints

### No dedicated endpoints needed
- Meta tracking يتم من خلال API routes الموجودة:
  - `/api/order` - تتبع الطلبات
  - `/api/contact` - تتبع التواصل

## Data Structure Examples

### Purchase Event
```json
{
  "data": [{
    "event_name": "Purchase",
    "event_time": 1640995200,
    "event_id": "purchase_DB123456ABC",
    "action_source": "website",
    "user_data": {
      "em": ["hashed_email"],
      "ph": ["hashed_phone"],
      "client_ip_address": "192.168.1.1",
      "client_user_agent": "Mozilla/5.0..."
    },
    "custom_data": {
      "value": 1999,
      "currency": "EGP",
      "content_ids": ["doorbell-smart-camera"],
      "content_name": "جرس الباب الذكي",
      "num_items": 1,
      "content_type": "product"
    }
  }]
}
```

### Lead Event
```json
{
  "data": [{
    "event_name": "Lead",
    "event_time": 1640995200,
    "action_source": "website",
    "user_data": {
      "ph": ["hashed_phone"],
      "client_ip_address": "192.168.1.1"
    },
    "custom_data": {
      "content_name": "Contact Form Lead",
      "content_type": "lead"
    }
  }]
}
```

## Support

لأي مشاكل تقنية:
1. تحقق من سجلات الخادم
2. تأكد من صحة Access Token
3. راجع Meta Events Manager للبيانات الواردة
4. تحقق من إعدادات البيئة
5. استخدم Meta Pixel Helper Chrome Extension للتشخيص

## Integration Benefits

### 🎯 **Accurate Attribution**
- تتبع دقيق للتحويلات
- مقاومة لحاجبات الإعلانات
- بيانات موثوقة للخوارزمية

### 📊 **Better Optimization**
- بيانات مفصلة لـ Facebook Algorithm
- إعادة استهداف أدق
- Lookalike audiences عالية الجودة

### 💰 **Lower Costs**
- تحسين تكلفة العميل المحتمل
- عائد أعلى على الإعلانات
- استهداف أكثر فعالية

### 🔒 **Privacy Compliant**
- تشفير SHA-256 للبيانات الشخصية
- امتثال لقوانين حماية البيانات
- شفافية في جمع البيانات
