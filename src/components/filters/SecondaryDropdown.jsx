import React, { useState, useRef } from "react"
import { useOutsideClick } from "../../hooks/useOutsideClick"

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
      <button
        onClick={toggleDropdown}
        className={`sd-control ${open ? "is-open" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="sd-value">{placeholder}</span>

        <span className="sd-actions">
          {selected.length > 0 && (
            <span
              className="sd-reset"
              onClick={(e) => {
                e.stopPropagation()
                onChange([])
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          )}

          <span className="sd-indicator" aria-hidden>
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </span>
        </span>
      </button>

      {open && (
        <ul className="sd-menu" role="listbox">
          {options.map((opt, idx) => {
            const isSelected = selected.includes(opt)
            return (
              <li
                key={opt}
                role="option"
                aria-selected={isSelected}
                onClick={(e) => handleClick(idx, e)}
                className={`sd-option ${isSelected ? "is-selected" : ""}`}
                tabIndex={0}
              >
                {opt}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )



}

export default SecondaryDropdown
