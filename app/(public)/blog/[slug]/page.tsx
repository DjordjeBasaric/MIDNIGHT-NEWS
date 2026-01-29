import Link from 'next/link';
import { auth } from '@/lib/auth';
import { contentService } from '@/services/content/content.service';
import { commentsService } from '@/services/comments/comments.service';
import { savedService } from '@/services/saved/saved.service';
import { ArticleDetail } from '@/components/content/ArticleDetail';
import { CommentList } from '@/components/comments/CommentList';
import { CommentForm } from '@/components/comments/CommentForm';
import { SaveButton } from '@/components/content/SaveButton';

function canEditContent(role: string | undefined): boolean {
  return role === 'EDITOR' || role === 'ADMIN';
}

type PageProps = { params: Promise<{ slug: string }> | { slug: string } };

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = 'then' in params ? await params : params;
  const content = await contentService.getContentBySlug(slug);

  if (!content) {
    return (
      <div className="empty-state">
        <h1>Blog post not found</h1>
        <p>The requested blog post does not exist or has not been published.</p>
        <Link href="/blog" className="btn btn-outline">← Back to blog</Link>
      </div>
    );
  }

  const [comments, session] = await Promise.all([
    commentsService.getCommentsByContentId(content.id),
    auth(),
  ]);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  let isSaved = false;
  if (userId && content.status === 'PUBLISHED') {
    try {
      isSaved = await savedService.isSaved(userId, content.id);
    } catch {
      isSaved = false;
    }
  }

  const role = (session?.user as { role?: string })?.role;
  const showEdit = canEditContent(role);

  return (
    <>
      <ArticleDetail
        title={content.title}
        body={content.body}
        category="Blog"
        authorName={content.author?.name ?? content.author?.email ?? 'Editorial'}
        publishedAt={content.publishedAt?.toISOString() ?? null}
        imageUrl={content.imageUrl}
      />

      {showEdit && (
        <p style={{ marginTop: 'var(--space-sm)' }}>
          <Link href={`/admin/content/${content.id}`} className="btn btn-outline">
            Edit post
          </Link>
        </p>
      )}

      {userId && content.status === 'PUBLISHED' && (
        <SaveButton contentId={content.id} initialSaved={isSaved} />
      )}

      <section className="comments-section">
        <CommentList
          comments={comments.map((c) => ({
            id: c.id,
            body: c.body,
            authorName: c.author?.name ?? c.author?.email ?? 'Anonymous',
            createdAt: c.createdAt.toISOString(),
          }))}
          canModerate={canEditContent(role)}
          returnTo={`/blog/${slug}`}
        />

        {session ? (
          <CommentForm contentId={content.id} />
        ) : (
          <div className="comment-form" style={{ textAlign: 'center' }}>
            <p style={{ margin: 0 }}>
              <Link href="/login" style={{ fontWeight: 600 }}>Sign in</Link> to leave a comment.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
