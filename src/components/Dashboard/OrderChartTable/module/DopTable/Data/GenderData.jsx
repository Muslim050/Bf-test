import React from 'react'
import {TableCell} from '@/components/ui/table.jsx'

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
        : <TableCell
          data-label="Возраст"
          className="font-normal text-orange-600 text-sm text-center"
        >
          Введется аналитика...
        </TableCell>}
    </>
  )
}

export default GenderData
