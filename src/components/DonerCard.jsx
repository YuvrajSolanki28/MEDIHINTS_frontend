import React from "react";
import { Phone, MapPin,  } from "lucide-react";
import { motion } from "framer-motion";

export const DonorCard = ({ name, phone, address, bloodType }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white border border-gray-100 rounded-lg shadow-sm"
    >
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <span className="px-3 py-1 font-medium text-red-700 rounded-full bg-red-50">
          {bloodType}
        </span>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center text-gray-600">
          <Phone className="w-4 h-4 mr-2" />
          <span>{phone}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{address}</span>
        </div>
      </div>
    </motion.div>
  );
};
