import React from "react";
import StatictickVideoAge from "./StatictickVideoAge";
import StatictickVideoGender from "./StatictickVideoGender";
import StatictickVideoGeo from "./StatictickVideoGeo";
import StatictickVideoDevice
  from "@/components/Dashboard/ChannelStatisticsPage/StatictickVideo/components/DopTable/Thead/StatictickVideoDevice.jsx";
function WrapperThead({ statistic }) {
  return (
    <>
      <StatictickVideoGender statistic={statistic} />
      <StatictickVideoAge statistic={statistic} />
      <StatictickVideoGeo statistic={statistic} />
      <StatictickVideoDevice statistic={statistic} />

    </>
  );
}

export default WrapperThead;
