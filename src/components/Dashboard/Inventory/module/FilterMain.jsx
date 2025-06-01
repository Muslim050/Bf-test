import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover.jsx'
import { Button } from '@/components/ui/button.jsx'
import Filter from '@/components/Dashboard/Inventory/module/Filter.jsx'
import React from 'react'
import { SlidersHorizontal } from 'lucide-react'

const FilterMain = ({
  channel,
  selectedOptionChannel,
  selectedFormat,
  handleSelectFormat,
  handleSelectChange,
  selectedChannel,
  handleSearch,
  handleClear,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="default">
          <SlidersHorizontal />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 mr-3.5 bg-white bg-opacity-30 backdrop-blur-md border-0 rounded-2xl">
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
          <Filter
            channel={channel}
            selectedOptionChannel={selectedOptionChannel}
            selectedFormat={selectedFormat}
            handleSelectFormat={handleSelectFormat}
            handleSelectChange={handleSelectChange}
            selectedChannel={selectedChannel}
            handleSearch={handleSearch}
            handleClear={handleClear}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default FilterMain
