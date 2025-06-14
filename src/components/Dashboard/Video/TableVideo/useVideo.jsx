import React, { useState } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip.jsx'
import { truncate } from '@/utils/other.js'
import { formatDate } from '@/utils/formatterDate.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Pencil, Plus, SquareArrowOutUpRight } from 'lucide-react'
import { hasRole } from '@/utils/roleUtils.js'
import { ThemeContext } from '@/utils/ThemeContext.jsx'
import { fetchVideos } from '@/redux/video/videoSlice.js'

export const useVideo = () => {
  const [columnFilters, setColumnFilters] = React.useState([])
  const [globalFilter, setGlobalFilter] = React.useState('')
  const [selectedId, setSelectedId] = useState('')
  const [currentOrder, setCurrentOrder] = React.useState(null)
  const { textColor } = React.useContext(ThemeContext)
  const [open, setOpen] = React.useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  const [pagination, setPagination] = React.useState({
    pageIndex: 0, // Начинаем с 0
    pageSize: 20,
  })
  const [videos, setVideos] = useState()
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    async function loadVideos() {
      setLoading(true) // Устанавливаем loading в true перед загрузкой
      try {
        const data = await fetchVideos({
          page: pagination.pageIndex + 1,
          pageSize: pagination.pageSize,
        })
        setVideos(data)
      } catch (error) {
        console.error('Ошибка загрузки видео:', error)
        setVideos([]) // Можно задать пустой массив или обрабатывать по-другому
      } finally {
        setLoading(false) // Всегда ставим false в конце
      }
    }

    loadVideos()
  }, [pagination.pageIndex, pagination.pageSize])

  // Модальное окно EditVideo
  const [edit, setEdit] = React.useState(false)
  const handleCloseEdit = () => {
    setEdit(false)
  }
  // Модальное окно EditVideo

  const columns = React.useMemo(
    () => [
      {
        accessorFn: (_, index) => index + 1, // Используем индекс строки
        id: 'id',
        cell: ({ row }) => (
          <div className="relative flex items-center">
            <span>{row.index + 1}</span>
            {row.original.link_to_video === null && (
              <div className="w-2 h-6 bg-[#05c800] rounded-2xl absolute -left-2"></div>
            )}
          </div>
        ),
        filterFn: 'includesStringSensitive', //note: normal non-fuzzy filter column - case sensitive
        header: () => <span>№</span>,
      },
      {
        accessorFn: (row) => row.channel?.name, // Преобразование в число
        id: 'Канал',
        cell: (info) => info.getValue(),
        filterFn: 'includesString', //note: normal non-fuzzy filter column - case insensitive
        header: () => <span className="flex  items-center gap-1">Канал</span>,
      },
      {
        accessorFn: (row) => row.name, // Преобразование в число
        id: 'Название Видео',
        cell: ({ row }) => (
          <Tooltip>
            <TooltipTrigger asChild className="cursor-pointer">
              <a
                target="_blank"
                className={`no-underline text-[#A7CCFF] hover:text-[#3282f1] hover:underline flex gap-1`}
                href={row.original.link_to_video}
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
        filterFn: 'includesString', //note: normal non-fuzzy filter column - case insensitive
        header: () => (
          <span className="flex  items-center gap-1">Название Видео</span>
        ),
      },
      {
        accessorFn: (row) => formatDate(row.publication_time), // Преобразование времени публикации
        id: 'Дата публикации',
        cell: ({ row }) => <>{formatDate(row.original.publication_time)}</>,
        filterFn: 'includesString', // Фильтрация по строке
        header: () => (
          <span className="flex items-center gap-1">Дата начала</span>
        ),
      },
      {
        accessorFn: (row) => row.duration, // Преобразование в число
        id: '_',
        cell: ({ row }) => (
          <>
            {row.original.link_to_video === null && (
              <Button
                variant="link"
                onClick={() => {
                  setSelectedId(row.id)
                  setOpen(!open)
                }}
                className="text-[#ff9105] flex items-center gap-1	underline underline-offset-2  hover:text-[#ffaa3e] group px-0"
              >
                <Plus className="w-5 h-5 " />
                Прикрепить Видео
              </Button>
            )}
          </>
        ),
        enableSorting: false,

        filterFn: 'includesString', // Фильтрация по строке
        header: () => <span className="flex items-center gap-1"></span>,
      },
      {
        id: 'edit',
        cell: ({ row }) =>
          hasRole('admin') && !row.original.link_to_video ? (
            <Button
              variant="link"
              onClick={() => {
                setCurrentOrder(row.original)
                setEdit(!edit)
              }}
              className={`text-${textColor} hover:text-brandPrimary-50 p-1`}
            >
              <Pencil className="w-5 h-5 " />
            </Button>
          ) : null,
        header: () => null,
        enableSorting: false,
        enableFiltering: false,
      },
    ],
    [],
  )
  const table = useReactTable({
    data: videos?.results || [], // Данные из Redux
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
    pageCount: Math.ceil(videos?.count / pagination.pageSize), // Общее количество страниц
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
    setOpen,
    open,
    handleClose,
    selectedId,
    edit,
    setEdit,
    handleCloseEdit,
    currentOrder,
    pagination,
    loading,
    setLoading,
  }
}
