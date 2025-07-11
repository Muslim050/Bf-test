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
import { useDispatch, useSelector } from 'react-redux'
import { hasRole } from '@/utils/roleUtils.js'
import { ChartColumnIncreasing, SquareArrowOutUpRight } from 'lucide-react'
import CircularTable from '@/components/Labrery/Circular/CircularTable.jsx'
import Cookies from 'js-cookie'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip.jsx'
import { truncate } from '@/utils/other.js'
import { FormatFormatter } from '@/utils/FormatFormatter.jsx'
import { formatDate } from '@/utils/formatterDate.jsx'
import FormatterView from '@/components/Labrery/formatter/FormatterView.jsx'
import FormatterBudjet from '@/components/Labrery/formatter/FormatterBudjet.jsx'
import AdvertStatus from '@/components/Labrery/AdvertStatus/AdvertStatus.jsx'
import { getProgressStyle } from '@/components/Dashboard/Order/OrderTable/components/getProgressStyle.jsx'
import NestedTable from '@/module/TablePagination/nestedTable.jsx'
import CircularBadge from '@/components/Labrery/Circular/CircularBadge.jsx'
import PopoverButtons from '@/components/Dashboard/Order/OrderTable/components/PopoverButtons.jsx'
import toast from 'react-hot-toast'
import { fetchOrder, setOrderStatus } from '@/redux/order/orderSlice.js'
import {
  fetchViewStatus,
  finishOrder,
} from '@/redux/orderStatus/orderStatusSlice.js'
import { OpenSvg } from '@/assets/icons-ui.jsx'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.jsx'
import { Button } from '@/components/ui/button.jsx'
import TooltipWrapper from '@/shared/TooltipWrapper.jsx'

export const useOrder = () => {
  const [columnFilters, setColumnFilters] = React.useState([])
  const { order, total_count } = useSelector((state) => state.order)
  const [searchInOrder, setSearchInOrder] = React.useState('')

  const role = Cookies.get('role')
  const [pagination, setPagination] = React.useState({
    pageIndex: 0, // Начинаем с 0
    pageSize: 20,
  })
  const [expandedRowId, setExpandedRowId] = React.useState(null)

  const renderSubComponent = ({ row }) => {
    return <NestedTable data={row.original} />
  }
  const redirectToTariffDetails = React.useCallback((advert) => {
    const url = `/chart-order-table/${advert.id}`
    window.open(url, '_blank', 'noopener,noreferrer') // Открыть в новом окне
  }, [])
  const dispatch = useDispatch()

  const handleFinishOrder = (id) => {
    // setFinishingOrderId(id) // Устанавливаем ID заказа, который в процессе завершения
    // setIsFetchingOrder(true) // Устанавливаем состояние загрузки

    dispatch(finishOrder({ id }))
      .unwrap()
      .then((result) => {
        toast.success('Заказ успешно завершен')
        // onClose() - если необходимо
        dispatch(
          fetchOrder({
            page: pagination.pageIndex + 1, // API использует нумерацию с 1
            pageSize: pagination.pageSize,
          }),
        )
      })
      .catch((error) => {
        toast.error(`${error.data.error.detail}`)
        dispatch(
          fetchOrder({
            page: pagination.pageIndex + 1, // API использует нумерацию с 1
            pageSize: pagination.pageSize,
          }),
        )
      })
  }

  const handleRowClick = (id, data) => {
    const item = data.find((item) => item.id === id)
    if (item && item.status === 'sent') {
      dispatch(fetchViewStatus(id)).then((result) => {
        if (result.type === fetchViewStatus.fulfilled.toString()) {
          dispatch(setOrderStatus({ orderId: id, status: 'accepted' }))
        }
      })
    }
  }

  const columns = React.useMemo(() => {
    const baseColumns = [
      {
        id: 'id',
        accessorFn: (_, index) => index + 1, // Используем индекс строки
        cell: ({ row }) => {
          const isOver100Percent =
            (row.original.online_views /
              row.original.expected_number_of_views) *
              100 >=
            100

          return (
            <div className="flex items-center">
              <div>{row.index + 1}</div>

              {role === 'advertiser' || role === 'advertising_agency' ? (
                <>
                  {row.original.status === 'in_progress' ? (
                    <CircularTable />
                  ) : null}
                </>
              ) : null}

              {role === 'admin' && (
                <>
                  {row.original.status === 'sent' ||
                  row.original.status === 'accepted' ? (
                    <div className="flex">
                      <span className="relative inline-flex rounded-full h-5 w-2.5 bg-[#05c800] text-[14px] ml-2 items-center justify-center"></span>
                    </div>
                  ) : null}
                </>
              )}

              {role === 'admin' && (
                <>
                  {row.original.inventories?.filter(
                    (item) =>
                      item.video_content.link_to_video &&
                      item.status === 'booked',
                  ).length > 0 ? (
                    <div className="flex">
                      <span className=" inline-flex rounded-full h-5 w-2.5 bg-[#aa84ff] text-[14px] ml-2 items-center justify-center"></span>
                    </div>
                  ) : null}
                </>
              )}

              {row.original.status === 'finished' ? null : (
                <>
                  {role === 'admin' && (
                    <>
                      {isOver100Percent ? (
                        <div className="flex">
                          <span className="relative inline-flex rounded-full h-5 w-2.5 bg-red-600 text-[14px] ml-2 items-center justify-center"></span>
                        </div>
                      ) : null}
                    </>
                  )}
                </>
              )}
            </div>
          )
        },
        filterFn: 'includesStringSensitive', //note: normal non-fuzzy filter column - case sensitive
        header: () => <span>№</span>,
      },
      {
        id: '-',
        cell: ({ row }) => (
          <>
            {row.original.advertiser.logo && (
              <Avatar>
                <AvatarImage src={row.original.advertiser.logo} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            )}
          </>
        ),
        filterFn: 'includesString',
        header: () => <span className="flex items-center gap-1"></span>,
        enableSorting: false,
        enableFiltering: false,
      },
      {
        accessorFn: (row) => row.name, // Преобразование в число
        id: 'Кампания',
        cell: ({ row }) => (
          <Tooltip>
            <TooltipTrigger asChild className="cursor-pointer">
              <a
                target="_blank"
                className={`no-underline text-[#A7CCFF] hover:text-[#3282f1] hover:underline flex gap-1`}
                href={row.original.promo_file}
              >
                {truncate(row.original.name, 20)}
                <SquareArrowOutUpRight className="size-4" />
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>ID:{row?.original.id}</p>
              <p>{row.original.name}</p>
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
        accessorFn: (row) => row.expected_start_date, // Преобразование в число
        id: 'Начало',
        cell: ({ row }) => <>{formatDate(row.original.expected_start_date)}</>,
        filterFn: 'includesString',
        header: () => <span className="flex items-center gap-1">Начало</span>,
      },
      {
        accessorFn: (row) => row.expected_end_date, // Преобразование в число
        id: 'Конец',
        cell: ({ row }) => <> {formatDate(row.original.expected_end_date)}</>,
        filterFn: 'includesString',
        header: () => <span className="flex items-center gap-1">Конец</span>,
      },
      {
        accessorFn: (row) => row.expected_number_of_views, // Преобразование в число
        id: 'Показы',
        cell: ({ row }) => (
          <>
            {row.status === 'finished' ? (
              <FormatterView data={row.original.online_views} />
            ) : (
              <FormatterView data={row.original.expected_number_of_views} />
            )}
          </>
        ),
        filterFn: 'includesString',
        header: () => <span className="flex items-center gap-1">Показы</span>,
      },
      {
        accessorFn: (row) => row.budget, // Преобразование в число
        id: 'Бюджет',
        cell: ({ row }) => (
          <FormatterBudjet
            budget={row.original.budget}
            data={row.original.expected_start_date}
          />
        ),
        filterFn: 'includesString',
        header: () => <span className="flex items-center gap-1">Бюджет</span>,
      },
      {
        accessorFn: (row) => row.status, // Преобразование в число
        id: 'Статус',
        cell: ({ row }) => (
          <>
            <AdvertStatus
              status={row.original.status}
              endDate={row.original.actual_end_date}
            >
              {hasRole('admin') ||
              hasRole('advertising_agency') ||
              hasRole('advertiser')
                ? row.original.status === 'in_progress' && (
                    <div
                      className="rounded-lg px-1 font-semibold"
                      style={getProgressStyle(
                        row.original.online_views,
                        row.original.expected_number_of_views,
                      )}
                    >
                      {Math.floor(
                        (row.original.online_views /
                          row.original.expected_number_of_views) *
                          100,
                      )}
                      %
                    </div>
                  )
                : null}
            </AdvertStatus>
          </>
        ),
        filterFn: 'includesString',
        header: () => <span className="flex items-center gap-1">Статус</span>,
      },
      {
        accessorFn: (row) => row.expected_number_of_views, // Преобразование в число
        id: 'Остаток',
        cell: ({ row }) => (
          <>
            {row.original.is_paid === true && role === 'admin' ? (
              <div></div>
            ) : (
              <FormatterView
                data={
                  row.original.expected_number_of_views -
                  row.original.online_views
                }
              />
            )}
          </>
        ),
        filterFn: 'includesString',
        header: () => <span className="flex items-center gap-1">Остаток</span>,
      },
      {
        id: 'Детали',
        header: () => <span className="flex items-center gap-1">Детали</span>,
        cell: ({ row }) => {
          const isAdmin = role === 'admin'
          const { id, status, inventories } = row.original
          const isExpanded = expandedRowId === row.id

          // Сколько забронированных с видео
          const bookedWithVideoCount = inventories.filter(
            (item) =>
              item.video_content.link_to_video && item.status === 'booked',
          ).length

          // Есть ли хотя бы один booked inventory
          const hasBookedInventory = inventories.some(
            (item) => item.status === 'booked',
          )

          // ОТКРЫТЬ
          const renderOpenButton = () => (
            <TooltipWrapper
              tooltipContent={`${isExpanded ? 'Закрыть' : 'Открыть'}`}
            >
              <Button
                onClick={() => {
                  handleRowClick(id, table.options.data)
                  setExpandedRowId((prev) => (prev === row.id ? null : row.id))
                }}
                variant="default"
                className={` relative ${bookedWithVideoCount > 0 ? 'bg-[#aa84ff] hover:bg-[#8b5cf6]' : ''}`}
              >
                <OpenSvg
                  className={[
                    ' transition-all ease-in-out',
                    isExpanded ? 'rotate-90 scale-125' : 'rotate-0',
                  ].join(' ')}
                />

                {/* Badge/пульс вокруг иконки, если есть видео */}
                {bookedWithVideoCount > 0 && (
                  <div className="absolute -top-2 -right-2">
                    <span className="relative flex h-[17px] w-[17px]">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                      <span className="relative inline-flex items-center rounded-full h-[17px] w-[17px] bg-violet-500 justify-center text-[12px]">
                        {bookedWithVideoCount}
                      </span>
                    </span>
                  </div>
                )}
                {/* Дополнительный бейдж, если статус in_review/booked и есть booked inventory */}
                {(status === 'in_review' || status === 'booked') &&
                  hasBookedInventory && (
                    <CircularBadge
                      style={{
                        backgroundColor: '#ff7d00',
                        width: '15px',
                        height: '15px',
                      }}
                      count={status === 'booked'}
                    />
                  )}
              </Button>
            </TooltipWrapper>
          )

          // СТАТИСТИКА
          const renderStatsButton = () => (
            <TooltipWrapper tooltipContent="Статистика заказа">
              <Button
                onClick={() => redirectToTariffDetails(row.original)}
                variant="default"
                className="bg-green-500 hover:bg-green-400 "
              >
                <ChartColumnIncreasing />
              </Button>
            </TooltipWrapper>
          )

          return (
            <div className="flex gap-2">
              {isAdmin && renderOpenButton()}
              {(status === 'in_progress' || status === 'finished') &&
                renderStatsButton()}
            </div>
          )
        },
      },
    ]
    if (
      role === 'admin' ||
      role === 'advertiser' ||
      role === 'advertising_agency'
    ) {
      baseColumns.push({
        id: 'Действия',
        header: () => (
          <span className="flex items-center gap-1 w-max">Действия</span>
        ),
        cell: ({ row }) => {
          const isOver100Percent =
            (row.original.online_views /
              row.original.expected_number_of_views) *
              100 >=
            100

          return (
            <div className="flex gap-2 w-fit">
              {/*POPOVER*/}
              {hasRole('admin') ||
              hasRole('advertiser') ||
              hasRole('advertising_agency') ? (
                <div>
                  <PopoverButtons
                    advert={row.original}
                    isOver100Percent={isOver100Percent}
                    handleFinishOrder={handleFinishOrder}
                  />
                </div>
              ) : null}
              {/*POPOVER*/}
            </div>
          )
        },
      })
    }
    return baseColumns
  }, [expandedRowId, role])

  const table = useReactTable({
    data: order.results || [], // Данные из Redux
    columns,
    state: {
      columnFilters,
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
    pagination,
    renderSubComponent,
    setSearchInOrder,
    searchInOrder,
  }
}
