import React from 'react'

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
  number?: number
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon, 
  number 
}) => {
  return (
    <div className="card hover:shadow-xl transition-all duration-300 group">
      <div className="flex items-start gap-4">
        {number && (
          <div className="flex-shrink-0 w-8 h-8 bg-navy text-white rounded-full flex items-center justify-center text-sm font-bold">
            {number}
          </div>
        )}
        <div className="flex-shrink-0 text-navy group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-navy transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

// Icon components for features
export const CameraIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M14.25 2.1l-.9-.9a1.5 1.5 0 0 0-2.1 0l-.9.9c-.6.6-.6 1.5 0 2.1l.9.9 2.1-2.1-.9-.9zm3.15 3.15l-2.1 2.1 2.1 2.1.9-.9c.6-.6.6-1.5 0-2.1l-.9-.9a1.5 1.5 0 0 0-2.1 0z"/>
    <path d="M9 11H4c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7c0-1.1-.9-2-2-2h-5l-2-2H9z"/>
    <circle cx="12" cy="17" r="3"/>
  </svg>
)

export const WifiIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 6c3.79 0 7.17 2.13 8.82 5.5h2.4C21.65 7.15 17.2 4 12 4S2.35 7.15.78 11.5h2.4C4.83 8.13 8.21 6 12 6z"/>
    <path d="M12 10c2.21 0 4.16 1.05 5.41 2.67h2.35C18.36 10.45 15.38 9 12 9s-6.36 1.45-7.76 3.67h2.35C7.84 11.05 9.79 10 12 10z"/>
    <path d="M12 14c1.1 0 2.07.48 2.75 1.24h2.22C16.08 14.23 14.14 13.5 12 13.5s-4.08.73-4.97 1.74h2.22c.68-.76 1.65-1.24 2.75-1.24z"/>
    <circle cx="12" cy="18" r="2"/>
  </svg>
)

export const NightVisionIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
  </svg>
)

export const MicrophoneIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2s-2-.9-2-2V4c0-1.1.9-2 2-2zm5.3 6c-.08 0-.15.02-.22.06-.07.04-.12.09-.15.17-.03.08-.04.17-.01.25l.03.05C17.2 9.2 17.99 10 18 11v1c0 3.31-2.69 6-6 6s-6-2.69-6-6v-1c0-1.1.9-2 2-2s2 .9 2 2v1c0 1.1.9 2 2 2s2-.9 2-2v-1c0-.17.05-.34.14-.48.09-.14.22-.25.37-.32.15-.07.32-.1.49-.08z"/>
    <path d="M11 20h2v3h-2z"/>
    <path d="M7 20h10v1H7z"/>
  </svg>
)

export const ShieldIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16V17H8V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.4,8.7 10.4,10V11H13.6V10C13.6,8.7 12.8,8.2 12,8.2Z"/>
  </svg>
)

export const PhoneIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
  </svg>
)

export const BatteryIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/>
  </svg>
)

export const WeatherIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.5 2C9.46 2 7 4.46 7 7.5c0 .68.12 1.33.34 1.93-.83.44-1.34 1.3-1.34 2.24 0 1.38 1.12 2.5 2.5 2.5h8c1.93 0 3.5-1.57 3.5-3.5 0-1.79-1.36-3.27-3.09-3.47.09-.48.14-.98.14-1.48C17.05 3.56 15.49 2 12.5 2z"/>
  </svg>
)

export const MotionIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"/>
  </svg>
)

export const ShareIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
  </svg>
)
