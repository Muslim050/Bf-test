
import React from "react";
import {Input} from "@/components/ui/input.jsx";
import { FileSearch, X } from 'lucide-react';
const TableSearchInput = ({value: initialValue, onChange, debounce = 500, ...props}) => {
  const [value, setValue] = React.useState(initialValue)
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  const clearInput = () => {
    setValue('')
    onChange('')
  }

  return (
    <div className='relative'>
      <Input
        {...props}
        className={`max-w-[300px] !w-[300px] rounded-3xl sm:w-full border-0 text-white placeholder:text-white`}
        placeholder="Поиск по таблице"
        value={value}
        onChange={e => setValue(e.target.value)}
        style={{
          background:
            'linear-gradient(90deg, rgba(255, 255, 255, 0.17) 0%, rgba(255, 255, 255, 0.0289) 99.67%)',
        }}
      />
      {
        value ?
          <X className='absolute top-[8px]  right-2 cursor-pointer text-white hover:text-brandPrimary-1' onClick={clearInput}/> :
          <FileSearch className='absolute top-[8px]  right-2  text-white'/>
      }
    </div>
  )
}

export default TableSearchInput