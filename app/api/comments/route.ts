import { NextResponse } from 'next/server';
import { commentsService } from '@/services/comments/comments.service';
import { rateLimit } from '@/utils/rate-limit';

export async function GET(request: Request) {
  if (!rateLimit()) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }
  const { searchParams } = new URL(request.url);
  const contentId = searchParams.get('contentId');
  if (!contentId) {
    return NextResponse.json({ error: 'contentId is required' }, { status: 400 });
  }

  const comments = await commentsService.getCommentsByContentId(contentId);
  return NextResponse.json({ comments, total: comments.length });
}
