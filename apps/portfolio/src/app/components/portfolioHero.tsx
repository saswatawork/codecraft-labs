import { Button, Hero, Stat } from '@ccl/ui';
import { ArrowRight, Download } from 'lucide-react';

export const PortfolioHero = () => {
  return (
    <Hero variant="gradient" spacing="xl" className="min-h-screen flex items-center">
      <div className="w-full space-y-10 md:space-y-12 lg:space-y-16">
        <Hero.Badge className="text-base font-medium">
          Full-Stack Engineer & Technical Architect
        </Hero.Badge>

        <Hero.Title className="text-gray-900">
          Crafting scalable solutions for{' '}
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
            modern web
          </span>
        </Hero.Title>

        <Hero.Description className="text-gray-600 text-xl md:text-2xl">
          Specialized in building high-performance platforms, developer tools, and design systems
          that scale with your business needs.
        </Hero.Description>

        <Hero.Actions className="pt-8">
          <Button
            size="lg"
            variant="primary"
            tone="blue"
            className="px-8 py-4 text-base font-semibold"
            asChild
          >
            <a href="#projects" className="inline-flex items-center">
              View Projects
              <ArrowRight className="h-5 w-5 ml-2" />
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline-primary"
            className="px-8 py-4 text-base font-semibold"
            asChild
          >
            <a href="#resume" className="inline-flex items-center">
              <Download className="h-5 w-5 mr-2" />
              Download Resume
            </a>
          </Button>
        </Hero.Actions>

        <Hero.Stats className="pt-20 md:pt-24 border-t border-gray-200/60 mt-12">
          <Stat value="12+" label="Years Experience" tone="blue" />
          <Stat value="50+" label="Projects Delivered" tone="green" />
          <Stat value="15+" label="Happy Clients" tone="purple" />
          <Stat value="99%" label="Success Rate" tone="orange" />
        </Hero.Stats>
      </div>
    </Hero>
  );
};
