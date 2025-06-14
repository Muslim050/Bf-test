import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import StatictickChannel from './StatictickChannel/StatictickChannel'
import { toast } from 'react-hot-toast'
import PreLoadDashboard from '@/components/Dashboard/PreLoadDashboard/PreLoad.jsx'
import { fetchChannelStatistics } from '@/redux/statisticsSlice.js'

function ChannelStatisticsPage() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const [dataChannel, setDataChannel] = useState()
  const [loading, setLoading] = React.useState(true)
  const [channel, setLoadingChannel] = React.useState(true)
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setLoadingChannel(true)

        setDataChannel(null)
        const data = await fetchChannelStatistics({ id })
        setDataChannel(data)
      } catch (error) {
        setError(error?.data?.error?.detail)
        toast.error(
          `${error?.message} - ${error?.error.message} ||  ${error?.detail}`,
        )
      } finally {
        setLoading(false)
        setLoadingChannel(false)
      }
    }
    fetchData()
  }, [dispatch, id])

  return (
    <>
      {loading || channel ? (
        <PreLoadDashboard
          onComplete={() => setLoading(false)}
          loading={loading}
          text={'Загрузка статистики'}
        />
      ) : (
        <>
          <StatictickChannel
            dataChannel={dataChannel}
            channel={channel}
            error={error}
          />
        </>
      )}
    </>
  )
}

export default ChannelStatisticsPage
