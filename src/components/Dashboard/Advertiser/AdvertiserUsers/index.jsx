import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAdvertiserUsers } from '@/redux/advertiserUsers/advertiserUsersSlice.js'
import PreLoadDashboard from '@/components/Dashboard/PreLoadDashboard/PreLoad.jsx'
import TablePagination from '@/module/TablePagination/index.jsx'
import Pagination from '@/module/Pagination/index.jsx'

function AdvertiserTableUsers({
  table,
  flexRender,
  loading,
  setLoading,
  pagination,
}) {
  const dispatch = useDispatch()
  const { status } = useSelector((state) => state.advertiserUsers)
  React.useEffect(() => {
    setLoading(true)
    dispatch(
      fetchAdvertiserUsers({
        page: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
      }),
    ).then(() => setLoading(false))
  }, [dispatch, pagination.pageIndex, pagination.pageSize])

  return (
    <>
      {status === 'loading' ? (
        <PreLoadDashboard
          onComplete={() => setLoading(false)}
          loading={loading}
          text={'Загрузка пользователей'}
        />
      ) : (
        <>
          <div className="border_container rounded-[22px] mt-3 p-[3px] glass-background flex flex-col h-full max-h-screen">
            <div className="overflow-y-auto sm:max-h-[calc(100vh-200px)] max-h-[calc(100vh-250px)] flex-1">
              <TablePagination
                table={table}
                flexRender={flexRender}
                text="создайте юзера"
              />
            </div>
          </div>
          <Pagination table={table} pagination={pagination} />
        </>
      )}
    </>
  )
}

export default AdvertiserTableUsers
