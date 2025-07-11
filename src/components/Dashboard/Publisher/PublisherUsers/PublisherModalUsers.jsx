import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import MaskedInput from 'react-text-mask'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Eye, EyeOff, PackagePlus } from 'lucide-react'
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
import { addPublisherUsers } from '@/redux/publisherUsers/publisherUsersSlice.js'
import { fetchPublisher } from '@/redux/publisher/publisherSlice.js'
import TooltipWrapper from '@/shared/TooltipWrapper.jsx'

export default function PublisherModalUsers({ onClose, modalUser }) {
  const dispatch = useDispatch()
  const [showPasswordOld, setShowPasswordOld] = React.useState(false)
  const { publisher } = useSelector((state) => state.publisher)
  React.useEffect(() => {
    if (modalUser) {
      // isModalOpen — состояние, контролирующее открытие модального окна

      dispatch(fetchPublisher({ page: 1, pageSize: 200 }))
    }
  }, [modalUser, dispatch])

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
      publisher: '',
    },
    mode: 'onChange',
  })

  const onSubmit = async (data) => {
    try {
      const publisher = await dispatch(addPublisherUsers({ data })).unwrap() // Попытка выполнить запрос
      toast.success('Пользователь паблишера успешно создан!') // Успех
      onClose() // Закрыть модальное окно
      setTimeout(() => {
        window.location.reload() // Перезагрузка страницы
      }, 1500)
    } catch (error) {
      console.error('Ошибка:', error) // Диагностируйте, что именно происходит
      toast.error(
        error?.data?.error?.message ||
          'Произошла ошибка при создании пользователя',
      ) // Покажите fallback сообщение
    }
  }

  const handleTogglePasswordOld = () => {
    setShowPasswordOld(!showPasswordOld)
  }

  return (
    <>
      <DialogContent
        aria-hidden={false} // Ensure aria-hidden is explicitly set to false
        className="w-[450px] p-4"
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
          <div className="flex flex-col gap-3">
            <div className="flex gap-4">
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
            <div className="flex gap-4">
              <div className="grid w-full">
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
            <div className="flex gap-4">
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
            </div>

            <div className="flex gap-2 items-end ">
              <div className="grid w-full">
                <Label className="text-sm	text-white pb-2">
                  Выбрать паблишера
                  <span className="text-red-500 ml-0.5">*</span>
                </Label>
                <Controller
                  name="selectedAdvertiserId"
                  {...register('publisher', {
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
                        <SelectValue placeholder="Выбрать паблишера" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Выбрать Паблишера</SelectLabel>
                          {publisher?.results?.map((adv) => (
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
              <div>
                <TooltipWrapper tooltipContent="Создать">
                  <Button
                    disabled={!isValid}
                    isValid={true}
                    variant="default"
                    className="h-[40px]"
                  >
                    <PackagePlus />
                  </Button>
                </TooltipWrapper>
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </>
  )
}
