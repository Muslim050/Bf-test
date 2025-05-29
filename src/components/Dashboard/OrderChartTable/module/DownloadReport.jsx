import React from 'react'
import axios from 'axios'
import backendURL from '@/utils/url'
import Cookies from 'js-cookie'
import { Button } from '@/components/ui/button.jsx'
import { Download } from 'lucide-react'
import TooltipWrapper from '@/shared/TooltipWrapper.jsx'

function DownloadReport({ getOrder, startDate, endDate, setIsTooltip }) {
  const [loading, setLoading] = React.useState(false)
  const exportExcel = async (id) => {
    try {
      setLoading(true)
      const token = Cookies.get('token')
      let urllink = `${backendURL}/order/statistics-export/?order_id=${id}`

      if (startDate && endDate) {
        urllink += `&start_date=${startDate}&end_date=${endDate}`
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
      link.setAttribute('download', `${getOrder.name}.xlsx`)
      link.click()
      setIsTooltip(false)
      // fetchGetOrder()
      //   .then(() => {})
      //   .catch((error) => {
      //     console.error('Ошибка при получении данных заказа:', error)
      //   })
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <TooltipWrapper tooltipContent="Скачать">
        <Button onClick={() => exportExcel(getOrder.id)} disabled={loading}>
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
      </TooltipWrapper>
    </>
  )
}

export default DownloadReport
