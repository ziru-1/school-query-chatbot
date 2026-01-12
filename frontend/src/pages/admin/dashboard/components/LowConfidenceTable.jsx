import ConfidenceBadge from '@/components/badges/ConfidenceBadge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const LowConfidenceTable = ({ lowConfidenceQueries }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Low Confidence Queries</CardTitle>
        <p className='text-muted-foreground text-sm'>
          Queries with confidence score below 55% (high threshold) - may need
          new QA pairs
        </p>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User Query</TableHead>
              <TableHead>Matched Question</TableHead>
              <TableHead className='text-center'>Confidence</TableHead>
              <TableHead className='text-right'>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lowConfidenceQueries.length > 0 ? (
              lowConfidenceQueries.map((query) => (
                <TableRow key={query.id}>
                  <TableCell className='max-w-[200px] truncate'>
                    {query.user_query}
                  </TableCell>
                  <TableCell className='max-w-[200px] truncate text-sm'>
                    {query.matched_question || '-'}
                  </TableCell>
                  <TableCell className='text-center'>
                    <ConfidenceBadge confidence={query.confidence} />
                  </TableCell>
                  <TableCell className='text-right text-sm'>
                    {query.created_at
                      ? new Date(query.created_at).toLocaleDateString()
                      : '-'}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className='text-center'>
                  No low confidence queries
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default LowConfidenceTable
