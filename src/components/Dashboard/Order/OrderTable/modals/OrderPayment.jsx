import React from 'react'
import { CircleCheck, CircleX } from 'lucide-react'
import PaymentOrderModal from './PaymentOrder/PaymentOrder.jsx'
import { Button } from '../../../../ui/button.jsx'
import { Popover, PopoverTrigger } from '@/components/ui/popover.jsx'
import TooltipWrapper from '@/shared/TooltipWrapper.jsx'

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
              <Popover open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <PopoverTrigger asChild>
                  <div className="flex gap-1 cursor-pointer items-center">
                    <CircleX className="w-5	h-6" onClick={handleButtonClick} />
                  </div>
                </PopoverTrigger>
                {isDialogOpen && (
                  <PaymentOrderModal onClose={handleClose} id={advert.id} />
                )}
              </Popover>
            </div>
          )}
          <div className="flex items-center">
            {advert.is_paid && (
              <TooltipWrapper
                tooltipContent={
                  <>
                    <div>{advert.payment_date?.split('T')[0]}</div>
                    <div>
                      {new Date(advert.payment_date).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </>
                }
              >
                <CircleCheck />
              </TooltipWrapper>
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
