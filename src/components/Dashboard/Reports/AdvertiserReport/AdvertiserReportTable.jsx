import React from 'react'
import OrderChartThead from './AdvChartThead'
import AdvChartData from './AdvChartData'
import { InfoCardsBottom } from './components/InfoCardsBottom/InfoCards'
import FilteredTooltip from './components/FilteredTooltip/FilteredTooltip'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover.jsx'
import { Button } from '@/components/ui/button.jsx'
import {
  TableHeader,
  Table,
  TableBody,
} from '@/components/ui/table'
import PreLoadDashboard from "@/components/Dashboard/PreLoadDashboard/PreLoad.jsx";
import SelectedFilter from "@/components/Dashboard/Reports/AdvertiserReport/components/SelectedFilter.jsx";
import useAdvertiserReport from "@/components/Dashboard/Reports/AdvertiserReport/useAdvertiserReport.jsx";
import { SlidersHorizontal } from 'lucide-react';


function AdvertiserReportTable() {

  let totalViews = 0
  let totalBudget = 0
  let totalAnalitickView = 0
  let tableData = []

  const {
    loading,
    handleDateStatictick,
    handleSelectChangeADV,
    data,
    setLoading,
    selectedOptionAdv,
    selectedAdvName,
    startDate,
    handleDateChange,
    setIsTooltip,
    selectedMonth,
    endDateMonth,
    startDateMonth,
    handleEndDateChange,
    handleStartDateChange,
    handleClear,
    selectedAdv,
    advdata,
    endDate

  } = useAdvertiserReport();
  return (
    <>
      {loading ? (

        <PreLoadDashboard onComplete={() => setLoading(false)} loading={loading}text="Загрузка отчета" />

        ) : (
        <div className="tableWrapper" style={{ overflow: 'visible' }}>
          <div className="tableWrapper__table_title">
            <div className="flex justify-end items-center gap-2 mb-4">

            {/*Выбрынные фильтры*/}
             <SelectedFilter
               selectedAdvName={selectedAdvName}
               handleClear={handleClear}
               startDate={startDate}
               endDate={endDate}
               startDateMonth={startDateMonth}
               endDateMonth={endDateMonth}
               selectedMonth={selectedMonth}
             />
              {/*Выбрынные фильтры*/}




              <Popover>
                <PopoverTrigger asChild className="">
                  <Button
                    variant="ghost"
                    className=" flex justify-end  bg-brandPrimary-1 rounded-[22px] hover:bg-brandPrimary-50 text-white no-underline hover:text-white "
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-2" /> Фильтр
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 mr-3.5 bg-white bg-opacity-30 backdrop-blur-md border-0 rounded-[22px]">
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
                      className="text-xs	  pt-3 pb-1 border-t border-[#F9F9F9] "
                      style={{ color: 'var(--text-color )' }}
                    >
                      Выберите необходимые параметры
                    </p>

                    <FilteredTooltip
                      handleDateStatictick={handleDateStatictick}
                      startDate={startDate}
                      endDate={endDate}
                      advdata={advdata}
                      selectedOptionAdv={selectedOptionAdv}
                      handleSelectChangeADV={handleSelectChangeADV}
                      //
                      selectedAdv={selectedAdv}
                      handleClear={handleClear}
                      selectedAdvName={selectedAdvName}
                      //
                      handleStartDateChange={handleStartDateChange}
                      handleEndDateChange={handleEndDateChange}
                      handleDateChange={handleDateChange}
                      startDateMonth={startDateMonth}
                      endDateMonth={endDateMonth}
                      selectedMonth={selectedMonth}
                      setIsTooltip={setIsTooltip}
                      tableData={tableData}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div
            className={`border_container rounded-[22px] p-[3px] glass-background h-[calc(100vh-270px)]`} // Здесь используется h-screen для высоты на весь экран
          >
            {data && data.length ? (
              <>
                <div className="h-full overflow-y-auto">
                  <Table
                    className={` border_design rounded-lg overflow-auto`}
                  >
                    {' '}
                    {/* Колонки основной таблица  */}
                    <TableHeader className="bg-[#FFFFFF2B] rounded-t-lg">
                      <OrderChartThead statistic={tableData}/>
                    </TableHeader>
                    {/* Колонки основной таблица  */}
                    <TableBody>
                      {data &&
                        data.length &&
                        data.map ((statistic, index) => {
                          totalBudget += statistic.budget
                          totalAnalitickView += statistic.online_view_count
                          totalViews += statistic.online_view_count
                          tableData.push (statistic)
                          return (
                            <React.Fragment key={statistic.video_link}>
                              {/* Данные таблицы  */}
                              <tr
                                key={index}
                                style={{borderBottom: '1px solid #f9f9f92b'}}
                              >
                                <AdvChartData
                                  statistic={statistic}
                                  index={index}

                                />
                              </tr>
                            </React.Fragment>
                          )
                        })}
                    </TableBody>
                  </Table>

                </div>

                {/* Ячейки с инфо Итого:	 */}
                <InfoCardsBottom
                  totalViews={totalViews}
                  totalBudget={totalBudget}
                  totalAnalitickView={totalAnalitickView}
                />
                {/* Ячейки с инфо Итого:	 */}

              </>
            ) : (
              <div className="flex items-center gap-2 justify-center h-[100%] 	">
                Установите фильтр для отображения данных!
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default AdvertiserReportTable
