// Make.com Integration Configuration
export const MAKE_CONFIG = {
  // Webhook URLs - Replace with your actual Make.com webhook URLs
  CONTACT_WEBHOOK: process.env.MAKE_CONTACT_WEBHOOK_URL || '',
  ORDER_WEBHOOK: process.env.MAKE_ORDER_WEBHOOK_URL || '',
  
  // API Configuration
  API_KEY: process.env.MAKE_API_KEY || '',
  WEBHOOK_SECRET: process.env.WEBHOOK_SECRET || '',
  
  // Settings
  ENABLED: process.env.ENABLE_WEBHOOKS === 'true' && process.env.NODE_ENV === 'production',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'admin@dorebell.com',
  
  // Retry configuration
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1 second
  
  // Timeout settings
  TIMEOUT: 10000, // 10 seconds
};

// Validation function
export const validateMakeConfig = () => {
  const missingVars = [];
  
  if (!MAKE_CONFIG.CONTACT_WEBHOOK) missingVars.push('MAKE_CONTACT_WEBHOOK_URL');
  if (!MAKE_CONFIG.ORDER_WEBHOOK) missingVars.push('MAKE_ORDER_WEBHOOK_URL');
  
  if (missingVars.length > 0) {
    console.warn('⚠️ Missing Make.com environment variables:', missingVars.join(', '));
    return false;
  }
  
  return true;
};

// Helper function to check if Make.com integration is properly configured
export const isMakeConfigured = () => {
  return MAKE_CONFIG.ENABLED && validateMakeConfig();
};
