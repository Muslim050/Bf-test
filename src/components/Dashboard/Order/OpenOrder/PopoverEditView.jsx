import { Controller, useForm } from 'react-hook-form'
import React from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import backendURL from '@/utils/url.js'
import { fetchOnceListSentToPublisher } from '@/redux/order/SentToPublisher.js'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Button } from '@/components/ui/button.jsx'
import Cookies from 'js-cookie'
import axiosInstance from "@/api/api.js";

const PopoverEditView = ({
  setOpenPopoverIndex,
  item,
  expandedRows,
  onceOrder,
}) => {
  const [cpm, setCpm] = React.useState([])
  const dispatch = useDispatch()
  const [budgett, setBudgett] = React.useState(0)
  console.log (item)
  const fetchCpm = async () => {

    const response = await axiosInstance.get(
      `${backendURL}/order/cpm/?advertiser=${onceOrder.advertiser.id}`
    )
    setCpm(response.data.data)
  }
  const {
    formState: { errors, isValid },
    handleSubmit,
    setValue,
    watch,
    control,
  } = useForm({
    defaultValues: {
      order: expandedRows,
      channel: item.original.channel?.id,
      format: item.original.format,
      startdate: item.original.start_date ? item.original.start_date.substring(0, 10) : '',
      enddate: item.original.end_date ? item.original.end_date.substring(0, 10) : '',
      ordered_number_of_views: '',
      budget: budgett,
      age_range: item.original.age_range,
      content_language: item.original.content_language,
      country: item.original.country,
      notes_text: item.original.notes_text,
      notes_url: item.original.notes_url,
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
      const response = await axios.patch(
        `${backendURL}/order/assignments/${item.original.id}/`,
        requestData,
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
        toast.success('Данные успешно обновлены!')
        setOpenPopoverIndex(null)
        await dispatch(fetchOnceListSentToPublisher({ expandedRows }))
      } else {
      }
    } catch (error) {
      toast.error(error?.data?.error?.message)
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
  return (
    <div>
      <div className="text-lg	text-white border-b border-[#ffffff63]">
        Редактировать показы
      </div>

      <div className="grid w-full relative mt-2">
        <Label className="text-sm	text-white pb-1">Количество показов</Label>
        <Controller
          name="ordered_number_of_views"
          control={control}
          rules={{
            required: 'Поле обязательно к заполнению',
          }}
          defaultValue=""
          render={({ field: { onChange, onBlur, value, name, ref } }) => (
            <Input
              type="text"
              value={value.toLocaleString('en-US')}
              className={`border ${
                errors?.ordered_number_of_views
                  ? 'border-red-500'
                  : 'border-gray-300'
              } transition-all duration-300 text-sm `}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\D/g, '')
                const newValue = rawValue ? parseInt(rawValue, 10) : ''
                onChange(newValue)
              }}
              onBlur={onBlur}
              name={name}
              ref={ref}
              placeholder="Количество показов"
              autoComplete="off"
              step="1000"
              disabled={!selectedFormat}
            />
          )}
        />
      </div>

      <div className="grid w-full relative mt-3">
        <Label className="text-sm	text-white pb-1">Бюджет</Label>
        <Input
          // className={style.input}
          type="text"
          value={budgett.toLocaleString('en-US')}
          placeholder="Бюджет"
          autoComplete="off"
          disabled={true}
        />
      </div>

      <Button
        onClick={handleSubmit(onSubmit)}
        className={`${
          isValid
            ? 'bg-[#2A85FF66] hover:bg-[#0265EA] border-2 border-[#0265EA] hover:border-[#0265EA]'
            : 'bg-[#616161]'
        } w-full   h-[44px] text-white rounded-2xl	mt-6`}
        disabled={!isValid}
        isValid={true}
      >
        Обновить
      </Button>
    </div>
  )
}

export default PopoverEditView
