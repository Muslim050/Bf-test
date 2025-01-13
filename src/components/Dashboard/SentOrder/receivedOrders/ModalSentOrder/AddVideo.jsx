import axios from 'axios'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import backendURL from '@/utils/url'
import { fetchOnceListSentToPublisher } from '../../../../../redux/order/SentToPublisher'
import { useDispatch } from 'react-redux'
import { Label } from '@/components/ui/label.jsx'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
} from '@/components/ui/select.jsx'
import { SelectTrigger } from '@/components/ui/selectTrigger.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Button } from '@/components/ui/button.jsx'
import { fetchInventory } from '../../../../../redux/inventory/inventorySlice'
import Cookies from 'js-cookie'
import {Monitor, MonitorPlay, MonitorUp} from "lucide-react";
import axiosInstance from "@/api/api.js";

const categoryC = [
  { id: 1, value: 'Шоу', text: 'Шоу' },
  { id: 2, value: 'Драмма', text: 'Драмма' },
  { id: 3, value: 'Клип', text: 'Клип' },
]

const format = [
  { value: 'preroll', text: 'Pre-roll', icon: Monitor },
  { value: 'tv_preroll', text: 'TV Pre-roll', icon: MonitorPlay },
  { value: 'top_preroll', text: 'Top Pre-roll', icon: MonitorUp  },
]

export default function AddVideo({
  item,
  setIsPopoverOpen,
                                   setOpenPopoverIndex
}) {
  const [channelModal, setChannelModal] = React.useState([])
  const [selectedTimer, setSelectedTimer] = React.useState('')
  const [selectedTimervideo_duration, setSelectedTimervideo_duration] =
    React.useState('')
  const dispatch = useDispatch()

  const id = Number(Cookies.get('channelId'))
  const user = Cookies.get('role')

  const fetchChannel = async () => {
    const response = await axiosInstance.get(
      `${backendURL}/publisher/channel/`
    )
    setChannelModal(response.data.data)
  }

  React.useEffect(() => {
    fetchChannel()
  }, [])

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
    control,
  } = useForm({
    defaultValues: {
      expected_number_of_views: '',
      format: item.format,
      promo_start_at: 0,
      promo_duration: '',
      order_id: item.id,
      channel_id: user === 'channel' ? '' : id,
      video_name: '',
      category: '',
      video_duration: 0,
      publication_time: '',
      link_to_video: ''
    },
    mode: 'onSubmit',
  })

  const timeC = (event) => {
    const time = event.target.value
    if (time === '') {
      setSelectedTimer('00:00:00')
      setValue('promo_start_at', 0)
    } else {
      setSelectedTimer(time)
      const [hours, minutes, seconds] = time.split(':').map(Number)
      const timeInSeconds = hours * 3600 + minutes * 60 + seconds
      setValue('promo_start_at', timeInSeconds)
    }
  }
  const timevideo_duration = (event) => {
    const time = event.target.value
    if (time === '') {
      setSelectedTimervideo_duration('00:00:00')
      setValue('video_duration', 0)
    } else {
      setSelectedTimervideo_duration(time)
      const [hours, minutes, seconds] = time.split(':').map(Number)
      const timeInSeconds = hours * 3600 + minutes * 60 + seconds
      setValue('video_duration', timeInSeconds)
    }
  }
  const onSubmit = async (data) => {
    console.log (data)
    try {
      const response = await axiosInstance.post(
        `${backendURL}/inventory/assign-to-order-with-new-video`,
        {
          expected_number_of_views: data.expected_number_of_views,
          format: data.format,
          promo_start_at: data.promo_start_at,
          promo_duration: data.promo_duration,
          order_assignment_id: data.order_id,
          video_name: data.video_name,
          category: data.category,
          video_duration: data.video_duration,
          publication_time: data.publication_time,
          ...(data.channel_id ? { channel_id: data.channel_id } : {}), // Добавляем channel_id только если он существует
          ...(data.link_to_video ? { link_to_video: data.link_to_video } : {}) // Добавляем channel_id только если он существует

        },
      )

      // Debug log to inspect response

      if (response.data) {
        toast.success('Размещение успешно созданно !')
        // dispatch(fetchInventory({ orderAssignmentId: item.id }))
        setIsPopoverOpen(false)
        dispatch(fetchOnceListSentToPublisher({ is_deactivated: false }))

        setTimeout(() => {
          window.location.reload()
        }, 1500)
      } else {
        throw new Error('Unexpected response payload')
      }
    } catch (error) {
      const errorData = error.response.data.error
      let index = 1
      const errorMessages = Object.keys(errorData)
        .map((key) => {
          let message = ''
          if (Array.isArray(errorData[key])) {
            message = errorData[key]
              .map((item) => `${index++}: ${item}`)
              .join('; ')
          } else {
            message = `${index++}: ${errorData[key]}`
          }
          return `${key}:    ${message}`
        })
        .join('\n') // Use '\n' to add a new line between each error message
      toast.error(errorMessages)
      setIsPopoverOpen(false)
    }
  }
  const getThreeDaysAgo = () => {
    const today = new Date()
    today.setDate(today.getDate() - 3)
    const year = today.getFullYear()
    let month = today.getMonth() + 1
    let day = today.getDate()

    if (month < 10) {
      month = `0${month}`
    }

    if (day < 10) {
      day = `0${day}`
    }

    return `${year}-${month}-${day}`
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} >
        {user === 'publisher' ? (
          <div className="grid w-full mb-4">
            <Label className="text-sm	text-white pb-2">
              Выбрать Канал<span className="text-red-500 ml-0.5">*</span>
            </Label>
            <Controller
              name="channel_id"
              {...register('channel_id', {
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
                    <SelectValue placeholder="Выбрать Канал" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Выбрать канал</SelectLabel>
                      {channelModal.map((adv) => (
                        <SelectItem key={adv.id} value={adv.id.toString()}>
                          {adv.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        ) : (
          ''
        )}

        <div className="grid w-full mb-4">
          <Label className="text-sm	text-white pb-2">
            Название видео<span className="text-red-500 ml-0.5">*</span>
          </Label>
          <Input
            type="text"
            autoComplete="off"
            {...register('video_name', {
              required: 'Поле обезательно к заполнению',
            })}
            placeholder={'Введите название видео'}
            className={`border ${
              errors?.video_name ? 'border-red-500' : 'border-gray-300'
            }   transition-all duration-300 text-sm `}
          />
        </div>

        {/**/}
        <div className="flex gap-4">
          <div className="grid w-full mb-4">
            <Label className="text-sm	text-white pb-2">
              Выбрать формат<span className="text-red-500 ml-0.5">*</span>
            </Label>
            <Controller
              name="publisher"
              {...register('format', {
                required: 'Поле обязательно',
              })}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                  disabled={item.format === 'preroll' || item.format === 'tv_preroll' || item.format === 'top_preroll'}
                >
                  <SelectTrigger className="!text-white">
                    <SelectValue placeholder="Выбрать формат" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Выбрать формат</SelectLabel>
                      {format.map((adv) => (
                        <SelectItem key={adv.id} value={adv.value}>
                          <div className='!flex items-center gap-1'>
                            {adv.icon &&
                              <adv.icon/>
                              // <img src={option.icon} alt="" className='size-4'/>
                            }
                            {adv.text}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="grid w-full mb-4">
            <Label className="text-sm	text-white pb-2">
              {' '}
              Тайм код рекламы<span className="text-red-500 ml-0.5">*</span>
            </Label>
            <Input
              type="time"
              step="1"
              inputMode="numeric"
              onChange={timeC}
              defaultValue="00:00:00"
              disabled={item.format === 'preroll' || item.format === 'tv_preroll' || item.format === 'tv_preroll'}
              className={`border ${
                errors?.promo_start_at ? 'border-red-500' : 'border-gray-300'
              }   transition-all duration-300 text-sm `}
            />
          </div>
        </div>
        {/**/}

        {/**/}
        <div className="flex gap-4">
          <div className="grid w-full mb-4">
            <Label className="text-sm	text-white pb-2">
              Прогноз показов<span className="text-red-500 ml-0.5">*</span>
            </Label>
            <Controller
              name="expected_number_of_views"
              control={control}
              rules={{ required: 'Поле обязательно к заполнению' }}
              defaultValue=""
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <Input
                  type="text"
                  value={value.toLocaleString('en-US')}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/\D/g, '')
                    const newValue = rawValue ? parseInt(rawValue, 10) : ''
                    onChange(newValue)
                  }}
                  onBlur={onBlur}
                  className={`border ${
                    errors?.expected_number_of_views
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }   transition-all duration-300 text-sm `}
                  name={name}
                  ref={ref}
                  placeholder="Прогноз показов"
                  autoComplete="off"
                  step="1000"
                />
              )}
            />
          </div>
          <div className="grid w-full mb-4">
            <Label className="text-sm	text-white pb-2">
              Дата публикаций<span className="text-red-500 ml-0.5">*</span>
            </Label>
            <Input
              className={`border ${
                errors?.publication_time ? 'border-red-500' : 'border-gray-300'
              }   transition-all duration-300 text-sm `}
              type="date"
              min={getThreeDaysAgo()}
              {...register('publication_time', {
                required: 'Поле обезательно',
              })}
            />
          </div>
        </div>
        {/**/}

        {/**/}
        <div className="flex gap-4">
          <div className="grid w-full mb-4">
            <Label className="text-sm	text-white pb-2">
              Выбрать категорию<span className="text-red-500 ml-0.5">*</span>
            </Label>
            <Controller
              name="publisher"
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
          <div className="grid w-full mb-4">
            <Label className="text-sm	text-white pb-2">
              Хрон видео<span className="text-red-500 ml-0.5">*</span>
            </Label>
            <div>
              <Input
                type="time"
                step="1"
                inputMode="numeric"
                onChange={timevideo_duration}
                defaultValue="00:00:00"
                className={`border ${
                  errors?.category ? 'border-red-500' : 'border-gray-300'
                }   transition-all duration-300 text-sm `}
              />
            </div>
          </div>
        </div>
        {/**/}

        <div className="flex gap-4 items-end ">
          <div className="grid w-full ">
            <Label className="text-sm	text-white pb-2">
              {' '}
              Хрон рекламы (сек)<span className="text-red-500 ml-0.5">*</span>
            </Label>
            <div>
              <Input
                className={`border ${
                  errors?.promo_duration ? 'border-red-500' : 'border-gray-300'
                }   transition-all duration-300 text-sm `}
                type="number"
                {...register ('promo_duration', {
                  required: 'Поле обязательно для заполнения',
                })}
              />
            </div>

          </div>
          <div className="grid w-full">
            <Label className="text-sm	text-white pb-2">
              Прикрепить ссылку
            </Label>

            <Input
              type="text"
              autoComplete="off"
              {...register('link_to_video')}

              placeholder={'Прикрепить ссылку '}
              className={`border ${
                errors?.linkToVideo ? 'border-red-500' : 'border-gray-300'
              }   transition-all duration-300 text-sm `}
            />
          </div>

        </div>
        <Button
          className={`${
            isValid
              ? 'bg-[#2A85FF66] hover:bg-[#0265EA] border-2 border-[#0265EA] hover:border-[#0265EA]'
              : 'bg-[#616161]'
          } w-full   h-[40px] text-white rounded-2xl	mt-4`}
          disabled={!isValid}
        >
          Создать
        </Button>
      </form>
    </>
  )
}
