import React, { useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {
  FileVideo,
  ImageDown,
  Monitor,
  MonitorPlay,
  MonitorUp,
  PackagePlus,
  Trash2,
} from 'lucide-react'

import {
  deleteOrder,
  fetchEditOrder,
  fetchOrder,
  fetchSingleOrder,
} from '../../../../../../redux/order/orderSlice'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.jsx'
import { toastConfig } from '../../../../../../utils/toastConfig'
import 'react-datepicker/dist/react-datepicker.css'
import style from './EditOrder.module.scss'
import backendURL from '@/utils/url'
import axios from 'axios'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'

import { Input } from '@/components/ui/input.jsx'
import { SelectTrigger } from '@/components/ui/selectTrigger.jsx'
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from '@/components/ui/select.jsx'
import { Button } from '../../../../../ui/button'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'
import { Badge } from '@/components/ui/badge.jsx'
import { truncate } from '@/utils/other.js'
import { Link } from 'react-router-dom'
import TooltipWrapper from '@/shared/TooltipWrapper.jsx'

const formatV = [
  { value: 'preroll', text: 'Pre-roll', icon: Monitor },
  { value: 'tv_preroll', text: 'TV Pre-roll', icon: MonitorPlay },
  { value: 'top_preroll', text: 'Top Pre-roll', icon: MonitorUp },
]

export default function EditOrder({
  setShowModalEditAdmin,
  currentOrder,
  onClose,
}) {
  const dispatch = useDispatch()
  const [selectedFile, setSelectedFile] = React.useState(null)
  const [cpm, setCpm] = React.useState([])
  const [budgett, setBudgett] = React.useState(0)
  const role = Cookies.get('role')
  const { order } = useSelector((state) => state.order)
  const [isOrderCreated, setIsOrderCreated] = React.useState(false)

  const [selectedFormat, setSelectedFormat] = React.useState(
    currentOrder.format,
  )

  const handleFormatChange = (value) => {
    setSelectedFormat(value)
    setValue('format', value)
  }
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
    control,
    setValue,
    onBlur,
  } = useForm({
    defaultValues: {
      name: currentOrder.name,
      format: currentOrder.format,
      selectedFile: null,
      expectedView: currentOrder.expected_number_of_views,
      budgett: 0,
      notes: currentOrder.notes,
      target_country: currentOrder.target_country || '',
    },
    mode: 'onChange',
  })

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0])
  }
  const advID = Cookies.get('advertiser')
  const targetCountry = watch('target_country')

  const editName = watch('name')
  // const viewValue = watch("view");
  const expectedView = watch('expectedView')

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

    setBudgett(newBudget)
  }

  let advId
  order.results.forEach((item) => {
    advId = item.advertiser.id
  })

  const fetchCpm = async () => {
    const token = Cookies.get('token')

    const response = await axios.get(
      `${backendURL}/order/cpm/?advertiser=${
        advID === null ? advID : currentOrder.advertiser.id
      }`,

      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    setCpm(response.data.data)
  }
  React.useEffect(() => {
    calculateBudget()
  }, [selectedFormat, cpm, expectedView, targetCountry])

  React.useEffect(() => {
    if (advID) {
      fetchCpm()
    }
  }, [advID])

  React.useEffect(() => {
    setValue('budgett', budgett)
  }, [budgett, setValue])
  const onSubmit = async (data) => {
    try {
      setIsOrderCreated(true)
      const response = await dispatch(
        fetchEditOrder({ id: currentOrder.id, data }),
      )

      if (response && !response.error) {
        toast.success('Изминения успешно обновлены!')
        onClose()
        dispatch(fetchSingleOrder(currentOrder.id))
      } else if (response.error.message) {
        toast.error('Что-то пошло не так!' + response.error.message)
        onClose()
      }
    } catch (error) {
      setIsOrderCreated(false)
      if (error.message) {
        toast.error(`Ошибка : ${error.message}`, toastConfig)
      } else {
        toast.error('Что-то пошло не так: ' + error.message, toastConfig)
      }
    }
  }
  const inputRef = useRef(null) // Создаем ссылку на Input

  const handleRemoveInventory = () => {
    dispatch(deleteOrder({ id: currentOrder.id }))
      .unwrap()
      .then((result) => {
        toast.success('Заказ успешно удален')
        onClose()
        setTimeout(() => {
          window.location.reload()
        }, 1500)
        dispatch(fetchOrder())
      })
      .catch((error) => {
        toast.error(`Ошибка завершения заказа: ${error.data.error.detail}`)
        dispatch(fetchOrder())
      })
  }
  const taretCheckbox = (event) => {
    const isChecked = event.target.checked
    setValue('target_country', isChecked ? 'uz' : '')
    calculateBudget()
  }
  return (
    <>
      <DialogContent
        className="p-4"
        onInteractOutside={(e) => {
          e.preventDefault()
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-lg	font-medium	text-[var(--text)] border-b border-[#F9F9F926] pb-4">
            Редактировать заказ
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div className="flex gap-2">
            <div className="grid w-full">
              <Label className="text-sm	text-[var(--text)] pb-2">
                Название рекламной кампании
                <span className="text-red-500 ml-0.5">*</span>
              </Label>
              <Input
                type="text"
                autoComplete="off"
                {...register('name', {
                  required: 'Поле обезательно к заполнению',
                })}
                disabled={!role === 'admin'}
                placeholder={'Введите имя'}
                className={`border ${
                  errors?.name ? 'border-red-500' : 'border-gray-300'
                }transition-all duration-300 text-sm `}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="grid w-auto">
              <Label className="text-sm	text-[var(--text)] pb-2">
                Начало
                <span className="text-red-500 ml-0.5">*</span>
              </Label>
              <Controller
                name="startdate"
                control={control}
                defaultValue={
                  currentOrder.expected_start_date
                    ? currentOrder.expected_start_date.substring(0, 10)
                    : ''
                }
                render={({ field: { onChange, value } }) => (
                  <Input
                    className={`border ${
                      errors?.startdate ? 'border-red-500' : 'border-gray-300'
                    }   transition-all duration-300 text-sm `}
                    disabled={role !== 'admin'}
                    type="date"
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
            </div>

            <div className="grid w-full">
              <Label className="text-sm	text-[var(--text)] pb-2">
                Конец
                <span className="text-red-500 ml-0.5">*</span>
              </Label>
              <Controller
                name="enddate"
                control={control}
                defaultValue={
                  currentOrder.expected_end_date
                    ? currentOrder.expected_end_date.substring(0, 10)
                    : ''
                }
                render={({ field: { onChange, value } }) => (
                  <Input
                    className={`border ${
                      errors?.enddate ? 'border-red-500' : 'border-gray-300'
                    }   transition-all duration-300 text-sm `}
                    disabled={role !== 'admin'}
                    type="date"
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
            </div>

            <div className="grid w-full">
              <Label className="text-sm	text-[var(--text)] pb-2">
                Формат
                <span className="text-red-500 ml-0.5">*</span>
              </Label>
              <Select
                value={selectedFormat}
                onValueChange={handleFormatChange}
                disabled={role !== 'admin'}
              >
                <SelectTrigger className="!text-[var(--text)]">
                  <SelectValue placeholder="Выбрать формат" />
                </SelectTrigger>

                <SelectContent className="w-full">
                  <SelectGroup>
                    {formatV.map((option, index) => (
                      <SelectItem key={index} value={option.value}>
                        <div className="!flex items-center gap-1">
                          {
                            option.icon && <option.icon />
                            // <img src={option.icon} alt="" className='size-4'/>
                          }
                          {option.text}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/*  */}
          <div className="flex gap-2">
            <div className="grid w-[180px]">
              <div className="border-dashed border-2 border-sky-500 rounded-lg p-2 flex flex-col justify-between">
                <Label className="text-sm	text-[var(--text)] pb-0.5">
                  Target для РУЗ
                </Label>
                <label
                  className={`${style.checkboxI} text-sky-400 `}
                  onClick={taretCheckbox}
                >
                  Target UZ
                  <input
                    type="checkbox"
                    disabled={role !== 'admin'}
                    onChange={taretCheckbox}
                    defaultChecked={currentOrder.target_country === 'uz'}
                  />
                </label>
              </div>
            </div>
            <div className="grid w-full">
              <Label className="text-sm	text-[var(--text)] pb-2">
                Количество показов
                <span className="text-red-500 ml-0.5">*</span>
                {budgett > 0 ? (
                  <Badge variant="default" className="text-sm	ml-1">
                    {budgett.toLocaleString('en-US')}
                  </Badge>
                ) : null}
              </Label>
              <Controller
                name="expectedView"
                control={control}
                rules={{
                  required: 'Поле обязательно к заполнению',
                }}
                defaultValue=""
                render={({ field: { onChange, value, name, ref } }) => (
                  <Input
                    className={`border ${
                      errors?.enddate ? 'border-red-500' : 'border-gray-300'
                    }   transition-all duration-300 text-sm `}
                    type="text"
                    value={
                      typeof value === 'number'
                        ? value.toLocaleString('en-US')
                        : value
                    }
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/\D/g, '')
                      const newValue = rawValue ? parseInt(rawValue, 10) : ''
                      onChange(newValue)
                    }}
                    onBlur={onBlur} // Используем стандартный onBlur без повторного вызова onChange
                    name={name}
                    ref={ref}
                    placeholder="Количество показов"
                    autoComplete="off"
                    step="1000"
                    // disabled={!selectedFormat}
                    disabled={role !== 'admin' || !selectedFormat}
                  />
                )}
              />
            </div>
          </div>
          {/*  */}
          <div className="flex justify-between gap-3">
            <div className={`flex justify-between items-end w-full gap-2 `}>
              <div className="border-dashed w-full border-2 border-[#A7CCFF] rounded-xl p-2 flex flex-col justify-center items-center h-[76px] relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={inputRef}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="default"
                  onClick={() => inputRef.current.click()}
                  className="flex gap-2"
                >
                  <ImageDown />
                  {selectedFile ? (
                    <p className="text-sm text-white">
                      Вы выбрали файл:{truncate(selectedFile.name, 20)}{' '}
                    </p>
                  ) : (
                    ' Загрузить файл'
                  )}
                </Button>
              </div>

              <TooltipWrapper tooltipContent="Текущий ролик">
                <Link
                  to={currentOrder.promo_file}
                  target="_blank"
                  className="h-full w-[85px] bg-[#2A85FF] size-10 rounded-xl text-[var(--text)] hover:bg-[#2A85FF99] flex justify-center items-center "
                >
                  <FileVideo />
                </Link>
              </TooltipWrapper>
            </div>
          </div>

          <Textarea
            placeholder="Комментарий к заказу"
            className="resize-none text-[var(--text)]"
            // {...field}
            {...register('notes')}
          />
          <div className="flex gap-2 justify-end">
            {role === 'admin' ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="flex gap-1 ">
                    <Trash2 />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-red-500">
                      Вы уверены, что хотите удалить заказ?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-[var(--text)]">
                      Это действие не может быть отменено.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="text-[var(--text)]">
                      Отмена
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-300 hover:bg-red-500 border-2 border-red-500 "
                      onClick={() => handleRemoveInventory()}
                    >
                      Удалить
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : null}

            <Button
              disabled={!isValid || isOrderCreated}
              isValid={true}
              type="submit"
            >
              {isOrderCreated ? (
                <>
                  <span>Сохранить</span>
                  <div className={style.loaderWrapper}>
                    <div className={style.spinner}></div>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-1">
                  <PackagePlus />
                </div>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </>
  )
}
