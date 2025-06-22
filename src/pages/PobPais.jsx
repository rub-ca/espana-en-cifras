import React, { useState, useEffect } from "react";
import PrimaryDropdown from "../components/PrimaryDropdown.jsx";
import SecondaryDropdown from "../components/SecondaryDropdown.jsx";
import data from "../data/page1Data.json";
import { ageGroups90, genreList } from "../utils.js";

const PobPais = () => {
  const [primarySelected, setPrimarySelected] = useState("");
  const [secondarySelected, setSecondarySelected] = useState([]);
  const [terciarySelected, setTerciarySelected] = useState([]);

  const primaryOptions = data.primaryOptions;
  const secondaryOptions = ageGroups90;
  const terciaryOptions = genreList;

  useEffect(() => {
    // Puedes usar primarySelected y secondarySelected aquí para filtrar o mostrar información
    console.log({ primarySelected, secondarySelected, terciarySelected });

    // Actualizar tabla y/o piramide
  }, [primarySelected, secondarySelected, terciarySelected]);

  return (
    <div>
      <h2>Página 1</h2>
      <PrimaryDropdown
        options={primaryOptions}
        selected={primarySelected}
        onChange={setPrimarySelected}
      />
      <SecondaryDropdown
        options={secondaryOptions}
        selected={secondarySelected}
        onChange={setSecondarySelected}
      />
      <SecondaryDropdown
        options={terciaryOptions}
        selected={terciarySelected}
        onChange={setTerciarySelected}
      />
    </div>
  );
};

export default PobPais;
