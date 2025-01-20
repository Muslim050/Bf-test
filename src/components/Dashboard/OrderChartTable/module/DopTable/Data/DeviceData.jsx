import React from 'react'
import { TableCell } from '@/components/ui/table.jsx'
import FormatterView from "@/components/Labrery/formatter/FormatterView.jsx";

function DeviceData({ statistic }) {
  const uniqueGenders = statistic?.device_type_percentages

  const desiredOrder = ['MOBILE', 'TV', 'TABLET', 'DESKTOP', 'OTHER'];
  const sortedData = [...uniqueGenders].sort((a, b) => {
    return desiredOrder.indexOf(a.device_type) - desiredOrder.indexOf(b.device_type);
  });
  return (
    <>
      {sortedData.length > 0
        ? sortedData.map((gender, index) => (
            <>
              <TableCell
                key={`gender-${index}`}
                data-label="Девайсы"
                className="font-normal text-[#FFFFFF] text-sm text-center"
              >

                {
                  gender.percentage > 0 &&
                  <div className='flex justify-center'>
                    <div>{gender.percentage}</div>
                    %
                  </div>
                }


              </TableCell>
            </>
        ))
        : null}
    </>
  )
}

export default DeviceData
