import React, { useState, useRef } from "react"
import { useOutsideClick } from "../../hooks/useOutsideClick"
import "./SecondaryDropdown.css"

const SecondaryDropdown = ({ options, selected, onChange, placeholder }) => {
  const [open, setOpen] = useState(false)
  const [lastSelectedIndex, setLastSelectedIndex] = useState(null)
  const dropdownRef = useRef(null)

  const toggleDropdown = () => setOpen((prev) => !prev)

  const handleClick = (index, e) => {
    let newSelected = [...selected]
    const value = options[index]

    if (e.shiftKey && lastSelectedIndex !== null) {
      const [start, end] = [lastSelectedIndex, index].sort((a, b) => a - b)
      const range = options.slice(start, end + 1)
      newSelected = Array.from(new Set([...newSelected, ...range]))
    } else {
      if (newSelected.includes(value)) {
        newSelected = newSelected.filter((v) => v !== value)
      } else {
        newSelected.push(value)
      }
      setLastSelectedIndex(index)
    }

    onChange(newSelected)
  }

  useOutsideClick(dropdownRef, () => setOpen(false))

  return (
    <div ref={dropdownRef} className="secondary-dropdown">
      <button onClick={toggleDropdown}>
        {placeholder}
      </button>
      {open && (
        <ul>
          {options.map((opt, idx) => (
            <li
              key={opt}
              onClick={(e) => handleClick(idx, e)}
              className={selected.includes(opt) ? "selected" : ""}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SecondaryDropdown
