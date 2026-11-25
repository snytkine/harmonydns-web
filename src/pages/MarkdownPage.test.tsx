import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { MarkdownPage } from './MarkdownPage';

describe('MarkdownPage', () => {
  it('renders the markdown inside a glass panel', () => {
    render(
      <MemoryRouter>
        <MarkdownPage content={'# Hello\n\nWorld'} />
      </MemoryRouter>,
    );
    const article = screen.getByRole('article');
    expect(article).toHaveClass('glass', 'panel');
    expect(article).toContainElement(screen.getByRole('heading', { name: 'Hello' }));
  });
});
