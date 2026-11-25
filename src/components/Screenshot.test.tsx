import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StrictMode } from 'react';
import { describe, expect, it } from 'vitest';
import { Screenshot } from './Screenshot';

const image = { thumb: '/small.png', full: '/large.png' };

describe('Screenshot', () => {
  it('shows the small image as a button that enlarges it', () => {
    render(<Screenshot image={image} alt="The logs view" />);
    const button = screen.getByRole('button', { name: 'The logs view' });
    expect(button).toHaveAttribute('title', 'Click to enlarge');
    expect(screen.getByRole('img', { name: 'The logs view' })).toHaveAttribute('src', '/small.png');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens the large image in a modal when clicked, and closes it again', async () => {
    render(<Screenshot image={image} alt="The logs view" />);
    await userEvent.click(screen.getByRole('button', { name: 'The logs view' }));

    const dialog = screen.getByRole('dialog', { name: 'The logs view' });
    expect(dialog.querySelector('img')).toHaveAttribute('src', '/large.png');

    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('stays open in StrictMode, where React mounts effects twice in development', async () => {
    render(
      <StrictMode>
        <Screenshot image={image} alt="The logs view" />
      </StrictMode>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'The logs view' }));
    // Let the "close" event queued by StrictMode's unmount arrive, as it would in a browser.
    await act(() => new Promise((resolve) => setTimeout(resolve, 10)));
    expect(screen.getByRole('dialog', { name: 'The logs view' })).toHaveAttribute('open');
  });
});
