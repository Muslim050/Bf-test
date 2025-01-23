import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {addAdvertiser, fetchAdvertiser} from '@/redux/advertiser/advertiserSlice.js'
import { useForm, Controller } from 'react-hook-form'
import backendURL from '@/utils/url.js'
import MaskedInput from 'react-text-mask'
import {ChevronDown, ChevronsUpDown, ChevronUp, Loader2} from 'lucide-react'
import { Monitor, MonitorPlay, MonitorUp } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from 'react-hot-toast'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
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
import InputField
  from "@/components/Dashboard/Advertiser/AdvertiserUtilizer/modal/AdvertiserModal/components/InputField.jsx";
import axiosInstance from "@/api/api.js";
// import {TableBody, TableCell, TableHead, TableRow} from "@/components/ui/table.jsx";
import {fetchAdvertiserAgency} from "@/redux/AgencySlice/advertiserAgency/advertiserAgencySlice.js";
// import {truncate} from "@/utils/other.js";

export default function AdvertiserModal({ onClose }) {
  const [isLogin, setIsLogin] = React.useState(false)
  const { advertiserAgency } = useSelector(
    (state) => state.advertiserAgency,
  )
  const [setCpm] = React.useState([])
  const dispatch = useDispatch()
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

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
    control,
    watch
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
      // selectedFile: selectedFile
    },
    mode: 'onChange',
  })
  const nameWatch = watch('name')
  const fetchCpm = async () => {
    const url = `${backendURL}/order/cpm/`
    const response = await axiosInstance.get(url)
    setCpm(response.data.data)
    setValue('cpm_mixroll', response.data.data.mixroll)
    setValue('cpm_preroll', response.data.data.preroll)
  }
  React.useEffect(() => {
    dispatch(fetchAdvertiserAgency({
      page: 1, // API использует нумерацию с 1
      pageSize: 100,
    }))
  }, [dispatch])
  React.useEffect(() => {
    fetchCpm()
  }, [])

  const handleClear = () => {
    setSelectedFile(null); // Сбрасываем файл
    setPreview(null); // Удаляем предпросмотр
    if (inputRef.current) {
      inputRef.current.value = ""; // Сбрасываем значение поля ввода
    }
  };

  const onSubmit = async (data) => {
    const advertiserData = {
      ...data,
      // selectedFile, // Передаём файл из состояния
    };

    try {
      setIsLogin(true);
      const adv = await dispatch(addAdvertiser({ data: advertiserData })).unwrap();
      toast.success('Рекламодатель успешно создан!');
      onClose();
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      toast.error(error?.message || 'Произошла ошибка при создании рекламодателя');
    } finally {
      setIsLogin(false);
    }
  };
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            {/**/}
            <div className="flex gap-4 mb-2">
              <div className="grid w-full">
                <Label className="text-sm	text-white pb-1">
                  Название компании
                  <span className="text-red-500 ml-0.5">*</span>
                </Label>
                <Input
                  type="text"
                  autoComplete="off"
                  {...register ('name', {
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
                  render={({field: {onChange, onBlur, value, ref}}) => (
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
                            ref (e)
                            inputRef (e)
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
            <InputField
              label="Email"
              name="email"
              register={register}
              rules={{required: 'Поле обязательно к заполнению'}}
              placeholder="Введите email"
              error={errors?.email}
            />
            {/*  */}

            {/*  */}
            {hasRole ('admin') && (
              <div className="flex gap-4 mb-2">
                <div className="grid w-full">
                  <Label className="text-sm	text-white pb-1 gap-1 flex items-center">
                    <Monitor/> Preroll<span className="text-red-500 ml-0.5">*</span>
                  </Label>
                  <Input
                    type="text"
                    autoComplete="off"
                    {...register ('cpm_preroll', {
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
                    <Monitor/> Preroll
                    <div className="rounded-[6px] px-1 pb-0 h-auto text-[15px] bg-[#606afc] inline">
                      uz
                    </div>
                    <span className="text-red-500 ml-0.5">*</span>
                  </Label>
                  <Input
                    type="text"
                    autoComplete="off"
                    {...register ('cpm_preroll_uz', {
                      required: 'Поле обезательно к заполнению',
                    })}
                    placeholder={'Введите cpm'}
                    className={`border ${
                      errors?.cpm_preroll_uz ? 'border-red-500' : 'border-gray-300'
                    }   transition-all duration-300 text-sm `}
                  />
                </div>
              </div>
            )}
            {/**/}


            {/**/}
            {hasRole ('admin') && (
              <div className="flex gap-4 mb-2">
                <div className="grid w-full">
                  <Label className="text-sm	text-white pb-1 flex items-center gap-1">
                    <MonitorPlay/> TV Preroll<span className="text-red-500 ml-0.5">*</span>
                  </Label>
                  <Input
                    type="text"
                    autoComplete="off"
                    {...register ('cpm_tv_preroll', {
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
                    <MonitorPlay/> TV Preroll <div
                    className="rounded-[6px] px-1 pb-0 h-auto text-[15px] bg-[#606afc] inline">
                    uz
                  </div><span className="text-red-500 ml-0.5">*</span>
                  </Label>
                  <Input
                    type="text"
                    autoComplete="off"
                    {...register ('cpm_tv_preroll_uz', {
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
              </div>
            )}
            {/**/}

            {/**/}
            {hasRole ('admin') && (
              <div className="flex gap-4 mb-2">
                <div className="grid w-full">
                  <Label className="text-sm	text-white pb-1 flex items-center gap-1">
                    <MonitorUp/> Top Preroll<span className="text-red-500 ml-0.5">*</span>
                  </Label>
                  <Input
                    type="text"
                    autoComplete="off"
                    {...register ('cpm_top_preroll', {
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
                    <MonitorUp/> Top Preroll <div
                    className="rounded-[6px] px-1 pb-0 h-auto text-[15px] bg-[#606afc] inline">
                    uz
                  </div><span className="text-red-500 ml-0.5">*</span>
                  </Label>
                  <Input
                    type="text"
                    autoComplete="off"
                    {...register ('cpm_top_preroll_uz', {
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

            {/**/}
            <div className="grid  mb-2">
              <Label className="text-sm	text-white pb-1">
                Выбрать рекламное агенство
                <span className="text-red-500 ml-0.5">*</span>
              </Label>
              <Controller
                name="agency"
                control={control}
                defaultValue=""
                render={({field}) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <SelectTrigger className="!text-white">
                      <SelectValue placeholder="Выбрать рекламное агенство"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Выбрать рекламное агенство</SelectLabel>
                        {advertiserAgency?.results?.map ((adv) => (
                            <SelectItem key={adv.id} value={adv.id.toString ()}>
                              {adv.name}
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            {/*LOGO*/}
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
              {selectedFile && <p className='text-sm text-white'>Вы выбрали файл:{truncate(selectedFile.name, 20)} </p>}
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
                            {nameWatch}

                          </TableCell>

                        </TableRow>
                      </TableBody>
                    </PopoverContent>
                  </Popover>
                )}

              </div>

            </div>
{/*LOGO*/}

            <Button
              type='submit'
              className={`${
                isValid
                  ? 'bg-[#2A85FF66] hover:bg-[#0265EA] border-2 border-[#0265EA] hover:border-[#0265EA]'
                  : 'bg-[#616161]'
              } w-full   h-[44px] text-white rounded-2xl	mt-8`}
              disabled={!isValid || isLogin}
            >
              {isLogin && <Loader2 className="ml-2 h-6 w-6 animate-spin"/>}
              Создать
            </Button>
          </div>
        </form>
      </DialogContent>
    </>
  )
}
