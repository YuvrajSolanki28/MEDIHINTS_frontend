import React, { useEffect, useState } from "react";
import { UserCircle, Mail, Phone, MapPin, Calendar, Clock, Activity } from "lucide-react";
import { motion } from "framer-motion"; // Import Framer Motion

const ProfilePage = () => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
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
                const response = await fetch(`https://medihints-backend.vercel.app/api/users/${token}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`Server Error: ${response.statusText}`);
                }

                const data = await response.json();
                setUser(data);
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
    if (!user) return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>No user found.</motion.div>;

    const calculateAge = (birthDate) => {
        if (!birthDate) return "N/A";
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        const dayDiff = today.getDate() - birth.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }
        return age;
    };

    return (
        <motion.div 
            className="min-h-screen bg-gray-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <div className="px-4 py-8 mx-auto max-w-7xl">
                <motion.div 
                    className="grid grid-cols-1 gap-8 lg:grid-cols-3"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
                    }}
                >
                    {/* Main Content */}
                    <motion.div className="space-y-8 lg:col-span-2" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                        <Section title="Personal Information" icon={UserCircle}>
                            <motion.div className="grid grid-cols-2 gap-4">
                                <InfoItem label="Full Name" value={user.fullName} />
                                <InfoItem label="Age" value={calculateAge(user.birthDate)} />
                                <InfoItem label="Gender" value={user.gender} />
                                <InfoItem label="Blood Type" value={user.bloodGroup} />
                            </motion.div>
                        </Section>

                        <Section title="Medical History" icon={Activity}>
                            {user.medicalHistory?.length > 0 ? (
                                user.medicalHistory.map((condition, index) => (
                                    <motion.div key={index} className="p-4 border rounded-lg" whileHover={{ scale: 1.02 }}>
                                        <p className="font-medium">{condition.name}</p>
                                        <p className="text-sm text-gray-600">Diagnosed: {condition.diagnosisYear}</p>
                                    </motion.div>
                                ))
                            ) : (
                                <p className="text-gray-600">No medical history available.</p>
                            )}
                        </Section>

                        <Section title="Recent Appointments" icon={Calendar}>
                            {user.appointments?.length > 0 ? (
                                user.appointments.map((appointment, index) => (
                                    <motion.div key={index} className="flex items-center p-4 border rounded-lg" whileHover={{ scale: 1.02 }}>
                                        <div>
                                            <p className="font-medium">{appointment.reason}</p>
                                            <p className="text-sm text-gray-600">{appointment.doctor || "Unknown Doctor"}</p>
                                            <div className="flex items-center mt-1 text-sm text-gray-500">
                                                <Clock className="w-4 h-4 mr-1" />
                                                <span>{appointment.date}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <p className="text-gray-600">No recent appointments available.</p>
                            )}
                        </Section>
                    </motion.div>

                    {/* Sidebar */}
                    <motion.div className="space-y-8">
                        <Section title="Contact Information" icon={Mail}>
                            <ContactItem icon={Mail} label={user.email} />
                            <ContactItem icon={Phone} label={user.contactNumber} />
                            <ContactItem icon={MapPin} label={user.address} />
                        </Section>

                        <Section title="Health Metrics" icon={Activity}>
                            <MetricItem label="BMI" value={user.healthMetrics?.bmi} />
                            <MetricItem label="Blood Pressure" value={user.healthMetrics?.bloodPressure} />
                        </Section>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
}

const InfoItem = ({ label, value }) => (
    <motion.div className="opacity-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <label className="text-sm text-gray-600">{label}</label>
        <p className="font-medium">{value || "N/A"}</p>
    </motion.div>
);

const Section = ({ title, icon: Icon, children }) => (
    <motion.div className="p-6 bg-white rounded-lg shadow" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-2xl font-bold text-[#1a237e] mb-4 flex items-center">
            <Icon className="w-6 h-6 mr-2" />
            {title}
        </h2>
        {children}
    </motion.div>
);

const ContactItem = ({ icon: Icon, label }) => (
    <motion.div className="flex items-center opacity-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Icon className="h-5 w-5 text-[#2196f3] mr-3" />
        <span>{label || "N/A"}</span>
    </motion.div>
);

const MetricItem = ({ label, value }) => (
    <motion.div className="flex items-center justify-between opacity-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <span className="text-gray-600">{label}</span>
        <span className="font-medium">{value || "N/A"}</span>
    </motion.div>
);

export default ProfilePage;