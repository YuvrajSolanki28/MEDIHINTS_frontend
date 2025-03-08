import React, { useState } from "react";
import { motion } from "framer-motion";
import { Filter } from "lucide-react";
import { DonorCard } from "../../components/DonerCard";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const donors = [
  {
    name: "John Smith",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY",
    bloodType: "A+",
  },
  {
    name: "Sarah Johnson",
    phone: "+1 (555) 234-5678",
    address: "456 Park Ave, Boston, MA",
    bloodType: "O-",
  },
  {
    name: "Michael Brown",
    phone: "+1 (555) 345-6789",
    address: "789 Oak Rd, Chicago, IL",
    bloodType: "B+",
  },
  {
    name: "Emily Davis",
    phone: "+1 (555) 456-7890",
    address: "321 Pine St, San Francisco, CA",
    bloodType: "AB+",
  },
];

const BloodBank = () => {
  const [selectedBloodType, setSelectedBloodType] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredDonors = selectedBloodType
    ? donors.filter((donor) => donor.bloodType === selectedBloodType)
    : donors;

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <main className="container px-4 py-8 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Blood Bank Donors
          </h1>
          <div className="relative">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50"
            >
              <Filter className="w-4 h-4" />
              <span>Filter by Blood Type</span>
            </motion.button>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 z-10 w-48 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg"
              >
                <div className="p-2">
                  <button
                    onClick={() => {
                      setSelectedBloodType("");
                      setIsFilterOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left rounded hover:bg-gray-100"
                  >
                    All Types
                  </button>
                  {bloodTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setSelectedBloodType(type);
                        setIsFilterOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left rounded hover:bg-gray-100"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDonors.map((donor, index) => (
            <DonorCard key={index} {...donor} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default BloodBank;
