import { Button, Hero, Stat } from '@ccl/ui';
import { ArrowRight, Download, Sparkles } from 'lucide-react';

export const PortfolioHero = () => {
  return (
    <Hero
      variant="gradient"
      spacing="2xl"
      className="min-h-screen flex items-center relative overflow-hidden"
    >
      {/* Enhanced Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full space-y-16 md:space-y-20 lg:space-y-24 relative z-10">
        <Hero.Badge className="text-base md:text-lg font-semibold px-7 py-3 shadow-lg hover:shadow-xl transition-shadow">
          <Sparkles className="h-4 w-4 md:h-5 md:w-5 mr-2 inline-block animate-pulse" />
          Full-Stack Engineer & Technical Architect
        </Hero.Badge>

        <div className="space-y-8 md:space-y-10">
          <Hero.Title className="text-gray-900 leading-[1.1] tracking-tight">
            Crafting scalable solutions for{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              modern web
            </span>
          </Hero.Title>

          <Hero.Description className="text-gray-600 text-xl md:text-2xl lg:text-3xl leading-relaxed max-w-4xl font-light">
            Specialized in building high-performance platforms, developer tools, and design systems
            that scale with your business needs.
          </Hero.Description>
        </div>

        <Hero.Actions className="pt-8">
          <Button
            size="lg"
            variant="primary"
            tone="blue"
            className="px-12 py-7 text-lg font-semibold shadow-2xl hover:shadow-blue-500/50 hover:scale-[1.02] transition-all duration-300"
            asChild
          >
            <a href="#projects" className="inline-flex items-center gap-3">
              View Projects
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline-primary"
            className="px-12 py-7 text-lg font-semibold border-2 hover:scale-[1.02] transition-all duration-300"
            asChild
          >
            <a href="/resume.pdf" className="inline-flex items-center gap-3">
              <Download className="h-5 w-5" />
              Download Resume
            </a>
          </Button>
        </Hero.Actions>

        <Hero.Stats className="pt-32 md:pt-36 border-t border-gray-200/50 mt-20">
          <div className="text-center space-y-3 group cursor-default hover:scale-110 transition-all duration-300">
            <Stat value="12+" label="Years Experience" tone="blue" />
          </div>
          <div className="text-center space-y-3 group cursor-default hover:scale-110 transition-all duration-300">
            <Stat value="50+" label="Projects Delivered" tone="green" />
          </div>
          <div className="text-center space-y-3 group cursor-default hover:scale-110 transition-all duration-300">
            <Stat value="15+" label="Happy Clients" tone="purple" />
          </div>
          <div className="text-center space-y-3 group cursor-default hover:scale-110 transition-all duration-300">
            <Stat value="99%" label="Success Rate" tone="orange" />
          </div>
        </Hero.Stats>
      </div>
    </Hero>
  );
};
