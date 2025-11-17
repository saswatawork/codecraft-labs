import { Badge, Button, Container, Stat } from '@ccl/ui';
import { ArrowRight, Download } from 'lucide-react';

export const PortfolioHero = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-blue-50 via-indigo-50/30 to-white">
      <Container size="xl">
        <div className="py-12 md:py-20 lg:py-24 text-center space-y-8 md:space-y-10">
          {/* Hero Content */}
          <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
            <Badge className="inline-block bg-blue-100 text-blue-800 border-blue-200 px-4 py-1.5 text-xs md:text-sm font-semibold shadow-subtle">
              Full-Stack Engineer & Technical Architect
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.15] text-gray-900 text-balance px-2">
              Crafting scalable solutions for{' '}
              <span className="bg-linear-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
                modern web
              </span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto px-4">
              Specialized in building high-performance platforms, developer tools, and design
              systems that scale with your business needs.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center px-4">
            <Button
              size="md"
              variant="primary"
              className="shadow-medium hover:shadow-strong transition-all font-semibold"
              asChild
            >
              <a href="#projects" className="inline-flex items-center">
                View Projects
                <ArrowRight className="h-5 w-5 ml-2" />
              </a>
            </Button>
            <Button
              size="md"
              variant="outline"
              className="shadow-soft hover:shadow-medium transition-all font-semibold"
              asChild
            >
              <a href="#resume" className="inline-flex items-center">
                <Download className="h-5 w-5 mr-2" />
                Download Resume
              </a>
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-6 pt-6 md:pt-8">
            <Stat value="12+" label="Years Experience" tone="blue" />
            <Stat value="50+" label="Projects Delivered" tone="green" />
            <Stat value="15+" label="Happy Clients" tone="purple" />
            <Stat value="99%" label="Success Rate" tone="orange" />
          </div>
        </div>
      </Container>
    </section>
  );
};
