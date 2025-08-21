# Environment Variables Setup

To configure the Make.com integration and other services, create a `.env.local` file in the root directory with the following variables:

## Make.com Integration

```bash
# Webhook for order data (connects to Google Sheets)
MAKE_WEBHOOK_URL=https://hook.eu1.make.com/YOUR_WEBHOOK_ID

# Webhook for contact form data (connects to Google Sheets)  
MAKE_CONTACT_WEBHOOK_URL=https://hook.eu1.make.com/YOUR_CONTACT_WEBHOOK_ID
```

### How to set up Make.com webhooks:

1. **Create a Make.com account** at https://make.com
2. **Create a new scenario** for orders:
   - Start with "Webhooks" > "Custom webhook"
   - Copy the webhook URL and set it as `MAKE_WEBHOOK_URL`
   - Add "Google Sheets" > "Add a row" module
   - Connect to your Google Sheets and map the fields

3. **Create another scenario** for contact forms:
   - Start with "Webhooks" > "Custom webhook"
   - Copy the webhook URL and set it as `MAKE_CONTACT_WEBHOOK_URL`
   - Add "Google Sheets" > "Add a row" module for contact inquiries

### Order Data Fields Sent to Make.com:

```json
{
  "orderId": "ORDER_1234567890_abc123",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "customerName": "أحمد محمد",
  "customerPhone": "01012345678",
  "customerCity": "القاهرة",
  "customerAddress": "شارع المعز، رقم 123",
  "productName": "جرس الباب الذكي بالكاميرا",
  "productUnitPrice": "1999",
  "productQuantity": 1,
  "productTotalPrice": 1999,
  "paymentMethod": "cash_on_delivery",
  "notes": "ملاحظات العميل",
  "status": "pending",
  "source": "website",
  "orderDate": "1/1/2024",
  "orderTime": "12:00:00 PM",
  "totalPriceFormatted": "1999 جنيه",
  "customerInfo": "أحمد محمد - 01012345678",
  "deliveryAddress": "القاهرة - شارع المعز، رقم 123"
}
```

### Contact Data Fields Sent to Make.com:

```json
{
  "messageId": "CONTACT_1234567890_abc123",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "customerName": "أحمد محمد",
  "customerPhone": "01012345678",
  "customerEmail": "ahmed@example.com",
  "subject": "استفسار عن المنتج",
  "message": "نص الرسالة...",
  "orderNumber": "ORDER_123456",
  "status": "new",
  "source": "website",
  "contactDate": "1/1/2024",
  "contactTime": "12:00:00 PM",
  "customerInfo": "أحمد محمد - 01012345678",
  "hasOrderNumber": "نعم",
  "urgencyLevel": "عادي"
}
```

## Optional Environment Variables

```bash
# Google Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# WhatsApp Business API (optional)
WHATSAPP_API_TOKEN=your_whatsapp_business_api_token

# Email service (optional)
EMAIL_SERVICE_API_KEY=your_email_service_api_key

# Production settings
NODE_ENV=production
NEXTJS_URL=https://yourdomain.com
```

## Google Sheets Setup Recommendation

Create two Google Sheets:

### 1. Orders Sheet
Columns: Order ID, Date, Time, Customer Name, Phone, WhatsApp, City, Area, Address, Product, Quantity, Unit Price, Total Price, Payment Method, Status

### 2. Contact Messages Sheet  
Columns: Message ID, Date, Time, Customer Name, Phone, Email, Subject, Message, Order Number, Status, Urgency Level

This setup will automatically populate your Google Sheets when customers place orders or send contact messages through your website.
