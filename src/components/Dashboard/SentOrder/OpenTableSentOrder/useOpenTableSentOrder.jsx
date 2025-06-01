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
import { Paperclip, SquareArrowOutUpRight } from 'lucide-react'
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
import AdvertStatus from '@/components/Labrery/AdvertStatus/AdvertStatus.jsx'
import toast from 'react-hot-toast'
import { fetchOrder } from '@/redux/order/orderSlice.js'
import { finishOrder } from '@/redux/orderStatus/orderStatusSlice.js'
import OpenTableSentOrder from '@/components/module/TablePagination/OpenTableSentOrder.jsx'
import { Button } from '@/components/ui/button.jsx'
import { showModalVideoLinked } from '@/redux/modalSlice.js'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import LinkedVideoModal from '@/components/Dashboard/SentOrder/OpenTableSentOrder/LinkedVideoModal.jsx'

export const useOpenTableSentOrder = () => {
  const [columnFilters, setColumnFilters] = React.useState([])
  const { inventory, total_count } = useSelector((state) => state.inventory)
  const [globalFilter, setGlobalFilter] = React.useState('')
  const role = Cookies.get('role')
  const [showModalEditAdmin, setShowModalEditAdmin] = React.useState(false)
  const [pagination, setPagination] = React.useState({
    pageIndex: 0, // Начинаем с 0
    pageSize: 100,
  })
  // Модальное окно LinkedVideo
  const [open, setOpen] = React.useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  // Модальное окно LinkedVideo
  const [expandedRowId, setExpandedRowId] = React.useState(null)

  const renderSubComponent = ({ row }) => {
    return <OpenTableSentOrder data={row.original} />
  }

  const [id, setId] = React.useState(null)
  const inventoryPublish = (id) => {
    setId(id)
  }
  const linkedVideo = (id) => {
    dispatch(showModalVideoLinked())
    inventoryPublish(id)
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
        toast.error(`Ошибка завершения заказа: ${error.data.error.detail}`)
        dispatch(
          fetchOrder({
            page: pagination.pageIndex + 1, // API использует нумерацию с 1
            pageSize: pagination.pageSize,
          }),
        )
      })
  }

  const columns = React.useMemo(
    () => [
      {
        id: 'id',
        accessorFn: (_, index) => index + 1, // Используем индекс строки
        cell: ({ row }) => (
          <div className="flex items-center">
            <div>{row.index + 1}</div>

            {role === 'publisher' || role === 'channel' ? (
              <>
                {row.original.status === 'pre_booked' ? (
                  <CircularTable />
                ) : null}
              </>
            ) : null}

            {role === 'admin' ? (
              <>{row.original.status === 'open' ? <CircularTable /> : null}</>
            ) : null}
          </div>
        ),
        filterFn: 'includesStringSensitive', //note: normal non-fuzzy filter column - case sensitive
        header: () => <span>№</span>,
      },
      {
        accessorFn: (row) => row.channel.name, // Преобразование в число
        id: 'Канал',
        cell: ({ row }) => (
          <>
            <Tooltip>
              <TooltipTrigger asChild className="cursor-pointer">
                <div>{truncate(row.original.channel.name, 20)}</div>
              </TooltipTrigger>
              <TooltipContent>
                <p>ID:{row.original?.id}</p>
              </TooltipContent>
            </Tooltip>
          </>
        ),
        filterFn: 'includesString',
        header: () => <span className="flex items-center gap-1">Канал</span>,
      },
      {
        accessorFn: (row) => row.video_content?.name, // Преобразование в число
        id: 'Название Видео	',
        cell: ({ row }) => (
          <>
            <Tooltip>
              <TooltipTrigger asChild className="cursor-pointer">
                <a
                  target="_blank"
                  className={`
                    ${row.original.video_content.link_to_video !== null && 'text-[#A7CCFF] hover:text-[#3282f1] hover:underline'}
                    no-underline   flex gap-1`}
                  href={row.original.video_content.link_to_video}
                >
                  {truncate(row.original.video_content?.name, 20)}
                  {row.original.video_content.link_to_video !== null && (
                    <SquareArrowOutUpRight className="size-4" />
                  )}
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>{row.original.video_content?.name}</p>
                <p>ID:{row.original?.video_content?.id}</p>
              </TooltipContent>
            </Tooltip>
          </>
        ),
        filterFn: 'includesString',
        header: () => (
          <span className="flex items-center gap-1">Название Видео </span>
        ),
      },
      {
        accessorFn: (row) => row.expected_start_date, // Преобразование в число
        id: 'Дата начала	',
        cell: ({ row }) => (
          <> {formatDate(row.original.video_content?.publication_time)}</>
        ),
        filterFn: 'includesString',
        header: () => (
          <span className="flex items-center gap-1">Дата начала </span>
        ),
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

        filterFn: 'includesString',
        header: () => <span className="flex items-center gap-1">Формат</span>,
      },
      {
        accessorFn: (row) => row.expected_end_date, // Преобразование в число
        id: 'Показы факт',
        cell: ({ row }) => (
          <>
            {' '}
            {row.original.online_views > 0 ? (
              <FormatterView data={row.original.online_views} />
            ) : (
              <div>----</div>
            )}
          </>
        ),
        filterFn: 'includesString',
        header: () => (
          <span className="flex items-center gap-1">Показы факт</span>
        ),
      },
      {
        accessorFn: (row) => row.status, // Преобразование в число
        id: 'Статус',
        cell: ({ row }) => (
          <>
            <AdvertStatus
              status={row.original.status}
              endDate={row.original.deactivation_date}
            />
          </>
        ),
        filterFn: 'includesString',
        header: () => <span className="flex items-center gap-1">Статус</span>,
      },
      {
        id: 'Действия',
        header: () => <span className="flex items-center gap-1">Действия</span>,
        cell: ({ row }) => {
          return (
            <div className="inline-flex">
              <Dialog>
                {row.original.video_content.link_to_video === null && (
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => {
                        linkedVideo(row.original.video_content.id),
                          setOpen(!open)
                      }}
                      style={{ backdropFilter: 'blur(10.3049px)' }}
                      className=" hover:scale-105 transition-all w-full h-auto px-4 py-1.5 rounded-2xl flex items-center gap-1.5  bg-blue-500 hover:bg-blue-400 border border-transparent hover:border-blue-600"
                    >
                      <Paperclip className="w-[20px] h-[20px] text-white" />
                      Прикрепить ссылку
                    </Button>
                  </DialogTrigger>
                )}
                <DialogContent className="sm:max-w-[425px]">
                  <LinkedVideoModal
                    onClose={handleClose}
                    selectedId={row.original.video_content.id}
                    setOpen={setOpen}
                  />
                </DialogContent>
              </Dialog>
            </div>
          )
        },
      },
    ],
    [],
  )

  const table = useReactTable({
    data: inventory.results || [], // Данные из Redux
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
  }
}
