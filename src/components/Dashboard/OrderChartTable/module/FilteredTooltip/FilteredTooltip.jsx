import React from 'react'
import DownloadReport from '../DownloadReport'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Label } from '@/components/ui/label.jsx'
import { Button } from '@/components/ui/button.jsx'
import { SlidersHorizontal, Trash2 } from 'lucide-react'
import TooltipWrapper from '@/shared/TooltipWrapper.jsx'

function FilteredTooltip({
  handleDateStatictick,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  setIsTooltip,
  orderData,
  handleClear,
}) {
  const handleStartDateChange = (date) => {
    setStartDate(date?.toISOString().slice(0, 10)) // Преобразование даты в строку формата YYYY-MM-DD
  }

  const handleEndDateChange = (date) => {
    setEndDate(date?.toISOString().slice(0, 10)) // Аналогично для конечной даты
  }

  return (
    <>
      <div className="flex gap-2">
        <div className="grid">
          <Label htmlFor="terms" className="text-white pb-1">
            Дата начало
          </Label>
          <DatePicker
            selected={startDate ? new Date(startDate) : null}
            onChange={handleStartDateChange}
            selectsStart
            startDate={startDate ? new Date(startDate) : null}
            endDate={endDate ? new Date(endDate) : null}
            minDate={new Date(startDate)} // Устанавливаем minDate равным startDate
            maxDate={new Date(endDate)} // Устанавливаем maxDate равным endDate
            className="bg-white bg-opacity-30 backdrop-blur-md px-2 py-2 h-[45px] rounded-[12px] w-full text-white"
          />
        </div>

        <div className="grid">
          <Label htmlFor="terms" className="text-white pb-1">
            Дата конец
          </Label>
          <DatePicker
            selected={endDate ? new Date(endDate) : null}
            onChange={handleEndDateChange}
            selectsEnd
            startDate={startDate ? new Date(startDate) : null}
            endDate={endDate ? new Date(endDate) : null}
            minDate={new Date(startDate)} // Устанавливаем minDate равным startDate
            maxDate={new Date(endDate)} // Устанавливаем maxDate равным endDate
            className="bg-white bg-opacity-30 backdrop-blur-md px-2 py-2 h-[45px] rounded-[12px] w-full text-white"
          />
        </div>
      </div>
      <div className="flex gap-2.5 mt-3 justify-end">
        <TooltipWrapper tooltipContent="Сортировать">
          <Button variant="default" onClick={handleDateStatictick}>
            <SlidersHorizontal />
          </Button>
        </TooltipWrapper>

        <TooltipWrapper tooltipContent="Удалить">
          <Button variant="destructive" onClick={handleClear}>
            <Trash2 />
          </Button>
        </TooltipWrapper>
        <DownloadReport
          getOrder={orderData}
          startDate={startDate}
          endDate={endDate}
          setIsTooltip={setIsTooltip}
        />
      </div>
    </>
  )
}

export default FilteredTooltip
