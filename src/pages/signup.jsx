import { LockIcon, UserIcon, EyeIcon, EyeOffIcon, UserCircleIcon } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        contactNumber: "",
        address: "",
        age: "",
        gender: "",
        password: "",
        termsAccepted: false,
    });
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        try {
            const response = await fetch("http://localhost:5000/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                alert("User registered successfully!");
                navigate("/login"); // Redirect to login on successful signup
            } else {
                alert(data.error || "Registration failed");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred");
        }
    };

    return (
        <main className="min-h-screen w-full flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 min-h-[300px] md:min-h-screen relative">
                <img src="/signup.png" className="w-full h-full object-cover absolute inset-0" alt="Hospital" />
                <div className="absolute inset-0 bg-blue-900/70 flex items-center justify-center">
                    <div className="text-center text-white p-8">
                        <h1 className="text-4xl font-bold mb-4">MediHints</h1>
                        <p className="text-xl">Your Trusted Healthcare Partner</p>
                    </div>
                </div>
            </div>

            <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-50">
                <div className="max-w-md w-full">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
                        <p className="text-gray-600 mt-2">Join MediHints Plus today</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <UserCircleIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                name="fullName"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Full Name"
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <UserIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="email"
                                name="email"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <UserIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="tel"
                                name="contactNumber"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Contact Number"
                                value={formData.contactNumber}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="relative">
                            <input
                                type="text"
                                name="address"
                                className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="relative">
                            <input
                                type="number"
                                name="age"
                                className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Age"
                                min="1"
                                max="120"
                                value={formData.age}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="relative">
                            <select
                                name="gender"
                                className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={formData.gender}
                                onChange={handleChange}
                            >
                                <option value="" className="text-gray-400">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <LockIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOffIcon className="h-5 w-5 text-gray-400" />
                                ) : (
                                    <EyeIcon className="h-5 w-5 text-gray-400" />
                                )}
                            </button>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <LockIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? (
                                    <EyeOffIcon className="h-5 w-5 text-gray-400" />
                                ) : (
                                    <EyeIcon className="h-5 w-5 text-gray-400" />
                                )}
                            </button>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="termsAccepted"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                checked={formData.termsAccepted}
                                onChange={handleChange}
                            />
                            <label className="ml-2 block text-sm text-gray-900">
                                I agree to the Terms and Conditions
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Sign up
                        </button>

                        <div className="text-center">
                            <span className="text-sm text-gray-600">
                                Already have an account?{" "}
                                <li className="text-blue-600 hover:text-blue-500 cursor-pointer" onClick={() => navigate("/login")}>
                                    Sign in here
                                </li>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}