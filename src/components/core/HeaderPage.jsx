import "./HeaderPage.css"
import arrowRightIcon from "../../assets/right-arrow.svg"
import NavigationLink from "./NavigationLink.jsx"

const PageHeader = () => {
    return (
        <div className="page-header">
            <h2 className="main-title">España en Cifras</h2>

            <div className="navigation-container">
                <div className="navigation-menu">1</div>

                <img className="arrowIcon" src={arrowRightIcon} alt="Icono descriptivo" />

                <div className="navigation-menu">
                    <nav>
                        <NavigationLink to="/pob-pais">
                            Poblacion por pais de origen
                        </NavigationLink>

                        <NavigationLink to="/pob-prov-pais">
                            Poblacion por provincia
                        </NavigationLink>

                        <NavigationLink to="/pob-prov-pais">
                            Poblacion por municipio y edad
                        </NavigationLink>

                        <NavigationLink to="/pob-prov-pais">
                            Poblacion por municipio y pais
                        </NavigationLink>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default PageHeader