import React from 'react'
import { TableCell } from '@/components/ui/table.jsx'

function AgeData({ statistic }) {
  const uniqueAge = statistic.age_group_percentages
  return (
    <>
      {uniqueAge.length > 0
        ? uniqueAge.map((age, index) => (
            <TableCell
              key={`age-${index}`}
              data-label="Возраст"
              className="font-normal text-[#FFFFFF] text-sm text-center"
            >
              {age.percentage}%
            </TableCell>
          ))
        : null}
    </>
  )
}

export default AgeData
