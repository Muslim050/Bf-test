import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { toast } from 'react-hot-toast'
import 'react-datepicker/dist/react-datepicker.css'
import { toastConfig } from '@/utils/toastConfig.js'
import {
  DeleteVideo,
  fetchEditVideo,
  fetchVideos,
} from '@/redux/video/videoSlice.js'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Input } from '@/components/ui/input.jsx'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
} from '@/components/ui/select.jsx'
import { Button } from '@/components/ui/button.jsx'
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
import { SelectTrigger } from '@/components/ui/selectTrigger.jsx'
import Cookies from 'js-cookie'

// Функция для преобразования секунд в формат "часы:минуты:секунды"
function secondsToTime(seconds) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
    2,
    '0',
  )}:${String(remainingSeconds).padStart(2, '0')}`
}
// Функция для преобразования времени в секунды
function timeToSeconds(time) {
  const [hours, minutes, seconds] = time.split(':').map(Number)
  return hours * 3600 + minutes * 60 + seconds
}
const categoryC = [
  { id: 1, value: 'Шоу', text: 'Шоу' },
  { id: 2, value: 'Драмма', text: 'Драмма' },
  { id: 3, value: 'Клип', text: 'Клип' },
]
export default function EditVideoModal({ currentOrder, onClose }) {
  const dispatch = useDispatch()
  const role = Cookies.get('role')
  const [startAtInSeconds, setStartAtInSeconds] = React.useState(
    currentOrder.duration,
  )
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    defaultValues: {
      name: currentOrder.name,
      category: currentOrder.category,
      stardate: currentOrder.publication_time,
      start_at: secondsToTime(currentOrder.duration),
      link_to_video: currentOrder.link_to_video,
      video_id: currentOrder.video_id,
    },
    mode: 'onChange',
  })

  const onSubmit = async (data) => {
    try {
      const dataToSend = {
        ...data,
        duration: startAtInSeconds,
      }
      const response = await dispatch(
        fetchEditVideo({ id: currentOrder.id, data: dataToSend }),
      )
      toast.success('Изминения успешно обновлены!')
      onClose()
      setTimeout(async () => {
        await fetchVideos()
      }, 1000)
    } catch (error) {
      toast.error(error?.data?.error?.message)
    }
  }
  const handleRemoveInventory = async () => {
    try {
      await dispatch(DeleteVideo({ id: currentOrder.id }))
      toast.success('Видео успешно удалено', toastConfig)
      onClose()
      // Важно! если используешь локальное состояние:
      await fetchVideos()
    } catch (error) {
      toast.error(error.message, toastConfig)
      // Можно тоже обновить после ошибки
      await fetchVideos()
    }
  }

  const handleTimeBlur = (event) => {
    const time = event.target.value
    const seconds = timeToSeconds(time)
    setStartAtInSeconds(seconds)
  }
  return (
    <>
      <DialogContent
        className="w-[450px] p-4"
        onInteractOutside={(e) => {
          e.preventDefault()
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-lg	font-medium	text-white border-b border-[#F9F9F926] pb-4">
            Редактировать Видео
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="flex gap-4 mb-4">
              <div className="grid w-full">
                <Label className="text-sm	text-white pb-2 flex gap-0.5">
                  Название Видео<span className="text-red-500 ml-0.5">*</span>
                </Label>
                <Input
                  type="text"
                  autoComplete="off"
                  {...register('name', {
                    required: '.',
                  })}
                  placeholder={'Введите название Видео'}
                  className={`border ${
                    errors?.name ? 'border-red-500' : 'border-gray-300'
                  }   transition-all duration-300 text-sm `}
                />
              </div>
              <div className="grid w-full">
                <Label className="text-sm	text-white pb-2">
                  Выбрать категорию
                  <span className="text-red-500 ml-0.5">*</span>
                </Label>
                <Controller
                  name="category"
                  {...register('category', {
                    required: 'Поле обязательно',
                  })}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <SelectTrigger className="!text-white">
                        <SelectValue placeholder="Выбрать категорию" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Выбрать категорию</SelectLabel>
                          {categoryC.map((adv) => (
                            <SelectItem key={adv.id} value={adv.value}>
                              {adv.text}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="grid w-full">
                <Label className="text-sm	text-white pb-2">
                  Тайм код рекламы<span className="text-red-500 ml-0.5">*</span>
                </Label>
                <Input
                  className={`border ${
                    errors?.start_at ? 'border-red-500' : 'border-gray-300'
                  }   transition-all duration-300 text-sm `}
                  type="time"
                  step="1"
                  inputMode="numeric"
                  {...register('start_at')}
                  onBlur={handleTimeBlur} // Обработчик onBlur для преобразования времени в секунды
                />
              </div>
              <div className="grid w-full">
                <Label className="text-sm	text-white pb-2">
                  Начало<span className="text-red-500 ml-0.5">*</span>
                </Label>
                <Controller
                  name="publication_time"
                  control={control}
                  defaultValue={
                    currentOrder.publication_time
                      ? currentOrder.publication_time.substring(0, 10)
                      : ''
                  }
                  render={({ field: { onChange, value } }) => (
                    <Input type="date" onChange={onChange} value={value} />
                  )}
                />
              </div>
            </div>
            <div className="flex gap-4">
              {role === 'admin' ? (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="bg-red-300 hover:bg-red-500 border-2 border-red-500 w-full h-[44px] text-white rounded-lg mt-6">
                      Удалить
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-red-500">
                        Вы уверены, что хотите удалить?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-white">
                        Это действие не может быть отменено. Это навсегда удалит
                        видео и удалит ваши данные с наших серверов.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="text-white">
                        Отмена
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-300 hover:bg-red-500 border-2 border-red-500 "
                        onClick={handleRemoveInventory}
                      >
                        Удалить
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              ) : null}

              <Button
                className={`bg-[#2A85FF66] hover:bg-[#0265EA] border-2 border-[#0265EA] hover:border-[#0265EA] w-full   h-[44px] text-white rounded-lg	mt-6`}
              >
                Обновить
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </>
  )
}
