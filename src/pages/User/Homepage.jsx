import React, { useState, useEffect } from 'react';
import { Users, HeartIcon, ActivityIcon, PlusSquareIcon, DropletIcon} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Homepage() {
  const navigate = useNavigate();
  const [isPatient, setIsPatient] = useState(false);

   useEffect(() => {
      const patient = localStorage.getItem("patient");
      setIsPatient(!!patient);
    }, []);

  return (
    <div className="w-full mx-auto">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }} 
        className="flex flex-col items-center pb-12 lg:flex-row"
      >
        <div 
          className="relative w-full h-screen bg-center bg-cover" 
          style={{ backgroundImage: "url('/background-image.png')" }}
        >
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-black">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8 }}
              className="mb-2 font-serif font-bold text-sky-500"
            >
              CARING FOR LIFE
            </motion.h2>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1 }}
              className="mb-6 font-serif text-4xl font-extrabold leading-snug lg:text-5xl text-navy-900"
            >
              Leading the Way<br />in Medical Excellence
            </motion.h1>

            {isPatient &&<motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }} 
              className="px-6 py-3 transition rounded-full shadow-md bg-sky-100 text-sky-700 hover:bg-sky-200"
              onClick={() => navigate("/services")}
            >
              Our Services
            </motion.button>}
          </div>
        </div>
      </motion.section>

      {/* Appointment Button */}
      {isPatient && <section className="flex justify-center w-full px-6 py-4">
        <motion.button 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }} 
          className="flex items-center justify-center gap-2 px-48 py-4 font-medium transition rounded bg-sky-500 text-sky-100 hover:bg-opacity-90"
        >
          <Users className="w-4 h-4" />
          Book an Appointment
        </motion.button>
      </section>}

      {/* Welcome Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }} 
        className="mb-12 text-center"
      >
        <h2 className="mb-2 font-bold text-sky-400">WELCOME TO MEDDICAL</h2>
        <h3 className="mb-4 text-3xl font-bold text-navy-900">A Great Place to Receive Care</h3>
        <p className="max-w-2xl mx-auto mb-4 text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare.
        </p>
        <motion.button 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }} 
          className="transition text-sky-500 hover:text-sky-600"
        >
          Learn More 
        </motion.button>
      </motion.section>

      {/* Our Services Section */}
      <div className="w-full px-4 py-16 mx-auto max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
          className="mb-16 text-center"
        >
          <h3 className="mb-2 font-medium text-blue-500">CARE YOU CAN BELIEVE IN</h3>
          <h2 className="text-4xl font-bold text-gray-900">Our Services</h2>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 gap-8 md:grid-cols-12"
          initial="hidden"
          animate="visible"
          variants={{ 
            hidden: { opacity: 0 }, 
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
        >
          {/* Service List */}
          <motion.div className="md:col-span-3">
            <div className="space-y-2">
              {[
                { icon: <ActivityIcon className="w-6 h-6 text-blue-500" />, label: "Free Checkup" },
                { icon: <HeartIcon className="w-6 h-6 text-blue-500" />, label: "Cardiogram" },
                { icon: <PlusSquareIcon className="w-6 h-6 text-blue-500" />, label: "DNA Testing" },
                { icon: <DropletIcon className="w-6 h-6 text-blue-500" />, label: "Blood Bank" },
              ].map((service, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 p-4 transition border rounded-lg cursor-pointer hover:border-blue-500"
                >
                  {service.icon}
                  <span>{service.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div className="space-y-4 md:col-span-4">
            {["home1.png", "home2.png"].map((image, index) => (
              <motion.img
                key={index}
                src={image}
                alt="Healthcare"
                whileHover={{ scale: 1.05 }}
                className="object-cover w-full h-48 transition rounded-lg"
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
