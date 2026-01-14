// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const FAQ = () => {
  const faqs = [
    {
      question: 'Do I need to create an account?',
      answer:
        'No! You can start asking questions immediately without any signup or registration.',
    },
    {
      question: 'How accurate are the answers?',
      answer:
        'All information is added and verified by school administrators, ensuring accuracy and reliability.',
    },
    {
      question: 'What can I ask about?',
      answer:
        'You can ask about admissions, academic policies, schedules, campus facilities, and more—anything the admin team has added to the knowledge base.',
    },
    {
      question: 'Is my conversation private?',
      answer:
        'Your conversations are private. Data is securely stored and accessible only to authorized administrators for quality and accuracy.',
    },
  ]

  return (
    <section className='py-24'>
      <div className='mx-auto max-w-7xl px-6'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='mb-16 text-center'
        >
          <h2 className='mb-4 text-4xl font-bold'>
            Frequently Asked Questions
          </h2>
          <p className='text-muted-foreground text-xl'>
            Everything you need to know
          </p>
        </motion.div>

        <div className='mx-auto max-w-3xl space-y-6'>
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='bg-card border-border rounded-lg border p-6'
            >
              <h3 className='mb-3 flex items-start gap-2 text-xl font-semibold'>
                <Check className='text-primary h-6 w-6 shrink-0' />
                {faq.question}
              </h3>
              <p className='text-muted-foreground pl-8'>{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
