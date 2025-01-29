import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle, ChevronDown, SettingsIcon, UserIcon } from 'lucide-react';
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
      <div className="container px-4 mx-auto">
        <nav className="flex items-center justify-between py-4">
          {/* Logo and Back Button */}
          <div className="flex items-center space-x-2 text-2xl font-bold">
            <button onClick={handleBack} className="text-white hover:text-gray-300">
              <IoArrowBackCircleOutline className="w-8 h-8" />
            </button>
            <span>MEDI</span>
            <span className="text-[#00a0ff]">HINTS</span>
          </div>


          {/* Desktop Links */}
          <div className="items-center hidden space-x-8 lg:flex">
            <button className="hover:text-blue-500" onClick={() => navigate("/")}>Home</button>
            <button className="hover:text-blue-500" onClick={() => navigate("/aboutus")}>About us</button>
            <button className="hover:text-blue-500" onClick={() => navigate("/services")}>Services</button>
            <button className="hover:text-blue-500" onClick={() => navigate("/doctors")}>Doctors</button>
            <button className="hover:text-blue-500" onClick={() => navigate("/news")}>News</button>
            <button className="hover:text-blue-500" onClick={() => navigate("/contact")}>Contact</button>
            {/* <button className="hover:text-blue-500" onClick={() => navigate("/laboratory")}>Laboratory</button> */}
          </div>

          {/* User Options (Search, Login, Appointment, Profile) */}
          <div className="items-center hidden space-x-4 lg:flex">

            {!isLoggedIn && ( // Only show Login button if not logged in
              <button
                className="px-4 py-2 text-blue-800 bg-white rounded-full hover:bg-blue-200"
                onClick={() => navigate("/choose_account")}
              >
                Login
              </button>
            )}
            <button
              className="px-4 py-2 text-white rounded-full bg-sky-500 hover:bg-sky-600"
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
                <UserCircle className="w-6 h-6" />
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Profile options dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 z-50 w-48 py-2 mt-2 text-gray-800 bg-white border border-gray-200 rounded-md shadow-lg">
                  {isLoggedIn && ( // Only show "My Profile" if logged in
                    <button
                      className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100 focus:outline-none"
                      onClick={() => {
                        navigate(`/ProfilePage/${token}`);
                        handleOptionClick();
                      }}
                    >
                      <UserIcon className="w-4 h-4 mr-2" />
                      My Profile
                    </button>
                  )}
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100 focus:outline-none"
                    onClick={() => {
                      navigate("/settings");
                      handleOptionClick();
                    }}
                  >
                    <SettingsIcon className="w-4 h-4 mr-2" />
                    Settings
                  </button>
                  
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