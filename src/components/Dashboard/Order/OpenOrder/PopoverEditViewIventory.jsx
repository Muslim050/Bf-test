import { Controller, useForm } from 'react-hook-form'
import React from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import backendURL from '@/utils/url.js'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Button } from '@/components/ui/button.jsx'
import Cookies from 'js-cookie'

const PopoverEditViewIventory = ({setOpenPopover,fetchGetOrder,item}) => {
  const {
    formState: { errors, isValid },
    handleSubmit,
    watch,
    control,
  } = useForm({
    defaultValues: {
      ordered_number_of_views: '',
    },
    mode: 'onChange',
  })

  const expectedView = watch('ordered_number_of_views')

  const onSubmit = async () => {
    const token = Cookies.get('token')

    try {
      const response = await axios.post(
        `${backendURL}/inventory/update-expected-views-count-view`,
        {inventory_id: item.original.id ,
          expected_number_of_views: expectedView },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      if (response.data) {
        toast.success('Данные успешно обновлены!')
        setOpenPopover(false); // Закрываем Popover
        await fetchGetOrder()
      }
    } catch (error) {
      toast.error(error?.data?.error?.message)
    }
  }

  return (
    <div>
      <div className="text-sm pb-2	text-white border-b border-[#ffffff63]">
        Редактировать показы
      </div>

      <div className="grid w-full relative mt-4">
        <Controller
          name="ordered_number_of_views"
          control={control}
          rules={{
            required: 'Поле обязательно к заполнению',
          }}
          defaultValue=""
          render={({ field: { onChange, onBlur, value, name, ref } }) => (
            <Input
              type="text"
              value={value.toLocaleString('en-US')}
              className={`border ${
                errors?.ordered_number_of_views
                  ? 'border-red-500'
                  : 'border-gray-300'
              } transition-all duration-300 text-sm `}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\D/g, '')
                const newValue = rawValue ? parseInt(rawValue, 10) : ''
                onChange(newValue)
              }}
              onBlur={onBlur}
              name={name}
              ref={ref}
              placeholder="Количество показов"
              autoComplete="off"
              step="1000"
            />
          )}
        />
      </div>

      <Button
        onClick={handleSubmit(onSubmit)}
        className={`${
          isValid
            ? 'bg-[#2A85FF66] hover:bg-[#0265EA] border-2 border-[#0265EA] hover:border-[#0265EA]'
            : 'bg-[#616161]'
        } w-full   h-[44px] text-white rounded-2xl	mt-4`}
        disabled={!isValid}
        isValid={true}
      >
        Обновить
      </Button>
    </div>
  )
}

export default PopoverEditViewIventory
