import React, { useState, useEffect } from "react"

const PageHome = () => {

    const arrayInfo = [
        {
            title: "Población por provincias",
            classItem: "home-item-title-poblacion",
            image: "prov-pais.webp",
            content: <h4>Datos de población España, segmentación por provincias.</h4>
        },
        {
            title: "Screener de municipios",
            classItem: "home-item-title-poblacion",
            image: "muni-screener.webp",
            content: <h4>Screener que permite buscar municipios filtrando por ciertos parámetros.</h4>
        },
        {
            title: "Población por municipio y edad",
            classItem: "home-item-title-poblacion",
            image: "muni-edad.webp",
            content: <h4>Información demográfica por edad a nivel municipal en España.</h4>
        },
        {
            title: "Población por municipio y pais",
            classItem: "home-item-title-poblacion",
            image: "muni-pais.webp",
            content: <h4>Distribución de la población por país de origen en los municipios españoles.</h4>
        },
        {
            title: "Empleo público y privado",
            classItem: "home-item-title-empleo",
            image: "empleo-pubpri.webp",
            content: <h4>Distribución de la población por tipo de empleo (público / privado).</h4>
        },
        {
            title: "Balance pagos y trabajo",
            classItem: "home-item-title-empleo",
            image: "balance-pagos.webp",
            content: <h4>Tabla interactiva que muestra el balance de pagos y trabajo de España.</h4>
        }
    ]

    return (
        <div className="page-data-container">
            <div className="page-data-container__100 overflow-auto flex-grap">
                {arrayInfo.map((item, index) => (
                    <HomePageItem key={index} {...item} />
                ))}
            </div>
        </div>
    )
}

export default PageHome


const HomePageItem = ({ title, classItem, image, content }) => {
    return (
        <div className="home-item-container">
            <div className="home-item-data">
                <h1 className={`home-item-data-title ${classItem}`}>{title}</h1>

                <div className="home-item-data-content">{content}</div>
                
                <div className="home-item-data-image">
                    <img src={image} alt="" />
                </div>
            </div>
        </div>
    )
}