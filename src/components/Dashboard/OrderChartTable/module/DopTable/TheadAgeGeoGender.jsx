import React from 'react'
import { TableCell } from '@/components/ui/table.jsx'
import { Info } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
function TheadAgeGeoGender({ statistic }) {
  const removeDuplicates = (arr) => Array.from(new Set(arr))
  const uniqueDevaice =
    statistic && statistic.device_type_percentages
      ? removeDuplicates(statistic?.device_type_percentages.map((gen) => gen.device_type))
      : []

  const uniqueGenders =
    statistic && statistic.gender_percentages
      ? removeDuplicates(statistic?.gender_percentages.map((gen) => gen.gender))
      : []

  const uniqueAge =
    statistic && statistic.age_group_percentages
      ? removeDuplicates(
          statistic?.age_group_percentages.map((age) => age.age_group),
        )
      : []

  const uniqueGeo =
    statistic && statistic.geo_percentages
      ? removeDuplicates(statistic?.geo_percentages.map((geo) => geo.country))
      : []


  const genderColSpan = uniqueGenders.length
  const deviceColSpan = uniqueDevaice.length

  const ageColSpan = uniqueAge.length
  const geoColSpan = uniqueGeo.length
  console.log (deviceColSpan)
  return (
    <>

      <TableCell className="text-white text-sm	font-bold	bg-[#FFFFFF2B] rounded-tl-[22px] ">
        <div className="flex items-center justify-center gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="cursor-pointer text-orange-300  hover:text-orange-500" />
              </TooltipTrigger>
              <TooltipContent>
                <p> Предварительная Аналитика</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          Показы
        </div>
      </TableCell>




      {genderColSpan ? (
        <TableCell
          className="border-x border-[#ffffff1a] text-white text-sm	font-bold	bg-[#FFFFFF2B] text-center"
          colSpan={genderColSpan}
        >
          Пол
        </TableCell>
      ) : null}

      {ageColSpan ? (
        <TableCell
          className="border-x border-[#ffffff1a] text-white text-sm	font-bold	bg-[#FFFFFF2B] text-center"
          colSpan={ageColSpan}
        >
          Возраст
        </TableCell>
      ) : null}

      {geoColSpan ? (
        <TableCell
          className=" text-white text-sm	font-bold	bg-[#FFFFFF2B] text-center "
          colSpan={geoColSpan}
        >
          Гео
        </TableCell>
      ) : null}


      {deviceColSpan ? (
        <TableCell
          className="rounded-tr-[22px] border-l border-[#ffffff1a] text-white text-sm	font-bold	bg-[#FFFFFF2B] text-center"
          colSpan={deviceColSpan}
        >
          Девайсы
        </TableCell>
      ) : null}
    </>
  )
}

export default TheadAgeGeoGender
