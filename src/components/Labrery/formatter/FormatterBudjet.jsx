const currentDate = new Date('2024-01-10')

function FormatterBudget(props) {
  const roundedNumber = props?.budget ? Math.round(props.budget) : null
  const formattedNumber = roundedNumber
    ? roundedNumber.toLocaleString('ru-RU')
    : ''
  // Проверка, прошла ли дата
  const orderDate = new Date(props.data)
  const isPastDate = orderDate < currentDate

  return (
    <div>
      {formattedNumber ? (
        <div className="flex items-center">
          {formattedNumber}
          {isPastDate ? (
            '$'
          ) : (
            <div
              className={`${
                props.className ? props.className : 'text-base'
              } leading-[9px] ml-1`}
            >
              сум
            </div>
          )}
        </div>
      ) : (
        '---'
      )}
    </div>
  )
}

export default FormatterBudget

export function TiinFormatterBudget(props) {
  let budget = props?.budget

  // Если бюджет приходит как строка, приводим его к числу
  if (typeof budget === 'string') {
    // Убираем пробелы и заменяем запятую на точку
    budget = budget.replace(/\s/g, '').replace(',', '.')
    budget = Number(budget)
  }

  // Если budget число, обрезаем до 2 знаков после запятой (без округления)
  if (typeof budget === 'number') {
    budget = Math.trunc(budget * 100) / 100
  }

  const formattedNumber = budget
    ? budget.toLocaleString('ru-RU', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : ''

  return (
    <div>
      {formattedNumber ? (
        <div className="flex items-center">
          {formattedNumber}
          <div
            className={`${
              props.className ? props.className : 'text-base'
            } leading-[9px] ml-1`}
          >
            сум
          </div>
        </div>
      ) : (
        '---'
      )}
    </div>
  )
}
