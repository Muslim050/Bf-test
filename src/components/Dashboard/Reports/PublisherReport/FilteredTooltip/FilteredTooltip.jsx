import React from 'react'
import style from './FilteredTooltip.module.scss'
import {Monitor, MonitorPlay, MonitorUp, FileCog} from 'lucide-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ru from 'date-fns/locale/ru' // Импортируйте русскую локаль
import DownloadReport from '../DownloadReport'
import { SelectTrigger } from '@/components/ui/selectTrigger.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Trash2 } from 'lucide-react'
import { Label } from '@/components/ui/label'
import Cookies from 'js-cookie'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from '@/components/ui/select.jsx'
import { Tv } from 'lucide-react';

const formatV = [
  { value: 'preroll', text: 'Pre-roll', icon: Monitor },
  { value: 'tv_preroll', text: 'TV Pre-roll', icon: MonitorPlay },
  { value: 'top_preroll', text: 'Top Pre-roll', icon: MonitorUp  },
]

function FilteredTooltip({
  isTooltip,
  dateRange,
  //
  startDate,
  endDate,
  //
  handleSelectFormat,
  selectedFormat,
  //
  handleProfileClick,
  //
  advdata,
  channel,
  //
  selectedChannel,
  handleSelectChange,
  //
  handleSearch,
  handleClear,
  //
  handleEndDateChange,
  selectedOptionChannel,
  endDateMonth,
  startDateMonth,
  selectedMonth,
  handleDateChange,
  publisher,
  handleSelectChangePablisher,
  selectedOptionPublisher,
  selectedPublisher,
  selectedChannelName,
  selectedPublisherName,
}) {
  const user = Cookies.get('role')
  console.log (publisher.results)
  return (
    <div className="flex flex-col gap-2">
      {user === 'admin' && (
        <div style={{ margin: '10px 0 ' }}>
          <Select onValueChange={handleSelectChangePablisher} value={selectedOptionPublisher} >
            <div className="bg-white bg-opacity-30 backdrop-blur-md px-2 py-2 h-[50px] rounded-2xl">
              <div
                className="text-xs flex gap-2"
                style={{ color: 'var(--text-color )' }}
              >
                <Tv className='size-4'/> Паблишер
              </div>
              <SelectTrigger
                className="rounded-none border-0 p-0 h-auto pl-[25px] "
                style={{ color: 'var(--text-color )' }}
              >
                <SelectValue placeholder="Выбрать паблишера" />
              </SelectTrigger>
            </div>
            <SelectContent className="w-full">
              <SelectGroup>
                {publisher?.results?.map((option) => (
                  <SelectItem
                    style={{ color: 'var(--text-color )' }}
                    key={option.id}
                    value={JSON.stringify(option)}
                  >
                    {option.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {/*<label*/}
          {/*  style={{*/}
          {/*    fontSize: '14px',*/}
          {/*    color: 'var(--text-color)',*/}
          {/*    fontWeight: '400',*/}
          {/*  }}*/}
          {/*>*/}
          {/*  Выбрать паблишера*/}
          {/*  <select*/}
          {/*    value={selectedOptionPublisher} // Используйте ID, а не имя, для value*/}
          {/*    onChange={handleSelectChangePablisher}*/}
          {/*    style={{ width: '100%' }}*/}
          {/*    className={`${style.input} bg-white bg-opacity-30 backdrop-blur-md`}*/}
          {/*  >*/}
          {/*    <option value="">Выберите паблишера</option>*/}
          {/*    {publisher.map((option) => (*/}
          {/*      <option key={option.id} value={JSON.stringify(option)}>*/}
          {/*        {option.name}*/}
          {/*      </option>*/}
          {/*    ))}*/}
          {/*  </select>*/}
          {/*</label>*/}
        </div>
      )}

      <Select onValueChange={handleSelectChange} value={selectedOptionChannel}>
        <div className="bg-white bg-opacity-30 backdrop-blur-md px-2 py-2 h-[50px] rounded-2xl">
          <div
            className="text-xs flex gap-2"
            style={{ color: 'var(--text-color )' }}
          >
            <Tv className='size-4'/> Канал
          </div>
          <SelectTrigger
            className=" border-0 p-0 h-auto pl-[25px] "
            style={{ color: 'var(--text-color )' }}
          >
            <SelectValue placeholder="Выбрать канал" />
          </SelectTrigger>
        </div>
        <SelectContent className="w-full">
          <SelectGroup>
            {channel?.results?.map((option) => (
              <SelectItem
                style={{ color: 'var(--text-color )' }}
                key={option.id}
                value={JSON.stringify(option)}
              >
                {option.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div style={{ display: 'flex', gap: '10px', margin: '10px 0 ' }}>
        <div
          className="w-full"
          style={{
            display: 'flex',
            flexDirection: 'column',
            color: 'var(--text-color )',
          }}
        >
          <Label htmlFor="terms" style={{ color: 'var(--text-color )' }}>
            Месяц
          </Label>

          <DatePicker
            onChange={handleDateChange}
            selected={selectedMonth}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            showFullMonthYearPicker
            className="bg-white bg-opacity-30 backdrop-blur-md px-2 py-2 h-[50px] rounded-2xl w-full text-sm"
            // disabled={!!dateRange[0] || !!dateRange[1]}
            locale={ru}
          />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            color: 'var(--text-color )',
          }}
          className="w-full"
        >
          <Label htmlFor="terms" style={{ color: 'var(--text-color )' }}>
            Дата Конец
          </Label>

          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            className="bg-white bg-opacity-30 backdrop-blur-md px-2 py-2 h-[50px] rounded-2xl w-full text-sm"
            dateFormat="dd-MM-yyyy"
            disabled={!!startDateMonth || !!endDateMonth} // Здесь используется приведение dateRange к булевому типу
          />
        </div>
      </div>
      {/*Выбрать формат*/}
      <Select onValueChange={handleSelectFormat} value={selectedFormat}>
        <div className="bg-white bg-opacity-30 backdrop-blur-md px-2 py-2 h-[50px] rounded-2xl">
          <div
            className="text-xs flex gap-2 "
            style={{ color: 'var(--text-color )' }}
          >
            <FileCog className='size-4' /> Формат
          </div>
          <SelectTrigger
            className="rounded-none border-0 p-0 h-auto pl-[25px] "
            style={{ color: 'var(--text-color )' }}
          >
            <SelectValue placeholder="Выбрать формат" />
          </SelectTrigger>
        </div>
        <SelectContent className="w-full">
          <SelectGroup>
            {formatV.map((option, index) => (
              <SelectItem
                key={index}
                value={option.value}
                style={{color: 'var(--text-color )'}}
              >
                <div className='!flex items-center gap-1'>
                  {option.icon &&
                    <option.icon/>
                    // <img src={option.icon} alt="" className='size-4'/>
                  }
                  {option.text}
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {/*Выбрать формат*/}
      <div
        style={{
          display: 'flex',
          marginTop: '20px',
          gap: '10px',
          height: '50px',
        }}
      >
        <div style={{width: '100%', height: '100%'}}>
        <Button
            variant="ghost"
            className="bg-brandPrimary-1 rounded-lg hover:bg-brandPrimary-50 text-white no-underline hover:text-white h-[44px] w-full"
            onClick={handleSearch}
            disabled={!startDateMonth || !endDateMonth}
          >
            Сортировать
          </Button>
        </div>

        {(startDateMonth ||
          endDateMonth ||
          startDate ||
          endDate ||
          selectedChannel) && (
          <DownloadReport
            startDate={startDate}
            endDate={endDate}
            startDateMonth={startDateMonth}
            endDateMonth={endDateMonth}
            channelId={selectedChannel}
            publisherId={selectedPublisher}
            selectedChannelsName={selectedChannelName}
            formatOrder={selectedFormat}
            selectedPublisherName={selectedPublisherName}
          />
        )}

        {(selectedChannel ||
          startDate ||
          endDate ||
          selectedFormat ||
          startDateMonth ||
          endDateMonth ||
          selectedPublisher) && (
          <div>
            <Button
              onClick={handleClear}
              className="bg-red-400 rounded-lg hover:bg-red-500 text-white no-underline hover:text-white h-[44px] w-full"
            >
              {/*<Delete style={{ width: '23px', height: '23px' }} />*/}
              <Trash2 />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default FilteredTooltip
