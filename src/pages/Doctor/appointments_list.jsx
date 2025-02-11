import React, { useState } from "react";
import { AppointmentCard } from "../../components/AppointmentCards";
import { motion, AnimatePresence } from "framer-motion";

export default function AppointmentList() {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patient: "John Smith",
      date: "2024-01-20",
      time: "09:00 AM",
      type: "General Checkup",
      status: "pending",
    },
    {
      id: 2,
      patient: "Sarah Johnson",
      date: "2024-01-20",
      time: "10:30 AM",
      type: "Dental Cleaning",
      status: "pending",
    },
    {
      id: 3,
      patient: "Michael Brown",
      date: "2024-01-20",
      time: "02:00 PM",
      type: "Follow-up",
      status: "pending",
    },
  ]);

  const handleConfirm = (id) => {
    setAppointments(
      appointments.map((app) =>
        app.id === id
          ? { ...app, status: "confirmed" }
          : app
      )
    );
  };

  const handleCancel = (id) => {
    setAppointments(
      appointments.map((app) =>
        app.id === id
          ? { ...app, status: "cancelled" }
          : app
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto p-6"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-semibold text-gray-900 mb-6"
        >
          Today's Appointments
        </motion.h1>
        <AnimatePresence>
          <div className="space-y-4">
            {appointments.map((appointment, index) => (
              <AppointmentCard
                key={appointment.id}
                patient={appointment.patient}
                date={appointment.date}
                time={appointment.time}
                type={appointment.type}
                status={appointment.status}
                onConfirm={() => handleConfirm(appointment.id)}
                onCancel={() => handleCancel(appointment.id)}
                index={index}
              />
            ))}
          </div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
