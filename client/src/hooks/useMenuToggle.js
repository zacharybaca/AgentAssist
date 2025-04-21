import { useContext } from "react";
import { MenuToggleContext } from "../context/MenuToggleContext";

export const useMenuToggle = () => useContext(MenuToggleContext);
