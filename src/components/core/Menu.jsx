import { useLocation } from "react-router-dom"

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
                    <a className="menu-link-empleo" href="/empleo-provincia-sector">Empleo por provincia y sector</a>
                    <a className="menu-link-empleo" href="/empleo-publico-y-privado">Empleo público y privado</a>
                </section>

                <section className="menu-container__links__poblacion">
                    <a className="menu-link-poblacion" href="/poblacion-por-pais">Población por país de origen</a>
                    <a className="menu-link-poblacion" href="/poblacion-provincia-pais">Población por provincia y país</a>
                    <a className="menu-link-poblacion" href="/poblacion-municipio-edad">Población por municipio y edad</a>
                    <a className="menu-link-poblacion" href="/poblacion-municipio-pais">Población por municipio y país</a>
                    <a className="menu-link-poblacion" href="/screener-municipios">Screener de municipios</a>
                </section>

            </div>
        </div>
    )
}

export default Menu