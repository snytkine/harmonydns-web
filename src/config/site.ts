export type IconName = 'home' | 'features' | 'documentation' | 'support' | 'privacy' | 'how-it-works' | 'app-store';

export interface NavItem {
  readonly path: string;
  readonly label: string;
  /** Shorter label shown on phones, where the tab bar is tight. */
  readonly shortLabel?: string;
  readonly icon: IconName;
}

export const site = {
  name: 'Harmony DNS',
  copyrightStartYear: 2026,
} as const;

export const navItems: readonly NavItem[] = [
  { path: '/', label: 'Home', icon: 'home' },
  { path: '/features', label: 'Features', icon: 'features' },
  { path: '/documentation', label: 'Documentation', shortLabel: 'Docs', icon: 'documentation' },
  { path: '/support', label: 'Support', icon: 'support' },
  { path: '/privacy', label: 'Privacy policy', shortLabel: 'Privacy', icon: 'privacy' },
];

/**
 * Where "Get the App" sends visitors. Until the app's own App Store page exists this is an App Store
 * search for the app; replace it with the product page URL (https://apps.apple.com/app/id…) once published.
 */
export const APP_STORE_URL = 'https://apps.apple.com/us/search?term=Harmony%20DNS';
