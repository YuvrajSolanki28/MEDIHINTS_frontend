import { LockIcon, UserIcon, EyeIcon, EyeOffIcon, UserCircleIcon,CheckIcon, XIcon ,LucideMapPin, Phone } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

export default function LaboratoryForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        labName: "",
        email: "",
        contactNumber: "",
        labLicenseNumber: "",
        location: "",
        password: "",
        confirmPassword: "",
        termsAccepted: false,
    });
    const [validations, setValidations] = useState({
        minLength: false,
        hasUpper: false,
        hasLower: false,
        hasNumber: false,
        hasSpecial: false,
    });

    useEffect(() => {
        const password = formData.password;
        const newValidations = {
            minLength: password.length >= 8,
            hasUpper: /[A-Z]/.test(password),
            hasLower: /[a-z]/.test(password),
            hasNumber: /[0-9]/.test(password),
            hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        };

        setValidations(newValidations);
    }, [formData.password]);

    const ValidationItem = ({ satisfied, text }) => (
        <div className="flex items-center space-x-2">
            {satisfied ? (
                <CheckIcon className="h-4 w-4 text-green-500" />
            ) : (
                <XIcon className="h-4 w-4 text-red-500" />
            )}
            <span
                className={`text-sm ${satisfied ? "text-green-500" : "text-red-500"}`}
            >
                {text}
            </span>
        </div>
    );

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
         // Input validation
         if (!/^[a-zA-Z\s]+$/.test(formData.fullName.length < 2 || formData.fullName.length > 50)) {
        toast.error("Full Name must be between 2 to 10 characters");
        return;
        }
        if (!formData.email) {
        toast.error("Email is required");
        return;
        }
        if (!/^\d{10}$/.test(formData.contactNumber)) {
        toast.error("Contact Number must be exactly 10 digits");
        return;
        }
        if (formData.labLicenseNumber.length < 1 || formData.labLicenseNumber.length > 11) {
            toast.error("license Number is required");
            return;
        }
        if (formData.location.length < 10 || formData.location.length > 100) {
        toast.error("Address is required");
        return;
        }
        if (!formData.isPasswordValid) {
        toast.error("Please meet at least 3 password requirements");
        return;
        }
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        if (!formData.termsAccepted) {
            toast.error("You must accept the terms and conditions");
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/api/signup/laboratory", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Laboratory registered successfully!");
                navigate("/laboratory-login"); // Redirect to laboratory login on successful signup
            } else {
                toast.error(data.error || "Registration failed");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("An error occurred while signing up");
        }
    };

    return (
        <main className="flex flex-col w-full min-h-screen md:flex-row">
            <Toaster position="top-right" reverseOrder={false} />
            <div className="w-full md:w-1/2 min-h-[300px] md:min-h-screen relative">
                <img
                    src="/signup.png"
                    className="absolute inset-0 object-cover w-full h-full"
                    alt="Hospital"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-blue-900/70">
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="p-8 text-center text-white"
                    >
                        <h1 className="mb-4 text-4xl font-bold">MediHints</h1>
                        <p className="text-xl">Your Trusted Healthcare Partner</p>
                    </motion.div>
                </div>
            </div>

            <div className="flex items-center justify-center w-full p-8 md:w-1/2 bg-gray-50">
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-full max-w-md"
                >
                    <div className="mb-8 text-center">
                        <h2 className="text-2xl font-bold text-gray-900">Laboratory Registration</h2>
                        <p className="mt-2 text-gray-600">Join MediHints Plus today</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Laboratory Name */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="relative"
                        >
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <UserCircleIcon className="w-5 h-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                name="labName"
                                className="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Laboratory Name"
                                value={formData.labName}
                                onChange={handleChange}
                            />
                        </motion.div>

                        {/* Email */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="relative"
                        >
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <UserIcon className="w-5 h-5 text-gray-400" />
                            </div>
                            <input
                                type="email"
                                name="email"
                                className="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </motion.div>

                        {/* Contact Number */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                            className="relative"
                        >
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Phone className="w-5 h-5 text-gray-400" />
                            </div>
                            <input
                                type="tel"
                                name="contactNumber"
                                className="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Contact Number"
                                value={formData.contactNumber}
                                onChange={handleChange}
                            />
                        </motion.div>

                        {/* License Number */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1.0 }}
                            className="relative"
                        >
                            <input
                                type="text"
                                name="labLicenseNumber"
                                className="block w-full py-2 pl-3 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Laboratory License Number"
                                value={formData.labLicenseNumber}
                                onChange={handleChange}
                            />
                        </motion.div>

                        {/* Location */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1.2 }}
                            className="relative"
                        >
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <LucideMapPin className="w-5 h-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                name="location"
                                className="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Location"
                                value={formData.location}
                                onChange={handleChange}
                            />
                        </motion.div>

                        {/* Password */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1.4 }}
                            className="relative"
                        >
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <LockIcon className="w-5 h-5 text-gray-400" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className="block w-full py-2 pl-10 pr-10 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-3"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOffIcon className="w-5 h-5 text-gray-400" />
                                ) : (
                                    <EyeIcon className="w-5 h-5 text-gray-400" />
                                )}
                            </button>
                        </motion.div>

                         {/* Password Validations */}
                         <div className="mt-2 space-y-1">
                            {validations.minLength && (
                                <ValidationItem
                                    satisfied={validations.minLength}
                                    text="At least 8 characters"
                                />
                            )}
                            {validations.hasUpper && (
                                <ValidationItem
                                    satisfied={validations.hasUpper}
                                    text="At least 1 uppercase letter"
                                />
                            )}
                            {validations.hasLower && (
                                <ValidationItem
                                    satisfied={validations.hasLower}
                                    text="At least 1 lowercase letter"
                                />
                            )}
                            {validations.hasNumber && (
                                <ValidationItem
                                    satisfied={validations.hasNumber}
                                    text="At least 1 number"
                                />
                            )}
                            {validations.hasSpecial && (
                                <ValidationItem
                                    satisfied={validations.hasSpecial}
                                    text="At least 1 special character"
                                />
                            )}
                        </div>

                        {/* Confirm Password */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1.6 }}
                            className="relative"
                        >
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <LockIcon className="w-5 h-5 text-gray-400" />
                            </div>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                className="block w-full py-2 pl-10 pr-10 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-3"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? (
                                    <EyeOffIcon className="w-5 h-5 text-gray-400" />
                                ) : (
                                    <EyeIcon className="w-5 h-5 text-gray-400" />
                                )}
                            </button>
                        </motion.div>

                        {/* Terms and Conditions */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1.8 }}
                            className="flex items-center"
                        >
                            <input
                                type="checkbox"
                                name="termsAccepted"
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                checked={formData.termsAccepted}
                                onChange={handleChange}
                            />
                            <label className="block ml-2 text-sm text-gray-900">
                                I agree to the Terms and Conditions
                            </label>
                        </motion.div>

                        {/* Submit Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 2.0 }}
                        >
                            <button
                                type="submit"
                                className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Register
                            </button>
                        </motion.div>

                        {/* Sign-in Link */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 2.2 }}
                            className="text-center"
                        >
                            <span className="text-sm text-gray-600">
                                Already have an account?{" "}
                                <li
                                    className="text-blue-600 cursor-pointer hover:text-blue-500"
                                    onClick={() => navigate("/laboratory_login")}
                                >
                                    Sign in here
                                </li>
                            </span>
                        </motion.div>
                    </form>
                </motion.div>
            </div>
        </main>
    );
}