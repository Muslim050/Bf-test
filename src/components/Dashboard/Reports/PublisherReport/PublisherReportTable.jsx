import React from 'react'
import style from './PublisherReportTable.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
  addPublisherReport,
  fetchPublisher,
  resetPublisherReport,
  totalBudjetReport,
} from '../../../../redux/publisher/publisherSlice'
import { fetchChannel } from '../../../../redux/channel/channelSlice'
import { format } from 'date-fns'
import FilteredTooltip from './FilteredTooltip/FilteredTooltip'
import { fetchAdvertiser } from '../../../../redux/advertiser/advertiserSlice'
import { Button } from '@/components/ui/button.jsx'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover.jsx'
import { SlidersHorizontal } from 'lucide-react';
import { ThemeContext } from '@/utils/ThemeContext.jsx'
import { InfoCardsTop } from '@/components/Dashboard/Reports/PublisherReport/module/InfoCards/InfoCards.jsx'
import { InfoCardsButton } from '@/components/Dashboard/Reports/PublisherReport/module/InfoCards/InfoCardsButton.jsx'
import {
  TableRow,
  TableHeader,
  Table,
  TableHead,
  TableBody,
} from '@/components/ui/table'
import PublisherReportTableData from '@/components/Dashboard/Reports/PublisherReport/PublisherReportTableData.jsx'
import PreLoadDashboard from "@/components/Dashboard/PreLoadDashboard/PreLoad.jsx";
import {Monitor, MonitorPlay, MonitorUp} from "lucide-react";

function PublisherReportTable() {
  const { textColor } = React.useContext(ThemeContext)
  const [filterLoading, setFilterLoading] = React.useState(false)
  const { publisherReport, status } = useSelector((state) => state.publisher)
  const advdata = useSelector((state) => state.advertiser.advertisers)
  const publisher = useSelector((state) => state.publisher.publisher)

  const dispatch = useDispatch()
  const channel = useSelector((state) => state.channel.channel)
  ////////////////////////////
  const [selectedChannel, setSelectedChannel] = React.useState(null)
  const [selectedChannelName, setSelectedChannelName] = React.useState(null)
  const [selectedOptionChannel, setSelectedOptionChannel] = React.useState('')
  ////////////////////////////
  ////////////////////////////
  const [selectedAdv, setSetSelectedAdv] = React.useState(null)
  const [selectedAdvName, setSelectedAdvName] = React.useState(null)
  const [selectedOptionAdv, setSelectedOptionAdv] = React.useState('')
  ////////////////////////////
  const [selectedPublisher, setSetSelectedPublisher] = React.useState(null)
  const [selectedPublisherName, setSelectedPublisherName] = React.useState(null)
  const [selectedOptionPublisher, setSelectedOptionPublisher] =
    React.useState('')
  ////////////////////////////
  ////////////////////////////
  const [selectedFormat, setSelectedFormat] = React.useState('')
  const [isTooltip, setIsTooltip] = React.useState(false)

  const [startDate, setStartDate] = React.useState(null)
  const [endDate, setEndDate] = React.useState(null)

  const [startDateMonth, setStartDateMonth] = React.useState(null)
  const [endDateMonth, setEndDateMonth] = React.useState(null)
  const [dateRange, setDateRange] = React.useState([])
  const currentMonth = new Date()
  const startOfCurrentMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1,
  )

  const [totalBudget, setTotalBudget] = React.useState(null)
  const [totalViews, setTotalViews] = React.useState(null)
  const [totalComisy, setTotalComisy] = React.useState(null)
  const [totalComisyAdtech, setTotalComisyAdtech] = React.useState(null)
  const [totalbudjetChannel, setTotalbudjetChannel] = React.useState(null)

  const [selectedMonth, setSelectedMonth] = React.useState('')

  React.useEffect(() => {
    dispatch(fetchPublisher({
      page:1,
      pageSize: 200
    }))
  }, [dispatch])

  React.useEffect(() => {
    if (selectedPublisher) {
      dispatch(fetchChannel({ page:1,
        pageSize: 200,id:selectedPublisher}))
    } else {
      dispatch(fetchChannel({
        page:1,
        pageSize: 200,
      }))
    }

  }, [selectedPublisher, dispatch])

  React.useEffect(() => {
    if (selectedChannel) {
      dispatch(fetchAdvertiser({ id: selectedChannel }))
    }
  }, [selectedChannel, dispatch])

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

  const uniqueChannelName = new Set(
    publisherReport.map((item) => item.channel_name),
  )
  const uniqueChannelNameFiltered = Array.from(uniqueChannelName)

  const handleSearch = () => {
    if (selectedChannel || selectedPublisher) {
      setFilterLoading(true)

      const formattedStartDate = startDate
        ? format(startDate, 'yyyy-MM-dd')
        : undefined
      const formattedEndDate = endDate
        ? format(endDate, 'yyyy-MM-dd')
        : undefined
      const formattedStartDateMonth = startDateMonth
        ? format(startDateMonth, 'yyyy-MM-dd')
        : undefined
      const formattedEndDateMonth = endDateMonth
        ? format(endDateMonth, 'yyyy-MM-dd')
        : undefined

      const useMonthBasedDates = startDateMonth !== undefined
      dispatch(
        addPublisherReport({
          id: selectedChannel,
          startDate: useMonthBasedDates
            ? formattedStartDateMonth
            : formattedStartDate,
          endDate: useMonthBasedDates
            ? formattedEndDateMonth
            : formattedEndDate,
          publisher: selectedPublisher,
          format: selectedFormat,
        }),
      )
        .then(() => {
          setFilterLoading(false)
          dispatch(totalBudjetReport())
        })
        .catch(() => {
          setFilterLoading(false)
        })
      setIsTooltip(!isTooltip)
    } else {
      console.log('No advertiser selected')
    }
  }

  React.useEffect(() => {
    if (handleSearch) {

      //Бюджет
      const totalBudgetD = publisherReport.reduce(
        (total, person) => total + (person.budget_fact || 0),
        0,
      )
      //Бюджет

      //Просмотры
      const totalViewsD = publisherReport.reduce(
        (total, person) => total + (person.recorded_view_count || 0),
        0,
      )
      //Просмотры

      //Комиссия
      const totalComisyAdtechD = publisherReport.reduce(
        (total, person) => total + (person.adtechmedia_commission_total || 0),
        0,
      )
      //Комиссия

      //Агентсво
      const totalComisyD = publisherReport.reduce(
        (total, person) => total + (person.agency_commission_total || 0),
        0,
      )
      //Агентсво



      //Бюджет внизу
      const totalbudjetChannelD = publisherReport.reduce(
        (total, person) => total + (person.channel_budget_total || 0),
        0,
      )
      //Бюджет внизу
      setTotalBudget(totalBudgetD)
      setTotalViews(totalViewsD)
      setTotalComisy(totalComisyD)
      setTotalComisyAdtech(totalComisyAdtechD)
      setTotalbudjetChannel(totalbudjetChannelD)
    }
  }, [handleSearch])

  const handleSelectChange = (value) => {
    setSelectedOptionChannel(value)
    if (value) {
      const option = JSON.parse(value)
      setSelectedChannel(option.id)
      setSelectedChannelName(option.name)
    } else {
      setSelectedChannel(null)
      setSelectedChannelName('')
    }
  }

  const handleSelectChangeADV = (event) => {
    const value = event.target.value
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

  const handleSelectChangePablisher = (value) => {
    // const value = event.target.value
    setSelectedOptionPublisher(value)
    if (value) {
      const option = JSON.parse(value)
      setSetSelectedPublisher(option.id)
      setSelectedPublisherName(option.name)
    } else {
      setSetSelectedPublisher(null)
      setSelectedPublisherName('')
    }
  }

  const handleSelectFormat = (value) => {
    setSelectedFormat(value)
  }

  const handleClear = () => {
    setFilterLoading(true)
    setSelectedChannel(null)
    setSelectedOptionChannel('')
    setSelectedAdvName('')
    setSelectedMonth('')
    setSelectedChannelName(null)
    setStartDate(null)
    setEndDate(null)
    setSelectedFormat('')
    setDateRange([])
    setSetSelectedPublisher(null)
    setSelectedPublisherName(null)
    setSelectedOptionPublisher('')
    dispatch(resetPublisherReport())
    setFilterLoading(false)
  }

  const handleProfileClick = () => {
    setIsTooltip(!isTooltip)
    setStartDate(startDate)
    setEndDate(endDate)
  }

  const headers = [
    { key: 'id', label: 'ID' },
    { key: 'company', label: 'Кампания' },
    { key: 'name', label: 'Рекламодатель' },
    { key: 'phone_number', label: 'Канал' },
    { key: 'commission_rate', label: 'Название Видео' },
    { key: 'commission_rate', label: 'Формат' },
    { key: 'commission_rate', label: 'Начало' },
    { key: 'commission_rate', label: 'Конец' },
    { key: 'commission_rate', label: 'Показы факт' },
    { key: 'commission_rate', label: 'Бюджет кампании' },
    { key: 'commission_rate', label: 'Комиссия Агенства' },
    { key: 'commission_rate', label: 'Комиссия AdTech Media' },
    {
      key: 'commission_rate',
      label: `Бюджет - ${uniqueChannelNameFiltered[0]}`,
    },
  ]

  const handleDateChange = (date) => {
    if (date) {
      const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
      const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0)
      setDateRange([startOfMonth, endOfMonth])
      setSelectedMonth(startOfMonth)
    }
  }

  return (
    <>
      {status === 'loading' ? (
        <PreLoadDashboard status={status} text="Загрузка отчета" />
        ) : (
        <div className="tableWrapper">
          <div className="tableWrapper__table_title">
            <div className="flex items-center justify-end w-full mb-4">
              {filterLoading && (
                <div className="loaderWrapper" style={{ height: '5vh' }}>
                  <div
                    className="spinner"
                    style={{ width: '25px', height: '25px' }}
                  ></div>
                </div>
              )}

              <div style={{ display: 'flex' }} >
                <div className="flex gap-2 items-center mr-2 pt-3">
                  {(selectedChannel || selectedFormat) && (
                    <Button
                      variant="link"
                      onClick={handleClear}
                      className="text-[#A7CCFF] "
                    >
                      Очистить
                    </Button>
                  )}
                  {selectedFormat && (
                    <div
                      className="rounded-[22px] bg-[#FFFFFF1A]		h-[40px]  p-2 text-white text-sm	px-5	flex items-center justify-center">
                      <div className='flex items-center gap-1'>
                        {
                          (selectedFormat === 'preroll' && <Monitor/>) ||
                          (selectedFormat === 'top_preroll' && <MonitorUp/>) ||
                          (selectedFormat === 'tv_preroll' && <MonitorPlay/>)
                        }
                        {
                          (selectedFormat === 'preroll' && 'Pre-roll') ||
                          (selectedFormat === 'mixroll' && 'Mid-roll') ||
                          (selectedFormat === 'midroll1' && 'Mid-roll 1') ||
                          (selectedFormat === 'midroll2' && 'Mid-roll 2') ||
                          (selectedFormat === 'midroll3' && 'Mid-roll 3') ||
                          (selectedFormat === 'midroll4' && 'Mid-roll 4') ||
                          (selectedFormat === 'top_preroll' && 'Top Pre-roll') ||
                          (selectedFormat === 'tv_preroll' && 'TV Pre-roll')}


                      </div>


                    </div>
                  )}
                  {selectedChannelName && (
                    <div
                      className="rounded-[22px] bg-[#FFFFFF1A]		h-[40px]  p-2 text-white text-sm	px-5	flex items-center justify-center">
                      <div>{selectedChannelName}</div>
                    </div>
                  )}

                </div>
              </div>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="bg-brandPrimary-1 rounded-[22px] hover:bg-brandPrimary-50 text-white no-underline hover:text-white mt-3"
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-2"/> Фильтр
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 mr-3.5 bg-white bg-opacity-30 backdrop-blur-md border-0 rounded-[20px]">
                  <div className="">
                    <div className="flex items-center gap-2 pb-4">
                      <div className="w-2.5	h-6	bg-[#B5E4CA] rounded-[4px]"></div>
                      <h4
                        className="font-medium "
                        style={{ color: 'var(--text-color )' }}
                      >
                        Фильтры
                      </h4>
                    </div>
                    <p
                      className="text-xs	  py-3 border-t border-[#F9F9F9] "
                      style={{ color: 'var(--text-color )' }}
                    >
                      Выберите необходимые параметры
                    </p>
                    <FilteredTooltip
                      startDate={startDate}
                      endDate={endDate}
                      handleSelectFormat={handleSelectFormat}
                      selectedFormat={selectedFormat}
                      handleProfileClick={handleProfileClick}
                      channel={channel}
                      advdata={advdata}
                      selectedChannel={selectedChannel}
                      selectedAdv={selectedAdv}
                      handleSelectChange={handleSelectChange}
                      handleSelectChangeADV={handleSelectChangeADV}
                      handleClear={handleClear}
                      handleSearch={handleSearch}
                      handleEndDateChange={handleEndDateChange}
                      handleStartDateChange={handleStartDateChange}
                      selectedOptionChannel={selectedOptionChannel}
                      selectedOptionAdv={selectedOptionAdv}
                      setStartDateMonth={setStartDateMonth}
                      setEndDateMonth={setEndDateMonth}
                      startDateMonth={startDateMonth}
                      endDateMonth={endDateMonth}
                      setDateRange={setDateRange}
                      dateRange={dateRange}
                      setSelectedMonth={setSelectedMonth}
                      selectedMonth={selectedMonth}
                      handleDateChange={handleDateChange}
                      publisher={publisher}
                      handleSelectChangePablisher={handleSelectChangePablisher}
                      selectedOptionPublisher={selectedOptionPublisher}
                      selectedPublisher={selectedPublisher}
                      selectedChannelsName={selectedChannelName}
                      selectedPublisherName={selectedPublisherName}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {publisherReport && publisherReport.length ? (
            <div
              className={`border_container glass-background w-full rounded-[22px] my-4`}
            >
              <div className="border_design">
                <div className="flex justify-between items-center gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5	h-6	bg-[#D1C5FF] rounded-[4px]"></div>
                    <h4 className="font-medium text-white">Отчет</h4>
                    <div className='flex gap-1 items-center text-lg	 font-semibold'>
                      You <span className='bg-red-600 px-1 py-1 rounded-xl'>Tube</span>
                      <p className='text-lg	 font-medium'>
                        Analytics
                      </p>
                    </div>
                  </div>
                  <div className="rounded-[22px]">
                    <InfoCardsTop
                      uniqueChannelNameFiltered={uniqueChannelNameFiltered}
                      totalbudjetChannel={totalbudjetChannel}
                      totalViews={totalViews}
                      totalBudget={totalBudget}
                      totalComisy={totalComisy}
                      totalComisyAdtech={totalComisyAdtech}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          <div
            className={`border_container rounded-[22px] p-[3px] glass-background h-[calc(100vh-360px)]`} // Здесь используется h-screen для высоты на весь экран
          >
            {publisherReport && publisherReport.length ? (
              <div className="h-full overflow-y-auto">
                <Table
                  className={`${style.responsive_table} border_design rounded-lg  `}
                >
                  <TableHeader className="bg-[#FFFFFF2B] rounded-t-lg">
                    <TableRow>
                      {headers.map((row) => (
                        <TableHead
                          key={row.key}
                          className={`text-${textColor} `}
                        >
                          {row.label}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <PublisherReportTableData
                      publisherReport={publisherReport}
                    />
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="flex items-center gap-2 justify-center h-full 	">
                Установите фильтр для отображения данных!
              </div>
            )}
          </div>

          {publisherReport && publisherReport.length ? (
            <div className="flex justify-center mt-6 ">
              <InfoCardsButton totalComisyAdtech={totalbudjetChannel} />
            </div>
          ) : null}
        </div>
      )}
    </>
  )
}

export default PublisherReportTable
