# FEAT-002: Export playground diagrams as images

**Status:** Proposed
**Priority:** High
**Category:** Export Functionality
**Effort:** Medium
**Created:** 2026-02-14

## Description

Add ability to export playground compositions as PNG/SVG images for documentation and sharing purposes.

## User Story

**As a** user
**I want** to export my pipeline/pattern diagrams as images
**So that** I can include them in documentation, presentations, and share with colleagues

## Current State

Currently, users can:
- Export to IaC formats (Terraform, Kubernetes) in Pattern Composer
- Save/load state to localStorage
- View compositions only within the browser

**Cannot:**
- Export visual diagrams as images
- Share visual representations
- Include diagrams in external documentation
- Print compositions

## Proposed Solution

### Option 1: html-to-image (Recommended)

```bash
npm install html-to-image
```

```typescript
// components/ExportImageButton.tsx
'use client';

import { toPng, toJpeg, toSvg } from 'html-to-image';
import { toast } from 'sonner';

interface Props {
  elementId: string;
  filename: string;
}

export function ExportImageButton({ elementId, filename }: Props) {
  const [isExporting, setIsExporting] = useState(false);
  const [format, setFormat] = useState<'png' | 'svg' | 'jpeg'>('png');

  const handleExport = async () => {
    const element = document.getElementById(elementId);
    if (!element) {
      toast.error('Canvas not found');
      return;
    }

    setIsExporting(true);
    toast.loading('Generating image...');

    try {
      let dataUrl: string;

      switch (format) {
        case 'png':
          dataUrl = await toPng(element, {
            quality: 1.0,
            pixelRatio: 2, // 2x for retina displays
            backgroundColor: '#ffffff',
          });
          break;
        case 'svg':
          dataUrl = await toSvg(element);
          break;
        case 'jpeg':
          dataUrl = await toJpeg(element, {
            quality: 0.95,
            backgroundColor: '#ffffff',
          });
          break;
      }

      // Download the image
      const link = document.createElement('a');
      link.download = `${filename}-${Date.now()}.${format}`;
      link.href = dataUrl;
      link.click();

      toast.success(`Exported as ${format.toUpperCase()}`);
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('Failed to export image');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={format}
        onChange={(e) => setFormat(e.target.value as any)}
        className="px-3 py-2 border rounded-lg"
      >
        <option value="png">PNG</option>
        <option value="svg">SVG</option>
        <option value="jpeg">JPEG</option>
      </select>

      <button
        onClick={handleExport}
        disabled={isExporting}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {isExporting ? 'Exporting...' : '📸 Export Image'}
      </button>
    </div>
  );
}
```

### Option 2: react-to-print (For PDF support)

```bash
npm install react-to-print
```

```typescript
import { useReactToPrint } from 'react-to-print';

const handlePrint = useReactToPrint({
  content: () => componentRef.current,
  documentTitle: 'architecture-diagram',
  pageStyle: '@page { size: A4 landscape; margin: 2cm; }',
});
```

### Implementation in Playgrounds

#### Data Pipeline Playground

```typescript
// app/playgrounds/data-pipeline/page.tsx
<div className="flex gap-2">
  <button onClick={handleSave}>💾 Save</button>
  <button onClick={handleLoad}>📂 Load</button>
  <ExportModal>
    <ExportImageButton
      elementId="pipeline-canvas"
      filename="data-pipeline"
    />
  </ExportModal>
</div>

<div id="pipeline-canvas" className="flex-1">
  <ReactFlowProvider>
    <DataPipelineCanvas />
  </ReactFlowProvider>
</div>
```

#### Pattern Composer

```typescript
// app/playgrounds/pattern-composer/page.tsx
<ExportImageButton
  elementId="pattern-composer-canvas"
  filename="pattern-composition"
/>

<div id="pattern-composer-canvas">
  {/* SVG composition */}
</div>
```

## Acceptance Criteria

- [ ] Export button in each playground
- [ ] Support PNG format (primary)
- [ ] Support SVG format (vector)
- [ ] Support JPEG format (optional, smaller file size)
- [ ] Include timestamps in filename
- [ ] Preserve colors and styling in export
- [ ] Option to include/exclude legend and labels (advanced)
- [ ] High-resolution export (2x pixel ratio for retina)
- [ ] Loading indicator during export
- [ ] Success/error notifications
- [ ] Works on all supported browsers
- [ ] Mobile support

## Export Enhancements (Optional)

### 1. Watermark/Branding
```typescript
const addWatermark = (element: HTMLElement) => {
  const watermark = document.createElement('div');
  watermark.innerHTML = 'Created with Digital Platform Architect';
  watermark.style.cssText = 'position:absolute;bottom:10px;right:10px;opacity:0.5;font-size:12px';
  element.appendChild(watermark);
};
```

### 2. Export Settings Modal
```typescript
interface ExportSettings {
  format: 'png' | 'svg' | 'jpeg';
  quality: number; // 0.1 - 1.0
  pixelRatio: number; // 1, 2, 3 for different resolutions
  backgroundColor: string;
  includeWatermark: boolean;
  includeLegend: boolean;
  includeMetrics: boolean;
}
```

### 3. Copy to Clipboard
```typescript
const copyImageToClipboard = async () => {
  const blob = await (await fetch(dataUrl)).blob();
  await navigator.clipboard.write([
    new ClipboardItem({ 'image/png': blob })
  ]);
  toast.success('Image copied to clipboard!');
};
```

## Files to Create/Modify

```
components/ExportImageButton.tsx (new)
app/playgrounds/data-pipeline/page.tsx
app/playgrounds/pattern-composer/page.tsx
app/playgrounds/message-flow/page.tsx
app/playgrounds/enterprise-integration/page.tsx
```

## Benefits

✅ Users can share visual diagrams easily
✅ Documentation integration
✅ Presentation materials
✅ Printable diagrams
✅ Social media sharing
✅ Portfolio/case studies
✅ Better collaboration

## Technical Considerations

### Canvas Elements (ReactFlow, D3, SVG)
- `html-to-image` handles SVG, Canvas, and HTML
- Ensure all fonts are loaded before export
- External images must be loaded (CORS issues)

### Performance
- Large diagrams may take 1-2 seconds to export
- Show loading state during generation
- Consider debouncing export button

### Browser Compatibility
- Works in all modern browsers
- Safari may have CORS restrictions
- Test in mobile browsers

## Estimated Effort

**Medium** (12-16 hours):
- 2 hours: Research and choose library
- 4 hours: Implement ExportImageButton component
- 4 hours: Integrate into all 4 playgrounds
- 2 hours: Add export settings/options
- 2 hours: Testing across browsers and devices
- 2 hours: Documentation and polish

## Dependencies

- html-to-image library
- FEAT-001 (Toast notifications for feedback)

## Testing Checklist

- [ ] Export PNG from Data Pipeline
- [ ] Export SVG from Pattern Composer
- [ ] Export JPEG from Message Flow
- [ ] Verify image quality and resolution
- [ ] Test with large/complex diagrams
- [ ] Test on Chrome, Firefox, Safari, Edge
- [ ] Test on mobile devices
- [ ] Verify colors are preserved
- [ ] Test with dark backgrounds
- [ ] Verify filename includes timestamp
- [ ] Test loading states
- [ ] Verify error handling (empty canvas)
- [ ] Test accessibility (keyboard triggers)

## Future Enhancements

- Batch export (multiple views at once)
- Export history/gallery
- Cloud storage integration (save to Google Drive, Dropbox)
- Print directly (PDF generation)
- Share link with preview image
- Animated GIF export for demonstrations
- Export with annotations/comments
- Template exports (letterhead, presentation slides)

## Related Issues

- Supports: User onboarding and documentation
- Enables: Social sharing and marketing
- Complements: FEAT-003 (Share via URL)

## Success Metrics

After implementation, track:
- Number of image exports per week
- Most exported playground
- Preferred image format (PNG vs SVG)
- User feedback on image quality
