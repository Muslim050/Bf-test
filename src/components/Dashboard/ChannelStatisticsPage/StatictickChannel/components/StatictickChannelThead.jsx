import { TableHead, TableRow } from '@/components/ui/table'

function StatictickChannelThead() {
  return (
    <>
      <TableRow>
        <TableHead className="text-white" rowspan="2">
          Показы
        </TableHead>
        <TableHead className="text-white" rowspan="2">
          Кол-во лайков
        </TableHead>
        <TableHead className="text-white" rowspan="2">
          Кол-во дизлайков
        </TableHead>
        <TableHead className="text-white" rowspan="2">
          Кол-во комментариев
        </TableHead>
        <TableHead className="text-white" rowspan="2">
          Среднее кол-во минут просмотров
        </TableHead>
        <TableHead className="text-white" rowspan="2">
          Аналитика
        </TableHead>
      </TableRow>
    </>
  )
}

export default StatictickChannelThead
