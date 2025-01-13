import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import 'react-datepicker/dist/react-datepicker.css'
import { toast } from 'react-hot-toast'
import {
  editAdvertiserAgency,
  fetchAdvertiserAgency,
} from '@/redux/AgencySlice/advertiserAgency/advertiserAgencySlice.js'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.jsx'
import MaskedInput from 'react-text-mask'
import { Label } from '@/components/ui/label.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Button } from '@/components/ui/button.jsx'
export default function EditAdvertiserAgencyModal({ currentOrder, onClose }) {

  const dispatch = useDispatch()
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    control,
  } = useForm({
    defaultValues: {
      name: currentOrder.name,
      email: currentOrder.email,
      phone_number: currentOrder.phone_number,
      commission_rate: currentOrder.commission_rate,
    },
    mode: 'onChange',
  })

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(
        editAdvertiserAgency({ id: currentOrder.id, data }),
      )
      toast.success('Изминения успешно обновлены!')
      onClose()
      setTimeout(() => {
        dispatch(fetchAdvertiserAgency())
      }, 1000)
    } catch (error) {
      toast.error(error?.data?.error?.message)
    }
  }

  return (
    <DialogContent
      className="w-[450px] p-4"
      onInteractOutside={(e) => {
        e.preventDefault()
      }}
    >
      <DialogHeader>
        <DialogTitle className="text-lg	font-medium	text-white border-b border-[#F9F9F926] pb-4">
          Редактировать рекламодателя
        </DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="flex gap-4 mb-4">
            <div className="grid w-full">
              <Label className="text-sm	text-white pb-1">
                Название компании<span className="text-red-500 ml-0.5">*</span>
              </Label>
              <Controller
                name="name"
                control={control}
                rules={{ required: 'Поле обязательно к заполнению' }}
                defaultValue=""
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <Input
                    type="text"
                    value={value}
                    onChange={(e) => {
                      onChange(e.target.value) // Используем e.target.value
                    }}
                    onBlur={onBlur}
                    name={name}
                    ref={ref}
                    autoComplete="off"
                    className={`border ${
                      errors?.name ? 'border-red-500' : 'border-gray-300'
                    } transition-all duration-300 text-sm text-white`}
                    placeholder={'Введите название компании'}
                  />
                )}
              />
            </div>
            <div className="grid w-full">
              <Label className="text-sm	text-white pb-1">
                Номер телефона<span className="text-red-500 ml-0.5">*</span>
              </Label>
              <Controller
                name="phone_number"
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
                          errors?.phone_number
                            ? 'border-red-500'
                            : 'border-gray-300'
                        } transition-all duration-300 text-sm `}
                      />
                    )}
                  />
                )}
              />
            </div>
          </div>
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
              <Label className="text-sm	text-white pb-2 flex gap-0.5">
                Комиссия<span className="text-red-500 ml-0.5">*</span>
                <div className="text-sm	text-red-500 ">
                  {' '}
                  {errors?.email && <p>{errors.email.message}</p>}
                </div>
              </Label>
              <Input
                type="number"
                autoComplete="off"
                {...register('commission_rate', {
                  required: '.',
                })}
                placeholder={'Введите комиссию'}
                className={`border ${
                  errors?.commission_rate ? 'border-red-500' : 'border-gray-300'
                }   transition-all duration-300 text-sm `}
              />
            </div>
          </div>
        </div>

        <Button
          className={`${
            isValid
              ? 'bg-[#2A85FF66] hover:bg-[#0265EA] border-2 border-[#0265EA] hover:border-[#0265EA]'
              : 'bg-[#616161]'
          } w-full   h-[44px] text-white rounded-lg	mt-8`}
          disabled={!isValid}
        >
          Сохранить
        </Button>
      </form>
    </DialogContent>
  )
}
