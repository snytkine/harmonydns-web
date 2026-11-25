import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { screenshots } from '../config/screenshots';
import { APP_STORE_URL } from '../config/site';
import { HomePage } from './HomePage';

function renderHome() {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );
}

describe('HomePage', () => {
  it('shows the headline and the selling points from the markdown content', () => {
    renderHome();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    const points = screen.getAllByRole('listitem').map((item) => item.textContent);
    expect(points).toHaveLength(5);
    for (const phrase of [/own DNS zones/, /DNS over HTTPS/, /AdGuard/, /logs/, /caching/]) {
      expect(points.some((point) => phrase.test(point))).toBe(true);
    }
  });

  it('shows the dashboard screenshot, which opens larger when clicked', async () => {
    renderHome();
    const shot = screen.getByRole('button', { name: /dashboard/i });
    expect(within(shot).getByRole('img')).toHaveAttribute('src', screenshots.dashboard.thumb);
    await userEvent.click(shot);
    expect(screen.getByRole('dialog').querySelector('img')).toHaveAttribute('src', screenshots.dashboard.full);
  });

  it('has Features, How it works and Get the App cards, each with an icon, title and link', () => {
    renderHome();
    const overview = screen.getByRole('region', { name: 'Overview' });
    const expected = [
      ['Features', '/features'],
      ['How it works', '/documentation'],
      ['Get the App', APP_STORE_URL],
    ] as const;

    const titles = within(overview).getAllByRole('heading', { level: 2 });
    expect(titles.map((title) => title.textContent)).toEqual(expected.map(([title]) => title));

    const links = within(overview).getAllByRole('link');
    expect(links.map((link) => link.getAttribute('href'))).toEqual(expected.map(([, href]) => href));
    expect(overview.querySelectorAll('.card .glass-icon')).toHaveLength(3);
  });

  it('tells visitors to get the app from the App Store, in a new tab', () => {
    renderHome();
    const overview = screen.getByRole('region', { name: 'Overview' });
    expect(overview).toHaveTextContent(/App Store/);
    expect(within(overview).getByRole('link', { name: /App Store/ })).toHaveAttribute('target', '_blank');
  });

  it('offers App Store and features actions in the hero', () => {
    renderHome();
    expect(screen.getByRole('link', { name: 'Get the App' })).toHaveAttribute('href', APP_STORE_URL);
    expect(screen.getByRole('link', { name: 'See features' })).toHaveAttribute('href', '/features');
  });
});
