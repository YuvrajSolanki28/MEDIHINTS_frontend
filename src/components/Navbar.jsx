import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon, UserCircle, ChevronDown, Menu, X } from 'lucide-react';
import { IoArrowBackCircleOutline } from "react-icons/io5";

export default function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef(null);


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

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-8">
            <button className="hover:text-blue-500" onClick={() => navigate("/")}>Home</button>
            <button className="hover:text-blue-500" onClick={() => navigate("/aboutus")}>About us</button>
            <button className="hover:text-blue-500" onClick={() => navigate("/services")}>Services</button>
            <button className="hover:text-blue-500" onClick={() => navigate("/doctors")}>Doctors</button>
            <button className="hover:text-blue-500" onClick={() => navigate("/news")}>News</button>
            <button className="hover:text-blue-500" onClick={() => navigate("/contact")}>Contact</button>
          </div>

          {/* User Options (Search, Login, Appointment, Profile) */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="p-2">
              <SearchIcon className="w-5 h-5" />
            </button>
            <button className="px-4 py-2 text-blue-800 bg-white hover:bg-blue-200 rounded-full" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-full" onClick={() => navigate("/appointment")}>
              Appointment
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                className="flex items-center space-x-2 text-white hover:text-gray-300"
                onClick={toggleProfileOptions}
              >
                <UserCircle className="h-6 w-6" />
                <ChevronDown className="h-4 w-4" />
              </button>

              {/* Profile options dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg z-50">
                  <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      navigate("/userprofile");
                      handleOptionClick();
                    }}
                  >
                    My Profile
                  </button>
                  <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      navigate("/settings");
                      handleOptionClick();
                    }}
                  >
                    Settings
                  </button>
                  <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      localStorage.removeItem("token");
                      navigate("/login");
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden flex flex-col space-y-4 mt-4 bg-[#1e2756] px-4 py-4">
            <button className="hover:text-blue-500" onClick={() => navigate("/")}>Home</button>
            <button className="hover:text-blue-500" onClick={() => navigate("/aboutus")}>About us</button>
            <button className="hover:text-blue-500" onClick={() => navigate("/services")}>Services</button>
            <button className="hover:text-blue-500" onClick={() => navigate("/doctors")}>Doctors</button>
            <button className="hover:text-blue-500" onClick={() => navigate("/news")}>News</button>
            <button className="hover:text-blue-500" onClick={() => navigate("/contact")}>Contact</button>
            <button className="p-2 flex justify-start items-center">
              <SearchIcon className="w-5 h-5 text-white" />
            </button>
            <button className="px-4 py-2 text-blue-800 bg-white hover:bg-blue-200 rounded-full" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-full" onClick={() => navigate("/appointment")}>
              Appointment
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
