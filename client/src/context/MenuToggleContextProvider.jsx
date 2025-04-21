import { useState } from 'react';
import { MenuToggleContext } from './MenuToggleContext';

export const MenuToggleContextProvider = ({ children }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(prev => !prev);
    const closeMenu = () => setMenuOpen(false);

    return (
        <MenuToggleContext.Provider
            value={{
                menuOpen,
                toggleMenu,
                closeMenu
            }}
        >
            {children}
        </MenuToggleContext.Provider>
    );
};
