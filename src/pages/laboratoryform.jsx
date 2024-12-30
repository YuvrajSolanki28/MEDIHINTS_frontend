import { AlertCircle, Check, MapPin, Mail, Building, Phone, Clock, Key } from "lucide-react";
import React, { useState } from "react";

export default function LaboratoryDetailsForm() {
  const [formData, setFormData] = useState({
    labName: "",
    location: "",
    email: "",
    contactNumber: "",
    time: "",
    pincode: "",
    testTypes: [],
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const availableTestTypes = [
    "Blood Work",
    "Urinalysis",
    "COVID-19 Testing",
    "DNA Testing",
    "Drug Screening",
    "Microbiology",
    "Pathology",
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.labName.trim()) {
      newErrors.labName = "Laboratory name is required";
    }
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required";
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Please enter a valid 10-digit contact number";
    }
    if (!formData.time.trim()) {
      newErrors.time = "Opening/closing time is required";
    }
    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Please enter a valid 6-digit pincode";
    }
    if (formData.testTypes.length === 0) {
      newErrors.testTypes = "Please select at least one test type";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    if (validateForm()) {
      try {
        // Making the API call using fetch
        const response = await fetch("http://localhost:8000/api/laboratory", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log("Form submitted successfully:", data);
          setSubmitted(true);
          setTimeout(() => setSubmitted(false), 3000);
        } else {
          // If the response is not OK, log the error
          const data = await response.json();
          console.error("Error submitting form:", data.message);
        }
      } catch (error) {
        // Handle errors such as network issues
        console.error("Error connecting to the server:", error);
      }
    }
  };
  

  const handleTestTypeChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      testTypes: prev.testTypes.includes(type)
        ? prev.testTypes.filter((t) => t !== type)
        : [...prev.testTypes, type],
    }));
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <Building className="h-6 w-6" />
          Laboratory Details Form
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Lab Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Laboratory Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={formData.labName}
                onChange={(e) =>
                  setFormData({ ...formData, labName: e.target.value })
                }
                className={`w-full pl-10 px-4 py-2 rounded-md border ${
                  errors.labName ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Enter laboratory name"
              />
              {errors.labName && (
                <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  {errors.labName}
                </div>
              )}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className={`w-full pl-10 px-4 py-2 rounded-md border ${
                  errors.location ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Enter laboratory location"
              />
              {errors.location && (
                <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  {errors.location}
                </div>
              )}
            </div>
          </div>

          {/* Contact Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={`w-full pl-10 px-4 py-2 rounded-md border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Enter contact email"
              />
              {errors.email && (
                <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  {errors.email}
                </div>
              )}
            </div>
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={formData.contactNumber}
                onChange={(e) =>
                  setFormData({ ...formData, contactNumber: e.target.value })
                }
                className={`w-full pl-10 px-4 py-2 rounded-md border ${
                  errors.contactNumber ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Enter contact number"
              />
              {errors.contactNumber && (
                <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  {errors.contactNumber}
                </div>
              )}
            </div>
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Opening/Closing Time
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Clock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                className={`w-full pl-10 px-4 py-2 rounded-md border ${
                  errors.time ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Enter opening/closing time"
              />
              {errors.time && (
                <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  {errors.time}
                </div>
              )}
            </div>
          </div>

          {/* Pincode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pincode
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Key className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={formData.pincode}
                onChange={(e) =>
                  setFormData({ ...formData, pincode: e.target.value })
                }
                className={`w-full pl-10 px-4 py-2 rounded-md border ${
                  errors.pincode ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Enter pincode"
              />
              {errors.pincode && (
                <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  {errors.pincode}
                </div>
              )}
            </div>
          </div>

          {/* Test Types */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Test Types Available
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {availableTestTypes.map((type) => (
                <label
                  key={type}
                  className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={formData.testTypes.includes(type)}
                    onChange={() => handleTestTypeChange(type)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-3 flex items-center gap-2">{type}</span>
                </label>
              ))}
            </div>
            {errors.testTypes && (
              <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                <AlertCircle className="h-4 w-4" />
                {errors.testTypes}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end gap-4">
            {submitted && (
              <div className="flex items-center gap-1 text-green-600">
                <Check className="h-5 w-5" />
                Form submitted successfully!
              </div>
            )}
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
