import { motion } from "framer-motion";

const ComingSoon = () => (
  <main className="flex items-center justify-center w-full min-h-screen bg-white">
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
      className="text-4xl font-bold text-gray-900 md:text-6xl"
    >
      Coming Soon
    </motion.h1>
  </main>
);

export default ComingSoon;
