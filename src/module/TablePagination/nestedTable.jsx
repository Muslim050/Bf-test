import OpenOrderTable from '@/components/Dashboard/Order/OpenOrder/index.jsx'

const NestedTable = ({ data }) => {
  return (
    <>
      <OpenOrderTable
        expandedRows={data.id}
        statusOr={data.status}
        advert={data.inventories}
      />
    </>
  )
}

export default NestedTable
