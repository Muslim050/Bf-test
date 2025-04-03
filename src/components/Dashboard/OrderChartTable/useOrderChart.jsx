import React from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStatistics } from '../../../redux/statisticsSlice'
import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import backendURL from '@/utils/url.js'
import axios from 'axios'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip.jsx'
import { truncate } from '@/utils/other.js'
import { FormatFormatter } from '@/utils/FormatFormatter.jsx'
import { formatDate } from '@/utils/formatterDate.jsx'
import FormatterView from '@/components/Labrery/formatter/FormatterView.jsx'
import { TiinFormatterBudget } from '@/components/Labrery/formatter/FormatterBudjet.jsx'
import AdvertStatus from '@/components/Labrery/AdvertStatus/AdvertStatus.jsx'
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import NestedStatickOrderTable from '@/components/module/TablePagination/NestedStatickOrderTable.jsx'
import { ChevronDown, ChevronUp, SquareArrowOutUpRight } from 'lucide-react'

export const useOrderChart = () => {
  const dispatch = useDispatch()
  const { id } = useParams()

  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(true)

  //фильтрация по дате
  const [startDate, setStartDate] = React.useState('')
  const [endDate, setEndDate] = React.useState('')
  const [dataFiltered, setDataFiltered] = React.useState(false)

  //фильтрация по дате
  const [isLoadingData, setIsLoadingData] = React.useState(false)

  // const orderData = location.state?.advert || {}
  const [orderData, setOrderData] = React.useState([])

  //table
  const [columnFilters, setColumnFilters] = React.useState([])
  const [globalFilter, setGlobalFilter] = React.useState('')
  const data = useSelector((state) => state.statistics.statistics.results)

  const totalBudjet = data?.map((i) => i.budget)
  const totalView = data?.map((i) => i.online_view_count)

  const sumBudjet = totalBudjet?.reduce((acc, num) => acc + num, 0)
  const sumView = totalView?.reduce((acc, num) => acc + num, 0)
  //

  React.useEffect(() => {
    const fetchOrderId = async () => {
      const token = Cookies.get('token')
      const response = await axios.get(
        `${backendURL}/order/${id}/`,

        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      setOrderData(response.data.data)
    }
    fetchOrderId()
  }, [id])

  //Получение отчета
  React.useEffect(() => {
    dispatch(fetchStatistics({ order_id: id }))
      .unwrap()
      .then(() => setLoading(false))
      .catch((error) => {
        setLoading(false)
        toast.error(error?.data?.error?.detail)
      })
  }, [dispatch, id])
  //Получение отчета

  //Дата
  React.useEffect(() => {
    const startDateObj = orderData?.expected_start_date
      ? new Date(orderData.expected_start_date)
      : null

    const endDateObj = orderData?.actual_end_date
      ? new Date(orderData.actual_end_date)
      : orderData?.expected_end_date
        ? new Date(orderData.expected_end_date)
        : null

    const minDate =
      startDateObj && !isNaN(startDateObj.getTime())
        ? startDateObj.toISOString().split('T')[0]
        : ''

    const maxDate =
      endDateObj && !isNaN(endDateObj.getTime())
        ? endDateObj.toISOString().split('T')[0]
        : ''

    setStartDate(minDate)
    setEndDate(maxDate)
  }, [
    id,
    orderData?.expected_start_date,
    orderData?.expected_end_date,
    orderData?.actual_end_date,
  ])
  //Дата

  const openFilter = () => {
    // Сброс дат к исходным значениям из orderData
    const startDateObj = orderData?.expected_start_date
      ? new Date(orderData.expected_start_date)
      : null
    const endDateObj = orderData?.actual_end_date
      ? new Date(orderData.actual_end_date)
      : orderData?.expected_end_date
        ? new Date(orderData.expected_end_date)
        : null

    const minDate =
      startDateObj && !isNaN(startDateObj.getTime())
        ? startDateObj.toISOString().split('T')[0]
        : ''
    const maxDate =
      endDateObj && !isNaN(endDateObj.getTime())
        ? endDateObj.toISOString().split('T')[0]
        : ''

    setStartDate(minDate)
    setEndDate(maxDate)
    setOpen(true)
  }

  //При закрытий окна фильтра
  const dataFilteredClose = () => {
    setDataFiltered(false)
    setOpen(false)
    setStartDate('')
    setEndDate('')
    setIsLoadingData(true)

    const toastId = toast.loading('Загрузка отчета..')

    dispatch(fetchStatistics({ order_id: id }))
      .then(() => {
        toast.success('Данные успешно обновлены', { id: toastId })
      })
      .catch((error) => {
        toast.error(`Failed to load statistics: ${error.message}`, {
          id: toastId,
        })
      })
      .finally(() => {
        setOpen(false)
        setStartDate('')
        setEndDate('')
        setIsLoadingData(false)
      })
  }
  //При закрытий окна фильтра

  //Очищаем фильтр
  const handleClear = () => {
    setDataFiltered(false)
    setOpen(false)

    const startDateObj = new Date(orderData?.expected_start_date)
    const endDateObj = orderData?.actual_end_date
      ? new Date(orderData?.actual_end_date)
      : new Date(orderData?.expected_end_date)

    const minDate = startDateObj.toISOString().split('T')[0]
    const maxDate = endDateObj.toISOString().split('T')[0]

    setStartDate(minDate)
    setEndDate(maxDate)
    setIsLoadingData(true)
    const toastId = toast.loading('Загрузка отчета...')

    dispatch(fetchStatistics({ order_id: id }))
      .then(() => {
        toast.success('Данные успешно обновлены', { id: toastId })
      })
      .catch((error) => {
        toast.error(`Failed to load statistics: ${error.message}`, {
          id: toastId,
        })
      })
      .finally(() => {
        setOpen(false)
        setIsLoadingData(false)
      })
  }
  //Очищаем фильтр

  //Фильтрация по параметрам

  const handleDateStatictick = () => {
    const toastId = toast.loading('Фильтруем отчет...')

    setDataFiltered(true)
    setIsLoadingData(true)
    setOpen(false)

    dispatch(fetchStatistics({ order_id: id, startDate, endDate }))
      .then(() => {
        toast.success('Данные успешно обновлены', { id: toastId })
      })
      .catch((error) => {
        toast.error(`Failed to load statistics: ${error.message}`, {
          id: toastId,
        })
      })
      .finally(() => {
        setOpen(false)
        setIsLoadingData(false)
      })
  }
  //Фильтрация по параметрам
  const [expandedRowId, setExpandedRowId] = React.useState(null)
  const renderSubComponent = ({ row }) => {
    return <NestedStatickOrderTable data={row.original} />
  }

  const columns = React.useMemo(
    () => [
      {
        id: 'id',
        accessorFn: (_, index) => index + 1, // Используем индекс строки
        cell: (info) => info.row.index + 1, // Начинаем с 1

        filterFn: 'includesStringSensitive', //note: normal non-fuzzy filter column - case sensitive
        header: () => <span>№</span>,
      },
      {
        accessorFn: (row) => row.channel_name,
        id: 'Канал',
        cell: (info) => info.getValue(),
        filterFn: 'includesString', //note: normal non-fuzzy filter column - case insensitive
        header: () => <span>Канал</span>,
      },
      {
        accessorFn: (row) => row.video_name, // Преобразование в число
        id: 'Название видео',
        cell: ({ row }) => (
          <>
            <a
              target="_blank"
              href={row.original.video_link}
              className="text-[#A7CCFF] underline hover:text-[#4289eb]"
              rel="noreferrer"
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild className="cursor-pointer">
                    <div className="flex items-center gap-1">
                      {truncate(row.original.video_name, 20)}
                      <SquareArrowOutUpRight className="size-4" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{row.original.video_name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </a>
          </>
        ),
        filterFn: 'includesString',
        header: () => (
          <span className="flex items-center gap-1">Название видео</span>
        ),
      },
      {
        accessorFn: (row) => row.order_format, // Преобразование в число
        id: 'Формат',
        cell: ({ row }) => (
          <FormatFormatter format={row.original.order_format} />
        ),
        filterFn: 'includesString',
        header: () => <span className="flex items-center gap-1">Формат</span>,
      },
      {
        accessorFn: (row) => row.publication_date, // Преобразование в число
        id: 'Начало',
        cell: ({ row }) => (
          <div style={{ display: 'flex', width: '100px' }}>
            {row.original.publication_date === null ? (
              <div>---</div>
            ) : (
              formatDate(row.original.publication_date)
            )}
          </div>
        ),
        filterFn: 'includesString',
        header: () => <span className="flex items-center gap-1">Начало</span>,
      },
      {
        accessorFn: (row) => row.status, // Преобразование в число
        id: 'Статус',
        cell: ({ row }) => (
          <AdvertStatus
            status={row.original.status}
            endDate={row.original.deactivation_date}
          />
        ),
        filterFn: 'includesString',
        header: () => <span className="flex items-center gap-1">Статус</span>,
      },
      {
        accessorFn: (row) => row.online_view_count, // Преобразование в число
        id: 'Показы',
        cell: ({ row }) => (
          <>
            {row.original.online_view_count ? (
              <FormatterView data={row.original.online_view_count} />
            ) : (
              <div>---</div>
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
          <>
            <TiinFormatterBudget budget={row.original.budget} />
          </>
        ),
        filterFn: 'includesString',
        header: () => <span className="flex items-center gap-1">Бюджет</span>,
      },
      {
        id: 'Анализ аудитории',
        header: () => (
          <span className="flex items-center gap-1">Анализ аудитории</span>
        ),
        cell: ({ row }) => {
          const isExpanded = expandedRowId === row.id
          return (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setExpandedRowId((prev) => (prev === row.id ? null : row.id)) // Переключение состояния
                }}
                className={`hover:scale-110 transition-all   px-[10px] py-[5px] flex rounded-[12px] hover:bg-white hover:text-[#12173c] ${
                  isExpanded
                    ? 'bg-white text-[#12173c]'
                    : 'bg-[#FFFFFF2B] text-white'
                }`}
              >
                {isExpanded ? 'Закрыть' : 'Показать'}
                {isExpanded ? (
                  <ChevronUp className="size-5" />
                ) : (
                  <ChevronDown className="size-5" />
                )}
              </button>
            </div>
          )
        },
      },
    ],
    [expandedRowId],
  )

  const table = useReactTable({
    data: data || [], // Данные из Redux
    columns,
    state: {
      columnFilters,
      globalFilter,
      expanded: expandedRowId ? { [expandedRowId]: true } : {}, // Управляем развернутыми строками
    },
    manualPagination: true, // Указываем, что используем серверную пагинацию
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(), // Для поддержки подтаблиц
  })

  return {
    table,
    setColumnFilters,
    setGlobalFilter,
    flexRender,

    dataFilteredClose,
    handleDateStatictick,
    renderSubComponent,
    handleClear,
    dataFiltered,
    orderData,
    setStartDate,
    startDate,
    setEndDate,
    endDate,
    loading,
    setOpen,
    open,
    setLoading,
    sumBudjet,
    sumView,
    isLoadingData,
    openFilter,
  }
}
