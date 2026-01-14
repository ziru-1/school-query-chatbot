import Logo from '@/components/ui/Logo'
import { Link } from 'react-router'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <footer className='border-border border-t pt-16 pb-8'>
      <div className='mx-auto max-w-7xl px-6'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='mb-12 grid grid-cols-2 gap-8 md:grid-cols-4'
        >
          <div>
            <div className='mb-6 flex items-center gap-2'>
              <Logo />
              <span className='text-lg font-bold'>Vivy AI</span>
            </div>
            <p className='text-muted-foreground text-sm'>
              AI answers schools can trust.
            </p>
          </div>

          <div>
            <h4 className='mb-4 font-bold'>Product</h4>
            <ul className='text-muted-foreground space-y-2 text-sm'>
              <li>AI Chat for Schools</li>
              <li>Admin-Verified Knowledge Base</li>
              <li>RAG + Vector Search</li>
            </ul>
          </div>

          <div>
            <h4 className='mb-4 font-bold'>Trust</h4>
            <ul className='text-muted-foreground space-y-2 text-sm'>
              <li>Admin-Verified Content</li>
              <li>No Signup Required</li>
              <li>Privacy-First Design</li>
            </ul>
          </div>

          <div>
            <h4 className='mb-4 font-bold'>Access</h4>
            <ul className='text-muted-foreground space-y-2 text-sm'>
              <li>
                <Link
                  to='/login'
                  className='hover:text-foreground transition-colors'
                >
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='border-border flex flex-col items-center gap-4 border-t pt-6 md:flex-row md:justify-between'
        >
          <p className='text-muted-foreground text-sm'>
            © 2025 Vivy AI. Built for schools.
          </p>

          <p className='text-muted-foreground text-xs'>
            Powered by Retrieval-Augmented Generation and verified school data
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
