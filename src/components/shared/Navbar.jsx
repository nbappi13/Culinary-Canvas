import React from 'react';
import restaurant_logo from '../../assets/restaurant_logo.png'; 

const Navbar = () => {
    const links = (
        <>
            <li><a href="#home">Home</a></li>
            <li><a href="#all-foods">All Foods</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#login">Login</a></li>
        </>
    );

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <a className="flex items-center space-x-2 text-xl font-bold">
                    <img src={restaurant_logo} alt="Logo" className="h-14 w-14 rounded-full" />
                    <span>Culinary Canvas</span>
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn">Get Started</a>
            </div>
        </div>
    );
};

export default Navbar;
