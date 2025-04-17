import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react'; // You can replace this with any icon

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
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
          />

          {/* Modal Content */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div className="relative bg-white p-6 rounded-xl shadow-2xl w-96">
              {/* Close Button */}
              <button
                onClick={onCancel}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>

              <p className="text-gray-800 mb-4 text-lg">
                {message || 'Are you sure you want to proceed?'}
              </p>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={onCancel}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
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
