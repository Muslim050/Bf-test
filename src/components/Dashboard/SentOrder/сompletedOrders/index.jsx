import SentOrderList from './SentOrderList'
import React from 'react'
// import {fetchOnceListSentToPublisher} from "../../../../redux/order/SentToPublisher";
import { useDispatch, useSelector } from 'react-redux'
import { fetchOnceListSentToPublisher } from '@/redux/order/SentToPublisher.js'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.jsx'
import style from '../TableSentsOrder.module.scss'
import { ThemeContext } from '@/utils/ThemeContext.jsx'
import Cookies from 'js-cookie'
import PreLoadDashboard from '@/components/Dashboard/PreLoadDashboard/PreLoad.jsx'

const headers = [
  { key: 'id', label: '№' },
  { key: 'name', label: 'Кампания' },
  { key: 'name', label: 'Формат' },
  { key: 'name', label: 'Начало' },
  { key: 'name', label: 'Конец' },
  { key: 'category', label: 'Статус' },
  { key: 'category', label: 'Действия' },
]
const CompletedOrders = () => {
  const dispatch = useDispatch()
  const { listsentPublisher, status } = useSelector(
    (state) => state.sentToPublisher,
  )
  const { textColor } = React.useContext(ThemeContext)

  React.useEffect(() => {
    dispatch(fetchOnceListSentToPublisher({ is_deactivated: true }))
  }, [dispatch])

  return (
    <>
      {status === 'loading' ? (
        <PreLoadDashboard status={status} text="Загрузка заказов" />
      ) : (
        <div className="tableWrapper">
          <div
            // style={{ background: ' var(--bg-color)' }}
            className="border_container w-full h-[calc(100vh-150px)]   rounded-[22px]  p-[3px] glass-background flex flex-col"
          >
            <Table
              className={`${style.responsive_table} border_design rounded-lg h-full`}
            >
              <TableHeader className="bg-[#FFFFFF2B] rounded-t-lg">
                <TableRow>
                  {headers.map((row) => {
                    const user = Cookies.get('role')
                    const showStatusColumn = user !== 'admin'
                    if (row.key === 'is_connected' && !showStatusColumn) {
                      return null
                    }
                    return (
                      <TableHead key={row.key} className={`text-${textColor} `}>
                        {row.label}
                      </TableHead>
                    )
                  })}
                </TableRow>
              </TableHeader>
              <TableBody>
                <SentOrderList listsentPublisher={listsentPublisher} />
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </>
  )
}
export default CompletedOrders
