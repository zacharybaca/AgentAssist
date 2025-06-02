/* eslint-disable no-unused-vars */
import "./side-bar.css";
import React from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import {
  FileHeart,
  Newspaper,
  UserCog,
  SquareCheck,
  Lock,
  Mail,
  CalendarSync,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";

const Sidebar = ({ isOpen, close }) => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = React.useState(() => {
    const saved = localStorage.getItem("dark-mode");
    return saved ? JSON.parse(saved) : false;
  });

  const iconMap = React.useMemo(
    () => ({
      Newspaper,
      FileHeart,
      UserCog,
      SquareCheck,
      Lock,
      Mail,
      CalendarSync,
    }),
    []
  );

  const defaultItems = React.useMemo(
    () => [
      {
        icon: "Newspaper",
        size: 35,
        title: "Articles",
        color: "#1D5A8E",
        path: "/articles",
      },
      {
        icon: "FileHeart",
        size: 35,
        title: "My Favorite Articles",
        color: "#1D5A8E",
        path: "/favorites",
      },
      {
        icon: "UserCog",
        size: 35,
        title: "Agent Settings",
        color: "#1D5A8E",
        path: "/settings",
      },
      {
        icon: "SquareCheck",
        size: 35,
        title: "My Tasks",
        color: "#1D5A8E",
        path: "/tasks",
      },
      {
        icon: "Lock",
        size: 35,
        title: "Admin Panel",
        color: "#1D5A8E",
        path: "/admin-panel",
      },
      {
        icon: "Mail",
        size: 35,
        title: "E-Mail Templates",
        color: "#1D5A8E",
        path: "/email-templates",
      },
      {
        icon: "CalendarSync",
        size: 35,
        title: "My Schedule",
        color: "#1D5A8E",
        path: "/my-schedule",
      },
    ],
    []
  );

  const [items, setItems] = React.useState(() => {
    const saved = localStorage.getItem("sidebarItems");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((item) => ({
          ...item,
          icon: iconMap[item.icon],
        }));
      } catch (err) {
        console.error("Failed to parse sidebar items from localStorage:", err);
      }
    }
    return defaultItems.map((item) => ({
      ...item,
      icon: iconMap[item.icon],
    }));
  });

  // Save reordered items to localStorage
  React.useEffect(() => {
    const itemsToSave = items.map(({ icon, ...rest }) => ({
      ...rest,
      icon: Object.keys(iconMap).find((key) => iconMap[key] === icon),
    }));
    localStorage.setItem("sidebarItems", JSON.stringify(itemsToSave));
  }, [iconMap, items]);

  // Save darkMode to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem("dark-mode", JSON.stringify(darkMode));
  }, [darkMode]);

  const handleItemClick = (path) => {
    if (path) navigate(path);
  };

  const resetOrder = () => {
    setItems(defaultItems);
  };

  const [axis, setAxis] = React.useState(window.innerWidth <= 390 ? "y" : "x");

  React.useEffect(() => {
    const handleResize = () => {
      setAxis(window.innerWidth <= 390 ? "y" : "x");
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    isOpen && (
      <div className={`side-bar-container ${darkMode ? "dark-mode" : ""}`}>
        <div className="controls">
          <div className="axis-toggle">
            <label className="switch">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <span className="slider" />
            </label>
          </div>
          <div className="reset-button-container">
            <button onClick={resetOrder}>Reset Order</button>
          </div>
          <LogOutButton />
        </div>

        <AnimatePresence>
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
            />

            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", bounce: 0.5 }}
            >
              <Reorder.Group axis={axis} values={items} onReorder={setItems}>
                <ul id="menu-icon-list" style={{ padding: 0 }}>
                  {items.map((item) => (
                    <Reorder.Item
                      key={item.title}
                      value={item}
                      as="li"
                      onClick={() => handleItemClick(item.path)}
                      style={{ cursor: "pointer", listStyleType: "none" }} // Optional styling
                    >
                      <div>
                        <item.icon size={item.size} color={item.color} />
                        <h3>{item.title}</h3>
                      </div>
                    </Reorder.Item>
                  ))}
                </ul>
              </Reorder.Group>
            </motion.div>
          </>
        </AnimatePresence>
      </div>
    )
  );
};

export default Sidebar;
