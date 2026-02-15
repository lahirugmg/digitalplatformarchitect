# Defect #003: Missing Google Fonts Integration (Inter Font)

**Severity:** Low 🟢  
**Status:** Fixed  
**Found:** 2026-02-14  
**Category:** UI/Design

## Description
According to project instructions in [.github/copilot-instructions.md](.github/copilot-instructions.md), the application should be using the Inter font from Google Fonts via `next/font/google`. However, this import is missing from [app/layout.tsx](app/layout.tsx), and the app currently falls back to system fonts.

## Expected Implementation
From the instructions (line 17, 24):
```tsx
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

// In HTML tag:
<html lang="en" className={inter.className}>
```

## Current Implementation
[app/layout.tsx](app/layout.tsx) has no font import:
```tsx
import type { Metadata } from 'next'
import './globals.css'
// No font import

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
```

Font fallback in [app/globals.css](app/globals.css) (line 29):
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

## Impact
- Typography doesn't match the intended design system
- Inconsistent font rendering across different operating systems
- Slight visual quality degradation compared to intended design
- Website doesn't use the optimized font loading that Next.js provides

## Location
- **File:** [app/layout.tsx](app/layout.tsx)
- **Related:** [app/globals.css](app/globals.css) line 29

## Build Note
The instructions mention that this was intentionally removed due to offline build issues:
> "Build fails in environments without internet access due to Google Fonts"

This suggests the font was removed as a workaround but was never restored.

## Reproduction
1. Check [app/layout.tsx](app/layout.tsx) - no font import
2. Inspect the website in browser DevTools
3. See system fonts being used instead of Inter

## Resolution Options

### Option 1: Restore Google Fonts (Recommended for online builds)
```tsx
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

<html lang="en" className={inter.className}>
```

### Option 2: Use Local Font Files
Download Inter font files and use `next/font/local` for offline builds:
```tsx
import localFont from 'next/font/local'
const inter = localFont({ src: './fonts/Inter-Variable.woff2' })
```

### Option 3: Keep Current System Fonts
Update documentation to reflect the intentional use of system fonts.

## Resolution
Keep system fonts to preserve offline-safe builds and avoid Google Fonts fetch failures.
