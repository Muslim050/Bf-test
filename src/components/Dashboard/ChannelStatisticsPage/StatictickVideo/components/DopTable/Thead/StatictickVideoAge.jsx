import React from 'react'
import style from '../../../StatictickVideoTable.module.scss'
import { TableCell } from '@/components/ui/table'

function StatictickVideoAge({ statistic }) {
  const uniqueGenders = Array.from(
    new Set(statistic.age_group_percentages.map((age) => age.age_group)),
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

export default StatictickVideoAge
