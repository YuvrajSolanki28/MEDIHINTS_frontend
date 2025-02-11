import React, { useState } from "react";
import { LockIcon, UserIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { motion } from "framer-motion";

export default function DoctorLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [showVerificationCode, setShowVerificationCode] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const verifyCredentials = async () => {
    if (!email || !password) {
      notifyError("Email and password are required!");
      return;
    }

    setLoading(true);
    try {
      // Admin login logic
      if (email === "medihints@gmail.com") {
        const adminResponse = await axios.post(`http://localhost:8000/api/adminlogin`, {
          email,
          password,
        });

        if (adminResponse.status === 200) {
          notifySuccess("Admin login successful!");
          localStorage.setItem("role", "admin");
          navigate("/admin");
          return;
        } else {
          notifyError(adminResponse.data.message || "Invalid admin credentials.");
          return;
        }
      }

      // Doctor login logic
      const response = await axios.post(`http://localhost:8000/api/login/doctor`, {
        email,
        password,
      });

      if (response.status === 200) {
        notifySuccess("Verification code sent successfully!");
        setShowVerificationCode(true);
      } else {
        notifyError(response.data.message || "Failed to send verification code.");
      }
    } catch (error) {
      notifyError(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (showVerificationCode) {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8000/api/verify-code/doctor`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, code: verificationCode }),
        });

        const data = await response.json();
        if (response.ok) {
          notifySuccess("Login successful!");
          
          // Store token & role in localStorage
          localStorage.setItem("token", data.token);
          localStorage.setItem("doctor", "role");

          navigate("/Homepage");
          window.location.reload();
        } else {
          notifyError(data.message || "Invalid verification code");
        }
      } catch (error) {
        console.error("Error:", error);
        notifyError("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      verifyCredentials();
    }
  };

  return (
    <main className="flex flex-col w-full min-h-screen md:flex-row bg-gray-50">
      <Toaster position="top-right" reverseOrder={false} />
      <motion.div
        className="w-full md:w-1/2 min-h-[300px] md:min-h-screen relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <img
          src="/login.png"
          className="absolute inset-0 object-cover w-full h-full transition-transform duration-500 hover:scale-105"
          alt="Medical Professional"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900/90 to-blue-800/75 backdrop-blur-sm">
          <div className="max-w-md p-8 text-center text-white">
            <h1 className="mb-6 text-5xl font-bold tracking-tight">MediHints</h1>
            <p className="text-xl font-light opacity-90">Your Trusted Healthcare Partner</p>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="flex items-center justify-center w-full p-8 md:w-1/2"
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Welcome Doctor</h2>
            <p className="mt-2 text-gray-600">Please sign in to your account</p>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              {!showVerificationCode && (
                <>
                  <div className="relative">
                    <UserIcon className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
                    <input
                      type="email"
                      className="block w-full py-3 pl-10 pr-3 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="relative">
                    <LockIcon className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
                    <input
                      type={showPassword ? "text" : "password"}
                      className="block w-full py-3 pl-10 pr-10 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOffIcon className="w-5 h-5 text-gray-400" /> : <EyeIcon className="w-5 h-5 text-gray-400" />}
                    </button>
                  </div>
                </>
              )}
              {showVerificationCode && (
                <div className="relative animate-fadeIn">
                  <div className="flex space-x-2">
                    {Array(6)
                      .fill("")
                      .map((_, index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength="1"
                          className="w-12 h-12 text-lg text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                          value={verificationCode[index] || ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            const newCode = [...verificationCode];
                            newCode[index] = value;
                            setVerificationCode(newCode.join(""));
                            if (value && index < 5) {
                              document.getElementById(`verification-input-${index + 1}`).focus();
                            }
                          }}
                          onKeyUp={(e) => {
                            if (e.key === "Backspace" && index > 0 && !verificationCode[index]) {
                              document.getElementById(`verification-input-${index - 1}`).focus();
                            }
                          }}
                          id={`verification-input-${index}`}
                          autoFocus={index === 0}
                        />
                      ))}
                  </div>
                </div>
              )}
            </div>
            <motion.button
              type="submit"
              className={`w-full py-3 text-white rounded-lg ${
                loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={loading}
            >
              {loading ? "Processing..." : showVerificationCode ? "Verify Code" : "Sign in"}
            </motion.button>
          </form>
          <div className="flex justify-between text-sm">
            <a href="/doctor_ForgotPassword" className="text-blue-600">Forgot password?</a>
            <a href="/doctorform" className="text-blue-600">Create Account</a>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
