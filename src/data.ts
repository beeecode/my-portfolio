import { Code2, Layers, Palette, Database, Briefcase, Calendar, MapPin, Linkedin, Github, Mail, User, Send } from 'lucide-react';

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
    id: 'AS-01',
    title: 'F1 |  Landing Page',
    desc: 'A modern landing page for Formula 1 enthusiasts, featuring dynamic content and a sleek design.',
    image: '/img001.png',
    tags: ['React.js', 'Tailwind CSS', 'Frontend'],
    link: 'https://formula1-sable.vercel.app/',
  },
  {
    id: 'AS-02',
    title: 'Afrostyle | Fashion Marketplace',
    desc: 'A comprehensive fashion and tailoring platform in Nigeria. Built secure booking flows, order tracking, and a dedicated tailor dashboard full-stack implementation.',
    image: '/img002.png',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Full-Stack'],
    link: 'https://afrostyleapp.vercel.app/',
  },
  {
    id: 'AS-03',
    title: 'SkyCast | Weather Dashboard',
    desc: 'A dynamic weather dashboard providing live meteorological data, complete with city search, unit toggles, and a custom animated UI. Built with Vanilla JS and OpenWeatherMap API.',
    image: '/img003.png',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'REST API'],
    link: 'https://autoflow-fk64.vercel.app/',
  },
  {
    id: 'AS-04',
    title: 'AuthFlow | Authentication UI',
    desc: 'A seamless authentication flow featuring refined login and registration pages, robust form validation, and a clean, accessible user interface built for modern web applications.',
    image: '/img004.png',
    tags: ['React.js', 'Tailwind CSS', 'Auth UI'],
    link: 'https://autoflow-lime.vercel.app/',
  }
];

export const SKILLS = [
  { category: 'Languages', icon: Code2, items: ['HTML5', 'CSS3', 'JavaScript (ES6+)'] },
  { category: 'Frameworks', icon: Layers, items: ['React.js', 'Next.js', 'Tailwind CSS'] },
  { category: 'Styling & UI', icon: Palette, items: ['Flexbox', 'CSS Grid', 'Responsive Design', 'A11y'] },
  { category: 'Tools', icon: Database, items: ['Git & GitHub', 'Figma', 'VS Code', 'Vercel', 'REST APIs'] },
];

export const EXPERIENCE = [
  {
    role: 'Frontend Developer',
    company: 'Freelance / Remote',
    period: '2025 — Present',
    location: 'Remote',
    points: [
      'Currently building and maintaining Sabiguy, a live logistics web platform, using React.js and Tailwind CSS.',
      'Translate Figma and design mockups into pixel-accurate, cross-browser compatible frontend code.',
      'Integrate REST APIs into React applications, handling asynchronous data fetching, loading states, and error handling.',
      'Optimize websites for speed, accessibility, and mobile responsiveness, ensuring strong Core Web Vitals.',
    ],
  },
  {
    role: 'Junior Frontend Developer | Intern',
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
