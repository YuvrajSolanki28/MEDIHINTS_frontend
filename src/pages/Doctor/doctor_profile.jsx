import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, Phone, Mail, Award, Star, Calendar } from "lucide-react";

const DoctorProfiles = () => {
    const [token, setToken] = useState(null);
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
            } else {
                setError("No token found. Please log in.");
                setLoading(false);
            }
        }, []);

        useEffect(() => {
                const fetchUserData = async () => {
                    if (!token) return;
        
                    try {
                        const response = await fetch(`http://localhost:8000/api/doctor/${token}`, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        });
        
                        if (!response.ok) {
                            throw new Error(`Server Error: ${response.statusText}`);
                        }
        
                        const data = await response.json();
                        setDoctor(data);
                    } catch (error) {
                        console.error("Error fetching user data:", error);
                        setError(error.message === "Failed to fetch" ? "Network error: Unable to fetch data." : "Failed to fetch user data.");
                    } finally {
                        setLoading(false);
                    }
                };
        
                if (token) fetchUserData();
            }, [token]);

            if (loading) return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">Loading...</motion.div>;
                if (error) return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-600">Error: {error}</motion.div>;
                if (!doctor) return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>No user found.</motion.div>;

  return (
    <main className="w-full min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl p-6 mx-auto"
      >
        {/* Hero Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col items-center gap-6 p-6 mb-6 bg-white rounded-lg shadow-lg md:flex-row"
        >
          <motion.img
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="object-cover w-48 h-48 rounded-full"
          >{doctor.img}</motion.img>
          <div>
            <motion.h1
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="mb-2 text-3xl font-bold text-gray-800"
            >
              {doctor.fullName}
            </motion.h1>
            <p className="mb-4 font-medium text-blue-600">
              {doctor.specialization} • {doctor.yearsOfExperience} Years Experience
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin size={18} />
                <span>{doctor.clinicAddress}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock size={18} />
                <span>Mon - Fri, 9:00 - 17:00</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Info Sections */}
        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="p-6 bg-white rounded-lg shadow-lg"
          >
            <h2 className="mb-4 text-xl font-bold text-gray-800">
              Contact Information
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="text-blue-600" size={18} />
                <span>{doctor.contactNumber}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-blue-600" size={18} />
                <span>{doctor.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="text-blue-600" size={18} />
                <span>Available for appointments</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="p-6 bg-white rounded-lg shadow-lg"
          >
            <h2 className="mb-4 text-xl font-bold text-gray-800">
              Specializations
            </h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Award className="text-blue-600" size={18} />
                <span>Interventional Cardiology</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="text-blue-600" size={18} />
                <span>Heart Failure Management</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="text-blue-600" size={18} />
                <span>Preventive Cardiology</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Reviews Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="p-6 mt-6 bg-white rounded-lg shadow-lg"
        >
          <h2 className="mb-4 text-xl font-bold text-gray-800">
            Patient Reviews
          </h2>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="pb-4 border-b last:border-b-0 last:pb-0"
              >
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      size={16}
                      className="text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600">
                  {
                    [
                      "Dr. Wilson is incredibly knowledgeable and caring. She took the time to explain everything thoroughly.",
                      "Outstanding doctor! Her expertise in cardiology is evident. Very patient and professional.",
                      "Great experience with Dr. Wilson. She's attentive and really listens to her patients.",
                    ][i]
                  }
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
};

export default DoctorProfiles;
