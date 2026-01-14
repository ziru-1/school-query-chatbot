import { Button } from '@/components/ui/button'
import { Link } from 'react-router'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

const CTA = () => {
  return (
    <section className='relative'>
      <div className='mx-auto max-w-full text-center'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='from-primary/10 to-primary/5 border-primary/20 relative overflow-hidden border bg-linear-to-b p-12'
        >
          <div
            className='absolute top-0 left-0 h-full w-full opacity-10'
            style={{
              backgroundImage:
                'radial-gradient(circle, currentColor 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />

          <h2 className='relative z-10 mb-6 text-4xl font-bold md:text-5xl'>
            Ready to Get Your Answers?
          </h2>
          <p className='text-muted-foreground relative z-10 mx-auto mb-8 max-w-2xl text-lg'>
            Join hundreds of students and parents getting instant, accurate
            answers about your school.
          </p>

          <div className='relative z-10 flex flex-col justify-center gap-4 sm:flex-row'>
            <Link to='/chat'>
              <Button size='lg' className='gap-2 px-8 py-6 text-lg'>
                Start Asking Now
                <ChevronRight className='h-5 w-5' />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTA
