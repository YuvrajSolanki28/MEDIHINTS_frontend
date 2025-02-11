import React from "react";
import { motion } from "framer-motion";
import { Heart, Shield, Clock } from "lucide-react";
export default function Landingpage() {
  return (
    <div className="w-full min-h-screen bg-white">
      <main>
        <section className="relative w-full bg-gradient-to-r from-blue-50 to-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <motion.div
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.8,
                }}
                className="md:w-1/2 mb-10 md:mb-0"
              >
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Your Health, Our Priority
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Experience world-class medical care with our team of expert
                  healthcare professionals.
                </p>
              </motion.div>
              <motion.div
                initial={{
                  opacity: 0,
                  x: 20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                }}
                className="md:w-1/2"
              >
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                  alt="Medical professionals"
                  className="rounded-lg shadow-xl w-full"
                />
              </motion.div>
            </div>
          </div>
        </section>
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                }}
                className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-lg"
              >
                <Heart className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Expert Care</h3>
                <p className="text-gray-600">
                  Dedicated medical professionals providing the best care.
                </p>
              </motion.div>
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.2,
                }}
                className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-lg"
              >
                <Shield className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Safe & Secure</h3>
                <p className="text-gray-600">
                  Your health and safety is our top priority.
                </p>
              </motion.div>
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.4,
                }}
                className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-lg"
              >
                <Clock className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                <p className="text-gray-600">
                  Round-the-clock medical assistance whenever you need.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
