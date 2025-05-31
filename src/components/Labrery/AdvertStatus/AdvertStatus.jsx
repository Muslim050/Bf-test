import React from 'react'
import style from './AdvertStatus.module.scss'

import { formatDate } from '@/utils/formatterDate.jsx'

const statusTexts = {
  sent: 'Отправлено',
  in_review: 'Рассматривается',
  confirmed: 'Подтверждён',
  in_progress: 'Активен',
  accepted: 'Получен',
  confirmed_by_channel: '',
  open: 'Доступный',
  pre_booked: 'Пре_бронь',
  booked: 'Бронь',
  in_use: 'Активный',
  unused: 'Не продан',
  inactive: 'Завершен',
  finished: 'Завершен',
}

const AdvertStatus = ({ status, children, endDate, className }) => {
  const statusText = statusTexts[status] || 'Неизвестный статус'
  const wrapperStyles = endDate
    ? { width: 'fit-content' }
    : { width: 'fit-content' }
  return (
    <div
      className={`${style.wrapper__status} ${style[status]} ${className}`}
      style={wrapperStyles}
    >
      {status === 'finished' || status === 'inactive' ? (
        <div className="text-[var(--text)]">
          {statusText}
          &nbsp;
          {formatDate(endDate)}
        </div>
      ) : (
        <> {statusText}</>
      )}
      {children}
    </div>
  )
}

export default AdvertStatus
