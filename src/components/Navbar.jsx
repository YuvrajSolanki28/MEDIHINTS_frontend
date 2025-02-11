import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle, ChevronDown, SettingsIcon, UserIcon } from 'lucide-react';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ token }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isToken, setIsToken] = useState(false);
  const [isPatient, setIsPatient] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const [isLaboratory, setIsLaboratory] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsToken(!!token);
  }, []);

  useEffect(() => {
    const patient = localStorage.getItem("patient");
    setIsPatient(!!patient);
  }, []);

  useEffect(() => {
    const doctor = localStorage.getItem("doctor");
    setIsDoctor(!!doctor);
  }, []);

  useEffect(() => {
    const laboratory = localStorage.getItem("laboratory");
    setIsLaboratory(!!laboratory);
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

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-[#1e2756] text-white"
    >
      <div className="container px-4 mx-auto">
        <nav className="flex items-center justify-between py-4">
          {/* Logo and Back Button */}
          <motion.div
            className="flex items-center space-x-2 text-2xl font-bold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.button
              onClick={handleBack}
              className="text-white hover:text-gray-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <IoArrowBackCircleOutline className="w-8 h-8" />
            </motion.button>
            <span>MEDI</span>
            <motion.span
              className="text-[#00a0ff]"
            >
              HINTS
            </motion.span>
          </motion.div>

          {/* Desktop Links */}
          <motion.div
            className="items-center hidden space-x-8 lg:flex"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {!isToken && <motion.button whileHover={{ scale: 1.1 }} className="hover:text-blue-500" onClick={() => navigate("/")}>Home</motion.button>}
            {isToken && <motion.button whileHover={{ scale: 1.1 }} className="hover:text-blue-500" onClick={() => navigate("/Homepage")}>Home</motion.button>}
            <motion.button whileHover={{ scale: 1.1 }} className="hover:text-blue-500" onClick={() => navigate("/aboutus")}>About us</motion.button>
            {isPatient &&<motion.button whileHover={{ scale: 1.1 }} className="hover:text-blue-500" onClick={() => navigate("/services")}>Services</motion.button>}
            {isPatient &&<motion.button whileHover={{ scale: 1.1 }} className="hover:text-blue-500" onClick={() => navigate("/doctors")}>Doctors</motion.button>}
            <motion.button whileHover={{ scale: 1.1 }} className="hover:text-blue-500" onClick={() => navigate("/news")}>News</motion.button>
            <motion.button whileHover={{ scale: 1.1 }} className="hover:text-blue-500" onClick={() => navigate("/contact")}>Contact</motion.button>
            {isDoctor && <motion.button whileHover={{ scale: 1.1 }} className="hover:text-blue-500" onClick={() => navigate("/appointments_list")}>Appointments</motion.button>}
            {isLaboratory && <motion.button whileHover={{ scale: 1.1 }} className="hover:text-blue-500" onClick={() => navigate("/laboratory")}>Laboratory</motion.button>}
          </motion.div>

          {/* User Options */}
          <div className="items-center hidden space-x-4 lg:flex">
            {!isToken && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 text-blue-800 bg-white rounded-full hover:bg-blue-200"
                onClick={() => navigate("/choose_account")}
              >
                Login
              </motion.button>
            )}
            {isPatient &&(
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 text-white rounded-full bg-sky-500 hover:bg-sky-600"
                onClick={() => navigate("/appointment")}
              >
                Appointment
              </motion.button>
            )}

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center space-x-2 text-white hover:text-gray-300 focus:outline-none"
                onClick={toggleProfileOptions}
              >
                <UserCircle className="w-6 h-6" />
                <ChevronDown className="w-4 h-4" />
              </motion.button>

              {/* Profile options dropdown */}
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 z-50 w-48 py-2 mt-2 text-gray-800 bg-white border border-gray-200 rounded-md shadow-lg"
                  >
                    {isPatient && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100 focus:outline-none"
                        onClick={() => {
                          navigate(`/ProfilePage/${token}`);
                          setIsProfileOpen(false);
                        }}
                      >
                        <UserIcon className="w-4 h-4 mr-2" />
                        My Profile
                      </motion.button>
                    )}

                    {isDoctor && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100 focus:outline-none"
                        onClick={() => {
                          navigate(`/DoctorProfilePage/${token}`);
                          setIsProfileOpen(false);
                        }}
                      >
                        <UserIcon className="w-4 h-4 mr-2" />
                        My Profile
                      </motion.button>
                    )}

                    {!isToken && <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100 focus:outline-none"
                      onClick={() => {
                        navigate("/settings");
                        setIsProfileOpen(false);
                      }}
                    >
                      <SettingsIcon className="w-4 h-4 mr-2" />
                      Settings
                    </motion.button>}

                    {isPatient && <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100 focus:outline-none"
                      onClick={() => {
                        navigate("/settings");
                        setIsProfileOpen(false);
                      }}
                    >
                      <SettingsIcon className="w-4 h-4 mr-2" />
                      Settings
                    </motion.button>}

                    {isDoctor &&<motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100 focus:outline-none"
                      onClick={() => {
                        navigate("/doctor_settings");
                        setIsProfileOpen(false);
                      }}
                    >
                      <SettingsIcon className="w-4 h-4 mr-2" />
                      Settings
                    </motion.button>}

                    {isLaboratory && <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100 focus:outline-none"
                      onClick={() => {
                        navigate("/settings");
                        setIsProfileOpen(false);
                      }}
                    >
                      <SettingsIcon className="w-4 h-4 mr-2" />
                      Settings
                    </motion.button>}

                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </nav>
      </div>
    </motion.header>
  );
};

export default Navbar;
