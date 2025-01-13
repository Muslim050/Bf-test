import { TableCell } from '@/components/ui/table'
function TheadFirst({ dataChannel }) {
  const removeDuplicates = (arr) => Array.from(new Set(arr))
  const uniqueGenders = dataChannel
    ? removeDuplicates(dataChannel?.gender_percentages?.map((gen) => gen.gender))
    : []
  const uniqueAge = dataChannel
    ? removeDuplicates(
        dataChannel?.age_group_percentages?.map((age) => age.age_group),
      )
    : []
  const uniqueGeo = dataChannel
    ? removeDuplicates(dataChannel?.geo_percentages?.map((geo) => geo.country))
    : []
  const genderColSpan = uniqueGenders.length
  const ageColSpan = uniqueAge.length
  const geoColSpan = uniqueGeo.length

  return (
    <>
      <TableCell
        className="rounded-tl-[20px] text-center "
        colSpan={genderColSpan}
      >
        Пол
      </TableCell>

      <TableCell colSpan={ageColSpan} className="text-center">
        Возраст
      </TableCell>
      <TableCell colSpan={geoColSpan} className="rounded-tr-[20px] text-center">
        Гео
      </TableCell>
    </>
  )
}

export default TheadFirst
