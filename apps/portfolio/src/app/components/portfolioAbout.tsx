import { Badge, Button, CompoundAvatar, Container } from '@ccl/ui';
import { Github, Linkedin } from 'lucide-react';

export const PortfolioAbout = () => {
  return (
    <section
      id="about"
      className="bg-gradient-to-b from-white via-gray-50/50 to-white py-12 md:py-16 lg:py-20"
    >
      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="space-y-4 md:space-y-6">
            <Badge className="bg-blue-50 text-blue-700 border-blue-200 px-4 py-1.5 text-sm font-semibold shadow-sm">
              About Me
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-gray-900 text-balance">
              Building digital products that{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                matter
              </span>
            </h2>
            <div className="space-y-4">
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                Full-stack engineer with deep experience in designing{' '}
                <strong className="font-semibold text-gray-900">scalable platforms</strong>,
                developer tooling, and high-impact UI systems.
              </p>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                Passionate about blending product thinking with solid engineering fundamentals—
                <strong className="font-semibold text-gray-900">performance</strong>,
                <strong className="font-semibold text-gray-900"> accessibility</strong>, developer
                experience, and maintainability.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                variant="outline"
                size="default"
                leftIcon={<Github className="h-4 w-4" />}
                className="shadow-subtle hover:shadow-soft"
                asChild
              >
                <a href="https://github.com/saswatawork" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </Button>
              <Button
                variant="outline"
                size="default"
                leftIcon={<Linkedin className="h-4 w-4" />}
                className="shadow-subtle hover:shadow-soft"
                asChild
              >
                <a
                  href="https://linkedin.com/in/saswata-pal"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </Button>
            </div>
          </div>
          <div className="relative lg:order-first">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl transform rotate-3" />
            <div className="relative">
              <CompoundAvatar
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=600&fit=crop&crop=face"
                fallback="SP"
                size="lg"
                className="w-full h-auto max-w-sm mx-auto shadow-strong rounded-3xl"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
