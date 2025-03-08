import { motion } from "framer-motion";
import { 
    PhoneIcon, ClockIcon, AwardIcon, 
    BookOpenIcon, StarIcon, CalendarIcon 
} from "lucide-react";
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
        { name: "John Smith", rating: 5, comment: "Excellent doctor, very thorough and caring." },
        { name: "Mary Johnson", rating: 5, comment: "Dr. Stevens took time to explain everything clearly." },
        { name: "Robert Williams", rating: 4, comment: "Very professional and knowledgeable." },
    ];

    return (
        <div className="w-full">
            {/* Hero Section */}
            <motion.div 
                className="relative h-[650px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <img src="/doctorsprofile1.png" alt="Dr. Michael Stevens" className="object-cover w-full h-full" />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-blue-900 to-transparent">
                    <motion.div 
                        className="mx-auto max-w-7xl"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="mb-2 text-4xl font-bold text-white">Dr. Michael Stevens</h1>
                        <p className="text-xl text-blue-100">Neurology Specialist</p>
                    </motion.div>
                </div>
            </motion.div>

            <div className="px-4 py-12 mx-auto max-w-7xl">
                {/* Contact & Availability */}
                <motion.div 
                    className="grid grid-cols-1 gap-8 mb-12 md:grid-cols-3"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0, y: 50 },
                        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } }
                    }}
                >
                    {[
                        { icon: <PhoneIcon className="w-5 h-5 mr-2 text-blue-900" />, title: "Contact", content: ["+91 9834874107", "contact@drstevens.com"] },
                        { icon: <ClockIcon className="w-5 h-5 mr-2 text-blue-900" />, title: "Office Hours", content: ["Mon-Fri: 9:00 AM - 5:00 PM", "Sat: 9:00 AM - 1:00 PM"] },
                        { icon: <CalendarIcon className="w-5 h-5 mr-2 text-blue-900" />, title: "Next Available", button: "Schedule Appointment" }
                    ].map((item, index) => (
                        <motion.div 
                            key={index} 
                            className="p-6 rounded-lg bg-blue-50"
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        >
                            <div className="flex items-center mb-4">
                                {item.icon}
                                <h3 className="text-lg font-semibold">{item.title}</h3>
                            </div>
                            {item.content ? item.content.map((text, i) => <p key={i} className="text-gray-700">{text}</p>) : (
                                <button className="w-full py-2 text-white transition-colors bg-blue-900 rounded-md hover:bg-blue-800" onClick={() => navigate("/appointment")}>
                                    {item.button}
                                </button>
                            )}
                        </motion.div>
                    ))}
                </motion.div>

                {/* Professional Background */}
                <motion.div 
                    className="grid grid-cols-1 gap-12 mb-12 md:grid-cols-2"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div>
                        <div className="flex items-center mb-6">
                            <AwardIcon className="w-6 h-6 mr-2 text-blue-900" />
                            <h2 className="text-2xl font-bold">Education & Experience</h2>
                        </div>
                        <div className="space-y-4">
                            {[
                                { title: "Harvard Medical School", subtitle: "M.D. in Neurology, 2005-2009" },
                                { title: "Johns Hopkins Hospital", subtitle: "Residency in Neurology, 2009-2013" },
                                { title: "Mayo Clinic", subtitle: "Fellowship in Movement Disorders, 2013-2015" }
                            ].map((item, index) => (
                                <div key={index}>
                                    <h3 className="font-semibold">{item.title}</h3>
                                    <p className="text-gray-600">{item.subtitle}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, x: 30 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center mb-6">
                            <BookOpenIcon className="w-6 h-6 mr-2 text-blue-900" />
                            <h2 className="text-2xl font-bold">Services & Treatments</h2>
                        </div>
                        <ul className="grid grid-cols-2 gap-4">
                            {services.map((service, index) => (
                                <motion.li 
                                    key={index} 
                                    className="flex items-center text-gray-700"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div className="w-2 h-2 mr-2 bg-blue-900 rounded-full" />
                                    {service}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </motion.div>

                {/* Reviews */}
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.3 } } }}
                >
                    <div className="flex items-center mb-6">
                        <StarIcon className="w-6 h-6 mr-2 text-blue-900" />
                        <h2 className="text-2xl font-bold">Patient Reviews</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {reviews.map((review, index) => (
                            <motion.div key={index} className="p-6 bg-white rounded-lg shadow" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                                <p className="mb-4 text-gray-700">{review.comment}</p>
                                <p className="font-semibold">{review.name}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
