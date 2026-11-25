import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Footer } from './Footer';

afterEach(() => {
  vi.useRealTimers();
});

function renderIn(year: number) {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(year, 5, 15));
  render(<Footer />);
  return screen.getByRole('contentinfo');
}

describe('Footer', () => {
  it('shows only the start year in 2026', () => {
    expect(renderIn(2026)).toHaveTextContent(/^Copyright © 2026 Harmony DNS$/);
  });

  it('shows a range from 2026 to the current year afterwards', () => {
    expect(renderIn(2029)).toHaveTextContent(/^Copyright © 2026 - 2029 Harmony DNS$/);
  });
});
