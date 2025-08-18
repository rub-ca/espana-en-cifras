import { useLocation } from "react-router-dom"
import { titlesByPath } from "../../js/core.js"

const TitlePage = () => {
    const location = useLocation()

    let classTitle = 'title-page-container-poblacion'

    if (location.pathname.includes("empleo")) {
        classTitle = 'title-page-container-empleo'
    }

    return (
        <div className={`title-page-container ${classTitle}`}>
            <h2>{titlesByPath[location.pathname]}</h2>

            <div className="title-page-info-button">
                <img src="source-icon.png" alt="" />
            </div>
        </div>
    )
}

export default TitlePage