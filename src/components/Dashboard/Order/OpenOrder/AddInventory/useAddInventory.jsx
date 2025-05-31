import React, { useEffect } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useDispatch, useSelector } from 'react-redux'
import { formatDate } from '@/utils/formatterDate.jsx'
import { FormatFormatter } from '@/utils/FormatFormatter.jsx'
import FormatterView from '@/components/Labrery/formatter/FormatterView.jsx'
import AdvertStatus from '@/components/Labrery/AdvertStatus/AdvertStatus.jsx'
import { Button } from '@/components/ui/button.jsx'
import {
  PackageCheck,
  SquareArrowOutUpRight,
  SquareCheckBig,
  Webhook,
  WebhookOff,
} from 'lucide-react'
import Cookies from 'js-cookie'
import { deactivateInventories } from '@/redux/orderStatus/orderStatusSlice.js'
import { toast } from 'react-hot-toast'
import { fetchOrder } from '@/redux/order/orderSlice.js'
import PlanPopoverCell from '@/components/module/Order/EditView/PlanPopoverCell.jsx'
import { truncate } from '@/utils/other.js'
import Avtomatick from '@/components/module/Order/Avtomatick.jsx'
import TooltipWrapper from '@/shared/TooltipWrapper.jsx'

export const useAddInventory = (getOrder, onceOrder, fetchGetOrder) => {
  const [columnFilters, setColumnFilters] = React.useState([])
  const { total_count } = useSelector((state) => state.channel)
  const [globalFilter, setGlobalFilter] = React.useState('')
  const [pagination, setPagination] = React.useState({
    pageIndex: 0, // Начинаем с 0
    pageSize: 20,
  })
  const role = Cookies.get('role')
  const [selectedInventoryId, setSelectedInventoryId] = React.useState('')

  // Модальное окно OrderModal
  const [open, setOpen] = React.useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  // Модальное окно OrderModal
  const dispatch = useDispatch()
  useEffect(() => {
    fetchGetOrder()
  }, [])

  const handleDeactivateInventory = (inventory_id) => {
    const confirmDeactivate = window.confirm(
      'Вы уверены, что хотите завершить инвентарь?',
    )
    if (confirmDeactivate) {
      dispatch(deactivateInventories({ inventory_id }))
        .then(() => {
          toast.success('Инвентарь успешно завершен')
          fetchGetOrder() // Вызов функции после успешного запроса
        })
        .catch((error) => {
          toast.error(error.message)
          fetchGetOrder() // Вызов функции после успешного запроса
        })
    } else {
      toast.info('Операция отменена')
      dispatch(fetchOrder())
    }
  }

  const columns = React.useMemo(
    () => [
      {
        accessorFn: (_, index) => index + 1, // Используем индекс строки
        id: 'id',
        cell: ({ row }) => (
          <>
            <TooltipWrapper tooltipContent={<p>ID:{row.original?.id}</p>}>
              <div>{row.index + 1}</div>
            </TooltipWrapper>
          </>
        ),
        filterFn: 'includesStringSensitive',
        header: () => <span>№</span>,
      },
      {
        accessorFn: (row) => row.channel?.name, // Преобразование в число
        id: 'Канал',
        cell: ({ row }) => (
          <>
            <TooltipWrapper
              tooltipContent={
                <>
                  <p>{row.original?.channel?.name}</p>
                  <p>ID: {row.original?.channel?.id}</p>
                </>
              }
            >
              <div>{row.original?.channel?.name}</div>
            </TooltipWrapper>
          </>
        ),
        filterFn: 'includesStringSensitive', //note: normal non-fuzzy filter column - case sensitive
        header: () => <span>Канал</span>,
      },
      {
        id: 'Название Видео',
        accessorFn: (row) => row.video_content?.name, // Преобразование в число
        cell: ({ row }) => (
          <>
            <TooltipWrapper
              tooltipContent={
                <>
                  <p>{row.original.video_content?.name}</p>
                  <p>ID:{row.original?.video_content?.id}</p>
                </>
              }
            >
              <a
                href={`${row.original.video_content.link_to_video}&t=${row.original.start_at}`}
                target="_blank"
                className={`underline inline-flex gap-1 items-center justify-between ${
                  row.verified_link_with_timecode === null
                    ? ' text-gray-500'
                    : 'text-[#A7CCFF] hover:text-[#3282f1]'
                } ${
                  row.verified_link_with_timecode === null
                    ? 'cursor-not-allowed'
                    : 'cursor-pointer'
                }`}
                onClick={(e) => {
                  if (row.verified_link_with_timecode === null) {
                    e.preventDefault()
                  }
                }}
                rel="noreferrer"
              >
                {truncate(row.original.video_content?.name, 20)}
                <SquareArrowOutUpRight className="size-4" />
              </a>
            </TooltipWrapper>
          </>
        ),
        header: () => <span>Название Видео</span>,
      },
      {
        accessorFn: (row) => row.expected_number_of_views, // Преобразование в число
        id: 'Порог показов',
        cell: ({ row }) => (
          <PlanPopoverCell row={row} fetchGetOrder={fetchGetOrder} />
        ),
        filterFn: 'includesStringSensitive',
        header: () => <span>Порог показов</span>,
      },
      {
        accessorFn: (row) => row.format, // Преобразование в число
        id: 'Формат',
        cell: ({ row }) => (
          <div className="text-blue-400	">
            <FormatFormatter
              format={row.original.format}
              target={row.original.target_country}
            />
          </div>
        ),
        filterFn: 'includesStringSensitive', //note: normal non-fuzzy filter column - case sensitive
        header: () => <span>Формат</span>,
      },
      {
        accessorFn: (row) => row.video_content?.publication_time, // Преобразование в число
        id: 'Время публикаций',
        cell: ({ row }) => (
          <>{formatDate(row?.original.video_content?.publication_time)}</>
        ),
        filterFn: 'includesStringSensitive', //note: normal non-fuzzy filter column - case sensitive
        header: () => <span>Время публикаций</span>,
      },
      {
        accessorFn: (row) => row?.online_views, // Преобразование в число
        id: 'Показы',
        cell: ({ row }) => {
          const onlineViews = row.original.online_views
          const totalOnlineViews = row.original.total_online_views
          // Проверка на наличие значений
          if (onlineViews || totalOnlineViews) {
            return (
              <div className="flex gap-1 items-center justify-between">
                <div
                  className="ml-0.5 text-[15px]"
                  style={{
                    background: `${
                      onceOrder?.target_country ? '#606afc' : 'transparent'
                    }`,
                    padding: '0px 6px',
                    borderRadius: '10px',
                    color: `${onceOrder?.target_country ? 'white' : 'white'}`,
                  }}
                >
                  <FormatterView data={onlineViews} />
                </div>
                {onceOrder?.target_country && totalOnlineViews && (
                  <FormatterView data={totalOnlineViews} />
                )}
              </div>
            )
          }

          return <>----</>
        },
        filterFn: 'includesStringSensitive', // Нормальный фильтр (чувствительный к регистру)
        header: () => <span>Показы</span>,
      },
      {
        accessorFn: (row) => row.status, // Преобразование в число
        id: 'Статус / Действия',
        cell: ({ row }) => (
          <div className="flex gap-2 justify-between items-center ">
            <div className="flex gap-2 justify-between w-fit">
              {(role === 'admin' && row.original.status === 'in_use') ||
              row.original.status === 'inactive' ? (
                <AdvertStatus
                  status={row.original.status}
                  endDate={row.original.deactivation_date}
                />
              ) : (
                <TooltipWrapper tooltipContent="Проверить">
                  <Button
                    variant="outlineViolet"
                    onClick={() => {
                      setOpen(true)
                      setSelectedInventoryId(() => row.original.id)
                    }}
                    className="relative flex gap-1"
                  >
                    <PackageCheck />
                    {row.original.video_content.link_to_video ? (
                      <div className="bg-violet-500 w-4 h-4 rounded-full absolute -right-1.5 -top-1.5"></div>
                    ) : (
                      ''
                    )}
                  </Button>
                </TooltipWrapper>
              )}
              {row.original.status === 'in_use' ? (
                <div>
                  <Button
                    onClick={() => handleDeactivateInventory(row.original.id)}
                    disabled={row.original.is_auto_deactivation_mode}
                    variant="outlineDeactivate"
                    className="flex gap-1"
                  >
                    <SquareCheckBig className="w-[20px] h-[20px] text-[var(--text)]" />
                    Завершить
                  </Button>
                </div>
              ) : (
                ''
              )}
              {row.original.status === 'in_use' && (
                <>
                  <Avtomatick
                    fetchGetOrder={fetchGetOrder}
                    row={row.original}
                  />
                </>
              )}
            </div>
            {row.original.is_automatically_deactivated === null ? null : (
              <>
                {row.original.is_automatically_deactivated ? (
                  <TooltipWrapper tooltipContent="Авто завершение">
                    <Webhook
                      className="text-green-500"
                      title="Автоматический режим включен"
                    />
                  </TooltipWrapper>
                ) : (
                  <TooltipWrapper tooltipContent="Ручное завершение">
                    <WebhookOff
                      className="text-gray-400"
                      title="Автоматический режим выключен"
                    />
                  </TooltipWrapper>
                )}
              </>
            )}
          </div>
        ),
        filterFn: 'includesStringSensitive',
        header: () => <span>Статус / Действия</span>,
      },
    ],
    [onceOrder],
  )

  const table = useReactTable({
    data: getOrder || [], // Данные из Redux
    columns,
    state: {
      columnFilters,
      globalFilter,
      pagination,
    },
    onPaginationChange: (updater) => {
      setPagination((prev) => {
        const newPagination =
          typeof updater === 'function' ? updater(prev) : updater
        return { ...prev, ...newPagination }
      })
    },
    pageCount: Math.ceil(total_count / pagination.pageSize), // Общее количество страниц
    manualPagination: true, // Указываем, что используем серверную пагинацию
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return {
    table,
    columns,
    setColumnFilters,
    flexRender,
    globalFilter,
    setGlobalFilter,
    pagination,
    open,
    setOpen,
    handleClose,
    selectedInventoryId,
  }
}
