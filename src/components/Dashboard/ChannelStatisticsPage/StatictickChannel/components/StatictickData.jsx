import React from 'react'
import style from '../StatictickChannelTable.module.scss'
import FormatterView from '@/components/Labrery/formatter/FormatterView'
// import { ReactComponent as Arrow } from "@/assets/TablePagination/arrow.svg";
import { TableCell } from '@/components/ui/table'
import { ThemeContext } from '@/utils/ThemeContext.jsx'

function StatictickData({ dataChannel, handleRowClick }) {
  const { textColor } = React.useContext(ThemeContext)

  return (
    <>
      <TableCell className={`font-normal text-${textColor} text-sm `}>
        <FormatterView data={dataChannel.number_of_views} />
      </TableCell>
      <TableCell className={`font-normal text-${textColor} text-sm `}>
        <FormatterView data={dataChannel.number_of_likes} />
      </TableCell>
      <TableCell className={`font-normal text-${textColor} text-sm `}>
        <FormatterView data={dataChannel.number_of_dislikes} />
      </TableCell>
      <TableCell className={`font-normal text-${textColor} text-sm `}>
        <FormatterView data={dataChannel.number_of_comments} />
      </TableCell>
      <TableCell className={`font-normal text-${textColor} text-sm `}>
        <FormatterView data={dataChannel.estimated_minutes_watched} />
      </TableCell>

      <TableCell className={`font-normal text-${textColor} text-sm `}>
        <button
          className={style.dopBtn}
          onClick={() => handleRowClick(dataChannel.number_of_views)}
        >
          Показать
          <span className={style.arrow}>
            {/*<Arrow*/}
            {/*  className={`${style.arrow__icon} ${*/}
            {/*    expandedRows === dataChannel.number_of_views*/}
            {/*      ? style.arrow__rotate*/}
            {/*      : ""*/}
            {/*  }`}*/}
            {/*/>*/}
            Arrow
          </span>
        </button>
      </TableCell>
    </>
  )
}

export default StatictickData
