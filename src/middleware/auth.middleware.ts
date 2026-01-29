import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function getRoleFromRequest(request: NextRequest) {
  const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req: request, secret });
  return (token?.role as string | undefined) ?? null;
}
