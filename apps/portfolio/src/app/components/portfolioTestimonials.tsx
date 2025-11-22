import { Badge, Heading, Section, Stack, TestimonialCard, Text } from '@ccl/ui';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CTO, TechStart Inc',
    quote:
      'Saswata transformed our legacy system into a modern, scalable platform. His technical expertise and project leadership were exceptional.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Product Manager, DataCorp',
    quote:
      'Working with Saswata was a game-changer. He delivered our analytics platform ahead of schedule and exceeded all performance benchmarks.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Founder, GreenTech Solutions',
    quote:
      'Incredible attention to detail and deep understanding of both technical and business requirements. Highly recommend!',
    rating: 5,
  },
];

export const PortfolioTestimonials = () => {
  return (
    <Section variant="light" spacing="2xl">
      <Stack spacing="2xl">
        <Stack spacing="md" align="center">
          <Badge variant="soft" tone="purple" className="text-sm">
            Testimonials
          </Badge>
          <Heading
            level={2}
            align="center"
            weight="extrabold"
            className="text-3xl md:text-4xl lg:text-5xl"
          >
            Client Success Stories
          </Heading>
          <Text size="xl" className="text-gray-600 dark:text-gray-300 max-w-2xl" align="center">
            What clients say about working with me
          </Text>
        </Stack>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pt-4">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.name}
              quote={testimonial.quote}
              name={testimonial.name}
              role={testimonial.role}
              rating={testimonial.rating}
            />
          ))}
        </div>
      </Stack>
    </Section>
  );
};
