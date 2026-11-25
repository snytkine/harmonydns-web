import type { ReactNode } from 'react';
import type { IconName } from '../config/site';

const GLYPHS: Record<IconName, ReactNode> = {
  home: (
    <>
      <path d="M4 11.2 12 4.5l8 6.7" />
      <path d="M6.5 9.8V19h4v-4.5h3V19h4V9.8" />
    </>
  ),
  features: (
    <>
      <path d="M10 4.5l1.7 4.3 4.3 1.7-4.3 1.7L10 16.5l-1.7-4.3L4 10.5l4.3-1.7Z" />
      <path d="M17.5 14.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8Z" />
    </>
  ),
  documentation: (
    <>
      <path d="M12 6.5C10.3 5.3 7.8 5 5 5.2v12.6c2.8-.2 5.3.1 7 1.3 1.7-1.2 4.2-1.5 7-1.3V5.2c-2.8-.2-5.3.1-7 1.3Z" />
      <path d="M12 6.5V19" />
    </>
  ),
  support: (
    <>
      <path d="M5 13.5V12a7 7 0 0 1 14 0v1.5" />
      <rect x="4" y="13" width="3.5" height="5.5" rx="1.5" />
      <rect x="16.5" y="13" width="3.5" height="5.5" rx="1.5" />
      <path d="M18.5 18.5c0 1.2-1.5 2-4 2h-1.5" />
    </>
  ),
  privacy: (
    <>
      <path d="M12 3.8c2.2 1.6 4.6 2.4 7 2.6v4.8c0 4.6-2.8 7.8-7 9.2-4.2-1.4-7-4.6-7-9.2V6.4c2.4-.2 4.8-1 7-2.6Z" />
      <rect x="9.2" y="11" width="5.6" height="4.4" rx="1" />
      <path d="M10.4 11V9.6a1.6 1.6 0 0 1 3.2 0V11" />
    </>
  ),
  'how-it-works': (
    <>
      <circle cx="12" cy="12" r="2.6" />
      <circle cx="5.5" cy="6" r="1.7" />
      <circle cx="18.5" cy="6" r="1.7" />
      <circle cx="5.5" cy="18" r="1.7" />
      <circle cx="18.5" cy="18" r="1.7" />
      <path d="M10 10.2 6.8 7.2M14 10.2l3.2-3M10 13.8l-3.2 3M14 13.8l3.2 3" />
    </>
  ),
  'app-store': (
    <>
      <path d="M10.2 5.5 15.8 15M13.8 5.5 8.2 15" />
      <path d="M5 15h14" />
      <path d="M7 18.5l1.2-2M17 18.5l-1.2-2" />
    </>
  ),
};

interface GlassIconProps {
  readonly name: IconName;
  readonly size?: 'regular' | 'large';
}

/** A glossy "glass" tile with a white glyph, tilting in 3D when its parent is hovered. */
export function GlassIcon({ name, size = 'regular' }: GlassIconProps) {
  return (
    <span className={`glass-icon glass-icon--${name} glass-icon--${size}`} aria-hidden="true">
      <svg viewBox="0 0 24 24">{GLYPHS[name]}</svg>
    </span>
  );
}
