import { NextResponse } from 'next/server';
import { adminService } from '@/services/admin/admin.service';
import { rateLimit } from '@/utils/rate-limit';

export async function GET(_: Request, context: { params: { id: string } }) {
  if (!rateLimit()) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }
  const user = await adminService.getUser(context.params.id);
  return NextResponse.json({ user });
}
