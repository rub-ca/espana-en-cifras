import React from 'react'
import { addDots, removeDots, getAgeGroup100ByNumberDRG, getNumberByAgeGroup100DRG, addPercentage, removePercentage } from '../../js/utilsPob.js'

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
  marginBot = '40px',
  shows = 'mil', // mil \ age100 \ percentage
}) {
  const exp = 3

  let modifyValue = addDots
  let deModifyValue = removeDots

  if (shows == 'age100') {
    modifyValue = getAgeGroup100ByNumberDRG
    deModifyValue = getNumberByAgeGroup100DRG
  } else if (shows == 'percentage') {
    modifyValue = addPercentage
    deModifyValue = removePercentage
  }

  // const modifyValue = shows === 'mil' ? addDots : getAgeGroup100ByNumberDRG
  // const deModifyValue = shows === 'mil' ? removeDots : getNumberByAgeGroup100DRG

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

  // Valores lineales para posicionar sliders (la posición real que mueve el input range)
  const minLinear = expoToLinear(minValue)
  const maxLinear = expoToLinear(maxValue)

  // Handlers para los sliders (trabajan en escala lineal, convierten a exponencial si toca)
  // El valor de la edad hay que modificarlo porque queremos uno de los limites
  // El valor de los numeros al ser solo un punto pero el valor ser el mismo no es necesario:
  const handleMinChange = (e) => {
    if (shows === 'age100') e.target.value = modifyValue(e.target.value, false)
    const linearVal = Math.min(Number(e.target.value), maxLinear - 1)
    const expoVal = linearToExpo(linearVal)
    setMinValue(Math.round(expoVal))
  }
  const handleMaxChange = (e) => {
    if (shows === 'age100') {
      if (modifyValue(e.target.value, true) == '++100') { e.target.value = '100' }
      else {
        const newVal = modifyValue(e.target.value, true)
        e.target.value = newVal
      }
    }

    const linearVal = Math.max(Number(e.target.value), minLinear + 1)
    const expoVal = linearToExpo(linearVal)
    setMaxValue(Math.round(expoVal))
  }

  // Inputs numéricos editables trabajan con valores "reales" (exponenciales o no)
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

  return (
    <div style={cssWrapperMain(marginBot)}>
      <h4
        style={cssTitulo(activado, setActivado)}
        onClick={() => {
          setActivado(!activado)
        }}>
        {title}
      </h4>


      <div style={cssWrapperSlider}>
        <style>{cssComponent}</style>

        {/* Input valor mínimo editable */}
        <input
          type="text"
          min={minLimit}
          max={maxLimit}
          value={modifyValue(minValue, false)}
          onChange={handleMinInputChange}
          style={cssValueBox}
          disabled={!activado}
        />

        <div style={cssBar}>
          {/* Slider mínimo */}
          <input
            type="range"
            min={minLimit}
            max={maxLimit}
            value={minLinear}
            onChange={handleMinChange}
            style={{ zIndex: 3, display: activado ? 'block' : 'none' }}
          />

          {/* Slider máximo */}
          <input
            type="range"
            min={minLimit}
            max={maxLimit}
            value={maxLinear}
            onChange={handleMaxChange}
            style={{ zIndex: 2, display: activado ? 'block' : 'none' }}
            disabled={!activado}
          />

          {/* Barra de rango seleccionado */}
          <div
            style={{
              position: "absolute",
              height: 6,
              background: "#0b79d0",
              top: 22,
              left: `${((expoToLinear(minValue) - minLimit) / (maxLimit - minLimit)) * 100}%`,
              right: `${100 - ((expoToLinear(maxValue) - minLimit) / (maxLimit - minLimit)) * 100}%`,
              borderRadius: 4,
              zIndex: 1,
              display: activado ? 'block' : 'none',
            }}
          />
        </div>

        {/* Input valor máximo editable */}
        <input
          type="text"
          min={minLimit}
          max={maxLimit}
          value={modifyValue(maxValue, true)}
          onChange={handleMaxInputChange}
          style={cssValueBox}
          disabled={!activado}
        />
      </div>
    </div>
  )
}


const cssComponent = `
  input[type=range] {
    -webkit-appearance: none;
    width: 100%;
    height: 6px;
    background: transparent;
    pointer-events: none;
    position: absolute;
    top: 22px;
  }
  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    pointer-events: auto;
    height: 20px;
    width: 20px;
    background: #0b79d0;
    border-radius: 50%;
    cursor: pointer;
    margin-top: -7px;
    position: relative;
    z-index: 3;
  }
  input[type=range]::-moz-range-thumb {
    pointer-events: auto;
    height: 20px;
    width: 20px;
    background: #0b79d0;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    z-index: 3;
  }
`

function cssWrapperMain(marginBot) {
  return {
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 320,
    margin: '0px',
    marginBottom: marginBot,
  }
}

const cssWrapperSlider = {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  margin: '0px auto',
}

function cssTitulo(a, sA) {
  return {
    textAlign: 'center',
    margin: '0px',
    marginBottom: 10,
    color: a ? 'black' : 'gray',
    cursor: sA === null ? 'default' : 'pointer',
  }
}


const cssBar = {
  position: 'relative',
  height: 40,
  flexGrow: 1,
}

const cssValueBox = {
  width: 80,
  height: 40,
  borderRadius: 4,
  border: '1px solid #ccc',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: 12,
  margin: '0px',
}

export default DualRangeSlider
