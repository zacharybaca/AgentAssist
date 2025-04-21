import './nav-bar.css';
import MenuToggle from '../MenuToggle/MenuToggle.jsx';
import Sidebar from '../SideBar/SideBar.jsx';
import { useMenuToggle } from '../../hooks/useMenuToggle.js';

const Navbar = () => {
    const { menuOpen, toggleMenu, closeMenu } = useMenuToggle();

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
