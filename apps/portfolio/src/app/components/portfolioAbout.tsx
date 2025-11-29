import { Badge, Button, CompoundAvatar, Heading, Section, Stack, Text } from '@ccl/ui';
import { ArrowRight, Github, Linkedin } from 'lucide-react';

export const PortfolioAbout = () => {
  return (
    <Section id="about" variant="gradient-light" spacing="2xl" width="comfortable">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-24 items-center">
        {/* Avatar Column - ordered first on large screens */}
        <div className="relative lg:order-first">
          {/* Enhanced Decorative Background */}
          <div className="absolute -inset-8 bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-indigo-500/30 rounded-[3rem] transform rotate-3 blur-3xl animate-pulse" />
          <div className="absolute -inset-8 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 rounded-[3rem] transform -rotate-3 blur-2xl" />

          {/* Avatar Container */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 to-purple-600/40 rounded-[2.5rem] group-hover:scale-105 transition-transform duration-500" />
            <CompoundAvatar
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=600&fit=crop&crop=face"
              fallback="SP"
              size="xl"
              className="w-full h-auto max-w-md mx-auto shadow-2xl rounded-[2.5rem] border-4 border-white/60 backdrop-blur-sm group-hover:scale-[1.02] transition-all duration-500"
            />
          </div>
        </div>

        {/* Content Column */}
        <Stack spacing="xl">
          <Badge
            variant="soft"
            tone="blue"
            className="text-base md:text-lg font-semibold px-6 py-3 w-fit shadow-sm"
          >
            About Me
          </Badge>

          <Heading
            level={2}
            weight="extrabold"
            className="leading-[1.2] tracking-tight text-5xl md:text-6xl"
          >
            Building digital products that{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              matter
            </span>
          </Heading>

          <Stack spacing="lg" className="pt-4">
            <Text
              size="xl"
              className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg md:text-xl"
            >
              Full-stack engineer with deep experience in designing{' '}
              <Text as="span" weight="bold" className="text-gray-900 dark:text-white">
                scalable platforms
              </Text>
              , developer tooling, and high-impact UI systems.
            </Text>
            <Text
              size="xl"
              className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg md:text-xl"
            >
              Passionate about blending product thinking with solid engineering fundamentals—
              <Text as="span" weight="bold" className="text-gray-900 dark:text-white">
                performance
              </Text>
              ,
              <Text as="span" weight="bold" className="text-gray-900 dark:text-white">
                {' '}
                accessibility
              </Text>
              , developer experience, and maintainability.
            </Text>
          </Stack>

          {/* Social Links */}
          <div className="flex flex-wrap gap-4 pt-8">
            <Button
              variant="outline-primary"
              size="lg"
              leftIcon={<Github className="h-5 w-5" />}
              className="font-semibold hover:scale-[1.02] transition-transform"
              asChild
            >
              <a href="https://github.com/saswatawork" target="_blank" rel="noopener noreferrer">
                GitHub Profile
              </a>
            </Button>
            <Button
              variant="outline-primary"
              size="lg"
              leftIcon={<Linkedin className="h-5 w-5" />}
              className="font-semibold hover:scale-[1.02] transition-transform"
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

          {/* CTA */}
          <div className="pt-6">
            <Button
              variant="primary"
              tone="blue"
              size="lg"
              rightIcon={
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              }
              className="font-semibold shadow-xl hover:shadow-2xl group px-8 py-6 hover:scale-[1.02] transition-all"
              asChild
            >
              <a href="#projects">View My Work</a>
            </Button>
          </div>
        </Stack>
      </div>
    </Section>
  );
};
