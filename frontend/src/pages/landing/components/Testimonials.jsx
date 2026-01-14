// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Person 1',
      role: 'Incoming Student',
      text: 'I got all my admission questions answered in minutes! So much easier than calling the office.',
    },
    {
      name: 'Person 2',
      role: 'Parent',
      text: 'As a parent, I appreciate getting accurate information about school policies instantly.',
    },
    {
      name: 'Person 3',
      role: 'Current Student',
      text: 'Perfect for checking class schedules and deadlines. Saves me so much time!',
    },
  ]

  return (
    <section className='bg-muted/30 py-24'>
      <div className='mx-auto max-w-7xl px-6'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='mb-16 text-center'
        >
          <h2 className='mb-4 text-4xl font-bold'>
            What Students & Parents Say
          </h2>
          <p className='text-muted-foreground text-xl'>
            Real experiences from our community
          </p>
        </motion.div>

        <div className='grid gap-8 md:grid-cols-3'>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='bg-card border-border rounded-lg border p-6'
            >
              <div className='mb-4 flex items-center gap-1'>
                {[...Array(5)].map((_, i) => (
                  <motion.svg
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.1 + i * 0.05,
                      type: 'spring',
                    }}
                    className='fill-primary h-5 w-5'
                    viewBox='0 0 20 20'
                  >
                    <path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
                  </motion.svg>
                ))}
              </div>
              <p className='text-muted-foreground mb-4 italic'>
                "{testimonial.text}"
              </p>
              <div>
                <p className='font-semibold'>{testimonial.name}</p>
                <p className='text-muted-foreground text-sm'>
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
