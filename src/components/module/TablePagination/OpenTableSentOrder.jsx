import OpenOrderTable from "@/components/Dashboard/Order/OpenOrder/index.jsx";
import React from "react";
import OpenTableSentOrder from "@/components/Dashboard/SentOrder/OpenTableSentOrder/OpenTableSentOrder.jsx";
const NestedTable = ({ data }) => {

  return (
    <>
      <OpenTableSentOrder item={data} />


    </>

);
};

export default NestedTable