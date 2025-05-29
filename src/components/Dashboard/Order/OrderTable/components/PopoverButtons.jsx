import React from 'react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import OrderPayment from '../modals/OrderPayment.jsx'
import { hasRole } from '../../../../../utils/roleUtils.js'
import { useOrder } from '../hooks/useOrder.jsx'
import { Dialog, DialogTrigger } from '@/components/ui/dialog.jsx'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog.jsx'
import EditOrderModal from '../modals/EditOrder/EditOrder.jsx'
import { Copy, MessageSquareText, Pencil, SquareCheckBig } from 'lucide-react'

const PopoverButtons = ({
  advert,
  setShowModalEditAdmin,
  handleFinishOrder,
  isOver100Percent,
}) => {
  const [currentOrder, setCurrentOrder] = React.useState(null)
  const { copyToClipboard } = useOrder(currentOrder)
  // Модальное окно OrderModal
  const [open, setOpen] = React.useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  // Модальное окно OrderModal

  return (
    <div className="flex gap-2 items-center justify-between">
      {/*Редактировать*/}
      <>
        {advert.status === 'accepted' || advert.status === 'sent' ? (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant="link"
                onClick={() => {
                  setShowModalEditAdmin(true)
                  setCurrentOrder(advert)
                }}
                className="hover:scale-125 transition-all p-0 "
                style={{ color: 'var(--text-color)' }} // Динамическая переменная для цвета текста
              >
                <Pencil className="w-[24px] h-[24px] hover:text-orange-500" />
              </Button>
            </DialogTrigger>
            {open && (
              <EditOrderModal
                onClose={handleClose}
                currentOrder={currentOrder}
              />
            )}
          </Dialog>
        ) : null}
      </>
      {/*Редактировать*/}

      {/*Комментарий*/}
      <>
        {advert.status === 'in_progress' ||
        advert.status === 'finished' ? null : (
          <div>
            {advert?.notes ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="link"
                    onClick={() => {
                      setCurrentOrder(advert)
                    }}
                    className="hover:scale-125 transition-all p-0 m-0"
                  >
                    <MessageSquareText className="w-[24px] h-[24px] hover:text-green-500" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full  bg-white bg-opacity-30 backdrop-blur-md rounded-xl">
                  <div className="grid gap-4 ">
                    <div className="w-80">
                      <div className="pb-2 flex items-center justify-between font-medium leading-none text-white border-b-[#F9F9F926] border-b">
                        Комментарий
                        <Button
                          style={{ color: 'var(--text-color)' }} // Динамическая переменная для цвета текста
                          variant="link"
                          className={` hover:scale-125 transition-all p-0 relative`}
                          onClick={copyToClipboard}
                        >
                          <Copy />
                        </Button>
                      </div>
                      <p className="text-sm text-white break-words pt-4">
                        {advert.notes}
                      </p>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            ) : null}
          </div>
        )}
      </>
      {/*Комментарий*/}

      {/*Кнопка ЗАвершить*/}
      <div>
        {hasRole('admin') && advert.status === 'in_progress' ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="link"
                className={` hover:scale-125 transition-all p-0 relative`}
                style={{ color: 'var(--text-color)' }} // Динамическая переменная для цвета текста
              >
                {isOver100Percent && (
                  <div className="absolute -right-1 top-1">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                    </span>
                  </div>
                )}
                <SquareCheckBig
                  className={`${isOver100Percent && 'text-red-600'} w-[24px] h-[24px]  hover:text-red-500`}
                />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-red-500">
                  Вы уверены, что хотите финишировать заказ?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-white">
                  Это действие не может быть отменено.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="text-white">
                  Отмена
                </AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
                  onClick={() => handleFinishOrder(advert.id)}
                >
                  Завершить
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          ''
        )}
      </div>
      {/*Кнопка ЗАвершить*/}

      {/*Оплата*/}
      <div>
        {hasRole('admin') ? (
          <div>
            <OrderPayment advert={advert} />
          </div>
        ) : null}
      </div>
      {/*Оплата*/}
    </div>
  )
}

export default PopoverButtons
