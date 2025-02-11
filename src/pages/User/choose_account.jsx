import React from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

export default function ChooseAccount() {
  const navigate = useNavigate();

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col w-full min-h-screen md:flex-row bg-gray-50"
    >
      <Toaster position="top-right" reverseOrder={false} />

      {/* Left Section - Image */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full md:w-1/2 min-h-[300px] md:min-h-screen overflow-hidden"
      >
        <motion.img
          src="/login.png"
          className="absolute inset-0 object-cover w-full h-full transition-transform duration-500 hover:scale-105"
          alt="Medical Professional"
          whileHover={{ scale: 1.05 }}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900/90 to-blue-800/75 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-md p-8 text-center text-white"
          >
            <h1 className="mb-6 text-5xl font-bold tracking-tight">MediHints</h1>
            <p className="text-xl font-light opacity-90">Your Trusted Healthcare Partner</p>
            <motion.div
              className="w-20 h-1 mx-auto mt-8 rounded-full bg-white/30"
              animate={{ scaleX: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            ></motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Section - Login */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex items-center justify-center w-full p-8 md:w-1/2"
      >
        <motion.div
          className="w-full max-w-md space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Welcome</h2>
            <p className="mt-2 text-gray-600">Please choose your account</p>
          </div>

          {/* Buttons for Role Selection */}
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <motion.button
                onClick={() => navigate("/login")}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-300 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-blue-500 hover:text-white"
              >
                Patient
              </motion.button>
              <motion.button
                onClick={() => navigate("/doctor-login")}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-300 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-green-500 hover:text-white"
              >
                Doctor
              </motion.button>
              <motion.button
                onClick={() => navigate("/laboratory_login")}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-300 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-purple-500 hover:text-white"
              >
                Laboratory
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.main>
  );
}
