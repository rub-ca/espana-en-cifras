import { useLocation } from "react-router-dom"
import { titlesByPath } from "../../js/core.js"

const Menu = () => {
    const location = useLocation()
    console.log("Current location:", location)

    return (
        <div className="menu-container">
            <img src="/spain-flag-icon.svg" alt="" width={"25%"} className="menu-container__img" />

            <h1 className="menu-container__main-title">España en</h1>
            <h1 className="menu-container__main-title">cifras</h1>

            <div className="menu-container__links">
                <section className="menu-container__links__empleo">
                    <a className="menu-link-empleo" href="/empleo-provincia-sector">{titlesByPath["/empleo-provincia-sector"]}</a>
                    <a className="menu-link-empleo" href="/empleo-publico-y-privado">{titlesByPath["/empleo-publico-y-privado"]}</a>
                </section>

                <section className="menu-container__links__poblacion">
                    <a className="menu-link-poblacion" href="/poblacion-por-pais">{titlesByPath["/poblacion-por-pais"]}</a>
                    <a className="menu-link-poblacion" href="/poblacion-provincia-pais">{titlesByPath["/poblacion-provincia-pais"]}</a>
                    <a className="menu-link-poblacion" href="/poblacion-municipio-edad">{titlesByPath["/poblacion-municipio-edad"]}</a>
                    <a className="menu-link-poblacion" href="/poblacion-municipio-pais">{titlesByPath["/poblacion-municipio-pais"]}</a>
                    <a className="menu-link-poblacion" href="/screener-municipios">{titlesByPath["/screener-municipios"]}</a>
                </section>

            </div>
        </div>
    )
}

export default Menu