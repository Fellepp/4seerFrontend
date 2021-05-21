import React from 'react'
import { NavLink } from 'react-router-dom'

const Links = () => {
    return (
        <ul className="right">
            <li><NavLink to="/">Visualize data</NavLink></li>
            <li><NavLink to="/geomap">Geomap</NavLink></li>
            <li><NavLink to="/predict">Predict</NavLink></li>
        </ul>
    )
}

export default Links