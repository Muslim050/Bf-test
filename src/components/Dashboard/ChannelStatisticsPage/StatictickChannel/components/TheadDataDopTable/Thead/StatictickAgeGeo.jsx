import React from 'react'
import style from '../../../StatictickChannelTable.module.scss'
import { TableCell } from '@/components/ui/table'

function StatictickAgeGeo({ dataChannel }) {
  const uniqueGenders = Array.from(
    new Set(dataChannel?.geo_percentages?.map((geo) => geo.country)),
  )
  return (
    <>
      {uniqueGenders.map((geo, index) => (
        <TableCell
          key={geo}
          className={style.tableChart__tdd}
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: '12px',
          }}
        >
          {geo}
        </TableCell>
      ))}
    </>
  )
}

export default StatictickAgeGeo
