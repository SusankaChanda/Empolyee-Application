import React, { useState } from 'react';
import '../styling/Header.css';
import Logo from '../assests/logo-1.png'
import {Link} from 'react-router-dom'

const Header = () => {
    const loginDetails = JSON.parse(localStorage.getItem("logindetails"));
    const { username } = loginDetails;
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="logo">
                <img src={Logo} className='logo-image' alt="Logo" />
            </div>
            <ul className={`nav-links ${isOpen ? 'nav-active' : ''}`}>
               
                <li><Link to="/dashboard"> Home</Link></li>
                <li><Link to="/user-details">Employee List</Link></li>
                <li><Link to="/login">Logout</Link></li>
                <li><Link>{username}</Link>
                <i class="fa-regular fa-user profile-icon"></i></li>
              
            </ul>
            <div className="burger" onClick={toggleNavbar}>
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </div>
        </nav>
    );
};

export default Header;
