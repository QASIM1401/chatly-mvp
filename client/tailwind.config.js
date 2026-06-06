/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"SF Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      screens: {
        'xs': '480px',
      },
      boxShadow: {
        'soft': '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)',
        'glow-brand': '0 12px 40px -8px rgba(124, 58, 237, 0.55), 0 24px 56px -12px rgba(6, 182, 212, 0.3)',
        'glow-brand-sm': '0 6px 20px -4px rgba(124, 58, 237, 0.4)',
        'glow-cyan': '0 12px 40px -8px rgba(6, 182, 212, 0.5)',
        'card': '0 1px 2px rgba(0,0,0,0.03), 0 4px 12px rgba(0,0,0,0.03), 0 24px 48px rgba(0,0,0,0.04)',
        'card-hover': '0 2px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.05), 0 32px 64px rgba(0,0,0,0.06)',
        'elevated': '0 4px 8px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.06), 0 48px 80px rgba(0,0,0,0.06)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #7c3aed 0%, #6366f1 40%, #06b6d4 100%)',
        'brand-gradient-hover': 'linear-gradient(135deg, #6d28d9 0%, #4f46e5 40%, #0891b2 100%)',
        'brand-gradient-soft': 'linear-gradient(135deg, rgba(139, 92, 246, 0.12), rgba(6, 182, 212, 0.12))',
        'warm-gradient': 'linear-gradient(135deg, #f97316, #ec4899)',
        'cool-gradient': 'linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6)',
      },
      keyframes: {
        shimmer: {
          '0%': { 'background-position': '-400px 0' },
          '100%': { 'background-position': '400px 0' },
        },
      },
      animation: {
        shimmer: 'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [],
};
