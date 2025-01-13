import { formatDate } from '../../../../../utils/formatterDate'

const SelectedFilterCart = ({ dataFiltered, startDate, endDate }) => {
  return (
    <>
      {dataFiltered && (
        <div className="border border-[#d9d9d936] rounded-lg	">
          <div className="text-sm text-white px-6 flex items-center h-full	">
            {formatDate(startDate)} - {formatDate(endDate)}
          </div>
        </div>
      )}
    </>
  )
}

export default SelectedFilterCart
