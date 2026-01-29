import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

const SEED_PASSWORD = 'password123';

async function main() {
  const hashedPassword = await hash(SEED_PASSWORD, 10);

  // ---------- Users (all roles and providers) ----------
  const admin = await prisma.user.upsert({
    where: { email: 'admin@midnight.local' },
    update: {},
    create: {
      email: 'admin@midnight.local',
      name: 'Anna Admin',
      password: hashedPassword,
      role: 'ADMIN',
      provider: 'EMAIL',
      active: true,
    },
  });

  const editor = await prisma.user.upsert({
    where: { email: 'editor@midnight.local' },
    update: {},
    create: {
      email: 'editor@midnight.local',
      name: 'Mark Editor',
      password: hashedPassword,
      role: 'EDITOR',
      provider: 'EMAIL',
      active: true,
    },
  });

  const member1 = await prisma.user.upsert({
    where: { email: 'member@midnight.local' },
    update: {},
    create: {
      email: 'member@midnight.local',
      name: 'John Reader',
      password: hashedPassword,
      role: 'MEMBER',
      provider: 'EMAIL',
      active: true,
    },
  });

  const member2 = await prisma.user.upsert({
    where: { email: 'marina@midnight.local' },
    update: {},
    create: {
      email: 'marina@midnight.local',
      name: 'Marina Subscriber',
      password: hashedPassword,
      role: 'MEMBER',
      provider: 'EMAIL',
      active: true,
    },
  });

  const googleUser = await prisma.user.upsert({
    where: { email: 'google.user@example.com' },
    update: {},
    create: {
      email: 'google.user@example.com',
      name: 'Google User',
      password: null,
      role: 'MEMBER',
      provider: 'GOOGLE',
      providerId: 'google-oauth2-123456',
      active: true,
    },
  });

  console.log('Users created.');

  // ---------- Content: news and blog (longer texts + placeholder images) ----------
  const IMG = (w: number, h: number) => `<figure style="margin: var(--space-md) 0;"><img src="https://picsum.photos/${w}/${h}" alt="Article illustration" style="max-width:100%;height:auto;border-radius:8px;" width="${w}" height="${h}" /></figure>`;

  const newsPublished1 = await prisma.content.upsert({
    where: { slug: 'news-first-published' },
    update: {},
    create: {
      type: 'NEWS',
      title: 'Economic forum: experts predict regional recovery by end of 2025.',
      body:
        IMG(800, 450) +
        '<p>At the traditional Economic Forum held this year in the capital, participants agreed that Western Balkan countries can achieve significant GDP growth if they continue with structural reforms and increased investment in infrastructure and education.</p>' +
        '<p>The head of the Chamber of Commerce stressed that cutting red tape and speeding up digitalisation of public administration are key. "Investors expect predictability and speed. If we deliver that, capital will find its way," he said during the panel on foreign investment.</p>' +
        '<p>The finance minister announced additional support for small and medium-sized enterprises over the coming year, including favourable credit lines and employment subsidies. Details will be published in the implementing legislation by end of quarter.</p>' +
        '<p>The closing remarks focused on the green transition and financing options from EU funds. Many panelists agreed that the green agenda is not only an environmental imperative but also an opportunity for new jobs and technological progress.</p>',
      slug: 'news-first-published',
      status: 'PUBLISHED',
      authorId: editor.id,
      publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
  });

  const newsPublished2 = await prisma.content.upsert({
    where: { slug: 'news-second-published' },
    update: {},
    create: {
      type: 'NEWS',
      title: 'New cultural event "Night of Museums" marks its tenth anniversary.',
      body:
        IMG(800, 400) +
        '<p>The tenth "Night of Museums" this weekend brings together more than fifty institutions across the city. Visitors can tour museums, galleries and studios until midnight with free admission and special programmes.</p>' +
        '<p>Organisers highlight that this year the focus is on interactive content and collaboration with local artists. "We want citizens to experience museums as living spaces, not just repositories of objects," explains the city museum director.</p>' +
        '<p>The programme includes workshops for children, guided tours in several languages, and short performances in the courtyards of historic buildings. Special attention has been paid to accessibility for people with mobility impairments.</p>' +
        '<p>Early booking is recommended for the most visited institutions. A full map and schedule are available on the event\'s official website.</p>',
      slug: 'news-second-published',
      status: 'PUBLISHED',
      authorId: admin.id,
      publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
  });

  const newsDraft = await prisma.content.upsert({
    where: { slug: 'news-draft' },
    update: {},
    create: {
      type: 'NEWS',
      title: 'Story in progress (draft)',
      body:
        'This content is in draft and has not yet been published. The editorial team is preparing interviews and fact-checking. We expect to publish by end of week.' +
        '<p>Additional paragraphs and any illustrations will be added after internal review.</p>',
      slug: 'news-draft',
      status: 'DRAFT',
      authorId: editor.id,
    },
  });

  const newsArchived = await prisma.content.upsert({
    where: { slug: 'news-archived' },
    update: {},
    create: {
      type: 'NEWS',
      title: 'Archived story: Opening of new rail line (historical overview).',
      body:
        IMG(800, 350) +
        '<p>An older story that has been archived. At the time of publication, the new rail line connected the capital with the industrial zone and was expected to shorten passenger travel by about forty minutes.</p>' +
        '<p>The investment was part of a broader regional rail infrastructure project. It remains available for reference in the archive as part of the project documentation.</p>',
      slug: 'news-archived',
      status: 'ARCHIVED',
      authorId: editor.id,
      publishedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    },
  });

  const blogPublished = await prisma.content.upsert({
    where: { slug: 'blog-first-published' },
    update: {},
    create: {
      type: 'BLOG',
      title: 'Why reading news in one place still matters in the age of social media',
      body:
        IMG(800, 450) +
        '<p>At a time when most users get their information through algorithmic feeds and short-form content, traditional news — longer, edited, with context — still has a unique role. This post is a brief look at why a "daily briefing" from a trusted source is worth your time.</p>' +
        '<p>First, an editorial team offers selection and hierarchy. It doesn\'t overwhelm you with hundreds of headlines; it chooses what really matters and explains why. Second, an article has structure: lead, development, conclusion. That helps readers follow the argument and check sources.</p>' +
        '<p>Third, long-form allows nuance. Social media tends toward polarised takes and quick replies. Analysis needs space. Finally, a trusted outlet offers accountability: a byline, a corrections policy, clearly labelled sponsored content.</p>' +
        '<p>None of this is to dismiss social media; it brings speed and variety. But for understanding context and verifying facts, reading news in one place — where news is the main product, not an add-on — remains one of the healthiest habits.</p>',
      slug: 'blog-first-published',
      status: 'PUBLISHED',
      authorId: editor.id,
      publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
  });

  const blogDraft = await prisma.content.upsert({
    where: { slug: 'blog-draft' },
    update: {},
    create: {
      type: 'BLOG',
      title: 'Blog in progress: upcoming post on media literacy',
      body:
        'Draft blog post to be published later. Topic: how to spot misinformation and why media literacy matters for all generations. Interviews with educators and media experts are planned.' +
        '<p>Placeholder for opening paragraph and any illustration (image, infographic).</p>',
      slug: 'blog-draft',
      status: 'DRAFT',
      authorId: admin.id,
    },
  });

  const blogArchived = await prisma.content.upsert({
    where: { slug: 'blog-archived' },
    update: {},
    create: {
      type: 'BLOG',
      title: 'Archived blog: our portal\'s first year — what we learned',
      body:
        IMG(800, 400) +
        '<p>An older blog post moved to the archive. In it we summarised the first year of the portal: which topics got the most engagement, how we changed the format based on reader feedback, and what we plan for the next season.</p>' +
        '<p>Many of those lessons still hold — e.g. working with a limited budget and prioritising quality of writing over clickbait headlines. We keep the archive available for transparency and for anyone doing research.</p>',
      slug: 'blog-archived',
      status: 'ARCHIVED',
      authorId: editor.id,
      publishedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    },
  });

  console.log('Content (news and blog) created.');

  // ---------- Comments (VISIBLE, HIDDEN, DELETED) ----------
  const commentVisible1 = await prisma.comment.create({
    data: {
      body: 'Great piece!',
      contentId: newsPublished1.id,
      authorId: member1.id,
      status: 'VISIBLE',
    },
  });

  const commentVisible2 = await prisma.comment.create({
    data: {
      body: 'I agree, thanks for the coverage.',
      contentId: newsPublished1.id,
      authorId: member2.id,
      status: 'VISIBLE',
    },
  });

  const commentHidden = await prisma.comment.create({
    data: {
      body: 'This comment has been hidden by a moderator.',
      contentId: newsPublished2.id,
      authorId: member1.id,
      status: 'HIDDEN',
    },
  });

  const commentDeleted = await prisma.comment.create({
    data: {
      body: 'Deleted comment – not displayed.',
      contentId: blogPublished.id,
      authorId: member2.id,
      status: 'DELETED',
      deletedAt: new Date(),
    },
  });

  const commentVisibleOnBlog = await prisma.comment.create({
    data: {
      body: 'Really good blog, looking forward to more.',
      contentId: blogPublished.id,
      authorId: member1.id,
      status: 'VISIBLE',
    },
  });

  console.log('Comments created.');

  // ---------- Reports (PENDING, REVIEWED, RESOLVED) ----------
  const reportPending = await prisma.report.create({
    data: {
      commentId: commentVisible2.id,
      reporterId: member2.id,
      reason: 'Suspected spam.',
      status: 'PENDING',
    },
  });

  const reportReviewed = await prisma.report.create({
    data: {
      commentId: commentVisible1.id,
      reporterId: member2.id,
      reason: 'Report reviewed, no violation found.',
      status: 'REVIEWED',
    },
  });

  const reportResolved = await prisma.report.create({
    data: {
      commentId: commentHidden.id,
      reporterId: admin.id,
      reason: 'Inappropriate content – comment hidden.',
      status: 'RESOLVED',
    },
  });

  console.log('Reports created.');

  // ---------- SavedItem (member@midnight.local saves news + blog) ----------
  await prisma.savedItem.upsert({
    where: {
      userId_contentId: { userId: member1.id, contentId: newsPublished1.id },
    },
    update: {},
    create: {
      userId: member1.id,
      contentId: newsPublished1.id,
    },
  });
  await prisma.savedItem.upsert({
    where: {
      userId_contentId: { userId: member1.id, contentId: blogPublished.id },
    },
    update: {},
    create: {
      userId: member1.id,
      contentId: blogPublished.id,
    },
  });
  console.log('SavedItem seed (member) created.');

  // ---------- ModerationLog (various actions and types) ----------
  await prisma.moderationLog.create({
    data: {
      action: 'HIDE_COMMENT',
      targetType: 'COMMENT',
      targetId: commentHidden.id,
      moderatorId: admin.id,
      details: { reason: 'Inappropriate language' },
    },
  });

  await prisma.moderationLog.create({
    data: {
      action: 'DELETE_COMMENT',
      targetType: 'COMMENT',
      targetId: commentDeleted.id,
      moderatorId: editor.id,
      details: { reason: 'User request' },
    },
  });

  await prisma.moderationLog.create({
    data: {
      action: 'PUBLISH_CONTENT',
      targetType: 'CONTENT',
      targetId: newsPublished1.id,
      moderatorId: editor.id,
      details: { slug: newsPublished1.slug },
    },
  });

  await prisma.moderationLog.create({
    data: {
      action: 'ARCHIVE_CONTENT',
      targetType: 'CONTENT',
      targetId: newsArchived.id,
      moderatorId: admin.id,
      details: { slug: newsArchived.slug },
    },
  });

  await prisma.moderationLog.create({
    data: {
      action: 'CHANGE_ROLE',
      targetType: 'USER',
      targetId: editor.id,
      moderatorId: admin.id,
      details: { from: 'MEMBER', to: 'EDITOR' },
    },
  });

  await prisma.moderationLog.create({
    data: {
      action: 'ACTIVATE_USER',
      targetType: 'USER',
      targetId: member1.id,
      moderatorId: admin.id,
      details: {},
    },
  });

  console.log('Moderation log entries created.');
  console.log('\n--- Seed complete. ---');
  console.log('Test accounts (all use password: ' + SEED_PASSWORD + '):');
  console.log('  Admin:  admin@midnight.local');
  console.log('  Editor: editor@midnight.local');
  console.log('  Member: member@midnight.local');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
