import React from 'react'
import {
  addDots, removeDots,
  getAgeGroup100ByNumberDRG, getNumberByAgeGroup100DRG,
  addPercentage, removePercentage
} from '../../js/utilsPob.js'

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
  shows = 'mil',          // 'mil' | 'age100' | 'percentage'
  compact = false         // modo compacto como en la foto
}) {
  const exp = 3

  // formateadores
  let modifyValue = addDots
  let deModifyValue = removeDots
  if (shows === 'age100') {
    modifyValue = getAgeGroup100ByNumberDRG
    deModifyValue = getNumberByAgeGroup100DRG
  } else if (shows === 'percentage') {
    modifyValue = addPercentage
    deModifyValue = removePercentage
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

  // handlers de los inputs numéricos
  const handleMinInputChange = (e) => {
    let value = Number(deModifyValue(e.target.value, false))
    if (isNaN(value)) return
    if (value < minLimit) value = minLimit
    if (value >= maxValue) value = maxValue - 1
    setMinValue(value)
  }
  const handleMaxInputChange = (e) => {
    let value = Number(deModifyValue(e.target.value, true))
    if (isNaN(value)) return
    if (value > maxLimit) value = maxLimit
    if (value <= minValue) value = minValue + 1
    setMaxValue(value)
  }

  // posiciones del tramo seleccionado (en %)
  const leftPct  = ((expoToLinear(minValue) - minLimit) / (maxLimit - minLimit)) * 100
  const rightPct = 100 - ((expoToLinear(maxValue) - minLimit) / (maxLimit - minLimit)) * 100

  return (
    <div
      className="drs"
      style={{
        marginBottom: marginBot,
        // variables de estilo (puedes ajustar si lo necesitas)
        ['--track-height']: '6px',
        ['--thumb-size']: '16px',
      }}
    >
      <h4
        className={`drs-title ${activado ? '' : 'is-disabled'}`}
        onClick={() => setActivado && setActivado(!activado)}
        style={{ cursor: setActivado ? 'pointer' : 'default' }}
      >
        {title}
      </h4>

      <div className="drs-row">
        {!compact && (
          <input
            type="text"
            className="drs-hiddenInput"
            min={minLimit}
            max={maxLimit}
            value={modifyValue(minValue, false)}
            onChange={handleMinInputChange}
            disabled={!activado}
          />
        )}

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
            value={minLinear}
            onChange={handleMinChange}
            className={`drs-input ${activado ? '' : 'hidden'}`}
          />
          <input
            type="range"
            min={minLimit}
            max={maxLimit}
            value={maxLinear}
            onChange={handleMaxChange}
            className={`drs-input ${activado ? '' : 'hidden'}`}
          />
        </div>

        {!compact && (
          <input
            type="text"
            className="drs-hiddenInput"
            min={minLimit}
            max={maxLimit}
            value={modifyValue(maxValue, true)}
            onChange={handleMaxInputChange}
            disabled={!activado}
          />
        )}
      </div>

      {compact && (
        <div className="drs-labels" aria-hidden>
          <span>{modifyValue(minValue, false)}</span>
          <span>{modifyValue(maxValue, true)}</span>
        </div>
      )}
    </div>
  )
}

export default DualRangeSlider
