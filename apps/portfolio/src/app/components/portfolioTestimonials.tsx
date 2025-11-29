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
    <Section id="testimonials" variant="gradient-light" spacing="2xl" width="comfortable">
      <Stack spacing="2xl">
        <Stack spacing="xl" align="center">
          <Badge
            variant="soft"
            tone="purple"
            className="text-base md:text-lg font-semibold px-6 py-3 shadow-sm"
          >
            Testimonials
          </Badge>
          <Heading
            level={2}
            align="center"
            weight="extrabold"
            className="text-4xl md:text-5xl lg:text-6xl tracking-tight"
          >
            Client Success Stories
          </Heading>
          <Text
            size="xl"
            className="text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed text-lg md:text-xl"
            align="center"
          >
            What clients say about working with me
          </Text>
        </Stack>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 pt-12">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
            >
              <TestimonialCard
                quote={testimonial.quote}
                name={testimonial.name}
                role={testimonial.role}
                rating={testimonial.rating}
              />
            </div>
          ))}
        </div>
      </Stack>
    </Section>
  );
};
