import React, { useState } from 'react'
import { format } from 'date-fns'
import { fetchStatistics } from '@/redux/statisticsSlice.js'
import { fetchAdvertiser } from '@/redux/advertiser/advertiserSlice.js'
import { fetchShortList } from '@/redux/order/orderSlice.js'
import { useDispatch, useSelector } from 'react-redux'

const useAdvertiserReport = () => {
  const dispatch = useDispatch()

  const [loading, setLoading] = React.useState(false)
  const [isTooltip, setIsTooltip] = React.useState(false)

  const [startDate, setStartDate] = React.useState(null) // Используем null
  const [endDate, setEndDate] = React.useState(null) // Используем null
  const [selectedAdv, setSetSelectedAdv] = React.useState(null)
  const [selectedOptionAdv, setSelectedOptionAdv] = React.useState('')
  const [selectedAdvName, setSelectedAdvName] = React.useState(null)
  const [selectedMonth, setSelectedMonth] = React.useState(null) // Используем null
  const [startDateMonth, setStartDateMonth] = React.useState(null) // Используем null
  const [endDateMonth, setEndDateMonth] = React.useState(null) // Используем null
  const [dateRange, setDateRange] = React.useState([])

  // const data = useSelector((state) => state.statistics.statistics.results)
  const advdata = useSelector((state) => state.advertiser.advertisers)

  const [statistics, setStatistics] = useState()

  const handleSelectChangeADV = (value) => {
    setSelectedOptionAdv(value)

    if (value) {
      const option = JSON.parse(value)
      setSetSelectedAdv(option.id)
      setSelectedAdvName(option.name)
    } else {
      setSetSelectedAdv(null)
      setSelectedAdvName('')
    }
  }

  const handleDateStatictick = async () => {
    if (selectedAdv) {
      setLoading(true)
      const formattedStartDateMonth = startDateMonth
        ? format(startDateMonth, 'yyyy-MM-dd')
        : undefined
      const formattedEndDateMonth = endDateMonth
        ? format(endDateMonth, 'yyyy-MM-dd')
        : undefined

      const useMonthBasedDates = startDateMonth !== undefined

      try {
        const data = await fetchStatistics({
          adv_id: selectedAdv,
          startDate: useMonthBasedDates
            ? formattedStartDateMonth
            : startDate
              ? format(startDate, 'yyyy-MM-dd')
              : undefined,
          endDate: useMonthBasedDates
            ? formattedEndDateMonth
            : endDate
              ? format(endDate, 'yyyy-MM-dd')
              : undefined,
        })

        setStatistics(data) // setStatistics — это useState хук
      } catch (error) {
        console.error(error)
        // можешь показать ошибку через toast, alert и т.д.
      } finally {
        setLoading(false)
      }
    } else {
      console.log('No advertiser selected')
    }
  }

  const handleClear = () => {
    setSelectedAdvName(null)
    setSelectedOptionAdv('')
    setStartDate(null)
    setEndDate(null)
    setSelectedMonth(null)
    setDateRange([])
    setStatistics(null)
  }

  React.useEffect(() => {
    dispatch(fetchAdvertiser({ page: 1, pageSize: 200 }))
  }, [dispatch])

  React.useEffect(() => {
    if (selectedAdv) {
      dispatch(fetchShortList({ id: selectedAdv }))
    }
  }, [dispatch, selectedAdv])

  React.useEffect(() => {
    setStartDateMonth(dateRange[0])
    setEndDateMonth(dateRange[1])
  }, [dateRange])

  const handleStartDateChange = (date) => {
    setStartDate(date)
  }

  const handleEndDateChange = (date) => {
    setEndDate(date)
  }

  const handleDateChange = (date) => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    setDateRange([startOfMonth, endOfMonth])
    setSelectedMonth(startOfMonth)
  }

  return {
    loading,
    handleDateStatictick,
    handleSelectChangeADV,
    handleClear,
    handleStartDateChange,
    handleEndDateChange,
    statistics,
    setLoading,
    selectedOptionAdv,
    selectedAdvName,
    selectedMonth,
    startDate,
    handleDateChange,
    setIsTooltip,
    endDateMonth,
    startDateMonth,
    selectedAdv,
    advdata,
    endDate,
  }
}

export default useAdvertiserReport
