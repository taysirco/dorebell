import { NextRequest, NextResponse } from 'next/server'
import { trackClickButton } from '@/lib/tiktok-api'

// Simple rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

function rateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 5 * 60 * 1000 // 5 minutes
  const maxRequests = 20 // Max 20 button clicks per 5 minutes per IP

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
    const { button_text, content_id, content_name, user_data } = body

    // Validate required fields
    if (!button_text) {
      return NextResponse.json(
        { error: 'button_text is required' },
        { status: 400 }
      )
    }

    // TikTok Events API - Track ClickButton (server-side)
    try {
      const success = await trackClickButton({
        button_text,
        content_id: content_id || 'website-button',
        content_name: content_name || `Button: ${button_text}`,
        user: user_data,
        context: {
          ip: ip,
          user_agent: request.headers.get('user-agent') || '',
          url: request.headers.get('origin') || ''
        }
      })

      if (success) {
        return NextResponse.json({
          success: true,
          message: 'ClickButton event tracked successfully'
        })
      } else {
        return NextResponse.json(
          { error: 'Failed to track ClickButton event' },
          { status: 500 }
        )
      }
    } catch (error) {
      console.error('TikTok ClickButton API Error:', error)
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('TikTok Button API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST.' },
    { status: 405 }
  )
}
