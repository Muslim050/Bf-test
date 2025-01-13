import React from 'react'
import { TableCell, TableRow } from '@/components/ui/table'
import ModalSentOrder from './ModalSentOrder'
import OpenTableSentOrder from '../OpenTableSentOrder/OpenTableSentOrder'
import { formatDate } from '../../../../utils/formatterDate'
import FormatterView from '@/components/Labrery/formatter/FormatterView.jsx'
import AdvertStatus from '@/components/Labrery/AdvertStatus/AdvertStatus.jsx'
import { ThemeContext } from '@/utils/ThemeContext.jsx'
import {  OpenSvg } from '@/assets/icons-ui.jsx'
import { MessageSquareText } from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover.jsx'
import { Button } from '@/components/ui/button.jsx'
import {Copy, Monitor, MonitorPlay, MonitorUp} from 'lucide-react'
import backendURL from '@/utils/url'

import { PackagePlus } from 'lucide-react'
import { hasRole } from '../../../../utils/roleUtils'
import toast from 'react-hot-toast'
import CircularTable from "@/components/Labrery/Circular/CircularTable.jsx";


function SentOrderList({ listsentPublisher }) {
  const { textColor } = React.useContext(ThemeContext)
  const [expandedRows, setExpandedRows] = React.useState('')
  const [currentOrder, setCurrentOrder] = React.useState(null)

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(currentOrder.notes)
      .then(() => {
        toast.success('Комментарий скопирован в буфер обмена', {
          duration: 3000,
        })
      })
      .catch((err) => {
        toast.error('Не удалось скопировать комментарий', {
          duration: 3000,
        })
      })
  }

  const handleRowClick = (id) => {
    setExpandedRows(id === expandedRows ? false : id)
  }
  // Модальное окно Index
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
  // Модальное окно Index

  return (
    <>
      {listsentPublisher.results.map((item, i) => (

        <>

          <TableRow className="relative">
            <TableCell
              data-label="ID"
              className={`font-normal text-${textColor} text-sm `}
            >
              <div className='flex justify-between'>
                {item.order_status === 'in_review' ? (
                  // <CircularTable/>
                  <>
                  <span className=" h-5 w-2.5 flex">

                      <span
                        className=" inline-flex rounded-full h-5 w-2.5 bg-[#05c800] text-[14px] items-center justify-center"></span>
                    </span>
                  </>
                ) : null}
                {i + 1}
                <div style={{display: 'flex', justifyContent: "space-between" }}>
                  {item.order_status === 'in_review' ? null : <>
                    {item.inventory_count ? null : <span className=" h-5 w-2.5">

                      <span
                        className="relative inline-flex rounded-full h-5 w-2.5 bg-red-500 text-[14px] items-center justify-center"></span>
                    </span>}
                  </>}
                </div>
              </div>

            </TableCell>
            <TableCell
              data-label="Кампания"
              className={`font-normal text-${textColor} text-sm `}
            >
              <div className='relative'>
                <div className='absolute -left-10'>

                </div>
                {item.order_name}
              </div>
            </TableCell>
            <TableCell
              data-label="Формат"
              className={`font-normal text-${textColor} text-sm `}
            >
              <div className='flex items-center gap-1'>
                {
                  (item.format === 'preroll' && <Monitor/>) ||
                  (item.format === 'top_preroll' && <MonitorUp/>) ||
                  (item.format === 'tv_preroll' && <MonitorPlay/>)
                }
                {
                  (item.format === 'preroll' && 'Pre-roll') ||
                  (item.format === 'mixroll' && 'Mid-roll') ||
                  (item.format === 'midroll1' && 'Mid-roll 1') ||
                  (item.format === 'midroll2' && 'Mid-roll 2') ||
                  (item.format === 'midroll3' && 'Mid-roll 3') ||
                  (item.format === 'midroll4' && 'Mid-roll 4') ||
                  (item.format === 'top_preroll' && 'Top Pre-roll') ||
                  (item.format === 'tv_preroll' && 'TV Pre-roll')}


              </div>

            </TableCell>
            <TableCell
              data-label="Начало"
              className={`font-normal text-${textColor} text-sm `}
            >
              {formatDate (item.start_date)}
            </TableCell>
            <TableCell
              data-label="Конец"
              className={`font-normal text-${textColor} text-sm `}
            >
              {formatDate (item.end_date)}
            </TableCell>
            <TableCell
              data-label="Ролик"
              className={`font-normal text-${textColor} text-sm `}
            >
              <a
                href={`${backendURL}/media/${item.promo_file}`}
                target="_blank"
                className='text-[#A7CCFF] underline hover:text-[#3e8bf4]"'
                rel="noreferrer"
              >
                Видео
              </a>
            </TableCell>
            <TableCell
              data-label="План показов"
              className={`font-normal text-${textColor} text-sm `}
            >
              <FormatterView data={item.ordered_number_of_views} />
            </TableCell>
            <TableCell
              data-label="Статус"
              className={`font-normal text-${textColor} text-sm `}
            >
              <AdvertStatus
                status={item.order_status}
                endDate={item.order_actual_end_date}
              />
            </TableCell>
            <TableCell
              data-label="Действия"
              style={{ position: 'relative', display: 'flex', gap: '10px' }}
            >
              <button
                onClick={() => handleRowClick(item.id)}
                className="relative hover:scale-125 transition-all"
              >
                <OpenSvg
                  className={`hover:text-brandPrimary-1 transition-all ease-in-out 
                  ${ item.order_status === 'in_review' ? null : item.inventory_count ? null : 'text-red-500'}
                  ${
                    expandedRows === item.id
                      ? 'rotate-90 text-brandPrimary-1 scale-125'
                      : 'rotate-0'
                  }`}
                />

                {
                  <>
                    {
                      item.order_status === 'in_review' ? null : <div className='absolute top-1.5 -left-1'>
                        {item.inventory_count ? null : <span className="relative flex h-3 w-3">
                      <span
                        className="animate-ping absolute  inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                      <span
                        className="relative inline-flex rounded-full h-3 w-3 bg-red-500 text-[14px] items-center justify-center"></span>
                    </span>}
                      </div>}</>
                  }

                  </button>
                {item.order_status === 'finished' ? null : (
                  <TableCell style={{display: 'contents'}}>
                {item?.notes_text ? (
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        onClick={() => {
                          setCurrentOrder (item)
                        }}
                        className="hover:scale-125 transition-all p-0"
                      >
                          <MessageSquareText className="w-[24px] h-[24px] text-white hover:text-green-500" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full  bg-white bg-opacity-30 backdrop-blur-md rounded-xl">
                        <div className="grid gap-4 ">
                          <div className="w-80">
                            <h4 className="pb-4 font-medium leading-none text-white border-b-[#F9F9F926] border-b">
                              Комментарий
                            </h4>
                            <p className="text-sm text-white break-words pt-4">
                              {item.notes_text}
                            </p>
                            <p className="text-sm text-white break-words pt-4">
                              {item.notes_url}
                            </p>
                            <div className="flex mt-10 float-right">
                              <Button
                                variant="link"
                                className="text-black hover:text-[#2A85FF] "
                                onClick={copyToClipboard}
                              >
                                <Copy />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  ) : null}
                </TableCell>
              )}

              {item.order_status === 'in_progress' ||
              item.order_status === 'finished' ? null : (
                <Popover isOpen={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                  <PopoverTrigger asChild>
                    <button
                      onClick={() => setIsPopoverOpen(true)}
                      className="hover:scale-125 transition-all relative"
                    >
                      <PackagePlus className="hover:text-orange-500" />
                      {hasRole('channel') || hasRole('publisher') ? (
                        <div className="absolute top-0 right-0">
                          {item.order_status === 'in_review' ||
                          item.order_status === 'confirmed' ? (
                            <span className="relative flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                          ) : null}
                        </div>
                      ) : null}
                    </button>
                  </PopoverTrigger>
                  {isPopoverOpen && (
                    <PopoverContent
                      side="left"
                      align="start"
                      className="w-[400px] bg-white bg-opacity-30 backdrop-blur-md rounded-xl"
                    >
                      <ModalSentOrder
                        setIsPopoverOpen={setIsPopoverOpen}
                        item={item}
                      />
                    </PopoverContent>
                  )}
                </Popover>
              )}
            </TableCell>
          </TableRow>

          {expandedRows === item.id && (
            <TableRow>
              <TableCell
                colSpan="10"
                className="p-3 rounded-[22px]	border_container bg-white bg-opacity-30 backdrop-blur-md"
              >
                <OpenTableSentOrder item={item} />
              </TableCell>
            </TableRow>
          )}
        </>
      ))}
    </>
  )
}

export default SentOrderList
