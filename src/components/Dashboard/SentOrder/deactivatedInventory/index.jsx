import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchDiactivatedInventory,} from '@/redux/inventory/inventorySlice.js'
import PreLoadDashboard from "@/components/Dashboard/PreLoadDashboard/PreLoad.jsx";
import Pagination from "@/components/module/Pagination/index.jsx";
import TablePagination from "@/components/module/TablePagination/index.jsx";
import {useDeactivateInventory} from "@/components/Dashboard/SentOrder/deactivatedInventory/useDeactivateInventory.jsx";

function DeactivatedInventory() {
  const dispatch = useDispatch()
  const {  status } = useSelector((state) => state.inventory)

  const [loading, setLoading] = React.useState(true)
  const {
    table, // Экземпляр таблицы
    flexRender,
    pagination,
  } = useDeactivateInventory();

  React.useEffect(() => {
    dispatch(
      fetchDiactivatedInventory({
        page: pagination.pageIndex + 1, // API использует нумерацию с 1
        pageSize: pagination.pageSize,
      })
    ).then(() => setLoading(false));
  }, [dispatch, pagination.pageIndex, pagination.pageSize]);

  return (
    <>
      {(status === 'loading' || loading) ? (
        <PreLoadDashboard onComplete={() => setLoading(false)} loading={loading} text={'Загрузка инвентарей'} />
        ) : (
        <div className="">
          <div
            className="border_container rounded-[22px] mt-3 p-[3px] glass-background flex flex-col h-full max-h-screen">
            <div className="overflow-y-auto sm:max-h-[calc(100vh-200px)] max-h-[calc(100vh-250px)] flex-1">
              <TablePagination table={table} flexRender={flexRender} text='создайте инвентарь'/>
            </div>
          </div>
          <Pagination table={table} pagination={pagination} />
        </div>
      )}

    </>
  )
}

export default DeactivatedInventory
