'use client'

import React, { useState } from 'react'

interface OrderFormData {
  fullName: string
  phoneNumber: string
  whatsappNumber: string
  city: string
  area: string
  address: string
  quantity: number
  honeypot: string // Anti-spam field
}

interface OrderFormProps {
  productName: string
  price: string
}

const egyptianCities = [
  'القاهرة',
  'الجيزة',
  'الاسكندرية',
  'أسوان',
  'أسيوط',
  'البحر الأحمر',
  'البحيرة',
  'بني سويف',
  'جنوب سيناء',
  'الدقهلية',
  'دمياط',
  'الفيوم',
  'الغربية',
  'الإسماعيلية',
  'كفر الشيخ',
  'الأقصر',
  'مطروح',
  'المنيا',
  'المنوفية',
  'الوادي الجديد',
  'شمال سيناء',
  'بورسعيد',
  'القليوبية',
  'قنا',
  'سوهاج',
  'السويس',
  'الشرقية',
  'أخرى'
]

export const OrderForm: React.FC<OrderFormProps> = ({ productName, price }) => {
  const [formData, setFormData] = useState<OrderFormData>({
    fullName: '',
    phoneNumber: '',
    whatsappNumber: '',
    city: '',
    area: '',
    address: '',
    quantity: 1,
    honeypot: ''
  })

  const [errors, setErrors] = useState<Partial<OrderFormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Convert Arabic numbers to English numbers
  const convertArabicToEnglish = (str: string): string => {
    const arabicNumbers = '٠١٢٣٤٥٦٧٨٩'
    const englishNumbers = '0123456789'
    
    return str.replace(/[٠-٩]/g, (match) => {
      const index = arabicNumbers.indexOf(match)
      return englishNumbers[index]
    })
  }

  const validatePhoneNumber = (phone: string): boolean => {
    // Egyptian phone number validation: 11 digits starting with 01
    const phoneRegex = /^01[0-2,5][0-9]{8}$/
    return phoneRegex.test(phone)
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<OrderFormData> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'الاسم الكامل مطلوب'
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'رقم الموبايل مطلوب'
    } else if (!validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = 'رقم الموبايل غير صحيح (يجب أن يكون 11 رقم ويبدأ بـ 01)'
    }

    if (!formData.whatsappNumber.trim()) {
      newErrors.whatsappNumber = 'رقم الواتساب مطلوب'
    } else if (!validatePhoneNumber(formData.whatsappNumber)) {
      newErrors.whatsappNumber = 'رقم الواتساب غير صحيح (يجب أن يكون 11 رقم ويبدأ بـ 01)'
    }

    if (!formData.city) {
      newErrors.city = 'المحافظة مطلوبة'
    }

    if (!formData.area.trim()) {
      newErrors.area = 'المنطقة مطلوبة'
    }

    if (!formData.address.trim()) {
      newErrors.address = 'العنوان بالتفصيل مطلوب'
    }

    if (formData.quantity < 1) {
      (newErrors as any).quantity = 'الكمية يجب أن تكون أكبر من 0'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    let processedValue = value
    
    // Convert Arabic numbers to English for phone number fields
    if (name === 'phoneNumber' || name === 'whatsappNumber') {
      processedValue = convertArabicToEnglish(value)
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(processedValue) : processedValue
    }))

    // Clear error when user starts typing
    if (errors[name as keyof OrderFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Anti-spam check
    if (formData.honeypot) {
      return // Bot detected
    }

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          productName,
          price,
          timestamp: new Date().toISOString()
        }),
      })

      if (response.ok) {
        const result = await response.json()
        
        // Fire analytics events
        if (typeof window !== 'undefined' && window.dataLayer) {
          window.dataLayer.push({ 
            event: 'lead_submitted',
            order_id: result.orderId,
            value: parseInt(price) * formData.quantity,
            currency: 'EGP'
          })
        }

        // TikTok Lead Tracking
        if (typeof window !== 'undefined' && (window as any).ttq) {
          (window as any).ttq.track('SubmitForm', {
            content_type: 'product',
            content_id: 'doorbell-smart-camera',
            content_name: productName,
            value: parseInt(price) * formData.quantity,
            currency: 'EGP',
            quantity: formData.quantity,
            description: 'Order form submission - Lead generated'
          })
        }

        // Redirect to thank you page with order details
        const totalPrice = parseInt(price) * formData.quantity
        const thankYouUrl = `/thank-you?orderId=${result.orderId}&name=${encodeURIComponent(formData.fullName)}&total=${totalPrice}`
        window.location.href = thankYouUrl
      } else {
        throw new Error('فشل في إرسال الطلب')
      }
    } catch (error) {
      console.error('Order submission error:', error)
      alert('حدث خطأ في إرسال الطلب. الرجاء المحاولة مرة أخرى.')
    } finally {
      setIsSubmitting(false)
    }
  }



  if (submitSuccess) {
    return (
      <div className="max-w-md mx-auto text-center p-8 bg-green-50 rounded-xl border border-green-200">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-green-800 mb-2">
          تم استلام طلبك بنجاح!
        </h3>
        <p className="text-green-700 mb-6">
          سيتواصل معك فريقنا قريباً لتأكيد طلبك وترتيب التوصيل
        </p>
        <button
          className="btn-primary"
          onClick={() => setSubmitSuccess(false)}
        >
          طلب جديد
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            🔥 اطلب الآن - عرض محدود!
          </h2>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800 font-semibold">
              ⏰ باقي <span className="text-red-600 font-bold">48 ساعة</span> على انتهاء العرض!
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-6 border border-green-200">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">💰 ملخص الفاتورة</h3>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center bg-white rounded-lg p-3">
                <span className="text-gray-600">سعر المنتج:</span>
                <span className="font-semibold">{parseInt(price) * formData.quantity} جنيه</span>
              </div>
              
              <div className="flex justify-between items-center bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                <span className="text-gray-600">رسوم الشحن:</span>
                <span className="font-semibold text-orange-600">50 جنيه</span>
              </div>
              
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-800">المجموع:</span>
                  <span className="text-2xl font-bold text-rose-red">{(parseInt(price) * formData.quantity) + 50} جنيه</span>
                </div>
              </div>
            </div>
            
            <div className="bg-green-100 rounded-lg p-3 mb-3 border border-green-300">
              <p className="text-green-800 font-medium text-sm">
                🎉 بعد تأكيد الطلب سيتم خصم رسوم الشحن من الفاتورة
              </p>
            </div>
            
            <p className="text-green-700 font-medium">✅ الدفع عند الاستلام</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Anti-spam honeypot field */}
          <input
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={handleInputChange}
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
          />

          {/* Grid for compact layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                👤 الاسم الكامل *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`input-field ${errors.fullName ? 'border-red-500' : 'border-gray-200'}`}
                placeholder="اسمك الكامل"
                required
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                📱 رقم الموبايل *
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className={`input-field ${errors.phoneNumber ? 'border-red-500' : 'border-gray-200'}`}
                placeholder="01xxxxxxxxx (الأرقام العربية تُحول تلقائياً)"
                dir="ltr"
                required
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
              )}
            </div>
          </div>

          {/* WhatsApp Number */}
          <div>
            <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700 mb-2">
              💬 رقم الواتساب *
            </label>
            <input
              type="tel"
              id="whatsappNumber"
              name="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={handleInputChange}
              className={`input-field ${errors.whatsappNumber ? 'border-red-500' : 'border-gray-200'}`}
              placeholder="01xxxxxxxxx (للتواصل والتأكيد)"
              dir="ltr"
              required
            />
            {errors.whatsappNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.whatsappNumber}</p>
            )}
          </div>

          {/* Location Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* City */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                🏙️ المحافظة *
              </label>
              <select
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className={`input-field ${errors.city ? 'border-red-500' : 'border-gray-200'}`}
                required
              >
                <option value="">اختر المحافظة</option>
                {egyptianCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city}</p>
              )}
            </div>

            {/* Area */}
            <div>
              <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-2">
                📍 المنطقة *
              </label>
              <input
                type="text"
                id="area"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                className={`input-field ${errors.area ? 'border-red-500' : 'border-gray-200'}`}
                placeholder="مثال: مدينة نصر، المعادي، المهندسين"
                required
              />
              {errors.area && (
                <p className="text-red-500 text-sm mt-1">{errors.area}</p>
              )}
            </div>
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              📍 العنوان بالتفصيل *
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows={2}
              className={`input-field ${errors.address ? 'border-red-500' : 'border-gray-200'}`}
              placeholder="الشارع، رقم البناية، الدور (مثال: شارع الجمهورية، عمارة 15، الدور الثالث)"
              required
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          {/* Quantity Options */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border border-blue-200">
            <label className="block text-lg font-semibold text-gray-800 mb-4 text-center">
              📦 اختر الكمية المطلوبة
            </label>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* One Piece Option */}
              <label className={`relative block cursor-pointer p-4 rounded-lg border-2 transition-all duration-200 ${
                formData.quantity === 1 
                  ? 'border-blue-500 bg-blue-50 shadow-md' 
                  : 'border-gray-200 bg-white hover:border-blue-300'
              }`}>
                <input
                  type="radio"
                  name="quantity"
                  value={1}
                  checked={formData.quantity === 1}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div className="text-center">
                  <div className="text-2xl mb-2">📱</div>
                  <div className="font-semibold text-gray-800">قطعة واحدة</div>
                  <div className="text-lg font-bold text-blue-600">{price} جنيه</div>
                  <div className="text-sm text-gray-600 mt-1">الأكثر طلباً</div>
                </div>
                {formData.quantity === 1 && (
                  <div className="absolute top-2 left-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </label>

              {/* Two Pieces Option */}
              <label className={`relative block cursor-pointer p-4 rounded-lg border-2 transition-all duration-200 ${
                formData.quantity === 2 
                  ? 'border-green-500 bg-green-50 shadow-md' 
                  : 'border-gray-200 bg-white hover:border-green-300'
              }`}>
                <input
                  type="radio"
                  name="quantity"
                  value={2}
                  checked={formData.quantity === 2}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div className="text-center">
                  <div className="text-2xl mb-2">📱📱</div>
                  <div className="font-semibold text-gray-800">قطعتين</div>
                  <div className="text-lg font-bold text-green-600">{parseInt(price) * 2} جنيه</div>
                  <div className="text-sm text-green-600 mt-1 font-medium">توفير إضافي!</div>
                </div>
                {formData.quantity === 2 && (
                  <div className="absolute top-2 left-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </label>
            </div>

            {/* Total Price Display */}
            <div className="mt-4 text-center bg-white rounded-lg p-4 border">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">المنتج:</span>
                  <span className="font-semibold">{parseInt(price) * formData.quantity} جنيه</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">الشحن:</span>
                  <span className="font-semibold text-orange-600">50 جنيه</span>
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-800 font-medium">المجموع:</span>
                    <span className="text-2xl font-bold text-rose-red">{(parseInt(price) * formData.quantity) + 50} جنيه</span>
                  </div>
                </div>
              </div>
            </div>

            {errors.quantity && (
              <p className="text-red-500 text-sm mt-2 text-center">{errors.quantity}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="space-y-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-rose-red to-rose-red/90 hover:from-rose-red/90 hover:to-rose-red text-white font-bold text-lg py-5 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl ${isSubmitting ? 'loading' : 'animate-pulse'}`}
            >
              {isSubmitting ? '🔄 جاري تأكيد طلبك...' : '🛡️ احجز الآن - الدفع عند الاستلام'}
            </button>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                <span>✅ أمان مضمون</span>
                <span>✅ شحن مجاني</span>
                <span>✅ ضمان 3 سنوات</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
