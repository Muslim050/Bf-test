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
import {
  Check,
  ChevronsUpDown,
  Eye,
  EyeOff,
  Loader2,
  PackageCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { addPublisherUsers } from '@/redux/publisherUsers/publisherUsersSlice.js'
import { fetchPublisher } from '@/redux/publisher/publisherSlice.js'
import TooltipWrapper from '@/shared/TooltipWrapper.jsx'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover.jsx'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command.jsx'
import { cn } from '@/lib/utils.js'

export default function PublisherModalUsers({ onClose, modalUser }) {
  const dispatch = useDispatch()
  const [showPasswordOld, setShowPasswordOld] = React.useState(false)
  const { publisher } = useSelector((state) => state.publisher)
  const [isChannelCreated, setIsChannelCreated] = React.useState(false)

  React.useEffect(() => {
    if (modalUser) {
      // isModalOpen — состояние, контролирующее открытие модального окна

      dispatch(fetchPublisher({ page: 1, pageSize: 200 }))
    }
  }, [modalUser, dispatch])
  const [open, setOpen] = React.useState(false)

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
      setIsChannelCreated(true)

      const publisher = await dispatch(addPublisherUsers({ data })).unwrap() // Попытка выполнить запрос
      toast.success('Пользователь паблишера успешно создан!') // Успех
      onClose() // Закрыть модальное окно
      setTimeout(() => {
        window.location.reload() // Перезагрузка страницы
      }, 1500)
    } catch (error) {
      setIsChannelCreated(false)
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
              {/*<div className="grid w-full">*/}
              {/*  <Label className="text-sm	text-white pb-2">*/}
              {/*    Выбрать паблишера*/}
              {/*    <span className="text-red-500 ml-0.5">*</span>*/}
              {/*  </Label>*/}
              {/*  <Controller*/}
              {/*    name="selectedAdvertiserId"*/}
              {/*    {...register('publisher', {*/}
              {/*      required: 'Поле обязательно',*/}
              {/*    })}*/}
              {/*    control={control}*/}
              {/*    defaultValue=""*/}
              {/*    render={({ field }) => (*/}
              {/*      <Select*/}
              {/*        onValueChange={field.onChange}*/}
              {/*        defaultValue={field.value}*/}
              {/*        value={field.value}*/}
              {/*      >*/}
              {/*        <SelectTrigger className="!text-white">*/}
              {/*          <SelectValue placeholder="Выбрать паблишера" />*/}
              {/*        </SelectTrigger>*/}
              {/*        <SelectContent>*/}
              {/*          <SelectGroup>*/}
              {/*            <SelectLabel>Выбрать Паблишера</SelectLabel>*/}
              {/*            {publisher?.results?.map((adv) => (*/}
              {/*              <SelectItem key={adv.id} value={adv.id.toString()}>*/}
              {/*                {adv.name}*/}
              {/*              </SelectItem>*/}
              {/*            ))}*/}
              {/*          </SelectGroup>*/}
              {/*        </SelectContent>*/}
              {/*      </Select>*/}
              {/*    )}*/}
              {/*  />*/}
              {/*</div>*/}
              <div className="grid w-full ">
                <Label className="text-sm text-[var(--text)] pb-2">
                  Выбрать паблишера
                  <span className="text-red-500 ml-0.5">*</span>
                </Label>

                <Controller
                  name="publisher"
                  control={control}
                  rules={{ required: 'Поле обязательно' }}
                  render={({ field }) => {
                    const selected = publisher?.results?.find(
                      (framework) => framework.id === field.value,
                    )
                    return (
                      <Popover open={open} onOpenChange={setOpen} modal={true}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="combobox"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full border-0 h-[40px] hover:scale-100 justify-between text-white"
                          >
                            {selected ? selected.name : 'Выбрать паблишера'}
                            <ChevronsUpDown className="opacity-50 size-5" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-white bg-opacity-30 backdrop-blur-md">
                          <Command>
                            <CommandInput
                              placeholder="Поиск паблишера..."
                              className="h-9"
                            />
                            <CommandList style={{ minHeight: 0 }}>
                              <CommandEmpty>Ничего не найдено</CommandEmpty>
                              <CommandGroup>
                                {publisher?.results?.map((framework) => (
                                  <CommandItem
                                    key={framework.id}
                                    value={framework?.id} // должен быть .value, а не .id
                                    onSelect={() => {
                                      field.onChange(framework.id)
                                      setOpen(false)
                                    }}
                                  >
                                    <div className="flex items-center justify-between pr-3 w-full">
                                      <div className="relative ">
                                        {framework.name}
                                      </div>
                                    </div>
                                    {/*{framework.label}*/}
                                    <Check
                                      className={cn(
                                        'ml-auto',
                                        field.value === framework.id
                                          ? 'opacity-100'
                                          : 'opacity-0',
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    )
                  }}
                />
              </div>

              <div>
                <div>
                  <TooltipWrapper tooltipContent="Создать">
                    <Button
                      isValid={true}
                      variant="default"
                      disabled={!isValid || isChannelCreated}
                      className="h-[40px]"
                    >
                      {isChannelCreated ? (
                        <>
                          <span>Создание...</span>
                          <Loader2 className="ml-2 h-6 w-6 animate-spin" />
                        </>
                      ) : (
                        <div className="flex items-center gap-1">
                          {isValid && 'Создать'}
                          <PackageCheck />
                        </div>
                      )}
                    </Button>
                  </TooltipWrapper>
                </div>
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </>
  )
}
