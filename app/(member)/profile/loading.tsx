export default function ProfileLoading() {
  return (
    <div className="profile-page">
      <section className="profile-section" aria-label="Profile loading">
        <h1>Profile</h1>
        <div className="profile-skeleton" style={{ minHeight: 200 }} />
      </section>
      <section className="profile-section" aria-label="Comments loading">
        <h2>My comments</h2>
        <div className="profile-skeleton" style={{ minHeight: 120 }} />
      </section>
      <section className="profile-section" aria-label="Saved loading">
        <h2>Saved</h2>
        <div className="profile-skeleton" style={{ minHeight: 120 }} />
      </section>
    </div>
  );
}
