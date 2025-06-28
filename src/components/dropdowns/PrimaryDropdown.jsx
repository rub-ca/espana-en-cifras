import React, { useEffect } from "react"

const PrimaryDropdown = ({ options, selected, onChange }) => {
  useEffect(() => {
    if (!selected && options.length > 0) {
      onChange(options[0])
    }
  }, [selected, options, onChange])

  return (
    <select value={selected} onChange={(e) => onChange(e.target.value)}>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  )
}

export default PrimaryDropdown
