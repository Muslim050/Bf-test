import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.jsx'

import FormatterView from '@/components/Labrery/formatter/FormatterView.jsx'
import { Eye } from 'lucide-react'
import React from 'react'
import TheadAgeGeoGender from './TheadAgeGeoGender.jsx'
import WrapperThead from '@/components/Dashboard/OrderChartTable/module/DopTable/FirstTheadAgeGeoGender/WrapperThead.jsx'
import AgeData from '@/components/Dashboard/OrderChartTable/module/DopTable/Data/AgeData.jsx'
import GeoData from '@/components/Dashboard/OrderChartTable/module/DopTable/Data/GeoData.jsx'
import DeviceData from '@/components/Dashboard/OrderChartTable/module/DopTable/Data/DeviceData.jsx'
import GenderData from '@/components/Dashboard/OrderChartTable/module/DopTable/Data/GenderData.jsx'

const DopTable = ({ statistic }) => {
  return (
    <div>
      {statistic.online_view_count ? (
        <div
          style={{ background: 'var(--bg-color)' }}
          className=" p-2 rounded-b-3xl h-[100%]"
        >
          <Table className="rounded-[22px] h-[100%]">
            <TableHeader style={{ border: 0 }}>
              {/* Колонки  ГЕО Возраст ПОЛ доп таблица  */}
              <TableRow>
                <TheadAgeGeoGender statistic={statistic} />
              </TableRow>
              {/* Колонки ГЕО Возраст ПОЛ доп таблица  */}
            </TableHeader>

            <TableHeader>
              {/* Колонки подробная инфа ГЕО Возраст ПОЛ */}
              <TableRow className="text-white text-sm	font-bold	bg-[#FFFFFF2B]  text-center ">
                <TableHead className="text-white text-center first:rounded-l-none ">
                  <Eye className="flex justify-center w-full" />
                </TableHead>
                <WrapperThead statistic={statistic} />
              </TableRow>
              {/* Колонки подробная инфа ГЕО Возраст ПОЛ */}
            </TableHeader>

            <TableCell
              data-label="Показов"
              className="text-white text-sm	font-bold !rounded-none text-center"
            >
              <FormatterView data={statistic.online_view_count} />
            </TableCell>

            <GenderData statistic={statistic} />

            <AgeData statistic={statistic} />
            <GeoData statistic={statistic} />
            <DeviceData statistic={statistic} />
          </Table>
        </div>
      ) : (
        <div
          style={{ background: 'var(--bg-color)' }}
          className="font-normal text-gray-400 text-sm text-center p-2  h-[100%] rounded-3xl"
        >
          Ведется аналитика...
        </div>
      )}
    </div>
  )
}

export default DopTable
