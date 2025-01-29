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
    const [expandedSection, setExpandedSection] = useState(null);
    const toggleSection = (section) => {
      setExpandedSection(expandedSection === section ? null : section);
    };
    return (
      <main className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Advanced Research Laboratory
          </h1>
  
          <div className="flex flex-col md:flex-row md:items-center gap-4 text-gray-600">
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
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4">
                About Our Laboratory
              </h2>
              <p className="text-gray-600">
                Our state-of-the-art research facility specializes in molecular
                biology, biochemistry, and advanced imaging techniques. With over
                20 years of experience, we provide cutting-edge research
                capabilities and collaborative opportunities for scientists
                worldwide.
              </p>
            </div>
  
            <div className="bg-white rounded-lg shadow">
              <div className="border-b">
                <nav className="flex">
                  {["equipment", "staff", "gallery", "location"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-4 text-sm font-medium ${activeTab === tab ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
                    >
                      <div className="flex items-center gap-2">
                        {tab === "equipment" && (
                          <Microscope className="w-4 h-4" />
                        )}
                        {tab === "staff" && <Users className="w-4 h-4" />}
                        {tab === "gallery" && <Camera className="w-4 h-4" />}
                        {tab === "location" && <Map className="w-4 h-4" />}
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </div>
                    </button>
                  ))}
                </nav>
              </div>
  
              <div className="p-6">
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
                    ].map((equipment) => (
                      <div
                        key={equipment.name}
                        className="flex gap-6 items-start"
                      >
                        <img
                          src={equipment.image}
                          alt={equipment.name}
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="font-semibold text-lg">
                            {equipment.name}
                          </h3>
                          <p className="text-gray-600">{equipment.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
  
                {activeTab === "staff" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    ].map((staff) => (
                      <div key={staff.name} className="flex gap-4 items-start">
                        <img
                          src={staff.image}
                          alt={staff.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold">{staff.name}</h3>
                          <p className="text-sm text-gray-600">{staff.role}</p>
                          <p className="text-sm text-gray-500">
                            {staff.expertise}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
  
                {activeTab === "gallery" && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
                        alt={`Laboratory image ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}
  
                {activeTab === "location" && (
                  <div className="h-96 bg-gray-100 rounded-lg">
                    <iframe
                      title="Laboratory Location"
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
  
          <aside className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Facts</h2>
              <ul className="space-y-3 text-gray-600">
                <li>Founded: 2003</li>
                <li>Total Staff: 45+</li>
                <li>Research Areas: 12</li>
                <li>Published Papers: 500+</li>
                <li>Active Projects: 25</li>
              </ul>
            </div>
  
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Certifications</h2>
              <ul className="space-y-3 text-gray-600">
                <li>ISO 9001:2015</li>
                <li>GLP Compliance</li>
                <li>BSL-2 Certified</li>
                <li>AAALAC Accredited</li>
              </ul>
            </div>
  
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Working Hours</h2>
              <ul className="space-y-3 text-gray-600">
                <li>Monday - Friday: 8:00 AM - 6:00 PM</li>
                <li>Saturday: 9:00 AM - 1:00 PM</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
    );
  } 