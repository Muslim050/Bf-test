import { toast } from 'react-hot-toast'

export const useOrder = (currentOrder) => {
  //Функция Копирования
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(currentOrder.notes)

      .then(() => {
        toast.success('Комментарий скопирован в буфер обмена', {
          duration: 3000,
        })
      })

      .catch((err) => {
        toast.error('Не удалось скопировать комментарий', {
          duration: 3000,
        })
      })
  }
  //Функция Копирования

  return {
    copyToClipboard,
  }
}
