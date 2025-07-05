import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { Controller, useForm } from 'react-hook-form'
import {
  addChannel,
  fetchChannel,
} from '../../../../redux/channel/channelSlice.js'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.jsx'
import MaskedInput from 'react-text-mask'
import {
  Check,
  ChevronsUpDown,
  Info,
  Loader2,
  PackageCheck,
  Send,
} from 'lucide-react'

import { Label } from '@/components/ui/label.jsx'
import { Input } from '@/components/ui/input.jsx'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@radix-ui/react-tooltip'
import { Button } from '@/components/ui/button.jsx'
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

export default function ChannelModal({ onClose }) {
  const dispatch = useDispatch()
  const { publisher } = useSelector((state) => state.publisher)
  const [isChannelCreated, setIsChannelCreated] = React.useState(false)

  React.useEffect(() => {
    dispatch(
      fetchPublisher({
        page: 1, // API использует нумерацию с 1
        pageSize: 200,
      }),
    )
  }, [])
  const [open, setOpen] = React.useState(false)

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    control,
  } = useForm({
    defaultValues: {
      publisher: '',
      name: '',
      email: '',
      phone: '',
      channelId: '',
      commission_rate: '',
      telegram_chat_id: '',
    },
    mode: 'onChange',
  })

  const onSubmit = async (data) => {
    try {
      setIsChannelCreated(true)
      const channel = await dispatch(addChannel({ data })).unwrap()
      toast.success('Канал успешно создан!')
      onClose()
      setTimeout(() => {
        dispatch(
          fetchChannel({
            page: 1,
            pageSize: 20,
          }),
        )
      }, 1000)
    } catch (error) {
      setIsChannelCreated(false)
      toast.error(
        error?.message || 'Произошла ошибка при создании рекламодателя',
      )
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
            Cоздать канал
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
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

              <div className="grid w-full">
                <Label className="text-sm	text-white pb-2">
                  Название канала<span className="text-red-500 ml-0.5">*</span>
                </Label>
                <Input
                  type="text"
                  autoComplete="off"
                  {...register('name', {
                    required: 'Поле обезательно к заполнению',
                  })}
                  placeholder={'Введите название канала'}
                  className={`border ${
                    errors?.name ? 'border-red-500' : 'border-gray-300'
                  }   transition-all duration-300 text-sm `}
                />
              </div>
            </div>
            {/**/}

            {/**/}
            <div className="flex gap-2">
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
              <div className="grid w-full ">
                <Label className="text-sm	text-white pb-2 flex gap-0.5">
                  Email
                  <span className="text-red-500 ml-0.5">*</span>
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
            </div>
            {/**/}

            <div className="flex gap-2 ">
              <div className="grid w-full ">
                <Label className="text-sm	text-white pb-2 text-nowrap	">
                  Процент комиссии
                  <span className="text-red-500 ml-0.5">*</span>
                </Label>
                <Input
                  type="number"
                  autoComplete="off"
                  {...register('commission_rate', {
                    required: 'Поле обезательно к заполнению',
                  })}
                  placeholder={'Введите комиссию'}
                  className={`border ${
                    errors?.commission_rate
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }   transition-all duration-300 text-sm `}
                />
              </div>
              <div className="grid w-full ">
                <Label className="text-sm	text-white pb-2 flex gap-0.5">
                  <div className="bg-blue-500 rounded-full inline-flex h-max">
                    <Send className="size-5  p-1" />
                  </div>
                  Telegram chat id
                  <span className="text-red-500 ml-0.5">*</span>
                  <div className="text-sm	text-red-500 ">
                    {' '}
                    {errors?.email && <p>{errors.email.message}</p>}
                  </div>
                </Label>
                <Input
                  type="text"
                  autoComplete="off"
                  {...register('telegram_chat_id', {})}
                  placeholder={'Введите telegram chat id'}
                  className={`border ${
                    errors?.email ? 'border-red-500' : 'border-gray-300'
                  }   transition-all duration-300 text-sm `}
                />
              </div>
            </div>
            <div className="flex items-end gap-2">
              <div className="grid w-full ">
                <Label className="text-sm	text-white pb-5 flex gap-0.5">
                  Сhannel Id
                  <span className="text-red-500 ml-0.5">*</span>
                  <div className="relative">
                    {errors?.channelId?.message && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="absolute top-0">
                            <span className="relative flex  h-5 w-5 cursor-pointer">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                              <Info className="text-red-500 hover:text-red-700 relative inline-flex rounded-full h-5 w-5 " />
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="bg-red-200 rounded-lg p-3 border-2 border-red-500">
                          <div className="text-red-500">
                            <p>1.Войдите в аккаунт YouTube</p>
                            <p>
                              2.Нажмите на фото профиля в правом верхнем углу
                              страницы Настройки
                            </p>
                            <p>3.В меню слева выберите Расширенные настройки</p>
                            <p>
                              4.Откроется страница с идентификаторами
                              пользователя и канала скопируйте 'Идентификатор
                              канала'
                            </p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                </Label>
                <Input
                  type="text"
                  autoComplete="off"
                  {...register('channelId', {
                    required: 'Поле обезательно к заполнению',
                    minLength: {
                      value: 10,
                      message:
                        "1.Войдите в аккаунт YouTube, 2.Нажмите на фото профиля в правом верхнем углу страницы Настройки, 3.В меню слева выберите Расширенные настройки, 4.Откроется страница с идентификаторами пользователя и канала скопируйте 'Идентификатор канала'.",
                    },
                  })}
                  placeholder="Введите channel Id"
                  className={`border ${
                    errors?.channelId ? 'border-red-500' : 'border-gray-300'
                  } transition-all duration-300 text-sm -mt-4`}
                />
              </div>
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

            {/**/}
          </div>
        </form>
      </DialogContent>
    </>
  )
}
