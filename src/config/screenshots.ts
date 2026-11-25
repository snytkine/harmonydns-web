import darkModeFull from '../assets/screenshots/dark-mode-view.png';
import darkModeThumb from '../assets/screenshots/dark-mode-view-thumb.png';
import dashboardFull from '../assets/screenshots/dashboard.png';
import dashboardThumb from '../assets/screenshots/dashboard-thumb.png';
import logsFull from '../assets/screenshots/logs-view.png';
import logsThumb from '../assets/screenshots/logs-view-thumb.png';
import ownZoneFull from '../assets/screenshots/own-zones-view.png';
import ownZoneThumb from '../assets/screenshots/own-zones-view-thumb.png';
import settingsFull from '../assets/screenshots/settings-view.png';
import settingsThumb from '../assets/screenshots/settings-view-thumb.png';
import statisticsFull from '../assets/screenshots/statistics-view.png';
import statisticsThumb from '../assets/screenshots/statistics-view-thumb.png';
import upstreamSelectionFull from '../assets/screenshots/upstream-server-selection.png';
import upstreamSelectionThumb from '../assets/screenshots/upstream-server-selection-thumb.png';
import upstreamFull from '../assets/screenshots/upstream-servers.png';
import upstreamThumb from '../assets/screenshots/upstream-servers-thumb.png';
import zonesFull from '../assets/screenshots/zones-view.png';
import zonesThumb from '../assets/screenshots/zones-view-thumb.png';

/** One app screenshot: a small image for the page and a large one for the zoomed-in view. */
export interface ScreenshotImage {
  readonly thumb: string;
  readonly full: string;
}

/**
 * Screenshots that Markdown content can show with `![Caption](screenshot:<id>)`.
 * Thumbnails are 800 px wide and full images 1600 px, which stay sharp on Retina screens.
 */
export const screenshots = {
  dashboard: { thumb: dashboardThumb, full: dashboardFull },
  'dark-mode': { thumb: darkModeThumb, full: darkModeFull },
  logs: { thumb: logsThumb, full: logsFull },
  'own-zone': { thumb: ownZoneThumb, full: ownZoneFull },
  settings: { thumb: settingsThumb, full: settingsFull },
  statistics: { thumb: statisticsThumb, full: statisticsFull },
  'upstream-selection': { thumb: upstreamSelectionThumb, full: upstreamSelectionFull },
  upstream: { thumb: upstreamThumb, full: upstreamFull },
  zones: { thumb: zonesThumb, full: zonesFull },
} as const satisfies Record<string, ScreenshotImage>;

export type ScreenshotId = keyof typeof screenshots;

/** Prefix that marks a Markdown image as one of the screenshots above. */
export const SCREENSHOT_SCHEME = 'screenshot:';

/** Finds the screenshot a Markdown image source such as `screenshot:logs` refers to. */
export function findScreenshot(src: string | undefined): ScreenshotImage | undefined {
  if (!src?.startsWith(SCREENSHOT_SCHEME)) return undefined;
  const id = src.slice(SCREENSHOT_SCHEME.length);
  return Object.hasOwn(screenshots, id) ? screenshots[id as ScreenshotId] : undefined;
}
