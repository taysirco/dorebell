# Dorebell - Smart Doorbell Landing Page

A complete, conversion-optimized Arabic RTL e-commerce landing page for a Smart Doorbell with Camera product. Built with Next.js 14, TypeScript, and Tailwind CSS with comprehensive mobile optimizations and automation integrations.

## 🚀 Features

### 📱 Mobile-First Optimizations
- **Touch-Optimized Interface** - Minimum 44px touch targets, optimized button spacing
- **Responsive Typography** - Fluid text scaling across all device sizes
- **Mobile Performance** - Hardware acceleration, smooth scrolling, optimized images
- **Safe Area Support** - iPhone X+ safe area handling for sticky elements
- **Touch Gestures** - Swipe support in gallery, touch-friendly interactions
- **Mobile Navigation** - Collapsible elements, sticky positioning

### 🇦🇪 Arabic RTL Excellence
- **Complete RTL Layout** - Right-to-left design with proper text alignment
- **Arabic Typography** - Cairo font with optimized Arabic text rendering
- **RTL Utilities** - Custom Tailwind utilities for RTL spacing and positioning
- **Arabic Numbers** - Proper Arabic-Indic numeral formatting where appropriate

### 💰 Conversion Optimization
- **Multiple CTAs** - Strategic call-to-action placement throughout the page
- **Sticky Mobile Bar** - Fixed bottom bar with price and order button
- **Social Proof** - Customer reviews, ratings, and trust badges
- **Urgency Elements** - Savings highlights and limited-time offers
- **Smooth Scrolling** - Seamless navigation to order form

### 🔒 Advanced Form System
- **Egyptian Phone Validation** - Real-time validation for Egyptian mobile numbers
- **Anti-Spam Protection** - Honeypot fields and rate limiting
- **Real-Time Feedback** - Instant validation feedback and error handling
- **WhatsApp Integration** - Direct order placement via WhatsApp
- **Success Handling** - Automatic redirect to thank you page

### 🛠 Make.com Integration
- **Google Sheets Automation** - Automatic order data export to Google Sheets
- **Contact Form Integration** - Customer inquiries automatically logged
- **Webhook Support** - Reliable data transmission with error handling
- **Formatted Data** - Pre-formatted fields for easy spreadsheet management

### 📊 Analytics & SEO
- **Google Analytics Ready** - Complete event tracking for conversions
- **JSON-LD Schema** - Product and FAQ structured data for SEO
- **Sitemap Generation** - Automatic sitemap creation for search engines
- **Meta Optimization** - Complete Open Graph and Twitter Card meta tags
- **Performance Metrics** - Optimized for Core Web Vitals

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Font:** Google Fonts (Cairo)
- **Images:** Next.js Image optimization
- **Form Handling:** Custom API routes
- **SEO:** JSON-LD structured data

## 📄 Complete Page Structure

### Main Landing Page (`/`)
- **Header** - Logo, warranty badge, pricing
- **Hero Section** - Product showcase, main CTA, trust badges
- **Features Grid** - 10 numbered features with icons and descriptions
- **Use Cases** - Visual demonstration of product benefits
- **Specifications** - Technical details and box contents
- **Gallery** - Product images with lightbox functionality
- **FAQ Section** - Accordion-style frequently asked questions
- **Reviews** - Customer testimonials with star ratings
- **Final CTA** - Compelling call-to-action section
- **Order Form** - Complete order form with validation
- **Footer** - Contact information and additional links

### Additional Pages
- **Privacy Policy** (`/privacy`) - Complete privacy policy in Arabic
- **Terms of Service** (`/terms`) - Comprehensive terms and conditions
- **Contact Page** (`/contact`) - Contact form with multiple communication options
- **Thank You Page** (`/thank-you`) - Order confirmation and next steps
- **404 Page** - Custom not found page with helpful navigation

## 🏗 Project Structure

```
dorebell/
├── app/
│   ├── api/
│   │   ├── contact/route.ts   # Contact form API endpoint
│   │   └── order/route.ts     # Order form API endpoint
│   ├── contact/page.tsx       # Contact page
│   ├── privacy/page.tsx       # Privacy policy page
│   ├── terms/page.tsx         # Terms of service page
│   ├── thank-you/page.tsx     # Thank you page
│   ├── globals.css            # Global styles with mobile optimizations
│   ├── layout.tsx             # Root layout with RTL and metadata
│   ├── not-found.tsx          # Custom 404 page
│   ├── page.tsx               # Main landing page
│   ├── robots.ts              # Robots.txt generation
│   └── sitemap.ts             # Sitemap generation
├── components/
│   ├── Badge.tsx              # Reusable badge component
│   ├── FAQItem.tsx            # FAQ accordion component
│   ├── FeatureCard.tsx        # Feature cards with icons
│   ├── Gallery.tsx            # Image gallery with lightbox
│   ├── OrderForm.tsx          # Complete order form with validation
│   └── StickyBar.tsx          # Mobile sticky bottom bar
├── public/
│   ├── images/                # Product images
│   └── videos/                # Product videos
├── types/
│   └── global.d.ts            # TypeScript global definitions
├── ENVIRONMENT_SETUP.md       # Environment variables guide
└── Configuration files
```

## Key Components

### OrderForm
- Egyptian phone number validation
- Anti-spam honeypot field
- Real-time validation feedback
- WhatsApp integration
- Success/error handling

### Gallery
- Lightbox functionality
- Touch/swipe support
- Lazy loading
- Responsive grid layout

### FAQSection
- Accordion-style Q&A
- Smooth animations
- SEO-friendly markup

## Getting Started

1. **Install dependencies:**
```bash
npm install
# or
pnpm install
```

2. **Run the development server:**
```bash
npm run dev
# or
pnpm dev
```

3. **Open [http://localhost:3000](http://localhost:3000)**

## Configuration

### WhatsApp Integration
Update the WhatsApp number in `app/page.tsx`:
```typescript
const WHATSAPP_NUMBER = '+20 120 523 4797' // Replace with actual number
```

### Order API Integration
The order API endpoint (`/api/order`) currently logs orders to console. For production:

1. **Database Integration:** Add your preferred database (MongoDB, PostgreSQL, etc.)
2. **Email Notifications:** Integrate with email service (SendGrid, etc.)
3. **SMS Integration:** Add SMS confirmation service
4. **CRM Integration:** Connect to your CRM or Google Sheets

### Analytics
Add your Google Analytics tracking ID to enable conversion tracking.

## SEO Features

- **Meta Tags:** Complete Open Graph and Twitter Card meta tags
- **JSON-LD:** Product and FAQ structured data
- **Sitemap:** Auto-generated sitemap
- **Canonical URLs:** Proper canonical URL structure

## Performance Features

- **Image Optimization:** Next.js Image component with WebP/AVIF support
- **Lazy Loading:** Below-the-fold content lazy loaded
- **Code Splitting:** Automatic code splitting with Next.js
- **Caching:** Proper caching headers for static assets

## Arabic/RTL Features

- **RTL Layout:** Complete right-to-left layout
- **Arabic Typography:** Optimized Arabic font rendering
- **RTL Utilities:** Custom Tailwind utilities for RTL spacing
- **Number Formatting:** Arabic-Indic numerals where appropriate

## Deployment

### Vercel (Recommended)
```bash
npm run build
```

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Heroku
- DigitalOcean App Platform

## Customization

### Colors
Update the color scheme in `tailwind.config.js`:
```javascript
colors: {
  'navy': '#1e3a8a',        // Primary brand color
  'rose-red': '#e11d48',    // CTA button color
}
```

### Content
All content is in Arabic and can be updated directly in the components. Key content areas:
- Product name and pricing in `app/page.tsx`
- Feature descriptions in the features section
- FAQ content in the `faqs` array
- Trust badges and testimonials

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile 88+)

## License

This project is proprietary. All rights reserved.

## Support

For technical support or customization requests, please contact the development team.
