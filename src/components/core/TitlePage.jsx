import './TitlePage.css'
import { useLocation } from "react-router-dom"

const TitlePage = () => {
    const location = useLocation()
    console.log("Current location:", location)

    return (
        <div className="title-page-container">
            <h2 className="main-title">Titulo de pagina</h2>
        </div>
    )
}

export default TitlePage