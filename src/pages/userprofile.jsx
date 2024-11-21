import { UserCircle, Mail, Phone, MapPin, Calendar, Clock, Activity } from "lucide-react";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function UserProfile() {
    const { userId } = useParams(); // Get userId from URL params
    console.log(userId); // Log userId to ensure it's being captured correctly

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Make sure your API URL is correct
                const response = await axios.get(`http://localhost:8000/api/user/${userId}`);
                console.log("User data:", response.data); // Log response to see structure
                setUser(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching user:', err);
                setError('Unable to fetch user data. Please try again later.');
                setLoading(false);
            }
        };

        if (userId) {
            fetchUser(); // Fetch user data only if userId exists
        } else {
            setError('Invalid user ID.');
            setLoading(false);
        }
    }, [userId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-lg font-medium text-gray-600">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-lg font-medium text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Personal Information */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-2xl font-bold text-[#1a237e] mb-4 flex items-center">
                                <UserCircle className="h-6 w-6 mr-2" />
                                Personal Information
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-gray-600">Full Name</label>
                                    <p className="font-medium">{user?.fullName || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-600">Age</label>
                                    <p className="font-medium">{user?.age || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-600">Gender</label>
                                    <p className="font-medium">{user?.gender || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-600">Blood Type</label>
                                    <p className="font-medium">{user?.bloodType || 'N/A'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Medical History */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-2xl font-bold text-[#1a237e] mb-4 flex items-center">
                                <Activity className="h-6 w-6 mr-2" />
                                Medical History
                            </h2>
                            <div className="space-y-4">
                                {user?.medicalHistory?.length > 0 ? (
                                    user?.medicalHistory.map((condition, index) => (
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
                            </div>
                        </div>

                        {/* Recent Appointments */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-2xl font-bold text-[#1a237e] mb-4 flex items-center">
                                <Calendar className="h-6 w-6 mr-2" />
                                Recent Appointments
                            </h2>
                            <div className="space-y-4">
                                {user?.appointments?.length > 0 ? (
                                    user?.appointments.map((appointment, index) => (
                                        <div key={index} className="flex items-center p-4 border rounded-lg">
                                            <div>
                                                <p className="font-medium">{appointment.reason}</p>
                                                <p className="text-sm text-gray-600">
                                                    {appointment.doctor || 'Unknown Doctor'}
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
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {/* Contact Information */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-2xl font-bold text-[#1a237e] mb-4 flex items-center">
                                <Mail className="h-6 w-6 mr-2" />
                                Contact Information
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <Mail className="h-5 w-5 text-[#2196f3] mr-3" />
                                    <span>{user?.email || 'N/A'}</span>
                                </div>
                                <div className="flex items-center">
                                    <Phone className="h-5 w-5 text-[#2196f3] mr-3" />
                                    <span>{user?.contactNumber || 'N/A'}</span>
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="h-5 w-5 text-[#2196f3] mr-3" />
                                    <span>{user?.address || 'N/A'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Health Metrics */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-2xl font-bold text-[#1a237e] mb-4 flex items-center">
                                <Activity className="h-6 w-6 mr-2" />
                                Health Metrics
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">BMI</span>
                                    <span className="font-medium">{user?.healthMetrics?.bmi || 'N/A'}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Blood Pressure</span>
                                    <span className="font-medium">
                                        {user?.healthMetrics?.bloodPressure || 'N/A'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;