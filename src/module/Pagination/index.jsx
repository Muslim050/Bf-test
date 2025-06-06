
import { ChevronLeft, ChevronsLeft, ChevronsRight, ChevronRight } from 'lucide-react';
import React from "react";
import {ThemeContext} from "@/utils/ThemeContext.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Input} from "@/components/ui/input.jsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import {SelectTrigger} from "@/components/ui/selectTrigger.jsx";
const Pagination = ({table, pagination}) => {
  const { textColor } = React.useContext(ThemeContext)
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Button
        className={`border-0 rounded-xl p-1.5 bg-[var(--bg-color)] hover:scale-105 transition-all duration-100 ${!table.getCanPreviousPage () && 'bg-gray-500 text-gray-400 '}`}
        onClick={() => table.firstPage ()}
        disabled={!table.getCanPreviousPage ()}
      >
        <ChevronsLeft/>
      </Button>
      <Button
        className={`border-0 rounded-xl p-1.5 bg-[var(--bg-color)] hover:scale-105 transition-all duration-100 ${!table.getCanPreviousPage () && 'bg-gray-500 text-gray-400 '}`}
        onClick={() => table.previousPage ()}
        disabled={!table.getCanPreviousPage ()}
      >
        <ChevronLeft/>
      </Button>
      <Button
        className={`border-0 rounded-xl p-1.5 bg-[var(--bg-color)] hover:scale-105 transition-all duration-100 ${!table.getCanNextPage () && 'bg-gray-500 text-gray-400 '}`}
        onClick={() => {
          table.nextPage (); // Переход на следующую страницу
        }}
        disabled={!table.getCanNextPage ()}
      >
        <ChevronRight/>
      </Button>
      <Button
        className={`border-0 rounded-xl p-1.5 bg-[var(--bg-color)] hover:scale-105 transition-all duration-100 ${!table.getCanNextPage () && 'bg-gray-500 text-gray-400 '}`}
        onClick={() => table.lastPage ()}
        disabled={!table.getCanNextPage ()}
      >
        <ChevronsRight/>
      </Button>
      <span className={`flex items-center gap-1 text-${textColor}`}>
          <div>Страница</div>
          <strong>
            {table.getState ().pagination.pageIndex + 1} из{' '}
            {table.getPageCount ().toLocaleString ()}
          </strong>
        </span>
      <span className="flex items-center gap-1">
        <div className={`text-${textColor}`}>| Перейти на страницу:</div>
  <Input
    type="number"
    min="1"
    max={table.getPageCount ()}
    value={pagination.pageIndex + 1} // Отображаем текущую страницу (API использует нумерацию с 1)
    onChange={(e) => {
      const newPage = e.target.value ? Number (e.target.value) - 1 : 0; // Конвертируем в индекс страницы
      if (newPage >= 0 && newPage < table.getPageCount ()) {
        table.setPageIndex (newPage); // Устанавливаем новую страницу
      }
    }}
    onBlur={(e) => {
      // Обработка при выходе из фокуса, если значение некорректное
      const newPage = e.target.value ? Number (e.target.value) - 1 : 0;
      if (newPage < 0 || newPage >= table.getPageCount ()) {
        e.target.value = pagination.pageIndex + 1; // Возвращаем к текущему значению
      }
    }}
    className={`border-0 p-2 rounded-xl w-16 bg-[var(--bg-color)] text-${textColor}`}
  />
</span>

      <Select
        value={pagination.pageSize.toString()} // Устанавливаем текущее значение
        onValueChange={(value) => {
          table.setPageSize(Number(value)); // Устанавливаем новый размер страницы
        }}
      >
        <SelectTrigger className={`w-auto  bg-[var(--bg-color)] text-${textColor} border-0`}> {/* Добавляем текстовый цвет */}
          <SelectValue placeholder={`Show ${pagination.pageSize}`} />
        </SelectTrigger>

        <SelectContent className="w-full text-white bg-[var(--bg-color)] border-0">
          <SelectGroup>
            {[20, 30, 50, 60].map ((pageSize) => (
              <SelectItem key={pageSize} value={pageSize.toString()} className="text-white"> {/* Добавляем цвет текста */}
                Показать {pageSize}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

  )
}

export default Pagination