import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { inventoryVerify } from '@/redux/inventoryStatus/inventoryStatusSlice.js'
import { toast } from 'react-hot-toast'
import {fetchOrder, fetchSingleOrder} from '@/redux/order/orderSlice.js'

import style from './Verify.module.scss'
import {
  DialogHeader,
  DialogTitle,
  DialogContent,
} from '@/components/ui/dialog.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Button } from '@/components/ui/button.jsx'
function Verify({
  setShowModalSelectingVerify,
  expandedRows,
  selectedInventoryId,
  videoLink,
  onClose,
                  onceOrder,
                  fetchGetOrder
}) {
  const dispatch = useDispatch()
  console.log (videoLink)
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
            // setTimeout(() => {
            //   window.location.reload()
            // }, 1500)
            // fetchOrder()
            fetchGetOrder()
            dispatch(fetchSingleOrder(onceOrder.id));
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
        </DialogHeader>{' '}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modalWindow">
            <div style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <div className={style.modalWindow__label}>
                  Ссылка на Видео для проверки: &nbsp;
                </div>
                <div style={{ display: 'flex' }}>
                  <a
                    href={
                      videoLink.video_content.link_to_video === null
                        ? null
                        : `${videoLink.video_content.link_to_video}&t=${videoLink.start_at}`
                    }
                    target="_blank"
                    disabled={videoLink === null}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      cursor: videoLink === null ? 'not-allowed' : 'pointer',
                    }}
                    className={
                      videoLink === null
                        ? style.linkWrapper__dis
                        : style.linkWrapper__file
                    }
                    onClick={(e) => {
                      if (videoLink === null) {
                        e.preventDefault()
                      }
                    }}
                    rel="noreferrer"
                  >
                    Ссылка
                    {/*<Linkk*/}
                    {/*  style={{*/}
                    {/*    width: '18px',*/}
                    {/*    height: '18px',*/}
                    {/*    marginLeft: '5px',*/}
                    {/*  }}*/}
                    {/*/>*/}
                  </a>
                </div>
              </div>

              <div style={{ marginTop: '20px', marginBottom: '30px' }}>
                <div className="grid w-full">
                  <Label className="text-sm	text-white pb-2">
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
              </div>
            </div>

            <Button
              className={`${
                isValid
                  ? 'bg-[#2A85FF66] hover:bg-[#0265EA] border-2 border-[#0265EA] hover:border-[#0265EA]'
                  : 'bg-[#616161]'
              } w-full   h-[44px] text-white rounded-lg	`}
              disabled={!isValid}
              isValid={true}
            >
              Прикрепить
            </Button>
          </div>
        </form>
      </DialogContent>
    </>
  )
}

export default Verify
