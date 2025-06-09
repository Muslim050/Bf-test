import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { LoaderCircle, Monitor, MonitorPlay, MonitorUp } from 'lucide-react'

import { addOrder } from '../../../../../../redux/order/orderSlice'
import 'react-datepicker/dist/react-datepicker.css'
import backendURL from '@/utils/url'
import { hideModalOrder } from '@/redux/modalSlice'
import { SelectTrigger } from '@/components/ui/selectTrigger.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.jsx'
import { Label } from '@/components/ui/label.jsx'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
} from '@/components/ui/select.jsx'
import { Input } from '@/components/ui/input.jsx'
import { hasRole } from '../../../../../../utils/roleUtils'
import { Button } from '../../../../../ui/button'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'
import axiosInstance from '@/api/api.js'
import { Checkbox } from '@/components/ui/checkbox.jsx'

const formatV = [
  { value: 'preroll', text: 'Pre-roll', icon: Monitor },
  { value: 'tv_preroll', text: 'TV Pre-roll', icon: MonitorPlay },
  { value: 'top_preroll', text: 'Top Pre-roll', icon: MonitorUp },
]
export default function CreateOrder({ onClose }) {
  const dispatch = useDispatch()
  const [selectedFile, setSelectedFile] = React.useState(null)

  const [isOrderCreated, setIsOrderCreated] = React.useState(false)
  const [advertiser, setAdvertiser] = React.useState([])
  const [cpm, setCpm] = React.useState([])
  const [budgett, setBudgett] = React.useState(0)
  const advID = Cookies.get('advertiser')
  const today = new Date()
  let advId
  advertiser?.forEach((item) => {
    advId = item.id // Присваиваем значение свойства name текущего элемента массива
  })
  const [selectedFormat, setSelectedFormat] = React.useState('')
  const handleFormatChange = (value) => {
    setSelectedFormat(value)
    setValue('format', value)
  }
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    control,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      advertiserID: '',
      name: '',
      format: selectedFormat,
      expectedView: '',
      budgett: 0,
      selectedFile: null,
      notes: '',
      target_country: '',
    },

    mode: 'onChange',
  })
  const expectedView = watch('expectedView')
  const agencyAdvId = watch('advertiserID')
  const targetCountry = watch('target_country')

  const calculateBudget = () => {
    let newBudget = 0
    if (targetCountry) {
      const uzFormat = `${selectedFormat}_uz`
      if (cpm[uzFormat]) {
        newBudget = (expectedView / 1000) * cpm[uzFormat]
      }
    } else if (cpm[selectedFormat]) {
      newBudget = (expectedView / 1000) * cpm[selectedFormat]
    }
    const roundedTwo = +newBudget.toFixed(2)
    setBudgett(roundedTwo)
  }

  React.useEffect(() => {
    setValue('budgett', budgett)
  }, [budgett, setValue])
  React.useEffect(() => {
    calculateBudget()
  }, [selectedFormat, expectedView, targetCountry])

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const fetchCpm = async () => {
    const response = await axiosInstance.get(
      `${backendURL}/order/cpm/?advertiser=${agencyAdvId || advID}`,
    )
    setCpm(response.data.data)
  }

  const fetchAdvertiser = async () => {
    const response = await axiosInstance.get(`${backendURL}/advertiser/`)
    setAdvertiser(response.data.data.results)
  }
  React.useEffect(() => {
    fetchAdvertiser()
  }, [])

  React.useEffect(() => {
    if (agencyAdvId) {
      fetchCpm()
    }
  }, [agencyAdvId])

  // Effect hook for advID changes
  React.useEffect(() => {
    if (advID) {
      fetchCpm()
    }
  }, [advID])
  const onSubmit = async (data) => {
    try {
      setIsOrderCreated(true)
      const response = await dispatch(addOrder({ data }))
      if (response && !response.error) {
        toast.success('Заказ успешно оформлен!')
        onClose()
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      } else if (response.error.message) {
        toast.error(response?.payload?.data?.error?.detail)
        onClose()
      }
    } catch (error) {
      setIsOrderCreated(false)
      toast.error(error?.data?.error?.message)
    }
  }

  const [notes, setNotes] = React.useState('') // Состояние для хранения текста заметок
  const maxChars = 100 // Максимальное количество символов

  const handleNotesChange = (event) => {
    setNotes(event.target.value.substring(0, maxChars)) // Обновляем текст, обрезая его до максимальной длины
  }

  const handleButtonClick = () => {
    dispatch(hideModalOrder())
  }
  const taretCheckbox = (event) => {
    const isChecked = event.target.checked
    setValue('target_country', isChecked ? 'uz' : '')
  }

  return (
    <>
      <DialogContent
        className=" p-4"
        onInteractOutside={(e) => {
          e.preventDefault()
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-lg	font-medium	text-white border-b border-[#F9F9F926] pb-4">
            Создать заказ
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modalWindow">
            {hasRole('advertising_agency') ? (
              <div className="flex gap-5 mb-2">
                <div className="grid w-full">
                  <Label className="text-sm	text-white pb-0.5">
                    Выбрать рекламодателя{' '}
                    <span className="text-red-500 ml-0.5">*</span>
                  </Label>
                  <Controller
                    name="selectedAdvertiserId"
                    {...register('advertiserID', {
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
                          <SelectValue placeholder="Выбрать рекламодателя" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Выбрать рекламодателя</SelectLabel>
                            {advertiser.map((adv) => (
                              <SelectItem
                                key={adv.id}
                                value={adv.id.toString()}
                              >
                                {adv.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>
            ) : (
              ''
            )}
            <div className="flex gap-2 mb-2">
              <div className="grid w-full">
                <Label className="text-sm	text-white pb-0.5">
                  Название рекламной кампании
                  <span className="text-red-500 ml-0.5">*</span>
                </Label>
                <Input
                  placeholder=" Название рекламной кампании"
                  className={`border ${
                    errors?.name ? 'border-red-500' : 'border-gray-300'
                  }   transition-all duration-300 text-sm `}
                  type="text"
                  {...register('name', {
                    required: 'Поле обязательно к заполнению',
                  })}
                />
              </div>
            </div>

            {/*  */}
            <div className="flex gap-4 mb-2">
              <div className="grid w-full">
                <Label className="text-sm	text-white pb-0.5">
                  Начало размещения
                  <span className="text-red-500 ml-0.5">*</span>
                </Label>
                <Input
                  className={`border ${
                    errors?.startdate ? 'border-red-500' : 'border-gray-300'
                  }   transition-all duration-300 text-sm `}
                  type="date"
                  // min={getCurrentDate()}
                  {...register('startdate', {
                    required: 'Поле обязательно к заполнению',
                  })}
                />
              </div>

              <div className="grid w-full">
                <Label className="text-sm	text-white pb-0.5">
                  Конец размещения
                  <span className="text-red-500 ml-0.5">*</span>
                </Label>
                <Input
                  className={`border ${
                    errors?.enddate ? 'border-red-500' : 'border-gray-300'
                  }   transition-all duration-300 text-sm `}
                  type="date"
                  // min={getEndDate(watch("startdate"))} // Use watch to get the value of the "startdate" field
                  {...register('enddate', {
                    required: 'Поле обязательно к заполнению',
                  })}
                />
              </div>
            </div>
            {/*  */}

            {/*  */}
            <div className="flex gap-4 mb-2">
              <div className="grid w-full">
                <Label className="text-sm	text-white pb-0.5">
                  Формат
                  <span className="text-red-500 ml-0.5">*</span>
                </Label>
                <Select
                  value={selectedFormat}
                  onValueChange={handleFormatChange}
                >
                  <SelectTrigger className="!text-white">
                    <SelectValue placeholder="Выбрать формат" />
                  </SelectTrigger>

                  <SelectContent className="w-full">
                    <SelectGroup>
                      {formatV.map((option, index) => (
                        <SelectItem
                          key={index}
                          value={option.value}
                          className="hover:bg-white hover:text-black cursor-pointer"
                        >
                          <div className="flex items-center gap-1">
                            {option.icon && <option.icon />}
                            {option.text}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid w-full">
                <div className="border-dashed border-2 border-[#5570f1] rounded-2xl p-2 flex flex-col justify-between">
                  <Label className="text-sm	text-white pb-0.5">
                    Target для РУЗ
                  </Label>
                  <label className={` text-sky-400`} onClick={taretCheckbox}>
                    Target UZ
                    <Checkbox
                      id="terms"
                      className="size-6 rounded-lg data-[state=checked]:bg-[#5570f1] data-[state=checked]:border-[#5570f1] border-[#5570f1]"
                    />
                    <span></span>
                  </label>
                </div>
              </div>
            </div>
            {/*  */}

            {/*  */}
            <div className="flex gap-4 mb-2">
              <div className="grid w-full">
                <Label className="text-sm	text-white pb-0.5">
                  Количество показов
                  <span className="text-red-500 ml-0.5">*</span>
                  <div className="text-[10px]	text-red-500 ">
                    {' '}
                    {errors?.expectedView && (
                      <p>{errors.expectedView.message}</p>
                    )}
                  </div>
                </Label>
                <Controller
                  name="expectedView"
                  control={control}
                  rules={{
                    required: 'Поле обязательно к заполнению',
                    min: {
                      value: 1000000,
                      message: 'Минимальное значение - 1 000 000',
                    },
                  }}
                  defaultValue=""
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                  }) => (
                    <Input
                      className={`border ${
                        errors?.expectedView
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
                      placeholder="Количество показов"
                      autoComplete="off"
                      step="1000"
                      disabled={!selectedFormat}
                    />
                  )}
                />
              </div>
              <div className="grid w-full">
                <Label className="text-sm	text-white pb-0.5">
                  Бюджет (сум)
                  <span className="text-red-500 ml-0.5">*</span>
                </Label>
                <Input
                  className={`border ${
                    errors?.startdate ? 'border-red-500' : 'border-gray-300'
                  }   transition-all duration-300 text-sm `}
                  type="text"
                  value={budgett.toLocaleString('en-US')}
                  placeholder="Бюджет"
                  autoComplete="off"
                  disabled={true}
                />
              </div>
            </div>
            {/*  */}

            <div className="grid w-full mb-2">
              <Label className="text-sm	text-white pb-0.5">
                Файл
                <span className="text-red-500 ml-0.5">*</span>
              </Label>
              <div className="border-dashed border-2 border-[#A7CCFF] rounded-2xl p-2 flex flex-col justify-between h-[76px]">
                <Input
                  type="file"
                  onChange={handleFileChange}
                  className={`border-none p-0 flex items-center   transition-all duration-300 text-sm h-full`}
                  {...register('selectedFile', {
                    required: 'Ролик обезателен',
                  })}
                />
              </div>
            </div>
            <div className="grid w-full">
              <Label className="text-sm	text-white pb-0.5">
                Комментарий к заказу
              </Label>
              <Textarea
                placeholder="Добавить текст и ссылки"
                className="resize-none text-white placeholder:text-white"
                // {...field}
                {...register('notes')}
                onChange={handleNotesChange} // Обработка изменений
              />
            </div>

            <div
              style={{
                fontSize: '12px',
                marginTop: '3px',
                color: notes.length === maxChars ? 'red' : 'black',
              }}
            >
              {notes.length}/{maxChars} символов
            </div>

            <div>
              <Button
                className={`${
                  isValid && !isOrderCreated
                    ? 'bg-[#2A85FF66] hover:bg-[#0265EA] border-2 border-[#0265EA] hover:border-[#0265EA]'
                    : 'bg-[#616161]'
                } w-full   h-[44px] text-white rounded-2xl	mt-4`}
                disabled={!isValid || isOrderCreated}
                isValid={true}
                type="submit"
              >
                {isOrderCreated ? (
                  <>
                    <span>Создать</span>

                    <div className="flex items-center justify-center h-[250px]">
                      <LoaderCircle className="animate-spin text-brandPrimary-1 h-12 w-12 -scale-x-100" />
                    </div>
                  </>
                ) : (
                  <span>Создать</span>
                )}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </>
  )
}
