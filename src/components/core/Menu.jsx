import { useLocation } from "react-router-dom"
import { titlesByPath } from "../../js/core.js"

const Menu = ({ showMenu, setShowMenu }) => {
    const location = useLocation()

    const container = document.querySelector('.app-container')

    if (container) {
        if (showMenu) {
            container.style.gridTemplateAreas = `
            "menu title"
            "menu data"
            `

        } else {
            container.style.gridTemplateAreas = `
            "menu title"
            "data data"
            `
        }

    }

    if (!showMenu) {
        return (
            <div className="menu-container bottom-margin-general">
                <div className="menu-container-otrascifras" onClick={() => setShowMenu(true)}>
                    <img src="/spain-flag-icon.svg" alt="" className="menu-container-otrascifras-img-uno" />

                    <h3>Otras cifras</h3>

                    <img src="/arrow-down-sign-to-navigate.png" alt="" className="menu-container-otrascifras-img-dos" />
                </div>
            </div>
        )
    }

    return (
        <div className="menu-container">

            <img src="/spain-flag-icon.svg" alt="" width={"25%"} className="menu-container__img"  onClick={() => setShowMenu(false)}/>

            <h1 className="menu-container__main-title">España en</h1>
            <h1 className="menu-container__main-title">cifras</h1>

            <div className="menu-container__links">
                <section className="menu-container__links__empleo">
                    <a className="menu-link-empleo" href="/empleo-provincia-sector">
                        {titlesByPath["/empleo-provincia-sector"]}
                    </a>

                    <a className="menu-link-empleo" href="/empleo-publico-y-privado">
                        {titlesByPath["/empleo-publico-y-privado"]}
                    </a>
                </section>

                <section className="menu-container__links__poblacion">
                    <a className="menu-link-poblacion" href="/poblacion-por-pais">
                        {titlesByPath["/poblacion-por-pais"]}
                    </a>

                    <a className="menu-link-poblacion" href="/poblacion-provincia-pais">
                        {titlesByPath["/poblacion-provincia-pais"]}
                    </a>

                    <a className="menu-link-poblacion" href="/poblacion-municipio-edad">
                        {titlesByPath["/poblacion-municipio-edad"]}
                    </a>

                    <a className="menu-link-poblacion" href="/poblacion-municipio-pais">
                        {titlesByPath["/poblacion-municipio-pais"]}
                    </a>

                    <a className="menu-link-poblacion" href="/screener-municipios">
                        {titlesByPath["/screener-municipios"]}
                    </a>
                </section>


            </div>
        </div>
    )
}

export default Menu