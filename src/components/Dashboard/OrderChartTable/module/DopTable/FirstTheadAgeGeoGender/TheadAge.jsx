import React from 'react'
import {TableHead} from '@/components/ui/table.jsx'

function OrderChartAge({ statistic }) {

  const desiredOrder = ['13-17', '18-24', '25-34', '35-44', '45-54', '55-64', '65+']

  // Для каждого желаемого диапазона ищем данные или создаем дефолтные
  const sortedData = desiredOrder.map(ageGroup => {
    const found = statistic.age_group_percentages.find(item =>
      item.age_group.replace('age', '') === ageGroup
    )
    return found ? found : { age_group: ageGroup, percentage: 0 }
  })

  return (
    <>
      {sortedData.length > 0
        ? sortedData.map((ageData, index) => (
            <TableHead
              key={index}
              className="font-normal text-[#FFFFFF] text-sm text-center "
            >
              {ageData.age_group.replace('age', '')}
            </TableHead>
          ))
        :   <TableHead
          className="font-normal text-[#FFFFFF] text-sm text-center "
        >
        </TableHead>}
    </>
  )
}

export default OrderChartAge
