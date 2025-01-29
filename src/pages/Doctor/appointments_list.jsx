import React, { useState } from "react";
import { Clock, CheckCircle, XCircle, User } from "lucide-react";

const Appointmentslist = [
  {
    id: 1,
    patientName: "Sarah Johnson",
    time: "9:00 AM",
    reason: "Annual Check-up",
    status: "pending",
  },
  {
    id: 2,
    patientName: "Michael Chen",
    time: "10:30 AM",
    reason: "Follow-up Consultation",
    status: "pending",
  },
  {
    id: 3,
    patientName: "Emma Davis",
    time: "2:15 PM",
    reason: "Vaccination",
    status: "pending",
  },
];

export function App() {
  const [appointments, setAppointments] = useState(Appointmentslist);

  const updateAppointmentStatus = (id, status) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === id
          ? {
              ...apt,
              status,
            }
          : apt
      )
    );
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">Today's Appointments</h1>
        </header>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white rounded-lg shadow-sm p-6 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-blue-50 rounded-full">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{appointment.patientName}</h3>
                    <p className="text-sm text-gray-500">{appointment.time}</p>
                    <p className="text-sm text-gray-600 mt-1">{appointment.reason}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => updateAppointmentStatus(appointment.id, "confirmed")}
                    className={`px-4 py-2 text-sm rounded-md transition-colors ${appointment.status === "confirmed" ? "bg-green-100 text-green-700" : "hover:bg-green-50 text-green-600"}`}
                  >
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-4 h-4" />
                      <span>Confirm</span>
                    </div>
                  </button>
                  <button
                    onClick={() => updateAppointmentStatus(appointment.id, "waiting")}
                    className={`px-4 py-2 text-sm rounded-md transition-colors ${appointment.status === "waiting" ? "bg-yellow-100 text-yellow-700" : "hover:bg-yellow-50 text-yellow-600"}`}
                  >
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>Wait</span>
                    </div>
                  </button>
                  <button
                    onClick={() => updateAppointmentStatus(appointment.id, "not_confirmed")}
                    className={`px-4 py-2 text-sm rounded-md transition-colors ${appointment.status === "not_confirmed" ? "bg-red-100 text-red-700" : "hover:bg-red-50 text-red-600"}`}
                  >
                    <div className="flex items-center space-x-1">
                      <XCircle className="w-4 h-4" />
                      <span>Not Confirm</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
