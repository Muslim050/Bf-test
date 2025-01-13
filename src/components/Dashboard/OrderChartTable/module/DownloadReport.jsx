import React from 'react'
import axios from 'axios'
import backendURL from '@/utils/url'
import Cookies from 'js-cookie'
import { Button } from '@/components/ui/button.jsx'
import { Download } from 'lucide-react'

function DownloadReport({
  getOrder,
  startDate,
  endDate,
  setIsTooltip,
  fetchGetOrder,
}) {
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
      <Button
        onClick={() => exportExcel(getOrder.id)}
        disabled={loading}
        className="bg-brandPrimary-1 rounded-[12px] hover:bg-brandPrimary-50 text-white no-underline hover:text-white h-[44px] w-full"
      >
        {' '}
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
