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
        gold: {
          50: '#FBF5E7',
          100: '#F3E7CE',
          200: '#E7D2A8',
          300: '#D9BC82',
          400: '#D1AF6F',
          500: '#C9A860',
          600: '#AE8B4A',
          700: '#80663A',
          800: '#544326',
          900: '#302717',
        },
        silver: {
          50: '#f8f8f8',
          100: '#ebebeb',
          200: '#cccccc',
          300: '#b5b5b5',
          400: '#9e9e9e',
          500: '#888888',
          600: '#6e6e6e',
          700: '#545454',
          800: '#3d3d3d',
          900: '#2a2a2a',
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
        'slide-up': 'SlideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-gold': 'pulseGold 2s infinite',
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
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201, 168, 96, 0.4)' },
          '50%': { boxShadow: '0 0 0 10px rgba(201, 168, 96, 0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-gold': 'linear-gradient(135deg, #AE8B4A 0%, #C9A860 50%, #D1AF6F 100%)',
        'gradient-gold-shine': 'linear-gradient(135deg, #D1AF6F 0%, #C9A860 40%, #AE8B4A 70%, #80663A 100%)',
        'gradient-silver': 'linear-gradient(135deg, #e0e0e0 0%, #888888 50%, #b5b5b5 100%)',
        'gradient-luxury': 'linear-gradient(135deg, #80663A 0%, #C9A860 40%, #D1AF6F 70%, #AE8B4A 100%)',
        'gradient-dark': 'linear-gradient(180deg, #030303 0%, #080808 100%)',
        'gradient-card': 'linear-gradient(145deg, #111111 0%, #1a1a1a 100%)',
        'shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
      },
      boxShadow: {
        'gold': '0 0 20px rgba(201, 168, 96, 0.35)',
        'gold-sm': '0 0 10px rgba(201, 168, 96, 0.25)',
        'gold-lg': '0 0 40px rgba(201, 168, 96, 0.45)',
        'inner-gold': 'inset 0 1px 0 rgba(201, 168, 96, 0.2)',
        'silver': '0 0 20px rgba(136, 136, 136, 0.3)',
        'card': '0 10px 40px rgba(0, 0, 0, 0.5)',
        'card-hover': '0 20px 60px rgba(0, 0, 0, 0.7)',
      },
      borderWidth: {
        '1': '1px',
      },
      borderColor: {
        'gold-50': '#FBF5E7',
        'gold-100': '#F3E7CE',
        'gold-200': '#E7D2A8',
        'gold-300': '#D9BC82',
        'gold-400': '#D1AF6F',
        'gold-500': '#C9A860',
        'gold-600': '#AE8B4A',
        'gold-700': '#80663A',
        'gold-800': '#544326',
        'gold-900': '#302717',
        'silver-300': '#b5b5b5',
        'silver-400': '#9e9e9e',
        'silver-500': '#888888',
        'silver-600': '#6e6e6e',
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