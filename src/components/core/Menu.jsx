import { useLocation } from "react-router-dom"

const Menu = () => {
    const location = useLocation()
    console.log("Current location:", location)

    return (
        <div className="menu-container">
            <img src="/spain-flag-icon.svg" alt="" width={"25%"} className="menu-container__img" />

            <h1 className="menu-container__main-title">España en</h1>
            <h1 className="menu-container__main-title">cifras</h1>
        </div>
    )
}

export default Menu