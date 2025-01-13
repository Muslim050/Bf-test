import React from 'react'
import style from './FilteredTooltip.module.scss'
import DownloadReport from '../DownloadReport'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Label } from '@/components/ui/label.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Trash2 } from 'lucide-react'

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
      <div>
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

        <div className="grid pt-3">
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

        <div style={{ display: 'flex', marginTop: '10px', gap: '10px' }}>
          <Button
            variant="ghost"
            className="bg-brandPrimary-1 rounded-[12px] hover:bg-brandPrimary-50 text-white no-underline hover:text-white h-[44px] w-full"
            onClick={handleDateStatictick}
          >
            Сортировать
          </Button>

          <Button
            onClick={handleClear}
            className="bg-red-400 rounded-[12px] hover:bg-red-500 text-white no-underline hover:text-white h-[44px] w-full"
          >
            {/*<Delete style={{ width: '23px', height: '23px' }} />*/}
            <Trash2 />
          </Button>
          <DownloadReport
            getOrder={orderData}
            startDate={startDate}
            endDate={endDate}
            setIsTooltip={setIsTooltip}
          />
        </div>

        {/*<div style={{width: '100%'}}>*/}

        {/*</div>*/}
      </div>
    </>
  )
}

export default FilteredTooltip
