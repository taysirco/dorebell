'use client'

import React, { useRef, useEffect, useState } from 'react'

interface LazySectionProps {
  children: React.ReactNode
  className?: string
  threshold?: number
  rootMargin?: string
}

export const LazySection: React.FC<LazySectionProps> = ({
  children,
  className = '',
  threshold = 0.1,
  rootMargin = '50px'
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return (
    <div 
      ref={ref} 
      className={className}
      style={{
        minHeight: isVisible ? 'auto' : '200px',
        contentVisibility: isVisible ? 'visible' : 'auto',
      }}
    >
      {isVisible ? children : <div className="animate-pulse bg-gray-200 rounded-lg h-48" />}
    </div>
  )
}
