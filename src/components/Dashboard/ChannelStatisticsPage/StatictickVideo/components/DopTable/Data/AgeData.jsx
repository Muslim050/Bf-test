import { TableCell } from '@/components/ui/table'

function AgeData({ statistic }) {
  return (
    <>
      {statistic.age_group_percentages.map((age, index) => (
        <>
          <TableCell
            key={index}
            style={{
              textAlign: 'center',
            }}
          >
            {age.percentage}%
          </TableCell>
        </>
      ))}
    </>
  )
}

export default AgeData
