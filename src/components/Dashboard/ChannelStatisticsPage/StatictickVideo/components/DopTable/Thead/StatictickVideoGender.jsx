import React from 'react'
import style from '../../../StatictickVideoTable.module.scss'
import { ShieldQuestion } from 'lucide-react'
import { TableCell } from '@/components/ui/table'

function StatictickVideoGender({ statistic }) {
  const uniqueGenders = Array.from(
    new Set(statistic.gender_percentages.map((gen) => gen.gender)),
  )
  return (
    <>
      {uniqueGenders.map((gender, index) => (
        <TableCell key={gender} className="text-center">
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
            gender
          )}
        </TableCell>
      ))}
    </>
  )
}

export default StatictickVideoGender
