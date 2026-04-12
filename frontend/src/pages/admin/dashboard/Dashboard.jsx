import { APP_NAME } from '@/config/appConfig'
import { useMeta } from '@/hooks/useMeta'
import { useChatbotSettings } from '../chatbot-settings/hooks/useChatbotSettings'
import ChartsRow from './components/ChartsRow'
import DashboardError from './components/DashboardError'
import DashboardLoading from './components/DashboardLoading'
import FAQWidget from './components/FAQWidget'
import LowConfidenceTable from './components/LowConfidenceTable'
import MetricsCards from './components/MetricsCards'
import RecentsTables from './components/RecentsTables'
import { useDashboardData } from './hooks/useDashboardData'

const Dashboard = () => {
  useMeta({
    title: `Dashboard | Admin | ${APP_NAME}`,
    description: `Overview of ${APP_NAME} admin metrics and statistics for quick insights.`,
  })

  const { data, isLoading, error } = useDashboardData()
  const { data: settings } = useChatbotSettings()
  console.log(settings?.high_threshold?.value)
  const highThreshold = settings?.high_threshold?.value ?? 0.6
  const lowThreshold = settings?.medium_threshold?.value ?? 0.35

  if (isLoading) return <DashboardLoading />
  if (error) return <DashboardError />

  const metrics = data?.metrics || {}
  const recentSuggestions = data?.recentSuggestions || []
  const recentQAActivity = data?.recentQAActivity || []
  const lowConfidenceQueries = data?.lowConfidenceQueries || []
  const chatActivity = data?.chatActivity || []
  const frequentlyAskedQuestions = data?.frequentlyAskedQuestions || []

  return (
    <div className='space-y-6 p-6'>
      {/* Header */}
      <div>
        <h2 className='text-3xl font-bold'>Dashboard</h2>
        <p className='text-muted-foreground'>
          Overview of your system activity and metrics
        </p>
      </div>

      <MetricsCards metrics={metrics} />

      <ChartsRow
        suggestionDistribution={metrics.suggestionDistribution}
        chatActivity={chatActivity}
      />

      <FAQWidget frequentlyAskedQuestions={frequentlyAskedQuestions} />

      <RecentsTables
        recentSuggestions={recentSuggestions}
        recentQAActivity={recentQAActivity}
      />

      <LowConfidenceTable
        lowConfidenceQueries={lowConfidenceQueries}
        highThreshold={highThreshold}
        lowThreshold={lowThreshold}
      />
    </div>
  )
}

export default Dashboard
