import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: '#D4AF37',
          'gold-soft': '#E5C48E',
          'gold-muted': '#C6A46A',
          'gold-start': '#D4AF37',
          'gold-end': '#F6D87B',

          light: '#FFFFFF',
          dark: '#0C0C0C',
          'dark-200': '#151515',
          'card-light': '#FAFAFA',
          'bg-light-secondary': '#F7F7F7',
          'border-light': '#E5E5E5',
          'card-dark': '#1C1C1C',
          'bg-dark-secondary': '#151515',
          'border-dark': '#2A2A2A',

          sapphire: '#1E3A8A',
          ruby: '#B01730',
          emerald: '#1B6B4B',
        },
        semantic: {
          primary: 'var(--color-primary)',
          accent: 'var(--color-accent)',
        },
      },
      boxShadow: {
        'card-soft': '0 6px 18px rgba(12,12,12,0.12)',
        'glow-gold': '0 6px 30px rgba(212,175,55,0.14)',
      },
      ringColor: {
        gold: '#D4AF37',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(90deg, #D4AF37 0%, #F6D87B 100%)',
        'royal-gradient': 'linear-gradient(90deg, #1E3A8A 0%, #204ECF 100%)',
      },
    },
  },
  plugins: [],
};

export default config;


