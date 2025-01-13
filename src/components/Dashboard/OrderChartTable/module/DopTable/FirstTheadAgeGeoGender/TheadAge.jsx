import React from 'react'
import { TableHead } from '@/components/ui/table.jsx'

function OrderChartAge({ statistic, getOrder }) {
  const uniqueGenders = Array.from(
    new Set(statistic.age_group_percentages.map((age) => age.age_group)),
  )

  return (
    <>
      {uniqueGenders.length > 0
        ? uniqueGenders.map((genderData, index) => (
            <TableHead
              key={index}
              className="font-normal text-[#FFFFFF] text-sm text-center !rounded-lg"
            >
              {genderData.substring(3)}
            </TableHead>
          ))
        : null}
    </>
  )
}

export default OrderChartAge
