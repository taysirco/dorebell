import { MAKE_CONFIG, isMakeConfigured } from './make-config';

// Types for webhook data
export interface ContactWebhookData {
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp: string;
  source: 'website';
  page: string;
}

export interface OrderWebhookData {
  name: string;
  email: string;
  phone: string;
  whatsappNumber: string;
  address: string;
  area: string;
  city: string;
  quantity: number;
  productName: string;
  unitPrice: string;
  totalPrice: number;
  timestamp: string;
  source: 'website';
  status: 'pending';
  orderDate: string;
  orderTime: string;
}

// Generic webhook sender function
async function sendWebhook(url: string, data: any, retries = 0): Promise<boolean> {
  if (!isMakeConfigured()) {
    console.log('🔄 Make.com not configured, skipping webhook');
    return false;
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Source': 'dorebell-website',
        ...(MAKE_CONFIG.WEBHOOK_SECRET && {
          'X-Webhook-Secret': MAKE_CONFIG.WEBHOOK_SECRET
        })
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    console.log('✅ Webhook sent successfully to Make.com');
    return true;

  } catch (error) {
    console.error('❌ Webhook error:', error);

    // Retry logic
    if (retries < MAKE_CONFIG.MAX_RETRIES) {
      console.log(`🔄 Retrying webhook... (${retries + 1}/${MAKE_CONFIG.MAX_RETRIES})`);
      await new Promise(resolve => setTimeout(resolve, MAKE_CONFIG.RETRY_DELAY));
      return sendWebhook(url, data, retries + 1);
    }

    return false;
  }
}

// Send contact form data to Make.com
export async function sendContactToMake(contactData: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): Promise<boolean> {
  const webhookData: ContactWebhookData = {
    ...contactData,
    timestamp: new Date().toISOString(),
    source: 'website',
    page: 'contact'
  };

  return sendWebhook(MAKE_CONFIG.CONTACT_WEBHOOK, webhookData);
}

// Send order data to Make.com
export async function sendOrderToMake(orderData: {
  name: string;
  email: string;
  phone: string;
  whatsappNumber: string;
  address: string;
  area: string;
  city: string;
  quantity: number;
  productName: string;
  unitPrice: string;
  totalPrice: number;
}): Promise<boolean> {
  const timestamp = new Date().toISOString();
  const webhookData: OrderWebhookData = {
    ...orderData,
    timestamp,
    source: 'website',
    status: 'pending',
    orderDate: new Date().toLocaleDateString('ar-EG'),
    orderTime: new Date().toLocaleTimeString('ar-EG')
  };

  return sendWebhook(MAKE_CONFIG.ORDER_WEBHOOK, webhookData);
}

// Test webhook connection
export async function testMakeConnection(): Promise<{success: boolean, message: string}> {
  if (!isMakeConfigured()) {
    return {
      success: false,
      message: 'Make.com webhooks not configured'
    };
  }

  const testData = {
    test: true,
    timestamp: new Date().toISOString(),
    message: 'Test connection from Dorebell website'
  };

  try {
    // Test contact webhook
    const contactTestData = {
      name: 'اختبار التكامل',
      email: 'test@dorebell.com',
      phone: '01234567890',
      message: 'رسالة اختبار للتكامل مع Make.com',
      timestamp: new Date().toISOString(),
      source: 'website',
      page: 'test'
    };

    // Test order webhook with all fields
    const orderTestData = {
      name: 'عميل اختبار',
      email: 'test@temp.com',
      phone: '01234567890',
      whatsappNumber: '01234567890',
      address: 'عنوان اختبار للتكامل',
      area: 'منطقة الاختبار',
      city: 'القاهرة',
      quantity: 1,
      productName: 'جرس الباب الذكي بالكاميرا',
      unitPrice: '1999',
      totalPrice: 1999,
      timestamp: new Date().toISOString(),
      source: 'website',
      status: 'pending',
      orderDate: new Date().toLocaleDateString('ar-EG'),
      orderTime: new Date().toLocaleTimeString('ar-EG')
    };

    const contactTest = await sendWebhook(MAKE_CONFIG.CONTACT_WEBHOOK, contactTestData);
    const orderTest = await sendWebhook(MAKE_CONFIG.ORDER_WEBHOOK, orderTestData);

    if (contactTest && orderTest) {
      return {
        success: true,
        message: 'Both webhooks are working correctly with complete data'
      };
    } else {
      return {
        success: false,
        message: 'One or more webhooks failed'
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Connection test failed: ${error}`
    };
  }
}
