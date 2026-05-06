/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#fdf8f0',
          100: '#f9edd9',
          200: '#f2d9b0',
          300: '#e8be7d',
          400: '#dda04d',
          500: '#d4882e',
          600: '#b86b22',
          700: '#99511f',
          800: '#7c4220',
          900: '#66381e',
        },
        ocean: {
          50: '#f0f9f6',
          100: '#d5efe7',
          200: '#aedfce',
          300: '#7dc9af',
          400: '#4db492',
          500: '#319a78',
          600: '#267b61',
          700: '#226350',
          800: '#1f4f42',
          900: '#1b4237',
        },
        terra: {
          50: '#fdf5f0',
          100: '#fae8db',
          200: '#f3ccb0',
          300: '#ebab7e',
          400: '#e2854e',
          500: '#dc6a2d',
          600: '#c95323',
          700: '#a74120',
          800: '#863621',
          900: '#6d2f1e',
        },
        warm: {
          50: '#faf8f5',
          100: '#f3efe8',
          200: '#e8dfd2',
          300: '#d4c5ae',
          400: '#c0a88a',
          500: '#b09272',
          600: '#a28063',
          700: '#866a54',
          800: '#6e5848',
          900: '#5a4a3e',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
