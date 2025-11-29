import { Button, Heading, Stack, Text } from '@ccl/ui';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

export const PortfolioFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gradient-to-b from-gray-900 to-gray-950 text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Stack spacing="md">
              <Heading level={3} size="xl" weight="bold" className="text-white">
                Saswata Pal
              </Heading>
              <Text className="text-gray-400 leading-relaxed">
                Full-Stack Engineer crafting scalable solutions and exceptional digital experiences.
              </Text>
              <div className="flex gap-3 pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-white/10 text-gray-400 hover:text-white"
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
                  className="hover:bg-white/10 text-gray-400 hover:text-white"
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
                  className="hover:bg-white/10 text-gray-400 hover:text-white"
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
                  className="hover:bg-white/10 text-gray-400 hover:text-white"
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
            <Heading level={4} size="base" weight="semibold" className="text-white mb-4">
              Quick Links
            </Heading>
            <Stack spacing="sm">
              <a href="#about" className="text-gray-400 hover:text-white transition-colors text-sm">
                About
              </a>
              <a
                href="#projects"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Projects
              </a>
              <a
                href="#skills"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Skills
              </a>
              <a
                href="#testimonials"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Testimonials
              </a>
              <a
                href="#contact"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Contact
              </a>
            </Stack>
          </div>

          {/* Services */}
          <div>
            <Heading level={4} size="base" weight="semibold" className="text-white mb-4">
              Services
            </Heading>
            <Stack spacing="sm">
              <Text className="text-gray-400 text-sm">Web Development</Text>
              <Text className="text-gray-400 text-sm">System Architecture</Text>
              <Text className="text-gray-400 text-sm">API Design</Text>
              <Text className="text-gray-400 text-sm">UI/UX Engineering</Text>
              <Text className="text-gray-400 text-sm">Technical Consulting</Text>
            </Stack>
          </div>

          {/* Contact Info */}
          <div>
            <Heading level={4} size="base" weight="semibold" className="text-white mb-4">
              Get In Touch
            </Heading>
            <Stack spacing="sm">
              <a
                href="mailto:saswata.career@gmail.com"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                saswata.career@gmail.com
              </a>
              <Text className="text-gray-400 text-sm">Remote Worldwide</Text>
              <Text className="text-gray-400 text-sm">Available 24/7</Text>
              <Button
                size="sm"
                variant="primary"
                tone="blue"
                className="mt-4 w-full"
                leftIcon={<Mail className="h-4 w-4" />}
                asChild
              >
                <a href="mailto:saswata.career@gmail.com">Email Me</a>
              </Button>
            </Stack>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Text className="text-gray-500 text-sm text-center md:text-left">
              © {currentYear} Saswata Pal. All rights reserved. Built with ❤️ using CodeCraft Labs.
            </Text>
            <div className="flex gap-6">
              <a
                href="/privacy"
                className="text-gray-500 hover:text-white transition-colors text-sm"
              >
                Privacy
              </a>
              <a href="/terms" className="text-gray-500 hover:text-white transition-colors text-sm">
                Terms
              </a>
              <a
                href="/sitemap"
                className="text-gray-500 hover:text-white transition-colors text-sm"
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
