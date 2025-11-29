import { Badge, Grid, ProjectCard, Section, SectionHeading, Stack } from '@ccl/ui';
import { Clock, Code, Database, ExternalLink, Github, Globe, Server, Users } from 'lucide-react';

export const PortfolioProject = () => {
  return (
    <Section
      id="projects"
      spacing="2xl"
      width="comfortable"
      className="bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden"
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <Stack spacing="2xl" className="relative z-10">
        <SectionHeading
          eyebrow={
            <Badge
              variant="soft"
              tone="blue"
              className="text-base md:text-lg font-semibold px-6 py-3 shadow-sm"
            >
              Portfolio
            </Badge>
          }
          heading={
            <span className="text-gray-900 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
              Featured{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Projects
              </span>
            </span>
          }
          subtitle="Building scalable solutions that drive real business impact and exceptional user experiences"
          align="center"
        />

        <Grid columns={2} gap="xl" className="pt-12">
          {/* Featured Project 1 */}
          <ProjectCard
            heading="Enterprise Analytics Platform"
            gradient="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700"
            icon={
              <div className="text-white text-center transform group-hover:scale-110 transition-transform duration-500">
                <Code className="h-16 w-16 md:h-20 md:w-20 mx-auto mb-3 opacity-95 drop-shadow-lg" />
                <p className="text-sm md:text-base font-semibold opacity-95">
                  Enterprise Analytics
                </p>
              </div>
            }
            label="Featured"
            meta={[
              { icon: <Clock className="h-4 w-4" />, text: '3 months' },
              { icon: <Users className="h-4 w-4" />, text: '5-person team' },
            ]}
            description={
              'Comprehensive analytics platform processing 1M+ daily events with real-time dashboards, custom reporting, and advanced data visualization. Achieved 40% faster query performance with optimized PostgreSQL queries and Redis caching.'
            }
            tech={['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS']}
            primaryAction={{
              label: 'View Case Study',
              href: '#',
              icon: <ExternalLink className="h-4 w-4" />,
            }}
            secondaryAction={{ href: '#', icon: <Github className="h-4 w-4" /> }}
            className="shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
          />

          {/* Featured Project 2 */}
          <ProjectCard
            heading="Multi-tenant E-commerce Solution"
            gradient="bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700"
            icon={
              <div className="text-white text-center transform group-hover:scale-110 transition-transform duration-500">
                <Globe className="h-16 w-16 md:h-20 md:w-20 mx-auto mb-3 opacity-95 drop-shadow-lg" />
                <p className="text-sm md:text-base font-semibold opacity-95">E-commerce Platform</p>
              </div>
            }
            label="Popular"
            meta={[
              { icon: <Clock className="h-4 w-4" />, text: '6 months' },
              { icon: <Users className="h-4 w-4" />, text: '10K+ users' },
            ]}
            description={
              'Scalable multi-tenant platform handling $2M+ in monthly transactions. Features include real-time inventory management, integrated payment processing with Stripe, role-based access control, and comprehensive analytics dashboards with 99.9% uptime SLA.'
            }
            tech={['Next.js', 'Prisma', 'Stripe', 'Redis', 'Docker']}
            primaryAction={{
              label: 'Live Demo',
              href: '#',
              icon: <ExternalLink className="h-4 w-4" />,
            }}
            secondaryAction={{ href: '#', icon: <Github className="h-4 w-4" /> }}
            className="shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
          />
        </Grid>

        {/* Section Divider */}
        <div className="flex items-center gap-6 py-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">
            More Projects
          </h3>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        </div>

        {/* Additional Projects Grid */}
        <Grid columns={3} gap="lg">
          <ProjectCard
            heading="Developer CLI Tool"
            gradient="bg-gradient-to-br from-orange-500 to-red-500"
            icon={
              <Server className="h-14 w-14 text-white opacity-90 group-hover:scale-110 transition-transform duration-300" />
            }
            description="Open-source CLI reducing deployment time by 60%"
            tech={['Go', 'Cobra', 'Docker']}
            primaryAction={{
              label: 'View',
              href: '#',
              icon: <ExternalLink className="h-4 w-4" />,
            }}
            secondaryAction={{ href: '#', icon: <Github className="h-4 w-4" /> }}
            className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          />
          <ProjectCard
            heading="Real-time Chat App"
            gradient="bg-gradient-to-br from-purple-500 to-pink-500"
            icon={
              <Users className="h-14 w-14 text-white opacity-90 group-hover:scale-110 transition-transform duration-300" />
            }
            description="WebSocket-based chat supporting 10K concurrent users"
            tech={['Socket.io', 'React', 'MongoDB']}
            primaryAction={{
              label: 'View',
              href: '#',
              icon: <ExternalLink className="h-4 w-4" />,
            }}
            secondaryAction={{ href: '#', icon: <Github className="h-4 w-4" /> }}
            className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          />
          <ProjectCard
            heading="Data Visualization Tool"
            gradient="bg-gradient-to-br from-cyan-500 to-blue-500"
            icon={
              <Database className="h-14 w-14 text-white opacity-90 group-hover:scale-110 transition-transform duration-300" />
            }
            description="Interactive dashboards for complex dataset analysis"
            tech={['D3.js', 'Python', 'FastAPI']}
            primaryAction={{
              label: 'View',
              href: '#',
              icon: <ExternalLink className="h-4 w-4" />,
            }}
            secondaryAction={{ href: '#', icon: <Github className="h-4 w-4" /> }}
            className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          />
        </Grid>
      </Stack>
    </Section>
  );
};
