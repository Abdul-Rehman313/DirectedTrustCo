import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}', './.storybook/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#EF5139',
          hover: '#D94732',
          active: '#BF3E2C',
          foreground: '#ffffff',
        },
        secondary: '#F06A55',
        accent: '#C8422F',
        background: '#f9fafb',
        surface: '#ffffff',
        border: '#e5e7eb',
        'text-primary': '#111928',
        'text-secondary': '#6b7280',
        'text-muted': '#9ca3af',
        'text-inverse': '#ffffff',
        success: {
          DEFAULT: '#057a55',
          light: '#ecfdf3',
        },
        warning: {
          DEFAULT: '#b54708',
          light: '#fffaeb',
        },
        error: {
          DEFAULT: '#e02424',
          light: '#fef3f2',
        },
        info: {
          DEFAULT: '#EF5139',
          light: '#FFF1EE',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        26: '6.5rem',
        30: '7.5rem',
      },
      borderRadius: {
        sm: '0.25rem',
        DEFAULT: '0.5rem',
        md: '0.625rem',
        lg: '0.75rem',
        xl: '1rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(17, 25, 40, 0.08), 0 8px 20px rgba(17, 25, 40, 0.06)',
        modal: '0 24px 48px rgba(17, 25, 40, 0.2)',
        dropdown: '0 10px 30px rgba(17, 25, 40, 0.14)',
        'focus-ring': '0 0 0 4px rgba(239, 81, 57, 0.25)',
      },
      transitionTimingFunction: {
        fintech: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      },
    },
  },
  plugins: [],
}

export default config
