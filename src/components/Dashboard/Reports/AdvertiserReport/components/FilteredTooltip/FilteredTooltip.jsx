import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
// import {ReactComponent as Delete} from '@/assets/Delete.svg'
import ru from 'date-fns/locale/ru'
import DownloadReport from '../DownloadReport'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from '@/components/ui/select.jsx'
import { SelectTrigger } from '@/components/ui/selectTrigger.jsx'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button.jsx'
import { Trash2 } from 'lucide-react'
import { Tv } from 'lucide-react';

function FilteredTooltip({

  handleDateStatictick,
  startDate,
  endDate,
  advdata,
  selectedOptionAdv,
  handleSelectChangeADV,
  ///
  selectedAdv,
  handleClear,
  selectedAdvName,
//
  handleStartDateChange,
  handleEndDateChange,
  handleDateChange,
  startDateMonth,
  endDateMonth,
  selectedMonth,
  setIsTooltip,
  tableData,

}) {
  return (
    <>
      <div >
        {/*  */}
        <Select onValueChange={handleSelectChangeADV} value={selectedOptionAdv}>
          <div className="bg-white bg-opacity-20 backdrop-blur-md px-2 py-2 h-[50px] rounded-[18px]">
            <div
              className="text-xs flex gap-2 ml-1"
              style={{ color: 'var(--text-color )' }}
            >
              <Tv className='size-4'/> Рекламодатель
            </div>
            <SelectTrigger
              className="rounded-none border-0 p-0 h-auto pl-[28px] "
              style={{ color: 'var(--text-color )' }}
            >
              <SelectValue placeholder="Выбрать рекламодателя" />
            </SelectTrigger>
          </div>
          <SelectContent className="w-full rounded-[18px]">
            <SelectGroup>
              {advdata.results.map((option) => (
                <SelectItem
                  style={{ color: 'var(--text-color )' }}
                  key={option.id}
                  value={JSON.stringify(option)}
                  className='rounded-[18px]'
                >
                  {option.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {/*  */}

        <div
          style={{
            display: 'flex',
            marginTop: '10px',
            gap: '10px',
            position: 'relative',
          }}
        >


          <div className="grid">
            <Label
              htmlFor="terms"
              className=" pb-1 text-xs	"
              style={{ color: 'var(--text-color )' }}
            >
              Дата начало
            </Label>
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              dateFormat="dd-MM-yyyy"
              className="bg-white bg-opacity-30 backdrop-blur-md px-2 py-2 h-[45px] rounded-[18px] w-full text-white"
            />
          </div>

          <div className="grid">
            <Label
              htmlFor="terms"
              className=" pb-1 text-xs	"
              style={{ color: 'var(--text-color )' }}
            >
              Дата конец
            </Label>
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              className="bg-white bg-opacity-30 backdrop-blur-md px-2 py-2 h-[45px] rounded-[18px] w-full text-white"
              dateFormat="dd-MM-yyyy"
            />
          </div>
        </div>

        <div className="grid pt-2">
          <Label
            htmlFor="terms"
            className=" pb-1 text-xs	"
            style={{ color: 'var(--text-color )' }}
          >
            Месяц
          </Label>
          <DatePicker
            onChange={handleDateChange}
            selected={selectedMonth}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            showFullMonthYearPicker
            className="bg-white bg-opacity-30 backdrop-blur-md px-2 py-2 h-[45px] rounded-[18px] w-full text-white"
            disabled={!!startDate || !!endDate} // Здесь используется приведение dateRange к булевому типу
            locale={ru}
          />
        </div>

        <div style={{ display: 'flex', marginTop: '10px', gap: '10px' }}>
          {
            <Button
              variant="ghost"
              className="bg-brandPrimary-1 rounded-[18px] hover:bg-brandPrimary-50 text-white no-underline hover:text-white h-[44px] w-full"
              onClick={handleDateStatictick}
              disabled={!selectedAdvName}
            >
              Сортировать
            </Button>
          }
          {startDate || endDate || endDateMonth || startDateMonth ? (
            <DownloadReport
              selectedAdv={selectedAdv}
              selectedAdvName={selectedAdvName}
              setIsTooltip={setIsTooltip}
              tableData={tableData}
              startDate={startDate}
              endDate={endDate}
              endDateMonth={endDateMonth}
              startDateMonth={startDateMonth}
            />
          ) : null}
          {(startDate || endDate || selectedAdvName) && (
            <div>
              <Button
                onClick={handleClear}
                className="bg-red-400 rounded-[18px] hover:bg-red-500 text-white no-underline hover:text-white h-[44px] w-full"
              >
                {/*<Delete style={{ width: '23px', height: '23px' }} />*/}
                <Trash2 />
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default FilteredTooltip
