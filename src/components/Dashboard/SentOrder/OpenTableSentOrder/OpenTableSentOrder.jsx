import React from 'react'
import { fetchInventory } from '../../../../redux/inventory/inventorySlice'
import { useDispatch, useSelector } from 'react-redux'
import OpenTableSentOrderData from './OpenTableSentOrderData'
import ModalSentOrder from '../receivedOrders/ModalSentOrder'
import style from '@/components/Dashboard/SentOrder/TableSentsOrder.module.scss'
import {
  TableHead,
  Table,
  TableHeader,
  TableRow,
  TableBody,
} from '@/components/ui/table.jsx'
import { ThemeContext } from '@/utils/ThemeContext.jsx'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover.jsx'
import { PackagePlus } from 'lucide-react'
import { hasRole } from '../../../../utils/roleUtils'
import Cookies from 'js-cookie'
import TablePagination from "@/components/module/TablePagination/index.jsx";
import Pagination from "@/components/module/Pagination/index.jsx";
import {useOrder} from "@/components/Dashboard/Order/OrderTable/useOrder.jsx";
import {useOpenTableSentOrder} from "@/components/Dashboard/SentOrder/OpenTableSentOrder/useOpenTableSentOrder.jsx";

const headers = [
  { key: 'id', label: '№' },
  { key: 'channel.name', label: 'Канал' },
  { key: 'video_content.name', label: 'Название Видео	' },
  { key: 'category', label: 'Категория' },

  { key: 'format', label: 'Формат' },
  { key: 'publication_time', label: 'Дата начала' },

  {
    key: 'expected_number_of_views',
    label: 'Показы факт',
  },

  {
    key: 'status',
    label: 'Статус',
  },
  { key: 'status', label: 'Действия' },
  { key: 'status', label: '' },
]

function OpenTableSentOrder({ item }) {
  const { textColor } = React.useContext(ThemeContext)
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)

  const dispatch = useDispatch()
  const [loading, setLoading] = React.useState(true)
  const data = useSelector((state) => state.inventory.inventory)

  const {
    table, // Экземпляр таблицы
    flexRender,
    pagination,

  } = useOpenTableSentOrder();

  React.useEffect(() => {
    dispatch(fetchInventory({ orderAssignmentId: item.id,    page: pagination.pageIndex + 1, // API использует нумерацию с 1
      pageSize: pagination.pageSize, })).then(() =>
      setLoading(false),
    )
  }, [dispatch])

  return (
    <div             style={{background: 'var(--bg-color)'}} className='p-2 rounded-b-3xl'
    >
      {loading ? (
        <div className="loaderWrapper" style={{ height: '50px' }}>
          <div style={{ color: 'var(--text-color, )' }}>
            Загрузка инвентарей &nbsp;
          </div>
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          {item.order_status === 'in_progress' ? (
            <Popover isOpen={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <div className="flex justify-end">
                <PopoverTrigger asChild>
                  <button
                    onClick={() => setIsPopoverOpen (true)}
                    className={` hover:scale-105  transition-all h-auto px-2 py-1 hover:text-white rounded-lg flex items-center gap-1.5 bg-orange-500 hover:bg-orange-400 border border-transparent hover:border-orange-700`}
                  >

                    <PackagePlus/>
                    Добавить размещение
                    {hasRole ('channel') || hasRole ('publisher') ? (
                      <div className="absolute top-0 right-0">
                        {item.order_status === 'in_review' ||
                        item.order_status === 'confirmed' ? (
                          <span className="relative flex h-3 w-3">
                            <span
                              className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                          </span>
                        ) : null}
                      </div>
                    ) : null}
                  </button>
                </PopoverTrigger>
              </div>
              {isPopoverOpen && (
                <PopoverContent
                  side="left"
                  align="start"
                  className="w-[400px] bg-white bg-opacity-30 backdrop-blur-md rounded-xl"
                >
                  <ModalSentOrder
                    setIsPopoverOpen={setIsPopoverOpen}
                    item={item}
                  />
                </PopoverContent>
              )}
            </Popover>
          ) : null}
          {/*<div className="p-3 rounded-xl	border_container bg-white bg-opacity-30 backdrop-blur-md">*/}

          <>
            <div
              className="border_container rounded-[22px] mt-3 p-[3px] glass-background flex flex-col h-full max-h-screen">
              <div className="overflow-y-auto sm:max-h-[calc(100vh-200px)] max-h-[calc(100vh-250px)] flex-1">
                <TablePagination table={table} flexRender={flexRender} text='создайте размещение'/>
              </div>
            </div>
            {/*<Pagination table={table} pagination={pagination}/>*/}
          </>
          {/*</div>*/}
        </>
      )}
    </div>
  )
}

export default OpenTableSentOrder
