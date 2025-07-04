import "./PageHeader.css"
import arrowRightIcon from "../../assets/right-arrow.svg"

const PageHeader = () => {
    return (
        <div className="page-header">
            <h2 className="main-title">España en Cifras</h2>

            <div className="navigation-container">
                <div className="navigation-menu">1</div>
                <img className="arrowIcon" src={arrowRightIcon} alt="Icono descriptivo" />
                <div className="navigation-menu">1</div>
            </div>
        </div>
    )
}

export default PageHeader