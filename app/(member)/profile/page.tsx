import { auth } from '@/lib/auth';
import { profileService } from '@/services/profile/profile.service';
import { savedService } from '@/services/saved/saved.service';
import { ProfileForm } from '@/components/profile/ProfileForm';
import { CommentsHistory } from '@/components/profile/CommentsHistory';
import { SavedList } from '@/components/profile/SavedList';

type SearchParams = { commentsPage?: string; savedPage?: string };
type ProfilePageProps = {
  searchParams?: Promise<SearchParams> | SearchParams;
};

export default async function ProfilePage({ searchParams: rawSearchParams }: ProfilePageProps) {
  const session = await auth();
  if (!session?.user) {
    return (
      <div className="profile-page">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  const user = session.user as { id?: string; name?: string | null; email?: string | null };
  const name = user.name ?? null;
  const email = user.email ?? '';
  const userId = user.id;
  if (!userId) {
    return (
      <div className="profile-page">
        <p>Unable to load profile.</p>
      </div>
    );
  }

  const searchParams = rawSearchParams && 'then' in rawSearchParams
    ? await rawSearchParams
    : rawSearchParams ?? {};
  const commentsPage = Math.max(1, parseInt(String(searchParams?.commentsPage ?? '1'), 10) || 1);
  const savedPage = Math.max(1, parseInt(String(searchParams?.savedPage ?? '1'), 10) || 1);

  let comments = { items: [] as Awaited<ReturnType<typeof profileService.getCommentsByUserId>>['items'], total: 0, page: 1, pageSize: 15 };
  let saved = { items: [] as Awaited<ReturnType<typeof savedService.listSaved>>['items'], total: 0, page: 1, pageSize: 15 };

  try {
    const [commentsRes, savedRes] = await Promise.all([
      profileService.getCommentsByUserId(userId, { page: commentsPage, pageSize: 15 }),
      savedService.listSaved(userId, { page: savedPage, pageSize: 15 }),
    ]);
    comments = commentsRes;
    saved = savedRes;
  } catch {
    comments = { ...comments, page: commentsPage };
    saved = { ...saved, page: savedPage };
  }

  return (
    <div className="profile-page">
      <section className="profile-section" aria-labelledby="profile-heading">
        <h1 id="profile-heading">Profile</h1>
        <ProfileForm initialName={name} initialEmail={email} />
      </section>
      <section className="profile-section" aria-labelledby="comments-heading">
        <h2 id="comments-heading">My comments</h2>
        <CommentsHistory
          items={comments.items}
          total={comments.total}
          page={comments.page}
          pageSize={comments.pageSize}
          savedPage={savedPage}
        />
      </section>
      <section className="profile-section" aria-labelledby="saved-heading">
        <h2 id="saved-heading">Saved</h2>
        <SavedList
          items={saved.items}
          total={saved.total}
          page={saved.page}
          pageSize={saved.pageSize}
          commentsPage={commentsPage}
        />
      </section>
    </div>
  );
}
