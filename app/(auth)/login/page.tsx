'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { loginAction } from '@/actions/auth/login.action';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await loginAction(formData);
      if (result.success) {
        router.push('/');
        router.refresh();
      } else {
        setError(result.error ?? 'Something went wrong.');
      }
    });
  }

  return (
    <>
      <h1>Sign in</h1>
      {error && <p className="auth-error">{error}</p>}
      <form action={handleSubmit}>
        <label htmlFor="login-email">Email</label>
        <input id="login-email" name="email" type="email" required autoComplete="email" placeholder="e.g. admin@midnight.local" />
        <label htmlFor="login-password">Password</label>
        <input id="login-password" name="password" type="password" required autoComplete="current-password" placeholder="••••••••" minLength={8} />
        <button type="submit" disabled={isPending}>{isPending ? 'Signing in…' : 'Sign in'}</button>
      </form>
      <button type="button" disabled aria-hidden>Continue with Google (coming soon)</button>
      <div className="auth-footer">
        Don&apos;t have an account? <Link href="/register">Register</Link>
      </div>
    </>
  );
}
