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
  FileText,
  Wrench,
  ClipboardList,
  Book,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";

const defaultItems = [
  {
    icon: Newspaper,
    size: 35,
    title: "Articles",
    color: "#1D5A8E",
    path: "/articles",
  },
  {
    icon: FileHeart,
    size: 35,
    title: "My Favorite Articles",
    color: "#1D5A8E",
    path: "/favorites",
  },
  {
    icon: UserCog,
    size: 35,
    title: "Agent Settings",
    color: "#1D5A8E",
    path: "/settings",
  },
  {
    icon: SquareCheck,
    size: 35,
    title: "My Tasks",
    color: "#1D5A8E",
    path: "/tasks",
  },
  {
    icon: Lock,
    size: 35,
    title: "Admin Panel",
    color: "#1D5A8E",
    path: "/admin-panel",
    isAdminOnly: true,
  },
  {
    icon: Mail,
    size: 35,
    title: "E-Mail Templates",
    color: "#1D5A8E",
    path: "/email-templates",
  },
  {
    icon: CalendarSync,
    size: 35,
    title: "My Schedule",
    color: "#1D5A8E",
    path: "/my-schedule",
  },
  {
    icon: FileText,
    size: 35,
    title: "Call Scripts",
    color: "#1D5A8E",
    path: "/call-scripts",
  },
  {
    icon: Wrench,
    size: 35,
    title: "Trouble Shooting",
    color: "#1D5A8E",
    path: "/troubleshooting",
  },
  {
    icon: ClipboardList,
    size: 35,
    title: "Policies",
    color: "#1D5A8E",
    path: "/policies",
  },
  {
    icon: Book,
    size: 35,
    title: "Frequently Used References",
    color: "#1D5A8E",
    path: "/frequently-used-references",
  },
];

const Sidebar = ({ isOpen, close, user }) => {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = React.useState(() => {
    const saved = localStorage.getItem("dark-mode");
    return saved ? JSON.parse(saved) : false;
  });

  const [items, setItems] = React.useState(() => {
    const saved = localStorage.getItem("sidebarItems");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Match by title to restore icons from defaultItems
        return parsed
          .map((savedItem) => {
            const match = defaultItems.find((d) => d.title === savedItem.title);
            return match ? { ...match, ...savedItem } : savedItem;
          })
          .filter((item) => !item.isAdminOnly || user?.isAdmin);
      } catch (err) {
        console.error("Failed to parse sidebar items:", err);
      }
    }
    return defaultItems;
  });

  React.useEffect(() => {
    const itemsToSave = items.map(({ icon, ...rest }) => rest);
    localStorage.setItem("sidebarItems", JSON.stringify(itemsToSave));
  }, [items]);

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
              <div id="menu-icon-list-container">
                <Reorder.Group axis={axis} values={items} onReorder={setItems}>
                  <ul id="menu-icon-list" style={{ padding: 0 }}>
                    {items.map((item) => (
                      <Reorder.Item
                        key={item.title}
                        value={item}
                        as="li"
                        onClick={() => handleItemClick(item.path)}
                        style={{ cursor: "pointer", listStyleType: "none" }}
                      >
                        <div className="card item-container">
                          <item.icon size={item.size} color={item.color} />
                          <h3 className="card-title">{item.title}</h3>
                        </div>
                      </Reorder.Item>
                    ))}
                  </ul>
                </Reorder.Group>
              </div>
            </motion.div>
          </>
        </AnimatePresence>
      </div>
    )
  );
};

export default Sidebar;

// import "./side-bar.css";
// import React from "react";
// import { motion, AnimatePresence, Reorder } from "framer-motion";
// import {
//   FileHeart,
//   Newspaper,
//   UserCog,
//   SquareCheck,
//   Lock,
//   Mail,
//   CalendarSync,
//   ScrollText,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import LogOutButton from "../LogOutButton/LogOutButton";

// // Icon mapping
// const iconMap = {
//   Newspaper,
//   FileHeart,
//   UserCog,
//   SquareCheck,
//   Lock,
//   Mail,
//   CalendarSync,
//   ScrollText,
// };

// // Default sidebar items
// const defaultItems = [
//   { icon: Newspaper, size: 35, title: "Articles", color: "#1D5A8E", path: "/articles" },
//   { icon: FileHeart, size: 35, title: "My Favorite Articles", color: "#1D5A8E", path: "/favorites" },
//   { icon: UserCog, size: 35, title: "Agent Settings", color: "#1D5A8E", path: "/settings" },
//   { icon: SquareCheck, size: 35, title: "My Tasks", color: "#1D5A8E", path: "/tasks" },
//   { icon: Lock, size: 35, title: "Admin Panel", color: "#1D5A8E", path: "/admin-panel", isAdminOnly: true },
//   { icon: Mail, size: 35, title: "E-Mail Templates", color: "#1D5A8E", path: "/email-templates" },
//   { icon: CalendarSync, size: 35, title: "My Schedule", color: "#1D5A8E", path: "/my-schedule" },
//   { icon: ScrollText, size: 35, title: "Call Scripts", color: "#1D5A8E", path: "/call-scripts" },
// ];

// // Fallback component for missing icons
// const FallbackIcon = () => (
//   <div style={{ fontSize: 20, color: "red", fontWeight: "bold" }}>?</div>
// );

// const Sidebar = ({ isOpen, close, user }) => {
//   const navigate = useNavigate();
//   const [darkMode, setDarkMode] = React.useState(() =>
//     JSON.parse(localStorage.getItem("dark-mode")) || false
//   );
//   const [compactMode, setCompactMode] = React.useState(false);
//   const [searchTerm, setSearchTerm] = React.useState("");

//   const hydrateIcons = (arr) =>
//     arr
//       .filter((item) => !item.isAdminOnly || user?.isAdmin)
//       .map((item) => {
//         const iconComponent =
//           iconMap[item.icon] || iconMap[item.title.replace(/\s/g, "")];

//         if (!iconComponent) {
//           console.warn(`⚠️ Sidebar icon not found for: "${item.icon}"`);
//         }

//         return {
//           ...item,
//           icon: iconComponent || FallbackIcon,
//         };
//       });

//   const [items, setItems] = React.useState(() => {
//     const saved = localStorage.getItem("sidebarItems");
//     try {
//       const parsed = saved ? JSON.parse(saved) : defaultItems;
//       return hydrateIcons(parsed);
//     } catch (err) {
//       console.error("❌ Failed to parse sidebar items from localStorage:", err);
//       return hydrateIcons(defaultItems);
//     }
//   });

//   React.useEffect(() => {
//     const itemsToSave = items.map(({ icon, ...rest }) => ({
//       ...rest,
//       icon: Object.keys(iconMap).find((key) => iconMap[key] === icon),
//     }));
//     localStorage.setItem("sidebarItems", JSON.stringify(itemsToSave));
//   }, [items]);

//   React.useEffect(() => {
//     localStorage.setItem("dark-mode", JSON.stringify(darkMode));
//   }, [darkMode]);

//   const handleItemClick = (path) => path && navigate(path);
//   const resetOrder = () =>
//     setItems(hydrateIcons(defaultItems));

//   const [axis, setAxis] = React.useState(window.innerWidth <= 390 ? "y" : "x");
//   React.useEffect(() => {
//     const handleResize = () => setAxis(window.innerWidth <= 390 ? "y" : "x");
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const filteredItems = items.filter((item) =>
//     item.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     isOpen && (
//       <div className={`side-bar-container ${darkMode ? "dark-mode" : ""}`}>
//         <div className="controls">
//           <div className="axis-toggle">
//             <label className="switch">
//               <input
//                 type="checkbox"
//                 checked={darkMode}
//                 onChange={() => setDarkMode(!darkMode)}
//               />
//               <span className="slider" />
//             </label>
//           </div>
//           <div className="reset-button-container">
//             <button onClick={resetOrder}>Reset Order</button>
//             <button onClick={() => setCompactMode(!compactMode)}>Toggle Compact</button>
//           </div>
//           <input
//             type="text"
//             className="sidebar-search"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <LogOutButton />
//         </div>

//         <AnimatePresence>
//           <motion.div
//             initial={{ y: "-100%" }}
//             animate={{ y: 0 }}
//             exit={{ y: "-100%" }}
//             transition={{ type: "spring", bounce: 0.5 }}
//           >
//             <Reorder.Group axis={axis} values={filteredItems} onReorder={setItems}>
//               <ul id="menu-icon-list" style={{ padding: 0 }}>
//                 {filteredItems.map((item) => (
//                   <Reorder.Item
//                     key={item.title}
//                     value={item}
//                     as="li"
//                     onClick={() => handleItemClick(item.path)}
//                     style={{ cursor: "pointer", listStyleType: "none" }}
//                   >
//                     <div className="icon-with-badge">
//                       <item.icon size={item.size} color={item.color} />
//                       {item.badgeCount > 0 && (
//                         <span className="badge">{item.badgeCount}</span>
//                       )}
//                       {!compactMode && <h3>{item.title}</h3>}
//                     </div>
//                   </Reorder.Item>
//                 ))}
//               </ul>
//             </Reorder.Group>
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     )
//   );
// };

// export default Sidebar;
