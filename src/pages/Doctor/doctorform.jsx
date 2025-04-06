import {
    UserCircleIcon,
    CheckIcon,
    XIcon,
    UserIcon,
    Phone,
    LucideMapPin,
    LockIcon,
    EyeOffIcon,
    EyeIcon,
  } from "lucide-react";
  import React, { useState, useCallback, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import { Toaster, toast } from "react-hot-toast";
  
  export default function DoctorForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
  
    const [formData, setFormData] = useState({
      fullName: "",
      email: "",
      contactNumber: "",
      specialization: "",
      licenseNumber: "",
      yearsOfExperience: "",
      clinicAddress: "",
      password: "",
      confirmPassword: "",
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
      setValidations({
        minLength: password.length >= 8,
        hasUpper: /[A-Z]/.test(password),
        hasLower: /[a-z]/.test(password),
        hasNumber: /[0-9]/.test(password),
        hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      });
    }, [formData.password]);
  
    const ValidationItem = ({ satisfied, text }) => (
      <div className="flex items-center space-x-2">
        {satisfied ? (
          <CheckIcon className="w-4 h-4 text-green-500" />
        ) : (
          <XIcon className="w-4 h-4 text-red-500" />
        )}
        <span className={`text-sm ${satisfied ? "text-green-500" : "text-red-500"}`}>
          {text}
        </span>
      </div>
    );
  
    const handleChange = useCallback((e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }, []);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (
        formData.fullName.length < 3 ||
        formData.fullName.length > 50 ||
        !/^[a-zA-Z\s]+$/.test(formData.fullName)
      ) {
        toast.error("Full name must be 3–50 alphabetic characters");
        return;
      }
  
      if (!formData.email) {
        toast.error("Email is required");
        return;
      }
  
      if (!/^\d{10}$/.test(formData.contactNumber)) {
        toast.error("Contact number must be exactly 10 digits");
        return;
      }
  
      if (!formData.specialization) {
        toast.error("Specialization is required");
        return;
      }
  
      if (
        formData.licenseNumber.length < 1 ||
        formData.licenseNumber.length > 11
      ) {
        toast.error("License number must be 1–11 characters");
        return;
      }
  
      if (!formData.yearsOfExperience) {
        toast.error("Years of experience is required");
        return;
      }
  
      if (
        formData.clinicAddress.length < 10 ||
        formData.clinicAddress.length > 100
      ) {
        toast.error("Clinic address must be 10–100 characters");
        return;
      }
  
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
  
      try {
        const response = await fetch("http://localhost:8000/api/doctor/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
  
        const data = await response.json();
        if (response.ok) {
          toast.success("Doctor registered successfully!");
          navigate("/doctor-login");
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
        <Toaster position="top-right" />
        <div className="w-full md:w-1/2 min-h-[300px] md:min-h-screen relative">
          <img
            src="/signup.png"
            className="absolute inset-0 object-cover w-full h-full"
            alt="Hospital"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-blue-900/70">
            <div className="p-8 text-center text-white">
              <h1 className="mb-4 text-4xl font-bold">MediHints</h1>
              <p className="text-xl">Your Trusted Healthcare Partner</p>
            </div>
          </div>
        </div>
  
        <div className="flex items-center justify-center w-full p-8 md:w-1/2 bg-gray-50">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Doctor Registration
              </h2>
              <p className="mt-2 text-gray-600">Join MediHints Plus today</p>
            </div>
  
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="relative">
                <UserCircleIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="pl-10 w-full py-2 border rounded-md"
                />
              </div>
  
              {/* Email */}
              <div className="relative">
                <UserIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 w-full py-2 border rounded-md"
                />
              </div>
  
              {/* Contact */}
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  name="contactNumber"
                  placeholder="Contact Number"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="pl-10 w-full py-2 border rounded-md"
                />
              </div>
  
              {/* Specialization */}
              <input
                type="text"
                name="specialization"
                placeholder="Specialization"
                value={formData.specialization}
                onChange={handleChange}
                className="w-full py-2 border rounded-md"
              />
  
              {/* License Number */}
              <input
                type="text"
                name="licenseNumber"
                placeholder="License Number"
                value={formData.licenseNumber}
                onChange={handleChange}
                className="w-full py-2 border rounded-md"
              />
  
              {/* Experience */}
              <input
                type="number"
                name="yearsOfExperience"
                placeholder="Years of Experience"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                className="w-full py-2 border rounded-md"
              />
  
              {/* Address */}
              <div className="relative">
                <LucideMapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="clinicAddress"
                  placeholder="Clinic Address"
                  value={formData.clinicAddress}
                  onChange={handleChange}
                  className="pl-10 w-full py-2 border rounded-md"
                />
              </div>
  
              {/* Password */}
              <div className="relative">
                <LockIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 pr-10 w-full py-2 border rounded-md"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3"
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
  
              {/* Password validation */}
              <div className="space-y-1">
                <ValidationItem
                  satisfied={validations.minLength}
                  text="At least 8 characters"
                />
                <ValidationItem
                  satisfied={validations.hasUpper}
                  text="At least 1 uppercase letter"
                />
                <ValidationItem
                  satisfied={validations.hasLower}
                  text="At least 1 lowercase letter"
                />
                <ValidationItem
                  satisfied={validations.hasNumber}
                  text="At least 1 number"
                />
                <ValidationItem
                  satisfied={validations.hasSpecial}
                  text="At least 1 special character"
                />
              </div>
  
              {/* Confirm Password */}
              <div className="relative">
                <LockIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="pl-10 pr-10 w-full py-2 border rounded-md"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3"
                >
                  {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
  
              <button
                type="submit"
                className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Register
              </button>
  
              <div className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <span
                  className="text-blue-600 cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Sign in here
                </span>
              </div>
            </form>
          </div>
        </div>
      </main>
    );
  }
  