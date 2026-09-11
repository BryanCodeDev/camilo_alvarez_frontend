/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          900: '#030303',
          800: '#080808',
          700: '#111111',
          600: '#1a1a1a',
          500: '#262626',
          400: '#444444',
          300: '#777777',
          200: '#aaaaaa',
          100: '#cccccc',
        },
        red: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        white: {
          DEFAULT: '#FFFFFF',
          soft: '#F5F5F5',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-red': 'pulseRed 2s infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseRed: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(220, 38, 38, 0.4)' },
          '50%': { boxShadow: '0 0 0 10px rgba(220, 38, 38, 0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-red': 'linear-gradient(135deg, #dc2626 0%, #ef4444 50%, #dc2626 100%)',
        'gradient-dark': 'linear-gradient(180deg, #030303 0%, #080808 100%)',
        'gradient-card': 'linear-gradient(145deg, #111111 0%, #1a1a1a 100%)',
        'shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
      },
      boxShadow: {
        'red': '0 0 20px rgba(220, 38, 38, 0.3)',
        'red-sm': '0 0 10px rgba(220, 38, 38, 0.2)',
        'inner-red': 'inset 0 1px 0 rgba(220, 38, 38, 0.1)',
        'card': '0 10px 40px rgba(0, 0, 0, 0.5)',
        'card-hover': '0 20px 60px rgba(0, 0, 0, 0.7)',
      },
      borderWidth: {
        '1': '1px',
      },
      borderColor: {
        'red-50': '#fef2f2',
        'red-100': '#fee2e2',
        'red-200': '#fecaca',
        'red-300': '#fca5a5',
        'red-400': '#f87171',
        'red-500': '#ef4444',
        'red-600': '#dc2626',
        'red-700': '#b91c1c',
        'red-800': '#991b1b',
        'red-900': '#7f1d1d',
        'red': '#dc2626',
        'red-light': '#f87171',
        'dark-border': '#333333',
      },
      transitionDuration: {
        '400': '400ms',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      }
    },
  },
  plugins: [],
}