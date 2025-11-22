import { Badge, Heading, Section, SkillCard, Stack, Text } from '@ccl/ui';
import { Code, Database, Server } from 'lucide-react';

export const PortfolioSkills = () => {
  return (
    <Section variant="gradient-light" spacing="2xl">
      <Stack spacing="2xl">
        <Stack spacing="md" align="center">
          <Badge variant="soft" tone="blue" className="text-sm">
            Technical Expertise
          </Badge>
          <Heading
            level={2}
            align="center"
            weight="extrabold"
            className="text-3xl md:text-4xl lg:text-5xl"
          >
            Skills & Technologies
          </Heading>
          <Text size="xl" className="text-gray-600 dark:text-gray-300 max-w-2xl" align="center">
            Comprehensive technical stack for modern development
          </Text>
        </Stack>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 pt-4">
          <SkillCard
            title="Frontend"
            icon={<Code className="h-5 w-5" />}
            skills={[
              'React',
              'Next.js',
              'TypeScript',
              'Vue.js',
              'Tailwind CSS',
              'Styled Components',
              'Redux',
              'Zustand',
            ]}
            tone="blue"
          />

          <SkillCard
            title="Backend"
            icon={<Server className="h-5 w-5" />}
            skills={[
              'Node.js',
              'Express',
              'NestJS',
              'GraphQL',
              'Prisma',
              'PostgreSQL',
              'MongoDB',
              'Redis',
            ]}
            tone="green"
          />

          <SkillCard
            title="Tools & DevOps"
            icon={<Database className="h-5 w-5" />}
            skills={[
              'Docker',
              'Kubernetes',
              'AWS',
              'Vercel',
              'CI/CD',
              'Playwright',
              'Vitest',
              'Storybook',
            ]}
            tone="purple"
          />
        </div>
      </Stack>
    </Section>
  );
};
