import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import style from './OrderChartTable.module.scss'
import OrderChartThead from './OrderChartThead'
import { InfoCardsTop } from './module/InfoCards/InfoCards.jsx'
import { Table, TableBody, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button.jsx'
import { ChevronLeft } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover.jsx'
import InfoCartButton from '@/components/Dashboard/OrderChartTable/module/InfoCartButton.jsx'
import OrderChartMain from './OrderChartList.jsx'
import DopTable from '@/components/Dashboard/OrderChartTable/module/DopTable/index.jsx'
import FilteredTooltip from '@/components/Dashboard/OrderChartTable/module/FilteredTooltip/FilteredTooltip.jsx'
import SelectedFilterCart from './module/SelectedFilterCart/index.jsx'
import { useOrderChart } from './useOrderChart.jsx'
import PreLoadDashboard from "@/components/Dashboard/PreLoadDashboard/PreLoad.jsx";
import { SlidersHorizontal } from 'lucide-react';

function OrderChart() {
  const {
    dataFilteredClose,
    handleDateStatictick,
    handleClear,
    dataFiltered,
    orderData,
    setStartDate,
    setEndDate,
    loading,
    endDate,
    startDate,
    setOpen,
    open,
    setLoading
  } = useOrderChart()
  const [expandedRows, setExpandedRows] = React.useState('')
  const data = useSelector((state) => state.statistics.statistics.results)

  const handleRowClick = (videoLink) => {
    setExpandedRows((prevExpandedRow) =>
      prevExpandedRow === videoLink ? '' : videoLink,
    )
  }

  let totalViews = 0
  let totalBudget = 0
  let totalData = []

  useEffect (() => {
    if (orderData?.name && orderData?.advertiser?.name) {
      document.title = `${orderData?.name} / ${orderData?.advertiser.name}`
    }
  }, [orderData]);
  return (
    <>
      {loading ? (
        <PreLoadDashboard onComplete={() => setLoading(false)} loading={loading} text={'Загрузка статистики'} />
        ) : (
        <div>
          <div className="flex items-center gap-4 justify-between ">
            <div className="flex items-center gap-3">
              <Link to={'/order'}>
                <ChevronLeft className="w-8 h-6 hover:text-brandPrimary-1" />
              </Link>
              {/* </Button> */}
              <div className="text-lg	text-white flex">
                <div>{orderData?.name}</div>
                &nbsp; / &nbsp;
                <div>{orderData?.advertiser?.name}</div>
              </div>
              {orderData.target_country && (
                <div
                  className={`rounded-[6px] px-1 py-1 text-[16px]  ${
                    orderData.target_country ? 'bg-[#606afc]' : 'bg-transparent'
                  }`}
                >
                  {orderData.target_country}
                </div>
              )}
            </div>

            <div className="flex gap-2">
              {/* Выбранный параметры фильтра */}
              {dataFiltered && (
                <Button
                  variant="link"
                  onClick={dataFilteredClose}
                  className="text-[#A7CCFF] px-0 h-auto"
                >
                  Очистить
                </Button>
              )}
              <SelectedFilterCart
                dataFiltered={dataFiltered}
                startDate={startDate}
                endDate={endDate}
              />
              {/* Выбранный параметры фильтра */}

              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className=" px-7 bg-brandPrimary-1 rounded-[22px] hover:bg-brandPrimary-50 text-white no-underline hover:text-white "
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-2" /> Фильтр
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-80 mr-3.5 bg-white bg-opacity-30 backdrop-blur-md border-0 rounded-[22px]">
                  <div className="">
                    <div className="flex items-center gap-2 pb-4">
                      <div className="w-2.5	h-6	bg-[#B5E4CA] rounded-[4px]"></div>
                      <h4 className="font-medium text-white">Фильтры</h4>
                    </div>
                    <p className="text-xs	  py-3 border-t border-[#F9F9F9] text-white">
                      Выберите необходимые параметры
                    </p>
                    <FilteredTooltip
                      orderData={orderData}
                      handleDateStatictick={handleDateStatictick}
                      startDate={startDate}
                      setStartDate={setStartDate}
                      endDate={endDate}
                      setEndDate={setEndDate}
                      handleClear={handleClear}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div>
            {/* Ячейки с инфо Бюджет,План показов, План бюджета */}
            <div
              style={{ background: 'var(--bg-color)' }}
              className={`${style.whitegrad}  w-full  rounded-[22px] mt-4 pl-4   sm:p-3.5 p-[5px] `}
            >
              <div className="flex items-center gap-2">
                <div className="w-2.5	h-6	bg-[#D1C5FF] rounded-[4px]"></div>
                <div className="font-medium text-white sm:text-base text-xs">Отчет</div>
                {/*<div className=" rounded-[22px]	p-2">*/}
                  <InfoCardsTop orderData={orderData} />
                {/*</div>*/}
              </div>
            </div>
            {/* Ячейки с инфо Бюджет,План показов, План бюджета */}
          </div>
          <div className="h-[calc(100vh-350px)]  sm:h-[calc(100vh-350px)]  rounded-[22px] mt-3 p-[3px] glass-background flex flex-col">
            <Table className={`${style.responsive_table} rounded-lg`}>
              {/* Колонки основной таблица  */}
              <TableHeader className="bg-[#FFFFFF2B] rounded-t-lg">
                <OrderChartThead />
              </TableHeader>
              {/* Колонки основной таблица  */}

              <TableBody>
                {data &&
                  data.map((statistic, index) => {
                    totalBudget += statistic.budget
                    totalViews += statistic.online_view_count
                    totalData.push(statistic)
                    return (
                      <React.Fragment key={statistic.video_link}>
                        {/* Данные основной таблицы  */}
                        <TableRow key={index}>
                          <OrderChartMain
                            statistic={statistic}
                            index={index}
                            handleRowClick={handleRowClick}
                            isExpanded={expandedRows === statistic.video_link}
                          />
                        </TableRow>
                        {/* Данные основной таблицы  */}

                        {/* Дополнительная таблица */}
                        {expandedRows === statistic.video_link && (
                          <TableRow
                            key={index}
                            className={`bg-[#ffffff4d]  rounded-[22px] h-[100%]`}
                          >
                            <DopTable
                              statistic={statistic}
                              data={data}
                              expandedRows={expandedRows}
                            />
                          </TableRow>
                        )}
                        {/* Дополнительная таблица */}
                      </React.Fragment>
                    )
                  })}
              </TableBody>
            </Table>
          </div>

          {/* Ячейки с инфо Итого:*/}
          <InfoCartButton
            orderData={orderData}
            totalViews={totalViews}
            totalBudget={totalBudget}
          />
          {/* Ячейки с инфо Итого:*/}
          {/* </div> */}
        </div>
      )}
    </>
  )
}

export default OrderChart
