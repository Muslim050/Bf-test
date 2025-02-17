import React from 'react'
import { fetchOnceListSentToPublisher } from '../../../../redux/order/SentToPublisher'
import { useDispatch } from 'react-redux'
import PreLoadDashboard from "@/components/Dashboard/PreLoadDashboard/PreLoad.jsx";
import TablePagination from "@/components/module/TablePagination/index.jsx";
import Pagination from "@/components/module/Pagination/index.jsx";

const ReceivedOrders = ({table, pagination, flexRender, renderSubComponent}) => {
  const dispatch = useDispatch()
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
