/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import './confirm-modal.css';
import { motion, AnimatePresence } from 'framer-motion';
import { SquareX } from 'lucide-react';

const ConfirmModal = ({ isOpen, onCancel, onConfirm, message }) => {
  const modalRef = useRef(null);

  // Focus the modal when it opens
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      onCancel();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
          />

          {/* Modal */}
          <motion.div
            className="modal-content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-modal-message"
            tabIndex={-1}
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div className="modal-header">
              <button
                onClick={onCancel}
                className="modal-close-btn"
                aria-label="Close modal"
                type="button"
              >
                <SquareX size={20} />
              </button>
            </div>

            <div className="modal-body">
              <p id="confirm-modal-message">
                {message || 'Are you sure you want to proceed?'}
              </p>
            </div>

            <div className="modal-footer">
              <button onClick={onCancel} type="button" className="modal-btn cancel-btn">
                Cancel
              </button>
              <button onClick={onConfirm} type="button" className="modal-btn confirm-btn">
                Delete
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
