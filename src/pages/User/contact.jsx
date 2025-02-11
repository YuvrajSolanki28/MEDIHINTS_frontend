import { PhoneIcon, MapPinIcon, MailIcon, ClockIcon } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

export default function ContactPage() {
    return (
        <div className="w-full">
            {/* Hero Image Section */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 1 }} 
                className="relative h-[300px] mb-16"
            >
                <img src="/contact1.png" alt="Medical team" className="w-full h-full object-cover brightness-50" />
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8">
                    <h1 className="text-5xl text-white font-bold">Our Contact</h1>
                </div>
            </motion.div>

            <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <motion.div 
                    className="grid gap-8 lg:grid-cols-2"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
                    }}
                >
                    {/* Contact Form */}
                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                        <h2 className="text-xs font-semibold uppercase tracking-wide text-blue-500">GET IN TOUCH</h2>
                        <h3 className="mt-2 text-3xl font-bold text-gray-900">Contact</h3>

                        <motion.form 
                            className="mt-8 space-y-6 bg-[#1e2756] rounded-md px-4 py-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <div className="grid gap-4 sm:grid-cols-2">
                                <motion.input 
                                    whileFocus={{ scale: 1.05 }}
                                    type="text" 
                                    placeholder="Name" 
                                    className="block w-full rounded-md border bg-[#1e2756] border-gray-300 px-4 py-3 text-white shadow-sm"
                                />
                                <motion.input 
                                    whileFocus={{ scale: 1.05 }}
                                    type="email" 
                                    placeholder="Email" 
                                    className="block w-full rounded-md border bg-[#1e2756] border-gray-300 px-4 py-3 text-white shadow-sm"
                                />
                            </div>
                            <motion.input 
                                whileFocus={{ scale: 1.05 }}
                                type="text" 
                                placeholder="Subject" 
                                className="block w-full rounded-md border bg-[#1e2756] border-gray-300 px-4 py-3 text-white shadow-sm"
                            />
                            <motion.textarea 
                                whileFocus={{ scale: 1.05 }}
                                placeholder="Message" 
                                rows={4} 
                                className="w-full p-3 rounded border text-white border-gray-300 bg-[#1e2756]"
                            ></motion.textarea>
                            <motion.button 
                                whileHover={{ scale: 1.05 }} 
                                whileTap={{ scale: 0.95 }} 
                                type="submit" 
                                className="w-full bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-600 transition"
                            >
                                SUBMIT
                            </motion.button>
                        </motion.form>
                    </motion.div>

                    {/* Contact Information Boxes */}
                    <motion.div 
                        className="grid gap-8 sm:grid-cols-2"
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    >
                        {[
                            { icon: <PhoneIcon className="h-8 w-8 text-blue-900" />, title: "EMERGENCY", details: ["(237) 681-812-255", "(237) 666-331-894"], bg: "bg-blue-100" },
                            { icon: <MapPinIcon className="h-8 w-8" />, title: "LOCATION", details: ["0123 Some place", "9876 Some country"], bg: "bg-blue-900 text-white" },
                            { icon: <MailIcon className="h-8 w-8 text-blue-900" />, title: "EMAIL", details: ["fildineeesoe@gmil.com", "myebstudios@gmail.com"], bg: "bg-blue-100" },
                            { icon: <ClockIcon className="h-8 w-8 text-blue-900" />, title: "WORKING HOURS", details: ["Mon-Sat 09:00-20:00", "Sunday Emergency only"], bg: "bg-blue-100" }
                        ].map((item, index) => (
                            <motion.div 
                                key={index}
                                whileHover={{ scale: 1.05 }} 
                                whileTap={{ scale: 0.95 }}
                                className={`rounded-lg p-8 ${item.bg} transition`}
                            >
                                <motion.div whileHover={{ rotate: 10 }} whileTap={{ rotate: -10 }}>
                                    {item.icon}
                                </motion.div>
                                <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                                <div className="mt-2 space-y-1">
                                    {item.details.map((text, i) => (
                                        <p key={i}>{text}</p>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </main>
        </div>
    );
}
