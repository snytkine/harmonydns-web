import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach, vi } from 'vitest';

/** jsdom has no matchMedia; tests choose which media queries match. */
export function stubMatchMedia(matches: (query: string) => boolean = () => false): void {
  vi.stubGlobal(
    'matchMedia',
    vi.fn((query: string) => ({
      matches: matches(query),
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  );
}

// jsdom has <dialog> but not its modal methods; these mimic what browsers do, including firing
// "close" in a later task rather than during close() itself.
HTMLDialogElement.prototype.showModal = function showModal(this: HTMLDialogElement) {
  this.setAttribute('open', '');
};
HTMLDialogElement.prototype.close = function close(this: HTMLDialogElement) {
  if (!this.open) return;
  this.removeAttribute('open');
  setTimeout(() => this.dispatchEvent(new Event('close')), 0);
};

beforeEach(() => {
  stubMatchMedia();
  // jsdom logs "not implemented" for scrollTo.
  vi.stubGlobal('scrollTo', vi.fn());
  localStorage.clear();
  delete document.documentElement.dataset.theme;
});

afterEach(() => {
  cleanup();
});
