import React, { useState } from "react";
import { LockIcon, UserIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { motion } from "framer-motion";

export default function LoginPage() {
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
      const response = await axios.post(`https://medihints-backend.vercel.app/api/login/doctor`, {
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
        const response = await fetch(`https://medihints-backend.vercel.app/api/verify-code/doctor`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, code: verificationCode }),
        });

        const data = await response.json();
        if (response.ok) {
          notifySuccess("Login successful!");
          localStorage.setItem("token", data.token);
          localStorage.setItem("laboratory", "role");
          navigate("/");
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
            <div className="w-20 h-1 mx-auto mt-8 rounded-full bg-white/30"></div>
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
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Welcome Back</h2>
            <p className="mt-2 text-gray-600">Please sign in to your account</p>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              {!showVerificationCode && (
                <>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <UserIcon className="w-5 h-5 text-gray-400 transition-colors group-focus-within:text-blue-500" />
                    </div>
                    <input
                      type="email"
                      className="block w-full py-3 pl-10 pr-3 text-sm placeholder-gray-400 transition-all border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <LockIcon className="w-5 h-5 text-gray-400 transition-colors group-focus-within:text-blue-500" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="block w-full py-3 pl-10 pr-10 text-sm placeholder-gray-400 transition-all border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOffIcon className="w-5 h-5 text-gray-400 transition-colors hover:text-gray-600" />
                      ) : (
                        <EyeIcon className="w-5 h-5 text-gray-400 transition-colors hover:text-gray-600" />
                      )}
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
            <div>
              <motion.button
                type="submit"
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-all duration-200 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 active:transform active:scale-[0.98]"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                disabled={loading}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : showVerificationCode ? (
                  "Verify Code"
                ) : (
                  "Sign in"
                )}
              </motion.button>
            </div>
          </form>
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-full h-px bg-gray-200"></div>
              <span className="px-4 text-sm text-gray-400">or</span>
              <div className="w-full h-px bg-gray-200"></div>
            </div>
            <div className="flex justify-between text-sm">
              <a
                href="/ForgotPassword"
                className="text-blue-600 transition-colors hover:text-blue-700"
              >
                Forgot your password?
              </a>
              <a href="/laboratoryform" className="text-blue-600 transition-colors hover:text-blue-700">
                Create Account
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}