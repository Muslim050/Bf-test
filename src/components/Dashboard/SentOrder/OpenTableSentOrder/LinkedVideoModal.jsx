import { useDispatch } from 'react-redux'
import { inventoryPublish } from '../../../../redux/inventory/inventorySlice.js'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Paperclip } from 'lucide-react'
import TooltipWrapper from '@/shared/TooltipWrapper.jsx'
import React from 'react'

//Модальное окно прикрпление ссылки
export default function LinkedVideoModal({ selectedId, onClose, setOpen }) {
  console.log(selectedId)
  const dispatch = useDispatch()
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      selectedId,
      linkvideo: '',
    },
    mode: 'onChange',
  })

  const onSubmit = async (data) => {
    try {
      const videoLinkResponse = await dispatch(
        inventoryPublish({ data }),
      ).unwrap()
      toast.success('Видео успешно прикреплено !')
      setOpen(false)
      setTimeout(() => {
        window.location.reload()
      }, 1500)
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
            Прикрепить ссылку
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between items-end gap-2 w-full">
            <div className="w-full">
              <Label className="text-sm	text-white pb-2 flex gap-0.5">
                Ссылка на Видео<span className="text-red-500 ml-0.5">*</span>
                <div className="text-sm	text-red-500 ">
                  {errors?.email && <p>{errors.email.message}</p>}
                </div>
              </Label>
              <Input
                className={`border ${
                  errors?.email ? 'border-red-500' : 'border-gray-300'
                }   transition-all duration-300 text-sm `}
                type="text"
                placeholder="Прикрепите ссылку на видео"
                autoComplete="off"
                {...register('linkvideo', {
                  required: 'Поле обезательно к заполнению',
                })}
              />
            </div>

            <div>
              <TooltipWrapper tooltipContent="Прикрепить">
                <Button
                  isValid={true}
                  className="h-[40px]"
                  variant="default"
                  disabled={!isValid}
                >
                  <Paperclip />
                </Button>
              </TooltipWrapper>
            </div>
          </div>
        </form>
      </DialogContent>
    </>
  )
}
