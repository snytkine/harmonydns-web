import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ImageModal } from './ImageModal';

function renderModal() {
  const onClose = vi.fn();
  const result = render(<ImageModal src="/big.png" alt="A big picture" onClose={onClose} />);
  return { onClose, ...result };
}

describe('ImageModal', () => {
  it('opens a modal dialog with the large image and its caption', () => {
    renderModal();
    const dialog = screen.getByRole('dialog', { name: 'A big picture' });
    expect(dialog).toHaveAttribute('open');
    expect(screen.getByRole('img', { name: 'A big picture' })).toHaveAttribute('src', '/big.png');
    expect(dialog).toHaveTextContent('A big picture');
  });

  it('is rendered outside the surrounding markup', () => {
    const { container } = renderModal();
    expect(container).toBeEmptyDOMElement();
    expect(document.body.querySelector('dialog')).not.toBeNull();
  });

  it('closes with the close button', async () => {
    const { onClose } = renderModal();
    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalled();
  });

  it('closes when the image is clicked', async () => {
    const { onClose } = renderModal();
    await userEvent.click(screen.getByRole('img'));
    expect(onClose).toHaveBeenCalled();
  });

  it('reports a close made by the browser, such as Escape', () => {
    const { onClose } = renderModal();
    const dialog = screen.getByRole('dialog');
    dialog.removeAttribute('open');
    fireEvent(dialog, new Event('close'));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('ignores a late close event that arrives after the dialog was opened again', () => {
    const { onClose } = renderModal();
    fireEvent(screen.getByRole('dialog'), new Event('close'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('closes the dialog when removed', () => {
    const { unmount } = renderModal();
    const dialog = screen.getByRole('dialog');
    const close = vi.spyOn(dialog as HTMLDialogElement, 'close');
    unmount();
    expect(close).toHaveBeenCalledOnce();
  });
});
