/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // AGI-26 canonical palette (dark navy + cream + blue accent)
        navy: {
          DEFAULT: '#0F141F',
          deep: '#03122B',
          card: '#151B2B',
        },
        cream: '#F5F1EB',
        body: '#E9EAED',
        accent: {
          DEFAULT: '#3C6CDD',
          deep: '#143D9F',
          hover: '#4D7AE8',
        },
        // Legacy token names remapped to AGI-26 values so existing utility classes
        // convert automatically. The original design was light; swapping the hex
        // inverts most usages correctly (former light bg -> dark, former dark text -> light).
        parchment: '#0F141F', // page background: light -> navy
        surface: '#151B2B',   // card background -> navy.card
        ink: '#E9EAED',       // body text: dark -> light
        muted: '#9BA3B5',     // muted text on dark
        teal: {
          DEFAULT: '#3C6CDD', // accent blue
          light: '#1B2740',   // subtle dark-blue tint (was pale teal fill)
          mid: '#4D7AE8',     // accent hover
        },
        amber: {
          DEFAULT: '#E0A94D', // warm gold, legible on dark
          light: '#2A2418',   // dark warm tint fill
        },
        border: 'rgba(255,255,255,0.10)',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'Times New Roman', 'serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        'hero': 'clamp(2.5rem, 6vw, 4rem)',
      },
      letterSpacing: {
        eyebrow: '0.2em',
        label: '0.15em',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#E9EAED',
            a: { color: '#3C6CDD' },
            'h1,h2,h3,h4': { fontFamily: '"Cormorant Garamond", Georgia, serif', color: '#F5F1EB' },
          },
        },
      },
    },
  },
  plugins: [],
};
