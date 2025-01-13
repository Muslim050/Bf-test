import React from 'react'
import { TableCell } from '@/components/ui/table'

function TheadAge({ statistic }) {
  function findVideoWithThreeGenders(data) {
    return data.find((item) => item?.age_group_percentages.length === 7)
  }

  const result = findVideoWithThreeGenders(statistic)
  const uniqueAge = Array.from(
    new Set(result?.age_group_percentages.map((gen) => gen.age_group)),
  )

  return (
    <>
      <div className="my-2">
        {uniqueAge.length > 0
          ? uniqueAge.map ((genderData, index) => (
            <TableCell
              key={index}
              className="border-transparent text-white h-auto text-right"
              style={{
                fontSize: '12px',
                padding: '6px',
                width: '60px',
                fontWeight: '600',
              }}
            >
              {genderData.substring (3)}
            </TableCell>
          ))
          : null}
      </div>
    </>
  )
}

export default TheadAge
