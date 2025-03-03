import React from 'react'
import ModalSentOrder from '../receivedOrders/ModalSentOrder/index'
import OpenTableSentOrder from '../OpenTableSentOrder/OpenTableSentOrder'
import {TableCell, TableRow} from '@/components/ui/table'
import {formatDate} from '../../../../utils/formatterDate'
import FormatterView from '@/components/Labrery/formatter/FormatterView.jsx'
import AdvertStatus from '@/components/Labrery/AdvertStatus/AdvertStatus.jsx'
import {ThemeContext} from '@/utils/ThemeContext.jsx'
import {OpenSvg} from '@/assets/icons-ui.jsx'
import {Monitor, MonitorPlay, MonitorUp, SquareArrowOutUpRight} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.jsx";
import {truncate} from "@/utils/other.js";

function SentOrderList({ listsentPublisher }) {
  const [openPopoverIndex, setOpenPopoverIndex] = React.useState(null)
  const [expandedRows, setExpandedRows] = React.useState('')
  const [showKomment, setShowKomment] = React.useState(false)
  const [currentOrder, setCurrentOrder] = React.useState(null)
  const { textColor } = React.useContext(ThemeContext)

  const handleRowClick = (id) => {
    setExpandedRows(id === expandedRows ? false : id)

    // const item = listsentPublisher.find ((item) => item.id === id)
  }
  return (
    <>
      {/*<AnimatePresence>*/}
      {/*  {showKomment && (*/}
      {/*    <ModalUI>*/}
      {/*      <CommentSentOrderModal*/}
      {/*        setShowKomment={setShowKomment}*/}
      {/*        currentOrder={currentOrder}*/}
      {/*      />*/}
      {/*    </ModalUI>*/}
      {/*  )}*/}
      {/*</AnimatePresence>*/}
      {listsentPublisher.results.map((item, i) => (
        <>
          <TableRow>
            <TableCell
              data-label="ID"
              className={`font-normal text-${textColor} text-sm `}
            >
              {i + 1}
            </TableCell>
            <TableCell
              data-label="Кампания"
              className={`font-normal text-${textColor} text-sm `}
            >

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild className="cursor-pointer">
                    <a
                      target="_blank"
                      className={`no-underline text-[#A7CCFF] hover:text-[#3282f1] hover:underline flex gap-1`}
                      href={item.promo_file}>
                      {truncate(item.order_name, 20)}
                      <SquareArrowOutUpRight className='size-4'/>
                    </a>

                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.order_name}</p>
                    <p>ID:{item.id}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>


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
                  (item.format === 'preroll' && 'Pre-roll') ||
                  ('midroll1' && 'Mid-roll 1') ||
                  ('midroll2' && 'Mid-roll 2') ||
                  ('midroll3' && 'Mid-roll 3') ||
                  ('midroll4' && 'Mid-roll 4') ||
                  (item.format === 'top_preroll' && 'Top Pre-roll') ||
                  (item.format === 'tv_preroll' && 'TV Pre-roll')}
              </div>
            </TableCell>

            <TableCell
              data-label="Конец"
              className={`font-normal text-${textColor} text-sm `}
            >
              {formatDate (item.end_date)}
            </TableCell>

            <TableCell
              data-label="План показов	"
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
              {item.order_status === 'finished' ? null : (
                <td style={{ display: 'contents' }}>
                  {item?.notes_text ? (
                    <button
                      onClick={() => {
                        setShowKomment(true)
                        setCurrentOrder(item)
                      }}
                    >
                      Comment
                    </button>
                  ) : null}
                </td>
              )}
              {item.order_status === 'in_progress' ||
              item.order_status === 'finished' ? null : (
                <div
                  style={{
                    color: '#53545C',
                    borderRadius: '8px',
                    fontSize: '15px',
                    border: '1.5px solid #53545C',
                    padding: '6.5px 8px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                  }}
                  onClick={() => setOpenPopoverIndex(i)}
                >
                  Размещение
                  {openPopoverIndex === i && (
                    <div
                      style={{
                        width: '430px',
                        position: 'absolute',
                        zIndex: '10',
                        background: '#ffffff',
                        borderRadius: '12px',
                        border: '2px solid #cfcfd1',
                        left: '-50%',
                        padding: '12px',
                        boxShadow: 'black 0px 0px 15px -7px',
                      }}
                    >
                      <ModalSentOrder
                        setOpenPopoverIndex={setOpenPopoverIndex}
                        item={item}
                      />
                    </div>
                  )}
                </div>
              )}

              <button onClick={() => handleRowClick(item.id)}>
                <OpenSvg className={`hover:text-brandPrimary-1 transition-all ease-in-out 
                  ${
                  expandedRows === item.id
                    ? 'rotate-90 text-brandPrimary-1 scale-125'
                    : 'rotate-0'
                }`} />
              </button>
            </TableCell>
          </TableRow>

          {expandedRows === item.id && (
            <TableRow>
              <TableCell
                className="p-3 rounded-xl	border_container bg-white bg-opacity-30 backdrop-blur-md"
                colSpan="10"
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
