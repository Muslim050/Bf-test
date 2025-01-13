import React from 'react'
import { TableHead } from '@/components/ui/table.jsx'

function OrderChartGeo({ statistic }) {
  const uniqueGenders = Array.from(
    new Set(statistic.geo_percentages.map((geo) => geo.country)),
  )

  return (
    <>
      {uniqueGenders.length > 0
        ? uniqueGenders.map((geo, index) => (
            <TableHead
              key={index}
              className="font-normal text-[#FFFFFF] text-sm text-center !rounded-t-none "
            >
              {geo}
            </TableHead>
          ))
        : null}
    </>
  )
}

export default OrderChartGeo
