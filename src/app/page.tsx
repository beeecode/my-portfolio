import { Suspense } from 'react';
import { ChevronUp } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import SkillsSection from '../components/SkillsSection';
import ExperienceSection from '../components/ExperienceSection';
import ContactSection from '../components/ContactSection';
import { getPortfolioContent } from '@/lib/portfolio';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const content = await getPortfolioContent();
  return (
    <div className="min-h-screen bg-ink text-paper relative md:pl-28 overflow-x-hidden">
      <HeroSection settings={content.settings} />

      {/* ═══ SECTIONS ═══ */}
      <Suspense fallback={
        <div className="h-screen flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-r-2 border-accent animate-spin" />
        </div>
      }>
        <AboutSection settings={content.settings} />
        <ProjectsSection projects={content.projects.filter((project) => project.visible)} />
        <SkillsSection groups={content.skillGroups} />
        <ExperienceSection experiences={content.experiences.filter((experience) => experience.visible)} />
        <ContactSection settings={content.settings} />
      </Suspense>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-white/5 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted text-xs font-mono">
            © {new Date().getFullYear()} {content.settings.name}
          </p>
        </div>
      </footer>

      {/* ═══ BACK TO TOP ═══ */}
      <a
        href="#hero"
        aria-label="Back to Top"
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 w-12 h-12 bg-[#111111]/80 backdrop-blur-2xl border border-white/10 rounded-full flex items-center justify-center text-muted hover:text-accent hover:border-accent/50 hover:bg-white/5 transition-all z-50 shadow-2xl group"
      >
        <ChevronUp size={20} className="group-hover:-translate-y-1 transition-transform" />
      </a>
    </div>
  );
}
