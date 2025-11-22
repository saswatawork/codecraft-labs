import { Badge, Card, CardContent, Container, SectionHeading } from '@ccl/ui';
import { Code, Database, Server } from 'lucide-react';

export const PortfolioSkills = () => {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-12 md:py-16 lg:py-20">
      <Container size="xl">
        <SectionHeading
          eyebrow={
            <Badge className="bg-blue-100 text-blue-800 border-blue-200">Technical Expertise</Badge>
          }
          heading="Skills & Technologies"
          subtitle="Comprehensive technical stack for modern development"
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Frontend */}
          <div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Code className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-blue-600">Frontend</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                'React',
                'Next.js',
                'TypeScript',
                'Vue.js',
                'Tailwind CSS',
                'Styled Components',
                'Redux',
                'Zustand',
              ].map((skill) => (
                <Card
                  key={skill}
                  className="text-center py-3 px-2 border shadow-sm hover:shadow-md hover:border-blue-200 transition-all bg-white"
                >
                  <CardContent className="p-0">
                    <p className="font-semibold text-gray-800 text-sm">{skill}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Backend */}
          <div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Server className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-green-600">Backend</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                'Node.js',
                'Express',
                'NestJS',
                'GraphQL',
                'Prisma',
                'PostgreSQL',
                'MongoDB',
                'Redis',
              ].map((skill) => (
                <Card
                  key={skill}
                  className="text-center py-3 px-2 border shadow-sm hover:shadow-md hover:border-green-200 transition-all bg-white"
                >
                  <CardContent className="p-0">
                    <p className="font-semibold text-gray-800 text-sm">{skill}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Tools & DevOps */}
          <div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Database className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-purple-600">Tools & DevOps</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                'Docker',
                'Kubernetes',
                'AWS',
                'Vercel',
                'CI/CD',
                'Playwright',
                'Vitest',
                'Storybook',
              ].map((skill) => (
                <Card
                  key={skill}
                  className="text-center py-3 px-2 border shadow-sm hover:shadow-md hover:border-purple-200 transition-all bg-white"
                >
                  <CardContent className="p-0">
                    <p className="font-semibold text-gray-800 text-sm">{skill}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
