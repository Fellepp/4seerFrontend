import React from 'react'
import { Link } from 'react-router-dom'
import Links from './links'

export const Navbar = () => {
    return (
        <nav className="nav-wrapper green darken-4">
            <div className="container">
                <Link to='/' className="brand-logo">4Seeя</Link>
                <Links /> 
            </div>
        </nav>
    )
}
