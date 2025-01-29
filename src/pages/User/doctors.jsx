import { LinkedinIcon, FacebookIcon, InstagramIcon } from "lucide-react";
import React from "react";
import { useNavigate } from 'react-router-dom';
export default function DoctorProfiles() {
    const navigate = useNavigate();
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
            alt="Doctor"
            className="w-full h-96 object-cover object-center"
          />
          <div className="bg-blue-100 p-6">
            <h3 className="text-xl font-semibold text-center mb-2">
              Dr. Michael Stevens
            </h3>
            <p className="text-sm font-bold text-center text-blue-900 tracking-wider mb-4">
              NEUROLOGY
            </p>
            <div className="flex justify-center gap-4 mb-6">
              <LinkedinIcon className="w-5 h-5 text-blue-900" />
              <FacebookIcon className="w-5 h-5 text-blue-900" />
              <InstagramIcon className="w-5 h-5 text-blue-900" />
            </div>
            <button className="w-full bg-blue-900 text-white py-3 rounded-md hover:bg-blue-800 transition-colors" onClick={() => navigate("/doctorsprofile")}>
              View Profile
            </button>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden shadow-lg">
          <img
            src="/doctors2.png"
            alt="Doctor"
            className="w-full h-96 object-cover object-center"
          />
          <div className="bg-blue-100 p-6">
            <h3 className="text-xl font-semibold text-center mb-2">
              Dr. James Wilson
            </h3>
            <p className="text-sm font-bold text-center text-blue-900 tracking-wider mb-4">
              NEUROLOGY
            </p>
            <div className="flex justify-center gap-4 mb-6">
              <LinkedinIcon className="w-5 h-5 text-blue-900" />
              <FacebookIcon className="w-5 h-5 text-blue-900" />
              <InstagramIcon className="w-5 h-5 text-blue-900" />
            </div>
            <button className="w-full bg-blue-900 text-white py-3 rounded-md hover:bg-blue-800 transition-colors">
              View Profile
            </button>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden shadow-lg">
          <img
            src="/doctors3.png"
            alt="Doctor"
            className="w-full h-96 object-cover object-center"
          />
          <div className="bg-blue-100 p-6">
            <h3 className="text-xl font-semibold text-center mb-2">
              Dr. Sarah Thompson
            </h3>
            <p className="text-sm font-bold text-center text-blue-900 tracking-wider mb-4">
              NEUROLOGY
            </p>
            <div className="flex justify-center gap-4 mb-6">
              <LinkedinIcon className="w-5 h-5 text-blue-900" />
              <FacebookIcon className="w-5 h-5 text-blue-900" />
              <InstagramIcon className="w-5 h-5 text-blue-900" />
            </div>
            <button className="w-full bg-blue-900 text-white py-3 rounded-md hover:bg-blue-800 transition-colors">
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}