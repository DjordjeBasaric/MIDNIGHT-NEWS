import Link from 'next/link';
import Image from 'next/image';
import { auth } from '@/lib/auth';

function formatDate() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function SiteHeader() {
  const session = await auth();

  return (
    <header className="site-header">
      <div className="header-top">
        <span className="header-date">{formatDate()}</span>
        <div className="header-auth">
          {session ? (
            <>
              {(() => {
                const role = (session.user as { role?: string })?.role;
                return role === 'ADMIN' || role === 'EDITOR';
              })() && (
                <>
                  <Link href="/admin-dashboard">Dashboard</Link>
                  <span>·</span>
                </>
              )}
              <Link href="/profile">My profile</Link>
              <span>·</span>
              <Link href="/api/auth/signout">Sign out</Link>
            </>
          ) : (
            <>
              <Link href="/login">Sign in</Link>
              <span>·</span>
              <Link href="/register">Register</Link>
            </>
          )}
        </div>
      </div>

      <div className="masthead">
        <Link href="/" className="masthead-logo-link">
          <Image
            src="/midnight-symbol.svg"
            alt="Midnight Network Logo"
            width={70}
            height={70}
            className="masthead-logo"
            priority
          />
        </Link>
        <h1 className="masthead-title">
          <Link href="/">Midnight News</Link>
        </h1>
        <p className="masthead-tagline">Powered by Midnight Network</p>
      </div>

      <nav className="main-nav">
        <Link href="/">Home</Link>
        <Link href="/news">News</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/chart">Chart</Link>
      </nav>
    </header>
  );
}
