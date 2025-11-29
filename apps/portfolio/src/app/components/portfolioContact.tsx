import { Badge, Button, Card, ContactCard, Heading, Section, Stack, Text } from '@ccl/ui';
import { Calendar, Download, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

export const PortfolioContact = () => {
  return (
    <Section id="contact" variant="gradient-light" spacing="2xl" width="comfortable">
      <Stack spacing="2xl">
        {/* Header */}
        <Stack spacing="lg" align="center" className="max-w-3xl mx-auto">
          <Badge variant="soft" tone="purple" className="text-base font-medium px-5 py-2.5">
            Let's Connect
          </Badge>
          <Heading level={2} align="center" weight="extrabold" className="text-gray-900">
            Ready to Start Your Next Project?
          </Heading>
          <Text size="xl" align="center" className="text-gray-600 leading-relaxed">
            I'm always excited to tackle challenging problems and create impactful solutions. Let's
            discuss how I can help bring your vision to life.
          </Text>
        </Stack>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          <ContactCard
            icon={<Mail className="h-7 w-7" />}
            title="Email"
            description="Drop me a line"
            action={{
              label: 'Send Email',
              href: 'mailto:saswata.career@gmail.com',
            }}
            tone="blue"
            variant="elevated"
          />

          <ContactCard
            icon={<Calendar className="h-7 w-7" />}
            title="Schedule Call"
            description="Book a meeting"
            action={{
              label: 'Book Now',
              href: 'https://cal.com',
            }}
            tone="green"
            variant="elevated"
          />

          <ContactCard
            icon={<Linkedin className="h-7 w-7" />}
            title="LinkedIn"
            description="Connect with me"
            action={{
              label: 'Connect',
              href: 'https://linkedin.com/in/saswata-pal',
            }}
            tone="blue"
            variant="elevated"
          />

          <ContactCard
            icon={<MapPin className="h-7 w-7" />}
            title="Location"
            description="Remote worldwide"
            action={{
              label: 'Available 24/7',
              href: '#',
            }}
            tone="purple"
            variant="elevated"
          />
        </div>

        {/* CTA Buttons */}
        <Stack spacing="lg" align="center" className="pt-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              variant="primary"
              tone="blue"
              leftIcon={<Mail className="h-5 w-5" />}
              className="text-base font-semibold px-10 py-6 shadow-xl"
              asChild
            >
              <a href="mailto:saswata.career@gmail.com">Start a Project</a>
            </Button>
            <Button
              size="lg"
              variant="outline-primary"
              leftIcon={<Download className="h-5 w-5" />}
              className="text-base font-semibold px-8 py-6"
              asChild
            >
              <a href="/resume.pdf">Download Resume</a>
            </Button>
          </div>
          <Text size="base" className="text-gray-600">
            Response time: Usually within 24 hours
          </Text>
        </Stack>
      </Stack>
    </Section>
  );
};
