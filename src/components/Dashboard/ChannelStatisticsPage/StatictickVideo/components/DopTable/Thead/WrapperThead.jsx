import React from "react";
import StatictickVideoAge from "./StatictickVideoAge";
import StatictickVideoGender from "./StatictickVideoGender";
import StatictickVideoGeo from "./StatictickVideoGeo";
function WrapperThead({ statistic }) {
  return (
    <>
      <StatictickVideoGender statistic={statistic} />
      <StatictickVideoAge statistic={statistic} />
      <StatictickVideoGeo statistic={statistic} />
    </>
  );
}

export default WrapperThead;
