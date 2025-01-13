import SentOrderList from './SentOrderList'
import React from 'react'
import { fetchOnceListSentToPublisher } from '../../../../redux/order/SentToPublisher'
import { useDispatch, useSelector } from 'react-redux'
import style from '../TableSentsOrder.module.scss'
import {
  TableHead,
  Table,
  TableHeader,
  TableRow,
  TableBody,
} from '@/components/ui/table.jsx'
import { ThemeContext } from '@/utils/ThemeContext.jsx'
import Cookies from 'js-cookie'
import PreLoadDashboard from "@/components/Dashboard/PreLoadDashboard/PreLoad.jsx";
import TablePagination from "@/components/module/TablePagination/index.jsx";
import Pagination from "@/components/module/Pagination/index.jsx";

const headers = [
  { key: 'id', label: '№' },
  { key: 'name', label: 'Кампания' },

  { key: 'name', label: 'Формат' },

  { key: 'name', label: 'Начало' },
  { key: 'name', label: 'Конец' },
  { key: 'name', label: 'Ролик' },

  { key: 'category', label: 'План показов' },
  // {key: 'category', label: 'Комментарий'},

  { key: 'category', label: 'Статус' },
  { key: 'category', label: 'Действия' },
]
const ReceivedOrders = ({table, pagination, flexRender, renderSubComponent}) => {
  const { textColor } = React.useContext(ThemeContext)

  const dispatch = useDispatch()
  const videos = useSelector((state) => state.video.videos)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    dispatch(fetchOnceListSentToPublisher({
      is_deactivated: false,
      page: pagination.pageIndex + 1, // API использует нумерацию с 1
      pageSize: pagination.pageSize
    })).then(() =>
      setLoading(false),
    )
  }, [dispatch])

  return (
    <>
      {loading ? (

        <PreLoadDashboard onComplete={() => setLoading(false)} loading={loading} text={'Загрузка заказов'} />

        ) : (
        // <div className="tableWrapper" style={{ overflow: 'visible' }}>
        //   <div
        //     // style={{ background: ' var(--bg-color)' }}
        //     className="border_container w-full h-[calc(100vh-150px)]   rounded-[22px]  p-[3px] glass-background flex flex-col"          >
        //
        //   <div className="h-full overflow-y-auto">
        //       <Table
        //         className={`${style.responsive_table} border_design rounded-lg h-full`}
        //       >
        //         <TableHeader className="bg-[#FFFFFF2B] rounded-t-lg">
        //           <TableRow>
        //             {headers.map((row) => {
        //               const user = Cookies.get('role')
        //               const showStatusColumn = user !== 'admin'
        //               if (row.key === 'is_connected' && !showStatusColumn) {
        //                 return null
        //               }
        //               return (
        //                 <TableHead
        //                   key={row.key}
        //                   className={`text-${textColor} `}
        //                 >
        //                   {row.label}
        //                 </TableHead>
        //               )
        //             })}
        //           </TableRow>
        //         </TableHeader>
        //         <TableBody>
        //           <SentOrderList listsentPublisher={listsentPublisher} />
        //         </TableBody>
        //       </Table>
        //     </div>
        //   </div>
        // </div>
        //


        <>
        <div className="border_container rounded-[22px] mt-3 p-[3px] glass-background flex flex-col h-full max-h-screen">
          <div className="overflow-y-auto sm:max-h-[calc(100vh-200px)] max-h-[calc(100vh-250px)] flex-1">
            <TablePagination table={table} flexRender={flexRender} renderSubComponent={renderSubComponent} text='нету полученных заказов'/>
          </div>
        </div>
          {table.getPageCount() > 1 &&
            <Pagination table={table} pagination={pagination}/>}
          </>
        )}
    </>
  )
}
export default ReceivedOrders
