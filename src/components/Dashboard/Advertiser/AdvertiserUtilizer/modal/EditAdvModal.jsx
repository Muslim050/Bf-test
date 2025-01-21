import React, {useEffect, useRef, useState} from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import 'react-datepicker/dist/react-datepicker.css'
import { Loader2 } from 'lucide-react'
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
import { Monitor, MonitorPlay, MonitorUp } from 'lucide-react';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.jsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.jsx";
import {TableBody, TableCell, TableHead, TableRow} from "@/components/ui/table.jsx";

export default function EditAdvModal({ onClose, currentAdvertiser, fetchCpm }) {
  const dispatch = useDispatch()
  const [isEditingCreated, setEditingCreated] = React.useState(false)
  const id = currentAdvertiser.id

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null); // Для хранения URL предпросмотра
  const inputRef = useRef(null); // Создаем ссылку на Input
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      setPreview(URL.createObjectURL(file)); // Создаем URL для предпросмотра
    } else {
      setPreview(null); // Сбрасываем предпросмотр, если файл не выбран
    }
  };
  const handleClear = () => {
    setSelectedFile(null); // Сбрасываем файл
    setPreview(null); // Удаляем предпросмотр
    if (inputRef.current) {
      inputRef.current.value = ""; // Сбрасываем значение поля ввода
    }
  };


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
      selectedFile: selectedFile
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
    };
    try {
      const adv = await dispatch(editAdvertiser({id, data: advertiserData })).unwrap()
      toast.success('Изминения успешно обновлены!')
      onClose()
      setTimeout(() => {
        dispatch(fetchAdvertiser())
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
          <div>
            <div className="pb-4 flex gap-4">
              {/**/}
              <div className="grid w-full ">
                <Label className="text-sm	text-white pb-1 flex gap-1 items-center">
                  <Monitor/> Preroll
                  <span className="text-red-500 ml-0.5">*</span>
                </Label>
                <Controller
                  name="cpm_preroll"
                  control={control}
                  rules={{required: 'Поле обязательно к заполнению'}}
                  defaultValue=""
                  render={({
                             field: {onChange, onBlur, value, name, ref},
                           }) => (
                    <Input
                      type="text"
                      value={value?.toLocaleString ('en-US')}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace (/\D/g, '')
                        const newValue = rawValue ? parseInt (rawValue, 10) : ''
                        onChange (newValue)
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
              {/**/}
              {/**/}
              <div className="grid w-full">
                <Label className="text-sm	text-white pb-2 flex items-center gap-1">
                  <Monitor/> Preroll
                  <div className="rounded-[6px] px-1 pb-0 h-auto text-[15px] bg-[#606afc] inline">
                    uz
                  </div>
                  <span className="text-red-500 ml-0.5">*</span>
                </Label>

                <Controller
                  name="cpm_preroll_uz"
                  control={control}
                  rules={{required: 'Поле обязательно к заполнению'}}
                  defaultValue=""
                  render={({
                             field: {onChange, onBlur, value, name, ref},
                           }) => (
                    <Input
                      type="text"
                      value={value?.toLocaleString ('en-US')}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace (/\D/g, '')
                        const newValue = rawValue ? parseInt (rawValue, 10) : ''
                        onChange (newValue)
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
            </div>


            <div className=" flex gap-4 pb-4">
              {/**/}
              <div className="grid w-full">
                <Label className="text-sm	text-white pb-1 flex gap-1 items-center">
                  <MonitorPlay/> TV Preroll<span className="text-red-500 ml-0.5">*</span>
                </Label>
                <Controller
                  name="cpm_tv_preroll"
                  control={control}
                  rules={{required: 'Поле обязательно к заполнению'}}
                  defaultValue=""
                  render={({
                             field: {onChange, onBlur, value, name, ref},
                           }) => (
                    <Input
                      type="text"
                      value={value?.toLocaleString ('en-US')}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace (/\D/g, '')
                        const newValue = rawValue ? parseInt (rawValue, 10) : ''
                        onChange (newValue)
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
              {/**/}

              {/**/}
              <div className="grid w-full">
                <Label className="text-sm	text-white pb-2 flex items-center gap-1">
                  <MonitorPlay/> TV Preroll <div
                  className="rounded-[6px] px-1 pb-0 h-auto text-[15px] bg-[#606afc] inline">
                  uz
                </div><span className="text-red-500 ml-0.5">*</span>
                </Label>
                <Controller
                  name="cpm_tv_preroll_uz"
                  control={control}
                  rules={{required: 'Поле обязательно к заполнению'}}
                  defaultValue=""
                  render={({
                             field: {onChange, onBlur, value, name, ref},
                           }) => (
                    <Input
                      type="text"
                      value={value?.toLocaleString ('en-US')}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace (/\D/g, '')
                        const newValue = rawValue ? parseInt (rawValue, 10) : ''
                        onChange (newValue)
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
              {/**/}
            </div>

            <div className="pb-4 flex gap-4">
              {/**/}
              <div className="grid w-full">
                <Label className="text-sm	text-white pb-1 flex items-center gap-1">
                  <MonitorUp/> Top Preroll<span className="text-red-500 ml-0.5">*</span>
                </Label>
                <Controller
                  name="cpm_top_preroll"
                  control={control}
                  rules={{required: 'Поле обязательно к заполнению'}}
                  defaultValue=""
                  render={({
                             field: {onChange, onBlur, value, name, ref},
                           }) => (
                    <Input
                      type="text"
                      value={value?.toLocaleString ('en-US')}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace (/\D/g, '')
                        const newValue = rawValue ? parseInt (rawValue, 10) : ''
                        onChange (newValue)
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
              {/**/}

              {/**/}
              <div className="grid w-full">
                <Label className="text-sm	text-white pb-2 flex items-center gap-1">
                  <MonitorUp/> Top Preroll <div
                  className="rounded-[6px] px-1 pb-0 h-auto text-[15px] bg-[#606afc] inline">
                  uz
                </div><span className="text-red-500 ml-0.5">*</span>
                </Label>
                <Controller
                  name="cpm_top_preroll_uz"
                  control={control}
                  rules={{required: 'Поле обязательно к заполнению'}}
                  defaultValue=""
                  render={({
                             field: {onChange, onBlur, value, name, ref},
                           }) => (
                    <Input
                      type="text"
                      value={value?.toLocaleString ('en-US')}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace (/\D/g, '')
                        const newValue = rawValue ? parseInt (rawValue, 10) : ''
                        onChange (newValue)
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
              {/**/}
            </div>
            <Label className="text-sm	text-white pb-1">
              Выбрать лого
              <span className="text-red-500 ml-0.5">*</span>
            </Label>
            <div className='flex justify-between w-[100%] pt-1 gap-3'>
              <div className={`grid w-[100%] ${selectedFile ? 'hidden' : 'h-[76px]'}`}>
                {
                  selectedFile ? null :
                    <div
                      className='border-dashed border-2 border-[#A7CCFF] rounded-2xl p-2 flex flex-col justify-center items-center h-[76px] relative'>
                      <input
                        type="file"
                        accept='image/*'
                        onChange={handleFileChange}
                        ref={inputRef}
                        className='hidden'
                      />
                      <Button
                        type="button" // Заменено с type="submit" на type="button"

                        onClick={() => inputRef.current.click()}
                        className='bg-blue-500 text-white px-4 py-2 rounded-2xl'
                      >
                        Загрузить файл
                      </Button>
                    </div>
                }
              </div>
              {selectedFile && <p className='text-sm text-white'>Вы выбрали файл:{selectedFile.name} </p>}
              {preview && <div>
                <Avatar className='size-20'>
                  <AvatarImage src={preview} alt="@shadcn"/>
                  <AvatarFallback>{preview}</AvatarFallback>
                </Avatar>
              </div>}
              <div className='flex flex-col gap-2 justify-between'>
                {(selectedFile || preview) && (
                  <Button
                    type="button"
                    onClick={handleClear}
                    className='bg-red-400 h-full hover:bg-red-500  border-2 border-red-500  hover:border-red-500  hover:text-white text-white rounded-2xl cursor-pointer'                  >
                    Очистить
                  </Button>
                )}
                {(selectedFile || preview) && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className='bg-[#2A85FF66] hover:bg-[#0265EA] border-2 border-[#0265EA]  hover:border-[#0265EA] hover:text-white text-white rounded-2xl  h-full cursor-pointer'>Предпросмотр</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto rounded-2xl h-auto bg-gray-500">
                      <div className="grid gap-4 mb-3">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none text-sm text-white">Предпросмотр</h4>
                        </div>
                      </div>
                      <TableRow >
                        <TableHead className='flex bg-[#FFFFFF2B] !rounded-lg justify-between items-center text-white text-sm px-4'>
                          Наименование Компании

                        </TableHead>

                      </TableRow>



                      <TableBody>

                        <TableRow>
                          <TableCell
                            className={`font-normal text-sm text-white flex justify-around items-center `}
                          >
                            {preview && <div>
                              <Avatar className='size-12'>
                                <AvatarImage src={preview} alt="@shadcn"/>
                                <AvatarFallback>{preview}</AvatarFallback>
                              </Avatar>
                            </div>}
                            {currentAdvertiser.name}

                          </TableCell>

                        </TableRow>
                      </TableBody>
                    </PopoverContent>
                  </Popover>
                )}

              </div>

            </div>


            <div>
              <Button
                className={`${
                  isValid
                    ? 'bg-[#2A85FF66] hover:bg-[#0265EA] border-2 border-[#0265EA] hover:border-[#0265EA]'
                    : 'bg-[#616161]'
                } w-full   h-[44px] text-white rounded-2xl	mt-4`}
                disabled={!isValid || isEditingCreated}
              >
                Сохранить
                {isEditingCreated && (
                  <Loader2 className="ml-2 h-6 w-6 animate-spin"/>
                )}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </>
  )
}
