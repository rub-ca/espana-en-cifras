import { useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { titlesByPath } from "../../js/core.js"

const Menu = ({ showMenu, setShowMenu }) => {
    const location = useLocation()

    const $container = document.querySelector('.app-container')

    if ($container) {
        if (showMenu) {
            $container.style.gridTemplateAreas = `
            "menu title"
            "menu data"
            `

        } else {
            $container.style.gridTemplateAreas = `
            "menu title"
            "data data"
            `
        }
    }

    if (!showMenu) {
        return (
            <div className="menu-container bottom-margin-general">
                <div className="menu-container-otrascifras" onClick={() => setShowMenu(true)}>
                    <img src="/spain-flag-icon.svg" alt="spain flag" className="menu-container-otrascifras-img-spain" />

                    <div className="menu-container-otrascifras-text">
                        <h3>Otras cifras</h3>

                        <img src="/arrow-down-sign-to-navigate.png" alt="arrow down" className="menu-container-otrascifras-img-arrow" />
                    </div>

                </div>
            </div>
        )
    }

    
    const itemMotion = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
    }

    const containerMotion = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 } // retraso entre hijos (top → bottom)
        }
    }
    return (
        <motion.div
            className="menu-container"
            variants={containerMotion}
            initial="hidden"
            animate="visible"
        >
            <motion.img
                src="/spain-flag-icon.svg"
                alt=""
                width="25%"
                className="menu-container__img"
                variants={itemMotion}
                onClick={() => setShowMenu(false)}
            />

            <motion.h1 className="menu-container__main-title" variants={itemMotion}>
                España en
            </motion.h1>
            <motion.h1 className="menu-container__main-title" variants={itemMotion}>
                cifras
            </motion.h1>

            <motion.div className="menu-container__links" variants={containerMotion}>

                <motion.section className="menu-container__links__empleo" variants={containerMotion}>
                    {[
                        "/empleo-provincia-sector",
                        "/empleo-publico-y-privado",
                        "/empleo-balance-pagos"
                    ].map((path) => (
                        <motion.a key={path} className="menu-link-empleo" href={path} variants={itemMotion}>
                            {titlesByPath[path]}
                        </motion.a>
                    ))}
                </motion.section>

                <motion.section className="menu-container__links__poblacion" variants={containerMotion}>
                    {[
                        "/poblacion-por-pais",
                        "/poblacion-provincia-pais",
                        "/poblacion-municipio-edad",
                        "/poblacion-municipio-pais",
                        "/screener-municipios",
                    ].map((path) => (
                        <motion.a key={path} className="menu-link-poblacion" href={path} variants={itemMotion}>
                            {titlesByPath[path]}
                        </motion.a>
                    ))}
                </motion.section>


            </motion.div>
        </motion.div>
    )
}

export default Menu