import { sanitizeHtml } from '@/utils/sanitization';

type ArticleDetailProps = {
  title: string;
  body: string;
  category?: string;
  authorName?: string | null;
  publishedAt?: string | null;
  imageUrl?: string | null;
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function ArticleDetail({ title, body, category = 'News', authorName, publishedAt, imageUrl }: ArticleDetailProps) {
  const safeBody = sanitizeHtml(body);

  return (
    <article>
      {imageUrl && (
        <div className="article-cover">
          <img src={imageUrl} alt="" className="article-cover-img" />
        </div>
      )}

      {/* Article Header */}
      <header className="article-header">
        <span className="article-category">{category}</span>
        <h1 className="article-title">{title}</h1>
        <div className="article-byline">
          <span className="author">{authorName ?? 'Editorial'}</span>
          {publishedAt && (
            <>
              <span className="divider">|</span>
              <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
            </>
          )}
        </div>
      </header>

      {/* Article Body */}
      <div className="article-body">
        <div
          className="article-body-content"
          dangerouslySetInnerHTML={{ __html: safeBody }}
        />
      </div>
    </article>
  );
}
