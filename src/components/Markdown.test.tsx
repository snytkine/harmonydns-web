import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { screenshots } from '../config/screenshots';
import { Markdown } from './Markdown';

function renderMarkdown(content: string) {
  return render(
    <MemoryRouter>
      <Markdown content={content} />
    </MemoryRouter>,
  );
}

describe('Markdown', () => {
  it('renders headings and paragraphs', () => {
    renderMarkdown('# Title\n\nSome **bold** text.');
    expect(screen.getByRole('heading', { level: 1, name: 'Title' })).toBeInTheDocument();
    expect(screen.getByText('bold').tagName).toBe('STRONG');
    expect(screen.getByText(/Some/).tagName).toBe('P');
  });

  it('turns links starting with "/" into in-app links', () => {
    renderMarkdown('See [Support](/support).');
    const link = screen.getByRole('link', { name: 'Support' });
    expect(link).toHaveAttribute('href', '/support');
    expect(link).not.toHaveAttribute('target');
  });

  it('opens external links in a new tab safely', () => {
    renderMarkdown('Visit [Example](https://example.com).');
    const link = screen.getByRole('link', { name: 'Example' });
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer noopener');
  });

  it('still blocks unsafe link schemes', () => {
    renderMarkdown('[bad](javascript:alert(1))');
    expect(screen.getByText('bad')).not.toHaveAttribute('href', expect.stringContaining('javascript'));
  });

  it('wraps tables so they can scroll on narrow screens', () => {
    renderMarkdown('| A | B |\n| --- | --- |\n| 1 | 2 |');
    expect(screen.getByRole('table').parentElement).toHaveClass('table-scroll');
  });

  it('shows screenshot images as enlargeable thumbnails, side by side', () => {
    const { container } = renderMarkdown('![The logs](screenshot:logs) ![The zones](screenshot:zones)');
    expect(screen.getByRole('button', { name: 'The logs' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'The zones' })).toHaveAttribute('src', screenshots.zones.thumb);
    expect(container.querySelector('.screenshots')?.childElementCount).toBe(2);
    expect(container.querySelector('p')).toBeNull();
  });

  it('keeps a paragraph that mixes text and images', () => {
    const { container } = renderMarkdown('Look: ![The logs](screenshot:logs)');
    expect(container.querySelector('p')).toHaveTextContent('Look:');
    expect(container.querySelector('.screenshots')).toBeNull();
  });

  it('shows other images as plain images', () => {
    renderMarkdown('![A chart](https://example.com/chart.png)\n\n![Missing](screenshot:nope)');
    expect(screen.getByRole('img', { name: 'A chart' })).toHaveAttribute('src', 'https://example.com/chart.png');
    expect(screen.getByRole('img', { name: 'Missing' })).not.toHaveAttribute('src', expect.stringContaining('.png'));
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
