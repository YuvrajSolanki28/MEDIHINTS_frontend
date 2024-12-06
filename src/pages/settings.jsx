import { LockIcon, UserIcon, ShieldIcon, ChevronRightIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Example: Check if the user is logged in (you can adjust this based on your auth method)
    const user = localStorage.getItem('token'); // Or use your preferred method (e.g., context, Redux)
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-24">
      <h1 className="text-2xl font-bold mb-8">Settings</h1>

      <div className="space-y-6">
        <div className="border rounded-lg">
          <div className="p-4 border-b">
            <h2 className="font-semibold">Account Settings</h2>
          </div>

          <div className="divide-y">
            {isLoggedIn && (
              <>
                <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50" onClick={() => navigate("/editprofile")}>
                  <div className="flex items-center space-x-3">
                    <UserIcon className="h-5 w-5 text-gray-500" />
                    <div className="text-left">
                      <div className="font-medium">Edit Profile</div>
                      <div className="text-sm text-gray-500">
                        Update your personal information
                      </div>
                    </div>
                  </div>
                  <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                </button>

                <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50" onClick={() => navigate("/passwordchange")}>
                  <div className="flex items-center space-x-3">
                    <LockIcon className="h-5 w-5 text-gray-500" />
                    <div className="text-left">
                      <div className="font-medium">Change Password</div>
                      <div className="text-sm text-gray-500">
                        Update your password
                      </div>
                    </div>
                  </div>
                  <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                </button>
              </>
            )}

            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <ShieldIcon className="h-5 w-5 text-gray-500" />
                <div className="text-left">
                  <div className="font-medium">Privacy Policy</div>
                  <div className="text-sm text-gray-500">
                    Read our privacy policy
                  </div>
                </div>
              </div>
              <ChevronRightIcon className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
