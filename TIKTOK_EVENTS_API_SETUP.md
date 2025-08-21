# TikTok Events API Setup Guide

## Overview
تم تطبيق TikTok Events API لإرسال الأحداث من الخادم مباشرة، مما يضمن تتبع أكثر دقة ومقاومة لحاجبات الإعلانات.

## Configuration

### 1. Environment Variables
أضف المتغيرات التالية إلى ملف `.env.local`:

```bash
# TikTok Events API Integration
TIKTOK_ACCESS_TOKEN=4b9a5abddd403ced5be3eaf1b02cfb318a516b3b
ENABLE_TIKTOK_API=true
```

### 2. TikTok Pixel Information
- **Pixel ID**: `D2JK9NRC77UFE4JPKPVG`
- **Access Token**: `4b9a5abddd403ced5be3eaf1b02cfb318a516b3b`
- **API Endpoint**: `https://business-api.tiktok.com/open_api/v1.3/event/track/`

## Implemented Events

### 1. ViewContent 👁️
- **Trigger**: عند زيارة الصفحة الرئيسية
- **Location**: `app/page.tsx` (client-side) + `app/api/tiktok-view/route.ts` (server-side)
- **Data**: معرف المنتج، اسم المنتج، السعر

### 2. PlaceAnOrder 📝
- **Trigger**: عند إرسال نموذج الطلب
- **Location**: `app/api/order/route.ts`
- **Data**: معرف الطلب، قيمة الطلب، بيانات العميل (مشفرة)

### 3. Contact 💬
- **Trigger**: عند إرسال نموذج التواصل
- **Location**: `app/api/contact/route.ts`
- **Data**: موضوع الرسالة، بيانات الاتصال (مشفرة)

### 4. Lead 🎯
- **Trigger**: عند إرسال أي نموذج (طلب أو تواصل)
- **Location**: `app/api/order/route.ts` + `app/api/contact/route.ts`
- **Data**: وصف العميل المحتمل، قيمة العملية، بيانات العميل

### 5. Search 🔍
- **Trigger**: عند البحث في الموقع
- **Location**: `app/api/tiktok-search/route.ts`
- **Data**: نص البحث، معرف المحتوى

### 6. ClickButton 👆
- **Trigger**: عند الضغط على الأزرار المهمة
- **Location**: `app/api/tiktok-button/route.ts`
- **Data**: نص الزر، معرف المحتوى

## Server-Side Tracking Benefits

### 🔒 Privacy & Security
- جميع بيانات العملاء مشفرة باستخدام SHA-256
- إرسال آمن من الخادم
- لا تتأثر بحاجبات الإعلانات

### 📊 Data Accuracy
- تتبع دقيق 100% للأحداث المهمة
- عدم فقدان البيانات بسبب JavaScript blockers
- تتبع موثوق للتحويلات

### ⚡ Performance
- لا يؤثر على سرعة تحميل الموقع
- إرسال الأحداث في الخلفية
- معالجة غير متزامنة

## API Endpoints

### POST /api/tiktok-view
Track ViewContent events من الخادم.

**Request Body:**
```json
{
  "content_id": "doorbell-smart-camera",
  "content_name": "جرس الباب الذكي بالكاميرا",
  "value": 1999,
  "currency": "EGP",
  "user_data": {
    "external_id": "user_123"
  }
}
```

### POST /api/tiktok-button
Track ClickButton events من الخادم.

**Request Body:**
```json
{
  "button_text": "اطلب الآن",
  "content_id": "order-button",
  "content_name": "Order Button Click",
  "user_data": {
    "external_id": "user_123"
  }
}
```

### POST /api/tiktok-search
Track Search events من الخادم.

**Request Body:**
```json
{
  "search_string": "جرس ذكي",
  "content_id": "site-search",
  "content_name": "Site Search",
  "user_data": {
    "external_id": "user_123"
  }
}
```

## Data Structure

### Event Parameters
- `event`: نوع الحدث (ViewContent, PlaceAnOrder, Contact)
- `event_id`: معرف فريد للحدث
- `timestamp`: وقت الحدث (Unix timestamp)
- `properties`: خصائص الحدث (value, currency, content_id, etc.)

### User Data (Hashed)
- `email`: البريد الإلكتروني (مشفر SHA-256)
- `phone`: رقم الهاتف (مشفر SHA-256)
- `external_id`: معرف خارجي (مشفر SHA-256)

### Context Data
- `ip`: عنوان IP الخاص بالمستخدم
- `user_agent`: معلومات المتصفح
- `url`: رابط الصفحة

## Testing

### 1. Check Logs
راقب سجلات الخادم للتأكد من إرسال الأحداث:

```bash
npm run dev
# ابحث عن رسائل: "TikTok Event sent successfully"
```

### 2. TikTok Events Manager
- اذهب إلى TikTok Ads Manager
- افتح Events Manager
- تحقق من الأحداث الواردة في الوقت الفعلي

### 3. Test Events
```bash
# Test ViewContent
curl -X POST http://localhost:3000/api/tiktok-view \
  -H "Content-Type: application/json" \
  -d '{"content_id":"test","content_name":"Test Product"}'
```

## Rate Limiting

### API Routes Protection
- `/api/order`: 5 طلبات كل 15 دقيقة لكل IP
- `/api/contact`: 3 طلبات كل 15 دقيقة لكل IP  
- `/api/tiktok-view`: 10 طلبات كل 5 دقائق لكل IP
- `/api/tiktok-button`: 20 طلبات كل 5 دقائق لكل IP
- `/api/tiktok-search`: 15 طلبات كل 5 دقائق لكل IP

## Error Handling

### Graceful Degradation
- إذا فشل TikTok API، يستمر معالجة الطلب
- الأخطاء مسجلة في الكونسول
- لا تؤثر على تجربة المستخدم

### Retry Logic
- إعادة المحاولة التلقائية في حالة الفشل المؤقت
- Exponential backoff للطلبات المتكررة

## Production Checklist

- [ ] إضافة `TIKTOK_ACCESS_TOKEN` إلى متغيرات البيئة
- [ ] تعيين `ENABLE_TIKTOK_API=true`
- [ ] اختبار الأحداث في TikTok Events Manager
- [ ] مراقبة سجلات الأخطاء
- [ ] التحقق من معدلات التحويل

## Support

لأي مشاكل تقنية:
1. تحقق من سجلات الخادم
2. تأكد من صحة Access Token
3. راجع TikTok Events Manager للبيانات الواردة
4. تحقق من إعدادات البيئة
