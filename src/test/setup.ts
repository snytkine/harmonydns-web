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

// jsdom has <dialog> but not its modal methods; these mimic what browsers do.
HTMLDialogElement.prototype.showModal = function showModal(this: HTMLDialogElement) {
  this.setAttribute('open', '');
};
HTMLDialogElement.prototype.close = function close(this: HTMLDialogElement) {
  this.removeAttribute('open');
  this.dispatchEvent(new Event('close'));
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
