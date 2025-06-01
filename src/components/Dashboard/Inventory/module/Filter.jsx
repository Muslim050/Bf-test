import React from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from '@/components/ui/select.jsx'
import { Button } from '@/components/ui/button.jsx'
import { SelectTrigger } from '@/components/ui/selectTrigger.jsx'
import { FileChartPie, FileCog, Tv } from 'lucide-react'
import TooltipWrapper from '@/shared/TooltipWrapper.jsx'

const formatV = [
  { value: 'preroll', text: 'Pre-roll' },
  { value: 'mixroll', text: 'Mix-roll' },
]

function Filter({
  channel,
  selectedOptionChannel,
  selectedFormat,
  handleSelectFormat,
  handleSelectChange,
  selectedChannel,
  handleSearch,
}) {
  return (
    <>
      <div className="flex flex-col gap-2">
        {/*Выбрать канал*/}
        <Select
          onValueChange={handleSelectChange}
          value={selectedOptionChannel}
        >
          <div className="bg-[#ffffff4d] px-2 py-2 h-[50px] rounded-2xl">
            <div
              className="text-xs flex gap-2 "
              style={{ color: 'var(--text-color )' }}
            >
              <Tv className="size-4" /> Канал
            </div>
            <SelectTrigger
              className="rounded-none border-0 p-0 h-auto pl-[25px] bg-transparent"
              style={{ color: 'var(--text-color )' }}
            >
              <SelectValue placeholder="Выбрать канал" />
            </SelectTrigger>
          </div>
          <SelectContent className="w-full">
            <SelectGroup>
              {channel?.results.map((option) => (
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
        {/*Выбрать канал*/}

        {/*Выбрать формат*/}
        <Select onValueChange={handleSelectFormat} value={selectedFormat}>
          <div className="bg-[#ffffff4d] px-2 py-2 h-[50px] rounded-2xl">
            <div
              className="text-xs flex gap-2 "
              style={{ color: 'var(--text-color )' }}
            >
              <FileCog
                className="size-4"
                style={{ color: 'var(--text-color )' }}
              />{' '}
              Формат
            </div>
            <SelectTrigger
              className="rounded-none border-0 p-0 h-auto pl-[25px] bg-transparent"
              style={{ color: 'var(--text-color )' }}
            >
              <SelectValue placeholder="Выбрать формат" />
            </SelectTrigger>
          </div>
          <SelectContent className="w-full">
            <SelectGroup>
              {formatV.map((option, index) => (
                <SelectItem
                  style={{ color: 'var(--text-color )' }}
                  key={index}
                  value={option.value}
                >
                  {option.text}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {/*Выбрать формат*/}

        {(selectedChannel || selectedFormat) && (
          // <Button
          //   variant="ghost"
          //   className="bg-brandPrimary-1 rounded-2xl hover:bg-brandPrimary-50 text-white no-underline hover:text-white h-[44px] w-full"
          //   onClick={handleSearch}
          // >
          //   Поиск
          // </Button>
          <div className="flex justify-end">
            <TooltipWrapper tooltipContent="Сортировать">
              <Button variant="default" onClick={handleSearch}>
                <FileChartPie />
              </Button>
            </TooltipWrapper>
          </div>
        )}
      </div>
    </>
  )
}

export default Filter
