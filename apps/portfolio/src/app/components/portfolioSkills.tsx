import { Badge, Heading, Section, SkillCard, Stack, Text } from '@ccl/ui';
import { Code, Database, Server } from 'lucide-react';

export const PortfolioSkills = () => {
  return (
    <Section id="skills" variant="light" spacing="2xl" width="comfortable">
      <Stack spacing="2xl">
        <Stack spacing="xl" align="center">
          <Badge
            variant="soft"
            tone="purple"
            className="text-base md:text-lg font-semibold px-6 py-3 shadow-sm"
          >
            Technical Expertise
          </Badge>
          <Heading
            level={2}
            align="center"
            weight="extrabold"
            className="text-4xl md:text-5xl lg:text-6xl tracking-tight"
          >
            Skills & Technologies
          </Heading>
          <Text
            size="xl"
            className="text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed text-lg md:text-xl"
            align="center"
          >
            Comprehensive technical stack for modern development
          </Text>
        </Stack>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 pt-12">
          <div className="hover:-translate-y-2 transition-all duration-300">
            <SkillCard
              title="Frontend"
              icon={<Code className="h-6 w-6" />}
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
          </div>

          <div className="hover:-translate-y-2 transition-all duration-300">
            <SkillCard
              title="Backend"
              icon={<Server className="h-6 w-6" />}
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
          </div>

          <div className="hover:-translate-y-2 transition-all duration-300">
            <SkillCard
              title="Tools & DevOps"
              icon={<Database className="h-6 w-6" />}
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
        </div>
      </Stack>
    </Section>
  );
};
