import crypto from 'crypto'

// TikTok Events API Configuration
const TIKTOK_CONFIG = {
  PIXEL_ID: 'D2JK9NRC77UFE4JPKPVG',
  ACCESS_TOKEN: process.env.TIKTOK_ACCESS_TOKEN || '4b9a5abddd403ced5be3eaf1b02cfb318a516b3b',
  API_ENDPOINT: 'https://business-api.tiktok.com/open_api/v1.3/event/track/',
  ENABLED: process.env.ENABLE_TIKTOK_API === 'true'
}

// Event types
export type TikTokEventType = 
  | 'ViewContent'
  | 'AddToCart'
  | 'InitiateCheckout'
  | 'PlaceAnOrder'
  | 'CompleteRegistration'
  | 'Purchase'
  | 'AddPaymentInfo'
  | 'AddToWishlist'
  | 'Search'
  | 'Contact'
  | 'SubmitForm'
  | 'ClickButton'
  | 'Lead'

// Event data interface
export interface TikTokEventData {
  event: TikTokEventType
  event_id: string
  event_time: number
  pixel_code: string
  properties?: {
    value?: number
    currency?: string
    content_id?: string
    content_type?: string
    content_name?: string
    search_string?: string
    description?: string
    url?: string
    button_text?: string
    lead_description?: string
  }
  context?: {
    user_agent?: string
    ip?: string
    url?: string
  }
  user?: {
    email?: string
    phone?: string
    external_id?: string
    ttclid?: string
    ttp?: string
  }
}

// Hash user data for privacy (SHA-256)
function hashUserData(data: string): string {
  return crypto.createHash('sha256').update(data.toLowerCase().trim()).digest('hex')
}

// Generate unique event ID
function generateEventId(): string {
  return `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Send event to TikTok Events API
export async function sendTikTokEvent(eventData: Partial<TikTokEventData>): Promise<boolean> {
  if (!TIKTOK_CONFIG.ENABLED) {
    console.log('TikTok Events API is disabled')
    return false
  }

  try {
    const payload = {
      pixel_code: TIKTOK_CONFIG.PIXEL_ID,
      event: eventData.event,
      event_id: eventData.event_id || generateEventId(),
      timestamp: eventData.event_time || Math.floor(Date.now() / 1000),
      properties: eventData.properties || {},
      context: {
        user_agent: eventData.context?.user_agent || '',
        ip: eventData.context?.ip || '',
        url: eventData.context?.url || ''
      }
    }

    // Add hashed user data if available
    if (eventData.user) {
      const userData: any = {}
      
      if (eventData.user.email) {
        userData.email = hashUserData(eventData.user.email)
      }
      
      if (eventData.user.phone) {
        // Remove any non-digit characters and hash
        const cleanPhone = eventData.user.phone.replace(/\D/g, '')
        userData.phone = hashUserData(cleanPhone)
      }
      
      if (eventData.user.external_id) {
        userData.external_id = hashUserData(eventData.user.external_id)
      }

      if (Object.keys(userData).length > 0) {
        (payload as any).context.user = userData
      }
    }

    const response = await fetch(TIKTOK_CONFIG.API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': TIKTOK_CONFIG.ACCESS_TOKEN,
        'User-Agent': 'Dorebell/1.0'
      },
      body: JSON.stringify({
        pixel_code: TIKTOK_CONFIG.PIXEL_ID,
        event: payload.event,
        event_id: payload.event_id,
        timestamp: payload.timestamp,
        properties: payload.properties,
        context: payload.context
      })
    })

    if (response.ok) {
      const result = await response.json()
      console.log('TikTok Event sent successfully:', {
        event: payload.event,
        event_id: payload.event_id,
        response: result
      })
      return true
    } else {
      const errorText = await response.text()
      console.error('TikTok Events API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      })
      return false
    }
  } catch (error) {
    console.error('TikTok Events API Network Error:', error)
    return false
  }
}

// Specific event helpers
export async function trackViewContent(data: {
  content_id: string
  content_name: string
  value?: number
  currency?: string
  user?: TikTokEventData['user']
  context?: TikTokEventData['context']
}): Promise<boolean> {
  return sendTikTokEvent({
    event: 'ViewContent',
    properties: {
      content_id: data.content_id,
      content_name: data.content_name,
      content_type: 'product',
      value: data.value,
      currency: data.currency || 'EGP'
    },
    user: data.user,
    context: data.context
  })
}

export async function trackAddToCart(data: {
  content_id: string
  content_name: string
  value: number
  currency?: string
  quantity?: number
  user?: TikTokEventData['user']
  context?: TikTokEventData['context']
}): Promise<boolean> {
  return sendTikTokEvent({
    event: 'AddToCart',
    properties: {
      content_id: data.content_id,
      content_name: data.content_name,
      content_type: 'product',
      value: data.value,
      currency: data.currency || 'EGP',
      description: `Added ${data.quantity || 1} item(s) to cart`
    },
    user: data.user,
    context: data.context
  })
}

export async function trackInitiateCheckout(data: {
  content_id: string
  content_name: string
  value: number
  currency?: string
  user?: TikTokEventData['user']
  context?: TikTokEventData['context']
}): Promise<boolean> {
  return sendTikTokEvent({
    event: 'InitiateCheckout',
    properties: {
      content_id: data.content_id,
      content_name: data.content_name,
      content_type: 'product',
      value: data.value,
      currency: data.currency || 'EGP',
      description: 'Checkout process initiated'
    },
    user: data.user,
    context: data.context
  })
}

export async function trackPlaceAnOrder(data: {
  content_id: string
  content_name: string
  value: number
  currency?: string
  order_id?: string
  user?: TikTokEventData['user']
  context?: TikTokEventData['context']
}): Promise<boolean> {
  return sendTikTokEvent({
    event: 'PlaceAnOrder',
    event_id: data.order_id ? `order_${data.order_id}` : undefined,
    properties: {
      content_id: data.content_id,
      content_name: data.content_name,
      content_type: 'product',
      value: data.value,
      currency: data.currency || 'EGP',
      description: `Order placed: ${data.order_id || 'N/A'}`
    },
    user: data.user,
    context: data.context
  })
}

export async function trackPurchase(data: {
  content_id: string
  content_name: string
  value: number
  currency?: string
  order_id?: string
  user?: TikTokEventData['user']
  context?: TikTokEventData['context']
}): Promise<boolean> {
  return sendTikTokEvent({
    event: 'Purchase',
    event_id: data.order_id ? `purchase_${data.order_id}` : undefined,
    properties: {
      content_id: data.content_id,
      content_name: data.content_name,
      content_type: 'product',
      value: data.value,
      currency: data.currency || 'EGP',
      description: `Purchase completed: ${data.order_id || 'N/A'}`
    },
    user: data.user,
    context: data.context
  })
}

export async function trackContact(data: {
  content_id?: string
  content_name?: string
  user?: TikTokEventData['user']
  context?: TikTokEventData['context']
}): Promise<boolean> {
  return sendTikTokEvent({
    event: 'Contact',
    properties: {
      content_id: data.content_id || 'contact-form',
      content_name: data.content_name || 'Contact Form Submission',
      content_type: 'contact',
      description: 'Contact form submitted'
    },
    user: data.user,
    context: data.context
  })
}

export async function trackSubmitForm(data: {
  content_id: string
  content_name: string
  value?: number
  currency?: string
  user?: TikTokEventData['user']
  context?: TikTokEventData['context']
}): Promise<boolean> {
  return sendTikTokEvent({
    event: 'SubmitForm',
    properties: {
      content_id: data.content_id,
      content_name: data.content_name,
      content_type: 'form',
      value: data.value,
      currency: data.currency || 'EGP',
      description: 'Form submitted - Lead generated'
    },
    user: data.user,
    context: data.context
  })
}

export async function trackSearch(data: {
  search_string: string
  content_id?: string
  content_name?: string
  user?: TikTokEventData['user']
  context?: TikTokEventData['context']
}): Promise<boolean> {
  return sendTikTokEvent({
    event: 'Search',
    properties: {
      content_id: data.content_id || 'search-query',
      content_name: data.content_name || `Search: ${data.search_string}`,
      content_type: 'search',
      search_string: data.search_string,
      description: `User searched for: ${data.search_string}`
    },
    user: data.user,
    context: data.context
  })
}

export async function trackClickButton(data: {
  button_text: string
  content_id?: string
  content_name?: string
  user?: TikTokEventData['user']
  context?: TikTokEventData['context']
}): Promise<boolean> {
  return sendTikTokEvent({
    event: 'ClickButton',
    properties: {
      content_id: data.content_id || 'button-click',
      content_name: data.content_name || `Button: ${data.button_text}`,
      content_type: 'button',
      button_text: data.button_text,
      description: `Button clicked: ${data.button_text}`
    },
    user: data.user,
    context: data.context
  })
}

export async function trackAddToWishlist(data: {
  content_id: string
  content_name: string
  value?: number
  currency?: string
  user?: TikTokEventData['user']
  context?: TikTokEventData['context']
}): Promise<boolean> {
  return sendTikTokEvent({
    event: 'AddToWishlist',
    properties: {
      content_id: data.content_id,
      content_name: data.content_name,
      content_type: 'product',
      value: data.value,
      currency: data.currency || 'EGP',
      description: 'Item added to wishlist'
    },
    user: data.user,
    context: data.context
  })
}

export async function trackCompleteRegistration(data: {
  content_id?: string
  content_name?: string
  user?: TikTokEventData['user']
  context?: TikTokEventData['context']
}): Promise<boolean> {
  return sendTikTokEvent({
    event: 'CompleteRegistration',
    properties: {
      content_id: data.content_id || 'user-registration',
      content_name: data.content_name || 'User Registration',
      content_type: 'registration',
      description: 'User registration completed'
    },
    user: data.user,
    context: data.context
  })
}

export async function trackLead(data: {
  lead_description: string
  content_id?: string
  content_name?: string
  value?: number
  currency?: string
  user?: TikTokEventData['user']
  context?: TikTokEventData['context']
}): Promise<boolean> {
  return sendTikTokEvent({
    event: 'Lead',
    properties: {
      content_id: data.content_id || 'lead-generated',
      content_name: data.content_name || 'Lead Generated',
      content_type: 'lead',
      value: data.value,
      currency: data.currency || 'EGP',
      lead_description: data.lead_description,
      description: `Lead: ${data.lead_description}`
    },
    user: data.user,
    context: data.context
  })
}
