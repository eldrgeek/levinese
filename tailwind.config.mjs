/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        parchment: '#f7f5f0',
        surface: '#edeae2',
        ink: '#1c1b2e',
        muted: '#6b6878',
        teal: {
          DEFAULT: '#0c6b5a',
          light: '#e6f4f1',
          mid: '#1a8a74',
        },
        amber: {
          DEFAULT: '#c2770a',
          light: '#fef3e2',
        },
        border: '#ddd8ce',
      },
      fontFamily: {
        serif: ['Lora', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#1c1b2e',
            a: { color: '#0c6b5a' },
            'h1,h2,h3,h4': { fontFamily: 'Lora, Georgia, serif', color: '#1c1b2e' },
          },
        },
      },
    },
  },
  plugins: [],
};
