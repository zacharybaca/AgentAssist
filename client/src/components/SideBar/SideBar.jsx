/* eslint-disable no-unused-vars */
import './side-bar.css';
import React from 'react';
import { motion } from 'framer-motion';
import { Headphones, PhoneCall, UserCog } from 'lucide-react';

const Sidebar = ({ isOpen, close }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        className="fixed inset-0 bg-black/30 z-30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={close}
                    />

                    {/* Sidebar */}
                    <motion.div
                        className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 p-6"
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'tween' }}
                    >
                        <h2 className="text-xl font-bold text-blue-700 mb-6">Support Menu</h2>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer">
                                <PhoneCall size={20} /> Call Logs
                            </li>
                            <li className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer">
                                <Headphones size={20} /> Live Support
                            </li>
                            <li className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer">
                                <UserCog size={20} /> Agent Settings
                            </li>
                        </ul>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Sidebar;
