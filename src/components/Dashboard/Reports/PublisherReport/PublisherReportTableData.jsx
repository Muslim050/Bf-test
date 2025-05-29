import React from 'react'
import FormatterView from '../../../Labrery/formatter/FormatterView'
import FormatterBudjet, {
  TiinFormatterBudget,
} from '../../../Labrery/formatter/FormatterBudjet'
import { formatDate } from '@/utils/formatterDate.jsx'
import { ThemeContext } from '@/utils/ThemeContext.jsx'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { truncate } from '@/utils/other.js'
import { TableCell, TableRow } from '@/components/ui/table'
import { Monitor, MonitorPlay, MonitorUp } from 'lucide-react'

function PublisherReportTable({ publisherReport }) {
  const { textColor } = React.useContext(ThemeContext)

  return (
    <>
      {publisherReport.map((person, i) => {
        return (
          <TableRow key={person.id}>
            <TableCell
              data-label="ID"
              className={`font-normal text-${textColor} text-sm `}
            >
              {i + 1}
            </TableCell>
            <TableCell
              data-label="Компания"
              className={`font-normal text-${textColor} text-sm `}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-pointer">
                    {truncate(person.order_name, 20)}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{person.order_name}</p>
                </TooltipContent>
              </Tooltip>
            </TableCell>
            <TableCell
              data-label="Рекламодатель"
              className={`font-normal text-${textColor} text-sm `}
            >
              {person.advertiser_name}
            </TableCell>
            <TableCell
              data-label="Канал"
              className={`font-normal text-[#C9FFB5] text-sm `}
            >
              {person.channel_name}
            </TableCell>
            <TableCell
              data-label="Название Видео	"
              className={`font-normal text-${textColor} text-sm `}
              style={{ width: 'inherit', color: 'blue' }}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-pointer text-[#A7CCFF] hover:[#277aec] ">
                    {truncate(person.video_content_name, 20)}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{person.video_content_name}</p>
                </TooltipContent>
              </Tooltip>
            </TableCell>
            <TableCell
              data-label="Формат"
              className={`font-normal text-${textColor} text-sm `}
            >
              <div className="flex items-center gap-1">
                {(person.format === 'preroll' && <Monitor />) ||
                  (person.format === 'top_preroll' && <MonitorUp />) ||
                  (person.format === 'tv_preroll' && <MonitorPlay />)}
                {(person.format === 'preroll' && 'Pre-roll') ||
                  (person.format === 'mixroll' && 'Mid-roll') ||
                  (person.format === 'midroll1' && 'Mid-roll 1') ||
                  (person.format === 'midroll2' && 'Mid-roll 2') ||
                  (person.format === 'midroll3' && 'Mid-roll 3') ||
                  (person.format === 'midroll4' && 'Mid-roll 4') ||
                  (person.format === 'top_preroll' && 'Top Pre-roll') ||
                  (person.format === 'tv_preroll' && 'TV Pre-roll')}
              </div>
            </TableCell>
            <TableCell
              data-label="Начало"
              className={`font-normal text-${textColor} text-sm w-[100px]`}
            >
              {formatDate(person.order_start_date)}
            </TableCell>
            <TableCell
              data-label="Конец"
              className={`font-normal text-${textColor} text-sm w-[100px]`}
            >
              {formatDate(person.order_end_date)}
            </TableCell>
            <TableCell
              data-label="Показы факт"
              className={`font-normal text-${textColor} text-sm text-right`}
            >
              <FormatterView data={person.recorded_view_count} />
            </TableCell>
            <TableCell
              data-label="Бюджет компании"
              className={`font-normal text-${textColor} text-sm text-right`}
            >
              <div style={{ display: 'flex', justifyContent: 'end' }}>
                <FormatterBudjet
                  budget={person.budget_fact}
                  data={person.order_start_date}
                />
              </div>
            </TableCell>
            <TableCell
              data-label="Комиссия Агенства"
              className={`font-normal text-${textColor} text-sm `}
            >
              <div style={{ display: 'flex', justifyContent: 'end' }}>
                <TiinFormatterBudget budget={person.agency_commission_total} />
              </div>
            </TableCell>
            <TableCell
              data-label="Комиссия AdTech Media"
              className={`font-normal text-${textColor} text-sm `}
            >
              <div style={{ display: 'flex', justifyContent: 'end' }}>
                <TiinFormatterBudget
                  budget={person.adtechmedia_commission_total}
                />
              </div>
            </TableCell>
            <TableCell
              data-label="Бюджет"
              className={`font-normal text-${textColor} text-sm `}
            >
              <div style={{ display: 'flex', justifyContent: 'end' }}>
                <TiinFormatterBudget budget={person.channel_budget_total} />
              </div>
            </TableCell>
          </TableRow>
        )
      })}
    </>
  )
}

export default PublisherReportTable
