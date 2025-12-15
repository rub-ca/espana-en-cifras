import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const PageHome = () => {

    const arrayInfo = [
        {
            title: "Población por provincias",
            classItem: "home-item-title-poblacion",
            classContainer: "home-item-container-poblacion",
            image: "prov-pais.webp",
            url: "/poblacion-provincia-pais",
            content: <h4>Datos de población España, segmentación por provincias.</h4>
        },
        {
            title: "Screener de municipios",
            classItem: "home-item-title-poblacion",
            classContainer: "home-item-container-poblacion",
            image: "muni-screener.webp",
            url: "/screener-municipios",
            content: <h4>Screener que permite buscar municipios filtrando por ciertos parámetros.</h4>
        },
        {
            title: "Población por municipio y edad",
            classItem: "home-item-title-poblacion",
            classContainer: "home-item-container-poblacion",
            image: "muni-edad.webp",
            url: "/poblacion-municipio-edad",
            content: <h4>Información demográfica por edad a nivel municipal en España.</h4>
        },
        {
            title: "Población por municipio y pais",
            classItem: "home-item-title-poblacion",
            classContainer: "home-item-container-poblacion",
            image: "muni-pais.webp",
            url: "/poblacion-municipio-pais",
            content: <h4>Distribución de la población por país de origen en los municipios españoles.</h4>
        },
        {
            title: "Empleo público y privado",
            classItem: "home-item-title-empleo",
            classContainer: "home-item-container-empleo",
            image: "empleo-pubpri.webp",
            url: "/empleo-publico-y-privado",
            content: <h4>Distribución de la población por tipo de empleo (público / privado).</h4>
        },
        {
            title: "Balance pagos y trabajo",
            classItem: "home-item-title-empleo",
            classContainer: "home-item-container-empleo",
            image: "balance-pagos.webp",
            url: "/empleo-balance-pagos",
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



const HomePageItem = ({ title, classItem, classContainer, url, image, content }) => {
    return (
        <a
            className={`home-item-container cursor-pointer ${classContainer}`}
            href={url}
            style={{ textDecoration: "none", color: "inherit" }}
        >
            <div className="home-item-data">
                <h1 className={`home-item-data-title ${classItem}`}>{title}</h1>

                <div className="home-item-data-content">{content}</div>

                <div className="home-item-data-image">
                    <img src={image} alt="" />
                </div>
            </div>
        </a>
    )
}