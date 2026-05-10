import { Code2, Layers, Palette, Database, Server, Globe, Briefcase, Calendar, MapPin, Linkedin, Github, Mail, User, Send } from 'lucide-react';

export const NAV_LINKS = [
  { label: 'About', href: '#about', icon: User },
  { label: 'Projects', href: '#projects', icon: Briefcase },
  { label: 'Skills', href: '#skills', icon: Code2 },
  { label: 'Experience', href: '#experience', icon: Calendar },
  { label: 'Contact', href: '#contact', icon: Send },
];

export type ProjectType = { id: string; title: string; desc: string; image: string; tags: string[]; link: string; };

export const PROJECTS: ProjectType[] = [
  {
    id: '01',
    title: 'F1 | Landing Page',
    desc: 'A modern landing page for Formula 1 enthusiasts, featuring dynamic content and a sleek design.',
    image: '/img001.png',
    tags: ['React.js', 'Tailwind CSS', 'UI Design'],
    link: 'https://formula1-sable.vercel.app/',
  },
  {
    id: '02',
    title: 'Afrostyle | Fashion Marketplace',
    desc: 'A comprehensive fashion and tailoring platform in Nigeria. Built secure booking flows, order tracking, and a dedicated tailor dashboard — full-stack implementation.',
    image: '/img002.png',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Full-Stack'],
    link: 'https://afrostyleapp.vercel.app/',
  },
  {
    id: '03',
    title: 'SkyCast | Weather Dashboard',
    desc: 'A dynamic weather dashboard providing live meteorological data, complete with city search, unit toggles, and a custom animated UI. Built with Vanilla JS and OpenWeatherMap API.',
    image: '/img003.png',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'REST API'],
    link: 'https://autoflow-fk64.vercel.app/',
  },
  {
    id: '04',
    title: 'AuthFlow | Authentication UI',
    desc: 'A seamless authentication flow featuring refined login and registration pages, robust form validation, and a clean, accessible user interface built for modern web applications.',
    image: '/img004.png',
    tags: ['React.js', 'Tailwind CSS', 'Auth UI'],
    link: 'https://autoflow-lime.vercel.app/',
  }
];

export const SKILLS = [
  {
    category: 'Frontend',
    icon: Code2,
    items: [
      { name: 'HTML5', iconClass: 'devicon-html5-plain colored' },
      { name: 'CSS3', iconClass: 'devicon-css3-plain colored' },
      { name: 'JavaScript', iconClass: 'devicon-javascript-plain colored' },
      { name: 'TypeScript', iconClass: 'devicon-typescript-plain colored' },
    ],
  },
  {
    category: 'Frameworks',
    icon: Layers,
    items: [
      { name: 'React.js', iconClass: 'devicon-react-original colored' },
      { name: 'Next.js', iconClass: 'devicon-nextjs-plain' },
      { name: 'Tailwind CSS', iconClass: 'devicon-tailwindcss-original colored' },
      { name: 'Node.js', iconClass: 'devicon-nodejs-plain colored' },
    ],
  },
  {
    category: 'Backend & APIs',
    icon: Server,
    items: [
      { name: 'Express.js', iconClass: 'devicon-express-original' },
      { name: 'REST APIs', iconClass: 'devicon-swagger-plain colored' },
      { name: 'PostgreSQL', iconClass: 'devicon-postgresql-plain colored' },
      { name: 'Prisma ORM', iconClass: 'devicon-prisma-original' },
    ],
  },
  {
    category: 'Tools & DevOps',
    icon: Globe,
    items: [
      { name: 'Git & GitHub', iconClass: 'devicon-github-original' },
      { name: 'Figma', iconClass: 'devicon-figma-plain colored' },
      { name: 'Vercel', iconClass: 'devicon-vercel-original' },
      { name: 'VS Code', iconClass: 'devicon-vscode-plain colored' },
    ],
  },
];

export const EXPERIENCE = [
  {
    role: 'Full Stack Developer',
    company: 'Freelance / Remote',
    period: '2025 — Present',
    location: 'Remote',
    points: [
      'Building and maintaining Sabiguy, a live logistics web platform, using React.js, Next.js, and Node.js.',
      'Developed full-stack features including REST APIs, database schemas, and responsive frontend UIs.',
      'Translate Figma mockups into pixel-accurate, cross-browser compatible interfaces with backend integration.',
      'Optimize applications for speed, accessibility, and Core Web Vitals across frontend and backend layers.',
    ],
  },
  {
    role: 'Software Engineer Intern',
    company: 'LocalBuka',
    period: '2025 — Present',
    location: 'Remote',
    points: [
      'Built and styled responsive landing pages and admin dashboards using HTML, CSS, and JavaScript.',
      'Identified and fixed UI bugs improving user experience consistency across browsers and devices.',
      'Assisted in improving site load time and overall frontend performance through code optimization and asset compression.',
    ],
  },
];

export const SOCIALS = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/abdulhameed-sherif' },
  { icon: Github, label: 'GitHub', href: 'https://github.com/beeecode' },
  { icon: Mail, label: 'Email', href: 'mailto:abdulhameedsherif@gmail.com' },
];
