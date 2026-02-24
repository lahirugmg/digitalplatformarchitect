import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          0: '#f7f8fa',
          1: '#ffffff',
          2: '#eef2f7',
        },
        accent: {
          DEFAULT: '#1d4ed8',
          soft: '#dbeafe',
        },
        semantic: {
          success: '#15803d',
          warning: '#b45309',
          danger: '#b91c1c',
        },
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            color: theme('colors.slate.700'),
            maxWidth: 'none',
            h1: {
              color: theme('colors.slate.900'),
              fontWeight: '800',
            },
            h2: {
              color: theme('colors.slate.900'),
              fontWeight: '700',
              borderBottom: `2px solid ${theme('colors.slate.200')}`,
              paddingBottom: '0.5rem',
            },
            h3: {
              color: theme('colors.slate.900'),
              fontWeight: '600',
            },
            a: {
              color: theme('colors.accent.DEFAULT'),
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                color: '#1e40af',
                textDecoration: 'underline',
              },
            },
            code: {
              color: theme('colors.accent.DEFAULT'),
              backgroundColor: theme('colors.accent.soft'),
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              fontWeight: '500',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: theme('colors.slate.900'),
              color: theme('colors.slate.100'),
              borderRadius: '0.75rem',
              padding: '1.5rem',
            },
            strong: {
              color: theme('colors.slate.900'),
              fontWeight: '700',
              backgroundColor: theme('colors.yellow.50'),
              padding: '0.125rem 0.25rem',
              borderRadius: '0.25rem',
            },
            blockquote: {
              borderLeftColor: theme('colors.accent.DEFAULT'),
              backgroundColor: theme('colors.accent.soft'),
              borderLeftWidth: '4px',
              padding: '0.5rem 1.5rem',
              borderRadius: '0 0.5rem 0.5rem 0',
            },
            ul: {
              listStyleType: 'none',
              paddingLeft: 0,
            },
            'ul > li': {
              paddingLeft: '1.5rem',
              position: 'relative',
              '&::before': {
                content: '"→"',
                position: 'absolute',
                left: 0,
                color: theme('colors.accent.DEFAULT'),
                fontWeight: '700',
              },
            },
          },
        },
      }),
      animation: {
        'fade-in': 'fadeIn 180ms ease-out',
        'slide-up': 'slideUp 180ms ease-out',
        'slide-in-right': 'slideInRight 180ms ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
export default config
