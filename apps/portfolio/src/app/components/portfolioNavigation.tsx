import { Button, CompoundNavigation } from '@ccl/ui';
import { Github, Linkedin, Mail } from 'lucide-react';

export const PortfolioNavigation = () => {
  return (
    <CompoundNavigation
      variant="default"
      position="sticky"
      brand={{
        text: 'Saswata Pal',
        href: '/',
      }}
      items={[
        { label: 'Home', href: '/', active: true },
        { label: 'About', href: '#about' },
        { label: 'Projects', href: '#projects' },
        { label: 'Skills', href: '#skills' },
        { label: 'Testimonials', href: '#testimonials' },
        { label: 'Contact', href: '#contact' },
      ]}
      actions={
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-gray-100 text-gray-600 hover:text-gray-900"
            asChild
          >
            <a
              href="https://github.com/saswatawork"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-gray-100 text-gray-600 hover:text-gray-900"
            asChild
          >
            <a
              href="https://linkedin.com/in/saswata-pal"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </Button>
          <div className="h-6 w-px bg-gray-300" />
          <Button
            size="sm"
            variant="primary"
            tone="blue"
            className="shadow-md font-semibold px-5"
            leftIcon={<Mail className="h-3.5 w-3.5" />}
            asChild
          >
            <a href="#contact">Hire Me</a>
          </Button>
        </div>
      }
    />
  );
};
