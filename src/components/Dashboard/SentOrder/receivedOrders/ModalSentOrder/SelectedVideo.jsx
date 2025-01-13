import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'

import backendURL from '@/utils/url'
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
import { hasRole } from '@/utils/roleUtils.js'
import { Input } from '@/components/ui/input.jsx'
import { Button } from '@/components/ui/button.jsx'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'
import { fetchInventory } from '../../../../../redux/inventory/inventorySlice'
import { fetchOnceListSentToPublisher } from '../../../../../redux/order/SentToPublisher'
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

export default function SelectedVideo({ item, setIsPopoverOpen }) {
  const dispatch = useDispatch()
  const [channelModal, setChannelModal] = React.useState([])
  const [selectedTimer, setSelectedTimer] = React.useState('')
  const channelid = Number(Cookies.get('channelId'))
  const [videoModal, setVideoModal] = React.useState([])
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

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
    control,
    watch,
  } = useForm({
    defaultValues: {
      expected_number_of_views: '',
      format: item.format,
      promo_start_at: 0,
      promo_duration: '',
      order_id: item.id,
      video_id: '',
      channel_id: '',
    },
    mode: 'onSubmit',
  })
  const cId = watch('channel_id')
  console.log (channelid)
  const onSubmit = async (data) => {

    try {
      const response = await axiosInstance.post(
        `${backendURL}/inventory/assign-to-order-with-existing-video`,
        {
          expected_number_of_views: data.expected_number_of_views,
          format: data.format,
          promo_start_at: data.promo_start_at,
          promo_duration: data.promo_duration,
          order_assignment_id: data.order_id,
          video_id: data.video_id,
        }
      )

      if (response.data) {
        toast.success('Видео успешно создано!')
        // dispatch(fetchInventory({ orderAssignmentId: item.id }))
        dispatch(fetchOnceListSentToPublisher({ is_deactivated: false }))
        setTimeout(() => {
          window.location.reload()
        }, 1500)
        setIsPopoverOpen(false)
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

  const getCurrentDate = () => {
    const today = new Date()
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

  const fetchChannel = async () => {
    const token = Cookies.get('token')
    const response = await axios.get(
      `${backendURL}/publisher/channel/`,

      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    setChannelModal(response.data.data.results)
  }

  React.useEffect(() => {
    // if (user === 'channel') {
    //   fetchVideo ()
    // }
    if (cId) {
      fetchVideo()
    }
    fetchVideo()
  }, [dispatch, cId])

  React.useEffect(() => {
    fetchChannel()
  }, [dispatch])

  const fetchVideo = async () => {
    try {
      const response = await axiosInstance.get(
        `${backendURL}/inventory/video/?channel_id=${channelid}`,
      )
      setVideoModal(
        // response.data.data
        response.data.data.results,
      )
    } catch (error) {
      console.error('Error fetching video:', error)
    }
  }

  return (
    <>
      <div>
        {/*body*/}
        <div className="modalWindow">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/**/}
            {hasRole('publisher') ? (
              <div className="grid w-full mb-4">
                <Label className="text-sm	text-white pb-2">
                  Выбрать Канал<span className="text-red-500 ml-0.5">*</span>
                </Label>
                <Controller
                  name="publisher"
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
            {/**/}

            {/**/}
            <div className="grid w-full mb-4">
              <Label className="text-sm	text-white pb-2">
                Выбрать Канал<span className="text-red-500 ml-0.5">*</span>
              </Label>
              <Controller
                name="publisher"
                {...register('video_id', {
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
                      <SelectValue placeholder="Выбрать Видео" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Выбрать Видео</SelectLabel>
                        {videoModal?.results?.map((adv) => (
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
                  Тайм код рекламы<span className="text-red-500 ml-0.5">*</span>
                </Label>
                <Input
                  className={`border ${
                    errors?.timecod ? 'border-red-500' : 'border-gray-300'
                  }   transition-all duration-300 text-sm `}
                  type="time"
                  step="1"
                  inputMode="numeric"
                  onChange={timeC}
                  defaultValue="00:00:00"
                />
              </div>
            </div>

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
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                  }) => (
                    <Input
                      className={`border ${
                        errors?.expected_number_of_views
                          ? 'border-red-500'
                          : 'border-gray-300'
                      }   transition-all duration-300 text-sm `}
                      type="text"
                      value={value.toLocaleString('en-US')}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/\D/g, '')
                        const newValue = rawValue ? parseInt(rawValue, 10) : ''
                        onChange(newValue)
                      }}
                      onBlur={onBlur}
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
                  Хрон рекламы (сек)
                  <span className="text-red-500 ml-0.5">*</span>
                </Label>

                <Input
                  className={`border ${
                    errors?.promo_duration
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }   transition-all duration-300 text-sm `}
                  type="number"
                  {...register('promo_duration', {
                    required: 'Поле обязательно для заполнения',
                  })}
                />
              </div>
            </div>

            <Button
              className={`${
                isValid
                  ? 'bg-[#2A85FF66] hover:bg-[#0265EA] border-2 border-[#0265EA] hover:border-[#0265EA]'
                  : 'bg-[#616161]'
              } w-full   h-[44px] text-white rounded-lg	mt-4`}
              disabled={!isValid}
            >
              Создать
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
