import { describe, expect, it } from 'vitest';
import { resolveBase } from './base';

describe('resolveBase', () => {
  it.each([
    [undefined, '/'],
    ['', '/'],
    ['/', '/'],
    ['/harmonydns-web', '/harmonydns-web/'],
    ['/harmonydns-web/', '/harmonydns-web/'],
    ['harmonydns-web', '/harmonydns-web/'],
    ['/a/b', '/a/b/'],
  ])('turns %j into %j', (input, expected) => {
    expect(resolveBase(input)).toBe(expected);
  });
});
