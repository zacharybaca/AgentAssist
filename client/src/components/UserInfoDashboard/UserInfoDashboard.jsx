/* eslint-disable no-unused-vars */
import "./user-info-dashboard.css";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Define the tabs array
const tabs = [
  { label: "Favorite Articles", icon: "❤️", favoriteArticles: [] },
  { label: "User Info", icon: "👤", userInfo: {} },
  { label: "Account Settings", icon: "⚙️", accountSettings: {} },
];

export default function UserInfoDashboard() {
  const [selectedTab, setSelectedTab] = useState(tabs[1]);

  return (
    <div className="dashboard-container">
      <nav className="nav">
        <ul className="tabs-container tabs">
          {tabs.map((item) => (
            <motion.li
              key={item.label}
              initial={false}
              animate={{
                backgroundColor: item === selectedTab ? "#eee" : "#eee0",
              }}
              className="tab"
              onClick={() => setSelectedTab(item)}
            >
              {`${item.icon} ${item.label}`}
              {item === selectedTab ? (
                <motion.div className="underline" layoutId="underline" />
              ) : null}
            </motion.li>
          ))}
        </ul>
      </nav>
      <main className="icon-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab ? selectedTab.label : "empty"}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="icon"
          >
            {selectedTab ? selectedTab.icon : "😋"}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
