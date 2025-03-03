import style from '../../OrderChartTable.module.scss'
import {
  Table,
  TableBody,
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
import GenderData from '@/components/Dashboard/OrderChartTable/module/DopTable/Data/GenderData.jsx'
import m from "@/components/Dashboard/Order/OrderTable/styles/OrderTable.module.scss";
import DeviceData from "@/components/Dashboard/OrderChartTable/module/DopTable/Data/DeviceData.jsx";

const DopTable = ({ statistic, data, expandedRows }) => {
  return (
    <div>
      <div style={{ background: 'var(--bg-color)' }} className=" p-2 rounded-b-3xl h-[100%]">
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
        {/* )} */}
      </div>
    </div>
  )
}

export default DopTable
