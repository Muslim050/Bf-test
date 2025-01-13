import React from 'react'
import { TableCell } from '@/components/ui/table.jsx'

function GenderData({ statistic }) {
  const uniqueGenders = statistic.gender_percentages
  return (
    <>
      {uniqueGenders.length > 0
        ? uniqueGenders.map((gender, index) => (
            <>
              <TableCell
                key={`gender-${index}`}
                data-label="Пол"
                className="font-normal text-[#FFFFFF] text-sm text-center"
              >
                {gender.percentage}%
              </TableCell>
            </>
          ))
        : null}
    </>
  )
}

export default GenderData
