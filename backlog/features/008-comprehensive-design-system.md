# Feature: Comprehensive Design System & Page Styling

**Priority:** Critical 🔴  
**Category:** User Experience / Design  
**Effort:** Medium (2-3 weeks)  
**Impact:** Very High

## Overview
Implement a complete design system with consistent styling across all pages, fixing the current issue where pattern pages show plain unstyled text due to missing Tailwind Typography plugin. Establish design tokens, component patterns, and enhanced visual hierarchy.

## Current State - Critical Issues

### 1. **Missing Tailwind Typography Plugin** (BLOCKER)
Pattern pages use `prose` classes but `@tailwindcss/typography` is not installed:
```tsx
// In app/patterns/[slug]/page.tsx - Line 138
<article className="prose prose-slate max-w-none
  prose-headings:font-bold prose-headings:text-slate-900
  prose-h2:text-3xl ...
```

**Result**: Pattern pages (like `/patterns/canonical-data-model`) display completely unstyled plain text.

### 2. Minimal Global Styles
- [app/globals.css](app/globals.css) only has ~50 lines
- No typography scale defined
- No reusable component styles
- Missing animation library
- No dark mode preparation

### 3. Inconsistent Page Designs
- Homepage has gradient backgrounds
- Playgrounds have different styling patterns
- Skill tree uses custom styles
- No unified design language

### 4. Limited Visual Feedback
- No loading states
- Basic hover effects only
- Missing skeleton screens
- No transition consistency

## Proposed Solution

### Phase 1: Fix Critical Issues (Week 1 - Days 1-2)

#### 1.1 Install Missing Dependencies
```bash
npm install @tailwindcss/typography @tailwindcss/forms @tailwindcss/aspect-ratio
```

#### 1.2 Update Tailwind Config
```typescript
// tailwind.config.ts
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
        // Brand colors
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // Semantic colors
        success: {
          50: '#f0fdf4',
          500: '#22c55e',
          700: '#15803d',
        },
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          700: '#b45309',
        },
        error: {
          50: '#fef2f2',
          500: '#ef4444',
          700: '#b91c1c',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
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
              color: theme('colors.blue.900'),
              fontWeight: '600',
            },
            a: {
              color: theme('colors.blue.600'),
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                color: theme('colors.blue.700'),
                textDecoration: 'underline',
              },
            },
            code: {
              color: theme('colors.blue.700'),
              backgroundColor: theme('colors.blue.50'),
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
              borderLeftColor: theme('colors.blue.500'),
              backgroundColor: theme('colors.blue.50'),
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
                color: theme('colors.blue.500'),
                fontWeight: '700',
              },
            },
          },
        },
      }),
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'bounce-subtle': 'bounceSubtle 1s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
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
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' },
          '50%': { boxShadow: '0 0 30px rgba(59, 130, 246, 0.8)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(59, 130, 246, 0.5)',
        'glow-md': '0 0 20px rgba(59, 130, 246, 0.5)',
        'glow-lg': '0 0 30px rgba(59, 130, 246, 0.6)',
        'inner-glow': 'inset 0 0 20px rgba(59, 130, 246, 0.3)',
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
```

#### 1.3 Enhanced Global Styles
```css
/* app/globals.css - ENHANCED VERSION */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* CSS Variables for Design Tokens */
:root {
  /* Colors */
  --color-brand-primary: #2563eb;
  --color-brand-secondary: #7c3aed;
  --color-text-primary: #0f172a;
  --color-text-secondary: #475569;
  --color-text-muted: #94a3b8;
  --color-background: #ffffff;
  --color-surface: #f8fafc;
  --color-border: #e2e8f0;
  
  /* Spacing */
  --spacing-unit: 0.25rem;
  
  /* Typography */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;
  --font-size-5xl: 3rem;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 300ms ease;
  
  /* Border radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-full: 9999px;
  
  /* Z-index scale */
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;
}

/* Base Styles */
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: var(--color-text-primary);
  background: var(--color-background);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Focus styles for accessibility */
*:focus-visible {
  outline: 2px solid var(--color-brand-primary);
  outline-offset: 2px;
}

/* Selection styling */
::selection {
  background-color: rgba(37, 99, 235, 0.2);
  color: inherit;
}

/* Component Styles */
@layer components {
  /* Buttons */
  .btn {
    @apply px-4 py-2 rounded-lg font-medium transition-all duration-200;
    @apply focus:outline-none focus:ring-2 focus:ring-offset-2;
  }
  
  .btn-primary {
    @apply bg-gradient-to-r from-blue-600 to-purple-600;
    @apply text-white hover:from-blue-700 hover:to-purple-700;
    @apply shadow-lg hover:shadow-xl transform hover:-translate-y-0.5;
    @apply focus:ring-blue-500;
  }
  
  .btn-secondary {
    @apply bg-white border-2 border-slate-300 text-slate-700;
    @apply hover:border-blue-500 hover:text-blue-700;
    @apply focus:ring-blue-500;
  }
  
  .btn-ghost {
    @apply bg-transparent text-slate-700;
    @apply hover:bg-slate-100;
    @apply focus:ring-slate-500;
  }
  
  /* Cards */
  .card {
    @apply bg-white rounded-xl border border-slate-200 shadow-lg;
    @apply transition-all duration-300;
  }
  
  .card-hover {
    @apply card hover:shadow-2xl hover:border-blue-400;
    @apply transform hover:-translate-y-1;
  }
  
  .card-interactive {
    @apply card-hover cursor-pointer;
    @apply active:translate-y-0 active:shadow-lg;
  }
  
  /* Badges */
  .badge {
    @apply inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold;
  }
  
  .badge-primary {
    @apply bg-blue-100 text-blue-700 border border-blue-200;
  }
  
  .badge-success {
    @apply bg-green-100 text-green-700 border border-green-200;
  }
  
  .badge-warning {
    @apply bg-yellow-100 text-yellow-700 border border-yellow-200;
  }
  
  .badge-error {
    @apply bg-red-100 text-red-700 border border-red-200;
  }
  
  /* Inputs */
  .input {
    @apply w-full px-4 py-2 border border-slate-300 rounded-lg;
    @apply focus:border-blue-500 focus:ring-2 focus:ring-blue-200;
    @apply transition-all duration-200;
  }
  
  /* Gradients */
  .gradient-brand {
    @apply bg-gradient-to-r from-blue-600 to-purple-600;
  }
  
  .gradient-surface {
    @apply bg-gradient-to-br from-slate-50 via-white to-blue-50;
  }
  
  /* Text utilities */
  .text-gradient {
    @apply bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600;
  }
  
  /* Loading states */
  .skeleton {
    @apply animate-pulse bg-slate-200 rounded;
  }
  
  .shimmer {
    @apply relative overflow-hidden;
  }
  
  .shimmer::after {
    content: '';
    @apply absolute inset-0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.5),
      transparent
    );
    animation: shimmer 2s infinite;
  }
  
  /* Page sections */
  .page-section {
    @apply py-16 px-4 sm:px-6 lg:px-8;
  }
  
  .page-container {
    @apply max-w-7xl mx-auto;
  }
  
  .page-header {
    @apply text-4xl md:text-5xl font-bold mb-6;
    @apply bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600;
  }
}

/* Utility Classes */
@layer utilities {
  /* Scroll utilities */
  .scroll-smooth {
    scroll-behavior: smooth;
  }
  
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  
  /* Text utilities */
  .text-balance {
    text-wrap: balance;
  }
  
  /* Animation utilities */
  .animation-delay-200 {
    animation-delay: 200ms;
  }
  
  .animation-delay-400 {
    animation-delay: 400ms;
  }
  
  .animation-delay-600 {
    animation-delay: 600ms;
  }
}

/* Animations */
@keyframes flowAnimation {
  to {
    stroke-dashoffset: -20;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
}

@keyframes spin-slow {
  to {
    transform: rotate(360deg);
  }
}

/* Print styles */
@media print {
  .no-print {
    display: none !important;
  }
  
  body {
    font-size: 12pt;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Phase 2: Component Library (Week 1 - Days 3-7)

#### 2.1 Create Reusable Components
```tsx
// components/ui/Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  icon?: React.ReactNode
  loading?: boolean
  disabled?: boolean
  onClick?: () => void
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  loading,
  disabled,
  onClick
}: ButtonProps) {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
    danger: 'bg-red-600 text-white hover:bg-red-700'
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }
  
  return (
    <button
      className={`btn ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && <Spinner className="mr-2" />}
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  )
}
```

```tsx
// components/ui/Card.tsx
interface CardProps {
  children: React.ReactNode
  hoverable?: boolean
  interactive?: boolean
  className?: string
}

export function Card({ children, hoverable, interactive, className = '' }: CardProps) {
  const baseClass = interactive ? 'card-interactive' : hoverable ? 'card-hover' : 'card'
  return (
    <div className={`${baseClass} ${className}`}>
      {children}
    </div>
  )
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="px-6 py-4 border-b border-slate-200">{children}</div>
}

export function CardBody({ children }: { children: React.ReactNode }) {
  return <div className="px-6 py-4">{children}</div>
}

export function CardFooter({ children }: { children: React.ReactNode }) {
  return <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">{children}</div>
}
```

```tsx
// components/ui/Badge.tsx
interface BadgeProps {
  variant?: 'primary' | 'success' | 'warning' | 'error'
  children: React.ReactNode
  icon?: React.ReactNode
}

export function Badge({ variant = 'primary', children, icon }: BadgeProps) {
  const variants = {
    primary: 'badge-primary',
    success: 'badge-success',
    warning: 'badge-warning',
    error: 'badge-error'
  }
  
  return (
    <span className={`badge ${variants[variant]}`}>
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </span>
  )
}
```

```tsx
// components/ui/LoadingState.tsx
export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`skeleton ${className}`} />
}

export function Spinner({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`animate-spin h-5 w-5 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}

export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Spinner className="mx-auto h-12 w-12 text-blue-600" />
        <p className="mt-4 text-slate-600 font-medium">Loading...</p>
      </div>
    </div>
  )
}
```

### Phase 3: Page Templates (Week 2)

#### 3.1 Standard Page Layout
```tsx
// components/layouts/PageLayout.tsx
interface PageLayoutProps {
  title: string
  description?: string
  breadcrumbs?: { label: string; href: string }[]
  actions?: React.ReactNode
  hero?: boolean
  children: React.ReactNode
}

export function PageLayout({
  title,
  description,
  breadcrumbs,
  actions,
  hero,
  children
}: PageLayoutProps) {
  return (
    <div className="min-h-screen gradient-surface">
      {/* Hero or Simple Header */}
      {hero ? (
        <div className="gradient-brand text-white py-16 mb-12">
          <div className="page-container">
            {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
            <h1 className="text-5xl font-bold mb-4">{title}</h1>
            {description && (
              <p className="text-xl text-blue-100 max-w-3xl">{description}</p>
            )}
            {actions && <div className="mt-6">{actions}</div>}
          </div>
        </div>
      ) : (
        <div className="bg-white border-b border-slate-200 py-8 mb-8">
          <div className="page-container">
            {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="page-header">{title}</h1>
                {description && (
                  <p className="text-lg text-slate-600">{description}</p>
                )}
              </div>
              {actions && <div>{actions}</div>}
            </div>
          </div>
        </div>
      )}
      
      {/* Content */}
      <div className="page-container pb-16">
        {children}
      </div>
    </div>
  )
}
```

#### 3.2 Content Page Template
```tsx
// components/layouts/ContentLayout.tsx
export function ContentLayout({
  title,
  meta,
  toc,
  sidebar,
  children
}: ContentLayoutProps) {
  return (
    <PageLayout title={title} hero>
      <div className="grid grid-cols-12 gap-8">
        {/* Sidebar */}
        {sidebar && (
          <aside className="col-span-3 space-y-6">
            {sidebar}
          </aside>
        )}
        
        {/* Main Content */}
        <main className={sidebar ? 'col-span-9' : 'col-span-12'}>
          <Card className="p-10">
            {meta && (
              <div className="flex flex-wrap gap-3 mb-8 pb-8 border-b border-slate-200">
                {meta}
              </div>
            )}
            
            <article className="prose prose-slate max-w-none">
              {children}
            </article>
          </Card>
        </main>
        
        {/* Table of Contents */}
        {toc && (
          <aside className="col-span-3 sticky top-8 self-start">
            {toc}
          </aside>
        )}
      </div>
    </PageLayout>
  )
}
```

### Phase 4: Enhanced Visuals (Week 3)

#### 4.1 Micro-interactions
```tsx
// components/ui/AnimatedIcon.tsx
export function AnimatedIcon({ icon, animation = 'bounce' }: Props) {
  return (
    <div className={`text-4xl animate-${animation}`}>
      {icon}
    </div>
  )
}
```

#### 4.2 Progress Indicators
```tsx
// components/ui/ProgressBar.tsx
export function ProgressBar({ value, max = 100, color = 'blue' }: Props) {
  const percentage = (value / max) * 100
  
  return (
    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
      <div
        className={`h-full bg-gradient-to-r from-${color}-500 to-${color}-600 transition-all duration-500 ease-out`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}
```

#### 4.3 Toast Notifications
```tsx
// components/ui/Toast.tsx
export function Toast({ message, type = 'info', onClose }: Props) {
  return (
    <div className={`
      fixed bottom-4 right-4 z-50
      p-4 rounded-lg shadow-xl border-2
      animate-slide-in-right
      ${type === 'success' ? 'bg-green-50 border-green-500 text-green-900' : ''}
      ${type === 'error' ? 'bg-red-50 border-red-500 text-red-900' : ''}
      ${type === 'info' ? 'bg-blue-50 border-blue-500 text-blue-900' : ''}
    `}>
      <div className="flex items-center gap-3">
        <Icon type={type} />
        <p className="font-medium">{message}</p>
        <button onClick={onClose} className="ml-4">×</button>
      </div>
    </div>
  )
}
```

## Implementation Checklist

### Immediate (This Week)
- [ ] Install @tailwindcss/typography
- [ ] Update tailwind.config.ts with typography plugin
- [ ] Verify pattern pages render correctly
- [ ] Test all pages for styling consistency

### Short Term (Week 1-2)
- [ ] Enhance globals.css with design tokens
- [ ] Create Button component
- [ ] Create Card component
- [ ] Create Badge component
- [ ] Create loading states
- [ ] Update pattern pages to use new components

### Medium Term (Week 2-3)
- [ ] Create page layout templates
- [ ] Standardize all page headers
- [ ] Add breadcrumbs navigation
- [ ] Implement micro-interactions
- [ ] Add toast notifications
- [ ] Create progress indicators

## Success Metrics

- ✅ Pattern pages display styled content (not plain text)
- ✅ All pages use consistent design language
- ✅ 90%+ of pages use component library
- ✅ Typography scale consistently applied
- ✅ Color palette used throughout
- ✅ Smooth animations on all interactions
- ✅ Loading states for all async operations
- ✅ Accessibility score 95+ on Lighthouse

## Testing Requirements

1. **Visual Regression Testing**: Screenshot all major pages
2. **Cross-browser Testing**: Chrome, Firefox, Safari, Edge
3. **Responsive Testing**: Mobile, tablet, desktop
4. **Accessibility Testing**: Screen readers, keyboard navigation
5. **Performance Testing**: Lighthouse scores before/after

## Dependencies

```json
{
  "@tailwindcss/typography": "^0.5.10",
  "@tailwindcss/forms": "^0.5.7",
  "@tailwindcss/aspect-ratio": "^0.4.2"
}
```

## Future Enhancements

1. **Dark Mode** - Full dark theme support
2. **Theme Customization** - User-selected color schemes
3. **Motion Preferences** - Respect prefers-reduced-motion
4. **High Contrast Mode** - Accessibility enhancement
5. **Component Storybook** - Visual component documentation
6. **Animation Library** - More sophisticated animations
7. **Icon System** - Custom icon font or React icons
8. **Illustration Library** - Custom SVG illustrations

## References

- [Tailwind CSS Typography](https://tailwindcss.com/docs/typography-plugin)
- [Tailwind UI](https://tailwindui.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Refactoring UI](https://www.refactoringui.com/)
- [Material Design](https://material.io/design)
