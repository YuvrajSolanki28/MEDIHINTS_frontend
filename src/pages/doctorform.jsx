import { AlertCircle, Check, Building } from "lucide-react";
import React, { useState } from "react";

const departments = ["Cardiology", "Neurology", "Pediatrics", "Orthopedics", "General Medicine"];

export default function DoctorDetailsForm() {
    const [formData, setFormData] = useState({
        doctorName: '',
        contactNumber: '',
        presentTime: '',
        department: ''
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    // Validate form fields before submission
    const validateForm = () => {
        let formErrors = {};
        if (!formData.doctorName) formErrors.doctorName = "Doctor name is required.";
        if (!formData.contactNumber) formErrors.contactNumber = "Contact number is required.";
        if (!formData.presentTime) formErrors.presentTime = "Present time is required.";
        if (!formData.department) formErrors.department = "Department is required.";
        return formErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = validateForm();
        setErrors(formErrors);

        if (Object.keys(formErrors).length > 0) return;  // Stop if there are validation errors

        try {
            const response = await fetch('http://localhost:8000/api/doctors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSubmitted(true);  // Successfully submitted form
                setFormData({
                    doctorName: '',
                    contactNumber: '',
                    presentTime: '',
                    department: ''
                });  // Clear form
            } else {
                throw new Error('Failed to save doctor data');
            }
        } catch (error) {
            console.error("Error:", error);
            alert('An error occurred while saving the data.');
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
                <h1 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                    <Building className="h-6 w-6" />
                    Doctor Details Form
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Doctor Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Doctor Name
                        </label>
                        <input
                            type="text"
                            value={formData.doctorName}
                            onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                            className={`w-full px-4 py-2 rounded-md border ${errors.doctorName ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                            placeholder="Enter doctor name"
                        />
                        {errors.doctorName && (
                            <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                                <AlertCircle className="h-4 w-4" />
                                {errors.doctorName}
                            </div>
                        )}
                    </div>

                    {/* Contact Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Contact Number
                        </label>
                        <input
                            type="text"
                            value={formData.contactNumber}
                            onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                            className={`w-full px-4 py-2 rounded-md border ${errors.contactNumber ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                            placeholder="Enter contact number"
                        />
                        {errors.contactNumber && (
                            <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                                <AlertCircle className="h-4 w-4" />
                                {errors.contactNumber}
                            </div>
                        )}
                    </div>

                    {/* Present Time */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Present Time
                        </label>
                        <input
                            type="text"
                            value={formData.presentTime}
                            onChange={(e) => setFormData({ ...formData, presentTime: e.target.value })}
                            className={`w-full px-4 py-2 rounded-md border ${errors.presentTime ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                            placeholder="Enter present time (e.g., Mon-Fri 10:00 AM to 10:00 PM)"
                        />
                        {errors.presentTime && (
                            <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                                <AlertCircle className="h-4 w-4" />
                                {errors.presentTime}
                            </div>
                        )}
                    </div>

                    {/* Department */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Department
                        </label>
                        <select
                            value={formData.department}
                            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                            className={`w-full px-4 py-2 rounded-md border ${errors.department ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                        >
                            <option value="">Select department</option>
                            {departments.map((dept) => (
                                <option key={dept} value={dept}>{dept}</option>
                            ))}
                        </select>
                        {errors.department && (
                            <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                                <AlertCircle className="h-4 w-4" />
                                {errors.department}
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
