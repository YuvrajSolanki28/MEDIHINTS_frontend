import React from "react";
import { Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const AppointmentCard = ({
  patient,
  date,
  time,
  type,
  status,
  onConfirm,
  onCancel,
  index,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-sm p-4 mb-4"
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-900">{patient}</h3>
          <p className="text-sm text-gray-500">{type}</p>
          <div className="mt-2">
            <p className="text-sm text-gray-600">{date}</p>
            <p className="text-sm text-gray-600">{time}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <motion.span
            layout
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`text-xs px-2 py-1 rounded-full ${getStatusColor()} capitalize`}
          >
            {status}
          </motion.span>
          <AnimatePresence>
            {status === "pending" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex gap-2 mt-2"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onConfirm}
                  className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors"
                >
                  <Check size={16} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onCancel}
                  className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                >
                  <X size={16} />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
