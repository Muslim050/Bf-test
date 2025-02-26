import React from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import {useSelector} from 'react-redux';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.jsx";
import FormatterPhone from "@/components/Labrery/formatter/FormatterPhone.jsx";

export const useAdvertiserUser = () => {
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState('')
  const { advertiserUsers,total_count } = useSelector(
    (state) => state.advertiserUsers,
  )
  const [loading, setLoading] = React.useState(true)

  // const dispatch = useDispatch()
  const [pagination, setPagination] = React.useState({
    pageIndex: 0, // Начинаем с 0
    pageSize: 20,
  });
  const columns = React.useMemo(
    () => [
      {
        accessorFn: (_, index) => index + 1, // Используем индекс строки
        id: 'id',
        cell: info => info.row.index + 1, // Начинаем с 1
        filterFn: 'includesStringSensitive', //note: normal non-fuzzy filter column - case sensitive
        header: () => <span>№</span>,
      },
      {
        accessorFn: row => row.name,
        id: 'Username',
        cell: ({ row }) =>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild className="cursor-pointer">
                <div>{row.original.username}</div>
              </TooltipTrigger>
              <TooltipContent>
                <p>ID: {row.original.id}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>,
        filterFn: 'includesStringSensitive', //note: normal non-fuzzy filter column - case sensitive
        header: () => <span className="flex items-center gap-1">Username</span>,
      },
      {
        accessorFn: (row) => row.advertiser.name, // Преобразование в число
        id: 'Рекламодатель',
        cell: ({ row }) =>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild className="cursor-pointer">
                <div>{row.original.advertiser.name}</div>
              </TooltipTrigger>
              <TooltipContent>
                <p>ID: {row.original.advertiser.id}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>,
        filterFn: 'includesString',
        header: () => <span className="flex items-center gap-1">Рекламодатель</span>
      },
      {
        accessorFn: (row) => row.first_name, // Преобразование в число
        id: 'Имя',
        cell: info => info.getValue(),
        filterFn: 'includesString', //note: normal non-fuzzy filter column - case insensitive
        header: () => <span className='flex  items-center gap-1'>Имя</span>
      },
      {
        accessorFn: row => row.last_name,
        id: 'Фамилия',
        cell: info => info.getValue (),
        filterFn: 'includesString', //note: normal non-fuzzy filter column - case insensitive
        header: () => <span className='flex  items-center gap-1'>Фамилия</span>
      },
      {
        accessorFn: row => row.email,
        id: 'Email',
        cell: info => info.getValue(),
        filterFn: 'includesString', //note: normal non-fuzzy filter column - case insensitive
        header: () => <span className='flex  items-center gap-1'>Email</span>
      },
      {
        accessorFn: row => row.side === 'advertiser' && 'Рекламодатель',
        id: 'Роль',
        cell: info => info.getValue (),
        filterFn: 'includesString', //note: normal non-fuzzy filter column - case insensitive
        header: () => <span className='flex  items-center gap-1'>Роль</span>
      },
      {
        accessorFn: row => row.phone_number,
        id: 'Номер',
        cell: ({ row }) => <FormatterPhone phoneNumber={row.original.phone_number} />,
        filterFn: 'includesString', //note: normal non-fuzzy filter column - case insensitive
        header: () => <span className='flex  items-center gap-1'>Номер</span>
      },
    ],
    []
  )
  const table = useReactTable({
    data: advertiserUsers.results || [], // Ensure advertisers is defined
    columns,
    state: {
      columnFilters,
      globalFilter,
      pagination
    },
    onPaginationChange: (updater) => {
      setPagination((prev) => {
        const newPagination =
          typeof updater === 'function' ? updater(prev) : updater;
        return { ...prev, ...newPagination };
      });
    },
    pageCount: Math.ceil(total_count / pagination.pageSize), // Общее количество страниц
    manualPagination: true, // Указываем, что используем серверную пагинацию
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // pageCount: Math.ceil(total_count / pagination.pageSize), // Общее количество страниц
    //
    // onGlobalFilterChange: setGlobalFilter,
    // onColumnFiltersChange: setColumnFilters,
    // getCoreRowModel: getCoreRowModel(),
    // getFilteredRowModel: getFilteredRowModel(), // Client-side filtering
    // getSortedRowModel: getSortedRowModel(),
    // getFacetedRowModel: getFacetedRowModel(), // Client-side faceting
    // getFacetedUniqueValues: getFacetedUniqueValues(), // Generate unique values for select filter/autocomplete
    // getFacetedMinMaxValues: getFacetedMinMaxValues(), // Generate min/max values for range filter
    // getPaginationRowModel: getPaginationRowModel(),
    // onPaginationChange: setPagination,
  });

  return {
    table,
    columns,
    setColumnFilters,
    flexRender,
    globalFilter,
    setGlobalFilter,
    pagination,
    setLoading,
    loading
  };
};

