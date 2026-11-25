import { describe, expect, it } from 'vitest';
import { findScreenshot, screenshots } from './screenshots';

describe('findScreenshot', () => {
  it('finds a screenshot by its "screenshot:" source', () => {
    expect(findScreenshot('screenshot:dashboard')).toBe(screenshots.dashboard);
  });

  it.each([undefined, '', 'dashboard', 'https://example.com/a.png', 'screenshot:nope', 'screenshot:toString'])(
    'finds nothing for %j',
    (src) => {
      expect(findScreenshot(src)).toBeUndefined();
    },
  );

  it('has a small and a large image for every screenshot', () => {
    for (const image of Object.values(screenshots)) {
      expect(image.thumb).toMatch(/-thumb\.png$/);
      expect(image.full).toMatch(/\.png$/);
      expect(image.full).not.toBe(image.thumb);
    }
  });
});
