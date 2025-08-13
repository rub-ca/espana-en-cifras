import React from "react"
import PrimaryDropdown from "../filters/PrimaryDropdown.jsx"
import SecondaryDropdown from "../filters/SecondaryDropdown.jsx"

const PobFiltersHeader = ({
    primaryOptions,
    primarySelected,
    setPrimarySelected,

    secondaryDropdowns,
}) => {
    return (
        <section className="page-data-container__7">

            <div className="pob-filters-header-section">
                <PrimaryDropdown
                    options={primaryOptions}
                    selected={primarySelected}
                    onChange={setPrimarySelected}
                />

                {secondaryDropdowns.map((dropdown, index) => (
                    <SecondaryDropdown
                        key={index}
                        options={dropdown.options}
                        selected={dropdown.selected}
                        onChange={dropdown.onChange}
                        placeholder={dropdown.placeholder}
                    />
                ))}</div>
        </section>
    )
}

export default PobFiltersHeader
