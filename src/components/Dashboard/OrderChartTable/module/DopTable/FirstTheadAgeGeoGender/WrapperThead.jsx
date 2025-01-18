import React from 'react'
import TheadAge from './TheadAge'
import TheadGender from './TheadGender'
import TheadGeo from './TheadGeo'
import TheadDevaice
  from "@/components/Dashboard/OrderChartTable/module/DopTable/FirstTheadAgeGeoGender/TheadDevaice.jsx";
function WrapperThead({ statistic }) {
  return (
    <>
      <TheadDevaice statistic={statistic} />

      <TheadGender statistic={statistic} />

      <TheadAge statistic={statistic} />
      <TheadGeo statistic={statistic} />
    </>
  )
}

export default WrapperThead
