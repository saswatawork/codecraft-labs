import { Badge, Button, Card, ContactCard, Heading, Section, Stack, Text } from '@ccl/ui';
import { Calendar, Download, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

export const PortfolioContact = () => {
  return (
    <Section id="contact" variant="gradient-purple" spacing="2xl" width="comfortable">
      <Stack spacing="2xl">
        {/* Header */}
        <Stack spacing="xl" align="center" className="max-w-4xl mx-auto">
          <Badge
            variant="soft"
            tone="purple"
            className="text-base md:text-lg font-semibold px-6 py-3 shadow-lg"
          >
            Let's Connect
          </Badge>
          <Heading
            level={2}
            align="center"
            weight="extrabold"
            className="text-white text-4xl md:text-5xl lg:text-6xl tracking-tight"
          >
            Ready to Start Your Next Project?
          </Heading>
          <Text
            size="xl"
            align="center"
            className="text-white/90 leading-relaxed text-lg md:text-xl"
          >
            I'm always excited to tackle challenging problems and create impactful solutions. Let's
            discuss how I can help bring your vision to life.
          </Text>
        </Stack>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
          <div className="hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
            <ContactCard
              icon={<Mail className="h-8 w-8" />}
              title="Email"
              description="Drop me a line"
              action={{
                label: 'Send Email',
                href: 'mailto:saswata.career@gmail.com',
              }}
              tone="blue"
              variant="elevated"
            />
          </div>

          <div className="hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
            <ContactCard
              icon={<Calendar className="h-8 w-8" />}
              title="Schedule Call"
              description="Book a meeting"
              action={{
                label: 'Book Now',
                href: 'https://cal.com',
              }}
              tone="green"
              variant="elevated"
            />
          </div>

          <div className="hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
            <ContactCard
              icon={<Linkedin className="h-8 w-8" />}
              title="LinkedIn"
              description="Connect with me"
              action={{
                label: 'Connect',
                href: 'https://linkedin.com/in/saswata-pal',
              }}
              tone="blue"
              variant="elevated"
            />
          </div>

          <div className="hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
            <ContactCard
              icon={<MapPin className="h-8 w-8" />}
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
        </div>

        {/* CTA Buttons */}
        <Stack spacing="lg" align="center" className="pt-12">
          <div className="flex flex-col sm:flex-row gap-5">
            <Button
              size="lg"
              variant="primary"
              tone="blue"
              leftIcon={<Mail className="h-5 w-5" />}
              className="text-lg font-semibold px-12 py-7 shadow-2xl hover:shadow-blue-500/50 hover:scale-[1.02] transition-all bg-white text-blue-600 hover:bg-white/95"
              asChild
            >
              <a href="mailto:saswata.career@gmail.com">Start a Project</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              leftIcon={<Download className="h-5 w-5" />}
              className="text-lg font-semibold px-10 py-7 border-2 border-white/30 text-white hover:bg-white/10 hover:scale-[1.02] transition-all"
              asChild
            >
              <a href="/resume.pdf">Download Resume</a>
            </Button>
          </div>
          <Text size="base" className="text-white/80 text-lg">
            Response time: Usually within 24 hours
          </Text>
        </Stack>
      </Stack>
    </Section>
  );
};
