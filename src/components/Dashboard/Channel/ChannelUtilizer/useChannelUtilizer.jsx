

import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender, getPaginationRowModel
} from '@tanstack/react-table';
import {useDispatch, useSelector} from 'react-redux';
import {hasRole} from "@/utils/roleUtils.js";
import {Button} from "@/components/ui/button.jsx";
import Cookies from "js-cookie";
import {Link} from "react-router-dom";
import { ChartColumn } from 'lucide-react';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.jsx";
import {googleAuth} from "@/redux/googleauth/googleauthSlice.js";
import {TableCell} from "@/components/ui/table.jsx";
import {ThemeContext} from "@/utils/ThemeContext.jsx";
import CircularBadge from "@/components/Labrery/Circular/CircularBadge.jsx";


export const useChannelUtilizer = () => {
  const [columnFilters, setColumnFilters] = React.useState([]);
  const { channel,total_count } = useSelector((state) => state.channel)
  const [globalFilter, setGlobalFilter] = React.useState('')
  const user = Cookies.get('role')
  const [googleAu, setGoogleAu] = React.useState(false)
  const linkGoogle = useSelector((state) => state.googleAuth.authUrl)
  const dispatch = useDispatch()
  const [pagination, setPagination] = React.useState({
    pageIndex: 0, // Начинаем с 0
    pageSize: 20,
  });
  const authGoogle = (pubId) => {
    dispatch(googleAuth(pubId))
    // setConnectG(false)
    setGoogleAu(true)
  }


  const { textColor } = React.useContext(ThemeContext)

  const columns = React.useMemo(
    () => [
      {
        accessorFn: (_, index) => index + 1, // Используем индекс строки
        id: 'id',
        // cell: info => info.row.index + 1, // Начинаем с 1
        cell: ({row}) =>
          <div className='relative flex w-auto items-center'>
            {!row.original.is_active && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="h-6 w-3	cursor-pointer hover:scale-110  bg-red-500 rounded-full top-[18px]   z-40"></div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-red-400 text-white font-medium relative z-40">
                    <p>Нужно переподключить канал</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <div
              className={`
              
              ${
                !row.original.is_active ? 'ml-2' : 'ml-0'
              }`}
            >
              {row.index + 1}
            </div>
            {user === 'publisher' ||
            user === 'admin' ||
            user === 'channel' ? (
              <>
                {row.original.is_connected === false ? (
                  <div className='flex'>
                      <span
                        className=" inline-flex rounded-full h-2.5 -left-2 -top-1 absolute w-2.5 bg-red-600 text-[14px]  items-center justify-center"></span>
                  </div>
                  ) : null}
              </>
            ) : null}
          </div>,
        filterFn: 'includesStringSensitive', //note: normal non-fuzzy filter column - case sensitive
        header: () => <span>№</span>,
      },
      {
        id: 'Канал',
        accessorFn: (row) => row.name, // Преобразование в число
        cell: ({row}) =>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className={` ${
                  row.original.is_active ? '' : 'font-semibold text-red-500'
                }`}

                    >
                  {row.original.name}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>ID:{row.original.id}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>,
        header: () => <span>Канал</span>,
      },
      {
        id: 'Аналитика',
        accessorFn: (row) => row.id, // Преобразование в число
        cell: ({row}) =>
          <Link
            to={`/statistics-channel/${row.original.id}/${row.original.name}`}
            state={{channel}}
            style={{display: 'contents'}}
          >
            <button className="hover:scale-125 transition-all">
              <ChartColumn className="hover:text-green-400 "/>
            </button>
          </Link>,
        header: () =>
          <span>Аналитика</span>,
        enableSorting: false,
        enableFiltering: false,
      },
      {
        id: 'Паблишер',
        accessorFn: (row) => row.publisher?.name, // Преобразование в число
        cell: ({row}) =>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-pointer">
                  {row?.original.publisher && row?.original.publisher.name
                    ? row.original.publisher?.name
                    : '-------'}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>ID:{row.original.publisher?.id}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>,
        header: () =>
          <span>Паблишер</span>,
      },
      {
        accessorFn: (row) => row.email, // Преобразование в число
        id: 'Email',
        cell: info => info.getValue(),
        filterFn: 'includesString',
        header: () =>
          <span>Email</span>
      },
      {
        accessorFn: (row) => row.phone_number,
        id: 'Номер телефона',
        cell: (info) => info.getValue(),
        filterFn: 'includesString', //note: normal non-fuzzy filter column - case insensitive
        header: () => <span className='flex  items-center gap-1'>Номер телефона</span>,
      },
      {
        accessorFn: (row) => row.channel_id, // Преобразование в число
        id: 'ID канала',
        cell: info => info.getValue(),
        filterFn: 'includesString',
        header: () =>
          <span>ID канала</span>
      },
      {
        accessorFn: (row) => row.channel_id, // Преобразование в число
        id: 'Статус',
        cell: ({ row }) => (
          <>
            {user === 'admin' ? (
              ''
            ) : (
              <div
                className={`font-normal text-${textColor} text-sm `}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    gap: '10px',
                    alignItems: 'center',
                    background: row.original.is_connected
                      ? '#DEEEE8'
                      : '#ffcece',
                    padding: '5px',
                    borderRadius: '22px',
                    boxShadow: row.original.is_connected
                      ? '0 0 4px #519C66'
                      : '0 0 4px #FF0000',
                    border: row.original.is_connected
                      ? '1px solid #519C66'
                      : '1px solid #FF0000',
                  }}
                >
                  {googleAu || (
                    <div>
                      {row.original.is_connected === false  ? (
                        <Button
                          className="bg-red-400 hover:bg-red-500 h-[25px] rounded-2xl"
                          onClick={() => authGoogle(row.original.id)}
                        >
                          Подключится
                        </Button>
                      ) : (
                        <Button
                          className={`bg-blue-500  rounded-[18px] h-[25px] ${row.original.is_active === false ? 'bg-red-500 hover:bg-red-600' : 'hover:bg-blue-600'}`}
                          onClick={() => authGoogle(row.original.id)}
                        >
                          Переподключиться
                        </Button>
                      )}
                    </div>
                  )}
                  {googleAu && (
                    <a
                      href={linkGoogle}
                      target="_blank"
                      rel="noreferrer"
                      className="flex "
                    >
                      <button className="relative bg-white p-3 rounded-[12px] border-2 border-blue-400 hover:border-blue-600">
                        <svg
                          width="20px"
                          height="20px"
                          viewBox="-0.5 0 48 48"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          fill="#000000"
                        >
                          <g
                            id="SVGRepo_bgCarrier"
                            strokeWidth="0"
                          ></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {' '}
                            <title>Google-color</title>{' '}
                            <desc>Created with Sketch.</desc>{' '}
                            <defs> </defs>{' '}
                            <g
                              id="Icons"
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              {' '}
                              <g
                                id="Color-"
                                transform="translate(-401.000000, -860.000000)"
                              >
                                {' '}
                                <g
                                  id="Google"
                                  transform="translate(401.000000, 860.000000)"
                                >
                                  {' '}
                                  <path
                                    d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                                    id="Fill-1"
                                    fill="#FBBC05"
                                  >
                                    {' '}
                                  </path>{' '}
                                  <path
                                    d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                                    id="Fill-2"
                                    fill="#EB4335"
                                  >
                                    {' '}
                                  </path>{' '}
                                  <path
                                    d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                                    id="Fill-3"
                                    fill="#34A853"
                                  >
                                    {' '}
                                  </path>{' '}
                                  <path
                                    d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                                    id="Fill-4"
                                    fill="#4285F4"
                                  >
                                    {' '}
                                  </path>{' '}
                                </g>{' '}
                              </g>{' '}
                            </g>{' '}
                          </g>
                        </svg>
                      </button>
                    </a>
                  )}
                  <>
                    {
                      row.original.is_active === false ? null
                        : <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          {row.original.is_connected ? (
                            <div className="text-green-600 pr-2">
                              Подключен
                            </div>
                          ) : (
                            <div
                              className={`text-red-500`}
                            >
                              Не Подключен
                            </div>
                          )}
                        </div>
                    }
                  </>

                </div>
              </div>
            )}
          </>
        ),
        enableSorting: false,
        filterFn: 'includesString',
        header: () => !hasRole('admin') && <span>Статус</span>,
      },
      {
        accessorFn: (row) => row.commission_rate, // Преобразование в число
        id: 'Процент комиссии канала',
        cell: ({ row }) => (
          <>
            {user === 'admin' && (
              <div
                className={`font-normal text-${textColor} text-sm `}
              >
                {
                  row.original?.commission_rate && <>
                    {row.original?.commission_rate} %</>
                }
              </div>
            )}
          </>
        ),
        filterFn: 'includesString',
        header: () => hasRole('admin') && <span>% комиссии</span>,
      },

    ],
    [googleAu, linkGoogle]
  )
  const filteredColumns = columns.filter((column) => {
    // Если колонка зависит от роли admin, проверяем условие
    if (column.id === 'Preroll' || column.id === 'Preroll UZ' || column.id === 'TV Preroll' || column.id === 'TV Preroll UZ' || column.id === 'Top Preroll' || column.id === 'Top Preroll UZ') {
      return hasRole('admin');
    }
    return true; // Для всех остальных колонок
  });

  const table = useReactTable({
    data: channel.results || [], // Данные из Redux
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
    pagination
  };
};

