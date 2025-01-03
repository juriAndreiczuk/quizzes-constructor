/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      boxShadow: {
        'accent': '0px 0px 7px -1px #FA58B6',
        'addl': '0px 0px 7px -1px #7A0BC0',
      },
      fontSize: {
        '14': '0.875rem',
        '16': '1rem',
        '18': '1.12rem',
        '20': '1.25rem',
        '27': '1.68rem',
        '34': '2.125rem',
        '50': '3.125rem',
        '71': '4.438rem'
      },
      colors: {
        dark: '#1A1A40',
        main: '#270082',
        addl: '#7A0BC0',
        light: '#c9a1f7',
        accent: '#FA58B6',
        error: '#ef4544',
        warning: '#eab20a',
        success: '#22c560'
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        bold: 700
      },
      spacing: {
        '4': '0.25rem',
        '8': '.5rem',
        '16': '1rem',
        '32': '2rem',
        '64': '4rem',
        '96': '6rem',
        '128': '8rem'
      }
    },
    keyframes: {
      'line': {
        '0%': { transform: 'scaleX(1)' },
        '100%': { transform: 'scaleX(0)' },
      },
      'bounce': {
        '0%, 100%': { transform: 'translateY(-25%)', animationTimingFunction: 'cubic-bezier(0.8,0,1,1)' },
        '50%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0,0,0.2,1)' },
      },
      'pulse': {
        '0%, 100%': { opacity: '1' },
        '50%': { opacity: '0.5' },
      }
    },
    animation: {
      'loading-line': 'line 2s linear',
      'allert-line': 'line 5s linear',
      'bounce': 'bounce 1.5s infinite',
      'pulse': 'pulse 3s infinite'
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        lg: '0'
      }
    }
  },
  screens: {
    sm: '576px',
    lg: '992px'
  },
  plugins: [],
  safelist: [
    'flex',
    'flex-row',
    'flex-col',
    'grid',
    'h-full',
    'rounded'
  ]
}
