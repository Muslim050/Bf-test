import React, {useCallback} from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import {useSelector} from 'react-redux';
import {hasRole} from "@/utils/roleUtils.js";
import {Button} from "@/components/ui/button.jsx";
import {Pencil} from 'lucide-react';
import backendURL from "@/utils/url.js";
import FormatterPhone from "@/components/Labrery/formatter/FormatterPhone.jsx";
import axiosInstance from "@/api/api.js";


export const useAdvertiserAgencyUtilizer = () => {
  const [columnFilters, setColumnFilters] = React.useState([]);
  const { advertiserAgency, total_count } = useSelector(
    (state) => state.advertiserAgency,
  )
  const [globalFilter, setGlobalFilter] = React.useState('')
  const [currentAdv, setCurrentAdv] = React.useState(null)
  // Модальное окно OrderModal
  const [open, setOpen] = React.useState(false)
  const [pagination, setPagination] = React.useState({
    pageIndex: 0, // Начинаем с 0
    pageSize: 20,
  });


  const fetchCpm = useCallback(async (id) => {
    try {
      const url = `${backendURL}/order/cpm/?advertiser=${id}`
      await axiosInstance.get(url)
    } catch (error) {
      console.error('Error fetching CPM:', error)
    }
  }, [])

  const handleCloseEdit = () => {
    setOpen(false)
  }
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
        id: 'Компании',
        cell: info => info.getValue(),
        filterFn: 'includesStringSensitive', //note: normal non-fuzzy filter column - case sensitive
        header: () => <span>Компании</span>,
      },
      {
        accessorFn: (row) => row.email, // Преобразование в число
        id: 'Email',
        cell: info => info.getValue(),
        filterFn: 'includesString',
        header: () =><span className="flex items-center gap-1">Email</span>
      },
      {
        accessorFn: row => row.phone_number,
        id: 'Телефона',
        cell: ({ row }) => <FormatterPhone phoneNumber={row.original.phone_number} />,
        filterFn: 'includesString', //note: normal non-fuzzy filter column - case insensitive
        header: () => <span className='flex  items-center gap-1'>Телефона	</span>
      },
      {
        accessorFn: row => row.commission_rate === 0 ? 'Нет комиссии' : `${row.commission_rate}%`,
        id: 'Комиссия %',
        cell: info => info.getValue (),
        filterFn: 'includesString', //note: normal non-fuzzy filter column - case insensitive
        header: () =>
          hasRole('admin') ? (
            <span className='flex  items-center gap-1'>Комиссия %	</span>
          ) : null,
      },
      {
        id: 'edit',
        cell: ({ row }) =>
          hasRole('admin') ? (
            <Button
              variant="link"
              onClick={() => {
                setCurrentAdv(row.original); // Передаем данные строки
                setOpen(true); // Открываем модальное окно
              }}
              className="hover:scale-125 transition-all p-0"
            >
              <Pencil className={`w-[24px] h-[24px] text-white hover:text-orange-500`} />
            </Button>
          ) : null,
        header: () => null,
        enableSorting: false,
        enableFiltering: false,
      },
    ],
    []
  )

  const table = useReactTable({
    data: advertiserAgency.results || [], // Данные из Redux
    columns,
    state: {
      columnFilters,
      globalFilter,
      pagination,
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
  });

  return {
    table,
    columns,
    setColumnFilters,
    flexRender,
    globalFilter,
    setGlobalFilter,
    open,
    setOpen,
    currentAdv,
    fetchCpm,
    handleCloseEdit,
    pagination
  };
};

