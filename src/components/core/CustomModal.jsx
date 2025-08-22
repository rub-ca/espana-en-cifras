import { useLocation } from "react-router-dom"
import Modal from "react-modal"
import { titlesByPath } from "../../js/core.js"


Modal.setAppElement("#root")

const CustomModal = ({ isOpen, onRequestClose }) => {
    const location = useLocation()

    const extraData = getDataModal(location.pathname)
    const extraNotas = getNotasModal(location.pathname)

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
                <img className="cursor-pointer" src="source-icon.png" alt="source icon" onClick={onRequestClose} />

                <h2>{titlesByPath[location.pathname]}</h2>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    className="cursor-pointer" onClick={onRequestClose}>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>

            <div className="modal-body">
                <h4>Fuentes de información:</h4>
                <p>Toda la información proviene de fuentes oficiales del gobierno de España.</p>
                {extraData.map((data, index) => (
                    <p key={index}>{data}</p>
                ))}

                <h4>Notas:</h4>
                {extraNotas.map((nota, index) => (
                    <p key={index}>{nota}</p>
                ))}
            </div>
            {/*
            <div className="modal-footer">
                <button onClick={onRequestClose}>Cerrar</button>
            </div> */}
        </Modal>
    )
}

export default CustomModal


function getDataModal(path) {
    if (path == "/poblacion-provincia-pais") {
        return getPoblacionProvinciaData(true)
    }
    if (path == "/poblacion-por-pais") {
        return getPoblacionPaisData(true)
    }
    if (path == "/poblacion-municipio-edad") {
        return getPoblacionMuniEdad(true)
    }
    if (path == "/poblacion-municipio-pais") {
        return getPoblacionMuniPais(true)
    }
    if (path == "/screener-municipios") {
        return getPoblacionScreenerPais(true)
    }

    if (path == "/empleo-provincia-sector") {
        return getEmpleoProvSectorData(true)
    }
    if (path == "/empleo-publico-y-privado") {
        return getEmpleoPublicoPrivadoData(true)
    }
    if (path == "/empleo-balance-pagos") {
        return getBalancePagosData(true)
    }

    return [""]
}


function getNotasModal(path) {
    if (path == "/poblacion-provincia-pais") {
        return getPoblacionProvinciaData(false)
    }
    if (path == "/poblacion-por-pais") {
        return getPoblacionPaisData(false)
    }
    if (path == "/poblacion-municipio-edad") {
        return getPoblacionMuniEdad(false)
    }
    if (path == "/poblacion-municipio-pais") {
        return getPoblacionMuniPais(false)
    }
    if (path == "/screener-municipios") {
        return getPoblacionScreenerPais(false)
    }


    if (path == "/empleo-provincia-sector") {
        return getEmpleoProvSectorData(false)
    }
    if (path == "/empleo-publico-y-privado") {
        return getEmpleoPublicoPrivadoData(false)
    }
    if (path == "/empleo-balance-pagos") {
        return getBalancePagosData(false)
    }

    return [""]
}

/*  ----------------------------   */

function getPoblacionProvinciaData(returnData) {
    const r = []

    if (returnData) {
        r.push("- Datos población -> www.ine.es")
    } else {
        r.push("Haciendo click en una agrupación de países en la tabla se muestra su pirámide poblacional en el gráfico")
        r.push("Haciendo click en un año se muestra su pirámide poblacional en el gráfico")
    }

    return r
}

function getPoblacionPaisData(returnData) {
    const r = []

    if (returnData) {
        r.push("- Datos población -> www.ine.es")
    } else {
        r.push("Haciendo click en un año se muestra su pirámide poblacional en el gráfico")
    }

    return r
}

function getPoblacionMuniEdad(returnData) {
    const r = []

    if (returnData) {
        r.push("- Datos población -> www.ine.es")
    } else {
        r.push("Haciendo click en un año se muestra su pirámide poblacional en el gráfico")
    }

    return r
}
function getPoblacionMuniPais(returnData) {
    const r = []

    if (returnData) {
        r.push("- Datos población -> www.ine.es")
    } else {
        r.push("Haciendo click en un año se muestran los datos de ese año en el gráfico")
    }

    return r
}
function getPoblacionScreenerPais(returnData) {
    const r = []

    if (returnData) {
        r.push("- Datos población -> www.ine.es")
    } else {
        r.push("Herramienta para filtrar municipios por diferentes criterios: ")
        r.push("- Cantidad de habitantes")
        r.push("- Porcentaje de personas que están en un rango de edad específico")
        r.push("- Porcentaje de población extranjera")
    }

    return r
}


function getEmpleoProvSectorData(returnData) {
    const r = []

    if (returnData) {
        r.push("- Datos empleo -> www.ine.es")
    } else {
        r.push("En el gráfico los números están en miles")
        r.push("Haciendo click en una provincia de la tabla se muestra en el gráfico")
    }

    return r
}
function getEmpleoPublicoPrivadoData(returnData) {
    const r = []

    if (returnData) {
        r.push("- Datos empleo -> www.ine.es")
    } else {
        r.push("En el primer gráfico los números están en miles")
        r.push("Haciendo click en una comunidad de la tabla se muestra en el primer gráfico")
        r.push("El segundo gráfico se calcula: emp.publico / emp.privado")
    }

    return r
}
function getBalancePagosData(returnData) {
    const r = []

    if (returnData) {
        r.push("- Datos empleo público y privado -> www.ine.es")
        r.push("- Datos pensionistas -> www.seg-social.es")
        r.push("- Datos prestaciones -> www.sepe.es")
        r.push("- Datos IMV -> www.revista.seg-social.es & www.lamoncloa.gob.es")
    } else {
        r.push("Esta sección permite sumar como se quiera las diferentes filas")
    }

    return r
}