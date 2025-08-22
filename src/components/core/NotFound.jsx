import { Link } from "react-router-dom"
import "../../pages/css/components/NotFound.css"

export default function NotFound() {
    return (
        <div className="not-found-container">
            <div className="not-found-card">
                <div className="not-found-flag">
                    <img src='/spain-flag-icon.svg' alt="España" />
                </div>

                <div className="not-found-number">404</div>
                <h1 className="not-found-title">Página no encontrada</h1>
                <p className="not-found-description">
                    Lo sentimos, la página que buscas no existe o ha sido movida.
                </p>

                <Link to="/" className="not-found-button">
                    Volver al inicio
                </Link>
            </div>
        </div>
    )
}