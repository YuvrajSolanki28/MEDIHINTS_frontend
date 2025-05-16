import { Lock, User, Shield, ChevronRight, LogOut } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion

export default function Settings() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("token");
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const endpoint = "https://medihints-backend.vercel.app/api/logout";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: token },
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      localStorage.removeItem("token");
      localStorage.removeItem("patient");
      setIsLoggedIn(false);
      navigate("/login");
      window.location.reload();
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout Failed: " + error.message);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div 
      className="w-full max-w-4xl px-4 py-24 mx-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1 className="mb-8 text-2xl font-bold" variants={itemVariants}>
        Settings
      </motion.h1>

      <motion.div className="space-y-6" variants={itemVariants}>
        <div className="border rounded-lg">
          <div className="p-4 border-b">
            <h2 className="font-semibold">Account Settings</h2>
          </div>

          <div className="divide-y">
            {isLoggedIn && (
              <>
                <motion.button
                  className="flex items-center justify-between w-full p-4 hover:bg-gray-50"
                  onClick={() => navigate("/editprofile")}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-gray-500" />
                    <div className="text-left">
                      <div className="font-medium">Edit Profile</div>
                      <div className="text-sm text-gray-500">
                        Update your personal information
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </motion.button>

                <motion.button
                  className="flex items-center justify-between w-full p-4 hover:bg-gray-50"
                  onClick={() => navigate("/passwordchange")}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center space-x-3">
                    <Lock className="w-5 h-5 text-gray-500" />
                    <div className="text-left">
                      <div className="font-medium">Change Password</div>
                      <div className="text-sm text-gray-500">
                        Update your password
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </motion.button>

                <motion.button
                  className="flex items-center justify-between w-full p-4 hover:bg-gray-50"
                  onClick={handleLogout}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center space-x-3">
                    <LogOut className="w-5 h-5 text-red-700" />
                    <div className="text-left">
                      <div className="font-medium text-red-700">Log Out</div>
                      <div className="text-sm text-gray-500">
                        Sign out of your account
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </motion.button>
              </>
            )}

            <motion.button
              className="flex items-center justify-between w-full p-4 hover:bg-gray-50"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-gray-500" />
                <div className="text-left">
                  <div className="font-medium">Privacy Policy</div>
                  <div className="text-sm text-gray-500">
                    Read our privacy policy
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
