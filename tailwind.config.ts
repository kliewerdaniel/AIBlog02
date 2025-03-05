import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      // Custom monochromatic color palette with 9 shades of gray
      colors: {
        gray: {
          50: '#FFFFFF',  // Pure white
          100: '#F5F5F5', // Lightest gray
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#000000',  // Pure black
        },
      },
      // Typography system
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      // Custom text sizes with improved vertical rhythm
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.16' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
      },
      // Custom animations using Framer Motion configurations
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
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
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      // Typography plugin customizations
      typography: {
        DEFAULT: {
          css: {
            color: '#262626', // Default text color
            h1: {
              fontFamily: 'Playfair Display, serif',
              fontWeight: '700',
            },
            h2: {
              fontFamily: 'Playfair Display, serif',
              fontWeight: '600',
            },
            h3: {
              fontFamily: 'Playfair Display, serif',
              fontWeight: '600',
            },
            h4: {
              fontFamily: 'Playfair Display, serif',
              fontWeight: '600',
            },
            p: {
              fontFamily: 'Inter, sans-serif',
              lineHeight: '1.625',
            },
            a: {
              color: '#404040',
              textDecoration: 'underline',
              textUnderlineOffset: '2px',
              '&:hover': {
                color: '#000000',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
