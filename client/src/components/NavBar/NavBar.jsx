import React, { useState } from 'react';
import './nav-bar.css';
import MenuToggle from '../MenuToggle/MenuToggle.jsx';
import Sidebar from '../SideBar/SideBar.jsx';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(prev => !prev);
    const closeMenu = () => setMenuOpen(false);

    return (
        <div id="nav-main-container">
            <nav id="nav-container">
                <MenuToggle isOpen={menuOpen} toggle={toggleMenu} />
            </nav>

            <Sidebar isOpen={menuOpen} close={closeMenu} />
        </div>
    );
};

export default Navbar;
