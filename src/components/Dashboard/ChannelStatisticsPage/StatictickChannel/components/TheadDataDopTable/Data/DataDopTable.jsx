import React from 'react'
import { TableCell } from '@/components/ui/table'
function DataDopTable({ dataChannel }) {
  return (
    <>
      {dataChannel?.gender_percentages?.map((gender, index) => (
        <>
          <TableCell
            key={gender.percentage}
            data-label="Пол"
            style={{
              textAlign: 'center',
            }}
          >
            {gender.percentage}%
          </TableCell>
        </>
      ))}

      {dataChannel?.age_group_percentages?.map((age, index) => (
        <TableCell
          key={index}
          data-label="Возраст"
          style={{
            textAlign: 'center',
          }}
        >
          {age.percentage}%
        </TableCell>
      ))}

      {dataChannel?.geo_percentages?.map((geo, index) => (
        <>
          <TableCell
            key={index}
            data-label="Гео"
            style={{
              textAlign: 'center',
            }}
          >
            {geo.percentage}%
          </TableCell>
        </>
      ))}
      {dataChannel?.device_type_percentages?.map((geo, index) => (
        <>
          <TableCell
            key={index}
            data-label="Гео"
            style={{
              textAlign: 'center',
            }}
          >
            {
              geo.percentage > 0 &&
              <div className='flex justify-center'>
                {geo.percentage}%
              </div>
            }

          </TableCell>
        </>
      ))}
    </>
  )
}

export default DataDopTable
