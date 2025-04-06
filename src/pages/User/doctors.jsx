import { LinkedinIcon, FacebookIcon, InstagramIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';

export default function DoctorProfiles() {
  const navigate = useNavigate();
  const { _id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/doctors/${_id}`);
            const data = await response.json();
            if (response.ok) {
                setDoctor(data);
            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error("Error fetching doctor:", error);
        }
    };
    fetchDoctor();
}, [_id]);

if (!doctor) return <p>Loading...</p>;
  return (
    <div className="w-full px-4 py-12 mx-auto max-w-7xl">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="overflow-hidden rounded-lg shadow-lg">
          <img
            src={doctor.image}
            alt="Doctor"
            className="object-cover object-center w-full h-96"
          />
          <div className="p-6 bg-blue-100">
            <h3 className="mb-2 text-xl font-semibold text-center">
              {doctor.fullName}
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

      </div>
    </div>
  );
}