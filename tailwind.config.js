/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontSize: {
        '14': '0.875rem',
        '16': '1rem',
        '18': '1.12rem',
        '20': '1.25rem',
        '34': '2.125rem'
      },
      colors: {
        dark: '#000000',
        light: '#F9F9E0',
        accent: '#FF9EAA',
        addl: '#FFD0D0',
        main: '#3AA6B9'
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