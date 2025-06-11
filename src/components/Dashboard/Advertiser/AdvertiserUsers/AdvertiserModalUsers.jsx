import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { Controller, useForm } from 'react-hook-form'
import { addAdvertiserUsers } from '@/redux/advertiserUsers/advertiserUsersSlice.js'
import MaskedInput from 'react-text-mask'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
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
import { fetchAdvertiser } from '@/redux/advertiser/advertiserSlice.js'

export default function AdvertiserModalUsers({ onClose }) {
  const dispatch = useDispatch()
  const [showPasswordOld, setShowPasswordOld] = React.useState(false)
  const [isLogin, setIsLogin] = React.useState(false)
  const { advertisers } = useSelector((state) => state.advertiser)
  const handleTogglePasswordOld = () => {
    setShowPasswordOld(!showPasswordOld)
  }
  React.useEffect(() => {
    dispatch(
      fetchAdvertiser({
        page: 1, // API использует нумерацию с 1
        pageSize: 100,
      }),
    )
  }, [dispatch])

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    control,
  } = useForm({
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      username: '',
      phone: '',
      password: '',
      advertiser: '',
    },
    mode: 'onChange',
  })

  // const onSubmit = async () => {
  //   try {
  //     setIsLogin(true)
  //     const advertiser = await dispatch(addAdvertiserUsers({ data })).unwrap()
  //     console.log(advertiser)
  //     toast.success('Пользователь рекламодателя успешно создан!')
  //     onClose()
  //     setTimeout(() => {
  //       dispatch(fetchAdvertiserUsers())
  //     }, 1000)
  //     setIsLogin(false)
  //   } catch (error) {
  //     setIsLogin(false)
  //     toast.error(error?.data?.error?.message)
  //   }
  // }
  const onSubmit = async (data) => {
    setIsLogin(true)

    try {
      const result = await dispatch(addAdvertiserUsers({ data })).unwrap()

      // Успешный ответ
      toast.success('Пользователь рекламодателя успешно создан!')
      console.log('✅ Пользователь создан:', result)

      onClose()

      // Лучше использовать навигацию, чем window.location.reload()
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    } catch (error) {
      // Стандартизированное логирование
      console.error('❌ Ошибка при создании пользователя:', error)

      // Универсальный fallback + корректный разбор структуры ошибки
      const errorMessage =
        error?.data?.error?.message || // если rejectWithValue(error.response)
        error?.error?.message || // если rejectWithValue(error.response.data)
        'Произошла непредвиденная ошибка'

      toast.error(errorMessage)
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
            Создать пользователя
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="flex gap-4 mb-4">
              <div className="grid w-full">
                <Label className="text-sm	text-white pb-2">
                  Имя<span className="text-red-500 ml-0.5">*</span>
                </Label>
                <Input
                  type="text"
                  autoComplete="off"
                  {...register('firstname', {
                    required: 'Поле обезательно к заполнению',
                  })}
                  placeholder={'Введите имя'}
                  className={`border ${
                    errors?.firstname ? 'border-red-500' : 'border-gray-300'
                  }   transition-all duration-300 text-sm `}
                />
              </div>

              <div className="grid w-full">
                <Label className="text-sm	text-white pb-2">
                  Фамилия<span className="text-red-500 ml-0.5">*</span>
                </Label>
                <Input
                  type="text"
                  autoComplete="off"
                  {...register('lastname', {
                    required: 'Поле обезательно к заполнению',
                  })}
                  placeholder={'Введите фамилия'}
                  className={`border ${
                    errors?.lastname ? 'border-red-500' : 'border-gray-300'
                  }   transition-all duration-300 text-sm `}
                />
              </div>
            </div>

            <div className="grid w-full mb-4">
              <Label className="text-sm	text-white pb-2 flex gap-0.5">
                Email<span className="text-red-500 ml-0.5">*</span>
                <div className="text-sm	text-red-500 ">
                  {' '}
                  {errors?.email && <p>{errors.email.message}</p>}
                </div>
              </Label>
              <Input
                type="email"
                autoComplete="off"
                {...register('email', {
                  required: '.',
                })}
                placeholder={'Введите email'}
                className={`border ${
                  errors?.email ? 'border-red-500' : 'border-gray-300'
                }   transition-all duration-300 text-sm `}
              />
            </div>

            <div className="flex gap-4 mb-4">
              <div className="grid w-full">
                <Label className="text-sm	text-white pb-2">
                  UserName<span className="text-red-500 ml-0.5">*</span>
                </Label>
                <Input
                  type="text"
                  autoComplete="off"
                  {...register('username', {
                    required: 'Поле обезательно к заполнению',
                  })}
                  placeholder={'Введите userName'}
                  className={`border ${
                    errors?.username ? 'border-red-500' : 'border-gray-300'
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

            <div className="flex gap-4 mb-8">
              <div className="grid w-full relative">
                <Label className="text-sm	text-white pb-2">
                  Пароль<span className="text-red-500 ml-0.5">*</span>
                </Label>
                <Input
                  type={showPasswordOld ? 'text' : 'password'}
                  autoComplete="off"
                  {...register('password', {
                    required: 'Поле обезательно к заполнению',
                  })}
                  placeholder={'Введите пароль'}
                  className={`border ${
                    errors?.password ? 'border-red-500' : 'border-gray-300'
                  }   transition-all duration-300 text-sm text-white`}
                />
                <div
                  onClick={handleTogglePasswordOld}
                  className="absolute top-[53%] right-[10px] cursor-pointer"
                >
                  {showPasswordOld ? (
                    <Eye className="text-black w-5" />
                  ) : (
                    <EyeOff className="text-black w-5" />
                  )}
                </div>
              </div>
              <div className="grid w-full">
                <Label className="text-sm	text-white pb-2">
                  Выбрать агенство<span className="text-red-500 ml-0.5">*</span>
                </Label>
                <Controller
                  name="selectedAdvertiserId"
                  {...register('advertiser', {
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
                        <SelectValue placeholder="Выбрать рекламное агенство" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Выбрать рекламное агенство</SelectLabel>
                          {advertisers?.results.map((adv) => (
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

            <Button
              className={`${
                isValid
                  ? 'bg-[#2A85FF66] hover:bg-[#0265EA] border-2 border-[#0265EA] hover:border-[#0265EA]'
                  : 'bg-[#616161]'
              } w-full   h-[44px] text-white rounded-lg	mt-6`}
              disabled={!isValid || isLogin}
              isValid={true}
            >
              Создать
              {isLogin && <Loader2 className="ml-2 h-6 w-6 animate-spin" />}
            </Button>
          </div>
        </form>
      </DialogContent>
    </>
  )
}
