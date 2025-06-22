import React from "react";

const PrimaryDropdown = ({ options, selected, onChange }) => {
  return (
    <select value={selected} onChange={(e) => onChange(e.target.value)}>
      <option value="">Selecciona una opción</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
};

export default PrimaryDropdown;
