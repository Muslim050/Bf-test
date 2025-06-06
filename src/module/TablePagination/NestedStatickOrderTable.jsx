
import DopTable from "@/components/Dashboard/OrderChartTable/module/DopTable/index.jsx";
const NestedStatickOrderTable = ({ data }) => {

  return (
    <>
      <DopTable
        statistic={data}
        data={data}
      />
    </>
);
};

export default NestedStatickOrderTable