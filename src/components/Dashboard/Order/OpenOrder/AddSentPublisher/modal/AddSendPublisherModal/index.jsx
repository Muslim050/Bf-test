import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import axios from 'axios'
// import backendURL from "../../../../../../../utils/url";
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import style from './AddSendPublisherModal.module.scss'
import 'react-datepicker/dist/react-datepicker.css'
import { fetchPublisher } from '@/redux/publisher/publisherSlice.js'
import { fetchOnceListSentToPublisher } from '@/redux/order/SentToPublisher.js'
import backendURL from '@/utils/url.js'
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
import { PackagePlus } from 'lucide-react'
import Cookies from 'js-cookie'


import { Monitor, MonitorPlay, MonitorUp } from 'lucide-react';
import {fetchViewStatus} from "@/redux/orderStatus/orderStatusSlice.js";
import {fetchSingleOrder, updateOrderWithInventory} from "@/redux/order/orderSlice.js";
import axiosInstance from "@/api/api.js";


const format = [
  { value: 'preroll', text: 'Pre-roll', icon: Monitor },
  { value: 'tv_preroll', text: 'TV Pre-roll', icon: MonitorPlay },
  { value: 'top_preroll', text: 'Top Pre-roll', icon: MonitorUp  },
]
const AddSendPublisherModal = ({ setViewNote, expandedRows, onceOrder }) => {
  const dispatch = useDispatch()
  const [channelModal, setChannelModal] = React.useState([])
  const { publisher } = useSelector((state) => state.publisher)
  const [publisherID, setPublisherID] = React.useState('')
  const [cpm, setCpm] = React.useState([])
  const [budgett, setBudgett] = React.useState(0)
  const [isOrderCreated, setIsOrderCreated] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  console.log (channelModal)
  const selectedPublisher = (value) => {
    setPublisherID(value)
  }
  const fetchChannel = async () => {
    try {
      let url = new URL(`${backendURL}/publisher/channel${
        publisherID ? `?publisher_id=${publisherID}` : ''
      }`)
      const params = new URLSearchParams()
      url.search = params.toString()
      const response = await axiosInstance.get(url)
      setChannelModal(response.data.data)
    } catch (error) {
      console.error('Error fetching channel data:', error)
      // Обработка ошибок
    }
  }

  const fetchCpm = async () => {
    const response = await axiosInstance.get(
      `${backendURL}/order/cpm/?advertiser=${onceOrder.advertiser.id}`,
    )
    setCpm(response.data.data)
  }
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
    watch,
    control,
  } = useForm({
    defaultValues: {
      order: expandedRows,
      channel: '',
      format: onceOrder.format,
      startdate: '',
      enddate: '',
      ordered_number_of_views: '',
      budget: budgett,
      age_range: '',
      content_language: '',
      country: '',
      notes_text: '',
      notes_url: '',
    },
    mode: 'onChange',
  })
  const selectedFormat = watch('format')
  const expectedView = watch('ordered_number_of_views')

  const onSubmit = async (data) => {
    const token = Cookies.get('token')

    try {
      setIsOrderCreated(true)

      const response = await axios.post(
        `${backendURL}/order/assignments/`,
        {
          order: data.order,
          channel: data.channel,
          format: data.format,
          start_date: data.startdate,
          end_date: data.enddate,
          ordered_number_of_views: data.ordered_number_of_views,
          budget: data.budgett,
          age_range: data.age_range,
          content_language: data.content_language,
          country: data.country,
          notes_text: data.notes_text,
          notes_url: data.notes_url,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )

      // Debug log to inspect response

      if (response.data) {
        toast.success('Запись успешно создана!')
        setViewNote(false)
        await dispatch(fetchOnceListSentToPublisher({ expandedRows }))
        await dispatch(fetchSingleOrder(onceOrder.id));

      } else {
        // Handle case where payload is not as expected
        throw new Error('Unexpected response payload')
      }

    } catch (error) {
      setIsOrderCreated(false)
      const errorData = error.response.data.error
      // Convert array contents to a string and format with FilterMain.jsx
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
    }
  }
  const calculateBudget = () => {
    let newBudget = 0
    if (onceOrder.target_country) {
      const uzFormat = `${selectedFormat}_uz`
      if (cpm[uzFormat]) {
        newBudget = (expectedView / 1000) * cpm[uzFormat]
      }
    } else if (cpm[selectedFormat]) {
      newBudget = (expectedView / 1000) * cpm[selectedFormat]
    }
    setBudgett(newBudget)
  }
  React.useEffect(() => {
    calculateBudget()
  }, [selectedFormat, expectedView])
  React.useEffect(() => {
    setValue('budgett', budgett)
  }, [budgett, setValue, onceOrder])
  React.useEffect(() => {
    fetchCpm()
  }, [onceOrder])
  React.useEffect(() => {
    dispatch(fetchPublisher({}))
  }, [dispatch])
  React.useEffect(() => {
    fetchChannel().then(() => setLoading(false))
  }, [publisherID])

  return (
    <div className="relative rounded-[22px]">
      <div className="grid lg:grid-cols-6  md:grid-cols-4 sm:grid-cols-2  gap-1">
        <div className="grid w-full mb-4">
          <Label className="text-sm text-white pb-2">Выбрать Паблишера</Label>
          <Controller
            name="advertiser"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  field.onChange(value)
                  selectedPublisher(value) // вызывать вашу функцию для обновления ID
                }}
                defaultValue={field.value}
                value={field.value}
              >
                <SelectTrigger className="!text-white">
                  <SelectValue placeholder="Выбрать паблишера" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Выбрать паблишера</SelectLabel>
                    {/* Assuming you have a publisher array */}
                    {publisher?.results?.map((pub) => (
                      <SelectItem key={pub.id} value={pub.id.toString()}>
                        {pub.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="grid w-full mb-4">
          <Label className="text-sm text-white pb-2">
            Выбрать канал<span className="text-red-500 ml-0.5">*</span>
          </Label>
          <Controller
            name="channel"
            control={control}
            rules={{ required: 'Поле обязательно' }}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <SelectTrigger
                  className="!text-white"
                  onClick={() => field.onChange('')} // сброс значения при клике
                >
                  <SelectValue placeholder="Выбрать канал" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>
                      <div className="flex items-center justify-between">
                        Выбрать канал{' '}
                        {loading && (
                          <div
                            className="loaderWrapper"
                            style={{ height: '2vh' }}
                          >
                            <div
                              className="spinner"
                              style={{ width: '25px', height: '25px' }}
                            ></div>
                          </div>
                        )}
                      </div>
                    </SelectLabel>
                    {/* Assuming you have a channelModal array */}
                    {channelModal?.results?.map((option) => (
                      <SelectItem
                        key={option.id}
                        value={option.id.toString()}
                        className="flex"
                        disabled={!option.is_active ||  !option.is_connected}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="relative">{option.name}</div>
                          {!option.is_active  && (
                            <div className="absolute left-0 bg-red-500 rounded-full  w-3 h-full "></div>
                          )}
                          {!option.is_connected  && (
                            <div className="absolute left-0 bg-red-500 w-2 h-2 rounded-[3px]"></div>
                          )}
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
          <Label className="text-sm text-white pb-2">
            Выбрать формат<span className="text-red-500 ml-0.5">*</span>
          </Label>
          <Controller
            name="format"
            control={control}
            rules={{ required: 'Поле обязательно' }}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
                disabled={onceOrder.format === 'preroll' || onceOrder.format === 'tv_preroll' || onceOrder.format === 'top_preroll'}
              >
                <SelectTrigger className="!text-white">
                  <SelectValue placeholder="Выбрать формат" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Выбрать формат</SelectLabel>
                    {format.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className='!flex items-center gap-1'>
                          {option.icon &&
                            <option.icon/>
                          }
                          {option.text}
                          {onceOrder?.target_country && <div
                            className={`rounded-[6px] px-1 text-[12px]  ${
                              onceOrder?.target_country ? 'bg-[#606afc]' : 'bg-transparent'
                            }`}
                          >
                            {onceOrder?.target_country}
                          </div>}
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
          <Label className="text-sm text-white pb-2">
            Начало<span className="text-red-500 ml-0.5">*</span>
          </Label>
          <Input
            className={style.input}
            type="date"
            {...register('startdate', {
              required: 'Поле обязательно к заполнению',
            })}
            style={{ border: errors?.startdate ? '1px solid red' : '' }}
          />
        </div>

        <div className="grid w-full mb-4">
          <Label className="text-sm text-white pb-2">
            Конец<span className="text-red-500 ml-0.5">*</span>
          </Label>
          <Input
            className={style.input}
            type="date"
            {...register('enddate', {
              required: 'Поле обязательно к заполнению',
            })}
            style={{ border: errors?.enddate ? '1px solid red' : '' }}
          />
        </div>

        <div className="grid w-full mb-4">
          <Label className="text-sm text-white pb-2">
            Количество показов<span className="text-red-500 ml-0.5">*</span>
          </Label>
          <Controller
            name="ordered_number_of_views"
            control={control}
            rules={{ required: 'Поле обязательно к заполнению' }}
            render={({ field }) => (
              <Input
                className={style.input}
                type="text"
                value={field.value.toLocaleString('en-US')}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/\D/g, '')
                  field.onChange(rawValue ? parseInt(rawValue, 10) : '')
                }}
                placeholder="Количество показов"
                style={{
                  border: errors?.ordered_number_of_views
                    ? '1px solid red'
                    : '',
                }}
                autoComplete="off"
              />
            )}
          />
        </div>

        <div className="grid w-full mb-4">
          <Label className="text-sm text-white pb-2">
            Бюджет<span className="text-red-500 ml-0.5">*</span>
          </Label>
          <Input
            type="text"
            value={budgett.toLocaleString('en-US')}
            placeholder="Бюджет"
            autoComplete="off"
            disabled
          />
        </div>

        <div className="grid w-full mb-4">
          <Label className="text-sm text-white pb-2">
            Целевая аудитория<span className="text-red-500 ml-0.5">*</span>
          </Label>
          <Input
            className={style.input}
            type="text"
            placeholder="Введите аудиторию"
            {...register('age_range', {
              required: 'Поле обязательно к заполнению',
            })}
            style={{ border: errors?.age_range ? '1px solid red' : '' }}
          />
        </div>

        <div className="grid w-full mb-4">
          <Label className="text-sm text-white pb-2">
            Язык контента<span className="text-red-500 ml-0.5">*</span>
          </Label>
          <Input
            className={style.input}
            type="text"
            placeholder="Введите Язык"
            {...register('content_language', {
              required: 'Поле обязательно к заполнению',
            })}
            style={{ border: errors?.content_language ? '1px solid red' : '' }}
          />
        </div>

        <div className="grid w-full mb-4">
          <Label className="text-sm text-white pb-2">
            Текст<span className="text-red-500 ml-0.5">*</span>
          </Label>
          <Input
            className={style.input}
            type="text"
            placeholder="Введите текст"
            {...register('notes_text', {
              required: 'Поле обязательно к заполнению',
            })}
            style={{ border: errors?.notes_text ? '1px solid red' : '' }}
          />
        </div>

        <div className="grid w-full mb-4">
          <Label className="text-sm text-white pb-2">
            Url<span className="text-red-500 ml-0.5">*</span>
          </Label>
          <Input
            className={style.input}
            type="text"
            placeholder="Введите url"
            {...register('notes_url', {
              required: 'Поле обязательно к заполнению',
            })}
            style={{ border: errors?.notes_url ? '1px solid red' : '' }}
          />
        </div>

        <div className="grid w-full mb-4">
          <Label className="text-sm text-white pb-2">
            Country<span className="text-red-500 ml-0.5">*</span>
          </Label>
          <Input
            className={style.input}
            type="text"
            placeholder="country"
            {...register('country', {
              required: 'Поле обязательно к заполнению',
            })}
            style={{ border: errors?.country ? '1px solid red' : '' }}
          />
        </div>
      </div>
      <div className="w-full flex justify-end ">
        <Button
          onClick={handleSubmit(onSubmit)}
          className={`${
            isValid && !isOrderCreated
              ? 'bg-[#2A85FF66] hover:bg-[#0265EA] border-2 border-[#0265EA] hover:border-[#0265EA]'
              : 'bg-[#616161]'
          }  w-auto h-[44px] text-white rounded-lg	flex gap-2 mb-4 `}
          disabled={!isValid || isOrderCreated}
          isValid={true}
        >
          {isOrderCreated ? <div className="loader"></div> : <PackagePlus />}

          {isOrderCreated ? (
            <>
              <div className={style.loaderWrapper}></div>
            </>
          ) : (
            <span>Создать</span>
          )}
        </Button>
      </div>
    </div>
  )
}
export default AddSendPublisherModal
