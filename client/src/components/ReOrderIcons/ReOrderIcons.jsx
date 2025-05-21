import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./reorder-icons.css";
import {
  FileHeart,
  Newspaper,
  UserCog,
  SquareCheck,
  Lock,
  Mail,
  CalendarSync,
} from "lucide-react";

const iconMap = {
  Newspaper,
  FileHeart,
  UserCog,
  SquareCheck,
  Lock,
  Mail,
  CalendarSync,
};

// Helper for getting position based on axis
const getAxisPosition = (el, axis) =>
  axis === "x" ? el?.offsetLeft : el?.offsetTop;

export default function ReOrderIcons({ isOpen, close }) {
  const navigate = useNavigate();
  const defaultItems = useMemo(
    () => [
      {
        id: uuidv4(),
        icon: "Newspaper",
        size: 35,
        title: "Articles",
        color: "#1D5A8E",
        path: "/articles",
      },
      {
        id: uuidv4(),
        icon: "FileHeart",
        size: 35,
        title: "My Favorite Articles",
        color: "#1D5A8E",
        path: "/favorites",
      },
      {
        id: uuidv4(),
        icon: "UserCog",
        size: 35,
        title: "Agent Settings",
        color: "#1D5A8E",
        path: "/settings",
      },
      {
        id: uuidv4(),
        icon: "SquareCheck",
        size: 35,
        title: "My Tasks",
        color: "#1D5A8E",
        path: "/tasks",
      },
      {
        id: uuidv4(),
        icon: "Lock",
        size: 35,
        title: "Admin Panel",
        color: "#1D5A8E",
        path: "/admin-panel",
      },
      {
        id: uuidv4(),
        icon: "Mail",
        size: 35,
        title: "E-Mail Templates",
        color: "#1D5A8E",
        path: "/email-templates",
      },
      {
        id: uuidv4(),
        icon: "CalendarSync",
        size: 35,
        title: "My Schedule",
        color: "#1D5A8E",
        path: "/my-schedule",
      },
    ],
    []
  );

  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("sidebarItems");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error("Failed to parse sidebar items from localStorage:", err);
      }
    }
    return defaultItems;
  });

  const [dragAxis, setDragAxis] = useState("x"); // "x" or "y"
  const itemRefs = useRef([]);

  const handleDragEnd = (event, info, index) => {
    const currentPos = getAxisPosition(itemRefs.current[index], dragAxis);

    const newOrder = [...items];
    const targetIndex = items.findIndex((_, i) => {
      if (i === index) return false;
      const otherPos = getAxisPosition(itemRefs.current[i], dragAxis);
      return dragAxis === "x" ? currentPos < otherPos : currentPos < otherPos;
    });

    if (targetIndex !== -1 && targetIndex !== index) {
      const moved = newOrder.splice(index, 1)[0];
      newOrder.splice(targetIndex, 0, moved);
      setItems(newOrder);
    }
  };

  useEffect(() => {
    localStorage.setItem("sidebarItems", JSON.stringify(items));
  }, [items]);

  const resetOrder = () => {
    setItems(defaultItems);
  };

  const handleItemClick = (path) => {
    if (path) navigate(path);
  };

  return (
    <div className="wrapper">
      <div className="controls">
        <div className="axis-toggle">
          <span>{dragAxis === "x" ? "Horizontal" : "Vertical"}</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={dragAxis === "y"}
              onChange={() => setDragAxis(dragAxis === "x" ? "y" : "x")}
            />
            <span className="slider" />
          </label>
        </div>
        <button onClick={resetOrder}>Reset Order</button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
            />

            <div className={`grid ${dragAxis === "x" ? "row" : "column"}`}>
              {items.map((item, index) => {
                const Icon = iconMap[item.icon];
                return (
                  <motion.div
                    key={item.id}
                    className="box"
                    onClick={close}
                    drag={dragAxis}
                    onDragEnd={(event, info) =>
                      handleDragEnd(event, info, index)
                    }
                    ref={(el) => (itemRefs.current[index] = el)}
                    layout
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    whileDrag={{ scale: 1.1, zIndex: 1 }}
                  >
                    <div
                      className="icon-wrapper"
                      onClick={() => handleItemClick(item.path)}
                    >
                      <Icon size={item.size} color={item.color} />
                      <h3>{item.title}</h3>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
