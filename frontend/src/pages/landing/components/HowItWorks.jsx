import { APP_NAME } from '@/config/appConfig'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import {
  Cpu,
  Layers,
  MessageCircle,
  Search,
  Sparkles,
  User,
} from 'lucide-react'

const HowItWorks = () => {
  const steps = [
    {
      title: 'Ask',
      desc: 'Type or speak your question',
      icon: <MessageCircle className='h-6 w-6' />,
    },
    {
      title: 'Search',
      desc: 'AI searches the school’s knowledge base',
      icon: <Search className='h-6 w-6' />,
    },
    {
      title: 'Retrieve',
      desc: 'Find relevant context',
      icon: <Layers className='h-6 w-6' />,
    },
    {
      title: 'Answer',
      desc: 'Get accurate response',
      icon: <Sparkles className='h-6 w-6' />,
    },
  ]

  return (
    <section
      id='how-it-works'
      className='relative scroll-mt-20 overflow-hidden py-24'
    >
      <div className='bg-primary/5 absolute inset-0 origin-top-left scale-110 -skew-y-3 transform'></div>

      <div className='relative z-10 mx-auto max-w-7xl px-6'>
        <div className='flex flex-col items-center gap-16 lg:flex-row'>
          <div className='lg:w-1/2'>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className='mb-8 text-3xl font-bold md:text-5xl'
            >
              How RAG Works <br />
              <span className='text-primary'>Under the Hood</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className='text-muted-foreground mb-8 text-lg'
            >
              Traditional LLMs hallucinate. {APP_NAME} grounds every answer in
              your specific school data. We index your content into a vector
              space, allowing us to retrieve the exact facts needed to answer a
              query.
            </motion.p>

            <div className='space-y-6'>
              {steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className='group flex items-center gap-4'
                >
                  <div className='bg-muted border-border text-primary group-hover:bg-primary group-hover:text-primary-foreground flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 group-hover:scale-110'>
                    {step.icon}
                  </div>
                  <div>
                    <h4 className='font-bold'>{step.title}</h4>
                    <p className='text-muted-foreground text-sm'>{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className='bg-muted/50 border-border mt-10 rounded-xl border p-6'
            >
              <div className='flex items-start gap-3'>
                <Cpu className='text-primary mt-1 h-6 w-6 shrink-0' />
                <div>
                  <h4 className='mb-2 font-semibold'>
                    Behind the Scenes: RAG Technology
                  </h4>
                  <p className='text-muted-foreground text-sm'>
                    {APP_NAME} uses Retrieval-Augmented Generation (RAG) with
                    vector databases to ensure every answer is grounded in
                    verified information.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='w-full lg:w-1/2'
          >
            <div className='bg-card border-border relative overflow-hidden rounded-2xl border px-6 py-15 shadow-2xl'>
              <div className='bg-primary/20 absolute -top-10 -right-10 h-32 w-32 rounded-full blur-[60px]' />

              {/* Chat Demo - Styled like actual chat */}
              <div className='space-y-4'>
                {/* User Message */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className='flex justify-end'
                >
                  <div className='flex flex-row-reverse gap-2'>
                    <div className='border-background flex h-10 w-10 items-center justify-center rounded-full border-2 bg-blue-500 shadow-xl'>
                      <User className='h-5 w-5 text-white' />
                    </div>
                    <div className='max-w-50 rounded-lg bg-blue-500 p-3 text-sm text-white shadow-lg md:max-w-md lg:max-w-2xs'>
                      What is the school's vision?
                    </div>
                  </div>
                </motion.div>

                {/* Bot Response */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className='flex justify-start'
                >
                  <div className='flex gap-2'>
                    <div className='border-background flex h-10 w-10 items-center justify-center rounded-full border-2 bg-gray-100 shadow-xl'>
                      <Sparkles className='h-5 w-5 text-black' />
                    </div>
                    <div className='max-w-50 rounded-lg bg-gray-200 p-3 text-sm text-black shadow-lg md:max-w-md lg:max-w-2xs'>
                      <p className='mb-2'>
                        The school's vision is to produce globally competent
                        professionals, internationally recognized in
                        instruction, research, training and extension service.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
