/* eslint-disable no-unused-vars */
import './side-bar.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Headphones, PhoneCall, UserCog } from 'lucide-react';

const Sidebar = ({ isOpen, close }) => {
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
                        transition={{ type: 'tween' }}
                    >
                        <ul>
                            <li>
                                <Link>
                                    <PhoneCall size={20} /> Call Logs
                                </Link>
                            </li>
                            <li>
                                <Link>
                                <Headphones size={20} /> Live Support
                                </Link>
                            </li>
                            <li>
                                <Link>
                                <UserCog size={20} /> Agent Settings
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
