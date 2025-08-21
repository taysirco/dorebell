'use client'

import React, { useState } from 'react'

interface FAQItemProps {
  question: string
  answer: string
  defaultOpen?: boolean
}

export const FAQItem: React.FC<FAQItemProps> = ({ 
  question, 
  answer, 
  defaultOpen = false 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        className="w-full px-6 py-4 text-right bg-white hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold text-gray-900">{question}</span>
        <svg
          className={`w-5 h-5 text-navy transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`px-6 bg-gray-50 transition-all duration-200 overflow-hidden ${
          isOpen ? 'py-4 max-h-96' : 'py-0 max-h-0'
        }`}
      >
        <p className="text-gray-700 leading-relaxed">{answer}</p>
      </div>
    </div>
  )
}

interface FAQSectionProps {
  faqs: Array<{
    question: string
    answer: string
  }>
}

export const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          الأسئلة الشائعة
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              defaultOpen={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
