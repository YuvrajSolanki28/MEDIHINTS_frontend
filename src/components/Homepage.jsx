import React from 'react';
import { Users, HeartIcon, ActivityIcon, PlusSquareIcon, DropletIcon, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Homepage() {
  const navigate = useNavigate();
  return (
    <div className=" w-full mx-auto ">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center pb-12">
        <div
          className="h-screen bg-cover bg-center relative w-full"
          style={{ backgroundImage: "url('/background-image.png')" }}
        >
          <div className="relative z-10  flex flex-col items-center justify-center h-full text-black text-center px-4">
            <h2 className="text-sky-500 font-bold font-serif mb-2">CARING FOR LIFE</h2>
            <h1 className="text-4xl lg:text-5xl font-extrabold font-serif text-navy-900 mb-6 leading-snug">
              Leading the Way<br />in Medical Excellence
            </h1>
            <button className="bg-sky-100 text-sky-700 hover:bg-sky-200 px-6 py-3 rounded-full shadow-md" onClick={() => navigate("/services")}>
              Our Services
            </button>
          </div>
        </div>
      </section>

      {/* Appointment Buttons */}
      <section className="w-full py-4 px-6 flex justify-center md-12">
        <button className="flex items-center justify-center gap-2 bg-sky-500 text-sky-100 rounded px-48 py-4 font-medium hover:bg-opacity-90 transition-colors">
          <Users className="w-4 h-4" />
          Book an Appointment
        </button>
      </section>

      {/* Welcome Section */}
      <section className="text-center mb-12">
        <h2 className="text-sky-400 font-bold mb-2">WELCOME TO MEDDICAL</h2>
        <h3 className="text-3xl font-bold text-navy-900 mb-4">
          A Great Place to Receive Care
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat
          scelerisque tortor ornare ornare. Convallis felis vitae tortor augue. Velit nascetur
          proin massa in. Consequat faucibus porttitor enim et.
        </p>
        <button className="text-sky-500 hover:text-sky-600">
          Learn More <ChevronRight className="ml-1 h-4 w-4" />
        </button>
      </section>

      {/* Our Services Section */}
      <div className="w-full max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h3 className="text-blue-500 font-medium mb-2">
            CARE YOU CAN BELIEVE IN
          </h3>
          <h2 className="text-4xl font-bold text-gray-900">Our Services</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-3">
            <div className="space-y-2">
              <div className="p-4 rounded-lg border hover:border-blue-500 cursor-pointer flex items-center gap-3">
                <ActivityIcon className="w-6 h-6 text-blue-500" />
                <span>Free Checkup</span>
              </div>

              <div className="p-4 rounded-lg border hover:border-blue-500 cursor-pointer flex items-center gap-3">
                <HeartIcon className="w-6 h-6 text-blue-500" />
                <span>Cardiogram</span>
              </div>

              <div className="p-4 rounded-lg border hover:border-blue-500 cursor-pointer flex items-center gap-3">
                <PlusSquareIcon className="w-6 h-6 text-blue-500" />
                <span>DNA Testing</span>
              </div>

              <div className="p-4 rounded-lg border hover:border-blue-500 cursor-pointer flex items-center gap-3">
                <DropletIcon className="w-6 h-6 text-blue-500" />
                <span>Blood Bank</span>
              </div>

              <button className="w-full p-4 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition">
                View All
              </button>
            </div>
          </div>

          <div className="md:col-span-5">
            <h2 className="text-3xl font-bold mb-8">
              A passion for putting patients first.
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span>A Passion for Healing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span>5-Star Care</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span>All our best</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span>Believe in Us</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span>A Legacy of Excellence</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span>Always Caring</span>
              </div>
            </div>

            <p className="text-gray-600 mb-4">
              At our healthcare facility, we prioritize patient care above all
              else. Our comprehensive services are designed to provide exceptional
              medical attention while ensuring comfort and peace of mind for all
              our patients.
            </p>

            <p className="text-gray-600">
              With state-of-the-art equipment and highly trained medical
              professionals, we deliver the highest standard of healthcare
              services. Our commitment to excellence shows in everything we do,
              from routine checkups to specialized treatments.
            </p>
          </div>

          <div className="md:col-span-4 space-y-4">
            <img src="home1.png" alt="Doctor consultation" className="w-full h-48 object-cover rounded-lg" />
            <img src="home2.png" alt="Medical staff" className="w-full h-48 object-cover rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
