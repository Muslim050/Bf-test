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
import CircularTable from "@/components/Labrery/Circular/CircularTable.jsx";
import Cookies from "js-cookie";
import FormatterView from "@/components/Labrery/formatter/FormatterView.jsx";
import AdvertStatus from "@/components/Labrery/AdvertStatus/AdvertStatus.jsx";
import {SquareArrowOutUpRight} from "lucide-react";


export function calculateShowRedCircle(deactivationDateStr, status) {
  const deactivationDate = new Date(deactivationDateStr);
  const redCircleThreshold = new Date(deactivationDate.getTime() + 24 * 60 * 60 * 1000);
  const now = new Date();
  return status === 'inactive' && now >= deactivationDate && now <= redCircleThreshold;
}


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
        cell: ({ row }) => {
          const showRedCircle = calculateShowRedCircle(
            row.original.deactivation_date,
            row.original.status
          );
          return (
            <div className="relative flex items-center">
              <span>{row.index + 1}</span>
              {(user === 'publisher' || user === 'channel') && (
                <>
                  {row.status === 'pre_booked' && <CircularTable />}
                </>
              )}
              {user === 'admin' && (
                <>
                  {row.status === 'open' && (
                    <div className="w-2 h-6 rounded-[2px] bg-[#05c800] absolute -left-2"></div>
                  )}
                </>
              )}
              {showRedCircle && (
                <span
                  className="ml-2 relative inline-flex rounded-full h-5 w-2.5 bg-red-500 text-[14px] items-center justify-center"></span>
              )}
            </div>
          );
        },
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
                <a
                  target="_blank"
                  className={`no-underline text-[#A7CCFF] hover:text-[#3282f1] hover:underline flex gap-1`}
                  href={row.original.video_content.link_to_video}>{truncate(row.original.video_content?.name, 20)}
                  <SquareArrowOutUpRight className='size-4'/>
                </a>

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
        accessorFn: (row) => row.expected_number_of_views, // Преобразование в число
        id: 'Показы факт',
        cell: ({row}) => <>{row.original.recorded_view_count ? <FormatterView data={row.original.recorded_view_count}/> : <div>----</div>}</>,
        filterFn: 'includesString', //note: normal non-fuzzy filter column - case insensitive
        header: () => <span className='flex  items-center gap-1'>Показы факт</span>
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

