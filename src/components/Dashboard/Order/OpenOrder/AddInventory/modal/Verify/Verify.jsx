import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { inventoryVerify } from '@/redux/inventoryStatus/inventoryStatusSlice.js'
import { toast } from 'react-hot-toast'
import { fetchSingleOrder } from '@/redux/order/orderSlice.js'
import { ExternalLink, Paperclip } from 'lucide-react'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Button } from '@/components/ui/button.jsx'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip.jsx'
import { Link } from 'react-router-dom'

function Verify({
  expandedRows,
  selectedInventoryId,
  videoLink,
  onClose,
  onceOrder,
  fetchGetOrder,
}) {
  const dispatch = useDispatch()
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      linkvideo: '',
      inventory: selectedInventoryId,
      order: expandedRows,
    },
    mode: 'onChange',
  })

  const onSubmit = (data) => {
    const confirmVerify = window.confirm(
      'Данная ссылка будет прикреплена к данному инвентарю?',
    )
    if (confirmVerify) {
      dispatch(inventoryVerify({ data }))
        .then((response) => {
          // Проверка на наличие ошибки в ответе
          if (!response.error) {
            toast.success('Ссылка успешно прикреплена!')
            onClose()
            fetchGetOrder()
            dispatch(fetchSingleOrder(onceOrder.id))
          }
        })
        .catch((error) => {
          toast.error(error.message)
        })
    } else {
      toast.error('Попробуйте еще раз')
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
            Модерация рекламы
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-end gap-2">
          <Tooltip>
            <TooltipTrigger>
              {videoLink.video_content.link_to_video ? (
                <Link
                  to={`${videoLink.video_content.link_to_video}&t=${videoLink.start_at}`}
                  target="_blank"
                  className="bg-[#2A85FF] size-10 rounded-xl text-white hover:bg-[#2A85FF99] flex justify-center items-center "
                >
                  <ExternalLink className="size-6" />
                </Link>
              ) : (
                <Button disabled>
                  <ExternalLink />
                </Button>
              )}
            </TooltipTrigger>
            <TooltipContent>Ссылка на Видео для проверки</TooltipContent>
          </Tooltip>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="flex items-end gap-2">
              <div className="grid w-full">
                <Label className="text-sm	text-white">
                  Ссылка на Видео
                  <span className="text-red-500 ml-0.5">*</span>
                </Label>
                <Input
                  type="text"
                  placeholder="Ссылка на Видео"
                  autoComplete="off"
                  {...register('linkvideo', {
                    required: 'Поле обезательно к заполнению',
                  })}
                  className={`border ${
                    errors?.linkvideo ? 'border-red-500' : 'border-gray-300'
                  }   transition-all duration-300 text-sm `}
                />
              </div>

              <Tooltip>
                <TooltipTrigger>
                  <Button disabled={!isValid} variant="default" isValid={true}>
                    <Paperclip />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Прикрепить</TooltipContent>
              </Tooltip>
            </div>
          </form>
        </div>
      </DialogContent>
    </>
  )
}

export default Verify
