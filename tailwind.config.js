/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        gold: {
          50:  '#fdf9ed',
          100: '#faf0cc',
          200: '#f5de94',
          300: '#f0cb5c',
          400: '#e8b82a',
          500: '#C9982A',
          600: '#a97c1f',
          700: '#845f18',
          800: '#6a4c14',
          900: '#563d11',
        },
        dark: {
          50:  '#f6f5f3',
          100: '#e8e6e1',
          200: '#ccc9c0',
          300: '#aca89b',
          400: '#8c8779',
          500: '#706b5d',
          600: '#575249',
          700: '#3f3c36',
          800: '#1a1916',
          900: '#0d0c0a',
          950: '#080807',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
