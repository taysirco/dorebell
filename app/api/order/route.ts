import { NextRequest, NextResponse } from 'next/server'
import { sendOrderToMake } from '@/lib/make-webhook'
import { trackPlaceAnOrder, trackInitiateCheckout, trackLead } from '@/lib/tiktok-api'

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
      id: `DB${Date.now().toString().slice(-6)}${Math.random().toString(36).substr(2, 3).toUpperCase()}`,
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

    // Send to Make.com for automation and Google Sheets integration
    try {
      await sendOrderToMake({
        name: orderData.fullName,
        email: `${orderData.phoneNumber}@temp.com`, // Placeholder email for systems that require it
        phone: orderData.phoneNumber,
        whatsappNumber: orderData.whatsappNumber,
        address: orderData.address,
        area: orderData.area,
        city: orderData.city,
        quantity: orderData.quantity,
        productName: orderData.productName,
        unitPrice: orderData.price,
        totalPrice: totalPrice
      })
    } catch (makeError) {
      console.error('Make.com webhook error:', makeError)
      // Continue processing even if Make.com fails
    }

    // TikTok Events API - Track PlaceAnOrder (server-side)
    try {
      await trackPlaceAnOrder({
        content_id: 'doorbell-smart-camera',
        content_name: orderData.productName,
        value: totalPrice,
        currency: 'EGP',
        order_id: order.id,
        user: {
          phone: orderData.phoneNumber,
          external_id: order.id
        },
        context: {
          ip: ip,
          user_agent: request.headers.get('user-agent') || '',
          url: request.headers.get('origin') || ''
        }
      })

      // Also track as Lead event
      await trackLead({
        lead_description: `Product order: ${orderData.productName} - Quantity: ${orderData.quantity} - Value: ${totalPrice} EGP`,
        content_id: 'doorbell-order-lead',
        content_name: 'Product Order Lead',
        value: totalPrice,
        currency: 'EGP',
        user: {
          phone: orderData.phoneNumber,
          external_id: order.id
        },
        context: {
          ip: ip,
          user_agent: request.headers.get('user-agent') || '',
          url: request.headers.get('origin') || ''
        }
      })
    } catch (tiktokError) {
      console.error('TikTok Events API error:', tiktokError)
      // Continue processing even if TikTok fails
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
