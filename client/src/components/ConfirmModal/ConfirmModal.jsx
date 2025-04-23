/* eslint-disable no-unused-vars */
import React from 'react';
import './confirm-modal.css';
import { motion, AnimatePresence } from 'framer-motion';
import { SquareX } from 'lucide-react'; // You can replace this with any icon

const ConfirmModal = ({ isOpen, onCancel, onConfirm, message }) => {
  const handleBackdropClick = (e) => {
    // Only close if user clicks directly on the backdrop (not on modal content)
    if (e.target.id === 'modal-backdrop') {
      onCancel();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            id="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div>
              {/* Close Button */}
              <button
                onClick={onCancel}
              >
                <SquareX size={20} />
              </button>

              <p>
                {message || 'Are you sure you want to proceed?'}
              </p>

              <div>
                <button
                  onClick={onCancel}
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
