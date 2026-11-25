import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { App } from './App';

function renderApp(path = '/', basename?: string) {
  return render(
    <MemoryRouter initialEntries={[path]} basename={basename}>
      <App />
    </MemoryRouter>,
  );
}

function pageTitle() {
  return within(screen.getByRole('main')).getByRole('heading', { level: 1 });
}

describe('App', () => {
  it('shows the home page with header and footer', () => {
    renderApp();
    expect(screen.getByRole('banner')).toHaveTextContent('Harmony DNS');
    expect(screen.getByRole('contentinfo')).toHaveTextContent('Harmony DNS');
    expect(screen.getByRole('region', { name: 'Overview' })).toBeInTheDocument();
  });

  it.each([
    ['/features', 'Features'],
    ['/documentation', 'Documentation'],
    ['/support', 'Support'],
    ['/privacy', 'Privacy policy'],
  ])('shows the %s page', (path, title) => {
    renderApp(path);
    expect(pageTitle()).toHaveTextContent(title);
  });

  it('shows the app screenshots on the features page', () => {
    renderApp('/features');
    const shots = within(screen.getByRole('main')).getAllByRole('button');
    expect(shots.length).toBeGreaterThanOrEqual(8);
    expect(shots.map((shot) => shot.getAttribute('title'))).toEqual(shots.map(() => 'Click to enlarge'));
  });

  it('opens a deep link served under a repository path, as on GitHub Pages', () => {
    renderApp('/harmonydns-web/support', '/harmonydns-web/');
    expect(pageTitle()).toHaveTextContent('Support');
    const nav = screen.getByRole('navigation', { name: 'Main' });
    expect(within(nav).getByRole('link', { name: 'Features' })).toHaveAttribute('href', '/harmonydns-web/features');
  });

  it('shows a not-found page for unknown addresses', () => {
    renderApp('/nope');
    expect(pageTitle()).toHaveTextContent('Page not found');
    expect(screen.getByRole('link', { name: 'home page' })).toHaveAttribute('href', '/');
  });

  it('navigates between pages through the menu', async () => {
    const { container } = renderApp('/features');
    const nav = screen.getByRole('navigation', { name: 'Main' });
    await userEvent.click(within(nav).getByRole('link', { name: 'Documentation' }));
    fireEvent.animationEnd(container.querySelector('.page')!);
    expect(pageTitle()).toHaveTextContent('Documentation');
  });

  it('switches between light and dark mode', async () => {
    renderApp('/features');
    const toggle = screen.getByRole('switch', { name: 'Dark mode' });
    expect(document.documentElement.dataset.theme).toBe('light');
    await userEvent.click(toggle);
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(toggle).toHaveAttribute('aria-checked', 'true');
  });
});
