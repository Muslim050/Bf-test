import React, { useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import 'react-datepicker/dist/react-datepicker.css'
import {
  ImageDown,
  Loader2,
  Monitor,
  MonitorPlay,
  MonitorUp,
  PackagePlus,
  Trash2,
} from 'lucide-react'
import {
  editAdvertiser,
  fetchAdvertiser,
} from '@/redux/advertiser/advertiserSlice.js'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Button } from '@/components/ui/button.jsx'
import { toast } from 'react-hot-toast'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.jsx'
import { truncate } from '@/utils/other.js'
import TooltipWrapper from '@/shared/TooltipWrapper.jsx'

export default function EditAdvModal({
  closeDialog,
  currentAdvertiser,
  fetchCpm,
}) {
  const dispatch = useDispatch()
  const [isEditingCreated, setEditingCreated] = React.useState(false)
  const id = currentAdvertiser.id

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
  const handleClear = () => {
    setSelectedFile(null) // Сбрасываем файл
    setPreview(null) // Удаляем предпросмотр
    if (inputRef.current) {
      inputRef.current.value = '' // Сбрасываем значение поля ввода
    }
  }
  const {
    formState: { errors, isValid },
    handleSubmit,
    control,
  } = useForm({
    defaultValues: {
      name: currentAdvertiser.name,
      email: currentAdvertiser.email,
      phone_number: currentAdvertiser.phone_number,
      cpm_preroll: currentAdvertiser.cpm_preroll,
      cpm_preroll_uz: currentAdvertiser.cpm_preroll_uz,
      cpm_top_preroll: currentAdvertiser.cpm_top_preroll,
      cpm_top_preroll_uz: currentAdvertiser.cpm_top_preroll_uz,
      cpm_tv_preroll: currentAdvertiser.cpm_tv_preroll,
      cpm_tv_preroll_uz: currentAdvertiser.cpm_tv_preroll_uz,
      selectedFile: selectedFile,
    },
    mode: 'onChange',
  })
  useEffect(() => {
    if (currentAdvertiser) {
      fetchCpm(currentAdvertiser.id)
    }
  }, [currentAdvertiser, fetchCpm])

  const onSubmit = async (data) => {
    const advertiserData = {
      ...data,
      selectedFile, // Передаём файл из состояния
    }
    try {
      const adv = await dispatch(
        editAdvertiser({ id, data: advertiserData }),
      ).unwrap()
      toast.success('Изминения успешно обновлены!')
      closeDialog() // Закрытие модального окна
      setTimeout(() => {
        dispatch(
          fetchAdvertiser({
            page: 1,
            pageSize: 20,
          }),
        )
      }, 1000)
    } catch (error) {
      toast.error(error?.data?.error?.message)
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
            Редактировать CPM
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3">
            <div className=" flex gap-2">
              <div className="grid w-full ">
                <Label className="text-sm	text-white pb-1 flex gap-1 items-center">
                  <Monitor /> Preroll
                  <span className="text-red-500 ml-0.5">*</span>
                </Label>
                <Controller
                  name="cpm_preroll"
                  control={control}
                  rules={{ required: 'Поле обязательно к заполнению' }}
                  defaultValue=""
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                  }) => (
                    <Input
                      type="text"
                      value={value?.toLocaleString('en-US')}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/\D/g, '')
                        const newValue = rawValue ? parseInt(rawValue, 10) : ''
                        onChange(newValue)
                      }}
                      onBlur={onBlur}
                      name={name}
                      ref={ref}
                      autoComplete="off"
                      step="1000"
                      className={`border ${
                        errors?.cpm_preroll
                          ? 'border-red-500'
                          : 'border-gray-300'
                      }  transition-all duration-300 text-sm text-[#CECECE]`}
                      placeholder={'Введите preroll'}
                    />
                  )}
                />
              </div>
              <div className="grid w-full">
                <Label className="text-sm	text-white pb-1 flex items-center gap-1">
                  <Monitor /> Preroll
                  <div className="rounded-[6px] px-1 pb-0 h-auto text-[15px] bg-[#606afc] inline">
                    uz
                  </div>
                  <span className="text-red-500 ml-0.5">*</span>
                </Label>

                <Controller
                  name="cpm_preroll_uz"
                  control={control}
                  rules={{ required: 'Поле обязательно к заполнению' }}
                  defaultValue=""
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                  }) => (
                    <Input
                      type="text"
                      value={value?.toLocaleString('en-US')}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/\D/g, '')
                        const newValue = rawValue ? parseInt(rawValue, 10) : ''
                        onChange(newValue)
                      }}
                      onBlur={onBlur}
                      name={name}
                      ref={ref}
                      autoComplete="off"
                      step="1000"
                      className={`border ${
                        errors?.cpm_mixroll
                          ? 'border-red-500'
                          : 'border-gray-300'
                      }  transition-all duration-300 text-sm text-[#CECECE]`}
                      placeholder={'Введите mixroll'}
                    />
                  )}
                />
              </div>
              <div className="grid w-full">
                <Label className="text-sm	text-white pb-1 flex gap-1 items-center">
                  <MonitorPlay /> TV Preroll
                  <span className="text-red-500 ml-0.5">*</span>
                </Label>
                <Controller
                  name="cpm_tv_preroll"
                  control={control}
                  rules={{ required: 'Поле обязательно к заполнению' }}
                  defaultValue=""
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                  }) => (
                    <Input
                      type="text"
                      value={value?.toLocaleString('en-US')}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/\D/g, '')
                        const newValue = rawValue ? parseInt(rawValue, 10) : ''
                        onChange(newValue)
                      }}
                      onBlur={onBlur}
                      name={name}
                      ref={ref}
                      autoComplete="off"
                      step="1000"
                      className={`border ${
                        errors?.cpm_preroll_uz
                          ? 'border-red-500'
                          : 'border-gray-300'
                      }  transition-all duration-300 text-sm text-[#CECECE]`}
                      placeholder={'Введите target preroll'}
                    />
                  )}
                />
              </div>
            </div>

            <div className=" flex gap-2 ">
              <div className="grid w-full">
                <Label className="text-sm	text-white pb-1 flex items-center gap-1">
                  <MonitorPlay /> TV Preroll{' '}
                  <div className="rounded-[6px] px-1 pb-0 h-auto text-[15px] bg-[#606afc] inline">
                    uz
                  </div>
                  <span className="text-red-500 ml-0.5">*</span>
                </Label>
                <Controller
                  name="cpm_tv_preroll_uz"
                  control={control}
                  rules={{ required: 'Поле обязательно к заполнению' }}
                  defaultValue=""
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                  }) => (
                    <Input
                      type="text"
                      value={value?.toLocaleString('en-US')}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/\D/g, '')
                        const newValue = rawValue ? parseInt(rawValue, 10) : ''
                        onChange(newValue)
                      }}
                      onBlur={onBlur}
                      name={name}
                      ref={ref}
                      autoComplete="off"
                      step="1000"
                      className={`border ${
                        errors?.cpm_mixroll_uz
                          ? 'border-red-500'
                          : 'border-gray-300'
                      }   transition-all duration-300 text-sm text-[#CECECE]`}
                      placeholder={'Введите target mixroll'}
                    />
                  )}
                />
              </div>
              <div className="grid w-full">
                <Label className="text-sm	text-white pb-1 flex items-center gap-1 whitespace-nowrap">
                  <MonitorUp /> Top Preroll
                  <span className="text-red-500 ml-0.5">*</span>
                </Label>
                <Controller
                  name="cpm_top_preroll"
                  control={control}
                  rules={{ required: 'Поле обязательно к заполнению' }}
                  defaultValue=""
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                  }) => (
                    <Input
                      type="text"
                      value={value?.toLocaleString('en-US')}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/\D/g, '')
                        const newValue = rawValue ? parseInt(rawValue, 10) : ''
                        onChange(newValue)
                      }}
                      onBlur={onBlur}
                      name={name}
                      ref={ref}
                      autoComplete="off"
                      step="1000"
                      className={`border ${
                        errors?.cpm_preroll_uz
                          ? 'border-red-500'
                          : 'border-gray-300'
                      }  transition-all duration-300 text-sm text-[#CECECE]`}
                      placeholder={'Введите target preroll'}
                    />
                  )}
                />
              </div>
              <div className="grid w-full">
                <Label className="text-sm	text-white pb-1 flex items-center gap-1 whitespace-nowrap">
                  <MonitorUp /> Top Preroll{' '}
                  <div className="rounded-[6px] px-1 pb-0 h-auto text-[15px] bg-[#606afc] inline">
                    uz
                  </div>
                  <span className="text-red-500 ml-0.5">*</span>
                </Label>
                <Controller
                  name="cpm_top_preroll_uz"
                  control={control}
                  rules={{ required: 'Поле обязательно к заполнению' }}
                  defaultValue=""
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                  }) => (
                    <Input
                      type="text"
                      value={value?.toLocaleString('en-US')}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/\D/g, '')
                        const newValue = rawValue ? parseInt(rawValue, 10) : ''
                        onChange(newValue)
                      }}
                      onBlur={onBlur}
                      name={name}
                      ref={ref}
                      autoComplete="off"
                      step="1000"
                      className={`border ${
                        errors?.cpm_mixroll_uz
                          ? 'border-red-500'
                          : 'border-gray-300'
                      }   transition-all duration-300 text-sm text-[#CECECE]`}
                      placeholder={'Введите target mixroll'}
                    />
                  )}
                />
              </div>
            </div>

            <div>
              <Label className="text-sm	text-white pb-1">
                Выбрать лого
                <span className="text-red-500 ml-0.5">*</span>
              </Label>
              <div className="flex justify-between w-[100%] pt-1 gap-3">
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
                    Вы выбрали файл:{truncate(selectedFile.name, 10)}{' '}
                  </p>
                )}
                {preview && (
                  <div>
                    <Avatar className="size-20">
                      <AvatarImage src={preview} alt="@shadcn" />
                      <AvatarFallback>{preview}</AvatarFallback>
                    </Avatar>
                  </div>
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
            </div>
            <div className="flex justify-end">
              <TooltipWrapper tooltipContent="Создать">
                <Button
                  type="submit"
                  variant="default"
                  disabled={!isValid || isEditingCreated}
                >
                  {isEditingCreated ? (
                    <Loader2 className="ml-2 h-6 w-6 animate-spin" />
                  ) : (
                    <PackagePlus />
                  )}
                </Button>
              </TooltipWrapper>
            </div>
          </div>
        </form>
      </DialogContent>
    </>
  )
}
