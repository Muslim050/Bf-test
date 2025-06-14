import React from 'react'
import { TableCell } from '@/components/ui/table.jsx'

function DeviceData({ statistic }) {
  const desiredOrder = ['TV', 'MOBILE', 'TABLET', 'DESKTOP', 'OTHER']
  // Для каждого желаемого диапазона ищем данные или создаем дефолтные
  const sortedData = desiredOrder.map((getGroup) => {
    const found = statistic.device_type_percentages.find(
      (item) => item.device_type === getGroup,
    )
    return found ? found : { device_type: getGroup, percentage: 0 }
  })
  return (
    <>
      {sortedData.length > 0 ? (
        sortedData.map((gender, index) => (
          <>
            <TableCell
              key={`gender-${index}`}
              data-label="Девайсы"
              className="font-normal text-[#FFFFFF] text-sm text-center"
            >
              <div className="flex justify-center">
                <div>{gender.percentage}</div>%
              </div>
            </TableCell>
          </>
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

export default DeviceData
