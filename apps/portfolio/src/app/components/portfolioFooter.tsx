import { Button, Heading, Stack, Text } from '@ccl/ui';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

export const PortfolioFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white border-t border-gray-800 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Stack spacing="md">
              <Heading
                level={3}
                size="xl"
                weight="bold"
                className="text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
              >
                Saswata Pal
              </Heading>
              <Text className="text-gray-400 leading-relaxed text-base">
                Full-Stack Engineer crafting scalable solutions and exceptional digital experiences.
              </Text>
              <div className="flex gap-3 pt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-white/10 text-gray-400 hover:text-white hover:scale-110 transition-all"
                  asChild
                >
                  <a
                    href="https://github.com/saswatawork"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-white/10 text-gray-400 hover:text-white hover:scale-110 transition-all"
                  asChild
                >
                  <a
                    href="https://linkedin.com/in/saswata-pal"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-white/10 text-gray-400 hover:text-white hover:scale-110 transition-all"
                  asChild
                >
                  <a
                    href="https://twitter.com/saswatawork"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-white/10 text-gray-400 hover:text-white hover:scale-110 transition-all"
                  asChild
                >
                  <a href="mailto:saswata.career@gmail.com" aria-label="Email">
                    <Mail className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </Stack>
          </div>

          {/* Quick Links */}
          <div>
            <Heading level={4} size="base" weight="semibold" className="text-white mb-6">
              Quick Links
            </Heading>
            <Stack spacing="sm">
              <a
                href="#about"
                className="text-gray-400 hover:text-white hover:translate-x-1 transition-all text-sm inline-block"
              >
                About
              </a>
              <a
                href="#projects"
                className="text-gray-400 hover:text-white hover:translate-x-1 transition-all text-sm inline-block"
              >
                Projects
              </a>
              <a
                href="#skills"
                className="text-gray-400 hover:text-white hover:translate-x-1 transition-all text-sm inline-block"
              >
                Skills
              </a>
              <a
                href="#testimonials"
                className="text-gray-400 hover:text-white hover:translate-x-1 transition-all text-sm inline-block"
              >
                Testimonials
              </a>
              <a
                href="#contact"
                className="text-gray-400 hover:text-white hover:translate-x-1 transition-all text-sm inline-block"
              >
                Contact
              </a>
            </Stack>
          </div>

          {/* Services */}
          <div>
            <Heading level={4} size="base" weight="semibold" className="text-white mb-6">
              Services
            </Heading>
            <Stack spacing="sm">
              <Text className="text-gray-400 text-sm hover:text-white transition-colors cursor-default">
                Web Development
              </Text>
              <Text className="text-gray-400 text-sm hover:text-white transition-colors cursor-default">
                System Architecture
              </Text>
              <Text className="text-gray-400 text-sm hover:text-white transition-colors cursor-default">
                API Design
              </Text>
              <Text className="text-gray-400 text-sm hover:text-white transition-colors cursor-default">
                UI/UX Engineering
              </Text>
              <Text className="text-gray-400 text-sm hover:text-white transition-colors cursor-default">
                Technical Consulting
              </Text>
            </Stack>
          </div>

          {/* Contact Info */}
          <div>
            <Heading level={4} size="base" weight="semibold" className="text-white mb-6">
              Get In Touch
            </Heading>
            <Stack spacing="sm">
              <a
                href="mailto:saswata.career@gmail.com"
                className="text-gray-400 hover:text-white transition-colors text-sm hover:underline"
              >
                saswata.career@gmail.com
              </a>
              <Text className="text-gray-400 text-sm">Remote Worldwide</Text>
              <Text className="text-gray-400 text-sm">Available 24/7</Text>
              <Button
                size="sm"
                variant="primary"
                tone="blue"
                className="mt-6 w-full hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
                leftIcon={<Mail className="h-4 w-4" />}
                asChild
              >
                <a href="mailto:saswata.career@gmail.com">Email Me</a>
              </Button>
            </Stack>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-gray-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Text className="text-gray-500 text-sm text-center md:text-left">
              © {currentYear} Saswata Pal. All rights reserved. Built with{' '}
              <span className="text-red-400">❤️</span> using CodeCraft Labs.
            </Text>
            <div className="flex gap-6">
              <a
                href="/privacy"
                className="text-gray-500 hover:text-white transition-all text-sm hover:underline"
              >
                Privacy
              </a>
              <a
                href="/terms"
                className="text-gray-500 hover:text-white transition-all text-sm hover:underline"
              >
                Terms
              </a>
              <a
                href="/sitemap"
                className="text-gray-500 hover:text-white transition-all text-sm hover:underline"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
