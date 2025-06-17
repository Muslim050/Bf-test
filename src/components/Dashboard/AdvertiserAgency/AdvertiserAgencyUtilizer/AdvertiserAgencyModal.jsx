import { useDispatch } from 'react-redux'
import { toast } from 'react-hot-toast'

import { Controller, useForm } from 'react-hook-form'
import {
  addAdvertiserAgency,
  fetchAdvertiserAgency,
} from '../../../../redux/AgencySlice/advertiserAgency/advertiserAgencySlice.js'
import MaskedInput from 'react-text-mask'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Button } from '@/components/ui/button.jsx'
import { PackagePlus } from 'lucide-react'
import TooltipWrapper from '@/shared/TooltipWrapper.jsx'

export default function AdvertiserAgencyModal({ onClose }) {
  const dispatch = useDispatch()
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    control,
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      commission_rate: '',
    },
    mode: 'onChange',
  })

  const onSubmit = async (data) => {
    try {
      const advertiserAgency = await dispatch(
        addAdvertiserAgency({ data }),
      ).unwrap()
      toast.success('Рекламное агентство успешно создано!')
      onClose()
      setTimeout(() => {
        dispatch(fetchAdvertiserAgency())
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
            Рекламное агентство
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
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
                  }   transition-all duration-300 text-sm text-white`}
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

            <div className="flex gap-4 ">
              <div className="grid w-1/2">
                <Label className="text-sm	text-white pb-2 flex gap-0.5">
                  Email<span className="text-red-500 ml-0.5">*</span>
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

              <div className="flex gap-2 items-end">
                <div className="grid w-full">
                  <Label className="text-sm	text-white pb-2 flex gap-0.5">
                    Комиссия<span className="text-red-500 ml-0.5">*</span>
                  </Label>
                  <Input
                    type="number"
                    autoComplete="off"
                    {...register('commission_rate', {
                      required: '.',
                    })}
                    placeholder={'Введите комиссию'}
                    className={`border ${
                      errors?.commission_rate
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }   transition-all duration-300 text-sm `}
                  />
                </div>
                <div>
                  <TooltipWrapper tooltipContent="Создать">
                    <Button
                      variant="default"
                      disabled={!isValid}
                      className="h-[40px]"
                    >
                      <PackagePlus />
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
