# Feature: Dark Mode & Theme Switcher

**Priority:** Medium 🟡  
**Category:** User Experience  
**Effort:** Small (3-5 days)  
**Impact:** Medium

## Overview
Add dark mode support with a theme switcher, improving accessibility and user comfort during extended learning sessions, especially at night.

## Current State
- Light mode only
- Hard-coded color values throughout the app
- No theme switching mechanism
- Bright backgrounds can cause eye strain during long sessions

## Proposed Solution

### Theme System
Implement a comprehensive theming system using:
1. **CSS Variables** - Already partially in place in [app/globals.css](app/globals.css)
2. **Tailwind Dark Mode** - Using class-based dark mode
3. **next-themes** - For smooth theme switching and persistence

### Color Palette

#### Light Mode (Current)
```css
--background: #f8fafc (slate-50)
--foreground: #0f172a (slate-900)
--primary: #2563eb (blue-600)
--secondary: #64748b (slate-500)
--accent: #8b5cf6 (violet-500)
--card: #ffffff
--border: #e2e8f0 (slate-200)
```

#### Dark Mode (New)
```css
--background: #0f172a (slate-900)
--foreground: #f8fafc (slate-50)
--primary: #3b82f6 (blue-500)
--secondary: #94a3b8 (slate-400)
--accent: #a78bfa (violet-400)
--card: #1e293b (slate-800)
--border: #334155 (slate-700)
```

## Features

### 1. Theme Switcher Component
```tsx
// components/ThemeToggle.tsx
'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}
```

### 2. System Preference Detection
- Automatically detect user's OS theme preference
- Respect `prefers-color-scheme` media query
- Allow manual override

### 3. Theme Persistence
- Save theme preference to localStorage
- Sync across tabs
- Remember choice on next visit

### 4. Smooth Transitions
- Animated theme switching
- No flash of unstyled content (FOUC)
- Smooth color transitions

### 5. Component Updates
Update all components to support dark mode:
- Navigation bar
- Cards and panels
- Buttons and inputs
- Canvas backgrounds (playgrounds)
- Code blocks (syntax highlighting)
- Charts and visualizations

## Implementation

### Step 1: Install Dependencies
```bash
npm install next-themes
```

### Step 2: Update Tailwind Config
```js
// tailwind.config.ts
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: 'hsl(var(--primary))',
        // ... more colors
      },
    },
  },
}
```

### Step 3: Update CSS Variables
```css
/* app/globals.css */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    /* ... */
  }
 
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    /* ... */
  }
}
```

### Step 4: Add Theme Provider
```tsx
// app/layout.tsx
import { ThemeProvider } from 'next-themes'

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {/* ... */}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### Step 5: Update Components
Apply dark mode classes throughout:
```tsx
// Before
<div className="bg-white text-slate-900">

// After
<div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50">
```

## Playground Considerations

### Canvas Backgrounds
- Light mode: `bg-slate-50`
- Dark mode: `bg-slate-900`

### Node Styling
- Adjust node colors for contrast
- Ensure text readability
- Update connection line colors

### Syntax Highlighting
- Use theme-aware code highlighter
- Provide dark-compatible color schemes for code blocks

## User Experience

### Theme Toggle Location
- Add to navigation header (top right)
- Keyboard shortcut: `Cmd/Ctrl + Shift + D`
- Remember last used theme

### Accessibility
- Sufficient color contrast (WCAG AA)
- Maintain focus indicators
- No reliance on color alone for information

### Animation
```css
* {
  transition: background-color 0.3s ease, 
              color 0.3s ease,
              border-color 0.3s ease;
}
```

## Testing Checklist
- [ ] Theme persists across page reloads
- [ ] System preference detection works
- [ ] All pages render correctly in dark mode
- [ ] All playgrounds display properly in dark mode
- [ ] Syntax highlighting works in both themes
- [ ] Charts and diagrams are visible
- [ ] No FOUC on initial page load
- [ ] Cross-browser testing (Chrome, Firefox, Safari)
- [ ] Mobile responsive in both themes

## Benefits
- **Reduced Eye Strain:** Better for extended learning sessions
- **Accessibility:** Better for users with light sensitivity
- **Modern UX:** Expected feature in modern web apps
- **Professional:** Shows attention to detail
- **User Preference:** Some users strongly prefer dark mode

## Analytics to Track
- Theme preference distribution (light vs dark vs system)
- Time of day preferences
- Session duration comparison (light vs dark)
- User retention impact

## Future Enhancements
- **Multiple Themes:** Add themed color schemes (blue, purple, green)
- **Custom Colors:** Let users customize accent colors
- **High Contrast Mode:** For accessibility
- **Color Blind Modes:** Deuteranopia, Protanopia, Tritanopia
- **Time-Based Auto-Switch:** Automatically switch based on time of day
- **Per-Page Themes:** Different themes for different sections

## References
- [next-themes documentation](https://github.com/pacocoursey/next-themes)
- [Tailwind Dark Mode](https://tailwindcss.com/docs/dark-mode)
- [WCAG Color Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
