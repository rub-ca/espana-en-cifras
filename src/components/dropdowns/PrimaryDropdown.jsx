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
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
      }}
    />
  )
}

export default PrimaryDropdown
