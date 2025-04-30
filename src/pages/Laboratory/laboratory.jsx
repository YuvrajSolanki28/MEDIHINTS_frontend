import {
  MapPin,
  Phone,
  Mail,
  Microscope,
  Users,
  Camera,
  Map,
} from "lucide-react";
import React, { useState } from "react";

export default function LaboratoryShowPage() {
  const [activeTab, setActiveTab] = useState("equipment");

  const getTabIcon = (tab) => {
    switch (tab) {
      case "equipment":
        return <Microscope className="w-4 h-4" />;
      case "staff":
        return <Users className="w-4 h-4" />;
      case "gallery":
        return <Camera className="w-4 h-4" />;
      case "location":
        return <Map className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <main className="px-4 py-8 mx-auto max-w-7xl">
      {/* Header */}
      <header className="mb-8">
        <h1 className="mb-4 text-3xl font-bold">Advanced Research Laboratory</h1>
        <div className="flex flex-col gap-4 text-gray-600 md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            <span>123 Science Park, Innovation District, CA 94103</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            <span>(555) 123-4567</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            <span>contact@advancedlab.com</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-8 mb-12 md:grid-cols-3">
        {/* Left Column */}
        <div className="space-y-6 md:col-span-2">
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="mb-4 text-2xl font-semibold">About Our Laboratory</h2>
            <p className="text-gray-600">
              Our state-of-the-art research facility specializes in molecular biology, biochemistry, and advanced imaging techniques. With over 20 years of experience, we provide cutting-edge research capabilities and collaborative opportunities for scientists worldwide.
            </p>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow">
            <nav className="flex border-b">
              {["equipment", "staff", "gallery", "location"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-sm font-medium flex items-center gap-2 ${
                    activeTab === tab
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {getTabIcon(tab)}
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>

            <div className="p-6">
              {/* Equipment Tab */}
              {activeTab === "equipment" && (
                <div className="space-y-6">
                  {[
                    {
                      name: "Electron Microscope XR-5000",
                      description:
                        "High-resolution imaging system for nanoscale analysis",
                      image:
                        "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=400",
                    },
                    {
                      name: "Mass Spectrometer MS-Elite",
                      description:
                        "Advanced molecular analysis and characterization",
                      image:
                        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400",
                    },
                    {
                      name: "Flow Cytometer FC-3000",
                      description: "Cell sorting and analysis system",
                      image:
                        "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=400",
                    },
                  ].map((equipment, index) => (
                    <div key={index} className="flex items-start gap-6">
                      <img
                        src={equipment.image}
                        alt={equipment.name}
                        className="object-cover w-32 h-32 rounded-lg"
                      />
                      <div>
                        <h3 className="text-lg font-semibold">{equipment.name}</h3>
                        <p className="text-gray-600">{equipment.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Staff Tab */}
              {activeTab === "staff" && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {[
                    {
                      name: "Dr. Sarah Chen",
                      role: "Laboratory Director",
                      image:
                        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200",
                      expertise: "Molecular Biology",
                    },
                    {
                      name: "Dr. Michael Rodriguez",
                      role: "Senior Researcher",
                      image:
                        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200",
                      expertise: "Biochemistry",
                    },
                    {
                      name: "Dr. Emily Watson",
                      role: "Research Scientist",
                      image:
                        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=200",
                      expertise: "Cell Biology",
                    },
                    {
                      name: "Dr. James Kim",
                      role: "Technical Specialist",
                      image:
                        "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=200",
                      expertise: "Imaging Technologies",
                    },
                  ].map((staff, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <img
                        src={staff.image}
                        alt={staff.name}
                        className="object-cover w-16 h-16 rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold">{staff.name}</h3>
                        <p className="text-sm text-gray-600">{staff.role}</p>
                        <p className="text-sm text-gray-500">{staff.expertise}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Gallery Tab */}
              {activeTab === "gallery" && (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {[
                    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400",
                    "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=400",
                    "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=400",
                    "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=400",
                    "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=400",
                    "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=400",
                  ].map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Lab ${index + 1}`}
                      className="object-cover w-full h-48 rounded-lg"
                    />
                  ))}
                </div>
              )}

              {/* Location Tab */}
              {activeTab === "location" && (
                <div className="bg-gray-100 rounded-lg h-96">
                  <iframe
                    title="Lab Location"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0673030496673!2d-122.41941658468204!3d37.774929979755445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sSan+Francisco%2C+CA!5e0!3m2!1sen!2sus!4v1565277057272!5m2!1sen!2sus"
                    className="rounded-lg"
                  ></iframe>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="mb-4 text-xl font-semibold">Quick Facts</h2>
            <ul className="space-y-3 text-gray-600">
              <li>Founded: 2003</li>
              <li>Total Staff: 45+</li>
              <li>Research Areas: 12</li>
              <li>Published Papers: 500+</li>
              <li>Active Projects: 25</li>
            </ul>
          </div>

          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="mb-4 text-xl font-semibold">Certifications</h2>
            <ul className="space-y-3 text-gray-600">
              <li>ISO 9001:2015</li>
              <li>GLP Compliance</li>
              <li>BSL-2 Certified</li>
              <li>AAALAC Accredited</li>
            </ul>
          </div>

          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="mb-4 text-xl font-semibold">Working Hours</h2>
            <ul className="space-y-3 text-gray-600">
              <li>Mon - Fri: 8:00 AM - 6:00 PM</li>
              <li>Saturday: 9:00 AM - 1:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}
