import { Badge, Heading, Section, SkillCard, Stack, Text } from '@ccl/ui';
import { Code, Database, Server } from 'lucide-react';

export const PortfolioSkills = () => {
  return (
    <Section id="skills" variant="gradient-light" spacing="xl" width="comfortable">
      <Stack spacing="xl">
        <Stack spacing="xl" align="center">
          <Badge variant="soft" tone="blue" className="text-base font-medium px-4 py-2">
            Technical Expertise
          </Badge>
          <Heading level={2} align="center" weight="extrabold">
            Skills & Technologies
          </Heading>
          <Text
            size="xl"
            className="text-gray-600 dark:text-gray-300 max-w-3xl leading-loose"
            align="center"
          >
            Comprehensive technical stack for modern development
          </Text>
        </Stack>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 pt-8">
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
