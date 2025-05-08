/* eslint-disable no-unused-vars */
import './side-bar.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { motion, Reorder } from "motion/react"
import { AnimatePresence } from 'framer-motion';
import { FileHeart, Newspaper, UserCog } from 'lucide-react';

const Sidebar = ({ isOpen, close }) => {
    const [items, setItems] = React.useState([0,1,2,3,4,5,6]);

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
                            {items.map((item) => (
                                <Reorder.Item key={item} value={item}>
                                    {item}
                                </Reorder.Item>
                            ))}
                        </Reorder.Group>
                        
                        <ul>
                            <li>
                                <Link>
                                    <Newspaper size={35} /> <h3>Articles</h3>
                                </Link>
                            </li>
                            <li>
                                <Link>
                                    <FileHeart size={35} /> <h3>My Favorite Articles</h3>
                                </Link>
                            </li>
                            <li>
                                <Link>
                                    <UserCog size={35} /> <h3>Agent Settings</h3>
                                </Link>
                            </li>
                        </ul>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Sidebar;
