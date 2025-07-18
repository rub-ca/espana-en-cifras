import React, { useState, useEffect } from "react"
import PobResizer from "../components/poblacion/PobResizer.jsx"

const PageEmpPubPri = () => {

    useEffect(() => {
        // Fetch data or perform any side effects here
    }, [])

    return (
        <div className="page-pob-container">
            <main className="page-pob-main-100height">
                <section className="pob-left-panel">

                </section>

                <section className="pob-right-panel">
                    <PobResizer />

                </section>
            </main>
        </div>
    )
}

export default PageEmpPubPri
