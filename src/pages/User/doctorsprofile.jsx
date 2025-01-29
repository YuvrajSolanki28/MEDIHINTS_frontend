import { LinkedinIcon, FacebookIcon, InstagramIcon, PhoneIcon, ClockIcon, AwardIcon, BookOpenIcon, StarIcon, CalendarIcon, } from "lucide-react";
import React from "react";
import { useNavigate } from 'react-router-dom';
export default function DoctorProfile() {
    const navigate = useNavigate();
    const services = [
        "Neurological Examinations",
        "EEG Testing",
        "EMG Studies",
        "Movement Disorder Treatment",
        "Headache Management",
        "Stroke Prevention & Care",
    ];
    const reviews = [
        {
            name: "John Smith",
            rating: 5,
            comment: "Excellent doctor, very thorough and caring.",
        },
        {
            name: "Mary Johnson",
            rating: 5,
            comment: "Dr. Stevens took time to explain everything clearly.",
        },
        {
            name: "Robert Williams",
            rating: 4,
            comment: "Very professional and knowledgeable.",
        },
    ];
    return (
        <div className="w-full">
            {/* Hero Section */}
            <div className="relative h-[650px]">
                <img
                    src="/doctorsprofile1.png"
                    alt="Dr. Michael Stevens"
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900 to-transparent p-8">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-4xl font-bold text-white mb-2">
                            Dr. Michael Stevens
                        </h1>
                        <p className="text-xl text-blue-100">Neurology Specialist</p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Contact & Availability */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-blue-50 p-6 rounded-lg">
                        <div className="flex items-center mb-4">
                            <PhoneIcon className="w-5 h-5 text-blue-900 mr-2" />
                            <h3 className="text-lg font-semibold">Contact</h3>
                        </div>
                        <p className="text-gray-700">+1 (555) 123-4567</p>
                        <p className="text-gray-700">contact@drstevens.com</p>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-lg">
                        <div className="flex items-center mb-4">
                            <ClockIcon className="w-5 h-5 text-blue-900 mr-2" />
                            <h3 className="text-lg font-semibold">Office Hours</h3>
                        </div>
                        <p className="text-gray-700">Mon-Fri: 9:00 AM - 5:00 PM</p>
                        <p className="text-gray-700">Sat: 9:00 AM - 1:00 PM</p>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-lg">
                        <div className="flex items-center mb-4">
                            <CalendarIcon className="w-5 h-5 text-blue-900 mr-2" />
                            <h3 className="text-lg font-semibold">Next Available</h3>
                        </div>
                        <button className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition-colors" onClick={() => navigate("/appointment")}>
                            Schedule Appointment
                        </button>
                    </div>
                </div>

                {/* Professional Background */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                    <div>
                        <div className="flex items-center mb-6">
                            <AwardIcon className="w-6 h-6 text-blue-900 mr-2" />
                            <h2 className="text-2xl font-bold">Education & Experience</h2>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold">Harvard Medical School</h3>
                                <p className="text-gray-600">M.D. in Neurology, 2005-2009</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Johns Hopkins Hospital</h3>
                                <p className="text-gray-600">
                                    Residency in Neurology, 2009-2013
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Mayo Clinic</h3>
                                <p className="text-gray-600">
                                    Fellowship in Movement Disorders, 2013-2015
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center mb-6">
                            <BookOpenIcon className="w-6 h-6 text-blue-900 mr-2" />
                            <h2 className="text-2xl font-bold">Services & Treatments</h2>
                        </div>
                        <ul className="grid grid-cols-2 gap-4">
                            {services.map((service, index) => (
                                <li key={index} className="flex items-center text-gray-700">
                                    <div className="w-2 h-2 bg-blue-900 rounded-full mr-2" />
                                    {service}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Reviews */}
                <div className="mb-12">
                    <div className="flex items-center mb-6">
                        <StarIcon className="w-6 h-6 text-blue-900 mr-2" />
                        <h2 className="text-2xl font-bold">Patient Reviews</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {reviews.map((review, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow">
                                <div className="flex mb-2">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <StarIcon
                                            key={i}
                                            className="w-5 h-5 text-yellow-400 fill-current"
                                        />
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-4">{review.comment}</p>
                                <p className="font-semibold">{review.name}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-6">
                    <LinkedinIcon className="w-6 h-6 text-blue-900 cursor-pointer" />
                    <FacebookIcon className="w-6 h-6 text-blue-900 cursor-pointer" />
                    <InstagramIcon className="w-6 h-6 text-blue-900 cursor-pointer" />
                </div>
            </div>
        </div>
    );
}  