import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addAdvertiser } from '@/redux/advertiser/advertiserSlice.js'
import { Controller, useForm } from 'react-hook-form'
import backendURL from '@/utils/url.js'
import MaskedInput from 'react-text-mask'
import {
  ImageDown,
  Loader2,
  Monitor,
  MonitorPlay,
  MonitorUp,
  PackagePlus,
  Trash2,
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { hasRole } from '@/utils/roleUtils.js'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
} from '@/components/ui/select.jsx'
import { Button } from '@/components/ui/button.jsx'
import { SelectTrigger } from '@/components/ui/selectTrigger.jsx'
import InputField from '@/components/Dashboard/Advertiser/AdvertiserUtilizer/modal/AdvertiserModal/components/InputField.jsx'
import axiosInstance from '@/api/api.js'
import { fetchAdvertiserAgency } from '@/redux/AgencySlice/advertiserAgency/advertiserAgencySlice.js'
import { truncate } from '@/utils/other.js'
import TooltipWrapper from '@/shared/TooltipWrapper.jsx'

export default function AdvertiserModal({ onClose }) {
  const [isLogin, setIsLogin] = React.useState(false)
  const { advertiserAgency } = useSelector((state) => state.advertiserAgency)
  const [setCpm] = React.useState([])
  const dispatch = useDispatch()
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null) // Для хранения URL предпросмотра
  const inputRef = useRef(null) // Создаем ссылку на Input

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    setSelectedFile(file)

    if (file) {
      setPreview(URL.createObjectURL(file)) // Создаем URL для предпросмотра
    } else {
      setPreview(null) // Сбрасываем предпросмотр, если файл не выбран
    }
  }

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
    control,
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      agency: '',
      cpm_preroll: '',
      cpm_preroll_uz: '',
      cpm_tv_preroll: '',
      cpm_tv_preroll_uz: '',
      cpm_top_preroll: '',
      cpm_top_preroll_uz: '',
      selectedFile: selectedFile,
    },
    mode: 'onChange',
  })
  const fetchCpm = async () => {
    const url = `${backendURL}/order/cpm/`
    const response = await axiosInstance.get(url)
    setCpm(response.data.data)
    setValue('cpm_mixroll', response.data.data.mixroll)
    setValue('cpm_preroll', response.data.data.preroll)
  }
  React.useEffect(() => {
    dispatch(
      fetchAdvertiserAgency({
        page: 1, // API использует нумерацию с 1
        pageSize: 100,
      }),
    )
  }, [dispatch])
  React.useEffect(() => {
    fetchCpm()
  }, [])

  const handleClear = () => {
    setSelectedFile(null) // Сбрасываем файл
    setPreview(null) // Удаляем предпросмотр
    if (inputRef.current) {
      inputRef.current.value = '' // Сбрасываем значение поля ввода
    }
  }

  const onSubmit = async (data) => {
    const advertiserData = {
      ...data,
      selectedFile, // Передаём файл из состояния
    }

    try {
      setIsLogin(true)
      const adv = await dispatch(
        addAdvertiser({ data: advertiserData }),
      ).unwrap()
      toast.success('Рекламодатель успешно создан!')
      onClose()
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    } catch (error) {
      toast.error(
        error?.message || 'Произошла ошибка при создании рекламодателя',
      )
    } finally {
      setIsLogin(false)
    }
  }
  return (
    <>
      <DialogContent
        className="w-[450px] p-4"
        onInteractOutside={(e) => {
          e.preventDefault()
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-lg	font-medium	text-white border-b border-[#F9F9F926] pb-4">
            Cоздать рекламодателя
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          {/**/}
          <div className="flex gap-4 ">
            <div className="grid w-full">
              <Label className="text-sm	text-white pb-1">
                Название компании
                <span className="text-red-500 ml-0.5">*</span>
              </Label>
              <Input
                type="text"
                autoComplete="off"
                {...register('name', {
                  required: 'Поле обезательно к заполнению',
                })}
                placeholder={'Название компании'}
                className={`border ${
                  errors?.name ? 'border-red-500' : 'border-gray-300'
                }   transition-all duration-300 text-sm `}
              />
            </div>
            <div className="grid w-full">
              <Label className="text-sm	text-white pb-1">
                Номер телефона<span className="text-red-500 ml-0.5">*</span>
              </Label>
              <Controller
                name="phone"
                control={control}
                rules={{
                  required: 'Поле обезательно к заполнению',
                  pattern: {
                    value: /^\+998 \(\d{2}\) \d{3}-\d{2}-\d{2}$/,
                    message: 'Неверный формат номера телефона',
                  },
                }}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <MaskedInput
                    mask={[
                      '+',
                      '9',
                      '9',
                      '8',
                      ' ',
                      '(',
                      /[1-9]/,
                      /\d/,
                      ')',
                      ' ',
                      /\d/,
                      /\d/,
                      /\d/,
                      '-',
                      /\d/,
                      /\d/,
                      '-',
                      /\d/,
                      /\d/,
                    ]}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    render={(inputRef, props) => (
                      <Input
                        {...props}
                        ref={(e) => {
                          ref(e)
                          inputRef(e)
                        }}
                        placeholder="+998 (__) ___ - __ - __"
                        className={`border ${
                          errors?.phone ? 'border-red-500' : 'border-gray-300'
                        } transition-all duration-300 text-sm `}
                      />
                    )}
                  />
                )}
              />
            </div>
          </div>
          {/**/}

          {/**/}
          <div className="flex gap-4">
            <div className="w-full mb-0">
              <InputField
                label="Email"
                name="email"
                register={register}
                rules={{ required: 'Поле обязательно к заполнению' }}
                placeholder="Введите email"
                error={errors?.email}
              />
            </div>
            <div className="grid w-full">
              <Label className="text-sm	text-white pb-1">
                Рекламное агенство
                <span className="text-red-500 ml-0.5">*</span>
              </Label>
              <Controller
                name="agency"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <SelectTrigger className="!text-white">
                      <SelectValue placeholder="Рекламное агенство" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Рекламное агенство</SelectLabel>
                        {advertiserAgency?.results?.map((adv) => (
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
          </div>
          {/*  */}

          {/* Форматы без UZ */}
          {hasRole('admin') && (
            <div className="flex gap-2">
              <div className="grid w-full">
                <Label className="text-sm	text-white pb-1 gap-1 flex items-center">
                  <Monitor /> Preroll
                  <span className="text-red-500 ml-0.5">*</span>
                </Label>
                <Input
                  type="text"
                  autoComplete="off"
                  {...register('cpm_preroll', {
                    required: 'Поле обезательно к заполнению',
                  })}
                  placeholder={'Введите cpm'}
                  className={`border ${
                    errors?.cpm_preroll ? 'border-red-500' : 'border-gray-300'
                  }   transition-all duration-300 text-sm `}
                />
              </div>
              <div className="grid w-full">
                <Label className="text-sm	text-white pb-1 flex items-center gap-1">
                  <MonitorPlay /> TV Preroll
                  <span className="text-red-500 ml-0.5">*</span>
                </Label>
                <Input
                  type="text"
                  autoComplete="off"
                  {...register('cpm_tv_preroll', {
                    required: 'Поле обезательно к заполнению',
                  })}
                  placeholder={'Введите cpm'}
                  className={`border ${
                    errors?.cpm_preroll_uz
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }   transition-all duration-300 text-sm `}
                />
              </div>

              <div className="grid w-full">
                <Label className="text-sm	text-white pb-1 flex items-center gap-1">
                  <MonitorUp /> Top Preroll
                  <span className="text-red-500 ml-0.5">*</span>
                </Label>
                <Input
                  type="text"
                  autoComplete="off"
                  {...register('cpm_top_preroll', {
                    required: 'Поле обезательно к заполнению',
                  })}
                  placeholder={'Введите cpm'}
                  className={`border ${
                    errors?.cpm_preroll_uz
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }   transition-all duration-300 text-sm `}
                />
              </div>
            </div>
          )}
          {/**/}

          {/* Форматы с UZ*/}
          {hasRole('admin') && (
            <div className="flex gap-2 flex-nowrap">
              <div className="">
                <Label className="text-sm	text-white pb-1 flex items-center gap-1 whitespace-nowrap">
                  <MonitorPlay /> TV Preroll{' '}
                  <div className="rounded-[6px] px-1 pb-0 h-auto text-[15px] bg-[#606afc] inline">
                    uz
                  </div>
                  <span className="text-red-500 ml-0.5">*</span>
                </Label>
                <Input
                  type="text"
                  autoComplete="off"
                  {...register('cpm_tv_preroll_uz', {
                    required: 'Поле обязательно к заполнению',
                  })}
                  placeholder="Введите cpm"
                  className={`border ${
                    errors?.cpm_tv_preroll_uz
                      ? 'border-red-500'
                      : 'border-gray-300'
                  } transition-all duration-300 text-sm`}
                />
              </div>
              <div className="">
                <Label className="text-sm	text-white pb-1 flex items-center gap-1 whitespace-nowrap">
                  <Monitor /> Preroll
                  <div className="rounded-[6px] px-1 pb-0 h-auto text-[15px] bg-[#606afc] inline">
                    uz
                  </div>
                  <span className="text-red-500 ml-0.5">*</span>
                </Label>
                <Input
                  type="text"
                  autoComplete="off"
                  {...register('cpm_preroll_uz', {
                    required: 'Поле обезательно к заполнению',
                  })}
                  placeholder={'Введите cpm'}
                  className={`border ${
                    errors?.cpm_preroll_uz
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }   transition-all duration-300 text-sm `}
                />
              </div>
              <div className="w-[140px]">
                <Label className="text-sm	text-white pb-1 flex items-center gap-1 whitespace-nowrap">
                  <MonitorUp /> Top Preroll{' '}
                  <div className="rounded-[6px] px-1 pb-0 h-auto text-[15px] bg-[#606afc] inline">
                    uz
                  </div>
                  <span className="text-red-500 ml-0.5">*</span>
                </Label>
                <Input
                  type="text"
                  autoComplete="off"
                  {...register('cpm_top_preroll_uz', {
                    required: 'Поле обязательно к заполнению',
                  })}
                  placeholder="Введите cpm"
                  className={`border ${
                    errors?.cpm_top_preroll_uz
                      ? 'border-red-500'
                      : 'border-gray-300'
                  } transition-all duration-300 text-sm`}
                />
              </div>
            </div>
          )}
          {/**/}

          {/*LOGO*/}
          <Label className="text-sm	text-white">
            Выбрать лого
            <span className="text-red-500 ml-0.5">*</span>
          </Label>
          <div className="flex justify-between w-[100%] gap-3">
            <div
              className={`grid w-[100%] ${selectedFile ? 'hidden' : 'h-[76px]'}`}
            >
              {selectedFile ? null : (
                <div className="border-dashed border-2 border-[#A7CCFF] rounded-2xl p-2 flex flex-col justify-center items-center h-[76px] relative">
                  <input
                    type="file"
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
                    Загрузить файл
                  </Button>
                </div>
              )}
            </div>
            {selectedFile && (
              <p className="text-sm text-white">
                Вы выбрали файл:{truncate(selectedFile.name, 20)}{' '}
              </p>
            )}

            <div className="flex items-end">
              {(selectedFile || preview) && (
                <TooltipWrapper tooltipContent="Очистить">
                  <Button
                    variant="outlineDeactivate"
                    className="h-[40px]"
                    onClick={handleClear}
                  >
                    <Trash2 />
                  </Button>
                </TooltipWrapper>
              )}
            </div>
          </div>
          {/*LOGO*/}

          <div className="flex justify-end">
            <TooltipWrapper tooltipContent="Создать">
              <Button
                type="submit"
                variant="default"
                disabled={!isValid || isLogin}
              >
                {isLogin ? (
                  <Loader2 className="ml-2 h-6 w-6 animate-spin" />
                ) : (
                  <PackagePlus />
                )}
              </Button>
            </TooltipWrapper>
          </div>
        </form>
      </DialogContent>
    </>
  )
}
