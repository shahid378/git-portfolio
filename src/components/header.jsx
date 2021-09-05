import React from 'react';
import logo from "../assests/logo.png"

const Header = () => {
    return (
        <header className="header-container">
            <div className="logo">
                <img src={logo } alt="Logo" className="logo-image"/>
            </div>
            <div className="title-container">
                <h1 className="title">GitHub Portfolio</h1>
            </div>
        </header>
    )
}

export default Header;
