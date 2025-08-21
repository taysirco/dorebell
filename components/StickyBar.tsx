'use client'

import React from 'react'

interface StickyBarProps {
  price: string
  originalPrice: string
  onOrderClick: () => void
}

export const StickyBar: React.FC<StickyBarProps> = ({ 
  price, 
  originalPrice, 
  onOrderClick 
}) => {
  const handleOrderClick = () => {
    onOrderClick()
    // Smooth scroll to order form
    const orderForm = document.getElementById('order-form')
    if (orderForm) {
      orderForm.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="sticky-bottom bg-white border-t border-gray-200 shadow-lg md:hidden touch-friendly">
      <div className="flex items-center justify-between p-3 sm:p-4 mobile-section">
        <div className="flex flex-col flex-1">
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="text-lg sm:text-2xl font-bold text-rose-red">{price} جنيه</span>
            <span className="text-xs sm:text-sm text-gray-500 line-through">{originalPrice} جنيه</span>
          </div>
          <span className="text-xs text-green-600 font-medium">الدفع عند الاستلام</span>
        </div>
        
        <button
          className="btn-primary px-4 sm:px-6 py-3 text-sm sm:text-lg font-bold animate-pulse touch-friendly no-select"
          onClick={handleOrderClick}
        >
          اطلب الآن
        </button>
      </div>
    </div>
  )
}
