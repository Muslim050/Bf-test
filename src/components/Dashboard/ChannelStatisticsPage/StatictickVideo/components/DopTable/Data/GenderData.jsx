import { TableCell } from '@/components/ui/table'

function GenderData({ statistic }) {
  return (
    <>
      {statistic.gender_percentages.map((gender, index) => (
        <>
          <TableCell
            key={gender.percentage}
            style={{
              textAlign: 'center',
            }}
          >
            {gender.percentage}%
          </TableCell>
        </>
      ))}
    </>
  )
}

export default GenderData
