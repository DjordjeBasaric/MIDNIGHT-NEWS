import Link from 'next/link';
import { AdminContentForm } from '@/components/admin/AdminContentForm';

type SearchParams = { view?: string };

type PageProps = {
  searchParams?: SearchParams | Promise<SearchParams>;
};

export default async function AdminDashboardPage({ searchParams }: PageProps) {
  const resolved =
    searchParams && 'then' in searchParams ? await searchParams : searchParams ?? {};
  const view = resolved.view === 'blog' ? 'BLOG' : 'NEWS';

  return (
    <section className="admin-dashboard">
      <header className="admin-dashboard-header">
        <h1>Admin dashboard</h1>
        <p>Create and schedule newsroom content.</p>
        <div className="admin-dashboard-header-actions">
          <Link
            href="/admin-dashboard?view=news"
            className={
              view === 'NEWS' ? 'admin-header-link is-active' : 'admin-header-link'
            }
          >
            Create news article
          </Link>
          <Link
            href="/admin-dashboard?view=blog"
            className={
              view === 'BLOG' ? 'admin-header-link is-active' : 'admin-header-link'
            }
          >
            Create blog post
          </Link>
        </div>
      </header>

      <div className="admin-dashboard-main">
        {view === 'NEWS' ? (
          <section aria-label="Create news article">
            <AdminContentForm contentType="NEWS" />
          </section>
        ) : (
          <section aria-label="Create blog post">
            <AdminContentForm contentType="BLOG" />
          </section>
        )}
      </div>
    </section>
  );
}

