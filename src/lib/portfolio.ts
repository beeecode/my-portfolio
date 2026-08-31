import { prisma } from './prisma';

export type PortfolioContent = {
  settings: {
    name: string; role: string; heroDescription: string; aboutHeading: string; aboutAccent: string;
    aboutEyebrow: string; aboutParagraphOne: string; aboutParagraphTwo: string; profileImage: string;
    email: string; linkedInUrl: string; githubUrl: string; contactHeading: string; contactText: string;
  };
  projects: Array<{ id: string; title: string; description: string; image: string; tags: string[]; url: string; sortOrder: number; visible: boolean }>;
  skillGroups: Array<{ id: string; name: string; icon: string; sortOrder: number; skills: Array<{ id: string; name: string; iconClass: string; sortOrder: number }> }>;
  experiences: Array<{ id: string; role: string; company: string; period: string; location: string; points: string[]; sortOrder: number; visible: boolean }>;
};

export const defaultContent: PortfolioContent = {
  settings: {
    name: 'Abdulhameed Sherif', role: 'Full Stack Developer', profileImage: '/Beecode-Dp.jpg',
    heroDescription: 'Full Stack Developer with 2+ years of experience building end-to-end web applications — from pixel-accurate React interfaces to scalable Node.js APIs and database architectures. Specializing in React, Next.js, TypeScript, and Express with a focus on performance and clean code.',
    aboutHeading: 'Logic', aboutAccent: 'Emotion', aboutEyebrow: 'Code Your Reality',
    aboutParagraphOne: "I am Abdulhameed Sherif, a full stack developer based in Nigeria. To me, building software isn't just about what the user sees — it's about the entire system that powers it. Over the last two years, I've worked across the React and Next.js ecosystems on the frontend, and Node.js, Express, and PostgreSQL on the backend, shipping complete, production-ready applications.",
    aboutParagraphTwo: "My approach bridges raw technical architecture with human-centered design. Whether I'm designing REST APIs, modelling database schemas, or crafting fluid 60FPS interfaces, my philosophy stays constant: every layer of the stack should serve the user invisibly.",
    email: 'abdulhameedsherif@gmail.com', linkedInUrl: 'https://linkedin.com/in/abdulhameed-sherif', githubUrl: 'https://github.com/beeecode',
    contactHeading: "Let's Build Together", contactText: "Got a project in mind? I'm always open to collaborating on exciting ideas or discussing new opportunities. Drop me a message and let's create something remarkable.",
  },
  projects: [
    { id: 'project-f1', title: 'F1 | Landing Page', description: 'A modern landing page for Formula 1 enthusiasts, featuring dynamic content and a sleek design.', image: '/img001.png', tags: ['React.js', 'Tailwind CSS', 'UI Design'], url: 'https://formula1-sable.vercel.app/', sortOrder: 0, visible: true },
    { id: 'project-afrostyle', title: 'Afrostyle | Fashion Marketplace', description: 'A comprehensive fashion and tailoring platform in Nigeria. Built secure booking flows, order tracking, and a dedicated tailor dashboard — full-stack implementation.', image: '/img002.png', tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Full-Stack'], url: 'https://afrostyleapp.vercel.app/', sortOrder: 1, visible: true },
    { id: 'project-ghost', title: 'Ghost Mode | OpsDesk Dashboard', description: 'A clean operations dashboard interface featuring project overviews, resource metrics, status tracking, and a structured admin-style layout.', image: '/ghost-mode-psi.png', tags: ['React.js', 'Dashboard UI', 'Data Tables'], url: 'https://ghost-mode-psi.vercel.app/', sortOrder: 2, visible: true },
    { id: 'project-cbt', title: 'Guaranteed CBT | Exam Portal', description: 'A polished CBT access platform with student and admin entry points for live exams, assessment management, and result workflows.', image: '/guranteed-cbt.png', tags: ['React.js', 'Tailwind CSS', 'CBT Platform'], url: 'https://guranteed-cbt.vercel.app/', sortOrder: 3, visible: true },
  ],
  skillGroups: [
    { id: 'skills-frontend', name: 'Frontend', icon: 'code', sortOrder: 0, skills: [['HTML5','devicon-html5-plain colored'],['CSS3','devicon-css3-plain colored'],['JavaScript','devicon-javascript-plain colored'],['TypeScript','devicon-typescript-plain colored']].map((s,i)=>({id:`frontend-${i}`,name:s[0],iconClass:s[1],sortOrder:i})) },
    { id: 'skills-frameworks', name: 'Frameworks', icon: 'layers', sortOrder: 1, skills: [['React.js','devicon-react-original colored'],['Next.js','devicon-nextjs-plain'],['Tailwind CSS','devicon-tailwindcss-original colored'],['Node.js','devicon-nodejs-plain colored']].map((s,i)=>({id:`framework-${i}`,name:s[0],iconClass:s[1],sortOrder:i})) },
    { id: 'skills-backend', name: 'Backend & APIs', icon: 'server', sortOrder: 2, skills: [['Express.js','devicon-express-original'],['REST APIs','devicon-swagger-plain colored'],['PostgreSQL','devicon-postgresql-plain colored'],['Prisma ORM','devicon-prisma-original']].map((s,i)=>({id:`backend-${i}`,name:s[0],iconClass:s[1],sortOrder:i})) },
    { id: 'skills-tools', name: 'Tools & DevOps', icon: 'globe', sortOrder: 3, skills: [['Git & GitHub','devicon-github-original'],['Figma','devicon-figma-plain colored'],['Vercel','devicon-vercel-original'],['VS Code','devicon-vscode-plain colored']].map((s,i)=>({id:`tools-${i}`,name:s[0],iconClass:s[1],sortOrder:i})) },
  ],
  experiences: [
    { id: 'exp-artheistlab', role: 'App Developer', company: 'Artheistlab', period: 'Current', location: 'Nigeria', points: ['Building responsive app interfaces and production-ready features for user-facing digital products.','Implementing reusable components, smooth user flows, and API integrations across the application.','Collaborating on design-to-development handoff, debugging issues, and improving performance and usability.'], sortOrder: 0, visible: true },
    { id: 'exp-sabuguy', role: 'Web Developer', company: 'Sabuguy', period: 'Current', location: 'Nigeria', points: ['Developing responsive web pages and interactive user interfaces for a modern logistics platform.','Connecting frontend experiences with backend APIs to support booking, tracking, and customer workflows.','Improving page performance, accessibility, and cross-device consistency across the web application.'], sortOrder: 1, visible: true },
    { id: 'exp-freelance', role: 'Full Stack Developer', company: 'Freelance / Remote', period: '2025 — Present', location: 'Remote', points: ['Building and maintaining Sabiguy, a live logistics web platform, using React.js, Next.js, and Node.js.','Developed full-stack features including REST APIs, database schemas, and responsive frontend UIs.','Translate Figma mockups into pixel-accurate, cross-browser compatible interfaces with backend integration.','Optimize applications for speed, accessibility, and Core Web Vitals across frontend and backend layers.'], sortOrder: 2, visible: true },
    { id: 'exp-localbuka', role: 'Software Engineer Intern', company: 'LocalBuka', period: '2025 — Present', location: 'Remote', points: ['Built and styled responsive landing pages and admin dashboards using HTML, CSS, and JavaScript.','Identified and fixed UI bugs improving user experience consistency across browsers and devices.','Assisted in improving site load time and overall frontend performance through code optimization and asset compression.'], sortOrder: 3, visible: true },
  ],
};

export async function getPortfolioContent(): Promise<PortfolioContent> {
  if (!process.env.DATABASE_URL) return defaultContent;
  try {
    const [settings, projects, skillGroups, experiences] = await Promise.all([
      prisma.siteSettings.findUnique({ where: { id: 'portfolio' } }),
      prisma.project.findMany({ orderBy: { sortOrder: 'asc' } }),
      prisma.skillGroup.findMany({ orderBy: { sortOrder: 'asc' }, include: { skills: { orderBy: { sortOrder: 'asc' } } } }),
      prisma.experience.findMany({ orderBy: { sortOrder: 'asc' } }),
    ]);
    if (!settings) return defaultContent;
    return { settings, projects, skillGroups, experiences };
  } catch (error) {
    console.error('Portfolio database unavailable; using defaults.', error);
    return defaultContent;
  }
}
