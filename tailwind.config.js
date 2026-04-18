/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'vivid-red':  '#E02226',
        'dark-red':   '#B81C1F',
        'deep-red':   '#8C1518',
        'jet-black':  '#1A1A1A',
        'charcoal':   '#2D2D2D',
        'warm-gray':  '#E8E5E2',
        'smoke':      '#F5F5F5',
      },
      fontFamily: {
        poppins: ['var(--font-poppins)', 'sans-serif'],
        dmsans:  ['var(--font-dmsans)',  'sans-serif'],
      },
      borderRadius: {
        card:   '8px',
        btn:    '6px',
        input:  '4px',
      },
      boxShadow: {
        card: '0 4px 24px rgba(26,26,26,0.06)',
        'card-hover': '0 8px 32px rgba(26,26,26,0.12)',
        'red-glow': '0 0 20px rgba(224,34,38,0.4)',
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-red': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(224,34,38,0.4)' },
          '50%':      { boxShadow: '0 0 0 12px rgba(224,34,38,0)' },
        },
        'printer-sweep': {
          '0%':   { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(400%)' },
        },
        'dot-bounce': {
          '0%, 80%, 100%': { transform: 'scale(0.6)', opacity: '0.4' },
          '40%':            { transform: 'scale(1)',   opacity: '1' },
        },
        'slide-in': {
          '0%':   { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'progress-fill': {
          '0%':   { width: '0%' },
          '100%': { width: '100%' },
        },
      },
      animation: {
        'fade-up':       'fade-up 0.6s ease-out forwards',
        'pulse-red':     'pulse-red 1.5s ease-in-out infinite',
        'printer-sweep': 'printer-sweep 2s ease-in-out infinite',
        'dot-bounce':    'dot-bounce 1.2s ease-in-out infinite',
        'slide-in':      'slide-in 0.3s ease-out forwards',
        'progress-fill': 'progress-fill 2.5s ease-out forwards',
      },
    },
  },
  plugins: [],
};
