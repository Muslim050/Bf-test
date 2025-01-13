import React from 'react'
import style from '../../../StatictickVideoTable.module.scss'
import { TableCell } from '@/components/ui/table'

function StatictickVideoGeo({ statistic }) {
  const uniqueGenders = Array.from(
    new Set(statistic.geo_percentages.map((geo) => geo.country)),
  )
  return (
    <>
      {uniqueGenders.map((geo, index) => (
        <TableCell key={geo} className="text-center">
          {geo}
        </TableCell>
      ))}
    </>
  )
}

export default StatictickVideoGeo
