import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TableBody, TableCell } from '@/components/ui/table.jsx'
import {Monitor, MonitorPlay, MonitorUp, Star, SquareCheckBig} from 'lucide-react'
import FormatterView from '@/components/Labrery/formatter/FormatterView.jsx'
import AdvertStatus from '@/components/Labrery/AdvertStatus/AdvertStatus.jsx'
// import Verify from '@/components/Dashboard/Order/BindingOrder/Verify/Verify.jsx'
import { ThemeContext } from '@/utils/ThemeContext.jsx'
import { SquareArrowOutUpRight } from 'lucide-react';
import { formatDate } from '@/utils/formatterDate.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Dialog } from '@/components/ui/dialog.jsx'
import Verify from '../modal/Verify/Verify.jsx'
import Cookies from 'js-cookie'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip.jsx'
import { truncate } from '../../../../../../utils/other.js'
function AddInventoryData({
  inventor,
  selectedRows,
  setSelectedRows,
  expandedRows,
  handleDeactivateInventory,
  onceOrder,
                            fetchGetOrder
}) {
  const dispatch = useDispatch()
  const [selectedInventoryId, setSelectedInventoryId] = React.useState('')
  const role = Cookies.get('role')

  const { showVerify } = useSelector((state) => state.modal)
  const [showModalSelectingVerify, setShowModalSelectingVerify] =
    React.useState(false)

  function handleRowClick(rowId) {
    if (selectedRows.includes(rowId)) {
      setSelectedRows(selectedRows.filter((id) => id !== rowId))
    } else {
      setSelectedRows([...selectedRows, rowId])
    }
  }

  const filteredVideoLink = inventor.find(
    (item) => item.id === selectedInventoryId,
  )
  const { textColor } = React.useContext(ThemeContext)

  // Модальное окно OrderModal
  const [open, setOpen] = React.useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  // Модальное окно OrderModal

  return (
    <>
      {open && (
        <Dialog open={open} onOpenChange={setOpen}>
          {' '}
          {open && (
            <Verify
              setShowModalSelectingVerify={setShowModalSelectingVerify}
              onInventoryVerify
              expandedRows={expandedRows}
              selectedInventoryId={selectedInventoryId}
              videoLink={filteredVideoLink}
              onClose={handleClose}
              onceOrder={onceOrder}
              fetchGetOrder={fetchGetOrder}
            />
          )}
        </Dialog>
      )}
      {inventor.map((advert, i) => (
        <>
          <TableBody
            key={i}
            onClick={() => handleRowClick(advert.id)}
            className={selectedRows.includes(advert.id) ? 'selected' : ''}
          >
            <TableCell
              data-label="№"
              className={`font-normal text-${textColor} text-sm `}
            >
              {i + 1}
            </TableCell>
            <TableCell
              data-label="Канал"
              className={`font-normal text-${textColor} text-sm `}
            >
              {advert.channel?.name}
            </TableCell>
            <TableCell
              data-label="Название Видео	"
              className={`font-normal text-${textColor} text-sm `}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>{truncate(advert.video_content?.name, 20)}</div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{advert.video_content?.name}</p>
                    <p>ID: {advert.video_content.id}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
            <TableCell
              data-label="Категория"
              className={`font-normal text-${textColor} text-sm `}
            >
              {advert.video_content?.category}
            </TableCell>

            <TableCell
              data-label="Формат"
              className={`text-blue-300 font-medium text-sm `}
            >

              <div className='flex items-center gap-1'>
                {
                  (advert.format === 'preroll' && <Monitor/>) ||
                  (advert.format === 'top_preroll' && <MonitorUp/>) ||
                  (advert.format === 'tv_preroll' && <MonitorPlay/>)
                }
                {
                  (advert.format === 'preroll' && 'Pre-roll') ||
                  (advert.format === 'preroll' && 'Pre-roll') ||
                  (advert.format === 'midroll1' && 'Mid-roll 1') ||
                  (advert.format === 'midroll2' && 'Mid-roll 2') ||
                  (advert.format === 'midroll3' && 'Mid-roll 3') ||
                  (advert.format === 'midroll4' && 'Mid-roll 4') ||
                  (advert.format === 'top_preroll' && 'Top Pre-roll') ||
                  (advert.format === 'tv_preroll' && 'TV Pre-roll')}


              </div>
            </TableCell>
            <TableCell
              data-label="Прогноз показов"
              className={`font-normal text-${textColor} text-sm `}
            >
              <FormatterView data={advert.expected_number_of_views}/>
            </TableCell>

            <TableCell
              data-label="Ссылка"
              className={`font-normal text-${textColor} text-sm `}
            >
              <a
                href={`${advert.video_content.link_to_video}&t=${advert.start_at}`}
                target="_blank"
                style={{
                  display: 'inline-flex',
                  gap: '4px',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor:
                    advert.verified_link_with_timecode === null
                      ? 'not-allowed'
                      : 'pointer',
                }}
                className={`underline ${
                  advert.verified_link_with_timecode === null
                    ? ' text-gray-500'
                    : 'text-[#A7CCFF] hover:text-[#3282f1]'
                }`}
                onClick={(e) => {
                  if (advert.verified_link_with_timecode === null) {
                    e.preventDefault()
                  }
                }}
                rel="noreferrer"
              >
                Ссылка
                {advert.verified_link_with_timecode === null ? null : (
                  <SquareArrowOutUpRight className='size-4' />
                )}
              </a>
            </TableCell>

            <TableCell
              data-label="Время публикаций"
              className={`font-normal text-${textColor} text-sm `}
            >

              {
                formatDate(advert?.video_content?.publication_time)
              }
            </TableCell>

            {advert.online_views || advert.total_online_views ? (
              <TableCell data-label="Показы">
                <div
                  style={{
                    display: 'flex',
                    gap: '5px',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div
                    style={{
                      marginLeft: '2px',
                      fontSize: '15px',
                      background: `${
                        onceOrder.target_country ? '#606afc' : 'transparent'
                      }`,
                      padding: '0px 6px',
                      borderRadius: '10px',

                      color: `${onceOrder.target_country ? 'white' : 'white'}`,
                    }}
                  >
                    <FormatterView data={advert.online_views} />
                  </div>
                  {onceOrder.target_country && (
                    <FormatterView data={advert.total_online_views} />
                  )}
                </div>
              </TableCell>
            ) : (
              <TableCell>----</TableCell>
            )}
            {/* </TableCell> */}
            <TableCell
              data-label="Действия/Статус"
              className={`font-normal text-${textColor} text-sm `}
            >
              <div className="flex gap-2 items-center">
                {(role === 'admin' && advert.status === 'in_use') ||
                advert.status === 'inactive' ? (
                  <AdvertStatus
                    status={advert.status}
                    endDate={advert.deactivation_date}
                  />
                ) : (
                  <div style={{ width: 'fit-content' }}>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setOpen(true)
                        setSelectedInventoryId(() => advert.id)
                      }}
                      style={{ backdropFilter: 'blur(10.3049px)' }}
                      className="hover:scale-105 transition-all w-full h-auto px-2 py-1 hover:text-white rounded-lg flex items-center gap-1.5  bg-[#ffffff4d] hover:bg-violet-400 border border-transparent hover:border-violet-700"
                    >
                      <Star className="w-[20px] h-[20px] text-white" />
                      {advert.video_content.link_to_video ? (
                        <div className="bg-violet-500 w-4 h-4 rounded-full absolute -right-2 -top-2"></div>
                      ) : (
                        ''
                      )}
                      Проверить
                    </Button>
                  </div>
                )}

                {advert.status === 'in_use' ? (
                  <div>
                    <Button
                      onClick={() => handleDeactivateInventory(advert.id)}
                      style={{ backdropFilter: 'blur(10.3049px)' }}
                      className="hover:scale-105 transition-all w-full h-auto px-1.5 py-1 rounded-[12px] flex items-center gap-1.5  bg-[#ffffff4d] hover:bg-red-400 border border-transparent hover:border-red-500"
                    >
                      <SquareCheckBig className="w-[20px] h-[20px] text-white" />
                      Завершить
                    </Button>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </TableCell>
          </TableBody>
        </>
      ))}
    </>
  )
}

export default AddInventoryData
