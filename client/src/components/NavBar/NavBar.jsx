import React, { useState } from 'react';
import MenuToggle from '../MenuToggle/MenuToggle.jsx';
import Sidebar from '../SideBar/SideBar.jsx';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(prev => !prev);
    const closeMenu = () => setMenuOpen(false);

    return (
        <>
            <nav className="flex items-center justify-between p-4 bg-gray-50 shadow z-50 relative">
                <h1 className="text-lg font-bold text-blue-800">CallCenterPro</h1>
                <MenuToggle isOpen={menuOpen} toggle={toggleMenu} />
            </nav>

            <Sidebar isOpen={menuOpen} close={closeMenu} />
        </>
    );
};

export default Navbar;
