import { NextRequest, NextResponse } from 'next/server'
import { testMakeConnection, sendContactToMake, sendOrderToMake } from '@/lib/make-webhook'
import { MAKE_CONFIG, isMakeConfigured } from '@/lib/make-config'

export async function GET() {
  try {
    // Check if Make.com is configured
    if (!isMakeConfigured()) {
      return NextResponse.json({
        success: false,
        message: 'Make.com webhooks not configured',
        config: {
          contactWebhook: !!MAKE_CONFIG.CONTACT_WEBHOOK,
          orderWebhook: !!MAKE_CONFIG.ORDER_WEBHOOK,
          enabled: MAKE_CONFIG.ENABLED
        }
      }, { status: 400 })
    }

    // Test connection
    const result = await testMakeConnection()
    
    return NextResponse.json({
      success: result.success,
      message: result.message,
      timestamp: new Date().toISOString(),
      config: {
        contactWebhook: !!MAKE_CONFIG.CONTACT_WEBHOOK,
        orderWebhook: !!MAKE_CONFIG.ORDER_WEBHOOK,
        enabled: MAKE_CONFIG.ENABLED
      }
    }, { 
      status: result.success ? 200 : 400 
    })

  } catch (error) {
    console.error('Test Make.com API Error:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, data } = body

    if (!isMakeConfigured()) {
      return NextResponse.json({
        success: false,
        message: 'Make.com webhooks not configured'
      }, { status: 400 })
    }

    let result = false
    let message = ''

    switch (type) {
      case 'contact':
        result = await sendContactToMake({
          name: data.name || 'Test Contact',
          email: data.email || 'test@example.com',
          phone: data.phone || '01234567890',
          message: data.message || 'Test message from Make.com integration'
        })
        message = result ? 'Contact test sent successfully' : 'Contact test failed'
        break

      case 'order':
        result = await sendOrderToMake({
          name: data.name || 'Test Customer',
          email: data.email || 'test@example.com',
          phone: data.phone || '01234567890',
          address: data.address || 'Test Address',
          city: data.city || 'Cairo',
          quantity: data.quantity || 1,
          totalPrice: data.totalPrice || 999
        })
        message = result ? 'Order test sent successfully' : 'Order test failed'
        break

      default:
        return NextResponse.json({
          success: false,
          message: 'Invalid test type. Use "contact" or "order"'
        }, { status: 400 })
    }

    return NextResponse.json({
      success: result,
      message,
      type,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Test Make.com POST API Error:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// Handle other HTTP methods
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
