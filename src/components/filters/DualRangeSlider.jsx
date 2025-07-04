import React, { useState } from 'react'

function DualRangeSlider({ title, minValue, setMinValue, maxValue, setMaxValue, minLimit, maxLimit }) {
  // Maneja cambios en el slider mínimo
  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue - 1)
    setMinValue(value)
  }

  // Maneja cambios en el slider máximo
  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minValue + 1)
    setMaxValue(value)
  }

  // Maneja cambios en input mínimo editable
  const handleMinInputChange = (e) => {
    let value = Number(e.target.value)
    if (isNaN(value)) return
    if (value < minLimit) value = minLimit
    if (value >= maxValue) value = maxValue - 1
    setMinValue(value)
  }

  // Maneja cambios en input máximo editable
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
            value={minValue}
            onChange={handleMinChange}
            style={{ zIndex: 3 }}
          />

          {/* Slider máximo */}
          <input
            type="range"
            min={minLimit}
            max={maxLimit}
            value={maxValue}
            onChange={handleMaxChange}
            style={{ zIndex: 2 }}
          />

          {/* Barra de rango seleccionado */}
          <div
            style={{
              position: 'absolute',
              height: 6,
              background: '#0b79d0',
              top: 22,
              left: `${(minValue / maxLimit) * 100}%`,
              right: `${100 - (maxValue / maxLimit) * 100}%`,
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
