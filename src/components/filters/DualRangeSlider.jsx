import React from 'react'

function DualRangeSlider({
  title,
  isExponential = false,
  minValue,
  setMinValue,
  maxValue,
  setMaxValue,
  minLimit,
  maxLimit,
}) {
  const exp = 3 // potencia para la curva exponencial

  // Funciones para transformar valores si isExponential = true,
  // sino retornan el valor sin cambios.

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
  const handleMinChange = (e) => {
    const linearVal = Math.min(Number(e.target.value), maxLinear - 1)
    const expoVal = linearToExpo(linearVal)
    setMinValue(Math.round(expoVal))
  }

  const handleMaxChange = (e) => {
    const linearVal = Math.max(Number(e.target.value), minLinear + 1)
    const expoVal = linearToExpo(linearVal)
    setMaxValue(Math.round(expoVal))
  }

  // Inputs numéricos editables trabajan con valores "reales" (exponenciales o no)
  const handleMinInputChange = (e) => {
    let value = Number(e.target.value)
    if (isNaN(value)) return
    if (value < minLimit) value = minLimit
    if (value >= maxValue) value = maxValue - 1
    setMinValue(value)
  }

  const handleMaxInputChange = (e) => {
    let value = Number(e.target.value)
    if (isNaN(value)) return
    if (value > maxLimit) value = maxLimit
    if (value <= minValue) value = minValue + 1
    setMaxValue(value)
  }

  return (
    <div style={cssWrapperMain}>
      <h4 style={cssTitulo}>{title}</h4>
      <div style={cssWrapperSlider}>
        <style>{cssComponent}</style>

        {/* Input valor mínimo editable */}
        <input
          type="number"
          min={minLimit}
          max={maxLimit}
          value={minValue}
          onChange={handleMinInputChange}
          style={cssValueBox}
        />

        <div style={cssBar}>
          {/* Slider mínimo */}
          <input
            type="range"
            min={minLimit}
            max={maxLimit}
            value={minLinear}
            onChange={handleMinChange}
            style={{ zIndex: 3 }}
          />

          {/* Slider máximo */}
          <input
            type="range"
            min={minLimit}
            max={maxLimit}
            value={maxLinear}
            onChange={handleMaxChange}
            style={{ zIndex: 2 }}
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
            }}
          />
        </div>

        {/* Input valor máximo editable */}
        <input
          type="number"
          min={minLimit}
          max={maxLimit}
          value={maxValue}
          onChange={handleMaxInputChange}
          style={cssValueBox}
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

const cssWrapperMain = {
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: 320,
  margin: '0px',
}

const cssWrapperSlider = {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  margin: '0px auto',
}

const cssTitulo = {
  margin: '0px',
  marginBottom: 10,
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
