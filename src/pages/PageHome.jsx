import React, { useState, useEffect } from "react"

const PageHome = () => {

    return (
        <div className="page-data-container">
            <div className="page-data-container__100 overflow-auto flex-grap">

                <HomePageItem></HomePageItem>
                <HomePageItem></HomePageItem>
                <HomePageItem></HomePageItem>
                <HomePageItem></HomePageItem>


            </div>
        </div>
    )
}

export default PageHome


const HomePageItem = () => {
    return (
        <div className="home-item-container">
            <div className="home-item-data">
                <h1 className="home-item-title">Hello world!</h1>
                <h4>Datos población España, segmentados por provincias.</h4>
                <img src="prov-pais.webp" alt="" />
            </div>
        </div>
    )
}