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
    title: 'Ghost Mode | OpsDesk Dashboard',
    desc: 'A clean operations dashboard interface featuring project overviews, resource metrics, status tracking, and a structured admin-style layout.',
    image: '/ghost-mode-psi.png',
    tags: ['React.js', 'Dashboard UI', 'Data Tables'],
    link: 'https://ghost-mode-psi.vercel.app/',
  },
  {
    id: '04',
    title: 'Guaranteed CBT | Exam Portal',
    desc: 'A polished CBT access platform with student and admin entry points for live exams, assessment management, and result workflows.',
    image: '/guranteed-cbt.png',
    tags: ['React.js', 'Tailwind CSS', 'CBT Platform'],
    link: 'https://guranteed-cbt.vercel.app/',
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
    role: 'App Developer',
    company: 'Artheistlab',
    period: 'Current',
    location: 'Nigeria',
    points: [
      'Building responsive app interfaces and production-ready features for user-facing digital products.',
      'Implementing reusable components, smooth user flows, and API integrations across the application.',
      'Collaborating on design-to-development handoff, debugging issues, and improving performance and usability.',
    ],
  },
  {
    role: 'Web Developer',
    company: 'Sabuguy',
    period: 'Current',
    location: 'Nigeria',
    points: [
      'Developing responsive web pages and interactive user interfaces for a modern logistics platform.',
      'Connecting frontend experiences with backend APIs to support booking, tracking, and customer workflows.',
      'Improving page performance, accessibility, and cross-device consistency across the web application.',
    ],
  },
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
