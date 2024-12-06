import { LockIcon, UserIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

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
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        notifySuccess("Verification code sent successfully!");
        setShowVerificationCode(true);
      } else {
        const data = await response.json();
        notifyError(data.message || "Failed to send verification code. Please check your email or password.");
      }
    } catch (error) {
      console.error("Error:", error);
      notifyError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (showVerificationCode) {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8000/api/verify-code`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, code: verificationCode }),
        });

        const data = await response.json();
                if (response.ok) {
                    notifySuccess("Login successful!");
                    localStorage.setItem("token", data.token);
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
    <main className="min-h-screen w-full flex flex-col md:flex-row">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="w-full md:w-1/2 min-h-[300px] md:min-h-screen relative">
        <img src="/login.png" className="w-full h-full object-cover absolute inset-0" alt="Hospital" />
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
            <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-600 mt-2">Please sign in to your account</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOffIcon className="h-5 w-5 text-gray-400" /> : <EyeIcon className="h-5 w-5 text-gray-400" />}
              </button>
            </div>

            {showVerificationCode && (
              <div className="relative">
                <input
                  type="text"
                  className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter verification code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  autoFocus
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              disabled={loading}
            >
              {loading ? "Loading..." : showVerificationCode ? "Verify Code" : "Sign in"}
            </button>
          </form>

          <div className="text-center mt-6 space-y-3">
            <p>
              <a
                href="/ForgotPassword"
                className="text-blue-600 hover:text-blue-700 transition"
              >
                Forgot Password?
              </a>
            </p>
            <p>
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-blue-600 hover:text-blue-700 font-bold transition"
              >
                Create Account
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}