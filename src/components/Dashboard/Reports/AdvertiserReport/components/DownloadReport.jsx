import React from 'react'
// import {ReactComponent as Download} from '@/assets/TablePagination/Download.svg'
import axios from 'axios'
import backendURL from '@/utils/url'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button.jsx'
import { Download } from 'lucide-react'
import Cookies from 'js-cookie'

function DownloadReport({
  selectedAdv,
  selectedAdvName,
  startDate,
  endDate,
  setIsTooltip,
  fetchGetOrder,
  endDateMonth,
  startDateMonth,
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

  const exportExcel = async () => {
    try {
      setLoading(true)
      const token = Cookies.get('token')
      let urllink = `${backendURL}/order/statistics-export/?advertiser=${selectedAdv}`

      if ((startDate && endDate) || (startDateMonth && endDateMonth)) {
        urllink += `&start_date=${
          formattedStartDateMonth || formattedStartDate
        }&end_date=${formattedEndDateMonth || formattedEndDate}`
      }

      const response = await axios.get(urllink, {
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
      link.setAttribute('download', `${selectedAdvName}.xlsx`)
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
        className="bg-brandPrimary-1 rounded-[18px] hover:bg-brandPrimary-50 text-white no-underline hover:text-white h-[44px] w-full"
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
          <Download />
        )}
      </Button>
    </>
  )
}

export default DownloadReport
