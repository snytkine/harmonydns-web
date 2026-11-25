import type { Element } from 'hast';
import ReactMarkdown, { defaultUrlTransform, type Components } from 'react-markdown';
import { Link } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import { findScreenshot, SCREENSHOT_SCHEME } from '../config/screenshots';
import { Screenshot } from './Screenshot';

/** True when a paragraph holds nothing but images, such as a row of screenshots. */
function isImageRow(node: Element | undefined): boolean {
  const children = node?.children ?? [];
  const images = children.filter((child) => child.type === 'element' && child.tagName === 'img');
  const rest = children.filter((child) => !images.includes(child));
  return images.length > 0 && rest.every((child) => child.type === 'text' && child.value.trim() === '');
}

const components: Components = {
  // Links that start with "/" are pages of this site; everything else is external.
  a({ href, children }) {
    if (href?.startsWith('/')) return <Link to={href}>{children}</Link>;
    return (
      <a href={href} target="_blank" rel="noreferrer noopener">
        {children}
      </a>
    );
  },
  img({ src, alt = '' }) {
    const source = typeof src === 'string' ? src : undefined;
    const screenshot = findScreenshot(source);
    if (screenshot) return <Screenshot image={screenshot} alt={alt} />;
    return <img src={source} alt={alt} loading="lazy" />;
  },
  p({ node, children }) {
    if (isImageRow(node)) return <div className="screenshots">{children}</div>;
    return <p>{children}</p>;
  },
  table({ children }) {
    return (
      <div className="table-scroll">
        <table>{children}</table>
      </div>
    );
  },
};

// The default transform drops unknown URL schemes, which would remove `screenshot:` image sources.
function urlTransform(url: string): string {
  return url.startsWith(SCREENSHOT_SCHEME) ? url : defaultUrlTransform(url);
}

interface MarkdownProps {
  readonly content: string;
}

export function Markdown({ content }: MarkdownProps) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components} urlTransform={urlTransform}>
      {content}
    </ReactMarkdown>
  );
}
