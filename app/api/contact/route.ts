import { NextRequest, NextResponse } from 'next/server'

// Make.com webhook configuration
const MAKE_CONTACT_WEBHOOK_URL = process.env.MAKE_CONTACT_WEBHOOK_URL || 'https://hook.eu1.make.com/YOUR_CONTACT_WEBHOOK_ID'

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
        // Additional formatted fields for Google Sheets
        contactDate: new Date(contactData.timestamp).toLocaleDateString('ar-EG'),
        contactTime: new Date(contactData.timestamp).toLocaleTimeString('ar-EG'),
        customerInfo: `${contactData.customer.name} - ${contactData.customer.phone}`,
        hasOrderNumber: contactData.inquiry.orderNumber ? 'نعم' : 'لا',
        urgencyLevel: contactData.inquiry.subject.includes('شكوى') ? 'عالي' : 'عادي'
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

interface ContactData {
  name: string
  email?: string
  phone: string
  subject: string
  message: string
  orderNumber?: string
  timestamp: string
}

// Simple rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

function rateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = 3 // Max 3 contact requests per 15 minutes

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

function validateContactData(data: ContactData): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!data.name?.trim()) {
    errors.push('Name is required')
  }

  if (!data.phone?.trim()) {
    errors.push('Phone number is required')
  } else if (!validateEgyptianPhone(data.phone)) {
    errors.push('Invalid Egyptian phone number')
  }

  if (data.email && !data.email.includes('@')) {
    errors.push('Invalid email format')
  }

  if (!data.subject?.trim()) {
    errors.push('Subject is required')
  }

  if (!data.message?.trim()) {
    errors.push('Message is required')
  }

  if (data.message && data.message.length > 1000) {
    errors.push('Message too long (max 1000 characters)')
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
    const contactData: ContactData = body

    // Validate the contact data
    const { isValid, errors } = validateContactData(contactData)
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Validation failed', details: errors },
        { status: 400 }
      )
    }

    // Create contact message object
    const contactMessage = {
      id: `CONTACT_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: contactData.timestamp,
      customer: {
        name: contactData.name,
        phone: contactData.phone,
        email: contactData.email || '',
      },
      inquiry: {
        subject: contactData.subject,
        message: contactData.message,
        orderNumber: contactData.orderNumber || '',
      },
      status: 'new',
      source: 'website',
      ip: ip
    }

    // Log the contact message to console (in production, save to database)
    console.log('=== NEW CONTACT MESSAGE ===')
    console.log(JSON.stringify(contactMessage, null, 2))
    console.log('==========================')

    // Send to Make.com for Google Sheets integration
    try {
      await sendContactToMakeWebhook(contactMessage)
    } catch (makeError) {
      console.error('Make.com contact webhook error:', makeError)
      // Continue processing even if Make.com fails
    }

    // TODO: In production, implement additional integrations:
    // 1. Save contact message to database
    // 2. Send email notification to support team
    // 3. Send auto-reply to customer
    // 4. Integrate with CRM or ticketing system
    // 5. Send notification to support via Slack/Teams

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Contact message received successfully',
      messageId: contactMessage.id,
      estimatedResponse: 'خلال 24 ساعة'
    })

  } catch (error) {
    console.error('Contact API Error:', error)
    
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
