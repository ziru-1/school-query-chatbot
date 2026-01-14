import { Button } from '@/components/ui/button'
import { Link } from 'react-router'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

const Hero = () => {
  return (
    <section className='relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32'>
      {/* Background Glows */}
      <div className='bg-primary/20 pointer-events-none absolute top-0 left-1/4 h-96 w-96 rounded-full blur-[128px]' />
      <div className='bg-primary/10 pointer-events-none absolute right-1/4 bottom-0 h-96 w-96 rounded-full blur-[128px]' />

      <div className='mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2'>
        <div className='relative z-10'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='bg-primary/10 border-primary/20 text-primary mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium'
          >
            <span className='relative flex h-2 w-2'>
              <span className='bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75'></span>
              <span className='bg-primary relative inline-flex h-2 w-2 rounded-full'></span>
            </span>
            No Signup Required
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className='mb-6 text-5xl leading-[1.1] font-bold tracking-tight lg:text-7xl'
          >
            School Questions. Clear Answers.{' '}
            <span className='from-primary to-primary/70 bg-linear-to-r bg-clip-text text-transparent'>
              Instantly.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='text-muted-foreground mb-8 max-w-lg text-lg leading-relaxed'
          >
            Get accurate, admin-verified answers about admissions, policies,
            schedules, and more. Powered by Retrieval-Augmented Generation (RAG)
            with vector search for up-to-date answers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className='flex flex-col gap-4 sm:flex-row'
          >
            <Link to='/chat'>
              <Button
                size='lg'
                className='shadow-primary/20 gap-2 px-8 py-6 text-base shadow-lg'
              >
                Start Asking Now
                <ChevronRight className='h-4 w-4' />
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='relative'
        >
          <div className='border-border bg-background relative aspect-4/3 overflow-hidden rounded-2xl border shadow-2xl'>
            {/* Replace with your actual hero image */}
            <img
              src='/path-to-your-hero-image.png'
              alt='Student asking Vivy AI a school-related question'
              className='h-full w-full object-cover'
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
