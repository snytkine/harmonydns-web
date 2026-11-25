import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { Header } from './Header';

function renderHeader(path = '/', onToggleTheme = vi.fn()) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <Header theme="light" onToggleTheme={onToggleTheme} />
    </MemoryRouter>,
  );
  return onToggleTheme;
}

describe('Header', () => {
  it('shows the project name with its logo, linking home', () => {
    renderHeader();
    const brand = screen.getByRole('link', { name: 'Harmony DNS' });
    expect(brand).toHaveAttribute('href', '/');
    expect(brand.querySelector('img')).toHaveAttribute('alt', '');
  });

  it('lists the five navigation items in order, each with an icon', () => {
    renderHeader();
    const links = within(screen.getByRole('navigation', { name: 'Main' })).getAllByRole('link');
    expect(links.map((link) => link.textContent)).toEqual([
      'Home',
      'Features',
      'Documentation',
      'Support',
      'Privacy policy',
    ]);
    for (const link of links) expect(link.querySelector('.glass-icon')).not.toBeNull();
  });

  it('offers a short label for long items without changing their text', () => {
    renderHeader();
    const nav = screen.getByRole('navigation', { name: 'Main' });
    expect(within(nav).getByText('Documentation')).toHaveAttribute('data-short', 'Docs');
    expect(within(nav).getByText('Privacy policy')).toHaveAttribute('data-short', 'Privacy');
    expect(within(nav).getByText('Home')).not.toHaveAttribute('data-short');
  });

  it('marks only the current page as active', () => {
    renderHeader('/support');
    expect(screen.getByRole('link', { name: 'Support' })).toHaveClass('active');
    expect(screen.getByRole('link', { name: 'Home' })).not.toHaveClass('active');
  });

  it('passes theme toggling through', async () => {
    const onToggleTheme = renderHeader();
    await userEvent.click(screen.getByRole('switch', { name: 'Dark mode' }));
    expect(onToggleTheme).toHaveBeenCalledOnce();
  });
});
