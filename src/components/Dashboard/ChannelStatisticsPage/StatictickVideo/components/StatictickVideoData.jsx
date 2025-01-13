import React from 'react'
import style from '../StatictickVideoTable.module.scss'
import FormatterView from '@/components/Labrery/formatter/FormatterView'
import { formatDate } from '@/utils/formatterDate.jsx'
import { TableCell, TableRow } from '@/components/ui/table'
import { ThemeContext } from '@/utils/ThemeContext.jsx'
import { Link } from 'lucide-react'
import { ChevronDown } from 'lucide-react'

function StatictickVideoData({ statistic, index, handleRowClick, isExpanded }) {
  const { textColor } = React.useContext(ThemeContext)

  return (
    <>
      <TableCell className={`font-normal text-${textColor} text-sm `}>
        {index + 1}
      </TableCell>

      <TableCell className={`font-normal text-${textColor} text-sm `}>
        <a
          target="_blank"
          href={statistic.video_link}
          className="text-[#A7CCFF] underline-none hover:underline hover:text-[#1073ff] flex items-center gap-2"
          rel="noreferrer"
        >
          {statistic.video_name}
          {/*<Linkk className={style.linkk__svg} />*/}
          <Link className="w-4" />
        </a>
      </TableCell>

      <TableCell className={`font-normal text-${textColor} text-sm `}>
        {formatDate(statistic.publication_time)}
      </TableCell>

      <TableCell className={`font-normal text-${textColor} text-sm `}>
        {statistic.online_view_count === 0 ? (
          <div
            style={{
              fontSize: '13px',
              lineHeight: '15px',
              color: '#fa8a00',
            }}
          >
            Введется <br /> аналитика
          </div>
        ) : (
          <FormatterView data={statistic.online_view_count} />
        )}
      </TableCell>

      <TableCell className={`font-normal text-${textColor} text-sm `}>
        <button
          className={`  px-[10px] py-[5px] flex rounded-[12px] hover:bg-white hover:text-[#12173c] transition-all ease-in-out ${
            isExpanded ? 'bg-white text-[#12173c]' : 'bg-[#FFFFFF2B] text-white'
          }`}
          onClick={() => handleRowClick(statistic.video_link)}
        >
          {isExpanded ? 'Закрыть' : 'Показать'}
          <ChevronDown
            className={`w-5 h-5 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
          />
        </button>
      </TableCell>
    </>
  )
}

export default StatictickVideoData
