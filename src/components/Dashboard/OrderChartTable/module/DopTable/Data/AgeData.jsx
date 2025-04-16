import React from 'react'
import { TableCell } from '@/components/ui/table.jsx'

function AgeData({ statistic }) {
  const desiredOrder = [
    '13-17',
    '18-24',
    '25-34',
    '35-44',
    '45-54',
    '55-64',
    '65+' || '65-',
  ]

  // Для каждого желаемого диапазона ищем данные или создаем дефолтные
  const sortedData = desiredOrder.map((ageGroup) => {
    const found = statistic.age_group_percentages.find((item) => {
      const value = item.age_group.replace('age', '')
      // Если возрастная группа из данных равна '65-', а ожидается '65+'
      if (value === '65-' && ageGroup === '65+') {
        return true
      }
      return value === ageGroup
    })
    return found ? found : { age_group: ageGroup, percentage: 0 }
  })

  return (
    <>
      {sortedData.length > 0 ? (
        sortedData.map((age, index) => (
          <TableCell
            key={`age-${index}`}
            data-label="Возраст"
            className="font-normal text-[#FFFFFF] text-sm text-center"
          >
            {age.percentage}%
          </TableCell>
        ))
      ) : (
        <TableCell
          data-label="Возраст"
          className="font-normal text-orange-600 text-sm text-center"
        >
          Введется аналитика...
        </TableCell>
      )}
    </>
  )
}

export default AgeData
