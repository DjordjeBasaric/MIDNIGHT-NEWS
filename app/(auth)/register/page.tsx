import Link from 'next/link';
import { registerAction } from '@/actions/auth/register.action';

export default function RegisterPage() {
  return (
    <>
      <h1>Register</h1>
      <form action={registerAction}>
        <label htmlFor="reg-email">Email</label>
        <input id="reg-email" name="email" type="email" required autoComplete="email" placeholder="email@example.com" />
        <label htmlFor="reg-name">Name (optional)</label>
        <input id="reg-name" name="name" type="text" autoComplete="name" placeholder="Your name" />
        <label htmlFor="reg-password">Password (min. 8 characters)</label>
        <input id="reg-password" name="password" type="password" required autoComplete="new-password" placeholder="••••••••" minLength={8} />
        <button type="submit">Create account</button>
      </form>
      <div className="auth-footer">
        Already have an account? <Link href="/login">Sign in</Link>
        <p className="auth-footer__back">
          <Link href="/">← Back to home</Link>
        </p>
      </div>
    </>
  );
}
