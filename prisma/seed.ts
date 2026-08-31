import { PrismaClient } from '@prisma/client';
import { defaultContent } from '../src/lib/portfolio';

const prisma = new PrismaClient();

async function main() {
  await prisma.siteSettings.upsert({ where: { id: 'portfolio' }, update: defaultContent.settings, create: { id: 'portfolio', ...defaultContent.settings } });
  if (await prisma.project.count() === 0) await prisma.project.createMany({ data: defaultContent.projects.map(({ id: _id, ...project }) => project) });
  if (await prisma.experience.count() === 0) await prisma.experience.createMany({ data: defaultContent.experiences.map(({ id: _id, ...experience }) => experience) });
  if (await prisma.skillGroup.count() === 0) {
    for (const group of defaultContent.skillGroups) {
      await prisma.skillGroup.create({ data: { name: group.name, icon: group.icon, sortOrder: group.sortOrder, skills: { create: group.skills.map(({ id: _id, ...skill }) => skill) } } });
    }
  }
}

main().finally(() => prisma.$disconnect());
