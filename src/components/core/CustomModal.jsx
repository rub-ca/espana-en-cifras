import { useLocation } from "react-router-dom"
import Modal from "react-modal"
import { titlesByPath } from "../../js/core.js"


Modal.setAppElement("#root")

const CustomModal = ({ isOpen, onRequestClose }) => {
    const location = useLocation()

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Ejemplo Modal"
            overlayClassName="modal-overlay"
            className="modal-content"
            style={{ content: { inset: "auto" } }}
        >
            <div className="modal-header">
                <img className="cursor-pointer" src="source-icon.png" alt="" onClick={onRequestClose} />

                <h2>{titlesByPath[location.pathname]}</h2>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    className="cursor-pointer" onClick={onRequestClose}>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>

            {/* <div className="modal-body">
                <p>Contenido del modal...</p>
            </div>

            <div className="modal-footer">
                <button onClick={onRequestClose}>Cerrar</button>
            </div> */}
        </Modal>
    )
}

export default CustomModal