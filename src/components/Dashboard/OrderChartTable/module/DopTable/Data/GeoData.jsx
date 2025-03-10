import React from 'react'
import {TableCell} from '@/components/ui/table.jsx'

function GeoData({ statistic }) {

  const desiredOrder = ['UZ', 'RU', 'KZ', 'KG', 'Other'];
  // Для каждого желаемого диапазона ищем данные или создаем дефолтные
  const sortedData = desiredOrder.map(getGroup => {
    const found = statistic.geo_percentages.find(item =>
      item.country === getGroup
    )
    return found ? found : { age_group: getGroup, percentage: 0 }
  })
  return (
    <>
      {sortedData.length > 0
        ? sortedData.map((geo, index) => (
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
        : <TableCell
          data-label="Возраст"
          className="font-normal text-orange-600 text-sm text-center"
        >
          Введется аналитика...
        </TableCell>}
    </>
  )
}

export default GeoData
