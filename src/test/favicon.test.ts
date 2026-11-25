import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = resolve(import.meta.dirname, '../..');

describe('favicon.svg', () => {
  const svgText = readFileSync(resolve(root, 'public/favicon.svg'), 'utf8');

  it('is a valid SVG', () => {
    const svg = new DOMParser().parseFromString(svgText, 'image/svg+xml');
    expect(svg.querySelector('parsererror')).toBeNull();
    expect(svg.documentElement.tagName).toBe('svg');
  });

  it('is the same icon as the logo in the header', () => {
    expect(readFileSync(resolve(root, 'src/assets/logo.svg'), 'utf8')).toBe(svgText);
  });

  it('is the icon the page links to', () => {
    expect(readFileSync(resolve(root, 'index.html'), 'utf8')).toContain(
      '<link rel="icon" type="image/svg+xml" href="/favicon.svg" />',
    );
  });
});
