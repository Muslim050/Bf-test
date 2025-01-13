import { TableHead, TableRow } from '@/components/ui/table'

const headers = [
  { key: 'index', label: '№' },
  { key: 'channel_name', label: 'Канал' },
  { key: 'video_name', label: 'Название видео' },
  { key: 'order_format', label: 'Формат' },
  { key: 'publication_date', label: 'Начало' },
  { key: 'status', label: 'Статус' },
  { key: 'online_view_count', label: 'Показы' },
  { key: 'budget', label: 'Бюджет' },
  { key: 'analiz_budget', label: 'Анализ аудитории' },
]

function OrderChartRow() {
  return (
    <>
      <TableRow>
        {headers.map((row) => {
          return (
            <TableHead key={row.key} className="text-white">
              {row.label}
            </TableHead>
          )
        })}
      </TableRow>
    </>
  )
}

export default OrderChartRow
