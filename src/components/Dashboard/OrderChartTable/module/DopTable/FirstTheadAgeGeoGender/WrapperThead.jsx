import React from 'react'
import TheadAge from './TheadAge'
import TheadGender from './TheadGender'
import TheadGeo from './TheadGeo'
function WrapperThead({ statistic }) {
  return (
    <>
      <TheadGender statistic={statistic} />
      <TheadAge statistic={statistic} />
      <TheadGeo statistic={statistic} />
    </>
  )
}

export default WrapperThead
