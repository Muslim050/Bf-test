import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {addAdvertiser, fetchAdvertiser} from '@/redux/advertiser/advertiserSlice.js'
import { useForm, Controller } from 'react-hook-form'
import backendURL from '@/utils/url.js'
import MaskedInput from 'react-text-mask'
import { Loader2 } from 'lucide-react'
import { Monitor, MonitorPlay, MonitorUp } from 'lucide-react';

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
import InputField
  from "@/components/Dashboard/Advertiser/AdvertiserUtilizer/modal/AdvertiserModal/components/InputField.jsx";
import axiosInstance from "@/api/api.js";

export default function AdvertiserModal({ onClose }) {
  const [isLogin, setIsLogin] = React.useState(false)
  const { advertisers } = useSelector((state) => state.advertiser);
  const [setCpm] = React.useState([])
  const dispatch = useDispatch()
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
    dispatch(fetchAdvertiser({
      page: 1, // API использует нумерацию с 1
      pageSize: 100,
    }))
  }, [dispatch])
  React.useEffect(() => {
    fetchCpm()
  }, [])

  const onSubmit = async (data) => {
    try {
      setIsLogin(true)
      const adv = await dispatch(addAdvertiser({ data })).unwrap()
      toast.success('Пользователь рекламодателя успешно создан!')
      onClose()

      setTimeout(() => {
        window.location.reload()
      }, 1500)
      setIsLogin(false)
    } catch (error) {
      setIsLogin(false)
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
            Cоздать рекламодателя
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            {/**/}
            <div className="flex gap-4 mb-4">
              <div className="grid w-full">
                <Label className="text-sm	text-white pb-2">
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
                <Label className="text-sm	text-white pb-2">
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
            <InputField
              label="Email"
              name="email"
              register={register}
              rules={{ required: 'Поле обязательно к заполнению' }}
              placeholder="Введите email"
              error={errors?.email}
            />
            {/*  */}

            {/*  */}
            {hasRole('admin') && (
              <div className="flex gap-4 mb-4">
                <div className="grid w-full">
                  <Label className="text-sm	text-white pb-2 gap-1 flex items-center">
                    <Monitor/> Preroll<span className="text-red-500 ml-0.5">*</span>
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
                  <Label className="text-sm	text-white pb-2 flex items-center gap-1">
                    <Monitor/> Preroll
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
                      errors?.cpm_mixroll ? 'border-red-500' : 'border-gray-300'
                    }   transition-all duration-300 text-sm `}
                  />
                </div>
              </div>
            )}
            {/**/}



            {/**/}
            {hasRole('admin') && (
              <div className="flex gap-4 mb-4">
                <div className="grid w-full">
                  <Label className="text-sm	text-white pb-2 flex items-center gap-1">
                    <MonitorPlay/> TV Preroll<span className="text-red-500 ml-0.5">*</span>
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
                  <Label className="text-sm	text-white pb-2 flex items-center gap-1">
                    <MonitorPlay/> TV Preroll <div className="rounded-[6px] px-1 pb-0 h-auto text-[15px] bg-[#606afc] inline">
                    uz
                  </div><span className="text-red-500 ml-0.5">*</span>
                  </Label>
                  <Input
                    type="text"
                    autoComplete="off"
                    {...register('cpm_tv_preroll_uz', {
                      required: 'Поле обязательно к заполнению',
                    })}
                    placeholder="Введите cpm"
                    className={`border ${
                      errors?.cpm_mixroll_uz
                        ? 'border-red-500'
                        : 'border-gray-300'
                    } transition-all duration-300 text-sm`}
                  />
                </div>
              </div>
            )}
            {/**/}

            {/**/}
            {hasRole('admin') && (
              <div className="flex gap-4 mb-4">
                <div className="grid w-full">
                  <Label className="text-sm	text-white pb-2 flex items-center gap-1">
                    <MonitorUp/> Top Preroll<span className="text-red-500 ml-0.5">*</span>
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

                <div className="grid w-full">
                  <Label className="text-sm	text-white pb-2 flex items-center gap-1">
                    <MonitorUp/> Top Preroll <div className="rounded-[6px] px-1 pb-0 h-auto text-[15px] bg-[#606afc] inline">
                    uz
                  </div><span className="text-red-500 ml-0.5">*</span>
                  </Label>
                  <Input
                    type="text"
                    autoComplete="off"
                    {...register('cpm_top_preroll_uz', {
                      required: 'Поле обязательно к заполнению',
                    })}
                    placeholder="Введите cpm"
                    className={`border ${
                      errors?.cpm_mixroll_uz
                        ? 'border-red-500'
                        : 'border-gray-300'
                    } transition-all duration-300 text-sm`}
                  />
                </div>
              </div>
            )}
            {/**/}

            {/**/}
            <div className="grid">
              <Label className="text-sm	text-white pb-2">
                Выбрать рекламное агенство
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
                      <SelectValue placeholder="Выбрать рекламное агенство" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Выбрать рекламное агенство</SelectLabel>
                        {advertisers?.results
                          .map((adv) => (
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
            {/**/}
            <Button
              className={`${
                isValid
                  ? 'bg-[#2A85FF66] hover:bg-[#0265EA] border-2 border-[#0265EA] hover:border-[#0265EA]'
                  : 'bg-[#616161]'
              } w-full   h-[44px] text-white rounded-lg	mt-8`}
              disabled={!isValid || isLogin}
            >
              {isLogin && <Loader2 className="ml-2 h-6 w-6 animate-spin" />}
              Создать
            </Button>
          </div>
        </form>
      </DialogContent>
    </>
  )
}
