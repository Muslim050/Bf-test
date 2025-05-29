import React from 'react'
import { CircleCheck, CircleX } from 'lucide-react'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import PaymentOrderModal from './PaymentOrder/PaymentOrder.jsx'
import { Button } from '../../../../ui/button.jsx'

const OrderPayment = ({ advert }) => {
  // Модальное окно OrderModal
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)

  const handleButtonClick = () => {
    setIsDialogOpen(true)
  }

  const handleClose = () => {
    setIsDialogOpen(false)
  }
  // Модальное окно OrderModal
  return (
    <>
      {advert.status === 'finished' ? (
        <div
          className={`gap-1 inline-flex items-center ${
            advert.is_paid ? 'text-[#c9ffb5]' : 'text-[#FF8080]'
          }`}
        >
          {advert.payment_date === null && (
            <div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <div className="flex gap-1 cursor-pointer items-center">
                    <CircleX className="w-5	h-6" onClick={handleButtonClick} />
                    {/* Не оплачено */}
                  </div>
                </DialogTrigger>
                {isDialogOpen && (
                  <PaymentOrderModal onClose={handleClose} id={advert.id} />
                )}
              </Dialog>
            </div>
          )}
          <div className="flex items-center ">
            {advert.is_paid && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex gap-1 cursor-pointer ">
                    <CircleCheck className="w-5	h-5" />
                    <div className="text-sm font-medium">{/* Оплачено */}</div>
                  </div>
                </TooltipTrigger>

                <TooltipContent>
                  <div>
                    <div>{advert.payment_date?.split('T')[0]}</div>

                    <div>
                      {new Date(advert.payment_date).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
      ) : (
        <Button
          variant="link"
          className="flex items-center cursor-not-allowed gap-1 p-0"
        >
          <CircleX className="w-5	h-5" />
          <div className="text-sm font-medium">{/* Не оплачено */}</div>
        </Button>
      )}
    </>
  )
}

export default OrderPayment
