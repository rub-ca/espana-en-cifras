import React, { useState, useEffect } from "react";
import PrimaryDropdown from "../components/PrimaryDropdown.jsx";
import SecondaryDropdown from "../components/SecondaryDropdown.jsx";
import data from "../data/page1Data.json";
import { ageGroups90, genreList } from "../utils.js";
import "./css/PobPais.css"; 

const PobPais = () => {
  const [primarySelected, setPrimarySelected] = useState("");
  const [secondarySelected, setSecondarySelected] = useState([]);
  const [terciarySelected, setTerciarySelected] = useState([]);

  const primaryOptions = data.primaryOptions;
  const secondaryOptions = ageGroups90;
  const terciaryOptions = genreList;

  useEffect(() => {
    console.log({ primarySelected, secondarySelected, terciarySelected });
  }, [primarySelected, secondarySelected, terciarySelected]);

  return (
    <div className="page-container">
      <header className="page-header">
        <h2>Página 1</h2>
      </header>
      <main className="page-main">
        <section className="left-panel">
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
        </section>
        <section className="right-panel">
          {/* Aquí podrías mostrar una tabla, pirámide poblacional, etc. */}
          <p>Visualización o contenido derecho</p>
        </section>
      </main>
    </div>
  );
};

export default PobPais;
