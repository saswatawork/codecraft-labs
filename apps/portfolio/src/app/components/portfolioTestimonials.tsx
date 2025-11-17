import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CompoundAvatar,
  Container,
  SectionHeading,
} from '@ccl/ui';
import { Star } from 'lucide-react';

export const PortfolioTestimonials = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <Container>
        <SectionHeading
          eyebrow={
            <Badge className="bg-purple-100 text-purple-800 border-purple-200">Testimonials</Badge>
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
  );
};
