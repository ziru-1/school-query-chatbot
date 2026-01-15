import ActionBadge from '@/components/badges/ActionBadge'
import StatusBadge from '@/components/badges/StatusBadge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const RecentsTables = ({ recentSuggestions, recentQAActivity }) => {
  return (
    <div className='grid gap-4 md:grid-cols-2'>
      {/* Recent Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Suggestions</CardTitle>
          <p className='text-muted-foreground text-sm'>
            Latest user suggestions
          </p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Question</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className='text-right'>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentSuggestions.length > 0 ? (
                recentSuggestions.map((suggestion) => (
                  <TableRow key={suggestion.id}>
                    <TableCell className='max-w-[200px] truncate font-medium'>
                      {suggestion.question}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={suggestion.status} />
                    </TableCell>
                    <TableCell className='text-right text-sm'>
                      {new Date(suggestion.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className='text-center'>
                    No suggestions yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent QA Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent QA Activity</CardTitle>
          <p className='text-muted-foreground text-sm'>
            Latest changes to QA pairs
          </p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Question</TableHead>
                <TableHead className='text-right'>Admin</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentQAActivity.length > 0 ? (
                recentQAActivity.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>
                      <ActionBadge action={activity.action_type} />
                    </TableCell>
                    <TableCell className='max-w-[150px] truncate'>
                      {activity.action_type === 'delete'
                        ? activity.old_question || '-'
                        : activity.new_question || '-'}
                    </TableCell>
                    <TableCell className='text-right text-sm'>
                      {activity.admin_name}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className='text-center'>
                    No activity yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default RecentsTables
