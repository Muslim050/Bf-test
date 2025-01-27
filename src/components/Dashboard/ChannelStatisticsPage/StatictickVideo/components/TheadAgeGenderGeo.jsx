import React from 'react'
import style from '../StatictickVideoTable.module.scss'
import { TableCell } from '@/components/ui/table'
function TheadAgeGenderGeo({ data }) {
  const removeDuplicates = (arr) => Array.from(new Set(arr))

  const uniqueGenders = data
    ? removeDuplicates(
        data.flatMap((obj) => obj.gender_percentages.map((gen) => gen.gender)),
      )
    : []

  const uniqueAge = data
    ? removeDuplicates(
        data.flatMap((obj) =>
          obj.age_group_percentages.map((age) => age.age_group),
        ),
      )
    : []

  const uniqueGeo = data
    ? removeDuplicates(
        data.flatMap((obj) => obj.geo_percentages.map((geo) => geo.country)),
      )
    : []

  const uniqueDevaice =data
    ? removeDuplicates(
      data.flatMap((obj) => obj.device_type_percentages.map((geo) => geo.device_type)),
    )
    : []

  const genderColSpan = uniqueGenders.length
  const ageColSpan = uniqueAge.length
  const geoColSpan = uniqueGeo.length
  const deviceColSpan = uniqueDevaice.length

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
      <TableCell colSpan={geoColSpan} className=" text-center">
        Гео
      </TableCell>

      {deviceColSpan ? (
        <TableCell colSpan={deviceColSpan} className="rounded-tr-[20px] text-center">
        Девайсы
        </TableCell>
      ) : null}
    </>
  )
}

export default TheadAgeGenderGeo
