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
import {Film, ChartColumnIncreasing} from "lucide-react";
import CircularTable from "@/components/Labrery/Circular/CircularTable.jsx";
import Cookies from "js-cookie";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.jsx";
import {truncate} from "@/utils/other.js";
import {FormatFormatter} from "@/utils/FormatFormatter.jsx";
import {formatDate} from "@/utils/formatterDate.jsx";
import FormatterView from "@/components/Labrery/formatter/FormatterView.jsx";
import FormatterBudjet from "@/components/Labrery/formatter/FormatterBudjet.jsx";
import AdvertStatus from "@/components/Labrery/AdvertStatus/AdvertStatus.jsx";
import {getProgressStyle} from "@/components/Dashboard/Order/OrderTable/components/getProgressStyle.jsx";
import NestedTable from "@/components/module/TablePagination/nestedTable.jsx";
import CircularBadge from "@/components/Labrery/Circular/CircularBadge.jsx";
import PopoverButtons from "@/components/Dashboard/Order/OrderTable/components/PopoverButtons.jsx";
import toast from 'react-hot-toast'
import {fetchOrder, setOrderStatus} from "@/redux/order/orderSlice.js";
import {fetchViewStatus, finishOrder} from "@/redux/orderStatus/orderStatusSlice.js";
import {OpenSvg} from "@/assets/icons-ui.jsx";


export const useOrder = () => {
  const [columnFilters, setColumnFilters] = React.useState([]);
  const { order, total_count } = useSelector((state) => state.order)
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
      <NestedTable data={row.original} />
    );
  };
  const redirectToTariffDetails = React.useCallback((advert) => {
    const url = `/chart-order-table/${advert.id}`
    window.open(url, '_blank', 'noopener,noreferrer') // Открыть в новом окне
  }, [])
  const dispatch = useDispatch()

  const handleFinishOrder = (id) => {
    // setFinishingOrderId(id) // Устанавливаем ID заказа, который в процессе завершения
    // setIsFetchingOrder(true) // Устанавливаем состояние загрузки

    dispatch(finishOrder({ id }))
      .unwrap()
      .then((result) => {
        toast.success('Заказ успешно завершен')
        // onClose() - если необходимо
        dispatch(
          fetchOrder({
            page: pagination.pageIndex + 1, // API использует нумерацию с 1
            pageSize: pagination.pageSize,
          })
        )
      })
      .catch((error) => {
        toast.error(`Ошибка завершения заказа: ${error.data.error.detail}`)
        dispatch(
          fetchOrder({
            page: pagination.pageIndex + 1, // API использует нумерацию с 1
            pageSize: pagination.pageSize,
          }),
        )
      })
  }

  const handleRowClick = (id, data) => {
    const item = data.find((item) => item.id === id)

    if (item && item.status === 'sent') {
      dispatch(fetchViewStatus(id)).then((result) => {
        if (result.type === fetchViewStatus.fulfilled.toString()) {
          dispatch(setOrderStatus({ orderId: id, status: 'accepted' }))
        }
      })
    } else {
      // setTimeout (() => fetchGetOrder (id), 2000); // Fetch the specific order directly after 2 seconds if the status is not "sent"
    }
  }

  const columns = React.useMemo(
    () => [
      {
        id: 'id',
        accessorFn: (_, index) => index + 1, // Используем индекс строки
        cell: ({ row }) => {
          const isOver100Percent =
            (row.original.online_views / row.original.expected_number_of_views) *
            100 >=
            100;

          return (
            <div className='flex items-center'>
              <div>{row.index + 1}</div>

              {role === 'advertiser' || role === 'advertising_agency' ? (
                <>
                  {row.original.status === 'in_progress' ? (
                    <CircularTable/>
                  ) : null}
                </>
              ) : null}

              {role === 'admin' && (
                <>{row.original.status === 'sent' || row.original.status === 'accepted' ? <div className='flex'>
                      <span
                        className="relative inline-flex rounded-full h-5 w-2.5 bg-[#05c800] text-[14px] ml-2 items-center justify-center"></span>
                </div> : null}</>
              )}

              {role === 'admin' && (
                <>{row.original.inventories?.filter (
                  (item) =>
                    item.video_content.link_to_video &&
                    item.status === 'booked',
                ).length > 0 ? <div className='flex'>
                      <span
                        className=" inline-flex rounded-full h-5 w-2.5 bg-[#aa84ff] text-[14px] ml-2 items-center justify-center"></span>
                </div> : null}</>
              )}

              {row.original.status === 'finished' ? null :
                <>
                  {role === 'admin' && (
                    <>{isOver100Percent ? <div>
                      <span
                        className="relative inline-flex rounded-full h-5 w-2.5 bg-red-600 text-[14px] ml-2 items-center justify-center"></span>
                    </div> : null}</>
                  )}</>

              }
            </div>
          )

        },
        filterFn: 'includesStringSensitive', //note: normal non-fuzzy filter column - case sensitive
        header: () => <span>№</span>,
      },
      {
        accessorFn: (row) => row.name, // Преобразование в число
        id: 'Кампания',
        cell: ({ row }) =>
          <>
            {role === 'admin' ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild className="cursor-pointer">
                    <div>{truncate(row.original.name, 20)}</div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>ID: {row.original.id}</p>
                    <p>Кампания: {row.original.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <div>{truncate(row.original.name, 20)}</div>
            )}</>,
        filterFn: 'includesString',
        header: () => <span className="flex items-center gap-1">Кампания</span>
      },
      {
        accessorFn: (row) => row.promo_file, // Преобразование в число
        id: 'Ролик',
        cell: ({ row }) =>
          <>
            <a
              href={row.original.promo_file}
              target="_blank"
              className="text-[#A7CCFF]  underline-offset-2 underline hover:text-[#0767eb]"
              rel="noreferrer"
            >
              <Film/>
            </a>
          </>,
        filterFn: 'includesString',
        header: () => <span className="flex items-center gap-1">Ролик</span>
      },
      {
        accessorFn: (row) => row.format, // Преобразование в число
        id: 'Формат',
        cell: ({ row }) =>
          <FormatFormatter format={row.original.format} target={row.original.target_country}  />,
        filterFn: 'includesString',
        header: () => <span className="flex items-center gap-1">Формат</span>
      },
      {
        accessorFn: (row) => row.expected_start_date, // Преобразование в число
        id: 'Начало',
        cell: ({ row }) => <>{formatDate(row.original.expected_start_date)}</>,
        filterFn: 'includesString',
        header: () => <span className="flex items-center gap-1">Начало</span>
      },
      {
        accessorFn: (row) => row.expected_end_date, // Преобразование в число
        id: 'Конец',
        cell: ({ row }) => <> {formatDate(row.original.expected_end_date)}</>,
        filterFn: 'includesString',
        header: () => <span className="flex items-center gap-1">Конец</span>
      },
      {
        accessorFn: (row) => row.expected_number_of_views, // Преобразование в число
        id: 'Показы',
        cell: ({ row }) => <>
          {row.status === 'finished' ? (
            <FormatterView data={row.original.online_views} />
          ) : (
            <FormatterView data={row.original.expected_number_of_views} />
          )}</>,
        filterFn: 'includesString',
        header: () => <span className="flex items-center gap-1">Показы</span>
      },
      {
        accessorFn: (row) => row.budget, // Преобразование в число
        id: 'Бюджет',
        cell: ({ row }) => <FormatterBudjet
          budget={row.original.budget}
          data={row.original.expected_start_date}
        />,
        filterFn: 'includesString',
        header: () => <span className="flex items-center gap-1">Бюджет</span>
      },
      {
        accessorFn: (row) => row.status, // Преобразование в число
        id: 'Статус',
        cell: ({ row }) =>
        <>
          <AdvertStatus status={row.original.status} endDate={row.original.actual_end_date}>
            {hasRole('admin') || hasRole('advertising_agency') || hasRole('advertiser') ? (
              row.original.status === 'in_progress' && (
                <div
                  className="rounded-lg px-1 font-semibold"
                  style={getProgressStyle(row.original.online_views, row.original.expected_number_of_views)}
                >
                  {Math.floor((row.original.online_views / row.original.expected_number_of_views) * 100)}%
                </div>
              )
            ) : null}
          </AdvertStatus>
        </>,
        filterFn: 'includesString',
        header: () => <span className="flex items-center gap-1">Статус</span>
      },
      {
        accessorFn: (row) => row.expected_number_of_views, // Преобразование в число
        id: 'Остаток',
        cell: ({ row }) =>
          <>
            {row.original.is_paid === true && role === 'admin'  ? (
              <div></div>
            ) : (
              <FormatterView
                data={row.original.expected_number_of_views - row.original.online_views}
              />
            )}
          </>,
        filterFn: 'includesString',
        header: () => <span className="flex items-center gap-1">Остаток</span>
      },
      {
        id: 'Детали',
        header: () => <span className="flex items-center gap-1">Детали</span>,
        cell: ({ row }) => {
          return (
            <div className="flex gap-2">
              {/*кнопка открыть*/}

              {role === 'admin' ? (
                <button
                  // onClick={() => handleRowClick(advert.id, row)}
                  onClick={() => {
                    handleRowClick(row.original.id, table.options.data); // Передача данных в функцию
                    setExpandedRowId((prev) => (prev === row.id ? null : row.id)); // Переключение состояния
                  }}
                  className="relative hover:scale-125 transition-all "
                >
                  <OpenSvg
                    className={`
                  ${row.original.inventories.filter (
                      (item) =>
                        item.video_content.link_to_video &&
                        item.status === 'booked',
                    ).length > 0 && 'text-[#aa84ff]'}
                  hover:text-brandPrimary-1 transition-all ease-in-out ${
                      expandedRowId === row.id
                        ? 'rotate-90 text-brandPrimary-1 scale-125'
                        : 'rotate-0'
                    }`}
                  />

                  <span>
                  {row.original?.inventories?.filter (
                    (item) =>
                      item.video_content.link_to_video &&
                      item.status === 'booked',
                  ).length > 0 ? (
                    <div className="absolute -top-2.5 -right-2.5">
                      <span className="relative flex h-[17px] w-[17px]">
                        <span
                          className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                        <span
                          className="relative inline-flex items-center rounded-full h-[17px] w-[17px] bg-violet-500 justify-center text-[12px]">
                          {
                            row.original?.inventories?.filter (
                              (item) =>
                                item.video_content.link_to_video &&
                                item.status === 'booked',
                            ).length
                          }
                        </span>
                      </span>
                    </div>
                  ) : (
                    <>
                      {row.status === 'in_review' &&
                      row.inventories.filter (
                        (item) => item.status === 'booked',
                      ).length > 0 ? (
                        <CircularBadge
                          style={{
                            backgroundColor: '#ff7d00',
                            width: '15px',
                            height: '15px',
                          }}
                          count={row.original.status === 'booked'}
                        />
                      ) : (
                        ''
                      )}
                    </>
                  )}
                    {row.status === 'booked' ? (
                      <CircularBadge
                        style={{
                          backgroundColor: '#ff7d00',
                          width: '15px',
                          height: '15px',
                        }}
                        count={row.original.status === 'booked'}
                      />
                    ) : (
                      ''
                    )}
                </span>
                </button>
              ) : null}
              {/*кнопка открыть*/}


              {/*Статистика заказа*/}
              {row.original.status === 'in_progress' ||
              row.original.status === 'finished' ? (
                <button
                  onClick={() => redirectToTariffDetails (row.original)}
                  // onClick={() => redirectToTariffDetails(advert)}
                  className="hover:scale-125 transition-all"
                >
                  <ChartColumnIncreasing className="hover:text-green-400"/>
                </button>
              ) : (
                <>
                  {role === 'advertising_agency' || role === 'advertiser'
                    ? ''
                    : null}
                </>
              )}
              {/*Статистика заказа*/}


            </div>
          )
        },


      },
      {
        id: 'Действия',
        header: () => <span className="flex items-center gap-1 w-max">Действия</span>,
        cell: ({ row }) => {
          const isOver100Percent =
            (row.original.online_views / row.original.expected_number_of_views) * 100 >= 100;


          return (
            <div className="flex gap-2 w-fit">

              {/*POPOVER*/}
              {hasRole ('admin') ||
              hasRole ('advertiser') ||
              hasRole ('advertising_agency') ? (
                <div>
                  <PopoverButtons
                    advert={row.original}
                    isOver100Percent={isOver100Percent}
                    setShowModalEditAdmin={setShowModalEditAdmin}
                    handleFinishOrder={handleFinishOrder}
                  />
                </div>

              ) : null}
              {/*POPOVER*/}
            </div>
          )
        },


      },

],
  [expandedRowId]
)


  const table = useReactTable ({
    data: order.results || [], // Данные из Redux
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
