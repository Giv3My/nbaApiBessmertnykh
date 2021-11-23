import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/linkLogo.png';
import './Header.scss';

export default function Header() {
    return (
        <header className="header">
            <Link to="/">
                <div className="linkLogo">
                    <img src={Logo} alt="linkLogo" />
                </div>
            </Link>
            <div className="east-color"></div>
            <div className="west-color"></div>
        </header>
    )
}
