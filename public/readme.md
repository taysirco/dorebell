
Build a fast Arabic RTL landing page for a single product (Smart Doorbell with Camera) with Cash-on-Delivery leads. The page should be simple, mobile-first, conversion-focused, and inspired by the long modular layout in the provided screenshot (hero → badges → features → use-cases → specs → gallery → FAQ → reviews → sticky CTA → order form at bottom).

Tech & Project Setup

Framework: Next.js 14 (App Router) + TypeScript + Tailwind CSS.

RTL + Arabic: use dir="rtl" and lang="ar".

Font: Google Fonts “Cairo”.

Components: keep dependencies minimal; vanilla React + Tailwind is fine.

Assets: use images/videos from the project’s public/ (if an alias @public/ exists, use it). Gracefully handle missing files with a neutral gradient placeholder.

Performance: responsive images via next/image, lazy loading below-the-fold, compress images, no blocking scripts.

SEO: meta, OpenGraph, Twitter cards, canonical, JSON-LD Product + FAQ.

Tracking: simple dataLayer.push({event:"lead_submitted"}) on successful submit.

Accessibility: semantic tags, labels, focus states, proper contrast.

Brand & UI

Clean, modern, high trust. Colors: Black/White as base, Navy accents, Rose-Red for CTA (hover darken).

Sticky bottom bar on mobile (price + “اطلب الآن”).

Primary CTA scrolls smoothly to the order form. Secondary CTA opens WhatsApp with prefilled message.

Content (Arabic – use verbatim, fix obvious typos):

Product Name: جرس الباب الذكي بالكاميرا

Price: ١٩٩٩ جنيه بدلًا من ٢٧٠٠ جنيه + شارة الدفع عند الاستلام

Warranty: ضمان ٣ سنوات

Hero tagline: "خليك عارف مين على بابك حتى وانت مش في البيت! جرس الباب الذكي بالكاميرا هيخليك تشوف وتسمع وترد من موبايلك – أمانك دلوقتي بلمسة!"

Trust badges under hero: الدفع عند الاستلام | ضمان ٣ سنوات | استبدال خلال ١٤ يوم | شحن سريع

Features (show as numbered grid with icons):

كاميرا HD بزاوية واسعة 80° — صورة واضحة نهارًا وليلًا.

اتصال Wi-Fi ذكي بدون أسلاك — إشعار فوري عند الضغط على الجرس.

رؤية ليلية بالأشعة تحت الحمراء — وضوح كامل في الظلام.

اتصال صوتي ثنائي الاتجاه + تغيير الصوت — مايك نقي مع فلتر ضوضاء.

تصوير تلقائي وإشعار لحظي — لقطة تُرسل لموبايلك فورًا.

تحكم كامل من التطبيق — Android و iOS (فتح الكاميرا/الرد/التصوير).

كشف حركة + إنذار PIR — تنبيه عند أي حركة غريبة.

مقاوم للعوامل الجوية — يعمل في المطر والحر والبرد.

تشغيل بالبطاريات (غير مرفقة) — تركيب سهل بدون تمديدات.

مشاركة مع أفراد البيت — مشاهدة من أكثر من موبايل.

Specs (2-column table):

الرؤية: HD بعدسة 80°

الرؤية الليلية: Infrared تلقائي

الاتصال: Wi-Fi

التحكم: تطبيق Android / iOS

الصوت: ثنائي الاتجاه + تغيير الصوت

البطارية: تعمل بالبطاريات (غير مرفقة)

الطقس: مقاوم للماء والظروف الجوية

الوزن: ~90 جم

الحجم: ‎7.2 × 4.5 سم

Box Contents (cards): جرس بالكاميرا – كُتيب تعليمات – أداة تركيب – وحدة Dingdong

Social proof (optional): 3–4 بطاقات تقييم مختصرة بنجوم.

CTA blocks repeated between sections: "اطلب الآن – الدفع عند الاستلام"

Footer note: "وفر لنفسك راحة البال – وراقب بيتك من أي مكان في العالم!"

Media
Try to use (if present):

/public/

If not found, render a placeholder block with alt text.

Page Sections (order & behavior):

Header (minimal): logo (optional), price chip “١٩٩٩ بدلًا من ٢٧٠٠”، badge “ضمان ٣ سنوات”.

Hero: product image/video (autoplay muted loop for video), headline, price, trust badges, primary CTA (scroll to form), secondary CTA (WhatsApp).

Mini advantages strip: 4 compact badges (COD, 3-yr warranty, fast shipping, easy install).

Features grid: 2 or 3 columns on desktop, stacked on mobile, with simple line icons.

Use cases collage: صور شخص يرن، ليل/نهار، أم مع أطفال — each with caption.

Specs table + “What’s in the box” cards.

Gallery (lightbox).

FAQ (accordion, 4–6 Q&A):

هل يحتاج كهرباء؟ يعمل بالبطاريات (غير مرفقة).

هل يدعم أندرويد و iOS؟ نعم عبر التطبيق.

هل يتحمل المطر؟ نعم مقاوم للعوامل الجوية.

هل يوجد ضمان؟ ضمان ٣ سنوات.

Reviews (optional).

Sticky mobile bar: price + CTA (scroll to form).

Order Form (COD) – at bottom.

Order Form Requirements (bottom of page):

Title: "سجّل طلبك الآن – الدفع عند الاستلام"

Fields (all labelled, required unless noted):

الاسم الكامل (text)

رقم الموبايل (tel) — validate EG 11 digits starting with 01; show inline errors.
رقم الواتس اب 

المحافظة/المدينة (select with common Egyptian cities; allow “أخرى”).

العنوان بالتفصيل (textarea)

الكمية (number, min 1, default 1)

ملاحظات (textarea, optional)

طريقة الدفع: الدفع عند الاستلام (preselected, disabled radio)

Anti-spam: hidden honeypot field + basic throttle; disable submit while sending.

Submit action:

POST to /api/order (create this route). Save JSON to console for now and show success toast “تم استلام طلبك بنجاح وسيتواصل معك فريقنا قريبًا”.

Also provide a WhatsApp deep link button that composes the order text:
https://wa.me/<YOUR_NUMBER>?text=<encoded order summary>

After submit: scroll to top and fire dataLayer.push({event:"lead_submitted"}).

Schema & SEO

JSON-LD Product with:

name: "جرس الباب الذكي بالكاميرا"

description: hero tagline above

images: array of found images

brand: "Generic"

sku: "doorbell-cam-001"

offers: { priceCurrency: "EGP", price: "1999", availability: "https://schema.org/InStock" }

JSON-LD FAQPage for the FAQ entries.

Meta: title includes price + “الدفع عند الاستلام”, meta description ≤160 chars, OG tags, canonical /.

Files to create/edit

app/layout.tsx: RTL, Cairo font, base meta, global styles.

app/page.tsx: all sections + components.

app/api/order/route.ts: receives form POST; log JSON; TODO comments for future email/Sheet integration.

components/ small components: Badge, FeatureCard, FAQItem, Gallery, StickyBar, OrderForm.

styles/globals.css: Tailwind + custom utilities for RTL spacing if needed.

Validation details

Egyptian phone regex example: /^01[0-2,5][0-9]{8}$/ (client + simple server check).

Prevent duplicate submits; re-enable button after response or error.

Copy the exact CTAs

Buttons: "اطلب الآن – الدفع عند الاستلام", "اطلب عبر واتساب"

Nice-to-have

Micro-animation on CTA hover, subtle reveal on scroll.

Price chip shows “وفر ٧٠١ جنيه”.

Countdown is optional; if added, keep it honest with a configurable end date.

Deliverables

A fully working page at / that builds and runs with pnpm dev.

Clean, commented code. No external services required to run locally.

If an image/video isn’t found, render graceful placeholder without breaking layout.