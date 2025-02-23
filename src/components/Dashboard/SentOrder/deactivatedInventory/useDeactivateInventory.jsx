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
import {truncate} from "@/utils/other.js";
import {formatDate} from "@/utils/formatterDate.jsx";
import CircularTable from "@/components/Labrery/Circular/CircularTable.jsx";
import Cookies from "js-cookie";
import {FormatFormatter} from "@/utils/FormatFormatter.jsx";
import FormatterView from "@/components/Labrery/formatter/FormatterView.jsx";
import AdvertStatus from "@/components/Labrery/AdvertStatus/AdvertStatus.jsx";
import {Link} from "lucide-react";

export const useDeactivateInventory = () => {
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState('')
  const { diactivatedInventory, total_count } = useSelector((state) => state.inventory)
  const user = Cookies.get('role')
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
            {user === 'publisher' || user === 'channel' ? (
              <>
                {row.status === 'pre_booked' ? (
                  <CircularTable />
                ) : null}
              </>
            ) : null}
            {user === 'admin' ? (
              <>
                {row.status === 'open' ? (
                  <div className="w-2 h-6 rounded-[2px] bg-[#05c800] absolute -left-2"></div>
                ) : null}
              </>
            ) : null}
          </div>
        ),
        filterFn: 'includesStringSensitive', //note: normal non-fuzzy filter column - case sensitive
        header: () => <span>№</span>,
      },
      {
        accessorFn: (row) => row.channel?.name, // Преобразование в число
        id: 'Канал',
        cell: ({row}) =>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild className="cursor-pointer">
                <div>{truncate(row?.original.channel === null ? '' : row.original.channel?.name, 20)}</div>
              </TooltipTrigger>
              <TooltipContent>
                <p>ID:{row?.id}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>,
        filterFn: 'includesString', //note: normal non-fuzzy filter column - case insensitive
        header: () => <span className='flex  items-center gap-1'>Канал</span>
      },
      {
        accessorFn: (row) => row.video_content.name, // Преобразование в число
        id: 'Название видео',
        cell: ({row}) =>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild className="cursor-pointer">
                <div>{truncate(row.original.video_content?.name, 20)}</div>
              </TooltipTrigger>
              <TooltipContent>
                <p>ID:{row?.original.video_content?.id}</p>
                <p>{row.original.video_content?.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>,
        filterFn: 'includesString', //note: normal non-fuzzy filter column - case insensitive
        header: () => <span className='flex  items-center gap-1'>Название видео</span>
      },
      {
        accessorFn: (row) => row.format, // Преобразование в число
        id: 'Формат',
        cell: ({row}) =>
          <FormatFormatter format={row.original.format} />,
        filterFn: 'includesString', //note: normal non-fuzzy filter column - case insensitive
        header: () => <span className='flex  items-center gap-1'>Формат</span>
      },
      {
        accessorFn: (row) => row.video_content?.publication_time, // Преобразование в число
        id: 'Дата начала',
        cell: ({row}) => <>
          {formatDate (row.original.video_content?.publication_time)}
        </>,
        filterFn: 'includesString', //note: normal non-fuzzy filter column - case insensitive
        header: () => <span className='flex  items-center gap-1'>Дата начала</span>
      },
      {
        accessorFn: (row) => row.expected_number_of_views, // Преобразование в число
        id: 'Показы факт',
        cell: ({row}) => <>{row.original.recorded_view_count ? <FormatterView data={row.original.recorded_view_count}/> : <div>----</div>}</>,
        filterFn: 'includesString', //note: normal non-fuzzy filter column - case insensitive
        header: () => <span className='flex  items-center gap-1'>Показы факт</span>
      },
      {
        accessorFn: (row) => row.status, // Преобразование в число
        id: 'Статус',
        cell: ({row}) =>  <AdvertStatus
          status={row.original.status}
          endDate={row.original.deactivation_date}
        />,
        filterFn: 'includesString', //note: normal non-fuzzy filter column - case insensitive
        header: () => <span className='flex  items-center gap-1'>Статус</span>
      },
      {
        id: 'Действия',
        header: () => <span className="flex items-center gap-1">Действия</span>,
        cell: ({ row }) => {
          return (
            <div className="inline-flex">
              <a
                href={row.original.video_content.link_to_video}
                target="_blank"
                className=" hover:scale-105 transition-all w-full h-auto px-4 py-1 rounded-2xl flex items-center gap-1.5  bg-green-600 hover:bg-green-400 border border-transparent hover:border-green-600"
                rel="noreferrer"
              >
                <Link className="w-[20px] h-[20px] text-white"/>
                Ссылка на Видео
              </a>


            </div>
          )
        },


      },
    ],
    []
  )
  const table = useReactTable ({
    data: diactivatedInventory.results || [], // Данные из Redux
    columns,
    state: {
      columnFilters,
      globalFilter,
      pagination,
    },
    onPaginationChange: (updater) => {
      setPagination ((prev) => {
        const newPagination =
          typeof updater === 'function' ? updater (prev) : updater;
        return {...prev, ...newPagination};
      });
    },
    pageCount: Math.ceil (total_count / pagination.pageSize), // Общее количество страниц
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
    pagination
  };
};

