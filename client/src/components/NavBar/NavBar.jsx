import "./nav-bar.css";
import MenuToggle from "../MenuToggle/MenuToggle.jsx";
import Sidebar from "../SideBar/SideBar.jsx";
import AvatarPhoto from "../AvatarPhoto/AvatarPhoto.jsx";
import { useMenuToggle } from "../../hooks/useMenuToggle.js";

const Navbar = () => {
  const { menuOpen, toggleMenu, closeMenu } = useMenuToggle();

  return (
    <div id="nav-main-container">
      <div id="menu-toggle-container">
        <div>
          <MenuToggle isOpen={menuOpen} toggle={toggleMenu} />
        </div>

        <div>
          <AvatarPhoto />
        </div>
      </div>

      <nav>
        <Sidebar isOpen={menuOpen} close={closeMenu} />
      </nav>
    </div>
  );
};

export default Navbar;
