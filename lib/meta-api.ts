import crypto from 'crypto'

// Meta Conversions API Configuration
const META_CONFIG = {
  PIXEL_ID: '654285637690717',
  ACCESS_TOKEN: process.env.META_ACCESS_TOKEN || 'EAAQD7Y9Aw1gBPEdgTGb7U8rWM5Hd1IPNZA7EwvUhF5pihHUPy3NxGZArdd1Y7fkuJTor6ZBg4bebAMfeZBEMGvENypvuCau7TcO7xr5iXMKWHwymwVF96VgYBTGkKZBljW7t1nEUB9ZA1x0pAg3t0oIjOjZAtJtpIGDLWPSAyUNQfWDWmmRZANfwPaBAwMtE6XSxsQZDZD',
  API_VERSION: 'v19.0',
  API_ENDPOINT: 'https://graph.facebook.com/v19.0',
  ENABLED: process.env.ENABLE_META_API === 'true'
}

// Event types for Meta Conversions API
export type MetaEventType = 
  | 'PageView'
  | 'ViewContent'
  | 'Search'
  | 'AddToCart'
  | 'AddToWishlist'
  | 'InitiateCheckout'
  | 'AddPaymentInfo'
  | 'Purchase'
  | 'Lead'
  | 'CompleteRegistration'
  | 'Contact'
  | 'SubmitApplication'

// Event data interface for Meta Conversions API
export interface MetaEventData {
  event_name: MetaEventType
  event_time: number
  event_id?: string
  event_source_url?: string
  action_source: 'website'
  user_data: {
    em?: string[]      // email (hashed)
    ph?: string[]      // phone (hashed)
    external_id?: string[]  // external_id (hashed)
    client_ip_address?: string
    client_user_agent?: string
    fbc?: string       // Facebook click ID
    fbp?: string       // Facebook browser ID
  }
  custom_data?: {
    value?: number
    currency?: string
    content_ids?: string[]
    content_type?: string
    content_name?: string
    search_string?: string
    num_items?: number
    content_category?: string
    delivery_category?: string
  }
}

// Hash user data for privacy (SHA-256)
function hashUserData(data: string): string {
  return crypto.createHash('sha256').update(data.toLowerCase().trim()).digest('hex')
}

// Generate unique event ID
function generateEventId(): string {
  return `meta_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Normalize phone number for hashing
function normalizePhone(phone: string): string {
  // Remove all non-digit characters and add country code if missing
  const cleaned = phone.replace(/\D/g, '')
  // If starts with 01, assume Egypt and add +20
  if (cleaned.startsWith('01')) {
    return `20${cleaned}`
  }
  // If already has country code, return as is
  if (cleaned.startsWith('20')) {
    return cleaned
  }
  // Default to adding +20 for Egypt
  return `20${cleaned}`
}

// Send event to Meta Conversions API
export async function sendMetaEvent(eventData: Partial<MetaEventData>): Promise<boolean> {
  if (!META_CONFIG.ENABLED) {
    console.log('Meta Conversions API is disabled')
    return false
  }

  try {
    const payload = {
      data: [{
        event_name: eventData.event_name,
        event_time: eventData.event_time || Math.floor(Date.now() / 1000),
        event_id: eventData.event_id || generateEventId(),
        event_source_url: eventData.event_source_url || '',
        action_source: 'website',
        user_data: eventData.user_data || {},
        custom_data: eventData.custom_data || {}
      }],
      test_event_code: process.env.META_TEST_EVENT_CODE || undefined
    }

    const url = `${META_CONFIG.API_ENDPOINT}/${META_CONFIG.PIXEL_ID}/events?access_token=${META_CONFIG.ACCESS_TOKEN}`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Dorebell/1.0'
      },
      body: JSON.stringify(payload)
    })

    if (response.ok) {
      const result = await response.json()
      console.log('Meta Conversions API Event sent successfully:', {
        event: eventData.event_name,
        event_id: payload.data[0].event_id,
        response: result
      })
      return true
    } else {
      const errorText = await response.text()
      console.error('Meta Conversions API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      })
      return false
    }
  } catch (error) {
    console.error('Meta Conversions API Network Error:', error)
    return false
  }
}

// Specific event helpers
export async function trackMetaPageView(data: {
  user_email?: string
  user_phone?: string
  client_ip?: string
  user_agent?: string
  event_source_url?: string
}): Promise<boolean> {
  const user_data: MetaEventData['user_data'] = {
    client_ip_address: data.client_ip,
    client_user_agent: data.user_agent
  }

  if (data.user_email) {
    user_data.em = [hashUserData(data.user_email)]
  }

  if (data.user_phone) {
    user_data.ph = [hashUserData(normalizePhone(data.user_phone))]
  }

  return sendMetaEvent({
    event_name: 'PageView',
    event_source_url: data.event_source_url,
    user_data
  })
}

export async function trackMetaViewContent(data: {
  content_id: string
  content_name: string
  content_type?: string
  value?: number
  currency?: string
  user_email?: string
  user_phone?: string
  client_ip?: string
  user_agent?: string
  event_source_url?: string
}): Promise<boolean> {
  const user_data: MetaEventData['user_data'] = {
    client_ip_address: data.client_ip,
    client_user_agent: data.user_agent
  }

  if (data.user_email) {
    user_data.em = [hashUserData(data.user_email)]
  }

  if (data.user_phone) {
    user_data.ph = [hashUserData(normalizePhone(data.user_phone))]
  }

  return sendMetaEvent({
    event_name: 'ViewContent',
    event_source_url: data.event_source_url,
    user_data,
    custom_data: {
      content_ids: [data.content_id],
      content_name: data.content_name,
      content_type: data.content_type || 'product',
      value: data.value,
      currency: data.currency || 'EGP'
    }
  })
}

export async function trackMetaLead(data: {
  value?: number
  currency?: string
  content_name?: string
  user_email?: string
  user_phone?: string
  external_id?: string
  client_ip?: string
  user_agent?: string
  event_source_url?: string
}): Promise<boolean> {
  const user_data: MetaEventData['user_data'] = {
    client_ip_address: data.client_ip,
    client_user_agent: data.user_agent
  }

  if (data.user_email) {
    user_data.em = [hashUserData(data.user_email)]
  }

  if (data.user_phone) {
    user_data.ph = [hashUserData(normalizePhone(data.user_phone))]
  }

  if (data.external_id) {
    user_data.external_id = [hashUserData(data.external_id)]
  }

  return sendMetaEvent({
    event_name: 'Lead',
    event_source_url: data.event_source_url,
    user_data,
    custom_data: {
      value: data.value,
      currency: data.currency || 'EGP',
      content_name: data.content_name || 'Lead Generated'
    }
  })
}

export async function trackMetaPurchase(data: {
  value: number
  currency?: string
  content_ids?: string[]
  content_name?: string
  num_items?: number
  order_id?: string
  user_email?: string
  user_phone?: string
  external_id?: string
  client_ip?: string
  user_agent?: string
  event_source_url?: string
}): Promise<boolean> {
  const user_data: MetaEventData['user_data'] = {
    client_ip_address: data.client_ip,
    client_user_agent: data.user_agent
  }

  if (data.user_email) {
    user_data.em = [hashUserData(data.user_email)]
  }

  if (data.user_phone) {
    user_data.ph = [hashUserData(normalizePhone(data.user_phone))]
  }

  if (data.external_id) {
    user_data.external_id = [hashUserData(data.external_id)]
  }

  return sendMetaEvent({
    event_name: 'Purchase',
    event_id: data.order_id ? `purchase_${data.order_id}` : undefined,
    event_source_url: data.event_source_url,
    user_data,
    custom_data: {
      value: data.value,
      currency: data.currency || 'EGP',
      content_ids: data.content_ids || ['doorbell-smart-camera'],
      content_name: data.content_name || 'Product Purchase',
      num_items: data.num_items || 1,
      content_type: 'product'
    }
  })
}

export async function trackMetaInitiateCheckout(data: {
  value: number
  currency?: string
  content_ids?: string[]
  content_name?: string
  num_items?: number
  user_email?: string
  user_phone?: string
  external_id?: string
  client_ip?: string
  user_agent?: string
  event_source_url?: string
}): Promise<boolean> {
  const user_data: MetaEventData['user_data'] = {
    client_ip_address: data.client_ip,
    client_user_agent: data.user_agent
  }

  if (data.user_email) {
    user_data.em = [hashUserData(data.user_email)]
  }

  if (data.user_phone) {
    user_data.ph = [hashUserData(normalizePhone(data.user_phone))]
  }

  if (data.external_id) {
    user_data.external_id = [hashUserData(data.external_id)]
  }

  return sendMetaEvent({
    event_name: 'InitiateCheckout',
    event_source_url: data.event_source_url,
    user_data,
    custom_data: {
      value: data.value,
      currency: data.currency || 'EGP',
      content_ids: data.content_ids || ['doorbell-smart-camera'],
      content_name: data.content_name || 'Checkout Initiated',
      num_items: data.num_items || 1,
      content_type: 'product'
    }
  })
}

export async function trackMetaContact(data: {
  content_name?: string
  user_email?: string
  user_phone?: string
  external_id?: string
  client_ip?: string
  user_agent?: string
  event_source_url?: string
}): Promise<boolean> {
  const user_data: MetaEventData['user_data'] = {
    client_ip_address: data.client_ip,
    client_user_agent: data.user_agent
  }

  if (data.user_email) {
    user_data.em = [hashUserData(data.user_email)]
  }

  if (data.user_phone) {
    user_data.ph = [hashUserData(normalizePhone(data.user_phone))]
  }

  if (data.external_id) {
    user_data.external_id = [hashUserData(data.external_id)]
  }

  return sendMetaEvent({
    event_name: 'Contact',
    event_source_url: data.event_source_url,
    user_data,
    custom_data: {
      content_name: data.content_name || 'Contact Form Submission',
      content_type: 'contact'
    }
  })
}
