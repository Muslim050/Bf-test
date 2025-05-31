import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  confirmPayment,
  fetchOrder,
} from '../../../../../../redux/order/orderSlice'
import 'react-datepicker/dist/react-datepicker.css'
import toast from 'react-hot-toast'
import { PopoverContent } from '@/components/ui/popover.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Check, Loader2 } from 'lucide-react'

export default function PaymentOrder({ id, onClose }) {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const handleConfirmPayment = (id) => {
    setLoading(true)
    dispatch(confirmPayment({ id }))
      .then(() => {
        dispatch(fetchOrder())
        onClose()
      })
      .catch((error) => {
        toast.error('Произошла ошибка при подтверждении оплаты!')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <PopoverContent className=" p-4 bg-white bg-opacity-30 backdrop-blur-md">
      <div className="flex items-center">
        <div className="text-lg	font-medium	text-[var(--text)] ">
          Подвердить статус оплаты
        </div>
        <Button
          className="bg-green-500 hover:bg-green-400 "
          variant="default"
          onClick={() => handleConfirmPayment(id)}
          disabled={loading}
        >
          {loading ? <Loader2 className="animate-spin" /> : <Check />}
        </Button>
      </div>
    </PopoverContent>
  )
}
