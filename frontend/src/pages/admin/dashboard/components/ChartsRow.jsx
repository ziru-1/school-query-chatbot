import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const ChartsRow = ({ suggestionDistribution, chatActivity }) => {
  const suggestionChartData = [
    {
      name: 'Pending',
      value: suggestionDistribution?.pending || 0,
      color: '#f59e0b',
    },
    {
      name: 'Accepted',
      value: suggestionDistribution?.accepted || 0,
      color: '#10b981',
    },
    {
      name: 'Rejected',
      value: suggestionDistribution?.rejected || 0,
      color: '#ef4444',
    },
  ]

  const chartData = chatActivity.map((item) => ({
    date: new Date(item.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
    count: item.count,
  }))

  return (
    <div className='grid gap-4 md:grid-cols-2'>
      {/* Chat Activity Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Chat Activity</CardTitle>
          <p className='text-muted-foreground text-sm'>
            Daily query volume in last 30 days
          </p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='date' />
              <YAxis />
              <Tooltip />
              <Bar dataKey='count' fill='#3b82f6' />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Suggestion Distribution Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Suggestion Status</CardTitle>
          <p className='text-muted-foreground text-sm'>
            Distribution of suggestion statuses
          </p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width='100%' height={300}>
            <PieChart>
              <Pie
                data={suggestionChartData}
                cx='50%'
                cy='50%'
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill='#8884d8'
                dataKey='value'
              >
                {suggestionChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default ChartsRow
