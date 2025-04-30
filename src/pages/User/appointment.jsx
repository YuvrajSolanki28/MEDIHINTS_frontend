import React, { useState } from "react";
import axios from "axios";
import { PhoneIcon } from "lucide-react";

export default function AppointmentBooking() {
    const [formData, setFormData] = useState({
        fullName: '',
        gender: '',
        email: '',
        contactNumber: '',
        birthDate: '',
        appointmentDate: '',
        time: '',
        doctor: '',
        department: '',
        messageBox: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const today = new Date();
        const birth = new Date(formData.birthDate);
        const appointment = new Date(`${formData.appointmentDate}T${formData.time}`);

        if (birth > today) {
            alert("Birthdate cannot be in the future.");
            return;
        }

        if (appointment < today) {
            alert("Appointment date and time cannot be in the past.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/appointments', formData);
            alert(response.data.message);
            setFormData({
                fullName: '',
                gender: '',
                email: '',
                contactNumber: '',
                birthDate: '',
                appointmentDate: '',
                time: '',
                doctor: '',
                department: '',
                messageBox: '',
            });
        } catch (error) {
            alert('Error booking appointment. Please try again.');
            console.error(error);
        }
    };

    const getTodayDate = () => new Date().toISOString().split("T")[0];

    return (
        <div className="w-full">
            <div className="relative h-[300px] mb-16">
                <img
                    src="/appointment1.png"
                    alt="Medical team"
                    className="object-cover w-full h-full brightness-50"
                />
                <div className="absolute top-0 left-0 flex flex-col justify-center w-full h-full px-8">
                    <h1 className="font-serif text-5xl font-bold text-white">Book Appointment</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 px-4 py-12 mx-auto max-w-7xl lg:grid-cols-2">
                <div>
                    <h2 className="mb-4 text-3xl font-bold text-gray-900">Book an Appointment</h2>
                    <p className="mb-8 text-gray-600">
                        Please fill out the form below to schedule an appointment with one of our doctors.
                    </p>

                    <form className="space-y-4 bg-[#1e2756] rounded-lg p-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" className="w-full p-3 rounded border text-white border-gray-300 bg-[#1e2756]" required />

                            <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-3 rounded border text-white border-gray-300 bg-[#1e2756]" required>
                                <option value="">Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>

                            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-3 rounded border text-white border-gray-300 bg-[#1e2756]" required />

                            <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="Contact Number" className="w-full p-3 rounded border text-white border-gray-300 bg-[#1e2756]" required />

                            <input
                                type="date"
                                name="birthDate"
                                max={getTodayDate()}
                                value={formData.birthDate}
                                onChange={handleChange}
                                className="w-full p-3 rounded border text-white border-gray-300 bg-[#1e2756]"
                                required
                            />

                            <input
                                type="date"
                                name="appointmentDate"
                                min={getTodayDate()}
                                value={formData.appointmentDate}
                                onChange={handleChange}
                                className="w-full p-3 rounded border text-white border-gray-300 bg-[#1e2756]"
                                required
                            />

                            <select name="time" value={formData.time} onChange={handleChange} className="w-full p-3 rounded border text-white border-gray-300 bg-[#1e2756]" required>
                                <option value="">Select Time</option>
                                <option value="09:00">09:00 AM</option>
                                <option value="10:00">10:00 AM</option>
                                <option value="11:00">11:00 AM</option>
                                <option value="14:00">02:00 PM</option>
                                <option value="15:00">03:00 PM</option>
                                <option value="16:00">04:00 PM</option>
                            </select>

                            <select name="doctor" value={formData.doctor} onChange={handleChange} className="w-full p-3 rounded border text-white border-gray-300 bg-[#1e2756]" required>
                                <option value="">Select Doctor</option>
                                <option value="dr-smith">Dr. Smith</option>
                                <option value="dr-jones">Dr. Jones</option>
                                <option value="dr-williams">Dr. Williams</option>
                            </select>

                            <select name="department" value={formData.department} onChange={handleChange} className="w-full p-3 rounded border text-white border-gray-300 bg-[#1e2756]" required>
                                <option value="">Select Department</option>
                                <option value="cardiology">Cardiology</option>
                                <option value="neurology">Neurology</option>
                                <option value="pediatrics">Pediatrics</option>
                                <option value="orthopedics">Orthopedics</option>
                            </select>
                        </div>

                        <textarea name="messageBox" value={formData.messageBox} onChange={handleChange} placeholder="Message" rows={4} className="w-full p-3 rounded border text-white border-gray-300 bg-[#1e2756]"></textarea>

                        <button type="submit" className="w-full px-6 py-3 text-white transition duration-200 bg-blue-500 rounded hover:bg-blue-600">
                            SUBMIT
                        </button>
                    </form>
                </div>

                <div className="bg-[#1e2875] text-white p-8 rounded-lg">
                    <h2 className="mb-8 text-3xl font-bold">Schedule hours</h2>
                    <div className="space-y-4">
                        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => (
                            <div className="flex justify-between" key={index}>
                                <span>{day}</span>
                                <span>—</span>
                                <span>{day === "Sunday" ? "Closed" : "09:00 AM - 07:00 PM"}</span>
                            </div>
                        ))}
                    </div>
                    <div className="pt-8 mt-12 border-t border-white/20">
                        <div className="flex items-center gap-4">
                            <PhoneIcon className="w-8 h-8" />
                            <div>
                                <div className="text-lg font-semibold">Emergency</div>
                                <div className="text-xl">(237) 681-812-255</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
