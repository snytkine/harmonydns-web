import { Markdown } from '../components/Markdown';

interface MarkdownPageProps {
  readonly content: string;
}

export function MarkdownPage({ content }: MarkdownPageProps) {
  return (
    <article className="glass panel prose">
      <Markdown content={content} />
    </article>
  );
}
