import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender, getPaginationRowModel, getExpandedRowModel
} from '@tanstack/react-table';
import {useDispatch, useSelector} from 'react-redux';
import {hasRole} from "@/utils/roleUtils.js";
import {Copy, ChartColumnIncreasing, PackagePlus, MessageSquareText} from "lucide-react";
import Cookies from "js-cookie";
import {FormatFormatter} from "@/utils/FormatFormatter.jsx";
import {formatDate} from "@/utils/formatterDate.jsx";
import FormatterView from "@/components/Labrery/formatter/FormatterView.jsx";
import AdvertStatus from "@/components/Labrery/AdvertStatus/AdvertStatus.jsx";
import toast from 'react-hot-toast'
import backendURL from "@/utils/url.js";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover.jsx'
import {Button} from "@/components/ui/button.jsx";
import ModalSentOrder from "@/components/Dashboard/SentOrder/receivedOrders/ModalSentOrder/index.jsx";
import OpenTableSentOrder from "@/components/module/TablePagination/OpenTableSentOrder.jsx";
import {OpenSvg} from "@/assets/icons-ui.jsx";
export const useReceived = () => {
  const [columnFilters, setColumnFilters] = React.useState([]);
  const { listsentPublisher, total_count } = useSelector((state) => state.sentToPublisher)
  const [globalFilter, setGlobalFilter] = React.useState('')
  const role = Cookies.get('role')
  const [showModalEditAdmin, setShowModalEditAdmin] = React.useState(false)
  const [pagination, setPagination] = React.useState({
    pageIndex: 0, // Начинаем с 0
    pageSize: 20,
  });
  const [expandedRowId, setExpandedRowId] = React.useState(null);

  const renderSubComponent = ({ row }) => {
    return (
      <OpenTableSentOrder data={row.original} />
    );
  };
  const redirectToTariffDetails = React.useCallback((advert) => {
    const url = `/chart-order-table/${advert.id}`
    window.open(url, '_blank', 'noopener,noreferrer') // Открыть в новом окне
  }, [])
  const dispatch = useDispatch()
  // Модальное окно Index
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
  // Модальное окно Index
  const [currentOrder, setCurrentOrder] = React.useState(null)
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(currentOrder.notes)
      .then(() => {
        toast.success('Комментарий скопирован в буфер обмена', {
          duration: 3000,
        })
      })
      .catch((err) => {
        toast.error('Не удалось скопировать комментарий', {
          duration: 3000,
        })
      })
  }
  const columns = React.useMemo(
    () => [
      {
        id: 'id',
        accessorFn: (_, index) => index + 1, // Используем индекс строки
        cell: ({ row }) =>
          <div className='flex justify-between'>
            {row.original.order_status === 'in_review' ? (
              // <CircularTable/>
              <>
                  <span className=" h-5 w-2.5 flex">

                      <span
                        className=" inline-flex rounded-full h-5 w-2.5 bg-[#05c800] text-[14px] items-center justify-center"></span>
                    </span>
              </>
            ) : null}
            <div>{row.index + 1}</div>
            <div style={{display: 'flex', justifyContent: "space-between"}}>
              {row.original.order_status === 'in_review' ? null : <>
                {row.original.inventory_count ? null : <span className=" h-5 w-2.5">

                      <span
                        className="relative inline-flex rounded-full h-5 w-2.5 bg-red-500 text-[14px] items-center justify-center"></span>
                    </span>}
              </>}
            </div>
          </div>,

        filterFn: 'includesStringSensitive', //note: normal non-fuzzy filter column - case sensitive
        header: () => <span>№</span>,
      },
      {
        accessorFn: (row) => row.order_name, // Преобразование в число
        id: 'Кампания',
        cell: info => info.getValue(),
        filterFn: 'includesString',
        header: () => <span className="flex items-center gap-1">Кампания</span>
      },
      {
        accessorFn: (row) => row.format, // Преобразование в число
        id: 'Формат',
        cell: ({ row }) =>
          <FormatFormatter format={row.original.format} target={row.original.target_country} />,
        filterFn: 'includesString',
        header: () => <span className="flex items-center gap-1">Формат</span>
      },
      {
        accessorFn: (row) => row.start_date, // Преобразование в число
        id: 'Начало',
        cell: ({ row }) => <>{formatDate(row.original.start_date)}</>,
        filterFn: 'includesString',
        header: () => <span className="flex items-center gap-1">Начало</span>
      },
      {
        accessorFn: (row) => row.end_date, // Преобразование в число
        id: 'Конец',
        cell: ({ row }) => <> {formatDate(row.original.end_date)}</>,
        filterFn: 'includesString',
        header: () => <span className="flex items-center gap-1">Конец</span>
      },
      {
        accessorFn: (row) => row.expected_number_of_views, // Преобразование в число
        id: 'Ролик',
        cell: ({ row }) => <>
          <a
            href={`${backendURL}/media/${row.original.promo_file}`}
            target="_blank"
            className='text-[#A7CCFF] underline hover:text-[#3e8bf4]"'
            rel="noreferrer"
          >
            Видео
          </a>
        </>,
        filterFn: 'includesString',
        header: () => <span className="flex items-center gap-1">Ролик</span>
      },
      {
        accessorFn: (row) => row.budget, // Преобразование в число
        id: 'План показов',
        cell: ({row}) => <FormatterView data={row.original.ordered_number_of_views} />,
        filterFn: 'includesString',
        header: () => <span className="flex items-center gap-1">План показов</span>
      },
      {
        accessorFn: (row) => row.status, // Преобразование в число
        id: 'Статус',
        cell: ({ row }) =>
        <>
          <AdvertStatus
            status={row.original.order_status}
            endDate={row.original.order_actual_end_date}
          />
        </>,
        filterFn: 'includesString',
        header: () => <span className="flex items-center gap-1">Статус</span>
      },
      {
        accessorFn: (row) => row.expected_number_of_views, // Преобразование в число
        id: 'Действия',
        cell: ({ row }) =>
          <div className='flex gap-2'>
            <button
              // onClick={() => handleRowClick(item.id)}
              onClick={() => {
                setExpandedRowId ((prev) => {
                  return prev === row.id ? null : row.id; // Переключение состояния
                });
              }}
              className="relative hover:scale-125 transition-all"
            >
              <OpenSvg
                className={`hover:text-brandPrimary-1 transition-all ease-in-out 
                  ${ row.original.order_status === 'in_review' ? null : row.original.inventory_count ? null : 'text-red-500'}
                  ${
                  expandedRowId === row.id
                    ? 'rotate-90 text-brandPrimary-1 scale-125'
                    : 'rotate-0'
                }`}
              />

              {
                <>
                  {
                    row.original.order_status === 'in_review' ? null : <div className='absolute -top-1.5 left-4'>
                      {row.original.inventory_count ? null :
                        <span className="relative flex h-3 w-3">
                      <span
                        className="animate-ping absolute  inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                      <span
                        className="relative inline-flex rounded-full h-3 w-3 bg-red-500 text-[14px] items-center justify-center"></span>
                    </span>}
                    </div>}</>
              }

            </button>
            {row.original.order_status === 'finished' ? null : (
                <>
                  {row.original?.notes_text ? (
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          onClick={() => {
                            setCurrentOrder (row.original)
                          }}
                          className="hover:scale-125 transition-all p-0"
                        >
                          <MessageSquareText className="w-[24px] h-[24px] text-white hover:text-green-500" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full  bg-white bg-opacity-30 backdrop-blur-md rounded-xl">
                        <div className="grid gap-4 ">
                          <div className="w-80">
                            <h4 className="pb-4 font-medium leading-none text-white border-b-[#F9F9F926] border-b">
                              Комментарий
                            </h4>
                            <p className="text-sm text-white break-words pt-4">
                              {row.original.notes_text}
                            </p>
                            <p className="text-sm text-white break-words pt-4">
                              {row.original.notes_url}
                            </p>
                            <div className="flex mt-10 float-right">
                              <Button
                                variant="link"
                                className="text-black hover:text-[#2A85FF] "
                                onClick={copyToClipboard}
                              >
                                <Copy />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  ) : null}</>
            )}

            {row.original.order_status === 'in_progress' ||
            row.original.order_status === 'finished' ? null : (
              <Popover isOpen={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <button
                    onClick={() => setIsPopoverOpen(true)}
                    className="hover:scale-125 transition-all relative"
                  >
                    <PackagePlus className={`hover:text-orange-500 ${row.original.order_status === 'in_review' || row.original.order_status === 'confirmed' && 'text-green-400'}` } />
                    {hasRole('channel') || hasRole('publisher') ? (
                      <div className="absolute -top-2 -right-1">
                        {row.original.order_status === 'in_review' ||
                        row.original.order_status === 'confirmed' ? (
                          <span className="relative flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                        ) : null}
                      </div>
                    ) : null}
                  </button>
                </PopoverTrigger>
                <PopoverContent side="left" align="start" className="w-[400px] bg-white bg-opacity-30 backdrop-blur-md rounded-xl">
                  <ModalSentOrder setIsPopoverOpen={setIsPopoverOpen} item={row?.original} />
                </PopoverContent>

              </Popover>
            )}
          </div>,
        filterFn: 'includesString',
        header: () => <span className="flex items-center gap-1">Действия</span>
      },
      // {
      //   id: 'Детали',
      //   header: () => <span className="flex items-center gap-1">Детали</span>,
      //   cell: ({ row }) => {
      //     return (
      //       <div className="flex gap-2">
      //         {/*кнопка открыть*/}
      //
      //         {role === 'admin' ? (
      //           <button
      //             // onClick={() => handleRowClick(advert.id, row)}
      //             onClick={() => {
      //               setExpandedRowId ((prev) => {
      //                 console.log ("Updating expandedRowId from:", prev, "to:", prev === row.id ? null : row.id);
      //
      //                 return prev === row.id ? null : row.id; // Переключение состояния
      //               });
      //             }}
      //             className="relative hover:scale-125 transition-all "
      //           >
      //             <PanelTopOpen
      //               className={`
      //             ${row.original.inventories.filter (
      //                 (item) =>
      //                   item.video_content.link_to_video &&
      //                   item.status === 'booked',
      //               ).length > 0 && 'text-[#aa84ff]'}
      //             hover:text-brandPrimary-1 transition-all ease-in-out ${
      //                 expandedRowId === row.id
      //                   ? 'rotate-180 text-brandPrimary-1 scale-125'
      //                   : 'rotate-0'
      //               }`}
      //             />
      //
      //             <span>
      //             {row.original?.inventories?.filter (
      //               (item) =>
      //                 item.video_content.link_to_video &&
      //                 item.status === 'booked',
      //             ).length > 0 ? (
      //               <div className="absolute -top-2.5 -right-2.5">
      //                 <span className="relative flex h-[17px] w-[17px]">
      //                   <span
      //                     className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
      //                   <span
      //                     className="relative inline-flex items-center rounded-full h-[17px] w-[17px] bg-violet-500 justify-center text-[12px]">
      //                     {
      //                       row.original?.inventories?.filter (
      //                         (item) =>
      //                           item.video_content.link_to_video &&
      //                           item.status === 'booked',
      //                       ).length
      //                     }
      //                   </span>
      //                 </span>
      //               </div>
      //             ) : (
      //               <>
      //                 {row.status === 'in_review' &&
      //                 row.inventories.filter (
      //                   (item) => item.status === 'booked',
      //                 ).length > 0 ? (
      //                   <CircularBadge
      //                     style={{
      //                       backgroundColor: '#ff7d00',
      //                       width: '15px',
      //                       height: '15px',
      //                     }}
      //                     count={row.original.status === 'booked'}
      //                   />
      //                 ) : (
      //                   ''
      //                 )}
      //               </>
      //             )}
      //               {row.status === 'booked' ? (
      //                 <CircularBadge
      //                   style={{
      //                     backgroundColor: '#ff7d00',
      //                     width: '15px',
      //                     height: '15px',
      //                   }}
      //                   count={row.original.status === 'booked'}
      //                 />
      //               ) : (
      //                 ''
      //               )}
      //           </span>
      //           </button>
      //         ) : null}
      //         {/*кнопка открыть*/}
      //
      //
      //         {/*Статистика заказа*/}
      //         {row.original.status === 'in_progress' ||
      //         row.original.status === 'finished' ? (
      //           <button
      //             onClick={() => redirectToTariffDetails (row.original)}
      //             // onClick={() => redirectToTariffDetails(advert)}
      //             className="hover:scale-125 transition-all"
      //           >
      //             <ChartColumnIncreasing className="hover:text-green-400"/>
      //           </button>
      //         ) : (
      //           <>
      //             {role === 'advertising_agency' || role === 'advertiser'
      //               ? ''
      //               : null}
      //           </>
      //         )}
      //         {/*Статистика заказа*/}
      //
      //
      //       </div>
      //     )
      //   },
      //
      //
      // },
      // {
      //   id: 'Действия',
      //   header: () => <span className="flex items-center gap-1">Действия</span>,
      //   cell: ({ row }) => {
      //     const isOver100Percent =
      //       (row.original.online_views / row.original.expected_number_of_views) * 100 >= 100;
      //
      //
      //     return (
      //       <div className="flex gap-2">
      //
      //         {/*POPOVER*/}
      //         {hasRole ('admin') ||
      //         hasRole ('advertiser') ||
      //         hasRole ('advertising_agency') ? (
      //           <div>
      //             <PopoverButtons
      //               advert={row.original}
      //               isOver100Percent={isOver100Percent}
      //               setShowModalEditAdmin={setShowModalEditAdmin}
      //               handleFinishOrder={handleFinishOrder}
      //             />
      //           </div>
      //
      //         ) : null}
      //         {/*POPOVER*/}
      //       </div>
      //     )
      //   },
      //
      //
      // },

],
  [expandedRowId, setIsPopoverOpen]
)


  const table = useReactTable ({
    data: listsentPublisher.results || [], // Данные из Redux
    columns,
    state: {
      columnFilters,
      globalFilter,
      pagination,
      expanded: expandedRowId ? {[expandedRowId]: true} : {}, // Управляем развернутыми строками

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
    getCoreRowModel: getCoreRowModel (),
    getFilteredRowModel: getFilteredRowModel (),
    getSortedRowModel: getSortedRowModel (),
    getPaginationRowModel: getPaginationRowModel (),
    getExpandedRowModel: getExpandedRowModel (), // Для поддержки подтаблиц

  });

  return {
    table,
    columns,
    setColumnFilters,
    flexRender,
    globalFilter,
    setGlobalFilter,
    pagination,
    renderSubComponent
  };
};
