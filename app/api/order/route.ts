import { NextRequest, NextResponse } from 'next/server'

// Make.com webhook configuration
const MAKE_WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL || 'https://hook.eu1.make.com/YOUR_WEBHOOK_ID'
const MAKE_CONTACT_WEBHOOK_URL = process.env.MAKE_CONTACT_WEBHOOK_URL || 'https://hook.eu1.make.com/YOUR_CONTACT_WEBHOOK_ID'

// Function to send order data to Make.com webhook for Google Sheets integration
async function sendToMakeWebhook(orderData: any) {
  if (!MAKE_WEBHOOK_URL || MAKE_WEBHOOK_URL.includes('YOUR_WEBHOOK_ID')) {
    console.log('Make.com webhook URL not configured. Skipping integration.')
    return
  }

  try {
    const response = await fetch(MAKE_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Dorebell-Orders/1.0'
      },
      body: JSON.stringify({
        // Flatten the data structure for easier Google Sheets integration
        orderId: orderData.id,
        timestamp: orderData.timestamp,
        customerName: orderData.customer.fullName,
        customerPhone: orderData.customer.phoneNumber,
        customerWhatsapp: orderData.customer.whatsappNumber,
        customerCity: orderData.customer.address.city,
        customerArea: orderData.customer.address.area,
        customerAddress: orderData.customer.address.details,
        productName: orderData.product.name,
        productUnitPrice: orderData.product.unitPrice,
        productQuantity: orderData.product.quantity,
        productTotalPrice: orderData.product.totalPrice,
        paymentMethod: orderData.paymentMethod,
        notes: orderData.notes,
        status: orderData.status,
        source: orderData.source,
        // Additional formatted fields for Google Sheets
        orderDate: new Date(orderData.timestamp).toLocaleDateString('ar-EG'),
        orderTime: new Date(orderData.timestamp).toLocaleTimeString('ar-EG'),
        totalPriceFormatted: `${orderData.product.totalPrice} جنيه`,
        customerInfo: `${orderData.customer.fullName} - ${orderData.customer.phoneNumber} - واتساب: ${orderData.customer.whatsappNumber}`,
        deliveryAddress: `${orderData.customer.address.city} - ${orderData.customer.address.area} - ${orderData.customer.address.details}`
      })
    })

    if (!response.ok) {
      throw new Error(`Make.com webhook failed: ${response.status} ${response.statusText}`)
    }

    console.log('✅ Order successfully sent to Make.com webhook')
    
    // Log success for monitoring
    const result = await response.json().catch(() => ({ success: true }))
    console.log('Make.com response:', result)
    
  } catch (error) {
    console.error('❌ Failed to send order to Make.com:', error)
    throw error
  }
}

// Function to send contact form data to Make.com webhook
async function sendContactToMakeWebhook(contactData: any) {
  if (!MAKE_CONTACT_WEBHOOK_URL || MAKE_CONTACT_WEBHOOK_URL.includes('YOUR_CONTACT_WEBHOOK_ID')) {
    console.log('Make.com contact webhook URL not configured. Skipping integration.')
    return
  }

  try {
    const response = await fetch(MAKE_CONTACT_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Dorebell-Contact/1.0'
      },
      body: JSON.stringify({
        messageId: contactData.id,
        timestamp: contactData.timestamp,
        customerName: contactData.customer.name,
        customerPhone: contactData.customer.phone,
        customerEmail: contactData.customer.email,
        subject: contactData.inquiry.subject,
        message: contactData.inquiry.message,
        orderNumber: contactData.inquiry.orderNumber,
        status: contactData.status,
        source: contactData.source,
        // Additional formatted fields
        contactDate: new Date(contactData.timestamp).toLocaleDateString('ar-EG'),
        contactTime: new Date(contactData.timestamp).toLocaleTimeString('ar-EG'),
        customerInfo: `${contactData.customer.name} - ${contactData.customer.phone}`,
        hasOrderNumber: contactData.inquiry.orderNumber ? 'نعم' : 'لا'
      })
    })

    if (!response.ok) {
      throw new Error(`Make.com contact webhook failed: ${response.status} ${response.statusText}`)
    }

    console.log('✅ Contact message successfully sent to Make.com webhook')
    
  } catch (error) {
    console.error('❌ Failed to send contact to Make.com:', error)
    throw error
  }
}

interface OrderData {
  fullName: string
  phoneNumber: string
  whatsappNumber: string
  city: string
  area: string
  address: string
  quantity: number
  productName: string
  price: string
  timestamp: string
  honeypot?: string
}

// Simple rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

function rateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = 5 // Max 5 requests per 15 minutes

  const record = rateLimitStore.get(ip)
  
  if (!record) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (record.count >= maxRequests) {
    return false
  }

  record.count++
  return true
}

function validateEgyptianPhone(phone: string): boolean {
  const phoneRegex = /^01[0-2,5][0-9]{8}$/
  return phoneRegex.test(phone)
}

function validateOrderData(data: OrderData): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  // Anti-spam check
  if (data.honeypot) {
    return { isValid: false, errors: ['Spam detected'] }
  }

  if (!data.fullName?.trim()) {
    errors.push('Full name is required')
  }

  if (!data.phoneNumber?.trim()) {
    errors.push('Phone number is required')
  } else if (!validateEgyptianPhone(data.phoneNumber)) {
    errors.push('Invalid Egyptian phone number')
  }

  if (!data.whatsappNumber?.trim()) {
    errors.push('WhatsApp number is required')
  } else if (!validateEgyptianPhone(data.whatsappNumber)) {
    errors.push('Invalid WhatsApp number')
  }



  if (!data.city?.trim()) {
    errors.push('City is required')
  }

  if (!data.area?.trim()) {
    errors.push('Area is required')
  }

  if (!data.address?.trim()) {
    errors.push('Address is required')
  }

  if (!data.quantity || data.quantity < 1) {
    errors.push('Valid quantity is required')
  }

  if (!data.productName?.trim()) {
    errors.push('Product name is required')
  }

  if (!data.price?.trim()) {
    errors.push('Price is required')
  }

  return { isValid: errors.length === 0, errors }
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    
    // Apply rate limiting
    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const orderData: OrderData = body

    // Validate the order data
    const { isValid, errors } = validateOrderData(orderData)
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Validation failed', details: errors },
        { status: 400 }
      )
    }

    // Calculate total price
    const totalPrice = parseInt(orderData.price) * orderData.quantity

    // Create order object for logging/processing
    const order = {
      id: `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: orderData.timestamp,
      customer: {
        fullName: orderData.fullName,
        phoneNumber: orderData.phoneNumber,
        whatsappNumber: orderData.whatsappNumber,
        address: {
          city: orderData.city,
          area: orderData.area,
          details: orderData.address
        }
      },
      product: {
        name: orderData.productName,
        unitPrice: orderData.price,
        quantity: orderData.quantity,
        totalPrice: totalPrice
      },
      paymentMethod: 'cash_on_delivery',
      status: 'pending',
      source: 'website',
      ip: ip
    }

    // Log the order to console (in production, save to database)
    console.log('=== NEW ORDER RECEIVED ===')
    console.log(JSON.stringify(order, null, 2))
    console.log('========================')

    // Send to Make.com for Google Sheets integration
    try {
      await sendToMakeWebhook(order)
    } catch (makeError) {
      console.error('Make.com webhook error:', makeError)
      // Continue processing even if Make.com fails
    }

    // TODO: In production, implement additional integrations:
    // 1. Save order to database
    // 2. Send email notification to admin  
    // 3. Send confirmation SMS to customer
    // 4. Send WhatsApp message to sales team

    /*
    Example additional integrations:
    
    // Save to database
    await db.orders.create(order)
    
    // Send admin email
    await sendEmail({
      to: 'admin@dorebell.com',
      subject: `New Order: ${order.id}`,
      template: 'new-order',
      data: order
    })
    
    // Send customer SMS
    await sendSMS({
      to: orderData.phoneNumber,
      message: `تم استلام طلبك برقم ${order.id}. سيتم التواصل معك قريباً.`
    })
    */

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Order received successfully',
      orderId: order.id,
      estimatedDelivery: '2-5 أيام عمل'
    })

  } catch (error) {
    console.error('Order API Error:', error)
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}
