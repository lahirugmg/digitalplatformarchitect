# DEF-002: alert() used for user notifications throughout the app

**Status:** Open
**Severity:** Medium
**Area:** Multiple playgrounds and skill tree
**Created:** 2026-02-14

## Description

Native `alert()` dialogs are used in 6 files for user feedback instead of proper UI notifications.

## Affected Files

- `app/playgrounds/data-pipeline/components/DataPipelineCanvas.tsx`
- `app/playgrounds/data-pipeline/components/ExportModal.tsx`
- `app/playgrounds/pattern-composer/page.tsx`
- `app/skill-tree/components/SkillTreeCanvas.tsx`
- `app/skill-tree/components/TokenPanel.tsx`
- Additional files may be affected

## Steps to Reproduce

1. Try to export without nodes in data pipeline
2. Try to unlock a skill node without enough tokens
3. Save/load pipeline state

## Expected Behavior

Modern toast notifications or modal dialogs with branded styling

## Actual Behavior

Browser native `alert()` boxes that are not customizable and break visual flow

## Impact

- Unprofessional appearance
- Accessibility issues (screen readers may not handle well)
- Cannot be styled to match brand
- Cannot be dismissed gracefully
- Blocks all interaction until dismissed
- Poor mobile experience

## Proposed Solution

Implement a toast notification system:

1. Install a library like `react-hot-toast` or `sonner`
2. Create a custom toast component with brand styling
3. Replace all `alert()` calls with toast notifications
4. Add different variants: success, error, warning, info

Example:
```typescript
// Instead of:
alert('Pipeline saved successfully!');

// Use:
toast.success('Pipeline saved successfully!');
```

## Priority

Medium - Affects professionalism and UX across multiple pages

## Related

- Links to FEAT-001 (Add toast notification system)
