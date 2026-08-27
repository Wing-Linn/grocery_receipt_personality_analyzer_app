/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans SC"', 'system-ui', 'sans-serif'],
        display: ['"ZCOOL KuaiLe"', '"Noto Sans SC"', 'system-ui', 'cursive'],
        mono: ['"VT323"', '"Courier New"', 'monospace'],
      },
      colors: {
        paper: {
          50: '#fdfbf7',
          100: '#faf6ee',
          200: '#f3ead8',
          300: '#e9d9bb',
          400: '#dcc293',
          500: '#cda867',
        },
        ink: {
          50: '#f6f6f4',
          100: '#e8e8e3',
          200: '#d1d1c9',
          300: '#a8a89e',
          400: '#7a7a6e',
          500: '#525249',
          600: '#3d3d36',
          700: '#2a2a25',
          800: '#1a1a16',
          900: '#0d0d0b',
        },
        accent: {
          50: '#fff8ed',
          100: '#ffefd4',
          200: '#ffdba8',
          300: '#ffc070',
          400: '#ff9a37',
          500: '#ff7a0f',
          600: '#f06000',
          700: '#c44900',
          800: '#9a3a06',
          900: '#7c320a',
        },
        fresh: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        danger: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
      },
      boxShadow: {
        receipt: '0 1px 0 rgba(0,0,0,0.04), 0 8px 24px -8px rgba(0,0,0,0.12)',
        card: '0 2px 0 rgba(0,0,0,0.03), 0 12px 32px -12px rgba(0,0,0,0.18)',
        pop: '0 4px 0 0 rgba(0,0,0,0.08), 0 10px 28px -6px rgba(0,0,0,0.2)',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(calc(100% - 4px))' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        floatUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '100%': { transform: 'scale(1.4)', opacity: '0' },
        },
        dash: {
          '0%': { strokeDashoffset: '400' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      animation: {
        scan: 'scan 2.2s ease-in-out infinite alternate',
        wiggle: 'wiggle 0.6s ease-in-out infinite',
        floatUp: 'floatUp 0.5s ease-out both',
        pulseRing: 'pulseRing 1.6s ease-out infinite',
        dash: 'dash 1.2s ease-out forwards',
      },
    },
  },
  plugins: [],
};
