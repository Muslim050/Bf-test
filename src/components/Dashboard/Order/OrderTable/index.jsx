import React from 'react'
import { useDispatch } from 'react-redux'
import { fetchOrder } from '@/redux/order/orderSlice'
import { PackagePlus } from 'lucide-react'
import { showModalOrder } from '@/redux/modalSlice'
import { Button } from '@/components/ui/button.jsx'
import { Dialog, DialogTrigger } from '@/components/ui/dialog.jsx'
import OrderModal from './modals/CreateOrder/CreateOrder'
import Cookies from 'js-cookie'
import PreLoadDashboard from '@/components/Dashboard/PreLoadDashboard/PreLoad.jsx'
import TablePagination from '@/module/TablePagination/index.jsx'
import Pagination from '@/module/Pagination/index.jsx'
import { useOrder } from '@/components/Dashboard/Order/OrderTable/useOrder.jsx'
import toast from 'react-hot-toast'

function OrderTable() {
  const dispatch = useDispatch()
  const [loading, setLoading] = React.useState(true)
  const user = Cookies.get('role')

  // Модальное окно Index
  const [open, setOpen] = React.useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  // Модальное окно Index

  const {
    table, // Экземпляр таблицы
    flexRender,
    pagination,
    renderSubComponent,
    expandedRowId,
    searchInOrder,
  } = useOrder()

  React.useEffect(() => {
    // Показываем уведомление при изменении pageSize
    toast.loading('Загрузка данных...', {
      id: 'loading-toast', // Добавляем уникальный ID, чтобы toast был обновляемым
    })

    dispatch(
      fetchOrder({
        page: pagination.pageIndex + 1, // API использует нумерацию с 1
        pageSize: pagination.pageSize,
        search: searchInOrder,
      }),
    )
      .then(() => {
        setLoading(false)
        toast.dismiss('loading-toast') // Убираем загрузочный toast
      })
      .catch((error) => {
        setLoading(false)
        toast.dismiss('loading-toast') // Убираем загрузочный toast
        toast.error('Ошибка загрузки данных!') // Показываем уведомление об ошибке
      })
  }, [
    dispatch,
    pagination.pageIndex,
    pagination.pageSize,
    setLoading,
    searchInOrder,
  ])

  const handleButtonClick = () => {
    dispatch(showModalOrder())
  }

  return (
    <>
      {loading ? (
        <PreLoadDashboard
          onComplete={() => setLoading(false)}
          loading={loading}
          text={'Загрузка заказов'}
        />
      ) : (
        <div>
          <div className="flex gap-2 justify-end pt-4 pb-1">
            {user === 'admin' ? null : (
              <div className="flex justify-end">
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button variant="default" onClick={handleButtonClick}>
                      <div className="flex items-center justify-center gap-2 ">
                        <PackagePlus />
                        Создать
                      </div>
                    </Button>
                  </DialogTrigger>
                  {open && <OrderModal onClose={handleClose} />}
                </Dialog>
              </div>
            )}
          </div>
          <>
            <div className="border_container rounded-[22px] mt-3 p-[3px] glass-background flex flex-col h-full max-h-screen">
              <div className="overflow-y-auto sm:max-h-[calc(100vh-200px)] max-h-[calc(100vh-250px)] flex-1">
                <TablePagination
                  table={table}
                  flexRender={flexRender}
                  renderSubComponent={renderSubComponent}
                  expandedRowId={expandedRowId}
                  text="создайте заказ"
                />
              </div>
            </div>
            {table.getPageCount() > 1 && (
              <Pagination table={table} pagination={pagination} />
            )}
          </>
        </div>
      )}
    </>
  )
}

export default OrderTable
