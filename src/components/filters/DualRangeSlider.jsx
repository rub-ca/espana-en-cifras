import React from 'react'
import { addDots, getAgeGroup100ByNumberDRG, addPercentage, } from '../../js/utilsPob.js'

function DualRangeSlider({
  title,
  isExponential = false,
  minValue,
  setMinValue,
  maxValue,
  setMaxValue,
  minLimit,
  maxLimit,
  activado = true,
  setActivado = null,
  marginBot = '20px',
  shows = 'mil'          // 'mil' | 'age100' | 'percentage'
}) {
  const exp = 3

  // formateadores
  let modifyValue = addDots
  if (shows === 'age100') {
    modifyValue = getAgeGroup100ByNumberDRG
  } else if (shows === 'percentage') {
    modifyValue = addPercentage
  }

  // conversión lineal/exponencial
  const linearToExpo = (linearVal) => {
    if (!isExponential) return linearVal
    const pos = (linearVal - minLimit) / (maxLimit - minLimit)
    return minLimit + (maxLimit - minLimit) * Math.pow(pos, exp)
  }
  const expoToLinear = (expoVal) => {
    if (!isExponential) return expoVal
    const pos = (expoVal - minLimit) / (maxLimit - minLimit)
    return minLimit + (maxLimit - minLimit) * Math.pow(pos, 1 / exp)
  }

  // valores para los sliders (escala lineal)
  const minLinear = expoToLinear(minValue)
  const maxLinear = expoToLinear(maxValue)

  // handlers de los sliders
  const handleMinChange = (e) => {
    if (shows === 'age100') e.target.value = modifyValue(e.target.value, false)
    const linearVal = Math.min(Number(e.target.value), maxLinear - 1)
    setMinValue(Math.round(linearToExpo(linearVal)))
  }
  const handleMaxChange = (e) => {
    if (shows === 'age100') {
      const v = modifyValue(e.target.value, true)
      e.target.value = (v === '++100') ? '100' : v
    }
    const linearVal = Math.max(Number(e.target.value), minLinear + 1)
    setMaxValue(Math.round(linearToExpo(linearVal)))
  }

  // posiciones del tramo seleccionado (en %)
  const leftPct = ((expoToLinear(minValue) - minLimit) / (maxLimit - minLimit)) * 100
  const rightPct = 100 - ((expoToLinear(maxValue) - minLimit) / (maxLimit - minLimit)) * 100

  return (
    <div className="drs">
      <h4
        className={`drs-title ${activado ? '' : 'is-disabled'}`}
        onClick={() => setActivado && setActivado(!activado)}
        style={{ cursor: setActivado ? 'pointer' : 'default' }}
      >
        {title}
      </h4>

      <div className="drs-row">
        <div className="drs-labels">
          <span>{modifyValue(minValue)}</span>
        </div>
        <div className="drs-sliderWrap">
          <div className="drs-base" />
          <div
            className={`drs-selected ${activado ? '' : 'hidden'}`}
            style={{ left: `${leftPct}%`, right: `${rightPct}%` }}
          />
          <input
            type="range"
            min={minLimit}
            max={maxLimit}
            step={1}
            value={minLinear}
            onChange={handleMinChange}
            className={`drs-input ${activado ? '' : 'hidden'}`}
          />
          <input
            type="range"
            min={minLimit}
            max={maxLimit}
            step={1}
            value={maxLinear}
            onChange={handleMaxChange}
            className={`drs-input ${activado ? '' : 'hidden'}`}
          />
        </div>
        <div className="drs-labels">
          <span>{modifyValue(maxValue)}</span>
        </div>
      </div>
    </div>
  )


}

export default DualRangeSlider
