/* eslint-disable no-unused-vars */
import "./side-bar.css";
import React from "react";
import { motion, Reorder } from "motion/react";
import { AnimatePresence } from "framer-motion";
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

const iconMap = {
  Newspaper,
  FileHeart,
  UserCog,
  SquareCheck,
  Lock,
  Mail,
  CalendarSync,
};

const Sidebar = ({ isOpen, close }) => {
  const navigate = useNavigate();

  const defaultItems = React.useMemo(
    () => [
      { icon: "Newspaper", size: 35, title: "Articles", path: "/articles" },
      {
        icon: "FileHeart",
        size: 35,
        title: "My Favorite Articles",
        path: "/favorites",
      },
      { icon: "UserCog", size: 35, title: "Agent Settings", path: "/settings" },
      { icon: "SquareCheck", size: 35, title: "My Tasks", path: "/tasks" },
      { icon: "Lock", size: 35, title: "Admin Panel", path: "/admin-panel" },
      {
        icon: "Mail",
        size: 35,
        title: "E-Mail Templates",
        path: "/email-templates",
      },
      {
        icon: "CalendarSync",
        size: 35,
        title: "My Schedule",
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
  }, [items, defaultItems]);

  const handleItemClick = (path) => {
    if (path) navigate(path);
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
            <Reorder.Group axis="x" values={items} onReorder={setItems}>
              <ul id="menu-icon-list">
                {items.map((item) => (
                  <Reorder.Item key={item.title} value={item}>
                    <li
                      onClick={() => handleItemClick(item.path)}
                      style={{ cursor: "pointer" }}
                    >
                      <div>
                        <item.icon size={item.size} />
                        <h3>{item.title}</h3>
                      </div>
                    </li>
                  </Reorder.Item>
                ))}
              </ul>
            </Reorder.Group>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
