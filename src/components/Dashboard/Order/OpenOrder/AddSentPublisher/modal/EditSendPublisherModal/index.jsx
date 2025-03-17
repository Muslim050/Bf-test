import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import { toast } from 'react-hot-toast'
import { Controller, useForm } from 'react-hook-form'
import style from './EditSendPublisherModal.module.scss'
import 'react-datepicker/dist/react-datepicker.css'
import backendURL from '@/utils/url.js'
import { fetchPublisher } from '@/redux/publisher/publisherSlice.js'
import { fetchOnceListSentToPublisher } from '@/redux/order/SentToPublisher.js'
import Cookies from 'js-cookie'
import { ClipboardCheck } from 'lucide-react'

import { Input } from '@/components/ui/input.jsx'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
} from '@/components/ui/select.jsx'
import { SelectTrigger } from '@/components/ui/selectTrigger.jsx'
import { Button } from '../../../../../../ui/button.jsx'
import axiosInstance from '@/api/api.js'
import { Label } from '@/components/ui/label.jsx'

const EditSendPublisherModal = ({
  onCancel,
  expandedRows,
  item,
  setEditNote,
}) => {
  console.log(item)
  const dispatch = useDispatch()
  const [channelModal, setChannelModal] = React.useState([])
  const { publisher } = useSelector((state) => state.publisher)
  const [publisherID, setPublisherID] = React.useState('')
  const [publisherName, setPublisherName] = React.useState('')

  const [channelID, setChannelID] = React.useState('')
  const [channelName, setChannelName] = React.useState('')

  const selectedPublisher = (value) => {
    setPublisherID(value)
  }

  const fetchChannel = async () => {
    if (!publisherID) return // Skip fetch if publisherID is not set
    const response = await axiosInstance.get(
      `${backendURL}/publisher/channel/?publisher_id=${publisherID}`,
    )
    setChannelModal(response.data.data)
  }
  React.useEffect(() => {
    dispatch(
      fetchPublisher({
        page: 1, // API использует нумерацию с 1
        pageSize: 200,
      }),
    )
  }, [dispatch])
  const [cpm, setCpm] = React.useState([])
  const [budgett, setBudgett] = React.useState(0)
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
    watch,
    control,
    trigger,
  } = useForm({
    defaultValues: {
      order: expandedRows,
      channel: '',
      format: item?.format,
      startdate: item?.start_date ? item?.start_date.substring(0, 10) : '',
      enddate: item?.enddate,
      ordered_number_of_views: '',
      budgett: item?.budgett,
      notes_text: '',
    },
    mode: 'onChange',
  })

  const selectedFormat = watch('format')
  const expectedView = watch('ordered_number_of_views')

  const onSubmit = async (data) => {
    const token = Cookies.get('token')
    const requestData = {}

    // Проверьте, что data.selectedFile не равен null, прежде чем добавить promo_file
    if (data.order && data.order !== null) {
      requestData.order = data.order
    }
    if (data.channel && data.channel !== null) {
      requestData.channel = data.channel
    }
    if (data.format && data.format !== null) {
      requestData.format = data.format
    }
    if (data.startdate && data.startdate !== null) {
      requestData.start_date = data.startdate
    }
    if (data.enddate && data.enddate !== null) {
      requestData.end_date = data.enddate
    }
    if (data.ordered_number_of_views && data.ordered_number_of_views !== null) {
      requestData.ordered_number_of_views = data.ordered_number_of_views
    }
    if (data.budgett && data.budgett !== null) {
      requestData.budget = data.budgett
    }

    if (data.notes_text && data.notes_text !== null) {
      requestData.notes_text = data.notes_text
    }
    try {
      const response = await axiosInstance.patch(
        `${backendURL}/order/assignments/${item.id}/`,
        requestData,
      )

      // Debug log to inspect response

      if (response.data) {
        toast.success('Данные успешно обновлены!')
        onCancel()
        setEditNote(false)
        await dispatch(fetchOnceListSentToPublisher({ expandedRows }))
      } else {
        // Handle case where payload is not as expected
        throw new Error('Unexpected response payload')
      }
    } catch (error) {
      toast.error(error)
    }
  }

  React.useEffect(() => {
    fetchChannel({
      page: 1, // API использует нумерацию с 1
      pageSize: 200,
    })
  }, [publisherID])

  const fetchCpm = async () => {
    const response = await axiosInstance.get(
      `${backendURL}/order/cpm/?advertiser=${item.advertiser.id}`,
    )
    setCpm(response.data.data)
  }
  const calculateBudget = () => {
    let newBudget = 0
    if (cpm[selectedFormat]) {
      newBudget = (expectedView / 1000) * cpm[selectedFormat]
    }
    setBudgett(newBudget)
  }
  React.useEffect(() => {
    calculateBudget()
  }, [selectedFormat, expectedView, cpm])
  React.useEffect(() => {
    setValue('budgett', budgett)
  }, [budgett, setValue])
  React.useEffect(() => {
    fetchCpm()
  }, [])
  React.useEffect(() => {
    if (item) {
      setValue('publisher', item.publisher?.id || '')
      setPublisherID(item.publisher?.id || '') // Set publisher ID here
      setPublisherName(item.publisher?.name)
      setChannelID(item.channel?.id || '')
      setChannelName(item.channel?.name)

      setValue('channel', item.channel?.id || '')
      setValue('format', item.format)
      setValue(
        'startdate',
        item.start_date ? item.start_date.substring(0, 10) : '',
      )
      setValue('enddate', item.end_date ? item.end_date.substring(0, 10) : '')
      setValue('ordered_number_of_views', item.ordered_number_of_views)
      setValue('budgett', item.budget)
      setValue('notes_text', item.notes_text)
      trigger() // Manually trigger validation
    }
  }, [item, setValue, trigger])

  React.useEffect(() => {
    console.log('isValid:', isValid)
    console.log('errors:', errors)
  }, [isValid, errors])

  React.useEffect(() => {}, [setPublisherID, setChannelID])
  console.log(channelName)
  return (
    <>
      <div className="relative rounded-[22px]">
        <div className="grid lg:grid-cols-8  md:grid-cols-4 sm:grid-cols-2  gap-1">
          <div className="grid w-full mb-4 ">
            <Label className="text-sm text-white pb-2">Выбрать Паблишера</Label>

            <Controller
              name="advertiser"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={(value) => {
                    field.onChange(value)
                    setPublisherID(value) // Обновляем ID паблишера
                    const selected = publisher?.results?.find(
                      (pub) => pub.id.toString() === value,
                    )
                    setPublisherName(selected ? selected.name : '') // Обновляем имя
                  }}
                  value={field.value} // Значение должно быть ID, а не name
                >
                  <SelectTrigger className="!text-white">
                    <SelectValue
                      placeholder={publisherName || 'Выбрать паблишера'}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Выбрать паблишера</SelectLabel>
                      {Array.isArray(publisher?.results) &&
                        publisher.results.map((pub) => (
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

          <div className="grid w-full mb-4 ">
            <Label className="text-sm text-white pb-2">Выбрать канал</Label>

            <Controller
              name="channel"
              control={control}
              rules={{ required: 'Поле обязательно' }}
              render={({ field }) => (
                <Select
                  onValueChange={(value) => {
                    field.onChange(value)
                    setChannelID(value)
                    const selected = channelModal?.results?.find(
                      (opt) => opt.id.toString() === value,
                    )
                    setChannelName(selected ? selected.name : '')
                  }}
                  value={field.value}
                >
                  <SelectTrigger
                    className="!text-white"
                    onClick={() => field.onChange('')} // сброс значения при клике
                  >
                    <SelectValue placeholder={channelName || 'Выбрать канал'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Выбрать канал</SelectLabel>
                      {Array.isArray(channelModal?.results) &&
                        channelModal.results.map((option) => (
                          <SelectItem
                            key={option.id}
                            value={option.id.toString()}
                          >
                            {option.name}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/*<div className="grid w-full mb-4 ">*/}
          {/*  <Label className="text-sm text-white pb-2">Выбрать формат</Label>*/}

          {/*  <Controller*/}
          {/*    name="format"*/}
          {/*    control={control}*/}
          {/*    rules={{required: 'Поле обязательно'}}*/}
          {/*    render={({field}) => (*/}
          {/*      <Select*/}
          {/*        onValueChange={field.onChange}*/}
          {/*        defaultValue={field.value}*/}
          {/*        value={field.value}*/}
          {/*        disabled={item.format === 'preroll'}*/}
          {/*      >*/}
          {/*        <SelectTrigger className="!text-white">*/}
          {/*          <SelectValue placeholder="Выбрать формат"/>*/}
          {/*        </SelectTrigger>*/}
          {/*        <SelectContent>*/}
          {/*          <SelectGroup>*/}
          {/*            <SelectLabel>Выбрать формат</SelectLabel>*/}
          {/*            {format.map ((option) => (*/}
          {/*              <SelectItem key={option.value} value={option.value}>*/}
          {/*                {option.text}*/}
          {/*              </SelectItem>*/}
          {/*            ))}*/}
          {/*          </SelectGroup>*/}
          {/*        </SelectContent>*/}
          {/*      </Select>*/}
          {/*    )}*/}
          {/*  />*/}
          {/*</div>*/}

          <div className="grid w-full mb-4 ">
            <Label className="text-sm text-white pb-2">Начало</Label>

            <Controller
              name="startdate"
              control={control}
              defaultValue={
                item?.start_date ? item?.start_date.substring(0, 10) : ''
              }
              render={({ field: { onChange, value } }) => (
                // <input
                //   className={style.input}
                //   type="date"
                //   onChange={onChange}
                //   value={value}
                //   style={{ border: errors?.start_date ? '1px solid red' : '' }}
                // />
                <Input
                  className={style.input}
                  value={value}
                  onChange={onChange}
                  type="date"
                  style={{ border: errors?.startdate ? '1px solid red' : '' }}
                />
              )}
            />
          </div>

          <div className="grid w-full mb-4 ">
            <Label className="text-sm text-white pb-2">Конец</Label>

            <Controller
              name="enddate"
              control={control}
              defaultValue={item?.enddate ? item?.enddate.substring(0, 10) : ''}
              render={({ field: { onChange, value } }) => (
                // <input
                //   className={style.input}
                //   type="date"
                //   onChange={onChange}
                //   value={value}
                //   style={{ border: errors?.enddate ? '1px solid red' : '' }}
                // />
                <Input
                  className={style.input}
                  value={value}
                  onChange={onChange}
                  type="date"
                  style={{ border: errors?.startdate ? '1px solid red' : '' }}
                />
              )}
            />
          </div>

          <div className="grid w-full mb-4 ">
            <Label className="text-sm text-white pb-2">Порог показов</Label>

            <Controller
              name="ordered_number_of_views"
              control={control}
              rules={{
                required: 'Поле обязательно к заполнению',
              }}
              defaultValue=""
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <Input
                  className={style.input}
                  type="text"
                  value={value.toLocaleString('en-US')}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/\D/g, '')
                    const newValue = rawValue ? parseInt(rawValue, 10) : ''
                    onChange(newValue)
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

          <div className="grid w-full mb-4 ">
            <Label className="text-sm text-white pb-2">Бюджет</Label>

            <Input
              className={style.input}
              type="text"
              value={budgett.toLocaleString('en-US')}
              placeholder="Бюджет"
              autoComplete="off"
              disabled={true}
            />
          </div>
          <div className="grid w-full mb-4 ">
            <Label className="text-sm text-white pb-2">Текст</Label>

            <Input
              className={style.input}
              type="text"
              placeholder="notes_text"
              style={{ border: errors?.notes_text ? '1px solid red' : '' }}
              {...register('notes_text', {
                required: 'Поле обязательно к заполнению',
              })}
            />
          </div>
          <div className="grid min-w-min mb-4 ">
            <Label className="text-sm text-white pb-2">Действия</Label>

            <div className="flex">
              {' '}
              <Button
                variant="link"
                disabled={!isValid}
                onClick={handleSubmit(onSubmit)}
                className="relative hover:scale-125 transition-all p-0"
              >
                <ClipboardCheck className="hover:text-green-500 text-white" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default EditSendPublisherModal
