import { UserCircle, Mail, Phone, MapPin, Calendar, Clock, Activity, } from "lucide-react";
export default function UserProfile() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-2xl font-bold text-[#1a237e] mb-4 flex items-center">
                                <UserCircle className="h-6 w-6 mr-2" />
                                Personal Information
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-gray-600">Full Name</label>
                                    <p className="font-medium">John Doe</p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-600">Date of Birth</label>
                                    <p className="font-medium">January 1, 1990</p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-600">Gender</label>
                                    <p className="font-medium">Male</p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-600">Blood Type</label>
                                    <p className="font-medium">O+</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-2xl font-bold text-[#1a237e] mb-4 flex items-center">
                                <div className="h-6 w-6 mr-2" />
                                Medical History
                            </h2>
                            <div className="space-y-4">
                                <div className="p-4 border rounded-lg">
                                    <p className="font-medium">Hypertension</p>
                                    <p className="text-sm text-gray-600">Diagnosed: 2020</p>
                                </div>
                                <div className="p-4 border rounded-lg">
                                    <p className="font-medium">Type 2 Diabetes</p>
                                    <p className="text-sm text-gray-600">Diagnosed: 2019</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-2xl font-bold text-[#1a237e] mb-4 flex items-center">
                                <Calendar className="h-6 w-6 mr-2" />
                                Recent Appointments
                            </h2>
                            <div className="space-y-4">
                                {[1, 2, 3].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center p-4 border rounded-lg"
                                    >
                                        <div>
                                            <p className="font-medium">General Checkup</p>
                                            <p className="text-sm text-gray-600">Dr. Sarah Smith</p>
                                            <div className="flex items-center text-sm text-gray-500 mt-1">
                                                <Clock className="h-4 w-4 mr-1" />
                                                <span>March {item}, 2024 - 10:00 AM</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-2xl font-bold text-[#1a237e] mb-4 flex items-center">
                                <Mail className="h-6 w-6 mr-2" />
                                Contact Information
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <Mail className="h-5 w-5 text-[#2196f3] mr-3" />
                                    <span>john.doe@example.com</span>
                                </div>
                                <div className="flex items-center">
                                    <Phone className="h-5 w-5 text-[#2196f3] mr-3" />
                                    <span>+1 234 567 890</span>
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="h-5 w-5 text-[#2196f3] mr-3" />
                                    <span>123 Medical Street, Healthcare City</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-2xl font-bold text-[#1a237e] mb-4 flex items-center">
                                <Activity className="h-6 w-6 mr-2" />
                                Health Metrics
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Height</span>
                                    <span className="font-medium">175 cm</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Weight</span>
                                    <span className="font-medium">70 kg</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">BMI</span>
                                    <span className="font-medium">22.9</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Blood Pressure</span>
                                    <span className="font-medium">120/80</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}