/* eslint-disable no-unused-vars */
import React from 'react';
import { Menu, PhoneOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MenuToggle = ({ isOpen, toggle }) => {
    return (
        <button
            onClick={toggle}
            className="p-2 rounded-md bg-white shadow-md hover:bg-gray-100 transition"
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
                        <PhoneOff className="text-red-600 w-7 h-7" />
                    ) : (
                        <Menu className="text-blue-700 w-7 h-7" />
                    )}
                </motion.div>
            </AnimatePresence>
        </button>
    );
};

export default MenuToggle;
