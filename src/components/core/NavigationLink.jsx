import React from 'react'
import "./NavigationLink.css"
import { NavLink } from 'react-router-dom'

function NavigationLink({ to, children }) {
    return (
        <div className="navigation-link-container">
            <NavLink
                to={to}
                className={({ isActive }) =>
                    isActive ? 'nav-link nav-link-active' : 'nav-link nav-link-inactive'
                }
                end
            >
                {children}
            </NavLink>
        </div>
    )
}

export default NavigationLink
