import { APP_NAME } from '@/config/appConfig'
import { useMeta } from '@/hooks/useMeta'
import { useEffect } from 'react'
import CTA from './components/CTA'
import FAQ from './components/FAQ'
import Features from './components/Features'
import Footer from './components/Footer'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import Navbar from './components/Navbar'
import Testimonials from './components/Testimonials'

const LandingPage = () => {
  useMeta({
    title: `${APP_NAME}`,
    description: `Ask school-related questions instantly with ${APP_NAME}. Get accurate, admin-verified answers about admissions, policies, schedules, and more.`,
  })

  useEffect(() => {
    // Override the html overflow: hidden for landing page only
    document.documentElement.style.overflow = 'auto'
    document.body.style.overflow = 'auto'

    return () => {
      // Restore on cleanup
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div className='bg-background text-foreground selection:bg-primary/30 min-h-screen'>
      <Navbar />
      <main>
        <Hero />

        <Features />

        <HowItWorks />

        <Testimonials />

        <FAQ />

        <CTA />
      </main>

      <Footer />
    </div>
  )
}

export default LandingPage
