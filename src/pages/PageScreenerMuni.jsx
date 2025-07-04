import React, { useState } from "react"
import DualRangeSlider from "../components/screener-muni/DualRangeSlider.jsx"

const PageScreenerMuni = () => {
  const [title, setTitle] = useState('titulo')

  const [minValue, setMinValue] = useState(20)
  const [maxValue, setMaxValue] = useState(80)

  const minLimit = 0
  const maxLimit = 100

  const [title2, setTitle2] = useState('titulo')

  const [minValue2, setMinValue2] = useState(20000)
  const [maxValue2, setMaxValue2] = useState(1000000)

  const minLimit2 = 0
  const maxLimit2 = 10000000

  return (
    <div className="page-pob-container">
      <DualRangeSlider
        title={title}
        setTitle={setTitle}
        minValue={minValue}
        setMinValue={setMinValue}
        maxValue={maxValue}
        setMaxValue={setMaxValue}
        minLimit={minLimit}
        maxLimit={maxLimit}
      />
      <DualRangeSlider
        title={title2}
        setTitle={setTitle2}
        minValue={minValue2}
        setMinValue={setMinValue2}
        maxValue={maxValue2}
        setMaxValue={setMaxValue2}
        minLimit={minLimit2}
        maxLimit={maxLimit2}
      />
      <DualRangeSlider />
    </div>
  )
}

export default PageScreenerMuni
