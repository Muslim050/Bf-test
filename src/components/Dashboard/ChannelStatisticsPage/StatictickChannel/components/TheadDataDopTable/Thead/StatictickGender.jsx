import { TableCell } from '@/components/ui/table'
import { ShieldQuestion } from 'lucide-react'

function StatictickGender({ dataChannel }) {
  const uniqueGenders = Array.from(
    new Set(dataChannel?.gender_percentages?.map((gen) => gen.gender)),
  )
  return (
    <>
      {uniqueGenders.map((gender) => (
        <TableCell key={gender} className=" text-center">
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

export default StatictickGender
