import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Link, MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { PageTransition } from './PageTransition';

function renderTransition() {
  render(
    <MemoryRouter initialEntries={['/one']}>
      <Link to="/two">go</Link>
      <PageTransition>{(location) => <p data-testid="content">{location.pathname}</p>}</PageTransition>
    </MemoryRouter>,
  );
  const content = () => screen.getByTestId('content');
  const page = () => content().parentElement!;
  return { content, page };
}

describe('PageTransition', () => {
  it('shows the current page with the enter animation', () => {
    const { content, page } = renderTransition();
    expect(content()).toHaveTextContent('/one');
    expect(page()).toHaveClass('page--enter');
  });

  it('keeps the old page on screen while it animates out', async () => {
    const { content, page } = renderTransition();
    await userEvent.click(screen.getByRole('link', { name: 'go' }));
    expect(page()).toHaveClass('page--exit');
    expect(content()).toHaveTextContent('/one');
  });

  it('swaps in the new page and scrolls to the top when the exit animation ends', async () => {
    const { content, page } = renderTransition();
    await userEvent.click(screen.getByRole('link', { name: 'go' }));
    fireEvent.animationEnd(page());
    expect(content()).toHaveTextContent('/two');
    expect(page()).toHaveClass('page--enter');
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('ignores animations that end inside the page', async () => {
    const { content, page } = renderTransition();
    await userEvent.click(screen.getByRole('link', { name: 'go' }));
    fireEvent.animationEnd(content());
    expect(content()).toHaveTextContent('/one');
    expect(page()).toHaveClass('page--exit');
  });

  it('does nothing when the enter animation ends', () => {
    const { content, page } = renderTransition();
    fireEvent.animationEnd(page());
    expect(content()).toHaveTextContent('/one');
    expect(window.scrollTo).not.toHaveBeenCalled();
  });
});
