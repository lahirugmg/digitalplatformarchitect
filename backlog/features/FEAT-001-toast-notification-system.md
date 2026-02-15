# FEAT-001: Add toast notification system

**Status:** Proposed
**Priority:** High
**Category:** UX Enhancement
**Effort:** Small
**Created:** 2026-02-14

## Description

Replace all `alert()` calls with a modern toast notification system that provides non-blocking, dismissible notifications with success/error/warning variants.

## User Story

**As a** user
**I want** to receive feedback on my actions without interrupting my workflow
**So that** I can continue working while being informed of action outcomes

## Current State

Currently using browser native `alert()` dialogs which:
- Block all interaction until dismissed
- Cannot be styled to match brand
- Look unprofessional
- Poor mobile experience
- Not accessible

Example locations:
- Save/load actions in playgrounds
- Skill tree unlock notifications
- Export validation messages
- Error messages

## Proposed Solution

### 1. Choose Toast Library

Options:
- **sonner** (Recommended) - Modern, lightweight, great DX
- **react-hot-toast** - Popular, feature-rich
- Custom implementation using Headless UI

### 2. Implementation with Sonner

```bash
npm install sonner
```

```typescript
// app/layout.tsx
import { Toaster } from 'sonner';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster
          position="top-right"
          expand={false}
          richColors
          closeButton
          duration={4000}
        />
      </body>
    </html>
  );
}
```

```typescript
// Usage in components
import { toast } from 'sonner';

// Success
toast.success('Pipeline saved successfully!');

// Error
toast.error('Failed to save pipeline. Please try again.');

// Warning
toast.warning('This action cannot be undone');

// Info
toast.info('Loading your previous work...');

// With action button
toast('Pipeline exported', {
  description: 'Your architecture has been exported to Terraform',
  action: {
    label: 'Download',
    onClick: () => downloadFile(),
  },
});

// Loading state
const toastId = toast.loading('Exporting...');
// Later...
toast.success('Exported successfully!', { id: toastId });
```

### 3. Replace All alert() Calls

Search for `alert(` in codebase and replace:

**Before:**
```typescript
alert('Pipeline saved successfully!');
```

**After:**
```typescript
import { toast } from 'sonner';
toast.success('Pipeline saved successfully!');
```

### 4. Branded Styling

```typescript
// Custom toast styles
<Toaster
  position="top-right"
  toastOptions={{
    style: {
      background: 'white',
      color: '#0f172a',
      border: '1px solid #e2e8f0',
      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
    },
    className: 'my-toast',
  }}
/>
```

## Acceptance Criteria

- [ ] Toast notifications appear in top-right corner
- [ ] Auto-dismiss after 3-5 seconds with option to dismiss manually
- [ ] Different styles for success, error, warning, info
- [ ] Notifications stack vertically if multiple appear
- [ ] Accessible with proper ARIA live regions
- [ ] All `alert()` calls replaced across the codebase
- [ ] Loading states for async operations
- [ ] Optional: Dark mode support
- [ ] Works on mobile with appropriate touch targets

## Files to Modify

```
app/layout.tsx - Add Toaster component
app/playgrounds/data-pipeline/components/DataPipelineCanvas.tsx
app/playgrounds/data-pipeline/components/ExportModal.tsx
app/playgrounds/pattern-composer/page.tsx
app/skill-tree/components/SkillTreeCanvas.tsx
app/skill-tree/components/TokenPanel.tsx
```

## Benefits

✅ Non-blocking user experience
✅ Professional appearance
✅ Better accessibility
✅ Consistent notification style across app
✅ Support for action buttons and loading states
✅ Mobile-friendly
✅ Auto-dismiss prevents clutter

## Dependencies

- sonner library (or chosen alternative)

## Estimated Effort

**Small** (4-6 hours):
- 1 hour: Install and configure library
- 2 hours: Replace all alert() calls
- 1 hour: Test all notification scenarios
- 1 hour: Style and polish

## Related Issues

- Resolves: DEF-002 (alert() used for notifications)
- Improves: Overall UX across all playgrounds

## Testing Checklist

- [ ] Test success notifications
- [ ] Test error notifications
- [ ] Test warning notifications
- [ ] Test info notifications
- [ ] Test multiple simultaneous toasts
- [ ] Test loading → success flow
- [ ] Test loading → error flow
- [ ] Test action buttons in toasts
- [ ] Test dismiss functionality
- [ ] Test on mobile devices
- [ ] Verify ARIA live regions for screen readers
- [ ] Test auto-dismiss timing
- [ ] Verify no console errors

## Screenshots/Mockups

(Add mockups showing toast notifications in context of playgrounds)

## Implementation Notes

1. Start with one playground to validate approach
2. Create a utility function if custom toast configurations needed
3. Consider adding toast history/log for debugging
4. Document toast usage patterns in component guidelines

## Future Enhancements

- Toast queue management for many notifications
- Persistent notifications for critical errors
- Toast history panel
- Notification preferences (user can disable/customize)
- Sound effects (optional)
