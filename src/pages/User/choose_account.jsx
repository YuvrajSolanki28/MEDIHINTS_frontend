import React from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export default function LoginPage() {

  const navigate = useNavigate();


  return (
    <main className="flex flex-col w-full min-h-screen md:flex-row bg-gray-50">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Left Section - Image */}
      <div className="relative w-full md:w-1/2 min-h-[300px] md:min-h-screen overflow-hidden">
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
      </div>

      {/* Right Section - Login */}
      <div className="flex items-center justify-center w-full p-8 md:w-1/2">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Welcome</h2>
            <p className="mt-2 text-gray-600">Please choose your account</p>
          </div>

          {/* Buttons for Role Selection */}
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => navigate("/login")}
                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50"
              >
                Patient
              </button>
              <button
                onClick={() => navigate("/doctor-login")}
                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50"
              >
                Doctor
              </button>
              <button
                onClick={() => navigate("/laboratory_login")}
                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50"
              >
                Laboratory
              </button>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
