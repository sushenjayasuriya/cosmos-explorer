/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        space: ['"Space Grotesk"', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
      },
      colors: {
        cosmos: {
          darkest: '#030712',
          dark: '#060b18',
          card: 'rgba(11, 20, 39, 0.72)',
          border: 'rgba(255, 255, 255, 0.12)',
          cyan: '#38bdf8',
          blue: '#3b82f6',
          amber: '#f59e0b',
          glow: 'rgba(56, 189, 248, 0.35)',
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
      }
    },
  },
  plugins: [],
};
