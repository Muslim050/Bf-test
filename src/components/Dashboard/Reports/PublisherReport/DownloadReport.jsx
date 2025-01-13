import React from 'react'
// import { ReactComponent as Download } from '@/assets/TablePagination/Download.svg'
import axios from 'axios'
import backendURL from '@/utils/url'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button.jsx'
import { Download } from 'lucide-react'
import Cookies from 'js-cookie'

function DownloadReport({
  startDate,
  endDate,
  endDateMonth,
  startDateMonth,
  //
  channelId,
  publisherId,
  //
  setIsTooltip,
  formatOrder,
  selectedChannelName,
  selectedPublisherName,
}) {
  const [loading, setLoading] = React.useState(false)

  const formattedStartDate = startDate
    ? format(startDate, 'yyyy-MM-dd')
    : undefined
  const formattedEndDate = endDate ? format(endDate, 'yyyy-MM-dd') : undefined

  const formattedStartDateMonth = startDateMonth
    ? format(startDateMonth, 'yyyy-MM-dd')
    : undefined
  const formattedEndDateMonth = endDateMonth
    ? format(endDateMonth, 'yyyy-MM-dd')
    : undefined

  const useMonthBasedDates = startDateMonth !== undefined
  const exportExcel = async (id) => {
    try {
      setLoading(true)
      const token = Cookies.get('token')
      let urllll = new URL(`${backendURL}/publisher/report-export/`)

      const params = new URLSearchParams()
      if (channelId) {
        params.append('channel_id', channelId)
      }
      if (publisherId) {
        params.append('publisher_id', publisherId)
      }
      if (useMonthBasedDates ? formattedStartDateMonth : formattedStartDate) {
        params.append(
          'start_date',
          useMonthBasedDates ? formattedStartDateMonth : formattedStartDate,
        )
      }
      if (useMonthBasedDates ? formattedEndDateMonth : formattedEndDate) {
        params.append(
          'end_date',
          useMonthBasedDates ? formattedEndDateMonth : formattedEndDate,
        )
      }
      if (formatOrder) {
        params.append('order_format', formatOrder)
      }

      urllll.search = params.toString()
      const response = await axios.get(urllll.href, {
        responseType: 'blob', // Set the response type to blob
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      const blob = new Blob([response.data], {
        type: 'application/vnd.ms-excel',
      })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute(
        'download',
        `${selectedChannelName || selectedPublisherName}.xlsx`,
      )
      link.click()
      setIsTooltip(false)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button
        onClick={() => exportExcel()}
        disabled={loading}
        className="bg-brandPrimary-1 rounded-lg hover:bg-brandPrimary-50 text-white no-underline hover:text-white h-[44px] w-full"
      >
        {loading ? (
          <div className="loaderWrapper" style={{ height: '30px' }}>
            <div
              className="spinner"
              style={{
                width: '30px',
                height: '30px',
                border: '3px solid #ffffff',
                borderTopColor: '#5570f1',
              }}
            ></div>
          </div>
        ) : (
          // <Download style={{ width: '25px', height: '30px' }} />
          <Download />
        )}
      </Button>
    </>
  )
}

export default DownloadReport
