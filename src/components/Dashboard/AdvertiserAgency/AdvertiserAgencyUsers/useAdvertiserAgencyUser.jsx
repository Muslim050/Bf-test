import React from 'react'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useSelector } from 'react-redux'
import FormatterPhone from '@/components/Labrery/formatter/FormatterPhone.jsx'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip.jsx'

export const useAdvertiserAgencyUser = () => {
  const [columnFilters, setColumnFilters] = React.useState([])
  const { advertiserAgencyUsers, total_count } = useSelector(
    (state) => state.advertiserAgencyUsers,
  )
  const [pagination, setPagination] = React.useState({
    pageIndex: 0, // Начинаем с 0
    pageSize: 20,
  })
  const [globalFilter, setGlobalFilter] = React.useState('')
  const columns = React.useMemo(
    () => [
      {
        accessorFn: (_, index) => index + 1, // Используем индекс строки
        id: 'id',
        cell: (info) => info.row.index + 1, // Начинаем с 1
        filterFn: 'includesStringSensitive', //note: normal non-fuzzy filter column - case sensitive
        header: () => <span>№</span>,
      },
      {
        accessorFn: (row) => row?.username,
        id: 'Username',
        cell: ({ row }) => (
          <Tooltip>
            <TooltipTrigger asChild className="cursor-pointer">
              <div>{row.original?.username}</div>
            </TooltipTrigger>
            <TooltipContent>
              <p>ID: {row.original?.id}</p>
            </TooltipContent>
          </Tooltip>
        ),
        filterFn: 'includesStringSensitive', //note: normal non-fuzzy filter column - case sensitive
        header: () => <span>Username</span>,
      },
      {
        accessorFn: (row) => row.advertising_agency?.name, // Преобразование в число
        id: 'Рекламное агентство',
        cell: ({ row }) => (
          <Tooltip>
            <TooltipTrigger asChild className="cursor-pointer">
              <div>{row.original?.advertising_agency?.name}</div>
            </TooltipTrigger>
            <TooltipContent>
              <p>ID: {row.original?.advertising_agency?.id}</p>
            </TooltipContent>
          </Tooltip>
        ),
        filterFn: 'includesString',
        header: () => (
          <span className="flex items-center gap-1">Рекламное агентство</span>
        ),
      },
      {
        accessorFn: (row) => row.first_name,
        id: 'Имя',
        cell: (info) => info.getValue(),
        filterFn: 'includesString', //note: normal non-fuzzy filter column - case insensitive
        header: () => <span className="flex  items-center gap-1">Имя</span>,
      },
      {
        accessorFn: (row) => row.last_name,
        id: 'Фамилия',
        cell: (info) => info.getValue(),
        filterFn: 'includesString', //note: normal non-fuzzy filter column - case insensitive
        header: () => <span className="flex  items-center gap-1">Фамилия</span>,
      },
      {
        accessorFn: (row) => row.email,
        id: 'Email',
        cell: (info) => info.getValue(),
        filterFn: 'includesString', //note: normal non-fuzzy filter column - case insensitive
        header: () => <span className="flex  items-center gap-1">Email</span>,
      },
      {
        accessorFn: (row) => row.side,
        id: 'Роль',
        cell: (info) => info.getValue(),
        filterFn: 'includesString', //note: normal non-fuzzy filter column - case insensitive
        header: () => <span className="flex  items-center gap-1">Роль</span>,
      },
      {
        accessorFn: (row) => row.phone_number,
        id: 'Номер телефона',
        cell: ({ row }) => (
          <FormatterPhone phoneNumber={row.original.phone_number} />
        ),
        filterFn: 'includesString', //note: normal non-fuzzy filter column - case insensitive
        header: () => (
          <span className="flex  items-center gap-1">Номер телефона </span>
        ),
      },
    ],
    [],
  )

  const table = useReactTable({
    data: advertiserAgencyUsers.results || [], // Данные из Redux
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
    open,
    pagination,
  }
}
