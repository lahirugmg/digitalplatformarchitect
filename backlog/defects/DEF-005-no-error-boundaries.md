# DEF-005: No error boundaries to catch React errors

**Status:** Open
**Severity:** Critical
**Area:** All pages
**Created:** 2026-02-14

## Description

No Error Boundary components are implemented anywhere in the app. If any component throws an error, the entire app will crash with white screen.

## Steps to Reproduce

1. Trigger any runtime error in a component (e.g., accessing undefined property)
2. Observe entire app crashes

## Expected Behavior

Error boundary should catch the error and show user-friendly error message with option to recover

## Actual Behavior

White screen of death with no recovery option. User must manually refresh the entire page.

## Impact

**CRITICAL** - Catastrophic user experience:
- Users lose all progress and unsaved work
- No way to recover without full page reload
- Error in one component crashes entire application
- No error logging or debugging information
- Looks extremely unprofessional
- May cause users to abandon the site

## Proposed Solution

### 1. Create Error Boundary Component

```typescript
// components/ErrorBoundary.tsx
'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-slate-600 mb-6">
              We encountered an unexpected error. Don't worry, your progress may still be saved.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => this.setState({ hasError: false })}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="w-full bg-slate-200 text-slate-700 px-6 py-3 rounded-lg hover:bg-slate-300"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### 2. Wrap App at Multiple Levels

```typescript
// app/layout.tsx
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}

// app/playgrounds/data-pipeline/page.tsx
export default function DataPipelinePage() {
  return (
    <ErrorBoundary fallback={<PlaygroundError />}>
      <DataPipelineCanvas />
    </ErrorBoundary>
  );
}
```

### 3. Add Error Logging

Integrate with error tracking service like Sentry:

```typescript
componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
  // Send to error tracking service
  if (typeof window !== 'undefined') {
    // Sentry.captureException(error, { extra: errorInfo });
  }
}
```

## Implementation Priority

**CRITICAL** - Must be implemented immediately before any production release

## Testing

1. Throw error in playground component
2. Verify error boundary catches it
3. Verify user can recover without losing data
4. Test at different component levels

## Additional Considerations

- Add error boundaries at page level (coarse-grained)
- Add error boundaries around complex components (fine-grained)
- Preserve user state in localStorage before showing error UI
- Provide "Report Bug" button in error UI
- Different fallback UIs for different contexts (playground vs. static page)
