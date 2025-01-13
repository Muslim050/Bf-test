import React from 'react'
import { TableHead } from '@/components/ui/table.jsx'
import { ShieldQuestion } from 'lucide-react'

function OrderChartTwoThead({ statistic }) {
  const uniqueGenders = Array.from(
    new Set(statistic.gender_percentages.map((gen) => gen.gender)),
  )

  return (
    <>
      {uniqueGenders.length > 0
        ? uniqueGenders.map((gender, index) => (
            <TableHead
              key={index}
              className="font-normal text-[#FFFFFF] text-sm text-center "
            >
              {gender === 'female' ? (
                'Ж'
              ) : gender === 'male' ? (
                'М'
              ) : gender === 'Other' ? (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <ShieldQuestion />{' '}
                </div>
              ) : (
                <>{gender}</>
              )}
            </TableHead>
          ))
        : null}
    </>
  )
}

export default OrderChartTwoThead
