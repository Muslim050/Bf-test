import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchChannel } from '../../../../redux/channel/channelSlice.js'
import PreLoadDashboard from "@/components/Dashboard/PreLoadDashboard/PreLoad.jsx";
import TablePagination from "@/components/module/TablePagination/index.jsx";
import Pagination from "@/components/module/Pagination/index.jsx";

function ChannelTable({table, flexRender, pagination}) {
  const dispatch = useDispatch()
  const { status } = useSelector((state) => state.channel)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    dispatch(fetchChannel({
      page: pagination.pageIndex + 1, // API использует нумерацию с 1
      pageSize: pagination.pageSize,
    }))
    .then(() => setLoading(false))
  }, [dispatch, pagination.pageIndex, pagination.pageSize])


  return (
    <>
      {status === 'loading' ? (

        <PreLoadDashboard onComplete={() => setLoading(false)} loading={loading} text={'Загрузка каналов'} />

        ) : (
        <>
          <div
            className="border_container rounded-[22px] mt-3 p-[3px] glass-background flex flex-col h-full max-h-screen">
            <div className="overflow-y-auto sm:max-h-[calc(100vh-200px)] max-h-[calc(100vh-250px)] flex-1">
              <TablePagination table={table} flexRender={flexRender}                 text='создайте канал'
              />
            </div>
          </div>
          <Pagination table={table} pagination={pagination}/>
        </>
      )}
    </>
  )
}

export default ChannelTable
