import { DetailLevel } from './types';
import { ZOOM_THRESHOLDS, DEFAULT_ZOOM_SCALES } from './constants';

export class ZoomController {
  static getDetailLevel(zoomScale: number): DetailLevel {
    if (zoomScale < ZOOM_THRESHOLDS.L0.max) return 'L0';
    if (zoomScale < ZOOM_THRESHOLDS.L1.max) return 'L1';
    if (zoomScale < ZOOM_THRESHOLDS.L2.max) return 'L2';
    return 'L3';
  }

  static getScaleForLevel(level: DetailLevel): number {
    return DEFAULT_ZOOM_SCALES[level];
  }

  static getNextLevel(currentLevel: DetailLevel): DetailLevel | null {
    const levels: DetailLevel[] = ['L0', 'L1', 'L2', 'L3'];
    const currentIndex = levels.indexOf(currentLevel);
    return currentIndex < levels.length - 1 ? levels[currentIndex + 1] : null;
  }

  static getPreviousLevel(currentLevel: DetailLevel): DetailLevel | null {
    const levels: DetailLevel[] = ['L0', 'L1', 'L2', 'L3'];
    const currentIndex = levels.indexOf(currentLevel);
    return currentIndex > 0 ? levels[currentIndex - 1] : null;
  }

  static shouldTransition(
    currentLevel: DetailLevel,
    newZoom: number
  ): { transition: boolean; newLevel?: DetailLevel } {
    const newLevel = this.getDetailLevel(newZoom);
    if (newLevel !== currentLevel) {
      return { transition: true, newLevel };
    }
    return { transition: false };
  }
}
