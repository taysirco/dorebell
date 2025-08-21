/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'cairo': ['Cairo', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        'navy': '#1e3a8a',
        'rose-red': '#e11d48',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    // Disable unused core plugins for smaller bundle
    container: false,
    float: false,
    clear: false,
    skew: false,
    caretColor: false,
    sepia: false,
  },
  safelist: [
    'animate-pulse',
    'animate-bounce',
    'direction-ltr',
    'bg-gradient-to-br',
    'from-green-400',
    'to-green-600'
  ],
}
