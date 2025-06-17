import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import axios from 'axios'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
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
import {
  Check,
  ChevronsUpDown,
  Loader2,
  Monitor,
  MonitorPlay,
  MonitorUp,
  PackagePlus,
} from 'lucide-react'
import Cookies from 'js-cookie'
import { fetchSingleOrder } from '@/redux/order/orderSlice.js'
import axiosInstance from '@/api/api.js'
import TooltipWrapper from '@/shared/TooltipWrapper.jsx'
import { Badge } from '@/components/ui/badge.jsx'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils.js'
import InputFuild from '@/shared/Form/InputFuild.jsx'

const format = [
  { value: 'preroll', text: 'Pre-roll', icon: Monitor },
  { value: 'tv_preroll', text: 'TV Pre-roll', icon: MonitorPlay },
  { value: 'top_preroll', text: 'Top Pre-roll', icon: MonitorUp },
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
  const [open, setOpen] = React.useState(false)

  const selectedPublisher = (value) => {
    setPublisherID(value)
  }
  const fetchChannel = async () => {
    try {
      const url = new URL(`${backendURL}/publisher/channel/`)
      const params = new URLSearchParams()

      // Добавляем параметры запроса
      params.append('page', '1')
      params.append('page_size', '200')
      if (publisherID) {
        params.append('publisher_id', publisherID)
      }

      // Присваиваем параметры в строку запроса
      url.search = params.toString()

      const response = await axiosInstance.get(url.toString())
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
      // age_range: '',
      // content_language: '',
      // country: '',
      notes_text: '',
      // notes_url: '',
    },
    mode: 'onChange',
  })
  const selectedFormat = watch('format')
  const expectedView = watch('ordered_number_of_views')

  const selectedOrder = watch('order')
  const selectedchannel = watch('channel')
  const selectedStart = watch('startdate')
  const selectedEnd = watch('enddate')
  const selectedView = watch('ordered_number_of_views')
  const selectedBudget = watch('budget')
  const selectedNote = watch('notes_text')

  console.log(
    selectedOrder,
    selectedchannel,
    selectedStart,
    selectedEnd,
    selectedView,
    selectedBudget,
    selectedNote,
  )
  const onSubmit = async (data) => {
    const token = Cookies.get('token')

    try {
      setIsOrderCreated(true)

      const response = await axios.post(
        `${backendURL}/order/assignments/`,
        {
          order: data.order,
          channel: data.channel,
          format: onceOrder.format,
          start_date: data.startdate,
          end_date: data.enddate,
          ordered_number_of_views: data.ordered_number_of_views,
          budget: data.budgett,
          notes_text: data.notes_text,
          // notes_url: data.notes_url,
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
        await dispatch(fetchSingleOrder(onceOrder.id))
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
    dispatch(
      fetchPublisher({
        page: 1,
        pageSize: 200,
      }),
    )
  }, [dispatch])
  React.useEffect(() => {
    fetchChannel({
      page: 1,
      pageSize: 200,
    }).then(() => setLoading(false))
  }, [publisherID])

  return (
    <div className="relative h-full rounded-[22px]">
      <div className="flex gap-1">
        <div className="grid w-full ">
          <Label className="text-sm text-[var(--text)] pb-2">
            Выбрать Паблишера
          </Label>
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
                <SelectTrigger className="!text-[var(--text)]">
                  <SelectValue placeholder="Выбрать паблишера" />
                </SelectTrigger>
                <SelectContent className="bg-[#ffffff4d]">
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

        <div className="grid w-full ">
          <Label className="text-sm text-[var(--text)] pb-2">
            Выбрать канал<span className="text-red-500 ml-0.5">*</span>
          </Label>

          <Controller
            name="channel"
            control={control}
            rules={{ required: 'Поле обязательно' }}
            render={({ field }) => {
              const selected = channelModal?.results?.find(
                (framework) => framework.id === field.value,
              )
              return (
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="combobox"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full border-0 h-[40px] hover:scale-100 justify-between  "
                    >
                      {selected ? selected.name : 'Выбрать канал'}
                      <ChevronsUpDown className="opacity-50 size-5" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-white bg-opacity-30 backdrop-blur-md">
                    <Command>
                      <CommandInput
                        placeholder="Поиск канала..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>Ничего не найдено</CommandEmpty>
                        <CommandGroup>
                          {channelModal?.results?.map((framework) => (
                            <CommandItem
                              key={framework.value}
                              value={framework?.value} // должен быть .value, а не .id
                              onSelect={() => {
                                field.onChange(framework.id)
                                setOpen(false)
                              }}
                              disabled={
                                !framework.is_active || !framework.is_connected
                              }
                            >
                              <div className="flex items-center justify-between pr-3 w-full">
                                <div className="relative ">
                                  {framework.name}
                                </div>
                                {!framework.is_active && (
                                  <div className="absolute left-0 bg-red-500 rounded-full mr-2 w-3 h-full "></div>
                                )}
                                {!framework.is_connected && (
                                  <div className="absolute left-0 bg-red-500 w-2 h-2 rounded-full"></div>
                                )}
                              </div>
                              {/*{framework.label}*/}
                              <Check
                                className={cn(
                                  'ml-auto',
                                  field.value === framework.value
                                    ? 'opacity-100'
                                    : 'opacity-0',
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              )
            }}
          />
        </div>

        <div className=" w-full  hidden">
          <Label className="text-sm text-[var(--text)] pb-2">
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
                disabled={
                  onceOrder.format === 'preroll' ||
                  onceOrder.format === 'tv_preroll' ||
                  onceOrder.format === 'top_preroll'
                }
              >
                <SelectTrigger className="!text-[var(--text)]">
                  <SelectValue placeholder="Выбрать формат" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Выбрать формат</SelectLabel>
                    {format.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="!flex items-center gap-1">
                          {option.icon && <option.icon />}
                          {option.text}
                          {onceOrder?.target_country && (
                            <div
                              className={`rounded-[6px] px-1 text-[12px]  ${
                                onceOrder?.target_country
                                  ? 'bg-[#606afc]'
                                  : 'bg-transparent'
                              }`}
                            >
                              {onceOrder?.target_country}
                            </div>
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

        <div className="grid w-full ">
          <Label className="text-sm text-[var(--text)] pb-2">
            Начало<span className="text-red-500 ml-0.5">*</span>
          </Label>
          <Input
            // className={style.input}
            type="date"
            {...register('startdate', {
              required: 'Поле обязательно к заполнению',
            })}
            style={{ border: errors?.startdate ? '1px solid red' : '' }}
          />
        </div>

        <div className="grid w-full ">
          <Label className="text-sm text-[var(--text)] pb-2">
            Конец<span className="text-red-500 ml-0.5">*</span>
          </Label>
          <Input
            // className={style.input}
            type="date"
            {...register('enddate', {
              required: 'Поле обязательно к заполнению',
            })}
            style={{ border: errors?.enddate ? '1px solid red' : '' }}
          />
        </div>

        <div className="grid w-full relative">
          <Label className="flex gap-0.5 text-sm  text-[var(--text)] pb-2">
            <div>
              Порог показов<span className="text-red-500 ml-0.5">*</span>
            </div>
            {budgett > 0 ? (
              <Badge variant="default" className="text-[15px] py-0 -mt-0.5">
                {budgett.toLocaleString('en-US')}
              </Badge>
            ) : null}
          </Label>
          <Controller
            commentMore
            actions
            name="ordered_number_of_views"
            control={control}
            rules={{ required: 'Поле обязательно к заполнению' }}
            render={({ field }) => (
              <Input
                // className={style.input}
                type="text"
                value={field.value.toLocaleString('en-US')}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/\D/g, '')
                  field.onChange(rawValue ? parseInt(rawValue, 10) : '')
                }}
                placeholder="Порог показов"
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

        <div className="grid w-full ">
          <Label className="text-sm text-[var(--text)] pb-2">
            Текст<span className="text-red-500 ml-0.5">*</span>
          </Label>
          <InputFuild
            name="notes_text"
            control={control}
            rules={{ required: 'Поле обязательно к заполнению' }}
            error={errors.notes_text}
            placeholder="Введите текст"
          />
        </div>
        <div className="w-fit flex items-end">
          <TooltipWrapper tooltipContent="Создать">
            <Button
              onClick={handleSubmit(onSubmit)}
              disabled={!isValid || isOrderCreated}
              variant="default"
              isValid={true}
              className="h-[40px]"
            >
              {isOrderCreated ? (
                <Loader2 className="animate-spin" />
              ) : (
                <PackagePlus />
              )}
            </Button>
          </TooltipWrapper>
        </div>
      </div>
    </div>
  )
}
export default AddSendPublisherModal
