import { Badge, Button, CompoundAvatar, Heading, Section, Stack, Text } from '@ccl/ui';
import { Github, Linkedin } from 'lucide-react';

export const PortfolioAbout = () => {
  return (
    <Section id="about" variant="gradient-light" spacing="2xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Content Column */}
        <Stack spacing="xl">
          <Badge variant="soft" tone="blue" className="text-sm">
            About Me
          </Badge>

          <Heading
            level={1}
            weight="extrabold"
            className="text-4xl md:text-5xl lg:text-6xl leading-tight"
          >
            Building digital products that{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-purple-700 bg-clip-text text-transparent">
              matter
            </span>
          </Heading>

          <Stack spacing="lg">
            <Text size="xl" leading="relaxed" className="text-gray-600 dark:text-gray-300">
              Full-stack engineer with deep experience in designing{' '}
              <Text as="span" weight="semibold" className="text-gray-900 dark:text-white">
                scalable platforms
              </Text>
              , developer tooling, and high-impact UI systems.
            </Text>
            <Text size="xl" leading="relaxed" className="text-gray-600 dark:text-gray-300">
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

          <div className="flex flex-wrap gap-4 pt-4">
            <Button
              variant="outline"
              size="default"
              leftIcon={<Github className="h-4 w-4" />}
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
        </Stack>

        {/* Avatar Column - ordered first on large screens */}
        <div className="relative lg:order-first">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl transform rotate-3 blur-sm" />
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
    </Section>
  );
};
