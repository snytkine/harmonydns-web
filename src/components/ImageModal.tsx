import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface ImageModalProps {
  readonly src: string;
  readonly alt: string;
  readonly onClose: () => void;
}

/**
 * Shows an image large in a native modal dialog, which traps focus and closes on Escape for free.
 * It is portaled to <body> so it can be opened from inside a paragraph and escapes the page's
 * transformed, animated containers, which would otherwise clip a fixed-position element.
 */
export function ImageModal({ src, alt, onClose }: ImageModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    // Browsers fire "close" in a later task. In development StrictMode closes and reopens the dialog
    // straight away, so that close event arrives while the dialog is open again and must be ignored.
    const handleClose = () => {
      if (!dialog.open) onClose();
    };
    dialog.addEventListener('close', handleClose);
    if (!dialog.open) dialog.showModal();
    return () => {
      dialog.removeEventListener('close', handleClose);
      if (dialog.open) dialog.close();
    };
  }, [onClose]);

  return createPortal(
    // Any click closes the zoomed image, the way Quick Look does; Escape and the close button work too.
    <dialog ref={ref} className="lightbox" aria-label={alt} onClick={onClose}>
      <figure className="lightbox__figure">
        <img className="lightbox__image" src={src} alt={alt} />
        <figcaption className="lightbox__caption">{alt}</figcaption>
      </figure>
      <button type="button" className="lightbox__close" aria-label="Close">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>
    </dialog>,
    document.body,
  );
}
