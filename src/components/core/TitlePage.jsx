import { useLocation } from "react-router-dom"

const TitlePage = () => {
    const location = useLocation()
    console.log("Current location:", location)

    let classTitle = 'title-page-container-poblacion'

    if (location.pathname.includes("empleo")) {
        classTitle = 'title-page-container-empleo'
    }

    return (
        <div className={`title-page-container ${classTitle}`}>
            <h2 className="main-title">Titulo de pagina</h2>
        </div>
    )
}

export default TitlePage