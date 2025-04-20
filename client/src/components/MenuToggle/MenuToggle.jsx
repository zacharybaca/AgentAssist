/* eslint-disable no-unused-vars */
import React from 'react';
import './menu-toggle.css';
import { Menu, PhoneOff, PhoneIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MenuToggle = ({ isOpen, toggle }) => {
    return (
        <button
            onClick={toggle}
            className="phone-off-icon"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={isOpen ? 'close' : 'open'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {isOpen ? (
                        <PhoneOff />
                    ) : (
                        <>
                            <Menu />
                            <PhoneIcon />
                        </>
                    )}
                </motion.div>
            </AnimatePresence>
        </button>
    );
};

export default MenuToggle;
