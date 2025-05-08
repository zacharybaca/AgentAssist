/* eslint-disable no-unused-vars */
import './side-bar.css';
import React from 'react';
import { motion, Reorder } from "motion/react";
import { AnimatePresence } from 'framer-motion';
import { FileHeart, Newspaper, UserCog } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Sidebar = ({ isOpen, close }) => {
    const navigate = useNavigate(); // Get the navigate function

    const [items, setItems] = React.useState([
        {
            icon: Newspaper,
            size: 35,
            title: "Articles",
            path: "/articles"
        },
        {
            icon: FileHeart,
            size: 35,
            title: "My Favorite Articles",
            path: "/favorites"
        },
        {
            icon: UserCog,
            size: 35,
            title: "Agent Settings",
            path: "/settings"
        }
    ]);

    const handleItemClick = (path) => {
        if (path) {
            navigate(path);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={close}
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'spring', bounce: 0.50 }}
                    >
                        <Reorder.Group axis="y" values={items} onReorder={setItems}>
                            <ul>
                                {items.map(item => (
                                    <Reorder.Item key={item.title} value={item}>
                                        <li onClick={() => handleItemClick(item.path)} style={{ cursor: 'pointer' }}>
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
