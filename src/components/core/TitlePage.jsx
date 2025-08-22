import { useLocation } from "react-router-dom"
import { titlesByPath } from "../../js/core.js"
import { useState } from "react"
import CustomModal from "./CustomModal.jsx"


const TitlePage = () => {
    const location = useLocation()

    const [modalIsOpen, setModalIsOpen] = useState(false)

    let classTitle = 'title-page-container-poblacion'

    if (location.pathname.includes("empleo")) {
        classTitle = 'title-page-container-empleo'
    }

    return (
        <div className={`title-page-container ${classTitle}`}>
            <h1>{titlesByPath[location.pathname]}</h1>

            <div className="title-page-info-button" onClick={() => setModalIsOpen(true)}>
                <img src="source-icon.png" alt="" />
            </div>

            <CustomModal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} />
        </div>
    )
}

export default TitlePage