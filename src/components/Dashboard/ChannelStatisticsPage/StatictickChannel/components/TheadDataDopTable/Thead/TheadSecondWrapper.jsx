import React from "react";
import OrderChartAge from "./StatictickAge";
import OrderChartGender from "./StatictickGender";
import OrderChartGeo from "./StatictickAgeGeo";
import OrderChartDevice from "./StatictickDevice";
function TheadSecondWrapper({ dataChannel }) {
  return (
    <>
      <OrderChartGender dataChannel={dataChannel} />
      <OrderChartAge dataChannel={dataChannel} />
      <OrderChartGeo dataChannel={dataChannel} />
      <OrderChartDevice dataChannel={dataChannel} />

    </>
  );
}

export default TheadSecondWrapper;
