import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageCircleQuestion } from 'lucide-react'

const FAQWidget = ({ frequentlyAskedQuestions = [] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
        <p className='text-muted-foreground text-sm'>
          Most common questions asked to the chatbot
        </p>
      </CardHeader>
      <CardContent>
        {frequentlyAskedQuestions.length > 0 ? (
          <ul className='space-y-3'>
            {frequentlyAskedQuestions.map((item, index) => (
              <li
                key={index}
                className='flex items-center justify-between gap-4'
              >
                <div className='flex min-w-0 items-center gap-3'>
                  <span className='text-muted-foreground w-5 shrink-0 text-right text-sm font-medium'>
                    {index + 1}.
                  </span>
                  <div className='flex min-w-0 items-start gap-2'>
                    <MessageCircleQuestion className='text-muted-foreground mt-0.5 h-4 w-4 shrink-0' />
                    <span className='truncate text-sm'>
                      {item.question.charAt(0).toUpperCase() +
                        item.question.slice(1) +
                        (item.question.endsWith('?') ? '' : '?')}
                    </span>
                  </div>
                </div>
                <span className='bg-primary/10 text-primary shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold'>
                  {item.count}x
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-muted-foreground text-center text-sm'>
            No data yet
          </p>
        )}
      </CardContent>
    </Card>
  )
}

export default FAQWidget
