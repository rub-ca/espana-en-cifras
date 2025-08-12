import React, { useEffect, useState } from "react"
import AsyncSelect from "react-select/async"

const PrimaryDropdown = ({ options, selected, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(null)

  useEffect(() => {
    if (!selected && options.length > 0) {
      onChange(options[0])
      setSelectedOption({ value: options[0], label: options[0] })
    } else if (selected) {
      setSelectedOption({ value: selected, label: selected })
    }
  }, [selected, options, onChange])

  const loadOptions = (inputValue, callback) => {
    const filtered = options
      .filter((opt) =>
        opt.toLowerCase().includes(inputValue.toLowerCase())
      )
      .map((opt) => ({ value: opt, label: opt }))
    callback(filtered)
  }

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      loadOptions={loadOptions}
      value={selectedOption}
      onChange={(option) => {
        setSelectedOption(option)
        onChange(option.value)
      }}
      isClearable
      menuPlacement="auto"
      menuPortalTarget={document.body}

      styles={{
        control: (provided) => ({
          ...provided,
          borderRadius: "12px",
          width: "250px", // ancho fijo del control
        }),
        dropdownIndicator: (provided) => ({
          ...provided,
          padding: "8px",
          color: "#000000ff",
        }),
        menu: (provided) => ({
          ...provided,
          borderRadius: "12px",
          overflow: "hidden",
          width: "300px", // ancho constante del menú
          minWidth: "300px",
        }),
        singleValue: (provided) => ({
          ...provided,
          fontWeight: "bold", // negrita para el valor seleccionado
        }),
      }}

    />
  )
}

export default PrimaryDropdown
