import { Button, CompoundNavigation } from '@ccl/ui';
import { Github, Linkedin } from 'lucide-react';

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
  );
};
