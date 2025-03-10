import React from 'react'
import {TableHead} from '@/components/ui/table.jsx'

function OrderChartGeo({ statistic }) {
  // const uniqueGenders = Array.from(
  //   new Set(statistic.geo_percentages.map((geo) => geo.country)),
  // )


  // Задаем желаемый порядок
  const desiredOrder = ['UZ', 'RU', 'KZ', 'KG', 'Other'];

  // Для каждого желаемого диапазона ищем данные или создаем дефолтные
  const sortedData = desiredOrder.map(geoGroup => {
    const found = statistic.geo_percentages.find(item =>
      item.country === geoGroup
    )
    return found ? found : { country: geoGroup, percentage: 0 }
  })
  console.log (sortedData)
  return (
    <>
      {sortedData.length > 0
        ? sortedData.map((geo, index) => (
            <TableHead
              key={index}
              className="font-normal text-[#FFFFFF] text-sm text-center !rounded-t-none "
            >
              {geo.country}
            </TableHead>
          ))
        : <TableHead
          className="font-normal text-[#FFFFFF] text-sm text-center "
        >
        </TableHead>}
    </>
  )
}

export default OrderChartGeo
