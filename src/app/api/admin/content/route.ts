import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getPortfolioContent, type PortfolioContent } from '@/lib/portfolio';

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  return NextResponse.json(await getPortfolioContent());
}

function valid(content: PortfolioContent) {
  const settings = content?.settings;
  return Boolean(settings?.name?.trim() && settings?.role?.trim() && settings?.email?.trim()
    && Array.isArray(content.projects) && Array.isArray(content.skillGroups) && Array.isArray(content.experiences));
}

export async function PUT(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  const content = await request.json().catch(() => null) as PortfolioContent | null;
  if (!content || !valid(content)) return NextResponse.json({ error: 'Please complete all required profile fields.' }, { status: 400 });

  try {
    await prisma.$transaction(async (tx) => {
      await tx.siteSettings.upsert({
        where: { id: 'portfolio' },
        update: content.settings,
        create: { id: 'portfolio', ...content.settings },
      });
      await tx.project.deleteMany();
      await tx.experience.deleteMany();
      await tx.skillGroup.deleteMany();
      if (content.projects.length) await tx.project.createMany({ data: content.projects.map(({ id: _id, ...item }, index) => ({ ...item, sortOrder: index })) });
      if (content.experiences.length) await tx.experience.createMany({ data: content.experiences.map(({ id: _id, ...item }, index) => ({ ...item, sortOrder: index })) });
      for (const [index, group] of content.skillGroups.entries()) {
        await tx.skillGroup.create({ data: {
          name: group.name, icon: group.icon, sortOrder: index,
          skills: { create: group.skills.map(({ id: _id, ...skill }, skillIndex) => ({ ...skill, sortOrder: skillIndex })) },
        } });
      }
    });
    return NextResponse.json({ success: true, content: await getPortfolioContent() });
  } catch (error) {
    console.error('Unable to save portfolio content.', error);
    return NextResponse.json(
      { error: 'The database is unavailable. Check DATABASE_URL and initialize PostgreSQL before saving.' },
      { status: 503 },
    );
  }
}
