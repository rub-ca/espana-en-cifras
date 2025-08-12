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
                <section>
                    <a href="/">Empleo por provincia y sector</a>
                    <a href="/">Empleo público y privado</a>
                </section>

                <section>
                    <a href="/poblacion-por-pais">Población por país de origen</a>
                    <a href="/poblacion-provincia-pais">Población por provincia y país</a>
                    <a href="/">Población por municipio y edad</a>
                    <a href="/">Población por municipio y país</a>
                    <a href="/">Screener de municipios</a>
                </section>

            </div>
        </div>
    )
}

export default Menu