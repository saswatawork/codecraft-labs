'use client';

import { PortfolioAbout } from './components/portfolioAbout';
import { PortfolioContact } from './components/portfolioContact';
import { PortfolioFooter } from './components/portfolioFooter';
import { PortfolioHero } from './components/portfolioHero';
import { PortfolioNavigation } from './components/portfolioNavigation';
import { PortfolioProject } from './components/portfolioProject';
import { PortfolioSkills } from './components/portfolioSkills';
import { PortfolioTestimonials } from './components/portfolioTestimonials';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <PortfolioNavigation />

      <main>
        <PortfolioHero />
        <PortfolioAbout />
        <PortfolioProject />
        <PortfolioTestimonials />
        <PortfolioSkills />
        <PortfolioContact />
      </main>

      <PortfolioFooter />
    </div>
  );
}
