import React, { useState, useEffect } from "react";
import { AppointmentCard } from "../../components/AppointmentCards";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify"; // Assuming you're using react-toastify

export default function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get("https://medihints-backend.vercel.app/api/doctor/appointment");
        setAppointments(
          res.data.data.map((appt) => ({
            _id: appt._id,
            patient: appt.fullName,
            date: appt.birthDate, // or another date field if available
            time: appt.time,
            type: appt.department, // assuming type maps to department
            status: appt.status || "pending", // fallback if status isn't included
          }))
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setError("Failed to fetch appointment data.");
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleConfirm = async (id) => {
    try {
      // Optional: Persist status change via API
      // await axios.post(`https://medihints-backend.vercel.app/api/doctor/appointment/confirm/${id}`);
      setAppointments((prev) =>
        prev.map((app) => (app._id === id ? { ...app, status: "confirmed" } : app))
      );
    } catch (err) {
      console.error("Failed to confirm appointment:", err);
    }
  };

  const handleCancel = async (id) => {
    try {
      // Optional: Persist status change via API
      // await axios.post(`https://medihints-backend.vercel.app/api/doctor/appointment/cancel/${id}`);
      setAppointments((prev) =>
        prev.map((app) => (app._id === id ? { ...app, status: "cancelled" } : app))
      );
    } catch (err) {
      console.error("Failed to cancel appointment:", err);
    }
  };

  if (loading) return <p className="mt-10 text-center">Loading appointments...</p>;
  if (error) return <p className="mt-10 text-center text-red-500">{error}</p>;

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl p-6 mx-auto"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 text-2xl font-semibold text-gray-900"
        >
          Today's Appointments
        </motion.h1>

        <AnimatePresence>
          <div className="space-y-4">
            {appointments.map((appointment, index) => (
              <AppointmentCard
                key={appointment._id}
                patient={appointment.patient}
                date={appointment.date}
                time={appointment.time}
                type={appointment.type}
                status={appointment.status}
                onConfirm={() => handleConfirm(appointment._id)}
                onCancel={() => handleCancel(appointment._id)}
                index={index}
              />
            ))}
          </div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
