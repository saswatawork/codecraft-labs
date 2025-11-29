import { Button, Hero, Stat } from '@ccl/ui';
import { ArrowRight, Download, Sparkles } from 'lucide-react';

export const PortfolioHero = () => {
  return (
    <Hero
      variant="gradient"
      spacing="xl"
      className="min-h-screen flex items-center relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full space-y-12 md:space-y-14 lg:space-y-16 relative z-10">
        <Hero.Badge className="text-base font-medium px-6 py-2.5 shadow-sm">
          <Sparkles className="h-4 w-4 mr-2 inline-block" />
          Full-Stack Engineer & Technical Architect
        </Hero.Badge>

        <div className="space-y-6">
          <Hero.Title className="text-gray-900 leading-tight">
            Crafting scalable solutions for{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
              modern web
            </span>
          </Hero.Title>

          <Hero.Description className="text-gray-600 text-xl md:text-2xl leading-relaxed max-w-4xl">
            Specialized in building high-performance platforms, developer tools, and design systems
            that scale with your business needs.
          </Hero.Description>
        </div>

        <Hero.Actions className="pt-4">
          <Button
            size="lg"
            variant="primary"
            tone="blue"
            className="px-10 py-6 text-base font-semibold shadow-xl hover:shadow-2xl transition-shadow"
            asChild
          >
            <a href="#projects" className="inline-flex items-center gap-2">
              View Projects
              <ArrowRight className="h-5 w-5" />
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline-primary"
            className="px-10 py-6 text-base font-semibold border-2"
            asChild
          >
            <a href="/resume.pdf" className="inline-flex items-center gap-2">
              <Download className="h-5 w-5" />
              Download Resume
            </a>
          </Button>
        </Hero.Actions>

        <Hero.Stats className="pt-24 md:pt-28 border-t-2 border-gray-200/80 mt-16">
          <div className="text-center space-y-2 group cursor-default hover:scale-105 transition-transform">
            <Stat value="12+" label="Years Experience" tone="blue" />
          </div>
          <div className="text-center space-y-2 group cursor-default hover:scale-105 transition-transform">
            <Stat value="50+" label="Projects Delivered" tone="green" />
          </div>
          <div className="text-center space-y-2 group cursor-default hover:scale-105 transition-transform">
            <Stat value="15+" label="Happy Clients" tone="purple" />
          </div>
          <div className="text-center space-y-2 group cursor-default hover:scale-105 transition-transform">
            <Stat value="99%" label="Success Rate" tone="orange" />
          </div>
        </Hero.Stats>
      </div>
    </Hero>
  );
};
