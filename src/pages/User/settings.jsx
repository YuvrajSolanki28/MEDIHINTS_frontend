import { Lock, User, Shield, ChevronRight, LogOut } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Settings({ isDoctor }) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('token'); // Or use your preferred method (e.g., context, Redux)
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("No token found in local storage.");
        return; // Important to stop execution
    }

    const endpoint = isDoctor ? 'http://localhost:8000/api/doctor/logout' : 'http://localhost:8000/api/logout';

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData?.message || `HTTP error! status: ${response.status}`); // Safe navigation
        }

        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/login");
        console.log("Logged out successfully.");
    } catch (error) {
        console.error("Logout error:", error);
        alert("Logout Failed: " + error.message);
    }
};


  return (
    <div className="w-full max-w-4xl px-4 py-24 mx-auto">
      <h1 className="mb-8 text-2xl font-bold">Settings</h1>

      <div className="space-y-6">
        <div className="border rounded-lg">
          <div className="p-4 border-b">
            <h2 className="font-semibold">Account Settings</h2>
          </div>

          <div className="divide-y">
            {isLoggedIn && (
              <>
                <button
                  className="flex items-center justify-between w-full p-4 hover:bg-gray-50"
                  onClick={() => navigate("/editprofile")}
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
                </button>

                <button
                  className="flex items-center justify-between w-full p-4 hover:bg-gray-50"
                  onClick={() => navigate("/passwordchange")}
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
                </button>

                <button
                  className="flex items-center justify-between w-full p-4 hover:bg-gray-50"
                  onClick={handleLogout}>
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
                </button>
              </>
            )}

            <button className="flex items-center justify-between w-full p-4 hover:bg-gray-50">
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
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
