import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, MessageCircle, TrendingDown, Users } from 'lucide-react'

const MetricsCards = ({ metrics }) => {
  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
      {/* Total QA Pairs */}
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Total QA Pairs</CardTitle>
          <FileText className='text-muted-foreground h-4 w-4' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{metrics.totalQAPairs}</div>
          <p className='text-muted-foreground text-xs'>
            Knowledge base entries
          </p>
        </CardContent>
      </Card>

      {/* Pending Suggestions */}
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            Pending Suggestions
          </CardTitle>
          <MessageCircle className='text-muted-foreground h-4 w-4' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{metrics.pendingSuggestions}</div>
          <p className='text-muted-foreground text-xs'>Awaiting review</p>
        </CardContent>
      </Card>

      {/* Total Chats */}
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Total Queries</CardTitle>
          <Users className='text-muted-foreground h-4 w-4' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{metrics.totalChatsAllTime}</div>
          <p className='text-muted-foreground text-xs'>
            {metrics.totalChatsLast30Days} in last 30 days
          </p>
        </CardContent>
      </Card>

      {/* Average Confidence */}
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Avg Confidence</CardTitle>
          <TrendingDown className='text-muted-foreground h-4 w-4' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>
            {(metrics.avgConfidenceLast30Days * 100).toFixed(1)}%
          </div>
          <p className='text-muted-foreground text-xs'>
            Last 30 days (All time:{' '}
            {(metrics.avgConfidenceAllTime * 100).toFixed(1)}%)
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default MetricsCards
