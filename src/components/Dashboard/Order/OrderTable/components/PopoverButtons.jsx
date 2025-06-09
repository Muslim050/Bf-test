import React from 'react'
import { Button } from '@/components/ui/button'
import OrderPayment from '../modals/OrderPayment.jsx'
import { hasRole } from '../../../../../utils/roleUtils.js'
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
import { Pencil, SquareCheckBig } from 'lucide-react'
import TooltipWrapper from '@/shared/TooltipWrapper.jsx'
import CommentPopover from '@/components/Dashboard/Shared/CommentPopover.jsx'

const PopoverButtons = ({ advert, handleFinishOrder, isOver100Percent }) => {
  const [currentOrder, setCurrentOrder] = React.useState(null)
  // Модальное окно OrderModal
  const [open, setOpen] = React.useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  // Модальное окно OrderModal
  console.log(advert?.notes)
  return (
    <div className="flex gap-2 items-center justify-between">
      {/*Редактировать*/}
      <>
        {advert.status === 'accepted' || advert.status === 'sent' ? (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <TooltipWrapper tooltipContent="Редактировать">
                <Button
                  variant="defaultOrange"
                  onClick={() => {
                    setOpen(true)
                    setCurrentOrder(advert)
                  }}
                >
                  <Pencil />
                </Button>
              </TooltipWrapper>
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
          <CommentPopover data={advert} />
        )}
      </>
      {/*Комментарий*/}

      {/*Кнопка ЗАвершить*/}
      <>
        {hasRole('admin') && advert.status === 'in_progress' ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outlineDeactivate" className="relative">
                {isOver100Percent && (
                  <div className="absolute -right-1 -top-1">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                    </span>
                  </div>
                )}
                <SquareCheckBig />
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
        ) : null}
      </>
      {/*Кнопка ЗАвершить*/}

      {/*Оплата*/}
      <>{hasRole('admin') ? <OrderPayment advert={advert} /> : null}</>
      {/*Оплата*/}
    </div>
  )
}

export default PopoverButtons
