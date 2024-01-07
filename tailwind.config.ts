import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
  'gradient-segments': 'conic-gradient(rgba(255, 255, 255, 0.8) 0% 6.25%, transparent 6.25% 12.5%, rgba(255, 255, 255, 0.8) 12.5% 18.75%, transparent 18.75% 25%, rgba(255, 255, 255, 0.8) 25% 31.25%, transparent 31.25% 37.5%, rgba(255, 255, 255, 0.8) 37.5% 43.75%, transparent 43.75% 50%, rgba(255, 255, 255, 0.8) 50% 56.25%, transparent 56.25% 62.5%, rgba(255, 255, 255, 0.8) 62.5% 68.75%, transparent 68.75% 75%, rgba(255, 255, 255, 0.8) 75% 81.25%, transparent 81.25% 87.5%, rgba(255, 255, 255, 0.8) 87.5% 93.75%, transparent 93.75% 100%)',
},
      transitionDelay: {
        '0': '0ms',
        '1000': '1000ms',
        '2000': '2000ms',
        '3000': '3000ms',
        '100': '100ms',
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
      },
      animation: {
        'spin-slow': 'spin 5s linear infinite',
        'fade-in': 'fadeIn 1s ease-in-out',
        'blink': 'blink 1s infinite',
      },
      keyframes: {
        'spin-opacity': {
          '0%': { transform: 'rotate(0deg)', opacity: '1' },
          '50%': { opacity: '0.5'},
          '100%': { transform: 'rotate(360deg)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'blink': {
          '0%, 100%': { 'opacity': '1' },
          '50%': { 'opacity': '0' },
        },
      },
      
    },
  },
  plugins: [require("daisyui")],
}

export default config