import React from 'react'
import {useDispatch} from 'react-redux'
import {fetchOrder} from '@/redux/order/orderSlice'
import {Plus} from 'lucide-react'
import {showModalOrder} from '@/redux/modalSlice'
import {Button} from '@/components/ui/button.jsx'
import {Dialog, DialogTrigger} from '@/components/ui/dialog.jsx'
import OrderModal from './modals/CreateOrder/CreateOrder'
import Cookies from 'js-cookie'
import PreLoadDashboard from "@/components/Dashboard/PreLoadDashboard/PreLoad.jsx";
import TablePagination from "@/components/module/TablePagination/index.jsx";
import Pagination from "@/components/module/Pagination/index.jsx";
import {useOrder} from "@/components/Dashboard/Order/OrderTable/useOrder.jsx";
import toast from "react-hot-toast";
import TableSearchInputOnce from "@/shared/TableSearchInputOnce/index.jsx";

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
    setSearchInOrder,
    searchInOrder
  } = useOrder();

  const formatDate = (value) => {
    // Проверяем полный формат "dd.MM.yyyy"
    const fullDatePattern = /^(\d{2})\.(\d{2})\.(\d{4})$/;
    let match = value.match(fullDatePattern);
    if (match) {
      const [, day, month, year] = match;
      return `${year}-${month}-${day}`;
    }

    // Проверяем частичный формат "dd.MM"
    const partialDatePattern = /^(\d{2})\.(\d{2})$/;
    match = value.match(partialDatePattern);
    if (match) {
      const [, day, month] = match;
      return `${month}-${day}`;
    }

    // Если формат не соответствует ни одному шаблону, возвращаем исходное значение
    return value;
  };
  React.useEffect(() => {
    // Показываем уведомление при изменении pageSize
    toast.loading('Загрузка данных...', {
      id: 'loading-toast', // Добавляем уникальный ID, чтобы toast был обновляемым
    });

    dispatch(
      fetchOrder({
        page: pagination.pageIndex + 1, // API использует нумерацию с 1
        pageSize: pagination.pageSize,
        search: formatDate(searchInOrder) // Преобразование даты
      })
    )
      .then(() => {
        setLoading(false);
        toast.dismiss('loading-toast'); // Убираем загрузочный toast
      })
      .catch((error) => {
        setLoading(false);
        toast.dismiss('loading-toast'); // Убираем загрузочный toast
        toast.error('Ошибка загрузки данных!'); // Показываем уведомление об ошибке
      });
  }, [dispatch, pagination.pageIndex, pagination.pageSize, setLoading, searchInOrder]);

  const handleButtonClick = () => {
    dispatch(showModalOrder())
  }

  return (
    <>
      {loading ? (
        <PreLoadDashboard onComplete={() => setLoading(false)} loading={loading} text={'Загрузка заказов'} />
      ) : (
        <div>
          <div className='flex gap-2 justify-end pt-4 pb-1'>
            <div className='flex  justify-end'>
              <TableSearchInputOnce
                value={searchInOrder ?? ''}
                onChange={value => setSearchInOrder (String (value))}
                className={`p-2 font-lg shadow border border-block `}
              />

            </div>
            {user === 'admin' ? null : (
              <div className="flex justify-end">
              <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="rounded-[22px] h-auto bg-brandPrimary-1 hover:bg-brandPrimary-50 text-white no-underline hover:text-white "
                      onClick={handleButtonClick}
                    >
                      <Plus className="w-4 h-4 mr-2"/> Создать заказ
                    </Button>
                  </DialogTrigger>
                  {open && <OrderModal onClose={handleClose}/>}
                </Dialog>
              </div>
            )}
          </div>
          <>
            <div
              className="border_container rounded-[22px] mt-3 p-[3px] glass-background flex flex-col h-full max-h-screen">
              <div className="overflow-y-auto sm:max-h-[calc(100vh-200px)] max-h-[calc(100vh-250px)] flex-1">
                <TablePagination
                  table={table}
                  flexRender={flexRender}
                  renderSubComponent={renderSubComponent}
                  expandedRowId={expandedRowId}
                  text='создайте заказ'
                />
              </div>
            </div>
            {
              table.getPageCount() > 1 &&
            <Pagination table={table} pagination={pagination}/>}
          </>

        </div>
      )}
    </>
  )
}


export default OrderTable
