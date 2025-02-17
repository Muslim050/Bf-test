import React from 'react';
import { Button } from '@/components/ui/button.jsx';

// Общий блок информации
const InfoBlock = ({ children }) => (
  <div className="rounded-[22px] bg-[#FFFFFF1A] h-[40px] p-2 text-white text-sm px-5 flex items-center justify-center">
    {children}
  </div>
);

const formatDate = (date) =>
  date?.toLocaleDateString('en-GB').replaceAll('/', '-');

const formatMonth = (date) =>
  date
    ? date.toLocaleString('ru-RU', { month: 'long' }).toLowerCase()
    : 'All';

const OrderChartRow = ({
                         selectedAdvName,
                         handleClear,
                         startDate,
                         endDate,
                         startDateMonth,
                         endDateMonth,
                         selectedMonth,
                       }) => {


  return (
    <div className="flex flex-wrap gap-2 items-center mr-2">
      {/* Кнопка очистки */}
      {selectedAdvName && (
        <Button
          variant="link"
          onClick={handleClear}
          className="text-[#A7CCFF] px-0"
        >
          Очистить
        </Button>
      )}

      {/* Блоки с датами */}
      {(startDate || endDate) && (
        <InfoBlock>
          {startDate && formatDate(startDate)} {endDate && ` - ${formatDate(endDate)}`}
        </InfoBlock>
      )}

      {/* Блок с месяцами */}
      {(startDateMonth || endDateMonth) && (
        <InfoBlock>{formatMonth(selectedMonth)}</InfoBlock>
      )}

      {/* Блок с выбранным рекламодателем */}
      {selectedAdvName && <InfoBlock>{selectedAdvName}</InfoBlock>}
    </div>
  );
};

export default OrderChartRow;
