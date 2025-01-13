import React from 'react'
import style from '../StatictickVideoTable.module.scss'
import { TableHead, TableRow } from '@/components/ui/table'

function StatictickVideoThead() {
  return (
    <>
      <TableRow>
        <TableHead className="text-white" rowspan="2">
          №
        </TableHead>
        <TableHead className="text-white" rowspan="2">
          Название видео
        </TableHead>
        <TableHead className="text-white" rowspan="2">
          Дата публикаций{' '}
        </TableHead>
        <TableHead className="text-white" rowspan="2">
          Показы
        </TableHead>
        <TableHead className="text-white" rowspan="2">
          Аналитика
        </TableHead>
      </TableRow>
    </>
  )
}

export default StatictickVideoThead
