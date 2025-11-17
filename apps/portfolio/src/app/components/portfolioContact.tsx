import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Container,
  SectionHeading,
} from '@ccl/ui';
import { Calendar, Download, Linkedin, Mail, MapPin } from 'lucide-react';

export const PortfolioContact = () => {
  return (
    <section
      id="contact"
      className="py-12 md:py-16 lg:py-20 bg-linear-to-br from-gray-900 to-blue-900 text-white"
    >
      <Container>
        <SectionHeading
          eyebrow={<Badge className="bg-white/20 text-white border-white/30">Let's Connect</Badge>}
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
  );
};
