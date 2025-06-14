import React from 'react'
import style from './TableInventory.module.scss'
import { TableCell, TableRow } from '@/components/ui/table'
import AdvertStatus from '@/components/Labrery/AdvertStatus/AdvertStatus.jsx'
import LinkedVideoModal from './LinkedVideoModal'
import FormatterView from '@/components/Labrery/formatter/FormatterView.jsx'
import { showModalVideoLinked } from '../../../../redux/modalSlice'
import { useDispatch, useSelector } from 'react-redux'
import { formatDate } from '../../../../utils/formatterDate'
import CircularTable from '@/components/Labrery/Circular/CircularTable.jsx'
import { ThemeContext } from '@/utils/ThemeContext.jsx'
import { Button } from '../../../ui/button'
import { Link, Monitor, MonitorPlay, MonitorUp, Paperclip } from 'lucide-react'
import { Dialog } from '@/components/ui/dialog.jsx'
import Cookies from 'js-cookie'

function OpenTableSentOrderData({ data }) {
  const user = Cookies.get('role')
  const [expandedRows, setExpandedRows] = React.useState('')
  const [activeTooltip, setActiveTooltip] = React.useState(null)
  const [activeTooltipp, setActiveTooltipp] = React.useState(null)
  const dispatch = useDispatch()
  const { showVideoLinked } = useSelector((state) => state.modal)
  const [id, setId] = React.useState(null)
  const { textColor } = React.useContext(ThemeContext)

  const handleRowClick = (id) => {
    setExpandedRows(id === expandedRows ? false : id)
  }
  const linkedVideo = (id) => {
    dispatch(showModalVideoLinked())
    inventoryPublish(id)
  }
  const inventoryPublish = (id) => {
    setId(id)
  }
  // Модальное окно LinkedVideo
  const [open, setOpen] = React.useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  // Модальное окно LinkedVideo
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        {open && <LinkedVideoModal onClose={handleClose} selectedId={id} />}
      </Dialog>

      {data.map((inventor, i) => (
        <>
          <TableRow className={style.table__tr}>
            <TableCell
              data-label="ID"
              className={`font-normal text-${textColor} text-sm `}
            >
              <div style={{ display: 'flex' }}>
                <div>{i + 1}</div>
                {user === 'publisher' || user === 'channel' ? (
                  <>
                    {inventor.status === 'pre_booked' ? (
                      <CircularTable />
                    ) : null}
                  </>
                ) : null}

                {user === 'admin' ? (
                  <>{inventor.status === 'open' ? <CircularTable /> : null}</>
                ) : null}
              </div>
            </TableCell>
            <TableCell
              style={{ position: 'relative' }}
              className={style.table_td}
              onMouseEnter={() => setActiveTooltip(i)}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              {inventor.channel === null ? '' : inventor.channel.name}
              {user === 'admin' && (
                <span
                  className={
                    activeTooltip === i ? style.tooltiptext : style.hidden
                  }
                >
                  ID:{inventor?.id}
                </span>
              )}
            </TableCell>

            <TableCell
              style={{ position: 'relative' }}
              className={style.table_td}
              onMouseEnter={() => setActiveTooltip(i)}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              {inventor.video_content?.name}
              {user === 'admin' && (
                <span
                  className={
                    activeTooltip === i ? style.tooltiptext : style.hidden
                  }
                >
                  ID:{inventor.video_content?.id}
                </span>
              )}
            </TableCell>
            <TableCell
              data-label="ID"
              className={`font-normal text-${textColor} text-sm `}
            >
              {inventor.video_content?.category}
            </TableCell>
            {/**/}
            <TableCell className="text-blue-300 font-medium">
              <div className="flex items-center gap-1">
                {(inventor.format === 'preroll' && <Monitor />) ||
                  (inventor.format === 'top_preroll' && <MonitorUp />) ||
                  (inventor.format === 'tv_preroll' && <MonitorPlay />)}
                {(inventor.format === 'preroll' && 'Pre-roll') ||
                  (inventor.format === 'mixroll' && 'Mid-roll') ||
                  (inventor.format === 'midroll1' && 'Mid-roll 1') ||
                  (inventor.format === 'midroll2' && 'Mid-roll 2') ||
                  (inventor.format === 'midroll3' && 'Mid-roll 3') ||
                  (inventor.format === 'midroll4' && 'Mid-roll 4') ||
                  (inventor.format === 'top_preroll' && 'Top Pre-roll') ||
                  (inventor.format === 'tv_preroll' && 'TV Pre-roll')}
              </div>
            </TableCell>

            <TableCell
              data-label="ID"
              className={`font-normal text-${textColor} text-sm `}
            >
              {formatDate(inventor.video_content?.publication_time)}
            </TableCell>
            <TableCell
              data-label="ID"
              className={`font-normal text-${textColor} text-sm `}
            >
              {inventor.online_views > 0 ? (
                <FormatterView data={inventor.online_views} />
              ) : (
                <div>----</div>
              )}
            </TableCell>
            <TableCell
              data-label="ID"
              className={`font-normal text-${textColor} text-sm `}
            >
              <AdvertStatus
                status={inventor.status}
                endDate={inventor.deactivation_date}
              />
            </TableCell>

            <TableCell
              data-label="ID"
              className={`font-normal text-${textColor} text-sm `}
            >
              <div className="inline-flex">
                {inventor.video_content.link_to_video === null ? (
                  <Button
                    onClick={() => {
                      linkedVideo(inventor.video_content.id), setOpen(!open)
                    }}
                    style={{ backdropFilter: 'blur(10.3049px)' }}
                    className=" hover:scale-105 transition-all w-full h-auto px-4 py-1 rounded-lg flex items-center gap-1.5  bg-blue-500 hover:bg-blue-400 border border-transparent hover:border-blue-600"
                  >
                    <Paperclip className="w-[20px] h-[20px] text-white" />
                    Прикрепить ссылку
                  </Button>
                ) : (
                  <a
                    href={inventor.video_content.link_to_video}
                    target="_blank"
                    className=" hover:scale-105 transition-all w-full h-auto px-4 py-1 rounded-lg flex items-center gap-1.5  bg-green-600 hover:bg-green-400 border border-transparent hover:border-green-600"
                    rel="noreferrer"
                  >
                    <Link className="w-[20px] h-[20px] text-white" />
                    Ссылка на Видео
                  </a>
                )}
              </div>
            </TableCell>
            <TableCell>
              {(user === 'admin' ||
                user === 'advertiser' ||
                user === 'advertising_agency') &&
              inventor.status === 'open' ? (
                <button>Edit</button>
              ) : null}
            </TableCell>
          </TableRow>
        </>
      ))}
    </>
  )
}

export default OpenTableSentOrderData
