import React from 'react'
import { TableCell } from '@/components/ui/table.jsx'
import FormatterView from "@/components/Labrery/formatter/FormatterView.jsx";

function DeviceData({ statistic }) {
  const uniqueGenders = statistic?.device_type_views
  console.log (uniqueGenders)
  return (
    <>
      {uniqueGenders.length > 0
        ? uniqueGenders.map((gender, index) => (
            <>
              <TableCell
                key={`gender-${index}`}
                data-label="Девайсы"
                className="font-normal text-[#FFFFFF] text-sm text-center"
              >

                <FormatterView data={gender.views} />

              </TableCell>
            </>
          ))
        : null}
    </>
  )
}

export default DeviceData
