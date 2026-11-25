import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { IconName } from '../config/site';
import { GlassIcon } from './GlassIcon';

const names: IconName[] = ['home', 'features', 'documentation', 'support', 'privacy', 'how-it-works', 'app-store'];

describe('GlassIcon', () => {
  it.each(names)('renders a decorative "%s" icon', (name) => {
    const { container } = render(<GlassIcon name={name} />);
    const icon = container.firstElementChild;
    expect(icon).toHaveClass('glass-icon', `glass-icon--${name}`, 'glass-icon--regular');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
    expect(icon?.querySelector('svg')?.childElementCount).toBeGreaterThan(0);
  });

  it('supports the large size', () => {
    const { container } = render(<GlassIcon name="home" size="large" />);
    expect(container.firstElementChild).toHaveClass('glass-icon--large');
  });
});
