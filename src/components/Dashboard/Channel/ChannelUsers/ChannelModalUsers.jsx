import axios from 'axios'
import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { toast } from 'react-hot-toast'
import { Controller, useForm } from 'react-hook-form'
import MaskedInput from 'react-text-mask'
import { Button } from '@/components/ui/button.jsx'
import {
  addChannelUsers,
  fetchChannelUsers,
} from '../../../../redux/channelUsers/channelUsersSlice.js'
import { Eye, EyeOff } from 'lucide-react'
import backendURL from '@/utils/url.js'
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
import { SelectTrigger } from '@/components/ui/selectTrigger.jsx'
import {fetchChannel} from "@/redux/channel/channelSlice.js";
import {addPublisher, fetchPublisher} from "@/redux/publisher/publisherSlice.js";

export default function ChannelModalUsers({ onClose }) {
  const dispatch = useDispatch()
  const [showPasswordOld, setShowPasswordOld] = React.useState(false)
  const { channel } = useSelector((state) => state.channel)
  const handleTogglePasswordOld = () => {
    setShowPasswordOld(!showPasswordOld)
  }
  const [pagination, setPagination] = React.useState({
    pageIndex: 1, // Начинаем с 0
    pageSize: 200,
  });
  React.useEffect(() => {
   dispatch( fetchChannel({
     page: pagination.pageIndex, // API использует нумерацию с 1
     pageSize: pagination.pageSize,
   }))
  }, [pagination.pageIndex, pagination.pageSize])

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
      channel: '',
    },
    mode: 'onChange',
  })
  const onSubmit = async (data) => {
    try {
      const pubUser = await dispatch(addChannelUsers({ data })).unwrap()
      toast.success('Пользователь рекламодателя успешно создан!')
      onClose()
      setTimeout(() => {
        dispatch(fetchChannelUsers({
          page: 1, // API использует нумерацию с 1
          pageSize: 20,
        }))
      }, 1000)
    } catch (error) {
      toast.error(error?.data?.error?.message)
    }
  }

  return (
    <>
      <DialogContent
        className="sm:w-[450px] w-full p-4"
        onInteractOutside={(e) => {
          e.preventDefault()
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-lg	font-medium	text-white border-b border-[#F9F9F926] pb-4">
            Cоздать пользователя
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

            {/**/}
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
            {/**/}

            {/**/}
            <div className="flex gap-4 mb-4">
              <div className="grid w-full">
                <Label className="text-sm	text-white pb-2">
                  Логин<span className="text-red-500 ml-0.5">*</span>
                </Label>
                <Input
                  type="text"
                  autoComplete="off"
                  {...register('username', {
                    required: 'Поле обезательно к заполнению',
                  })}
                  placeholder={'Введите логин'}
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
            {/**/}

            {/**/}
            <div className="flex gap-4 ">
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
                  Выбрать канал<span className="text-red-500 ml-0.5">*</span>
                </Label>
                <Controller
                  name="channel"
                  {...register('channel', {
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
                        <SelectValue placeholder="Выбрать канал" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Выбрать канал</SelectLabel>
                          {channel.results.map((adv) => (
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
            {/**/}

            <Button
              className={`${
                isValid
                  ? 'bg-[#2A85FF66] hover:bg-[#0265EA] border-2 border-[#0265EA] hover:border-[#0265EA]'
                  : 'bg-[#616161]'
              } w-full   h-[44px] text-white rounded-lg	mt-8`}
              disabled={!isValid}
              isValid={true}
            >
              Создать
            </Button>
          </div>
        </form>
      </DialogContent>
    </>
  )
}
