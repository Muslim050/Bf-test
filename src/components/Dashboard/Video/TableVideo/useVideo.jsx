import React, {useState} from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  flexRender, getPaginationRowModel
} from '@tanstack/react-table';
import { useSelector } from 'react-redux';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.jsx";
import {truncate} from "@/utils/other.js";
import {formatDate} from "@/utils/formatterDate.jsx";
import FormatterTime from "@/components/Labrery/formatter/FormatterTime.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Pencil, Plus, Link} from "lucide-react";
import {hasRole} from "@/utils/roleUtils.js";
import {ThemeContext} from "@/utils/ThemeContext.jsx";
import FormatterData from "@/components/Labrery/formatter/FormatterData.jsx";

export const useVideo = () => {
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState('')
  const { videos, total_count } = useSelector((state) => state.video)
  const [selectedId, setSelectedId] = useState('')
  const [currentOrder, setCurrentOrder] = React.useState(null)
  const { textColor } = React.useContext(ThemeContext)
  const [open, setOpen] = React.useState(false)
  const handleClose = () => {
    setOpen(false)
  }

  // Модальное окно EditVideo
  const [edit, setEdit] = React.useState(false)
  const handleCloseEdit = () => {
    setEdit(false)
  }
  // Модальное окно EditVideo

  const [pagination, setPagination] = React.useState({
    pageIndex: 0, // Начинаем с 0
    pageSize: 20,
  });

  const columns = React.useMemo(
    () => [
      {
        accessorFn: (_, index) => index + 1, // Используем индекс строки
        id: 'id',
        cell: ({row}) => (
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
        cell: info => info.getValue (),
        filterFn: 'includesString', //note: normal non-fuzzy filter column - case insensitive
        header: () => <span className='flex  items-center gap-1'>Канал</span>
      },
      {
        accessorFn: (row) => row.name, // Преобразование в число
        id: 'Название Видео',
        cell: ({row}) =>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild className="cursor-pointer">
                <div>{truncate(row.original.name, 20)}</div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{row.original.name}</p>
                <p>ID:{row.original.id}</p>

              </TooltipContent>
            </Tooltip>
          </TooltipProvider>,
        filterFn: 'includesString', //note: normal non-fuzzy filter column - case insensitive
        header: () => <span className='flex  items-center gap-1'>Название Видео</span>
      },
      {
        accessorFn: (row) => formatDate(row.publication_time), // Преобразование времени публикации
        id: 'Дата публикации',
        cell: ({row}) => <>{formatDate(row.original.publication_time)}</>,
        filterFn: 'includesString', // Фильтрация по строке
        header: () => <span className='flex items-center gap-1'>Дата начала</span>,
      },
      {
        accessorFn: (row) => row.duration, // Преобразование в число
        id: 'Ссылка',
        cell: ({row}) =>
        <>
          {row.original.link_to_video === null ? (
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
          ) : (
            <a
              href={row.original.link_to_video}
              target="_blank"
              className="text-[#A7CCFF] flex items-center gap-1	underline underline-offset-2  hover:text-[#006bff] group"
              rel="noreferrer"
            >
              <Link className="size-4 group-hover:text-[#006bff]" />
              Ссылка на Видео
            </a>
          )}</>,
        filterFn: 'includesString', // Фильтрация по строке
        header: () => <span className='flex items-center gap-1'>Ссылка</span>,
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
    []
  )
  const table = useReactTable({
    data: videos.results || [], // Данные из Redux
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
    setOpen, open,
    handleClose,
    selectedId,
    edit,
    setEdit,
    handleCloseEdit,
    currentOrder,
    pagination
  };
};

