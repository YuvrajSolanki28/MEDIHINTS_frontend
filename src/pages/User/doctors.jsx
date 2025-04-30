import { LinkedinIcon, FacebookIcon, InstagramIcon } from "lucide-react";
import React from "react";
import { useNavigate } from 'react-router-dom';
export default function DoctorProfiles() {
    const navigate = useNavigate();
  return (
    <div className="w-full px-4 py-12 mx-auto max-w-7xl">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="overflow-hidden rounded-lg shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
            alt="Doctor"
            className="object-cover object-center w-full h-96"
          />
          <div className="p-6 bg-blue-100">
            <h3 className="mb-2 text-xl font-semibold text-center">
              Dr. Michael Stevens
            </h3>
            <p className="mb-4 text-sm font-bold tracking-wider text-center text-blue-900">
              NEUROLOGY
            </p>
            <div className="flex justify-center gap-4 mb-6">
              <LinkedinIcon className="w-5 h-5 text-blue-900" />
              <FacebookIcon className="w-5 h-5 text-blue-900" />
              <InstagramIcon className="w-5 h-5 text-blue-900" />
            </div>
            <button className="w-full py-3 text-white transition-colors bg-blue-900 rounded-md hover:bg-blue-800" onClick={() => navigate("/doctorsprofile")}>
              View Profile
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg shadow-lg">
          <img
            src="/doctors2.png"
            alt="Doctor"
            className="object-cover object-center w-full h-96"
          />
          <div className="p-6 bg-blue-100">
            <h3 className="mb-2 text-xl font-semibold text-center">
              Dr. James Wilson
            </h3>
            <p className="mb-4 text-sm font-bold tracking-wider text-center text-blue-900">
              NEUROLOGY
            </p>
            <div className="flex justify-center gap-4 mb-6">
              <LinkedinIcon className="w-5 h-5 text-blue-900" />
              <FacebookIcon className="w-5 h-5 text-blue-900" />
              <InstagramIcon className="w-5 h-5 text-blue-900" />
            </div>
            <button className="w-full py-3 text-white transition-colors bg-blue-900 rounded-md hover:bg-blue-800">
              View Profile
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg shadow-lg">
          <img
            src="/doctors3.png"
            alt="Doctor"
            className="object-cover object-center w-full h-96"
          />
          <div className="p-6 bg-blue-100">
            <h3 className="mb-2 text-xl font-semibold text-center">
              Dr. Sarah Thompson
            </h3>
            <p className="mb-4 text-sm font-bold tracking-wider text-center text-blue-900">
              NEUROLOGY
            </p>
            <div className="flex justify-center gap-4 mb-6">
              <LinkedinIcon className="w-5 h-5 text-blue-900" />
              <FacebookIcon className="w-5 h-5 text-blue-900" />
              <InstagramIcon className="w-5 h-5 text-blue-900" />
            </div>
            <button className="w-full py-3 text-white transition-colors bg-blue-900 rounded-md hover:bg-blue-800">
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}