import Cookies from 'js-cookie'
import backendURL from '@/utils/url.js'
import axios from 'axios'

export const fetchStatistics = async ({
  adv_id,
  order_id,
  startDate,
  endDate,
}) => {
  const token = Cookies.get('token')
  let url = `${backendURL}/order/statistics/`
  let hasParam = false

  if (adv_id) {
    url += `?advertiser=${adv_id}`
    hasParam = true
  } else if (order_id) {
    url += `?order_id=${order_id}`
    hasParam = true
  }

  if (startDate && endDate) {
    url +=
      (hasParam ? '&' : '?') + `start_date=${startDate}&end_date=${endDate}`
  } else if (startDate) {
    url += (hasParam ? '&' : '?') + `start_date=${startDate}`
  } else if (endDate) {
    url += (hasParam ? '&' : '?') + `end_date=${endDate}`
  }

  const response = await axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.data.results
}

export const fetchChannelStatistics = async ({ id }) => {
  const token = Cookies.get('token')
  const response = await axios.get(
    `${backendURL}/publisher/channel/${id}/statistics/`,
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return response.data.data
}
