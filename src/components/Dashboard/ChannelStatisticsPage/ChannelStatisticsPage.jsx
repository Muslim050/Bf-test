import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  clearStatistics,
  fetchChannelStatistics,
} from '../../../redux/statisticsSlice'
import StatictickChannel from './StatictickChannel/StatictickChannel'
import { toast } from 'react-hot-toast'
import PreLoadDashboard from '@/components/Dashboard/PreLoadDashboard/PreLoad.jsx'

function ChannelStatisticsPage() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const data = useSelector((state) => state.statistics.statisticsVideo)
  const dataChannel = useSelector((state) => state.statistics.statisticsChannel)
  const [loading, setLoading] = React.useState(true)
  const [channel, setLoadingChannel] = React.useState(true)
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setLoadingChannel(true)

        await dispatch(clearStatistics())
        await Promise.all([dispatch(fetchChannelStatistics({ id })).unwrap()])
      } catch (error) {
        setError(error?.data?.error?.detail)
        console.log(error.data?.error?.detail)
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

          {/*<StatictickVideoTable data={data} loading={loading} error={error}/>*/}
        </>
      )}
    </>
  )
}

export default ChannelStatisticsPage
