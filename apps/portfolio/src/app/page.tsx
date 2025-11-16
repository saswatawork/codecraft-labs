'use client';

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CompoundAvatar,
  CompoundNavigation,
  Container,
  ProjectCard,
  SectionHeading,
  Stat,
} from '@ccl/ui';
import {
  ArrowRight,
  Calendar,
  Clock,
  Code,
  Database,
  Download,
  ExternalLink,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Server,
  Star,
  Trophy,
  Users,
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <CompoundNavigation
        variant="default"
        position="sticky"
        brand={{
          text: 'Saswata Pal',
          href: '/',
        }}
        items={[
          { label: 'Home', href: '/', active: true },
          { label: 'Projects', href: '#projects' },
          { label: 'Skills', href: '#skills' },
          { label: 'Testimonials', href: '#testimonials' },
          { label: 'Contact', href: '#contact' },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hover:bg-gray-100" asChild>
              <a
                href="https://github.com/saswatawork"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-gray-100" asChild>
              <a
                href="https://linkedin.com/in/saswatawork"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>
            <Button size="sm" variant="primary" className="shadow-sm font-medium" asChild>
              <a href="#contact">Hire Me</a>
            </Button>
          </div>
        }
      />

      <main>
        {/* Hero Section */}
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
                  size="lg"
                  variant="primary"
                  rightIcon={<ArrowRight className="h-5 w-5" />}
                  className="shadow-medium hover:shadow-strong transition-all font-semibold"
                  asChild
                >
                  <a href="#projects">View Projects</a>
                </Button>
                <Button
                  size="xl"
                  variant="outline"
                  leftIcon={<Download className="h-5 w-5" />}
                  className="shadow-soft hover:shadow-medium transition-all font-semibold"
                  asChild
                >
                  <a href="/resume.pdf">Download Resume</a>
                </Button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-6 pt-6 md:pt-8">
                <Stat value="8+" label="Years Experience" tone="blue" />
                <Stat value="50+" label="Projects Delivered" tone="green" />
                <Stat value="15+" label="Happy Clients" tone="purple" />
                <Stat value="99%" label="Success Rate" tone="orange" />
              </div>
            </div>
          </Container>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="bg-linear-to-b from-white via-gray-50/50 to-white py-12 md:py-16 lg:py-20"
        >
          <Container size="xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="space-y-4 md:space-y-6">
                <Badge className="bg-blue-50 text-blue-700 border-blue-200 px-4 py-1.5 text-sm font-semibold shadow-subtle">
                  About Me
                </Badge>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-gray-900 text-balance">
                  Building digital products that{' '}
                  <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
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
                    <strong className="font-semibold text-gray-900"> accessibility</strong>,
                    developer experience, and maintainability.
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
                    <a
                      href="https://github.com/saswatawork"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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
                <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-purple-500/10 rounded-3xl transform rotate-3" />
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

        {/* Projects Section */}
        <section
          id="projects"
          className="py-20 md:py-24 lg:py-28 bg-linear-to-b from-gray-50 via-white to-blue-50/30"
        >
          <Container size="xl">
            <SectionHeading
              eyebrow={
                <Badge className="bg-blue-100 text-blue-700 border-blue-300 px-5 py-2 text-sm font-bold shadow-sm">
                  Portfolio
                </Badge>
              }
              heading={
                <span className="text-gray-900">
                  Featured{' '}
                  <span className="bg-linear-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Projects
                  </span>
                </span>
              }
              subtitle="Building scalable solutions that drive real business impact and exceptional user experiences"
              align="center"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-16">
              {/* Featured Project 1 */}
              <ProjectCard
                heading="Enterprise Analytics Platform"
                gradient="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700"
                icon={
                  <div className="text-white text-center transform group-hover:scale-110 transition-transform duration-300">
                    <Code className="h-16 w-16 mx-auto mb-3 opacity-95 drop-shadow-lg" />
                    <p className="text-sm font-semibold opacity-95">Enterprise Analytics</p>
                  </div>
                }
                label="Featured"
                meta={[
                  { icon: <Clock className="h-3.5 w-3.5" />, text: '3 months' },
                  { icon: <Users className="h-3.5 w-3.5" />, text: '5-person team' },
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
                className="shadow-lg hover:shadow-2xl"
              />

              {/* Featured Project 2 */}
              <ProjectCard
                heading="Multi-tenant E-commerce Solution"
                gradient="bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700"
                icon={
                  <div className="text-white text-center transform group-hover:scale-110 transition-transform duration-300">
                    <Globe className="h-16 w-16 mx-auto mb-3 opacity-95 drop-shadow-lg" />
                    <p className="text-sm font-semibold opacity-95">E-commerce Platform</p>
                  </div>
                }
                label="Popular"
                meta={[
                  { icon: <Clock className="h-3.5 w-3.5" />, text: '6 months' },
                  { icon: <Users className="h-3.5 w-3.5" />, text: '10K+ users' },
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
                className="shadow-lg hover:shadow-2xl"
              />
            </div>

            {/* Section Divider */}
            <div className="flex items-center gap-4 mb-12">
              <div className="flex-1 h-px bg-linear-to-r from-transparent via-gray-300 to-transparent" />
              <h3 className="text-lg font-bold text-gray-700">More Projects</h3>
              <div className="flex-1 h-px bg-linear-to-r from-transparent via-gray-300 to-transparent" />
            </div>

            {/* Additional Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <ProjectCard
                heading="Developer CLI Tool"
                gradient="bg-linear-to-br from-orange-500 to-red-500"
                icon={<Server className="h-12 w-12 text-white opacity-80" />}
                description="Open-source CLI reducing deployment time by 60%"
                tech={['Go', 'Cobra', 'Docker']}
                primaryAction={{
                  label: 'View',
                  href: '#',
                  icon: <ExternalLink className="h-4 w-4" />,
                }}
                secondaryAction={{ href: '#', icon: <Github className="h-4 w-4" /> }}
                className="text-sm"
              />
              <ProjectCard
                heading="Real-time Chat App"
                gradient="bg-linear-to-br from-purple-500 to-pink-500"
                icon={<Users className="h-12 w-12 text-white opacity-80" />}
                description="WebSocket-based chat supporting 10K concurrent users"
                tech={['Socket.io', 'React', 'MongoDB']}
                primaryAction={{
                  label: 'View',
                  href: '#',
                  icon: <ExternalLink className="h-4 w-4" />,
                }}
                secondaryAction={{ href: '#', icon: <Github className="h-4 w-4" /> }}
                className="text-sm"
              />
              <ProjectCard
                heading="Data Visualization Tool"
                gradient="bg-linear-to-br from-cyan-500 to-blue-500"
                icon={<Database className="h-12 w-12 text-white opacity-80" />}
                description="Interactive dashboards for complex dataset analysis"
                tech={['D3.js', 'Python', 'FastAPI']}
                primaryAction={{
                  label: 'View',
                  href: '#',
                  icon: <ExternalLink className="h-4 w-4" />,
                }}
                secondaryAction={{ href: '#', icon: <Github className="h-4 w-4" /> }}
                className="text-sm"
              />
            </div>
          </Container>
        </section>

        {/* Testimonials Section */}
        <section className="py-12 md:py-16 lg:py-20 bg-white">
          <Container>
            <SectionHeading
              eyebrow={
                <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                  Testimonials
                </Badge>
              }
              heading="Client Success Stories"
              subtitle="What clients say about working with me"
              align="center"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: 'Sarah Johnson',
                  role: 'CTO, TechStart Inc',
                  content:
                    'Saswata transformed our legacy system into a modern, scalable platform. His technical expertise and project leadership were exceptional.',
                  rating: 5,
                },
                {
                  name: 'Michael Chen',
                  role: 'Product Manager, DataCorp',
                  content:
                    'Working with Saswata was a game-changer. He delivered our analytics platform ahead of schedule and exceeded all performance benchmarks.',
                  rating: 5,
                },
                {
                  name: 'Emily Rodriguez',
                  role: 'Founder, GreenTech Solutions',
                  content:
                    'Incredible attention to detail and deep understanding of both technical and business requirements. Highly recommend!',
                  rating: 5,
                },
              ].map((testimonial) => (
                <Card
                  key={testimonial.name}
                  className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
                >
                  <CardHeader>
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, j) => (
                        <Star
                          key={`star-${testimonial.name}-${j}`}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <blockquote className="text-gray-700 mb-6 leading-relaxed italic">
                      "{testimonial.content}"
                    </blockquote>
                    <div className="flex items-center gap-3">
                      <CompoundAvatar
                        fallback={testimonial.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                        size="sm"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Skills Section */}
        <section className="bg-linear-to-b from-gray-50 to-white py-12 md:py-16 lg:py-20">
          <Container size="xl">
            <SectionHeading
              eyebrow={
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                  Technical Expertise
                </Badge>
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

        {/* Contact Section */}
        <section
          id="contact"
          className="py-12 md:py-16 lg:py-20 bg-linear-to-br from-gray-900 to-blue-900 text-white"
        >
          <Container>
            <SectionHeading
              eyebrow={
                <Badge className="bg-white/20 text-white border-white/30">Let's Connect</Badge>
              }
              heading="Ready to Start Your Project?"
              subtitle={
                <span className="text-gray-300">
                  I'm always excited to tackle challenging problems and create impactful solutions.
                  Let's discuss how I can help bring your vision to life.
                </span>
              }
              align="center"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
              <Card className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-colors">
                <CardHeader className="text-center pb-4">
                  <Mail className="h-8 w-8 mx-auto mb-3 text-blue-300" />
                  <CardTitle className="text-lg">Email</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-300 mb-4">Drop me a line</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/30 text-white hover:bg-white hover:text-gray-900 transition-colors"
                    asChild
                  >
                    <a href="mailto:saswata.career@gmail.com">Send Email</a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-colors">
                <CardHeader className="text-center pb-4">
                  <Calendar className="h-8 w-8 mx-auto mb-3 text-green-300" />
                  <CardTitle className="text-lg">Schedule Call</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-300 mb-4">Book a meeting</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/30 text-white hover:bg-white hover:text-gray-900"
                    asChild
                  >
                    <a href="https://cal.com" target="_blank" rel="noopener noreferrer">
                      Book Now
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-colors">
                <CardHeader className="text-center pb-4">
                  <Linkedin className="h-8 w-8 mx-auto mb-3 text-blue-400" />
                  <CardTitle className="text-lg">LinkedIn</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-300 mb-4">Professional network</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/30 text-white hover:bg-white hover:text-gray-900"
                    asChild
                  >
                    <a
                      href="https://linkedin.com/in/saswata-pal"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Connect
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-colors">
                <CardHeader className="text-center pb-4">
                  <MapPin className="h-8 w-8 mx-auto mb-3 text-purple-300" />
                  <CardTitle className="text-lg">Location</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-300 mb-4">Remote worldwide</p>
                  <div className="text-sm text-green-400 font-medium">Available 24/7</div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  size="lg"
                  variant="primary"
                  leftIcon={<Mail className="h-4 w-4" />}
                  className="shadow-strong font-semibold"
                  asChild
                >
                  <a href="mailto:saswata.career@gmail.com">Start a Project</a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  leftIcon={<Download className="h-4 w-4" />}
                  className="border-white/30 text-white hover:bg-white hover:text-gray-900 transition-all font-semibold"
                  asChild
                >
                  <a href="/resume.pdf">Download Resume</a>
                </Button>
              </div>
              <p className="text-gray-400 mt-6">Response time: Usually within 24 hours</p>
            </div>
          </Container>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Saswata Pal. Built with CodeCraft Labs.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
