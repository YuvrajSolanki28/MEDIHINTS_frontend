import { UserCircle, Mail, Phone, MapPin, Calendar, Clock, Activity } from "lucide-react";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch token (example: from localStorage or some other source)
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        } else {
            setError("No token found. Please log in.");
            setLoading(false);
        }
    }, []);

    // Fetch user data using the token
    useEffect(() => {
        const fetchUserData = async () => {
            if (!token) return;

            try {
                const response = await fetch(`http://localhost:8000/api/users/${token}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`Server Error: ${response.statusText}`);
                }

                const data = await response.json();
                setUser(data); // Update user state with the fetched data
            } catch (error) {
                console.error("Error fetching user data:", error);
                setError(
                    error.message === "Failed to fetch"
                        ? "Network error: Unable to fetch data."
                        : "Failed to fetch user data."
                );
            } finally {
                setLoading(false); // Stop loading indicator
            }
        };

        if (token) fetchUserData();
    }, [token]);

    // Render loading, error, or user data
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-600">Error: {error}</div>;
    }

    if (!user) {
        return <div>No user found.</div>;
    }

    const calculateAge = (birthDate) => {
        if (!birthDate) return "N/A";
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        const dayDiff = today.getDate() - birth.getDate();
    
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--; // Adjust for upcoming birthday
        }
    
        return age;
    };

    // Render Profile Page
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Personal Information */}
                        <section className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-2xl font-bold text-[#1a237e] mb-4 flex items-center">
                                <UserCircle className="h-6 w-6 mr-2" />
                                Personal Information
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                <InfoItem label="Full Name" value={user.fullName} />
                                <InfoItem label="Age" value={calculateAge(user.birthDate)} />
                                <InfoItem label="Gender" value={user.gender} />
                                <InfoItem label="Blood Type" value={user.bloodGroup} />
                            </div>
                        </section>

                        {/* Medical History */}
                        <Section title="Medical History" icon={Activity}>
                            {user.medicalHistory?.length > 0 ? (
                                user.medicalHistory.map((condition, index) => (
                                    <div key={index} className="p-4 border rounded-lg">
                                        <p className="font-medium">{condition.name}</p>
                                        <p className="text-sm text-gray-600">
                                            Diagnosed: {condition.diagnosisYear}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-600">No medical history available.</p>
                            )}
                        </Section>

                        {/* Recent Appointments */}
                        <Section title="Recent Appointments" icon={Calendar}>
                            {user.appointments?.length > 0 ? (
                                user.appointments.map((appointment, index) => (
                                    <div key={index} className="flex items-center p-4 border rounded-lg">
                                        <div>
                                            <p className="font-medium">{appointment.reason}</p>
                                            <p className="text-sm text-gray-600">
                                                {appointment.doctor || "Unknown Doctor"}
                                            </p>
                                            <div className="flex items-center text-sm text-gray-500 mt-1">
                                                <Clock className="h-4 w-4 mr-1" />
                                                <span>{appointment.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-600">No recent appointments available.</p>
                            )}
                        </Section>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Contact Information */}
                        <Section title="Contact Information" icon={Mail}>
                            <ContactItem icon={Mail} label={user.email} />
                            <ContactItem icon={Phone} label={user.contactNumber} />
                            <ContactItem icon={MapPin} label={user.address} />
                        </Section>

                        {/* Health Metrics */}
                        <Section title="Health Metrics" icon={Activity}>
                            <MetricItem label="BMI" value={user.healthMetrics?.bmi} />
                            <MetricItem
                                label="Blood Pressure"
                                value={user.healthMetrics?.bloodPressure}
                            />
                        </Section>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Reusable Component for Info Items
const InfoItem = ({ label, value }) => (
    <div>
        <label className="text-sm text-gray-600">{label}</label>
        <p className="font-medium">{value || "N/A"}</p>
    </div>
);

// Reusable Section Component
const Section = ({ title, icon: Icon, children }) => (
    <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-[#1a237e] mb-4 flex items-center">
            <Icon className="h-6 w-6 mr-2" />
            {title}
        </h2>
        {children}
    </div>
);

// Reusable Contact Item
const ContactItem = ({ icon: Icon, label }) => (
    <div className="flex items-center">
        <Icon className="h-5 w-5 text-[#2196f3] mr-3" />
        <span>{label || "N/A"}</span>
    </div>
);

// Reusable Metric Item
const MetricItem = ({ label, value }) => (
    <div className="flex items-center justify-between">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium">{value || "N/A"}</span>
    </div>
);

export default ProfilePage;
