import React from 'react'
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
import {
  BookmarkCheck,
  Pencil,
  Send,
  SquareArrowOutUpRight,
} from 'lucide-react'
import {
  fetchOnceListSentToPublisher,
  sentToPublisherButton,
} from '@/redux/order/SentToPublisher.js'
import FormatterBudjet from '@/components/Labrery/formatter/FormatterBudjet.jsx'
import { Link as LinkR } from 'react-router-dom'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog.jsx'
import { toast } from 'react-hot-toast'
import { fetchSingleOrder } from '@/redux/order/orderSlice.js'

export const useAddSentPublisher = (expandedRows, onceOrder) => {
  const [columnFilters, setColumnFilters] = React.useState([])
  const { listsentPublisher, total_count } = useSelector(
    (state) => state.sentToPublisher,
  )
  const [globalFilter, setGlobalFilter] = React.useState('')
  const [pagination, setPagination] = React.useState({
    pageIndex: 0, // Начинаем с 0
    pageSize: 20,
  })
  const dispatch = useDispatch()
  const [editNote, setEditNote] = React.useState(false)

  React.useEffect(() => {
    dispatch(
      fetchOnceListSentToPublisher({
        page: pagination.pageIndex + 1, // API использует нумерацию с 1
        pageSize: pagination.pageSize,
        expandedRows,
      }),
    )
  }, [dispatch, pagination.pageIndex, pagination.pageSize])
  const [openPopoverIndex, setOpenPopoverIndex] = React.useState(null)
  const clickSentPublisher = (itemID) => {
    dispatch(sentToPublisherButton({ id: itemID }))
      .unwrap()
      .then(() => {
        toast.success('Запись успешно отправлена')
        dispatch(
          fetchOnceListSentToPublisher({
            expandedRows,
            page: pagination.pageIndex + 1,
            pageSize: pagination.pageSize,
          }),
        )
        dispatch(fetchSingleOrder(onceOrder.id))
      })
      .catch((error) => {
        toast.error(error.message)
        dispatch(
          fetchOnceListSentToPublisher({
            expandedRows,
            page: pagination.pageIndex + 1,
            pageSize: pagination.pageSize,
          }),
        )
      })
  }
  const [currentOrder, setCurrentOrder] = React.useState(null)

  const listsentPublisherWithIndex = listsentPublisher?.results?.map(
    (item, index) => ({
      ...item,
      rowIndex: index, // Добавляем rowIndex
    }),
  )
  const columns = React.useMemo(
    () => [
      {
        accessorFn: (row) => row.publisher?.name, // Преобразование в число
        id: 'Паблишер',
        cell: (info) => info.getValue(),
        filterFn: 'includesStringSensitive', //note: normal non-fuzzy filter column - case sensitive
        header: () => <span>Паблишер</span>,
      },
      {
        accessorFn: (row) => row.channel?.name, // Преобразование в число
        id: 'Канал',
        cell: (info) => info.getValue(),
        filterFn: 'includesStringSensitive', //note: normal non-fuzzy filter column - case sensitive
        header: () => <span>Канал</span>,
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
        accessorFn: (row) => row.format, // Преобразование в число
        id: 'Начало',
        cell: ({ row }) => <>{formatDate(row.original.start_date)}</>,
        filterFn: 'includesStringSensitive', //note: normal non-fuzzy filter column - case sensitive
        header: () => <span>Начало</span>,
      },
      {
        accessorFn: (row) => row.format, // Преобразование в число
        id: 'Конец',
        cell: ({ row }) => <>{formatDate(row.original.end_date)}</>,
        filterFn: 'includesStringSensitive', //note: normal non-fuzzy filter column - case sensitive
        header: () => <span>Конец</span>,
      },
      {
        accessorFn: (row) => row.format, // Преобразование в число
        id: 'Порог',
        cell: ({ row }) => (
          <div className="flex gap-2 items-center justify-between">
            <FormatterView data={row.original.ordered_number_of_views} />
            {/*<Popover*/}
            {/*  onOpenChange={(isOpen) => {*/}
            {/*    if (isOpen) {*/}
            {/*      setOpenPopoverIndex(row.original.rowIndex);*/}
            {/*    } else {*/}
            {/*      setOpenPopoverIndex(null);*/}
            {/*    }*/}
            {/*  }}*/}
            {/*  open={openPopoverIndex === row.original.rowIndex}*/}
            {/*>*/}
            {/*  <PopoverTrigger asChild>*/}
            {/*    <button*/}
            {/*      className="bg-[#5670f1] rounded-full hover:scale-125 transition-all "*/}
            {/*    >*/}
            {/*      <Plus className="w-5 h-5"/>*/}
            {/*    </button>*/}
            {/*  </PopoverTrigger>*/}
            {/*  /!* eslint-disable-next-line no-undef *!/*/}
            {/*  {openPopoverIndex === row.original.rowIndex && (*/}
            {/*    <PopoverContent className="w-80 bg-white bg-opacity-30 backdrop-blur-md rounded-2xl">*/}
            {/*      <PopoverEditView*/}
            {/*        item={row}*/}
            {/*        expandedRows={expandedRows}*/}
            {/*        setOpenPopoverIndex={setOpenPopoverIndex}*/}
            {/*        onceOrder={onceOrder}*/}
            {/*      />*/}
            {/*    </PopoverContent>*/}
            {/*  )}*/}
            {/*</Popover>*/}
          </div>
        ),
        filterFn: 'includesStringSensitive', //note: normal non-fuzzy filter column - case sensitive
        header: () => <span>Порог</span>,
      },
      {
        accessorFn: (row) => row.online_views, // Преобразование в число
        id: 'Прогресс',
        cell: ({ row }) => (
          <>
            {row.original.online_views > 0 ? (
              <FormatterView data={row.original.online_views} />
            ) : (
              <div>----</div>
            )}
          </>
        ),
        filterFn: 'includesStringSensitive', //note: normal non-fuzzy filter column - case sensitive
        header: () => <span>Прогресс</span>,
      },
      {
        accessorFn: (row) => row.budget, // Преобразование в число
        id: 'Бюджет',
        cell: ({ row }) => <FormatterBudjet budget={row.original.budget} />,
        filterFn: 'includesStringSensitive', //note: normal non-fuzzy filter column - case sensitive
        header: () => <span>Бюджет</span>,
      },
      {
        accessorFn: (row) => row.content_language, // Преобразование в число
        id: 'Ссылка',
        cell: ({ row }) => (
          <LinkR
            to={row.original.notes_url}
            target="_blank"
            className="underline text-[#A7CCFF] flex gap-1 items-center hover:text-[#3e8bf4]"
          >
            Ссылка
            <SquareArrowOutUpRight className="size-4" />
          </LinkR>
        ),
        filterFn: 'includesStringSensitive', //note: normal non-fuzzy filter column - case sensitive
        header: () => <span>Ссылка</span>,
      },
      {
        accessorFn: (row) => row.country, // Преобразование в число
        id: 'Действие',
        cell: ({ row }) => (
          <div className="flex gap-2">
            {row.original.is_sent_to_publisher ? null : (
              <button
                onClick={() => {
                  setEditNote(true)
                  setCurrentOrder((prev) =>
                    prev?.id === row.original.id ? null : row.original,
                  )
                }}
                className="hover:scale-125 transition-all"
              >
                <Pencil className="text-white w-6 h-6 hover:text-orange-500" />
              </button>
            )}
            {row.original.is_sent_to_publisher ? (
              <div className="inline-flex items-center ">
                <BookmarkCheck className="w-6 h-6 text-[#8EB67B]" />
              </div>
            ) : (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="hover:scale-125 transition-all">
                    <Send className="text-white w-6 h-6 hover:text-brandPrimary-1" />
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-black">
                      Данное размещение отправится паблишеру
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-red-500 font-bold">
                      Это действие не может быть отменено.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="text-white">
                      Отмена
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-brandPrimary-50 hover:bg-brandPrimary-1 border-2 border-brandPrimary-1 "
                      onClick={() => clickSentPublisher(row.original.id)}
                    >
                      Отправить
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        ),
        filterFn: 'includesStringSensitive', //note: normal non-fuzzy filter column - case sensitive
        header: () => <span>Действие</span>,
      },
    ],
    [openPopoverIndex, expandedRows, onceOrder],
  )

  const table = useReactTable({
    data: listsentPublisherWithIndex || [], // Данные из Redux
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
    currentOrder,
    listsentPublisherWithIndex,
    setCurrentOrder,
    setEditNote,
    editNote,
  }
}
