import React, { useEffect, useState } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useDispatch, useSelector } from 'react-redux'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip.jsx'
import { formatDate } from '@/utils/formatterDate.jsx'
import { FormatFormatter } from '@/utils/FormatFormatter.jsx'
import FormatterView from '@/components/Labrery/formatter/FormatterView.jsx'
import AdvertStatus from '@/components/Labrery/AdvertStatus/AdvertStatus.jsx'
import { Button } from '@/components/ui/button.jsx'
import { SquareArrowOutUpRight, SquareCheckBig, Star } from 'lucide-react'
import Cookies from 'js-cookie'
import { deactivateInventories } from '@/redux/orderStatus/orderStatusSlice.js'
import { toast } from 'react-hot-toast'
import { fetchOrder } from '@/redux/order/orderSlice.js'
import PlanPopoverCell from '@/components/Dashboard/Order/OpenOrder/PlanPopoverCell.jsx'
import { truncate } from '@/utils/other.js'

export const useAddInventory = (getOrder, onceOrder, fetchGetOrder) => {
  const [columnFilters, setColumnFilters] = React.useState([])
  const { channel, total_count } = useSelector((state) => state.channel)
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
  const [currentOnceOrder, setCurrentOnceOrder] = useState(onceOrder)

  useEffect(() => {
    setCurrentOnceOrder(onceOrder) // Обновляем состояние каждый раз, когда onceOrder меняется
  }, [onceOrder])

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
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild className="cursor-pointer">
                  <div>{row.index + 1}</div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>ID:{row.original?.id}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        ),
        filterFn: 'includesStringSensitive', //note: normal non-fuzzy filter column - case sensitive
        header: () => <span>№</span>,
      },
      {
        accessorFn: (row) => row.channel?.name, // Преобразование в число
        id: 'Канал',
        cell: ({ row }) => (
          <>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild className="cursor-pointer">
                  <div>{row.original?.channel?.name}</div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{row.original?.channel?.name}</p>
                  <p>ID:{row.original?.channel?.id}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild className="cursor-pointer">
                  <a
                    href={`${row.original.video_content.link_to_video}&t=${row.original.start_at}`}
                    target="_blank"
                    style={{
                      display: 'inline-flex',
                      gap: '4px',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor:
                        row.verified_link_with_timecode === null
                          ? 'not-allowed'
                          : 'pointer',
                    }}
                    className={`underline ${
                      row.verified_link_with_timecode === null
                        ? ' text-gray-500'
                        : 'text-[#A7CCFF] hover:text-[#3282f1]'
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
                </TooltipTrigger>
                <TooltipContent>
                  <p>{row.original.video_content?.name}</p>
                  <p>ID:{row.original?.video_content?.id}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
        filterFn: 'includesStringSensitive', //note: normal non-fuzzy filter column - case sensitive
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
          console.log(onceOrder.target_country)
          // Проверка на наличие значений
          if (onlineViews || totalOnlineViews) {
            return (
              <div
                style={{
                  display: 'flex',
                  gap: '5px',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div
                  style={{
                    marginLeft: '2px',
                    fontSize: '15px',
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
          <div className="flex gap-2 items-center">
            {(role === 'admin' && row.original.status === 'in_use') ||
            row.original.status === 'inactive' ? (
              <AdvertStatus
                status={row.original.status}
                endDate={row.original.deactivation_date}
              />
            ) : (
              <div style={{ width: 'fit-content' }}>
                <Button
                  variant="outline"
                  onClick={() => {
                    setOpen(true)
                    setSelectedInventoryId(() => row.original.id)
                  }}
                  style={{ backdropFilter: 'blur(10.3049px)' }}
                  className="hover:scale-105 transition-all w-full h-auto px-2 py-1 hover:text-white rounded-lg flex items-center gap-1.5  bg-[#ffffff4d] hover:bg-violet-400 border border-transparent hover:border-violet-700"
                >
                  <Star className="w-[20px] h-[20px] text-white" />
                  {row.original.video_content.link_to_video ? (
                    <div className="bg-violet-500 w-4 h-4 rounded-full absolute -right-2 -top-2"></div>
                  ) : (
                    ''
                  )}
                  Проверить
                </Button>
              </div>
            )}

            {row.original.status === 'in_use' ? (
              <div>
                <Button
                  onClick={() => handleDeactivateInventory(row.original.id)}
                  style={{ backdropFilter: 'blur(10.3049px)' }}
                  className="hover:scale-105 transition-all w-full h-auto px-1.5 py-1 rounded-[12px] flex items-center gap-1.5  bg-[#ffffff4d] hover:bg-red-400 border border-transparent hover:border-red-500"
                >
                  <SquareCheckBig className="w-[20px] h-[20px] text-white" />
                  Завершить
                </Button>
              </div>
            ) : (
              ''
            )}
          </div>
        ),
        filterFn: 'includesStringSensitive', //note: normal non-fuzzy filter column - case sensitive
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
