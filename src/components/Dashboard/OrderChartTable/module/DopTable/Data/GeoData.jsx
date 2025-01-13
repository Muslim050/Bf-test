import React from 'react'
import { TableCell } from '@/components/ui/table.jsx'

function GeoData({ statistic }) {
  const uniqueGeo = statistic.geo_percentages

  return (
    <>
      {uniqueGeo.length > 0
        ? uniqueGeo.map((geo, index) => (
            <>
              <TableCell
                key={`geo-${index}`}
                data-label="Гео"
                className="font-normal text-[#FFFFFF] text-sm text-center"
              >
                {geo.percentage}%
              </TableCell>
            </>
          ))
        : null}
    </>
  )
}

export default GeoData
