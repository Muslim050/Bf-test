import React from 'react'
import { TableHead } from '@/components/ui/table.jsx'
import { ShieldQuestion } from 'lucide-react'
import { MonitorPlay } from 'lucide-react';

function TheadDevaice({ statistic }) {
  const uniqueGenders = Array.from(
    new Set(statistic.device_type_views?.map((gen) => gen.device_type)),
  )

  return (
    <>
      {uniqueGenders.length > 0
        ? uniqueGenders.map((gender, index) => (
            <TableHead
              key={index}
              className="font-normal text-[#FFFFFF] text-sm text-center "
            >
              {gender}
            </TableHead>
          ))
        : null}
    </>
  )
}

export default TheadDevaice
