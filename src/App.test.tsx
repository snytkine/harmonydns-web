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

  it('has a privacy policy with what the App Store requires of a VPN app', () => {
    renderApp('/privacy');
    const policy = screen.getByRole('main');
    const section = (name: string) => within(policy).getByRole('heading', { level: 2, name });

    // Guideline 5.4: VPN apps must commit not to sell, use or disclose data to third parties.
    expect(section('Our commitment')).toBeInTheDocument();
    expect(policy).toHaveTextContent(/do not sell, use or disclose to third parties any data, for any purpose/);
    // Guideline 5.1.1(i): what is kept, why and for how long, including the install record.
    expect(section('Data the app keeps on your Mac')).toBeInTheDocument();
    expect(within(policy).getByRole('table')).toHaveTextContent(/Install record/);
    // Guideline 5.1.1(i): what is sent to third parties, and how to withdraw consent and delete data.
    expect(section('How DNS queries are answered')).toBeInTheDocument();
    expect(section('Withdrawing consent and deleting your data')).toBeInTheDocument();
    expect(policy).toHaveTextContent(/System Settings → VPN/);
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
