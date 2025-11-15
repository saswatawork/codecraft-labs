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
} from '@ccl/ui';
import { ArrowRight, ExternalLink, Github, Linkedin, Mail } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <CompoundNavigation
        variant="default"
        position="sticky"
        brand={{
          text: 'portfolio',
          href: '/',
        }}
        items={[
          { label: 'Home', href: '/', active: true },
          { label: 'About', href: '#about' },
          { label: 'Projects', href: '#projects' },
          { label: 'Blog', href: '/blog' },
          { label: 'Contact', href: '#contact' },
        ]}
        actions={
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" asChild>
              <a href="https://github.com/saswatawork" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
              </a>
            </Button>
            <Button size="sm" asChild>
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>
        }
      />

      <main>
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <Badge className="mb-6">Portfolio</Badge>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Hi, I'm <span className="text-blue-600">Saswata Pal</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Staff Software Engineer crafting scalable systems & developer experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                View My Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Download Resume
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="bg-gray-50 py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4">About Me</Badge>
                <h2 className="text-4xl font-bold mb-6">Building digital products that matter</h2>
                <p className="text-lg text-gray-600 mb-4">
                  I'm a full-stack engineer with deep experience in designing scalable platforms,
                  developer tooling, and high-impact UI systems.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  I love blending product thinking with solid engineering fundamentals—performance,
                  accessibility, DX, and maintainability.
                </p>
                <div className="flex gap-4">
                  <Button variant="outline" asChild>
                    <a
                      href="https://github.com/saswatawork"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a
                      href="https://linkedin.com/in/saswata-pal"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="mr-2 h-4 w-4" />
                      LinkedIn
                    </a>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <CompoundAvatar
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
                  fallback="SP"
                  size="lg"
                  className="w-full h-auto max-w-md mx-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge className="mb-4">Portfolio</Badge>
              <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
              <p className="text-lg text-gray-600">Select recent work</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="group hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-full h-48 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg mb-4" />
                    <CardTitle>Project {i}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      A concise summary of the project and impact.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary" size="sm">
                        React
                      </Badge>
                      <Badge variant="secondary" size="sm">
                        TypeScript
                      </Badge>
                      <Badge variant="secondary" size="sm">
                        Tailwind
                      </Badge>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm" className="flex-1">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </Button>
                      <Button variant="outline" size="sm">
                        <Github className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge className="mb-4">Skills & Technologies</Badge>
              <h2 className="text-4xl font-bold mb-4">What I Work With</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                'React',
                'Next.js',
                'TypeScript',
                'Node.js',
                'Tailwind CSS',
                'PostgreSQL',
                'Docker',
                'AWS',
              ].map((skill) => (
                <Card key={skill} className="text-center p-6">
                  <CardContent>
                    <p className="font-semibold">{skill}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="mb-4">Get In Touch</Badge>
            <h2 className="text-4xl font-bold mb-6">Let's Work Together</h2>
            <p className="text-lg text-gray-600 mb-8">
              Always open to interesting problems, collaboration, and impactful product ideas.
            </p>
            <Button size="lg" asChild>
              <a href="mailto:saswata.career@gmail.com">
                <Mail className="mr-2 h-5 w-5" />
                Send Me an Email
              </a>
            </Button>
          </div>
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
