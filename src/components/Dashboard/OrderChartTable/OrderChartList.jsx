import React from 'react'
import FormatterView from '@/components/Labrery/formatter/FormatterView'
import FormatterBudjet from '@/components/Labrery/formatter/FormatterBudjet'
import { TableCell } from '@/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip.jsx'
import { truncate } from '@/utils/other.js'
import AdvertStatus from '@/components/Labrery/AdvertStatus/AdvertStatus.jsx'
import {ChevronDown, Monitor, MonitorPlay, MonitorUp} from 'lucide-react'
import { ThemeContext } from '@/utils/ThemeContext.jsx'
import { formatDate } from '../../../utils/formatterDate'

function OrderChartList({ statistic, index, handleRowClick, isExpanded }) {
  const { textColor } = React.useContext(ThemeContext)

  return (
    <>
      <TableCell                 data-label="№"
                                 className={`font-normal text-${textColor} text-sm `}>
        {index + 1}
      </TableCell>
      <TableCell   data-label="Канал" className={`font-normal text-${textColor} text-sm `}>
        {statistic.channel_name}
      </TableCell>
      <TableCell data-label="Название видео	" className={`font-normal text-${textColor} text-sm `}>
        <a
          target="_blank"
          href={statistic.video_link}
          className="text-[#A7CCFF] underline hover:text-[#4289eb]"
          rel="noreferrer"
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild className="cursor-pointer">
                <div>{truncate(statistic.video_name, 20)}</div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{statistic.video_name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </a>
      </TableCell>
      <TableCell data-label="Формат" className={`font-normal text-${textColor} text-sm `}>
        <div className='flex items-center gap-1'>
          {
            (statistic.order_format === 'preroll' && <Monitor/>) ||
            (statistic.order_format === 'top_preroll' && <MonitorUp/>) ||
            (statistic.order_format === 'tv_preroll' && <MonitorPlay/>)
          }
          {
            (statistic.order_format === 'preroll' && 'Pre-roll') ||
            (statistic.order_format === 'mixroll' && 'Mix-roll') ||
            (statistic.order_format === 'top_preroll' && 'Top Pre-roll') ||
            (statistic.order_format === 'tv_preroll' && 'TV Pre-roll')}


        </div>

        {/*{(statistic.order_format === 'preroll' && 'Pre-roll') ||*/}
        {/*  ('mixroll' && 'Mix-roll')}*/}
      </TableCell>
      <TableCell data-label="Начало" className={`font-normal text-${textColor} text-sm `}>
        <div>
          <div style={{display: 'flex', width: '100px'}}>
            {statistic.publication_date === null ? (
              <div>---</div>
            ) : (
              formatDate (statistic.publication_date)
            )}
          </div>
        </div>
      </TableCell>
      <TableCell data-label="Статус" className={`font-normal text-${textColor} text-sm `}>
        <AdvertStatus
          status={statistic.status}
          endDate={statistic.deactivation_date}
        />
      </TableCell>
      <TableCell data-label="Показы" className={`font-normal text-${textColor} text-sm `}>
        {statistic.video_link ===
        'https://www.youtube.com/watch?v=OcR6AYdiyUo' ? (
          <FormatterView data="59 971" />
        ) : (
          <FormatterView data={statistic.online_view_count} />
        )}
      </TableCell>
      <TableCell data-label="Бюджет"  className={`font-normal text-${textColor} text-sm `}>
        <FormatterBudjet
          budget={statistic.budget}
          data={'2024-05-10'} //сделал так потому что publication date null прилетает
        />
      </TableCell>
      <TableCell data-label="Анализ аудитории"  className={`font-normal text-${textColor} text-sm `}>
        <button
          className={`  px-[10px] py-[5px] flex rounded-[12px] hover:bg-white hover:text-[#12173c] ${
            isExpanded ? 'bg-white text-[#12173c]' : 'bg-[#FFFFFF2B] text-white'
          }`}
          onClick={() => handleRowClick(statistic.video_link)}
        >
          {isExpanded ? 'Закрыть' : 'Показать'}
          <ChevronDown className="w-5 h-5" />
        </button>
      </TableCell>
    </>
  )
}

export default OrderChartList
