// Utility functions for pixel tracking with safe checks

// Check if Meta Pixel (fbq) is loaded and ready
export function isMetaPixelReady(): boolean {
  return typeof window !== 'undefined' && 
         typeof (window as any).fbq === 'function' &&
         (window as any).fbq.loaded === true
}

// Check if TikTok Pixel (ttq) is loaded and ready
export function isTikTokPixelReady(): boolean {
  return typeof window !== 'undefined' && 
         typeof (window as any).ttq === 'object' &&
         (window as any).ttq.loaded === true
}

// Safe Meta Pixel tracking function
export function trackMetaPixel(eventName: string, parameters?: any): void {
  if (isMetaPixelReady()) {
    try {
      (window as any).fbq('track', eventName, parameters)
    } catch (error) {
      console.log(`Meta Pixel ${eventName} tracking error:`, error)
    }
  } else {
    console.log(`Meta Pixel not ready for ${eventName} tracking`)
  }
}

// Safe TikTok Pixel tracking function
export function trackTikTokPixel(eventName: string, parameters?: any): void {
  if (isTikTokPixelReady()) {
    try {
      (window as any).ttq.track(eventName, parameters)
    } catch (error) {
      console.log(`TikTok Pixel ${eventName} tracking error:`, error)
    }
  } else {
    console.log(`TikTok Pixel not ready for ${eventName} tracking`)
  }
}

// Wait for Meta Pixel to load with timeout
export function waitForMetaPixel(timeout: number = 5000): Promise<boolean> {
  return new Promise((resolve) => {
    if (isMetaPixelReady()) {
      resolve(true)
      return
    }

    const startTime = Date.now()
    const checkInterval = setInterval(() => {
      if (isMetaPixelReady()) {
        clearInterval(checkInterval)
        resolve(true)
      } else if (Date.now() - startTime > timeout) {
        clearInterval(checkInterval)
        console.log('Meta Pixel load timeout')
        resolve(false)
      }
    }, 100)
  })
}

// Wait for TikTok Pixel to load with timeout
export function waitForTikTokPixel(timeout: number = 5000): Promise<boolean> {
  return new Promise((resolve) => {
    if (isTikTokPixelReady()) {
      resolve(true)
      return
    }

    const startTime = Date.now()
    const checkInterval = setInterval(() => {
      if (isTikTokPixelReady()) {
        clearInterval(checkInterval)
        resolve(true)
      } else if (Date.now() - startTime > timeout) {
        clearInterval(checkInterval)
        console.log('TikTok Pixel load timeout')
        resolve(false)
      }
    }, 100)
  })
}
