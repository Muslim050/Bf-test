import React, {useCallback} from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender, getPaginationRowModel
} from '@tanstack/react-table';
import { useSelector } from 'react-redux';
import {Monitor, MonitorPlay, MonitorUp} from "lucide-react";
import {hasRole} from "@/utils/roleUtils.js";
import {Button} from "@/components/ui/button.jsx";
import { Pencil } from 'lucide-react';
import backendURL from "@/utils/url.js";
import axiosInstance from "@/api/api.js";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.jsx";
import {truncate} from "@/utils/other.js";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export const useAdvertiserUtilizer = () => {
  const [columnFilters, setColumnFilters] = React.useState([]);
  const { advertisers, total_count } = useSelector((state) => state.advertiser);
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
        accessorFn: (row) => row.format, // Преобразование в число
        id: '-',
        cell: ({ row }) =>
          <>
            {row.original.logo &&
              <Avatar>
                <AvatarImage src={row.original.logo} alt="@shadcn"/>
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            }
          </>,
        filterFn: 'includesString',
        header: () => <span className="flex items-center gap-1"></span>,
        enableSorting: false,
        enableFiltering: false,
      },
      {
        accessorFn: row => row.name,
        id: 'Наименование Компании',
        cell: ({ row }) =>
            <div>{row.original.name}</div>,
        filterFn: 'includesStringSensitive', //note: normal non-fuzzy filter column - case sensitive
        header: () => <span>Наименование Компании</span>,
      },
      {
        accessorFn: (row) => Number(row.cpm_preroll), // Преобразование в число
        id: 'Preroll',
        cell: info => info.getValue(),
        filterFn: 'includesString',
        header: () =>
          hasRole('admin') ? (
            <span className="flex items-center gap-1"><Monitor/>Preroll</span>
          ) : null,
      },
      {
        accessorFn: (row) => Number (row.cpm_preroll_uz), // Преобразование в число
        id: 'Preroll UZ',
        cell: info => info.getValue(),
        filterFn: 'includesString', //note: normal non-fuzzy filter column - case insensitive
        header: () =>
          hasRole('admin') ? (
            <span className='flex  items-center gap-1'><Monitor/> Preroll
              <div className="rounded-[8px] px-1 pb-0.5 h-auto text-[16px] bg-[#606afc] inline">UZ</div>
            </span>
          ) : null,
      },
      {
        accessorFn: row => row.cpm_tv_preroll,
        id: 'TV Preroll',
        cell: info => info.getValue (),
        filterFn: 'includesString', //note: normal non-fuzzy filter column - case insensitive
        header: () =>
          hasRole('admin') ? (
            <span className='flex  items-center gap-1'><MonitorPlay/>TV Preroll</span>
          ) : null,
      },
      {
        accessorFn: row => row.cpm_tv_preroll_uz,
        id: 'TV Preroll UZ',
        cell: info => info.getValue(),
        filterFn: 'includesString', //note: normal non-fuzzy filter column - case insensitive
        header: () =>
          hasRole('admin') ? (
            <span className='flex  items-center gap-1'><Monitor/> TV Preroll
              <div className="rounded-[8px] px-1 pb-0.5 h-auto text-[16px] bg-[#606afc] inline">UZ</div>
            </span>
          ) : null,
      },
      {
        accessorFn: row => row.cpm_tv_preroll,
        id: 'Top Preroll',
        cell: info => info.getValue (),
        filterFn: 'includesString', //note: normal non-fuzzy filter column - case insensitive
        header: () =>
          hasRole('admin') ? (
            <span className='flex  items-center gap-1'><MonitorUp/>Top Preroll</span>
          ) : null,
      },
      {
        accessorFn: row => row.cpm_tv_preroll_uz,
        id: 'Top Preroll UZ',
        cell: info => info.getValue(),
        filterFn: 'includesString', //note: normal non-fuzzy filter column - case insensitive
        header: () =>
          hasRole('admin') ? (
            <span className='flex  items-center gap-1'><MonitorUp/>Top Preroll
              <div className="rounded-[8px] px-1 pb-0.5 h-auto text-[16px] bg-[#606afc] inline">UZ</div>
            </span>
          ) : null,
      },
      {
        accessorFn: (row) => row.email,
        id: 'Email',
        cell: (info) => info.getValue(),
        filterFn: 'includesString', //note: normal non-fuzzy filter column - case insensitive
        header: () => <span className='flex  items-center gap-1'>Email</span>,
      },
      {
        accessorFn: (row) => row.phone_number,
        id: 'Номер телефона',
        cell: (info) => info.getValue(),
        filterFn: 'includesString', //note: normal non-fuzzy filter column - case insensitive
        header: () => <span className='flex  items-center gap-1'>Номер телефона</span>,
      },
      {
        accessorFn: (row) => row.advertising_agency?.name,
        id: 'Рекламное агенство',
        cell: (info) => info.getValue(),
        filterFn: 'includesString', //note: normal non-fuzzy filter column - case insensitive
        header: () => <span className='flex  items-center gap-1'>Рекламное агенство</span>,
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
  const filteredColumns = columns.filter((column) => {
    // Если колонка зависит от роли admin, проверяем условие
    if (column.id === 'Preroll' || column.id === 'Preroll UZ' || column.id === 'TV Preroll' || column.id === 'TV Preroll UZ' || column.id === 'Top Preroll' || column.id === 'Top Preroll UZ') {
      return hasRole('admin');
    }
    return true; // Для всех остальных колонок
  });

  const table = useReactTable({
    data: advertisers.results || [], // Данные из Redux
    columns: filteredColumns,
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
    pagination
  };
};

