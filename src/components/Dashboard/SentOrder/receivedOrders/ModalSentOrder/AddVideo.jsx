// import axios from 'axios'
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
// import { fetchInventory } from '../../../../../redux/inventory/inventorySlice'
import Cookies from 'js-cookie'
// import {Monitor, MonitorPlay, MonitorUp} from "lucide-react";
import axiosInstance from '@/api/api.js'
import { Loader2, PackagePlus } from 'lucide-react'
import TooltipWrapper from '@/shared/TooltipWrapper.jsx'

export default function AddVideo({ item, setIsPopoverOpen }) {
  const [channelModal, setChannelModal] = React.useState([])
  const dispatch = useDispatch()
  const [loading, setLoading] = React.useState(false)

  const id = Number(Cookies.get('channelId'))
  const user = Cookies.get('role')

  const fetchChannel = async () => {
    const response = await axiosInstance.get(`${backendURL}/publisher/channel/`)
    setChannelModal(response.data.data.results)
  }

  React.useEffect(() => {
    fetchChannel()
  }, [])

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    // setValue,
    control,
  } = useForm({
    defaultValues: {
      order_id: item.id,
      channel_id: user === 'channel' ? '' : id,
      video_name: '',
      publication_time: '',
      link_to_video: '',
    },
    mode: 'onSubmit',
  })
  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const response = await axiosInstance.post(
        `${backendURL}/inventory/assign-to-order-with-new-video`,
        {
          order_assignment_id: data.order_id,
          ...(data.channel_id ? { channel_id: data.channel_id } : {}), // Добавляем channel_id только если он существует
          video_name: data.video_name,
          publication_time: data.publication_time,
          ...(data.link_to_video ? { link_to_video: data.link_to_video } : {}), // Добавляем channel_id только если он существует
        },
      )

      // Debug log to inspect response
      if (response.data) {
        toast.success('Размещение успешно созданно !')
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
    } finally {
      setLoading(false)
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
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
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

        <div className="grid w-full ">
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

        {/**/}

        <div className="flex gap-4 items-end ">
          {/*</div>*/}
          <div className="grid w-full">
            <Label className="text-sm	text-white pb-2">Прикрепить ссылку</Label>

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

        <div className="flex gap-4">
          <div className="grid w-full ">
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
          <div className="flex items-end ">
            <TooltipWrapper tooltipContent="Создать">
              <Button
                variant="default"
                disabled={!isValid || loading}
                className="h-[40px]"
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <PackagePlus />
                )}
              </Button>
            </TooltipWrapper>
          </div>
        </div>
      </form>
    </>
  )
}
