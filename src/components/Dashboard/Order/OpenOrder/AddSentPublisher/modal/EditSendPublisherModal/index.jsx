import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Controller, useForm } from 'react-hook-form'
import style from './EditSendPublisherModal.module.scss'
import 'react-datepicker/dist/react-datepicker.css'
import backendURL from '@/utils/url.js'
import { fetchPublisher } from '@/redux/publisher/publisherSlice.js'
import { fetchOnceListSentToPublisher } from '@/redux/order/SentToPublisher.js'
import { TableCell, TableRow } from '@/components/ui/table.jsx'
import { ThemeContext } from '@/utils/ThemeContext.jsx'
import Cookies from 'js-cookie'
import {ClipboardCheck, Monitor, MonitorPlay, MonitorUp, X} from 'lucide-react'
import FormatterView from '@/components/Labrery/formatter/FormatterView.jsx'

import { Input } from '@/components/ui/input.jsx'
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
import { Button } from '../../../../../../ui/button.jsx'
import axiosInstance from "@/api/api.js";

const format = [
  { value: 'preroll', text: 'Pre-roll', icon: Monitor },
  { value: 'tv_preroll', text: 'TV Pre-roll', icon: MonitorPlay },
  { value: 'top_preroll', text: 'Top Pre-roll', icon: MonitorUp  },
]

const EditSendPublisherModal = ({
  onCancel,
  expandedRows,
  item,
  setCurrentOrder,
}) => {
  const dispatch = useDispatch()
  const [channelModal, setChannelModal] = React.useState([])
  const { publisher } = useSelector((state) => state.publisher)
  console.log (channelModal)
  const [publisherID, setPublisherID] = React.useState('')
  const [channelID, setChannelID] = React.useState('')
  const selectedPublisher = (value) => {
    setPublisherID(value)
  }
  const selectedChannelID = (event) => {
    setChannelID(event.target.value)
  }
  const fetchChannel = async () => {
    if (!publisherID) return // Skip fetch if publisherID is not set
    const response = await axiosInstance.get(
      `${backendURL}/publisher/channel/?publisher_id=${publisherID}`,
    )
    setChannelModal(response.data.data)
  }
  React.useEffect(() => {
    dispatch(fetchPublisher({
      page: 1, // API использует нумерацию с 1
      pageSize: 200,
    }))
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
      format: item.format,
      startdate: item.start_date ? item.start_date.substring(0, 10) : '',
      enddate: item.enddate,
      ordered_number_of_views: '',
      budgett: item.budgett,
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
    if (data.age_range && data.age_range !== null) {
      requestData.age_range = data.age_range
    }
    if (data.content_language && data.content_language !== null) {
      requestData.content_language = data.content_language
    }
    if (data.country && data.country !== null) {
      requestData.country = data.country
    }
    if (data.notes_text && data.notes_text !== null) {
      requestData.notes_text = data.notes_text
    }
    if (data.notes_url && data.notes_url !== null) {
      requestData.notes_url = data.notes_url
    }
    try {
      const response = await axiosInstance.patch(
        `${backendURL}/order/assignments/${item.id}/`, requestData,
      )

      // Debug log to inspect response

      if (response.data) {
        toast.success('Данные успешно обновлены!')
        onCancel()
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
      `${backendURL}/order/cpm/?advertiser`,
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
      setChannelID(item.channel?.id || '')
      setValue('channel', item.channel?.id || '')
      setValue('format', item.format)
      setValue(
        'startdate',
        item.start_date ? item.start_date.substring(0, 10) : '',
      )
      setValue('enddate', item.end_date ? item.end_date.substring(0, 10) : '')
      setValue('ordered_number_of_views', item.ordered_number_of_views)
      setValue('budgett', item.budget)
      setValue('age_range', item.age_range)
      setValue('content_language', item.content_language)
      setValue('country', item.country)
      setValue('notes_text', item.notes_text)
      setValue('notes_url', item.notes_url)
      trigger() // Manually trigger validation
    }
  }, [item, setValue, trigger])

  React.useEffect(() => {
    console.log('isValid:', isValid)
    console.log('errors:', errors)
  }, [isValid, errors])

  React.useEffect(() => {}, [setPublisherID, setChannelID])
  const { textColor } = React.useContext(ThemeContext)

  return (
    <>
      <td style={{ padding: '2px', paddingTop: '5px' }}>
        {/* <select
          id="countries"
          className={style.select__select}
          value={publisherID}
          onChange={selectedPublisher}
        >
          <option value="">Выбрать Паблишера</option>
          {publisher?.map((option, FilterMain.jsx) => (
            <option key={FilterMain.jsx} value={option.id}>
              {option.name}
            </option>
          ))}
        </select> */}
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
      </td>
      <td style={{ padding: '2px', paddingTop: '5px' }}>
        {/* <select
          id="countries"
          value={channelID}
          onChange={selectedChannelID}
          className={style.select__select}
          {...register('channel', {
            required: 'Поле обязательно для заполнения',
          })}
          style={{ border: errors?.channel ? '1px solid red' : '' }}
        >
          <option value="">Выбрать канал</option>
          {Array.isArray(channelModal) ? (
            channelModal.map((option, FilterMain.jsx) => (
              <option key={FilterMain.jsx} value={option.id}>
                {option.name}
              </option>
            ))
          ) : (
            <option value={channelModal.id}>{channelModal.name}</option>
          )}
        </select> */}
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
                  <SelectLabel>Выбрать канал</SelectLabel>
                  {/* Assuming you have a channelModal array */}
                  {channelModal?.results?.map((option) => (
                    <SelectItem key={option.id} value={option.id.toString()}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
      </td>
      {/*<td style={{ padding: '2px', paddingTop: '5px' }}>*/}
      {/*  /!* <select*/}
      {/*    id="countries"*/}
      {/*    className={style.select__select}*/}
      {/*    {...register('format', {*/}
      {/*      required: 'Поле обязательно',*/}
      {/*    })}*/}
      {/*    style={{ border: errors?.format ? '1px solid red' : '' }}*/}
      {/*  >*/}
      {/*    <option value="">Выбрать Формат</option>*/}

      {/*    {format.map((option, FilterMain.jsx) => (*/}
      {/*      <option key={FilterMain.jsx} value={option.value}>*/}
      {/*        {option.text}*/}
      {/*      </option>*/}
      {/*    ))}*/}
      {/*  </select> *!/*/}
      {/*  <Controller*/}
      {/*    name="format"*/}
      {/*    control={control}*/}
      {/*    rules={{ required: 'Поле обязательно' }}*/}
      {/*    render={({ field }) => (*/}
      {/*      <Select*/}
      {/*        onValueChange={field.onChange}*/}
      {/*        defaultValue={field.value}*/}
      {/*        value={field.value}*/}
      {/*        disabled={item.format === 'preroll'}*/}
      {/*      >*/}
      {/*        <SelectTrigger className="!text-white">*/}
      {/*          <SelectValue placeholder="Выбрать формат" />*/}
      {/*        </SelectTrigger>*/}
      {/*        <SelectContent>*/}
      {/*          <SelectGroup>*/}
      {/*            <SelectLabel>Выбрать формат</SelectLabel>*/}
      {/*            {format.map((option) => (*/}
      {/*              <SelectItem key={option.value} value={option.value}>*/}
      {/*                {option.text}*/}
      {/*              </SelectItem>*/}
      {/*            ))}*/}
      {/*          </SelectGroup>*/}
      {/*        </SelectContent>*/}
      {/*      </Select>*/}
      {/*    )}*/}
      {/*  />*/}
      {/*</td>*/}
      <td style={{ padding: '2px', paddingTop: '5px' }}>
        <div style={{ display: 'grid' }}>
          <Controller
            name="startdate"
            control={control}
            defaultValue={
              item.start_date ? item.start_date.substring(0, 10) : ''
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
          <span className={style.modalWindow__input_error}>
            {errors?.startdate && <p>{errors?.startdate?.message}</p>}
          </span>
        </div>
      </td>

      <td style={{ padding: '2px', paddingTop: '5px' }}>
        <div style={{ display: 'grid' }}>
          <Controller
            name="enddate"
            control={control}
            defaultValue={item.enddate ? item.enddate.substring(0, 10) : ''}
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
          <span className={style.modalWindow__input_error}>
            {errors?.startdate && <p>{errors?.startdate?.message}</p>}
          </span>
        </div>
      </td>

      <td style={{ padding: '2px', paddingTop: '5px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ display: 'grid' }}>
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
        </div>
      </td>
      <td style={{ padding: '2px', paddingTop: '5px' }}>
        <FormatterView data={item.expected_number_of_views} />
      </td>
      <td style={{ padding: '2px', paddingTop: '5px' }}>
        <Input
          className={style.input}
          type="text"
          value={budgett.toLocaleString('en-US')}
          placeholder="Бюджет"
          autoComplete="off"
          disabled={true}
        />
      </td>
      <td style={{ padding: '2px', paddingTop: '5px' }}>
        <Input
          className={style.input}
          type="text"
          placeholder="age_range"
          style={{ border: errors?.age_range ? '1px solid red' : '' }}
          {...register('age_range', {
            required: 'Поле обязательно к заполнению',
          })}
        />
      </td>
      <td style={{ padding: '2px', paddingTop: '5px' }}>
        <Input
          className={style.input}
          type="text"
          placeholder="content_language"
          style={{ border: errors?.content_language ? '1px solid red' : '' }}
          {...register('content_language', {
            required: 'Поле обязательно к заполнению',
          })}
        />
      </td>
      <td style={{ padding: '2px', paddingTop: '5px' }}>
        <div style={{ display: 'flex' }}>
          <Input
            className={style.input}
            type="text"
            placeholder="notes_text"
            style={{ border: errors?.notes_text ? '1px solid red' : '' }}
            {...register('notes_text', {
              required: 'Поле обязательно к заполнению',
            })}
          />
          <Input
            className={style.input}
            type="text"
            style={{ border: errors?.notes_url ? '1px solid red' : '' }}
            placeholder="notes_url"
            {...register('notes_url', {
              required: 'Поле обязательно к заполнению',
            })}
          />
        </div>
      </td>
      <td style={{ padding: '2px', paddingTop: '5px' }}>
        <Input
          className={style.input}
          type="text"
          placeholder="country"
          style={{ border: errors?.country ? '1px solid red' : '' }}
          {...register('country', {
            required: 'Поле обязательно к заполнению',
          })}
        />
      </td>

      <td style={{padding: '2px', paddingTop: '5px'}}>

        <Button
          variant="link"
          disabled={!isValid}
          onClick={handleSubmit (onSubmit)}
          className="relative hover:scale-125 transition-all p-0"
        >
          <ClipboardCheck className="hover:text-green-500 text-white"/>
        </Button>
        <Button
          variant="link"
          onClick={() => setCurrentOrder (null)}
          className="relative hover:scale-125 transition-all p-0"
        >
          <X className="hover:text-red-500 text-red-400"/>
        </Button>
      </td>
    </>
  )
}
export default EditSendPublisherModal
