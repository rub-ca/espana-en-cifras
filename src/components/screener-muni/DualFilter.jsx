import React, { useState } from 'react'

function DualFilter() {
  const [minValue, setMinValue] = useState(20)
  const [maxValue, setMaxValue] = useState(80)

  const minLimit = 0
  const maxLimit = 100

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue - 1)
    setMinValue(value)
  }

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minValue + 1)
    setMaxValue(value)
  }

  return (
    <>
      <style>{`
        input[type=range] {
          -webkit-appearance: none;
          width: 100%;
          height: 6px;
          background: transparent;
          pointer-events: none; /* deshabilitamos pointer events en todo el slider */
          position: absolute;
          top: 22px;
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          pointer-events: auto; /* habilitamos pointer events SOLO en el thumb */
          height: 20px;
          width: 20px;
          background: #0b79d0;
          border-radius: 50%;
          cursor: pointer;
          margin-top: -7px; /* para centrar el thumb en la barra */
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
      `}</style>

      <div style={{ width: 300, margin: '50px auto', position: 'relative', height: 50 }}>
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

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 30 }}>
        <span>Mínimo: {minValue}</span>
        <span>Máximo: {maxValue}</span>
      </div>
    </>
  )
}

export default DualFilter
