import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  confirmPayment,
  fetchOrder,
} from '../../../../../../redux/order/orderSlice'
import 'react-datepicker/dist/react-datepicker.css'
import { X } from 'lucide-react'
import { hideModalPayment } from '@/redux/modalSlice'
import toast from 'react-hot-toast'

export default function PaymentOrder({ advert }) {
  const dispatch = useDispatch()

  const { paymentData } = useSelector((state) => state.modal)

  const handleConfirmPayment = (id) => {
    dispatch(confirmPayment({ id }))
      .then(() => {
        dispatch(fetchOrder())
        dispatch(hideModalPayment())
      })
      .catch((error) => {
        toast.error('Произошла ошибка при подтверждении оплаты!')
      })
  }

  return (
    <>
      <div>
        <div className="modalWindow__title">
          Подвердить статус оплаты
          <X
            className="modalWindow__title__button"
            onClick={() => dispatch(hideModalPayment())}
          />
        </div>

        <div>
          <div style={{ display: 'flex' }}>
            <div style={{ marginRight: '15px' }}>
              <button onClick={() => handleConfirmPayment(paymentData.id)}>
                Да
              </button>
            </div>

            <button onClick={() => dispatch(hideModalPayment())}>Нет</button>
          </div>
        </div>
      </div>
    </>
  )
}
