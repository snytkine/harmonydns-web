import { useState } from 'react';
import type { ScreenshotImage } from '../config/screenshots';
import { ImageModal } from './ImageModal';

interface ScreenshotProps {
  readonly image: ScreenshotImage;
  readonly alt: string;
}

/** A small app screenshot that opens a larger version in a modal when clicked. */
export function Screenshot({ image, alt }: ScreenshotProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="screenshot"
        title="Click to enlarge"
        onClick={() => {
          setOpen(true);
        }}
      >
        <img className="screenshot__image" src={image.thumb} alt={alt} loading="lazy" decoding="async" />
        <span className="screenshot__zoom" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <circle cx="10.5" cy="10.5" r="6" />
            <path d="M15 15l4.5 4.5M10.5 8v5M8 10.5h5" />
          </svg>
        </span>
      </button>
      {open && (
        <ImageModal
          src={image.full}
          alt={alt}
          onClose={() => {
            setOpen(false);
          }}
        />
      )}
    </>
  );
}
