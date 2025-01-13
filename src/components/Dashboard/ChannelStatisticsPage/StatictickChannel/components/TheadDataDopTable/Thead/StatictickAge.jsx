import { TableCell } from '@/components/ui/table'

function StatictickAge({ dataChannel }) {
  const uniqueGenders = Array.from(
    new Set(dataChannel?.age_group_percentages?.map((age) => age.age_group)),
  )
  return (
    <>
      {uniqueGenders.map((gender, index) => (
        <TableCell key={gender} className="text-center">
          {gender.substring(3)}
        </TableCell>
      ))}
    </>
  )
}

export default StatictickAge
