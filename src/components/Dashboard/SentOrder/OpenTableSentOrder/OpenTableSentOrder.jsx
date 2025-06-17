import React from 'react'
import { fetchInventory } from '../../../../redux/inventory/inventorySlice'
import { useDispatch, useSelector } from 'react-redux'
import TablePagination from '@/module/TablePagination/index.jsx'
import { useOpenTableSentOrder } from '@/components/Dashboard/SentOrder/OpenTableSentOrder/useOpenTableSentOrder.jsx'
import { FormWrapper } from '@/components/Dashboard/SentOrder/receivedOrders/FormWrapperOpenTable/index.jsx'

function OpenTableSentOrder({ item }) {
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
  const dispatch = useDispatch()
  const [loading, setLoading] = React.useState(true)
  const data = useSelector((state) => state.inventory.inventory)

  const {
    table, // Экземпляр таблицы
    flexRender,
    pagination,
  } = useOpenTableSentOrder()

  React.useEffect(() => {
    dispatch(
      fetchInventory({
        orderAssignmentId: item.id,
        page: pagination.pageIndex + 1, // API использует нумерацию с 1
        pageSize: pagination.pageSize,
      }),
    ).then(() => setLoading(false))
  }, [dispatch])

  return (
    <div
      style={{ background: 'var(--bg-color)' }}
      className="p-2 rounded-b-3xl"
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
            <FormWrapper
              item={item}
              isPopoverOpen={isPopoverOpen}
              setIsPopoverOpen={setIsPopoverOpen}
            />
          ) : null}
          <>
            <div className="border_container rounded-[22px] mt-3 p-[3px] glass-background flex flex-col h-full max-h-screen">
              <div className="overflow-y-auto sm:max-h-[calc(100vh-200px)] max-h-[calc(100vh-250px)] flex-1">
                <TablePagination
                  table={table}
                  flexRender={flexRender}
                  text="создайте размещение"
                />
              </div>
            </div>
          </>
        </>
      )}
    </div>
  )
}

export default OpenTableSentOrder
