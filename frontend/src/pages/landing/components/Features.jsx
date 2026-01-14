// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { Brain, Shield, Zap } from 'lucide-react'

const Features = () => {
  const features = [
    {
      icon: <Zap className='h-6 w-6' />,
      title: 'Instant Answers',
      description:
        'Get accurate responses to your questions immediately—no signup required.',
    },
    {
      icon: <Shield className='h-6 w-6' />,
      title: 'Admin-Verified',
      description:
        'All information is curated and approved by school administrators for accuracy.',
    },
    {
      icon: <Brain className='h-6 w-6' />,
      title: 'RAG-Powered AI',
      description:
        'Uses Retrieval-Augmented Generation with vector search to produce accurate, source-based answers.',
    },
  ]

  return (
    <section id='features' className='bg-muted/30 scroll-mt-20 py-24'>
      <div className='mx-auto max-w-7xl px-6'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='mx-auto mb-16 max-w-3xl text-center'
        >
          <h2 className='mb-6 text-3xl font-bold md:text-5xl'>
            Powered by Next-Gen Tech
          </h2>
          <p className='text-muted-foreground text-lg'>
            We use Retrieval-Augmented Generation (RAG) and a high-performance
            vector database to ground every response in verified school data so
            answers are accurate, not made up.
          </p>
        </motion.div>

        <div className='grid gap-8 md:grid-cols-3'>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='group bg-card border-border hover:border-primary/50 relative overflow-hidden rounded-2xl border p-8 transition-all duration-300 hover:shadow-lg'
            >
              <div className='from-primary/5 pointer-events-none absolute inset-0 bg-linear-to-b to-transparent opacity-0 transition-opacity group-hover:opacity-100' />

              <div className='relative z-10'>
                <div className='bg-primary/10 text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-lg'>
                  {feature.icon}
                </div>

                <h3 className='mb-3 text-xl font-bold'>{feature.title}</h3>
                <p className='text-muted-foreground leading-relaxed'>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
