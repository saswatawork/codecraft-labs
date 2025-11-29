import { Badge, Button, CompoundAvatar, Heading, Section, Stack, Text } from '@ccl/ui';
import { ArrowRight, Github, Linkedin } from 'lucide-react';

export const PortfolioAbout = () => {
  return (
    <Section id="about" variant="gradient-light" spacing="2xl" width="comfortable">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        {/* Avatar Column - ordered first on large screens */}
        <div className="relative lg:order-first">
          {/* Decorative Background */}
          <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-indigo-500/20 rounded-3xl transform rotate-3 blur-2xl" />
          <div className="absolute -inset-4 bg-gradient-to-tr from-purple-500/10 to-blue-500/10 rounded-3xl transform -rotate-3 blur-xl" />

          {/* Avatar Container */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-3xl" />
            <CompoundAvatar
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=600&fit=crop&crop=face"
              fallback="SP"
              size="xl"
              className="w-full h-auto max-w-md mx-auto shadow-2xl rounded-3xl border-4 border-white/50 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Content Column */}
        <Stack spacing="lg">
          <Badge variant="soft" tone="blue" className="text-base font-medium px-5 py-2.5 w-fit">
            About Me
          </Badge>

          <Heading level={2} weight="extrabold" className="leading-tight">
            Building digital products that{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-purple-700 bg-clip-text text-transparent">
              matter
            </span>
          </Heading>

          <Stack spacing="lg" className="pt-2">
            <Text size="xl" className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Full-stack engineer with deep experience in designing{' '}
              <Text as="span" weight="semibold" className="text-gray-900 dark:text-white">
                scalable platforms
              </Text>
              , developer tooling, and high-impact UI systems.
            </Text>
            <Text size="xl" className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Passionate about blending product thinking with solid engineering fundamentals—
              <Text as="span" weight="semibold" className="text-gray-900 dark:text-white">
                performance
              </Text>
              ,
              <Text as="span" weight="semibold" className="text-gray-900 dark:text-white">
                {' '}
                accessibility
              </Text>
              , developer experience, and maintainability.
            </Text>
          </Stack>

          {/* Social Links */}
          <div className="flex flex-wrap gap-4 pt-6">
            <Button
              variant="outline-primary"
              size="default"
              leftIcon={<Github className="h-4 w-4" />}
              className="font-semibold"
              asChild
            >
              <a href="https://github.com/saswatawork" target="_blank" rel="noopener noreferrer">
                GitHub Profile
              </a>
            </Button>
            <Button
              variant="outline-primary"
              size="default"
              leftIcon={<Linkedin className="h-4 w-4" />}
              className="font-semibold"
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
          <div className="pt-4">
            <Button
              variant="primary"
              tone="blue"
              size="lg"
              rightIcon={<ArrowRight className="h-5 w-5" />}
              className="font-semibold shadow-lg"
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
