import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle, ChevronDown, SettingsIcon, LogOutIcon, UserIcon } from 'lucide-react';
import { IoArrowBackCircleOutline } from "react-icons/io5";

const Navbar = ({ token }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const navigate = useNavigate();
  const profileRef = useRef(null);


  useEffect(() => {
    // Check if user token exists in localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const toggleProfileOptions = () => {
    setIsProfileOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = () => {
    setIsProfileOpen(false);
  };


  return (
    <header className="bg-[#1e2756] text-white">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          {/* Logo and Back Button */}
          <div className="flex items-center space-x-2 text-2xl font-bold">
            <button onClick={handleBack} className="text-white hover:text-gray-300">
              <IoArrowBackCircleOutline className="h-8 w-8" />
            </button>
            <span>MEDI</span>
            <span className="text-[#00a0ff]">HINTS</span>
          </div>


          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-8">
            <button className="hover:text-blue-500" onClick={() => navigate("/")}>Home</button>
            <button className="hover:text-blue-500" onClick={() => navigate("/aboutus")}>About us</button>
            <button className="hover:text-blue-500" onClick={() => navigate("/services")}>Services</button>
            <button className="hover:text-blue-500" onClick={() => navigate("/doctors")}>Doctors</button>
            <button className="hover:text-blue-500" onClick={() => navigate("/news")}>News</button>
            <button className="hover:text-blue-500" onClick={() => navigate("/contact")}>Contact</button>
            <button className="hover:text-blue-500" onClick={() => navigate("/laboratory")}>Laboratory</button>
          </div>

          {/* User Options (Search, Login, Appointment, Profile) */}
          <div className="hidden lg:flex items-center space-x-4">

            {!isLoggedIn && ( // Only show Login button if not logged in
              <button
                className="px-4 py-2 text-blue-800 bg-white hover:bg-blue-200 rounded-full"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            )}
            <button
              className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-full"
              onClick={() => navigate("/appointment")}
            >
              Appointment
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                className="flex items-center space-x-2 text-white hover:text-gray-300 focus:outline-none"
                onClick={toggleProfileOptions}
              >
                <UserCircle className="h-6 w-6" />
                <ChevronDown className="h-4 w-4" />
              </button>

              {/* Profile options dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50 text-gray-800 border border-gray-200">
                  {isLoggedIn && ( // Only show "My Profile" if logged in
                    <button
                      className="flex w-full items-center text-left px-4 py-2 text-sm hover:bg-gray-100 focus:outline-none"
                      onClick={() => {
                        navigate(`/ProfilePage/${token}`);
                        handleOptionClick();
                      }}
                    >
                      <UserIcon className="h-4 w-4 mr-2" />
                      My Profile
                    </button>
                  )}
                  <button
                    className="flex w-full items-center text-left px-4 py-2 text-sm hover:bg-gray-100 focus:outline-none"
                    onClick={() => {
                      navigate("/settings");
                      handleOptionClick();
                    }}
                  >
                    <SettingsIcon className="h-4 w-4 mr-2" />
                    Settings
                  </button>
                  {isLoggedIn && ( // Only show "Logout" if logged in
                    <button
                      className="flex w-full items-center text-left px-4 py-2 text-sm hover:bg-gray-100 focus:outline-none text-red-500"
                      onClick={async () => {
                        try {
                            const token = localStorage.getItem("token");
            
                            if (!token) {
                                console.error("No token found in local storage.");
                                return;
                            }
            
                            const response = await fetch("http://localhost:8000/api/logout", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: token, // Send the token in the Authorization header
                                },
                            });
            
                            if (response.ok) {
                                localStorage.removeItem("token");
                                setIsLoggedIn(false); // Update the login state
                                navigate("/login");
                                handleOptionClick();
                            } else {
                                console.error("Failed to log out:", await response.text());
                            }
                        } catch (error) {
                            console.error("Error during logout:", error);
                        }
                    }}
                    >
                      <LogOutIcon className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  )}
                </div>
              )}

            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
export default Navbar;