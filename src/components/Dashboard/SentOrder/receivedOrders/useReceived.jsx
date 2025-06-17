import React from 'react'
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useSelector } from 'react-redux'
import { SquareArrowOutUpRight } from 'lucide-react'
import { FormatFormatter } from '@/utils/FormatFormatter.jsx'
import { formatDate } from '@/utils/formatterDate.jsx'
import FormatterView from '@/components/Labrery/formatter/FormatterView.jsx'
import AdvertStatus from '@/components/Labrery/AdvertStatus/AdvertStatus.jsx'
import toast from 'react-hot-toast'
import backendURL from '@/utils/url.js'
import { Button } from '@/components/ui/button.jsx'
import OpenTableSentOrder from '@/module/TablePagination/OpenTableSentOrder.jsx'
import { OpenSvg } from '@/assets/icons-ui.jsx'
import { FormWrapperCreate } from '@/components/Dashboard/SentOrder/receivedOrders/FormWrapperCreate/index.jsx'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip.jsx'
import { truncate } from '@/utils/other.js'
import TooltipWrapper from '@/shared/TooltipWrapper.jsx'
import CommentPopover from '@/components/Dashboard/Shared/CommentPopover.jsx'

export const useReceived = () => {
  const [columnFilters, setColumnFilters] = React.useState([])
  const { listsentPublisher, total_count } = useSelector(
    (state) => state.sentToPublisher,
  )
  const [globalFilter, setGlobalFilter] = React.useState('')
  const [pagination, setPagination] = React.useState({
    pageIndex: 0, // Начинаем с 0
    pageSize: 20,
  })
  const [expandedRowId, setExpandedRowId] = React.useState(null)

  const renderSubComponent = ({ row }) => {
    return <OpenTableSentOrder data={row.original} />
  }

  // Модальное окно Index
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
  const [isPopoverOpenData, setIsPopoverOpenData] = React.useState()
  // Модальное окно Index
  const [currentOrder, setCurrentOrder] = React.useState(null)
  const copyToClipboard = () => {
    const textToCopy = `${currentOrder.notes_text}\n${currentOrder.notes_url}`

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toast.success('Комментарий скопирован в буфер обмена', {
          duration: 3000,
        })
      })
      .catch((err) => {
        toast.error('Не удалось скопировать комментарий', {
          duration: 3000,
        })
      })
  }
  const columns = React.useMemo(
    () => [
      {
        id: 'id',
        accessorFn: (_, index) => index + 1, // Используем индекс строки
        cell: ({ row }) => (
          <div className="flex justify-between">
            {row.original.order_status === 'in_review' ? (
              // <CircularTable/>
              <>
                <span className=" h-5 w-2.5 flex">
                  <span className=" inline-flex rounded-full h-5 w-2.5 bg-[#05c800] text-[14px] items-center justify-center"></span>
                </span>
              </>
            ) : null}
            <div>{row.index + 1}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {row.original.order_status === 'in_review' ? null : (
                <>
                  {row.original.inventory_count ? null : (
                    <span className=" h-5 w-2.5">
                      <span className="relative inline-flex rounded-full h-5 w-2.5 bg-red-500 text-[14px] items-center justify-center"></span>
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
        ),

        filterFn: 'includesStringSensitive', //note: normal non-fuzzy filter column - case sensitive
        header: () => <span>№</span>,
      },
      {
        accessorFn: (row) => row.order_name, // Преобразование в число
        id: 'Кампания',
        cell: ({ row }) => (
          <Tooltip>
            <TooltipTrigger asChild className="cursor-pointer">
              <a
                target="_blank"
                className={`no-underline text-[#A7CCFF] hover:text-[#3282f1] hover:underline flex gap-1`}
                href={`${backendURL}/media/${row.original.promo_file}`}
              >
                {truncate(row.original.order_name, 20)}
                <SquareArrowOutUpRight className="size-4" />
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>ID:{row?.original.id}</p>
              <p>{row.original.order_name}</p>
            </TooltipContent>
          </Tooltip>
        ),
        filterFn: 'includesString',
        header: () => <span className="flex items-center gap-1">Кампания</span>,
      },
      {
        accessorFn: (row) => row.format, // Преобразование в число
        id: 'Формат',
        cell: ({ row }) => (
          <FormatFormatter
            format={row.original.format}
            target={row.original.target_country}
          />
        ),
        filterFn: 'includesString',
        header: () => <span className="flex items-center gap-1">Формат</span>,
      },
      {
        accessorFn: (row) => row.start_date, // Преобразование в число
        id: 'Начало',
        cell: ({ row }) => <>{formatDate(row.original.start_date)}</>,
        filterFn: 'includesString',
        header: () => <span className="flex items-center gap-1">Начало</span>,
      },
      {
        accessorFn: (row) => row.end_date, // Преобразование в число
        id: 'Конец',
        cell: ({ row }) => <> {formatDate(row.original.end_date)}</>,
        filterFn: 'includesString',
        header: () => <span className="flex items-center gap-1">Конец</span>,
      },
      {
        accessorFn: (row) => row.budget, // Преобразование в число
        id: 'План показов',
        cell: ({ row }) => (
          <FormatterView data={row.original.ordered_number_of_views} />
        ),
        filterFn: 'includesString',
        header: () => (
          <span className="flex items-center gap-1">План показов</span>
        ),
      },
      {
        accessorFn: (row) => row.status, // Преобразование в число
        id: 'Статус',
        cell: ({ row }) => (
          <>
            <AdvertStatus
              status={row.original.order_status}
              endDate={row.original.order_actual_end_date}
            />
          </>
        ),
        filterFn: 'includesString',
        header: () => <span className="flex items-center gap-1">Статус</span>,
      },
      {
        accessorFn: (row) => row.expected_number_of_views, // Преобразование в число
        id: 'Действия',
        cell: ({ row }) => (
          <div className="flex gap-2">
            <TooltipWrapper
              tooltipContent={`${expandedRowId ? 'Закрыть' : 'Открыть'}`}
            >
              <Button
                onClick={() => {
                  setExpandedRowId((prev) => {
                    return prev === row.id ? null : row.id // Переключение состояния
                  })
                }}
                variant="default"
                className={` relative`}
              >
                <OpenSvg
                  className={[
                    ' transition-all ease-in-out',
                    expandedRowId ? 'rotate-90 scale-125' : 'rotate-0',
                  ].join(' ')}
                />

                {
                  <>
                    {row.original.order_status === 'in_review' ? null : (
                      <div className="absolute -top-1.5 left-4">
                        {row.original.inventory_count ? null : (
                          <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute  inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 text-[14px] items-center justify-center"></span>
                          </span>
                        )}
                      </div>
                    )}
                  </>
                }
              </Button>
            </TooltipWrapper>
            {row.original.order_status === 'finished' ? null : (
              <CommentPopover data={row.original} />
            )}

            {row.original.order_status === 'in_progress' ||
            row.original.order_status === 'finished' ? null : (
              <FormWrapperCreate
                isPopoverOpen={isPopoverOpen}
                setIsPopoverOpen={setIsPopoverOpen}
                row={row}
                setIsPopoverOpenData={setIsPopoverOpenData}
              />
            )}
          </div>
        ),
        filterFn: 'includesString',
        header: () => <span className="flex items-center gap-1">Действия</span>,
      },
    ],
    [expandedRowId, setIsPopoverOpen, currentOrder],
  )

  const table = useReactTable({
    data: listsentPublisher.results || [], // Данные из Redux
    columns,
    state: {
      columnFilters,
      globalFilter,
      pagination,
      expanded: expandedRowId ? { [expandedRowId]: true } : {}, // Управляем развернутыми строками
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
    getExpandedRowModel: getExpandedRowModel(), // Для поддержки подтаблиц
  })

  return {
    table,
    columns,
    setColumnFilters,
    flexRender,
    globalFilter,
    setGlobalFilter,
    pagination,
    renderSubComponent,
    isPopoverOpenData,
  }
}
