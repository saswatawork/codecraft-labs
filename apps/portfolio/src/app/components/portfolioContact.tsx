import { Badge, Button, ContactCard, Heading, Section, Stack, Text } from '@ccl/ui';
import { Calendar, Download, Linkedin, Mail, MapPin } from 'lucide-react';

export const PortfolioContact = () => {
  return (
    <Section id="contact" variant="gradient-dark" spacing="3xl" width="comfortable">
      <Stack spacing="2xl">
        <Stack spacing="xl" align="center">
          <Badge
            variant="soft"
            tone="blue"
            className="text-base font-medium px-4 py-2 bg-blue-500/20 text-blue-200 border-blue-400/30"
          >
            Let's Connect
          </Badge>
          <Heading level={2} align="center" weight="extrabold" className="text-white">
            Ready to Start Your Project?
          </Heading>
          <Text size="xl" align="center" className="text-gray-200 max-w-3xl mx-auto leading-loose">
            I'm always excited to tackle challenging problems and create impactful solutions. Let's
            discuss how I can help bring your vision to life.
          </Text>
        </Stack>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 pt-8">
          <ContactCard
            icon={<Mail className="h-8 w-8" />}
            title="Email"
            description="Drop me a line"
            action={{
              label: 'Send Email',
              href: 'mailto:saswata.career@gmail.com',
            }}
            tone="blue"
            className="bg-white/10 backdrop-blur-sm border-white/30 hover:bg-white/20 hover:border-white/40 text-white transition-all"
          />

          <ContactCard
            icon={<Calendar className="h-8 w-8" />}
            title="Schedule Call"
            description="Book a meeting"
            action={{
              label: 'Book Now',
              href: 'https://cal.com',
            }}
            tone="green"
            className="bg-white/10 backdrop-blur-sm border-white/30 hover:bg-white/20 hover:border-white/40 text-white transition-all"
          />

          <ContactCard
            icon={<Linkedin className="h-8 w-8" />}
            title="LinkedIn"
            description="Professional network"
            action={{
              label: 'Connect',
              href: 'https://linkedin.com/in/saswata-pal',
            }}
            tone="blue"
            className="bg-white/10 backdrop-blur-sm border-white/30 hover:bg-white/20 hover:border-white/40 text-white transition-all"
          />

          <div className="p-6 rounded-lg border border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white/40 transition-all">
            <Stack spacing="md" align="center">
              <div className="h-12 w-12 rounded-lg bg-purple-500/30 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-purple-200" />
              </div>
              <Stack spacing="xs" align="center">
                <Heading
                  level={3}
                  size="lg"
                  weight="semibold"
                  align="center"
                  className="text-white"
                >
                  Location
                </Heading>
                <Text size="sm" align="center" className="text-gray-200">
                  Remote worldwide
                </Text>
              </Stack>
              <Text size="sm" weight="semibold" className="text-green-300">
                Available 24/7
              </Text>
            </Stack>
          </div>
        </div>

        <Stack spacing="lg" align="center">
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              size="lg"
              variant="primary"
              leftIcon={<Mail className="h-5 w-5" />}
              className="text-base font-semibold px-8 py-6"
              asChild
            >
              <a href="mailto:saswata.career@gmail.com">Start a Project</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              leftIcon={<Download className="h-5 w-5" />}
              className="border-white/40 text-white hover:bg-white hover:text-gray-900 hover:border-white text-base font-semibold px-8 py-6 transition-all"
              asChild
            >
              <a href="/resume.pdf">Download Resume</a>
            </Button>
          </div>
          <Text size="base" className="text-gray-300">
            Response time: Usually within 24 hours
          </Text>
        </Stack>
      </Stack>
    </Section>
  );
};
