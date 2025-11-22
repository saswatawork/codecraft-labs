import { Button, Hero, Stat } from '@ccl/ui';
import { ArrowRight, Download } from 'lucide-react';

export const PortfolioHero = () => {
  return (
    <Hero variant="gradient" spacing="xl">
      <Hero.Badge>Full-Stack Engineer & Technical Architect</Hero.Badge>

      <Hero.Title className="text-gray-900">
        Crafting scalable solutions for{' '}
        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
          modern web
        </span>
      </Hero.Title>

      <Hero.Description className="text-gray-600">
        Specialized in building high-performance platforms, developer tools, and design systems that
        scale with your business needs.
      </Hero.Description>

      <Hero.Actions>
        <Button size="lg" variant="primary" tone="blue" asChild>
          <a href="#projects" className="inline-flex items-center">
            View Projects
            <ArrowRight className="h-5 w-5 ml-2" />
          </a>
        </Button>
        <Button size="lg" variant="outline-primary" asChild>
          <a href="#resume" className="inline-flex items-center">
            <Download className="h-5 w-5 mr-2" />
            Download Resume
          </a>
        </Button>
      </Hero.Actions>

      <Hero.Stats>
        <Stat value="12+" label="Years Experience" tone="blue" />
        <Stat value="50+" label="Projects Delivered" tone="green" />
        <Stat value="15+" label="Happy Clients" tone="purple" />
        <Stat value="99%" label="Success Rate" tone="orange" />
      </Hero.Stats>
    </Hero>
  );
};
