import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Film } from 'lucide-react'

import {
  deleteOrder,
  fetchEditOrder,
  fetchOrder,
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
import { Monitor, MonitorPlay, MonitorUp } from 'lucide-react';


const formatV = [
  { value: 'preroll', text: 'Pre-roll', icon: Monitor },
  { value: 'tv_preroll', text: 'TV Pre-roll', icon: MonitorPlay },
  { value: 'top_preroll', text: 'Top Pre-roll', icon: MonitorUp  },
]
import Cookies from 'js-cookie'

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
        setTimeout(() => {
          window.location.reload()
        }, 1500)
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

  const handleRemoveInventory = () => {
    // const confirmDelete = window.confirm('Вы уверены, что хотите удалить?')
    // if (confirmDelete) {
    //   dispatch(deleteOrder({ id: currentOrder.id }))
    //     .then(() => {
    //       toast.success('Инвентарь успешно удален', toastConfig)
    //       setShowModalEditAdmin(false)
    //       dispatch(fetchOrder())
    //     })
    //     .catch((error) => {
    //       toast.error(error.message, toastConfig)
    //       dispatch(fetchOrder())
    //     })
    // } else {
    //   toast.info('Операция отменена', toastConfig)
    // }
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
          <DialogTitle className="text-lg	font-medium	text-white border-b border-[#F9F9F926] pb-4">
            Редактировать заказ
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-4 mb-4">
            <div className="grid w-full">
              <Label className="text-sm	text-white pb-2">
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
          <div className="flex gap-4 mb-4">
            <div className="grid w-full">
              <Label className="text-sm	text-white pb-2">
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
                    style={{
                      width: '210px',
                    }}
                  />
                )}
              />
            </div>

            <div className="grid w-full">
              <Label className="text-sm	text-white pb-2">
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
                    style={{
                      width: '210px',
                    }}
                  />
                )}
              />
            </div>
          </div>
          {/*  */}
          <div className="flex gap-4 mb-4">
            <div className="grid w-full">
              <Label className="text-sm	text-white pb-2">
                Формат
                <span className="text-red-500 ml-0.5">*</span>
              </Label>
              <Select
                value={selectedFormat}
                onValueChange={handleFormatChange}
                disabled={role !== 'admin'}
              >
                <SelectTrigger className="!text-white">
                  <SelectValue placeholder="Выбрать формат" />
                </SelectTrigger>

                <SelectContent className="w-full">
                  <SelectGroup>
                    {formatV.map((option, index) => (
                      <SelectItem key={index} value={option.value}>
                        <div className='!flex items-center gap-1'>
                          {option.icon &&
                            <option.icon/>
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
            <div className="grid w-full">
              <div className="border-dashed border-2 border-sky-500 rounded-lg p-2 flex flex-col justify-between">
                <Label className="text-sm	text-white pb-0.5">
                  Target для РУЗ
                </Label>
                {/* <label
                  className={`${style.checkboxI} text-sky-400`}
                  onClick={taretCheckbox}
                >
                  Target UZ
                  <input
                    type="checkbox"
                    defaultChecked={currentOrder.target_country === 'uz'}
                    onChange={taretCheckbox}
                    disabled={role !== 'admin'}
                  />
                  
                  <span className={style.checkmark}></span>
                </label> */}
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
                  {/* <span className={style.checkmark}></span> */}
                </label>
              </div>
            </div>
          </div>
          {/*  */}{' '}
          <div className="flex gap-4 mb-4">
            <div className="grid w-full">
              <Label className="text-sm	text-white pb-2">
                Количество показов
                <span className="text-red-500 ml-0.5">*</span>
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
                    value={value.toLocaleString('en-US')}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/\D/g, '')
                      const newValue = rawValue ? parseInt(rawValue, 10) : ''
                      onChange(newValue)
                    }}
                    onBlur={onChange}
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
            <div className="grid w-full">
              <Label className="text-sm	text-white pb-2">
                Бюджет (сум)
                <span className="text-red-500 ml-0.5">*</span>
              </Label>
              <Input
                className={`border ${
                  errors?.enddate ? 'border-red-500' : 'border-gray-300'
                }   transition-all duration-300 text-sm `}
                type="text"
                value={
                  isNaN(budgett)
                    ? currentOrder.budget.toLocaleString('en-US')
                    : budgett.toLocaleString('en-US')
                }
                placeholder="Бюджет"
                autoComplete="off"
                disabled={true}
              />
            </div>
            {/*  */}
          </div>
          <div className="flex gap-4 mb-4">
            <div className="grid w-full">
              <Label className="text-sm	text-white pb-2">Текущий ролик:</Label>
              <a
                href={currentOrder.promo_file}
                target="_blank"
                className="text-[#A7CCFF]  underline-offset-2 underline hover:text-[#0767eb]"
                rel="noreferrer"
              >
                <Film />

                {/*<File*/}
                {/*  style={{width: '18px', height: '18px', marginLeft: '5px'}}*/}
                {/*/>*/}
              </a>
            </div>
            <div>
              <div className="grid w-[250px]">
                <Label className="text-sm	text-white pb-0.5">
                  Загрузить новый ролик
                </Label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className={style.modalWindow__file}
                  {...register('selectedFile')}
                />
                <span className={style.modalWindow__input_error}>
                  {errors?.selectedFile && (
                    <p>{errors?.selectedFile?.message}</p>
                  )}
                </span>
              </div>
            </div>
          </div>
          {/*  */}
          {/* <textarea
            placeholder="Комментарий к заказу"
            autoComplete="off"
            className={`border ${
              errors?.enddate ? 'border-red-500' : 'border-gray-300'
            }   transition-all duration-300 text-sm `}
            {...register('notes')}
            style={{ width: '100%' }}
          ></textarea> */}
          <Textarea
            placeholder="Комментарий к заказу"
            className="resize-none text-white"
            // {...field}
            {...register('notes')}
          />
          <div className="flex gap-4">
            {role === 'admin' ? (
              // <Button
              //   className={`${
              //     isValid && !isOrderCreated
              //       ? 'bg-[#ff000066] hover:bg-red-500 border-2 border-red-500 hover:border-red-400'
              //       : 'bg-[#616161]'
              //   } w-full   h-[44px] text-white rounded-lg	mt-6`}
              //   onClick={() => {
              //     handleRemoveInventory()
              //   }}
              // >
              //   Удалить
              // </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    className={`${
                      isValid && !isOrderCreated
                        ? 'bg-[#ff000066] hover:bg-red-500 border-2 border-red-500 hover:border-red-400'
                        : 'bg-[#616161]'
                    } w-full   h-[44px] text-white rounded-lg	mt-6`}
                  >
                    Удалить
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-red-500">
                      Вы уверены, что хотите удалить заказ?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-white">
                      Это действие не может быть отменено.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="text-white">
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
              className={`${
                isValid && !isOrderCreated
                  ? 'bg-[#2A85FF66] hover:bg-[#0265EA] border-2 border-[#0265EA] hover:border-[#0265EA]'
                  : 'bg-[#616161]'
              } w-full   h-[44px] text-white rounded-lg	mt-6`}
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
                <span>Сохранить</span>
              )}
            </Button>
            {/* <button
              style={{ display: 'flex', alignItems: 'center' }}
              type="submit"
              // disabled={!isValid || isOrderCreated}
              // className={
              //   isValid && !isOrderCreated
              //     ? style.btn__wrapper__btn
              //     : style.btn__wrapper__disabled
              // }
            >
              {isOrderCreated ? (
                <>
                  <span>Сохранить</span>
                  <div className={style.loaderWrapper}>
                    <div className={style.spinner}></div>
                  </div>
                </>
              ) : (
                <span>Сохранить</span>
              )}
            </button> */}
          </div>
        </form>
      </DialogContent>
    </>
  )
}
